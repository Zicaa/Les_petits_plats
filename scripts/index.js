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


// Je lance la fonction testSearchBar 
mainInput.addEventListener('input', (event) => {
  testSearchBar(event)
})

/** La @function numberOfRecipes permet d'afficher le nombre de recettes dans le HTML 
 * @param {Array} displayedRecipes - recettes affichées
*/ 

// Je crée la fonction
function numberOfRecipes(displayedRecipes) {
  const result = document.querySelector('.tags-result')
  result.innerHTML = `<span class="tags-result-bold">${displayedRecipes.length}</span> recette(s) trouvée(s)`
}

// J'appelle la fonction qui récupère les recettes filtrées dans le HTML
let filteredRecipes = recoveredRecipes()
numberOfRecipes(filteredRecipes)


/** La @function recoveredRecipes permet de récupérer le nombre de recettes affichées
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

    // Pour chaque recette avec instances de mon tableau
    for (let i = 0; i < recipes.length; i++) {
      let recipeId = `article-${recipes[i].id}`
      if (articleId == recipeId) {
        // J'ajoute la recette avec instances à mon tableau de recettes filtrées
        newRecipes.push(recipes[i])
      }
    }

  })

  

  // Je transforme les nouvelles recettes en chaîne de caractères et les retourne
  newRecipes = stringifyRecipes(newRecipes) 
  console.log(newRecipes)
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
    let concatenedRecipe = concateRecipes(recipesWithInstances[i])
    // J'ajoute la recette concaténée au tableau de recettes
    arrayOfStringifyRecipes.push(concatenedRecipe)
  }
  // Je retourne le tableau de recettes
  return arrayOfStringifyRecipes
  
}
