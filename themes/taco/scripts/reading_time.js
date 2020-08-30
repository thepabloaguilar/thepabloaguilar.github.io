/**
 * @description Generate aproximate reading time of a text
 * @example
 *     <%- reading_time(text) %>
 */

const WORDS_PER_MINUTE = 200;

function readingTime(text) {
  const wordsCount = text.split(/\s/g).length;
  return Math.ceil(wordsCount / WORDS_PER_MINUTE);
}

hexo.extend.helper.register('reading_time', readingTime);
