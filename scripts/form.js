// form.js - Product Review Form

// ========== FOOTER DYNAMIC CONTENT ==========
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

// ========== PRODUCT ARRAY ==========
const products = [
    {
        id: "fc-1888",
        name: "Flux Capacitor",
        averageRating: 4.5
    },
    {
        id: "fc-2050",
        name: "Power Laces",
        averageRating: 4.7
    },
    {
        id: "fs-1987",
        name: "Time Circuits",
        averageRating: 3.5
    },
    {
        id: "ac-2000",
        name: "Low Voltage Reactor",
        averageRating: 3.9
    },
    {
        id: "jj-1969",
        name: "Warp Equalizer",
        averageRating: 5.0
    }
];

// ========== POPULATE PRODUCT SELECT DROPDOWN ==========
function populateProductSelect(productsArray) {
    const productSelect = document.getElementById("productname");
    
    if (!productSelect) {
        console.error("Product select element not found!");
        return false;
    }
    
    try {
        // Clear any existing options except the placeholder
        while (productSelect.options.length > 1) {
            productSelect.remove(1);
        }
        
        // Add each product as an option, using product ID as value
        productsArray.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;  // Use product ID as the value
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
        
        return true;
    } catch (error) {
        console.error("Error populating product select:", error);
        return false;
    }
}

// Initialize the product dropdown when page loads
document.addEventListener('DOMContentLoaded', function() {
    populateProductSelect(products);
});

// Fallback if script runs before DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        populateProductSelect(products);
    });
} else {
    populateProductSelect(products);
}

// ========== FORM VALIDATION ENHANCEMENT ==========
const reviewForm = document.getElementById("reviewForm");
if (reviewForm) {
    reviewForm.addEventListener("submit", function(event) {
        const productSelect = document.getElementById("productname");
        const ratingSelected = document.querySelector('input[name="rating"]:checked');
        const installDate = document.getElementById("installDate");
        
        let isValid = true;
        
        // Custom validation messages
        if (!productSelect || !productSelect.value) {
            event.preventDefault();
            alert("Please select a product.");
            if (productSelect) productSelect.focus();
            isValid = false;
            return;
        }
        
        if (!ratingSelected) {
            event.preventDefault();
            alert("Please select an overall rating.");
            isValid = false;
            return;
        }
        
        if (!installDate || !installDate.value) {
            event.preventDefault();
            alert("Please select the date of installation.");
            if (installDate) installDate.focus();
            isValid = false;
            return;
        }
        
        if (isValid) {
            // Form is valid, allow submission
            return true;
        }
    });
}