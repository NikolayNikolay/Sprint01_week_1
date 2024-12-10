import {config} from 'dotenv'
config() // добавление переменных из файла .env в process.env
 
export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 5000,
    PATH: {
        VIDEOS: '/videos',
    },
}


export enum ResolutionEnum {
    'P144' = 'P144', 
    'P240' = 'P240',
    'P360' = 'P360' , 
    'P480' = 'P480', 
    'P720' = 'P720' , 
    'P1080'= 'P1080' , 
    'P1440' = 'P1440',
    'P2160'= 'P2160',
}