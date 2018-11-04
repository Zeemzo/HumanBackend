import { reportController } from "../controllers/reportController";
import { Router, Request, Response, NextFunction } from "express";

const router: Router = Router();

router.get("/leaderboard", (req: Request, res: Response, next: NextFunction) => {
    const controller = new reportController.ReportData;
    new Promise((resolve, reject) => {
        controller.leaderboard(req, res, next).then((lol) => {
            if (lol) {
                // resolve(lol);
                res.send(lol);
            }
        }).catch((err) => {
            // reject(err);
        });;
        // //console.log(req.body);
    })
    // if (result) {
    //     res.send("Done");
    // }
    
});


router.get("/acceptedLeaderboard", (req: Request, res: Response, next: NextFunction) => {
    const controller = new reportController.ReportData;
    new Promise((resolve, reject) => {
        controller.acceptedLeaderboard(req, res, next).then((lol) => {
            if (lol) {
                // resolve(lol);
                res.send(lol);
            }
        }).catch((err) => {
            // reject(err);
        });;
        // //console.log(req.body);
    })
    // if (result) {
    //     res.send("Done");
    // }
    
});


router.get("/lol", (req: Request, res: Response, next: NextFunction) => {
    // console.log("fulfilllist called")

    const controller = new reportController.ReportData;
    new Promise((resolve, reject) => {
        controller.fulfillList(req, res, next).then((lol) => {
            if (lol) {
                // resolve(lol);
                res.send(lol);
            }
        }).catch((err) => {
            // reject(err);
        });;
        // //console.log(req.body);
    })
    // if (result) {
    //     res.send("Done");
    // }
    
});





export { router };