import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {
  private url: string = 'http://localhost:8090/api/';

  constructor(public http: HttpClient) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
  }

  getAll(txtSearch: string = '') {
    let aux: string = txtSearch ? `/${txtSearch}` : '';
    return this.http.get(this.url + 'personal/getAll' + aux);
  }

  updatePersonal(id: number, body: {}) {
    return this.http.put(this.url + 'personal/update/' + id, body);
  }

  deletePersona(id: number | any) {
    return this.http.delete(this.url + 'personal/delete/' + id);
  }

  insertPersona(body: {}) {
    return this.http.post(this.url + 'personal/insert', body);
  }

  getChartPie() {
    return this.http.get(this.url + 'getChartPie');
  }

  getChartBar() {
    return this.http.get(this.url + 'getChartBar');
  }

  getAutoPersonal(id_persona: number | any) {
    return this.http.get(this.url + 'autoPersonal/' + id_persona);
  }

  updateAutoPersonal(id_auto: number, body: {}) {
    return this.http.put(this.url + 'autoPersonal/update/' + id_auto, body);
  }

  deleteAutoPersona(id_auto: number) {
    return this.http.delete(this.url + 'autoPersonal/delete/' + id_auto);
  }

  insertAutoPersona(body: {}) {
    return this.http.post(this.url + 'autoPersonal/insert', body);
  }
}
