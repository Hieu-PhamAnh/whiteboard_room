import ImgController from "./img.controller";
import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs-extra";
export const ImgRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest: string;
    dest = path.join(__dirname, "../public/upload");
    fs.mkdirsSync(dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const filename =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
    console.log("Tại middleware: ", req.files);
    cb(null, filename);
  },
});

const upload = multer({ storage });
const cpUpload = upload.fields([{ name: "images", maxCount: 10 }]);

ImgRouter.post("/upload", cpUpload, ImgController.upload);

export default ImgRouter;
