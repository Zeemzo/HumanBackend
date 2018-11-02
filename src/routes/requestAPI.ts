import { requestController } from "../controllers/requestController";
import { Router, Request, Response, NextFunction } from "express";

const router: Router = Router();

router.post("/add", (req: Request, res: Response, next: NextFunction) => {
    const controller = new requestController.RequestData;
    new Promise((resolve, reject) => {
        controller.writeRequestData(req, res, next).then((lol) => {
            if (lol) {
                resolve(lol);
                res.send(lol);
            }
        }).catch((err) => {
            reject(err);
        });;
        //console.log(req.body);
    })
    // if (result) {
    //     res.send("Done");
    // }
    
});
router.post("/accept", (req: Request, res: Response, next: NextFunction) => {
    const controller = new requestController.RequestData;
    new Promise((resolve, reject) => {
        controller.acceptRequest(req, res, next)
        .then((lol) => {
            // if (lol) {
                resolve(lol);
                res.send(lol);
            // }
        }).catch((err) => {
            reject(err);
        });;
        // //console.log(req.body);
    })
    // if (result) {
    //     res.send("Done");
    // }
    
});

router.get("/accepted/:userId", (req: Request, res: Response, next: NextFunction) => {
    const controller = new requestController.RequestData;
    new Promise((resolve, reject) => {
        controller.getAcceptedRequest(req, res, next)
        .then((lol) => {
            // if (lol) {
                resolve(lol);
                res.send(lol);
            // }
        }).catch((err) => {
            reject(err);
        });;
        // //console.log(req.body);
    })
    // if (result) {
    //     res.send("Done");
    // }
    
});


router.get("/getall/:UTCdate/:requestType", (req: Request, res: Response, next: NextFunction) => {
    const controller = new requestController.RequestData;
    new Promise((resolve, reject) => {
        controller.getAllRequest(req, res, next)
            .then((lol) => {
                resolve(lol);
                // res.header({"Content-Type":"application/json"});
                res.send(lol);
            }).catch((err) => {
                reject(err);
            });
    });
});

router.get("/get/:UTCdate/:requestType/:id", (req: Request, res: Response, next: NextFunction) => {
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

router.get("/query/:UTCdate/:requestType/:attribute/:search", (req: Request, res: Response, next: NextFunction) => {
    const controller = new requestController.RequestData;
        controller.queryRequest(req, res, next);
    
});


router.get("/queryRange/:UTCdate/:requestType/:attribute/:min/:max", (req: Request, res: Response, next: NextFunction) => {
    const controller = new requestController.RequestData;
        controller.queryRequestLocation(req, res, next);
    
});


router.post("/fulfill", (req: Request, res: Response, next: NextFunction) => {
    const controller = new requestController.RequestData;
    new Promise((resolve, reject) => {
        controller.fulfillRequest(req, res, next).then((lol) => {
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


router.post("/fulfillmatch", (req: Request, res: Response, next: NextFunction) => {
    const controller = new requestController.RequestData;
    //console.log(req.body);
    new Promise((resolve, reject) => {
        controller.fulfillMatch(req, res, next).then((lol) => {
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
// Export the express.Router() instance to be used by routes.ts
export { router };