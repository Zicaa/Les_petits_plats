//fonction d'affichage des tags

function displayElementSelected() {
  const target = window.event.target
  const content = target.textContent
  const ulTarget = target.parentNode
  const ulTargetId = ulTarget.id
  const ul = selectUl(ulTargetId)
  const dropdown = ulTarget.parentNode
  const children = dropdown.children
  const form = children[1]
  const formChildren = form.children
  const input = formChildren[1]
  input.value = ''
  const buttonOpen = children[0]
  buttonOpen.style.display = 'flex'
  form.style.display = 'none'
  ulTarget.style.display = 'none'
  dropdown.classList.remove('open')
  const li = new Element('li', 'li', 'elements-item').elem
  ul.appendChild(li)
  li.textContent = content
  li.tabIndex = '0'
  li.focus()
  const icon = new Element('icon', 'i', 'far').elem
  icon.classList.add('fa-times-circle', 'elements-item-icon')
  icon.tabIndex = '0'
  li.appendChild(icon)
  let allLi = ul.children
  twinSearch(allLi, li)
  let allTags = findTagsDisplayed()
  const section = document.querySelector('.recipes-section')
  if (section.style.display === 'grid') {
    let filteredRecipes = showRecipes()
    result(allTags, filteredRecipes)
  } else {
    result(allTags, datas)
    const mainInput = document.getElementById('search')
    mainInput.value = ''
  }
  /**
   * EventListener sur évènements 'click' et 'keydown' des icones de fermeture des tags, 
   * lancement de la @function closeSelectedBloc qui permet
   * de fermer le(s) tag(s)
   */ 
  icon.addEventListener('click', () => closeSelectedBloc())
  icon.addEventListener('keydown', (e) => {
    const keyCode = e.code
    if (keyCode === 'Enter') {
      closeSelectedBloc()
    }
  })

}

// fonction permettant de récupérer un array de tous les tags affichés

function findTagsDisplayed() {
  let allTags = []
  const divTags = document.querySelector('.tags-selected')
  const allUl = divTags.children
  const ulIngredientsTags = allUl[0]
  const ulAppliancesTags = allUl[1]
  const ulUstensilsTags = allUl[2]
  const allLiIngredientsTags = ulIngredientsTags.children
  let ingredientsTags = pushTag(allLiIngredientsTags)
  const allLiAppliancesTags = ulAppliancesTags.children
  let appliancesTags = pushTag(allLiAppliancesTags)
  let tempArray = ingredientsTags.concat(appliancesTags)
  const allLiUstensilsTags = ulUstensilsTags.children
  let ustensilsTags = pushTag(allLiUstensilsTags)
  allTags = tempArray.concat(ustensilsTags)
  return allTags
}

// fonction permettant de créer un seul array regroupant 

function pushTag(elements) {
  let allTags = []
  let elementsTags = Array.from(elements)
  elementsTags.forEach(li => {
    let licontent = li.textContent
    let liNormalized = normalizeAndLowerCase(licontent)
    allTags.push(liNormalized)
  })
  return allTags
}

// Fonction pour éviter les doublons de tags

function twinSearch(allLi, li) {
  const liArray = allLi.length - 1
  for (let i = 0; i < liArray; i++) {
    if (allLi[i].textContent == li.textContent) {
      li.remove()
    }
  }
}

// fonction pour retrouver l'ul

function selectUl(str) {
  if (str == 'menu-ingredients') {
    const ul = document.querySelector('.elements-ingredients')
    return ul
  }
  if (str == 'menu-appareil') {
    const ul = document.querySelector('.elements-appareil')
    return ul
  }
  if (str == 'menu-ustensiles') {
    const ul = document.querySelector('.elements-ustensiles')
    return ul
  }
}

// fonction de fermeture des tags

function closeSelectedBloc() {
  const target = window.event.target
  const parentTarget = target.parentNode
  parentTarget.remove()
  let allTags = findTagsDisplayed()
  const mainInput = document.getElementById('search')
  const entry = mainInput.value
  if (entry.length >= 3) {
    let inputText = normalizeAndLowerCase(entry)
    let arrayEntry = inputText.split(' ')
    arrayEntry.forEach(elem => {
      allTags.push(elem)
    })
  }
  result(allTags, datas)
}

