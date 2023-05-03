
/** La @function findRecipes trouve les recettes contenant les mots saisis et les tags dans les recettes affichées et globales*/ 

// Je crée la fonction
function findRecipes(array, array2) {

  // Je récupère la section
  const section = document.querySelector('.section')

  // Je crée un tableau dynamique croisé des recettes sélectionnées
  let recipesSelected = []
  let index = 0

  // Pour chaque recette
  for (let i = 0; i < array2.length; i++) {
    let recipe = array2[i]
    console.log(array2)

    // J'initialise un compteur correspondant au nombre de recettes trouvées
    let counter = matchingWords(array, recipe)

    // Si le compteur est strictement égal au nombre de mots stockés dans les inputs
    if (counter === array.length) {
      console.log(array)
      // J'intègre les recettes contenant ces mots dans le tableau de recettes dynamiques
      recipesSelected.push(recipes[i])
      // J'incrémente le tableau
      index++
    }
  }

   // Je vide le html
  section.innerHTML = ''

  // Je recrée les recettes sélectionnées
  recipesCardFactory(recipesSelected)
  noDuplicateDropdownsElements(recipesSelected)

  // Si le tableau est indexé à 0 j'affiche un message d'erreur
  if (index === 0) {
    section.style.display = 'flex'
    section.style.justifyContent = 'center'
    section.innerHTML = '<p class="noresult">Auncune recette ne correspond à votre recherche...</br>Vous pouvez chercher "Tarte aux pommes", "poisson", etc. </p>'
    // J'appelle la fonction noDuplicateDropdownsElements
    noDuplicateDropdownsElements(recipes)
  }

}

/** La @function matchingWords vérifie la présence de chaque mot de l'array 'input' et incrémente le compteur si il y'a correspondance dans les recettes concaténées*/ 

// Je crée la fonction
function matchingWords(array, recipe) {

  // J'initialise un compteur à 0
  let counter = 0

  // Pour chaque élément du tableau d'input
  for (let j = 0; j < array.length; j++) {
    if (recipe.indexOf(array[j]) != -1) {
      counter++
    } 
  }
  // Je retourne le compteur
  return counter

}