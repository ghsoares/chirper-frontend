import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateChirpComponent } from './components/tabs/create-chirp/create-chirp.component';
import { HomeComponent } from './components/tabs/home/home.component';
import { LoginComponent } from './components/tabs/login/login.component';
import { SearchComponent } from './components/tabs/search/search.component';
import { SignupComponent } from './components/tabs/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'home' , pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'new-chirp', component: CreateChirpComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
