import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { AdminComponent } from './components/admin/admin.component';
import { FaqComponent } from './components/faq/faq.component';
import { CardsComponent } from './components/main/cards/cards.component';
import { CardComponent } from './components/main/cards/card/card.component';
import { TransactionsComponent } from './components/main/transactions/transactions.component';
import { ButtonsGroupComponent } from './components/main/buttons-group/buttons-group.component';
import { TransactionsSortComponent } from './components/main/transactions/transactions-sort/transactions-sort.component';
import { TransactionItemComponent } from './components/main/transactions/transaction-item/transaction-item.component';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        NotFoundComponent,
        ProfileComponent,
        CategoriesComponent,
        StatisticComponent,
        AdminComponent,
        FaqComponent,
        CardsComponent,
        CardComponent,
        TransactionsComponent,
        ButtonsGroupComponent,
        TransactionsSortComponent,
        TransactionItemComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        BrowserAnimationsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
