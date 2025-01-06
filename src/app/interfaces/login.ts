export interface LoginResponse {
    userName: string;
    email: string;
    accessToken: string;
    createdUtcDateTime: Date;
    refreshToken: string;
    expiresOnAccessToken: Date;
    expiresOnRefreshToken: Date;
}