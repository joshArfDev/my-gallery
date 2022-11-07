import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from "@angular/core";
import { MainComponent } from './components/main/main.component';
import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard'

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/main' },
    { 
        path: 'main', 
        component: MainComponent, 
        ...canActivate(()=>redirectUnauthorizedTo(['/register']))
},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }