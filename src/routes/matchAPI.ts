import { requestHandler } from "../controllers/requestMatcher";
import { Router, Request, Response, NextFunction } from "express";

const router: Router = Router();

router.get("/getmatches", (req: Request, res: Response, next: NextFunction) => {
    const controller = new requestHandler.matchData;
    new Promise((resolve, reject) => {
        controller.getMatchRequest(req, res, next).then((lol) => {
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


router.get("/getactivematches", (req: Request, res: Response, next: NextFunction) => {
    const controller = new requestHandler.matchData;
    new Promise((resolve, reject) => {
        controller.getActiveMatchRequest(req, res, next).then((lol) => {
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


router.post("/updatematchrequest", (req: Request, res: Response, next: NextFunction) => {
    const controller = new requestHandler.matchData;
    new Promise((resolve, reject) => {
        controller.updateMatchRequestStatus(req, res, next).then((lol) => {
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




router.get("/match", (req: Request, res: Response, next: NextFunction) => {
    // const controller = new requestHandler.matchData;
    // // new Promise((resolve, reject) => {
    //     controller.matchRequestV3(req, res, next)
   
    
});

// router.get("/getall/:UTCdate/:requestType", (req: Request, res: Response, next: NextFunction) => {
//     const controller = new requestController.RequestData;
//     new Promise((resolve, reject) => {
//         controller.getAllRequest(req, res, next)
//             .then((lol) => {
//                 resolve(lol);
//                 // res.header({"Content-Type":"application/json"});
//                 res.send(lol);
//             }).catch((err) => {
//                 reject(err);
//             });
//     });
// });

// router.get("/get/:UTCdate/:requestType/:id", (req: Request, res: Response, next: NextFunction) => {
//     const controller = new requestController.RequestData;
//     new Promise((resolve, reject) => {
//         controller.getRequest(req, res, next)
//             .then((lol) => {
//                 resolve();
//                 res.send(lol);
//             }).catch((err) => {
//                 reject(err);
//             });
//     });
// });

// router.get("/query/:UTCdate/:requestType/:attribute/:search", (req: Request, res: Response, next: NextFunction) => {
//     const controller = new requestController.RequestData;
//         controller.queryRequest(req, res, next);
    
// });


// router.get("/queryRange/:UTCdate/:requestType/:attribute/:min/:max", (req: Request, res: Response, next: NextFunction) => {
//     const controller = new requestController.RequestData;
//         controller.queryRequestLocation(req, res, next);
    
// });
// Export the express.Router() instance to be used by routes.ts
export { router };