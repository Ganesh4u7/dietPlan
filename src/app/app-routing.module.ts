import {NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AuthGuard} from './auth.guard';
import {CreatePlanComponent} from './create-plan/create-plan.component';
import {ViewPlanComponent} from './view-plan/view-plan.component';
import {DetailsComponent} from './details/details.component';
import {StartPageComponent} from './start-page/start-page.component';
import {SignupComponent} from './signup/signup.component';
import {SettingsComponent} from './settings/settings.component';
import {CovidComponent} from './covid/covid.component';
import {PublishedRecipesComponent} from './published-recipes/published-recipes.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {AddNewItemsComponent} from './add-new-items/add-new-items.component';
import {LoginComponent} from './login/login.component';


// const appRoutes: Routes = [
//   {path: 'create-plan', component: CreatePlanComponent,canActivate:[AuthGuard]},
//   {path: 'viewPlans', component: ViewPlanComponent,canActivate:[AuthGuard]},
//   {path: 'details', component: DetailsComponent,canActivate:[AuthGuard]},
//   {path: 'settings', component: SettingsComponent,canActivate:[AuthGuard]},
//   {path:'covid',component:CovidComponent,canActivate:[AuthGuard]},
//   {path: '', component: SignupComponent}
// ];
const appRoutes: Routes = [
  {path: 'create-plan', component: CreatePlanComponent},
  {path: 'yourPlans', component: ViewPlanComponent},
  {path:'recipes',component:PublishedRecipesComponent},
  {path: 'details', component: DetailsComponent},
  {path: 'settings', component: SettingsComponent},
  {path:'covid',component:CovidComponent},
  {path:'confirmation',component:ConfirmationComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path:'add-item',component:AddNewItemsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: StartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{useHash: false})],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
