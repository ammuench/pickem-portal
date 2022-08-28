import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//PrimeNG
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { SplitButtonModule } from "primeng/splitbutton";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { AvatarModule } from "primeng/avatar";
import { MenuModule } from "primeng/menu";

//NGRX
import { StoreModule } from "@ngrx/store";
import {
  reducers,
  metaReducers,
  effects,
} from "./reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";

//FIREBASE
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";

//ENVIRONMENT
import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignUpPageComponent } from "./pages/sign-up-page/sign-up-page.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    HomePageComponent,
    SignUpPageComponent,
  ],
  imports: [
    //ANGULAR
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //NGRX
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot(effects),
    //FIREBASE
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    //PRIMENG
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    CardModule,
    InputTextModule,
    AvatarModule,
    MenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
