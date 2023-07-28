import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";



import { FormsModule } from "@angular/forms";
import { EditJobComponent } from "./edit-job/edit-job.component";
import { CurrentJobComponent } from "./current-job/current-job.component";
import { JobsRoutingModule } from "./jobs-routing.module";
import { JobsListComponent } from "./jobs-list/jobs-list.component";

@NgModule({
  declarations: [EditJobComponent, CurrentJobComponent, JobsListComponent],
  imports: [CommonModule, JobsRoutingModule, FormsModule],
})
export class JobsModule {}
