'use strict'

const Game = use('App/Models/Game');
const Database = use('Database');

class MainController {
  async index({view, session}){

    const games = await Database.select('*').from('games');

    console.log(games);

    for(var i=0; i < games.length; i++){
      if(games[i].desconto != 0){

        let decimal = games[i].desconto / 100;
        let desconto = games[i].preco * decimal;
        let descontado = games[i].preco - desconto;

        games[i].preco = descontado;

      }
    }

    return view.render('main', { nome: session.get('username'), userId: session.get('userId'), games: games });

  }
}

module.exports = MainController
