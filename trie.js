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

export default Trie;
