import firebase from '../firebase/fireConnection';
import { NextFunction, Request, Response } from "express";
import {admin} from '../firebase/admin'

export namespace userController {
    export class UserData {
        public writeUserData(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;

            return firebase.database()
                .ref('users/' + req.body.userId)
                .set(req.body, function(error) {
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
            const lol= firebase.database()
                .ref('users/'+req.body.userId);

               return lol.update({
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

        public updateUserData(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;

            // const pushToken=req.body.pushToken;
            const lol= firebase.database()
                .ref('users/'+req.body.userId);

               return lol.update(
                   req.body
                , function(error) {
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