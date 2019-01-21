import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PageableResponse} from '../domain/pageable.response';
import {Dog} from '../domain/dog';

@Injectable()
export class DogService {

  private url: string = environment.url;

  constructor(private httpClient: HttpClient) {
  }

  getAll(curatorId, page: number, size: number, sortField: string, sortDirection: string): Observable<PageableResponse<Dog[]>> {
    if (sortField === undefined) {
      sortField = '';
      sortDirection = '';
    }
    let params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size))
      .set('sortField', sortField)
      .set('sortDirection', sortDirection);

    return this.httpClient.get<PageableResponse<Dog[]>>(
      this.url + '/' + curatorId + '/dog',
      {
        params: params
      }
    );
  }

  getById(id: number): Observable<Dog> {
    return this.httpClient.get<Dog>(
      this.url + '/' + id
    );
  }

  create(dog: Dog): Observable<Dog> {
    return this.httpClient.post<Dog>(
      this.url + '/dog',
      dog
    );
  }

  update(dog: Dog): Observable<Dog> {
    return this.httpClient.put<Dog>(
      this.url + '/dog',
      dog
    );
  }

  delete(id: number): void {
    this.httpClient.delete(
      this.url + '/dog/' + id
    ).subscribe();
  }

}
