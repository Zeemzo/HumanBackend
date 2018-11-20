import { userController } from "../controllers/userController";
import { requestController } from "../controllers/requestController";
import { admin } from '../firebase/admin'
import * as requestAPI from "./requestAPI";
import * as reportsAPI from "./reportsAPI";

import * as matchAPI from "./matchAPI";

import * as userAPI from "./userAPI";
import cors from "cors";
import * as dotenv from "dotenv";
const Chatkit = require('pusher-chatkit-server')

dotenv.config();

var jwt = require('jsonwebtoken');
const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:530428ef-4a08-417e-99d7-054b81d20f43',
    key: '0ffca282-50f9-49ba-bb30-d27a10f15fc8:Hfun2lXk6knlMCxOP0VnTC4nnWNS/toTQPMHKxuOcnc=',
})



import { Router, Request, Response, NextFunction } from "express";

const router: Router = Router();


router.use("/request", auth, requestAPI.router);
router.use("/matchedRequest", auth, matchAPI.router);
router.use("/reports", auth, reportsAPI.router);


router.use("/user", auth, userAPI.router);
// router.use("/report");

router.post("/token", (req, res, next) => {
    admin.auth().getUserByEmail(req.body.email)
        .then((userRecord: any) => {
            // //console.log(userRecord)
            // See the UserRecord reference doc for the contents of userRecord.
            //   //console.log("Successfully fetched user data:", userRecord.toJSON());
            var token = jwt.sign({ email: req.body.email }, process.env.SECRET);
            res.send({ token: token });
        })
        .catch((error: any) => {
            //   //console.log("Error fetching user data:", error);
            res.send({ error: "Email is not authenticated!" });

        });


});

router.post("/push/token", (req, res, next) => {
    //    const email=req.body.email;
    //    const pushToken=req.body.pushToken;
    const controller = new userController.UserData;
    //console.log(req.body);

    controller.writeUserDataPush(req, res, next);
    // if (result) {
    //     res.send("Done");
    // }





});


function auth(req: Request, res: Response, next: NextFunction) {
    const lol = req.headers.authorization;
    const token: string[] = lol.split(" ");


    jwt.verify(token[1], process.env.SECRET, (err: any, decodedToken: string) => {
        if (err || !decodedToken) {
            //   logger.info("Authentication failed");

            return res.status(403).json({ err: "Authentication failed" });
        } else {

            //  //console.log(decodedToken);

            next();
        }

    });

}

router.post('/users', (req, res) => {
    const username = req.body.email
    chatkit
        .createUser({
            id: username,
            name: username
        })
        .then(() => res.sendStatus(201))
        .catch((error: any) => {
            if (error.error_type === 'services/chatkit/user_already_exists') {
                res.sendStatus(200)
            } else {
                res.status(error.status).json(error)
            }
        })
})

router.post('/authenticate', (req, res) => {
    const authData = chatkit.authenticate({ userId: req.query.user_id })
    
    res.status(authData.status).send(authData.body)
})

router.post("/adduser", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.writeUserData(req, res, next);
    // if (result) {
    //     res.send("Done");
    // }
    //console.log(req.body);
});

export { router };
