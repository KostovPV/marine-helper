import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { JobsStorageService } from '../jobs.service';
import { NgForm } from '@angular/forms';
import { Jobs } from 'src/app/models/jobs.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css'],
})
export class EditJobComponent implements OnInit {
  id: any;
  url: string = '';
  job: any;
  canEdit: boolean = false;
  userId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobService: JobsStorageService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    let author: string;
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
      })
    );

  
    const user$ = this.authService.currentUser$.pipe(
      tap((user) => {
        this.userId = user?.uid;
      })
    );


    combineLatest([job$, user$]).subscribe(([job, user]) => {
      if (user?.uid === job.author) {
        this.canEdit = true;
      }
    });
  }

  editComponentSubmitHandler(job: Jobs) {
    this.jobService.editJob(this.id, this.userId, job).subscribe(() => {
      this.router.navigate(['/jobs/list/']);
    });
  }

  onDeleteHandler(id: string): void {
    if (confirm(`Are you sure you want to delete this job ?`)) {
      this.jobService.deleteJobById(id).subscribe(() => {

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      });
    } else {
      return;
    }
  }
}
