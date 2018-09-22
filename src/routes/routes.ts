import { userController } from "../controllers/userController";
import { requestController } from "../controllers/requestController";
import * as firebase from '../firebase/fireConnection'
import * as requestAPI from "./requestAPI";
import * as userAPI from "./userAPI";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

var jwt = require('jsonwebtoken');


import { Router, Request, Response, NextFunction } from "express";

const router: Router = Router();
// Use CORS
router.use(cors());

router.use("/request", auth,requestAPI.router);
router.use("/matchedRequest",auth, requestAPI.router);

router.use("/user", auth,userAPI.router);
// router.use("/report");

router.post("/token", (req, res, next) => {
    var token = jwt.sign({ email: req.body.email }, process.env.SECRET);
    res.send({token:token});

});

function auth(req:Request, res:Response, next:NextFunction) {
    const lol=req.headers.authorization;
    const token:string[]=lol.split(" ");


    jwt.verify(token[1], process.env.SECRET, (err: any, decodedToken: string) => {
        if (err || !decodedToken) {
            //   logger.info("Authentication failed");

            return res.status(403).json({ err: "Authentication failed" });
        } else {
            
             console.log(decodedToken);

            next();
        }

    });

}
// router.use("/user",userAPI.router);
// router.use("/user",userAPI.router);
// router.use("/user",userAPI.router);




// router.post("/user", (req: Request, res: Response, next: NextFunction) => {
//     const controller = new userController.UserData;
//     controller.writeUserData(req, res, next);
//     // if (result) {
//     //     res.send("Done");
//     // }
//     console.log(req.body);
// });

// router.get("/user/:userId", (req: Request, res: Response, next: NextFunction) => {
//     const controller = new userController.UserData;
//    new Promise((resolve, reject) => {
//         controller.getUserData(req, res, next)
//             .then((lol) => {
//                 resolve();
//                 res.send(lol);
//             }).catch(() => {
//                 reject();
//             });
//     });
// });

// router.post("/request", (req: Request, res: Response, next: NextFunction) => {
//     const controller = new requestController.RequestData;
//     controller.writeRequestData(req, res, next);
//     // if (result) {
//     //     res.send("Done");
//     // }
//     console.log(req.body);
// });

// router.get("/request", (req: Request, res: Response, next: NextFunction) => {
//     const controller = new requestController.RequestData;
//     new Promise((resolve, reject) => {
//         controller.getAllRequest(req, res, next)
//             .then((lol) => {
//                 resolve();
//                 res.send(lol);
//             }).catch(() => {
//                 reject();
//             });
//     });
// });
// Export the express.Router() instance to be used by index.ts

// router.use("/request",requestAPI.router);
// router.use("/user",userAPI.router);

export {router};
