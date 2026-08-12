import fs from "node:fs";
import * as XCore from "@xpell/core";
import { Buffer } from "node:buffer";
import path from "node:path";

const _xlog = (XCore as any)._xlog as Pick<Console, "log" | "warn" | "error" | "debug">;

type XUtilsBase = {
  get_path(obj: unknown, path: string | string[], fallback?: any): any;
  set_path(obj: Record<string, any>, path: string | string[], value: any): Record<string, any>;
  deepMergeDefaults<T>(data: Partial<T> | undefined, defaults: T): T;
};

const XUtilsBase = (XCore as any)._XUtils as new () => XUtilsBase;

export class _XNUtils extends XUtilsBase {
  /**
   * Encode string to Base-64 format
   * @param str string to encode
   */
  encode(str: string): string {
    return Buffer.from(encodeURIComponent(str), "utf8").toString("base64");
  }


  /**
   * Decode Base64 String to text
   * @param str Base64 encoded string
   */
  decode(str: string): string {
    return decodeURIComponent(Buffer.from(str, "base64").toString("utf8"));
  }



  /**
   * Checks if folders exist and creates them if not (supports nested folders)
   */
  checkFolders(folders: string[]) {
    if (!Array.isArray(folders)) return;

    for (const folderPath of folders) {
      if (!folderPath) continue;
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        _xlog.log("Creating folder " + folderPath);
      }
    }
  }

  pathJoin(...parts: string[]) {
    const jp = path.join(...parts);
    if (!jp.endsWith(path.sep)) return jp + path.sep;
    return jp;
  }

  copyDirRecursive(src: string, dest: string) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, {
      withFileTypes: true
    });

    for (const entry of entries) {
      const src_path = path.join(src, entry.name);
      const dest_path = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        this.copyDirRecursive(
          src_path,
          dest_path
        );
      } else {
        fs.copyFileSync(
          src_path,
          dest_path
        );
      }
    }
  }

  normalizePrompt(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim();
}

}

const XUtils = new _XNUtils();
const _xu = XUtils;

export { XUtils, _xu };
export default XUtils;
