import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        name: string;
        username: string;
        password: string;
        createdAt: Date;
        role: string;
        id: number;
    }>;
    findAll(): Promise<{
        name: string;
        username: string;
        createdAt: Date;
        role: string;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        username: string;
        createdAt: Date;
        role: string;
        id: number;
    } | null>;
    update(id: number, data: any): Promise<{
        name: string;
        username: string;
        createdAt: Date;
        role: string;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        username: string;
        id: number;
    }>;
}
