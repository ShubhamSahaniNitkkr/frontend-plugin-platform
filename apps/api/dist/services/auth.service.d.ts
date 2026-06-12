export declare function login(email: string, password: string): {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
        permissions: string[];
    };
} | null;
export declare function getMe(userId: string): {
    permissions: string[];
    id: string;
    email: string;
    name: string;
} | null;
//# sourceMappingURL=auth.service.d.ts.map