import firebase from '../firebase/fireConnection';
import { NextFunction, Request, Response, json } from "express";
import * as requestModel from '../model/requestModel'


export namespace requestController {
    export class RequestData {
        public writeRequestData(req: Request, res: Response, next: NextFunction): Promise<any> {
            let Id = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);
            // var priority = firebase.firestore.QuerySnapshot;
            // let old: any = [];
            const request = req.body;
            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(),now.getMonth(), now.getDate());


            // const dateId =  ""+new Date().toDateString();
            const addddd = '/request/' + utc_timestamp + '/' + req.body.requestType + '/'+Id+'/';
            console.log(addddd);
          

                    return firebase.database().ref(addddd)
                        .set(request)
                        .then(
                            (snapshot) => {
                                return res.json({ message: "done" });
                            }
                        ).catch((err) => {
                            return res.json({ err: err })
                        });
            
        }

        // public updateRequestData(req: Request, res: Response, next: NextFunction): Promise<boolean> {
        //     // let Id = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);

        // }

        public getAllRequest(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;

            return firebase.database().ref('/request/'+req.params.UTCdate+'/'+req.params.requestType+'/')
                .once('value')
                .then(function (snapshot) {
                    const lol = snapshot.val();
                    console.log(lol);
                    return lol;
                }).catch(() => {
                    // console.log("error");
                });
        }

        public getRequest(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;
            let list = "";
            return firebase.database().ref('/request/needs/' + req.params.id)
                .once('value')
                .then(function (snapshot) {
                    const lol = snapshot.val();
                    console.log(lol);

                    return lol;


                    // return list;
                }).catch(() => {
                    console.log("error");
                });
        }
    }
}