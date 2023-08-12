import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
  email: any;
  image: any;
  isAuthenticated = false;
  private userSub?: Subscription;

  constructor(private authServise: AuthService, private router: Router){}

  ngOnInit(){
   this.userSub = this.authServise.currentUser$.subscribe(user=>{
    this.isAuthenticated = !user ? false : true;
    
    this.email = user?.email;
    this.image = user?.photoURL;

   });
  }


  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    
    
  }


  onLogout() {
    this.authServise.logout();
    this.router.navigate(['']);
  }
}
