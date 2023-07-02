# TypeAhead or Autocomplete Search using Trie

## What is Trie ?

<ul> 
<li>A data structure also known as Prefix or Radix tree.</li> 
<li>Useful for processing & storing strings and is primarily used for word retrieval.</li>
<li>The nodes in the TRIE Data Structure are used for storing the associate keys of strings and values that are being stored in the TRIE.</li>
<li>A TRIE can contain a maximum of 26 nodes (from A-Z alphabet nodes).</li>
<li>A TRIE of Order 26 can maintain a whole English dictionary.</li>
</ol>

[![download-3.png](https://i.postimg.cc/bv54b2fp/download-3.png)](https://postimg.cc/JybTC0h2)

## Inserting words in a Trie

<br/>
Imagine you have a special way to store words like a big puzzle. Each word is made up of letters, and we want to put these letters in the right place in our puzzle so that we can find words easily.

So, let's say we have a word, like "apple." To store it in our puzzle, we need to put each letter in the right spot. First, we put the letter "a" in the starting position of the puzzle. Then, we put the letter "p" after "a" because "p" comes after "a" in the word. We continue this process for each letter of the word, placing them one after another.

[![image.png](https://i.postimg.cc/15SHJx6L/image.png)](https://postimg.cc/8syMz0ZH)

To make sure we can find the word later, we mark the last letter of the word as the end of a word. In our case, the last letter is "e" in "apple." We put a special mark to indicate that "e" is the end of the word "apple."

[![image.png](https://i.postimg.cc/9ffV9NJ9/image.png)](https://postimg.cc/87xqQw8k)

Now, imagine we have another word, like "apply." We follow the same process. We put the first letter "a" after the existing "a" in the puzzle. Then we put "p" after the existing "p," and so on, until we reach the end of the word "apply." We mark the last letter "y" as the end of the word "apply" just like we did with "apple."

[![image.png](https://i.postimg.cc/PfpztXzG/image.png)](https://postimg.cc/bdP2gjBL)

By doing this for many words, we create a puzzle where we can easily find any word we want. We connect the letters in the right order, and we mark the last letter of each word as the end of that word.

That's what the `insert` method does in our Trie class. It takes a word and puts each letter in the right place in our puzzle. It connects the letters and marks the last letter as the end of the word. This way, we can store and find words quickly when we want to.

I hope that helps you understand the `insert` method! 
<br/>
<br/>

## Typeahead suggestions using a Trie
<br/>

Now, we have stored two words "apple" and "apply" in this trie structure.

So, if someone types "ap", using trie we can traverse each node letter by letter.

We have "a" followed by "p" in our trie but it is not the end node, so we will traverse till the end.

Here, at end we have two children "e" and "y", so we will traverse to each child and finally we get two words "apple" and "apply" starting with "ap".

