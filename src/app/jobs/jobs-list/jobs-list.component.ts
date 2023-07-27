import { Component, OnInit } from '@angular/core';


import { Subscription, map } from 'rxjs';
import { Jobs } from 'src/app/models/jobs.model';
import { JobsStorageService } from '../jobs.service';




@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})

export class JobsListComponent implements OnInit{
jobsList: Jobs[] = [];
  isLoading: boolean = true;

  constructor(
    private apiService: JobsStorageService,
    // private userService: AuthService
  ) {}

  // get isLogged(): boolean {
  //   return this.userService.isLogged;
  // }


  ngOnInit(): void {
    this.apiService.getJobs()
        .pipe(map(responseData=>{
          const jobsArray = [];
          for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
            jobsArray.push({...responseData[key], id: key})
            }
          }
          return jobsArray
        })).subscribe(jobs=>{
          this.jobsList=jobs;
          console.log(jobs);
          
          
        });
  }
}