import { healthCheck } from './health.controller';

describe('Health Controller', () => {
    let req: any;
    let res: any;

    let jsonFunction: any;

    // Evaluate res.json
    beforeEach(() => {
        jsonFunction = jest.fn();

        res = {
            json: jsonFunction,
            status: jest.fn().mockReturnValue({
                json: jsonFunction,
            }),
        };
    });

    it('Health controller should be ok', () => {
        healthCheck(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(jsonFunction).toHaveBeenCalledTimes(1);
        expect(jsonFunction).toHaveBeenCalledWith({
            statusCode: 200,
            status: 'success',
            message: 'Pokemon adapter is up and running...🚀 🚀 🚀',
        });
    });
});
