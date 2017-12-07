import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate() {
        if (localStorage.getItem('isLoggedin')) {
            return true;
        }
        //     this.authService.getCurrentSession().subscribe(session => {
        //         if (session.user_id === null || session.user_name === null) {
        //             localStorage.removeItem('isLoggedin');
        //             this.router.navigate(['/login']);
        //             return false;
        //         }
        //         if (session.user_name.toLowerCase().includes('admin') || session.user_name.toLowerCase().includes('install')) {
        //             return true;
        //         } else {
        //             this.router.navigate(['/user']);
        //             return false;
        //         }
        //     }, error2 => {
        //         console.log('Error while getting session', error2.message);
        //         localStorage.removeItem('isLoggedin');
        //         this.router.navigate(['/login']);
        //         return false;
        //     });
        // } else {
            this.router.navigate(['/login']);
            return false;
        // }
    }
}
