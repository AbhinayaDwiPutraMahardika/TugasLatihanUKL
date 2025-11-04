"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AttendanceService = class AttendanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(user_id, status) {
        const now = new Date();
        return this.prisma.attendance.create({
            data: {
                user_id,
                date: now,
                time: now.toLocaleTimeString('id-ID', { hour12: false }),
                status: status,
            },
        });
    }
    async findAll() {
        return this.prisma.attendance.findMany({
            include: { user: true },
            orderBy: { date: 'desc' },
        });
    }
    async findMine(user_id) {
        return this.prisma.attendance.findMany({
            where: { user_id },
            orderBy: { date: 'desc' },
        });
    }
    async findToday(user_id) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return this.prisma.attendance.findMany({
            where: {
                user_id,
                date: {
                    gte: today,
                    lt: tomorrow,
                },
            },
            orderBy: { time: 'asc' },
        });
    }
    async updateStatus(id, status, userRole) {
        if (userRole !== 'admin') {
            throw new common_1.ForbiddenException('Only admin can update attendance');
        }
        return this.prisma.attendance.update({
            where: { id },
            data: { status },
        });
    }
    async getMonthlyReport(month, year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);
        return this.prisma.attendance.findMany({
            where: {
                date: { gte: startDate, lte: endDate },
            },
            include: { user: true },
            orderBy: { user_id: 'asc' },
        });
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map