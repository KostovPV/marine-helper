import { Component, OnInit } from '@angular/core';



import { Subscription, map, tap } from 'rxjs';
import { Jobs } from 'src/app/models/jobs.model';
import { JobsStorageService } from '../jobs.service';



import { getFirestore, doc, getDoc, collection } from "firebase/firestore"
import { get } from 'http';
import { AuthService } from 'src/app/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UsersService } from 'src/app/services/users.service';

// import{getFirestore, getDoc , doc, collection} from "firebase/firestore"
// const db = getFirestore();
// const docRef = doc(db, "jobs", "-NaGkqB6wQ8vPgYB9ySC");
// const docSnap = getDoc(docRef);
//  console.log(docSnap.data().subscribe());


// const db = getFirestore();
// db.collection("jobs")
// .doc("cAwTiq7IYKAbFGnhgKT3")
// .get()
// .then(doc => {
//     console.log(doc.data()) 
// })
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
    
    // this.userSub = this.authServise.currentUser$.subscribe(user => {
    //   this.id = user?.uid
    //   console.log(user);
    //   console.log('id', this.id);
    // });

    this.userservice.currentUserProfile$
    .pipe(untilDestroyed(this), tap(console.log))
    .subscribe((user)=>{
      this.userId = user.uid;
      console.log(this.userId);
      
    })
    // (user) => {
      // this.profileForm.patchValue({ ...user });
    // });
   
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