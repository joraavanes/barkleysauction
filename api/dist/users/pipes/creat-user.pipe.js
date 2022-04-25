"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatUserPipe = void 0;
const common_1 = require("@nestjs/common");
let CreatUserPipe = class CreatUserPipe {
    transform(value, metadata) {
        return value;
    }
};
CreatUserPipe = __decorate([
    (0, common_1.Injectable)()
], CreatUserPipe);
exports.CreatUserPipe = CreatUserPipe;
//# sourceMappingURL=creat-user.pipe.js.map