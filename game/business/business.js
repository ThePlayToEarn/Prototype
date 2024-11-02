const maxInventorySlots = 10;

// Load inventory from local storage
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// Function to update inventory display
function updateInventoryDisplay() {
    const inventoryGrid = document.getElementById('inventory-grid');
    inventoryGrid.innerHTML = '';

    // Display all inventory slots, including empty ones
    for (let i = 0; i < maxInventorySlots; i++) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';

        if (inventory[i] && inventory[i].endsWith('.png')) {
            const img = document.createElement('img');
            img.src = `../assets/${inventory[i]}`; // Ensure this path is correct
            img.alt = inventory[i];
            itemDiv.appendChild(img);
        }

        inventoryGrid.appendChild(itemDiv);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const addBusinessButton = document.getElementById("add-business");
    const businessList = document.querySelector(".business-list");

    // Update the inventory display when the page loads
    updateInventoryDisplay();

    addBusinessButton.addEventListener("click", () => {
        // Create two new business items
        for (let i = 1; i <= 2; i++) {
            const businessItem = document.createElement("div");
            businessItem.className = "business-item";
            businessItem.innerHTML = `
                <h3>Business Name ${i}</h3>
                <p>Owned: Yes</p>
                <p>Land Details: Plot ${i}</p>
                <button class="select-plot">Select this Plot</button>
            `;
            businessList.appendChild(businessItem);
        }
    });
});
