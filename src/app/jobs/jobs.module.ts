import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";



import { FormsModule } from "@angular/forms";
import { NewJobComponent } from "./new-job/new-job.component";
import { CurrentJobComponent } from "./current-job/current-job.component";
import { JobsRoutingModule } from "./jobs-routing.module";
import { JobsListComponent } from "./jobs-list/jobs-list.component";

@NgModule({
  declarations: [NewJobComponent, CurrentJobComponent, JobsListComponent],
  imports: [CommonModule, JobsRoutingModule, FormsModule],
})
export class JobsModule {}
