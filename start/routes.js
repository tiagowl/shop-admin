'use strict'



/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/','LoginController.index');
Route.post('/', 'LoginController.store');
Route.get('main', 'MainController.index');
Route.get('cadastro', 'LoginController.cadastro');
Route.post('cadastrar', 'LoginController.cadastrar');
Route.get('addGame', 'GameController.cadastro');
Route.get('editGame/:id', 'GameController.cadastro');
Route.put('/editGame/editGame/:id', 'GameController.editar');
Route.post('cadastrar_game', 'GameController.cadastrar');
Route.delete('deleteGame/:id', 'GameController.excluir');
Route.get('perfil', 'LoginController.perfil');
