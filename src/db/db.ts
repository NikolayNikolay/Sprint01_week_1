export type VideoDBType = {
  id: number,
  title: string,
  author: string,
  canBeDownloaded: boolean,
  minAgeRestriction: any,
  createdAt: any,
  publicationDate: any,
  availableResolutions: any[],
};

export type DBType = { // типизация базы данных (что мы будем в ней хранить)
  videos: any[] // VideoDBType[]
  // some: any[]
}

const db:DBType = { // создаём базу данных (пока это просто переменная)
  videos: [],
  // some: []
};
export default  db;