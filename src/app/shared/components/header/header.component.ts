import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    pushRightClass: string = 'push-right';
    username: string;
    user_id: string;

    constructor(private translate: TranslateService, public router: Router, private authService: AuthService) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        // this.authService.getCurrentSession().subscribe(session => {
        //     this.username = session.user_name;
        //     this.user_id = session.user_id;
        //     if (session.user_id === null) {
        //         localStorage.removeItem('isLoggedin');
        //         this.router.navigate(['/login']);
        //     }
        // }, error2 => {
        //     console.log('Error while getting session', error2.message);
        //     localStorage.removeItem('isLoggedin');
        //     this.router.navigate(['/login']);
        // });
    }
    //
    // private getCookie(name: string) {
    //     let ca: Array<string> = document.cookie.split(';');
    //     let caLen: number = ca.length;
    //     let cookieName = `${name}=`;
    //     let c: string;
    //
    //     for (let i: number = 0; i < caLen; i += 1) {
    //         c = ca[i].replace(/^\s+/g, '');
    //         if (c.indexOf(cookieName) === 0) {
    //             return c.substring(cookieName.length, c.length);
    //         }
    //     }
    //     return '';
    // }
    //
    // private deleteCookie(name) {
    //     this.setCookie(name, '', -1);
    // }
    //
    // private setCookie(name: string, value: string, expireDays: number, path: string = '') {
    //     let d:Date = new Date();
    //     d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    //     let expires:string = `expires=${d.toUTCString()}`;
    //     let cpath:string = path ? `; path=${path}` : '';
    //     document.cookie = `${name}=${value}; ${expires}${cpath}`;
    // }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.authService.executeLogout().subscribe(successResponse => {
            localStorage.removeItem('isLoggedin');
            this.router.navigate(['/login']);
        });
        // this.deleteCookie('SESSIONID');
        // this.deleteCookie('X-Bonita-API-Token');
        // this.deleteCookie('bonita.tenant');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
