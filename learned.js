/* DOM elements */
const renderContainerLearned = document.getElementById(
  "render-container-learned"
);
const prevButtonLearned = document.getElementById("prev-sentence-learned");
const nextButtonLearned = document.getElementById("next-sentence-learned");

learnedData = getLocalStorage("allSentencesData").filter(
  (sentence) => sentence.state === true
);
learnedWordsNumber.innerText = learnedData ? learnedData.length : 0;

// const renderNewSentenceLearned = (number) => {
//   totalSentencesLearned.innerText = `${number + 1}/${learnedData.length}`;

//   if (learnedData.length > 0) {
//     learnedData &&
//       (renderContainerLearned.innerHTML = `
//           <div class="sentence-container">
//               <div class="sentences-and-icon px-2 my-3">
//                 <p>
//                   ${learnedData[number].sentence}
//                 </p>
//                 <div class="d-flex flex-column align-items-center justfy-content-end">
//                   <i id="${learnedData[number].id}-learned" onclick="openTranslateLearned(this.id)" class="fa-solid fa-chevron-down open-icon-learned px-2 mx-1 mb-2"></i>
//                   <i id="${learnedData[number].id}-learned" onclick="openTranslateLearned(this.id)" class="fa-solid fa-chevron-up close-icon-learned px-2 mx-1 mb-2 d-none"></i>
//                   <i id="${learnedData[number].id}-learned" onclick="readText(this.id)" class="fa-solid fa-volume-high read-icon-learned p-2 mx-1 mb-2"></i>
//                   <i id=${learnedData[number].id} onclick="forgotSentence(${learnedData[number].id})" class="fa-solid fa-xmark unlearned-icon"></i>
//                 </div>
//               </div>
//               <p id="trl${learnedData[number].id}-learned" class="translate px-2 py-3">
//                 ${learnedData[number].translate}
//               </p>
//             </div>
//         `);
//   } else {
//     learnedData &&
//       (renderContainerLearned.innerHTML = `
//           <div class="sentence-container p-2">
//                 <p>
//                   You haven't learned the sentence yet!
//                 </p>
//             </div>
//         `);
//   }
// };

/**when loading page */
renderNewSentenceLearned(0);

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
    if (number === 0) {
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
  toLearnData = data && data.filter((sentence) => sentence.state === false);
  if (toLearnData.length > 0) {
    toLearnWordsNumber.innerText = toLearnData.length;
  } else {
    toLearnWordsNumber.innerText = "0";
  }
  if (learnedData.length > 0) {
    learnedWordsNumber.innerText = learnedData.length;
  } else {
    learnedWordsNumber.innerText = "0";
  }
  // learnedWordsNumber.innerText = learnedData.length;
  // toLearnWordsNumber.innerText = toLearnData.length;

  // Yeni data'yı localStorage'a atmak
  setLocalStorage("allSentencesData", updatedData);
  if (toLearnData.length > 0) {
    renderNewSentence(0);
    renderNewSentenceLearned(0);
  } else {
    runOutOfWords();
  }
};
