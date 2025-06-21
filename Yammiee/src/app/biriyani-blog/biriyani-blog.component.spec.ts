import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiriyaniBlogComponent } from './biriyani-blog.component';

describe('BiriyaniBlogComponent', () => {
  let component: BiriyaniBlogComponent;
  let fixture: ComponentFixture<BiriyaniBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiriyaniBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiriyaniBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
