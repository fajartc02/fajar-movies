function gettingSuccess(res, message, data, statusCode) {
    return res.status(statusCode).json({
        message,
        data
    })
}

module.exports = gettingSuccess