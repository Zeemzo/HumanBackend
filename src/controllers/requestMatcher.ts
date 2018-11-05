
import firebase from '../firebase/fireConnection';
import { NextFunction, Request, Response, json } from "express";
import * as requestModel from '../model/requestModel'
// import { request } from 'https';
import axios from 'axios';
export namespace requestHandler {
    export class matchData {

        public matchRequestV2() {
            const now = new Date;
            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            let Id = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);
            let match: any = { matchId: Id, active: false, fulfilled: false }

            const needR = firebase.database().ref('/request/' + utc_timestamp)
                .child('need').orderByChild('matched').equalTo(false).limitToFirst(1)

            const provisionR = firebase.database().ref('/request/' + utc_timestamp)
                .child('provision').orderByChild('matched').equalTo(false).limitToFirst(1)

            if (needR != null && provisionR != null) {

                needR.once('value')
                    .then((snapshot) => {
                        const lol = (snapshot.val());
                        var arr = [];
                        for (var key in lol) {
                            lol[key].id = key;
                            arr.push(lol[key]);
                        }
                        // res.send(arr[0])
                        // //console.log(arr)
                        match.needy = arr[0].userId;
                        match.needyEmail = arr[0].email
                        match.needyLoc = { lat: arr[0].latitude, lng: arr[0].longitude }
                        match.needId = arr[0].id
                        match.need = arr[0];

                        firebase.database()
                            .ref('/request/' + utc_timestamp + '/need/' + arr[0].id).update({ matched: true })
                        firebase.database()
                            .ref('/users/' + arr[0].userId + '/request/' + arr[0].id).update({ matched: true })

                        provisionR.once('value')
                            .then((snapshot) => {
                                console.log(snapshot.val());
                                const lol1 = (snapshot.val());
                                var arr1 = [];
                                for (var key in lol1) {
                                    lol1[key].id = key;
                                    arr1.push(lol1[key]);
                                }
                                match.giver = arr1[0].userId;
                                match.giverEmail = arr1[0].email;
                                match.giverLoc = { lat: arr1[0].latitude, lng: arr1[0].longitude }
                                match.giverId = arr1[0].id
                                match.provision = arr1[0]

                                firebase.database()
                                    .ref('/request/' + utc_timestamp + '/provision/' + arr1[0].id).update({ matched: true })
                                firebase.database()
                                    .ref('/users/' + arr1[0].userId + '/request/' + arr1[0].id).update({ matched: true })

                                //console.log(match)
                                // res.send(match)

                                return firebase.database().ref('/matches/' + utc_timestamp + '/' + Id + '/').set(match).then(() => {
                                    console.log("THE CRON HAS MATCHED REQUESTS!!!");
                                });


                            }

                            )
                    })
            } else {
                console.log("NO REQUESTS WERE MATCHED!!!");
            }

        }
        public matchRequestV3(): void {
            const now = new Date;
            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            let Id = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);
            let match: any = { matchId: Id, active: false, fulfilled: false, datestamp: utc_timestamp }
            let needArr: any = [];
            let provisionArr: any = [];
            var i = 0;
            var j = 0;

            const needR = firebase.database().ref('/request/' + utc_timestamp)
                .child('need').orderByChild('matched').equalTo(false)

            const provisionR = firebase.database().ref('/request/' + utc_timestamp)
                .child('provision').orderByChild('matched').equalTo(false)

            if (needR != null && provisionR != null) {

                needR.once('value')
                    .then((snapshot) => {
                        const lol = (snapshot.val());
                        var arr = [];
                        for (var key in lol) {
                            lol[key].id = key;
                            arr.push(lol[key]);
                        }
                        needArr = arr;

                        provisionR.once('value')
                            .then((snapshot) => {
                                // console.log(snapshot.val());
                                const lol1 = (snapshot.val());
                                var arr1 = [];
                                for (var key in lol1) {
                                    lol1[key].id = key;
                                    arr1.push(lol1[key]);
                                }
                                provisionArr = arr1;

                                // console.log(provisionArr.length)
                                // console.log(needArr.length)
                                // console.log(provisionArr)
                                // console.log(needArr)

                                if (provisionArr.length > 0 && needArr.length > 0) {
                                    for (i = 0; i < provisionArr.length; i++) {
                                        for (j = 0; j < needArr.length; j++) {
                                            if (provisionArr[i].quantity == needArr[j].quantity &&
                                                provisionArr[i].resourceType == needArr[j].resourceType) {
                                                match.needy = needArr[j].userId;
                                                match.needyEmail = needArr[j].email;
                                                match.needyLoc = { lat: needArr[j].latitude, lng: needArr[j].longitude };
                                                match.needId = needArr[j].id;
                                                match.need = needArr[j];
                                                match.giver = provisionArr[i].userId;
                                                match.giverEmail = provisionArr[i].email;
                                                match.giverLoc = { lat: provisionArr[i].latitude, lng: provisionArr[i].longitude };
                                                match.giverId = provisionArr[i].id;
                                                match.provision = provisionArr[i];
                                                // console.log(match)
                                                // console.log("before update")
                                                firebase.database()
                                                    .ref('/request/' + utc_timestamp + '/need/' + match.need.id)
                                                    .update({ matched: true }).then(() => {
                                                        firebase.database()
                                                            .ref('/users/' + match.needy + '/request/' + match.need.id)
                                                            .update({ matched: true }).then(() => {
                                                                // console.log("need updated")
                                                                // console.log(provisionArr[i].id)

                                                                firebase.database()
                                                                    .ref('/request/' + utc_timestamp + '/provision/' + match.provision.id)
                                                                    .update({ matched: true }).then(() => {
                                                                        firebase.database()
                                                                            .ref('/users/' + match.giver + '/request/' + match.provision.id)
                                                                            .update({ matched: true }).then(() => {
                                                                                // console.log("provision updated")

                                                                                firebase.database()
                                                                                    .ref('/matches/' + utc_timestamp + '/' + Id + '/')
                                                                                    .set(match).then(() => {
                                                                                        return firebase.database().ref('/users/').once('value').then(snapshot => {
                                                                                            const lol = snapshot.val();
                                                                                            var arr = [];
                                                                                            for (var key in lol) {
                                                                                                lol[key].id = key;
                                                                                                arr.push(lol[key]);
                                                                                            }
                                                                                       
                                                                                            // var count;
                                                                                            for (var i = 0; i < arr.length; i++) {
                                                                                                if (arr[i].role == "CONTRIBUTOR") {
                                                                                                    const pushToken = arr[i].pushToken;
                                                                                                    const request = {
                                                                                                        notification: {
                                                                                                            title: "New Matched Request Available",
                                                                                                            body:"",
                                                                                                            click_action: "https://human-24b1b.firebaseapp.com/feed"
                                                                                                        },
                                                                                                        priority: "high",

                                                                                                        to: pushToken

                                                                                                    };


                                                                                                    axios.post('https://fcm.googleapis.com/fcm/send', request, {
                                                                                                        headers: { 'Authorization': "key=AIzaSyCflWmYSu16ICHrJrZTXoQkVpl9Yc3174k" }
                                                                                                    }).then(()=>{
                                                                                                        console.log("Alerted Contributors!!!");

                                                                                                    })
                                                                                                }
                                                                                            }


                                                                                        }).catch(() => { })
                                                                                            console.log("THE CRON HAS MATCHED REQUESTS!!!");

                                                                                        // return res.send(match)
                                                                                    });

                                                                            })
                                                                    })
                                                            })
                                                    })
                                                break;
                                            } else {
                                                console.log("NO REQUESTS WERE MATCHED!!!");
                                                // return res.send({message:"no matches"})

                                            }
                                        }
                                    }
                                } else {
                                    console.log("NO REQUESTS WERE MATCHED!!!");
                                    // return res.send({message:"no matches"})

                                }
                            })
                    })
            } else {
                console.log("NO REQUESTS WERE MATCHED!!!");
            }

        }
        public getMatchRequest(req: Request, res: Response, next: NextFunction): Promise<any> {

            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            // let Id = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);
            // let match: any = { matchId: Id }


            return firebase.database().ref('/matches/' + utc_timestamp).orderByChild('active').equalTo(false).once('value').then((snapshot) => {
                res.send(snapshot.val());
            }).catch()
            // let obj=null;


        }
        public getActiveMatchRequest(req: Request, res: Response, next: NextFunction): Promise<any> {

            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            // let Id = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);
            // let match: any = { matchId: Id }


            return firebase.database().ref('/matches/' + utc_timestamp).orderByChild('active').equalTo(true).once('value').then((snapshot) => {
                res.send(snapshot.val());
            })
            // let obj=null;


        }
        public updateMatchRequestStatus(req: Request, res: Response, next: NextFunction): Promise<any> {

            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            // let Id = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);
            // let match: any = { matchId: Id }


            return firebase.database().ref('/matches/' + utc_timestamp + '/' + req.body.matchId).update(req.body).then(() => {
                return firebase.database().ref('/users/' + req.body.contributor + '/matches/' + req.body.matchId).set(req.body).then(() => {

                    res.send({ message: "done" });
                })
                // res.send({ message: "done" });
            })
            // let obj=null;


        }
        public getContributions(req: Request, res: Response, next: NextFunction): Promise<any> {

            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

            return firebase.database().ref('/contributions/' + utc_timestamp)
                .child('need').orderByChild('requestType')
                .once('value')
                .then((snapshot) => {
                    //console.log(snapshot.val());
                    return snapshot.val();
                });


        }
        public getActiveRequests(req: Request, res: Response, next: NextFunction): Promise<any> {

            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

            return firebase.database().ref('/request/' + utc_timestamp)
                .child('need').orderByChild('requestType')
                .once('value')
                .then((snapshot) => {
                    //console.log(snapshot.val());
                    return snapshot.val();
                });


        }
        public findNearbyMatchedrequest(latitude: number, longitude: number, type: string): void {
            //console.log("`operation2` is called ===");

            //console.log("==========================");
        }
        public matchTheseRequest(): void {
            //console.log("`operation2` is called ===");

            //console.log("==========================");
        }

    }
}