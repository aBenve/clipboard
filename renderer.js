const { clipboard } = require("electron");

// clipboard history
var history = [];

function toHTML(text) {
  const list = document.getElementById("myList");
  var box = document.createElement("a");
  var newClip = document.createElement("pre");

  //events
  newClip.addEventListener("click", () => {
    clipboard.writeText(text);
    window.scrollTo(0, 0);
  });

  // styling
  newClip.textContent = text;
  newClip.classList.add("list-group-item", "list-group-item-action");
  newClip.style.marginBottom = "0";
  //newClip.style.background = "transparent";
  //newClip.style.color = "#222222";
  newClip.style.border = "1";
  newClip.style.padding = "1,1,0.5,0.5";

  //sending
  box.appendChild(newClip);
  // at the top of the list
  list.insertBefore(newClip, list.childNodes[0]);
  //list.appendChild(box);
}
function newClip(history) {
  setInterval(() => {
    const text = clipboard.readText();
    if (history[history.length - 1] !== text) {
      toHTML(text);
      history.push(text);
    }
  }, 500);
}

newClip(history);
