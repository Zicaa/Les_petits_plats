// Fonction qui crée chaque carte de recette
function recipesCardFactory(param) {
  const section = document.querySelector('.recipes-section')
  section.style.display = 'grid'
  section.style.justifyContent = 'space-between'

  for (let i = 0; i < param.length; i++) {
    const article = new Element('article', 'article', 'recipes-card').elem
    section.appendChild(article)
    article.id = `article-${param[i].id}`
    const link = new Element('anchor', 'a', 'recipes-card-link').elem
    article.appendChild(link)
    link.href = '#'
    const divImage = new Element('divImage', 'div', 'recipes-card-bg').elem
    link.appendChild(divImage)
    const image = new Element('image', 'img', 'recipes-card-img').elem
    divImage.appendChild(image)
    image.src = `./assets/images/${param[i].image}`
    image.alt = `${param[i].name}`
    const divDescription = new Element('divDescription', 'div', 'recipes-card-description').elem
    link.appendChild(divDescription)
    const divTitle = new Element('divTitle', 'div', 'recipes-card-title').elem
    divDescription.appendChild(divTitle)
    const title = new Element('title', 'h3', 'recipes-card-title-h3').elem
    divTitle.appendChild(title)
    title.textContent = `${param[i].name}`
    const divTime = new Element('divTime', 'div', 'recipes-card-title-time').elem
    divTitle.appendChild(divTime)
    const iconTime = new Element('iconTime', 'i', 'far').elem
    divTime.appendChild(iconTime)
    iconTime.classList.add('fa-clock')
    const time = new Element('time', 'p', 'recipes-card-title-time-txt').elem
    divTime.appendChild(time)
    time.textContent = `${param[i].time} min`
    const divdescriptionContent = new Element('divdescriptionContent', 'div', 'recipes-card-description-content').elem
    divDescription.appendChild(divdescriptionContent)
    const ulIngredients = new Element('ulIngredients', 'ul', 'recipes-card-ingredients-list').elem
    divdescriptionContent.appendChild(ulIngredients)
    displayIngredients(param[i].ingredients, ulIngredients)
    const description = new Element('description', 'p', 'recipes-card-description-txt').elem
    divdescriptionContent.appendChild(description)
    description.textContent = `${param[i].description}`
  }
}

//_________________________________________________________________
/**
 * @function displayIngredients
 * affichage des ingrédients, quantités et unités dans les cartes recettes
 */

function displayIngredients(ingredients, ulIngredients) {
  for (let ingredient of ingredients) {
    const liIngredient = new Element('liIngredient', 'li', 'recipes-card-ingredient').elem
    ulIngredients.appendChild(liIngredient)
    const ingredientName = new Element('ingredientName', 'p', 'recipes-card-ingredient-name').elem
    liIngredient.appendChild(ingredientName)
    ingredientName.innerHTML = `${ingredient.ingredient}`
    const quantity = new Element('quantity', 'p', 'recipes-card-ingredient-quantity').elem
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

// Modification des unités pour respecter les accords et créer des abbréviations
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