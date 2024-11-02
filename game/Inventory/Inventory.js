// Maximum inventory slots
const maxInventorySlots = 10;

// Load and display inventory from localStorage
function loadInventory() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    displayInventory(inventory);
}

// Display the inventory in the inventory grid
function displayInventory(inventory) {
    const inventoryGrid = document.getElementById('inventory-grid');
    if (!inventoryGrid) return;

    inventoryGrid.innerHTML = ''; // Clear the inventory grid
    inventory.forEach(item => {
        if (item) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'inventory-item';

            const img = document.createElement('img');
            img.src = `../assets/${item}`; // Ensure the path is correct
            img.alt = item;

            const destroyButton = document.createElement('button');
            destroyButton.innerText = 'Destroy';
            destroyButton.onclick = () => destroyItem(item);

            itemDiv.appendChild(img);
            itemDiv.appendChild(destroyButton);
            inventoryGrid.appendChild(itemDiv);
        } else {
            console.error('Item is undefined or empty');
        }
    });
}

// Add item to inventory
function addItemToInventory(item) {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    if (inventory.length < maxInventorySlots) {
        inventory.push(item);
        localStorage.setItem('inventory', JSON.stringify(inventory));
        displayInventory(inventory);
    } else {
        alert('Inventory is full!');
    }
}

// Destroy an item
function destroyItem(item) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const confirmation = confirm(`Are you sure you want to destroy ${item}?`);
    if (confirmation) {
        const updatedInventory = inventory.filter(i => i !== item);
        localStorage.setItem('inventory', JSON.stringify(updatedInventory));
        displayInventory(updatedInventory);
    }
}

// Call loadInventory on page load
window.onload = loadInventory;

function saveGameData() {
    const gameData = {
        playerStats: { experience: 0, level: 0 },
        inventory: { wood: 0, stone: 0 },
        bank: { balance: 0 }
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

function loadGameData() {
    const gameData = JSON.parse(localStorage.getItem('gameData')) || { playerStats: { experience: 0, level: 0 }, bank: { balance: 0 } };
    
    // Load data into variables
    const playerStats = gameData.playerStats;
    document.getElementById('experience-progress').innerText = `${playerStats.experience}%`; // Example
    document.getElementById('level').innerText = `Level: ${playerStats.level}`; // Example
    
    const bank = gameData.bank;
    const bankBalanceElement = document.getElementById('bank-balance');
    if (bankBalanceElement) {
        bankBalanceElement.innerText = `Balance: ${bank.balance}`;
    }

    updateInventoryDisplay();
}

document.addEventListener('DOMContentLoaded', loadGameData);

function resetGame() {
    const confirmation = confirm("Are you sure you want to reset the entire game?");
    if (confirmation) {
        // Clear all data in localStorage
        localStorage.clear();

        // Initialize game data to default values
        const initialGameData = {
            playerStats: { experience: 0, level: 0 },
            inventory: { wood: 0, stone: 0 },
            bank: { balance: 0 }
        };

        // Save the initial game data back to localStorage
        localStorage.setItem('gameData', JSON.stringify(initialGameData));
        localStorage.setItem('inventory', JSON.stringify([])); // Reset inventory

        // Reload the game state
        loadGameData(); // Call this to update variables and UI
        location.reload(); // Reload the page to reflect changes
    }
}

function updateInventoryDisplay() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    displayInventory(inventory);
}
