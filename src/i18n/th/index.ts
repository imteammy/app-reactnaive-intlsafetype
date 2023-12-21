import type { BaseTranslation } from '../i18n-types';

const th = {
  // TODO: your translations go here
  common: {
    username: 'ชื่อผู้ใช้งาน',
    email: 'อีเมล์',
    password: 'รหัสผ่าน',
    passwordConfirm: 'ยืนยันรหัสผ่าน',
    login: 'เข้าสู่ระบบ',
    register: 'สมัครสมาชิก',
    reset: {
      main: 'รีเซ็ท',
    },
  },
  HI: 'สวัสดี {name:string}!',
  validation: {
    invalidEmail: 'อีเมลล์ไม่ถูกต้อง',
    required: 'กรุณาระบุ{field:string}',
    min: {
      string: 'กรุณาระบุ{name:string}อย่างน้อย {min:number} ตัวอักษร',
    },
  },
} satisfies BaseTranslation;

export default th;
