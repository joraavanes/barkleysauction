import { Container } from 'typedi';
import { FileService } from './file.service';

const fileService = Container.get(FileService);

export {
  fileService
}