import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { JobsStorageService } from '../jobs.service';
import { NgForm } from '@angular/forms';
import { Jobs } from 'src/app/models/jobs.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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
  isLoading: boolean = true;


  constructor(
    private activatedRoute: ActivatedRoute,
    private jobService: JobsStorageService,
    private userservice: UsersService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    let author: string;
    this.activatedRoute.url.subscribe((sa) =>
      sa.forEach((value) => (this.url += `/${value}`))
    );
    // this.activatedRoute.params.subscribe(p => this.id = p['id'])
    this.id = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.url.subscribe((sa) => {
      sa.forEach((value) => (this.url += `/${value}`));
    });

    // Combined job and user subscriptions so there are no race conditions. Can also be done with combine latest rxjs operator
    this.jobService
      .getJob(this.id)
      .pipe(
        tap((job) => {
        // this.isLoading = false;

          this.job = job;

        }),
        switchMap((job: any) =>
          this.userservice.currentUserProfile$.pipe(
            map((user) => {
              if (!user) return false;

              return user.uid === job.author;
            })
          )
        )
      )
      .subscribe((canEdit) => {
        this.canEdit = canEdit;
        this.isLoading = false;
      });
  }

  editComponentSubmitHandler(job: Jobs) {
    // console.log('jobForm.value' ,this.jobForm.value);
    console.log(this.job);

    // if (jobForm.invalid) {
    //   return;
    // }

    console.log('userId', this.userId);
    this.jobService.editJob(this.id, this.userId, job).subscribe(() => {
      this.router.navigate(['/jobs/list/']);
    });
  }

  onDeleteHandler(id: string): void {
    if (confirm(`Are you sure you want to delete this job ?`)) {
      this.jobService.deleteJobById(id).subscribe(() => {
        console.log('deleting completed');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      });
    } else {
      return;
    }
  }
}
