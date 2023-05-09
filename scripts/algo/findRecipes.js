/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/** La @function findRecipes trouve les recettes contenant les mots saisis dans les recettes affichées
 * @param {Array} arrayOfWords - tableau des mots saisis et des tags
 * @param {Array} arrayOfRecipes - tableau de toutes les recettes sous forme de string
*/ 

// Je crée la fonction
function findRecipes(arrayOfWords, arrayOfRecipes) {

  // Je récupère la section
  const section = document.querySelector('.section')

  // Je crée un tableau dynamique croisé des recettes sélectionnées
  let recipesSelected = []
  let index = 0

  // Pour chaque recette 
  for (let i = 0; i < arrayOfRecipes.length; i++) {

    // Je crée chaque recette sous forme de strings dans mon tableau de recette
    let recipe = arrayOfRecipes[i]

    // J'effectue la recherche de mots dans les recettes concaténées
    let counter = matchingWords(arrayOfWords, recipe)

    // Si le compteur est strictement égal au nombre de mots saisis dans les inputs et des tags
    if (counter === arrayOfWords.length) {
      // J'intègre les recettes instanciées contenant ces mots sous forme d'objets dans le tableau de recettes
      recipesSelected.push(recipes[i])
      // J'incrémente le tableau
      index++
    }
  }

   // Je vide le html
  section.innerHTML = ''

  // Je recrée les recettes sélectionnées
  recipesCardFactory(recipesSelected)
  noDuplicateDropdownsElements(recipesSelected)

  // Si le tableau est indexé à 0 j'affiche un message d'erreur
  if (index === 0) {
    section.style.display = 'flex'
    section.style.justifyContent = 'center'
    section.innerHTML = '<p class="noresult">Auncune recette ne correspond à votre recherche...</br>Vous pouvez chercher "Tarte aux pommes", "poisson", etc. </p>'
    // J'appelle la fonction noDuplicateDropdownsElements
    noDuplicateDropdownsElements(recipes)
  }

}

/** La @function matchingWords vérifie la présence de chaque mot de l'array 'input' et incrémente le compteur si il y'a correspondance dans les recettes concaténées
 * @param {Array} arrayOfWords - tableau des mots saisis et des tags
 * @param {string} concatenedRecipe - recette concaténée
 * @returns {Number} counter - compteur de correspondances entre tags/mots saisis et recettes trouvées
*/ 

// Je crée la fonction
function matchingWords(arrayOfWords, concatenedRecipe) {

  // J'initialise un compteur à 0
  let counter = 0

  // Pour chaque élément du tableau d'input et de tags
  for (let j = 0; j < arrayOfWords.length; j++) {

    // Si le compteur est indexé en positif alors je l'incrémente pour affichage des recettes correspondantes
    if (concatenedRecipe.indexOf(arrayOfWords[j]) != -1) {
      counter++
    } 
  }
  // Je retourne le compteur de correspondance
  return counter

}