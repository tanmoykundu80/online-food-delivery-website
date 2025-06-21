import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BengaliFoodBlogComponent } from './bengali-food-blog.component';

describe('BengaliFoodBlogComponent', () => {
  let component: BengaliFoodBlogComponent;
  let fixture: ComponentFixture<BengaliFoodBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BengaliFoodBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BengaliFoodBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
