import { Injectable } from '@angular/core';


import { Jobs } from '../models/jobs.model';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class JobsStorageService {
  user: any;
  constructor(
    private http: HttpClient,
    
  ) {}


  getJobs() {
    const  apiUrl  = 'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';
    
    return this.http.get<Jobs[]>(`${apiUrl}/jobs.json`,
    
    );
  }
}