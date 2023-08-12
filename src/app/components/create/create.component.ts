import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsStorageService } from 'src/app/jobs/jobs.service';
import { UsersService } from 'src/app/services/users.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';

@UntilDestroy()

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit{
  userId: any;
  constructor(private jobService: JobsStorageService, private router: Router, private userservice: UsersService ) { }

ngOnInit(): void {
  
  this.userservice.currentUserProfile$
    .pipe(untilDestroyed(this), tap(console.log))
    .subscribe((user)=>{
      // this.userId = user.uid;
     
      this.userId = user.uid
      
    })
}

  createJobHandler(form: NgForm):void{
  let author: any;

    if (form.invalid) {
      return;
    }
   author = this.userId
   const subscribers: string[] = [];
    const { age, company, position, imageUrl, vesselType, tel} = form.value;
    console.log( form.value);
    console.log('this.userid', );
   
   console.log('author', author);
   
    this.jobService.createJob(age, company, position, imageUrl, vesselType, tel, author, subscribers).subscribe(() => {
      this.router.navigate(['/jobs/list']);
    });
  }
  

 

}
