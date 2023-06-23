import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './baselayout/header/header.component';
import { FooterComponent } from './baselayout/footer/footer.component';
import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import { ChangepwComponent } from './forms/changepw/changepw.component';
import { HomeComponent } from './pages/home/home.component';
import { NavigationComponent } from './baselayout/navigation/navigation.component';
import { TermsComponent } from './pages/terms/terms.component';
import {HttpClientModule} from '@angular/common/http';
import { AddAccomodationComponent } from './forms/add-accomodation/add-accomodation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { AccommodationUnitsComponent } from './pages/accommodation-units/accommodation-units.component';
import { AccommodationUnitDetailsComponent } from './pages/accommodation-unit-details/accommodation-unit-details.component';
import { EditProfileComponent } from './forms/edit-profile/edit-profile.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ChangepwComponent,
    HomeComponent,
    NavigationComponent,
    TermsComponent,
    AddAccomodationComponent,
    AccommodationUnitsComponent,
    AccommodationUnitDetailsComponent,
    EditProfileComponent,
    ConfirmationComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
