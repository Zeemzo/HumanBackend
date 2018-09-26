import firebase from '../firebase/fireConnection';
import { NextFunction, Request, Response, json } from "express";
import * as requestModel from '../model/requestModel'
// import { request } from 'https';
import axios from 'axios';


export namespace requestController {
    export class RequestData {
        public writeRequestData(req: Request, res: Response, next: NextFunction): Promise<any> {
            let Id = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);
            // var priority = firebase.firestore.QuerySnapshot;
            // let old: any = [];
            const request = req.body;
            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());


            // const dateId =  ""+new Date().toDateString();
            const addddd = '/request/' + utc_timestamp + '/' + req.body.requestType + '/' + Id + '/';
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

            return firebase.database().ref('/request/' + req.params.UTCdate + '/' + req.params.requestType + '/')
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
            return firebase.database().ref('/request/' + req.params.UTCdate + '/' + req.params.requestType + '/' + req.params.id)
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
        public queryRequest(req: Request, res: Response, next: NextFunction): Promise<any> {

            return firebase.database().ref('/request/' + req.params.UTCdate)
                .child(req.params.requestType).orderByChild(req.params.attribute).equalTo(req.params.search)
                .once('value')
                .then((snapshot) => {
                    res.send(snapshot.val());
                    // console.log(snapshot.val());
                });


        }

        public queryRequestLocation(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;
            // console.log("lol");
            return firebase.database().ref('/request/' + req.params.UTCdate)
                .child(req.params.requestType)
                .orderByChild(req.params.attribute)
                .startAt(req.params.min)
                // .endAt(req.params.max)
                .once('value')
                .then((snapshot) => {
                    res.send(snapshot.val());
                    // console.log(snapshot.val());
                });


        }

        public acceptRequest(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;
            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            let list = "";
            return firebase.database().ref('/request/' + utc_timestamp + '/' + req.body.requestType + '/' + req.body.id)
                .once('value')
                .then(function (snapshot) {
                    const lol = snapshot.val();
                    console.log(lol);

                    return firebase.database().ref('/user/')
                        .orderByChild('email').equalTo(lol.email).once('value')
                        .then((snapshot) => {
                            const pushToken = snapshot.val().pushToken;
                            const request={ notification: {
                                title: "Hello this is mirag",
                                body: "Background message body",
                                click_action : "http://localhost:3000/feed"
                              },
                            
                              to :pushToken
                            
                            };
                            axios.post('https://fcm.googleapis.com/fcm/send',request).then((res)=>{
                                console.log(res);
                            }
                                
                            ).catch((err)=>{ 
                                console.log(err);});
                            // res.send();
                           
                            // console.log(snapshot.val());
                        });;


                    // return list;
                }).catch(() => {
                    console.log("error");
                });
        }
    }
}