
//_________________________________________________________________

/**
 * @function concatenationOfRecipes
 * fonction permettant de concaténer les recettes
 * @param {Object} recipe 
 * @returns {String} - recette concaténée
 */

function concatenationOfRecipes(recipe) {
  let name = normalizeInputEntries(recipe.name)
  let appliance = normalizeInputEntries(recipe.appliance)
  let description = normalizeInputEntries(recipe.description)
  let arrayIngredients = recoveryIngredients(recipe)
  let ingredients = arrayIngredients.toString()
  let arrayUstensils = recoveryUstensils(recipe)
  let ustensils = arrayUstensils.toString()
  let recipeString = name + ' ' + appliance + ' ' +  description + ' ' +  ingredients + ' ' +  ustensils
  return recipeString
}

/**
 * @function recoveryIngredients
 * fonction permettant de récupérer les ingrédients de l'objet recette 
 * pour en faire un array
 * @param {Object} recipe 
 * @returns {Array} - array de chaque ingrédient de la recette
 */

function recoveryIngredients(recipe) {
  let allIngredients = []
  const ingredientsList = recipe.ingredients
  for (let j = 0; j < ingredientsList.length; j++) {
    let ingredient = ingredientsList[j].ingredient
    let ingredients = normalizeInputEntries(ingredient)
    allIngredients.push(ingredients)
  }
  return allIngredients
}

/**
 * @function recoveryUstensils
 * fonction permettant de récupérer les ustensiles de l'objet recette 
 * pour en faire un array
 * @param {Object} recipe 
 * @returns {Array} - array de chaque ustensile de la recette
 */

function recoveryUstensils(recipe) {
  let allUstensils = []
  const ustensilsList = recipe.ustensils
  for (let k = 0; k < ustensilsList.length; k++) {
    let ustensil = ustensilsList[k]
    let ustensils = normalizeInputEntries(ustensil)
    allUstensils.push(ustensils)
  }
  return allUstensils
}

