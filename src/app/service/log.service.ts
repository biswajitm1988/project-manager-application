import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export abstract class Logger {
  info: any;
  warn: any;
  error: any;
}

export let isDebugMode = environment.isDebugMode;

const noop = (): any => undefined;

@Injectable({
  providedIn: 'root'
})
export class LogService implements Logger {

  get info() {
    if (isDebugMode) {
      return console.info.bind(console);
    } else {
      return noop;
    }
  }

  get warn() {
    if (isDebugMode) {
      return console.warn.bind(console);
    } else {
      return noop;
    }
  }

  get error() {
    if (isDebugMode) {
      return console.error.bind(console);
    } else {
      return noop;
    }
  }

}
