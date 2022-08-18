import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideActorComponent } from './slide-actor.component';

describe('SlideActorComponent', () => {
  let component: SlideActorComponent;
  let fixture: ComponentFixture<SlideActorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideActorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
