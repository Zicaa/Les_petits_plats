// fonction permettant de concaténer les recettes
function concatenationOfRecipes(data) {
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