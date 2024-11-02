// Retrieve inventory and bank data from local storage
const inventoryItems = JSON.parse(localStorage.getItem('inventory')) || []; // Use the same key as in the other scripts
const bankItems = JSON.parse(localStorage.getItem('bankItems')) || [];

// Inventory and bank grid elements
const inventoryGrid = document.getElementById('inventory-grid');
const bankInventoryGrid = document.getElementById('bank-inventory-grid');

// Update the inventory grid
function updateInventoryGrid() {
    inventoryGrid.innerHTML = ''; // Clear existing items

    // Display all inventory slots, including empty ones
    for (let i = 0; i < 10; i++) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';

        if (inventoryItems[i] && inventoryItems[i].endsWith('.png')) {
            const img = document.createElement('img');
            img.src = `../assets/${inventoryItems[i]}`; // Ensure this path is correct
            img.alt = inventoryItems[i];
            itemDiv.appendChild(img);

            // Add a smaller "Destroy" button to each item
            const destroyButton = document.createElement('button');
            destroyButton.innerText = '✖';
            destroyButton.className = 'destroy-button';
            destroyButton.onclick = () => destroyInventoryItem(i);
            itemDiv.appendChild(destroyButton);
        }

        inventoryGrid.appendChild(itemDiv);
    }
}

// Function to destroy a specific inventory item
function destroyInventoryItem(index) {
    const confirmation = confirm(`Are you sure you want to destroy ${inventoryItems[index]}?`);
    if (confirmation) {
        inventoryItems.splice(index, 1);
        localStorage.setItem('inventory', JSON.stringify(inventoryItems));
        updateInventoryGrid();
    }
}

// Update the bank grid
function updateBankGrid() {
    bankInventoryGrid.innerHTML = ''; // Clear existing items

    bankItems.forEach(itemPath => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';

        const img = document.createElement('img');
        img.src = `../assets/${itemPath}`; // Ensure this path is correct
        img.alt = 'Bank Item';
        itemDiv.appendChild(img);

        bankInventoryGrid.appendChild(itemDiv);
    });

    // Fill empty slots if fewer than 32 items
    for (let i = bankItems.length; i < 32; i++) {
        const emptySlot = document.createElement('div');
        emptySlot.className = 'inventory-item empty-slot';
        bankInventoryGrid.appendChild(emptySlot);
    }
}

// Save inventory and bank items back to local storage
function saveToLocalStorage() {
    localStorage.setItem('inventory', JSON.stringify(inventoryItems)); // Keep same key
    localStorage.setItem('bankItems', JSON.stringify(bankItems));
}

// Deposit item from inventory to bank
function depositItem() {
    if (inventoryItems.length > 0 && bankItems.length < 32) {
        const itemToDeposit = inventoryItems.pop(); // Remove from inventory
        bankItems.push(itemToDeposit); // Add to bank
        saveToLocalStorage();
        updateInventoryGrid();
        updateBankGrid();
    } else {
        alert("No items to deposit or bank is full!");
    }
}

// Withdraw item from bank to inventory
function withdrawItem() {
    if (bankItems.length > 0 && inventoryItems.length < 10) {
        const itemToWithdraw = bankItems.pop(); // Remove from bank
        inventoryItems.push(itemToWithdraw); // Add to inventory
        saveToLocalStorage();
        updateInventoryGrid();
        updateBankGrid();
    } else {
        alert("No items to withdraw or inventory is full!");
    }
}

// Event listeners for deposit/withdraw buttons
document.getElementById('deposit-btn').addEventListener('click', depositItem);
document.getElementById('withdraw-btn').addEventListener('click', withdrawItem);

// Initial render of grids
updateInventoryGrid();
updateBankGrid();
