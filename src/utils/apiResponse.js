const apiResponse = function (success, message, data) {
    return {
        success: success,
        message: message || 'Something went wrong',
        data: data || null,
    };
}

module.exports = {apiResponse}