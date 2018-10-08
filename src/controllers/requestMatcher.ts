
import firebase from '../firebase/fireConnection';
import { NextFunction, Request, Response, json } from "express";
import * as requestModel from '../model/requestModel'
// import { request } from 'https';
import axios from 'axios';
export namespace requestHandler {
    export class matchData {

        public matchRequest(): Promise<any> {

            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            let Id = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);
            let match: any = { matchId: Id ,active:false}
            // let obj=null;

            return firebase.database().ref('/request/' + utc_timestamp)
                .child('need').orderByChild('matched').equalTo(false).limitToFirst(1)
                .once('value')
                .then((snapshot) => {
                    const lol = (snapshot.val());
                    var arr = [];
                    for (var key in lol) {
                        lol[key].id = key;
                        arr.push(lol[key]);
                    }
                    // res.send(arr[0])
                    //console.log(arr)
                    match.needy = arr[0].userId;
                    match.needyEmail = arr[0].email
                    match.needyLoc = { lat: arr[0].latitude, lng: arr[0].longitude }
                    match.needId = arr[0].id
                    ///add request id in the body of the request..!!!!!

                    return firebase.database().ref('/request/' + utc_timestamp)
                        .child('provision').orderByChild('matched').equalTo(false).limitToFirst(1)
                        .once('value')
                        .then((snapshot) => {
                            // //console.log(snapshot.val());
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

                            //console.log(match)
                            // res.send(match)
                            return firebase.database().ref('/matches/' + utc_timestamp + '/' + Id + '/').set(match)
                        }).catch(err => {
                            //console.log(err)
                        });
                }).catch(err => {
                    //console.log(err)
                });
        }

        public matchRequestV2() {

            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            let Id = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);
            let match: any = { matchId: Id ,active:false,fulfilled:false}
            // let obj=null;

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
                        match.need=arr[0];

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
                                match.provision=arr1[0]

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

        public getMatchRequest(req: Request, res: Response, next: NextFunction): Promise<any> {

            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            // let Id = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);
            // let match: any = { matchId: Id }


            return firebase.database().ref('/matches/' + utc_timestamp).orderByChild('fulfilled').equalTo(false).once('value').then((snapshot) => {
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


            return firebase.database().ref('/matches/' + utc_timestamp+'/'+req.body.matchId).update(req.body).then(() => {
                res.send({message:"done"});
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