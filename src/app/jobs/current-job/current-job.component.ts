import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsStorageService } from '../jobs.service';
import { Jobs } from 'src/app/models/jobs.model';



@Component({
  selector: 'app-current-job',
  templateUrl: './current-job.component.html',
  styleUrls: ['./current-job.component.css']
})
export class CurrentJobComponent implements OnInit {
  id: any;
  url: string = '';
  job: any;
  constructor(private activatedRoute: ActivatedRoute,
    private apiService: JobsStorageService,
  ) { }

  ngOnInit(): void {
    // this.id = {
    //   id:  this.activatedRoute.snapshot.params['id']
    // }
    this.activatedRoute.url.subscribe(sa => sa.forEach(value => this.url += `/${value}`));
    this.activatedRoute.params.subscribe(p => this.id = p['id'])

    this.apiService.getJob(this.id).subscribe(job => {
      this.job = job;
      console.log(job);
    });

  }




}


