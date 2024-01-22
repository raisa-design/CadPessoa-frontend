import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';

import { NovoComponent } from './novo.component';
import { PessoaModule } from '../pessoa.module';

describe('NovoComponent', () => {
  let component: NovoComponent;
  let fixture: ComponentFixture<NovoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [PessoaModule, AppModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
