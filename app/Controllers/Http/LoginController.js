'use strict'
const User = use('App/Models/User');
const Database = use('Database');

class LoginController {
  index({view}){
    return view.render("login");
  }

  cadastro({view}){
    return view.render("cadastro");
  }

  async cadastrar({request, response}){

    const user = new User();
    user.username = request.input("username");
    user.email = request.input("email");
    user.password = request.input("password");

    await user.save();

    return response.redirect("/");
  }

  async store({view, request, session}){


    const userEmail = await Database.from('users').where('email', request.input('email'));

    console.log(request.input('password'));

    if(!userEmail){
      return view.render('login', {erro: "Usuário inexistente"});
    }

    if(userEmail[0].password != request.input('password')){
      return view.render('login', {erro: "Senha incorreta"});
    }else{
      session.put('userId', userEmail[0].id);
      session.put('username', userEmail[0].username);
      session.put('password', userEmail[0].senha);

      const games = await Database.select('*').from('games');

    for(var i=0; i < games.length; i++){
      if(games[i].desconto != 0){

        let decimal = games[i].desconto / 100;
        let desconto = games[i].preco * decimal;
        let descontado = games[i].preco - desconto;

        games[i].preco = descontado;

      }
    }

      return view.render("main", {games: games, userId: session.get('userId'), username: session.get('username'), senha: session.get('password')});
    }
  }

  async perfil({view}){

    return view.render("perfil", {nome: session.get('username'), senha: session.get('password')});
  }
}

module.exports = LoginController
