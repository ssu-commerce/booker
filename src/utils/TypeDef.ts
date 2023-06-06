export interface AuthInfo {
  id: string;
  roles: Array<number>;
}

export interface JwtTokenDto {
  token: string;
  expiredIn: number;
}

export interface SessionToken {
  accessToken: JwtTokenDto;
  refreshToken: JwtTokenDto;
}
