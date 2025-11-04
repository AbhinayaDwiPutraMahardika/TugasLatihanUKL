import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(req: any, status: string): Promise<{
        date: Date;
        time: string;
        status: string;
        id: number;
        user_id: number;
    }>;
    findAll(req: any): Promise<({
        user: {
            id: number;
            name: string;
            username: string;
            password: string;
            createdAt: Date;
            role: string;
        };
    } & {
        date: Date;
        time: string;
        status: string;
        id: number;
        user_id: number;
    })[] | {
        message: string;
    }>;
    findMine(req: any): Promise<{
        date: Date;
        time: string;
        status: string;
        id: number;
        user_id: number;
    }[]>;
    findToday(req: any): Promise<{
        date: Date;
        time: string;
        status: string;
        id: number;
        user_id: number;
    }[]>;
    updateStatus(req: any, id: string, status: string): Promise<{
        date: Date;
        time: string;
        status: string;
        id: number;
        user_id: number;
    }>;
    getMonthlyReport(req: any, month: string, year: string): Promise<({
        user: {
            id: number;
            name: string;
            username: string;
            password: string;
            createdAt: Date;
            role: string;
        };
    } & {
        date: Date;
        time: string;
        status: string;
        id: number;
        user_id: number;
    })[] | {
        message: string;
    }>;
}
