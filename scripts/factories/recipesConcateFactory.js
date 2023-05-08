/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/** La @function concateRecipes permet de concaténer les recettes
 * @param {Object} recipe - instance recette
 * @returns {String} - recette concaténée
*/

// Je crée la fonction
function concateRecipes(recipe) {

  // Je recupère les éléments des recettes
  let name = normalizeInputEntries(recipe.name)
  let appliance = normalizeInputEntries(recipe.appliance)
  let description = normalizeInputEntries(recipe.description)
  
  // Je crée un tableau des ingrédients
  let arrayIngredients = recoveryIngredients(recipe)
  let ingredients = arrayIngredients.toString()

  // Je crée un tableau des ustensiles
  let arrayUstensils = recoveryUstensils(recipe)
  let ustensils = arrayUstensils.toString()

  // Je crée la recette concaténée et la retourne
  let recipeString = name + ' ' + appliance + ' ' +  description + ' ' +  ingredients + ' ' +  ustensils
  
  return recipeString

}

/** La @function recoveryIngredients récupére les ingrédients de l'objet recette et génère un tableau
 * @param {Object} recipe - instance recette
 * @returns {Array} - tableau de chaque ingrédient de la recette
*/

// Je crée la fonction
function recoveryIngredients(recipe) {

  // Je crée un tableau de tous les ingrédients
  let allIngredients = []

  // Je récupère tous les ingrédients de la recette
  const ingredientsList = recipe.ingredients

  // Pour chaque élément
  for (let j = 0; j < ingredientsList.length; j++) {

    // Je sélectionne chaque ingrédient de la liste
    let ingredient = ingredientsList[j].ingredient

    // J'appelle la fonction normalizeInputEntries
    let ingredients = normalizeInputEntries(ingredient)

    // J'ajoute les ingrédients au tableau
    allIngredients.push(ingredients)

  }
  // Je retourne tous les ingrédients
  return allIngredients

}

/** La @function recoveryUstensils récupére les ustensiles de l'objet recette et génère un tableau
 * @param {Object} recipe - instance recette
 * @returns {Array} - tableau de chaque ingrédient de la recette
*/

// Je crée la fonction
function recoveryUstensils(recipe) {

  // Je crée un tableau de tous les ustensiles 
  let allUstensils = []

  // Je récupère tous les ustensiles de la recette
  const ustensilsList = recipe.ustensils

  // Pour chaque élément
  for (let k = 0; k < ustensilsList.length; k++) {

    // Je sélectionne chaque ustensile de la liste
    let ustensil = ustensilsList[k]

    // J'appelle la fonction normalizeInputEntries
    let ustensils = normalizeInputEntries(ustensil)

    // J'ajoute les ingrédients au tableau
    allUstensils.push(ustensils)
  }
  // Je retourne tous les ustensiles
  return allUstensils
  
}
