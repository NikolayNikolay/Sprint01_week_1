import express from 'express'
import cors from 'cors'
import db  from '../db/db'
 
let videoDB = db;
export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк
 //post new video
app.post('/videos', (req, res) => {
    res.status(200).json({version: '1.0'})
})
//get all videos
app.get('/videos', (req, res) => {

   res.status(200).send(videoDB)
})
//get video by id
app.get('/videos', (req, res) => {

    res.status(200).send(videoDB)
 })
//put, renew video by id
app.put('/videos', (req, res) => {
    res.status(200).json({version: '1.0'})
})
//delete video by id
app.delete('/videos', (req, res) => {

   res.status(200).send(videoDB)
})
// app.get(SETTINGS.PATH.VIDEOS, getVideosController)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter)