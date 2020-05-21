import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './components/register/register.component';
import { AuthentictionComponent } from './components/authentiction/authentiction.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResultSearchComponent } from './components/result-search/result-search.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RouteGuardService } from "./service/route-guard.service";
import { HttpIntercepterBasicAuthService} from "./service/http/http-intercepter-basic-auth.service";
import { FilterComponent } from './components/filter/filter.component';
import { AnnonceComponent } from './components/annonce/annonce.component';
import { AnnonceDisplayComponent } from './components/annonce-display/annonce-display.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyAnnoncesComponent } from './components/my-annonces/my-annonces.component';
import { UpdAnnonceComponent } from './components/upd-annonce/upd-annonce.component';
import { ReceptionImageComponent } from './components/reception-image/reception-image.component';
import {ModalModule} from "ngx-bootstrap/modal";
import { UserInfoComponent } from './components/user-info/user-info.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import {Role} from "./components/common/role";
import { UsersControlComponent } from './components/components/admin/users-control/users-control.component';


const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'auth', component: AuthentictionComponent},
  {path: 'admin/users', component: UsersControlComponent, canActivate: [RouteGuardService], data: { role: 'ADMIN' } },
  {path: 'admin', component: AdminPageComponent, canActivate: [RouteGuardService], data: { role: 'ADMIN' } },
  {path: 'reg', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[RouteGuardService]},
  {path: 'profile/u-annonces', component: MyAnnoncesComponent, canActivate:[RouteGuardService]},
  {path: 'profile/u-annonces/upd', component: UpdAnnonceComponent, canActivate:[RouteGuardService]},
  {path: 'search-result/:data', component: ResultSearchComponent},
  {path: 'search-result/annonce/:adId', component: AnnonceDisplayComponent},
  {path: 'profile/u-params', component: UserInfoComponent, canActivate: [RouteGuardService]},
  {path: 'add-annonce', component: AnnonceComponent, canActivate:[RouteGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    AuthentictionComponent,
    NotFoundComponent,
    ProfileComponent,
    ResultSearchComponent,
    HomeComponent,
    LogoutComponent,
    FilterComponent,
    AnnonceComponent,
    AnnonceDisplayComponent,
    MyAnnoncesComponent,
    UpdAnnonceComponent,
    ReceptionImageComponent,
    UserInfoComponent,
    AdminPageComponent,
    UsersControlComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserModule, ModalModule.forRoot(),
    RouterModule.forRoot(appRoutes, {
      anchorScrolling: 'enabled'
    }),
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
