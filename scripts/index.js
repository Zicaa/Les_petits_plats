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

/** La @function recoveredRecipes récupère les recettes affichées de chaque article par concordance avec leur ID
 * @returns {array} - recettes affichées
*/ 

// Je crée la fonction 
function recoveredRecipes() {

  // Je crée un tableau qui contient les recettes
  let newRecipes = []
  let articles = document.querySelectorAll('.recip-card')

  // Je parcours le tableau d'article
  let allArticles = Array.from(articles)
  allArticles.forEach(article => {

    // Je récupère l'id des articles
    let articleId = article.id

    // Pour chaque recette avec instances de mon tableau
    for (let i = 0; i < recipes.length; i++) {
      let recipeId = `article-${recipes[i].id}`
      // Si l'id des article correspond à l'id des recettes
      if (articleId == recipeId) {
        // J'ajoute la recette avec instances à mon tableau de recettes 
        newRecipes.push(recipes[i])
      }
    }
  }) 
  console.log(newRecipes)
  return newRecipes
}


