const allSentencesRender = document.getElementById("all-sentences-render");

/**
 * LocalStorage add and undo player list functions
 */
const setLocalStorage = (pStringKey, pArrar) => {
  localStorage.setItem(pStringKey, JSON.stringify(pArrar));
};
const getLocalStorage = (pStringKey) => {
  return JSON.parse(localStorage.getItem(pStringKey));
};

const renderAllSentences = (pSentence) => {
  return `
    <div class="content">
    <p class="sentence"><b>Turkish:</b> ${pSentence.sentence}</p>
    <p class="translate"><b>English:</b> ${pSentence.translate}</p>
    <p class="key-words"><b>Target Words:</b> ${pSentence.key_words.map(
      (word) => `<span class="px-2">${word}</span>`
    )}</p>
    </div>
    `;
};
const fromLocalStrangeData = getLocalStorage("allSentencesData");
console.log(fromLocalStrangeData);
allSentencesRender.innerHTML = fromLocalStrangeData.map((sentence) =>
  renderAllSentences(sentence)
);
