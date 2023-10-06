// DEBUT ECRAN 1 - ECRAN EMPLOYEUR

const btnScreen1 = document.querySelector('.button_screen1');

const listScreen1 = document.querySelector('li:first-child');

const listScreen2 = document.querySelector('.list-screen2');

const screen1 = document.querySelector('.screen1');

const screen2 = document.querySelector('.screen2');

const divScreen1 = document.querySelector('.screen1');
const inputsScreen1 = divScreen1.querySelectorAll('input');
let allFilled = true;

btnScreen1.addEventListener('click', function(){
    
    inputsScreen1.forEach(function(input) {
        if (input.value === '') {
            allFilled = false;
            console.log('le champ' + input.value + 'est vide');
        }
    });

    if (allFilled) {
        listScreen1.style.color = "#6511D0";
        listScreen2.style.color = "#E25C33";
        screen1.style.display = "none";
        screen2.style.display = "block";
    } else {
        alert('Tous les champs doivent être remplis.');
    }
});

// FIN ECRAN 1 - ECRAN EMPLOYEUR