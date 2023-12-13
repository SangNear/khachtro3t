export interface HoaDon {
  id: number;
  tong_tien: number;
  loai: string;
  thanh_tien_nuoc: number;
  thanh_tien_dien: number;
  thanh_tien_nuoc_1: number | null;
  thanh_tien_dien_1: number | null;
  so_ngay: number;
  tinh_trang_thu?: string;
  thanh_tien_khac?: number;
  tien_khuyen_mai?: number;
  created_at?: string;
  sms?: number;
  zns?: number;
  thoi_gian_gui_sms?: string | null;
  thoi_gian_gui_zns?: string | null;
  hen_thanh_toan?: string | null;
}

export interface ThangHientai {
  [thang: string]: {
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
      hoa_don_thu: HoaDon[];
      hoa_don_du_no_moi: HoaDon[];
      tong_tien: number;
  };
}

interface Data {
  allThang: ThangHientai;
  hoaDonNow: {
      id: number;
  };
  henThanhToan: string | null;
}

export interface AllHoadonChitietApi {
  status: string;
  data: Data;
}