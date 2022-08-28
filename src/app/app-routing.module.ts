import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { SignUpPageComponent } from "./pages/sign-up-page/sign-up-page.component";
import { HasuserdataGuard } from "./guards/hasuserdata.guard";
import { CreatePoolPageComponent } from "./pages/create-pool-page/create-pool-page.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["/login"]);

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
    canActivate: [AuthGuard, HasuserdataGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: "home",
    component: HomePageComponent,
    canActivate: [AuthGuard, HasuserdataGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: "createPool",
    component: CreatePoolPageComponent,
    canActivate: [AuthGuard, HasuserdataGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "signup",
    component: SignUpPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
