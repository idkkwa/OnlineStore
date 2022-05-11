import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCRUDdialogComponent } from './product-cruddialog.component';

describe('ProductCRUDdialogComponent', () => {
  let component: ProductCRUDdialogComponent;
  let fixture: ComponentFixture<ProductCRUDdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCRUDdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCRUDdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
