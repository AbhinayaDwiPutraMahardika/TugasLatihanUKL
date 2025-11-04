import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            name: string;
            username: string;
            password: string;
            createdAt: Date;
            role: string;
            id: number;
        };
    }>;
}
