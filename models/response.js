const createResponse = (status_code, message, data = null) => {
    return { status_code, message, data };
};

module.exports = { createResponse };
