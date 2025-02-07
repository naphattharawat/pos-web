import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PosService {
  api = environment.api;
  httpOptions: any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
      }),
    };
  }

  async getType() {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(this.api + `/pos/types`, this.httpOptions)
        .subscribe((data) => {
          resolve(data);
        });
    });

  }
  async getUsers() {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(this.api + `/pos/users`, this.httpOptions)
        .subscribe((data) => {
          resolve(data);
        });
    });

  }
  async scan(code: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(this.api + `/pos/scan?code=${code}`, this.httpOptions)
        .subscribe((data) => {
          resolve(data);
        });
    });
  }
  async add(code: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(this.api + `/pos/add`, { code }, this.httpOptions)
        .subscribe((data) => {
          resolve(data);
        });
    });
  }


  async order(products: any, type: any, price: any, net: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(this.api + `/pos/order`, { products, type, price, net }, this.httpOptions)
        .subscribe((data) => {
          resolve(data);
        });
    });
  }
  async addProduct(barcode: any, name: any, typeCode: any, price: any, userCode: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(this.api + `/pos/add-product`, { barcode, name, typeCode, price, userCode }, this.httpOptions)
        .subscribe((data) => {
          resolve(data);
        });
    });
  }
}
