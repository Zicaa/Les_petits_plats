/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// J'affiche les recettes
recipesCardFactory(recipes)
noDuplicateDropdownsElements(recipes)

// Je déclenche l'ouverture des dropdowns avec addEventlistener
const buttonDropdown = document.querySelectorAll('.dropdown-button')
buttonDropdown.forEach(button => {
  button.addEventListener('click', (event) => {
    openDropdown(event)
  })
})

// Je déclenche la fermeture des dropdowns avec addEventlistener au clic sur l'icône
const iconUp = document.querySelectorAll('.iconUp')
iconUp.forEach(icon => {
  icon.addEventListener('click', () => {
    closeDropdown()
  })
})

// Je déclenche la fermeture des dropdowns avec addEventlistener au clic sur le bouton
const allButtonClose = document.querySelectorAll('.dropdown-form-icon')
allButtonClose.forEach(button => {
  button.addEventListener('click', () => {
    closeDropdown()
  })
})


// Je lance la fonction testInput 
mainInput.addEventListener('input', (event) => {
  testInput(event)
})

/** La @function numberOfRecipes permet d'afficher le nombre de recettes dans le HTML 
 * @param {Array} displayedRecipes - recettes affichées
*/ 

// Je crée la fonction
function numberOfRecipes(displayedRecipes) {
  console.log(displayedRecipes)
  const result = document.querySelector('.tags-result')
  result.innerHTML = `<span class="tags-result-bold">${displayedRecipes.length}</span> recette(s) trouvée(s)`
}

// J'appelle la fonction qui récupère les recettes filtrées dans le HTML
let filteredRecipes = recoveredRecipes()
numberOfRecipes(filteredRecipes)

/** La @function recoveredRecipes permet de récupérer les recettes 
 * @returns {array} - recettes affichées
*/ 

// Je crée la fonction 
function recoveredRecipes() {

  // Je crée un tableau qui contient les recettes
  let newRecipes = []
  let articles = document.querySelectorAll('.recip-card')

  // Je vérifie si chaque id d'article correspond à l'id des recettes
  let allArticles = Array.from(articles)
  allArticles.forEach(article => {
    let articleId = article.id
    for (let i = 0; i < recipes.length; i++) {
      let recipeId = `article-${recipes[i].id}`
      if (articleId == recipeId) {
        newRecipes.push(recipes[i])
      }
    }
  })
  newRecipes = stringifyRecipes(newRecipes) 
  return newRecipes
}

/** La @function stringifyRecipes permet de transformer l'ensemble des recettes en chaîne de caractère */ 

let allRecipes = stringifyRecipes(recipes)

/** @function stringifyRecipes concatène et transforme en chaîne de caractères la valeur des recettes
 * @param {Array} recipesWithInstances - tableau de recettes avec instances
 * @returns {Array}
*/

// Je crée la fonction
function stringifyRecipes(recipesWithInstances) {

  // Je crée un nouveau tableau qui reçoit les recettes
  let arrayOfStringifyRecipes = []
  
  // Pour chaque recette
  for (let i = 0; i < recipesWithInstances.length; i++) {
    // Je concatène l'ensemble des données de la recette
    let recipe = concateRecipes(recipesWithInstances[i])
    // J'ajoute la recette concaténée au tableau de recettes
    arrayOfStringifyRecipes.push(recipe)
  }
  // Je retourne le tableau de recettes
  return arrayOfStringifyRecipes
  
}
