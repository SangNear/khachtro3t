export interface DataApi {
  created_at: string;
  gia_thue: number;
  gui_xac_nhan_khach: number;
  han_hop_dong: string;
  han_thanh_toan: string;
  id: number;
  id_cong_viec: null | number;
  id_ctv_sale: null | number;
  id_nguoi_dan: null | number;
  id_nhan_vien_ky: number;
  id_nhan_vien_sale: null | number;
  id_phieu_chi: null | number;
  id_phong: number;
  id_user_tao: number;
  id_user_tao_coc: number | null;
  id_user_tao_thue: number;
  link_video: null | string;
  list_gia: string;
  ly_do_huy_giu: null | string;
  ma_hop_dong: string;
  ngay_gui: string;
  ngay_het_han: string;
  ngay_ky: string;
  ngay_tao_hoa_don: string;
  ngay_thanh_ly: null | string;
  ngay_xac_nhan: string;
  otp: string;
  phone_gui: string;
  phong: {
    avatar: string;
    ban_cong: number;
    bep: number;
    bep_chung: number;
    bon_rua_chen: number;
    cua_so: number;
    dang_tin_tro4u: number;
    dang_tin_uthang: number;
    dien_tich: null | number;
    facebook_1: null | string;
    facebook_2: null | string;
    gac: number;
    ghi_chu: string;
    gia: number;
    gia_coc: null | number;
    gia_dien: number;
    gia_khac: number;
    gia_may_giat: number;
    gia_nuoc: number;
    gia_rac: number;
    gia_the: number;
    gia_wifi: number;
    gia_xe: number;
    gio_giac: null | string;
    giuong: number;
    id: number;
    id_nha: number;
    id_user: number;
    is_quan_ly: number;
    khoa_van_tay: number;
    lau: number;
    loai: string;
    may_giat: number;
    may_giat_chung: number;
    may_lanh: number;
    nem: number;
    ngay_bao_tra: null | string;
    ngay_cho_thue: string;
    ngay_giu_cho: string;
    ngay_trong: null | string;
    ngay_trong_phat: null | string;
    noi_that: null | string;
    noi_that_khac: null | string;
    nuoc_nong: number;
    nuoi_thu_cung: number;
    san_phoi: number;
    show_ctv: number;
    ten: string;
    thang_may: number;
    thumbnail: null | string;
    tien_ich: null | string;
    tinh_trang: string;
    tinh_trang_san_pham: string;
    tivi: number;
    tollet: number;
    tu_lanh: number;
    tu_lanh_chung: number;
    tu_quan_ao: number;
    updated_at: string;
    website_1: null | string;
    website_2: null | string;
    nha: {
      id: number;
      id_user: number;
      nhom: string;
      id_khu: number;
      tinh_trang: string;
      ten: string;
      so_lau: number;
      id_tinh_thanh: number;
      id_quan_huyen: number;
      id_phuong_xa: number;
      dia_chi: string;
      avatar: string;
      quan_ly_1: string;
      quan_ly_2: string | null;
      link_gioi_thieu: string;
      vi_tri: string;
      video: string | null;
      gia_dien: number;
      gia_nuoc: number;
      gia_xe: number;
      gia_rac: number;
      gia_wifi: number;
      gia_may_giat: number;
      gia_the: number;
      gia_khac: number;
      ngay_tinh_so_lieu: string | null;
      del: number;
      created_at: string;
      updated_at: string;
    }
  };
  so_lan_gui_otp: number;
  tai_san_ban_giao: null | string;
  thanh_toan: string;
  theo_doi: string;
  thoi_gian_coc: string;
  thoi_gian_thue: string;
  tien_coc: number;
  tien_phu_phi: number;
  tinh_trang_hop_dong: string;
  tra_coc: number;
  updated_at: string;
  video_checkin: null | string;
  video_checkout: null | string;
  zns_canh_bao_du_no_lan_1: number;
  zns_canh_bao_du_no_lan_2: number;
}
export interface DataApiFalse {
  status: string
  message : string
}
export interface LoginApi {
  status: string
  data: DataApi[]
}

interface Phong {
  id: number;
  id_user: number;
  id_nha: number;
  lau: number;
  loai: string;
  tinh_trang: string;
  ten: string;
  dien_tich: number | null;
  gia: number;
  gia_coc: number | null;
  avatar: string | null;
  thumbnail: string | null;
  ghi_chu: string | null;
  facebook_1: string | null;
  facebook_2: string | null;
  website_1: string | null;
  website_2: string | null;
  tinh_trang_san_pham: string;
  ngay_bao_tra: string | null;
  ngay_giu_cho: string;
  ngay_cho_thue: string;
  ngay_trong: string;
  ngay_trong_phat: string;
  show_ctv: number;
  dang_tin_tro4u: number;
  dang_tin_uthang: number;
  gia_dien: number;
  gia_nuoc: number;
  gia_xe: number;
  gia_rac: number;
  gia_wifi: number;
  gia_may_giat: number;
  gia_the: number;
  gia_khac: number;
  gac: number;
  tu_lanh: number;
  tu_lanh_chung: number;
  bep: number;
  bep_chung: number;
  giuong: number;
  chung_chu: number;
  cua_so: number;
  tivi: number;
  bon_rua_chen: number;
  nem: number;
  thang_may: number;
  ban_cong: number;
  may_giat: number;
  may_giat_chung: number;
  nuoc_nong: number;
  tu_quan_ao: number;
  nuoi_thu_cung: number;
  may_lanh: number;
  tollet: number;
  san_phoi: number;
  khoa_van_tay: number;
  gio_giac: string | null;
  noi_that_khac: string | null;
  tien_ich: string | null;
  noi_that: string | null;
  is_quan_ly: number;
  created_at: string;
  updated_at: string;
  nha: Nha;
}

interface Nha {
  id: number;
  id_user: number;
  nhom: string;
  id_khu: number | null;
  tinh_trang: string;
  ten: string;
  so_lau: number;
  id_tinh_thanh: number;
  id_quan_huyen: number;
  id_phuong_xa: number;
  dia_chi: string;
  avatar: string;
  quan_ly_1: string | null;
  quan_ly_2: string | null;
  link_gioi_thieu: string | null;
  vi_tri: string | null;
  video: string | null;
  gia_dien: number;
  gia_nuoc: number;
  gia_xe: number;
  gia_rac: number;
  gia_wifi: number;
  gia_may_giat: number;
  gia_the: number;
  gia_khac: number;
  ngay_tinh_so_lieu: string;
  del: number;
  created_at: string;
  updated_at: string;
}

export interface HopDong {
  id: number;
  id_user_tao: number;
  id_phong: number;
  ma_hop_dong: string;
  tinh_trang_hop_dong: string;
  theo_doi: string;
  tien_coc: number;
  tien_phu_phi: number;
  gia_thue: number;
  tra_coc: number;
  ngay_ky: string;
  ngay_het_han: string;
  ngay_tao_hoa_don: string | null;
  ngay_thanh_ly: string | null;
  han_thanh_toan: string | null;
  thanh_toan: string | null;
  ly_do_huy_giu: string | null;
  id_nhan_vien_sale: number | null;
  id_ctv_sale: number | null;
  id_nguoi_dan: number | null;
  id_nhan_vien_ky: number | null;
  id_user_tao_coc: number;
  id_user_tao_thue: number | null;
  thoi_gian_coc: string;
  thoi_gian_thue: string | null;
  link_video: string | null;
  video_checkin: string | null;
  video_checkout: string | null;
  tai_san_ban_giao: string | null;
  id_cong_viec: number | null;
  gui_xac_nhan_khach: number;
  id_phieu_chi: number | null;
  han_hop_dong: string;
  list_gia: string;
  otp: string;
  phone_gui: string;
  ngay_gui: string;
  ngay_xac_nhan: string | null;
  so_lan_gui_otp: number;
  zns_canh_bao_du_no_lan_1: number;
  zns_canh_bao_du_no_lan_2: number;
  created_at: string;
  updated_at: string;
  phong: Phong;
}

export interface KhachHangHopDong {
  id: number;
  id_hop_dong: number;
  ten_khach: string;
  sdt_khach: string;
  id_folder: number | null;
  id_file: number | null;
  avatar: string | null;
  van_tay: string | null;
  gioi_tinh: string | null;
  ngay_sinh: string | null;
  cccd: string | null;
  dia_chi_thuong_tru: string | null;
  xe: string | null;
  nguoi_dai_dien: number;
  ngay_vo: string | null;
  ngay_ra: string | null;
  tinh_trang: string;
  dac_biet: number;
  ghi_chu: string | null;
  created_at: string;
  updated_at: string;
}

export interface Datalogin {
  status: string;
  data: {
    allHopDong: HopDong[];
    allKhachHD: KhachHangHopDong[];
  };
}



