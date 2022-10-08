import { MongoClient } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class MongoDbClient {
    private mongoClient: MongoClient;

    async getClient() {
        if (!this.mongoClient) {
            this.mongoClient = await MongoClient.connect(
                'mongodb://localhost:27017/barkleysauction'
            );
        }
        return this.mongoClient;
    }
}
