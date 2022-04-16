import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AdminGuard } from './guards/admin.guard';
import { StatisticComponent } from './components/statistic/statistic.component';
import { FaqComponent } from './components/faq/faq.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
    { path: 'home', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'home/:accountId', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'categories/:accountId', component: CategoriesComponent, canActivate: [AuthGuard] },
    { path: 'statistic/:accountId', component: StatisticComponent, canActivate: [AuthGuard] },
    { path: 'faq/:accountId', component: FaqComponent, canActivate: [AuthGuard] },
    { path: 'admin/:accountId', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
