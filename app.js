const services = document.querySelectorAll(".list-services");
const staff = document.querySelectorAll(".list-staff");
const contact = document.querySelectorAll(".list-contact");
const langButton = document.querySelector(".language");
const cardBride = document.querySelector(".card--bride");
const cardHair = document.querySelector(".card--hair");
const cardBaby = document.querySelector(".card--baby");

let language = langButton.dataset.lang;

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
    dropDownList.style.display = dropDownList.style.display === 'block' ? 'none' : 'block';
})


const revealSection = function (entries, observer) {

    entries.forEach((ent) => {
        if (!ent.isIntersecting) return;
        ent.target.style.opacity = 100;
        ent.target.style.transform = "translateY(0px)";

        observer.unobserve(ent.target);
    })

}
const sectionsObserver = new IntersectionObserver(revealSection, {
    threshold: 0.1,
})

document.querySelectorAll('.section').forEach((s) => {
    sectionsObserver.observe(s);
})


async function changeLanguage(lang) {
    const data = await fetch(`./${lang}.json`)
        .then(res => res.json());

    services.forEach(el => el.innerHTML = data.links.services);
    staff.forEach(el => el.innerHTML = data.links.staff);
    contact.forEach(el => el.innerHTML = data.links.contact);

    cardBride.innerHTML = data.services.bride;
    cardHair.innerHTML = data.services.hair;
    cardBaby.innerHTML = data.services.baby;

}

function renderTeam(lang) {
    fetch(`./${lang}.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const container = document.querySelector('.staff-contianer');
            container.innerHTML = '';
            data.staff.forEach(member => {
                container.innerHTML += `
                <div class="employee">
                <div class="emp--img">
                <img src="./img/blank-profile-picture.png" alt="">
                </div>
                <div class="emp--text">
                <p class="emp--name">${member.name}</p>         
                <h1 class="emp--role">${member.role}</h1>
                <p class="emp-des">${member.desc}</p>
                </div>
                </div>
        `;
            });

            // Set RTL if Arabic
            document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
        });
}

function setLanguage(lang) {
    renderTeam(lang);
    changeLanguage(lang);
}

langButton.addEventListener('click', () => {
    setLanguage(language);
    if (language === 'ar') {
        langButton.innerHTML = "English";
        language = langButton.dataset.lang = "en";
    }
    else {
        langButton.innerHTML = "العربية";
        language = langButton.dataset.lang = "ar";
    }
})