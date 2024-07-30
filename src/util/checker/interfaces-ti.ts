/**
 * This module was automatically generated by `ts-interface-builder`
 */
import * as t from 'ts-interface-checker';
// tslint:disable:object-literal-key-quotes

export const IConfig = t.iface([], {
    verbose: t.opt('boolean'),
    requests: t.opt('boolean'),
    debug: t.opt('boolean'),
    stream: t.opt('boolean'),
    validation: t.opt('ValidationType'),
    reconnectCount: t.opt('number'),
    ackTimeout: t.opt('number'),
    watchdogTimeout: t.opt('number'),
    jitterMin: t.opt('number'),
    jitterMax: t.opt('number'),
});

export const IConfigFunc = t.iface([], {
    config: t.func('IConfig', t.param('param', 'IConfig')),
});

export const IModel = t.iface([], {
    meta: 'Meta',
    id: t.func('string'),
    getType: t.func('string'),
    getUrl: t.func('string'),
    getClass: t.func('string'),
    reload: t.func('boolean', t.param('reloadAll', 'boolean', true)),
    removeChild: t.func('void', t.param('child', 'IModel')),
    addChildrenToStore: t.func('void'),
    setParent: t.func('void', t.param('parent', 'IModel', true)),
    parse: t.func('boolean', t.param('json', 'any')),
    toJSON: t.func(
        'JSONObject',
        t.param('customKeys', t.array('string'), true)
    ),
});

export const IModelFunc = t.iface([], {
    create: t.func('void', t.param('parameters', 'any')),
    fetch: t.func(t.array('any'), t.param('parameters', 'FetchRequest')),
    reload: t.func('boolean', t.param('reloadAll', 'boolean', true)),
    setParent: t.func('void', t.param('parent', 'IModel', true)),
    parse: t.func('boolean', t.param('json', 'any')),
    parseChildren: t.func('boolean', t.param('json', 'any')),
    onEvent: t.func('void', t.param('callback', 'StreamCallback')),
    onChange: t.func('void', t.param('callback', 'StreamCallback')),
    onDelete: t.func('void', t.param('callback', 'StreamCallback')),
    onCreate: t.func('void', t.param('callback', 'StreamCallback')),
    getFilterResult: t.func(
        'string',
        t.param('filter', 'Filter', true),
        t.param('omit_filter', 'Filter', true)
    ),
});

export const IData = t.iface([], {
    [t.indexKey]: 'any',
    meta: t.opt('Meta'),
});

export const IDataFunc = t.iface([], {
    fetchById: t.func('IModel', t.param('id', 'string')),
});

export const INetwork = t.iface([], {
    [t.indexKey]: 'any',
    meta: t.opt('Meta'),
    name: 'string',
    description: t.opt('string'),
});

export const INetworkFunc = t.iface([], {
    constructor: t.func('void', t.param('name', 'string', true)),
    createNetwork: t.func('INetwork', t.param('parameters', 'INetwork')),
    findDeviceByName: t.func(t.array('IDevice'), t.param('name', 'string')),
    findDeviceByProduct: t.func(
        t.array('IDevice'),
        t.param('product', 'string')
    ),
    findValueByName: t.func(t.array('ValueType'), t.param('name', 'string')),
    findValueByType: t.func(t.array('ValueType'), t.param('type', 'string')),
    createDevice: t.func('IDevice', t.param('parameters', 'IDevice')),
    find: t.func(
        t.array('INetwork'),
        t.param('options', 'JSONObject'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string'),
        t.param('filterRequest', 'JSONObject', true)
    ),
    findByName: t.func(
        t.array('INetwork'),
        t.param('name', 'string'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    findAllByName: t.func(
        t.array('INetwork'),
        t.param('name', 'string'),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    findById: t.func(
        'INetwork',
        t.param('id', 'string'),
        t.param('readOnly', 'boolean')
    ),
    findByFilter: t.func(
        t.array('INetwork'),
        t.param('filter', 'Filter'),
        t.param('omit_filter', 'Filter'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    findAllByFilter: t.func(
        t.array('INetwork'),
        t.param('filter', 'Filter'),
        t.param('omit_filter', 'Filter'),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    fetchById: t.func('INetwork', t.param('id', 'string')),
    fetchByName: t.func('IDevice', t.param('name', 'string')),
    getFilter: t.func(
        t.array('string'),
        t.param('filter', 'Filter', true),
        t.param('omit_filter', 'Filter', true)
    ),
    getFilterResult: t.func(
        'string',
        t.param('filter', 'Filter', true),
        t.param('omit_filter', 'Filter', true)
    ),
});

export const IDevice = t.iface([], {
    [t.indexKey]: 'any',
    meta: t.opt('Meta'),
    name: 'string',
    product: t.opt('string'),
    serial: t.opt('string'),
    description: t.opt('string'),
    protocol: t.opt('string'),
    communication: t.opt('string'),
    version: t.opt('string'),
    manufacturer: t.opt('string'),
});

export const ICreateValue = t.iface([], {
    name: 'string',
    permission: 'ValuePermission',
    template: 'ValueType',
    period: t.opt(t.union('number', 'string')),
    delta: t.opt(t.union('number', t.lit('inf'))),
    disableLog: t.opt('boolean'),
    initialState: t.opt('InitialState'),
    disablePeriodAndDelta: t.opt('boolean'),
});

export const IDeviceFunc = t.iface([], {
    constructor: t.func('void', t.param('name', 'string', true)),
    findValueByName: t.func(t.array('ValueType'), t.param('name', 'string')),
    findValueByType: t.func(t.array('ValueType'), t.param('type', 'string')),
    createValue: t.func(
        'ValueType',
        t.param('name', t.union('string', 'ICreateValue')),
        t.param('permission', 'ValuePermission', true),
        t.param('valueTemplate', 'ValueType', true),
        t.param('period', t.union('number', 'string'), true),
        t.param('delta', t.union('number', t.lit('inf')), true),
        t.param('disableLog', 'boolean', true)
    ),
    createNumberValue: t.func(
        'IValueNumber',
        t.param('parameters', 'IValueNumber')
    ),
    createStringValue: t.func(
        'IValueString',
        t.param('parameters', 'IValueString')
    ),
    createBlobValue: t.func('IValueBlob', t.param('parameters', 'IValueBlob')),
    createXmlValue: t.func('IValueXml', t.param('parameters', 'IValueXml')),
    find: t.func(
        t.array('IDevice'),
        t.param('options', 'JSONObject'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    findByName: t.func(
        t.array('IDevice'),
        t.param('name', 'string'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    findAllByName: t.func(
        t.array('IDevice'),
        t.param('name', 'string'),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    findByProduct: t.func(
        t.array('IDevice'),
        t.param('product', 'string'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    findAllByProduct: t.func(
        t.array('IDevice'),
        t.param('product', 'string'),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    findById: t.func(
        'IDevice',
        t.param('id', 'string'),
        t.param('readOnly', 'boolean')
    ),
    findByFilter: t.func(
        t.array('IDevice'),
        t.param('filter', 'Filter'),
        t.param('omit_filter', 'Filter'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    findAllByFilter: t.func(
        t.array('IDevice'),
        t.param('filter', 'Filter'),
        t.param('omit_filter', 'Filter'),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    fetchById: t.func('IDevice', t.param('id', 'string')),
    setConnectionStatus: t.func(
        'boolean',
        t.param('state', t.union('boolean', 'number'))
    ),
    getFilter: t.func(t.array('string'), t.param('filter', 'Filter', true)),
    getFilterResult: t.func('string', t.param('filter', 'Filter', true)),
});

export const IPermissionModelFunc = t.iface([], {
    request: t.func(
        t.array('JSONObject'),
        t.param('endpoint', 'string'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('message', 'string'),
        t.param('options', 'JSONObject', true),
        t.param('body', 'JSONObject', true),
        t.param('readOnly', 'boolean', true),
        t.param('create', 'boolean', true)
    ),
});

export const ValueType = t.union(
    t.intersection(
        'IValueBase',
        t.iface([], {
            number: 'IValueNumberBase',
        })
    ),
    t.intersection(
        'IValueBase',
        t.iface([], {
            string: 'IValueStringBlobBase',
        })
    ),
    t.intersection(
        'IValueBase',
        t.iface([], {
            blob: 'IValueStringBlobBase',
        })
    ),
    t.intersection(
        'IValueBase',
        t.iface([], {
            xml: 'IValueXmlBase',
        })
    )
);

export const IValueType = t.union(
    'IValueNumber',
    'IValueString',
    'IValueBlob',
    'IValueXml'
);

export const IValueBase = t.iface([], {
    [t.indexKey]: 'any',
    meta: t.opt('Meta'),
    name: 'string',
    permission: 'ValuePermission',
    type: 'string',
    description: t.opt('string'),
    period: t.opt(t.union('number', 'string')),
    delta: t.opt('string'),
    disableLog: t.opt('boolean'),
    initialState: t.opt('InitialState'),
    disablePeriodAndDelta: t.opt('boolean'),
});

export const IValueNumberBase = t.iface([], {
    min: 'number',
    max: 'number',
    step: 'number',
    unit: 'string',
    si_conversion: t.opt('string'),
    mapping: t.opt('JSONObject'),
    ordered_mapping: t.opt('boolean'),
    meaningful_zero: t.opt('boolean'),
});

export const IValueStringBlobBase = t.iface([], {
    max: 'number',
    encoding: t.opt('string'),
});

export const IValueXmlBase = t.iface([], {
    xsd: t.opt('string'),
    namespace: t.opt('string'),
});

export const IValueNumber = t.iface(['IValueBase', 'IValueNumberBase'], {});

export const IValueString = t.iface(['IValueBase', 'IValueStringBlobBase'], {});

export const IValueBlob = t.iface(['IValueBase', 'IValueStringBlobBase'], {});

export const IValueXml = t.iface(['IValueBase', 'IValueXmlBase'], {});

export const ReportValueInput = t.union(
    'string',
    'number',
    'boolean',
    'JSONObject'
);

export const IValueFunc = t.iface([], {
    createState: t.func('IState', t.param('parameters', 'IState')),
    deleteState: t.func('void', t.param('type', 'StateType')),
    report: t.func(
        'boolean',
        t.param('data', t.union('ReportValueInput', 'LogValues')),
        t.param('timestamp', 'Timestamp', true)
    ),
    forceReport: t.func(
        'boolean',
        t.param('data', 'ReportValueInput'),
        t.param('timestamp', 'Timestamp', true)
    ),
    control: t.func(
        'boolean',
        t.param('data', 'ReportValueInput'),
        t.param('timestamp', 'Timestamp', true)
    ),
    controlWithAck: t.func(
        t.union('string', 'undefined', 'null'),
        t.param('data', 'ReportValueInput'),
        t.param('timestamp', 'Timestamp', true)
    ),
    onControl: t.func('boolean', t.param('callback', 'ValueStreamCallback')),
    onReport: t.func(
        'boolean',
        t.param('callback', 'ValueStreamCallback'),
        t.param('callOnInit', 'boolean', true)
    ),
    onRefresh: t.func('boolean', t.param('callback', 'RefreshStreamCallback')),
    getReportLog: t.func('ILogResponse', t.param('request', 'LogRequest')),
    getControlLog: t.func('ILogResponse', t.param('request', 'LogRequest')),
    addEvent: t.func(
        'IEventLog',
        t.param('level', 'EventLogLevel'),
        t.param('message', 'string'),
        t.param('info', 'JSONObject', true)
    ),
    analyzeEnergy: t.func(
        'AnalyticsResponse',
        t.param('start', 'Timestamp'),
        t.param('end', 'Timestamp')
    ),
    summarizeEnergy: t.func(
        'AnalyticsResponse',
        t.param('start', 'Timestamp'),
        t.param('end', 'Timestamp')
    ),
    energyPieChart: t.func(
        'AnalyticsResponse',
        t.param('start', 'Timestamp'),
        t.param('end', 'Timestamp')
    ),
});

export const IValueStaticFunc = t.iface([], {
    constructor: t.func('IValueBase', t.param('name', 'string', true)),
    find: t.func(
        t.array('ValueType'),
        t.param('options', 'JSONObject'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    findByName: t.func(
        t.array('ValueType'),
        t.param('name', 'string'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    findByType: t.func(
        t.array('ValueType'),
        t.param('type', 'string'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    findAllByName: t.func(
        t.array('ValueType'),
        t.param('name', 'string'),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    findAllByType: t.func(
        t.array('ValueType'),
        t.param('type', 'string'),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    findById: t.func(
        'ValueType',
        t.param('id', 'string'),
        t.param('readOnly', 'boolean')
    ),
    findByFilter: t.func(
        t.array('ValueType'),
        t.param('filter', 'Filter'),
        t.param('omit_filter', 'Filter'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    findAllByFilter: t.func(
        t.array('ValueType'),
        t.param('filter', 'Filter'),
        t.param('omit_filter', 'Filter'),
        t.param('readOnly', 'boolean'),
        t.param('usage', 'string')
    ),
    fetchById: t.func('ValueType', t.param('id', 'string')),
    getFilter: t.func(
        t.array('string'),
        t.param('filter', 'Filter', true),
        t.param('omit_filter', 'Filter', true)
    ),
    getFilterResult: t.func(
        'string',
        t.param('filter', 'Filter', true),
        t.param('omit_filter', 'Filter', true)
    ),
});

export const IState = t.iface([], {
    [t.indexKey]: 'any',
    meta: t.opt('Meta'),
    type: 'StateType',
    status: t.opt('StateStatus'),
    data: t.opt('string'),
    timestamp: t.opt('string'),
});

export const IStateFunc = t.iface([], {
    constructor: t.func(
        'IState',
        t.param('type', 'StateType', true),
        t.param('data', 'string', true)
    ),
    findById: t.func('IState', t.param('id', 'string')),
    fetchById: t.func('IState', t.param('id', 'string')),
});

export const IEventLog = t.iface([], {
    message: 'string',
    level: 'EventLogLevel',
    info: t.opt('JSONObject'),
    type: t.opt('string'),
    timestamp: t.opt('Date'),
});

export const IEventLogFunc = t.iface([], {
    constructor: t.func(
        'IEventLog',
        t.param('level', 'EventLogLevel'),
        t.param('message', 'string')
    ),
});

export const INotificationFunc = t.iface([], {
    notify: t.func(
        'void',
        t.param('message', 'string'),
        t.param('level', 'EventLogLevel', true),
        t.param('data', 'JSONObject', true)
    ),
    sendMail: t.func('boolean', t.param('params', 'Mail')),
    sendSMS: t.func('boolean', t.param('msg', 'string')),
});

export const ILogResponse = t.iface([], {
    meta: 'Meta',
    data: 'LogValues',
    more: 'boolean',
    type: 'string',
});

export const ExtsyncResponse = t.iface([], {
    meta: t.opt('Meta'),
    headers: 'any',
    body: t.opt('JSONValue'),
    code: t.opt('number'),
    request: t.opt(t.union('JSONValue', 'string')),
    uri: t.opt('string'),
    method: t.opt('string'),
});

export const StreamData = t.name('JSONObject');

export const StreamEvent = t.iface([], {
    path: 'string',
    event: 'EventType',
    data: t.opt('StreamData'),
    meta_object: t.opt('Meta'),
    meta: t.opt('Meta'),
    extsync: t.opt('JSONValue'),
});

export const IStreamModel = t.iface([], {
    path: t.func('string'),
    handleStream: t.func('void', t.param('event', 'StreamEvent')),
});

export const IStreamFunc = t.iface([], {
    subscribe: t.func(
        'void',
        t.param('model', 'IStreamModel'),
        t.param('full', 'boolean', true)
    ),
    subscribeInternal: t.func(
        'void',
        t.param('type', 'string'),
        t.param('handler', 'ServiceHandler')
    ),
    subscribeService: t.func(
        'void',
        t.param('service', 'string'),
        t.param('handler', 'ServiceHandler'),
        t.param('full', 'boolean', true)
    ),
    sendRequest: t.func('JSONValue', t.param('msg', 'JSONValue')),
    sendEvent: t.func(
        'JSONValue',
        t.param('type', 'string'),
        t.param('msg', 'JSONValue')
    ),
    sendResponse: t.func(
        'void',
        t.param('event', 'ExtsyncResponse'),
        t.param('code', 'number'),
        t.param('msg', 'JSONValue')
    ),
    onRequest: t.func(
        'void',
        t.param('handler', 'RequestHandler'),
        t.param('internal', 'boolean')
    ),
    onWebHook: t.func('void', t.param('handler', 'RequestHandler')),
    fromForeground: t.func('void', t.param('callback', 'RequestHandler')),
    waitForBackground: t.func('boolean', t.param('timeout', 'number', true)),
});

export const IConnectionModel = t.iface([], {
    isOnline: t.func('boolean'),
});

export const IConnectionModelFunc = t.iface([], {
    onConnectionChange: t.func(
        'void',
        t.param('callback', 'ConnectionCallback')
    ),
    cancelOnConnectionChange: t.func(
        'void',
        t.param('callback', 'ConnectionCallback')
    ),
});

export const OAuthConnect = t.iface([], {
    meta: t.opt('Meta'),
    name: t.opt('string'),
    api: t.opt('string'),
    installation: t.opt('string'),
    token: t.opt('string'),
    secret_token: t.opt('string'),
    params: t.opt('any'),
    access_token_creation: t.opt('any'),
    data: t.opt(
        t.iface([], {
            request: t.opt('string'),
        })
    ),
});

export const OAuthRequestHandler = t.func(
    'void',
    t.param('url', t.union('string', 'undefined'))
);

export const IOAuthFunc = t.iface([], {
    constructor: t.func('void', t.param('name', 'string', true)),
    getToken: t.func('void', t.param('handler', 'OAuthRequestHandler', true)),
    staticGetToken: t.func(
        'void',
        t.param('name', 'string'),
        t.param('handler', 'OAuthRequestHandler', true)
    ),
});

export const IWappStorageFunc = t.iface([], {
    wappStorage: t.func('void', t.param('name', 'string', true)),
    constructor: t.func('void', t.param('name', 'string')),
    set: t.func(
        'boolean',
        t.param('name', t.union('string', 'any')),
        t.param('item', 'unknown', true)
    ),
    setSecret: t.func(
        'boolean',
        t.param('name', t.union('string', 'any')),
        t.param('item', 'unknown', true)
    ),
    get: t.func(
        'unknown',
        t.param('name', t.union('string', t.array('string')))
    ),
    getSecret: t.func(
        'unknown',
        t.param('name', t.union('string', t.array('string')))
    ),
    remove: t.func(
        'boolean',
        t.param('name', t.union('string', t.array('string')))
    ),
    removeSecret: t.func(
        'boolean',
        t.param('name', t.union('string', t.array('string')))
    ),
    onChange: t.func('void', t.param('cb', 'StorageChangeHandler')),
    cancelOnChange: t.func('void'),
});

export const IWappStorage = t.iface([], {
    name: 'string',
    id: 'string',
    set: t.func(
        'boolean',
        t.param('name', t.union('K', 'T')),
        t.param('item', 'unknown', true)
    ),
    setSecret: t.func(
        'boolean',
        t.param('name', t.union('K', 'T')),
        t.param('item', 'unknown', true)
    ),
    get: t.func(
        t.union('unknown', t.tuple('unknown'), 'undefined'),
        t.param('name', t.union('K', t.array('K')))
    ),
    getSecret: t.func(
        t.union('unknown', t.tuple('unknown'), 'undefined'),
        t.param('name', t.union('K', t.array('K')))
    ),
    keys: t.func(t.array('string')),
    values: t.func(t.array('unknown')),
    entries: t.func(t.array(t.tuple('key'))),
    string: 'any',
    value: 'unknown',
});

export const RequestType = t.iface([], {
    type: t.union(t.lit('foreground'), t.lit('background')),
    message: 'JSONValue',
});

export const StorageChangeHandler = t.func(t.union('void', 'void'));

export const StreamHandler = t.func(
    t.union(t.union('boolean', 'undefined'), 'boolean', 'undefined'),
    t.param('event', 'StreamEvent')
);

export const ServiceHandler = t.func(
    t.union(t.union('JSONValue', 'undefined'), 'JSONValue', 'undefined'),
    t.param('event', 'StreamData')
);

export const WappRequestHandler = t.func(
    t.union(t.union('JSONValue', 'void'), 'JSONValue', 'void'),
    t.param('event', 'T')
);

export const RequestHandler = t.func(
    t.union('JSONValue', 'JSONValue'),
    t.param('event', 'JSONValue'),
    t.param('method', 'string', true),
    t.param('path', 'string', true),
    t.param('query', 'JSONObject', true),
    t.param('headers', 'any', true)
);

export const StreamCallback = t.func(
    t.union('void', 'void'),
    t.param('model', 'IStreamModel')
);

export const ValueStreamCallback = t.func(
    t.union('void', 'boolean', 'void'),
    t.param('value', t.intersection('IValueFunc', 'IValueType')),
    t.param('data', 'string'),
    t.param('timestamp', 'string')
);

export const RefreshStreamCallback = t.func(
    t.union('void', 'void'),
    t.param('value', t.intersection('IValueFunc', 'IValueType')),
    t.param('origin', t.union(t.lit('user'), t.lit('period')))
);

export const ConnectionCallback = t.func(
    t.union('void', 'void'),
    t.param('value', 'IConnectionModel'),
    t.param('isOnline', 'boolean')
);

export const Relationship = t.name('string');

export const IEdge = t.iface([], {
    relationship: 'Relationship',
    to: 'IOntologyModel',
    name: t.opt('string'),
    description: t.opt('string'),
    data: t.opt('unknown'),
});

export const IOntologyModel = t.iface(['IModel'], {
    getParentEdges: t.func(t.array('IOntologyEdge')),
    createEdge: t.func('IOntologyEdge', t.param('params', 'IEdge')),
    getAllEdges: t.func(
        t.array('IOntologyEdge'),
        t.param('force', 'boolean', true)
    ),
    deleteBranch: t.func('void'),
    deleteEdge: t.func('void', t.param('params', 'IEdge')),
    removeEdge: t.func('void', t.param('edge', 'IModel')),
    deleteModelFromEdge: t.func('void', t.param('params', 'IEdge')),
    addParentEdge: t.func(
        'void',
        t.param('edge', 'IOntologyEdge'),
        t.param('to', 'IOntologyModel')
    ),
    removeParentEdge: t.func('void', t.param('edge', 'IOntologyEdge')),
});

export const IOntologyModelFunc = t.iface([], {
    createEdge: t.func('IOntologyEdge', t.param('params', 'IEdge')),
    getAllEdges: t.func(
        t.array('IOntologyEdge'),
        t.param('force', 'boolean', true)
    ),
    deleteBranch: t.func('void'),
    deleteEdge: t.func('void', t.param('params', 'IEdge')),
    removeEdge: t.func('void', t.param('edge', 'IModel')),
    deleteModelFromEdge: t.func('void', t.param('params', 'IEdge')),
    addParentEdge: t.func(
        'void',
        t.param('edge', 'IOntologyEdge'),
        t.param('to', 'IOntologyModel')
    ),
    removeParentEdge: t.func('void', t.param('edge', 'IOntologyEdge')),
});

export const IOntologyEdge = t.iface(['IModel'], {
    relationship: 'Relationship',
    models: t.array('IOntologyModel'),
    failedModels: 'any',
    to: 'any',
    name: t.opt('string'),
    description: t.opt('string'),
    data: t.opt('unknown'),
});

export const IOntologyEdgeFunc = t.iface([], {
    constructor: t.func('void'),
    removeTo: t.func('boolean', t.param('to', 'IModel')),
    deleteEdges: t.func('void'),
    getAllEdges: t.func(t.array('IOntologyEdge')),
    fetch: t.func(
        t.array('IOntologyEdge'),
        t.param('parameters', 'FetchRequest')
    ),
});

export const IOntologyNode = t.name('IOntologyModel');

export const IOntologyNodeFunc = t.iface(['IOntologyModelFunc'], {
    constructor: t.func('void', t.param('name', 'string', true)),
    createNode: t.func('IOntologyNode', t.param('name', 'string')),
    findNode: t.func('IOntologyNode', t.param('name', 'string')),
});

export const FilterSubType = t.name('any');

export const Filter = t.iface([], {
    network: t.opt(
        t.iface([], {
            name: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
            description: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
        })
    ),
    device: t.opt(
        t.iface([], {
            name: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
            product: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
            serial: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
            description: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
            protocol: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
            communication: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
            version: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
            manufacturer: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
        })
    ),
    value: t.opt(
        t.iface([], {
            name: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
            permission: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
            type: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
            description: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
            period: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
            delta: t.opt(
                t.union('string', t.array('string'), 'FilterValueOperatorType')
            ),
            number: t.opt(
                t.iface([], {
                    min: t.opt(
                        t.union(
                            'number',
                            t.array('number'),
                            'string',
                            t.array('string'),
                            'FilterValueOperatorType'
                        )
                    ),
                    max: t.opt(
                        t.union(
                            'number',
                            t.array('number'),
                            'string',
                            t.array('string'),
                            'FilterValueOperatorType'
                        )
                    ),
                    step: t.opt(
                        t.union(
                            'number',
                            t.array('number'),
                            'string',
                            t.array('string'),
                            'FilterValueOperatorType'
                        )
                    ),
                    unit: t.opt(
                        t.union(
                            'string',
                            t.array('string'),
                            'FilterValueOperatorType'
                        )
                    ),
                    si_conversion: t.opt(
                        t.union(
                            'string',
                            t.array('string'),
                            'FilterValueOperatorType'
                        )
                    ),
                })
            ),
            string: t.opt(
                t.iface([], {
                    max: t.opt(
                        t.union(
                            'number',
                            t.array('number'),
                            'string',
                            t.array('string'),
                            'FilterValueOperatorType'
                        )
                    ),
                    encoding: t.opt(
                        t.union(
                            'string',
                            t.array('string'),
                            'FilterValueOperatorType'
                        )
                    ),
                })
            ),
            blob: t.opt(
                t.iface([], {
                    max: t.opt(
                        t.union(
                            'number',
                            t.array('number'),
                            'string',
                            t.array('string'),
                            'FilterValueOperatorType'
                        )
                    ),
                    encoding: t.opt(
                        t.union(
                            'string',
                            t.array('string'),
                            'FilterValueOperatorType'
                        )
                    ),
                })
            ),
            xml: t.opt(
                t.iface([], {
                    xsd: t.opt(
                        t.union(
                            'string',
                            t.array('string'),
                            'FilterValueOperatorType'
                        )
                    ),
                    namespace: t.opt(
                        t.union(
                            'string',
                            t.array('string'),
                            'FilterValueOperatorType'
                        )
                    ),
                })
            ),
        })
    ),
});

const exportedTypeSuite: t.ITypeSuite = {
    IConfig,
    IConfigFunc,
    IModel,
    IModelFunc,
    IData,
    IDataFunc,
    INetwork,
    INetworkFunc,
    IDevice,
    ICreateValue,
    IDeviceFunc,
    IPermissionModelFunc,
    ValueType,
    IValueType,
    IValueBase,
    IValueNumberBase,
    IValueStringBlobBase,
    IValueXmlBase,
    IValueNumber,
    IValueString,
    IValueBlob,
    IValueXml,
    ReportValueInput,
    IValueFunc,
    IValueStaticFunc,
    IState,
    IStateFunc,
    IEventLog,
    IEventLogFunc,
    INotificationFunc,
    ILogResponse,
    ExtsyncResponse,
    StreamData,
    StreamEvent,
    IStreamModel,
    IStreamFunc,
    IConnectionModel,
    IConnectionModelFunc,
    OAuthConnect,
    OAuthRequestHandler,
    IOAuthFunc,
    IWappStorageFunc,
    IWappStorage,
    RequestType,
    StorageChangeHandler,
    StreamHandler,
    ServiceHandler,
    WappRequestHandler,
    RequestHandler,
    StreamCallback,
    ValueStreamCallback,
    RefreshStreamCallback,
    ConnectionCallback,
    Relationship,
    IEdge,
    IOntologyModel,
    IOntologyModelFunc,
    IOntologyEdge,
    IOntologyEdgeFunc,
    IOntologyNode,
    IOntologyNodeFunc,
    FilterSubType,
    Filter,
};
export default exportedTypeSuite;