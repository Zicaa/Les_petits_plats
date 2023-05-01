// Je crée une carte pour chaque recette en lui passant le tableau de recettes en paramètre
function recipesCardFactory(recipe) {

   // Je récupère la section contenant les recettes 
  const section = document.querySelector('.section')
  section.style.display = 'grid'
  section.style.justifyContent = 'space-between'

  // Je crée une boucle for et lui passe le tableau de recettes en paramètre
  // Pour chaque recette, je crée et j'intègre ces nouveaux éléments grâce à la classe elem
  for (let i = 0; i < recipe.length; i++) {
    const article = new Element('recipeCard', 'article', 'recip-card').elem
    section.appendChild(article)
    article.id = `article-${recipe[i].id}`
    const anchor = new Element('recipCardLink', 'a', 'recip-card-link').elem
    article.appendChild(anchor)
    anchor.href = '#'
    const divImage = new Element('recipCardImage', 'div', 'recip-card-bg').elem
    anchor.appendChild(divImage)
    const divDescription = new Element('recipCardDescription', 'div', 'recip-card-description').elem
    anchor.appendChild(divDescription)
    const divTitle = new Element('recipCardDescriptionTitle', 'div', 'recip-card-description-title').elem
    divDescription.appendChild(divTitle)
    const title = new Element('recipCardDescriptionH3', 'h3', 'recip-card-description-title-h3').elem
    divTitle.appendChild(title)
    title.textContent = `${recipe[i].name}`
    const divTime = new Element('recipCardDescriptionTitleTime', 'div', 'recip-card-description-title-time').elem
    divTitle.appendChild(divTime)
    const iconTime = new Element('iconTime', 'i', 'far').elem
    divTime.appendChild(iconTime)
    iconTime.classList.add('fa-clock')
    const time = new Element('recipCardDescriptionTitletimeTxt', 'p', 'recip-card-description-title-time-txt').elem
    divTime.appendChild(time)
    time.textContent = `${recipe[i].time} min`
    const divdescriptionContent = new Element('recipCardDescriptionContent', 'div', 'recip-card-description-content').elem
    divDescription.appendChild(divdescriptionContent)
    const ulIngredients = new Element('ulIngredients', 'ul', 'ingredientsList').elem
    divdescriptionContent.appendChild(ulIngredients)

    // J'appelle la fonction createIngredients pour générer les ingrédients
    createIngredients(recipe[i].ingredients, ulIngredients)
    const description = new Element('recipCardDescriptionDescription', 'p', 'recip-card-description-description').elem
    divdescriptionContent.appendChild(description)
    description.textContent = `${recipe[i].description}`
  }
}

// Je crée la fonction createIngredients pour les intégrer dans les cartes recettes
function createIngredients(ingredients, ulIngredients) {

  // Pour chaque ingrédient de mon tableau d'ingrédients
  for (let ingredient of ingredients) {

    // Je crée une liste et l'intègre à la liste d'ingrédients totale
    const liIngredient = new Element('liIngredient', 'li', 'ingredientsList-item').elem
    ulIngredients.appendChild(liIngredient)

    // Je crée un paragraphe pour le nom de l'ingrédient et l'intègre à sa liste
    const ingredientName = new Element('ingredientName', 'p', 'ingredientsList-item-name').elem
    liIngredient.appendChild(ingredientName)
    ingredientName.innerHTML = `${ingredient.ingredient}`

    // Je crée un paragraphe pour la quantité de l'ingrédient et l'intègre à sa liste
    const quantity = new Element('quantity', 'p', 'ingredientsList-item-quantity').elem
    liIngredient.appendChild(quantity)

    // Si la quantité de l'ingrédient n'est pas reconnue, l'intégrer avec innerHTML
    if (ingredient.quantity != undefined) {
      quantity.innerHTML = '&nbsp' + ':' + ' ' + `${ingredient.quantity}`
    }

    // Je récupère le nombre d'ingrédient en chiffre avec parseInt
    const quantityStr = `${ingredient.quantity}`
    const quantityNb = parseInt(quantityStr)
    const unit = `${ingredient.unit}`

    // J'appelle la fonction createUnit
    createUnit(unit, quantityNb, quantity)
  }
}

// Je crée la fonction createUnit qui qui génère les unités et abréviations
function createUnit(unit, quantityNb, quantity) {

  // Si la quantité est inférieure ou égale à 1, alors les unités seront écrit en entier au singulier
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

  // Sinon j'intègre les abréviations suivantes par un innerHTML
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
