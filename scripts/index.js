//_________________________________________________________________


// Affichage des recettes _________________________________________
recipesCardFactory(recipes)
noDuplicateDropdownsElements(recipes)

// Ouverture et fermeture des dropdowns ___________________________
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


// recherche dans le champ de recherche principal _________________
mainInput.addEventListener('input', (event) => {
  testInput(event)
})

//_________________________________________________________________
/**
 * @function displayResultnumber
 * fonction permettant d'afficher dans le HTML 
 * le nombre de recettes trouvées
 * @param {Array} param - recettes affichées
 */

function displayResultnumber(param) {
  console.log(param)
  const result = document.querySelector('.tags-result')
  result.innerHTML = `<span class="tags-result-bold">${param.length}</span> recette(s) trouvée(s)`
}

let filteredRecipes = recipesDisplayed()
displayResultnumber(filteredRecipes)

//_________________________________________________________________
/**
 * @function recipesDisplayed
 * fonction permettant de récupérer les recettes affichées
 * @returns {array} - recettes affichées
 */

function recipesDisplayed() {
  let displayedRecipes = []
  let articles = document.querySelectorAll('.recip-card')
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
  displayedRecipes = simpleRecipes(displayedRecipes) 
  return displayedRecipes
}

//_________________________________________________________________
let allRecipes = simpleRecipes(recipes)

/**
 * @function simpleRecipes
 * les valeurs des recettes sont concaténées et stringifiées
 * @param {Array} param 
 * @returns {Array}
 */
function simpleRecipes(param) {
  let array = []
  for (let i = 0; i < param.length; i++) {
    let recipe = concatenationOfRecipes(param[i])
    array.push(recipe)
  }
  return array
}
