import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comic-tile',
  templateUrl: './comic-tile.component.html',
  styleUrls: ['./comic-tile.component.scss'],
})
export class ComicTileComponent {
  @Input() comic!: Comic_ShortBoxed_SplitTitle_Image;

  constructor() {}
}
