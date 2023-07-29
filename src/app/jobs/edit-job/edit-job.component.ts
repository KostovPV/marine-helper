import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { JobsStorageService } from '../jobs.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
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
  currentJob: any;

  @ViewChild('jobForm') form: NgForm | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private jobService: JobsStorageService,
    private userServise: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) { }



  ngOnInit(): void {
    console.log('jobForm', this.form);
    this.activatedRoute.url.subscribe(sa => sa.forEach(value => this.url += `/${value}`));
    // this.activatedRoute.params.subscribe(p => this.id = p['id'])
    this.jobId = this.activatedRoute.snapshot.params['id'];
    console.log('this.jobId', this.jobId);

    this.activatedRoute.url.subscribe(sa => {
      sa.forEach(value => this.url += `/${value}`)
    }
    )
    this.jobService.getJob(this.jobId).subscribe(job => {

      this.currentJob = job
      console.log('this.currentJob', this.currentJob);
      console.log('this.currentJob.age', this.currentJob.age, 'this.currentJob.company ', this.currentJob.company,);

    });



    this.form?.setValue({
      age: this.currentJob.age,
      company: this.currentJob.company,
      position: this.currentJob.position,
      imageUrl: this.currentJob.imageUrl,
      vesselType:this.currentJob.vesselType,
      id: this.currentJob.id,
      tel: this.currentJob.tel,
    })


    // this.jobDetails = {
    //   age,
    //   company,
    //   position,
    //   imageUrl,
    //   vesselType,
    //   tel,
    //   id
    // }
    // this.form.setValue({
    //   age,
    //   company,
    //   position,
    //   imageUrl,
    //   vesselType,
    //   tel,
    //   id
    // });

  }



  editComponentSubmitHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { company, age, position, imageUrl, vesselType, tel } = form.value;
    this.jobService.createJob(age, company, position, imageUrl, vesselType, tel).subscribe(() => {
      this.router.navigate(['/jobs/list']);
    });



  }

}




