import Img from "./Img";
import mongoose from "mongoose";
import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs-extra";

interface Image {
  _id: object;
  url: string;
}

export const ImgController = {
  upload: async (req: any, res: Response) => {
    try {
      const imgArr = req.files["image"];
      console.log("Tại controller: ", imgArr);
      imgArr.forEach(async (element: any) => {
        let newImg = await Img.create({ url: element.path });
      });
      return res.status(200).json({
        message: "Thành công",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
  getImg: async (req: Request, res: Response) => {
    try {
      let { id } = req.params;
      const img: Image | null = await Img.findOne({ _id: id });
      console.log(img);
      if (img?.url !== undefined && img !== null) {
        let url: string = img.url;
        fs.readFile(url, (err, data) => {
          if (err) {
            return res.status(500).json({
              message: "Server error: Error reading file",
              error: err,
            });
          }
          const buffer = Buffer.from(data);
          // console.log("Buffer tại controller:" + buffer);
          res.set("Content-Type", "application/octet-stream");
          res.send(buffer);
        });
      } else {
        return res.status(404).json({
          message: "Image not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
};

export default ImgController;
