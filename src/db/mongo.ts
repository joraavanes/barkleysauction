import { MongoClient } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class MongoDbClient {
    private mongoClient: MongoClient;

    async getClient() {
        if (!this.mongoClient) {
            this.mongoClient = await MongoClient.connect(
                `mongodb+srv://${process.env.MONGO_USER_ID}:${process.env.MONGO_USER_PASSWORD}@cluster0-8jnyu.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
            );
        }
        return this.mongoClient;
    }
}
