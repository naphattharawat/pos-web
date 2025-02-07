import { Injectable } from '@angular/core';
import { default as swal } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  // private escapeHtml(text: string) {
  //   const map: any = {
  //     '&': '&amp;',
  //     '<': '&lt;',
  //     '>': '&gt;',
  //     '"': '&quot;',
  //     "'": '&#039;',
  //   };
  //   return text.replace(/[&<>"']/g, (m) => map[m]);
  // }

  error(text: string = 'เกิดข้อผิดพลาด', title: string = '', timer: number | null = null) {
    const option: any = {
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'ตกลง'
    };
    if (timer) {
      option.timer = timer;
    }
    swal.fire(option);

  }

  info(text: string) {
    swal.fire({
      text: text,
      icon: 'info',
      confirmButtonText: 'ตกลง'
    });
  }

  success(title: string = 'ดำเนินการเสร็จเรียบร้อย', text: string = '') {
    swal.fire({
      title: title,
      text: text,
      timer: 1000,
      icon: 'success',
      confirmButtonText: 'ตกลง'
    });
  }

  serverError() {
    swal.fire({
      title: 'เกิดข้อผิดพลาด',
      text: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
      icon: 'error',
      confirmButtonText: 'ตกลง'
    });
  }

  async confirm(text: string = 'คุณต้องการดำเนินการนี้ ใช่หรือไม่?') {
    const option: any = {
      title: '',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ดำเนินการ!',
      cancelButtonText: 'ยกเลิก'
    };

    const result = await swal.fire(option);
    return !!result.value;
  }

  async showLoading() {
    await swal.fire({
      title: 'ประมวลผล!',
      html: 'กรุณารอซักครู่ระบบกำลังประมวลผล.',
      allowOutsideClick: false,
      didOpen: () => {
        swal.showLoading();
      }
    });
  }
}
