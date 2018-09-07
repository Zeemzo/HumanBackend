import firebase from '../firebase/fireConnection';
import { NextFunction, Request, Response } from "express";



export namespace requestController {
    export class RequestData {
        public writeRequestData(req: Request, res: Response, next: NextFunction): Promise<any> {
            // let Id = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);
            // var priority = firebase.firestore.QuerySnapshot;
            let old = [];
            const request = {
                email: req.body.email,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                type: req.body.type,
                description: req.body.description,
                status: false
            };
            return firebase.database().ref('/request/needs/')
                .once('value')
                .then(function (snapshot) {
                    const lol = snapshot.val();
                    console.log(lol);
                    old = lol;

                    old.push(request);
                    return firebase.database().ref('/request/needs/').update(old).then((snapshot)=>{
                        return "done";
                    });
                }).catch(() => {
                    // console.log("error");
                });



        }

        // public updateRequestData(req: Request, res: Response, next: NextFunction): Promise<boolean> {
        //     // let Id = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);

        // }

        public getAllRequest(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;

            return firebase.database().ref('/request')
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
                    // console.log("error");
                });
        }
    }
}