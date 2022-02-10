import { Model } from './model';
import { openStream } from './stream';
import { printError } from '../util/debug';
import { PermissionModel } from './model.permission';
import { IStreamModel, IStreamEvent, StreamCallback } from '../util/interfaces';

interface IStreamCallbacks {
    change: StreamCallback[];
    delete: StreamCallback[];
    create: StreamCallback[];
}

export class StreamModel extends PermissionModel implements IStreamModel {
    streamCallback: IStreamCallbacks = {
        change: [],
        delete: [],
        create: [],
    } as IStreamCallbacks;

    public onChange(callback: StreamCallback): void {
        Model.validateMethod('Model', 'onChange', arguments);
        openStream.subscribe(this);
        this.streamCallback.change.push(callback);
    }

    public onDelete(callback: StreamCallback): void {
        Model.validateMethod('Model', 'onDelete', arguments);
        openStream.subscribe(this);
        this.streamCallback.delete.push(callback);
    }

    public onCreate(callback: StreamCallback): void {
        Model.validateMethod('Model', 'onDelete', arguments);
        openStream.subscribe(this);
        this.streamCallback.create.push(callback);
    }

    public clearAllCallbacks(): void {
        openStream.unsubscribe(this);
        this.streamCallback.change = [];
        this.streamCallback.delete = [];
        this.streamCallback.create = [];
    }

    handleStream(event: IStreamEvent): void {
        switch (event?.event) {
            case 'create':
                this.streamCallback.create.forEach((cb) => {
                    cb(this);
                });
                break;
            case 'update':
                if (this.parse(event.data)) {
                    this.streamCallback.change.forEach((cb) => {
                        cb(this);
                    });
                }
                break;
            case 'delete':
                this.streamCallback.delete.forEach((cb) => {
                    cb(this);
                });
                break;
            default:
                printError('Unhandled stream event type: ' + event?.event);
                break;
        }
    }
}
