import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: any): Promise<{
        name: string;
        username: string;
        password: string;
        createdAt: Date;
        role: string;
        id: number;
    }>;
    findAll(req: any): Promise<{
        name: string;
        username: string;
        createdAt: Date;
        role: string;
        id: number;
    }[] | {
        message: string;
    }>;
    findOne(id: string, req: any): Promise<{
        name: string;
        username: string;
        createdAt: Date;
        role: string;
        id: number;
    } | {
        message: string;
    } | null>;
    updateSelf(req: any, updateUserDto: any): Promise<{
        name: string;
        username: string;
        createdAt: Date;
        role: string;
        id: number;
    }>;
    remove(id: string, req: any): Promise<{
        name: string;
        username: string;
        id: number;
    } | {
        message: string;
    }>;
}
