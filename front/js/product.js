
/* Exctracting product Id from document URL */
let params = (new URL(document.location)).searchParams;
let ProductId = params.get('id');
/* Testing if the extraction succeded */
console.log(`Récupération de l'id du produit ayant enregistré le clic sur la page d'accueil : ${ProductId}`);

