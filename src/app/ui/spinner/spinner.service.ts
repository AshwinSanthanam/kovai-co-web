import { Injectable } from '@angular/core';
import { Publisher } from 'src/app/helpers/publisher';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private readonly _spinCommand: Publisher<boolean>;

  constructor() {
    this._spinCommand = new Publisher<boolean>();
  }

  public get spinCommand(): Publisher<boolean> {
    return this._spinCommand;
  }

  public runSpinner(): void {
    this._spinCommand.publish(true);
  }

  public stopSpinner(): void {
    this._spinCommand.publish(false);
  }
}
