export interface JwtInterface {
  // eslint-disable-next-line @typescript-eslint/ban-types
  sign(payload: string | Buffer | object): string;
}
