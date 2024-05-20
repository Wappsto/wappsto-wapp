import WS from 'jest-websocket-mock';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);
import { Data } from '../src/index';
import { before, after, sendRpcResponse } from './util/stream';
import {
    responses,
    makeDeviceResponse,
    makeValueResponse,
} from './util/response';
import { makeResponse } from './util/helpers';

describe('data', () => {
    beforeAll(() => {
        before();
    });

    afterEach(() => {
        after();
    });

    it('can create a new instance', () => {
        const data = new Data();
        expect(data).toBeInstanceOf(Data);
    });

    it('can fetch it by ID', async () => {
        mockedAxios.get.mockResolvedValueOnce(
            makeResponse({
                meta: {
                    id: '1d75a50b-5e41-4a8c-9436-b2193e604697',
                    type: 'data',
                    version: '2.1',
                },
            })
        );
        const data = await Data.fetchById(
            '1d75a50b-5e41-4a8c-9436-b2193e604697'
        );

        expect(data.meta.id).toEqual('1d75a50b-5e41-4a8c-9436-b2193e604697');
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(mockedAxios.get).toHaveBeenCalledWith(
            '/2.1/data/1d75a50b-5e41-4a8c-9436-b2193e604697',
            {
                params: {
                    go_internal: true,
                    method: ['retrieve'],
                },
            }
        );
    });
});
