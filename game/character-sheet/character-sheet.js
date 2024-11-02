// Initialize character data
const characterStats = JSON.parse(localStorage.getItem('characterStats')) || {
    level: 1,
    experience: 0,
    strength: 10,
    agility: 8,
    intelligence: 12,
};

// Initialize inventory and set max slots
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
const maxInventorySlots = 10;

// Load character details
function loadCharacterDetails() {
    document.getElementById('character-name').textContent = "Hero";
    document.getElementById('character-level').textContent = characterStats.level;
    document.getElementById('character-exp').textContent = characterStats.experience;
    document.getElementById('character-strength').textContent = characterStats.strength;
    document.getElementById('character-agility').textContent = characterStats.agility;
    document.getElementById('character-intelligence').textContent = characterStats.intelligence;

    loadInventoryInCharacterSheet();
    loadWoodcuttingData();
}

// Load inventory display for Character Sheet
function loadInventoryInCharacterSheet() {
    const characterInventoryGrid = document.getElementById('character-inventory');
    characterInventoryGrid.innerHTML = ''; // Clear any previous items

    for (let i = 0; i < maxInventorySlots; i++) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';

        if (inventory[i] && inventory[i].endsWith('.png')) {
            const img = document.createElement('img');
            img.src = `../assets/${inventory[i]}`;
            img.alt = inventory[i];
            itemDiv.appendChild(img);
        }

        characterInventoryGrid.appendChild(itemDiv);
    }
}

// Initialize skill levels and experience, using localStorage for persistence
let woodcuttingXP = parseInt(localStorage.getItem('woodcuttingXP')) || 0;
let woodcuttingLevel = parseInt(localStorage.getItem('woodcuttingLevel')) || 1;
const xpPerLevel = 90;
const xpPerAction = 10;
const maxLevel = 9;

// Load woodcutting data
function loadWoodcuttingData() {
    woodcuttingXP = parseInt(localStorage.getItem('woodcuttingXP')) || 0;
    woodcuttingLevel = parseInt(localStorage.getItem('woodcuttingLevel')) || 1;

    updateWoodcuttingDisplay();
}

// Function to update skill display
function updateWoodcuttingDisplay() {
    document.getElementById("woodcutting-level").textContent = `Level: ${woodcuttingLevel}`;
    document.getElementById("woodcutting-xp").textContent = `XP: ${woodcuttingXP % xpPerLevel} / ${xpPerLevel}`;

    const xpPercent = (woodcuttingXP % xpPerLevel) / xpPerLevel * 100;
    document.getElementById("woodcutting-xp-bar").style.width = xpPercent + '%';
}

// Load data on page load
window.onload = () => {
    loadCharacterDetails();
};

// Event listener for the woodcutting action in 'My Land'
document.getElementById("collect-wood-button").addEventListener("click", function() {
    gainWoodcuttingXP();
    addItemToInventory('T1-Wood.png'); // Add wood to inventory
    characterStats.experience += xpPerAction; // Add experience to character stats
    localStorage.setItem('characterStats', JSON.stringify(characterStats)); // Save to localStorage
    loadCharacterDetails(); // Update display after XP change
});

// Function to gain woodcutting XP and level up if necessary
function gainWoodcuttingXP() {
    if (woodcuttingLevel < maxLevel) {
        woodcuttingXP += xpPerAction;

        if (woodcuttingXP >= woodcuttingLevel * xpPerLevel) {
            woodcuttingLevel++;
            woodcuttingXP = woodcuttingXP - (woodcuttingLevel - 1) * xpPerLevel;
        }

        localStorage.setItem("woodcuttingXP", woodcuttingXP);
        localStorage.setItem("woodcuttingLevel", woodcuttingLevel);
        updateWoodcuttingDisplay();
    }
}

// Function to add an item to the inventory with localStorage update
function addItemToInventory(item) {
    if (inventory.length < maxInventorySlots) {
        inventory.push(item);
        localStorage.setItem('inventory', JSON.stringify(inventory));
        loadInventoryInCharacterSheet(); // Refresh display in Character Sheet
    } else {
        alert('Inventory is full!');
    }
}
