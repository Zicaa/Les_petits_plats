// J'affiche les recettes
recipesCardFactory(datas)
noDuplicateDropdownsElements(datas)

// Je déclenche l'ouverture des dropdowns avec addEventlistener
const buttonDropdown = document.querySelectorAll('.dropdown-button')
buttonDropdown.forEach(button => {
  button.addEventListener('click', (event) => {
    openDropdown(event)
  })
})

// Je déclenche la fermeture des dropdowns avec addEventlistener
const iconUp = document.querySelectorAll('.iconUp')
iconUp.forEach(icon => {
  icon.addEventListener('click', () => {
    closeDropdown()
  })
})

// Je déclenche la fermeture des boutons avec addEventlistener
const allButtonClose = document.querySelectorAll('.dropdown-form-icon')
allButtonClose.forEach(button => {
  button.addEventListener('click', () => {
    closeDropdown()
  })
})

// Je crée une fonction permettant d'afficher le nombre de recettes dans le HTML 
function numberOfRecipes(param) {
  const result = document.querySelector('.tags-result')
  result.innerHTML = `<span class="tags-result-bold">${param.length}</span> recette(s) trouvée(s)`
}

// J'appelle la fonction qui affiche les recettes filtrées dans le HTML
let filteredRecipes = showRecipes()

// Je crée une fonction permettant d'afficher les recettes 
function showRecipes() {

  // Je crée un tableau qui contient les recettes 
  let queryRecipes = []

  // Je vérifie si chaque id d'article correspond à l'id des recettes
  let articles = document.querySelectorAll('.article')
  let allArticles = Array.from(articles)
  allArticles.forEach(article => {
    let articleId = article.id
    for (let i = 0; i < datas.length; i++) {
      let recipeId = `article-${datas[i].id}`
      if (articleId == recipeId) {
        queryRecipes.push(datas[i])
      }
    }
  }) 
  return queryRecipes
}
