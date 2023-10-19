/* DOM elements */
const renderContainerLearned = document.getElementById(
  "render-container-learned"
);
const prevButtonLearned = document.getElementById("prev-sentence-learned");
const nextButtonLearned = document.getElementById("next-sentence-learned");

/* degiskenler */
let allData;
let numberLearned = 0;
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
    allData = jsonData;
    learnedData =
      allData && allData.filter((sentence) => sentence.state == true);
    /* Page loadind firstly add a sentence */
    renderNewSentenceLearned(0);
  })
  .catch((error) => console.error("Hata:", error));

const renderNewSentenceLearned = (numberLearned) => {
  learnedData &&
    (renderContainerLearned.innerHTML = `
        <div class="sentence-container">
            <div class="sentences-and-icon px-2 my-3">
              <p>
                ${learnedData[numberLearned].sentence}
              </p>
              <div class="d-flex align-items-center justfy-content-end">
                <i id="${learnedData[numberLearned].id}-learned" onclick="openTranslateLearned(this.id)" class="fa-solid fa-chevron-down open-icon-learned px-2 mx-1"></i>
                <i id="${learnedData[numberLearned].id}-learned" onclick="openTranslateLearned(this.id)" class="fa-solid fa-chevron-up close-icon-learned px-2 mx-1 d-none"></i>
                <i id="${learnedData[numberLearned].id}-learned" onclick="readText(this.id)" class="fa-solid fa-volume-high read-icon-learned p-2 mx-1"></i>
              </div>
            </div>
            <p id="trl${learnedData[numberLearned].id}-learned" class="translate px-2 py-3">
              ${learnedData[numberLearned].translate}
            </p>
          </div>
      `);
};
const openTranslateLearned = (id) => {
  const targetElement = document.getElementById(`trl${id}`);
  console.log(`trl${id}`);
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
    if (numberLearned === 0) {
      numberLearned = learnedData.length - 1;
      renderNewSentenceLearned(numberLearned);
    } else {
      numberLearned--;
      renderNewSentenceLearned(numberLearned);
    }
  }
};

const getNextSentenceLearned = () => {
  if (learnedData) {
    if (numberLearned < learnedData.length - 1) {
      numberLearned++;
      renderNewSentenceLearned(numberLearned);
    } else {
      numberLearned = 0;
      renderNewSentenceLearned(numberLearned);
    }
  }
};

/* This event get a new sentence */
prevButtonLearned.addEventListener("click", getPrevSentenceLearned);
nextButtonLearned.addEventListener("click", getNextSentenceLearned);

/* Read text function */
function readText(id) {
  var textToRead = document.getElementById(`trl${id}`).textContent;

  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(textToRead);

  synth.speak(utterThis);
}
