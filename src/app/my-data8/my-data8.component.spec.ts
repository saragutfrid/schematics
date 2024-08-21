import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyData8Component } from './my-data8.component';

describe('MyData8Component', () => {
  let component: MyData8Component;
  let fixture: ComponentFixture<MyData8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyData8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyData8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
