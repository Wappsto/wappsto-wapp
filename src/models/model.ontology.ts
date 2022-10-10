import { Model } from './model';
import { Ontology } from './ontology';
import {
    IModel,
    IOntology,
    IOntologyModel,
    IOntologyEdge,
} from '../util/interfaces';

export class OntologyModel extends Model implements IOntologyModel {
    ontology: Ontology[] = [];
    ontologyLoaded = false;

    public async createEdge(params: IOntology): Promise<Ontology> {
        Model.validateMethod('OntologyModel', 'createEdge', arguments);

        await this.getAllEdges();

        let create = false;
        let onto = await this.findEdge(params);
        if (!onto) {
            onto = new Ontology(this, params.relationship, params.to);
            this.ontology.push(onto);
            create = true;
        }

        if (params.name !== undefined) {
            onto.name = params.name;
        }
        if (params.description !== undefined) {
            onto.description = params.description;
        }
        if (params.data !== undefined) {
            onto.data = params.data;
        }

        if (create) {
            await onto.create();
        }

        return onto;
    }

    public async deleteEdges(): Promise<void> {
        await this.getAllEdges();

        while (this.ontology.length) {
            await this.ontology[0].delete();
        }
    }

    public deleteEdge(edge: IModel): void {
        Model.validateMethod('OntologyModel', 'deleteEdge', arguments);

        for (let i = 0; i < this.ontology.length; i++) {
            if (this.ontology[i].id() === edge.id()) {
                this.ontology.splice(i, 1);
                return;
            }
        }
    }

    public async findEdge(params: IOntology): Promise<Ontology | undefined> {
        await this.getAllEdges();

        for (let i = 0; i < this.ontology.length; i++) {
            const o = this.ontology[i];
            if (o.relationship === params.relationship) {
                if (o.models.find((m) => m.id() === params.to.id())) {
                    return o;
                }
            }
        }
        return undefined;
    }

    public async deleteBranch(): Promise<void> {
        await this.getAllEdges();

        const onto = this.ontology;
        this.ontology = [];

        for (let i = 0; i < onto.length; i++) {
            await onto[i].deleteBranch();
        }

        if (this.getClass() === 'ontology_node') {
            await this.delete();
        }
    }

    public async getAllEdges(): Promise<IOntologyEdge[]> {
        if (!this.ontologyLoaded) {
            this.ontologyLoaded = true;
            this.ontology = await Ontology.fetch(`${this.getUrl()}/ontology`);
            this.ontology.forEach((o) => {
                o.setParent(this);
            });
        }
        return this.ontology;
    }
}
