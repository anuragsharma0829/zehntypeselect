import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZehnselectComponent } from './zehnselect.component';

describe('ZehnselectComponent', () => {
  let component: ZehnselectComponent;
  let fixture: ComponentFixture<ZehnselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZehnselectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZehnselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
