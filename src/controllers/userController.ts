import firebase from '../firebase/fireConnection';
import { NextFunction, Request, Response } from "express";
import {admin} from '../firebase/admin'

export namespace userController {
    export class UserData {
        public writeUserData(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;

            return firebase.database()
                .ref('users/' + req.body.userId)
                .set({
                    username: req.body.name,
                    email: req.body.email,
                    profile_picture: req.body.imageUrl
                    // pushToken:req.body.pushToken
                }, function(error) {
                    if (error) {
                      res.send({message:"Failed"});// The write failed...
                    } else {
                        res.send({message:"Success"});
                      // Data saved successfully!
                    }
                  });
        }
        public writeUserDataPush(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;

           
        
            // const pushToken=req.body.pushToken;
            return firebase.database()
                .ref('users/' + req.body.email)
                .set({
                    // username: req.body.name,
                    email: req.body.email,
                    // profile_picture: req.body.imageUrl,
                    pushToken:req.body.pushToken
                }, function(error) {
                    if (error) {
                      res.send({message:"Failed"});// The write failed...
                    } else {
                        res.send({message:"Success"});
                      // Data saved successfully!
                    }
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
                    console.log("error");
                });
        }
    }
}