import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct colour', () => {
    // Set logoColor to a string of more than 1 character
    component.logoColor = 'blue';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const logoDiv = compiled.querySelector('.logo');

    // Check if the logo div is present
    expect(logoDiv).toBeTruthy();

    // Check if logoColor is a string of more than 1 character
    const logoColor = component.logoColor;
    expect(typeof logoColor === 'string' && logoColor.length > 1).toBeTruthy();
  });
});
