import { AuthService } from './auth.service';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('Auth service with TestBed', () => {
    let router: Router;
    let service: AuthService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule]
        });

        router = TestBed.inject(Router);
        service = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController);
    });

    it('Test service was creted', () => {
        expect(service).toBeTruthy();
    });

    it('After login will call setSession', (done: DoneFn) => {
        spyOn(service as any, 'setSession');
        service.login('mont@gmail.com', 'Montgomery_123').subscribe(() => {
            expect((service as any).setSession).toHaveBeenCalled();
            done();
        });

        const req = httpController.expectOne({
            method: 'POST',
            url: `${environment.API_URL}/auth/login`,
        });
        req.flush({});
    });

    it('setSession have not to call on error', (done: DoneFn) => {
        spyOn(service as any, 'setSession');
        service.login('email', 'psw').subscribe({
            error: () => {
                expect((service as any).setSession).not.toHaveBeenCalled();
                done();
            },
        });

        const req = httpController.expectOne({
            method: 'POST',
            url: `${environment.API_URL}/auth/login`,
        });
        req.error(new ProgressEvent('401'));
    });

    it('after logout will navigate to /login', () => {
        spyOn(router, 'navigate');
        service.logout()
        expect(router.navigate).toHaveBeenCalledOnceWith(['/login']);
    });
});