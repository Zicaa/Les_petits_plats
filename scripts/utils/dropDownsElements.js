let allIngredients
let allAppliances
let allUstensils

// Je crée une fonction qui va afficher les éléments sans doublon dans chaque dropdown
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

// Je crée la fonction qui empêche les doublons d'ingrédients
function noDuplicateIngredients(recipe) {

  // Je crée un tableau avec tous les éléments
  let allElements = []

  // Pour chaque élément de mon tableau de recettes
  for (let i = 0; i < recipe.length; i++) {

    // Je récupère les ingrédients
    const ingredientsRecipe = recipe[i].ingredients

    // Je crée un tableau de ces ingrédients
    let arrayIngredients = []

    // Pour chaque ingredient de mon tableau d'ingrédients
    for (let ingredient of ingredientsRecipe) {
      // Je crée un ingrédient unique et l'ajoute au tableau d'ingrédients
      let oneIgredient = ingredient.ingredient
      arrayIngredients.push(oneIgredient)
    }

    // J'ajoute chaque ingrédient unique au tableau contenant tous les éléments
    arrayIngredients.forEach(ingrdnt => allElements.push(ingrdnt))
  }
  
  // Je crée un nouvel objet contenant ces éléments uniques avec set et le retourne
  let allElementsUnique = [...new Set(allElements)]
  return allElementsUnique
}

// Je crée la fonction qui empêche les doublons d'appareil
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

// Je crée la fonction qui empêche les doublons d'ustensiles
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

      // Je crée un ustensile unique et l'ajoute au tableau d'ustensiles
      let oneUstensil = ustensil
      arrayUstensils.push(oneUstensil)
    }

    // J'ajoute chaque ustensile unique au tableau contenant tous les éléments
    arrayUstensils.forEach(ust => allElements.push(ust))
  }

  // Je crée un nouvel objet contenant ces éléments uniques avec set et le retourne
  let allElementsUnique = [...new Set(allElements)]
  return allElementsUnique
}

// Je crée une fonction tri par ordre alphabétique et j'affiche les éléments en colonne
function sortAndShowElements(elements, ul) {
  titleSort(elements)
  createColumns(elements, ul)
  createItem(elements, ul)
}

// Tri des titres de recette par ordre alphabétique
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

// Je crée une fonction pour afficher les listes sur 3 colonnes
function createColumns(elements, ul) {
  const elementsList = elements.length
  const columnSize = Math.ceil(elementsList / 3)
  ul.style.gridTemplateRows = `repeat(${columnSize}, 1fr)`
}

// Je crée la fonction qui génère chaque liste d'éléments des dropdowns
function createItem(elements, ul) {

  // Pour chaque élément du tableau
  for (let t = 0; t < elements.length; t++) {

    // Je crée une nouvelle liste du menu déroulant et l'intègre
    const li = new Element('li', 'li', 'dropdown-menu-item').elem
    ul.appendChild(li)
    li.textContent = `${elements[t]}`
    li.tabIndex = '0'

  }

}
