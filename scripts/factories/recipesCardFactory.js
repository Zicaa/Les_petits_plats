/* eslint-disable no-unused-vars */

/** La @function recipesCardFactory crée une carte pour chaque recette en lui passant le tableau de recettes en paramètre
 * @param {Array} arrayOfrecipes - tableau de recettes
*/ 

// Je crée la fonction
function recipesCardFactory(arrayOfrecipes) {

  // Je récupère la section contenant les recettes 
 const section = document.querySelector('.section')
 section.style.display = 'grid'
 section.style.justifyContent = 'space-between'

 // Je crée une boucle for et lui passe le tableau de recettes en paramètre
 // Pour chaque recette, je crée et j'intègre ces nouveaux éléments grâce à la classe elem
 for (let i = 0; i < arrayOfrecipes.length; i++) {
   const article = new Element('recipeCard', 'article', 'recip-card').elem
   section.appendChild(article)
   article.id = `article-${arrayOfrecipes[i].id}`
   const cardLink = new Element('recipCardLink', 'a', 'recip-card-link').elem
   article.appendChild(cardLink)
   cardLink.href = '#'
   const divImage = new Element('recipCardImage', 'div', 'recip-card-bg').elem
   cardLink.appendChild(divImage)
   const image = new Element('image', 'img', 'image').elem
   divImage.appendChild(image)
   image.src = `./assets/img/${arrayOfrecipes[i].image}`
   image.alt = `${arrayOfrecipes[i].name}`
   const divDescription = new Element('recipCardDescription', 'div', 'recip-card-description').elem
   cardLink.appendChild(divDescription)
   const divTitle = new Element('recipCardDescriptionTitle', 'div', 'recip-card-description-title').elem
   divDescription.appendChild(divTitle)
   const title = new Element('recipCardDescriptionH3', 'h3', 'recip-card-description-title-h3').elem
   divTitle.appendChild(title)
   title.textContent = `${arrayOfrecipes[i].name}`
   const divTime = new Element('recipCardDescriptionTitleTime', 'div', 'recip-card-description-title-time').elem
   divTitle.appendChild(divTime)
   const iconTime = new Element('iconTime', 'i', 'far').elem
   divTime.appendChild(iconTime)
   iconTime.classList.add('fa-clock')
   const time = new Element('recipCardDescriptionTitletimeTxt', 'p', 'recip-card-description-title-time-txt').elem
   divTime.appendChild(time)
   time.textContent = `${arrayOfrecipes[i].time} min`
   const divdescriptionContent = new Element('recipCardDescriptionContent', 'div', 'recip-card-description-content').elem
   divDescription.appendChild(divdescriptionContent)
   const ulIngredients = new Element('ulIngredients', 'ul', 'ingredientsList').elem
   divdescriptionContent.appendChild(ulIngredients)

   // J'appelle la fonction createIngredients pour générer les ingrédients
   createIngredients(arrayOfrecipes[i].ingredients, ulIngredients)
   const description = new Element('recipCardDescriptionDescription', 'p', 'recip-card-description-description').elem
   divdescriptionContent.appendChild(description)
   description.textContent = `${arrayOfrecipes[i].description}`
 }
 
}

/** La @function createIngredients intégre les ingrédients dans les cartes recettes
 * @param {Array} ingredients - tous les ingrédients
 * @returns {HTMLElement} ul des ingrédients*/ 

// Je crée la fonction 
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

/** La @function createUnit génère les unités et abréviations
 * @param {String} unit - élément unique
 * @param {Number} quantityNb - quantité au pluriel
 * @param {HTMLElement} quantity  - quantité au singulier
*/ 

// Je crée la fonction 
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
