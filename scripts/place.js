// Set current year in footer
// document.getElementById("currentyear").textContent = new Date().getFullYear(); // Duplicate, handled by getdates.js

// Set last modified date in footer
// document.querySelector("#lastmodified").textContent = `Last Modified: ${document.lastModified}`; // Duplicate

// Static weather values for Nairobi (22°C, 12 km/h)
const temperature = 22; // Degree in Celsius
const windSpeed = 12;   // km/h

// Wind Chill formula for metric units:
// W = 13.12 + 0.6215T - 11.37V^0.16 + 0.3965TV^0.16
function calculateWindChill(temperature, windSpeed) {
    let windChill = 13.12 + (0.6215 * temperature) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temperature * Math.pow(windSpeed, 0.16));
    return windChill;
}

let windChillDisplay;

// Check conditions: temperature <= 10°C AND wind speed > 4.8 km/h
if (temperature <= 10 && windSpeed > 4.8) {
    const wc = calculateWindChill(temperature, windSpeed);
    windChillDisplay = wc.toFixed(1) + "°C";
} else {
    windChillDisplay = "--";
}

// Display wind chill in the weather section
document.querySelector("#wind-chill-display").innerHTML = windChillDisplay;