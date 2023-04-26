// affichage des recettes

createACard(datas)
noDuplicateDropdownsElements(datas)

// ouverture et fermeture des dropdowns

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

// fonction permettant d'afficher dans le HTML 

function displayResultnumber(param) {
  const result = document.querySelector('.tags-result')
  result.innerHTML = `<span class="tags-result-bold">${param.length}</span> recette(s) trouvée(s)`
}

let filteredRecipes = recipesDisplayed()
displayResultnumber(filteredRecipes)

// fonction permettant de récupérer les recettes affichées

function recipesDisplayed() {
  let displayedRecipes = []
  let articles = document.querySelectorAll('.article')
  let allArticles = Array.from(articles)
  allArticles.forEach(article => {
    let articleId = article.id
    for (let i = 0; i < datas.length; i++) {
      let recipeId = `article-${datas[i].id}`
      if (articleId == recipeId) {
        displayedRecipes.push(datas[i])
      }
    }
  }) 
  return displayedRecipes
}
