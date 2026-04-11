// review.js - Confirmation Page with localStorage Counter

// Set current year
const currentYearElement = document.querySelector('.currentyear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Set last modified date
const lastModifiedElement = document.querySelector('.lastmodified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}

// ========== LOCALSTORAGE REVIEW COUNTER ==========
const STORAGE_KEY = "productReviewCount";

// Get current count or initialize to 0
let reviewCount = localStorage.getItem(STORAGE_KEY);

if (reviewCount === null) {
    reviewCount = 0;
} else {
    reviewCount = parseInt(reviewCount);
}

// Increment the count for this new review
reviewCount++;
localStorage.setItem(STORAGE_KEY, reviewCount);

// Display the count on the page
const reviewCountElement = document.getElementById("reviewCount");
if (reviewCountElement) {
    reviewCountElement.textContent = reviewCount;
}