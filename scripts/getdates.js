// Get the current year for copyright
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Get the last modified date of the document
document.getElementById("lastModified").innerHTML = "Last modified: " + document.lastModified;