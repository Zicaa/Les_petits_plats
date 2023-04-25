// fonction d'affichage des éléments en fonction de la saisie dans les inputs des dropdowns
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

// affichage dans la liste des éléments contenant la saisie de l'input
// allIngredients ou allAppliance ou allUstensils   
// ul conteneur de la liste  
// saisie dans les inputs dropdown

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

// fonction permettant de n'afficher que les éléments correspondants à la saisie
// saisie dans les inputs dropdown
// allIngredients ou allAppliance ou allUstensils   
// array des éléments correspondants à la saisie

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

