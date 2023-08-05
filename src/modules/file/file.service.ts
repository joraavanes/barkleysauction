import path from "path";
import { randomBytes } from "crypto";
import { readFile, writeFile } from "fs/promises";
import { Service } from "typedi";

@Service()
export class FileService {
  constructor() { }

  /**
   * @returns Returns current directory of running node app
   */
  getCurrentDir() {
    return process.cwd();
  }

  /**
   * 
   * @param options 
   * @returns Returns the path to store the file
   */
  getFilePath(options: { originalFilename?: string | null, mimetype: string, directory?: string }): string {
    const filename = options.originalFilename ? options.originalFilename : randomBytes(16).toString('hex');
    const appendingDir = options.directory ? options.directory : '';

    return path.join(this.getCurrentDir(), appendingDir, filename, options.mimetype);
  }

  /**
   * 
   * @param data Binary data
   * @returns Returns size of data in Kb
   */
  getDataSize(data: Buffer) {
    return Buffer.byteLength(data) / 1024;
  }

  /**
   * 
   * @param path Path to read file data
   * @returns Return Buffer object
   */
  readFile(path: string) {
    return readFile(path, { encoding: 'utf-8' });
  }

  /**
   * 
   * @param path Path used to store the file data
   * @param data Binary data
   * @returns Returns the stored path of file
   */
  async writeFile(path: string, data: Buffer) {
    return writeFile(path, data, {
      encoding: 'utf-8'
    });
  }
}