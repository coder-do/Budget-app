import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { UserService } from '../../shared/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    user: string | undefined;
    isAdmin: boolean = false;

    constructor(private userService: UserService,
        private authService: AuthService,
        private router: Router) { }

    ngOnInit(): void {
        this.user = localStorage.getItem('userName') as string;
        this.isAdmin = localStorage.getItem('role') === 'admin';
    }

    onClickProfile() {
        this.router.navigate(['/profile']);
    }

    onLogout() {
        this.authService.logout();
    }
}
