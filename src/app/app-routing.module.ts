import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateChirpComponent } from './components/tabs/create-chirp/create-chirp.component';
import { EditChirpComponent } from './components/tabs/edit-chirp/edit-chirp.component';
import { HomeComponent } from './components/tabs/home/home.component';
import { LoginComponent } from './components/tabs/login/login.component';
import { LogoutComponent } from './components/tabs/logout/logout.component';
import { ProfileComponent } from './components/tabs/profile/profile.component';
import { ReplyChirpComponent } from './components/tabs/reply-chirp/reply-chirp.component';
import { SearchComponent } from './components/tabs/search/search.component';
import { SignupComponent } from './components/tabs/signup/signup.component';
import { UpdateUserInfoComponent } from './components/tabs/update-user-info/update-user-info.component';
import { UpdateUserPasswordComponent } from './components/tabs/update-user-password/update-user-password.component';
import { ViewChirpComponent } from './components/tabs/view-chirp/view-chirp.component';
import { ViewUserComponent } from './components/tabs/view-user/view-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'home' , pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'new-chirp', component: CreateChirpComponent },
  { path: 'view-chirp', component: ViewChirpComponent },
  { path: 'view-user', component: ViewUserComponent },
  { path: 'edit-chirp', component: EditChirpComponent },
  { path: 'reply-chirp', component: ReplyChirpComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile-edit', component: UpdateUserInfoComponent },
  { path: 'profile-edit-password', component: UpdateUserPasswordComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
