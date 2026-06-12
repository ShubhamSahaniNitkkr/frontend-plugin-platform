import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
export declare function validateBody<T>(schema: ZodSchema<T>): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.d.ts.map