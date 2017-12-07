import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {User} from '../shared/model/user';
import {AuthService} from '../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    model: User;
    showAuthError: boolean;
    timestamp: any;

    constructor(private authService: AuthService,
                public router: Router) {
    }

    ngOnInit(): void {
        this.timestamp= '1382086394000';
        this.model = new User();
        console.log('LoginComponent called');
    }

    onLoggedin() {
        console.log('logging in ...');
        this.authService.executeLogin(this.model)
            .subscribe(
                successResponse => {
                    this.authService.getCurrentSession()
                        .subscribe(
                            session => {
                                if (this.model.username === session.user_name) {
                                    console.log('isLoggedIn: ', session.user_name);
                                    localStorage.setItem('isLoggedin', 'true');
                                    this.router.navigate(['/user']);
                                } else {
                                    console.log('Username/password incorrect!');
                                    this.showAuthError = true;
                                }
                            },
                            errorResponse => {
                                // localStorage.setItem('isLoggedin', 'true'); // remove later
                                // this.router.navigate(['/user']); // // remove later
                                console.log('Username/password incorrect!');
                                this.showAuthError = true;
                            }
                        )
                },
                errorResponse => {
                    // localStorage.setItem('isLoggedin', 'true'); // remove later
                    // this.router.navigate(['/user']); // // remove later
                    console.log('Username/password incorrect!');
                    this.showAuthError = true;
                }
            )
    }

    // onLoggedin1() {
    //     this.authService
    //         .login(this.model)
    //         .subscribe(isLoggedIn => {
    //             console.log('isLoggedIn: ', isLoggedIn);
    //             if (isLoggedIn) {
    //                 localStorage.setItem('isLoggedin', 'true');
    //                 this.router.navigate(['/user']);
    //             } else {
    //                 console.log('Username/password incorrect!');
    //                 this.showAuthError = true;
    //             }
    //         });
    //
    // }

}
