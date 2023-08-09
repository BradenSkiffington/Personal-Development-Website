document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu-icon");
  const sidenav = document.querySelector(".sidenav");
  const content = document.querySelector(".content");
  const sidenavLinks = document.querySelectorAll(".sidenav ul li a");

  menuIcon.addEventListener("click", function () {
    sidenav.classList.toggle("active");
    content.classList.toggle("active");
  });

  sidenavLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior

      // Remove "active" class from all links
      sidenavLinks.forEach((link) => link.classList.remove("active"));

      // Add "active" class to the clicked link
      this.classList.add("active");

      const href = this.getAttribute("href");
      setTimeout(() => {
        window.location.href = href; // Navigate to the linked page after a short delay
      }, 300); // Adjust the delay time (in milliseconds) to match any animations/transition timings
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const imageWrapper = document.getElementById("image-wrapper");
  const scrollbar = document.querySelector(".scrollbar");

  // Calculate scrollbar height based on image count
  const imageCount = imageWrapper.children.length;
  scrollbar.style.height = `${100 / imageCount}%`;

  // Add event listener to the image container for scrolling effect
  imageWrapper.addEventListener("scroll", function () {
    const scrollPercentage =
      (imageWrapper.scrollLeft /
        (imageWrapper.scrollWidth - imageWrapper.clientWidth)) *
      100;
    scrollbar.style.top = `${scrollPercentage}%`;
  });

  // Add mouse wheel event listener for horizontal scrolling
  imageWrapper.addEventListener("wheel", function (event) {
    event.preventDefault();
    imageWrapper.scrollLeft += event.deltaY;
  });
});

const funnyQuotes = [
  {
    quote:
      "I'm not great at advice. Can I interest you in a sarcastic comment?",
    author: "Chandler Bing",
  },
  {
    quote: "The first time I see a jogger smiling, I'll consider it.",
    author: "Joey Tribbiani",
  },
  {
    quote:
      "Im not offended by blonde jokes because I know Im not dumb…and I also know that I’m not blonde",
    author: "Dolly Parton",
  },
  {
    quote: "Behind every great man, there is a woman rolling her eyes.",
    author: "Jim Carrey",
  },
  {
    quote:
      "I think gay marriage is something that should be between a man and a woman.",
    author: "Arnold Schwarzenegger",
  },
  {
    quote: "If you're gonna be two-faced at least make one of them pretty.",
    author: "Marilyn Monroe",
  },
  {
    quote: "I'm sorry, if you were right, I'd agree with you.",
    author: "Robin Williams",
  },
  {
    quote: "I'm on the whisky diet. I've lost three days already.",
    author: "Tommy Cooper",
  },
  {
    quote:
      "I really don't think I need buns of steel. I'd be happy with buns of cinnamon.",
    author: "Ellen DeGeneres",
  },
  {
    quote: "I like women, I don't understand them, but I like them.",
    author: "Sean Connery",
  },
  {
    quote:
      "Why is a puck called a puck? Because dirty little bastard was taken.",
    author: "Martin Brodeur",
  },
  {
    quote:
      "All hockey players are bilingual; they speak English and profanity.",
    author: "Gordie Howe",
  },
  {
    quote: " Our offense is like the Pythagorean Theorem. There is no answer.",
    author: "Shaquille O'Neal",
  },
  {
    quote: " We're talking about practice.",
    author: "Allen Iverson",
  },
  {
    quote: "I'd like to live like a poor person - only with lots of money.",
    author: "Pablo Picasso",
  },
];

function generateRandomQuote() {
  const randomIndex = Math.floor(Math.random() * funnyQuotes.length);
  const quoteElement = document.getElementById("funny-quote");
  const authorElement = document.getElementById("quote-author");
  quoteElement.textContent = funnyQuotes[randomIndex].quote;
  authorElement.textContent = "- " + funnyQuotes[randomIndex].author;

  // Clear any previous speech synthesis
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
}

let selectedVoiceIndex = 0; // Default to the first voice
let speechRate = 1.0; // Default speech rate
let isSpeaking = false; // Flag to track if speech synthesis is in progress

function populateVoicesDropdown() {
  const voicesDropdown = document.getElementById("voices");
  const voices = window.speechSynthesis.getVoices();

  // Clear any existing options
  voicesDropdown.innerHTML = "";

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = voice.name;
    voicesDropdown.appendChild(option);
  });

  // Set the selected voice to the first voice in the list
  selectedVoiceIndex = 0;

  // Remove the event listener for voiceschanged to avoid repetition
  speechSynthesis.removeEventListener("voiceschanged", populateVoicesDropdown);
}

function onSpeakEnd() {
  isSpeaking = false;
  const speakBtn = document.getElementById("speak-btn");
  speakBtn.disabled = false;
}

function speakQuote() {
  if (isSpeaking) return; // If speech synthesis is in progress, do nothing

  isSpeaking = true;
  const speakBtn = document.getElementById("speak-btn");
  speakBtn.disabled = true; // Disable the "Listen" button during speech synthesis

  const quoteElement = document.getElementById("funny-quote");
  const authorElement = document.getElementById("quote-author");
  const textToSpeak =
    quoteElement.textContent + " by " + authorElement.textContent;
  const speech = new SpeechSynthesisUtterance(textToSpeak);

  const voices = window.speechSynthesis.getVoices();
  speech.voice = voices[selectedVoiceIndex];

  speech.rate = speechRate; // Set the speech rate from the global variable

  // Add an event listener to detect when speech synthesis has finished
  speech.addEventListener("end", onSpeakEnd);

  window.speechSynthesis.speak(speech);
}

document.addEventListener("DOMContentLoaded", function () {
  const generateBtn = document.getElementById("generate-btn");
  generateBtn.addEventListener("click", generateRandomQuote);

  const speakBtn = document.getElementById("speak-btn");
  speakBtn.addEventListener("click", speakQuote);

  const voicesDropdown = document.getElementById("voices");
  voicesDropdown.addEventListener("change", () => {
    selectedVoiceIndex = voicesDropdown.value;
  });

  const speechRateInput = document.getElementById("speech-rate");
  speechRateInput.addEventListener("input", () => {
    speechRate = parseFloat(speechRateInput.value);
  });

  // Add event listener to populate voices dropdown when voices are available
  speechSynthesis.addEventListener("voiceschanged", populateVoicesDropdown);

  // Call the function initially to display a random quote on page load
  generateRandomQuote();
});
