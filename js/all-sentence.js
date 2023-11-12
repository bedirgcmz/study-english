const allSentencesRender = document.getElementById("all-sentences-render");

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
      })"><i class="fa-solid fa-xmark pe-2"></i>Forget</button>
      <button class="add-to-learned" onclick="learnedSentenceInAllSentences(${
        pSentence.id
      })"><i class="fa-solid fa-check-double pe-2"></i>Learned</button>
      <button class="delete" onclick="doYouWantToDelete(${
        pSentence.id
      })"><i class="fa-solid fa-trash-can"></i></button>
      
    </div>
    </div> <br/>
    `;
};

/**
 * LocalStorage add and undo player list functions
 */
const setLocalStorage = (pStringKey, pArrar) => {
  localStorage.setItem(pStringKey, JSON.stringify(pArrar));
};
const getLocalStorage = (pStringKey) => {
  return JSON.parse(localStorage.getItem(pStringKey));
};

//Sayfa acildiginda local deki tum datanin render edilmesi
const fromLocalStrangeData = getLocalStorage("allSentencesData");
allSentencesRender.innerHTML = fromLocalStrangeData
  .reverse()
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

  // Yeni data'yı localStorage'a atmak
  setLocalStorage("allSentencesData", updatedData);
  allSentencesRender.innerHTML = updatedData
    .reverse()
    .map((sentence) => renderAllSentences(sentence))
    .join("");
};

/* Move sentence to learned content */
const learnedSentenceInAllSentences = (pId) => {
  const fromLocalStrangeData = getLocalStorage("allSentencesData");
  console.log(fromLocalStrangeData);

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
  console.log(data);
  // Yeni data'yı localStorage'a atmak
  setLocalStorage("allSentencesData", updatedData);
  allSentencesRender.innerHTML = updatedData
    .reverse()
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
    .reverse()
    .map((sentence) => renderAllSentences(sentence))
    .join("");
};

const deleteSentence = (pId) => {
  const inLocalStorageData = getLocalStorage("allSentencesData");
  const newData = inLocalStorageData.filter((sentence) => sentence.id !== pId);
  setLocalStorage("allSentencesData", newData);

  allSentencesRender.innerHTML = newData
    .reverse()
    .map((sentence) => renderAllSentences(sentence))
    .join("");
};

// Delete sentence
function doYouWantToDelete(pId) {
  Swal.fire({
    title: "Deletion Process",
    text: "Are you sure you want to delete this sentence?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, delete!",
    cancelButtonText: "No, cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteSentence(pId);
      Swal.fire("Great!", "You deleted sentence", "success");
    } else {
      Swal.fire("Deletion Canceled", "The sentence was saved", "info");
    }
  });
}

function applyFilter() {
  const filterSelect = document.getElementById("filterSelect");
  const selectedFilter = filterSelect.value;
  const fromLocalStrangeData = getLocalStorage("allSentencesData");
  let filteredData = [];

  switch (selectedFilter) {
    case "all":
      filteredData = fromLocalStrangeData;
      break;
    case "empty":
      filteredData = fromLocalStrangeData.filter(
        (item) => item.state === "empty"
      );
      break;
    case "true":
      filteredData = fromLocalStrangeData.filter((item) => item.state === true);
      break;
    case "false":
      filteredData = fromLocalStrangeData.filter(
        (item) => item.state === false
      );
      break;
    default:
      break;
  }
  allSentencesRender.innerHTML = filteredData
    .reverse()
    .map((sentence) => renderAllSentences(sentence))
    .join("");
  console.log(filteredData);
}
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
