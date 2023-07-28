import { Injectable } from '@angular/core';


import { Jobs } from '../models/jobs.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class JobsStorageService {
  user: any;
  // const job:Jobs{};
  constructor(
    private http: HttpClient,
    
  ) {}


  getJobs() {
    const  apiUrl  = 'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';
    
    return this.http.get<Jobs[]>(`${apiUrl}/jobs.json`);
  }

  getJob(jobId:string){
    const  apiUrl  = 'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';
    
    return this.http.get<Jobs[]>(`${apiUrl}/jobs/${jobId}.json`);
  }

  // getJobById(id) {
  //   const  apiUrl  = 'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';
  //   let job = null
  //   return this.http.get<Jobs>(`${apiUrl}/jobs.json`).pipe(map(job=>{
  //    job.id == id
  //   }));
  }
