import * as bodyParser from "body-parser";
import express = require("express");
import * as apiRoutes from "./routes/routes";

// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const port = process.env.PORT || 6999;
// app.use(bodyParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use( "/api" , apiRoutes.router);

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    // tslint:disable-next-line:no-console
    console.log(`Listening at http://localhost:${port}/`);
});