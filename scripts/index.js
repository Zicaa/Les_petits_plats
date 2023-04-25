// Affichage des recettes 
createACard(recipes)
noDuplicateDropdownsElements(recipes)

// Ouverture et fermeture des dropdowns 
const buttonDropdown = document.querySelectorAll('.dropdown-button')
buttonDropdown.forEach(button => {
  button.addEventListener('click', (event) => {
    openDropdown(event)
  })
})


const iconUp = document.querySelectorAll('.iconUp')
iconUp.forEach(icon => {
  icon.addEventListener('click', () => {
    closeDropdown()
  })
})

const allButtonClose = document.querySelectorAll('.dropdown-form-icon')
allButtonClose.forEach(button => {
  button.addEventListener('click', () => {
    closeDropdown()
  })
})

// @function displayResultnumber
// fonction permettant d'afficher dans le HTML 
// le nombre de recettes trouvées
// @param {Array} param - recettes affichées

function displayResultnumber(param) {
  const result = document.querySelector('.tags-result')
  result.innerHTML = `<span class="tags-result-bold">${param.length}</span> recette(s) trouvée(s)`
}

let filteredRecipes = recipesDisplayed()
displayResultnumber(filteredRecipes)

// @function recipesDisplayed
// fonction permettant de récupérer les recettes affichées
// @returns {array} - recettes affichées
function recipesDisplayed() {
  let displayedRecipes = []
  let articles = document.querySelectorAll('.article')
  let allArticles = Array.from(articles)
  allArticles.forEach(article => {
    let articleId = article.id
    for (let i = 0; i < recipes.length; i++) {
      let recipeId = `article-${recipes[i].id}`
      if (articleId == recipeId) {
        displayedRecipes.push(recipes[i])
      }
    }
  }) 
  return displayedRecipes
}