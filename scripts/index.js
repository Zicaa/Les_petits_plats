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

// Je crée une fonction de recherche dans le champ de recherche principal
mainInput.addEventListener('input', (event) => {
  testInput(event)
})

// Je crée une fonction permettant d'afficher le nombre de recettes dans le HTML 
function numberOfRecipes(param) {
  const result = document.querySelector('.tags-result')
  result.innerHTML = `<span class="tags-result-bold">${param.length}</span> recette(s) trouvée(s)`
}

// J'appelle la fonction qui affiche les recettes filtrées dans le HTML
let filteredRecipes = showRecipes()
numberOfRecipes(filteredRecipes)

function showRecipes() {
  let queryRecipes = []
  let recipesCard = document.querySelectorAll('.recipes-card')
  let recipesCardArray = Array.from(recipesCard)
  recipesCardArray.forEach(article => {
    let articleId = article.id
    for (let i = 0; i < datas.length; i++) {
      let recipeId = `recipe-${datas[i].id}`
      if (articleId == recipeId) {
        queryRecipes.push(datas[i])
      }
    }
  }) 
  return queryRecipes
}

