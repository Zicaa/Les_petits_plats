
// Fonction d'affichage des éléments en fonction de la saisie dans les inputs des dropdowns

function dynamicChoices() {
  const input = window.event.target
  const entry = input.value
  if (input.id == 'ingredients') {
    const ul = document.getElementById('menu-ingredients')
    adjustDropdownDisplay(allIngredients, ul, entry)
  }
  if (input.id == 'appareil') {
    const ul = document.getElementById('menu-appareil')
    adjustDropdownDisplay(allAppliances, ul, entry)
  }
  if (input.id == 'ustensiles') {
    const ul = document.getElementById('menu-ustensiles')
    adjustDropdownDisplay(allUstensils, ul, entry)
  }
}

// affichage dans la liste des éléments contenant la saisie de l'input
function adjustDropdownDisplay(elements, ul, entry) {
  if (entry.length >= 1) {
    let inputText = normalizeInputEntries(entry)
    let relatedItems = compareElementsAndEntry(inputText, elements)
    ul.innerHTML = ''
    sortAndShowElements(relatedItems, ul)
  } else {
    ul.innerHTML = ''
    sortAndShowElements(elements, ul)
  }
}

// fonction permettant de n'afficher que les éléments correspondants à la saisie
function compareElementsAndEntry(entry, elements) {
  let relatedItems = []
  for (let i = 0; i < elements.length; i++) {
    let ingredient = normalizeInputEntries(elements[i])
    if (ingredient.search(entry) != -1) {
      relatedItems.push(elements[i])
    }
  }
  return relatedItems
}

// fonction permettant de vérifier la saisie de l'utilisateur dans le champ de recherche principale
function testInput(event) {
  event.preventDefault
  const mainInput = document.getElementById('search')
  const entry = mainInput.value
  let allTags = allTagsDisplayedArray()
  let filterdRecipes
  // EventListener sur évènement 'keyup' de l'input principal (touches de suppression),
  // lancement de la @function findRecipes avec une recherche sur l'ensemble des recettes 
  // et pas seulement les recettes affichées

  mainInput.addEventListener('keyup', (e) => {
    const keyCode = e.code
    if (keyCode === 'Backspace' || keyCode === 'Delete') {
      result(allTags, recipes)
    }    
  })
  // si la saisie est supérieure ou égale à 3 caractères alors allTags (mots à chercher)
  // est modifié et la @function findRecipes effectue la recherche de correspondances 
  // uniquement sur les recettes affichées
  if (entry.length >= 3) {
    let inputText = normalizeInputEntries(entry)
    let array = inputText.split(' ')
    let arrayEntry = litleWords(array)
    arrayEntry.forEach(elem => {
      allTags.push(elem)
    })
    allTags = [...new Set(allTags)]
    filterdRecipes = showRecipes()
    result(allTags, filterdRecipes)
  } else {
    result(allTags, recipes)
  }
}

// EventListener sur évènement 'keyup' de l'input principal (touche Escape),
// lancement de la @function findRecipes avec une recherche sur l'ensemble des recettes 
// et pas seulement les recettes affichées
const mainInput = document.getElementById('search')
mainInput.addEventListener('keyup', (e) => {
  const keyCode = e.code
  if (keyCode === 'Escape') {
    let allTags = allTagsDisplayedArray()
    result(allTags, recipes)
  }
})

/** La @function result trouve les correspondance entre les sélections/recettes puis affiche le résultat */ 

// Je crée la fonction
function result(tags, someRecipes) {
  findRecipes(tags, someRecipes)
  let filterdRecipes = showRecipes()
  numberOfRecipes(filterdRecipes)
}

