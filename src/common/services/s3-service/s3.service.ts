import {
  DeleteObjectOutput,
  DeleteObjectsCommand,
  DeleteObjectsCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';

export class S3Service {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.client = new S3Client({
      region: this.configService.get<string>('timeweb.region'),
      credentials: {
        accessKeyId: this.configService.get<string>('timeweb.accessKeyId'),
        secretAccessKey: this.configService.get<string>(
          'timeweb.secretAccessKey',
        ),
      },
      endpoint: this.configService.get<string>('timeweb.endpoint'),
    });
    this.bucket = this.configService.get<string>('timeweb.publicBucket');
  }

  async getFileKeyFromUrl(url: string): Promise<string> {
    return new URL(url).pathname.substring(1);
  }

  async deleteObjects(filekeys: string[]): Promise<DeleteObjectOutput> {
    const input: DeleteObjectsCommandInput = {
      Bucket: this.bucket,
      Delete: {
        Objects: filekeys.map((key) => ({ Key: key })),
        Quiet: false,
      },
    };
    const command = new DeleteObjectsCommand(input);
    return this.client.send(command);
  }

  async getSignedUrl(filekey: string): Promise<string> {
    const input: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: filekey,
    };
    const command = new PutObjectCommand(input);

    return getSignedUrl(this.client, command);
  }
}
