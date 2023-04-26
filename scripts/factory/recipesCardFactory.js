// Je crée les cartes pour chaque recette
 function createACard(param) {
  const section = document.querySelector('.recipes-section')
  section.style.display = 'grid'
  section.style.justifyContent = 'space-between'

  for (let i = 0; i < param.length; i++) {
    const article = new Element('recipesCard', 'article', 'recipes-card').elem
    section.appendChild(article)
    article.id = `recipe-${param[i].id}`
    const anchor = new Element('recipesCardLink', 'a', 'recipes-card-link').elem
    article.appendChild(anchor)
    anchor.href = '#'
    const divImage = new Element('recipesCardBg', 'div', 'recipes-card-bg').elem
    anchor.appendChild(divImage)
    const divDescription = new Element('recipesCardDescription', 'div', 'recipes-card-description').elem
    anchor.appendChild(divDescription)
    const divTitle = new Element('recipesCardDescriptionTitle', 'div', 'recipes-card-description-title').elem
    divDescription.appendChild(divTitle)
    const title = new Element('recipesCardDescriptionTitleH3', 'h3', 'recipes-card-description-title-h3').elem
    divTitle.appendChild(title)
    title.textContent = `${param[i].name}`
    const divTime = new Element('recipesCardDescriptionTitleTime', 'div', 'recipes-card-description-title-time').elem
    divTitle.appendChild(divTime)
    const iconTime = new Element('iconTime', 'i', 'far').elem
    divTime.appendChild(iconTime)
    iconTime.classList.add('fa-clock')
    const time = new Element('recipesCardDescriptionTitleTimeTxt', 'p', 'recipes-card-description-title-time-txt').elem
    divTime.appendChild(time)
    time.textContent = `${param[i].time} min`
    const divdescriptionContent = new Element('recipesCardDescriptionContent', 'div', 'recipes-card-description-content').elem
    divDescription.appendChild(divdescriptionContent)
    const ulIngredients = new Element('recipesCardIngredientList', 'ul', 'recipes-card-ingredients-list').elem
    divdescriptionContent.appendChild(ulIngredients)
    displayIngredients(param[i].ingredients, ulIngredients)
    const description = new Element('recipesCardDescriptionTodo', 'p', 'recipes-card-description-todo').elem
    divdescriptionContent.appendChild(description)
    description.textContent = `${param[i].description}`
  }
}

// J'affiche les ingrédients, quantités et unités dans les cartes recettes
function displayIngredients(ingredients, ulIngredients) {
  for (let ingredient of ingredients) {
    const liIngredient = new Element('recipesCardIngredientListItem', 'li', 'recipes-card-ingredients-list-item').elem
    ulIngredients.appendChild(liIngredient)
    const ingredientName = new Element('recipesCardIngredientListItemName', 'p', 'recipes-card-ingredients-list-item-name').elem
    liIngredient.appendChild(ingredientName)
    ingredientName.innerHTML = `${ingredient.ingredient}`
    const quantity = new Element('recipesCardIngredientListItemQuantity', 'p', 'recipes-card-ingredients-list-item-quantity').elem
    liIngredient.appendChild(quantity)
    if (ingredient.quantity != undefined) {
      quantity.innerHTML = '&nbsp' + ':' + ' ' + `${ingredient.quantity}`
    }
    const quantityStr = `${ingredient.quantity}`
    const quantityNb = parseInt(quantityStr)
    const unit = `${ingredient.unit}`
    displayUnit(unit, quantityNb, quantity)
  }
}

// Je modifie les unités pour respecter des abbréviations
function displayUnit(unit, quantityNb, quantity) {
  if (quantityNb <= 1) {
    switch (unit) {
    case ('verres'):
      quantity.innerHTML += ' ' + 'verre'
      break
    case ('sachets'):
      quantity.innerHTML += ' ' + 'sachet'
      break
    case ('gousses'):
      quantity.innerHTML += ' ' + 'gousse'
      break
    case ('tranches'):
      quantity.innerHTML += ' ' + 'tranche'
      break
    case ('pincées'):
      quantity.innerHTML += ' ' + 'pincée'
      break
    case ('feuilles'):
      quantity.innerHTML += ' ' + 'feuille'
      break
    case ('boites'):
      quantity.innerHTML += ' ' + 'boite'
      break
    case ('barquettes'):
      quantity.innerHTML += ' ' + 'barquette'
      break
    case ('tasses'):
      quantity.innerHTML += ' ' + 'tasse'
      break
    case ('tiges'):
      quantity.innerHTML += ' ' + 'tige'
      break
    case ('cuillère à soupe'):
      quantity.innerHTML += ' ' + 'c à s'
      break
    case ('cuillère à café'):
      quantity.innerHTML += ' ' + 'c à c'
      break
    case ('litre'):
      quantity.innerHTML += ' ' + 'L'
      break
    }
  } else {
    switch (unit) {
    case ('grammes'):
      quantity.innerHTML += ' ' + 'gr'
      break
    case ('cuillères à soupe'):
      quantity.innerHTML += ' ' + 'c à s'
      break
    case ('cuillères à café'):
      quantity.innerHTML += ' ' + 'c à c'
      break
    case ('litres'):
      quantity.innerHTML += ' ' + 'L'
      break
    case ('undefined'):
      quantity.innerHTML += ' '
      break
    default:
      quantity.innerHTML += ' ' + ` ${unit}`
    }
  }
}
