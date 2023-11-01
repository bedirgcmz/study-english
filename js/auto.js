const autoRenderContainer = document.getElementById("auto-render-container");
// const getSentenceButton = document.getElementById("get-sentence");
// const prevButton = document.getElementById("prev-sentence");
// const nextButton = document.getElementById("next-sentence");
const startButton = document.getElementById("start-button");

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
    if (localStorage.getItem("allSentencesData") === null) {
      jsonData && setLocalStorage("allSentencesData", jsonData);
    }

    data = getLocalStorage("allSentencesData");
    toLearnData = data && data.filter((sentence) => sentence.state === "empty");
    learnedData = data && data.filter((sentence) => sentence.state === true);
    myLearnListData =
      data && data.filter((sentence) => sentence.state === false);
    myLearnListData && console.log(myLearnListData);
  })
  .catch((error) => console.error("Hata:", error));

const autoRenderNewSentence = (pNumber) => {
  if (myLearnListData.length > 0 && autoRenderContainer !== null) {
    myLearnListData &&
      (autoRenderContainer.innerHTML = `
          <div class="sentence-container">
              <div class="sentences-and-icon my-1">                
                <div class="d-flex flex-column align-items-center justfy-content-end">
                  <i id="readTR${myLearnListData[pNumber].id}" onclick="readTrText(${myLearnListData[pNumber].id})" class="d-none fa-solid fa-volume-high read-icon p-2 mx-1 mb-2"></i>
                  <p id="TR${myLearnListData[pNumber].id}">${myLearnListData[pNumber].sentence}</p>
                  <i id="readEN${myLearnListData[pNumber].id}" onclick="readEnText(${myLearnListData[pNumber].id})" class="d-none fa-solid fa-volume-high read-icon p-2 mx-1 mb-2"></i>
                  <p id="EN${myLearnListData[pNumber].id}" class="px-2 py-3">${myLearnListData[pNumber].translate}</p>
                 </div>
              </div>
            </div>
        `);
  } else {
    autoRunOutOfWords();
  }
};

const autoRunOutOfWords = () => {
  if (autoRenderContainer !== null) {
    autoRenderContainer.innerHTML = `
          <div class="sentence-container">
              <div class="sentences-and-icon px-2 my-3">
                <p>
                  Your learning list is currently empty.
                </p>             
            </div>
        `;
  }
};

/* Read text function */
function readTrText(pId) {
  const textToRead = document.getElementById(`TR${pId}`).textContent;

  // // responsiveVoice.speak(textToRead, "Turkish Female");
  console.log(textToRead);
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(textToRead);

  // Dil ayarını belirtin
  utterThis.lang = "tr-TR";
  utterThis.voiceURI = "yelda";
  console.log(utterThis);
  synth.speak(utterThis);
}
function readEnText(pId) {
  const textToRead = document.getElementById(`EN${pId}`).textContent;

  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(textToRead);
  utterThis.lang = "sp";

  console.log(utterThis);

  synth.speak(utterThis);
}

const autoRead = () => {
  console.log("auto calisti");

  const autoReadProcess = () => {
    console.log("interval calisti");
    setTimeout(() => {
      autoRenderNewSentence(autoNumber);
    }, 300);

    setTimeout(() => {
      const trButton = document.getElementById(
        `readTR${myLearnListData[autoNumber].id}`
      );
      const enButton = document.getElementById(
        `readEN${myLearnListData[autoNumber].id}`
      );

      setTimeout(() => {
        trButton.click();
      }, 1000);

      setTimeout(() => {
        enButton.click();
      }, 6000);
    }, 2000);

    setTimeout(() => {
      if (autoNumber < myLearnListData.length) {
        autoNumber++;
      } else {
        autoNumber = 0;
      }
    }, 10000);
  };
  autoReadProcess();
  setInterval(autoReadProcess, 11000);
};

startButton.addEventListener("click", autoRead);
