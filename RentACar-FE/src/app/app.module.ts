import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';

import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CreditCardListComponent } from './components/credit-card-list/credit-card-list.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserInfosUpdateComponent } from './components/user-infos-update/user-infos-update.component';
import { UsePasswordUpdateComponent } from './components/use-password-update/use-password-update.component'
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    NavbarComponent,
    BrandFilterPipe,
    ColorFilterPipe,
    CarDetailComponent,
    CarFilterPipe,
    PaymentComponent,
    CartSummaryComponent,
    CreditCardListComponent,
    BrandAddComponent,
    BrandListComponent,
    BrandUpdateComponent,
    CarAddComponent,
    CarFilterComponent,
    CarListComponent,
    CarUpdateComponent,
    ColorAddComponent,
    ColorListComponent,
    ColorUpdateComponent,
    LoginComponent,
    RegisterComponent,
    UserInfosUpdateComponent,
    UsePasswordUpdateComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 