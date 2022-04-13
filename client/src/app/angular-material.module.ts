import { NgModule } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    exports: [
        MatTabsModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        MatInputModule,
        MatChipsModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule,
        MatDividerModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule
    ]
})
export class AngularMaterialModule { }