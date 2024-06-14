import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateTriggerComponent } from './animate-trigger.component';

describe('AnimateTriggerComponent', () => {
  let component: AnimateTriggerComponent;
  let fixture: ComponentFixture<AnimateTriggerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimateTriggerComponent]
    });
    fixture = TestBed.createComponent(AnimateTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
