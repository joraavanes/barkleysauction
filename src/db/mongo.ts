import { MongoClient } from 'mongodb';
import { Service } from 'typedi';

@Service()
export class MongoDbClient {
    private mongoClient: MongoClient;

    async getClient(): Promise<MongoClient> {
        const connString = this.getConnectionString();
        console.log(connString);
        if (!this.mongoClient) {
            this.mongoClient = await MongoClient.connect(connString, {
                ssl: true,
                sslValidate: true
            });
        }
        return this.mongoClient;
    }

    getConnectionString(): string {
        const isProd = process.env.NODE_ENV === 'production';

        if (!isProd)
            return `mongodb://localhost:27017/${process.env.MONGO_DB_NAME}`

        return `mongodb+srv://${process.env.MONGO_USER_ID}:${process.env.MONGO_USER_PASSWORD}@cluster0-8jnyu.mongodb.net/${process.env.MONGO_DB_NAME}?keepAlive=true&socketTimeoutMS=360000&connectTimeoutMS=360000&retryWrites=true&w=majority`;
    }
}
