Always make a note for the Routes, the database schema before starting to make any API.

For me only(learning purpose):
How i wrote the code (file wise):
1.  server.js
2.  app.js
3.  api->routes->products.js
             ->orders.js
4.  connect database(mongodb/mongoose) through the app.js
5.  with the above step start doing Models for the (M(models)V(view i.e. we don't render any view here)C(controllers i.e. routes detailed) architeture)
6.  connect the models to the controllers/routers
7.  for every routes made configure the database actions with proper response to them
8.  do authentication things such as signup and signin
