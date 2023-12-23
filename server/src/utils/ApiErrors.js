// NOTE: we can by default done this my using Error constructor 


// this code is for handling errors in the API
class ApiError extends Error{
    constructor(
        statuscode,
        message="something went wrong",
        errors =[],
        statck = ""
    ){
        super(message)
        this.statusCode = statuscode
        this.data = null
        this.message = message
        this.sucess = false
        this.errors = this.errors

        if(statck){
            this.stack = statck
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}