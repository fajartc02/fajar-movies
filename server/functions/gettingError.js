function gettingError(res, message, err, statusCode) {
    return res.status(statusCode).json({
        message: message,
        err: err.message
    })
}

module.exports = gettingError