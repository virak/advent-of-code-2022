# Day 1

To get the solution , just run the command :
> node Day1/day1.js

# test table

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Data 1 | > Data 2 <br> > test | Data 3 |
| Data 4 | > Data 5 <br> > hdhdhhd | Data 6 |


| Nom Champ | Label FR | Call API | Règles de fonctionnement du champ | Détail |
| --- | --- | --- | --- | --- |
| barcode | Barcodecard N | /forms/canSelectBarcode | Fonctionnement du champ<br> > Texte libre<br> > Texte transformer en majuscule et limité à 9 caractères<br> > Délais de 750 millisecondes avant lancement de validation pour éviter des appels excessif à l'API | Validation du champ :<br> > Voir validation code barre |
| barcodeCustomerCode | Code Client |  | Fonctionnement du champ<br> > Texte libre<br> > Texte transformer en majuscule<br> > Afficher si le client de la machine ne correspond pas au propriétaire du code barre renseigné<br> > Re-déclenche la validation du champ barcode | Contenu du menu déroulant :<br> > Récupération des options sur la table THLPDFNC<br> >> PDF_CODE IN (131,132,133,134,135,136)
Client Transdev : CST_GROUPCODE = Transdev |
| dealer | Concessionnaire |  | Fonctionnement du champ<br> > Liste à choix unique<br> > Affiché si le client de la machine a des dealers (CST_WITHDEALERS = 'Y')<br> > Si un seul dealer dans la liste, celui ci est sélectionné par défaut<br> > Si un dealer dans la liste correspond à un code dealer présent dans la scope de l'utilisateur, celui ci est sélectionné par défaut | Contenue du menu déroulant :<br> > Récupération des options sur la table TBLCUSTOMER<br> >> CST_RESPCODE = custCode<br> >> CST_RELATION = 'DL'<br> >> CST_DELETED IN (-1, 0, 3)<br> >> Si l'utilisateur n'a que des scopes dealer : CST_CUSTCODE IN dealerCodes |
| sampleDate | Date de l'échantillon |  | Fonctionnement du champ<br> > Sélection de date<br> > Impossible de mettre une date supérieur à celle du jour<br> > Affichage de la dernière date d'un échantillon sur l'organe en dessous du champ |  |
| email | Email |  | Fonctionnement du champ<br> > Texte libre<br> > Affichage si CST_CRDVERSION est 64,65 ou 66 |  |
| profileAnalysis | Analyse de profil | /forms/transdevProfileAnalyses | Fonctionnement du champ<br> > Liste à choix unique<br> > Valeur par défaut : option dont le PDF_CODE est égale au partCode<br> > Affichage si est une part auto et CST_CATEGORYDEF est null, 6 ou 11 | partCode : PRT_PARTCODE ou PRT_PDFNCODE
Contenue du menu déroulant :<br> > Récupération des options sur la table THLPDFNC
Conditions : <br> >> PDF_CODE IN (131,132,133,134,135,136)<br> >> PDF_COMBTYPE = combType<br> >> Si combType <>A 'D' : PDF_PARTKIND = partKind |
| intermediate | Échantillon intermédiaire OU Vidange |  | Fonctionnement du champ<br> > Checkbox<br> > Décoché par défaut |  |
| totMileage | Temps fonctionnement Machine |  | Fonctionnement du champ<br> > Nombre<br> > Pas de limite<br> > Si un sample créer récemment sur la même part, affichage du TOTMILEAGE entré en helperText |  |
| hoursUnit | Unité |  | Fonctionnement du champ<br> > Liste à choix unique<br> > Valeur par défaut en fonction de la part/machine ou celle d'un newSample créer sur la même part <br> > Saisie transformée en majuscules | Contenue du menu déroulant : <br> > Récupération des options sur la table THLUNITMILEAGE
Conditions : <br> > UMA_UNITMILDEF NOT IN (N, A) et diagType =  1 OU diagType IN (6,7) |
| mileageOilSump | Temps fonctionnement Huile / Fluide |  | Fonctionnement du champ<br> > Nombre<br> > Si remplis, doit être inférieur au totMileage (affichage d'un message warning)<br> > Si un sample créer récemment sur la même part, affichage du SUMPMILEAGE entré en helperText |  |
| oilConsumption | Consommation d'huile/fluide |  | Fonctionnement du champ<br> > Nombre<br> > Si un sample créer récemment sur la même part, affichage du OILCONSUMP entré en helperText |  |
| oilConsumpUnit | Unité |  | Fonctionnement du champ<br> > Sélection unique<br> > Recherche textuelle à partir de la description du type | Contenue du menu déroulant :<br> > Récupération des options sur la table THLUNITCONSUMP |
| oil | Nom de l'huile/fluide OU Fluide | /forms/oils
/forms/oilgrades
/forms/canSelectOil | Fonctionnement du champ<br> > Sélection unique<br> > Recherche textuelle à partir de le nom de l'huile<br> > À la sélection : Remplissage des inputs Marque, Gamme et Grade<br> > Si les valeurs des inputs Marque, Gamme et Garde ne correspondent à aucune valeur, la valeur Autre est mise dans le champ | Contenue du menu déroulant "Nom de l'huile" :<br> > Récupération des options sur la table TBLOILID<br> >> OIL_HIDEONWEB <>A Y<br> >> OIL_KIND ne commençant pas par G
Contenue du menu déroulant "Grade" :<br> > Récupération des options sur la table THLOILGRADE |
| OVERHAUL ET NEWCOMP ET NEWMACH ET CNTREP | Réfection ET Nouvel organe ou échange stand. ET Nouvelle machine ET Compteur remplacé | /forms/interventionOptions | Fonctionnement des champs :<br> > Checkbox<br> > Affichés si sample auto | Récupération des interventions :<br> > Liste de code d'intervention définie en dur dans le code de l'API + récupération des traductions sur le table THLTRANSL
 |
| optionLNF | Option LNF | /forms/canSelectBarcodeOption | Fonctionnement du champ :<br> > Texte libre<br> > Afficher si offre premium, est une exception Ertvelde et ((sample auto et 55 000 000 ≥ barcode < 60 000 000) ou sample indus)) | Validation du code barre :<br> > Voir validation code barre option<br> > La famille du code barre doit être HL (CBN_FAMILYCODE) |
| optionMPC | Option MPC | /forms/canSelectBarcodeOption | Fonctionnement du champ :<br> > Texte libre<br> > Afficher si offre premium, est une exception Ertvelde et sample indus | Validation du code barre :<br> > Voir validation code barre option<br> > La famille du code barre doit être E (CBN_FAMILYCODE) |
| optionAIR | Option Air | /forms/canSelectBarcodeOption | Fonctionnement du champ :<br> > Texte libre<br> > Afficher si offre premium, est une exception Ertvelde et sample indus | Validation du code barre :<br> > Voir validation code barre option<br> > La famille du code barre doit être M ou O (CBN_FAMILYCODE) |
| optionOptic | Option Optic | /forms/canSelectBarcodeOption | Fonctionnement du champ :<br> > Texte libre<br> > Afficher si offre premium, est une exception Ertvelde et ((sample auto et 55 000 000 ≥ barcode < 60 000 000) ou sample indus)) | Validation du code barre :<br> > Voir validation code barre option<br> > La famille du code barre doit être O ou R (CBN_FAMILYCODE) |
| optionVI | Option VI | /forms/canSelectBarcodeOption | Fonctionnement du champ :<br> > Texte libre<br> > Afficher si offre premium, est une exception Ertvelde et sample indus | Validation du code barre :<br> > Voir validation code barre option<br> > La famille du code barre doit être VI (CBN_FAMILYCODE) |
| optionKF | Option KF | /forms/canSelectBarcodeOption | Fonctionnement du champ :<br> > Texte libre<br> > Afficher si offre premium, est une exception Ertvelde et sample indus | Validation du code barre :<br> > Voir validation code barre option<br> > La famille du code barre doit être KO (CBN_FAMILYCODE) |
| water | Eau (%) |  | Fonctionnement du champ :<br> > Texte libre<br> > Affichage si sample coolant |  |
| antiFreeze | Antigel (%) |  | Fonctionnement du champ :<br> > Texte libre<br> > Affichage si sample coolant |  |
| comments | Commentaires |  | Fonctionnement du champ :<br> > Texte libre<br> > Limite de 2000 caractères |  |
