import { Injectable } from '@angular/core';


import { Jobs } from '../models/jobs.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { log } from 'console';
import { ok } from 'assert';


@Injectable({ providedIn: 'root' })
export class JobsStorageService {
  user: any;
  // const job:Jobs{};
  constructor(
    private http: HttpClient,

  ) { }


  getJobs() {
    const apiUrl = 'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';

    return this.http.get<Jobs[]>(`${apiUrl}/jobs.json`);
  }



  getJob(jobId: string) {
    const apiUrl = 'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';

    return this.http.get<Jobs[]>(`${apiUrl}/jobs/${jobId}.json`);
  }

  createJob(age: string, company: string, position: string,
    imageUrl: string, vesselType: string, tel: string) {
    const apiUrl = 'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';


    return this.http.post(`${apiUrl}/jobs.json`, { age, company, position, imageUrl, vesselType, tel })

  }






  createjob(company: string, age: string, position: string,
    imageUrl: string, vesselType: string, tel: string) {
    const PROJECT_ID = 'rate-me-a5440'
    const apiUrl = `https://${PROJECT_ID}.firebaseio.com/message_list.json`;
    this.http.post<Jobs>(`https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app/jobs.json`, { company, age, position, imageUrl, vesselType, tel }).subscribe(responsdata => {
      console.log(responsdata);

    });
  }

  // company: string, age: string, position: string,
  // imageUrl: string, vesselType: string, tel: string

  // updatejob(id: string, value: Jobs) {
  //   const PROJECT_ID = 'rate-me-a5440'
  //   const apiUrl = `https://${PROJECT_ID}.firebaseio.com/message_list.json`;
  //   this.http.put<Jobs>(`https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app/jobs.json`, value).subscribe()
  // };

  editJob(id: string, data: Jobs) {
    const body = {
      id,
      age: data.age,
      company: data.company,
      position: data.position,
      imageUrl: data.imageUrl,
      vesselType: data.vesselType,
      tel: data.tel
    }
    return this.http.put<Jobs>(`https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app/jobs/${id}.json`, body)
  }

}
  // getJobById(id) {
  //   const  apiUrl  = 'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';
  //   let job = null
  //   return this.http.get<Jobs>(`${apiUrl}/jobs.json`).pipe(map(job=>{
  //    job.id == id
  //   }));

