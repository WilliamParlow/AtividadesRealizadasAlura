/*
  - constructor(texto='') {...}: Esta forma de passar parâmetros definindo um valor,
  é uma forma de definir um valor padrão para um atributo caso o usuário não passe
  um valor no parâmetro do construtor
*/

class Mensagem {

  constructor(texto="") {

    this._texto = texto;
  }

  get texto() {

    return this._texto;
  }

  set texto(texto) {

    this._texto = texto;
  }
  
}
