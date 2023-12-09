interface IHoaDon {
    id: number;
    loai: string;
    id_hop_dong: number;
    id_nha: number | null;
    id_phong: number;
    id_hoa_don: number | null;
    id_hoa_don_tach: number | null;
    stt: number;
    id_user_tao: number | null;
    id_user_thu: number | null;
    ngay_thu: string | null;
    tu_ngay: string;
    den_ngay: string;
    so_ngay: number;
    so_dien_cu: number;
    so_dien_moi: number;
    so_luong_dien: number;
    gia_dien: number;
    thanh_tien_dien: number;
    so_dien_cu_1: number | null;
    so_dien_moi_1: number | null;
    so_luong_dien_1: number | null;
    gia_dien_1: number | null;
    thanh_tien_dien_1: number | null;
    so_nuoc_cu: number;
    so_nuoc_moi: number;
    so_luong_nuoc: number;
    gia_nuoc: number;
    thanh_tien_nuoc: number;
    so_nuoc_cu_1: number | null;
    so_nuoc_moi_1: number | null;
    so_luong_nuoc_1: number | null;
    gia_nuoc_1: number | null;
    thanh_tien_nuoc_1: number | null;
    so_luong_thue: number;
    gia_thue: number;
    thanh_tien_thue: number;
    so_luong_net: number;
    gia_net: number;
    thanh_tien_net: number;
    so_luong_xe: number;
    gia_xe: number;
    thanh_tien_xe: number;
    so_luong_rac: number;
    gia_rac: number;
    thanh_tien_rac: number;
    so_luong_khac: number;
    gia_khac: number;
    thanh_tien_khac: number;
    tien_khuyen_mai: number;
    tien_du_no: number;
    tong_tien: number;
    tong_tien_coc: number;
    tong_tien_thang: number;
    tong_tien_dien_nuoc: number;
    tong_tien_thue: number | null;
    tong_tien_phat: number | null;
    tong_tien_dien: number | null;
    tong_tien_nuoc: number | null;
    tong_tien_net: number | null;
    tong_tien_rac: number | null;
    tong_tien_xe: number | null;
    tong_tien_khac: number;
    tong_tien_km: number;
    tong_tien_thanh_toan: number;
    tong_tien_can_thanh_toan: number;
    tong_tien_du_no_cu: number;
    hinh_thuc: string | null;
    noi_dung: string | null;
    ghi_chu: string | null;
    id_folder: string | null;
    id_file: string | null;
    hinh_anh: string | null;
    hinh_anh_2: string | null;
    zns: number;
    thoi_gian_gui_zns: string | null;
    sms: number;
    thoi_gian_gui_sms: string | null;
    phat: number;
    tinh_trang_thu: string;
    id_user_ht: number | null;
    thoi_gian_hoan_thanh: string | null;
    del: number;
    da_thu: number;
    hien_thi_cdt: number;
    created_at: string;
    updated_at: string;
  }
  
  interface IThang {
    thang: string;
    hoa_don_thang: IHoaDon[];
    hoa_don_dien_nuoc: IHoaDon[];
    hoa_don_phat: IHoaDon[];
    hoa_don_coc: IHoaDon[];
    hoa_don_khac: IHoaDon[];
    hoa_don_km: IHoaDon[];
    hoa_don_thu: IHoaDon[];
    hoa_don_du_no_cu: IHoaDon[];
    hoa_don_du_no_moi: IHoaDon[];
    tong_tien: number;
  }
  
  interface IHoaDonData {
    allThang: {
      [key: string]: IThang;
    };
  }
  
  interface IHoaDonNow {
    id: number;
  }
  
  interface IHenThanhToan {
    // Define properties if available
  }
  
 export interface HoadonApi {
    status: string;
    data: {
      hoaDonNow: IHoaDonNow;
      henThanhToan: IHenThanhToan | null;
      allThang: IHoaDonData;
    };
  }

  export interface IHoaDonAllthangData {
    allThang: {
      [key: string]: IThang;
    },
  }