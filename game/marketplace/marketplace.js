let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
const maxInventorySlots = 10;

window.onload = () => {
    loadInventory();
    displayMarketplace();
    document.getElementById('reset-button').addEventListener('click', resetGame); // Set up reset button listener
};

// Display the available inventory slots, including empty ones
function loadInventory() {
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
        }
        inventoryGrid.appendChild(itemDiv);
    }
}

// Display the marketplace with organized items
function displayMarketplace() {
    const marketplaceElement = document.getElementById('items-grid');
    marketplaceElement.innerHTML = '';

    const itemsForSale = {
        "t1-wood.png": { price: "10 Copper Coins"  },
        "t1-axe.png": { price: "5 Copper Coins" }
    };

    for (const [item, info] of Object.entries(itemsForSale)) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'resource-item';

        // Create an image element for the item
        const img = document.createElement('img');
        img.src = `../assets/${item}`;
        img.alt = item;
        img.className = 'resource-image';

        // Item details
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'item-details';
        detailsDiv.innerHTML = `
            <span><strong>Price:</strong> ${info.price}</span><br>
            
        `;

        // Add buy button
        const buyButton = document.createElement('button');
        buyButton.innerText = 'Buy';
        buyButton.className = 'buy-button';
        buyButton.onclick = () => buyItem(item);

        // Append elements to itemDiv
        itemDiv.appendChild(img);
        itemDiv.appendChild(detailsDiv);
        itemDiv.appendChild(buyButton);

        marketplaceElement.appendChild(itemDiv);
    }
}

function buyItem(item) {
    const itemsForSale = {
        "t1-wood.png": { price: 10, quantity: 5, averagePriceHistory: "$8.50" },
        "t1-axe.png": { price: 15, quantity: 3, averagePriceHistory: "$12.00" }
    };
    const itemInfo = itemsForSale[item];

    if (itemInfo && itemInfo.quantity > 0) {
        if (inventory.length < maxInventorySlots) {
            itemInfo.quantity -= 1;
            inventory.push(item);
            localStorage.setItem('inventory', JSON.stringify(inventory));
            loadInventory();
            alert(`You bought 1 ${item.replace("t1-", "").replace(".png", "")}!`);
        } else {
            alert('Inventory is full!');
        }
    } else {
        alert(`Sorry, no more ${item.replace("t1-", "").replace(".png", "")} available.`);
    }
}

function resetGame() {
    const confirmation = confirm("Are you sure you want to reset the whole game?");
    if (confirmation) {
        localStorage.clear();
        inventory = [];
        localStorage.setItem('inventory', JSON.stringify(inventory));
        loadInventory();
        displayMarketplace();
        alert("Game has been reset!");
    }
}
