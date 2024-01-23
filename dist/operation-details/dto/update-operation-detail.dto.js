"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOperationDetailDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_operation_detail_dto_1 = require("./create-operation-detail.dto");
class UpdateOperationDetailDto extends (0, mapped_types_1.PartialType)((0, mapped_types_1.OmitType)(create_operation_detail_dto_1.CreateOperationDetailDto, ['operation', 'productQuantity', 'product'])) {
}
exports.UpdateOperationDetailDto = UpdateOperationDetailDto;
//# sourceMappingURL=update-operation-detail.dto.js.map