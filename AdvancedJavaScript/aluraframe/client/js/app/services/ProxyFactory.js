/*

  - Proxy: Este é um padrão de projeto onde se há um cara mentiroso, ou seja, ele se passa pelo objeto real, que Quando
    for acessado uma classe, primeiramente será passado pelo proxy, para depois acessar a classe. Com ele, é possível
    executar metodos antes de chamar os métodos da classe, que ficam entre o proxy e a classe. Proxy é idêntico ao objeto.
    Com um proxy, o objeto real fica dentro do proxy, sendo que tudo que for chamado através do objeto real, será passado
    primeiramente no proxy Após isso, o proxy delega as ações para a classe.

  - Criando um proxy: Para criar um proxy, definimos uma variável que receberá um new Proxy(), onde este recebe dois campos
    como atributo, representado por new Proxy(objeto_a_ser_encapsulado, handlers(object{})). O primeiro parâmetro objeto_a_ser_encapsulado
    será representado pelo objeto ou instância da classe, nesse caso, um objeto qualquer (ListaNegociacoes, Negociacao,...). O segundo
    parâmetro será representado pelos manipuladores (parâmetro do tipo objeto{}), onde serão definidas nossas armadilhas, ações que
    irão ocorrer quando um determinado atributo ou método for interceptado(acessado, tanto como get ou set. get e set deve ser definido
    no Proxy para realizar ação get ou/e set). Um proxy de uma
    Negociacao é instanciado da seguinte forma: let negociacaoProxy = new Proxy(new Negociacao(new Date(), 3, 300)) => Exemplo

  - Criando um proxy que executa ao modificar uma propriedade:
    <script type="text/javascript">
      let negociacao = new Proxy(new Negociacao(new Date(), 1, 100), {

        set: function(target, prop, value, receiver) {

          console.log(`${prop} => Valor anterior: ${target[prop]} - Valor atual: ${value}`);
          return Reflect.set(target, prop, value, receiver);
        }

      });
    </script>

  - Criando um proxy que executa quando acessarmos uma função ou método:
  <script type="text/javascript">
    let lista = new Proxy(new ListaNegociacoes(), {

      get(target, prop, receiver) {

        if (['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {

          return function() {

            console.log(`${prop} interceptada`);
            Reflect.apply(target[prop], target, arguments);
          }

        }

        return Reflect.get(target, prop, receiver);
      }

    });

    lista.adiciona(new Negociacao(new Date(), 1, 100));
  </script>

  - Um proxy não intercepta uma função, apenas atributos. Porém, quando formos acessar qualquer método ou atributo de uma classe,
  o proxy detecta a ação como GET, podendo assim, manipularmos a ação GET e filtrar um acesso a um método, como definido no
  exemplo acima. Para isso, definimos que nosso get receberá um target, que representa a referência para a classe real,
  prop, que representa a propriedade que foi acessada, e receiver, que representa a referência para o proxy. No caso do set,
  temos o value, que representa o novo valor sendo atribuido a um determinado atributo.

  - Reflect.apply(target[prop], target, arguments): ENTENDER

  - Reflect.get(target, prop, receiver): ENTENDER

  - Reflect.set(target, prop, value, receiver): ENTENDER

*/

class ProxyFactory {

  
  
}
