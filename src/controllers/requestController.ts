import firebase from '../firebase/fireConnection';
import { NextFunction, Request, Response, json } from "express";
import * as requestModel from '../model/requestModel'
// import { request } from 'https';
import axios from 'axios';
import { messaging } from '../../node_modules/firebase';


export namespace requestController {
    export class RequestData {
        public writeRequestData(req: Request, res: Response, next: NextFunction): Promise<any> {
            let Id = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);
            // var priority = firebase.firestore.QuerySnapshot;
            // let old: any = [];
            const request = req.body;
            request.id=Id;
            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());


            // const dateId =  ""+new Date().toDateString();
            const addddd = '/request/' + utc_timestamp + '/' + req.body.requestType + '/' + Id + '/';
            // //console.log(addddd);
            request.datestamp=utc_timestamp

            return firebase.database().ref(addddd)
                .set(request)
                .then(
                    (snapshot) => {
                        firebase.database().ref('users/'+req.body.userId+'/request/'+Id+'/').set(request,()=>{
                            return res.json({ message: "done" });

                        })
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
            .orderByChild('status').equalTo(false)
                .once('value')
                .then(function (snapshot) {
                    const lol = snapshot.val();
                    // //console.log(lol);
                    return lol;
                }).catch(() => {
                    // //console.log("error");
                });
        }

        public getRequest(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;
            let list = "";
            return firebase.database().ref('/request/' + req.params.UTCdate + '/' + req.params.requestType + '/' + req.params.id)
                .once('value')
                .then(function (snapshot) {
                    const lol = snapshot.val();
                    // //console.log(lol);

                    return lol;


                    // return list;
                }).catch(() => {
                    //console.log("error");
                });
        }
        public queryRequest(req: Request, res: Response, next: NextFunction): Promise<any> {

            return firebase.database().ref('/request/' + req.params.UTCdate)
                .child(req.params.requestType).orderByChild(req.params.attribute).equalTo(req.params.search)
                .once('value')
                .then((snapshot) => {
                    const lol=snapshot.val();
                    var arr = [];
                    for (var key in lol) {
                      lol[key].id = key;
                      arr.push(lol[key]);
                    }
                    res.send(arr[0])
                    
                    //console.log(snapshot.val());
                });


        }

        public queryRequestLocation(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;
            // //console.log("lol");
            return firebase.database().ref('/request/' + req.params.UTCdate)
                .child(req.params.requestType)
                .orderByChild(req.params.attribute)
                .startAt(req.params.min)
                // .endAt(req.params.max)
                .once('value')
                .then((snapshot) => {
                    res.send(snapshot.val());
                    // //console.log(snapshot.val());
                });


        }

        
        public fulfillRequest(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;
            // //console.log("lol");
            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            // let list = "";

            const lol = firebase.auth();
            // lol.
            //console.log(req.body);
            return firebase.database().ref('/users/' + req.body.userId)
                .once('value')
                .then((snapshot) => {
                    //console.log(snapshot.val());
                    const pushToken = snapshot.val().pushToken;
                    const request = {
                        notification: {
                            title: "Confirm Contributer Identity",
                            body: req.body,
                            click_action: "http://localhost:3000/confirm"
                        },
                        priority : "high",

                        to: pushToken

                    };


                    axios.post('https://fcm.googleapis.com/fcm/send', request, {
                        headers: { 'Authorization': "key=AIzaSyCflWmYSu16ICHrJrZTXoQkVpl9Yc3174k" }
                    }).then((r) => {
                        // //console.log(res);
                        // res.send(r);
                        return firebase.database().ref('/request/' + utc_timestamp + '/' + req.body.requestType + '/' + req.body.id)
                            
                                    .update({fulfilled:true}).then((snapshot)=>{
                                        
                                        return firebase.database().ref('/users/' + req.body.userId +'/request/'+req.body.id)
                                        .update({fulfilled:true}).then((lol)=>{
                                            res.send({message:'done'})
                                        }).catch()

                                    })

                         
                    }

                    ).catch((err) => {
                        //console.log(err.message);
                    });
                    // res.send();

                    // //console.log(snapshot.val());
                });




        }

        public acceptRequest(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;
            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            // let list = "";

            const lol = firebase.auth();
            // lol.
            //console.log(req.body);
            return firebase.database().ref('/users/' + req.body.userId)
                .once('value')
                .then((snapshot) => {
                    //console.log(snapshot.val());
                    const pushToken = snapshot.val().pushToken;
                    const request = {
                        notification: {
                            title: "You have a message from a fellow Human",
                            body: "" + req.body.roomId,
                            click_action: "https://human-24b1b.firebaseapp.com/chat"
                        },
                        priority : "high",

                        to: pushToken

                    };


                    axios.post('https://fcm.googleapis.com/fcm/send', request, {
                        headers: { 'Authorization': "key=AIzaSyCflWmYSu16ICHrJrZTXoQkVpl9Yc3174k" }
                    }).then((r) => {
                        // //console.log(res);
                        // res.send(r);
                        return firebase.database().ref('/request/' + utc_timestamp + '/' + req.body.requestType + '/' + req.body.id)
                            .once('value').then((snapshot) => {
                                const br = snapshot.val()
                                //console.log(br);
                                br.status = true;
                                br.matched=true;
                                return firebase.database().ref('/request/' + utc_timestamp + '/' + req.body.requestType + '/' + req.body.id)
                                    .set(br).then((snapshot)=>{
                                        res.send(r);
                                    })

                            })
                    }

                    ).catch((err) => {
                        //console.log(err.message);
                    });
                    // res.send();

                    // //console.log(snapshot.val());
                });





        }


        
        public fulfillMatch(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;
            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            // let list = "";
           
            return firebase.database().ref('/matches/' +utc_timestamp+'/'+ req.body.matchId )
            .update({fulfilled:true,active:false}).then((lol)=>{
                res.send({message:'done'})
            }).catch()
                  





        }
      
    }
}