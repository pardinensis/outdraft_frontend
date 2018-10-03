import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftComponentComponent } from './draft-component.component';

describe('DraftComponentComponent', () => {
  let component: DraftComponentComponent;
  let fixture: ComponentFixture<DraftComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
