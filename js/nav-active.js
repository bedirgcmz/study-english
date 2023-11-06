document.addEventListener("DOMContentLoaded", function () {
  var url = window.location.href;
  var filename = url.substring(url.lastIndexOf("/") + 1);
  var home = document.getElementById("home");
  var allSee = document.getElementById("see-all");
  var addNew = document.getElementById("add-new");
  var auto = document.getElementById("auto");

  /** here is for netlfy **/
  if (filename === "") {
    allSee.classList.remove("active");
    addNew.classList.remove("active");
    auto.classList.remove("active");
    home.classList.add("active");
  } else if (filename === "all-sentence") {
    home.classList.remove("active");
    addNew.classList.remove("active");
    auto.classList.remove("active");
    allSee.classList.add("active");
  } else if (filename === "add-new") {
    home.classList.remove("active");
    allSee.classList.remove("active");
    auto.classList.remove("active");
    addNew.classList.add("active");
  } else if (filename === "auto") {
    home.classList.remove("active");
    allSee.classList.remove("active");
    addNew.classList.remove("active");
    auto.classList.add("active");
  }

  /* here is for localhost */
  // if (filename === "index.html") {
  //   allSee.classList.remove("active");
  //   addNew.classList.remove("active");
  //   home.classList.add("active");
  // } else if (filename === "all-sentence.html") {
  //   home.classList.remove("active");
  //   addNew.classList.remove("active");
  //   allSee.classList.add("active");
  // } else if (filename === "add-new.html") {
  //   home.classList.remove("active");
  //   allSee.classList.remove("active");
  //   addNew.classList.add("active");
  // }
});
