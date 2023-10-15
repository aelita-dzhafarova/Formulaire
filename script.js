'use strict';

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

// DEBUT ECRAN 2 - ECRAN EMPLOYE/E

// Valeurs

// Pour faire disparaître le deuxième écran et faire apparaître le troisième

const btnToScreen3 = document.querySelector('.button_toscreen3');

const listScreen3 = document.querySelector('.list-screen3');

const screen3 = document.querySelector('.screen3');

const inputsScreen2 = screen2.querySelectorAll('.required');

allFilled = true;

// Pour revenir à l'écran 1

const btnBackToScreen1 = document.querySelector('.button_backscreen1');

// Fonctions

// Pour faire disparaître le deuxième écran et faire apparaître le troisième

btnToScreen3.addEventListener('click', function(){
    
    // inputsScreen2.forEach(function(input) {
    //     if (input.value === '') {
    //         allFilled = false;
    //     }
    // });

    // if (allFilled) {
        listScreen2.style.color = "#6511D0";
        listScreen3.style.color = "#E25C33";
        screen2.style.display = "none";
        screen3.style.display = "block";
    // } else {
    //     alert('Tous les champs doivent être remplis.');
    // }
});

// Pour revenir à l'écran 1

btnBackToScreen1.addEventListener('click', function(){
    listScreen2.style.color = "#6511D0";
    listScreen1.style.color = "#E25C33";
    screen2.style.display = "none";
    screen1.style.display = "block";
});

// FIN ECRAN 2 - ECRAN EMPLOYE/E

// -------------------------------------

// DEBUT ECRAN 3 - ECRAN CHOIX TYPE CONTRAT et DUREE CONTRAT

// Valeurs

// Résultats cdd-question1, 2, 3

const yesOccasionalTask = document.getElementById('yes_occasional_task');

const noOccasionalTask = document.getElementById('no_occasional task');

const divCddQuestion2 = document.querySelector('.cdd-question2');

const yesTemporaryReplacement = document.getElementById('yes_temporary_replacement');

const noTemporaryReplacement = document.getElementById('no_temporary_replacement');

const divCddQuestion3 = document.querySelector('.cdd-question3');

const yesWaitingEmployee = document.getElementById ('yes_waiting-employee');

const noWaitingEmployee = document.getElementById ('no_waiting-employee');

const outputResultCdd = document.querySelector('.output_result');

const divInfoCdd = document.querySelector('.info_cdd');

// Pour faire disparaître le troisème écran et faire apparaître le quatrième

const btnToScreen4 = document.querySelector('.button_toscreen4');

const listScreen4 = document.querySelector('.list-screen4');

const screen4 = document.querySelector('.screen4');

// Pour revenir à l'écran 2

const btnBackToScreen2 = document.querySelector('.button_backscreen2');

// Fonctions

// Résultats cdd-question1, 2, 3

yesOccasionalTask.addEventListener('click', function(){
    outputResultCdd.innerHTML = '<p>Le contrat à durée déterminée est possible.</p>';
    divInfoCdd.style.display = "block";
    divCddQuestion2.style.display = "none";
    divCddQuestion3.style.display = "none";
});

noOccasionalTask.addEventListener('click', function(){
    divCddQuestion2.style.display = "block";
    divInfoCdd.style.display = "none";
    outputResultCdd.innerHTML = '';
}); 

yesTemporaryReplacement.addEventListener('click', function(){
    outputResultCdd.innerHTML = '<p>Le contrat à durée déterminée est possible.</p>';
    divInfoCdd.style.display = "block";
    divCddQuestion3.style.display = "none";
});

noTemporaryReplacement.addEventListener('click', function(){
    divCddQuestion3.style.display = "block";
    divInfoCdd.style.display = "none";
    outputResultCdd.innerHTML = '';
});

yesWaitingEmployee.addEventListener('click', function(){
    outputResultCdd.innerHTML = '<p>Le contrat à durée déterminée est possible.</p>';
    divInfoCdd.style.display = "block";
});

noWaitingEmployee.addEventListener('click', function(){
    outputResultCdd.innerHTML = '<p>Seul le contrat à durée indéterminée est possible.</p>'
    divInfoCdd.style.display = "none";
});



// Pour faire disparaître le troisème écran et faire apparaître le quatrième

btnToScreen4.addEventListener('click', function(){
    listScreen3.style.color = "#6511D0";
    listScreen4.style.color = "#E25C33";
    screen3.style.display = "none";
    screen4.style.display = "block";
});

// Pour revenir à l'écran 2

btnBackToScreen2.addEventListener('click', function(){
    listScreen3.style.color = "#6511D0";
    listScreen2.style.color = "#E25C33";
    screen3.style.display = "none";
    screen2.style.display = "block";
});


// FIN ECRAN 3 - ECRAN CHOIX TYPE CONTRAT et DUREE CONTRAT

// -------------------------------------

// DEBUT ECRAN 4 - ECRAN CHOIX DATE D’EMBAUCHE 

// Variables

const yesEngagementLetter = document.getElementById('yes_engagement_letter');

const noEngagementLetter = document.getElementById('no_engagement_letter');

const divYesEngagementLetter = document.querySelector('.yes_engagement_letter');

const divNoEngagementLetter = document.querySelector('.no_engagement_letter');

const divTrialPeriod = document.querySelector('.trial_period');

const yesTrialPeriod = document.getElementById('yes_trial_period');

const noTrialPeriod = document.getElementById('no_trial_period');

const dateTrialPeriod = document.querySelector('.yes_trial_period');

const divTrialRenewable = document.querySelector('.trial_renewable');

const yesTrialRenewable = document.getElementById('yes_trial_renewable');

const noTrialRenewable = document.getElementById('no_trial_renewable');

const divYesTrialRenewable = document.querySelector('.yes_trial_renewable');

const divHiringDate = document.querySelector('.hiring_date');

const divContractTrialPeriod = document.querySelector('.contract_trial_period');

const yesContractTrialPeriod = document.getElementById('yes_contract_trial_period'); 

const noContractTrialPeriod = document.getElementById('no_contract_trial_period');

const divYesContractTrialPeriod = document.querySelector('.yes_contract_trial_period'); 

const divContractTrialRenewable = document.querySelector('.contract_trial_renewable');

const yesContractTrialRenewable = document.getElementById('yes_contract_trial_renewable');

const noContractTrialRenewable = document.getElementById('no_contract_trial_renewable');

const divYesContractTrialRenewable = document.querySelector('.yes_contract_trial_renewable');


// Pour faire disparaître le quatrième écran et faire apparaître le cinquième

const btnToScreen5 = document.querySelector('.button_toscreen5');

const listScreen5 = document.querySelector('.list-screen5');

const screen5 = document.querySelector('.screen5');

// Pour revenir à l'écran 3

const btnBackToScreen3 = document.querySelector('.button_backscreen3');

// Fonctions

// Résultat de lettre d'engagement 

yesEngagementLetter.addEventListener('click', function(){
    divYesEngagementLetter.style.display = "block";
    divTrialPeriod.style.display = "block";
    divHiringDate.style.display = "none";
    divContractTrialPeriod.style.display = "none";
    divYesContractTrialPeriod.style.display = "none";
    divContractTrialRenewable.style.display = "none";
});

noEngagementLetter.addEventListener('click', function(){
    divYesEngagementLetter.style.display = "none";
    divTrialPeriod.style.display = "none";
    dateTrialPeriod.style.display = "none";
    divTrialRenewable.style.display = "none";
    divHiringDate.style.display = "block";
    divContractTrialPeriod.style.display = "block";
});

// Résultat de période d'essai lettre d'engagement

yesTrialPeriod.addEventListener('click', function(){
    dateTrialPeriod.style.display = "block";
    divTrialRenewable.style.display = "block";
    divHiringDate.style.display = "none";
    divYesContractTrialRenewable.style.display = "none";
    divContractTrialPeriod.style.display = "none";
});

noTrialPeriod.addEventListener('click', function(){
    divTrialRenewable.style.display = "none";
    divHiringDate.style.display = "block";
    divContractTrialPeriod.style.display = "block";
    divYesContractTrialRenewable.style.display = "none";
    divContractTrialPeriod.style.display = "none";
    dateTrialPeriod.style.display = "none";
});

// Résultat de période d'essai renouvlable lettre d'engagement

yesTrialRenewable.addEventListener('click', function(){
    divYesTrialRenewable.style.display = "block";
    divHiringDate.style.display = "block";
    divContractTrialPeriod.style.display = "block";
    divContractTrialPeriod.style.display = "none";
});

noTrialRenewable.addEventListener('click', function(){
    divHiringDate.style.display = "block";
    divContractTrialPeriod.style.display = "block";
    divYesContractTrialPeriod.style.display = "none";
    divContractTrialPeriod.style.display = "none";
    divContractTrialPeriod.style.display = "none";
});

// Résultat de période d'essai inscrite au contrat

yesContractTrialPeriod.addEventListener('click', function(){
    divYesContractTrialPeriod.style.display = "block";
    divContractTrialRenewable.style.display = "block";
});

noContractTrialPeriod.addEventListener('click', function(){
    divYesContractTrialPeriod.style.display = "none";
    divContractTrialRenewable.style.display = "none";
});

// Résultat de période d'essai renouvlable inscrit au contrat

yesContractTrialRenewable.addEventListener('click', function(){
    divYesContractTrialRenewable.style.display = "block";
});

noContractTrialRenewable.addEventListener('click', function(){
    divYesContractTrialRenewable.style.display = "none";
});



// Pour faire disparaître le quatrième écran et faire apparaître le cinquième

btnToScreen5.addEventListener('click', function(){
    listScreen4.style.color = "#6511D0";
    listScreen5.style.color = "#E25C33";
    screen4.style.display = "none";
    screen5.style.display = "block";
});

// Pour revenir à l'écran 3

btnBackToScreen3.addEventListener('click', function(){
    listScreen4.style.color = "#6511D0";
    listScreen3.style.color = "#E25C33";
    screen4.style.display = "none";
    screen3.style.display = "block";
});

// FIN ECRAN 4 - ECRAN CHOIX DATE D’EMBAUCHE 

// ----------------------------------------------

// DEBUT ECRAN 5 - ECRAN LIEU DE TRAVAIL 

// Variables

// Pour faire disparaître le cinquième écran et faire apparaître le sixième

const btnToScreen6 = document.querySelector('.button_toscreen6');

const listScreen6 = document.querySelector('.list-screen6');

const screen6 = document.querySelector('.screen6');

const inputsScreen5 = screen5.querySelectorAll('.required5');

// Pour revenir à l'écran 4

const btnBackToScreen4 = document.querySelector('.button_backscreen4');

// Fonctions

// Pour faire disparaître le cinquième écran et faire apparaître le sixième

btnToScreen6.addEventListener('click', function(){
    // inputsScreen5.forEach(function(input) {
    //     if (input.value === '') {
    //         allFilled = false;
    //     }
    // });

    // if (allFilled) {
        listScreen5.style.color = "#6511D0";
        listScreen6.style.color = "#E25C33";
        screen5.style.display = "none";
        screen6.style.display = "block";
    // } else {
    //     alert('Tous les champs doivent être remplis.');
    // }
});

// Pour revenir à l'écran 4

btnBackToScreen4.addEventListener('click', function(){
    listScreen5.style.color = "#6511D0";
    listScreen4.style.color = "#E25C33";
    screen5.style.display = "none";
    screen4.style.display = "block";
});

// FIN ECRAN 5 - ECRAN LIEU DE TRAVAIL 

// --------------------------------------------

// DEBUT ECRAN 6 - ECRAN FONCTIONS

// Bloc Domaine Enfant

// Variables

const yesChildCare = document.getElementById('yes_child-care');
const noChildCare = document.getElementById('no_child-care');

const divFunctionChild1 = document.querySelector('.function_child1');

// Linge enfant

const yesChildClothes = document.getElementById('yes_child-clothes');
const noChildClothes = document.getElementById('no_child-clothes');

const divFunctionChild2 = document.querySelector('.function_child2');

const divYesChildClothes = document.querySelector('.yes_child-clothes');

// Devoir enfant

const yesHomework = document.getElementById('yes_child-homework');
const noHomework = document.getElementById('no_child-homework');

const divFunctionChild3 = document.querySelector('.function_child3');

const divYesHomework = document.querySelector('.yes_child-homework');

// Nettoyer les especes de vie enfant

const yesChildCleaning = document.getElementById('yes_child-cleaning');
const noChildCleaning = document.getElementById('no_child-cleaning');

const divFunctionChild4 = document.querySelector('.function_child4');

const divYesChildCleaning = document.querySelector('.yes_child-cleaning');

// S'occuper de plusieurs enfants

const yesChildren = document.getElementById('yes_children');
const noChildren = document.getElementById('no_children');

const divYesChildren = document.querySelector('.yes_children');
const divNoChildren = document.querySelector('.no_children');

// Fonctions

yesChildCare.addEventListener('click', function(){
    divFunctionChild1.style.display = "block";
});

noChildCare.addEventListener('click', function(){
    divFunctionChild1.style.display = "none";
    divFunctionChild2.style.display = "none";
    divFunctionChild3.style.display = "none";
    divFunctionChild4.style.display = "none";
});

// Linge enfant

yesChildClothes.addEventListener('click', function(){
    divYesChildClothes.style.display = "block";
    divFunctionChild2.style.display = "none";
    divFunctionChild3.style.display = "none";
    divFunctionChild4.style.display = "none";
});

noChildClothes.addEventListener('click', function(){
    divFunctionChild2.style.display = "block";
    divYesChildClothes.style.display = "none";
});

// Devoir enfant

yesHomework.addEventListener('click', function(){
    divYesHomework.style.display = "block";
    divFunctionChild3.style.display = "none";
    divFunctionChild4.style.display = "none";
});

noHomework.addEventListener('click', function(){
    divYesHomework.style.display = "none";
    divFunctionChild3.style.display = "block";
});

// Nettoyer les especes de vie enfant

yesChildCleaning.addEventListener('click', function(){
    divYesChildCleaning.style.display = "block";
    divFunctionChild4.style.display = "none";
});

noChildCleaning.addEventListener('click', function(){
    divYesChildCleaning.style.display = "none";
    divFunctionChild4.style.display = "block";
});

// S'occuper de plusieurs enfants

yesChildren.addEventListener('click', function(){
    divYesChildren.style.display = "block";
    divNoChildren.style.display = "none";
});

noChildren.addEventListener('click', function(){
    divYesChildren.style.display = "none";
    divNoChildren.style.display = "block";
});

// Bloc Domaine Adult

// Variables

const yesAdultCare = document.getElementById('yes_adult-care');
const noAdultCare = document.getElementById('no_adult-care');

const divFunctionAdult1 = document.querySelector('.function_adult1');

// Réaliser les gestes liés à la délégation des soins d’un employeur en situation de handicap

const yesDisabled1 = document.getElementById('yes_disabled1');
const noDisabled1 = document.getElementById('no_disabled1');

const divFunctionAdult2 = document.querySelector('.function_adult2');

const divYesDisabled1 = document.querySelector('.yes_disabled1');

// ASSISTER : repas, hygiène, habillage

const yesDisabled2 = document.getElementById('yes_disabled2');
const noDisabled2 = document.getElementById('no_disabled2');

const divFunctionAdult3 = document.querySelector('.function_adult3');

const divYesDisabled2 = document.querySelector('.yes_disabled2');

// Réaliser à la place de l'employeur la préparation de repas spécifiques

const yesDisabled3 = document.getElementById('yes_disabled3');
const noDisabled3 = document.getElementById('no_disabled3');

const divFunctionAdult4 = document.querySelector('.function_adult4');

const divYesDisabled3 = document.querySelector('.yes_disabled3');

// ACCOMPAGNER : repas, hygiène, habillage

const yesDisabled4 = document.getElementById('yes_disabled4');
const noDisabled4 = document.getElementById('no_disabled4');

const divFunctionAdult5 = document.querySelector('.function_adult5');

const divYesDisabled4 = document.querySelector('.yes_disabled4');

// Effectuer et/ou accompagner l'employeur dans la préparation de repas spécifiques

const yesDisabled5 = document.getElementById('yes_disabled5');
const noDisabled5 = document.getElementById('no_disabled5');

const divYesDisabled5 = document.querySelector('.yes_disabled5');
const divNoDisabled5 = document.querySelector('.no_disabled5');

// Fonctions

yesAdultCare.addEventListener('click', function(){
    divFunctionAdult1.style.display = "block";
});

noAdultCare.addEventListener('click', function(){
    divFunctionAdult1.style.display = "none";
    divFunctionAdult2.style.display = "none";
    divFunctionAdult3.style.display = "none";
    divFunctionAdult4.style.display = "none";
    divFunctionAdult5.style.display = "none";
});

// Réaliser les gestes liés à la délégation des soins d’un employeur en situation de handicap

yesDisabled1.addEventListener('click', function(){
    divYesDisabled1.style.display = "block";
    divFunctionAdult2.style.display = "none";
    divFunctionAdult3.style.display = "none";
    divFunctionAdult4.style.display = "none";
    divFunctionAdult5.style.display = "none";
});

noDisabled1.addEventListener('click', function(){
    divFunctionAdult2.style.display = "block";
    divYesDisabled1.style.display = "none";
});

// ASSISTER : repas, hygiène, habillage

yesDisabled2.addEventListener('click', function(){
    divYesDisabled2.style.display = "block";
    divFunctionAdult3.style.display = "none";
    divFunctionAdult4.style.display = "none";
    divFunctionAdult5.style.display = "none";
});

noDisabled2.addEventListener('click', function(){
    divYesDisabled2.style.display = "none";
    divFunctionAdult3.style.display = "block";
});

// Réaliser à la place de l'employeur la préparation de repas spécifiques

yesDisabled3.addEventListener('click', function(){
    divYesDisabled3.style.display = "block";
    divFunctionAdult4.style.display = "none";
    divFunctionAdult5.style.display = "none";
});

noDisabled3.addEventListener('click', function(){
    divYesDisabled3.style.display = "none";
    divFunctionAdult4.style.display = "block";
});

// ACCOMPAGNER : repas, hygiène, habillage

yesDisabled4.addEventListener('click', function(){
    divYesDisabled4.style.display = "block";
    divFunctionAdult5.style.display = "none";
});

noDisabled4.addEventListener('click', function(){
    divYesDisabled4.style.display = "none";
    divFunctionAdult5.style.display = "block";
});

// Effectuer et/ou accompagner l'employeur dans la préparation de repas spécifiques

yesDisabled5.addEventListener('click', function(){
    divYesDisabled5.style.display = "block";
    divNoDisabled5.style.display = "none";
});

noDisabled5.addEventListener('click', function(){
    divYesDisabled5.style.display = "none";
    divNoDisabled5.style.display = "block";
});



// Bloc Domaine Espace de vie

// Variables

const yesLifeSpace = document.getElementById('yes_lifespace');
const noLifeSpace = document.getElementById('no_lifespace');

const divFunctionLifeSpace1 = document.querySelector('.function_lifespace1');

// Surveiller et assurer une présence auprès d'un ou de plusieurs enfants de plus de 3 ans.

const yesLifeSpace1 = document.getElementById('yes_lifespace1');
const noLifeSpace1 = document.getElementById('no_lifespace1');

const divFunctionLifeSpace2 = document.querySelector('.function_lifespace2');

const divYesLifeSpace1 = document.querySelector('.yes_lifespace1');

// Surveiller un ou plusieurs enfants dans la réalisation des devoirs.

const yesLifeSpace2 = document.getElementById('yes_lifespace2');
const noLifeSpace2 = document.getElementById('no_lifespace2');

const divFunctionLifeSpace3 = document.querySelector('.function_lifespace3');

const divYesLifeSpace2 = document.querySelector('.yes_lifespace2');

// Effectuer les courses

const yesLifeSpace3 = document.getElementById('yes_lifespace3');
const noLifeSpace3 = document.getElementById('no_lifespace3');

const divFunctionLifeSpace4 = document.querySelector('.function_lifespace4');

const divYesLifeSpace3 = document.querySelector('.yes_lifespace3');

// Préparer les repas courants

const yesLifeSpace4 = document.getElementById('yes_lifespace4');
const noLifeSpace4 = document.getElementById('no_lifespace4');

const divFunctionLifeSpace5 = document.querySelector('.function_lifespace5');

const divYesLifeSpace4 = document.querySelector('.yes_lifespace4');

// Repasser le linge délicat.

const yesLifeSpace5 = document.getElementById('yes_lifespace5');
const noLifeSpace5 = document.getElementById('no_lifespace5');

const divFunctionLifeSpace6 = document.querySelector('.function_lifespace6');

const divYesLifeSpace5 = document.querySelector('.yes_lifespace5');

// Entretenir le linge.

const yesLifeSpace6 = document.getElementById('yes_lifespace6');
const noLifeSpace6 = document.getElementById('no_lifespace6');

const divYesLifeSpace6 = document.querySelector('.yes_lifespace6');
const divNoLifeSpace6 = document.querySelector('.no_lifespace6');

// Fonctions

yesLifeSpace.addEventListener('click', function(){
    divFunctionLifeSpace1.style.display = "block";
});

noLifeSpace.addEventListener('click', function(){
    divFunctionLifeSpace1.style.display = "none";
    divFunctionLifeSpace2.style.display = "none";
    divFunctionLifeSpace3.style.display = "none";
    divFunctionLifeSpace4.style.display = "none";
    divFunctionLifeSpace5.style.display = "none";
    divFunctionLifeSpace6.style.display = "none";
});

// Surveiller et assurer une présence auprès d'un ou de plusieurs enfants de plus de 3 ans.

yesLifeSpace1.addEventListener('click', function(){
    divYesLifeSpace1.style.display = "block";
    divFunctionLifeSpace2.style.display = "none";
    divFunctionLifeSpace3.style.display = "none";
    divFunctionLifeSpace4.style.display = "none";
    divFunctionLifeSpace5.style.display = "none";
    divFunctionLifeSpace6.style.display = "none";
});

noLifeSpace1.addEventListener('click', function(){
    divFunctionLifeSpace2.style.display = "block";
    divYesLifeSpace1.style.display = "none";
});

// Surveiller un ou plusieurs enfants dans la réalisation des devoirs.

yesLifeSpace2.addEventListener('click', function(){
    divYesLifeSpace2.style.display = "block";
    divFunctionLifeSpace3.style.display = "none";
    divFunctionLifeSpace4.style.display = "none";
    divFunctionLifeSpace5.style.display = "none";
    divFunctionLifeSpace6.style.display = "none";
});

noLifeSpace2.addEventListener('click', function(){
    divYesLifeSpace2.style.display = "none";
    divFunctionLifeSpace3.style.display = "block";
});

// Effectuer les courses

yesLifeSpace3.addEventListener('click', function(){
    divYesLifeSpace3.style.display = "block";
    divFunctionLifeSpace4.style.display = "none";
    divFunctionLifeSpace5.style.display = "none";
    divFunctionLifeSpace6.style.display = "none";
});

noLifeSpace3.addEventListener('click', function(){
    divYesLifeSpace3.style.display = "none";
    divFunctionLifeSpace4.style.display = "block";
});

// Préparer les repas courants

yesLifeSpace4.addEventListener('click', function(){
    divYesLifeSpace4.style.display = "block";
    divFunctionLifeSpace5.style.display = "none";
    divFunctionLifeSpace6.style.display = "none";
});

noLifeSpace4.addEventListener('click', function(){
    divYesLifeSpace4.style.display = "none";
    divFunctionLifeSpace5.style.display = "block";
});

// Repasser le linge délicat.

yesLifeSpace5.addEventListener('click', function(){
    divYesLifeSpace5.style.display = "block";
    divFunctionLifeSpace6.style.display = "none";
});

noLifeSpace5.addEventListener('click', function(){
    divYesLifeSpace5.style.display = "none";
    divFunctionLifeSpace6.style.display = "block";
});

// Entretenir le linge.

yesLifeSpace6.addEventListener('click', function(){
    divYesLifeSpace6.style.display = "block";
    divNoLifeSpace6.style.display = "none";
});

noLifeSpace6.addEventListener('click', function(){
    divYesLifeSpace6.style.display = "none";
    divNoLifeSpace6.style.display = "block";
});

// Bloc Domaine environnement exterieur

// Variables 

const yesOutside = document.getElementById('yes_outside');
const noOutside = document.getElementById('no_outside');

const divFunctionOutside1 = document.querySelector('.function_outside1');

// Effectuer des petits travaux de jardinage

const yesOutside1 = document.getElementById('yes_outside1');
const noOutside1 = document.getElementById('no_outside1');

const divYesOutside1 = document.querySelector('.yes_outside1');

const divNoOutside1 = document.querySelector('.no_outside1');

// Surveiller la propriété (habitation et dépendances)

const yesOutside2 = document.getElementById('yes_outside2');
const noOutside2 = document.getElementById('no_outside2');

const divNoOutside2 = document.querySelector('.no_outside2');
const divYesOutside2_3 = document.querySelector('.yes_outside2-3');

// Entretenir la propriété (habitation et dépendances)

const yesOutside3 = document.getElementById('yes_outside3');
const noOutside3 = document.getElementById('no_outside3');

const divNoOutside3 = document.querySelector('.no_outside3');

// Assurer des tâches complémentaires

const yesOutside4 = document.getElementById('yes_outside4');
const noOutside4 = document.getElementById('no_outside4');

const divNoOutside4 = document.querySelector('.no_outside4');
const divYesOutside4 = document.querySelector('.yes_outside4');

// Fonctions

yesOutside.addEventListener('click', function(){
    divFunctionOutside1.style.display = "block";
});

noOutside.addEventListener('click', function(){
    divFunctionOutside1.style.display = "none";
    divNoOutside2.style.display = "none";
});

// Effectuer des petits travaux de jardinage

yesOutside1.addEventListener('click', function(){
    divYesOutside1.style.display = "block";
    divNoOutside1.style.display = "none";
    divNoOutside2.style.display = "none";
    divNoOutside3.style.display = "none";
});

noOutside1.addEventListener('click', function(){
    divNoOutside1.style.display = "block";
    divYesOutside1.style.display = "none";
});

// Surveiller la propriété (habitation et dépendances)

yesOutside2.addEventListener('click', function(){
    divYesOutside2_3.style.display = "block";
    divNoOutside2.style.display = "none";
    divNoOutside3.style.display = "none";
    divYesOutside4.style.display = "none";
    divNoOutside4.style.display = "none";
});

noOutside2.addEventListener('click', function(){
    divYesOutside2_3.style.display = "none";
    divNoOutside2.style.display = "block";
    divNoOutside3.style.display = "none";
    divYesOutside4.style.display = "none";
    divNoOutside4.style.display = "none";
});

// Entretenir la propriété (habitation et dépendances)

yesOutside3.addEventListener('click', function(){
    divYesOutside2_3.style.display = "block";
    divNoOutside3.style.display = "none";
    divYesOutside4.style.display = "none";
    divNoOutside4.style.display = "none";
});

noOutside3.addEventListener('click', function(){
    divYesOutside2_3.style.display = "none";
    divNoOutside3.style.display = "block";
    divYesOutside4.style.display = "none";
    divNoOutside4.style.display = "none";
});

// Assurer des tâches complémentaires

yesOutside4.addEventListener('click', function(){
    divYesOutside4.style.display = "block";
    divNoOutside4.style.display = "none";
});

noOutside4.addEventListener('click', function(){
    divNoOutside4.style.display = "block";
    divYesOutside4.style.display = "none";
});



// Pour faire disparaître le cinquième écran et faire apparaître le sixième

const btnToScreen7 = document.querySelector('.button_toscreen7');

const listScreen7 = document.querySelector('.list-screen7');

const screen7 = document.querySelector('.screen7');

const inputsScreen6 = screen6.querySelectorAll('.required6');

// Pour revenir à l'écran 5

const btnBackToScreen5 = document.querySelector('.button_backscreen5');

// Pour faire disparaître le cinquième écran et faire apparaître le sixième

btnToScreen7.addEventListener('click', function(){
    listScreen6.style.color = "#6511D0";
    listScreen7.style.color = "#E25C33";
    screen6.style.display = "none";
    screen7.style.display = "block";
});

// Pour revenir à l'écran 5

btnBackToScreen5.addEventListener('click', function(){
    listScreen6.style.color = "#6511D0";
    listScreen5.style.color = "#E25C33";
    screen6.style.display = "none";
    screen5.style.display = "block";
});

// FIN ECRAN 6 - ECRAN FONCTIONS