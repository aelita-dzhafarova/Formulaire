// DEBUT ECRAN 1 - ECRAN EMPLOYEUR

// Variables 

// Pour faire apparaître la div co-employeur

const btnAddCoemployer = document.getElementById('add-co-employer');

const divCoemployer = document.getElementById('co-employer');

// Pour faire apparaître l'adresse du co-employeur

const NoSameAddress = document.getElementById('no');

const divAddressCoemployer = document.querySelector('.address_co-employer');

// Pour faire disparaître le premier écran et faire apparaître le deuxième

const btnToScreen2 = document.querySelector('.button_toscreen2');

const listScreen1 = document.querySelector('li:first-child');

const listScreen2 = document.querySelector('.list-screen2');

const screen1 = document.querySelector('.screen1');

const screen2 = document.querySelector('.screen2');

const inputsScreen1 = screen1.querySelectorAll('.required');

let allFilled = true;

// Fonctions

// Pour faire apparaître la div co-employeur

btnAddCoemployer.addEventListener('click', function(){
    divCoemployer.style.display = "block";
});

// Pour faire apparaître l'adresse du co-employeur

NoSameAddress.addEventListener('click', function(){
    divAddressCoemployer.style.display = "block";
});

// Pour faire disparaître le premier écran et faire apparaître le deuxième

btnToScreen2.addEventListener('click', function(){
    
    // inputsScreen1.forEach(function(input) {
    //     if (input.value === '') {
    //         allFilled = false;
    //         console.log('le champ' + input.value + 'est vide');
    //     }
    // });

    // if (allFilled) {
        listScreen1.style.color = "#6511D0";
        listScreen2.style.color = "#E25C33";
        screen1.style.display = "none";
        screen2.style.display = "block";
    // } else {
    //     alert('Tous les champs doivent être remplis.');
    // }
});

// FIN ECRAN 1 - ECRAN EMPLOYEUR

// -------------------------------------

// ECRAN 2 - ECRAN EMPLOYE/E

// Valeurs

// Pour faire disparaître le deuxième écran et faire apparaître le troisième

const btnToScreen3 = document.querySelector('.button_toscreen3');
console.log(btnToScreen3);

const listScreen3 = document.querySelector('.list-screen3');
console.log(listScreen3);

const screen3 = document.querySelector('.screen3');
console.log(screen3);

const inputsScreen2 = screen2.querySelectorAll('.required');
console.log(inputsScreen2);

allFilled = true;

// Pour revenir à l'écran 1

const btnBackToScreen1 = document.querySelector('.button_backscreen1');
console.log(btnBackToScreen1);

// Fonctions

// Pour faire disparaître le deuxième écran et faire apparaître le troisième

btnToScreen3.addEventListener('click', function(){
    
    inputsScreen2.forEach(function(input) {
        if (input.value === '') {
            allFilled = false;
            console.log('le champ' + input.value + 'est vide');
        }
    });

    if (allFilled) {
        listScreen2.style.color = "#6511D0";
        listScreen3.style.color = "#E25C33";
        screen2.style.display = "none";
        screen3.style.display = "block";
    } else {
        alert('Tous les champs doivent être remplis.');
    }
});

// FIN ECRAN 2 - ECRAN EMPLOYE/E