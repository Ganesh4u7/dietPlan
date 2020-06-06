import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FusionChartsModule } from 'angular-fusioncharts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { ViewPlanComponent } from './view-plan/view-plan.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DetailsComponent } from './details/details.component';
import { SignupComponent } from './signup/signup.component';
import {AuthGuard} from './auth.guard';

// search module
import {Ng2SearchPipeModule} from 'ng2-search-filter';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';

// Load Widgets
import * as Widgets from 'fusioncharts/fusioncharts.widgets';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ScrollingModule as ExperimentalScrollingModule} from '@angular/cdk-experimental/scrolling';

// Load FusionTheme Theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { SettingsComponent } from './settings/settings.component'
import {HttpClientModule} from '@angular/common/http';
import { WorkoutPlanComponent } from './workout-plan/workout-plan.component';
import { ViewWorkoutPlansComponent } from './view-workout-plans/view-workout-plans.component';
import { CovidComponent } from './covid/covid.component';
import {LoginService} from './login.service';
import {DietPlanService} from './diet-plan.service';
import {HttpService} from './http.service';
import { PublishedRecipesComponent } from './published-recipes/published-recipes.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AddNewItemsComponent } from './add-new-items/add-new-items.component';
import { StartPageComponent } from './start-page/start-page.component';
import { LoginComponent } from './login/login.component';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Widgets, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    CreatePlanComponent,
    ViewPlanComponent,
    NavBarComponent,
    DetailsComponent,
    SignupComponent,
    SettingsComponent,
    WorkoutPlanComponent,
    ViewWorkoutPlansComponent,
    CovidComponent,
    PublishedRecipesComponent,
    ConfirmationComponent,
    ForgotPasswordComponent,
    ContactUsComponent,
    AddNewItemsComponent,
    StartPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
    ExperimentalScrollingModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    FusionChartsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [AuthGuard,LoginService,DietPlanService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
