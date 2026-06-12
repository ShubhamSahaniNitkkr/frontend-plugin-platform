import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('[API Error]', err);
  res.status(500).json({
    type: 'about:blank',
    title: 'Internal Server Error',
    status: 500,
    detail: err.message,
  });
}
