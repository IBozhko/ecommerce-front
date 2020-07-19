import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPostContentComponent } from './forum-post-content.component';

describe('ForumPostContentComponent', () => {
  let component: ForumPostContentComponent;
  let fixture: ComponentFixture<ForumPostContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumPostContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumPostContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
