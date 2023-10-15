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
    let marginLeft = 25;
    let marginRight = 25;
    let y;
    let text;

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

    // CHANGER car le contrat n'est pas toujours à durée indéterminée
    let title = "Contrat de travail à durée déterminée";
    y = 30;
    doc.text(title, marginLeft, y);
    
    /* ------- FIN ECRITURE DU TITRE DU PDF ---------- */





    /* ------- SOULIGNEMENT DU TITRE ---------- */

    /* Obtenir la largeur du texte. À noter qu'au début la largeur est 
    selon l'unité choisie pour le document, puis elle augmente de plus en plus. */
    var titleWidth = doc.getTextWidth(title);

    // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
    y += 6;

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
    let radios = document.getElementsByName('sex');
    let valeur, civilite;
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            valeur = radios[i].value;
            // Sélectionnez l'élément <label> associé à l'input radio "male_co-employer"
            let labelElement = document.querySelector('label[for="'+ valeur + '"]');
            // Récupérez le texte à l'intérieur de l'élément <label>
            civilite = labelElement.textContent;
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

    y += lineBreakText(3, fontSize, lineHeight);




    /* -------------------------- */
    /* ------- ECRAN 3 ---------- */
    /* -------------------------- */


    /* ------- TITRE ARTICLE ---------- */

    y += lineBreak_Before2ndTitle;
    doc.setFont('helvetica');
    fontSize = 15;
    doc.setFontSize(fontSize);
    doc.setTextColor(146, 96, 76);
    title = "Article 1 - Date d'effet du contrat et période d'essai";
    doc.text(title, marginLeft, y);

    /* ------- FIN TITRE ARTICLE ---------- */


    /* ------- SOULIGNEMENT DU TITRE ---------- */

    /* Obtenir la largeur du texte. À noter qu'au début la largeur est 
    selon l'unité choisie pour le document, puis elle augmente de plus en plus. */
    var titleWidth = doc.getTextWidth(title);

    // Position Y pour le soulignement : on ajoute X mm en dessous de la base du texte.
    y += 3;

    // Couleur du soulignement (RVB)
    doc.setDrawColor(146, 96, 76);

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
    
    text = "Le CDD est conclu en raison de [INCLURE VARIABLE]";

    doc.text(text, marginLeft, y, {maxWidth: (pageWidth -  marginLeft - marginRight)});


    
    doc.save("MonFichier.pdf");

















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
        let numberOfLines = Math.ceil(textLength / (pageWidth - marginLeft - marginRight));
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
            if(nbLignes > 50) break;
        }
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


    /* Fonction qui permet de sauter nbLines lignes, en basant son calcul
    de nouvelle coordonnée y grâce à fontSize et lineHeight */
    function lineBreakText(nbLines, fontSize, lineHeight) {
        // lineSpacing signifie "interligne" en français
        let lineSpacing = pt_to_mm(fontSize) * lineHeight;
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

}
