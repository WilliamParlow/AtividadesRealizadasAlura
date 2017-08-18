/*

  - Underline antes do nome das variáveis: É uma convenção que não evita da variável
  ser alterada, mas que ao bater o olho, representa que este não pode ser modificado

  - this.propriedade: Cria uma variável/atributo/propriedade da classe

  - Object.freeze(this): Congela o objeto, evitando a alteração de seus atributos diretamente.
  Com isso, não conseguimos mais alterar a variável quando chamarmos Objeto._atributo = valor.
  Este é um método que deixa o objeto mais encapsulado, porém ainda assim é possível ver a
  variável _atributo da classe

  - get data(): É uma forma de realizar o método get de forma como se estivesse chamando
  a propriedade diretamente, acessando como se fosse uma propriedade, pois por debaixo
  dos panos, ele está executando um método.
    Ex: atributo: _quantidade
        get de _quantidade: get quantidade() {return this._quantidade}
        obter valor de _quantidade: Objeto.quantidade;

  Não é necessário por () para chamarmos o método.

  - return new Date(this._data): Como data é um objeto Date, é possível alterar
  seu valor com um método set de Date, pois Object.freeze(this) trabalha apenas
  em nível razo, não evitando a alteração de modo profundo. Realizando este
  return de uma nova data, se houver uma alteração, estaremos retornando uma
  nova instancia de Date com os valores de _data da nossa classe, sendo assim,
  não será alterado o nosso objeto _data mas sim a nova instância sendo retornada.
  Isso é chamado de programação defensiva.

  - this._data = new Date(data.getTime()): Neste caso, quando passamos um objeto
  como parêmetro de um construtor, devemos cuidar pois se definirmos um objeto
  Date hoje, e passarmos este como parâmetro do construtor da classe Negociacao,
  se alterarmos o valor de hoje mais para frente, o valor de _data será alterado
  também. Para resolver isso, _data recebe no construtor uma nova instância do
  objeto que está sendo passado como parâmetro, sendo assim, se alterarmos hoje,
  não alterara a _data da classe, pois este recebeu uma cópia de hoje, a nova
  instância.

*/
class Negociacao {

  constructor(data, quantidade, valor) {

    this._data = new Date(data.getTime());
    this._quantidade = quantidade;
    this._valor = valor;
    Object.freeze(this); // Congela o objeto
  }

  // Getters Methods

  get data() {
    return new Date(this._data);
  }

  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }

  get volume() {
    return this._quantidade * this._valor;
  }

  // Setter Methods

  // setData(data) {
  //   this._data = data;
  // }
  //
  // setQuantidade(quantidade) {
  //   this._quantidade = quantidade;
  // }
  //
  // setValor(valor) {
  //   this._valor = valor;
  // }

  // Other Methods


}
