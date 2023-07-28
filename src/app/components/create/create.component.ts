import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsStorageService } from 'src/app/jobs/jobs.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(private jobService: JobsStorageService, private router: Router) { }

  createJobHandler(form: NgForm):void{
    if (form.invalid) {
      return;
    }

    const { age, company, string, imageUrl, vesselType, tel } = form.value;
    console.log( form.value);
    
    this.jobService.createJob(age, company, string, imageUrl, vesselType, tel).subscribe(() => {
      this.router.navigate(['/jobs/list']);
    });
  }
  

 

}
