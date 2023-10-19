/* DOM elements */
const renderContainer = document.getElementById("render-container");
const getSentenceButton = document.getElementById("get-sentence");
const prevButton = document.getElementById("prev-sentence");
const nextButton = document.getElementById("next-sentence");

/* degiskenler */
let data;
let number = 0;

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
    data = jsonData;
    /* Page loadind firstly add a sentence */
    renderNewSentence(0);
  })
  .catch((error) => console.error("Hata:", error));

const renderNewSentence = (number) => {
  data &&
    (renderContainer.innerHTML = `
        <div class="sentence-container">
            <div class="sentences-and-icon px-2 my-3">
              <p>
                ${data[number].sentence}
              </p>
              <div class="d-flex align-items-center justfy-content-end">
                <i id=${data[number].id} onclick="openTranslate(this.id)" class="fa-solid fa-chevron-down open-icon px-2 mx-1"></i>
                <i id=${data[number].id} onclick="openTranslate(this.id)" class="fa-solid fa-chevron-up close-icon px-2 mx-1 d-none"></i>
                <i id=${data[number].id} onclick="readText(this.id)" class="fa-solid fa-volume-high read-icon p-2 mx-1"></i>
              </div>
            </div>
            <p id="trl${data[number].id}" class="translate px-2 py-3">
              ${data[number].translate}
            </p>
          </div>
      `);
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
  if (data) {
    if (number === 0) {
      number = data.length - 1;
      renderNewSentence(number);
    } else {
      number--;
      renderNewSentence(number);
    }
  }
};

const getNextSentence = () => {
  if (data) {
    if (number < data.length - 1) {
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

function readText(id) {
  var textToRead = document.getElementById(`trl${id}`).textContent;

  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(textToRead);

  synth.speak(utterThis);
}
