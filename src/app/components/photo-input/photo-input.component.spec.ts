import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoInputComponent } from './photo-input.component';

describe('PhotoInputComponent', () => {
  let component: PhotoInputComponent;
  let fixture: ComponentFixture<PhotoInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoInputComponent]
    });
    fixture = TestBed.createComponent(PhotoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
