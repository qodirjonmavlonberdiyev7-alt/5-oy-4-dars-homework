module.exports = class CustomErrorHandler extends Error {
    constructor(status,errors){
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnAuthorized(message,errors = []) {
        return new CustomErrorHandler(401, message)
    }

     static BadRequest(message,errors = []) {
        return new CustomErrorHandler(400, message)
    }

     static NotFound(message,errors = []) {
        return new CustomErrorHandler(404, message)
    }
}