import { Component, Input, OnInit } from '@angular/core';
import { Publisher } from 'src/app/helpers/publisher';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input('popup-command')
  public popupCommand: Publisher<boolean>;

  private _isPopupOpen: boolean;

  constructor() { }

  ngOnInit(): void {
    this.popupCommand.subscribe(data => this._isPopupOpen = data);
  }

  public get isPopupOpen(): boolean {
    return this._isPopupOpen;
  }
}
