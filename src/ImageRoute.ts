import ImgController from "./ImageController";
import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs-extra";
export const ImgRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { roomId } = req.params;
    let dest: string;
    dest = path.join(__dirname, "../public/upload" + "/" + roomId);
    fs.mkdirsSync(dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const filename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "." +
      file.mimetype.split("/")[1];
    // console.log("Tại middleware: ", req);
    cb(null, filename);
  },
});

const upload = multer({ storage });
const cpUpload = upload.fields([{ name: "image", maxCount: 1 }]);

ImgRouter.post("/upload/:roomId", cpUpload, ImgController.upload);
ImgRouter.get("/:id", ImgController.getImg);
ImgRouter.delete("/:roomId", ImgController.deleteByRoomId);

export default ImgRouter;
