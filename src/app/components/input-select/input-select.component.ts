import { Component, Input } from '@angular/core';
import { InputOption } from '../../types/InputOption';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-select.component.html',
})
export class InputSelectComponent {
  @Input({required: true}) label!: string;
  @Input({required: true}) name!: string;
  @Input({required: true}) options!: InputOption[];
}
