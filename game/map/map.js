const mapContainer = document.getElementById('map');

// Function to create tiles
function createTile(isOwned = false) {
    const tile = document.createElement('div');
    tile.classList.add('tile', isOwned ? 'owned' : 'for-sale');
    tile.textContent = isOwned ? 'Owned' : 'For Sale';
    
    // Event listener for clicking on a tile
    tile.addEventListener('click', () => {
        const landInfo = document.getElementById('land-info');
        landInfo.textContent = isOwned ? 'You own this land!' : 'This land is for sale.';
    });
    
    return tile;
}

// Initialize the map with 100 tiles
function initMap() {
    for (let i = 0; i < 100; i++) {
        // Randomly assign some tiles as owned for demonstration
        const isOwned = Math.random() > 0.5; // 50% chance to be owned
        const tile = createTile(isOwned);
        mapContainer.appendChild(tile);
    }
}

window.onload = initMap; // Initialize the map on window load
