import firebase from '../firebase/fireConnection';
import { NextFunction, Request, Response } from "express";



export namespace requestController {
    export class RequestData {
        public writeRequestData(req: Request, res: Response, next: NextFunction): Promise<boolean> {
            let Id = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);
            return firebase.database()
                .ref('request/needs/')
                .set({
                    email:req.body.email,
                    latitude:req.body.latitude,
                    longitude:req.body.longitude,
                    type:req.body.type,
                    description:req.body.description,
                    status:false
                }, function(error) {
                    if (error) {
                      res.send({message:"Failed"});// The write failed...
                    } else {
                        res.send({message:"Success"});
                      // Data saved successfully!
                    }
                  });
        }

        public getAllRequest(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;

            return firebase.database().ref('/request')
                .once('value')
                .then(function (snapshot) {
                    const lol = snapshot.val();
                    return lol;
                }).catch(() => {
                    // console.log("error");
                });
        }

        public getRequest(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;

            return firebase.database().ref('/request/'+req.params.id)
                .once('value')
                .then(function (snapshot) {
                    const lol = snapshot.val();
                    return lol;
                }).catch(() => {
                    // console.log("error");
                });
        }
    }
}