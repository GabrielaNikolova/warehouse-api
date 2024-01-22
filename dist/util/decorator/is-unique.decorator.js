"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnique = void 0;
const class_validator_1 = require("class-validator");
const is_unique_validator_1 = require("../validator/is-unique.validator");
function isUnique(options, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isUnique',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: is_unique_validator_1.IsUniqueConstraint,
        });
    };
}
exports.isUnique = isUnique;
//# sourceMappingURL=is-unique.decorator.js.map