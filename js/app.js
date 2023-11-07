/* DOM elements */
const renderContainer = document.getElementById("render-container");
const prevButton = document.getElementById("prev-sentence");
const nextButton = document.getElementById("next-sentence");
const totalSentences = document.getElementById("total-sentences");
const totalSentencesLearned = document.getElementById(
  "total-sentences-learned"
);
const toLearnWordsNumber = document.getElementById("to-learn-words-number");
const learnedWordsNumber = document.getElementById("learned-words-number");
const updateButton = document.getElementById("update-button");

/* degiskenler */
let data;
let number = 0;
let toLearnData;
let learnedData;
let myLearnListData;

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

    data = getLocalStorage("allSentencesData");
    toLearnData = data && data.filter((sentence) => sentence.state === "empty");
    learnedData = data && data.filter((sentence) => sentence.state === true);
    myLearnListData =
      data && data.filter((sentence) => sentence.state === false);

    if (toLearnWordsNumber !== null && learnedWordsNumber !== null) {
      toLearnWordsNumber.innerText = myLearnListData.length;
      learnedWordsNumber.innerText = learnedData.length;
    }

    /* Page loadind firstly add a sentence */
    renderNewSentence(0);
    renderNewSentenceLearned(0);
  })
  .catch((error) => console.error("Hata:", error));

const renderNewSentence = (number) => {
  //totalSentences elemti varsa lenghtine gore text yazdirma
  if (totalSentences !== null) {
    if (myLearnListData.length === 0) {
      totalSentences.innerText = `0/0`;
    } else {
      totalSentences.innerText = `${number + 1}/${myLearnListData.length}`;
    }
  }

  if (myLearnListData.length > 0 && renderContainer !== null) {
    myLearnListData &&
      (renderContainer.innerHTML = `
          <div class="sentence-container">
              <div class="sentences-and-icon my-1">
                <p>
                  ${myLearnListData[number].sentence}
                </p>
                <div class="d-flex flex-column align-items-center justfy-content-end">
                  <i id="open${myLearnListData[number].id}" onclick="openTranslate(${myLearnListData[number].id})" class="fa-solid fa-chevron-down open-icon px-2 mx-1 mb-2"></i>
                  <i id="close${myLearnListData[number].id}" onclick="openTranslate(${myLearnListData[number].id})" class="fa-solid fa-chevron-up close-icon px-2 mx-1 d-none mb-2"></i>
                  <i id="read${myLearnListData[number].id}" onclick="readText(${myLearnListData[number].id})" class="fa-solid fa-volume-high read-icon p-2 mx-1 mb-2"></i>
                  <i id="learned${myLearnListData[number].id}" onclick="learnedSentence(${myLearnListData[number].id})" class="fa-solid fa-check learned-icon"></i>
                 </div>
              </div>
              <p id="trlLearn${myLearnListData[number].id}" class="translate px-2 py-3">
                ${myLearnListData[number].translate}
              </p>
            </div>
        `);
  } else {
    runOutOfWords();
  }
};

const runOutOfWords = () => {
  if (renderContainer !== null) {
    renderContainer.innerHTML = `
          <div class="sentence-container">
              <div class="sentences-and-icon px-2 my-3">
                <p>
                  Your learning list is currently empty.
                </p>             
            </div>
        `;
  }
};

const openTranslate = (pId) => {
  const targetElement = document.getElementById(`trlLearn${pId}`);
  const openIcon = document.getElementById(`open${pId}`);
  const closeIcon = document.getElementById(`close${pId}`);

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
  if (myLearnListData) {
    if (number <= 0) {
      number = myLearnListData.length - 1;
      renderNewSentence(number);
    } else {
      number--;
      renderNewSentence(number);
    }
  }
};

const getNextSentence = () => {
  if (myLearnListData) {
    if (number < myLearnListData.length - 1) {
      number++;
      renderNewSentence(number);
    } else {
      number = 0;
      renderNewSentence(number);
    }
  }
};

/* This event get a new sentence */
if (prevButton !== null && nextButton !== null) {
  prevButton.addEventListener("click", getPrevSentence);
  nextButton.addEventListener("click", getNextSentence);
}

/* Read text function */
function readText(pId) {
  const textToRead = document.getElementById(`trlLearn${pId}`).textContent;

  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(textToRead);

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

/********************* */
const renderNewSentenceLearned = (number) => {
  if (totalSentencesLearned !== null) {
    if (learnedData.length === 0) {
      totalSentencesLearned.innerText = `0/0`;
    } else {
      totalSentencesLearned.innerText = `${number + 1}/${learnedData.length}`;
    }
  }

  if (learnedData.length > 0 && renderContainerLearned !== null) {
    learnedData &&
      (renderContainerLearned.innerHTML = `
          <div class="sentence-container">
              <div class="sentences-and-icon px-2 my-3">
                <p>
                  ${learnedData[number].sentence}
                </p>
                <div class="d-flex flex-column align-items-center justfy-content-end">
                  <i id="${learnedData[number].id}-learned" onclick="openTranslateLearned(this.id)" class="fa-solid fa-chevron-down open-icon-learned px-2 mx-1 mb-2"></i>
                  <i id="${learnedData[number].id}-learned" onclick="openTranslateLearned(this.id)" class="fa-solid fa-chevron-up close-icon-learned px-2 mx-1 mb-2 d-none"></i>
                  <i id="${learnedData[number].id}-learned" onclick="readTextLearned(this.id)" class="fa-solid fa-volume-high read-icon-learned p-2 mx-1 mb-2"></i>
                  <i id=${learnedData[number].id} onclick="forgotSentence(${learnedData[number].id})" class="fa-solid fa-xmark unlearned-icon"></i>
                </div>
              </div>
              <p id="trl${learnedData[number].id}-learned" class="translate px-2 py-3">
                ${learnedData[number].translate}
              </p>
            </div>
        `);
  } else {
    learnedData &&
      (renderContainerLearned.innerHTML = `
          <div class="sentence-container p-2">
                <p>
                  You haven't learned the sentence yet!
                </p> 
            </div>
        `);
  }
};
/************************** */
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
  toLearnData = data && data.filter((sentence) => sentence.state === "empty");
  learnedData = data && data.filter((sentence) => sentence.state === true);
  myLearnListData = data && data.filter((sentence) => sentence.state === false);

  if (toLearnWordsNumber !== null && learnedWordsNumber !== null) {
    toLearnWordsNumber.innerText = myLearnListData.length;
    learnedWordsNumber.innerText = learnedData.length;
  }

  // Yeni data'yı localStorage'a atmak
  setLocalStorage("allSentencesData", updatedData);

  //
  if (learnedData.lenght !== 0) {
    renderNewSentenceLearned(0);
  }
  // if (myLearnListData.length === 0) {
  //   renderNewSentence(0);
  //   // runOutOfWords();
  // } else {
  // }
  renderNewSentence(0);
};

/**When data updated, it clear localstorage */
if (updateButton !== null) {
  updateButton.addEventListener("click", updateData);
}
/******************* */

// // // let mergedData;

// // // const fetchData2 = async () => {
// // //   try {
// // //     const response = await fetch("data.json");
// // //     const jsonData = await response.json();

// // //     if (getLocalStorage("allSentencesData") === null) {
// // //       setLocalStorage("allSentencesData", jsonData);
// // //     }

// // //     // localStorage'daki veriyi al
// // //     let localStorageData = getLocalStorage("allSentencesData");

// // //     // localStorage'daki veri ile gelen JSON verisini birleştir
// // //     mergedData = localStorageData.map((item) => {
// // //       let localItem = jsonData.find((localItem) => localItem.id === item.id);
// // //       return localItem ? localItem : item;
// // //     });

// // //     // localStorage'a birleştirilmiş veriyi kaydet
// // //     setLocalStorage("allSentencesData", mergedData);

// // //     data = getLocalStorage("allSentencesData");
// // //     toLearnData = data && data.filter((sentence) => sentence.state === "empty");
// // //     learnedData = data && data.filter((sentence) => sentence.state === true);
// // //     myLearnListData =
// // //       data && data.filter((sentence) => sentence.state === false);

// // //     if (toLearnWordsNumber !== null && learnedWordsNumber !== null) {
// // //       toLearnWordsNumber.innerText = myLearnListData.length;
// // //       learnedWordsNumber.innerText = learnedData.length;
// // //     }

// // //     renderNewSentence(0);
// // //     renderNewSentenceLearned(0);
// // //   } catch (error) {
// // //     console.error("Hata:", error);
// // //   }
// // // };

//yeni fetch start
async function updateFetchData() {
  try {
    // Veriyi asenkron olarak al
    const response = await fetch("data.json");
    const jsonData = await response.json();

    // LocalStorage'dan mevcut veriyi al
    const localData = getLocalStorage("allSentencesData") || [];

    // Yeni gelen veriyi kontrol et
    const updatedData = [...localData, ...jsonData];
    const uniqueData = [...new Set(updatedData.map(JSON.stringify))].map(
      JSON.parse
    );

    // Yeni veriyi LocalStorage'e kaydet
    setLocalStorage("allSentencesData", uniqueData);

    // return uniqueData;
  } catch (error) {
    console.error("Hata oluştu:", error);
  }
}

//yeni fetch finish

/**************** */
function updateData() {
  Swal.fire({
    title: "Data Update Confirmation",
    text: "Are you sure you want to update your data?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, update!",
    cancelButtonText: "No, cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      // Kullanıcı "Evet, Güncelle" dediğinde yapılacak işlemler
      updateFetchData();
      setTimeout(() => {
        location.reload();
      }, 4000);
      Swal.fire(
        "Great!",
        "You have successfully updated your data. You can now create a learning list from the All Sentences page.",
        "success"
      );
    } else {
      // Kullanıcı "Hayır, İptal" dediğinde yapılacak işlemler
      Swal.fire(
        "Transaction Canceled",
        "Your existing data information has not been changed.",
        "info"
      );
    }
  });
}

const welcome = () => {
  Swal.fire({
    title: "Hi",
    text: "Please make a Learning List on the All Sentences page to learn",
    icon: "info",
    showCancelButton: false,
    confirmButtonText: "Ok, I will",
  });
};

setTimeout(() => {
  if (myLearnListData.length === 0) {
    welcome();
  }
}, 4000);
