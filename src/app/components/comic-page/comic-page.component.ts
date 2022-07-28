import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Observable, of } from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { RESTAPIService } from 'src/app/services/restapiservice.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-comic-page',
  templateUrl: './comic-page.component.html',
  styleUrls: ['./comic-page.component.scss'],
})
export class ComicPageComponent implements OnInit {
  _comics!: Comic_ShortBoxed_SplitTitle_Image[] | null;

  pageNumber!: number;
  totalPageNumber!: number;

  numberPerPage!: number;

  currentPageComics!: Observable<Comic_ShortBoxed_SplitTitle_Image[]>;

  constructor(private service: RESTAPIService, public dialog: MatDialog) {}

  get comics(): Comic_ShortBoxed_SplitTitle_Image[] | null {
    return this._comics;
  }
  @Input() set comics(comics: Comic_ShortBoxed_SplitTitle_Image[] | null) {
    this._comics = comics;

    if (comics !== null) {
      if (comics.length > 0) {
        this.totalPageNumber = Math.ceil(comics.length / this.numberPerPage);
        this.pageChange(0);
      } else {
        this.totalPageNumber = 0;
        this.currentPageComics = of([]);
      }
    }
  }

  pageChange(newPageNumber: number) {
    if (
      newPageNumber >= 0 &&
      newPageNumber !== this.totalPageNumber &&
      this.comics
    ) {
      this.pageNumber = newPageNumber;

      //Shallow copy subset of comics
      const subArray = this.comics.slice(
        newPageNumber * this.numberPerPage,
        +newPageNumber * this.numberPerPage + this.numberPerPage
      );

      this.currentPageComics = this.getCurrentPageComicsImages(subArray).pipe(
        map((comicImageArray) => {
          const imageComics = subArray.map((comic, index) => {
            if (comic.image === 'null') {
              comic.image = comicImageArray[index];
            }
            return comic;
          });
          return imageComics;
        })
      );
    }
  }

  getCurrentPageComicsImages(
    currentPageComics: Comic_ShortBoxed_SplitTitle_Image[]
  ) {
    //Only gets image if needed
    const subscriptions = currentPageComics.map((comic) =>
      comic.image === 'null' || comic.image === null
        ? this.service.getComicsCover(comic)
        : of(comic.image)
    );

    return forkJoin(subscriptions);
  }

  openDialog(comic: Comic_ShortBoxed_SplitTitle_Image): void {
    this.dialog.open(ModalComponent, {
      data: comic,
    });
  }

  ngOnInit(): void {
    this.numberPerPage = 12;
    this.pageNumber = 0;
    this.totalPageNumber = 1;
    this.pageChange(0);
  }
}
