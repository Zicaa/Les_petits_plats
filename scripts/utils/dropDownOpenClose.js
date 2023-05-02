/** La @function openDropdown ouvre les dropdowns*/

// Je crée la fonction 
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
    
    // Sinon la cible reste la même
    } else {
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
  dropdownInput()

  // J'ajoute un eventListener sur évènement 'input' des inputs
  input.addEventListener('input', (event) => {
    dropdownInput(event)
  })

  // J'appelle la fonction onlyOneDropdownOpen
  onlyOneDropdownOpen(buttonOpen)
 
  // J'ajoute un eventListener sur évènement 'keydown' des dropdowns, 
  // Si keyCode = 'Escape' : la @function close ferme la dropdowns
  dropdown.addEventListener('keydown', (e) => {
    const keyCode = e.code
    if (keyCode === 'Escape') {
      close(buttonClose)
    }
  })

}

/** La @function openDropdown permet l'ouverture d'une seule dropdown*/

// Je crée la fonction
function onlyOneDropdownOpen(elem) {
  const buttonOpen = elem
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
        const divClose = formChildren[2]
        // Je récupère les enfants du bouton de fermeture du dropdown
        const divCloseChild = divClose.children
        // Je sélectionne le premier enfant : soit l'icône chevron
        const chevronUp = divCloseChild[0]
        // Je ferme la fenêtre en appelant la fonction close
        close(chevronUp)
      }
    }
  })
}

/** La @function closeDropdown ferme les dropdowns*/

// Je crée la fonction
function closeDropdown() {
  const target = window.event.target
  close(target)
}

/** La @function close ferme les dropdowns en fonction de l'élément souhaité*/

// Je crée la fonction

function close(target) {

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

/** La @function searchNodeId récupère l'id de l'élément*/

// Je crée la fonction
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

}

