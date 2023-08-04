import { Injectable } from '@angular/core';


import { Jobs } from '../models/jobs.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { log } from 'console';
import { ok } from 'assert';


@Injectable({ providedIn: 'root' })
export class JobsStorageService {
  // user: any;
  
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
    imageUrl: string, vesselType: string, tel: string, author: string, subscribers: string[]) {
    const apiUrl = 'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';


    return this.http.post(`${apiUrl}/jobs.json`, { age, company, position, imageUrl, vesselType, tel, author, subscribers })

  }

  editJob(id: string,author: string, data: Jobs) {
    const body = {
      id,
      author,
      age: data.age,
      company: data.company,
      position: data.position,
      imageUrl: data.imageUrl,
      vesselType: data.vesselType,
      tel: data.tel
    }
    return this.http.put<Jobs>(`https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app/jobs/${id}.json`, body)
  }



  deleteJobById(id: string) {
   
    const appUrl = 'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';
    return this.http.delete<Jobs>(`${appUrl}/jobs/${id}.json`)
  }

}
 

