import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChirpComponent } from './view-chirp.component';

describe('ViewChirpComponent', () => {
  let component: ViewChirpComponent;
  let fixture: ComponentFixture<ViewChirpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewChirpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChirpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
