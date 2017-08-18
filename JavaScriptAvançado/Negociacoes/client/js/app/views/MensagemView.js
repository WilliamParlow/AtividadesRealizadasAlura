/*

  - class MensagemView extends View: Esta é a forma na qual definimos que uma classe herda
  de uma outra classe pai, que possui métodos e atributos padrões ja implementados, onde não necessidade
  de reescrever os mesmos métodos em classes que possuem o mesmo método.

  - constructor(elemento) { super(elemento); }: Como essa classe herda da classe pai View, utilizamos
  super(elemento) no construtor para inicializar o atributo/propriedade elemento através do construtor da classe
  pai. Assim, reutilizamos o método construtor que nos foi oferecido pela classe pai. Classe pai View se encontra
  no arquivo View.js, na pasta views.
*/

class MensagemView extends View {

  constructor(elemento) {
    super(elemento);
  }

  template(model) {

    return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`; // Condição que evita inserir o parágrafo de info
  }
}
