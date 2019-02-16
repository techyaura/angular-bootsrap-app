import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { CustomtoastrService } from '../services/customtoastr.service';
import { LocalstorageService } from './services/localstorage.service';
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './login/recover/recover.component';
import { VerifyforgotComponent } from './login/verifyforgot/verifyforgot.component';
import { ResetComponent } from './login/reset/reset.component';
import { RegisterComponent } from './register/register.component';
import { VerificationComponent } from './register/verification/verification.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
// import { DataService } from '../services/data.service';
import { DataexchangeService } from './services/dataexchange.service';
import { CanActivateAuthenticateGuard } from '../guards/can-activate-authenticate.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register'
        }
      },
      {
        path: 'verify-email/:hashToken',
        component: VerificationComponent,
        data: {
          title: 'Verify Email'
        }
      },
      {
        path: 'verify-forgot/:hashToken',
        component: VerifyforgotComponent,
        data: {
          title: 'Confirm Account'
        }
      },
      {
        path: 'profile',
        canActivate: [CanActivateAuthenticateGuard], 
        component: ViewProfileComponent,
        data: {
          title: 'My Profile'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    RecoverComponent,
    VerifyforgotComponent,
    ResetComponent,
    RegisterComponent,
    VerificationComponent,
    ViewProfileComponent
  ],
  providers: [
    LocalstorageService,
    AuthService,
    CustomtoastrService,
    // DataService
    DataexchangeService
  ]
})
export class AuthModule {}
