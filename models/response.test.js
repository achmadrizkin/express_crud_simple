// response.test.js
const { createResponse } = require('./response'); // Adjust the path if needed

describe('createResponse', () => {
    test('should return correct response object with all parameters', () => {
        const status_code = 200;
        const message = 'Success';
        const data = { key: 'value' };

        const response = createResponse(status_code, message, data);

        expect(response).toEqual({
            status_code,
            message,
            data,
        });
    });

    test('should return response object with data as null if data is not provided', () => {
        const status_code = 404;
        const message = 'Not Found';

        const response = createResponse(status_code, message);

        expect(response).toEqual({
            status_code,
            message,
            data: null,
        });
    });
});
