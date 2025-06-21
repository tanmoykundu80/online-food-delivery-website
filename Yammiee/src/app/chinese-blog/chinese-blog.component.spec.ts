import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChineseBlogComponent } from './chinese-blog.component';

describe('ChineseBlogComponent', () => {
  let component: ChineseBlogComponent;
  let fixture: ComponentFixture<ChineseBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChineseBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChineseBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
