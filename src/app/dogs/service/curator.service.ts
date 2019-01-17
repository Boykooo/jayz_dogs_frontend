import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CuratorService {

  private url: string = environment.url + '/curator';

  constructor(private httpClient: HttpClient) {
  }

  getAll(page: number, size: number): void {

  }

}
