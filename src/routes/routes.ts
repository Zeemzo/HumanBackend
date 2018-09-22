import { userController } from "../controllers/userController";
import { requestController } from "../controllers/requestController";
import * as requestAPI from "./requestAPI";
import * as userAPI from "./userAPI";
import cors from "cors";


import { Router, Request, Response, NextFunction } from "express";

const router: Router = Router();
// Use CORS
router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

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

router.use("/request",requestAPI.router);
router.use("/user",userAPI.router);

export {router};
