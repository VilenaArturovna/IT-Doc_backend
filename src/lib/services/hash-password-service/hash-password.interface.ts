export interface HashPasswordInterface {
  hash(password: string): Promise<string>;
  compare(decrypted: string, encrypted: string): Promise<boolean>;
}
