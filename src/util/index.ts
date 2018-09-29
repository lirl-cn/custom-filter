export function isParent(obj:any, parentObj:any) {
    //判断obj元素是否在parentObj内部
    while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY') {
        if (obj == parentObj) {
            return true;
        }
        obj = obj.parentNode;
    }
    return false;
}
export function hasErrors(fieldsError:any) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}