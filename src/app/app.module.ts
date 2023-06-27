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
import { EditAccommodationComponent } from './forms/edit-accommodation/edit-accommodation.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { AddPriceComponent } from './forms/add-price/add-price.component';
import { UserAproveComponent } from './pages/user-aprove/user-aprove.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MinibarsComponent } from './pages/minibars/minibars.component';
import { AddMinibarItemsComponent } from './forms/add-minibar-items/add-minibar-items.component';
import { AddToMinibarComponent } from './forms/add-to-minibar/add-to-minibar.component';
import { MinibarDetailsComponent } from './pages/minibar-details/minibar-details.component';
import { AddMinibarComponent } from './forms/add-minibar/add-minibar.component';
import { AddServiceComponent } from './forms/add-service/add-service.component';
import { ServicesComponent } from './pages/services/services.component';
import { DateComponent } from './dialog/date/date.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


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
    EditAccommodationComponent,
    UsersComponent,
    UserDetailsComponent,
    AddPriceComponent,
    UserAproveComponent,
    MinibarsComponent,
    AddMinibarItemsComponent,
    AddToMinibarComponent,
    MinibarDetailsComponent,
    AddMinibarComponent,
    AddServiceComponent,
    ServicesComponent,
    DateComponent,
   
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
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
