import { ResolutionEnum } from "../settings";

export const titleValidate = (title:any , errors: any)=>{
   if (typeof title !== 'string' || title.trim() === '') {
      errors.errorsMessages.push({
         message: "'title' should be a non-empty string",
         field: "title"
       });
       return errors
   }
   if (title.trim().length > 40 ) {
      errors.errorsMessages.push({
         message: "'title' length more 40",
         field: "title"
       });
       return errors
   }
} 
export const authorValidate = (author:any , errors: any)=>{
   if (typeof author !== 'string' || author.trim() === '') {
      errors.errorsMessages.push({
         message: "'author' should be a non-empty string",
         field: "author"
       });
       return errors
   }
   if (author.trim().length > 40 ) {
      errors.errorsMessages.push({
         message: "'author' length more 40",
         field: "author"
       });
       return errors
   }
}


export const availableResolutionsValidate = (available:any , errors:any)=>{
   if (available.length === 0) {
      errors.errorsMessages.push({
         message: "'availableResolutions' is emty",
         field: "availableResolutions"
       });
       return errors
   }
   const invalidResolutions = available.filter((resolution:any) => !Object.values(ResolutionEnum).includes(resolution));
   if (invalidResolutions.length > 0) {
      errors.errorsMessages.push({
         message: "'availableResolutions' incorrect Resolutions",
         field: "availableResolutions"
       });
       return errors
  }
}


export const booleanValidate = (data:any, errors:any)=>{
   if (typeof data === 'boolean') {
      errors.errorsMessages.push({
         message: "'canBeDownloaded' is not boolean",
         field: "canBeDownloaded"
       });
       return errors
   }
}