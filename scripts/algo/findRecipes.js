
//_________________________________________________________________

/** 
 * @function findRecipes
 * fonction popur trouver les recettes contenant le(s) mot(s) saisi(s) + le(s) tag(s) eventuel(s)
 * dans les recettes affichées ou l'ensemble des recettes
 * @param {Array} array - array des mots saisis + tags
 * @param {Array} someRecipes - array des recttes affichées ou de toutes les recettes
 */

function findRecipes(array, someRecipes) {
  const section = document.querySelector('.section')
  let recipesSelected = []
  let index = 0
  for (let i = 0; i < someRecipes.length; i++) {
    let recipe = concatenationOfRecipes(someRecipes[i])
    let counter = matchingWords(array, recipe)
    if (counter === array.length) {
      recipesSelected.push(someRecipes[i])
      index++
    }
  }
  section.innerHTML = ''
  recipesCardFactory(recipesSelected)
  noDuplicateDropdownsElements(recipesSelected)
  if (index === 0) {
    section.style.display = 'flex'
    section.style.justifyContent = 'center'
    section.innerHTML = '<p class="noresult">Aucune recette ne correspond à votre recherche...</br>Vous pouvez chercher "Tarte aux pommes", "poisson", etc.</p>'
    noDuplicateDropdownsElements(recipes)
  }
}

/** 
 * @function matchingWords
 * fonction permettant de vérifier la présence de chaque élément de l'array 'input' 
 * dans chaque recette concaténée.S'il y a correspondance alors le compteur est incrémenté.
 * @param {Array} input - array des mots saisis + tags
 * @param {string} recipe - recette concaténée
 * @returns {Number} - compteur de correspondances
 */

function matchingWords(array, recipe) {
  let counter = 0
  for (let j = 0; j < array.length; j++) {
    if (recipe.indexOf(array[j]) != -1) {
      counter++
    } 
  }
  return counter
}


