import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdIndexComponent } from './index.component';

describe('StdIndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<StdIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
