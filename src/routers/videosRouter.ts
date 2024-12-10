import { Router, Request,Response } from "express";
import db, { DBType,VideoDBType } from '../db/db';


import { titleValidate, authorValidate, availableResolutionsValidate, booleanValidate } from "../validation/bodyValidation";


export const videosRouter = Router();

 //get all videos
videosRouter.get('/', (req:Request, res:Response) => {
   const videos = db.videos
    res.status(200).json(videos)
})
 //get video by id
videosRouter.get('/:id', (req:Request, res:Response) => {
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

   //post new video
videosRouter.post('/', (req:Request, res:Response) => {
  const errorsArray : any = {
    errorsMessages: []
  }
  titleValidate(req.body.title, errorsArray)
  authorValidate(req.body.author, errorsArray)
  availableResolutionsValidate(req.body.availableResolutions, errorsArray)

  if (errorsArray.errorsMessages.length) {
    res.status(400).json(errorsArray)
  }
    else{
    const randomInt32 = () => Math.floor(Math.random() * (2 ** 32));
        const dataPost = new Date();
        dataPost.setDate(dataPost.getDate() + 1)
        const newVideo :VideoDBType = {
          id: +randomInt32() ,
          title:req.body.title ,
          author: req.body.author,
          canBeDownloaded: false,
          minAgeRestriction: null,
          createdAt: new Date().toISOString(),
          publicationDate: dataPost.toISOString(),
          availableResolutions: req.body.availableResolutions
          }
        db.videos.push(newVideo)
      res.status(201).json(newVideo)
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
})
 //put, renew video by id
videosRouter.put('/:id', (req:Request, res:Response) => {
    const videoPut = db.videos.find(video => video.id === +req.params.id)
    if (videoPut) {
      const errorsArray : any = {
        errorsMessages: []
      }
      titleValidate(req.body.title, errorsArray)
      authorValidate(req.body.author, errorsArray)
      availableResolutionsValidate(req.body.availableResolutions, errorsArray)
      booleanValidate(req.body.canBeDownloaded, errorsArray)
      if (errorsArray.errorsMessages.length) {
        res.status(400).json(errorsArray)
      }
        else{
        videoPut.title = req.body.title
        videoPut.author = req.body.author
        videoPut.availableResolutions = req.body.availableResolutions
        videoPut.canBeDownloaded = req.body.canBeDownloaded
        videoPut.minAgeRestriction = req.body.minAgeRestriction
        videoPut.publicationDate = req.body.publicationDate
        res.sendStatus(204)
        return
        }
      //   if (typeof req.body.title === 'string' && typeof req.body.author === 'string' && req.body.availableResolutions.length !== 0 && req.body.author.length <= 40 && req.body.title.length <= 40){
      //   const video1 : any = {}
      //   videoPut.title = req.body.title
      //   videoPut.author = req.body.author
      //   videoPut.availableResolutions = req.body.availableResolutions
      //   videoPut.canBeDownloaded = req.body.canBeDownloaded
      //   videoPut.minAgeRestriction = req.body.minAgeRestriction
      //   videoPut.publicationDate = req.body.publicationDate
      //   res.sendStatus(204)
      //   return
      // }
      // else{
      //   res.sendStatus(400).send({
      //     "errorsMessages": [
      //       {
      //         "message": "string",
      //         "field": "string"
      //       }
      //     ]
      //   })
      // }
    }
      else{
        res.sendStatus(404)
      }
})
 //delete video by id
videosRouter.delete('/:id', (req:Request, res:Response) => {
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