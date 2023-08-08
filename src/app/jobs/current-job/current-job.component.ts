import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsStorageService } from '../jobs.service';
import { Jobs } from 'src/app/models/jobs.model';
import { UsersService } from 'src/app/services/users.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs';



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
  canEdit: boolean = false;
  authorId: any;
  userId: any;
  subscriptions: any;
  filteredSub: any;
  canSubscribe: boolean = false;
  

  constructor(private activatedRoute: ActivatedRoute,
    private jobService: JobsStorageService,
    private userServise: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let author: string;
    this.activatedRoute.url.subscribe(sa => sa.forEach(value => this.url += `/${value}`));
    // this.activatedRoute.params.subscribe(p => this.id = p['id'])
    this.id = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.url.subscribe(sa => {
      sa.forEach(value => this.url += `/${value}`)
    }
    )

    this.jobService.getJob(this.id).subscribe(job => {
      this.job = job;
      author = this.job.author;
      this.authorId = author;
      console.log('author', this.job.author);
      console.log('job', this.job);
      // console.log('job.subscribers',job.subscribers);
    });

    this.userServise.currentUserProfile$
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.userId = user?.uid;
        console.log('this.userId', this.userId);
        if (this.userId == this.job.author) {
          this.canEdit = true;
          console.log('canEdit', this.canEdit);
        }
      })

// const docRef = this.jobService.getJob$(this.id)
// console.log(docRef,'docRef');


    this.jobService.getSubscribers()
      .pipe(map(responseData => {
        const subsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            subsArray.push({ ...responseData[key], id: key })
          }
        }
        return subsArray
      })).subscribe(subs => {
        this.subscriptions = subs;
        
        console.log('this.subscriptions', this.subscriptions);

        // this.subscriptions.forEach((s: any)=>{s.jobId==this.job.id
        //   this.filteredSub.push(s)})
        this.filteredSub = this.subscriptions.filter((s: { authorId: string, jobId: string, id: string }) =>
          s.jobId == this.job.id
        )
        this.canSubscribe = false;
        const filteredJobs = ((this.filteredSub.filter((s: { authorId: string, jobId: string, id: string }) =>
          s.authorId == this.userId
        )));
        this.canSubscribe = filteredJobs.length===0? true : false;
          console.log('this.filteredSub', this.filteredSub);
          console.log('canSubscribe', this.canSubscribe);
      });

    this.jobService.getSubscribers().subscribe((s)=>{
      console.log(s);

    })


  }

  ngAfterViewInit() {
    this.jobService.getSubscribers()
    .pipe(map(responseData => {
      const subsArray = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          subsArray.push({ ...responseData[key], id: key })
        }
      }
      return subsArray
    })).subscribe(subs => {
      this.subscriptions = subs;
      console.log('this.subscriptions', this.subscriptions);

      // this.subscriptions.forEach((s: any)=>{s.jobId==this.job.id
      //   this.filteredSub.push(s)})
      this.filteredSub = this.subscriptions.filter((s: { authorId: string, jobId: string, id: string }) =>
        s.jobId == this.job.id
      )
      this.canSubscribe = false;
      if ((this.filteredSub.filter((s: { authorId: string, jobId: string, id: string }) =>
        s.authorId == this.userId
      )).length == 0){
        this.canSubscribe = true
      }
        console.log('this.filteredSub', this.filteredSub);
        console.log('canSubscribe', this.canSubscribe);
    });
  }

  onSubsriptionHandler(jobId: string, userId: string) {
    console.log("jobId", jobId);
    console.log("aurhorId", userId);
    this.jobService.subscribeForJob(jobId, this.userId).subscribe(() => {
      // this.router.navigate([]);
      console.log('subscribed');

    })
  }


}
