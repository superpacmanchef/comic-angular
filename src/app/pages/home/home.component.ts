import { Component, OnInit } from '@angular/core';
import { RESTAPIService } from '../../services/restapiservice.service';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/services/userservice.service';
import { UserFacade } from 'src/app/state/users/user.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private service: RESTAPIService, private userFacade: UserFacade) {
    this.userFacade.loadUser();
  }

  publisher!: Publishers;
  week!: Weeks;
  lastWeek!: Weeks | null;

  allWeeksComic!: Comic_ShortBoxed_SplitTitle_Image[];
  filteredComics!: Comic_ShortBoxed_SplitTitle_Image[] | null;

  pull$: Observable<string[]> = this.userFacade.pullList$;
  user$: Observable<any> = this.userFacade.user$;

  filter() {
    this.filteredComics = null;
    this.getFilteredComics();
  }

  getWeeksComics() {
    return this.service.getWeeksComics(this.week).pipe(
      map((comics) => {
        return comics.map((comic) => {
          return {
            ...comic,
            image: 'null',
          } as Comic_ShortBoxed_SplitTitle_Image;
        });
      })
    );
  }

  getFilteredComics() {
    if (this.lastWeek === this.week) {
      this.filteredComics = this.allWeeksComic.filter((comic) =>
        this.publisher === 'All' ? comic : comic.publisher === this.publisher
      );
    } else {
      this.getWeeksComics().subscribe((comics) => {
        this.lastWeek = this.week;
        this.allWeeksComic = comics;
        this.filteredComics = comics.filter((comic) =>
          this.publisher === 'All' ? comic : comic.publisher === this.publisher
        );
      });
    }
  }

  ngOnInit(): void {
    this.publisher = 'All';
    this.week = '1';
    this.lastWeek = null;
    this.filter();
  }
}
