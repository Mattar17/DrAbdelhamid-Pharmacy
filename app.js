var map = L.map('map').setView([30.399099, 30.836011], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([30.399099, 30.836011]).addTo(map)
    .bindPopup('Dr.Abdelhamed Pharmacy')
    .openPopup();


const dropDownBtn = document.querySelector('.btn-drop-down');
const dropDownList = document.querySelector('.drop-down-list');

dropDownBtn.addEventListener('click', () => {
    dropDownList.classList.toggle('block');
})