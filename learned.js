/* DOM elements */
const renderContainerLearned = document.getElementById(
  "render-container-learned"
);
const prevButtonLearned = document.getElementById("prev-sentence-learned");
const nextButtonLearned = document.getElementById("next-sentence-learned");

// learnedData = getLocalStorage("allSentencesData").filter(
//   (sentence) => sentence.state === true
// );
learnedWordsNumber.innerText = learnedData ? learnedData.length : 0;

/** Open and colose translate */
const openTranslateLearned = (id) => {
  const targetElement = document.getElementById(`trl${id}`);

  const openIcon = document.getElementById(id);
  const closeIcon = document.querySelector(".close-icon-learned");
  if (
    targetElement.style.display === "none" ||
    targetElement.style.display === ""
  ) {
    targetElement.style.display = "block";
    openIcon.classList.add("d-none");
    closeIcon.classList.remove("d-none");
  } else {
    targetElement.style.display = "none";
    openIcon.classList.remove("d-none");
    closeIcon.classList.add("d-none");
  }
};

/* ileri geri fonksiyonlar */

const getPrevSentenceLearned = () => {
  if (learnedData) {
    if (number <= 0) {
      number = learnedData.length - 1;
      renderNewSentenceLearned(number);
    } else {
      number--;
      renderNewSentenceLearned(number);
    }
  }
};

const getNextSentenceLearned = () => {
  if (learnedData) {
    if (number < learnedData.length - 1) {
      number++;
      renderNewSentenceLearned(number);
    } else {
      number = 0;
      renderNewSentenceLearned(number);
    }
  }
};

/* This event get a new sentence */
prevButtonLearned.addEventListener("click", getPrevSentenceLearned);
nextButtonLearned.addEventListener("click", getNextSentenceLearned);

/* Read text function */
function readTextLearned(id) {
  var textToRead = document.getElementById(`trl${id}`).textContent;
  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(textToRead);
  synth.speak(utterThis);
}

/* Move sentence to learned content */
const forgotSentence = (pId) => {
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
  learnedData = data && data.filter((sentence) => sentence.state === true);
  toLearnData = data && data.filter((sentence) => sentence.state === "empty");
  myLearnListData = data && data.filter((sentence) => sentence.state === false);
  if (myLearnListData.length > 0) {
    toLearnWordsNumber.innerText = myLearnListData.length;
  } else {
    toLearnWordsNumber.innerText = "0";
  }
  if (learnedData.length > 0) {
    learnedWordsNumber.innerText = learnedData.length;
  } else {
    learnedWordsNumber.innerText = "0";
  }

  // Yeni data'yı localStorage'a atmak
  setLocalStorage("allSentencesData", updatedData);
  if (myLearnListData.length > 0) {
    renderNewSentence(0);
    renderNewSentenceLearned(0);
  } else {
    runOutOfWords();
  }
};
