/*

  - return [].concat(this._negociacoes): Esta é uma forma de programação defensiva que
  evita qualquer forma de alteração da lista de negociações fora desta classe. Se
  retornar this._negociacoes,estou retornando a referência direta para a lista de
  negociações da classe, sendo possível a alteração da lista sem ser através dos métodos
  da classe. O retorno de [].concat(this._negociacoes) envia a referência de um novo
  array vazio concatenado com o array de negociações. Ou seja, se alterar a nossa negociação,
  será alterado o novo array ao invés do array de negociações. Pode ser utilizado também
  a expressão return new Array().concat(this._negociacoes)

  - this._armadilha = armadilha: Recebe uma função que irá atualizar a view da negociação.
  Será uma forma de automatizar a atualização da negociacoesView sem termos que chamar
  a função update() de cada view. Porém, esta forma acarreta problemas, pois o contexto de
  this não se refere à negociacaoController, mas a própria classe, ListaNegociacoes. por
  esse motivo, este foi substituido por Reflect.apply(this._armadilha, this._contexto, [this]);
  e comentado.

  - Reflect.apply(this._armadilha, this._contexto, [this]): Como no método acima, o contexto
  não se refere a negociacaoController mas sim, a classe ListaNegociacoes que não possui uma
  negociacaoView, utilizamos o Reflect.apply() para definir as referências corretamente.
  Reflect.apply() possui 3 parâmetros, onde o primeiro se refere ao método que será executado,
  neste caso, o que foi definido para this._armadilha, o segundo se refere ao contexto que queremos
  definir para a função, neste caso, definimos NegociacaoController em this._contexto, onde este
  corrige o problema que temos de contexto/escopo, onde este se referenciava a ListaNegociacoes,
  e agora com Reflect.apply(), refere a NegociacaoController. O terceiro parâmetro refere-se aos
  parâmetros que a função definida no primeiro parâmetro de Reflecy.apply(). Este é definido em um
  array, seguindo a ordem dos parâmetros da função. Será substituido também por this._armadilha(this),
  porém, a função recebida de armadilha é uma arrow function, que mantém o escopo de NegociacaoController
  devido a carecterística de arrow function ser lexica, que matém o escopo do local que foi chamado.

  - // this._armadilha(this); (Comentado): Foi comentado novamente pois o código começa a fica estrutural
  e menos genérico. Um model deve ser a parte mais reutilizavel de uma aplicação. O atributo armadilha definido
  não faz nenhum sentido com a classe. diminuindo o índice de reutilização do código. Para isso, foi comentado o
  mesmo para utilizar um método que não necessite utilizar this._armadilha(this), mantendo o modelo intácto

*/

class ListaNegociacoes {

  constructor() {

      this._negociacoes = [];
      // this._armadilha = armadilha;
  }

  adiciona(negociacao) {

    this._negociacoes.push(negociacao);
    // this._armadilha(this);
    // Reflect.apply(this._armadilha, this._contexto, [this]);
    // this._armadilha(this); // Definido novamente, devido a característica lexica de escopo do this da arrow function, que mantém o escopo do local que foi chamado
  }

  get negociacoes() {

    return [].concat(this._negociacoes);
    // ou
    // return new Array().concat(this._negociacoes);
  }

  esvazia() {

    this._negociacoes = [];
    // this._armadilha(this);
    // Reflect.apply(this._armadilha, this._contexto, [this]);
    // this._armadilha(this); // Definido novamente, devido a característica lexica de escopo do this da arrow function, que mantém o escopo do local que foi chamado
  }

  get volumeTotal() {
    return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
  }

  ordena (criterio) {

    this._negociacoes.sort(criterio);
  }

  inverteOrdem() {

    this._negociacoes.reverse();
  }

}
