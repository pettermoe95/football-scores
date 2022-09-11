function deepCloneObj<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
}

export {
    deepCloneObj
}