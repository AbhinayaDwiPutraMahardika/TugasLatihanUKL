import { PrismaService } from '../prisma/prisma.service';
export declare class AttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    create(user_id: number, status: string): Promise<{
        id: number;
        date: Date;
        time: string;
        status: string;
        user_id: number;
    }>;
    findAll(): Promise<({
        user: {
            name: string;
            username: string;
            password: string;
            createdAt: Date;
            role: string;
            id: number;
        };
    } & {
        id: number;
        date: Date;
        time: string;
        status: string;
        user_id: number;
    })[]>;
    findMine(user_id: number): Promise<{
        id: number;
        date: Date;
        time: string;
        status: string;
        user_id: number;
    }[]>;
    findToday(user_id: number): Promise<{
        id: number;
        date: Date;
        time: string;
        status: string;
        user_id: number;
    }[]>;
    updateStatus(id: number, status: string, userRole: string): Promise<{
        id: number;
        date: Date;
        time: string;
        status: string;
        user_id: number;
    }>;
    getMonthlyReport(month: number, year: number): Promise<({
        user: {
            name: string;
            username: string;
            password: string;
            createdAt: Date;
            role: string;
            id: number;
        };
    } & {
        id: number;
        date: Date;
        time: string;
        status: string;
        user_id: number;
    })[]>;
}
