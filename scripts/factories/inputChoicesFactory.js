/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/** La @function dropdownInput affiche les éléments en fonction de la saisie dans les inputs des dropdowns */ 

// Je crée la fonction
function dropdownInput() {

  // Je récupère les éléments dont j'ai besoin : je cible l'élément
  const input = window.event.target
  // Je récupère la valeur rentrée dans l'input par l'utilisateur
  const entry = input.value

  // Si l'id de l'input est égal à ingrédient
  if (input.id == 'ingredients') {
    // Je récupère l'id de l'ul correspondante
    const ul = document.getElementById('menu-ingredients')
    dropdownNewDisplay(allIngredients, ul, entry)
  }

  // Si l'id de l'input est égal à appareil
  if (input.id == 'appareil') {
    // Je récupère l'id de l'ul correspondante
    const ul = document.getElementById('menu-appareil')
    dropdownNewDisplay(allAppliances, ul, entry)
  }

  // Si l'id de l'input est égal à ustensiles
  if (input.id == 'ustensiles') {
    // Je récupère l'id de l'ul correspondante
    const ul = document.getElementById('menu-ustensiles')
    dropdownNewDisplay(allUstensils, ul, entry)
  }

}

/** La @function dropdownNewDisplay affiche dans les nouveaux dropdowns ajustés la liste des éléments saisis dans l'input 
 * @param {Array} elements - allIngredients ou allAppliances ou allUstensils   
 * @param {HTMLElement} ul - ul conteneur de la liste  
 * @param {String} entry - données saisies dans les inputs dropdown
 */

// Je crée la fonction
function dropdownNewDisplay(elements, ul, entry) {

  // Si la valeur de l'input est égale ou supérieur à 1 caractère
  if (entry.length >= 1) {
    // J'appelle la fonction normalizeInputEntries
    let inputText = normalizeInputEntries(entry)
    // J'appelle la fonction compareElementsAndEntries
    let relatedItems = compareElementsAndEntries(inputText, elements)
    // Je vide les ul
    ul.innerHTML = ''
    // J'appelle la fonction sortAndShowElements
    sortAndShowElements(relatedItems, ul)

  // Sinon
  } else {
    // Je vide les ul
    ul.innerHTML = ''
    // J'appelle la fonction sortAndShowElements
    sortAndShowElements(elements, ul)
  }

}

/** La fonction compareElementsAndEntries compare les éléments saisis dans l'input du dropdown aux éléments des instances pour les afficher
 * @param {Array} elements - allIngredients ou allAppliances ou allUstensils   
 * @param {String} entry - données saisies dans les inputs dropdown
 * @returns {Array} - array des éléments correspondants à la saisie
*/ 

// Je crée la fonction
function compareElementsAndEntries(entry, elements) {

  // Je crée un tableau comparatif
  let relatedItems = []

  // Pour chaque élément
  for (let i = 0; i < elements.length; i++) {

    // J'intègre l'élément à mon nouveau tableau
    let queryElement = normalizeInputEntries(elements[i])

    // Si il y'a correspondance entre l'élément demandé dans mes instances et la saisie
    if (queryElement.search(entry) != -1) {

      // J'intègre l'élément à mon nouveau tableau
      relatedItems.push(elements[i])
    }
    
  }
  // Je retourne le nouveau tableau
  return relatedItems

}

/** La @function testSearchBar vérifie la saisie de l'utilisateur dans le champ de recherche principale 
 * et affiche les recettes, ingrédients, appareils et ustensiles correspondants
 * @param {MouseEvent} event 
*/ 

// Je crée la fonction
function testSearchBar(event) {
  
  // Je désactive le comportement par défaut
  event.preventDefault
  // Je récupère le champ de recherche
  const mainInput = document.getElementById('search')
  // Je récupère la valeur du champ
  const entry = mainInput.value

  // Je récupère les tags affichés
  let allWords = allTagsDisplayedArray()
  
  // J'ajoute un addEventListener sur évènement 'keyup' des touches de suppression
  // pour relancer l'affichage des recettes avec une recherche sur l'ensemble des recettes 
  // et non celles seulement affichées
  mainInput.addEventListener('keyup', (e) => {
    const keyCode = e.code
    if (keyCode === 'Backspace' || keyCode === 'Delete') {
      result(allWords, allRecipes)
    }
  })

  // Si la saisie est supérieure ou égale à 3 caractères, findRecipes effectue la recherche sur les recettes affichées 
  if (entry.length >= 3) {

    // J'appelle la fonction normalizeInputEntries
    let inputText = normalizeInputEntries(entry)

    // Je crée un tableau contenant les saisies de l'input
    let array = inputText.split(' ')

    // J'appelle la fonction litleWords pour exclure les mots inutiles
    let arrayEntry = litleWords(array)

    // Pour chaque élément 
    arrayEntry.forEach(elem => {
      // J'ajoute les mots sélectionnés au tableau de tous les mots + tags
      allWords.push(elem)
    })

    // Je crée un nouvel objet contenant ces éléments
    allWords = [...new Set(allWords)]

    // Je renvoie la recherche relative aux saisies et aux recettes 
    result(allWords, allRecipes)

  // Sinon
  } else {

  // Je renvoie la recherche relative aux saisies et aux recettes 
  result(allWords, allRecipes)
  }

}

// J'ajoute un addEventListener sur évènement 'keyup' pour relancer la recherche sur toutes les recettes
const mainInput = document.getElementById('search')
mainInput.addEventListener('keyup', (e) => {
  const keyCode = e.code
  if (keyCode === 'Escape') {
    let allWords = allTagsDisplayedArray()
    result(allWords, allRecipes)
  }
  
})

/** La @function result trouve les correspondance entre tags/saisies et les mots dans les recettes stringifiées
 * puis renvoie le résultat sous forme de tableau de recettes stringifiées
 * @param {Array} arrayOfWords - tableau des mots saisis et des tags
 * @param {Array} arrayOfRecipes - tableau des recettes affichées ou de toutes les recettes
*/

// Je crée la fonction
function result(arrayOfWords, arrayOfRecipes) {
  findRecipes(arrayOfWords, arrayOfRecipes)
  let filterdRecipes = recoveredRecipes()
  numberOfRecipes(filterdRecipes)
  
}

