import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MootsTooltipsComponent } from './moots-tooltips.component';

describe('MootsTooltipsComponent', () => {
  let component: MootsTooltipsComponent;
  let fixture: ComponentFixture<MootsTooltipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MootsTooltipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MootsTooltipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
