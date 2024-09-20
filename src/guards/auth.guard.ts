import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { authentificationservice } from './..//services/authentification.service';  // Assume you have an AuthService to manage JWT

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: authentificationservice, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
