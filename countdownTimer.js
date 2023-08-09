let countdownInterval;
let countdownTextIsWhite = true;
let eventName; // Variable to store the event name

function startCountdown() {
  const countdownDateInput = document.getElementById("countdown-date");
  const eventNameInput = document.getElementById("countdown-event-name");
  eventName = eventNameInput.value.trim(); // Store the event name

  const errorMessage = document.querySelector(".error-message");

  if (!countdownDateInput.value) {
    alert("Please enter a valid date!");
    return;
  }

  if (!eventName) {
    errorMessage.style.display = "block";
    return;
  } else {
    errorMessage.style.display = "none";
  }

  const eventDate = new Date(countdownDateInput.value).getTime();

  if (isNaN(eventDate)) {
    alert("Please enter a valid date!");
    return;
  }

  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown-content").innerHTML =
        eventName + ` has already happened, better luck next time.`;
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      updateCountdownText(eventName, days, hours, minutes, seconds);
    }
  }, 1000);
}

function updateCountdownText(eventName, days, hours, minutes, seconds) {
  const countdownText = document.getElementById("countdown-content");
  countdownText.style.color = "white"; // Ensure the text is white
  countdownTextIsWhite = !countdownTextIsWhite;

  const formattedTime =
    `<span class='event-name'>${eventName}</span> will occur in: <br>` +
    "<span class='countdown-number'>" +
    days +
    "d " +
    hours +
    "h " +
    minutes +
    "m " +
    seconds +
    "s" +
    "</span>";
  countdownText.innerHTML = formattedTime;
}

function cancelCountdown() {
  clearInterval(countdownInterval);
  const countdownContent = document.getElementById("countdown-content");
  countdownContent.innerHTML = `${eventName} has been cancelled.`;
}

// Add event listeners after the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("start-countdown-btn")
    .addEventListener("click", startCountdown);
  document
    .getElementById("cancel-countdown-btn")
    .addEventListener("click", cancelCountdown);
});

// Initial display of countdown before starting
updateCountdownText("", 0, 0, 0, 0);
