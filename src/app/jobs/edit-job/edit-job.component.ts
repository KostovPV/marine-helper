import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { JobsStorageService } from '../jobs.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Jobs } from 'src/app/models/jobs.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@UntilDestroy()

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {
  id: any;
  url: string = '';
  job: any;
  canEdit:boolean = false;
  userId: any;
  // jobForm: FormGroup = this.fb.group({
  //   position: ['', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(25)
  //   ]],
  //   age: ['', [
  //     Validators.required,
  //     Validators.minLength(2),
  //     Validators.maxLength(350)
  //   ]],
  //   image: ['', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(25)
  //   ]],
  //   company: ['', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(25)
  //   ]],
  //   imageUrl: ['', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(25)
  //   ]],
  //   vesselType: ['', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(25)
  //   ]], id: ['', [
  //     Validators.required,
  //   ]],
  //   tel: ['', [
  //     Validators.required,
  //     Validators.minLength(8),

  //   ]]
  // });

  constructor(private activatedRoute: ActivatedRoute,
    private jobService: JobsStorageService,
    private userservice: UsersService,
    private router: Router,
    private http: HttpClient
  ) { }



  ngOnInit(): void {
    let author: string;
    this.activatedRoute.url.subscribe(sa => sa.forEach(value => this.url += `/${value}`));
    // this.activatedRoute.params.subscribe(p => this.id = p['id'])
    this.id = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.url.subscribe(sa=>{
      sa.forEach(value=> this.url+=`/${value}`)
    }
      )

    this.jobService .getJob(this.id).subscribe(job => {
      this.job = job;
      author = this.job?.author;
      console.log('author', author);

      console.log(job);
     

    });

    this.userservice.currentUserProfile$
    .pipe(untilDestroyed(this))
    // .pipe(untilDestroyed(this), tap(console.log))
    .subscribe((user)=>{
      this.userId = user?.uid;
      console.log('this.userId',this.userId);
      
      if(this.userId == this.job.author){
        this.canEdit = true;
        console.log('canEdit', this.canEdit);
        
      }
      
    })
   
  }
  
  editComponentSubmitHandler( job: Jobs) {
    // console.log('jobForm.value' ,this.jobForm.value);
    console.log(this.job);

    // if (jobForm.invalid) {
    //   return;
    // }

    console.log("userId", this.userId);
    this.jobService.editJob(this.id, this.userId, job).subscribe(() => {
      this.router.navigate(['/jobs/list/']);
    })

  }


  onDeleteHandler(id: string): void {
    if (confirm(`Are you sure you want to delete this job ?`)) {
      this.jobService.deleteJobById(id).subscribe(()=> {
        console.log('deleting completed');
        
        this.router.navigate(['/home'])
      });
    } else {
      return;
    }
  }


  }

 

  




