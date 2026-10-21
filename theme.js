// Wrap everything in a function so our variable names stay private
(function () {

  // PART 1: add the dark mode styles to the page
  var style = document.createElement("style");
  style.innerText =
    // dark page background and text color
    "body.dark { background-color: #121826 !important; color: #e8ecf5 !important; }" +
    // dark mode heading colors
    "body.dark h1, body.dark h2, body.dark h3, body.dark label { color: #9db4ff !important; }" +
    // dark mode cards, boxes and list items
    "body.dark .card, body.dark .box, body.dark li { background-color: #1e2638 !important; color: #e8ecf5 !important; border-color: #9db4ff !important; }" +
    // brighter blue for skill badges and Open buttons in dark mode
    "body.dark .skill, body.dark .card a { background-color: #3b5bdb !important; color: white !important; }" +
    // the look and position of the button
    "#themeBtn { position: fixed; bottom: 15px; right: 15px; background-color: #444; color: white; border: none; border-radius: 20px; padding: 10px 16px; font-size: 14px; cursor: pointer; }";
  document.head.appendChild(style);

  // PART 2: make the button and put it on the page
  var button = document.createElement("button");
  button.id = "themeBtn";
  document.body.appendChild(button);

  // PART 3: change the button words to match the current mode
  function updateButton() {
    if (document.body.classList.contains("dark")) {
      button.innerText = "Light mode";
    } else {
      button.innerText = "Dark mode";
    }
  }

  // PART 4: when the page opens, use the saved choice
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  updateButton();

  // PART 5: when the button is clicked, switch mode and save it
  button.onclick = function () {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
    updateButton();
  };

})();