export function paramId(req, key = 'id') {
    const value = req.params[key];
    return Array.isArray(value) ? value[0] : value;
}
//# sourceMappingURL=params.js.map