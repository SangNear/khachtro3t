interface SuCo {
    id: number;
    id_parent: number | null;
    id_nhom_cv: number;
    nhom_nv: string;
    id_user_tao: number;
    id_nha: number;
    ten_nha: string;
    ma_phong: string;
    muc_do: string;
    mo_ta: string;
    ngay_giao: string | null;
    thoi_gian_co_nha: string[];
    ngay_co_nha: string[];
    ngay_hoan_thanh: string | null;
    id_user_ht: number | null;
    trang_thai: string;
    so_ngay_tre: number;
    ghi_chu: string | null;
    cong_viec: string | null;
    id_hop_dong: number;
    id_khach: number;
    id_danh_gia: number | null;
    khach_bao: number;
    ly_do_huy: string | null;
    id_kiem_tra: number | null;
    created_at: string;
    updated_at: string;
    nhom_cv: string;
    danh_gia: string | null;
  }
  
  interface SuCoData {
    allSuCo: SuCo[];
  }
  
export interface ListSucoApi {
    status: string;
    data: SuCoData;
  }