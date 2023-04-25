/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
let allIngredients
let allAppliance
let allUstensils

// fonction de non duplication des éléments dans chaque dropdown
function noDuplicateDropdownsElements(param) {
  allIngredients = noDuplicateIngredients(param)
  const ulMenuIngredients = document.getElementById('menu-ingredients')
  ulMenuIngredients.innerHTML = ''
  sortAndDisplayItems(allIngredients, ulMenuIngredients)

  allAppliance = noDuplicateAppliances(param) 
  const ulMenuAppliances = document.getElementById('menu-appareil')
  ulMenuAppliances.innerHTML = ''
  sortAndDisplayItems(allAppliance, ulMenuAppliances)

  allUstensils = noDuplicateUstensils(param) 
  const ulMenuUstensils = document.getElementById('menu-ustensiles')
  ulMenuUstensils.innerHTML = ''
  sortAndDisplayItems(allUstensils, ulMenuUstensils)
}

// fonction liste des ingrédients sans doublons
function noDuplicateIngredients(param) {
  let ALLelements = []
  for (let i = 0; i < param.length; i++) {
    const ingredientsRecipe = param[i].ingredients
    let arrayIngredients = []
    for (let ingredient of ingredientsRecipe) {
      let oneIgredient = ingredient.ingredient
      arrayIngredients.push(oneIgredient)
    }
    arrayIngredients.forEach(ingr => ALLelements.push(ingr))
  }
  let allElementsUnique = [...new Set(ALLelements)]
  return allElementsUnique
}

//fonction liste des appareils sans doublons
function noDuplicateAppliances(param) {
  let ALLelements = []
  for (let i = 0; i < param.length; i++) {
    const applianceRecipe = param[i].appliance
    ALLelements.push(applianceRecipe)
  }
  let allElementsUnique = [...new Set(ALLelements)]
  return allElementsUnique
}

//fonction liste des ustensiles sans doublons
function noDuplicateUstensils(param) {
  let ALLelements = []
  for (let i = 0; i < param.length; i++) {
    const ustensilsRecipe = param[i].ustensils
    let arrayUstensils = []
    for (let ustensil of ustensilsRecipe) {
      let oneUstensil = ustensil
      arrayUstensils.push(oneUstensil)
    }
    arrayUstensils.forEach(ust => ALLelements.push(ust))
  }
  let allElementsUnique = [...new Set(ALLelements)]
  return allElementsUnique
}

//fonction tri par ordre alphabétique et affichage en colonnes des éléments
function sortAndDisplayItems(elements, ul) {
  titleSort(elements)
  columnSize(elements, ul)
  createItem(elements, ul)
}

//fonction de tri par ordre alphabétique 
function titleSort(elements) {
  function tri(a,b) {
    const titleA = a.split(' ').join('')
    a = titleA.toLowerCase()
    a.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const titleB = b.split(' ').join('')
    b = titleB.toLowerCase()
    b.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    return (a < b) ? -1 : 1
  }
  elements.sort(tri)
}

//fonction pour déterminer le nombre de lignes à afficher sur 3 colonne
function columnSize(elements, ul) {
  const lenghtList = elements.length
  const columnSize = Math.ceil(lenghtList / 3)
  ul.style.gridTemplateRows = `repeat(${columnSize}, 1fr)`
}

//fonction création de chaque li pour chaque element
function createItem(elements, ul) {
  const tags = document.querySelectorAll('.elements-item')
  const arrayTags = Array.from(tags)
  for (let t = 0; t < elements.length; t++) {
    const li = new Element('li', 'li', 'dropdown-menu-item').elem
    ul.appendChild(li)
    li.textContent = `${elements[t]}`
    li.tabIndex = '0'
    //EventListener sur évènements 'click' et 'keydown' des li, 
    //lancement de la @function displayElementSelected qui permet
    //l'affichage en tags des éléments li séléctionnés
    li.addEventListener('click', () => displayElementSelected()) // affichage des tags
    li.addEventListener('keydown', (e) => {
      const keyCode = e.code
      if (keyCode === 'Enter') {
        displayElementSelected() // affichage des tags
      }
    })
    styleLiTaged(arrayTags, li) // style des éléments taggés
  }
  navigationWithArrows(ul) // navigation au clavier (flèches)
}

//changement des styles et attributs des éléments taggés
function styleLiTaged(array, li) {
  array.forEach(tag => {
    if (tag.textContent == li.textContent) {
      li.style.color = 'rgba(255, 255, 255, 0.4)'
      li.style.textDecoration = 'line-through'
      li.tabIndex = '-1'
    }
  })
}

// fonction permettant la navigation au clavier 
// (avec les flèches gauche et droite) au niveau des listes
function navigationWithArrows(ul) {
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
// déplacement vers élément (li) suivant
function nextSibling(li) {
  const next = li.nextSibling
  const ul = li.parentNode
  if (next != null) {
    next.focus()
  } else {
    ul.firstChild.focus()
  }
}
// déplacement vers élément (li) précédent
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
