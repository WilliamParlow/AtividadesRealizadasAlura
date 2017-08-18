/*

  REST operator (constructor(model, view, ...props)): REST operator é uma forma de definir um array de parâmetros,
  apartir do parâmetro com tres pontos (...props, neste caso). Todos os valores definidos apartir do terceiro
  parâmetro, serão transformados em um array que será atribuido a variável props, ou seja, se eu chamar
  constructor(model, view, 1, 2, 3, 4, 5, 6), props será um array, recebendo todos os dados apartir do terceiro
  parâmetro, sendo seu valor o seguinte: [1,2,3,4,5,6] -> Array. Este é sempre definido como último parâmetro.

*/

class Bind {

  constructor(model, view, ...props) {

    let proxy = ProxyFactory.create(model, props, model => view.update(model));

    view.update(model);

    return proxy;
  }

}
