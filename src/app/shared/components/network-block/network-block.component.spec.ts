import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkBlockComponent } from './network-block.component';

describe('NetworkBlockComponent', () => {
  let component: NetworkBlockComponent;
  let fixture: ComponentFixture<NetworkBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
