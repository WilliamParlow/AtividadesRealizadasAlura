/*

  - static textoParaData(texto)/static dataParaTexto(data): Definie o método como estático, ou seja,
  são métodos que são invocados diretamente da classe, não sendo necessário realizar uma instância
  desta classe; Ex:
    * Definição da classe: DateHelper.
      - Método: textoParaData(texto)
      - Chamada do método: DateHelper.textoParaData(texto)

  - `algum texto ${variavel} mais texto`: Chamado de template string, é uma expressão
  facilitadora, disponível a partir do ECMA 2015 que substitui a concatenação de strings com +.
  Toda a expressão é definida entre um par de crase (`expressão e strings`), e nela é possível
  definir uma sequência de strings, e quando querermos utilizar o valor de uma variável no meio
  das demais strings, utilizamos a expressão de template string `${variavel}`, que substituira
  este campo pelo valor da variável definida entre as chaves. Ex:
    * Variável: idade = 18
      - Expressão normal com concatenação: console.log("Fulano possui " + idade + " anos de idade");
      - Expressão com template String: console.log(`Fulano possui ${idade} anos de idade`);

  - /\d{4}-\d{2}-\d{2}/.test(texto): É uma expressão regular (RegExp) que, através do método
  test(texto), vai testar se o texto de data está no formato correto como definido
  na expressão regular. A sequência \d é um metacaractere, um curinga que casa com um dígito (0 a 9).
  A sequência {4} e {2} é um quantificador: indica que o padrão precedente deve ser repetido 4 vezes para
  o ano e 2 vezes para os demais, portanto \d{4} é o mesmo que \d\d\d\d e \d{2} \d\d. O ^ e & servem para garantir
  que o input iniciará e terminará com a quantidade de dígitos indicada.

*/


class DateHelper {

  constructor() {

    throw new Error("Não é possível instancia a classe. Este é uma classe estáticca");
  }

  static dataParaTexto(data) {

    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

  static textoParaData(texto) {

    // ^ -> Começa com ----- & -> Termina com
    if (!/^\d{4}-\d{2}-\d{2}$/.test(texto))
      throw new Error("O valor não segue o padrão YYYY-MM-DD");

    return new Date(...texto.split('-').map((val, indice) => val - indice % 2))
  }

}