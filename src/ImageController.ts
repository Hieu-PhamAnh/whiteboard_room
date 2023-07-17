import Img from "./Img";
import mongoose from "mongoose";
import { Request, Response } from "express";
import path from "path";
import fs from "fs-extra";

interface Image {
  _id: object;
  url: string;
}

export const ImgController = {
  upload: async (req: any, res: Response) => {
    try {
      // console.log(req.files);
      const { roomId } = req.params;
      // const roomId = 2;
      const imgArr = req.files["image"];
      // console.log("Tại controller: ", imgArr);
      imgArr.forEach(async (element: any) => {
        let newImg = await Img.create({ url: element.path, roomId: roomId });
        // await newImg.save();
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
          // return res.status(200).json({
          //   message: "Image found",
          // });
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
  deleteByRoomId: async (req: Request, res: Response) => {
    try {
      let { roomId } = req.params;
      const fs = require("fs-extra");
      const path = require("path");
      const folderPath = path.join(__dirname, "../public/upload", roomId);
      if (fs.existsSync(folderPath)) {
        fs.removeSync(folderPath);
        console.log("Folder and its contents deleted successfully");
      } else {
        console.log("Folder does not exist");
      }
      let img: Image | null = null;
      let isExist = false;
      while (true) {
        img = await Img.findOneAndDelete({
          roomId: roomId,
        });
        if (img === null) {
          break;
        } else {
          isExist = true;
        }
        // console.log("Deleting....: ", img);
      }

      if (isExist) {
        return res.status(200).json({
          message: "Delete room successfull",
        });
      } else {
        return res.status(404).json({
          message: "Room not found",
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
