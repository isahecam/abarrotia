export interface AuthRepository {
  userExists(email: string): Promise<boolean>;
}
