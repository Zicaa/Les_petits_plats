/* eslint-disable no-unused-vars */

// Je crée une classe pour générer de nouveaux element du DOM avec nom, type et classe
class Element {

  // Nom de l'élément, type et nom de classe
  constructor(name, type, classname) {
    this.name = name
    this.type = type
    this.classname = classname
  }
  get elem() {
    return this.creatElem()
  }
  creatElem() {
    this.name = document.createElement(this.type)
    this.name.classList.add(this.classname)
    return this.name
  }
  
}
