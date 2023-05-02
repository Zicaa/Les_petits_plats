
let allIngredients
let allAppliances
let allUstensils

/** La @function noDuplicateDropdownsElements affiche les éléments sans doublon dans chaque dropdown */ 

// Je crée la fonction
function noDuplicateDropdownsElements(recipe) {
  allIngredients = noDuplicateIngredients(recipe)
  const ulMenuIngredients = document.getElementById('menu-ingredients')
  ulMenuIngredients.innerHTML = ''
  sortAndShowElements(allIngredients, ulMenuIngredients)

  allAppliances = noDuplicateAppliances(recipe) 
  const ulMenuAppliances = document.getElementById('menu-appareil')
  ulMenuAppliances.innerHTML = ''
  sortAndShowElements(allAppliances, ulMenuAppliances)

  allUstensils = noDuplicateUstensils(recipe) 
  const ulMenuUstensils = document.getElementById('menu-ustensiles')
  ulMenuUstensils.innerHTML = ''
  sortAndShowElements(allUstensils, ulMenuUstensils)

}

/** La @function noDuplicateIngredients empêche les doublons d'ingrédients dans les dropdowns*/ 

// Je crée la fonction
function noDuplicateIngredients(recipe) {

 // Je crée un tableau avec tous les éléments
 let allElements = []

  // Pour chaque élément de mon tableau de recettes
  for (let i = 0; i < recipe.length; i++) {

    // Je récupère les ingrédients
    const ingredientsRecipe = recipe[i].ingredients

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

  // Je crée un nouvel objet contenant ces éléments uniques avec set et le retourne
  let allElementsUnique = [...new Set(allElements)]
  return allElementsUnique

}

/** La @function noDuplicateAppliances empêche les doublons d'appareils dans les dropdowns */ 

// Je crée la fonction
function noDuplicateAppliances(recipe) {

   // Je crée un tableau avec tous les éléments
   let allElements = []

   // Pour chaque élément de mon tableau de recettes
   for (let i = 0; i < recipe.length; i++) {

    // Je récupère les appareils
    const applianceRecipe = recipe[i].appliance

    // J'ajoute cet appareil unique au tableau contenant tous les éléments
    allElements.push(applianceRecipe)
  }

  // Je crée un nouvel objet contenant ces éléments uniques avec set et le retourne
  let allElementsUnique = [...new Set(allElements)]
  return allElementsUnique

}

/** La @function noDuplicateUstensils empêche les doublons d'ustensiles dans les dropdowns */ 

// Je crée la fonction
function noDuplicateUstensils(recipe) {

  // Je crée un tableau avec tous les éléments
  let allElements = []

  // Pour chaque ingredient de mon tableau d'ingrédients
  for (let i = 0; i < recipe.length; i++) {

    // Je récupère les ustensiles
    const ustensilsRecipe = recipe[i].ustensils

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
  let allElementsUnique = [...new Set(allElements)]
  return allElementsUnique

}

/** La @function sortAndShowElements trie par ordre alphabétique et affiche les éléments des dropdowns en colonne */ 

// Je crée la fonction
function sortAndShowElements(elements, ul) {
  titleSort(elements)
  createColumns(elements, ul)
  createItem(elements, ul)

}

/** La @function titleSort trie les titres de recette par ordre alphabétique */ 

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

/** La @function createColumns afficher les listes sur 3 colonnes */ 

// Je crée la fonction
function createColumns(elements, ul) {
  const elementsList = elements.length
  const columnSize = Math.ceil(elementsList / 3)
  ul.style.gridTemplateRows = `repeat(${columnSize}, 1fr)`

}

/** La @function createItem génère chaque liste d'éléments des dropdowns */ 

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

    // J'appelle la fonction tagedStyle
    tagedStyle(arrayTags, li) 
  }

  // J'appelle la fonction keybordFunction
  keybordFunction(ul) 

}

/** La @function tagedStyle change les styles des éléments taggés */ 

// Je crée la fonction 
function tagedStyle(array, li) {
  array.forEach(tag => {
    if (tag.textContent == li.textContent) {
      li.style.color = 'rgba(255, 255, 255, 0.4)'
      li.style.textDecoration = 'line-through'
      li.tabIndex = '-1'
    }
  })

}

/** La @function keybordFunction permet la navigation au clavier */ 

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

/** La @function nextSibling affiche l'élément suivant */ 

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

/** La @function previousSibling affiche l'élément précédent */ 

// Je crée la fonction 
function previousSibling(li) {
  const prev = li.previousSibling
  const ul = li.parentNode
  if (prev != null) {
    prev.focus()
  } else {
    console.log(ul.lastChild)
    ul.lastChild.focus()
  }

}
