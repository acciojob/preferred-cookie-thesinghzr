
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + "; path=/" + expires;
}

// Function to get cookie value by name
function getCookie(name) {
  let nameEQ = name + "=";
  let cookiesArray = document.cookie.split("; ");
  for (let cookie of cookiesArray) {
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  return null;
}

// Function to apply saved preferences
function applyPreferences() {
  let savedFontSize = getCookie("fontsize");
  let savedFontColor = getCookie("fontcolor");

  if (savedFontSize) {
    document.documentElement.style.setProperty("--fontsize", savedFontSize + "px");
    document.getElementById("fontsize").value = savedFontSize;
  }

  if (savedFontColor) {
    document.documentElement.style.setProperty("--fontcolor", savedFontColor);
    document.getElementById("fontcolor").value = savedFontColor;
  }
}

// Save preferences when the form is submitted
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let fontSize = document.getElementById("fontsize").value;
  let fontColor = document.getElementById("fontcolor").value;

  setCookie("fontsize", fontSize, 365);
  setCookie("fontcolor", fontColor, 365);

  applyPreferences();
});

// Apply preferences when the page loads
document.addEventListener("DOMContentLoaded", applyPreferences);