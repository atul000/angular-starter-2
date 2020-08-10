import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  logs: Log[];

  // behasub => holds value that needs to be shared with all comp
  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null,
  });
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {
    //     id: '1',
    //     text: 'Generated Compnent',
    //     date: new Date('10/10/2010 10:43:21'),
    //   },
    //   {
    //     id: '2',
    //     text: 'Added Bootstrap',
    //     date: new Date('10/10/2010 11:32:11'),
    //   },
    // ];
    this.logs = [];
  }
  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(
      this.logs.sort((a, b) => {
        return (b.date = a.date);
      })
    );
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    // add to localstorage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);

    // update localstorage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

    // delete from localStorage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
