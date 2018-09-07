import { requestController } from "../controllers/requestController";
import { Router, Request, Response, NextFunction } from "express";

const router: Router = Router();

router.post("/add", (req: Request, res: Response, next: NextFunction) => {
    const controller = new requestController.RequestData;
    controller.writeRequestData(req, res, next).then((lol)=>{
        if(lol){
            res.send(lol);
        }
    });
    // if (result) {
    //     res.send("Done");
    // }
    console.log(req.body);
});

router.get("/getall", (req: Request, res: Response, next: NextFunction) => {
    const controller = new requestController.RequestData;
    new Promise((resolve, reject) => {
        controller.getAllRequest(req, res, next)
            .then((lol) => {
                resolve();
                // res.header({"Content-Type":"application/json"});
                res.send(lol);
            }).catch((err) => {
                reject(err);
            });
    });
});

router.get("/get/:id", (req: Request, res: Response, next: NextFunction) => {
    const controller = new requestController.RequestData;
    new Promise((resolve, reject) => {
        controller.getRequest(req, res, next)
            .then((lol) => {
                resolve();
                res.send(lol);
            }).catch((err) => {
                reject(err);
            });
    });
});
// Export the express.Router() instance to be used by routes.ts
export {router};