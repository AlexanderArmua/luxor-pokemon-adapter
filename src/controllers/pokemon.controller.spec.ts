// src/controllers/pokemon.controller.spec.ts

import { Request, Response, NextFunction } from 'express';
import { getPokemons } from './pokemon.controller';

import { PokemonService } from '@services/pokemon/pokemon.service';

jest.mock('@services/pokemon/pokemon.service', () => ({
    PokemonService: {
        getInstance: () => ({
            findAll: jest.fn().mockReturnValueOnce(3),
            findOneByPokemonId: jest.fn(),
            findOneByPokemonName: jest.fn(),
            storeOne: jest.fn(),
        }),
    },
}));

describe('Pokemon Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

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

        next = jest.fn();
    });

    it('Should return empty array of pokemons', async () => {
        const mockRequest: Partial<Request> = {
            body: { skip: 0, take: 10 },
        };

        await getPokemons(mockRequest as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(jsonFunction).toHaveBeenCalledWith([]); // This should now pass with the modified mock
    });
});
