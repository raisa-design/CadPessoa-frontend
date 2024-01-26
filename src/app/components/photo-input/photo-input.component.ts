import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-photo-input',
  templateUrl: './photo-input.component.html',
  styleUrls: ['./photo-input.component.css']
})
export class PhotoInputComponent {
  @Input({required: true}) name!: string;
  @Output() changeFile: EventEmitter<any> = new EventEmitter<any>();

  onChangeFile(element: Event) {
    this.changeFile.emit(element);
  }
}
