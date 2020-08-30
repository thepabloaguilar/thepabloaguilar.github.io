---
title: "Monkey Patching não é tão ruim"
date: 2020-08-13
draft: false
categories:
  - python
tags:
  - python
  - monkey patching
  - dry python
cover:
  image: cover.jpeg
  relative: true
  caption: "[Criado por JavierFeria / Freepik](http://www.freepik.com)"
slug: monkey-patching-nao-e-tao-ruim
---

## Contexto

Há alguns meses atrás comecei a contribuir em biblioteca Open Source para python, [returns](https://github.com/dry-python/returns),
ela têm vários recursos e contêineres legais para nos ajudar de diferentes maneiras. Não irei
me aprofundar neles nesse post, mas você pode acessar a [documentação](https://returns.readthedocs.io/en/latest/)
para saber mais sobre!

Nesse post irei falar sobre o _porquê_ nós escolhemos a técnica de monkey patching para implementar
uma de nossas features onde o objetivo era [_melhorar a rastreabilidade de falhas_](https://github.com/dry-python/returns/issues/409)
para os contêineres __Result__.

Uma breve explicação sobre o que é o [Result](https://returns.readthedocs.io/en/latest/pages/result.html),
basicamente, seu código pode ter dois caminhos:

* Sucesso, seu código executou normalmente sem nenhum erro
* Falha, seu código falhou por alguma razão, por exemplo, uma quebra de regra de negócio ou uma exceção foi lançada

O contêiner abstrai esses possíveis caminhos para nós, veja o exemplo abaixo:

```python
from returns.result import Failure, Result, Success

def eh_par(numero: int) -> Result[int, int]:
    if arg % 2 == 0:
        return Success(numero)
    return Failure(numero)

assert eh_par(2) == Success(2)
assert eh_par(1) == Failure(1)
```

Usar o _Result_ pode ser uma boa ideia porque você não precisa mais lidar com exceções (négocio, sistema) lançadas
e sair colocando `try...except` em todo lugar do seu código, você precisa apenas retornar um contêiner __Failure__.

## Rastreabilidade de Falhas: explicação da feature

_Failure_ é bom, mas exceções normais nos dão algo importante: __onde elas foram lançadas__.

Inspirado na feature de [rastreamento de falhas](https://dry-rb.org/gems/dry-monads/1.3/tracing-failures/)
do [dry-rb](https://dry-rb.org/), que é uma coleção de bibliotecas para Ruby, nós começamos as discussões para
oferecer essa opção para os usuários da _returns_. Uma coisa muito importante foi considerada para fazer
a implementação, __que os usuários que não fossem utilizar a feature não poderiam ter a performance dos
seus sistemas/aplicações afetada!__

A forma simples, fácil e única (eu acho) para implementar a feature é pegarmos a pilha de chamadas
e fazer algumas manipulações com ela. Em Python é bem simples fazermos isso, porém é uma operação
bem custosa que pode afetar a performance se for feita muitas vezes. Abaixo você consegue ver
as métricas extraídas sobre o consumo de memória quando criamos um contêiner _Failure_ pegando e não pegando
a pilha de chamadas, respectivamente:

![Memory consumption without trace implemented](memory-consumption-without-trace-implemented.png)

![Memory consumption with trace implemented](memory-consumption-with-trace-implemented.png)

## Como nós podemos implementar a feature de rastreamento?

Nós já sabemos que o rastreamento deve ser opcional, dado que usuários que não irão utiliza-lo não podem ser afetados,
e como vimos nas imagems acima, quando ativamos o rastreamento (pegando a pilha de chamadas) tivemos um consumo grande de
memória comparada sem o rastreamento!

Para tornar o rastremento opcional tinhamos duas opções:

* Usar uma variável de ambiente
* Usar monkey patching

Pelo título desse post você já deve saber que escolhemos a segunda opção.

___Por que monkey patching?___

__Monkey Patching__ é a abordagem mais sofisticada e elegante do que utilizar uma variável de ambiente,
nós podemos separar de maneira correta a código da feature de _rastreamento_ da classe que
queremos que seja rastreável e não dependemos de nenhum recurso externo. Usando uma variável de ambiente
acabaríamos com algo similar ao exemplo abaixo em nossas classes, nós podemos desacoplar a estrutura do ___if___
da classe porém em algum outro lugar do nosso código esse ___if___ estaria lá:

```python
import os

class Exemplo:
    def __init__(self) -> None:
        if os.getenv('RETURNS_TRACE'):
            self._tracking = []
```

Monkey patching é um amigo conhecido dos programadores Python, nós usamos muito enquanto
escrevemos testes para fazermos mocks de tudo que queremos (requests para API, interações com o banco de dados e etc.),
porém não é muito utilizado em códigos de _"produção"_ porque temos algumas desvantagens,
como por exemplo, ele não é __Thread Safe__ e pode criar vários bugs dado que ele afeta o código base inteiro em _runtime_.
Mas nós entendemos que a feature de rastreamento é para propósitos de desenvolvimento,
nós não nos importamos com o problema de _thread safety_ e sabemos exatamente onde iremos usar o monkey patching!

> Podemos ter um monkey patching que seja thread safe em Python?
>
> Sim, podemos. Mas isso é um assunto para outro artigo.

Depois de algumas discussões, nós finalmente entregamos nossa feature de
[rastreamento de falhas](https://returns.readthedocs.io/en/latest/pages/development.html#tracing-failures),
e agora nossos usuários podem ativar explicitamente em seus códigos o rastreamento para os contêineres Result.

```python
from returns.result import Failure, Result
from returns.primitives.tracing import collect_traces

@collect_traces
def retorna_falha(argumento: str) -> Result[str, str]:
    return Failure(argumento)

failure = retorna_falha('example')

for trace_line in failure.trace:
    print(f"{trace_line.filename}:{trace_line.lineno} in `{trace_line.function}`")
```

A saída será algo como:
```text
/returns/returns/result.py:529 in `Failure`
/exemplo_folder/exemplo.py:5 in `retorna_falha`
/exemplo_folder/exemplo.py:1 in `<module>`
```

## Extra

O objetivo principal da feature de rastreamento é dar ao usuário a habilidade de encontrar onde
a falha aconteceu, mas se você não quer analizar a pilha de chamadas e sabe o cenário onde a falha
ocorre, use o [plugin da returns para __pytest__](https://returns.readthedocs.io/en/latest/pages/contrib/pytest_plugins.html)
para verificar sua hipótese. Nós disponibilizamos uma _fixture_ chamada __returns__ com o método __has_trace__, de uma olhada no exemplo abaixo:

```python
from returns.result import Result, Success, Failure

def funcao_exemplo(arg: str) -> Result[int, str]:
    if arg.isnumeric():
        return Success(int(arg))
    return Failure('"{0}" não é um número'.format(arg))

def test_if_failure_is_created_at_exemplo(returns):
    with returns.has_trace(Failure, funcao_exemplo):
        Success('não é número').bind(funcao_exemplo)
```

Se `test_if_failure_is_created_at_exemplo` falhar nós sabemos que a __falha__ não foi
criada na `funcao_exemplo` ou em alguma de suas chamadas internas.

## Links relacionados

* [Hear no evil, see no evil, patch no evil: Or, how to monkey-patch safely.](https://pt.slideshare.net/GrahamDumpleton/hear-no-evil-see-no-evil-patch-no-evil-or-how-to-monkeypatch-safely)
* [Monkey Patching and its consequences](https://www.pythonforthelab.com/blog/monkey-patching-and-its-consequences/)
