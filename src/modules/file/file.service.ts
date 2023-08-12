import path from "path";
import { randomBytes } from "crypto";
import { readFile, writeFile, unlink } from "fs/promises";
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
    const filename = options.originalFilename
      ? options.originalFilename :
      randomBytes(16).toString('hex') + '.' + options.mimetype;
    const appendingDir = options.directory ? options.directory : '';

    return path.join(this.getCurrentDir(), appendingDir, filename);
  }

  /**
   * 
   * @param absolutePath Absolute path of a directory or a file
   * @returns Returns relative path
   */
  getRelativePathFromAbsolute(absolutePath: string) {
    return absolutePath.replace(
      this.getCurrentDir(),
      ''
    ).replaceAll('\\', '/');
  }

  /**
   * 
   * @param relativePath Relative path to remove a file
   * @returns void
   */
  getAbsolutePathFromRelative(relativePath: string) {
    return path.join(
      this.getCurrentDir(),
      relativePath
    );
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
  async readFile(path: string): Promise<Buffer> {
    return readFile(path);
  }

  /**
   * 
   * @param path Path used to store the file data
   * @param data Binary data
   * @returns Returns the stored path of file
   */
  async writeFile(path: string, data: Buffer): Promise<void> {
    return writeFile(path, data);
  }
}