"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db/db"));
//let videosDB = db.videos;
exports.app = (0, express_1.default)(); // создать приложение
exports.app.use(express_1.default.json()); // создание свойств-объектов body и query во всех реквестах
exports.app.use((0, cors_1.default)()); // разрешить любым фронтам делать запросы на наш бэк
exports.app.get('/', (reg, res) => {
    res.send('to get all videos : "/videos"');
});
//post new video
exports.app.post('/videos', (req, res) => {
    if (typeof req.body.title === 'string' && typeof req.body.author === 'string' && req.body.availableResolutions.length !== 0 && req.body.author.length <= 40 && req.body.title.length <= 40 && req.body.author.length !== 0 && req.body.title.length !== 0) {
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
    else {
        const errorsMessage = {
            "errorsMessages": [
                {
                    "message": "string",
                    "field": "string"
                }
            ]
        };
        res.status(400).json(errorsMessage);
    }
});
//get all videos
exports.app.get('/videos', (req, res) => {
    res.status(200).json(db_1.default.videos);
});
//get video by id
exports.app.get('/videos/:id', (req, res) => {
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
//put, renew video by id
exports.app.put('/videos/:id', (req, res) => {
    const videoPut = db_1.default.videos.find(video => video.id === +req.params.id);
    if (videoPut) {
        if (typeof req.body.title === 'string' && typeof req.body.author === 'string' && req.body.availableResolutions.length !== 0 && req.body.author.length <= 40 && req.body.title.length <= 40) {
            const video1 = {};
            videoPut.title = req.body.title;
            videoPut.author = req.body.author;
            videoPut.availableResolutions.push(...req.body.availableResolutions);
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
exports.app.delete('/videos/:id', (req, res) => {
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
exports.app.delete('/testing/all-data', (req, res) => {
    if (req.url) {
        db_1.default.videos.splice(0, db_1.default.videos.length);
        res.send(204);
    }
});
// app.get(SETTINGS.PATH.VIDEOS, getVideosController)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter)
