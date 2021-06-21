import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Input('count')
  count: number;

  @Output('change')
  private readonly _change: EventEmitter<number>;

  constructor() {
    this.count = 0;
    this._change = new EventEmitter<number>();
  }

  ngOnInit(): void {
  }

  increment() {
    this.count++;
    this._change.emit(this.count);
  }

  decrement() {
    if(this.count > 0) {
      this.count--;
      this._change.emit(this.count);
    }
  }

}
