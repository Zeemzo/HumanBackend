import { userController } from "../controllers/userController";
import { Router, Request, Response, NextFunction } from "express";

const router: Router = Router();

router.post("/add", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.writeUserData(req, res, next);
    // if (result) {
    //     res.send("Done");
    // }
    console.log(req.body);
});

router.get("/view/:userId", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
   new Promise((resolve, reject) => {
        controller.getUserData(req, res, next)
            .then((lol) => {
                resolve();
                res.send(lol);
            }).catch(() => {
                reject();
            });
    });
});


// Export the express.Router() instance to be used by routes.ts
export {router};