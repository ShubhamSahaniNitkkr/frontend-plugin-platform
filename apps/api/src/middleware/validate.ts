import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        type: 'about:blank',
        title: 'Validation Error',
        status: 400,
        detail: result.error.errors.map((e) => e.message).join(', '),
      });
      return;
    }
    req.body = result.data;
    next();
  };
}
