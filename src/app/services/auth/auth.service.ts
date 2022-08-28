
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "@angular/fire/auth";

import { Injectable } from "@angular/core";
import { LoginCredentials, SignupCredentials } from "./auth.types";
import {
  setDoc,
  doc,
  Firestore,
  docData,
} from "@angular/fire/firestore";
import { firstValueFrom } from "rxjs";
import { User } from "@userstate/user.reducer";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private auth: Auth, private _firestore: Firestore) { }

  public async loginUser({ email, password }: LoginCredentials): Promise<any> {
    const { user } = await signInWithEmailAndPassword(this.auth, email, password);
    const userProfileDoc = doc(this._firestore, `users/${user.uid}`);
    return await firstValueFrom(docData(userProfileDoc));
  }

  public async getUserProfile(uid: string): Promise<any | null> {
    if (uid) {
      const userProfileDoc = doc(this._firestore, `users/${uid}`);
      return await firstValueFrom(docData(userProfileDoc));
    }
    return null;
  }

  public async registerUser({ email, password, userName, firstName, lastName }: SignupCredentials): Promise<User> {
    const userAuthRecordRes = await createUserWithEmailAndPassword(this.auth, email, password);
    const userAuthRecord = {
      ...userAuthRecordRes,
    };
    const user = userAuthRecord.user;
    await setDoc(doc(this._firestore, `users/${user.uid}`), {
      firstName,
      lastName,
      userName,
      email,
    });
    const userProfileDoc = doc(this._firestore, `users/${user.uid}`);
    return await firstValueFrom(docData(userProfileDoc)) as User;
  }

  public logoutUser() {
    return signOut(this.auth);
  }
}