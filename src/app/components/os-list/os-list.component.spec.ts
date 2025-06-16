import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsListComponent } from './os-list.component';

describe('OsListComponent', () => {
  let component: OsListComponent;
  let fixture: ComponentFixture<OsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
