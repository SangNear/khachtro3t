export interface OtpResponse {
    status: number,
    message: string,
    data: {
        otp: string
    }
}
export interface OtpResponseSubmit {
    status: string,
    message: string,

}