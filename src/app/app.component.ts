import {Component} from '@angular/core';
import {Subject} from 'rxjs';
import {ArchiveService} from '../services/archive.service';
import {debounceTime, distinct} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-instant-search';
  searchKeyword: string;
  latestSearch = new Subject<string>();
  results: any[];

  constructor(private archiveService: ArchiveService) {
    this.latestSearch.pipe(
      // To retrieve new data from HTTP if at least 500ms since the last change
      debounceTime(500),
      // Only emit new value if the term is change
      distinct()
    ).subscribe(keyword => {
      this.archiveService.getArchive(this.searchKeyword).subscribe(res => this.results = res.response.docs);
    });
  }

  newSearch(searchKeyword): void {
    this.latestSearch.next(searchKeyword);
  }
}
