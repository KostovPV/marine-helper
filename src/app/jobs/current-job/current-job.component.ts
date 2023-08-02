import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsStorageService } from '../jobs.service';
import { Jobs } from 'src/app/models/jobs.model';
import { UsersService } from 'src/app/services/users.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';



@UntilDestroy()
@Component({
  selector: 'app-current-job',
  templateUrl: './current-job.component.html',
  styleUrls: ['./current-job.component.css']
})
export class CurrentJobComponent implements OnInit {
  id: any;
  url: string = '';
  job: any;
  canEdit:boolean = false;
  
  userId: any;


  constructor(private activatedRoute: ActivatedRoute,
    private jobService: JobsStorageService,
    private userServise: UsersService
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
      author = this.job.author;
      console.log('author', author);

      console.log(job);
     

    });

    this.userServise.currentUserProfile$
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




}
