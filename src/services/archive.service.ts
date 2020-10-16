import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArchiveService {

  constructor(private http: HttpClient) {
  }

  public getArchive(search: string): Observable<any> {
    return this.http.get<any>(`https://archive.org/advancedsearch.php?q=title:${search}&output=json`).pipe(share());
  }
}
