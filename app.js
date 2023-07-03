import countries from "./country.js";

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  findWords(node, prefix, suggestions) {
    if (node.isEndOfWord) {
      suggestions.push(prefix);
    }

    for (const key in node.children) {
      const char = key;
      this.findWords(node.children[key], prefix + char, suggestions);
    }
  }

  suggest(prefix) {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }

    const suggestions = [];
    this.findWords(node, prefix, suggestions);
    return suggestions;
  }
}

// Usage example
const trie = new Trie();
for (let i = 0; i < countries.length; i++)
  trie.insert(countries[i].toLowerCase());

const inputElement = document.getElementsByClassName("container_input")[0];
const suggest = document.getElementsByClassName("container_suggestions")[0];
const fragment = document.createDocumentFragment();
suggest.style.display = "none";
let selectedOptionIndex = -1;

inputElement.addEventListener("input", function (event) {
  fragment.innerHTML = "";
  suggest.innerHTML = "";
  suggest.style.display = "none";
  const inputValue = event.target.value;
  let suggestions = trie.suggest(inputValue.toLowerCase());
  inputValue &&
    suggestions.forEach((element, index) => {
      suggest.style.display = "";
      const word = document.createElement("li");
      word.innerText = element;
      word.tabIndex = index + 1;
      word.className = "container_suggestions_word";
      fragment.append(word);
    });
  suggest.append(fragment);
});

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
