import { Component, OnInit } from '@angular/core';



import { Subscription, map, tap } from 'rxjs';
import { Jobs } from 'src/app/models/jobs.model';
import { JobsStorageService } from '../jobs.service';



import { getFirestore, doc, getDoc, collection } from "firebase/firestore"
import { get } from 'http';
import { AuthService } from 'src/app/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UsersService } from 'src/app/services/users.service';


@UntilDestroy()
@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})

export class JobsListComponent implements OnInit {
  jobsList: Jobs[] = [];
  isLoading: boolean = true;
  userId: any;
 
  job: any;

  private userSub?: Subscription;
  profileForm: any;
  
  constructor(
    private apiService: JobsStorageService,
    private userservice: UsersService,
 
   
    // private userService: AuthService
  ) { }
  

  // get isLogged(): boolean {
  //   return this.userService.isLogged;
  // }


  ngOnInit(): void {
  
    this.userservice.currentUserProfile$
    .pipe(untilDestroyed(this), tap(console.log))
    .subscribe((user)=>{
      this.userId = user.uid;
      console.log(this.userId);
      
    })
   
   
    this.apiService.getJobs()
      .pipe(map(responseData => {
        const jobsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            jobsArray.push({ ...responseData[key], id: key })
          }
        }
        return jobsArray
      })).subscribe(jobs => {
        this.jobsList = jobs;
        console.log(jobs);
      });

  }
  
  
}