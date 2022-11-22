import { Model } from './model';
import { IEventLog, EventLogLevel } from '../util/interfaces';

export class EventLog extends Model implements IEventLog {
    static endpoint = '/2.1/eventlog';
    static attributes = ['message', 'level', 'info', 'type'];
    message = '';
    level: EventLogLevel = 'info';
    info?: Record<string, any>;
    type?: string;
    timestamp?: Date;

    constructor() {
        super('eventlog');
    }

    getAttributes(): string[] {
        return EventLog.attributes;
    }
}
