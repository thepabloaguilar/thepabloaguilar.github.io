---
title: "Não é só um Pull Request"
date: 2021-02-23
draft: false
categories:
  - engenharia de software
tags:
  - engenharia de software
  - desenvolvimento de software
  - pull request
  - qualidade de codigo
  - revisao de codigo
cover:
  image: cover.jpeg
  relative: true
  caption: "Foto por [Maxwell](https://unsplash.com/@maxcodes) Nelson no [Unplash](https://unsplash.com/s/photos/software)"
slug: nao-e-so-um-pull-request
---

Em todas as minhas experiências profissionais até agora eu vi várias pessoas/times ignorando o
significado por trás de um [Pull Request (PR)](https://docs.github.com/pt/github/collaborating-with-issues-and-pull-requests/about-pull-requests),
tratando ele só como um tipo de burocracia para colocar o código em produção.

Algumas vezes escutei pessoas falando uma para outra: "Vou abrir um PR aqui, aceita ai que está tudo certo".
No final esse PR foi realmente aceito sem nenhum tipo de revisão e acabou quebrando todo o sistema,
posso dizer que o revisor é tão culpado quanto o revisado porque nesse caso o revisor foi negligente!

Nós não conseguimos automatizar tudo, as pessoas pensam que por terem __testes automatizados__ não precisam fazer mais nada
para garantir a qualidade do código.

Está dentro de __testes automatizados__:
* Testes unitários, testes de integração e etc.
* Testes estáticos (linters)
* [Testes de Tipagem Estática](https://sobolevn.me/2019/08/testing-mypy-types) (se você estiver usando uma linguagem com tipagem estática opcional, como Python)

__Nos próximos tópicos, vou tentar explicar meu ponto de vista sobre código e sua qualidade no mundo profissional__

## O que é o código?

> Todo projeto/codebase é um ativo da empresa.

O código que nós escrevemos não é nosso, ele pertence à empresa. Nós só estamos momentaneamente responsáveis por ele,
talvez daqui algumas semanas o projeto vá para outro time, e outro projeto pode vir para nosso time também!

Pelo fato de que os projetos podem ser movimentados entre os times, é nosso dever manter a qualidade do código que escrevemos,
nós precisamos nos preocupar não porque alguém quer mas porque devemos, é uma tarefa de todos que escrevem/produzem código.

## Qualidade

> Manter a qualidade é ter empatia com quem mantinha, mantém e irá manter o código.

Muitas pessoas acham que testes automatizados são suficiente para garantir a qualidade mas a equação deveria ser algo como:

> qualidade = testes automatizados + legibilidade + manutenibilidade + uma boa arquitetura

__Por que o processo de revisão existe no Pull Request se eu posso _mergear_ o código depois que os testes rodaram com sucesso?__

Porque nós não podemos garantir a legibilidate, manutenibilidade e a qualidade da arquitetura. As pessoas acham que rodando um linter e
tendo 100% de cobertura de código é o suficiente, mas não é.

Lembre-se, cobertura de código não significa qualidade de teste!

Como um time, nós somos reponsáveis pelo código da branch __main__. Quando alguém cria outras branches
para implementar uma nova feature ou arrumar algum bug, quem criou a branch e o revisor são resposáveis
por garantir a qualidade do código que será mergeado na branch ___main___.

Algumas pessoas falam que o código é só o meio para criar/chegar no produto, mas se esse código não tem
qualidade e definição, o que será do produto?

Provavelmente um produto que ninguém vai querer dar manutenção porque será muito difícil de entender como ele funciona.

## Pull Request

Um Pull Request é um pedido para adicionar/modificar um ativo da empresa, é algo que já pode estar em produção, então,
nós precisamos garantir uma alta qualidade porque nossos consumidores/usuários serão afetados diretamente.

O Pull Request é onde nós podemos validar todo aspecto da qualidade do código que irá ser mergerado na branch ___main___,
tentando reduzir qualquer possível erro no código!

Uma das partes mais legais sobre Pull Requests é que todos aprendemos alguma coisa, tanto o revisor quanto o revisado.

---

Agradecimentos especiais para as pessoas que revisaram esse post:
* [Nikita Sobolevn](https://github.com/sobolevn)
* [Gustavo Millen](https://github.com/millengustavo)
* [Bruno Delfino](https://github.com/bruno-delfino1995)
