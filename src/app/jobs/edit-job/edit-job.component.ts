import { Component, OnInit } from '@angular/core';
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

  jobDetails: Jobs = {
    age: '',
    company: '',
    position: '',
    imageUrl: '',
    vesselType: '',
    tel: '',
    id: '',

  }

  constructor(private activatedRoute: ActivatedRoute,
    private jobService: JobsStorageService,
    private userServise: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  form = this.fb.group({
    age: ['', [Validators.required]],
    company: ['', [Validators.required]],
    position: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    vesselType: ['', [Validators.required]],
    tel: ['', [Validators.required]],
    id: ['', [Validators.required]],

    // persons: this.fb.array([]),
  });

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(sa => sa.forEach(value => this.url += `/${value}`));
    // this.activatedRoute.params.subscribe(p => this.id = p['id'])
    this.jobId = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.url.subscribe(sa => {
      sa.forEach(value => this.url += `/${value}`)
    }
    )
    this.jobService.getJob(this.jobId).subscribe(job => {
      this.job.age = this.jobDetails.age,
        this.job.company = this.jobDetails.company,
        this.job.position = this.jobDetails.position,
        this.job.imageUrl = this.jobDetails.imageUrl,
        this.job.vesselType = this.jobDetails.vesselType,
        this.job.tel = this.jobDetails.tel,
        this.job.id = this.jobDetails.id

    });

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

    




  }

// editComponentSubmitHandler(form: NgForm): void {
//   if(form.invalid) {
//   return;
// }

// const { company, age, position, imageUrl, vesselType, tel } = form.value;
// this.jobService.createjob(company, age, position, imageUrl, vesselType, tel).subscribe(() => {
//   this.router.navigate(['/jobs/list']);
// });
//   }



