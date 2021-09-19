export abstract class RepositoryInterface {
  abstract accessId: string;
  abstract appSecret?: string;
  
  init(): void {}
}
