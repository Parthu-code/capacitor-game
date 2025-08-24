
const EPSILON_0 = 8.854e-12; // Permittivity of free space 

// DOM elements
const plateSizeSlider = document.getElementById('plate-size');
const separationSlider = document.getElementById('separation');
const dielectricSlider = document.getElementById('dielectric');
const voltageSlider = document.getElementById('voltage');

const plateSizeValue = document.getElementById('plate-size-value');
const separationValue = document.getElementById('separation-value');
const dielectricValue = document.getElementById('dielectric-value');
const voltageValue = document.getElementById('voltage-value');

const capacitanceDisplay = document.getElementById('capacitance');
const chargeDisplay = document.getElementById('charge');
const fieldDisplay = document.getElementById('field');

// Initialize
updateAll();

// Event listeners
plateSizeSlider.addEventListener('input', updateAll);
separationSlider.addEventListener('input', updateAll);
dielectricSlider.addEventListener('input', updateAll);
voltageSlider.addEventListener('input', updateAll);

function updateAll() {
    // Get current values
    const plateSize = parseFloat(plateSizeSlider.value); // cm²
    const separation = parseFloat(separationSlider.value); // mm
    const dielectric = parseFloat(dielectricSlider.value);
    const voltage = parseFloat(voltageSlider.value); // V
    
    // Update display values
    plateSizeValue.textContent = plateSize;
    separationValue.textContent = separation;
    dielectricValue.textContent = dielectric.toFixed(1);
    voltageValue.textContent = voltage;
    
    // Calculate capacitance (C = ε₀εᵣA/d)
    const area = plateSize * 1e-4; // Convert cm² to m²
    const distance = separation * 1e-3; // Convert mm to m
    const capacitance = (EPSILON_0 * dielectric * area) / distance;
    
    // Calculate stored charge (Q = CV)
    const charge = capacitance * voltage;
    
    // Calculate electric field (E = V/d)
    const electricField = voltage / distance;
    
    // Update displays with appropriate units
    updateDisplay(capacitanceDisplay, capacitance, 'pF', 1e12);
    updateDisplay(chargeDisplay, charge, 'pC', 1e12);
    updateDisplay(fieldDisplay, electricField, 'V/m', 1);
    
    // Update capacitor visualization
    updateCapacitorVisualization(plateSize, separation, dielectric);
}

function updateDisplay(element, value, unit, multiplier) {
    const displayValue = (value * multiplier).toFixed(2);
    element.textContent = `${displayValue} ${unit}`;
}

function updateCapacitorVisualization(plateSize, separation, dielectric) {
    const topPlate = document.querySelector('.top-plate');
    const bottomPlate = document.querySelector('.bottom-plate');
    const dielectricElement = document.querySelector('.dielectric');
    
    const plateWidth = Math.max(80, Math.min(200, 80 + (plateSize - 10) * 1.2));
    topPlate.style.width = `${plateWidth}px`;
    bottomPlate.style.width = `${plateWidth}px`;
    const dielectricWidth = Math.max(60, Math.min(180, 60 + (plateSize - 10) * 1.2));
    dielectricElement.style.width = `${dielectricWidth}px`;
    const dielectricHeight = Math.max(20, Math.min(100, 20 + (separation - 1) * 4));
    dielectricElement.style.height = `${dielectricHeight}px`;
    const opacity = Math.max(0.1, Math.min(0.8, 0.1 + (dielectric - 1) * 0.07));
    dielectricElement.style.borderColor = `rgba(255, 255, 255, ${opacity})`;
    const fieldIntensity = Math.min(1, voltageSlider.value / 100);
    const glowIntensity = fieldIntensity * 0.5;
    topPlate.style.boxShadow = `0 0 ${10 + glowIntensity * 20}px rgba(255, 255, 255, ${0.3 + glowIntensity * 0.4})`;
    bottomPlate.style.boxShadow = `0 0 ${10 + glowIntensity * 20}px rgba(255, 255, 255, ${0.3 + glowIntensity * 0.4})`;
}
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .plate, .dielectric {
            transition: all 0.3s ease;
        }
        .value-display {
            transition: background-color 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});
