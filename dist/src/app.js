"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("../db/db"));
let videosDB = db_1.default;
exports.app = (0, express_1.default)(); // создать приложение
exports.app.use(express_1.default.json()); // создание свойств-объектов body и query во всех реквестах
exports.app.use((0, cors_1.default)()); // разрешить любым фронтам делать запросы на наш бэк
exports.app.get('/', (reg, res) => {
    res.send('to get all videos : "/videos"');
});
//post new video
exports.app.post('/videos', (req, res) => {
    if (typeof req.body.title === 'string' && typeof req.body.author === 'string' && req.body.availableResolutions.length !== 0 && req.body.author.length <= 40 && req.body.title.length <= 40) {
        const randomInt32 = () => Math.floor(Math.random() * (2 ** 32));
        const dataPost = new Date();
        dataPost.setDate(dataPost.getDate() + 1);
        const newVideo = { "id": +randomInt32(),
            "title": req.body.title,
            "author": req.body.author,
            "canBeDownloaded": true,
            "minAgeRestriction": null,
            "createdAt": new Date().toISOString(),
            "publicationDate": dataPost.toISOString(),
            "availableResolutions": [
                req.body.availableResolutions
            ] };
        videosDB.push(newVideo);
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
    res.status(200).send(videosDB);
});
//get video by id
exports.app.get('/videos/:id', (req, res) => {
    console.log(req.params.id);
    const videoId = videosDB.find(video => video.id === +req.params.id);
    console.log(videoId);
    if (videoId) {
        res.status(200).send(videoId);
    }
    else {
        res.send(404);
    }
});
//put, renew video by id
exports.app.put('/videos/:id', (req, res) => {
    if (typeof req.body.title === 'string' && typeof req.body.author === 'string' && req.body.availableResolutions.length !== 0 && req.body.author.length <= 40 && req.body.title.length <= 40) {
        const videoPut = videosDB.find(video => video.id === +req.params.id);
        if (videoPut) {
            videoPut.title = req.body.title;
            videoPut.author = req.body.author;
            videoPut.availableResolutions.push(...req.body.availableResolutions);
            videoPut.canBeDownloaded = req.body.canBeDownloaded;
            videoPut.minAgeRestriction = req.body.minAgeRestriction;
            videoPut.publicationDate = new Date().toISOString();
        }
        else {
            res.sendStatus(204);
        }
        res.sendStatus(200);
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
});
//delete video by id
exports.app.delete('/videos/:id', (req, res) => {
    const videoDelete = videosDB.filter(video => video.id !== +req.params.id);
    console.log(videosDB.length === videoDelete.length);
    if (videosDB.length !== videoDelete.length) {
        videosDB = videoDelete;
        res.send(204);
    }
    else {
        res.send(404);
    }
    res.status(200).send(videosDB);
});
// app.get(SETTINGS.PATH.VIDEOS, getVideosController)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter)
