// fonction pour trouver les recettes contenant le(s) mot(s) saisi(s) + le(s) tag(s) eventuel(s)

function findRecipes(array, array2) {
  const section = document.querySelector('.recipes-section')
  let recipesSelected = []
  let index = 0
  for (let i = 0; i < array2.length; i++) {
    let recipe = array2[i]
    let counter = matchingWords(array, recipe)
    if (counter === array.length) {
      recipesSelected.push(datas[i])
      index++
    }
  }
  section.innerHTML = ''
  recipesCardFactory(recipesSelected)
  noDuplicateDropdownsElements(recipesSelected)
  if (index === 0) {
    section.style.display = 'flex'
    section.style.justifyContent = 'center'
    section.innerHTML = '<p class="noresult">Aucune recette ne correspond à votre recherche...</br>Vous pouvez chercher "Tarte aux pommes", "poisson", etc. </br></br>Pour afficher à nouveau toutes les recettes, veuillez cliquer sur le logo en haut de la page.'
    noDuplicateDropdownsElements(datas)
  }
}

// fonction permettant de vérifier la présence de chaque élément de l'array 'input' 

function matchingWords(array, data) {
  let counter = 0
  for (let j = 0; j < array.length; j++) {
    if (data.indexOf(array[j]) != -1) {
      counter++
    } 
  }
  return counter
}

