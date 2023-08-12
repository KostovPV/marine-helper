import { Injectable } from '@angular/core';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import { Jobs } from '../models/jobs.model';
import { HttpClient } from '@angular/common/http';

import { __await } from 'tslib';

@Injectable({ providedIn: 'root' })
export class JobsStorageService {
  
  constructor(private http: HttpClient) {}

  subscribeForJob(jobId: string, subscriberId: string) {
    const apiUrl =
      'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';

    return this.http.post(`${apiUrl}/subscribers.json`, {
      jobId,
      subscriberId,
    });
  }

  getSubscribers() {
    const apiUrl =
      'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';

    return this.http.get<Jobs[]>(`${apiUrl}/subscribers.json`);
  }

  getJobs() {
    const apiUrl =
      'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';

    return this.http.get<Jobs[]>(`${apiUrl}/jobs.json`);
  }

  getJob(jobId: string) {
    const apiUrl =
      'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';

    return this.http.get<Jobs>(`${apiUrl}/jobs/${jobId}.json`);
  }

  async getJob$(id: string) {
    const db = getFirestore();
    const docRef = doc(db, 'jobs/list', id);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    // const apiUrl = 'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';

    // return  this.http.get<Jobs[]>(`${apiUrl}/jobs/${jobId}.json`) ;
  }

  createJob(
    age: string,
    company: string,
    position: string,
    imageUrl: string,
    vesselType: string,
    tel: string,
    author: string,
    subscribers: string[]
  ) {
    const apiUrl =
      'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';

    return this.http.post(`${apiUrl}/jobs.json`, {
      age,
      company,
      position,
      imageUrl,
      vesselType,
      tel,
      author,
      subscribers,
    });
  }

  editJob(id: string, author: string, data: Jobs) {
    const body = {
      id,
      author,
      age: data.age,
      company: data.company,
      position: data.position,
      imageUrl: data.imageUrl,
      vesselType: data.vesselType,
      tel: data.tel,
    };
    return this.http.put<Jobs>(
      `https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app/jobs/${id}.json`,
      body
    );
  }

  deleteJobById(id: string) {
    const appUrl =
      'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';
    return this.http.delete<Jobs>(`${appUrl}/jobs/${id}.json`);
  }
}
