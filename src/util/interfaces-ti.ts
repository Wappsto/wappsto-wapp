/**
 * This module was automatically generated by `ts-interface-builder`
 */
import * as t from 'ts-interface-checker';
// tslint:disable:object-literal-key-quotes

export const Timestamp = t.union('string', 'number', 'undefined');

export const ValidationType = t.union(t.lit('none'), t.lit('normal'));

export const IConfig = t.iface([], {
    verbose: t.opt('boolean'),
    requests: t.opt('boolean'),
    debug: t.opt('boolean'),
    stream: t.opt('boolean'),
    validation: t.opt('ValidationType'),
    reconnectCount: t.opt('number'),
    ackTimeout: t.opt('number'),
    jitterMin: t.opt('number'),
    jitterMax: t.opt('number'),
});

export const IConfigFunc = t.iface([], {
    config: t.func('IConfig', t.param('param', 'IConfig')),
});

export const IConnection = t.iface([], {
    timestamp: 'string',
    online: 'boolean',
});

export const IMeta = t.iface([], {
    id: t.opt('string'),
    type: t.opt('string'),
    version: 'string',
    redirect: t.opt('string'),
    manufacturer: t.opt('string'),
    iot: t.opt('boolean'),
    upgradable: t.opt('boolean'),
    connection: t.opt('IConnection'),
    created: t.opt('string'),
    updated: t.opt('string'),
    revision: t.opt('number'),
    changed: t.opt('string'),
    owner: t.opt('string'),
    size: t.opt('number'),
    path: t.opt('string'),
    parent: t.opt('string'),
    usage_daily: t.opt('any'),
    product: t.opt('string'),
    deprecated: t.opt('boolean'),
    icon: t.opt('string'),
    trace: t.opt('string'),
    historical: t.opt('boolean'),
});

export const FetchRequest = t.iface([], {
    endpoint: 'string',
    params: t.opt('any'),
    body: t.opt('any'),
    throw_error: t.opt('boolean'),
    go_internal: t.opt('boolean'),
});

export const IModel = t.iface([], {
    meta: 'IMeta',
    id: t.func('string'),
    getType: t.func('string'),
    getUrl: t.func('string'),
    getClass: t.func('string'),
    reload: t.func('boolean', t.param('reloadAll', 'boolean', true)),
    removeChild: t.func('void', t.param('child', 'IModel')),
    addChildrenToStore: t.func('void'),
    setParent: t.func('void', t.param('parent', 'IModel', true)),
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
});

export const INetwork = t.iface([], {
    [t.indexKey]: 'any',
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
        t.param('options', 'any'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('usage', 'string'),
        t.param('filterRequest', 'any', true)
    ),
    findByName: t.func(
        t.array('INetwork'),
        t.param('name', 'string'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('usage', 'string')
    ),
    findAllByName: t.func(
        t.array('INetwork'),
        t.param('name', 'string'),
        t.param('usage', 'string')
    ),
    findById: t.func('INetwork', t.param('id', 'string')),
    findByFilter: t.func(
        t.array('INetwork'),
        t.param('filter', 'Filter'),
        t.param('omit_filter', 'Filter'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('usage', 'string')
    ),
    findAllByFilter: t.func(
        t.array('INetwork'),
        t.param('filter', 'Filter'),
        t.param('omit_filter', 'Filter'),
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
    name: 'string',
    product: t.opt('string'),
    serial: t.opt('string'),
    description: t.opt('string'),
    protocol: t.opt('string'),
    communication: t.opt('string'),
    version: t.opt('string'),
    manufacturer: t.opt('string'),
});

export const IDeviceFunc = t.iface([], {
    constructor: t.func('void', t.param('name', 'string', true)),
    findValueByName: t.func(t.array('ValueType'), t.param('name', 'string')),
    findValueByType: t.func(t.array('ValueType'), t.param('type', 'string')),
    createValue: t.func(
        'ValueType',
        t.param('name', 'string'),
        t.param('permission', 'ValuePermission'),
        t.param('valueTemplate', 'ValueType'),
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
        t.param('options', 'any'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('usage', 'string')
    ),
    findByName: t.func(
        t.array('IDevice'),
        t.param('name', 'string'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('usage', 'string')
    ),
    findAllByName: t.func(
        t.array('IDevice'),
        t.param('name', 'string'),
        t.param('usage', 'string')
    ),
    findByProduct: t.func(
        t.array('IDevice'),
        t.param('product', 'string'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('usage', 'string')
    ),
    findAllByProduct: t.func(
        t.array('IDevice'),
        t.param('product', 'string'),
        t.param('usage', 'string')
    ),
    findById: t.func('IDevice', t.param('id', 'string')),
    findByFilter: t.func(
        t.array('IDevice'),
        t.param('filter', 'Filter'),
        t.param('omit_filter', 'Filter'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('usage', 'string')
    ),
    findAllByFilter: t.func(
        t.array('IDevice'),
        t.param('filter', 'Filter'),
        t.param('omit_filter', 'Filter'),
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
        t.array('any'),
        t.param('endpoint', 'string'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('message', 'string'),
        t.param('options', 'any', true),
        t.param('body', 'any', true)
    ),
});

export const ValuePermission = t.union(
    t.lit('r'),
    t.lit('w'),
    t.lit('rw'),
    t.lit('wr')
);

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

export const IValueBase = t.iface([], {
    [t.indexKey]: 'any',
    name: 'string',
    permission: 'ValuePermission',
    type: 'string',
    description: t.opt('string'),
    period: t.opt(t.union('number', 'string')),
    delta: t.opt('string'),
    disableLog: t.opt('boolean'),
});

export const IValueNumberBase = t.iface([], {
    min: 'number',
    max: 'number',
    step: 'number',
    unit: 'string',
    si_conversion: t.opt('string'),
    mapping: t.opt('any'),
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

export const IValueFunc = t.iface([], {
    constructor: t.func('IState', t.param('name', 'string', true)),
    createState: t.func('IState', t.param('parameters', 'IState')),
    report: t.func(
        'boolean',
        t.param('data', t.union('string', 'number')),
        t.param('timestamp', 'Timestamp')
    ),
    forceReport: t.func(
        'boolean',
        t.param('data', t.union('string', 'number')),
        t.param('timestamp', 'Timestamp')
    ),
    control: t.func(
        'boolean',
        t.param('data', t.union('string', 'number')),
        t.param('timestamp', 'Timestamp')
    ),
    controlWithAck: t.func(
        'boolean',
        t.param('data', t.union('string', 'number')),
        t.param('timestamp', 'Timestamp')
    ),
    onControl: t.func('boolean', t.param('callback', 'ValueStreamCallback')),
    onReport: t.func(
        'boolean',
        t.param('callback', 'ValueStreamCallback'),
        t.param('callOnInit', 'boolean', true)
    ),
    onRefresh: t.func('boolean', t.param('callback', 'RefreshStreamCallback')),
    getReportLog: t.func('ILogResponse', t.param('request', 'ILogRequest')),
    getControlLog: t.func('ILogResponse', t.param('request', 'ILogRequest')),
    find: t.func(
        t.array('ValueType'),
        t.param('options', 'any'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('usage', 'string')
    ),
    findByName: t.func(
        t.array('ValueType'),
        t.param('name', 'string'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('usage', 'string')
    ),
    findByType: t.func(
        t.array('ValueType'),
        t.param('type', 'string'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('usage', 'string')
    ),
    findAllByName: t.func(
        t.array('ValueType'),
        t.param('name', 'string'),
        t.param('usage', 'string')
    ),
    findAllByType: t.func(
        t.array('ValueType'),
        t.param('type', 'string'),
        t.param('usage', 'string')
    ),
    findById: t.func('ValueType', t.param('id', 'string')),
    findByFilter: t.func(
        t.array('ValueType'),
        t.param('filter', 'Filter'),
        t.param('omit_filter', 'Filter'),
        t.param('quantity', t.union('number', t.lit('all'))),
        t.param('usage', 'string')
    ),
    findAllByFilter: t.func(
        t.array('ValueType'),
        t.param('filter', 'Filter'),
        t.param('omit_filter', 'Filter'),
        t.param('usage', 'string')
    ),
    fetchById: t.func('ValueType', t.param('id', 'string')),
    addEvent: t.func(
        'IEventLog',
        t.param('level', 'EventLogLevel'),
        t.param('message', 'string'),
        t.param('info', 'any', true)
    ),
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

export const StateType = t.union(t.lit('Report'), t.lit('Control'));

export const StateStatus = t.union(
    t.lit('Send'),
    t.lit('Pending'),
    t.lit('Failed')
);

export const IState = t.iface([], {
    [t.indexKey]: 'any',
    type: 'StateType',
    status: t.opt('StateStatus'),
    data: t.opt('string'),
    timestamp: t.opt('string'),
});

export const IStateFunc = t.iface([], {
    constructor: t.func('IState', t.param('type', 'StateType', true)),
    findById: t.func('IState', t.param('id', 'string')),
    fetchById: t.func('IState', t.param('id', 'string')),
});

export const EventLogLevel = t.union(
    t.lit('important'),
    t.lit('error'),
    t.lit('success'),
    t.lit('warning'),
    t.lit('info'),
    t.lit('debug')
);

export const IEventLog = t.iface([], {
    message: 'string',
    level: 'EventLogLevel',
    info: t.opt('any'),
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

export const INotificationCustomData = t.iface([], {
    all: 'boolean',
    future: 'boolean',
    selected: t.array('any'),
});

export const INotificationCustom = t.iface([], {
    type: 'string',
    quantity: 'number',
    limitation: t.array('any'),
    method: t.array('any'),
    option: 'any',
    message: 'string',
    name_installation: 'string',
    title_installation: t.union('string', 'null'),
    data: t.opt('INotificationCustomData'),
});

export const INotificationBase = t.iface([], {
    action: 'string',
    code: 'number',
    type: 'string',
    from: 'string',
    to: 'string',
    from_type: 'string',
    from_name: 'string',
    to_type: 'string',
    type_ids: 'string',
    priority: 'number',
    ids: t.array('string'),
    info: t.array('any'),
    identifier: 'string',
});

export const INotificationFunc = t.iface([], {
    notify: t.func(
        'void',
        t.param('message', 'string'),
        t.param('level', 'EventLogLevel', true),
        t.param('data', 'any', true)
    ),
    sendMail: t.func('boolean', t.param('params', 'IMail')),
    sendSMS: t.func('boolean', t.param('msg', 'string')),
});

export const LogOperation = t.union(
    t.lit('arbitrary'),
    t.lit('array_agg'),
    t.lit('avg'),
    t.lit('mean'),
    t.lit('count'),
    t.lit('geometric_mean'),
    t.lit('max'),
    t.lit('min'),
    t.lit('sqrdiff'),
    t.lit('stddev'),
    t.lit('sum'),
    t.lit('variance'),
    t.lit('harmonic_mean'),
    t.lit('first'),
    t.lit('last'),
    t.lit('count_distinct'),
    t.lit('median'),
    t.lit('percentile'),
    t.lit('lower_quartile'),
    t.lit('upper_quartile'),
    t.lit('mode')
);

export const LogGroupBy = t.union(
    t.lit('year'),
    t.lit('quarter'),
    t.lit('month'),
    t.lit('week'),
    t.lit('day'),
    t.lit('hour'),
    t.lit('minute'),
    t.lit('second'),
    t.lit('millisecond'),
    t.lit('microsecond'),
    t.lit('dow'),
    t.lit('doy')
);

export const ILogRequest = t.iface([], {
    start: t.opt('Date'),
    end: t.opt('Date'),
    limit: t.opt('number'),
    offset: t.opt('number'),
    operation: t.opt('LogOperation'),
    group_by: t.opt('LogGroupBy'),
    timestamp_format: t.opt('string'),
    timezone: t.opt('string'),
    order: t.opt(t.union(t.lit('ascending'), t.lit('descending'))),
    order_by: t.opt('string'),
});

export const ILogResponse = t.iface([], {
    meta: 'IMeta',
    data: 'any',
    more: 'boolean',
    type: 'string',
});

export const EventType = t.union(
    t.lit('create'),
    t.lit('update'),
    t.lit('delete'),
    t.lit('direct')
);

export const IStreamEvent = t.iface([], {
    path: 'string',
    event: 'EventType',
    data: t.opt('any'),
    meta_object: t.opt('IMeta'),
    meta: t.opt('IMeta'),
    extsync: t.opt('any'),
});

export const IStreamModel = t.iface([], {
    path: t.func('string'),
    handleStream: t.func('void', t.param('event', 'IStreamEvent')),
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
    sendRequest: t.func('any', t.param('msg', 'any')),
    sendEvent: t.func('any', t.param('type', 'string'), t.param('msg', 'any')),
    sendResponse: t.func(
        'void',
        t.param('event', 'any'),
        t.param('code', 'number'),
        t.param('msg', 'any')
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
});

export const OAuthRequestHandler = t.func('void', t.param('url', 'string'));

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
    set: t.func('void', t.param('name', 'string'), t.param('item', 'any')),
    get: t.func('any', t.param('name', 'string')),
    remove: t.func('void', t.param('name', 'string')),
    onChange: t.func('void', t.param('cb', 'StorageChangeHandler')),
});

export const StorageChangeHandler = t.func('void');

export const ServiceHandler = t.func(
    t.union(t.union('boolean', 'undefined'), 'boolean', 'undefined'),
    t.param('event', 'any')
);

export const RequestHandler = t.func(
    t.union('any', 'any'),
    t.param('event', 'any')
);

export const StreamCallback = t.func(
    t.union('void', 'void'),
    t.param('model', 'IStreamModel')
);

export const ValueStreamCallback = t.func(
    t.union('void', 'boolean', 'void'),
    t.param('value', 'IValueBase'),
    t.param('data', 'string'),
    t.param('timestamp', 'string')
);

export const RefreshStreamCallback = t.func(
    t.union('void', 'void'),
    t.param('value', 'IValueBase'),
    t.param('origin', t.union(t.lit('user'), t.lit('period')))
);

export const ConnectionCallback = t.func(
    t.union('void', 'void'),
    t.param('value', 'IConnectionModel'),
    t.param('connection', 'boolean')
);

export const Relationship = t.name('string');

export const IOntology = t.iface([], {
    relationship: 'Relationship',
    to: 'IOntologyModel',
    name: t.opt('string'),
    description: t.opt('string'),
    data: t.opt('any'),
});

export const IOntologyModel = t.iface(['IModel'], {
    createEdge: t.func('IOntologyEdge', t.param('params', 'IOntology')),
    getAllEdges: t.func(
        t.array('IOntologyEdge'),
        t.param('force', 'boolean', true)
    ),
    deleteBranch: t.func('void'),
    deleteEdge: t.func('void', t.param('params', 'IOntology')),
    removeEdge: t.func('void', t.param('edge', 'IModel')),
});

export const IOntologyModelFunc = t.iface([], {
    createEdge: t.func('IOntologyEdge', t.param('params', 'IOntology')),
    getAllEdges: t.func(
        t.array('IOntologyEdge'),
        t.param('force', 'boolean', true)
    ),
    deleteBranch: t.func('void'),
    deleteEdge: t.func('void', t.param('params', 'IOntology')),
    removeEdge: t.func('void', t.param('edge', 'IModel')),
});

export const IOntologyEdge = t.iface(['IModel'], {
    relationship: 'Relationship',
    models: t.array('IOntologyModel'),
    to: 'any',
    name: t.opt('string'),
    description: t.opt('string'),
    data: t.opt('any'),
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

export const IMail = t.iface([], {
    body: 'string',
    subject: 'string',
    from: 'string',
});

export const Filter = t.iface([], {
    network: t.opt('any'),
    device: t.opt('any'),
    value: t.opt('any'),
});

const exportedTypeSuite: t.ITypeSuite = {
    Timestamp,
    ValidationType,
    IConfig,
    IConfigFunc,
    IConnection,
    IMeta,
    FetchRequest,
    IModel,
    IModelFunc,
    INetwork,
    INetworkFunc,
    IDevice,
    IDeviceFunc,
    IPermissionModelFunc,
    ValuePermission,
    ValueType,
    IValueBase,
    IValueNumberBase,
    IValueStringBlobBase,
    IValueXmlBase,
    IValueNumber,
    IValueString,
    IValueBlob,
    IValueXml,
    IValueFunc,
    StateType,
    StateStatus,
    IState,
    IStateFunc,
    EventLogLevel,
    IEventLog,
    IEventLogFunc,
    INotificationCustomData,
    INotificationCustom,
    INotificationBase,
    INotificationFunc,
    LogOperation,
    LogGroupBy,
    ILogRequest,
    ILogResponse,
    EventType,
    IStreamEvent,
    IStreamModel,
    IStreamFunc,
    IConnectionModel,
    IConnectionModelFunc,
    OAuthRequestHandler,
    IOAuthFunc,
    IWappStorageFunc,
    StorageChangeHandler,
    ServiceHandler,
    RequestHandler,
    StreamCallback,
    ValueStreamCallback,
    RefreshStreamCallback,
    ConnectionCallback,
    Relationship,
    IOntology,
    IOntologyModel,
    IOntologyModelFunc,
    IOntologyEdge,
    IOntologyEdgeFunc,
    IOntologyNode,
    IOntologyNodeFunc,
    IMail,
    Filter,
};
export default exportedTypeSuite;
