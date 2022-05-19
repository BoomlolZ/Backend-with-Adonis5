/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import UsersController from 'App/Controllers/Http/UsersController'



Route.get('/user', async (ctx) => {
  return new UsersController().get(ctx)
})

Route.post('/user', async (ctx) => {
  return new UsersController().create(ctx)
})
Route.delete('/user', async (ctx) => {
  return new UsersController().delete(ctx)
})
Route.put('/user', async (ctx) => {
  return new UsersController().update(ctx)
})
