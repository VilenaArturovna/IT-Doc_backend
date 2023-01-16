export interface JwtInterface {
  sign(payload: string | Buffer | Record<string, unknown>): string;
}
