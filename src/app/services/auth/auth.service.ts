
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "@angular/fire/auth";

import { Injectable } from "@angular/core";
import { LoginCredentials } from "./auth.types";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private auth: Auth) { }

  public loginUser({ email, password }: LoginCredentials): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public registerUser({ email, password }: LoginCredentials) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  public logoutUser() {
    return signOut(this.auth);
  }
}