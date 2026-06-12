export function validateBody(schema) {
    return (req, res, next) => {
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
//# sourceMappingURL=validate.js.map