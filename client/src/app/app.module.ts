import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TransactionDetailsComponent } from './components/main/transactions/transaction-details/transaction-details.component';
import { TransactionEditComponent } from './components/main/transactions/transaction-edit/transaction-edit.component';
import { CardDetailsComponent } from './components/main/cards/card-details/card-details.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AccountAddComponent } from './components/main/accounts/account-add/account-add.component';
import { AccountEditComponent } from './components/main/accounts/account-edit/account-edit.component';
import { TransactionAddComponent } from './components/main/transactions/transaction-add/transaction-add.component';
import { NotificationComponent } from './components/main/notification/notification.component';
import { AccountModalComponent } from './components/main/modals/account-modal/account-modal.component';
import { TransactionModalComponent } from './components/main/modals/transaction-modal/transaction-modal.component';
import { AccountDeleteComponent } from './components/main/modals/account-delete/account-delete.component';
import { CategoryItemComponent } from './components/categories/category-item/category-item.component';
import { CategoryAddComponent } from './components/categories/category-add/category-add.component';
import { CategoryDeleteComponent } from './components/main/modals/category-delete/category-delete.component';
import { CategoryStatisticComponent } from './components/statistic/category-statistic/category-statistic.component';
import { MonthlyStatisticComponent } from './components/statistic/monthly-statistic/monthly-statistic.component';

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
        TransactionDetailsComponent,
        TransactionEditComponent,
        CardDetailsComponent,
        AccountAddComponent,
        AccountEditComponent,
        TransactionAddComponent,
        NotificationComponent,
        AccountModalComponent,
        TransactionModalComponent,
        AccountDeleteComponent,
        CategoryItemComponent,
        CategoryAddComponent,
        CategoryDeleteComponent,
        CategoryStatisticComponent,
        MonthlyStatisticComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        Ng2SearchPipeModule,
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
