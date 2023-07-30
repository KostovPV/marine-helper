import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { JobsStorageService } from '../jobs.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Jobs } from 'src/app/models/jobs.model';


@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {
  jobId: any;
  url: string = '';
  job: any;
  canEdit: boolean = true;
  userId: any;
  author: any;
  errorMessage: string = '';

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
    private userServise: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) { }



  ngOnInit(): void {
    // console.log('jobForm', this.jobForm);
    this.activatedRoute.url.subscribe(sa => sa.forEach(value => this.url += `/${value}`));
    // this.activatedRoute.params.subscribe(p => this.id = p['id'])
    this.jobId = this.activatedRoute.snapshot.params['id'];
    console.log('this.jobId', this.jobId);

    this.activatedRoute.url.subscribe(sa => {
      sa.forEach(value => this.url += `/${value}`)
    }
    )
    this.jobService.getJob(this.jobId).subscribe(job=>{
      this.job = job
      console.log(this.job);
      
    });
    


  }

  // edit(event: Event) {
  //   event.preventDefault();

  //   if (this.jobForm.invalid) {
  //     this.errorMessage = 'The form you have submitted is invalid';
  //     return;
  //   }

  //   const data: Jobs = this.jobForm.value;
  //   this.errorMessage = '';
  //   console.log(data);
    
  //   this.jobService.editJob(this.jobId, data).subscribe({
  //     error: (err) => {
  //       if (err.error.errors) {
  //         this.errorMessage = err.error.errors[0].msg;
  //       } else {
  //         this.errorMessage = err.message;
  //       }
  //     },
  //     complete: () => {
  //       this.router.navigate([`/jobs/list/${this.jobId}`]);
  //     }
  //   });
  // }

  editComponentSubmitHandler(job: Jobs) {
    // console.log('jobForm.value' ,this.jobForm.value);
    console.log(job);
    
    // if (jobForm.invalid) {
    //   return;
    // }

  //  const { company, age, position, imageUrl, vesselType, tel } = this.jobForm.value;
  //  console.log('company',company, age, position, imageUrl, vesselType, tel);
  //  this.jobService.createJob(age, company, position, imageUrl, vesselType, tel).subscribe(() => {
  //   this.router.navigate(['/jobs/list/'+this.jobId]);
  // }
  
  this.jobService.editJob(this.jobId, job).subscribe(() => {
    this.router.navigate(['/jobs/list/']);
  })
   



  

}




}