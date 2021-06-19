import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  private _canShowSpinner: boolean;

  constructor(private readonly _spinnerService: SpinnerService) {
    this._canShowSpinner = false;
  }

  ngOnInit(): void {
    this._spinnerService.spinCommand.subscribe(data => this._canShowSpinner = data);
  }

  public get canShowSpinner(): boolean {
    return this._canShowSpinner;
  }

}
