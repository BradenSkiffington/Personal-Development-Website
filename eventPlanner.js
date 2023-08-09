// Event form submission
document
  .getElementById("event-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    var eventName = document.getElementById("event-name").value;
    var eventDate = document.getElementById("event-date").value;
    var eventLocation = document.getElementById("event-location").value;
    var eventDescription = document.getElementById("event-description").value;

    // Check if any required field is empty
    if (
      !eventName.trim() ||
      !eventDate.trim() ||
      !eventLocation.trim() ||
      !eventDescription.trim()
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    // Create event object
    var event = {
      name: eventName,
      date: eventDate,
      location: eventLocation,
      description: eventDescription,
    };

    // Save event to local storage
    saveEvent(event);

    // Reset the form
    document.getElementById("event-form").reset();

    // Display the events on the webpage
    displayEvents();
  });

function saveEvent(event) {
  // Retrieve existing events from local storage
  var events = JSON.parse(localStorage.getItem("events")) || [];

  // Add the new event to the events array
  events.push(event);

  // Save the updated events array to local storage
  localStorage.setItem("events", JSON.stringify(events));
}

function deleteEvent(index) {
  // Retrieve events from local storage
  var events = JSON.parse(localStorage.getItem("events"));

  // Remove the event at the specified index
  if (events && events.length > index) {
    events.splice(index, 1);

    // Save the updated events array to local storage
    localStorage.setItem("events", JSON.stringify(events));

    // Display the updated events on the webpage
    displayEvents();
  }
}

function displayEvents() {
  // Get the container element to display events
  var eventsContainer = document.getElementById("events-container");

  // Retrieve events from local storage
  var events = JSON.parse(localStorage.getItem("events"));

  // Clear the existing events in the container
  eventsContainer.innerHTML = "";

  // Display a message if no events are available
  if (!events || events.length === 0) {
    eventsContainer.innerHTML = "<p>No events available.</p>";
    return;
  }

  // Loop through the events and create HTML elements to display them
  events.forEach(function (event, index) {
    // Create HTML elements for each event
    var eventElement = document.createElement("div");
    eventElement.classList.add("event");
    eventElement.innerHTML = `
          <h3>${event.name}</h3>
          <p>Date: ${event.date}</p>
          <p>Location: ${event.location}</p>
          <p>Description: ${event.description}</p>
          <button onclick="deleteEvent(${index})">Delete</button>
        `;

    // Append the event element to the container
    eventsContainer.appendChild(eventElement);
  });
}

// Call displayEvents() when the page loads to initially display the events
window.addEventListener("DOMContentLoaded", displayEvents);

// Function to clear local storage
function clearLocalStorage() {
  localStorage.removeItem("events");
  displayEvents(); // Refresh the displayed events to show the "No events available" message
}
