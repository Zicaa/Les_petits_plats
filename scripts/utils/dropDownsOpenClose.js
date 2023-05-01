// Je crée une fonction d'ouverture des dropdowns
function openDropdown(event) {

  // Je désactive le comportement par défaut
  event.preventDefault

  // J'initialise l'évènement à la fenêtre du document
  const target = window.event.target

  let form, buttonOpen

  // Si la cible correspond à la balise icône
  if (target.tagName == 'I') {
    // Je récupère le noeud parent qui correspond au bouton
    buttonOpen = target.parentNode
  } else {
    // Sinon la cible reste la même
    buttonOpen = target
  }

  // Je récupère la div conteneur du bouton, le bouton et le formulaire de recherche
  let dropdown = buttonOpen.parentNode
  let dropdownChildren = dropdown.children
  form = dropdownChildren[1]

  // Je récupère l'id du bouton pour le sélectionner
  let id = searchNodeId(buttonOpen)

  // Je récupère l'id de la liste non ordonnée et l'affiche
  const ul = document.getElementById(id)
  // Je masque le bouton
  buttonOpen.style.display = 'none'
  form.style.display = 'flex'
  ul.style.display = 'grid'
  ul.style.transform = 'scaleY(1)'

  // Je récupère les enfants du formulaire de recherche
  const formChildren = form.children
  const input = formChildren[1]
  const buttonClose = formChildren[2]

  // Je porte le focus sur l'input 
  input.focus()

  // J'appelle la fonction autorisant le déploiement d'un seul dropdown

  createImputChoicesFactory(buttonOpen)

  // J'ajoute un eventListener sur 'input' des inputs, 
  // La fonction dynamicChoices se lance et affiche les éléments 

   input.addEventListener('input', (event) => {
    createImputChoicesFactory(event)
  })
  oneDropdownOnly(buttonOpen)
 
  // J'ajoute un eventListener sur évènement 'keydown' des dropdowns
  // Si keyCode = 'Escape' : la function close ferme la dropdowns

  oneDropdownOnly(buttonOpen)
 
  // J'ajoute un eventListener sur évènement 'keydown' des dropdowns, 
  // Si keyCode = 'Escape' : la @function close ferme la dropdowns

  dropdown.addEventListener('keydown', (e) => {
    const keyCode = e.code
    if (keyCode === 'Escape') {
      close(buttonClose)
    }
  })



}

// Je crée une fonction permettant l'ouverture d'une seule dropdown
function oneDropdownOnly(btnObject) {
  const buttonOpen = btnObject
  const dropdownTarget = buttonOpen.parentNode

  // J'ajoute la classe open à la div parente qui contient les éléments
  dropdownTarget.classList.add('open')

  // Je récupère la div parente qui contient tous les éléments et les filtres
  const filters = dropdownTarget.parentNode
  // J'accède aux enfants (les dropdowns) et génère un tableau des données
  const dropdowns = filters.children
  const arrayDropdowns = Array.from(dropdowns)

  // Je parcours le tableau de dropdowns et pour chacun d'entre-eux
  arrayDropdowns.forEach(dropdown => {

    // Si le dropdown cliqué n'est pas celui souhaité
    if (dropdown != dropdownTarget) {

      // Et si le dropdown est ouvert
      if (dropdown.classList.contains('open') == true) {

        // Je récupère le formulaire de saisie de données et l'input
        const children = dropdown.children
        const form = children[1]
        const formChildren = form.children
        // Je récupère le bouton de fermeture du dropdown
        const btnClose = formChildren[2]
        // Je récupère les enfants du bouton de fermeture du dropdown
        const divCloseChild = btnClose.children
        // Je sélectionne le premier enfant : soit l'icône chevron
        const chevronUp = divCloseChild[0]
        // Je ferme la fenêtre en appelant la fonction closeTarget
        closeTarget(chevronUp)
      }
    }
  })

}

// Je crée une fonction de fermeture des dropdowns
function closeDropdown() {
  const target = window.event.target
  closeTarget(target)

}

// Je crée une fonction de fermeture des dropdowns en fonctions de l'élément souhaité
function closeTarget(target) {

  let buttonClose

  // Si la cible correspond à la balise icône
  if (target.tagName == 'I') {
    // Je récupère le noeud parent (le bouton) et indique qu'il est l'élément souhaité
    buttonClose = target.parentNode
    // Sinon le bouton de fermeture est l'élément souhaité
  } else {
    buttonClose = target

  }

  const form = buttonClose.parentNode
  const dropdown = form.parentNode
  const dropdownChildren = dropdown.children
  const buttonOpen = dropdownChildren[0]

  // Je masque le formulaire
  form.style.display = 'none'
  // Je récupère l'id du bouton pour le sélectionner
  let id = searchNodeId(buttonClose)
  // Je récupère l'id de la liste non ordonnée et la masque
  const ul = document.getElementById(id)
  // Je masque le bouton
  buttonOpen.style.display = 'flex'
  ul.style.display = 'none'
  dropdown.classList.remove('open')

}

// Je crée une fonction pour récupérer l'id de l'élément
function searchNodeId(element) {
  if (element.id == 'iconUp-ingredients' || element.id == 'iconDown-ingredients') {
    let id = 'menu-ingredients'
    return id
  } 
  if (element.id == 'iconUp-appareil' || element.id == 'iconDown-appareil') {
    let id = 'menu-appareil'
    return id
  } 
  if (element.id == 'iconUp-ustensiles' || element.id == 'iconDown-ustensiles') {
    let id = 'menu-ustensiles'
    return id
}


