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
      const imgArr = req.files["images"];
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
};

export default ImgController;
