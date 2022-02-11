import { isEqual } from 'lodash';
import { Type } from 'class-transformer';
import { PermissionModel } from './model.permission';
import { StreamModel } from './model.stream';
import { Model } from './model';
import { State } from './state';
import { checkList } from '../util/check_list';
import { printDebug } from '../util/debug';
import {
    IValue,
    IValueNumber,
    IValueString,
    IValueBlob,
    IValueXml,
    ValuePermission,
    IState,
    StateType,
    ILogRequest,
    ILogResponse,
    RefreshStreamCallback,
    ValueStreamCallback,
} from '../util/interfaces';

export class Value extends StreamModel implements IValue {
    static endpoint = '/2.0/value';

    name: string;
    permission: ValuePermission = 'r';
    tmp_permission: ValuePermission = 'r';
    type?: string;
    period?: string;
    delta?: string;
    number?: IValueNumber;
    string?: IValueString;
    blob?: IValueBlob;
    xml?: IValueXml;
    status?: string;
    @Type(() => State)
    state: State[] = [];
    stateCallbacks: Record<string, ValueStreamCallback[]> = {
        Control: [],
        Report: [],
    };

    constructor(name?: string) {
        super('value');
        Model.validateMethod('Value', 'constructor', arguments);
        this.name = name || '';
    }

    get states() {
        return this.state;
    }

    attributes(): string[] {
        return [
            'name',
            'permission',
            'type',
            'period',
            'delta',
            'number',
            'string',
            'blob',
            'xml',
            'status',
        ];
    }

    public perserve(): void {
        this.tmp_permission = this.permission;
    }

    public restore(): void {
        this.permission = this.tmp_permission;
    }

    public static fetch = async () => {
        const params = { expand: 2 };
        const url = Value.endpoint;

        const data = await Model.fetch(url, params);
        return Value.fromArray(data);
    };

    public async loadAllChildren(): Promise<void> {
        for (let i = 0; i < this.state.length; i++) {
            if (typeof this.state[i] === 'string') {
                const id: string = this.state[i] as unknown as string;
                this.state[i] = new State();
                this.state[i].meta.id = id;
                await this.state[i].refresh();
            }
        }
    }

    private findState(type: StateType): State | undefined {
        let res: State | undefined = undefined;
        this.state.forEach((state) => {
            if (state.type === type) {
                res = state;
            }
        });
        return res;
    }

    private getTime(): string {
        return new Date().toISOString();
    }

    private async findStateAndUpdate(
        type: StateType,
        data: string | number,
        timestamp: string | undefined
    ): Promise<void> {
        const state = this.findState(type);
        if (state) {
            state.data = data.toString();
            state.timestamp = timestamp || this.getTime();
            await state.update();
        }
    }

    private findStateAndCallback(
        type: StateType,
        callback: ValueStreamCallback
    ): void {
        if (!checkList(this.stateCallbacks[type], callback)) {
            this.stateCallbacks[type].push(callback);
            const state = this.findState(type);
            if (state) {
                state.onChange(() => {
                    this.stateCallbacks[state.type].forEach((c) => {
                        c(this, state.data, state.timestamp);
                    });
                });
            }
        }
    }

    public async createState(params: IState) {
        this.validate('createState', arguments);

        let create = false;
        let state = this.findState(params.type);
        if (!state) {
            state = new State(params.type);
            create = true;
        } else {
            printDebug(`Using existing state with id ${state.id()}`);
        }

        const oldJson = state.toJSON();
        state.parse(params);
        const newJson = state.toJSON();

        state.parent = this;
        if (create || !isEqual(oldJson, newJson)) {
            if (create) {
                await state.create();
                this.state.push(state);
            } else {
                await state.update();
            }
        }

        return state;
    }

    private findStateAndData(type: StateType): string | undefined {
        const state = this.findState(type);
        if (state) {
            return state.data;
        }
        return undefined;
    }

    private findStateAndTimestamp(type: StateType): string | undefined {
        const state = this.findState(type);
        if (state) {
            return state.timestamp;
        }
        return undefined;
    }

    public getReportData(): string | undefined {
        return this.findStateAndData('Report');
    }

    public getControlData(): string | undefined {
        return this.findStateAndData('Control');
    }

    public getControlTimestamp(): string | undefined {
        return this.findStateAndTimestamp('Control');
    }

    public getReportTimestamp(): string | undefined {
        return this.findStateAndTimestamp('Report');
    }

    public async report(
        data: string | number,
        timestamp: string | undefined = undefined
    ): Promise<void> {
        this.validate('report', arguments);

        this.findStateAndUpdate('Report', data, timestamp);
    }

    public async control(
        data: string | number,
        timestamp: string | undefined = undefined
    ): Promise<void> {
        this.validate('control', arguments);
        this.findStateAndUpdate('Control', data, timestamp);
    }

    public onControl(callback: ValueStreamCallback): void {
        this.validate('onControl', arguments);
        this.findStateAndCallback('Control', callback);
    }

    public onReport(callback: ValueStreamCallback): void {
        this.validate('onReport', arguments);
        this.findStateAndCallback('Report', callback);
    }

    public onRefresh(callback: RefreshStreamCallback): void {
        this.validate('onRefresh', arguments);

        this.onChange(() => {
            if (this.status === 'update') {
                callback(this);
                this.status = '';
            }
        });
    }

    private async findStateAndLog(
        type: StateType,
        request: ILogRequest
    ): Promise<ILogResponse> {
        const state = this.findState(type);
        if (state) {
            const response = await Model.fetch(
                `/2.1/log/${state.id()}/state`,
                request
            );
            return response[0] as ILogResponse;
        }
        return {
            meta: {
                id: '',
                type: 'log',
                version: '2.1',
            },
            data: [],
            more: false,
            type: 'state',
        };
    }

    public async getReportLog(request: ILogRequest): Promise<ILogResponse> {
        this.validate('getReportLog', arguments);

        return this.findStateAndLog('Report', request);
    }

    public async getControlLog(request: ILogRequest): Promise<ILogResponse> {
        this.validate('getControlLog', arguments);

        return this.findStateAndLog('Control', request);
    }

    static find = async (
        params: Record<string, any>,
        quantity: number | 'all' = 1,
        usage = ''
    ) => {
        Value.validate('find', [params, quantity, usage]);
        if (usage === '') {
            usage = `Find ${quantity} value`;
        }

        const query: Record<string, any> = {
            expand: 2,
        };
        for (const key in params) {
            query[`this_${key}`] = params[key];
        }

        const data = await PermissionModel.request(
            Value.endpoint,
            quantity,
            usage,
            query
        );
        return Value.fromArray(data);
    };

    static findByName = async (
        name: string,
        quantity: number | 'all' = 1,
        usage = ''
    ) => {
        Value.validate('findByName', [name, quantity, usage]);
        if (usage === '') {
            usage = `Find ${quantity} value with name ${name}`;
        }
        return Value.find({ name: name }, quantity, usage);
    };

    static findByType = async (
        type: string,
        quantity: number | 'all' = 1,
        usage = ''
    ) => {
        Value.validate('findByType', [type, quantity, usage]);
        if (usage === '') {
            usage = `Find ${quantity} value with type ${type}`;
        }
        return Value.find({ type: type }, quantity, usage);
    };

    static findAllByName = async (name: string, usage = '') => {
        Value.validate('findAllByName', [name, usage]);
        return Value.findByName(name, 'all', usage);
    };

    static findAllByType = async (type: string, usage = '') => {
        Value.validate('findAllByType', [type, usage]);
        return Value.findByType(type, 'all', usage);
    };

    static findById = async (id: string) => {
        Value.validate('findById', [id]);
        const res = await Model.fetch(`${Value.endpoint}/${id}`, { expand: 2 });
        return Value.fromArray(res)[0];
    };

    private static validate(name: string, params: any): void {
        Model.validateMethod('Value', name, params);
    }
}
