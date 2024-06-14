import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchViewComponent } from './twitch-view.component';

describe('TwitchViewComponent', () => {
  let component: TwitchViewComponent;
  let fixture: ComponentFixture<TwitchViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwitchViewComponent]
    });
    fixture = TestBed.createComponent(TwitchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
