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
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { AddPriceComponent } from './forms/add-price/add-price.component';
import { UserAproveComponent } from './pages/user-aprove/user-aprove.component';
import { RoleGuard } from './role.guard';
import { MinibarsComponent } from './pages/minibars/minibars.component';
import { AddMinibarItemsComponent } from './forms/add-minibar-items/add-minibar-items.component';
import { AddToMinibarComponent } from './forms/add-to-minibar/add-to-minibar.component';
import { MinibarDetailsComponent } from './pages/minibar-details/minibar-details.component';
import { AddMinibarComponent } from './forms/add-minibar/add-minibar.component';
import { AddServiceComponent } from './forms/add-service/add-service.component';
import { ServicesComponent } from './pages/services/services.component';
import { AddCharacteristicComponent } from './forms/add-characteristic/add-characteristic.component';
import { CharacteristicsComponent } from './pages/characteristics/characteristics.component';
import { RequestReservationComponent } from './pages/request-reservation/request-reservation.component';
import { ReservationApproveComponent } from './pages/reservation-approve/reservation-approve.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'changepw/:id', component: ChangepwComponent },
  { path: '', component: HomeComponent },
  { path: 'acc', component:AccommodationUnitsComponent},
  { path: 'acc/:id', component:AccommodationUnitDetailsComponent},
  { path: 'addAcc', component:AddAccomodationComponent, canActivate: [AuthGuard]},
  { path: 'editAcc/:id', component:EditAccommodationComponent, canActivate: [AuthGuard]},
  { path: 'terms', component: TermsComponent },
  { path: 'editProfile/:id', component: EditProfileComponent, canActivate: [AuthGuard]},
  { path: 'list-of-users', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'user/:id', component: UserDetailsComponent, canActivate: [AuthGuard]},
  { path: 'addPrice/:id', component: AddPriceComponent, canActivate: [AuthGuard]},
  { path: 'minibar', component: MinibarsComponent, canActivate: [AuthGuard]},
  { path: 'approve', component: UserAproveComponent, canActivate: [RoleGuard], data: {allowedRole: 1}},
  { path: 'addItems', component: AddMinibarItemsComponent, canActivate: [AuthGuard]},
  { path: 'addToMinibar/:id', component: AddToMinibarComponent, canActivate: [AuthGuard]},
  { path: 'minibar/:id', component: MinibarDetailsComponent, canActivate: [AuthGuard]},
  { path: 'addMinibar', component: AddMinibarComponent, canActivate: [AuthGuard]},
  { path: 'addService', component: AddServiceComponent, canActivate: [AuthGuard]},
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard]},
  { path: 'addCharacteristic', component: AddCharacteristicComponent, canActivate: [AuthGuard]},
  { path: 'characteristics', component: CharacteristicsComponent, canActivate: [AuthGuard]},
  { path: 'services', component: ServicesComponent, canActivate: [RoleGuard], data: {allowedRole: 1}},
  { path: 'request/:accId/:checkIn/:checkOut', component: RequestReservationComponent, canActivate: [RoleGuard], data: {allowedRole: 3}},
  { path: 'approveReservation', component: ReservationApproveComponent, canActivate: [RoleGuard], data: {allowedRole: 2}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
