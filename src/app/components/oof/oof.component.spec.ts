import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OofComponent } from './oof.component';

describe('OofComponent', () => {
  let component: OofComponent;
  let fixture: ComponentFixture<OofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OofComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
