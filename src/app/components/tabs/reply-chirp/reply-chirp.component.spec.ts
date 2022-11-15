import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyChirpComponent } from './reply-chirp.component';

describe('ReplyChirpComponent', () => {
  let component: ReplyChirpComponent;
  let fixture: ComponentFixture<ReplyChirpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyChirpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyChirpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
