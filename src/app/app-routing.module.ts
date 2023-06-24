import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import { ChangepwComponent } from './forms/changepw/changepw.component';
import { HomeComponent } from './pages/home/home.component';
import { TermsComponent } from './pages/terms/terms.component';
import { AccommodationUnitsComponent } from './pages/accommodation-units/accommodation-units.component';
import { AccommodationUnitDetailsComponent } from './pages/accommodation-unit-details/accommodation-unit-details.component';
import { AddAccomodationComponent } from './forms/add-accomodation/add-accomodation.component';
import { AuthGuard } from './auth.guard';
import { EditAccommodationComponent } from './forms/edit-accommodation/edit-accommodation.component';
import { EditProfileComponent } from './forms/edit-profile/edit-profile.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'changepw', component: ChangepwComponent },
  { path: '', component: HomeComponent },
  { path: 'acc', component:AccommodationUnitsComponent},
  { path: 'acc/:id', component:AccommodationUnitDetailsComponent},
  { path: 'addAcc', component:AddAccomodationComponent, canActivate: [AuthGuard]},
  { path: 'editAcc/:id', component:EditAccommodationComponent, canActivate: [AuthGuard]},
  { path: 'terms', component: TermsComponent },
  { path : 'editProfile/:id', component: EditProfileComponent, canActivate: [AuthGuard]}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
