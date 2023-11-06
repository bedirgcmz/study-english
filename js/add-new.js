const autoRenderContainer = document.getElementById("auto-render-container");
const startButton = document.getElementById("start-button");
const TRinput = document.getElementById("input-turkish");
const ENinput = document.getElementById("input-english");
const keyWord1 = document.getElementById("input-key-word-1");
const keyWord2 = document.getElementById("input-key-word-2");
const keyWord3 = document.getElementById("input-key-word-3");

let data;
let toLearnData;
let learnedData;
let myLearnListData;
let autoNumber = 0;

/**
 * LocalStorage add and undo player list functions
 */
const setLocalStorage = (pStringKey, pArrar) => {
  localStorage.setItem(pStringKey, JSON.stringify(pArrar));
};
const getLocalStorage = (pStringKey) => {
  return JSON.parse(localStorage.getItem(pStringKey));
};

function coloredAndAdd(pTurkishSen, pEnglishSen) {
  const uniqId = new Date().getTime();
  const coloredTurkishSentence = colorSentences(pTurkishSen);
  const coloredEnglishSentence = colorSentences(pEnglishSen);

  let newSentences = {
    id: uniqId,
    sentence: coloredTurkishSentence,
    translate: coloredEnglishSentence,
    key_words: [keyWord1.value, keyWord2.value, keyWord3.value],
    language: "english",
    state: "empty",
  };

  const inLocalStorageData = getLocalStorage("allSentencesData");
  inLocalStorageData.push(newSentences);
  setLocalStorage("allSentencesData", inLocalStorageData);

  return [coloredTurkishSentence, coloredEnglishSentence];
}

const colorSentences = (pSentences) => {
  const redPattern = /(\*[^*]+\*)/g;
  const yellowPattern = /(&[^&]+&)/g;
  const bluePattern = /(~[^~]+~)/g;
  const purplePattern = /(%[^%]+%)/g;
  const grayPattern = /({[^{]+{)/g;
  const orangePattern = /(@[^@]+@)/g;
  const brownPattern = /(\++[^+]+\+)/g;
  const greenPattern = /(#[^#]+#)/g;

  const redClass = "red";
  const yellowClass = "yellow";
  const blueClass = "blue";
  const purpleClass = "purple";
  const grayClass = "gray";
  const orangeClass = "orange";
  const brownClass = "brown";
  const greenClass = "green";
  let coloredSentence = pSentences
    .replace(redPattern, '<w class="' + redClass + '">$1</w>')
    .replace(yellowPattern, '<w class="' + yellowClass + '">$1</w>')
    .replace(bluePattern, '<w class="' + blueClass + '">$1</w>')
    .replace(purplePattern, '<w class="' + purpleClass + '">$1</w>')
    .replace(grayPattern, '<w class="' + grayClass + '">$1</w>')
    .replace(orangePattern, '<w class="' + orangeClass + '">$1</w>')
    .replace(brownPattern, '<w class="' + brownClass + '">$1</w>')
    .replace(greenPattern, '<w class="' + greenClass + '">$1</w>')
    .replace(/[*&~%#@+{]/g, "");
  return coloredSentence;
};
const getSentences = () => {
  const TRvalue = TRinput.value;
  const ENvalue = ENinput.value;
  let result = coloredAndAdd(TRvalue, ENvalue);

  console.log(result);

  const TRsentences = document.getElementById("TR-sentences");
  const ENsentences = document.getElementById("EN-sentences");
  const addedInfo = document.getElementById("added-info");

  addedInfo.innerHTML =
    "Eklediğiniz cümlenin nasıl göründüğünü buradan görebilirsiniz. Ayrıca cümleniz <b>All Sentences</b> sayfasının en altında eklenmiştir.";
  TRsentences.innerHTML = result[0];
  ENsentences.innerHTML = result[1];
};

//textarea rows belirlemek
function adjustRowsBasedOnScreenSize() {
  const inputTurkish = document.getElementById("input-turkish");
  const inputEnglish = document.getElementById("input-english");
  if (window.innerWidth < 745) {
    inputTurkish.setAttribute("rows", "3");
    inputEnglish.setAttribute("rows", "3");
  } else {
    inputTurkish.setAttribute("rows", "2");
    inputEnglish.setAttribute("rows", "2");
  }
}

// Sayfa yüklendiğinde veya pencere boyutu değiştiğinde kontrol edilebilir.
window.addEventListener("resize", adjustRowsBasedOnScreenSize);
window.addEventListener("load", adjustRowsBasedOnScreenSize);
