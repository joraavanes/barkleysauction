import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class CreateUserPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
