import express from 'express'
import cors from 'cors'
import db, { DBType,VideoDBType } from './db/db'
 
//let videosDB = db.videos;
export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк


app.get('/',(reg,res)=>{
  res.send('to get all videos : "/videos"')
})

//post new video
app.post('/videos', (req, res) => {
    if (typeof req.body.title === 'string' && typeof req.body.author === 'string' && req.body.availableResolutions.length !== 0 && req.body.author.length <= 40 && req.body.title.length <= 40 &&req.body.author.length !== 0 && req.body.title.length !==0) {
        const randomInt32 = () => Math.floor(Math.random() * (2 ** 32));
        const dataPost = new Date();
        dataPost.setDate(dataPost.getDate() + 1)
        const newVideo :VideoDBType = {
          id: +randomInt32() ,
          title:req.body.title ,
          author: req.body.author,
          canBeDownloaded: true,
          minAgeRestriction: null,
          createdAt: new Date().toISOString(),
          publicationDate: dataPost.toISOString(),
          availableResolutions: [
            req.body.availableResolutions
          ]
        }
        db.videos.push(newVideo)
      res.status(201).json(db.videos)
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

   res.status(200).json(db.videos)
})
//get video by id
app.get('/videos/:id', (req, res) => {
    if (req.params.id) {
      const videoId : DBType = db.videos.find(video => video.id === +req.params.id)
      if (videoId) {
        res.status(200).json(videoId)
        return
      }
      else{
        res.sendStatus(404)
        return
      }
    }
 })
//put, renew video by id
app.put('/videos/:id', (req, res) => {
   const videoPut = db.videos.find(video => video.id === +req.params.id)
   if (videoPut) {
      if (typeof req.body.title === 'string' && typeof req.body.author === 'string' && req.body.availableResolutions.length !== 0 && req.body.author.length <= 40 && req.body.title.length <= 40){
      const video1 : any = {}
      videoPut.title = req.body.title
      videoPut.author = req.body.author
      videoPut.availableResolutions.push(...req.body.availableResolutions)
      videoPut.canBeDownloaded = req.body.canBeDownloaded
      videoPut.minAgeRestriction = req.body.minAgeRestriction
      videoPut.publicationDate = new Date().toISOString()
      res.sendStatus(204)
      return
    }
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
  }
    else{
      res.sendStatus(404)
      
    }
})
//delete video by id
app.delete('/videos/:id', (req, res) => {
  if (req.url) {
    const videoDelete = db.videos.filter(video => video.id !== +req.params.id)
    if (db.videos.length !== videoDelete.length) {
      db.videos = videoDelete || db.videos
      res.sendStatus(204)
    }
    else{
        res.sendStatus(404)
    }
   }
    
})
app.delete('/testing/all-data',(req,res)=>{
  if (req.url) {
    db.videos.splice(0, db.videos.length);
    res.send(204)
  }
})
// app.get(SETTINGS.PATH.VIDEOS, getVideosController)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter)