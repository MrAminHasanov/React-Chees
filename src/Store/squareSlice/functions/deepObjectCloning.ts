export const deepObjectCloning = (object: object, blackList: Array<string>): any => {
    const clonedObject: object = Array.isArray(object) ? [] : {};
    Object.entries(object).forEach(([valueKey, value]) => {
        if (!blackList.includes(valueKey)) {
            clonedObject[valueKey] =
                typeof value === "object"
                    ? deepObjectCloning(value, blackList)
                    : value
        }
    })

    return clonedObject
}