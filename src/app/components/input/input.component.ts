import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: false }) type?: string = 'text';
  @Input({ required: false }) placeholder?: string = '';

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
}
