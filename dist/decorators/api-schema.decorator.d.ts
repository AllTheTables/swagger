import { SchemaObjectMetadata } from '../interfaces/schema-object-metadata.interface';
export interface ApiSchemaOptions extends Pick<SchemaObjectMetadata, 'name'> {
    name: string;
}
export declare function ApiSchema(options: ApiSchemaOptions): ClassDecorator;
export declare function createApiSchemaDecorator(options: ApiSchemaOptions): ClassDecorator;
