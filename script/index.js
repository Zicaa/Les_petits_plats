// J'affiche les recettes 
recipesCardFactory(recipes)
noDuplicateDropdownsElements(recipes)

// Je déclenche l'ouverture / fermeture des dropdown au click 
const buttonDropdown = document.querySelectorAll('.dropdown-button')
buttonDropdown.forEach(button => {
  button.addEventListener('click', (event) => {
    editDropdown(event)
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

// Fonction qui affiche le nombre de recettes trouvées dans le HTML
function displayResultnumber(param) {
  const result = document.querySelector('.header2__result')
  result.innerHTML = `<span class="header2__result__bold">${param.length}</span> recette(s) trouvée(s)`
}

let filteredRecipes = recipesDisplayed()
displayResultnumber(filteredRecipes)

// Fonction qui récupère les recettes affichées
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