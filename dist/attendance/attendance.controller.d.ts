import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(req: any, status: string): Promise<{
        id: number;
        date: Date;
        time: string;
        status: string;
        user_id: number;
    }>;
    findAll(req: any): Promise<({
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
    })[] | {
        message: string;
    }>;
    findMine(req: any): Promise<{
        id: number;
        date: Date;
        time: string;
        status: string;
        user_id: number;
    }[]>;
    findToday(req: any): Promise<{
        id: number;
        date: Date;
        time: string;
        status: string;
        user_id: number;
    }[]>;
    updateStatus(req: any, id: string, status: string): Promise<{
        id: number;
        date: Date;
        time: string;
        status: string;
        user_id: number;
    }>;
    getMonthlyReport(req: any, month: string, year: string): Promise<({
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
    })[] | {
        message: string;
    }>;
}
