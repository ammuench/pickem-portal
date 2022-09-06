import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

//PrimeNG
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { SplitButtonModule } from "primeng/splitbutton";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { AvatarModule } from "primeng/avatar";
import { MenuModule } from "primeng/menu";
import { InputTextareaModule } from "primeng/inputtextarea";
import { CalendarModule } from "primeng/calendar";
import { ToggleButtonModule } from "primeng/togglebutton";
import { SelectButtonModule } from "primeng/selectbutton";
import { ProgressSpinnerModule } from "primeng/progressspinner";

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
import { AngularFireModule, FIREBASE_OPTIONS } from "@angular/fire/compat";

//ENVIRONMENT
import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { SignUpPageComponent } from "./pages/sign-up-page/sign-up-page.component";
import { CreatePoolPageComponent } from "./pages/create-pool-page/create-pool-page.component";
import { ProgressSpinnerComponent } from "./components/progress-spinner/progress-spinner.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    HomePageComponent,
    SignUpPageComponent,
    CreatePoolPageComponent,
    ProgressSpinnerComponent,
  ],
  imports: [
    //ANGULAR
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    AngularFireModule.initializeApp(environment.firebase),
    //PRIMENG
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    CardModule,
    InputTextModule,
    AvatarModule,
    MenuModule,
    InputTextareaModule,
    CalendarModule,
    ToggleButtonModule,
    SelectButtonModule,
    ProgressSpinnerModule,
  ],
  providers: [
    {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebase,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
