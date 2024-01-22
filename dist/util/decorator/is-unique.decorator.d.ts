import { ValidationOptions } from 'class-validator';
export type IsUniqeInterface = {
    tableName: string;
    column: string;
};
export declare function isUnique(options: IsUniqeInterface, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
