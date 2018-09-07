import * as bodyParser from "body-parser";
import express = require("express");
import * as apiRoutes from "./routes/routes";
import * as dotenv from "dotenv";

dotenv.config();
// Create a new express application instance
// const app: express.Application = express();
// The port the express app will listen on
const port =process.env.PORT||7000;
// app.use(bodyParser);
express()
.use(bodyParser.urlencoded({ extended: true }))
.use(bodyParser.json())

.use( "/api" , apiRoutes.router)

// Serve the application at the given port
.listen(port, () => {
    // Success callback
    // tslint:disable-next-line:no-console
    console.log(`Listening at http://localhost:${port}/`);
});


// export default app;