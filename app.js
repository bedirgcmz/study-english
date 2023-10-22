/* DOM elements */
const renderContainer = document.getElementById("render-container");
const getSentenceButton = document.getElementById("get-sentence");
const prevButton = document.getElementById("prev-sentence");
const nextButton = document.getElementById("next-sentence");
const toLearnWordsNumber = document.getElementById("to-learn-words-number");
const learnedWordsNumber = document.getElementById("learned-words-number");

/* degiskenler */
let data;
let number = 0;
let toLearnData;
let learnedData;

async function fetchData() {
  try {
    const response = await fetch("data.json");
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw new Error("Veri alınamadı: " + error);
  }
}

fetchData()
  .then((jsonData) => {
    // data = jsonData;
    if (localStorage.getItem("allSentencesData") === null) {
      jsonData && setLocalStorage("allSentencesData", jsonData);
    }
    // setLocalStorage("allSentencesData", jsonData);
    data = getLocalStorage("allSentencesData");
    toLearnData = data && data.filter((sentence) => sentence.state === false);
    if (toLearnData.length > 0) {
      toLearnWordsNumber.innerText = toLearnData.length;
    } else {
      toLearnWordsNumber.innerText = "0";
    }

    /* Page loadind firstly add a sentence */
    renderNewSentence(0);
  })
  .catch((error) => console.error("Hata:", error));

if (toLearnData) {
}

const renderNewSentence = (number) => {
  if (toLearnData.length > 0) {
    toLearnData &&
      (renderContainer.innerHTML = `
          <div class="sentence-container">
              <div class="sentences-and-icon my-1">
                <p>
                  ${toLearnData[number].sentence}
                </p>
                <div class="d-flex flex-column align-items-center justfy-content-end">
                  <i id=${toLearnData[number].id} onclick="openTranslate(this.id)" class="fa-solid fa-chevron-down open-icon px-2 mx-1 mb-2"></i>
                  <i id=${toLearnData[number].id} onclick="openTranslate(this.id)" class="fa-solid fa-chevron-up close-icon px-2 mx-1 d-none mb-2"></i>
                  <i id=${toLearnData[number].id} onclick="readText(this.id)" class="fa-solid fa-volume-high read-icon p-2 mx-1 mb-2"></i>
                  <i id=${toLearnData[number].id} onclick="learnedSentence(${toLearnData[number].id})" class="fa-solid fa-check learned-icon"></i>
                </div>
              </div>
              <p id="trl${toLearnData[number].id}" class="translate px-2 py-3">
                ${toLearnData[number].translate}
              </p>
            </div>
        `);
  } else {
    runOutOfWords();
  }
};

const runOutOfWords = () => {
  renderContainer.innerHTML = `
        <div class="sentence-container">
            <div class="sentences-and-icon px-2 my-3">
              <p>
                Well Done! You run out of to learn sentences.
              </p>             
          </div>
      `;
};

const openTranslate = (id) => {
  const targetElement = document.getElementById(`trl${id}`);
  const openIcon = document.getElementById(id);
  const closeIcon = document.querySelector(".close-icon");
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

const getPrevSentence = () => {
  if (toLearnData) {
    if (number === 0) {
      number = toLearnData.length - 1;
      renderNewSentence(number);
    } else {
      number--;
      renderNewSentence(number);
    }
  }
};

const getNextSentence = () => {
  if (toLearnData) {
    if (number < toLearnData.length - 1) {
      number++;
      renderNewSentence(number);
    } else {
      number = 0;
      renderNewSentence(number);
    }
  }
};

/* This event get a new sentence */
prevButton.addEventListener("click", getPrevSentence);
nextButton.addEventListener("click", getNextSentence);

/* Read text function */
function readText(id) {
  var textToRead = document.getElementById(`trl${id}`).textContent;

  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(textToRead);

  synth.speak(utterThis);
}

/**
 * LocalStorage add and undo player list functions
 */
const setLocalStorage = (pStringKey, pArrar) => {
  localStorage.setItem(pStringKey, JSON.stringify(pArrar));
};
const getLocalStorage = (pStringKey) => {
  return JSON.parse(localStorage.getItem(pStringKey));
};

/*If there is no array in localstorage, it will be thrown there first,
It will be rendered later. If there is an array, it will be rendered directly.*/
if (localStorage.getItem("allSentencesData") === null) {
  data && setLocalStorage("allSentencesData", data);
}

/* Move sentence to learned content */
const learnedSentence = (pId) => {
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
  toLearnData = data && data.filter((sentence) => sentence.state === false);
  learnedData = data && data.filter((sentence) => sentence.state === true);
  toLearnWordsNumber.innerText = toLearnData.length;
  learnedWordsNumber.innerText = learnedData.length;

  // Yeni data'yı localStorage'a atmak
  setLocalStorage("allSentencesData", updatedData);
  if (toLearnData.length > 0) {
    renderNewSentence(0);
    renderNewSentenceLearned(0);
  } else {
    runOutOfWords();
  }
};

/**When data updated, it clear localstorage */
// localStorage.clear();
