import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasInfoComponent } from './tarjetas-info.component';

describe('TarjetasInfoComponent', () => {
  let component: TarjetasInfoComponent;
  let fixture: ComponentFixture<TarjetasInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetasInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetasInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
