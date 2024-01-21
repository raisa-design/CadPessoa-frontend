import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [],
  templateUrl: './file-input.component.html',
})
export class FileInputComponent {
  @Input({required: true}) name!: string;
  @Output() changeFile: EventEmitter<any> = new EventEmitter<any>();

  onChangeFile(element: Event) {
    this.changeFile.emit(element);
  }
}
