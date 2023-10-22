const toLearnArea = document.getElementById("to-learn-open-close-container");
const learnedArea = document.getElementById("learned-open-close-container");
const viewToLearnCheckbox = document.getElementById("view-to-learn");
const viewLearnedCheckbox = document.getElementById("view-learned");

document.addEventListener("DOMContentLoaded", function () {
  function updateVisibility() {
    toLearnArea.classList.toggle("close", viewToLearnCheckbox.checked);
    learnedArea.classList.toggle("close", viewLearnedCheckbox.checked);
  }
  viewToLearnCheckbox.addEventListener("change", updateVisibility);
  viewLearnedCheckbox.addEventListener("change", updateVisibility);
});
