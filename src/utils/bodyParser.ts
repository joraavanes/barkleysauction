import formidable, { Files } from "formidable";
import { NextApiRequest } from "next";

export const parseBody = (
  req: NextApiRequest
): Promise<{ fields: any, files: Files }> => {
  const form = formidable({});

  return new Promise((resolve, reject) => {
    form.parse(
      req,
      (
        err: any,
        _fields: formidable.Fields,
        files: formidable.Files
      ) => {
        if (err) reject({ err: err.message });

        let fields: typeof _fields = {};
        for (let key in _fields) {
          fields[key] = (_fields[key])[0];
        }

        resolve({ fields, files });
      });
  });
};