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
  { path: 'addPrice', component: AddPriceComponent, canActivate: [AuthGuard]},
  { path: 'minibars', component: MinibarsComponent, canActivate: [AuthGuard]},
  { path: 'approve', component: UserAproveComponent, canActivate: [RoleGuard], data: {allowedRole: 1}},
  { path: 'addItems', component: AddMinibarItemsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
