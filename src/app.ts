import express from 'express'
import cors from 'cors'
import db  from '../db/db'
 
let videosDB = db;
export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк


app.get('/',(reg,res)=>{
  res.send('to get all videos : "/videos"')
})

//post new video
app.post('/videos', (req, res) => {
  if (!req.body.id) {
    res.sendStatus(404)
    return
   }
    if (typeof req.body.title === 'string' && typeof req.body.author === 'string' && req.body.availableResolutions.length !== 0 && req.body.author.length <= 40 && req.body.title.length <= 40) {
        const randomInt32 = () => Math.floor(Math.random() * (2 ** 32));
        const dataPost = new Date();
        dataPost.setDate(dataPost.getDate() + 1)
        const newVideo = {"id": +randomInt32(),
  "title":req.body.title ,
  "author": req.body.author,
  "canBeDownloaded": true,
  "minAgeRestriction": null,
  "createdAt": new Date().toISOString(),
  "publicationDate": dataPost.toISOString(),
  "availableResolutions": [
    req.body.availableResolutions
  ]}
    videosDB.push(newVideo)
    res.status(201).json(newVideo)
    } else {
        const errorsMessage = {
            "errorsMessages": [
              {
                "message": "string",
                "field": "string"
              }
            ]
          }
        res.status(400).json(errorsMessage)
    }
})
//get all videos
app.get('/videos', (req, res) => {

   res.status(200).send(videosDB)
})
//get video by id
app.get('/videos/:id', (req, res) => {
    if (!req.body.id) {
      res.sendStatus(404)
      return
     }
    const videoId = videosDB.find(video => video.id === +req.params.id)
    if (videoId) {
        res.status(200).send(videoId)
    }
    else{
        res.send(404)
    }
    
 })
//put, renew video by id
app.put('/videos/:id', (req, res) => {
   if (!req.body.id) {
    res.sendStatus(404)
    return
   }
  
  if (typeof req.body.title === 'string' && typeof req.body.author === 'string' && req.body.availableResolutions.length !== 0 && req.body.author.length <= 40 && req.body.title.length <= 40) {
    const videoPut = videosDB.find(video => video.id === +req.params.id)
    if (videoPut) {
      videoPut.title = req.body.title
      videoPut.author = req.body.author
      videoPut.availableResolutions.push(...req.body.availableResolutions)
      videoPut.canBeDownloaded = req.body.canBeDownloaded
      videoPut.minAgeRestriction = req.body.minAgeRestriction
      videoPut.publicationDate = new Date().toISOString()
    }
    else{
      res.sendStatus(204)
    }
    res.sendStatus(200)}
    else{
      res.sendStatus(400).send({
        "errorsMessages": [
          {
            "message": "string",
            "field": "string"
          }
        ]
      })
    }
})
//delete video by id
app.delete('/videos/:id', (req, res) => {
  if (!req.body.id) {
    res.sendStatus(404)
    return
   }
    const videoDelete = videosDB.filter(video => video.id !== +req.params.id)
    console.log(videosDB.length === videoDelete.length)
    if (videosDB.length !== videoDelete.length) {
        videosDB = videoDelete
        res.send(204)
    }
    else{
        res.send(404)
    }

   res.status(200).send(videosDB)
})
app.delete('/hometask_01/api/testing/all-data',(req,res)=>{
  if (req.url) {
    db.splice(0, db.length);
    res.sendStatus(204)
  }
})
// app.get(SETTINGS.PATH.VIDEOS, getVideosController)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter)