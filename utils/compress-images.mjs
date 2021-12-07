import gulp from "gulp";
import sharp from "sharp";

import { Transform } from "stream";
import { createWriteStream } from "fs";

const sharpStream = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform(file, _enc, cb) {
    if (!file.isBuffer()) return cb(null, file);

    let stream = sharp(file.contents, {});

    if (file.extname == ".jpg" || file.extname == ".jpeg") {
      stream = stream.jpeg({ quality: 80 });
    }
    if (file.extname == ".png") {
      stream = stream.png({ quality: 80 });
    }

    stream.toBuffer().then((buf) => {
      file.contents = buf;
      cb(null, file);
    });
  },
});

gulp
  .src("dist/**/*.+(jpg|png)", {})
  .pipe(sharpStream)
  .on("data", (file) => {
    createWriteStream(file.path).write(file.contents);
  });
