import { AlertService } from '../alert.service';
import { PosService } from './../pos.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-pos-sell',
  templateUrl: './pos-sell.component.html',
  styleUrls: ['./pos-sell.component.css']
})
export class PosSellComponent implements OnInit {
  constructor(
    private posService: PosService,
    private alertService: AlertService
  ) { }

  items: any = [];
  item: any = {};
  barcode: any;
  userSelected: any;
  users: any = [{}];
  type: any = [{}];
  typeSelected: any;
  price: any = '';
  modalDiscount = false
  net: any = '';
  modalCash = false;
  async ngOnInit() {
    await this.getTypes();
    await this.getUsers();
  }

  async getTypes() {
    try {
      const rs: any = await this.posService.getType();
      if (rs.ok) {
        console.log(rs.rows);

        this.type = rs.rows;
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
  onClickNum(number: any) {
    if (number == 'delete') {
      console.log(this.price.length);

      if (this.price.length) {
        this.price = this.price.slice(0, -1);
      }
    } else {
      this.price += number;

    }
  }

  async onScanBarcode(event: any) {
    console.log(event);

    if (event.keyCode == 13) {
      this.barcode = this.barcode.padStart(13, "0")
      const rs: any = await this.posService.scan(this.barcode);
      if (rs.ok) {
        this.barcode = '';
        this.items.push({
          name: rs.rows.name,
          code: rs.rows.barcode,
          price: rs.rows.price,
          qty: 1
        })
      } else {
        this.barcode = '';
        console.log(rs.error);
        this.alertService.error(rs.error);
      }
    }
  }

  async onClickAdd() {
    try {
      const code = `${this.userSelected.code}${this.typeSelected.code}${this.price.padStart(8, "0")}9`;
      const rs: any = await this.posService.add(code);
      if (rs.ok) {
        this.price = '';
        this.items.push({
          name: rs.rows.name,
          code: rs.rows.barcode,
          price: rs.rows.price,
          qty: 1
        })
      }
    } catch (error: any) {
      this.alertService.error(error);
    }
  }

  sum() {
    let price = 0;
    for (const i of this.items) {
      price += i.qty * (i.net ? i.net : i.price);
    }
    return price;
  }

  async onClickOrder() {
    // let typename = '';
    // if (type == 'cash') {
    //   typename = 'เงินสด';
    // } else {
    //   typename = type;
    // }
    // const confirm = await this.alertService.confirm(`จำนวน ${this.items.length} ชิ้น รวมทั้งหมด ${this.sum()} บาทจ่ายด้วย ${typename}`);
    // if (confirm) {

    // }
    this.net = '';
    this.modalCash = true;
  }

  openModalDiscount(item: any) {
    item.net = '';
    this.item = _.cloneDeep(item);
    this.modalDiscount = true;
  }

  onClickNumModal(number: any) {
    if (number == 'delete') {
      if (this.item.net.length) {
        this.item.net = this.item.net.slice(0, -1);
      }
    } else {
      this.item.net += number;
    }
  }
  onClickNumModalCash(number: any) {
    if (number == 'delete') {
      if (this.net.length) {
        this.net = this.net.slice(0, -1);
      }
    } else {
      this.net += number;
    }
  }

  saveDiscount() {
    const idx = _.findIndex(this.items, { code: this.item.code })
    if (idx > -1) {
      this.items[idx].net = this.item.net;
    }
    this.modalDiscount = false;
  }

  async onPay(type: any) {
    try {
      console.log(this.net, +this.net);

      const rs: any = await this.posService.order(this.items, type, this.sum(), +this.net ? this.net : this.sum())
      if (rs.ok) {
        this.modalCash = false;
        this.items = [];
        this.alertService.success();
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error: any) {
      this.alertService.error(error)
    }
  }
  remove(code: any) {
    const idx = _.findIndex(this.items, { 'code': code });
    if (idx > -1) {
      this.items.splice(idx, 1);
    }
  }
}
