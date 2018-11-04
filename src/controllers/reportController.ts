import firebase from '../firebase/fireConnection';
import { NextFunction, Request, Response, json } from "express";
import * as requestModel from '../model/requestModel'
// import { request } from 'https';
import axios from 'axios';
import { messaging } from 'firebase';


export namespace reportController {
    export class ReportData {

        public leaderboard(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;
            const now = new Date;
            // let list = "";

            return firebase.database().ref('/users/').once('value').then(snapshot => {
                const lol = snapshot.val();
                var arr = [];
                for (var key in lol) {
                    lol[key].id = key;
                    arr.push(lol[key]);
                }
                // res.send(arr)
                var report = [];
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].request != null) {
                        report.push({ label: arr[i].username, value: Object.keys(arr[i].request).length })

                    } else {
                        report.push({ label: arr[i].username, value: 0 })

                    }
                }
                res.send(report)

            }).catch(() => { })

        }

        public fulfillList(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;
            const now = new Date;

            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            // var result=[];
            return firebase.database().ref('/request/' + utc_timestamp)
                // .orderByChild('fulfilled').equalTo(true)
                .once('value').then(snapshot => {
                    if (snapshot != null) {
                        const lol = snapshot.val();
                        var arr = [];
                        for (var key in lol) {
                            lol[key].id = key;
                            arr.push(lol[key]);
                        }

                        // console.log(arr)
                        // console.log(Object.keys(arr[0]).length)

                        const result = [{ label: 'need', value: Object.keys(arr[0]).length },
                        { label: 'provision', value: Object.keys(arr[1]).length }]

                        // console.log(result)
                        res.send(result)

                    }




                }).catch(() => { })







        }
        public acceptedLeaderboard(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;
            const now = new Date;
            // let list = "";
            return firebase.database().ref('/users/').once('value').then(snapshot => {
                const lol = snapshot.val();
                var arr = [];
                for (var key in lol) {
                    lol[key].id = key;
                    arr.push(lol[key]);
                }
                // res.send(arr)
                var report = [];
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].accepted != null) {
                        report.push({ label: arr[i].username, value: Object.keys(arr[i].accepted).length })
                    } else {
                        report.push({ label: arr[i].username, value: 0 })
                    }
                }
                res.send(report)
            }).catch(() => { })
        }
        public provisionLeaderboard(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;
            const now = new Date;
            // let list = "";
            return firebase.database().ref('/users/').once('value').then(snapshot => {
                const lol = snapshot.val();
                var arr = [];
                for (var key in lol) {
                    lol[key].id = key;
                    arr.push(lol[key]);
                }
                // res.send(arr)
                var report = [];
                var reqIds = [];
                // var count;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].request != null) {
                        let count=0;
                        // console.log(Object.keys(arr[i].request))
                        reqIds = Object.keys(arr[i].request)
                        for(var j=0;j<reqIds.length;j++){
                            // console.log()
                            if(arr[i].request[reqIds[j]].requestType=="provision"){
                                count ++;
                            }
                        }
                        report.push({ label: arr[i].username, value: count })
                        // report.push({ label: arr[i].username, value: Object.keys(arr[i].request).length })
                    } else {
                        report.push({ label: arr[i].username, value: 0 })
                    }
                }
                res.send(report)
            }).catch(() => { })
        }
    }
}