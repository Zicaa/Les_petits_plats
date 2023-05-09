/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/** La @function normalizeInputEntries permet une recherche de mots-clés peu importe la casse ou les accents 
 * @param {String} entries - données saisies par l'utilisateur dans l'input
 * @returns {String}
*/ 

// Je crée la fonction
function normalizeInputEntries(entries) {

  // Je normalise la chaîne de caratères avec la methode normalize unicode NFD
  // Transforme les chaînes de caractère équivalentes en données binaires afin d'être facilement comparées
  let inputData = entries.normalize('NFD')

  // J'appelle la fonction removeAccent 
  inputData = removeAccent(inputData)

  // Je transforme la chaîne de caractère en minuscule
  let outputData = inputData.toLowerCase()

  // Je retourne la nouvelle chaîne de caractère à comparer
  return outputData
  
}

/** La @function removeAccent supprime les accents et certains caractères spéciaux comme œ
 * @param {String} entries - données saisies par l'utilisateur dans l'input
 */ 

// Je crée la fonction - la méthode replace remplace la valeur du 1er paramètre par la seconde
function removeAccent(entries) {
  let a = entries.replace(/[\u0300-\u036f]/g, '')
  let b = a.replace(/[œ]/g , 'oe')
  let c = b.replace(/[ÈÉÊË]/g,'E')
  return c

}

/** La @function litleWords exclue de la recherche les mots inutiles
 * @param {Array} arrayOfWords - tableau de tous les mots
 * @returns {Array} - tableau ne contenant pas les mots exclus
*/

// Je crée la fonction
function litleWords(arrayOfWords) {

  // Je crée un tableau contenant les mots à exclure de la recherche
  const wordsToExclude = ['et', 'd\'', 'au', 'de', 'la', 'le', 'du', 'en', 'ou', 'l\'', 'a', 'un', 'une', 'avec']

  // Je crée un filtre excluant tous les mots non-répertoriés à comparer
  let arrayEntry = arrayOfWords.filter(x => !wordsToExclude.includes(x))

  // Je retourne le tableau de ces mots
  return arrayEntry

}

/** La @function showTagsSelected affiche les tags sélectionnés*/

// Je crée la fonction qui affiche les tags
function showTagsSelected() {

  // Je récupère les éléments dont j'ai besoin : je cible l'élément
  const target = window.event.target
  // J'accède au contenu textuel de cet élément
  const content = target.textContent
  // J'accède au noeud parent de l'élément qui est la liste non ordonnée
  const ulTarget = target.parentNode
  // Je récupère l'ID de la liste non ordonnée
  const ulTargetId = ulTarget.id
  // J'appelle la fonction selectUl qui sélectionne l'Ul grâce à son Id
  const ul = selectUl(ulTargetId)
  // J'accède au noeud parent de l'élément qui est la div dropdown
  const dropdown = ulTarget.parentNode
  // J'accède aux enfants de la div dropdown
  const children = dropdown.children
  // Je récupère le second enfant qui est le formulaire
  const form = children[1]
  // J'accède aux enfants du formulaire
  const formChildren = form.children
  // Je récupère le second enfant qui est l'input
  const input = formChildren[1]
  // Je vide le champ 
  input.value = ''

  // Je récupère le premier enfant de la div dropdown qui est le bouton
  const buttonOpen = children[0]
  // Je lui applique le display flex pour l'afficher
  buttonOpen.style.display = 'flex'
  // Je passe le formulaire en display none pour le masquer
  form.style.display = 'none'
  // Je passe les listes en display none pour les masquer
  ulTarget.style.display = 'none'
  // Je supprime la classe open du dropdown pour le fermer
  dropdown.classList.remove('open')
  // Je crée le tag avec la classe new Element
  const li = new Element('li', 'li', 'elements-item').elem
  // J'insère ce nouvel élément dans la liste non ordonnée du header
  ul.appendChild(li)
  // J'intègre le contenu textuel de l'élément sélectionné au tag
  li.textContent = content
  // J'indexe l'élément à 0 et je porte le focus dessus
  li.tabIndex = '0'
  li.focus()
  // Je crée l'icône de fermeture que j'indexe à 0 et l'intègre au tag
  const icon = new Element('icon', 'i', 'far').elem
  icon.classList.add('fa-times-circle', 'elements-item-icon')
  icon.tabIndex = '0'
  li.appendChild(icon)

  // Je sélectionne toutes les listes d'éléments et appelle la fonction sameTag
  let allLi = ul.children
  sameTag(allLi, li)
  // Je crée un tableau de tous les tags affichés
  let allTags = allTagsDisplayedArray()

  // Je récupère la section, si elle est en display grid,
  const section = document.querySelector('.section')
  if (section.style.display === 'grid') {
    // J'appelle la fonction recoveredRecipes pour récupérer les recettes
    let allRecipes = recoveredRecipes()
    // J'affiche les tags et toutes les recettes 
    result(allTags, allRecipes)
    

  // Sinon j'affiche les tags et toutes les recettes
  } else {
    result(allTags, recipes)
    const mainInput = document.getElementById('search')
    mainInput.value = ''
  }

  // J'ajoute un addEventlistener pour fermer les tags au clic + à la touche entrée
  icon.addEventListener('click', () => closeTags())
  icon.addEventListener('keydown', (e) => {
    const keyCode = e.code
    if (keyCode === 'Enter') {
      closeTags()
    }
  })

}

/** La @function allTagsDisplayedArray crée un array de tous les tags affichés /
 * @returns {Array} - tableau de tous les tags affichés 
*/

// Je crée la fonction
function allTagsDisplayedArray() {

  // Je crée un tableau recevant tous les tags
  let allTags = []

  // Je récupère la div des tags sélectionnés avec sa classe
  const divTags = document.querySelector('.tags-selected')
  // Je récupère les listes non ordonnées et leurs enfants
  const allUl = divTags.children
  const ulIngredientsTags = allUl[0]
  const ulAppliancesTags = allUl[1]
  const ulUstensilsTags = allUl[2]

  // J'accède aux ingrédients et ajoute un seul élément tagué au tableau de données
  const allLiIngredientsTags = ulIngredientsTags.children
  let ingredientsTags = pushTag(allLiIngredientsTags)
  // J'accède aux appareil ajoute un seul élément tagué au tableau de données
  const allLiAppliancesTags = ulAppliancesTags.children
  let appliancesTags = pushTag(allLiAppliancesTags)
  // J'ajoute l'appareil tagué à l'ingrédients dans un nouveau tableau croisé avec concat
  let tempArray = ingredientsTags.concat(appliancesTags)
  // J'accède aux ustensiles et ajoute un seul élément tagué au tableau de données
  const allLiUstensilsTags = ulUstensilsTags.children
  let ustensilsTags = pushTag(allLiUstensilsTags)
  // J'ajoute l'ustensile tagué à tous les éléments dans un nouveau tableau croisé
  allTags = tempArray.concat(ustensilsTags)

  return allTags

}

/** la @function pushTag crée un seul tableau de données de tous les ingrédients, appareils et ustensiles présents en tags
 * @param {Array} elements - ingrédients, appareil ou ustensils tagués
 * @returns {Array} - tableau de chaque élément
*/

// Je crée la fonction
function pushTag(elements) {

  // Je crée un tableau recevant tous les tags
  let allTags = []

  // Je récupère tous les éléments tagués dans un tableau
  let elementsTags = Array.from(elements)
  // Pour chaque élément créé, je fais correspondre le contenu textuel avec celui de la liste
  elementsTags.forEach(li => {
    let licontent = li.textContent
    // Je normalise la casse des données saisies et supprime les accents
    let liNormalized = normalizeInputEntries(licontent)
    // J'ajoute l'élement sélectionné au tableau de tags
    allTags.push(liNormalized)
  })

  // Je retourne tous les tags
  return allTags

}

/** la @function sameTag évite les doublons de tags
 * @param {HTMLCollection} allLi - toutes les listes des tags ingrédients, appareils ou ustensiles
 * @param {HTMLElement} li - élément de la liste
*/

// Je crée la fonction
function sameTag(allLi, li) {

  // Je crée un tableau de tous les éléments listés et l'indexe à -1
  // pour éviter les erreurs de clôture
  const liArray = allLi.length - 1

  // Pour chaque élément
  for (let i = 0; i < liArray; i++) {
    // Si l'élément du tableau contient un élément de la liste
    if (allLi[i].textContent == li.textContent) {
      // Je supprime l'élément
      li.remove()
    }
  }

}

/** la @function selectUl retourne l'id de l'ul
 * @param {String} idOfUl - id de l'ul de la dropdown
 * @returns {HTMLElement} - ul des tags
*/

// Je crée la fonction
function selectUl(idOfUl) {

  // Si l'id de l'ol sélectionnée est menu-ingrédients
  if (idOfUl == 'menu-ingredients') {
    // Je sélectionne la div élements-ingredients et la retourne
    const ul = document.querySelector('.elements-ingredients')
    return ul
  }
  // Si l'id de l'ol sélectionnée est menu-appareil
  if (idOfUl == 'menu-appareil') {
    // Je sélectionne la div élements-appareil et la retourne
    const ul = document.querySelector('.elements-appareil')
    return ul
  }
  // Si l'id de l'ol sélectionnée est menu-ustensiles
  if (idOfUl == 'menu-ustensiles') {
    // Je sélectionne la div élements-ustensiles et la retourne
    const ul = document.querySelector('.elements-ustensiles')
    return ul
  }

}

/** La @function closeTags ferme les tags */

// Je crée la fonction
function closeTags() {

  // Je récupère les éléments dont j'ai besoin : je cible l'élément
  const target = window.event.target
  // J'accède au noeud parent de l'élément qui est la liste non ordonnée
  const parentTarget = target.parentNode
  // Je supprime le tag
  parentTarget.remove()
  // Je récupère tous les tags affichés
  let allTags = allTagsDisplayedArray()
  // Je récupère le champ de recherche et sa valeur
  const mainInput = document.getElementById('search')
  const entry = mainInput.value

  // Si la valeur de l'input est égale ou supérieur à 3 caractères
  if (entry.length >= 3) {
    // J'appelle la fonction normalizeInputEntries
    let inputText = normalizeInputEntries(entry)
    // J'extrait le mot du tableau d'entrées avec la méthode split
    let arrayEntry = inputText.split(' ')
    // Pour chaque élément, j'ajoute l'élément saisi à tous les tags
    arrayEntry.forEach(elem => {
      allTags.push(elem)
    })
  }
  // Je retourne tous les tags et toutes les recettes pour les afficher
  result(allTags, recipes)
  
}


