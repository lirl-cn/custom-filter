"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isParent(obj, parentObj) {
    //判断obj元素是否在parentObj内部
    while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY') {
        if (obj == parentObj) {
            return true;
        }
        obj = obj.parentNode;
    }
    return false;
}
exports.isParent = isParent;
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(function (field) { return fieldsError[field]; });
}
exports.hasErrors = hasErrors;
