import countries from "./country.js";
import Trie from "./trie.js";

const trie = new Trie();

//inserting words in trie
for (let i = 0; i < countries.length; i++)
  trie.insert(countries[i].toLowerCase());

const inputElement = document.getElementsByClassName("container_input")[0];
const suggest = document.getElementsByClassName("container_suggestions")[0];
const fragment = document.createDocumentFragment();

suggest.style.display = "none";
let selectedOptionIndex = -1;

const debounce = (fn) => {
  let timeoutId;

  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, 500);
  };
};

const inputHandler = debounce(function (event) {
  fragment.innerHTML = "";
  suggest.innerHTML = "";
  suggest.style.display = "none";
  const inputValue = event.target.value;
  let suggestions = inputValue && trie.suggest(inputValue.toLowerCase());
  inputValue.length > 0 &&
    suggestions.forEach((element, index) => {
      const word = document.createElement("li");
      word.innerText = element;
      word.tabIndex = index + 1;
      word.className = "container_suggestions_word";
      fragment.append(word);
      suggest.style.display = "";
    });
  suggest.append(fragment);
});

inputElement.addEventListener("input", inputHandler);

inputElement.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key === "ArrowDown") {
    event.preventDefault();
    selectedOptionIndex = Math.min(
      selectedOptionIndex + 1,
      suggest.children.length - 1
    );
    updateSelectedOption();
  } else if (key === "ArrowUp") {
    event.preventDefault();
    selectedOptionIndex = Math.max(selectedOptionIndex - 1, -1);
    updateSelectedOption();
  } else if (key === "Enter" && selectedOptionIndex !== -1) {
    const selectedOptionText = suggest.children[selectedOptionIndex].innerText;
    inputElement.value = selectedOptionText;
    suggest.style.display = "none";
    selectedOptionIndex = -1;
  }
});

function updateSelectedOption() {
  for (let i = 0; i < suggest.children.length; i++) {
    if (i === selectedOptionIndex) {
      suggest.children[i].classList.add("selected");
    } else {
      suggest.children[i].classList.remove("selected");
    }
  }
}

inputElement.addEventListener("blur", function () {
  suggest.style.display = "none";
  selectedOptionIndex = -1;
});
