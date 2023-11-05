import { S3Client, PutObjectCommand, DeleteObjectCommand, PutObjectCommandOutput } from "@aws-sdk/client-s3";
import { Service } from "typedi";

@Service()
export class CloudStorage {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: "default",
      endpoint: String(process.env.S3_ENDPOINT),
      credentials: {
        accessKeyId: String(process.env.S3_ACCESS_KEY),
        secretAccessKey: String(process.env.S3_SECRET_KEY),
      },
    })
  }

  async putMediaObject(content: Buffer, filename: string, bucket?: string): Promise<PutObjectCommandOutput | string> {
    try {
      const putObject = new PutObjectCommand({
        Bucket: bucket ?? String(process.env.S3_BUCKET_NAME),
        Key: filename,
        Body: content
      });

      const result = await this.client.send(putObject);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteMediaObject(filename: string) {
    try {
      const Key = filename.replace(`${process.env.S3_HOSTNAME}/`, '').trim();

      const deleteObject = new DeleteObjectCommand({
        Bucket: String(process.env.S3_BUCKET_NAME),
        Key
      });

      return this.client.send(deleteObject);
      
    } catch (error) {
      throw error;
    }
  }

}