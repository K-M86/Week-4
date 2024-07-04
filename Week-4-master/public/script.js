// script.js

document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([35.4676, -97.5164], 5); // Initial view

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    fetch('/api/locations') // Fetch data from the server
        .then(response => response.json())
        .then(data => {
            data.forEach(location => {
                L.marker([location.latitude, location.longitude])
                    .addTo(map)
                    .bindPopup(`<b>${location.name}</b><br>${location.description}`);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
