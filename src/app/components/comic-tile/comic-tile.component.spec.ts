import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicTileComponent } from './comic-tile.component';

describe('ComicTileComponent', () => {
  let component: ComicTileComponent;
  let fixture: ComponentFixture<ComicTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
