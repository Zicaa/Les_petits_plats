
//_________________________________________________________________
//_________________________________________________________________
/**
 * @function dynamicChoices
 * fonction d'affichage des éléments en fonction de la saisie dans les inputs des dropdowns
 */

function dynamicChoices() {
  const input = window.event.target
  const entry = input.value
  if (input.id == 'ingredients') {
    const ul = document.getElementById('menu-ingredients')
    adjustDropdownDisplay(allIngredients, ul, entry)
  }
  if (input.id == 'appareil') {
    const ul = document.getElementById('menu-appareil')
    adjustDropdownDisplay(allAppliance, ul, entry)
  }
  if (input.id == 'ustensiles') {
    const ul = document.getElementById('menu-ustensiles')
    adjustDropdownDisplay(allUstensils, ul, entry)
  }
}

//_________________________________________________________________
/**
 * @function adjustDropdownDisplay
 * affichage dans la liste des éléments contenant la saisie de l'input
 * @param {Array} elements - allIngredients ou allAppliance ou allUstensils   
 * @param {HTMLElement} ul - ul conteneur de la liste  
 * @param {String} entry - saisie dans les inputs dropdown
 */

function adjustDropdownDisplay(elements, ul, entry) {
  if (entry.length >= 1) {
    let inputText = normalizeAndLowerCase(entry)
    let relatedItems = compareElementsAndEntry(inputText, elements)
    ul.innerHTML = ''
    sortAndDisplayItems(relatedItems, ul)
  } else {
    ul.innerHTML = ''
    sortAndDisplayItems(elements, ul)
  }
}

//_________________________________________________________________
/**
 * @function compareElementsAndEntry
 * fonction permettant de n'afficher que les éléments correspondants à la saisie
 * @param {String} entry - saisie dans les inputs dropdown
 * @param {Array} elements - allIngredients ou allAppliance ou allUstensils   
 * @returns {Array} - array des éléments correspondants à la saisie
 */

function compareElementsAndEntry(entry, elements) {
  let relatedItems = []
  for (let i = 0; i < elements.length; i++) {
    let ingredient = normalizeAndLowerCase(elements[i])
    if (ingredient.search(entry) != -1) {
      relatedItems.push(elements[i])
    }
  }
  return relatedItems
}

//_________________________________________________________________

/**
 * @function testInput
 * fonction permettant de vérifier la saisie de l'utilisateur dans le champ de recherche principal
 * et d'afficher les recettes, ingrédients, appareils et ustensiles correspondants
 * @param {MouseEvent} event 
 */


function testInput(event) {
  event.preventDefault
  const mainInput = document.getElementById('search')
  const entry = mainInput.value
  let allTags = findTagsDisplayed()
  /**
   * EventListener sur évènement 'keyup' de l'input principal touches de suppression),
   * lancement de la @function findRecipes avec une recherche sur l'ensemble des recettes 
   * et pas seulement les recettes affichées
   */ 
  mainInput.addEventListener('keyup', (e) => {
    const keyCode = e.code
    if (keyCode === 'Backspace' || keyCode === 'Delete') {
      result(allTags, allRecipes)
    }
  })
  /**
   * si la saisie est supérieure ou égale à 3 caractères alors allTags (mots à chercher)
   * est modifié et la @function findRecipes effectue la recherche de correspondances 
   * uniquement sur les recettes affichées
   */ 
  if (entry.length >= 3) {
    let inputText = normalizeAndLowerCase(entry)
    let array = inputText.split(' ')
    let arrayEntry = clean(array)
    arrayEntry.forEach(elem => {
      allTags.push(elem)
    })
    allTags = [...new Set(allTags)]
    result(allTags, allRecipes)
  } 
}

//_________________________________________________________________
/**
 * EventListener sur évènement 'keyup' de l'input principal (touche Escape),
 * lancement de la @function findRecipes avec une recherche sur l'ensemble des recettes 
 * et pas seulement les recettes affichées
 */ 
const mainInput = document.getElementById('search')
mainInput.addEventListener('keyup', (e) => {
  const keyCode = e.code
  if (keyCode === 'Escape') {
    let allTags = findTagsDisplayed()
    result(allTags, allRecipes)
  }
})

//_________________________________________________________________
/**
 * @function result
 * trouve les correspondance entre tags/saisie et recettes et affiche le résultat
 * @param {Array} tags 
 * @param {Array} someRecipes 
 */
function result(tags, someRecipes) {
  findRecipes(tags, someRecipes)
  let filterdRecipes = recipesDisplayed()
  displayResultnumber(filterdRecipes)
}

