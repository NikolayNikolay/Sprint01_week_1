"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const db_1 = __importDefault(require("../db/db"));
const bodyValidation_1 = require("../validation/bodyValidation");
exports.videosRouter = (0, express_1.Router)();
//get all videos
exports.videosRouter.get('/', (req, res) => {
    const videos = db_1.default.videos;
    res.status(200).json(videos);
});
//get video by id
exports.videosRouter.get('/:id', (req, res) => {
    if (req.params.id) {
        const videoId = db_1.default.videos.find(video => video.id === +req.params.id);
        if (videoId) {
            res.status(200).json(videoId);
            return;
        }
        else {
            res.sendStatus(404);
            return;
        }
    }
});
//post new video
exports.videosRouter.post('/', (req, res) => {
    const errorsArray = {
        errorsMessages: []
    };
    (0, bodyValidation_1.titleValidate)(req.body.title, errorsArray);
    (0, bodyValidation_1.authorValidate)(req.body.author, errorsArray);
    (0, bodyValidation_1.availableResolutionsValidate)(req.body.availableResolutions, errorsArray);
    if (errorsArray.errorsMessages.length) {
        res.status(400).json(errorsArray.errorsMessages);
    }
    else {
        const randomInt32 = () => Math.floor(Math.random() * (2 ** 32));
        const dataPost = new Date();
        dataPost.setDate(dataPost.getDate() + 1);
        const newVideo = {
            id: +randomInt32(),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: dataPost.toISOString(),
            availableResolutions: req.body.availableResolutions
        };
        db_1.default.videos.push(newVideo);
        res.status(201).json(newVideo);
    }
    // if (typeof req.body.title === 'string' && typeof req.body.author === 'string' && req.body.availableResolutions.length !== 0 && req.body.author.length <= 40 && req.body.title.length <= 40 &&req.body.author.length !== 0 && req.body.title.length !== 0) {
    //     const randomInt32 = () => Math.floor(Math.random() * (2 ** 32));
    //     const dataPost = new Date();
    //     dataPost.setDate(dataPost.getDate() + 1)
    //     const newVideo :VideoDBType = {
    //       id: +randomInt32() ,
    //       title:req.body.title ,
    //       author: req.body.author,
    //       canBeDownloaded: false,
    //       minAgeRestriction: null,
    //       createdAt: new Date().toISOString(),
    //       publicationDate: dataPost.toISOString(),
    //       availableResolutions: req.body.availableResolutions
    //     }
    //     db.videos.push(newVideo)
    //   res.status(201).json(newVideo)
    // } else {
    //     const errorsMessage = {
    //         "errorsMessages": [
    //           {
    //             "message": "string",
    //             "field": "string"
    //           }
    //         ]
    //       }
    //     res.status(400).json(errorsMessage)
    // }
});
//put, renew video by id
exports.videosRouter.put('/:id', (req, res) => {
    const videoPut = db_1.default.videos.find(video => video.id === +req.params.id);
    if (videoPut) {
        if (typeof req.body.title === 'string' && typeof req.body.author === 'string' && req.body.availableResolutions.length !== 0 && req.body.author.length <= 40 && req.body.title.length <= 40) {
            const video1 = {};
            videoPut.title = req.body.title;
            videoPut.author = req.body.author;
            videoPut.availableResolutions = req.body.availableResolutions;
            videoPut.canBeDownloaded = req.body.canBeDownloaded;
            videoPut.minAgeRestriction = req.body.minAgeRestriction;
            videoPut.publicationDate = req.body.publicationDate;
            res.sendStatus(204);
            return;
        }
        else {
            res.sendStatus(400).send({
                "errorsMessages": [
                    {
                        "message": "string",
                        "field": "string"
                    }
                ]
            });
        }
    }
    else {
        res.sendStatus(404);
    }
});
//delete video by id
exports.videosRouter.delete('/:id', (req, res) => {
    if (req.url) {
        const videoDelete = db_1.default.videos.filter(video => video.id !== +req.params.id);
        if (db_1.default.videos.length !== videoDelete.length) {
            db_1.default.videos = videoDelete || db_1.default.videos;
            res.sendStatus(204);
        }
        else {
            res.sendStatus(404);
        }
    }
});
