import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestChainComponent } from './suggest-chain.component';

describe('SuggestChainComponent', () => {
  let component: SuggestChainComponent;
  let fixture: ComponentFixture<SuggestChainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestChainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
