let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
const maxInventorySlots = 10;

// Initialize experience variables
let experiencePoints = parseInt(localStorage.getItem('experiencePoints')) || 0;
const experienceGoal = 100;

// Initialize woodcutting experience variables
let woodcuttingXP = parseInt(localStorage.getItem('woodcuttingXP')) || 0;
let woodcuttingLevel = parseInt(localStorage.getItem('woodcuttingLevel')) || 1;
const xpPerLevel = 90;
const xpPerAction = 10;
const maxLevel = 9;

window.onload = () => {
    updateInventoryDisplay();
    updateExperienceBar();
    loadWoodcuttingData(); // Load woodcutting data when the page loads
};

// Function to update inventory display
function updateInventoryDisplay() {
    const inventoryGrid = document.getElementById('inventory-grid');
    inventoryGrid.innerHTML = '';

    for (let i = 0; i < maxInventorySlots; i++) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';

        if (inventory[i] && inventory[i].endsWith('.png')) {
            const img = document.createElement('img');
            img.src = `../assets/${inventory[i]}`; 
            img.alt = inventory[i];
            itemDiv.appendChild(img);

            const destroyButton = document.createElement('button');
            destroyButton.innerText = '✖';
            destroyButton.className = 'destroy-button';
            destroyButton.onclick = () => destroyItem(i);
            itemDiv.appendChild(destroyButton);
        }

        inventoryGrid.appendChild(itemDiv);
    }
}

// Function to add an item to inventory
function addItemToInventory(item) {
    if (inventory.length < maxInventorySlots) {
        inventory.push(item);
        localStorage.setItem('inventory', JSON.stringify(inventory));
        updateInventoryDisplay();
    } else {
        alert('Inventory is full!');
    }
}

// Function to destroy a specific item
function destroyItem(index) {
    const confirmation = confirm(`Are you sure you want to destroy ${inventory[index]}?`);
    if (confirmation) {
        inventory.splice(index, 1); // Remove the item
        localStorage.setItem('inventory', JSON.stringify(inventory)); // Update localStorage
        updateInventoryDisplay(); // Update display
    }
}

// Experience functions
function gainExperience(points) {
    experiencePoints += points;
    localStorage.setItem('experiencePoints', experiencePoints);
    updateExperienceBar();

    if (experiencePoints >= experienceGoal) {
        alert('Congratulations! You leveled up!');
        experiencePoints = 0; // Reset experience
        localStorage.setItem('experiencePoints', experiencePoints);
    }
}

// Update Experience Bar
function updateExperienceBar() {
    const percentage = (experiencePoints / experienceGoal) * 100;
    document.getElementById('experience-bar').style.width = `${Math.min(percentage, 100)}%`;
    document.getElementById('experience-progress').innerText = `${Math.min(percentage, 100).toFixed(0)}%`;
}

// Event listener for Collect Wood button
const collectWoodButton = document.getElementById('collect-wood-button');
if (collectWoodButton) {
    collectWoodButton.addEventListener('click', function() {
        addItemToInventory('t1-wood.png'); // Ensure this matches the filename
        gainExperience(10); // Gain experience from collecting wood
        gainWoodcuttingXP(); // Gain woodcutting XP as well
    });
}

// Load woodcutting data
function loadWoodcuttingData() {
    woodcuttingXP = parseInt(localStorage.getItem('woodcuttingXP')) || 0;
    woodcuttingLevel = parseInt(localStorage.getItem('woodcuttingLevel')) || 1;
}

// Function to gain woodcutting XP
function gainWoodcuttingXP() {
    if (woodcuttingLevel < maxLevel) {
        woodcuttingXP += xpPerAction;

        // Level up if XP threshold is met
        if (woodcuttingXP >= woodcuttingLevel * xpPerLevel) {
            woodcuttingLevel++;
            woodcuttingXP = woodcuttingLevel * xpPerLevel > woodcuttingXP ? woodcuttingXP : woodcuttingLevel * xpPerLevel;
        }

        // Save updated XP and level to localStorage
        localStorage.setItem("woodcuttingXP", woodcuttingXP);
        localStorage.setItem("woodcuttingLevel", woodcuttingLevel);

        updateWoodcuttingDisplay(); // Update display
    }
}

// Function to update woodcutting display (you need to implement this if not already)
function updateWoodcuttingDisplay() {
    document.getElementById("woodcutting-level").textContent = `Level: ${woodcuttingLevel}`;
    document.getElementById("woodcutting-xp").textContent = `XP: ${woodcuttingXP % xpPerLevel} / ${xpPerLevel}`;
    
    const xpPercent = (woodcuttingXP % xpPerLevel) / xpPerLevel * 100;
    document.getElementById("woodcutting-xp-bar").style.width = xpPercent + '%';
}
