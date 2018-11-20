import firebase from '../firebase/fireConnection';
import { NextFunction, Request, Response } from "express";
import { admin } from '../firebase/admin'
import axios from 'axios';

export namespace userController {
    export class UserData {
        public writeUserData(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;

            return firebase.database()
                .ref('users/' + req.body.userId)
                .set(req.body, function (error) {
                    if (error) {
                        res.send({ message: "Failed" });// The write failed...
                    } else {
                        res.send({ message: "Success" });
                        // Data saved successfully!
                    }
                });
        }
        public writeUserDataPush(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;

            // const pushToken=req.body.pushToken;
            const lol = firebase.database()
                .ref('users/' + req.body.userId);

            return lol.update({
                pushToken: req.body.pushToken
            }, function (error) {
                if (error) {
                    res.send({ message: "Failed" });// The write failed...
                } else {
                    res.send({ message: "Success" });
                    // Data saved successfully!
                }
            });
        }

        public updateUserData(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;

            // const pushToken=req.body.pushToken;
            const lol = firebase.database()
                .ref('users/' + req.body.userId);

            return lol.update(
                req.body
                , function (error) {
                    if (error) {
                        res.send({ message: "Failed" });// The write failed...
                    } else {
                        res.send({ message: "Success" });
                        // Data saved successfully!
                    }
                });
        }
        public updateUserChat(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;

            // const pushToken=req.body.pushToken;
            const lol = firebase.database()
                .ref('users/' + req.body.userId+"/chat");
                lol.once('value')
                .then(function (snapshot) {
                    const bull = snapshot.val();
                    if(bull!=null){
                        return lol.update(
                            req.body
                            , function (error) {
                                if (error) {
                                    res.send({ message: "Failed" });// The write failed...
                                } else {
                                    res.send({ message: "Success" });
                                    // Data saved successfully!
                                }
                            });
                    }else{
                        return lol.set(
                            req.body
                            , function (error) {
                                if (error) {
                                    res.send({ message: "Failed" });// The write failed...
                                } else {
                                    res.send({ message: "Success" });
                                    // Data saved successfully!
                                }
                            });
                    }
                   
                }).catch(() => {
                    //console.log("error");
                });

            
        }

        public getUserData(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;

            return firebase.database().ref('/users/' + req.params.userId)
                .once('value')
                .then(function (snapshot) {
                    const lol = snapshot.val();
                    return lol;
                }).catch(() => {
                    //console.log("error");
                });
        }

        public getUserImage(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;

            return firebase.database().ref('/users/' + req.params.userId)
                .once('value')
                .then(function (snapshot) {
                    const lol = snapshot.val();
                    return lol.image;
                }).catch(() => {
                    //console.log("error");
                });
        }

        public getUserContributions(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;

            //console.log(req.params.completed)
            const completed = req.params.completed == "fulfilled" ? true : false;
            return firebase.database().ref('/users/' + req.params.userId + '/request/')
                .orderByChild('fulfilled').equalTo(completed)
                .once('value')
                .then(function (snapshot) {
                    const lol = snapshot.val();
                    return lol;
                }).catch(() => {
                    //console.log("error");
                });
        }

        public getUserChat(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;

            //console.log(req.params.completed)
            return firebase.database().ref('/users/' + req.params.userId + '/chat/')
                .once('value')
                .then(function (snapshot) {
                    const lol = snapshot.val();
                    return lol;
                }).catch(() => {
                    //console.log("error");
                });
        }

        public done(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;

            switch (req.body.message) {
                case 'confirm':


                    const request = {
                        notification: {
                            title: "Accepted",
                            body: req.body,
                            // click_action: "http://localhost:3000/confirm"
                        },
                        priority: "high",

                        to: req.body.pushToken

                    };


                    axios.post('https://fcm.googleapis.com/fcm/send', request, {
                        headers: { 'Authorization': "key=AIzaSyCflWmYSu16ICHrJrZTXoQkVpl9Yc3174k" }
                    })
                        ; break;
                case 'decline':
                    const request2 = {
                        notification: {
                            title: "Declined",
                            body: req.body,
                            // click_action: "http://localhost:3000/confirm"
                        },
                        priority: "high",

                        to: req.body.pushToken

                    };


                    axios.post('https://fcm.googleapis.com/fcm/send', request2, {
                        headers: { 'Authorization': "key=AIzaSyCflWmYSu16ICHrJrZTXoQkVpl9Yc3174k" }
                    })
                        ; break;
                default:
            }

        }
    }
}