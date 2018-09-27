import * as bodyParser from "body-parser";
import express = require("express");
import * as apiRoutes from "./routes/routes";
import * as dotenv from "dotenv";
import cors from "cors";


dotenv.config();




// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const port =process.env.PORT||7000;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// app.use(cors({
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }));

// app.use(bodyParser);
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use( "/api" , apiRoutes.router);

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    // tslint:disable-next-line:no-console
    console.log(`Listening at http://localhost:${port}/`);
});


export default app;
