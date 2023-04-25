// fonction permettant de vérifier la saisie de l'utilisateur dans le champ de recherche principal
function testInput(event) {
  event.preventDefault
  const mainInput = document.getElementById('search')
  const entry = mainInput.value
  let allTags = findTagsDisplayed()
  let filterdRecipes
  /// EventListener sur évènement 'keyup' de l'input principal (touches de suppression),
  // lancement de la @function getRecipes avec une recherche sur l'ensemble des recettes 
  // et pas seulement les recettes affichées
  mainInput.addEventListener('keyup', (e) => {
    const keyCode = e.code
    if (keyCode === 'Backspace' || keyCode === 'Delete') {
      result(allTags, recipes)
    }    
  })

  // si la saisie est supérieure ou égale à 3 caractères alors allTags (mots à chercher)
  // est modifié et la @function getRecipes effectue la recherche de correspondances 
  // uniquement sur les recettes affichées
  if (entry.length >= 3) {
    let inputText = normalizeAndLowerCase(entry)
    let array = inputText.split(' ')
    let arrayEntry = clean(array)
    arrayEntry.forEach(elem => {
      allTags.push(elem)
    })
    allTags = [...new Set(allTags)]
    filterdRecipes = recipesDisplayed()
    result(allTags, filterdRecipes)
  } else {
    result(allTags, recipes)
  }
}

// EventListener sur évènement 'keyup' de l'input principal (touche Escape),
// lancement de la @function findRecipes avec une recherche sur l'ensemble des recettes 
// et pas seulement les recettes affichées
const mainInput = document.getElementById('search')
mainInput.addEventListener('keyup', (e) => {
  const keyCode = e.code
  if (keyCode === 'Escape') {
    let allTags = findTagsDisplayed()
    result(allTags, recipes)
  }
})

// trouve les correspondance entre tags/saisie et recettes et affiche le résultat
function result(tags, someRecipes) {
  findRecipes(tags, someRecipes)
  let filterdRecipes = recipesDisplayed()
  displayResultnumber(filterdRecipes)
}

