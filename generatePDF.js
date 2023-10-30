/* Génération du fichier PDF par la librairie JSPDF */

'use strict'

function generatePDF() {

    console.log("NOUVELLE EXECUTION DU CODE");
    
    const {jsPDF} = window.jspdf;

    /* Espacement entre les lignes augmenté à 1.25, car
    la valeur par défaut serre un peu trop entre les lignes. */
    const lineHeight = 1.25;

    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true, 
        lineHeight: lineHeight
    });


    /* Tout au long du programme, utiliser ces variables en les mettant à jour
    à chaque fois que nécessaire. Comme cela on saura toujours quelle est la dernière
    hauteur y définie, la marge, taille de police, etc. */
    const lineBreak_After2ndTitle = 10;
    const lineBreak_Before2ndTitle = 20;
    let fontSize;
    const marginLeft = 25;
    const marginRight = 25;
    const marginUp = 30;
    const marginDown = 30;

    // y est la coordonnée verticale pour l'écriture du texte.
    let y = marginUp;
    let text;
    // réponse aux boutons radio, etc.
    let answerValue1, answerValue2;

    let typeOfContract; // "CDI" ou "CDD"
    let dureeTravailDeterminee = false;
    let sexEmployer; // "male" ou "female"
    let dateBeginContract;

    let domaineEnfant = false;
    let domaineAdulte = false;
    let domaineEspaceDeVie = false;
    let domaineEnvironnementExt = false;
    let fonctionAssistanceVieCouD = false;



    let page = 1; // numero de la page en cours dans le PDF
    let heightParagraph; // hauteur du paragraphe courant

    // calcul precis en mm de la hauteur de page et largeur de page
    let pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    let pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();


    /* -------- ECRITURE DU TITRE DU PDF ---------- */

    doc.setFont('helvetica', 'normal');

    /* On définit la taille de la police, toujours "en points", avant d'écrire le texte.
    Toujours mettre à jour fontSize lorsque la taille de la police change, comme cela
    il suffit d'utiliser fontSize à tout moment dans un appel de fonction au besoin. */
    fontSize = 22;
    doc.setFontSize(fontSize);


    /* Dans l'écran 3, l'utilisateur décide si le contrat de travail est
    à durée déterminée ou indéterminée (bouton radio) */
    let radios = document.getElementsByName('occasional_task');
    let answerContent, occasional_task_answerValue;
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            // aswerValue correspond à l'attribut value choisi par le client (code HTML)
            occasional_task_answerValue = radios[i].value;
        }
    }

    radios = document.getElementsByName('temporary_replacement');
    let temporary_replacement_answerValue;
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            // aswerValue correspond à l'attribut value choisi par le client (code HTML)
            temporary_replacement_answerValue = radios[i].value;
        }
    }

    radios = document.getElementsByName('waiting-employee');
    let waiting_employee_answerValue;
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            // aswerValue correspond à l'attribut value choisi par le client (code HTML)
            waiting_employee_answerValue = radios[i].value;
        }
    }

    //console.log("answerValue : " + answerValue + " et answerContent : " + answerContent);

    let title;
    if(occasional_task_answerValue === "yes"
    || (occasional_task_answerValue === "no" && 
        temporary_replacement_answerValue === "yes_temporary_replacement")
    || (occasional_task_answerValue === "no" && 
        temporary_replacement_answerValue === "no_temporary_replacement"
        && waiting_employee_answerValue === "yes_waiting-employee")) {
        typeOfContract = "CDD";
        title = "Contrat de travail à durée déterminée";
        doc.text(title, marginLeft, y);
    }
    else if(occasional_task_answerValue === "no"
    && temporary_replacement_answerValue === "no_temporary_replacement"
    && waiting_employee_answerValue === "no-waiting-employee") {
        typeOfContract = "CDI";
        title = "Contrat de travail à durée indéterminée";
        console.log("CDI");
        doc.text(title, marginLeft, y);
    }
    else {
        console.log("Type de contrat non répondu par l'utilisateur.");
        title = "Contrat de travail";
        doc.text(title, marginLeft, y);
    }

    
    
    /* ------- FIN ECRITURE DU TITRE DU PDF ---------- */





    /* ------- SOULIGNEMENT DU TITRE ---------- */

    /* Obtenir la largeur du texte. À noter qu'au début la largeur est 
    selon l'unité choisie pour le document, puis elle augmente de plus en plus. */
    var titleWidth = doc.getTextWidth(title);

    // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
    y += 5;

    // Couleur du soulignement (RVB)
    doc.setDrawColor(229, 165, 73);

    // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
    doc.setLineWidth(1);

    // Dessiner le soulignement, les unités sont les unités choisies pour le document.
    doc.line(marginLeft, y, pageWidth - marginRight, y); 

    /* ------- FIN SOULIGNEMENT DU TITRE ---------- */




    /* -------------------------- */
    /* ------- ECRAN 1 ---------- */
    /* -------------------------- */


    

    /* ------- TITRE ORANGE ITALIQUE ---------- */

    y += lineBreak_Before2ndTitle;
    doc.setFont('helvetica', 'bolditalic');
    fontSize = 15;
    doc.setFontSize(fontSize);
    doc.setTextColor(229, 165, 73);
    doc.text("Entre Employeur – Particulier employeur", marginLeft, y);

    /* ------- FIN TITRE ORANGE ITALIQUE ---------- */




    doc.setFont('helvetica', 'normal');
    fontSize = 12;
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);


    // Récupération du CHAMP Civilité Employeur
    radios = document.getElementsByName('sex');
    let civilite, valeur;
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            valeur = radios[i].value;
            // Sélectionnez l'élément <label> associé à l'input radio "male_co-employer"
            let labelElement = document.querySelector('label[for="'+ valeur + '"]');
            // Récupérez le texte à l'intérieur de l'élément <label>
            civilite = labelElement.textContent;
            sexEmployer = civilite;
        }
    }

    // Récupération du CHAMP Date de naissance 
    // On récupère l'input HTML type="date" par lequel l'utilisateur a écrit la date
    let dateInput = document.getElementById("birth_date").value; 
    let dateObj = new Date(dateInput);
    // Numéro du jour dans le mois
    let dayNumber = dateObj.getDate();
    // Mois écrit en lettres, en français
    let monthLetters = dateObj.toLocaleString('fr-FR', { month: 'long' }); 
    let annee = dateObj.getFullYear();
    // Formater la date
    let dateFormatee = `${dayNumber} ${monthLetters} ${annee}`;


    y += lineBreak_After2ndTitle;

    /* CHAMPS Nom de naissance, nom d'usage, prénom, date de naissance,
    commune de naissance */
    text = civilite
    + ' ' + document.getElementById("use_name").value
    + ' ' + document.getElementById("given_name").value
    + ' né(e) ' + document.getElementById("birth_name").value
    + ' le ' + dayNumber + ' ' + monthLetters + ' ' + annee
    + ' à ' + document.getElementById("place_of_birth").value;

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});



    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    // CHAMP Adresse, code postal, commune
    text = 'Demeurant' + ' ' + document.getElementById("address").value + ' ' + document.getElementById("zip_code").value + ' ' + document.getElementById("city").value;

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});


    // Nouveau bloc

    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    // CHAMP Numéro de téléphone, courriel
    text = 'N° de téléphone : ' + document.getElementById("phone_number").value 
    + ' ' + ' Courriel : ' + document.getElementById("email_employer").value;

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // Nouveau bloc

    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    let selectElement = document.getElementById("immatriculation");
    let choice = selectElement.selectedIndex;
    let selectedOptionText = selectElement.options[choice].text;

    text = 'N° ' + selectedOptionText + ' : ' + document.getElementById("matriculation").value;

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    /* Nouveau bloc : les informations sur le co-employeur s'affichent 
    si le prénom du co-employeur est renseigné. */

    if(document.getElementById("given_name_co-employer").value !== "") {
        //console.log("Il y a un prénom co-employeur");

        // CHAMP Civilité co-Employeur
        radios = document.getElementsByName('sex_co-employer');
        for(let i = 0; i < radios.length; i++){
            if(radios[i].checked){
                valeur = radios[i].value;
                // Sélectionnez l'élément <label> associé à l'input radio "male_co-employer"
                let labelElement = document.querySelector('label[for="'+ valeur + '"]');
                // Récupérez le texte à l'intérieur de l'élément <label>
                civilite = labelElement.textContent;
            }
        }

        // On récupère l'input HTML type="date" par lequel l'utilisateur a écrit la date
        dateInput = document.getElementById("birth_date_co-employer").value; 
        dateObj = new Date(dateInput);

        // Numéro du jour dans le mois
        dayNumber = dateObj.getDate();
        // Mois écrit en lettres, en français
        monthLetters = dateObj.toLocaleString('fr-FR', { month: 'long' }); 
        annee = dateObj.getFullYear();

        // Formater la date
        const dateFormatee = `${dayNumber} ${monthLetters} ${annee}`;


        text = civilite
        + ' ' + document.getElementById("use_name_co-employer").value
        + ' ' + document.getElementById("given_name_co-employer").value
        + ' né(e) ' + document.getElementById("birth_name_co-employer").value
        + ' le ' + dayNumber + ' ' + monthLetters + ' ' + annee
        + ' à ' + document.getElementById("place_of_birth_co-employer").value;

        y += lineBreakText(1, fontSize, lineHeight);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});



        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

        let answer;
        // L'adresse du co-employeur est-elle la même que l'employeur ? :
        radios = document.getElementsByName('address_co-employer');
        for(let i = 0; i < radios.length; i++){
            if(radios[i].checked){
                valeur = radios[i].value;
                // Sélectionnez l'élément <label> associé à l'input radio
                let labelElement = document.querySelector('label[for="'+ valeur + '"]');
                // Récupérez le texte à l'intérieur de l'élément <label>
                answer = labelElement.textContent;
            }
        }

        // Si l'utilisateur répond oui, on met la même addresse que l'employeur :
        if(answer === 'Oui') {
            text = 'Demeurant' + ' ' + document.getElementById("address").value + ' ' + document.getElementById("zip_code").value + ' ' + document.getElementById("city").value;
        }
        else if(answer ==='Non') {
            text = 'Demeurant' + ' ' + document.getElementById("address_co-employer").value + ' ' + document.getElementById("zip_code_co-employer").value + ' ' + document.getElementById("city_co-employer").value;
        }

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});


        // Nouveau bloc

        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

        text = 'N° de téléphone : ' + document.getElementById("phone_co-employer").value 
        + ' ' + ' Courriel : ' + document.getElementById("email_co-employer").value;

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    }

    text = "Dénommé Particulier employeur au contrat";

    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    doc.text(text, pageWidth -  marginRight, y, {maxWidth: (pageWidth -  marginLeft - marginRight), align: "right"});

    // Nouveau bloc : 

    y += lineBreakText(3, fontSize, lineHeight);






    /* -------------------------- */
    /* ------- ECRAN 2 ---------- */
    /* -------------------------- */


    



    /* ------- TITRE ORANGE ITALIQUE ---------- */

    doc.setFont('helvetica', 'bolditalic');
    fontSize = 15;
    doc.setFontSize(fontSize);
    doc.setTextColor(229, 165, 73);
    doc.text("Et Employé", marginLeft, y);

    /* ------- FIN TITRE ORANGE ITALIQUE ---------- */


    doc.setFont('helvetica', 'normal');
    fontSize = 12;
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);


    // Récupération du CHAMP Civilité Employeur
    radios = document.getElementsByName('sex_employee');
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            valeur = radios[i].value;
            // Sélectionnez l'élément <label> associé à l'input radio
            let labelElement = document.querySelector('label[for="'+ valeur + '"]');
            // Récupérez le texte à l'intérieur de l'élément <label>
            civilite = labelElement.textContent;
        }
    }

    // Récupération du CHAMP Date de naissance 
    // On récupère l'input HTML type="date" par lequel l'utilisateur a écrit la date
    dateInput = document.getElementById("birth_date_employee").value; 
    dateObj = new Date(dateInput);
    // Numéro du jour dans le mois
    dayNumber = dateObj.getDate();
    // Mois écrit en lettres, en français
    monthLetters = dateObj.toLocaleString('fr-FR', { month: 'long' }); 
    annee = dateObj.getFullYear();
    // Formater la date
    dateFormatee = `${dayNumber} ${monthLetters} ${annee}`;


    y += lineBreak_After2ndTitle;

    /* CHAMPS Nom de naissance, nom d'usage, prénom, date de naissance,
    commune de naissance */
    text = civilite
    + ' ' + document.getElementById("use_name_employee").value
    + ' ' + document.getElementById("given_name_employee").value
    + ' né(e) ' + document.getElementById("birth_name_employee").value
    + ' le ' + dayNumber + ' ' + monthLetters + ' ' + annee
    + ' à ' + document.getElementById("place_of_birth_employee").value;

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});



    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    // CHAMP Adresse, code postal, commune
    text = 'Demeurant' + ' ' + document.getElementById("address_employee").value + ' ' + document.getElementById("zip_employee").value + ' ' + document.getElementById("city_employee").value;

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});


    // Nouveau bloc

    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    // CHAMP Numéro de téléphone, courriel
    text = 'N° de téléphone : ' + document.getElementById("phone_number_employee").value 
    + ' ' + ' Courriel : ' + document.getElementById("email_employee").value;

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});


    // Nouveau bloc
    
    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    text = 'Nationalité : ' + document.getElementById("social_number_employee").value;    

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});


    // Nouveau bloc
    
    y += lineBreakText(1, fontSize, lineHeight);

    text = 'N° de sécurité sociale : ' + document.getElementById("social_number_employee").value;

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});


    // Nouveau bloc

    text = "Dénommé l'employé au contrat";

    y += lineBreakText(1, fontSize, lineHeight);

    doc.text(text, pageWidth -  marginRight, y, {maxWidth: (pageWidth -  marginLeft - marginRight), align: "right"});

    // Nouveau bloc : 



    /* -------------------------- */
    /* ------- ECRAN 3 ---------- */
    /* -------------------------- */


    /* ------- TITRE ARTICLE ---------- */

    y += lineBreak_Before2ndTitle;
    doc.setFont('helvetica');
    fontSize = 15;
    doc.setFontSize(fontSize);
    // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
    doc.setTextColor(229, 165, 73); 
    title = "Article 1 - Date d'effet du contrat et période d'essai";
    doc.text(title, marginLeft, y);

    /* ------- FIN TITRE ARTICLE ---------- */


    /* ------- SOULIGNEMENT DU TITRE ---------- */

    /* Obtenir la largeur du texte. À noter qu'au début la largeur est 
    selon l'unité choisie pour le document, puis elle augmente de plus en plus. */
    var titleWidth = doc.getTextWidth(title);

    // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
    y += 2;

    // Couleur du soulignement (RVB)
    // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
    doc.setTextColor(229, 165, 73); 

    // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
    doc.setLineWidth(0.5);

    // Dessiner le soulignement, les unités sont les unités choisies pour le document.
    // Correction de 26 mm pour que le trait soit de la bonne longueur.
    doc.line(marginLeft, y, titleWidth + 26, y); 

    /* ------- FIN SOULIGNEMENT DU TITRE ---------- */


    doc.setFont('helvetica', 'normal');
    fontSize = 12;
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);


    // Nouveau bloc
    
    y += lineBreakText(2, fontSize, lineHeight);

    text = 'La date d’effet de la relation de travail correspond au premier jour travaillé.';
    
    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});


    // Nouveau bloc

    y += lineBreakText(2, fontSize, lineHeight);
    
    if(occasional_task_answerValue === "yes") 
        text = "Le CDD est conclu en raison d'un besoin temporaire : tâche occasionnelle définie et non durable.";
    else if(temporary_replacement_answerValue === "yes_temporary_replacement")
        text = "Le CDD est conclu en raison du remplacement d'un employé absent temporairement dont les causes sont multiples (maladie, maternité...).";
        else if(waiting_employee_answerValue === "yes_waiting-employee")
            text = "Le CDD est conclu en raison de l'attente d'un employé déjà embauché en CDI, retardant l'entrée de l'employé à son poste.";
            else text = "[Les boutons radio permettant de savoir si le contrat est CDD ou CDI n'ont pas été remplis par l'utilisateur.]"; ;

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // Nouveau bloc
    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    y += lineBreakText(1, fontSize, lineHeight);



    let dateBegin;
    let dateEnd;
    if(occasional_task_answerValue === "yes"
        || temporary_replacement_answerValue === "yes_temporary_replacement"
        || waiting_employee_answerValue === "yes_waiting-employee") {
        // On récupère l'input HTML type="date" par lequel l'utilisateur a écrit la date
        dateInput = document.getElementById("date_debut_contract").value; 
        dateBegin = inputDate_to_lettersDateFr(dateInput);

        dateInput = document.getElementById("date_end_contract").value; 
        dateEnd = inputDate_to_lettersDateFr(dateInput);

    }


    if(temporary_replacement_answerValue === "yes_temporary_replacement"
        || waiting_employee_answerValue === "yes_waiting-employee") {

        text = "Ce contrat est conclu pour la durée de l'absence de M/Mme " +
        document.getElementById("remplacement_name").value;

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

        text = "et pour une durée minimale de " + document.getElementById('contract_duration').value + ".";

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        y += lineBreakText(2, fontSize, lineHeight);

        text = "Ce contrat est conclu à partir du " + dateBegin + " jusqu'au " + dateEnd + ".";

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        y += lineBreakText(2, fontSize, lineHeight);

        text = "Il prendra fin au retour de M/Mme " + document.getElementById("remplacement_name").value + ".";

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});
    }
    else if(occasional_task_answerValue === "yes") {
        text = "Ce contrat est conclu à partir du " + dateBegin + " jusqu'au " + dateEnd + ".";

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});
    }
    else { 
        text = "[Les boutons radio permettant de savoir si le contrat est CDD ou CDI n'ont pas été remplis par l'utilisateur.]"; 
        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});
    }




    /* -------------------------- */
    /* ------- ECRAN 3 ---------- */
    /* -------------------------- */




    // RECUPERER RESULTAT BOUTON RADIO
    radios = document.getElementsByName('engagement_letter');
    let answerValue;
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            // aswerValue correspond à l'attribut value choisi par le client (code HTML)
            answerValue = radios[i].value;
        }
    }



    // Si il y a eu une lettre d'engagement
    if(answerValue === "yes_engagement_letter") {
        let dateInput1 = document.getElementById("date_engagement_letter").value;
        dateBeginContract = document.getElementById("hiring_date").value; 

        text = "A la suite de la lettre d’engagement du " + inputDate_to_lettersDateFr(dateInput1) + ", les parties ont décidé de formaliser la relation de travail par un contrat de travail à durée indéterminée remis le " + inputDate_to_lettersDateFr(dateBeginContract) + ".";

        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

        y += lineBreakText(1, fontSize, lineHeight);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});
    }
        

    /* ------- TITRE 2EME NIVEAU ---------- */

    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    y += lineBreakText(1, fontSize, lineHeight);
    doc.setFont('helvetica');
    fontSize = 13;
    doc.setFontSize(fontSize);
    doc.setTextColor(229, 165, 73);
    title = "1-2 Période d'essai";
    doc.text(title, marginLeft, y);

    /* ------- FIN TITRE 2EME NIVEAU ---------- */

    /* ------- SOULIGNEMENT DU TITRE ---------- */


    // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
    y += 2;

    // Couleur du soulignement (RVB)
    doc.setDrawColor(229, 165, 73);

    // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
    doc.setLineWidth(0.5);

    // Dessiner le soulignement, les unités sont les unités choisies pour le document.
    doc.line(marginLeft, y, doc.getTextWidth(title) + 25.5, y); 

    /* ------- FIN SOULIGNEMENT DU TITRE ---------- */
    

    doc.setFont('helvetica', 'normal');
    fontSize = 12;
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);

    y += lineBreakText(2, fontSize, lineHeight);

    y = testPageBreak(doc, y, 0, marginUp, marginDown);

    text = "Article 131 du socle spécifique « salarié du particulier employeur » de la convention collective.";

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // Nouveau bloc 

    // RECUPERER RESULTAT BOUTON RADIO : y a-t-il une periode d'essai ? ATTENTION : 2 questions l'indiquent (lettre d'engagement, ou question simple)
    radios = document.getElementsByName('contract_trial_period');
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            // aswerValue correspond à l'attribut value choisi par le client (code HTML)
            answerValue1 = radios[i].value;
        }
    }

    // RECUPERER RESULTAT BOUTON RADIO : y a-t-il une periode d'essai ? ATTENTION : 2 questions l'indiquent (lettre d'engagement, ou question simple)
    radios = document.getElementsByName('trial_period');
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            // aswerValue correspond à l'attribut value choisi par le client (code HTML)
            answerValue2 = radios[i].value;
        }
    }

    // Si il y a une période d'essai.
    if(answerValue1 === "yes_contract_trial_period"
    || answerValue2 === "yes_trial_period") {
        let dateEndTrialPeriode = document.getElementById("date-end_contract_trial_period").value;

        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        y += lineBreakText(1, fontSize, lineHeight);

        y = testPageBreak(doc, y, 0, marginUp, marginDown);

        text = "Durée de la période d’essai : " + "CHAMP A AJOUTER PAR Aelita";

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // Nouveau bloc
        
        y += lineBreakText(2, fontSize, lineHeight);

        text = "Le présent contrat ne devient définitif qu’à l’issue d’une période d’essai de " + "CHAMP A AJOUTER PAR Aelita" + ", renouvelable une fois pour la même durée, dans le respect de la législation à savoir :";

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // Nouveau bloc

        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        y += lineBreakText(1, fontSize, lineHeight);

        text = "La durée maximale de la période d’essai dépend de la durée du contrat :";

        heightParagraph = lineHeight;

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // Nouveau bloc

        text = "- Pour un CDD inférieur ou égal à 6 mois, la période d’essai maximale est d’1 jour par semaine, dans la limite de 2 semaines.";

        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

        y = testPageBreak(doc, y, 0, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // Nouveau bloc

        text = "- Pour un CDD supérieur à 6 mois, la période d’essai maximale est d’1 jour par semaine, dans la limite d’1 mois.";

        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        y += lineBreakText(1, fontSize, lineHeight);
        y = testPageBreak(doc, y, 0, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // Nouveau bloc

        text = "Ces durées sont applicables, que le salarié soit embauché à temps plein ou à temps partiel.";

        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        y += lineBreakText(1, fontSize, lineHeight);
        y = testPageBreak(doc, y, 0, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // Nouveau bloc

        text = "Le particulier Employeur informera au préalable le salarié par écrit du renouvellement de la période d’essai et il s’assurera de l’accord du salarié pour ce renouvellement.";

        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        y += lineBreakText(1, fontSize, lineHeight);
        y = testPageBreak(doc, y, 0, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});         
    }
    else if(answerValue1 === "no_contract_trial_period"
    || answerValue2 === "no_trial_period") {
        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        y += lineBreakText(1, fontSize, lineHeight);

        y = testPageBreak(doc, y, 0, marginUp, marginDown);

        text = "Ce contrat ne comporte pas de période d'essai.";

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});
    }
    else {
        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        y += lineBreakText(1, fontSize, lineHeight);

        y = testPageBreak(doc, y, 0, marginUp, marginDown);

        text = "[Bouton radio non indiqué par l'utilisateur.]";

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});
    }





    /* -------------------------- */
    /* ------- ECRAN 5 ---------- */
    /* -------------------------- */





    /* ------- TITRE ARTICLE ---------- */

    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    y += lineBreakText(2, fontSize, lineHeight);
    doc.setFont('helvetica');
    fontSize = 15;
    doc.setFontSize(fontSize);
    // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
    doc.setTextColor(229, 165, 73); 
    title = "Article 2 - Lieu(x) habituel(s) de travail";
    heightParagraph = fontSize;
    y = testPageBreak(doc, y, 0, marginUp, marginDown);
    doc.text(title, marginLeft, y);

    /* ------- FIN TITRE ARTICLE ---------- */


    /* ------- SOULIGNEMENT DU TITRE ---------- */

    /* Obtenir la largeur du texte. À noter qu'au début la largeur est 
    selon l'unité choisie pour le document, puis elle augmente de plus en plus. */
    var titleWidth = doc.getTextWidth(title);

    // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
    y += 2;

    // Couleur du soulignement (RVB)
    // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
    doc.setTextColor(229, 165, 73); 

    // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
    doc.setLineWidth(0.5);

    // Dessiner le soulignement, les unités sont les unités choisies pour le document.
    // Correction de 26 mm pour que le trait soit de la bonne longueur.
    doc.line(marginLeft, y, titleWidth + 26, y); 

    /* ------- FIN SOULIGNEMENT DU TITRE ---------- */

    doc.setFont('helvetica', 'normal');
    fontSize = 12;
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);


    // Nouveau bloc

    y += lineBreakText(2, fontSize, lineHeight);
            
    text = "Le(s) lieu (x) de travail habituel(s) du salarié est/sont :";

    heightParagraph = fontSize;

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // Nouveau bloc

    y += lineBreakText(2, fontSize, lineHeight);
            
    text = "Domicile du particulier employeur : ";

    heightParagraph = fontSize;

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // Nouvea bloc

    y += lineBreakText(2, fontSize, lineHeight);
                
    text = "    - " + document.getElementById("workplace_main").value + ", " + document.getElementById("zip_workplace_main").value + ", " + document.getElementById("city_workplace_main").value;

    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // Nouveau bloc

    if(document.getElementById("workplace_secondary").value !== "") {
        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        y += lineBreakText(1, fontSize, lineHeight);
                
        text = "Résidence secondaire du particulier employeur : ";

        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // Nouveau bloc

        y += lineBreakText(2, fontSize, lineHeight);
                    
        text = "    - " + document.getElementById("workplace_secondary").value + ", " + document.getElementById("zip_workplace_secondary").value + ", " + document.getElementById("city_workplace_secondary").value;

        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});
    }

    // Nouveau bloc

    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Toutefois, en fonction des nécessités des missions confiées au salarié, l’employeur se réserve le droit de demander au salarié d'effectuer des déplacements ponctuels en dehors du domicile. Si le salarié est appelé à travailler de manière occasionnelle sur un lieu autre que celui/ceux indiqués au contrat, un accord entre l’employeur et le salarié, formalisé par un avenant au présent contrat de travail, en fixera les modalités particulières.";

    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});





    /* -------------------------- */
    /* ------- ECRAN 6 ---------- */
    /* -------------------------- */





    /* ------- TITRE ARTICLE ---------- */

    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    y += lineBreakText(2, fontSize, lineHeight);
    doc.setFont('helvetica');
    fontSize = 15;
    doc.setFontSize(fontSize);
    // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
    doc.setTextColor(229, 165, 73); 
    title = "Article 3 – Nature de l'emploi et fonction";
    heightParagraph = fontSize;
    y = testPageBreak(doc, y, 0, marginUp, marginDown);
    doc.text(title, marginLeft, y);

    /* ------- FIN TITRE ARTICLE ---------- */


    /* ------- SOULIGNEMENT DU TITRE ---------- */

    /* Obtenir la largeur du texte. À noter qu'au début la largeur est 
    selon l'unité choisie pour le document, puis elle augmente de plus en plus. */
    var titleWidth = doc.getTextWidth(title);

    // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
    y += 2;

    // Couleur du soulignement (RVB)
    // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
    doc.setTextColor(229, 165, 73); 

    // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
    doc.setLineWidth(0.5);

    // Dessiner le soulignement, les unités sont les unités choisies pour le document.
    // Correction de 26 mm pour que le trait soit de la bonne longueur.
    doc.line(marginLeft, y, titleWidth + 26, y); 

    /* ------- FIN SOULIGNEMENT DU TITRE ---------- */

    doc.setFont('helvetica', 'normal');
    fontSize = 12;
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);


    // Nouveau bloc

    y += lineBreakText(2, fontSize, lineHeight);
                
    text = "Pour déterminer l’emploi-repère du salarié, il convient de se référer à la grille de classification figurant à l’annexe 7 de la présente convention collective.";

    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // Nouveau bloc

    y += lineBreakText(3, fontSize, lineHeight);
                
    text = "Le salarié occupe un emploi dans le(s) domaine(s) :";

    heightParagraph = fontSize;

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // Nouveau bloc

    y += lineBreakText(1, fontSize, lineHeight);
        
    text = [];
    if(document.getElementById('yes_child-care').checked) {
        text.push('    - Domaine "Enfant"');
        domaineEnfant = true;
    }
    if(document.getElementById('yes_adult-care').checked) {
        text.push('    - Domaine "Adulte" aide à la personne');
        domaineAdulte = true;
    }
    if(document.getElementById('yes_lifespace').checked) {
        text.push('    - Domaine "Espace de vie" entretien, ménage');
        domaineEspaceDeVie = true;
    }
    if(document.getElementById('yes_outside').checked) {
        text.push('    - Domaine "Environnement externe"');
        domaineEnvironnementExt = true;
    }
    if(text.length !== 0) {
        y += lineBreakText(1, fontSize, lineHeight);
    }

    heightParagraph = lineBreakText(text.length, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Et pour la / les fonction(s) :";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = lineBreakText(1, fontSize, lineHeight);;

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Il y a 1 seule fonction choisie par domaine.
    // On va faire un tableau dont chaque case contient une fonction.
    text = [];

    // On va remplir la première case du tableau, qui est la première fonction :
    if(document.getElementById('yes_child-clothes').checked) 
        text.push("    - Garde d'enfant(s) B Echelle 3");
    else if(document.getElementById('yes_child-homework').checked
        || document.getElementById('yes_child-cleaning').checked
        || document.getElementById('yes_children').checked) 
        text.push("    - Garde d'enfant(s) A Echelle 3");
    else if(document.getElementById('no_child-homework').checked)
        text.push("    - Baby-sitter Echelle 1");

    // On va remplir la deuxième case du tableau, qui est la deuxième fonction :
    if(document.getElementById('yes_disabled1').checked) {
        text.push("    - Assistant(e) de vie D Echelle 6");
        fonctionAssistanceVieCouD = true;
    }
    else if(document.getElementById('yes_disabled2').checked
        || document.getElementById('yes_disabled3').checked) {
        text.push("    - Assistant(e) de vie C Echelle 5");
        fonctionAssistanceVieCouD = true;

    }
    else if(document.getElementById('yes_disabled4').checke
        || document.getElementById('yes_disabled5').checked)
        text.push("    - Assistant(e) de vie B Echelle 4");
    else if(document.getElementById('no_disabled5').checked)
        text.push("    - Assistant(e) de vie A Echelle 3");

    // On va remplir la troisième case du tableau, qui est la troisième fonction :
    if(document.getElementById('yes_lifespace1').checked
        || document.getElementById('yes_lifespace2').checked) 
        text.push("    - Employé(e) familial(e) auprès d’enfants Echelle 3");
    else if(document.getElementById('yes_lifespace3').checked
        || document.getElementById('yes_lifespace4').checked
        || document.getElementById('yes_lifespace5').checked
        || document.getElementById('yes_lifespace6').checked)
        text.push("    - Employé(e) familial(e) B Echelle 2");  
    else if(document.getElementById('no_lifespace6').checked)
        text.push("    - Employé(e) familial(e) A Echelle 1");

    // On va remplir la quatrième case du tableau, qui est la quatrième fonction :
    if(document.getElementById('yes_outside1').checked)
        text.push("    - Employé(e) d'entretien et petits travaux/Homme-Femme toutes mains B Echelle 2");
    else if(document.getElementById('yes_outside3').checked)
        text.push("    - Employé(e) d'entretien et petits travaux/Homme-Femme toutes mains A Echelle 1");
    else if(document.getElementById('no_outside4').checked)
        text.push("    - Gardien(ne) A Echelle 2");
    else if(document.getElementById('yes_outside4').checked)
        text.push("    - Gardien(ne) B Echelle 3");


    if(text.length !== 0) {
        y += lineBreakText(2, fontSize, lineHeight);
        
        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = lineBreakText(text.length, fontSize, lineHeight);

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});
    }

    // NOUVEAU BLOC

    // Saut de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Les activités du salarié sont décrites dans la fiche de l’emploi-repère annexée au présent contrat dont un exemplaire est remis au salarié.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC


    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Le salarié est chargé des activités complémentaires suivantes :";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = lineBreakText(1, fontSize, lineHeight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});


    // NOUVEAU BLOC


    // Saut(s) de ligne suite au texte précédent.
    y += lineBreakText(2, fontSize, lineHeight);
                
    // RECUPERER RESULTAT CHECKBOXES
    /* Sélectionnez tous les éléments de type checkbox avec le name "interest"
    et les met dans une NodeList (ce n'est pas un tableau) */
    let selectedCheckboxes = document.querySelectorAll('input[name="other_functions"]:checked');
    let labelElement;
    text = [];
    // Créez un tableau vide pour stocker les valeurs sélectionnées
    /* Parcourir toutes les cases à cocher de la NodeList selectedCheckboxes,
    et ajouter leur valeur au tableau */
    selectedCheckboxes.forEach(function(checkbox) {
        console.log("une checkbox est selectionnee");
        labelElement = document.querySelector('label[for="'+ checkbox.value + '"]');
        console.log("intitulé visible : " + labelElement.textContent);
        text.push("    - " + labelElement.textContent);
    });

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = lineBreakText(text.length, fontSize, lineHeight);;

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});





    /* -------------------------- */
    /* ------- ECRAN 7 ---------- */
    /* -------------------------- */


    /* ------- TITRE ARTICLE ---------- */

    y += heightParagraph;

    y += lineBreakText(2, fontSize, lineHeight);
    doc.setFont('helvetica');
    fontSize = 15;
    doc.setFontSize(fontSize);
    // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
    doc.setTextColor(229, 165, 73); 
    title = "Article 4 - Durée et horaires de travail";
    heightParagraph = lineBreakText(1, fontSize, lineHeight);;
    y = testPageBreak(doc, y, 0, marginUp, marginDown);
    doc.text(title, marginLeft, y);

    /* ------- FIN TITRE ARTICLE ---------- */


    /* ------- SOULIGNEMENT DU TITRE ---------- */

    /* Obtenir la largeur du texte. À noter qu'au début la largeur est 
    selon l'unité choisie pour le document, puis elle augmente de plus en plus. */
    var titleWidth = doc.getTextWidth(title);

    // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
    y += 2;

    // Couleur du soulignement (RVB)
    // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
    doc.setTextColor(229, 165, 73); 

    // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
    doc.setLineWidth(0.5);

    // Dessiner le soulignement, les unités sont les unités choisies pour le document.
    // Correction de 26 mm pour que le trait soit de la bonne longueur.
    doc.line(marginLeft, y, titleWidth + 26, y); 

    /* ------- FIN SOULIGNEMENT DU TITRE ---------- */

    doc.setFont('helvetica', 'normal');
    fontSize = 12;
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);


    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Articles 132, 133-1 et 134 du socle spécifique « salarié du particulier employeur » de la convention relatif au travail régulier et irrégulier ainsi qu’à la durée maximale de travail hebdomadaire.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});


    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(2, fontSize, lineHeight);
                
    text = "Lorsque le salarié a plusieurs particuliers employeurs, il s’engage à ne pas excéder la durée maximale de travail hebdomadaire prévue par la Convention collective.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});


    /* ------- TITRE 2EME NIVEAU ---------- */

    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    y += lineBreakText(1, fontSize, lineHeight);
    doc.setFont('helvetica');
    fontSize = 13;
    doc.setFontSize(fontSize);
    doc.setTextColor(229, 165, 73);
    title = "4-1 Durée déterminée ou irrégulière";
    doc.text(title, marginLeft, y);

    /* ------- FIN TITRE 2EME NIVEAU ---------- */

    /* ------- SOULIGNEMENT DU TITRE ---------- */


    // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
    y += 2;

    // Couleur du soulignement (RVB)
    doc.setDrawColor(229, 165, 73);

    // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
    doc.setLineWidth(0.5);

    // Dessiner le soulignement, les unités sont les unités choisies pour le document.
    doc.line(marginLeft, y, doc.getTextWidth(title) + 25.5, y); 

    /* ------- FIN SOULIGNEMENT DU TITRE ---------- */
    

    doc.setFont('helvetica', 'normal');
    fontSize = 12;
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);

    // RECUPERER RESULTAT BOUTON RADIO TRAVAIL DUREE DETERMINEE OU NON
    radios = document.getElementsByName('working_time1');
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked) {
            // answerValue correspond à l'attribut value choisi par le client (code HTML)
            // Durée déterminée : valeur "yes", sinon valeur "no"
            answerValue = radios[i].value;
        }
    }

    // 1 - CAS TRAVAIL DUREE irrégulière (DONC indéterminée)

    if(answerValue === "no") {
        dureeTravailDeterminee = false;
        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += lineBreakText(2, fontSize, lineHeight);
                    
        text = "Conformément à la définition prévue à l’article 132 de la convention collective nationale de la branche du secteur des particuliers employeurs et de l'emploi à domicile.";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});


        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(2, fontSize, lineHeight);
                    
        text = "En cas de durée de travail irrégulière, la durée est comprise entre 0 heure et 48 heures maximum par semaine.";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});


        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(2, fontSize, lineHeight);
                    
        text = "Dans ce cas, le particulier employeur informe par écrit dans le respect d’un délai de prévenance de 5 jours calendaires, des jours et des horaires de travail, en précisant les heures de présence responsable de jour le cas échéant.";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});



        // RECUPERER RESULTAT LISTE DEROULANTE Mode de transmission du planning.
        // Maintenant on souhaite récupérer le texte visible du menu déroulant.
        let selectElement = document.getElementById("deliveryMethod");
        let choice = selectElement.selectedIndex;
        let selectedOptionText = selectElement.options[choice].text;

        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(2, fontSize, lineHeight);
                    
        text = "Le planning sera remis au salarié par le moyen suivant : " + selectedOptionText + ".";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});


        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(2, fontSize, lineHeight);
                    
        text = "Le délai de prévenance ne s’applique pas dans des situations exceptionnelles imprévisibles et/ou en raison d’impératifs non constants s’imposant au particulier employeur.";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});
    }
    // 1 - CAS où la durée du travail est déterminée (rien à voir avec CDD ou non)
    else if(answerValue === "yes") {
        dureeTravailDeterminee = true;
        // RECUPERER RESULTAT BOUTON RADIO REPARTITION DES HEURES CONNUE OU NON ?
        radios = document.getElementsByName('working_time2');
        let answerValue2;
        for(let i = 0; i < radios.length; i++){
            if(radios[i].checked) {
                // answerValue correspond à l'attribut value choisi par le client (code HTML)
                // Durée déterminée : valeur "yes", sinon valeur "no"
                answerValue2 = radios[i].value;
            }
        }
        // 2 - CAS ou la durée est déterminée mais pas les jours et horaires.
        if(answerValue2 === "no") {
            let nbEffectiveHours = document.getElementById("working_hours").value;
            let nbResponsibleHours = document.getElementById("responsible_hours").value;

            // NOUVEAU BLOC

            // Saut(s) de ligne suite au texte précédent.
            y += lineBreakText(2, fontSize, lineHeight);
                        
            text = "Le salarié effectue " + nbEffectiveHours + " heure(s) de travail effective(s) hebdomadaire(s), et s’y ajoute(nt) le cas échéant " + nbResponsibleHours + " heure(s) de présence responsable hebdomadaire(s).";

            // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
            heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
            // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

            y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

            doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

            // RECUPERER RESULTAT LISTE DEROULANTE Mode de transmission du planning.
            // Maintenant on souhaite récupérer le texte visible du menu déroulant.
            let selectElement = document.getElementById("deliveryMethod");
            let choice = selectElement.selectedIndex;
            let selectedOptionText = selectElement.options[choice].text;

            // NOUVEAU BLOC

            // Saut(s) de ligne suite au texte précédent.
            y += heightParagraph;
            y += lineBreakText(2, fontSize, lineHeight);
                        
            text = "Le planning sera remis au salarié par le moyen suivant : " + selectedOptionText + ".";

            // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
            heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
            // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

            y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

            doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

            // NOUVEAU BLOC

            // Saut(s) de ligne suite au texte précédent.
            y += heightParagraph;
            y += lineBreakText(2, fontSize, lineHeight);
                        
            text = "La répartition des jours et horaires de travail est indiquée par écrit dans un planning de travail remis au salarié dans le respect d’un délai de prévenance de 5 jours calendaires, sauf circonstances exceptionnelles (qui sont par nature imprévisible et/ ou résultent d’impératifs non constants s’imposant au particulier employeur).";

            // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
            heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
            // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

            y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

            doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

            // NOUVEAU BLOC

            // Saut(s) de ligne suite au texte précédent.
            y += heightParagraph;
            y += lineBreakText(2, fontSize, lineHeight);
                        
            text = "Le salarié peut être amené à réaliser, sur demande du particulier employeur, des heures de travail au-delà de la durée de travail effectif hebdomadaire indiquée ci-dessus, dans la limite de la durée maximale de travail.";

            // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
            heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
            // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

            y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

            doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        }
        // 3 - CAS où la durée est déterminée et les jours et horaires aussi
        else if(answerValue2 === "yes") {

            // NOUVEAU BLOC

            // Saut(s) de ligne suite au texte précédent.
            y += lineBreakText(2, fontSize, lineHeight);

            // Indice 0 : lundi 
            let arrivalHours = [];
            let departureHours = [];
            let realPresence = [];
            let effectiveWork = [];
            let responsiblePresence = [];
            let result;


            arrivalHours[0] = document.getElementById("arrivalMonday").value;
            arrivalHours[1] = document.getElementById("arrivalTuesday").value;
            arrivalHours[2] = document.getElementById("arrivalWednesday").value;
            arrivalHours[3] = document.getElementById("arrivalThursday").value;
            arrivalHours[4] = document.getElementById("arrivalFriday").value;
            arrivalHours[5] = document.getElementById("arrivalSaturday").value;
            arrivalHours[6] = document.getElementById("arrivalSunday").value;

            departureHours[0] = document.getElementById("departureMonday").value;
            departureHours[1] = document.getElementById("departureTuesday").value;
            departureHours[2] = document.getElementById("departureWednesday").value;
            departureHours[3] = document.getElementById("departureThursday").value;
            departureHours[4] = document.getElementById("departureFriday").value;
            departureHours[5] = document.getElementById("departureSaturday").value;
            departureHours[6] = document.getElementById("departureSunday").value;

            for(let i=0; i<7; i++) {
                result = calcDifferenceHours(arrivalHours[i], departureHours[i]);
                realPresence[i] = result[2] + ':' + result[3];
            }

            effectiveWork[0] = document.getElementById("monday_actual_work").value;
            effectiveWork[1] = document.getElementById("tuesday_actual-work").value;
            effectiveWork[2] = document.getElementById("wednesday_actual_work").value;
            effectiveWork[3] = document.getElementById("thursday_actual_work").value;
            effectiveWork[4] = document.getElementById("friday_actual_work").value;
            effectiveWork[5] = document.getElementById("saturday_actual_work").value;
            effectiveWork[6] = document.getElementById("sunday_actual_work").value;

            responsiblePresence[0] = document.getElementById("monday_responsible_presence").value;
            responsiblePresence[1] = document.getElementById("tuesday_responsible_presence").value;
            responsiblePresence[2] = document.getElementById("wednesday_responsible_presence").value;
            responsiblePresence[3] = document.getElementById("thursday_responsible_presence").value;
            responsiblePresence[4] = document.getElementById("friday_responsible_presence").value;
            responsiblePresence[5] = document.getElementById("saturday_responsible_presence").value;
            responsiblePresence[6] = document.getElementById("sunday_responsible_presence").value;

            // On définit les headers du tableau

            let headersTab = [{
                id: "blank",
                name: "blank",
                prompt: "   ",
                width: 45,
                align: "left",
                padding: 0
            },
            {
                id: "Lundi",
                name: "lundi",
                prompt: "Lundi",
                width: 25,
                align: "center",
                padding: 0
            },
            {
                id: "Mardi",
                name: "mardi",
                prompt: "Mardi",
                width: 25,
                align: "center",
                padding: 0
            },
            {
                id: "Mercredi",
                name: "mercredi",
                prompt: "Mercredi",
                width: 30,
                align: "center",
                padding: 0
            },
            {
                id: "Jeudi",
                name: "jeudi",
                prompt: "Jeudi",
                width: 25,
                align: "center",
                padding: 0
            },
            {
                id: "Vendredi",
                name: "vendredi",
                prompt: "Vendredi",
                width: 32,
                align: "center",
                padding: 0
            },
            {
                id: "Samedi",
                name: "samedi",
                prompt: "Samedi",
                width: 30,
                align: "center",
                padding: 0
            },
            {
                id: "Dimanche",
                name: "dimanche",
                prompt: "Dimanche",
                width: 34,
                align: "center",
                padding: 0
            }];
            
            
            // On écrit chaque ligne du tableau entre accolades :
              
            let dataTab = [{
                blank: "Heure d'arrivée",
                lundi: arrivalHours[0],
                mardi: arrivalHours[1],
                mercredi: arrivalHours[2],
                jeudi: arrivalHours[3],
                vendredi: arrivalHours[4],
                samedi: arrivalHours[5],
                dimanche: arrivalHours[6]
            },
            {
                blank: "Heure de départ",
                lundi: departureHours[0],
                mardi: departureHours[1],
                mercredi: departureHours[2],
                jeudi: departureHours[3],
                vendredi: departureHours[4],
                samedi: departureHours[5],
                dimanche: departureHours[6]
            },
            {
                blank: "Durée présence réelle",
                lundi: realPresence[0],
                mardi: realPresence[1],
                mercredi: realPresence[2],
                jeudi: realPresence[3],
                vendredi: realPresence[4],
                samedi: realPresence[5],
                dimanche: realPresence[6]
            },
            {
                blank: "Dont travail effectif",
                lundi: effectiveWork[0],
                mardi: effectiveWork[1],
                mercredi: effectiveWork[2],
                jeudi: effectiveWork[3],
                vendredi: effectiveWork[4],
                samedi: effectiveWork[5],
                dimanche: effectiveWork[6]
            },
            {
                blank: "Et présence responsable",
                lundi: responsiblePresence[0],
                mardi: responsiblePresence[1],
                mercredi: responsiblePresence[2],
                jeudi: responsiblePresence[3],
                vendredi: responsiblePresence[4],
                samedi: responsiblePresence[5],
                dimanche: responsiblePresence[6]
            }];

            // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
            heightParagraph = 90; // Hauteur du tableau
            // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

            y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

            // On affiche le tableau.
            // On va changer les couleurs du texte d'en-tête, et du background
            // #169EFF est du bleu
            doc.setFont('helvetica', 'normal');
 

            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.2); 

            // On affiche le tableau :
            doc.table(10, marginUp, dataTab, headersTab, {headerBackgroundColor: "#FFFFFF", autoSize: false, margins: 1, fontSize: 10});

            // NOUVEAU BLOC

            // Saut(s) de ligne suite au texte précédent.
            y += heightParagraph;
            y += lineBreakText(1, fontSize, lineHeight);
                        
            text = "En cas de nécessité, les horaires de travail peuvent faire l’objet d’une modification d’un commun accord entre les parties.";

            // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
            heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

            y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

            doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

            // NOUVEAU BLOC

            // Saut(s) de ligne suite au texte précédent.
            y += heightParagraph;
            y += lineBreakText(1, fontSize, lineHeight);
                        
            text = "Par ailleurs, le salarié peut être amené à réaliser, sur demande du particulier employeur, des heures de travail au-delà de la durée de travail effectif hebdomadaire indiquée ci-dessus.";

            // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
            heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

            y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

            doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

            // NOUVEAU BLOC

            // Saut(s) de ligne suite au texte précédent.
            y += heightParagraph;
            y += lineBreakText(1, fontSize, lineHeight);
                        
            text = "Dans tous les cas, la durée maximale de travail est fixée à une moyenne de 48 heures de travail effectif par semaine calculée sur une période de 12 semaines consécutives sans dépasser 50 heures au cours de la même semaine.";

            // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
            heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

            y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

            doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});
        }
    } // fin du cas où la durée du travail est déterminée (rien à voir avec CDD ou non)

    if(domaineAdulte === true || domaineEnfant === true) {
        /* -------------------------- */
        /* ------- ECRAN 8 ---------- */
        /* -------------------------- */


        /* ------- TITRE 2EME NIVEAU ---------- */

        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

        y += lineBreakText(1, fontSize, lineHeight);
        doc.setFont('helvetica');
        fontSize = 13;
        doc.setFontSize(fontSize);
        doc.setTextColor(229, 165, 73);
        title = "4-3 Heures de présence nuit";
        doc.text(title, marginLeft, y);

        /* ------- FIN TITRE 2EME NIVEAU ---------- */

        /* ------- SOULIGNEMENT DU TITRE ---------- */


        // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
        y += 2;

        // Couleur du soulignement (RVB)
        doc.setDrawColor(229, 165, 73);

        // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
        doc.setLineWidth(0.5);

        // Dessiner le soulignement, les unités sont les unités choisies pour le document.
        doc.line(marginLeft, y, doc.getTextWidth(title) + 25.5, y); 

        /* ------- FIN SOULIGNEMENT DU TITRE ---------- */
        

        doc.setFont('helvetica', 'normal');
        fontSize = 12;
        doc.setFontSize(fontSize);
        doc.setTextColor(0, 0, 0);

        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += lineBreakText(2, fontSize, lineHeight);
                    
        text = "Articles 137-2 du socle spécifique « salarié du particulier employeur » de la convention relatif au travail régulier et irrégulier ainsi qu’à la durée maximale de travail hebdomadaire.";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(1, fontSize, lineHeight);
                    
        text = "Le salarié est amené à réaliser des heures de présence de nuit. Dans ce cadre, le salarié est dans l’obligation de dormir sur place, dans des conditions décentes au sein d’une pièce séparée.";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(1, fontSize, lineHeight);
                    
        text = "Les parties ont convenu de la plage horaire de la nuit, suivante :";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(1, fontSize, lineHeight);

        // Indice 0 : lundi 
        let startTime = [];
        let endTime = [];

        startTime[0] = document.getElementById("arrivalMondayNight").value;
        startTime[1] = document.getElementById("arrivalTuesdayNight").value;
        startTime[2] = document.getElementById("arrivalWednesdayNight").value;
        startTime[3] = document.getElementById("arrivalThursdayNight").value;
        startTime[4] = document.getElementById("arrivalFridayNight").value;
        startTime[5] = document.getElementById("arrivalSaturdayNight").value;
        startTime[6] = document.getElementById("arrivalSundayNight").value;

        endTime[0] = document.getElementById("departureMondayNight").value;
        endTime[1] = document.getElementById("departureTuesdayNight").value;
        endTime[2] = document.getElementById("departureWednesdayNight").value;
        endTime[3] = document.getElementById("departureThursdayNight").value;
        endTime[4] = document.getElementById("departureFridayNight").value;
        endTime[5] = document.getElementById("departureSaturdayNight").value;
        endTime[6] = document.getElementById("departureSundayNight").value;


        // On définit les headers du tableau

        let headersTab = [{
            id: "blank",
            name: "blank",
            prompt: "   ",
            width: 45,
            align: "left",
            padding: 0
        },
        {
            id: "Lundi",
            name: "lundi",
            prompt: "Lundi",
            width: 25,
            align: "center",
            padding: 0
        },
        {
            id: "Mardi",
            name: "mardi",
            prompt: "Mardi",
            width: 25,
            align: "center",
            padding: 0
        },
        {
            id: "Mercredi",
            name: "mercredi",
            prompt: "Mercredi",
            width: 30,
            align: "center",
            padding: 0
        },
        {
            id: "Jeudi",
            name: "jeudi",
            prompt: "Jeudi",
            width: 25,
            align: "center",
            padding: 0
        },
        {
            id: "Vendredi",
            name: "vendredi",
            prompt: "Vendredi",
            width: 32,
            align: "center",
            padding: 0
        },
        {
            id: "Samedi",
            name: "samedi",
            prompt: "Samedi",
            width: 30,
            align: "center",
            padding: 0
        },
        {
            id: "Dimanche",
            name: "dimanche",
            prompt: "Dimanche",
            width: 34,
            align: "center",
            padding: 0
        }];
        
        
        // On écrit chaque ligne du tableau entre accolades :
          
        let dataTab = [{
            blank: "Heure début",
            lundi: startTime[0],
            mardi: startTime[1],
            mercredi: startTime[2],
            jeudi: startTime[3],
            vendredi: startTime[4],
            samedi: startTime[5],
            dimanche: startTime[6]
        },
        {
            blank: "Heure fin",
            lundi: endTime[0],
            mardi: endTime[1],
            mercredi: endTime[2],
            jeudi: endTime[3],
            vendredi: endTime[4],
            samedi: endTime[5],
            dimanche: endTime[6]
        }];

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = 40; // Hauteur du tableau

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        // On affiche le tableau.
        // On va changer les couleurs du texte d'en-tête, et du background
        // #169EFF est du bleu
        doc.setFont('helvetica', 'normal');


        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.2); 

        // On affiche le tableau :
        doc.table(10, y, dataTab, headersTab, {headerBackgroundColor: "#FFFFFF", autoSize: false, margins: 1, fontSize: 10});

        // NOUVEAU BLOC

        doc.setFont('helvetica', 'normal');
        fontSize = 12;
        doc.setFontSize(fontSize);
        doc.setTextColor(0, 0, 0);

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(1, fontSize, lineHeight);

        text = "Ces heures de présence de nuit peuvent s’ajouter à des heures de jour prévues à l’article 6 du présent contrat.";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(1, fontSize, lineHeight);

        text = "Il est précisé que le temps de la présence de nuit n’est pas pris en compte pour déterminer la durée de travail effectif hebdomadaire.";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(1, fontSize, lineHeight);

        text = "Il est possible de prévoir l’inscription des heures de présence de nuit dans le carnet de transmission.";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        /* ------- TITRE 2EME NIVEAU ---------- */

        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

        y += lineBreakText(1, fontSize, lineHeight);
        doc.setFont('helvetica');
        fontSize = 13;
        doc.setFontSize(fontSize);
        doc.setTextColor(229, 165, 73);
        title = "4-4 Nombre d'interventions nuit";
        doc.text(title, marginLeft, y);

        /* ------- FIN TITRE 2EME NIVEAU ---------- */

        /* ------- SOULIGNEMENT DU TITRE ---------- */


        // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
        y += 2;

        // Couleur du soulignement (RVB)
        doc.setDrawColor(229, 165, 73);

        // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
        doc.setLineWidth(0.5);

        // Dessiner le soulignement, les unités sont les unités choisies pour le document.
        doc.line(marginLeft, y, doc.getTextWidth(title) + 25.5, y); 

        /* ------- FIN SOULIGNEMENT DU TITRE ---------- */
        

        doc.setFont('helvetica', 'normal');
        fontSize = 12;
        doc.setFontSize(fontSize);
        doc.setTextColor(0, 0, 0);

        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += lineBreakText(2, fontSize, lineHeight);

        text = "Les parties conviennent d’un commun accord que le salarié pourra, sauf nécessité imprévue ou inhabituelle, être amené à intervenir habituellement " + document.getElementById("num-night-intervantion").value + " fois au cours de la nuit.";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(1, fontSize, lineHeight);
                    
        text = "Si toutes les nuits, le salarié est amené à intervenir au moins 4 fois, les heures de présence de nuit sont requalifiées en heures de travail effectif et le contrat de travail fera l’objet d’un avenant.";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});
    }
    if(fonctionAssistanceVieCouD === true) {
        /* ------- TITRE 2EME NIVEAU ---------- */

        y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

        y += lineBreakText(1, fontSize, lineHeight);
        doc.setFont('helvetica');
        fontSize = 13;
        doc.setFontSize(fontSize);
        doc.setTextColor(229, 165, 73);
        title = "4-5 Horaires garde malade";
        doc.text(title, marginLeft, y);

        /* ------- FIN TITRE 2EME NIVEAU ---------- */

        /* ------- SOULIGNEMENT DU TITRE ---------- */


        // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
        y += 2;

        // Couleur du soulignement (RVB)
        doc.setDrawColor(229, 165, 73);

        // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
        doc.setLineWidth(0.5);

        // Dessiner le soulignement, les unités sont les unités choisies pour le document.
        doc.line(marginLeft, y, doc.getTextWidth(title) + 25.5, y); 

        /* ------- FIN SOULIGNEMENT DU TITRE ---------- */
        

        doc.setFont('helvetica', 'normal');
        fontSize = 12;
        doc.setFontSize(fontSize);
        doc.setTextColor(0, 0, 0);

        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += lineBreakText(2, fontSize, lineHeight);

        text = "Le salarié est amené à réaliser des heures de garde malade de nuit. Dans ce cadre, le salarié est tenu de rester à proximité du malade et ne dispose pas d’une pièce séparée.";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(1, fontSize, lineHeight);
                    
        text = "Les heures de garde malade de nuit ne sont pas compatibles avec un emploi de jour à temps complet (40 heures par semaines).";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(1, fontSize, lineHeight);

        // Indice 0 : lundi 
        let startTime = [];
        let endTime = [];

        startTime[0] = document.getElementById("monday_arrival_night-patient-care").value;
        startTime[1] = document.getElementById("tuesday_arrival_night-patient-care").value;
        startTime[2] = document.getElementById("wednesday_arrival_night-patient-care").value;
        startTime[3] = document.getElementById("thursday_arrival_night-patient-care").value;
        startTime[4] = document.getElementById("friday_arrival_night-patient-care").value;
        startTime[5] = document.getElementById("saturday_arrival_night-patient-care").value;
        startTime[6] = document.getElementById("sunday_arrival_night-patient-care").value;

        endTime[0] = document.getElementById("monday_departure_night-patient-care").value;
        endTime[1] = document.getElementById("tuesday_departure_night-patient-care").value;
        endTime[2] = document.getElementById("wednesday_departure_night-patient-care").value;
        endTime[3] = document.getElementById("thursday_departure_night-patient-care").value;
        endTime[4] = document.getElementById("friday_departure_night-patient-care").value;
        endTime[5] = document.getElementById("saturday_departure_night-patient-care").value;
        endTime[6] = document.getElementById("sunday_departure_night-patient-care").value;


        // On définit les headers du tableau

        let headersTab = [{
            id: "blank",
            name: "blank",
            prompt: "   ",
            width: 45,
            align: "left",
            padding: 0
        },
        {
            id: "Lundi",
            name: "lundi",
            prompt: "Lundi soir",
            width: 25,
            align: "center",
            padding: 0
        },
        {
            id: "Mardi",
            name: "mardi",
            prompt: "Mardi soir",
            width: 25,
            align: "center",
            padding: 0
        },
        {
            id: "Mercredi",
            name: "mercredi",
            prompt: "Mercredi soir",
            width: 30,
            align: "center",
            padding: 0
        },
        {
            id: "Jeudi",
            name: "jeudi",
            prompt: "Jeudi soir",
            width: 25,
            align: "center",
            padding: 0
        },
        {
            id: "Vendredi",
            name: "vendredi",
            prompt: "Vendredi soir",
            width: 32,
            align: "center",
            padding: 0
        },
        {
            id: "Samedi",
            name: "samedi",
            prompt: "Samedi soir",
            width: 30,
            align: "center",
            padding: 0
        },
        {
            id: "Dimanche",
            name: "dimanche",
            prompt: "Dimanche soir",
            width: 34,
            align: "center",
            padding: 0
        }];
        
        
        // On écrit chaque ligne du tableau entre accolades :
          
        let dataTab = [{
            blank: "Heure début",
            lundi: startTime[0],
            mardi: startTime[1],
            mercredi: startTime[2],
            jeudi: startTime[3],
            vendredi: startTime[4],
            samedi: startTime[5],
            dimanche: startTime[6]
        },
        {
            blank: "Heure fin (lendemain matin)",
            lundi: endTime[0],
            mardi: endTime[1],
            mercredi: endTime[2],
            jeudi: endTime[3],
            vendredi: endTime[4],
            samedi: endTime[5],
            dimanche: endTime[6]
        },
        {
            blank: "Total heures",
            lundi: addHours(startTime[0], endTime[0]),
            mardi: addHours(startTime[1], endTime[1]),
            mercredi: addHours(startTime[2], endTime[2]),
            jeudi: addHours(startTime[3], endTime[3]),
            vendredi: addHours(startTime[4], endTime[4]),
            samedi: addHours(startTime[5], endTime[5]),
            dimanche: addHours(startTime[6], endTime[6])
        }];


        

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = 60; // Hauteur du tableau

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        // On affiche le tableau.
        // On va changer les couleurs du texte d'en-tête, et du background
        // #169EFF est du bleu
        doc.setFont('helvetica', 'normal');


        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.2); 

        // On affiche le tableau :
        doc.table(10, y, dataTab, headersTab, {headerBackgroundColor: "#FFFFFF", autoSize: false, margins: 1, fontSize: 10});

        // NOUVEAU BLOC

        doc.setFont('helvetica', 'normal');
        fontSize = 12;
        doc.setFontSize(fontSize);
        doc.setTextColor(0, 0, 0);

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(1, fontSize, lineHeight);

        text = "Dans la limite maximale de 12 heures consécutives";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

        // NOUVEAU BLOC

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(1, fontSize, lineHeight);
                    
        text = "Il est précisé que les heures de garde malade de nuit visées sont des heures de travail effectif et sont rémunérées sur la base du salaire horaire brut prévu au contrat de travail";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});
    }

    /* -------------------------- */
    /* ------- ECRAN 9 ---------- */
    /* -------------------------- */


    /* ------- TITRE ARTICLE ---------- */

    y += heightParagraph;

    y += lineBreakText(2, fontSize, lineHeight);
    doc.setFont('helvetica');
    fontSize = 15;
    doc.setFontSize(fontSize);
    // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
    doc.setTextColor(229, 165, 73); 
    title = "Article 5 - Repos hebdomadaire";
    heightParagraph = lineBreakText(1, fontSize, lineHeight);;
    y = testPageBreak(doc, y, 0, marginUp, marginDown);
    doc.text(title, marginLeft, y);

    /* ------- FIN TITRE ARTICLE ---------- */


    /* ------- SOULIGNEMENT DU TITRE ---------- */

    /* Obtenir la largeur du texte. À noter qu'au début la largeur est 
    selon l'unité choisie pour le document, puis elle augmente de plus en plus. */
    var titleWidth = doc.getTextWidth(title);

    // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
    y += 2;

    // Couleur du soulignement (RVB)
    // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
    doc.setTextColor(229, 165, 73); 

    // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
    doc.setLineWidth(0.5);

    // Dessiner le soulignement, les unités sont les unités choisies pour le document.
    // Correction de 26 mm pour que le trait soit de la bonne longueur.
    doc.line(marginLeft, y, titleWidth + 26, y); 

    /* ------- FIN SOULIGNEMENT DU TITRE ---------- */

    doc.setFont('helvetica', 'normal');
    fontSize = 12;
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);


    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
    
    text = "Article 46 du socle commun et article 138 du socle spécifique « salarié du particulier employeur » de la convention collective.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "La période de repos hebdomadaire est fixée le " + document.getElementById("dayoff").value + " (le dimanche, de préférence).";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "La période de repos hebdomadaire peut exceptionnellement être travaillée, à la demande du particulier employeur et avec l’accord écrit du salarié.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    // RECUPERER RESULTAT BOUTON RADIO
    answerValue = "";
    radios = document.getElementsByName('shared-custody');
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            // aswerValue correspond à l'attribut value choisi par le client (code HTML)
            answerValue = radios[i].value;
        }
    }

    if(answerValue === "yes") answerValue = "rémunéré au taux horaire normal majoré de 25 %.";
    else if(answerValue === "no") answerValue = "récupéré par un repos équivalent majoré en temps de 25%";

    text = "Sans cumul de la rémunération et la récupération de la période de repos hebdomadaire travaillée, les parties conviennent alors que le jour de travail lors la période de repos hebdomadaire est " + answerValue;

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);;

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

   /* ------- TITRE ARTICLE ---------- */

   y += heightParagraph;

   y += lineBreakText(2, fontSize, lineHeight);
   doc.setFont('helvetica');
   fontSize = 15;
   doc.setFontSize(fontSize);
   // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
   doc.setTextColor(229, 165, 73); 
   title = "Article 6 - Jours fériés";
   heightParagraph = lineBreakText(1, fontSize, lineHeight);;
   y = testPageBreak(doc, y, 0, marginUp, marginDown);
   doc.text(title, marginLeft, y);

   /* ------- FIN TITRE ARTICLE ---------- */


   /* ------- SOULIGNEMENT DU TITRE ---------- */

   /* Obtenir la largeur du texte. À noter qu'au début la largeur est 
   selon l'unité choisie pour le document, puis elle augmente de plus en plus. */
   var titleWidth = doc.getTextWidth(title);

   // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
   y += 2;

   // Couleur du soulignement (RVB)
   // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
   doc.setTextColor(229, 165, 73); 

   // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
   doc.setLineWidth(0.5);

   // Dessiner le soulignement, les unités sont les unités choisies pour le document.
   // Correction de 26 mm pour que le trait soit de la bonne longueur.
   doc.line(marginLeft, y, titleWidth + 26, y); 

   /* ------- FIN SOULIGNEMENT DU TITRE ---------- */

   doc.setFont('helvetica', 'normal');
   fontSize = 12;
   doc.setFontSize(fontSize);
   doc.setTextColor(0, 0, 0);

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Article 47 du socle commun et article 139 du socle spécifique « salarié du particulier employeur » de la convention collective.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Les jours fériés ordinaires travaillés sont, le cas échéant, les suivants :";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

   // NOUVEAU BLOC

   // Saut(s) de ligne suite au texte précédent.
   y += heightParagraph;
   
   // RECUPERER RESULTAT CHECKBOXES
    /* Sélectionnez tous les éléments de type checkbox avec le name "interest"
    et les met dans une NodeList (ce n'est pas un tableau) */
    selectedCheckboxes = document.querySelectorAll('input[name="holidays"]:checked');
    // Créez un tableau vide pour stocker les valeurs sélectionnées
    let selectedValues = [];
    let selectedContent = [];
    labelElement = "";
    /* Parcourir toutes les cases à cocher de la NodeList selectedCheckboxes,
    et ajouter leur valeur au tableau */
    selectedCheckboxes.forEach(function(checkbox) {
        selectedValues.push(checkbox.value);
        // Facultatif : on récupère le contenu visible dans la page en face de la case
        labelElement = document.querySelector('label[for="'+ checkbox.value + '"]');
        selectedContent.push(labelElement.textContent);
    });

    text = selectedContent;

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = lineBreakText(text.length, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Le jour férié chômé qui tombe un jour habituellement travaillé par le salarié est rémunéré.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "En contrepartie du travail un jour férié ordinaire, le salarié perçoit, au titre des heures effectuées, une rémunération majorée de 10 % calculée sur la base du salaire habituel fixé au présent contrat. Le salarié bénéficie une rémunération majorée à hauteur de 100%. Pour le 1er mai.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    // RECUPERER RESULTAT BOUTON RADIO
    radios = document.getElementsByName('mai_first');
    answerValue = "";
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            // aswerValue correspond à l'attribut value choisi par le client (code HTML)
            answerValue = radios[i].value;
        }
    }

    if(answerValue === "mai_first_nonworking") answerValue = "chômé";
    else if(answerValue === "mai_first_working") answerValue = "travaillé";


    text = "Il est convenu au contrat que le 1er mai sera " + answerValue + ".";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Le jour férié chômé qui tombe un jour habituellement travaillé par le salarié est rémunéré dans les conditions prévues par l’article 47-2 du socle commun de la convention collective. Le chômage d'un jour férié ordinaire tombant un jour habituellement travaillé, ouvre droit au maintien de la rémunération brute habituelle, si le salarié a travaillé pour le particulier employeur, le dernier jour de travail qui précède le jour férié et le premier jour de travail qui lui fait suite, sauf autorisation d'absence préalablement accordée.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    /* ------- TITRE ARTICLE ---------- */

   y += heightParagraph;

   y += lineBreakText(2, fontSize, lineHeight);
   doc.setFont('helvetica');
   fontSize = 15;
   doc.setFontSize(fontSize);
   // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
   doc.setTextColor(229, 165, 73); 
   title = "Article 7 - Congés payés";
   heightParagraph = lineBreakText(1, fontSize, lineHeight);;
   y = testPageBreak(doc, y, 0, marginUp, marginDown);
   doc.text(title, marginLeft, y);

   /* ------- FIN TITRE ARTICLE ---------- */


   /* ------- SOULIGNEMENT DU TITRE ---------- */

   /* Obtenir la largeur du texte. À noter qu'au début la largeur est 
   selon l'unité choisie pour le document, puis elle augmente de plus en plus. */
   var titleWidth = doc.getTextWidth(title);

   // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
   y += 2;

   // Couleur du soulignement (RVB)
   // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
   doc.setTextColor(229, 165, 73); 

   // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
   doc.setLineWidth(0.5);

   // Dessiner le soulignement, les unités sont les unités choisies pour le document.
   // Correction de 26 mm pour que le trait soit de la bonne longueur.
   doc.line(marginLeft, y, titleWidth + 26, y); 

   /* ------- FIN SOULIGNEMENT DU TITRE ---------- */

   doc.setFont('helvetica', 'normal');
   fontSize = 12;
   doc.setFontSize(fontSize);
   doc.setTextColor(0, 0, 0);

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);

    text = "Articles 48 et 48-1 du socle commun et article 140-1 du socle spécifique « salarié du particulier employeur ».";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);

    text = "Le salarié bénéficie de congés payés conformément aux dispositions de la convention collective.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);

    text = "La période de référence pour la prise du congé principal acquis est fixée du 1er mai au 31 octobre de l'année en cours.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);

    text = "Les parties s’accordent dans la mesure du possible, sur la date des congés payés. À défaut d’accord entre elles, la date des congés est fixée par le particulier employeur, sous réserve du respect d’un délai de prévenance minimal de deux mois.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // RECUPERER RESULTAT BOUTON RADIO Pour savoir si on affiche le texte CESU
    radios = document.getElementsByName('declared_cesu');
    answerValue = "";
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            // aswerValue correspond à l'attribut value choisi par le client (code HTML)
            answerValue = radios[i].value;
        }
    }

    if(answerValue === "yes_declared_cesu") {

        // Saut(s) de ligne suite au texte précédent.
        y += heightParagraph;
        y += lineBreakText(1, fontSize, lineHeight);

        // RECUPERER RESULTAT BOUTON RADIO
        radios = document.getElementsByName('paid_vacation');
        answerValue = "";
        for(let i = 0; i < radios.length; i++){
            if(radios[i].checked){
                // aswerValue correspond à l'attribut value choisi par le client (code HTML)
                answerValue = radios[i].value;
            }
        }

        if(answerValue === "paid_vacation1") answerValue = "le salaire mensuel brut du salarié est majoré de 10 % au titre des congés payés";
        else if(answerValue === "paid_vacation2") answerValue = "les congés payés sont rémunérés lors de leur prise";

        text = "Dans le cas où le salarié est déclaré par le biais du CESU, il est expressément convenu entre les parties que " + answerValue + ".";

        // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
        heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
        // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

        y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

        doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});
    }

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Les congés payés annuels doivent être pris. Le délai de prévenance pour fixer les congés est de 2 mois minimum.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Lorsque le salarié n’acquiert pas 30 jours ouvrables de congés payés au cours de la période de référence visée à l’article 48-1-1-1 du socle commun de la convention collective, il est possible de lui accorder des congés complémentaires non rémunérés pour lui permettre de bénéficier d’un repos annuel de 30 jours ouvrables.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "En cas de multi-emplois, le salarié informe chaque particulier employeur des dates des congés fixées avec chacun d’eux.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    /* ------- TITRE ARTICLE ---------- */

   y += heightParagraph;

   y += lineBreakText(2, fontSize, lineHeight);
   doc.setFont('helvetica');
   fontSize = 15;
   doc.setFontSize(fontSize);
   // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
   doc.setTextColor(229, 165, 73); 
   title = "Article 8 - Absences du salarié et absences du particulier employeur";
   heightParagraph = lineBreakText(1, fontSize, lineHeight);;
   y = testPageBreak(doc, y, 0, marginUp, marginDown);
   doc.text(title, marginLeft, y);

   /* ------- FIN TITRE ARTICLE ---------- */


   /* ------- SOULIGNEMENT DU TITRE ---------- */

   /* Obtenir la largeur du texte. À noter qu'au début la largeur est 
   selon l'unité choisie pour le document, puis elle augmente de plus en plus. */
   var titleWidth = doc.getTextWidth(title);

   // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
   y += 2;

   // Couleur du soulignement (RVB)
   // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
   doc.setTextColor(229, 165, 73); 

   // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
   doc.setLineWidth(0.5);

   // Dessiner le soulignement, les unités sont les unités choisies pour le document.
   // Correction de 26 mm pour que le trait soit de la bonne longueur.
   doc.line(marginLeft, y, titleWidth + 26, y); 

   /* ------- FIN SOULIGNEMENT DU TITRE ---------- */

   doc.setFont('helvetica', 'normal');
   fontSize = 12;
   doc.setFontSize(fontSize);
   doc.setTextColor(0, 0, 0);

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);

    text = "Article 49 du socle commun et article 141-1 du socle spécifique « salarié du particulier employeur ».";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    /* ------- TITRE 2EME NIVEAU ---------- */

    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    y += lineBreakText(1, fontSize, lineHeight);
    doc.setFont('helvetica');
    fontSize = 13;
    doc.setFontSize(fontSize);
    doc.setTextColor(229, 165, 73);
    title = "8-1 Absences du salarié";
    doc.text(title, marginLeft, y);

    /* ------- FIN TITRE 2EME NIVEAU ---------- */

    /* ------- SOULIGNEMENT DU TITRE ---------- */


    // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
    y += 2;

    // Couleur du soulignement (RVB)
    doc.setDrawColor(229, 165, 73);

    // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
    doc.setLineWidth(0.5);

    // Dessiner le soulignement, les unités sont les unités choisies pour le document.
    doc.line(marginLeft, y, doc.getTextWidth(title) + 25.5, y); 

    /* ------- FIN SOULIGNEMENT DU TITRE ---------- */
    

    doc.setFont('helvetica', 'normal');
    fontSize = 12;
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += lineBreakText(2, fontSize, lineHeight);

    text = "Toute absence doit être justifiée et le cas échéant autorisée par le particulier employeur.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Toute absence du salarié doit être justifiée, le salarié s’engage à prévenir dès que possible le particulier employeur.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "En cas d’arrêt de travail pour maladie ou accident, le salarié devra lui transmettre son arrêt de travail dans les 48 heures, sauf circonstances exceptionnelles.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    doc.setFont('helvetica', 'normal', 'bold');
    doc.setTextColor(255, 0, 0);

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Dans le cas d’une garde partagée, en cas d'accident du travail, la déclaration est réalisée par le particulier employeur au domicile duquel l'accident s'est produit. Lorsque l'accident survient entre les domiciles des deux particuliers employeurs, ceux-ci s'entendent pour que l'un d'entre eux établisse la déclaration d'accident du travail. À défaut d'accord, le domicile le plus proche du lieu de l'accident est pris en compte pour déterminer le particulier employeur ayant en charge l'établissement de la déclaration d'accident de travail.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
       
    text = "Une copie de la déclaration d'accident de travail est remise par le salarié à l'autre particulier employeur.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    /* ------- TITRE 2EME NIVEAU ---------- */

    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    y += lineBreakText(1, fontSize, lineHeight);
    doc.setFont('helvetica');
    fontSize = 13;
    doc.setFontSize(fontSize);
    doc.setTextColor(229, 165, 73);
    title = "8-2 Absences du particulier employeur";
    doc.text(title, marginLeft, y);

    /* ------- FIN TITRE 2EME NIVEAU ---------- */

    /* ------- SOULIGNEMENT DU TITRE ---------- */


    // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
    y += 2;

    // Couleur du soulignement (RVB)
    doc.setDrawColor(229, 165, 73);

    // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
    doc.setLineWidth(0.5);

    // Dessiner le soulignement, les unités sont les unités choisies pour le document.
    doc.line(marginLeft, y, doc.getTextWidth(title) + 25.5, y); 

    /* ------- FIN SOULIGNEMENT DU TITRE ---------- */
    

    doc.setFont('helvetica', 'normal');
    fontSize = 12;
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += lineBreakText(2, fontSize, lineHeight);

    text = "Article 142 du socle spécifique « salarié du particulier employeur de la convention collective";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Le contrat de travail est suspendu durant les périodes d'absences ou d'indisponibilités temporaires du particulier employeur. Ces périodes se décomptent du temps de travail effectif et sont déduites de la rémunération mensuelle versée au salarié. Toutefois, elles sont prises en considération pour le calcul de l'ancienneté du salarié.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Les parties conviennent expressément que les périodes suivantes ne sont pas travaillées par le salarié et que ce dernier est libre de tout engagement :";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
            
    text = "" + document.getElementById("scheduled-absences").value;

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Les heures non effectuées au cours de ces périodes seront déduites du salaire mensuel.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Les périodes d’absences ou d’indisponibilités du particulier employeur, non prévues contractuellement ne sont pas considérées comme des congés pour convenance personnelle du salarié au sens de l’article 48-2-1 du socle commun de la présente convention collective.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    /* ------- TITRE ARTICLE ---------- */

   y += heightParagraph;

   y += lineBreakText(2, fontSize, lineHeight);
   doc.setFont('helvetica');
   fontSize = 15;
   doc.setFontSize(fontSize);
   // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
   doc.setTextColor(229, 165, 73); 
   title = "Article 9 - Rémunération et Indemnité";
   heightParagraph = lineBreakText(1, fontSize, lineHeight);;
   y = testPageBreak(doc, y, 0, marginUp, marginDown);
   doc.text(title, marginLeft, y);

   /* ------- FIN TITRE ARTICLE ---------- */


   /* ------- SOULIGNEMENT DU TITRE ---------- */

   /* Obtenir la largeur du texte. À noter qu'au début la largeur est 
   selon l'unité choisie pour le document, puis elle augmente de plus en plus. */
   var titleWidth = doc.getTextWidth(title);

   // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
   y += 2;

   // Couleur du soulignement (RVB)
   // Couleur plus sombre indiquée sur modèle PDF : 146, 96, 76
   doc.setTextColor(229, 165, 73); 

   // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
   doc.setLineWidth(0.5);

   // Dessiner le soulignement, les unités sont les unités choisies pour le document.
   // Correction de 26 mm pour que le trait soit de la bonne longueur.
   doc.line(marginLeft, y, titleWidth + 26, y); 

   /* ------- FIN SOULIGNEMENT DU TITRE ---------- */

   doc.setFont('helvetica', 'normal');
   fontSize = 12;
   doc.setFontSize(fontSize);
   doc.setTextColor(0, 0, 0);

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);

    text = "Article 144 et 156 du socle spécifique « salarié du particulier employeur de la convention collective et annexe 6 ou avenant de la convention collective en vigueur.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Le salaire horaire prévu au contrat ne peut être inférieur ni au salaire horaire minimum conventionnel, ni au salaire horaire minimum de croissance en vigueur.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    /* ------- TITRE 2EME NIVEAU ---------- */

    y += getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);

    y += lineBreakText(1, fontSize, lineHeight);
    doc.setFont('helvetica');
    fontSize = 13;
    doc.setFontSize(fontSize);
    doc.setTextColor(229, 165, 73);
    title = "9-1 Rémunération";
    doc.text(title, marginLeft, y);

    /* ------- FIN TITRE 2EME NIVEAU ---------- */

    /* ------- SOULIGNEMENT DU TITRE ---------- */


    // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
    y += 2;

    // Couleur du soulignement (RVB)
    doc.setDrawColor(229, 165, 73);

    // Épaisseur du soulignement, dans l'unité déclarée pour ce document.
    doc.setLineWidth(0.5);

    // Dessiner le soulignement, les unités sont les unités choisies pour le document.
    doc.line(marginLeft, y, doc.getTextWidth(title) + 25.5, y); 

    /* ------- FIN SOULIGNEMENT DU TITRE ---------- */
    

    doc.setFont('helvetica', 'normal');
    fontSize = 12;
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += lineBreakText(2, fontSize, lineHeight);

    text = "La rémunération est versée sauf circonstance exceptionnelle, au salarié à la date du " + document.getElementById("salary-date").value + ".";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});

    // NOUVEAU BLOC

    // Saut(s) de ligne suite au texte précédent.
    y += heightParagraph;
    y += lineBreakText(1, fontSize, lineHeight);
                
    text = "Le salaire horaire brut du salarié est fixé à " + document.getElementById("salary-hour").value + " €, en vigueur à la date du contrat.";

    // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
    heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
    // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

    y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});







    doc.save("MonFichier.pdf");


// BLOC A COPIER COLLER POUR RAJOUTER CHAQUE PARAGRAPHE 1 LIGNE OU MULTILIGNE

// // NOUVEAU BLOC

// // Saut(s) de ligne suite au texte précédent.
// y += heightParagraph;
// y += lineBreakText(1, fontSize, lineHeight);
            
// text = "";

// // On calcule la taille pour vérifier si on a la place d'écrire le texte ou s'il faut sauter une ligne :
// heightParagraph = getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight);
// // Ou bien : heightParagraph = lineBreakText(1, fontSize, lineHeight);

// y = testPageBreak(doc, y, heightParagraph, marginUp, marginDown);

// doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});













































    /* ------- LES FONCTIONS ---------- */
    
    /* Cette fonction mesure la hauteur d'un paragraphe, de la première jusqu'à la dernière baseline.
    Cependant elle ne fonctionne pas de façon assez précise car il y a une erreur d'1 ligne en moins
    à cause des blancs qui ne sont pas comptés pour le texte justifié, et également car toute la ligne
    de texte n'est pas forcément remplie si un mot tombe au mauvais endroit et crée beaucoup d'espaces 
    en fin de ligne (le fait que le texte soit justifié ou non ne change rien au problème, c'est 
    exactement la même problématique des blancs en trop dans les lignes). La taille calculée de police
    fonctionne, ainsi que la taille calculée de l'interligne, mais le problème est le calcul de la longueur
    du texte complet (la longeur, par la hauteur), et à cause de cela le calcul du nombre de lignes est
    légèrement faussé d'1 ligne en moins parfois. */
    function getHeightParagraph(text, fontSize, lineHeight, pageWidth, marginLeft, marginRight, optional_LinelStartX, optional_LineStartY) {
        // Longueur totale de toutes les lignes du paragraphe text
        let textLength = doc.getTextWidth(text);
        /* On arrondit à l'entier supérieur avec Math.ceil, par exemple 5.1 lignes doit donner 6 lignes,
        puisque si une ligne de texte supplémentaire commence, même à 1 ou 2 mots sur 
        la ligne, la hauteur du paragraphe augmente de la même façon que si la ligne
        était remplie de mots. */
        //ANCIEN CODE : let numberOfLines = Math.ceil(textLength / (pageWidth - marginLeft - marginRight));
        let numberOfLines = getLinesParagraph(text, (pageWidth - marginLeft - marginRight));
        //let nbLineSpacing = numberOfLines - 1;

        //console.log("Nombre de lignes : " + numberOfLines);

        //console.log("Taille de la police en mm : " + pt_to_mm(fontSize));
        //console.log("Taille de l'interligne blanc en mm (inutilisé et trop grand, à corriger si besoin) : " + evaluate_WhiteLineSpacing(fontSize, lineHeight));

        // lineSpacing signifie "interligne" en français
        let lineSpacing = lineBreakText(1, fontSize, lineHeight);
        //console.log("Taille de l'interligne en mm : " + lineSpacing);


        /* Méthode rejetée : la hauteur du paragraphe est égale à la hauteur de chaque ligne
        + la hauteur de chaque interligne blanc.
        La hauteur d'une interligne est égale à la hauteur de police que multiplie lineHeight.*/
        // let paragraphHeight = ((numberOfLines * pt_to_mm(fontSize))
        // + (nbLineSpacing * evaluate_LineSpacing(fontSize, lineHeight))); 

        let paragraphHeight = numberOfLines * lineSpacing;

        /* On exécute ce code seulement si on a indiqué en appel de fonction
        les 2 paramètres optionnels optional_LinelStartX et optional_LineStartY, qui
        permettent de tracer une ligne rouge pour vérifier la hauteur
        du paragraphe. */
        if(optional_LinelStartX !== undefined && optional_LineStartY !== undefined) {
            //console.log("LA HAUTEUR DU PARAGRAPHE : " + paragraphHeight);
            doc.setDrawColor(255, 0, 0);
            doc.setLineWidth(1);
            //console.log("Y du premier point de la ligne : " + (optional_LineStartY)); // j'ai enlevé "- pt_to_mm(fontSize)""
            doc.line(optional_LinelStartX, optional_LineStartY, optional_LinelStartX
                , optional_LineStartY - pt_to_mm(fontSize) + paragraphHeight); 
        }
        return paragraphHeight;
    }





    /* Fonction qui prend un argument un paragraphe (text), 
    la largeur de page disponible pour l'écriture du paragraphe,
    et renvoie le nombre de lignes dans le paragraphe. 
    ////// Contient une partie facultative pour casser un mot géant iiii...iii //// */
    function getLinesParagraph(text, widthAvailable) {
        let arrayOfWords = divideSentenceIntoWords(text); 
        //console.log('Le tableau de mots : ' + arrayOfWords);
        let nbLignes = 1;
        let widthAvailable_forWords = widthAvailable;
        let wordWidth;
        // tableau consacré aux mots trop longs pour la ligne
        let wordsTooLong = [];
        let i = 0;
        //console.log("Taille de la ligne disponible : " + widthAvailable); 
        while (i < arrayOfWords.length) {
            //console.log("Tour de boucle" + i);
            if(i >= 1) {
                // On enlève l'espace.
                widthAvailable_forWords -= doc.getTextWidth(' ');
                //console.log("On enlève un espace à la taille restante.");
            }
            if(widthAvailable_forWords >= doc.getTextWidth(arrayOfWords[i])) {
                widthAvailable_forWords -= doc.getTextWidth(arrayOfWords[i]);
                //console.log("Taille du mot "+ arrayOfWords[i] + " : " + doc.getTextWidth(arrayOfWords[i]));
                //console.log("Le mot tient dans la taille restante de la ligne qui sera :" + widthAvailable_forWords);
            } 
            else {
                nbLignes++;
                //console.log("Echec pour mettre le mot dans la ligne. Nombre de lignes augmenté à " + nbLignes);
                widthAvailable_forWords = widthAvailable;
                //console.log("On remplit la capacité de la nouvelle ligne.");

                /* Cas où le mot est plus grand que l'espace disponible : on casse le mot
                et on insère une ou des cellules au tableau afin que les mots puissent
                tenir dans la largeur prévue */
                if(doc.getTextWidth(arrayOfWords[i]) <= widthAvailable) {
                    i--;
                }
                else {
                    //console.log('Mot trop grand pour la ligne. On passe le tour de ce mot afin d\'éviter une boucle infini qui essaiera sans cesse de mettre le mot dans la ligne alors qu\'il ne tient pas dedans.');
                    // ICI FACULTATIF POUR CASSER LE MOT GEANT
                }
            }
            i++;
            if(nbLignes > 100) break;
        }
        return nbLignes;
        //console.log("Nombre de lignes est " + nbLignes);
        //console.log("FIN");
    }


    /* Fonction qui prend en argument un chaîne de caractères
    (typiquement une phrase) et renvoie un tableau avec chaque mot
    dans une case, en considérant les espaces et tabulations succesifs comme
    1 seul à chaque fois, pour ne pas avoir de cases vides dans le tableau. */
    function divideSentenceIntoWords(phrase) {
        // Utilisez la méthode split() avec une expression régulière pour diviser la phrase en mots
        const mots = phrase.split(/\s+/);
        return mots.filter(mot => mot !== ""); // Supprimez les éléments vides (résultant de plusieurs espaces)
    }


    /* Fonction qui retourne la taille de l'interligne en mm.
    Permettra de sauter nbLines lignes, en basant son calcul
    de nouvelle coordonnée y grâce à fontSize et lineHeight */
    function lineBreakText(nbLines, fontSize, lineHeightFactor) {
        // lineSpacing signifie "interligne" en français
        let lineSpacing = pt_to_mm(fontSize) * lineHeightFactor;
        return nbLines * lineSpacing;
    }


    /* Fonction qui transforme la taille d'une police exprimée en points typographiques (pt)
    vers des mm réels, mesurés sur l'écran (on mesure du haut du 'E' vers le bas du 'p').
    J'AI CONSTATE ENSUITE QUE CETTE FONCTION EST INUTILE, LA TAILLE DE LA POLICE
    EST DEJA CORRECTE APPAREMMENT.
    Test réalisé avec police helvetica sur jsPDF (normal et bold) :			

    pt	théorique (mm)	mesurée (mm)	mesurée / théorique
    22	7,76	        7,3	            0,940721649
    12	4,23	        4,1	            0,969267139
    30	10,58	        10	            0,945179584
    50	17,6389	        16,1	        0,912755331
                
    ON CHOISIT UNE MOYENNE DE 0,94
    ////////// INUTILE DE L'UTILISER ////////// A VERIFIER SI UTILISATION */
    function fontPt_to_Realmm(font_pt) {
        let fontTheoretical_mm = font_pt * 0.352778;
        let fontReal_mm = fontTheoretical_mm * 0.94; 
        return  fontReal_mm;
    }

    // Transforme des pt en mm, tout simplement.
    function pt_to_mm(font_pt) {
        return font_pt * 0.352778;
    }


    /* Fonction qui renvoie la taille de l'interligne automatique en mm (espace entre 2 lignes de texte,
    c'est à dire entre le bas d'un "p" et le haut d'un "E"), en fonction de la taille de la police en pt.
    Utile par exemple pour calculer la hauteur d'un paragraphe. La valeur 0.4 a été évaluée empiriquement.
    Elle aurait plutôt du être la valeur d'un pt en mm, c'est à dire 0.352778, mais cela crée un décalage
    lors des tests. 
    
    La fonction n'est pas conçue pour fonctionner avec un lineHeight inférieur à 1 (inutile car
    cet interligne serait beaucoup trop petit donc inesthétique).
    /////////// INUTILE DE L'UTILISER //////////// A VERIFIER SI UTILISATION. */
    function evaluate_WhiteLineSpacing(fontSize, lineHeight) {
        return ((lineHeight - 1) * pt_to_mm(fontSize) + 0.5 * pt_to_mm(fontSize));
    }


    function inputDate_to_lettersDateFr(dateInput) {
        let lettersDateFr;
        let dateObj = new Date(dateInput);
        // Numéro du jour dans le mois
        let dayNumber = dateObj.getDate();
        // Mois écrit en lettres, en français
        let monthLetters = dateObj.toLocaleString('fr-FR', { month: 'long' }); 
        let annee = dateObj.getFullYear();
        // Formater la date
        if(dayNumber === 1)
            lettersDateFr = `${dayNumber}er ${monthLetters} ${annee}`;
        else lettersDateFr = `${dayNumber} ${monthLetters} ${annee}`;

        return lettersDateFr;
    }

    /* Cette fonction teste si on arrive à la fin d'une page, et en crée une nouvelle. */
    function testPageBreak(doc, y, paragraphHeight, marginUp, marginDown) {
        const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        
        if(y + paragraphHeight > pageHeight - marginDown) {
            console.log ("Saut de page à la hauteur " + y);
            doc.addPage('a4', 'p');
            // La nouvelle coordonnée y sera égale à marginUp sur la nouvelle page.
            return marginUp;
        }
        else return y;
    }

    /* Fonction qui calcule la différence entre 2 horaires au format hh:mm.
    Les arguments sont les 2 valeurs des deux horaires (par ordre chronologique, 
    d'abord l'horaire la plus ancienne puis la plus récente), au format résultant de 
    document.getElementBy...(...).value (chaînes de caractère)
    La fonction renvoie un tableau avec :
    -> en indice 0 le nombre d'heures et en indice 1 le nombre de minutes
    -> en indice 2 puis indice 3 les heures puis minutes pour créer un affichage 02:00
    
    Par exemple, calcDifferenceHours entre 01:00 et 03:05 donnera un résultat
    correspondant à 2h05 d'écart, c'est à dire :
    indice 0 -> 2 (heures)
    indice 1 -> 5 (minutes)
    indice 2 -> 02
    indice 3 -> 05 -> Pour construire la chaîne 02:05 si on le souhaite. */
    function calcDifferenceHours(arrivalTimeNight, departureTimeNight) {

        // Convertir les valeurs en objets Date (aujourd'hui)
        const startDate = new Date();
        const endDate = new Date();
        const result = [];

        const [arrivalHours, arrivalMinutes] = arrivalTimeNight.split(':');
        startDate.setHours(parseInt(arrivalHours, 10));
        startDate.setMinutes(parseInt(arrivalMinutes, 10));

        const [departureHours, departureMinutes] = departureTimeNight.split(':');
        endDate.setHours(parseInt(departureHours, 10));
        endDate.setMinutes(parseInt(departureMinutes, 10));

        // Calculer la durée en millisecondes
        const durationInMilliseconds = endDate - startDate;

        // Convertir la durée en heures et minutes
        const durationInHours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
        const durationInMinutes = Math.floor((durationInMilliseconds / (1000 * 60)) % 60);

        console.log(`Total duration: ${durationInHours} hours and ${durationInMinutes} minutes`);

        result[0] = durationInHours;
        result[1] = durationInMinutes;

        // On ne veut pas que le resultat affiche 2:0 mais plutôt 02:00

        if(result[0] < 10) result[2] = '0' + result[0]; else result[2] = result[0];
        if(result[1] < 10) result[3] = '0' + result[1]; else result[3] = result[1]; 

        console.log("Resultat du calcul des heures : " + result[0] + " heures et " + result[1] + " minutes. Autre affichage : " + result[2] + ":" + result[3]);

        return result;
    }

    /* Fonction qui calcule la somme de 2 horaires au format hh:mm.
    Les arguments sont les 2 valeurs des deux horaires, au format résultant de 
    document.getElementBy...(...).value (chaînes de caractère)
    La fonction renvoie la nouvelle heure en chaîne de caractère.
    Par exemple, la somme de 02:50 et 01:20 sera 04:10 */
    function addHours(heure1, heure2) {
        // Divisez les heures et les minutes en deux parties distinctes
        const [h1, m1] = heure1.split(":").map(Number);
        const [h2, m2] = heure2.split(":").map(Number);
      
        // Additionnez les heures et les minutes
        let heures = h1 + h2;
        let minutes = m1 + m2;
      
        // Gérez le cas où les minutes dépassent 60
        if (minutes >= 60) {
          heures += Math.floor(minutes / 60);
          minutes %= 60;
        }
      
        // Assurez-vous que les heures et les minutes ont toujours deux chiffres
        const heuresStr = heures.toString().padStart(2, "0");
        const minutesStr = minutes.toString().padStart(2, "0");
      
        // Retournez le résultat sous forme de chaîne de caractères au format hh:mm
        return `${heuresStr}:${minutesStr}`;
      }
}
