export let errorHandler=(err,req,res,next)=>{
    res.send({
        error: err.name,
        message: err.message,
        status: err.status,
        timestamp: new Date()
        })
    }