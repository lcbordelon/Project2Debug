const express = require("express");
const exphbs = require("express-handlebars");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("public"));

//html route dependencies
require("./routes/api-routes.js")(app);
const htmlRoute = require("./routes/html-routes-controller.js");

app.use(htmlRoute);

// const itemRoute = require("./routes/item-api-routes.js");

// // Invoke Routes
// app.use(htmlRoute);
// app.use(listRoute);
// // app.use(itemRoute);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});
