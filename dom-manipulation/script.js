// Sample quotes
let quotes = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    category: "Motivation",
  },
  { text: "Don't let yesterday take up much of today.", category: "Wisdom" },
  {
    text: "It's not whether you get knocked down, it's whether you get up.",
    category: "Resilience",
  },
  {
    text: "The only way to do great work is to love what you do.",
    category: "Work",
  },
  {
    text: "Life is what happens to you while you are busy making other plans.",
    category: "Life",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    category: "Dreams",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    category: "Inspiration",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    category: "Success",
  },
];

// Function to create the add quote form
function createAddQuoteForm() {
  if (document.querySelector(".form-section")) return; // don't create again
  // Find the container where we want to put the form
  let container = document.getElementById("form-container");

  // Create elements using createElement
  let formSection = document.createElement("div");
  formSection.className = "form-section";

  let heading = document.createElement("h3");
  heading.textContent = "Add Your Own Quote";

  let inputContainer = document.createElement("div");

  let textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  let categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  let addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  // Append elements to build the structure
  inputContainer.appendChild(textInput);
  inputContainer.appendChild(categoryInput);
  inputContainer.appendChild(addButton);

  formSection.appendChild(heading);
  formSection.appendChild(inputContainer);

  container.appendChild(formSection);
}

// --- Session Storage Helpers ---
function saveLastQuoteToSession(quote) {
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

function loadLastQuoteToSession() {
  let lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    let parsed = JSON.parse(lastQuote);
    let quoteBox = document.getElementById("quoteDisplay");
    quoteBox.innerHTML = `
      <div class='quote-text'>"${parsed.text}"</div>
      <div class='quote-category'>Category: ${parsed.category}</div>
    `;
  }
}

// Function to show a random quote
function showRandomQuote() {
  // Pick a random number between 0 and the number of quotes we have
  let randomIndex = Math.floor(Math.random() * quotes.length);
  // Get the quote at that random position
  let selectedQuote = quotes[randomIndex];
  // Find the box where we want to show the quote
  let quoteBox = document.getElementById("quoteDisplay");

  // Put the quote in the box with nice formatting
  quoteBox.innerHTML = `
        <div class="quote-text">"${selectedQuote.text}"</div>
        <div class="quote-category">Category: ${selectedQuote.category}</div>
    `;

  // Save last shown quote in session storage
  saveLastQuoteToSession(selectedQuote);
}

// --- Local Storage Helpers ---
function saveQuotesToLocal() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotesFromLocal() {
  let storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Function to add a new quote
function addQuote() {
  // Get what the user typed in the text boxes
  let newText = document.getElementById("newQuoteText").value;
  let newCategory = document.getElementById("newQuoteCategory").value;

  // Check if they actually typed something
  if (newText.trim() === "" || newCategory.trim() === "") {
    alert("Please fill in both the quote and category!");
    return;
  }

  //Add the new quote to the list
  quotes.push({
    text: newText,
    category: newCategory,
  });

  //Save updated list to localStorage
  saveQuotesToLocal();

  //   Clear the text boxes
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  //   Show a success message
  alert("Quote added successfully!");

  //   Show the new quote immediately
  showRandomQuote();
}

// Make the buttons work
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document
  .getElementById("showFormButton")
  .addEventListener("click", createAddQuoteForm);

//Load quotes from localStorage if available
loadQuotesFromLocal();
loadLastQuoteToSession(); // get the last quote seen

// Show a quote when the page first loads
showRandomQuote();
