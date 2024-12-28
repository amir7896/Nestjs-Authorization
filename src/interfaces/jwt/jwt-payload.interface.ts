export interface JwtPayload {
  username: string;
  role: string;
  sub?: string;
}
