import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { BadgeComponent } from './badge.component';
import { LogoComponent } from '../logo/logo.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  const mockBadgeData = {
    id: 1,
    type: 'plastic bottles',
    amount: 100,
    action: 'someAction',
    actions: 'collects',
    linked: true,
    selectedColor: 'blue',
    active: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCheckboxModule, MatSlideToggleModule],
      declarations: [BadgeComponent, LogoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;

    // Provide the mock data to the component
    component.badgeData = mockBadgeData;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
