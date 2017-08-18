/*

- let $ = document.querySelector.bind(document): Exemplo de redução de expressão idêntico ao jquery.
Esta é uma forma de executar repetições de código de forma mais enxuta, podendo criar mini-frameworks.
É possível fazer com qualquer sintax que venha ser muito comprida e venha se repetir varias vezes

- .bind(document): Quando definimos $ como document.querySelector apenas, o contexto de this não é document, mas
sim o escopo atual que estamos definindo. Para que nossa referência seja document, definimos dollar $ como
document.querySelector e acrescentamos um .bind(document), que diz que o dollar $ faça referência ao
document, permitindo uma sintaxe parecida com a do jquery e menos verbosa.

- Spread Operator (... - três pontos como parâmetro de função): Entende que o array que está sendo passado
deve ser desmembrado, separando uma coleção de arrays em parâmetros separados ( de funcao ([1,2,3]) para
funcao(1,2,3) ), sendo utilizado desta forma: funcao(...array[]). Ele pega os elementos do array e faz
a seguinte operação: O primeiro elemento do array é o primeiro argumento da função e assim por diante.

- .map(): Função que mapeia um array para criar outro com características diferentes ou iguais, dependendo do
que se passa como parâmetro do map. No código, usamos map(function(item, indice)), onde o item é o valor
do indice do array em que estamos manipulando, e o índice, o índice do item que estamos manipulando.

- Arrow Function (item, indice) => { }: É uma nova forma de declarar uma função do ECMA Script 2015.
No lugar do nome function, omitimos function e após os parametros da função colocamos uma flecha =>,
sendo a forma de ser usado, o seguinte: (param1, param2) => { Demais Instruções }. Quando temos apenas
uma instrução, podemos omitir o bloco e definir de forma inline, como definida no código, não precisando
definir um return, pois dessa forma, inline, ja se entende que a Arrow Function deve retornar a ação definida.

- this._listaNegociacoes = new ListaNegociacoes(function(this, function(model)) { this._negociacoesView.update(model); }):
Como foi definido um parâmetro contexto e armadilha na classe ListaNegociacoes, onde contexto recebe a referência da
classe atual NegociacaoController, e armadilha que recebe uma função de atualizar a view automaticamente sem a necessidade
de chamar toda vez o método update() manualmente, definimos essa função para exercer essa função de update automatico.
Percebe-se que foi removido this._negociacoesView.update(model) de adiciona() e apaga(). Este método é uma forma de fazermos com
que a referência seja passada como NegociacaoController para o this de this._negociacoesView.update(model). Substituido pelo método
abaixo.

- this._listaNegociacoes = new ListaNegociacoes(this, (model) => this._negociacoesView.update(model)): Desta forma,
utilizando a arrow function, conseguimos manter o escopo de this para a NegociacaoController. A arrow function não é apenas
uma maneira sussinta de escrever código, ela tem uma característica muito peculiar. O escopo de uma arrow function é Lexica,
ele mantém o escopo do this do local onde este está sendo chamado, diferente da function() que mantem o escopo de this de forma
dinâmica.

- Promise: Promise é um padrão de projeto onde, ao realizar uma requisição,...



Exemplo com/sem primise:
------------ Antes - sem Promise ------------

service.obterNegociacoesDaSemana((erro, negociacoes) => {

if (erro) {
this._mensagem.texto = erro;
return;
}

negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
this._mensagem.texto = 'Negociações importadas com sucesso';

service.obterNegociacoesDaSemana((erro, negociacoes) => {

if (erro) {
this._mensagem.texto = erro;
return;
}

negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
this._mensagem.texto = 'Negociações importadas com sucesso';

service.obterNegociacoesDaSemana((erro, negociacoes) => {

if (erro) {
this._mensagem.texto = erro;
return;
}

negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
this._mensagem.texto = 'Negociações importadas com sucesso';

});

});

});

------------ Depois - com Promise - não funcionando como o esperado ------------
let service = new NegociacaoService();

// Promise
service.obterNegociacoesDaSemana()
.then(negociacoes => {
negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
this._mensagem.texto = 'Negociações obtidas com sucesso';
})
.catch(erro => this._mensagem.texto = erro);

// Promise
service.obterNegociacoesDaSemanaAnterior()
.then(negociacoes => {
negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
this._mensagem.texto = 'Negociações obtidas com sucesso';
})
.catch(erro => this._mensagem.texto = erro);

// Promise
service.obterNegociacoesDaSemanaRetrasada()
.then(negociacoes => {
negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
this._mensagem.texto = 'Negociações obtidas com sucesso';
})
.catch(erro => this._mensagem.texto = erro);

------------ Depois - com Promise - funcionando -> com Promise.all([...]) ------------
let service = new NegociacaoService();

Promise.all([
service.obterNegociacoesDaSemana(),
service.obterNegociacoesDaSemanaAnterior(),
service.obterNegociacoesDaSemanaRetrasada()
])
.then(negociacoes => {
negociacoes
.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
this.message.texto = "Negociações importadas com sucesso";
})
.catch(erro => this._mensagem.texto = erro);

- Promise.all(...,...,...):

*/

class NegociacaoController {

  constructor() {

    let $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');


    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona', 'esvazia'
    );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')),
      'texto'
    );

    this._ordemAtual = '';

  }

  adiciona(event) {

    event.preventDefault();

    try {
      this._listaNegociacoes.adiciona(this._criaNegociacao());
      this._limpaFormulario();
      this._mensagem.texto = "Dados efetuados com sucesso!";
    } catch(erro) {
      this._mensagem.texto = erro;
    }
  }

  importaNegociacoes() {

    let service = new NegociacaoService();

    Promise.all([
      service.obterNegociacoesDaSemana(),
      service.obterNegociacoesDaSemanaAnterior(),
      service.obterNegociacoesDaSemanaRetrasada()
    ])
    .then(negociacoes => {
      negociacoes
      .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
      .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = "Negociações importadas com sucesso";
    })
    .catch(erro => {this._mensagem.texto = erro; console.log(erro); });

  }

  _criaNegociacao() {

    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  apaga() {

    this._listaNegociacoes.esvazia();
    this._mensagem.texto = "Lista de negociações apagadas com sucesso!";
  }

  _limpaFormulario() {

    this._inputData.value = '';
    this._inputValor.value = 0.0;
    this._inputQuantidade.value = 1;

    this._inputData.focus();
  }

  ordena(coluna) {

    if (this._ordemAtual == coluna) {
      this._listaNegociacoes.inverteOrdem();
    } else {
      this._listaNegociacoes.ordena((p, s) => p[coluna] - s[coluna]);
    }
    this._ordemAtual = coluna;
  }

}
