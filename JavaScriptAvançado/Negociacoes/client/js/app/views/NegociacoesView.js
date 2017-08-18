/*

  - class MensagemView extends View: Esta é a forma na qual definimos que uma classe herda
  de uma outra classe pai, que possui métodos e atributos padrões ja implementados, onde não necessidade
  de reescrever os mesmos métodos em classes que possuem o mesmo método.

  - constructor(elemento) { super(elemento); }: Como essa classe herda da classe pai View, utilizamos
  super(elemento) no construtor para inicializar o atributo/propriedade elemento através do construtor da classe
  pai. Assim, reutilizamos o método construtor que nos foi oferecido pela classe pai. Classe pai View se encontra
  no arquivo View.js, na pasta views.

  - model.negociacoes.reduce( (total, n) => total + n.volume, 0.0): reduce() é uma
  função que, como o próprio nome ja diz, reduz um array de forma que ao processar
  cada elemento do array,retornará apenas um resultado. Dentro deste é definido um
  primeiro parâmetro como arrow function que retornará o total da soma do volume
  das negociações. O segundo parâmetro é o valor de inicialização do meu total. Como parâmetro
  do arrow function, temos o total, que será a variável que receberá a soma das negociações
  e n representando um item da negociação.

  - .join(): O retorno de model.negociacoes.map(...) é um array. Como estamos
  definindo o conteúdo como o retorno de uma string, devemos transformar
  o array em um conjunto de strings. Para isso utilizamos join().

*/


class NegociacoesView extends View {

  constructor(elemento) {
    super(elemento);
  }

  template(model) {

    return `
    <table class="table table-hover table-bordered">

      <thead>
        <tr>
          <th onclick="negociacaoController.ordena('data')">DATA</th>
          <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
          <th onclick="negociacaoController.ordena('valor')">VALOR</th>
          <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
        </tr>
      </thead>

      <tbody>
      ${model.negociacoes.map(n => `

        <tr>
          <td>${DateHelper.dataParaTexto(n.data)}</td>
          <td>${n.quantidade}</td>
          <td>${n.valor}</td>
          <td>${n.volume}</td>
        </tr>

        `).join('')}
      </tbody>

      <tfoot>
      <tr>
        <td colspan="3"></td>
        <td> ${model.volumeTotal} </td>
      </tr>
      </tfoot>

    </table>`;
  }
}
