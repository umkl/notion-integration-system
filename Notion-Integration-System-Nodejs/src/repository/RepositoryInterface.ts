export abstract class RepositoryInterface{
    abstract accessId: String;
    abstract appSecret?: String;
    abstract credentialsPath?: String;
    abstract data: any[];
    init(): void {
        
    }
}