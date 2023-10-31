const allSentencesRender = document.getElementById("all-sentences-render");

// /**
//  * LocalStorage add and undo player list functions
//  */
// const setLocalStorage = (pStringKey, pArrar) => {
//   localStorage.setItem(pStringKey, JSON.stringify(pArrar));
// };
// const getLocalStorage = (pStringKey) => {
//   return JSON.parse(localStorage.getItem(pStringKey));
// };

const renderAllSentences = (pSentence) => {
  return `
    <div class="content ${pSentence.state}">
    <p class="sentence"><b>TR:</b> ${pSentence.sentence}</p>
    <p class="translate"><b>EN:</b> ${pSentence.translate}</p>
    <p class="key-words"><b>Target Words:</b> ${pSentence.key_words.map(
      (word) => `<span class="px-2">${word}</span>`
    )}</p>
    <div class="add-buttons">
      <button class="add-to-learn" onclick="addToLearningList(${
        pSentence.id
      })"><i class="fa-solid fa-hourglass-start pe-2"></i>Learn</button>
      <button class="forget" onclick="forgotSentences(${
        pSentence.id
      })"><i class="fa-solid fa-xmark pe-2"></i>forget</button>
      <button class="add-to-learned" onclick="learnedSentenceInAllSentences(${
        pSentence.id
      })"><i class="fa-solid fa-check-double pe-2"></i>Learned</button>
      
    </div>
    </div> <br/>
    `;
};
const fromLocalStrangeData = getLocalStorage("allSentencesData");

allSentencesRender.innerHTML = fromLocalStrangeData
  .map((sentence) => renderAllSentences(sentence))
  .join("");

const addToLearningList = (pId) => {
  const fromLocalStrangeData = getLocalStorage("allSentencesData");

  // Gelen datayı 'pId' ile yakalamak ve 'state' değerini true olarak değiştirmek
  const updatedData = fromLocalStrangeData.map((sentence) => {
    if (sentence.id === pId) {
      return {
        ...sentence,
        state: false,
      };
    }
    return sentence;
  });

  // Güncel objeyi 'data' içerisine yüklemek
  data = updatedData;
  toLearnData = data && data.filter((sentence) => sentence.state === "empty");
  learnedData = data && data.filter((sentence) => sentence.state === true);
  myLearnListData = data && data.filter((sentence) => sentence.state === false);

  if (toLearnWordsNumber !== null && learnedWordsNumber !== null) {
    toLearnWordsNumber.innerText = myLearnListData.length;
    learnedWordsNumber.innerText = learnedData.length;
  }

  // Yeni data'yı localStorage'a atmak
  setLocalStorage("allSentencesData", updatedData);
  // if (myLearnListData.length > 0) {
  //   renderNewSentence(0);
  //   renderNewSentenceLearned(0);
  // } else {
  //   runOutOfWords();
  // }
  allSentencesRender.innerHTML = updatedData
    .map((sentence) => renderAllSentences(sentence))
    .join("");
};

/* Move sentence to learned content */
const learnedSentenceInAllSentences = (pId) => {
  const fromLocalStrangeData = getLocalStorage("allSentencesData");

  // Gelen datayı 'pId' ile yakalamak ve 'state' değerini true olarak değiştirmek
  const updatedData = fromLocalStrangeData.map((sentence) => {
    if (sentence.id === pId) {
      return {
        ...sentence,
        state: true,
      };
    }
    return sentence;
  });

  // Güncel objeyi 'data' içerisine yüklemek
  data = updatedData;
  toLearnData = data && data.filter((sentence) => sentence.state === "empty");
  learnedData = data && data.filter((sentence) => sentence.state === true);
  myLearnListData = data && data.filter((sentence) => sentence.state === false);

  // Yeni data'yı localStorage'a atmak
  setLocalStorage("allSentencesData", updatedData);
  allSentencesRender.innerHTML = updatedData
    .map((sentence) => renderAllSentences(sentence))
    .join("");
};

const forgotSentences = (pId) => {
  const fromLocalStrangeData = getLocalStorage("allSentencesData");

  // Gelen datayı 'pId' ile yakalamak ve 'state' değerini true olarak değiştirmek
  const updatedData = fromLocalStrangeData.map((sentence) => {
    if (sentence.id === pId) {
      return {
        ...sentence,
        state: "empty",
      };
    }
    return sentence;
  });

  // Güncel objeyi 'data' içerisine yüklemek
  data = updatedData;
  toLearnData = data && data.filter((sentence) => sentence.state === "empty");
  learnedData = data && data.filter((sentence) => sentence.state === true);
  myLearnListData = data && data.filter((sentence) => sentence.state === false);

  // Yeni data'yı localStorage'a atmak
  setLocalStorage("allSentencesData", updatedData);
  allSentencesRender.innerHTML = updatedData
    .map((sentence) => renderAllSentences(sentence))
    .join("");
};
