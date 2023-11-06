const autoRenderContainer = document.getElementById("auto-render-container");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const TRinput = document.getElementById("input-turkish");
const ENinput = document.getElementById("input-english");

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

  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(textToRead);

  // Dil ayarını belirtin
  utterThis.lang = "tr";

  synth.speak(utterThis);
}
function readEnText(pId) {
  const textToRead = document.getElementById(`EN${pId}`).textContent;

  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(textToRead);

  synth.speak(utterThis);
}

let autoReadInterval;
let isAutoReading = false;

const autoReadProcess = () => {
  const trReadTime = Math.min(
    12000,
    1000 * Math.ceil(myLearnListData[autoNumber].sentence.length / 5)
  );
  const enReadTime = 5000;

  autoRenderNewSentence(autoNumber);
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
  }, trReadTime + 1000);

  setTimeout(() => {
    if (autoNumber < myLearnListData.length - 1) {
      autoNumber++;
      if (isAutoReading) {
        autoReadProcess(); // Yeni işlemi başlat
      }
    } else {
      autoNumber = 0;
      if (isAutoReading) {
        autoReadProcess(); // Yeni işlemi başlat
      }
    }
  }, trReadTime + enReadTime + 4000);
};

const startAutoRead = () => {
  isAutoReading = true;
  autoReadProcess();
};

const stopAutoRead = () => {
  isAutoReading = false;
};

startButton.addEventListener("click", startAutoRead);
stopButton.addEventListener("click", stopAutoRead);

// // let autoReadInterval;

// // const autoReadProcess = () => {
// //   const trReadTime =
// //     1000 * Math.ceil(myLearnListData[autoNumber].sentence.length / 5);
// //   const enReadTime = 5000;

// //   setTimeout(() => {
// //     autoRenderNewSentence(autoNumber);
// //   }, 300);

// //   setTimeout(() => {
// //     const trButton = document.getElementById(
// //       `readTR${myLearnListData[autoNumber].id}`
// //     );
// //     const enButton = document.getElementById(
// //       `readEN${myLearnListData[autoNumber].id}`
// //     );

// //     setTimeout(() => {
// //       trButton.click();
// //     }, 1000);

// //     setTimeout(() => {
// //       enButton.click();
// //     }, trReadTime + 1000);
// //   }, 2000);

// //   setTimeout(() => {
// //     if (autoNumber < myLearnListData.length) {
// //       autoNumber++;
// //     } else {
// //       autoNumber = 0;
// //     }
// //   }, trReadTime + enReadTime + 4000);
// // };

// // const autoRead = () => {
// //   autoReadProcess();
// //   autoReadInterval = setInterval(autoReadProcess, 11000);
// // };

// // const stopAutoRead = () => {
// //   clearInterval(autoReadInterval);
// // };

// // startButton.addEventListener("click", autoRead);
// // stopButton.addEventListener("click", stopAutoRead);
