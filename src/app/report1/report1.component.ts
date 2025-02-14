import { PosService } from './../pos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.css']
})
export class Report1Component implements OnInit {

  list: any = [];
  constructor(private posService: PosService) { }
  ngOnInit(): void {
    this.getReport();
  }

  async getReport() {
    try {
      const rs: any = await this.posService.getReport1();
      if (rs.ok) {
        this.list = rs.rows;
      }
    } catch (error) {

    }
  }
}
