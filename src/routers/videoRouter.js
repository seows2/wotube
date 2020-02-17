import express from "express";
import routes from "../routes";
import {
    videoDetail,
    geteditVideo,
    deleteVideo,
    getupload,
    postupload,
    posteditVideo
} from "../controllers/videoController";
import {
    uploadVideo,
    onlyPrivate
} from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, getupload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postupload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo(), onlyPrivate, geteditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, posteditVideo);
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;