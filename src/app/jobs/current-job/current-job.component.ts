import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsStorageService } from '../jobs.service';
import { Jobs } from 'src/app/models/jobs.model';
import { UsersService } from 'src/app/services/users.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, map, shareReplay, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-current-job',
  templateUrl: './current-job.component.html',
  styleUrls: ['./current-job.component.css'],
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobService: JobsStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((sa) =>
      sa.forEach((value) => (this.url += `/${value}`))
    );
 
    this.id = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.url.subscribe((sa) => {
      sa.forEach((value) => (this.url += `/${value}`));
    });

    const job$ = this.jobService.getJob(this.id).pipe(
      shareReplay(1),
      tap((job) => {
        this.job = job;
        this.authorId = this.job?.author;
      })
    );

 
    const user$ = this.authService.currentUser$.pipe(
      tap((user) => {
        if (user) {
          this.userId = user.uid;
        }
      })
    );

    const subs$ = this.jobService.getSubscribers().pipe(
      shareReplay(1),
      map((responseData) => {
        const subsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            subsArray.push({ ...responseData[key], id: key });
          }
        }
        return subsArray;
      })
    );


    combineLatest([job$, user$, subs$]).subscribe(([job, user, subs]) => {
      if (user && user.uid === job?.author) {
        this.canEdit = true;
      }

      this.subscriptions = subs;

      this.filteredSub = this.subscriptions.filter(
        (s: { authorId: string; jobId: string; id: string }) =>
          s.jobId === job.id
      );

      this.canSubscribe = false;

      const filteredJobs = this.filteredSub.filter(
        (s: { authorId: string; jobId: string; id: string }) =>
          s.authorId === user?.uid
      );
      this.canSubscribe = filteredJobs.length === 0 ? true : false;
      console.log('this.filteredSub', this.filteredSub);
      console.log('canSubscribe', this.canSubscribe);
    });

    // const docRef = this.jobService.getJob$(this.id)
    // console.log(docRef,'docRef');
  }

  ngAfterViewInit() {}

  onSubsriptionHandler(jobId: string, userId: string) {
    console.log('jobId', jobId);
    console.log('aurhorId', userId);
    this.jobService.subscribeForJob(jobId, this.userId).subscribe(() => {
      // this.router.navigate([]);
      console.log('subscribed');
    });
  }
}
