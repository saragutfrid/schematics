import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyData9Component } from './my-data9.component';

describe('MyData9Component', () => {
  let component: MyData9Component;
  let fixture: ComponentFixture<MyData9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyData9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyData9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
