// siteplan.js - Small Home Library Catalog

// Set current year in footer
const currentYearElement = document.querySelector('.currentyear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Set last modified date in footer
const lastModifiedElement = document.querySelector('.lastmodified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last modified: ${document.lastModified}`;
}