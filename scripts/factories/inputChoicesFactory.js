/** La @function dropdownInput affiche les éléments en fonction de la saisie dans les inputs des dropdowns */ 

// Je crée la fonction
function dropdownInput() {
  // Je récupère les éléments dont j'ai besoin : je cible l'élément
  const input = window.event.target
  // Je récupère la valeur rentrée dans l'input par l'utilisateur
  const entry = input.value

  // Si l'id de l'input est égal à ingrédient
  if (input.id == 'ingredients') {
    const ul = document.getElementById('menu-ingredients')
    // Je récupère l'id de l'ul correspondante
    dropdownNewDisplay(allIngredients, ul, entry)
  }

  // Si l'id de l'input est égal à appareil
  if (input.id == 'appareil') {
    // Je récupère l'id de l'ul correspondante
    const ul = document.getElementById('menu-appareil')
    dropdownNewDisplay(allAppliance, ul, entry)
  }
  // Si l'id de l'input est égal à ustensiles
  if (input.id == 'ustensiles') {
    // Je récupère l'id de l'ul correspondante
    const ul = document.getElementById('menu-ustensiles')
    dropdownNewDisplay(allUstensils, ul, entry)
  }

}

/** La @function dropdownNewDisplay affiche dans les nouveaux dropdowns ajustés la liste des éléments saisis dans l'input */

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

/** La @function compareElementsAndEntries n'affiche que les éléments des listes correspondants à la saisie */ 

// Je crée la fonction
function compareElementsAndEntries(entry, elements) {

  // Je crée un tableau comparatif
  let relatedItems = []

  // Pour chaque élément
  for (let i = 0; i < elements.length; i++) {

    // J'intègre l'élément à mon nouveau tableau
    let queryElement = normalizeInputEntries(elements[i])
    if (queryElement.search(entry) != -1) {
      relatedItems.push(elements[i])
    }
  }
  // Je retourne le nouveau tableau
  return relatedItems

}

/** La @function testInput vérifie la saisie de l'utilisateur dans le champ de recherche principale */ 

// Je crée la fonction
function testInput(event) {
  // Je désactive le comportement par défaut
  event.preventDefault
  // Je récupère le champ de recherche
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
    let inputText = normalizeInputEntries(entry)
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
  let filterdRecipes = showRecipes()
  numberOfRecipes(filterdRecipes)
}

