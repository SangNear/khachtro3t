export interface HoaDon {
  id: number;
  tong_tien: number;
  loai: string;
  so_nuoc_cu: number;
  so_nuoc_moi: number;
  thanh_tien_nuoc: number;
  so_dien_cu: number;
  so_dien_moi: number;
  thanh_tien_dien: number;
  so_nuoc_cu_1: number;
  so_nuoc_moi_1: number;
  thanh_tien_nuoc_1: number;
  so_dien_cu_1: number;
  so_dien_moi_1: number;
  thanh_tien_dien_1: number;
  so_ngay: number;
  thanh_tien_xe: number;
  thanh_tien_rac: number;
  thanh_tien_net: number;
  thanh_tien_thue: number;
  tu_ngay: string,
  den_ngay: string
  gia_dien: number,
  gia_dien_1: number,
  gia_nuoc: number
  gia_nuoc_1: number
  gia_xe: number,
  gia_rac: number,
  gia_net: number

}

export interface HoadonThu {
  id: number;
  tong_tien: number;
  loai: string;
  tinh_trang_thu: string
  thanh_tien_khac: number;
  tien_khuyen_mai: number;
  created_at: string;
  sms: number;
  zns: number;
  thoi_gian_gui_sms: string | null;
  thoi_gian_gui_zns: string | null;
  hinh_thuc: string // Thay thế bằng các giá trị thực tế của hình thức thanh toán
  hen_thanh_toan: string | null;
}

export interface ThangData {
  thang: string;
  hoa_don_du_no_cu: number;
  all_hoa_don_tu_ngay: HoaDon[];
  all_hoa_don_created_at: HoaDon[];
  hoa_don_thang: HoaDon[];
  hoa_don_dien_nuoc: HoaDon[];
  hoa_don_phat: number;
  hoa_don_coc: HoaDon[];
  hoa_don_khac: HoaDon[];
  hoa_don_km: HoaDon[];
  hoa_don_thu: HoadonThu[];
  hoa_don_du_no_moi: HoaDon[];
  tong_tien: number;
}

export interface HoaDonNow {
  id: number;
}

export interface HenThanhToan {
  // Add properties if needed
}

export interface ApiHoaDonResponse {
  status: string;
  data: {
    allThang: ThangData[];
    hoaDonNow: HoaDonNow;
    henThanhToan: HenThanhToan | null;
  };
}