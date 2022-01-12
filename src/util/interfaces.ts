export interface IConfig {
    verbose?: boolean;
    debug?: boolean;
    validation?: 'none' | 'normal' | 'strict';
}

export interface IModelFunc {
    create(params: Record<string, any>): Promise<void>;
    fetch(
        endpoint: string,
        params?: Record<string, any>
    ): Promise<Record<string, any>[]>;
    parse(json: Record<string, any>): boolean;
}

export interface IConnection {
    timestamp: string;
    online: boolean;
}

export interface IMeta {
    id?: string;
    type?: string;
    version?: string;
    redirect?: string;

    manufacturer?: string;
    iot?: boolean;
    upgradable?: boolean;
    connection?: IConnection;
    created?: string;
    updated?: string;
    revision?: number;
    changed?: string;
    owner?: string;
    size?: number;
    path?: string;
    parent?: string;
    usage_daily?: Record<string, any>;
    product?: string;
    deprecated?: boolean;
    icon?: string;
    trace?: string;
}

export interface INetwork {
    name: string;
    description?: string;
}

export interface INetworkFunc {
    constructor(name?: string): void;
    createNetwork(params: INetwork): Promise<INetwork>;
    findDeviceByName(name: string): IDevice[];
    findDeviceByProduct(product: string): IDevice[];
    findValueByName(name: string): IValue[];
    findValueByType(type: string): IValue[];
    createDevice(params: IDevice): Promise<IDevice>;
    find(
        params: Record<string, any>,
        quantity: number | 'all',
        usage: string
    ): Promise<INetwork[]>;
    findByName(
        name: string,
        quantity: number | 'all',
        usage: string
    ): INetwork[];
    findAllByName(name: string, usage: string): IDevice[];
    fetch(name: string, params: Record<string, any>): IDevice;
}

export interface IDevice {
    name: string;
    product?: string;
    serial?: string;
    description?: string;
    protocol?: string;
    communication?: string;
    version?: string;
    manufacturer?: string;
}

export interface IDeviceFunc {
    constructor(name?: string): void;
    findValueByName(name: string): IValue[];
    findValueByType(type: string): IValue[];
    createValue(
        name: string,
        permission: 'r' | 'w' | 'rw' | 'wr',
        valueTemplate: IValueTemplate
    ): Promise<IValue>;
    createNumberValue(params: IValue & IValueNumber): Promise<IValue>;
    createStringValue(params: IValue & IValueString): Promise<IValue>;
    createBlobValue(params: IValue & IValueBlob): Promise<IValue>;
    createXmlValue(params: IValue & IValueXml): Promise<IValue>;
    find(
        params: Record<string, any>,
        quantity: number | 'all',
        usage: string
    ): IDevice[];
    findByName(
        name: string,
        quantity: number | 'all',
        usage: string
    ): IDevice[];
    findAllByName(name: string, usage: string): IDevice[];
    findByProduct(
        product: string,
        quantity: number | 'all',
        usage: string
    ): IDevice[];
    findAllByProduct(product: string, usage: string): IDevice[];
}

export interface IPermissionModelFunc {
    request(
        endpoint: string,
        quantity: number | 'all',
        message: string,
        params?: Record<string, any>
    ): Promise<Record<string, any>[]>;
}

export interface IValue {
    name: string;
    permission: 'r' | 'w' | 'rw' | 'wr';
    type?: string;
    period?: string;
    delta?: string;
    number?: IValueNumber;
    string?: IValueString;
    blob?: IValueBlob;
    xml?: IValueXml;
}

export interface IValueNumber {
    min: number;
    max: number;
    step: number;
    unit?: string;
    si_conversion?: string;
    mapping?: Record<string, any>;
    ordered_mapping?: boolean;
    meaningful_zero?: boolean;
}

export interface IValueString {
    max: number;
    encoding?: string;
}

export interface IValueBlob {
    max: number;
    encoding?: string;
}

export interface IValueXml {
    xsd?: string;
    namespace?: string;
}

export interface IValueTemplate {
    type: string;
    value_type: 'number' | 'string' | 'blob' | 'xml';
    number?: IValueNumber;
    string?: IValueString;
    blob?: IValueBlob;
    xml?: IValueXml;
}

export interface IValueFunc {
    constructor(name?: string): IState;
    createState(params: IState): IState;
    report(data: string | number, timestamp: string | undefined): void;
    control(data: string | number, timestamp: string | undefined): void;
    onControl(callback: ValueStreamCallback): void;
    onReport(callback: ValueStreamCallback): void;
    onRefresh(callback: RefreshStreamCallback): void;
    getReportLog(request: ILogRequest): Promise<ILogResponse>;
    getControlLog(request: ILogRequest): Promise<ILogResponse>;
    find(
        params: Record<string, any>,
        quantity: number | 'all',
        usage: string
    ): IValue[];
    findByName(name: string, quantity: number | 'all', usage: string): IValue[];
    findByType(type: string, quantity: number | 'all', usage: string): IValue[];
    findAllByName(name: string, usage: string): IValue[];
    findAllByType(type: string, usage: string): IValue[];
}

export interface IState {
    type: 'Report' | 'Control';
    data?: string;
    timestamp?: string;
}

export interface IStateFunc {
    constructor(type?: 'Report' | 'Control'): IState;
}

export interface ILogRequest {
    count?: number;
    start?: Date;
    end?: Date;
}

export interface ILogResponse {
    meta: IMeta;
    data: Record<string, any>;
    more: boolean;
    type: string;
}

export interface IStreamEvent {}

export interface IStreamModel {
    path(): string;
    handleStream(event: IStreamEvent): void;
}

export interface IStreamFunc {
    subscribe(model: IStreamModel): void;
    subscribeService(service: string, handler: ServiceHandler): void;
    addSignalHandler(type: string, handler: SignalHandler): void;
    sendRequest(msg: any): Promise<any>;
    sendResponse(event: any, code: number, msg: any): Promise<void>;
    onRequest(handler: RequestHandler, internal: boolean): void;
}

export interface IOAuthFunc {
    constructor(name?: string): void;
    getToken(name: string): void;
}

export type SignalHandler = (event: string) => void;
export type ServiceHandler = (
    event: any
) => Promise<true | undefined> | boolean;
export type RequestHandler = (event: any) => Promise<any>;
export type StreamCallback = (model: IStreamModel) => void;
export type ValueStreamCallback = (
    value: IValue,
    data: string,
    timestamp: string
) => void;
export type RefreshStreamCallback = (value: IValue) => void;
