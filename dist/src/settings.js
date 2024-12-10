"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolutionEnum = exports.SETTINGS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // добавление переменных из файла .env в process.env
exports.SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 5000,
    PATH: {
        VIDEOS: '/videos',
    },
};
var ResolutionEnum;
(function (ResolutionEnum) {
    ResolutionEnum["P144"] = "P144";
    ResolutionEnum["P240"] = "P240";
    ResolutionEnum["P360"] = "P360";
    ResolutionEnum["P480"] = "P480";
    ResolutionEnum["P720"] = "P720";
    ResolutionEnum["P1080"] = "P1080";
    ResolutionEnum["P1440"] = "P1440";
    ResolutionEnum["P2160"] = "P2160";
})(ResolutionEnum || (exports.ResolutionEnum = ResolutionEnum = {}));
