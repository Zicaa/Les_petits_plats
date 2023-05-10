/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

let allIngredients
let allAppliances
let allUstensils
let arrayOfRecipes=[]


/** La @function noDuplicateDropdownsElements empêche la duplication des éléments dans chaque dropdown
 * et actualise les ingrédients, appareils et ustensiles disponibles sur les recettes affichées
 * @param {Array} arrayOfRecipes - toutes les recettes affichées
*/ 

// Je crée la fonction
function noDuplicateDropdownsElements(arrayOfRecipes) {
  allIngredients = noDuplicateIngredients(arrayOfRecipes)
  const ulMenuIngredients = document.getElementById('menu-ingredients')
  ulMenuIngredients.innerHTML = ''
  sortAndShowElements(allIngredients, ulMenuIngredients)

  allAppliances = noDuplicateAppliances(arrayOfRecipes) 
  const ulMenuAppliances = document.getElementById('menu-appareil')
  ulMenuAppliances.innerHTML = ''
  sortAndShowElements(allAppliances, ulMenuAppliances)

  allUstensils = noDuplicateUstensils(arrayOfRecipes) 
  const ulMenuUstensils = document.getElementById('menu-ustensiles')
  ulMenuUstensils.innerHTML = ''
  sortAndShowElements(allUstensils, ulMenuUstensils)

}

/** La @function noDuplicateIngredients empêche les doublons d'ingrédients dans les dropdowns
 * @param {Array} arrayOfRecipes - toutes les recettes affichées
*/

// Je crée la fonction
function noDuplicateIngredients(arrayOfRecipes) {

 // Je crée un tableau avec tous les éléments
 let allElements = []

  // Pour chaque élément de mon tableau de recettes
  for (let i = 0; i < arrayOfRecipes.length; i++) {

    // Je récupère les ingrédients
    const ingredientsRecipe = arrayOfRecipes[i].ingredients

    // Je crée un tableau de ces ingrédients
    let arrayIngredients = []

    for (let ingredient of ingredientsRecipe) {
      // Je crée un ingrédient unique et l'ajoute au tableau d'ingrédients
      let oneIgredient = ingredient.ingredient
      arrayIngredients.push(oneIgredient)
    }

    // J'ajoute chaque ingrédient unique au tableau contenant tous les éléments
    arrayIngredients.forEach(ingr => allElements.push(ingr))
  
  }

  // Je crée un nouvel objet contenant ces éléments uniques correspondants aux recettes affichées
  let allElementsUnique = [...new Set(allElements)]
  return allElementsUnique
  
}

/** La @function noDuplicateAppliances empêche les doublons d'appareils dans les dropdowns
 * @param {Array} arrayOfRecipes - toutes les recettes affichées
*/ 

// Je crée la fonction
function noDuplicateAppliances(arrayOfRecipes) {

   // Je crée un tableau avec tous les éléments
   let allElements = []

   // Pour chaque élément de mon tableau de recettes
   for (let i = 0; i < arrayOfRecipes.length; i++) {

    // Je récupère les appareils
    const applianceRecipe = arrayOfRecipes[i].appliance

    // J'ajoute cet appareil unique au tableau contenant tous les éléments
    allElements.push(applianceRecipe)
  }

  // Je crée un nouvel objet contenant ces éléments uniques correspondants aux recettes affichées
  let allElementsUnique = [...new Set(allElements)]
  return allElementsUnique

}

/** La @function noDuplicateUstensils empêche les doublons d'ustensiles dans les dropdowns
 * @param {Array} arrayOfRecipes - toutes les recettes affichées
*/ 

// Je crée la fonction
function noDuplicateUstensils(arrayOfRecipes) {

  // Je crée un tableau avec tous les éléments
  let allElements = []

  // Pour chaque ingredient de mon tableau d'ingrédients
  for (let i = 0; i < arrayOfRecipes.length; i++) {

    // Je récupère les ustensiles
    const ustensilsRecipe = arrayOfRecipes[i].ustensils

    // Je crée un tableau de ces ustensiles
    let arrayUstensils = []

    // Pour chaque ustensile de mon tableau d'ustensiles
    for (let ustensil of ustensilsRecipe) {
      let oneUstensil = ustensil
      arrayUstensils.push(oneUstensil)
    }

    // Je crée un ustensile unique et l'ajoute au tableau d'ustensiles
    arrayUstensils.forEach(ust => allElements.push(ust))
  }

  // Je crée un nouvel objet contenant ces éléments uniques correspondants aux recettes affichées
  let allElementsUnique = [...new Set(allElements)]
  return allElementsUnique

}

/** La @function sortAndShowElements trie par ordre alphabétique et affiche les éléments des dropdowns en colonne 
 * @param {Array} elements - allIngredients ou allAppliance ou allUstensils
 * @param {HTMLElement} ul - ul conteneur de la liste
*/ 

// Je crée la fonction
function sortAndShowElements(elements, ul) {
  titleSort(elements)
  createColumns(elements, ul)
  createItem(elements, ul)

}

/** La @function titleSort trie les titres de recette par ordre alphabétique 
 * @param {Array} elements - allIngredients ou allAppliance ou allUstensils 
*/ 

// Je crée la fonction
function titleSort(elements) {
  function tri(a,b) {
    // J'extrait le mot avec la méthode split et colle les lettres avec la méthode join
    const titleAremoveAccent = a.split(' ').join('')
    a = titleAremoveAccent.toLowerCase()
    // Je supprime les accents
    a.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const titleBremoveAccent = b.split(' ').join('')
    b = titleBremoveAccent.toLowerCase()
    b.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    return (a < b) ? -1 : 1
  }
  elements.sort(tri)

}

/** La @function createColumns affiche les listes sur 3 colonnes 
 * @param {Array} elements - allIngredients ou allAppliance ou allUstensils 
 * @param {HTMLElement} ul - ul conteneur de la liste 
*/

// Je crée la fonction
function createColumns(elements, ul) {
  const elementsList = elements.length
  const columnSize = Math.ceil(elementsList / 3)
  ul.style.gridTemplateRows = `repeat(${columnSize}, 1fr)`

}

/** La @function createItem génère chaque liste d'éléments des dropdowns
 * @param {Array} elements - allIngredients ou allAppliance ou allUstensils  
 * @param {HTMLElement} ul - ul conteneur de la liste
*/ 

// Je crée la fonction
function createItem(elements, ul) {

  // Je récupère les éléments dont j'ai besoin
  const tags = document.querySelectorAll('.elements-item')
  const arrayTags = Array.from(tags)

  // Pour chaque élément du tableau
  for (let t = 0; t < elements.length; t++) {

    // Je crée une nouvelle liste du menu déroulant et l'intègre
    const li = new Element('li', 'li', 'dropdown-menu-item').elem
    ul.appendChild(li)
    li.textContent = `${elements[t]}`
    li.tabIndex = '0'
   
    // Pour afficher les tags, j'ajoute un addEventListener sur les évènements 
    // qui déclenche la function showTagsSelected au click
    li.addEventListener('click', () => showTagsSelected())

    // J'ajoute un addEventListener sur la touche entrée pour afficher les tags
    li.addEventListener('keydown', (e) => {
      const keyCode = e.code
      if (keyCode === 'Enter') {
        showTagsSelected()
      }
    })
    barredStyle(arrayTags, li) 
  }

  // J'appelle la fonction keybordFunction
  keybordFunction(ul) 

}

/** La @function barredStyle change les styles des éléments déjà taggés dans le dropdown
 * @param {Array} arrayOfTags - tableau de tous les tags
 * @param {HTMLElement} li - élément de la liste
*/ 

// Je crée la fonction 
function barredStyle(arrayOfTags, li) {
  arrayOfTags.forEach(tag => {
    if (tag.textContent == li.textContent) {
      li.style.color = 'rgba(255, 255, 255, 0.4)'
      li.style.textDecoration = 'line-through'
      li.tabIndex = '-1'
    }
  })
}

/** La @function keybordFunction permet la navigation au clavier
 * @param {HTMLElement} ul - ul conteneur de la liste  
*/ 

// Je crée la fonction  
function keybordFunction(ul) {
  const children = ul.children
  const allLi = Array.from(children)
  allLi.forEach(li => {
    li.addEventListener('keydown', (e) => {
      const keyCode = e.key
      if (keyCode === 'ArrowRight') {
        nextSibling(li)
      } else if (keyCode === 'ArrowLeft') {
        previousSibling(li)
      } 
    })
  })

}

/** La @function nextSibling affiche l'élément suivant
 * @param {HTMLElement} li - élément de la liste 
*/ 

// Je crée la fonction 
function nextSibling(li) {
  const next = li.nextSibling
  const ul = li.parentNode
  if (next != null) {
    next.focus()
  } else {
    ul.firstChild.focus()
  }

}

/** La @function previousSibling affiche l'élément précédent 
 * @param {HTMLElement} li - élément de la liste 
*/ 

// Je crée la fonction 
function previousSibling(li) {
  const prev = li.previousSibling
  const ul = li.parentNode
  if (prev != null) {
    prev.focus()
  } else {
    ul.lastChild.focus()
  }

}