import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuCatalogueComponent } from './menu-catalogue.component';
import { By } from '@angular/platform-browser';

describe('MenuCatalogueComponent', () => {
  let component: MenuCatalogueComponent;
  let fixture: ComponentFixture<MenuCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCatalogueComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render food items', () => {
    const cards = fixture.debugElement.queryAll(By.css('.food-card'));
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should increase quantity when increment is clicked', () => {
    const firstItem = component.foodItems[0];
    const initialQuantity = firstItem.quantity;
    component.increment(firstItem);
    expect(firstItem.quantity).toBe(initialQuantity + 1);
  });

  it('should not decrement quantity below 1', () => {
    const firstItem = component.foodItems[0];
    firstItem.quantity = 1;
    component.decrement(firstItem);
    expect(firstItem.quantity).toBe(1);
  });

  it('should show alert on addToCart', () => {
    spyOn(window, 'alert');
    const item = component.foodItems[0];
    component.addToCart(item);
    expect(window.alert).toHaveBeenCalledWith(`${item.name} (x${item.quantity}) added to cart!`);
  });
});
