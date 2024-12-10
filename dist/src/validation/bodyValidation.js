"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableResolutionsValidate = exports.authorValidate = exports.titleValidate = void 0;
const settings_1 = require("../settings");
const titleValidate = (title, errors) => {
    if (typeof title !== 'string' || title.trim() === '') {
        errors.errorsMessages.push({
            message: "'title' should be a non-empty string",
            field: "title"
        });
        return errors;
    }
    if (title.trim().length > 40) {
        errors.errorsMessages.push({
            message: "'title' length more 40",
            field: "title"
        });
        return errors;
    }
};
exports.titleValidate = titleValidate;
const authorValidate = (author, errors) => {
    if (typeof author !== 'string' || author.trim() === '') {
        errors.errorsMessages.push({
            message: "'author' should be a non-empty string",
            field: "author"
        });
        return errors;
    }
    if (author.trim().length > 40) {
        errors.errorsMessages.push({
            message: "'author' length more 40",
            field: "author"
        });
        return errors;
    }
};
exports.authorValidate = authorValidate;
const availableResolutionsValidate = (available, errors) => {
    if (available.length === 0) {
        errors.errorsMessages.push({
            message: "'availableResolutions' is emty",
            field: "availableResolutions"
        });
        return errors;
    }
    const invalidResolutions = available.filter((resolution) => !Object.values(settings_1.ResolutionEnum).includes(resolution));
    if (invalidResolutions.length > 0) {
        errors.errorsMessages.push({
            message: "'availableResolutions' incorrect Resolutions",
            field: "availableResolutions"
        });
        return errors;
    }
};
exports.availableResolutionsValidate = availableResolutionsValidate;
