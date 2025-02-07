import { Component, OnInit } from '@angular/core';
import { PosService } from '../pos.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  types: any = [];
  users: any = [];
  price: any = '';
  name: any = '';

  code: any = '';
  typeSelected: any;
  userSelected: any;
  constructor(
    private posService: PosService,
    private alertService: AlertService
  ) { }
  async ngOnInit() {
    await this.getTypes();
    await this.getUsers();
  }

  async getTypes() {
    try {
      const rs: any = await this.posService.getType();
      if (rs.ok) {
        this.types = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error: any) {
      this.alertService.error(error);
    }
  }
  async getUsers() {
    try {
      const rs: any = await this.posService.getUsers();
      if (rs.ok) {
        this.users = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error: any) {
      this.alertService.error(error);
    }
  }
  async onKey(e: any) {
    if (e.keyCode == 13 && this.price) {
      const rs: any = await this.posService.addProduct(this.code, this.name, this.typeSelected.code, this.price, this.userSelected.code);
      if (rs.ok) {
        this.code = '';
        this.alertService.success();
      } else {
        this.alertService.error(rs.error);
      }
    }
  }
}
