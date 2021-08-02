export abstract class RepositoryInterface{
    abstract accessId: String;
    abstract appSecret?: String;
    abstract credentialsPath?: String;
    init(): void {
        
    }
}