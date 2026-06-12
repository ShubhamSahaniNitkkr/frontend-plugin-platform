export function errorHandler(err, _req, res, _next) {
    console.error('[API Error]', err);
    res.status(500).json({
        type: 'about:blank',
        title: 'Internal Server Error',
        status: 500,
        detail: err.message,
    });
}
//# sourceMappingURL=errorHandler.js.map