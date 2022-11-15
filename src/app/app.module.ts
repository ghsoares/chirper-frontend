import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/tabs/home/home.component';
import { ChirpComponent } from './components/chirp/chirp.component';
import { UserComponent } from './components/user/user.component';
import { SearchComponent } from './components/tabs/search/search.component';
import { TopComponent } from './components/tabs/search/top/top.component';
import { ChirpsComponent } from './components/tabs/search/chirps/chirps.component';
import { UsersComponent } from './components/tabs/search/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateChirpComponent } from './components/tabs/create-chirp/create-chirp.component';
import { SignupComponent } from './components/tabs/signup/signup.component';
import { LoginComponent } from './components/tabs/login/login.component';
import { ViewChirpComponent } from './components/tabs/view-chirp/view-chirp.component';
import { ReplyChirpComponent } from './components/tabs/reply-chirp/reply-chirp.component';
import { ViewUserComponent } from './components/tabs/view-user/view-user.component';
import { UpdateUserInfoComponent } from './components/tabs/update-user-info/update-user-info.component';
import { UpdateUserPasswordComponent } from './components/tabs/update-user-password/update-user-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChirpComponent,
    UserComponent,
    SearchComponent,
    TopComponent,
    ChirpsComponent,
    UsersComponent,
    CreateChirpComponent,
    SignupComponent,
    LoginComponent,
    ViewChirpComponent,
    ReplyChirpComponent,
    ViewUserComponent,
    UpdateUserInfoComponent,
    UpdateUserPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
