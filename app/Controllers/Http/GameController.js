'use strict'
const Game = use('App/Models/Game');
const Database = use('Database');


class GameController {
  async cadastro({params, view}){

    if(params.id){
      const selectedGame = await Database.from('games').where('id', params.id);
      console.log(selectedGame);
      return view.render("add", {game: selectedGame});
    }

    return view.render("add");
  }

  async cadastrar({view, request}){

    const game = new Game();
    game.nome = request.input("nome");
    game.preco = request.input("preco");
    game.plataforma = request.input("plataforma");
    game.desconto = request.input("promocao");

    await game.save();

    const games = await Database.select('*').from('games');

    for(var i=0; i < games.length; i++){
      if(games[i].desconto != 0){

        let decimal = games[i].desconto / 100;
        let desconto = games[i].preco * decimal;
        let descontado = games[i].preco - desconto;

        games[i].preco = descontado;

      }
    }

    return view.render("main", {games: games, username: session.get('username'), senha: session.get('password')});
  }

  async editar({params, view, request}){

    await Database.table('games')
    .where('id', params.id)
    .update({nome: request.input("nome"), preco : request.input("preco"), plataforma : request.input("plataforma"), desconto : request.input("promocao")});

    const games = await Database.select('*').from('games');

    for(var i=0; i < games.length; i++){
      if(games[i].desconto != 0){

        let decimal = games[i].desconto / 100;
        let desconto = games[i].preco * decimal;
        let descontado = games[i].preco - desconto;

        games[i].preco = descontado;

      }
    }

    return view.render("main", {games: games, username: session.get('username'), senha: session.get('password')});

  }

  async excluir({params, view}){
    await Database.table('games').where('id', params.id).delete();

    const games = await Database.select('*').from('games');

    for(var i=0; i < games.length; i++){
      if(games[i].desconto != 0){

        let decimal = games[i].desconto / 100;
        let desconto = games[i].preco * decimal;
        let descontado = games[i].preco - desconto;

        games[i].preco = descontado;

      }
    }

    return view.render("main", {games: games, username: session.get('username'), senha: session.get('password')});
  }

}

module.exports = GameController
