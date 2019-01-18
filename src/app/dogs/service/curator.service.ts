import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Curator} from '../domain/curator';

@Injectable()
export class CuratorService {

  private url: string = environment.url + '/curator';

  constructor(private httpClient: HttpClient) {
  }

  getAll(page: number, size: number): Observable<Curator[]> {
    return this.httpClient.get<Curator[]>(
      this.url,
      {
        params: new HttpParams()
          .set('page', String(page))
          .set('size', String(size))
      }
    );
  }

  getById(id: number): Observable<Curator> {
    return this.httpClient.get<Curator>(
      this.url + '/' + id
    );
  }

  create(curator: Curator): Observable<Curator> {
    return this.httpClient.post<Curator>(
      this.url,
      curator
    );
  }

  update(curator: Curator): Observable<Curator> {
    return this.httpClient.put<Curator>(
      this.url,
      curator
    );
  }

  delete(id: number): void {
    this.httpClient.delete(
      this.url + '/' + id
    );
  }


}
