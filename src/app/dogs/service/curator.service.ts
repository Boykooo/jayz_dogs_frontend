import { environment } from '../../../environments/environment';
import { Curator } from '../domain/curator';
import { PageableResponse } from '../domain/pageable.response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CuratorService {

  private url: string = environment.url + '/curator';

  constructor(private httpClient: HttpClient) {
  }

  getAll(page: number, size: number, sortField: string, sortDirection: string): Observable<PageableResponse<Curator[]>> {
    console.log(sortField);
    if (sortField === undefined) {
      sortField = '';
      sortDirection = '';
    }
    let params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size))
      .set('sortField', sortField)
      .set('sortDirection', sortDirection);

    return this.httpClient.get<PageableResponse<Curator[]>>(
      this.url,
      {
        params: params
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
    ).subscribe();
  }

}
