import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ComicPageComponent } from './components/comic-page/comic-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { HomeComponent } from './pages/home/home.component';
import { ComicTileComponent } from './components/comic-tile/comic-tile.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ModalComponent } from './components/modal/modal.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserService } from './services/userservice.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './state/users/user.reducers';
import { UserStoreEffects } from './state/users/user.effects';

@NgModule({
  declarations: [
    AppComponent,
    ComicPageComponent,
    ComicTileComponent,
    HomeComponent,
    ModalComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('userStore', userReducer),
    EffectsModule.forFeature([UserStoreEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
