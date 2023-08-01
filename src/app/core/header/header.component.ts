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
  isAuthenticated = false;
  private userSub?: Subscription;

  constructor(private authServise: AuthService, private router: Router){}

  ngOnInit(){
   this.userSub = this.authServise.currentUser$.subscribe(user=>{
    this.isAuthenticated = !user ? false : true;
    this.email = user?.email
    console.log(user);
    
    // console.log(!!user);
   });
  }


  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    
    
  }

  // get email():  {
  //   return this.authServise.user?.username ;
  // }

  onLogout() {
    this.authServise.logout();
    this.router.navigate(['']);
  }
}
