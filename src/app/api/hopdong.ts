interface HopDong {
  id: number;
  id_user_tao: number;
  id_phong: number;
  ma_hop_dong: string;
  tinh_trang_hop_dong: string;
  theo_doi: null | any;
  tien_coc: number;
  tien_phu_phi: number;
  gia_thue: number;
  tra_coc: number;
  ngay_ky: string;
  ngay_het_han: string;
  ngay_tao_hoa_don: string | null;
  ngay_thanh_ly: string | null;
  han_thanh_toan: string;
  thanh_toan: string;
  ly_do_huy_giu: null | any;
  id_nhan_vien_sale: null | any;
  id_ctv_sale: null | any;
  id_nguoi_dan: null | any;
  id_nhan_vien_ky: null | any;
  id_user_tao_coc: null | any;
  id_user_tao_thue: null | any;
  khach: KhachHang
  lich_su_tao_coc: Lichsutaococ
  thoi_gian_coc: null | any;
  thoi_gian_thue: null | any;
  link_video: null | any;
  video_checkin: null | any;
  video_checkout: null | any;
  tai_san_ban_giao: null | any;
  id_cong_viec: null | any;
  gui_xac_nhan_khach: number;
  id_phieu_chi: null | any;
  han_hop_dong: null | any;
  list_gia: null | any;
  otp: null | any;
  phone_gui: null | any;
  ngay_gui: null | any;
  ngay_xac_nhan: null | any;
  so_lan_gui_otp: null | any;
  zns_canh_bao_du_no_lan_1: number;
  zns_canh_bao_du_no_lan_2: number;
  created_at: string;
  updated_at: string;
  phong: Phong;
  user_nhan_vien_sale: null | any;
  user_tao: UserTao;
  all_hoa_hon: HoaDonHopdong[];
}

interface Phong {
  id: number;
  id_user: number;
  id_nha: number;
  lau: number;
  loai: string;
  tinh_trang: string;
  ten: string;
  dien_tich: null | any;
  gia: number;
  gia_coc: number;
  avatar: string;
  thumbnail: string;
  ghi_chu: string;
  facebook_1: string;
  facebook_2: null | any;
  website_1: null | any;
  website_2: null | any;
  tinh_trang_san_pham: string;
  ngay_bao_tra: null | any;
  ngay_giu_cho: null | any;
  ngay_cho_thue: string;
  ngay_trong: null | any;
  ngay_trong_phat: null | any;
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
  gio_giac: null | any;
  noi_that_khac: null | any;
  tien_ich: string;
  noi_that: string;
  is_quan_ly: number;
  created_at: string;
  updated_at: string;
}

interface UserTao {
  id: number;
  id_loai_user: number;
  id_cho4u: null | any;
  group_user: string;
  tinh_trang: string;
  name: string;
  full_name: string;
  phone: string;
  email: null | any;
  avatar: string;
  ngay_sinh: string;
  ngay_lam: string;
  password: string;
  password_confirm: null | any;
  login_token: null | any;
  remember_token: string;
  user_token: null | any;
  phan_quyen: string;
  cap_nha: null | any;
  xu: number;
  vi: number;
  vi_cong_ty: number;
  ghi_chu: string;
  facebook: null | any;
  zalo: null | any;
  del: number;
  created_at: string;
  updated_at: string;
}
interface Lichsutaococ {
  created_at: string;
  id: number;
  id_hop_dong: number;
  id_user: number;
  message: string;
  name: string;
  updated_at: string;
}

interface KhachHang {
  id: number;
  id_hop_dong: number;
  ten_khach: string;
  sdt_khach: string;
  id_folder: string;
  id_file: string;
  avatar: string;
  van_tay: null | any;
  gioi_tinh: number;
  ngay_sinh: string;
  cccd: string;
  dia_chi_thuong_tru: string;
  xe: string;
  nguoi_dai_dien: number;
  ngay_vo: string;
  ngay_ra: string;
  tinh_trang: string;
  dac_biet: number;
  ghi_chu: null | any;
  created_at: string;
  updated_at: string;
}

interface HoaDonHopdong {
  created_at: string;
  da_thu: number;
  del: number;
  den_ngay: string;
  ghi_chu: null | any;
  gia_dien: number;
  gia_dien_1: null | any;
  gia_khac: number;
  gia_net: number;
  gia_nuoc: number;
  gia_nuoc_1: null | any;
  gia_rac: number;
  gia_thue: number;
  gia_xe: number;
  hien_thi_cdt: number;
  hinh_anh: string;
  hinh_anh_2: null | any;
  hinh_thuc: string;
  id: number;
  id_file: null | any;
  id_folder: null | any;
  id_hoa_don: number;
  id_hoa_don_tach: null | any;
  id_hop_dong: number;
  id_nha: number;
  id_phong: number;
  id_user_ht: number;
  id_user_tao: number;
  id_user_thu: number;
  loai: string;
  ngay_thu: null | any;
  noi_dung: null | any;
  phat: number;
  sms: number;
  so_dien_cu: number;
  so_dien_cu_1: null | any;
  so_dien_moi: number;
  so_dien_moi_1: null | any;
  so_luong_dien: number;
  so_luong_dien_1: null | any;
  so_luong_khac: number;
  so_luong_net: number;
  so_luong_nuoc: number;
  so_luong_nuoc_1: null | any;
  so_luong_rac: number;
  so_luong_thue: number;
  so_luong_xe: number;
  so_ngay: number;
  so_nuoc_cu: number;
  so_nuoc_cu_1: null | any;
  so_nuoc_moi: number;
  so_nuoc_moi_1: null | any;
  stt: number;
  thanh_tien_dien: number;
  thanh_tien_dien_1: null | any;
  thanh_tien_khac: number;
  thanh_tien_net: number;
  thanh_tien_nuoc: number;
  thanh_tien_nuoc_1: null | any;
  thanh_tien_rac: number;
  thanh_tien_thue: number;
  thanh_tien_xe: number;
  thoi_gian_gui_sms: null | any;
  thoi_gian_gui_zns: null | any;
  thoi_gian_hoan_thanh: string;
  tien_du_no: number;
  tien_khuyen_mai: number;
  tinh_trang_thu: string;
  tong_tien: number;
  tong_tien_can_thanh_toan: number;
  tong_tien_coc: number;
  tong_tien_dien: null | any;
  tong_tien_dien_nuoc: number;
  tong_tien_du_no_cu: number;
  tong_tien_khac: number;
  tong_tien_km: number;
  tong_tien_net: null | any;
  tong_tien_nuoc: null | any;
  tong_tien_phat: null | any;
  tong_tien_rac: null | any;
  tong_tien_thang: number;
  tong_tien_thanh_toan: number;
  tong_tien_thue: null | any;
  tong_tien_xe: null | any;
  tu_ngay: string;
  updated_at: string;
}

interface ApiHopdongResponse {
  status: string;
  data: {
    hopDong: HopDong;
    allKhachHD: KhachHang[];
    tienThangDau: number,
    tongDaDua: number,
    tongThanhToan: number
  };
}