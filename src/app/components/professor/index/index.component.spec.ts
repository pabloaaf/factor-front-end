import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfIndexComponent } from './index.component';

describe('ProfIndexComponent', () => {
  let component: ProfIndexComponent;
  let fixture: ComponentFixture<ProfIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
