function login() {
  var username = document.getElementById("Username").value;
  var password = document.getElementById("password").value;

  // You can replace the following lines with your own logic for validation
  if (username === "Skiff" && password === "Skiff_21") {
    window.location.href = "index.html"; // Redirect to the homepage
  } else {
    document.getElementById("errorMessage").textContent =
      "Invalid username or password.";
  }
}
