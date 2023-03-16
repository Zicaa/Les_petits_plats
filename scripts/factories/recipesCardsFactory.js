// Je crée une nouvelle classe pour la génération des éléments
class Element {
  constructor(name, type, classname) {
    this.name = name
    this.type = type
    this.classname = classname
  }
  get elmt() {
    return this.creatElmt()
  }
  creatElmt() {
    this.name = document.createElement(this.type)
    this.name.classList.add(this.classname)
    return this.name
  }
}

// Je crée la fonction qui génère les cards de recettes
function recipesCardFactory(param) {
    const section = document.querySelector('.recipes-section')
  
    for (let i = 0; i < param.length; i++) {
      const article = new Element('recipesCard', 'article', 'recipes-card').elmt
      section.appendChild(article)
      article.id = `${param[i].id}`
      const link = new Element('recipesCardLink', 'a', 'recipes-card-link').elmt
      article.appendChild(link)
      link.href = '#'
      const divImage = new Element('recipesCardBg', 'div', 'recipes-card-bg').elmt
      link.appendChild(divImage)
      const image = new Element('recipesCardImg', 'img', 'recipes-card-img').elmt
      divImage.appendChild(image)
      image.src = `./assets/images/${param[i].image}`
      image.alt = `${param[i].name}`
      const divDescription = new Element('recipesCardDescription', 'div', 'recipes-card-description').elmt
      link.appendChild(divDescription)
      const divTitle = new Element('recipesCardTitle', 'div', 'recipes-card-title').elmt
      divDescription.appendChild(divTitle)
      const title = new Element('', 'h3', 'recipes-card-title-h3').elmt
      divTitle.appendChild(title)
      title.textContent = `${param[i].name}`
      const divTime = new Element('recipesCardTitleTime', 'div', 'recipes-card-title-time').elmt
      divTitle.appendChild(divTime)
      const iconTime = new Element('iconTime', 'i', 'far').elmt
      divTime.appendChild(iconTime)
      iconTime.classList.add('fa-clock')
      const time = new Element('recipesCardTitleTimeTxt', 'p', 'recipes-card-title-time-txt').elmt
      divTime.appendChild(time)
      time.textContent = `${param[i].time} min`
      const divdescriptionContent = new Element('recipesCardDescriptionContent', 'div', 'recipes-card-description-content').elmt
      divDescription.appendChild(divdescriptionContent)
      const ulIngredients = new Element('ulIngredients', 'ul', 'recipes-card-ingredient-list').elmt
      divdescriptionContent.appendChild(ulIngredients)
      displayIngredients(param[i].ingredients, ulIngredients)
      const description = new Element('description', 'p', 'recipes-card-description-txt').elmt
      divdescriptionContent.appendChild(description)
      description.textContent = `${param[i].description}`
    }
  }
  
  function displayIngredients(ingredients, ulIngredients) {
    for (let ingredient of ingredients) {
      const liIngredient = new Element('liIngredient', 'li', 'recipes-card-ingredient').elmt
      ulIngredients.appendChild(liIngredient)
      const ingredientName = new Element('ingredientName', 'p', 'recipes-card-ingredient-name').elmt
      liIngredient.appendChild(ingredientName)
      ingredientName.innerHTML = `${ingredient.ingredient}`
      const quantity = new Element('quantity', 'p', 'recipes-card-ingredient-quantity').elmt
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