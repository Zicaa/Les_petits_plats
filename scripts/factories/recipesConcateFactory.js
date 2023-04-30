// fonction permettant de concaténer les recettes

function recipesConcateFactory(data) {
  let name = normalizeAndLowerCase(data.name)
  let appliance = normalizeAndLowerCase(data.appliance)
  let description = normalizeAndLowerCase(data.description)
  let arrayIngredients = recoveryIngredients(data)
  let ingredients = arrayIngredients.toString()
  let arrayUstensils = recoveryUstensils(data)
  let ustensils = arrayUstensils.toString()
  let recipeString = name + ' ' + appliance + ' ' +  description + ' ' +  ingredients + ' ' +  ustensils
  return recipeString
}

// fonction permettant de récupérer les ingrédients de l'objet recette 

function recoveryIngredients(data) {
  let allIngredients = []
  const ingredientsList = data.ingredients
  for (let j = 0; j < ingredientsList.length; j++) {
    let ingredient = ingredientsList[j].ingredient
    let ingredients = normalizeAndLowerCase(ingredient)
    allIngredients.push(ingredients)
  }
  return allIngredients
}

// fonction permettant de récupérer les ustensiles de l'objet recette 

function recoveryUstensils(data) {
  let allUstensils = []
  const ustensilsList = data.ustensils
  for (let k = 0; k < ustensilsList.length; k++) {
    let ustensil = ustensilsList[k]
    let ustensils = normalizeAndLowerCase(ustensil)
    allUstensils.push(ustensils)
  }
  return allUstensils
}

// transforme la string : minuscules, sans accents

function normalizeAndLowerCase(param) {
  let a = param.normalize('NFD')
  a = replacements(a)
  let b = a.toLowerCase()
  return b
}
function replacements(str) {
  let a = str.replace(/[\u0300-\u036f]/g, '')
  let b = a.replace(/[œ]/g , 'oe')
  let c = b.replace(/[ÈÉÊË]/g,'E')
  return c
}

// exclue certains 'petits' mots inutiles pour la recherche dans le tableau des mots-clés/tags

function clean(array) {
  const wordsToExclude = ['et', 'd\'', 'au', 'de', 'la', 'le', 'du', 'en', 'ou', 'l\'', 'a', 'un', 'une', 'avec']
  let arrayEntry = array.filter(x => !wordsToExclude.includes(x))
  return arrayEntry
}

