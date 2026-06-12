import { jsx as S, jsxs as K, Fragment as De } from "react/jsx-runtime";
import { createContext as $e, useContext as Re, useCallback as Rt, useId as $r, forwardRef as te, Children as Rr, cloneElement as Ar, createElement as Ze, memo as Ir } from "react";
const Or = [
  "tasks:read",
  "tasks:write",
  "tasks:delete",
  "reports:read",
  "reports:generate",
  "reports:export",
  "analytics:read",
  "notifications:read",
  "notifications:write",
  "events:task.*",
  "events:report.*",
  "events:user.*",
  "events:locale.*",
  "events:theme.*",
  "storage:local"
], jr = [
  "dashboard.main",
  "dashboard.sidebar",
  "header.actions",
  "settings.sections",
  "reports.widgets",
  "sidebar.nav"
];
var w;
(function(t) {
  t.assertEqual = (s) => {
  };
  function e(s) {
  }
  t.assertIs = e;
  function r(s) {
    throw new Error();
  }
  t.assertNever = r, t.arrayToEnum = (s) => {
    const a = {};
    for (const i of s)
      a[i] = i;
    return a;
  }, t.getValidEnumValues = (s) => {
    const a = t.objectKeys(s).filter((o) => typeof s[s[o]] != "number"), i = {};
    for (const o of a)
      i[o] = s[o];
    return t.objectValues(i);
  }, t.objectValues = (s) => t.objectKeys(s).map(function(a) {
    return s[a];
  }), t.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
    const a = [];
    for (const i in s)
      Object.prototype.hasOwnProperty.call(s, i) && a.push(i);
    return a;
  }, t.find = (s, a) => {
    for (const i of s)
      if (a(i))
        return i;
  }, t.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && Number.isFinite(s) && Math.floor(s) === s;
  function n(s, a = " | ") {
    return s.map((i) => typeof i == "string" ? `'${i}'` : i).join(a);
  }
  t.joinValues = n, t.jsonStringifyReplacer = (s, a) => typeof a == "bigint" ? a.toString() : a;
})(w || (w = {}));
var ut;
(function(t) {
  t.mergeShapes = (e, r) => ({
    ...e,
    ...r
    // second overwrites first
  });
})(ut || (ut = {}));
const p = w.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), W = (t) => {
  switch (typeof t) {
    case "undefined":
      return p.undefined;
    case "string":
      return p.string;
    case "number":
      return Number.isNaN(t) ? p.nan : p.number;
    case "boolean":
      return p.boolean;
    case "function":
      return p.function;
    case "bigint":
      return p.bigint;
    case "symbol":
      return p.symbol;
    case "object":
      return Array.isArray(t) ? p.array : t === null ? p.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? p.promise : typeof Map < "u" && t instanceof Map ? p.map : typeof Set < "u" && t instanceof Set ? p.set : typeof Date < "u" && t instanceof Date ? p.date : p.object;
    default:
      return p.unknown;
  }
}, l = w.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class M extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (n) => {
      this.issues = [...this.issues, n];
    }, this.addIssues = (n = []) => {
      this.issues = [...this.issues, ...n];
    };
    const r = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const r = e || function(a) {
      return a.message;
    }, n = { _errors: [] }, s = (a) => {
      for (const i of a.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(s);
        else if (i.code === "invalid_return_type")
          s(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          s(i.argumentsError);
        else if (i.path.length === 0)
          n._errors.push(r(i));
        else {
          let o = n, c = 0;
          for (; c < i.path.length; ) {
            const d = i.path[c];
            c === i.path.length - 1 ? (o[d] = o[d] || { _errors: [] }, o[d]._errors.push(r(i))) : o[d] = o[d] || { _errors: [] }, o = o[d], c++;
          }
        }
    };
    return s(this), n;
  }
  static assert(e) {
    if (!(e instanceof M))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, w.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (r) => r.message) {
    const r = {}, n = [];
    for (const s of this.issues)
      if (s.path.length > 0) {
        const a = s.path[0];
        r[a] = r[a] || [], r[a].push(e(s));
      } else
        n.push(e(s));
    return { formErrors: n, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
M.create = (t) => new M(t);
const We = (t, e) => {
  let r;
  switch (t.code) {
    case l.invalid_type:
      t.received === p.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
      break;
    case l.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(t.expected, w.jsonStringifyReplacer)}`;
      break;
    case l.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${w.joinValues(t.keys, ", ")}`;
      break;
    case l.invalid_union:
      r = "Invalid input";
      break;
    case l.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${w.joinValues(t.options)}`;
      break;
    case l.invalid_enum_value:
      r = `Invalid enum value. Expected ${w.joinValues(t.options)}, received '${t.received}'`;
      break;
    case l.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case l.invalid_return_type:
      r = "Invalid function return type";
      break;
    case l.invalid_date:
      r = "Invalid date";
      break;
    case l.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input: must end with "${t.validation.endsWith}"` : w.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r = "Invalid";
      break;
    case l.too_small:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "bigint" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : r = "Invalid input";
      break;
    case l.too_big:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : r = "Invalid input";
      break;
    case l.custom:
      r = "Invalid input";
      break;
    case l.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case l.not_multiple_of:
      r = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case l.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = e.defaultError, w.assertNever(t);
  }
  return { message: r };
};
let Er = We;
function Zr() {
  return Er;
}
const Pr = (t) => {
  const { data: e, path: r, errorMaps: n, issueData: s } = t, a = [...r, ...s.path || []], i = {
    ...s,
    path: a
  };
  if (s.message !== void 0)
    return {
      ...s,
      path: a,
      message: s.message
    };
  let o = "";
  const c = n.filter((d) => !!d).slice().reverse();
  for (const d of c)
    o = d(i, { data: e, defaultError: o }).message;
  return {
    ...s,
    path: a,
    message: o
  };
};
function h(t, e) {
  const r = Zr(), n = Pr({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      // contextual error map is first priority
      t.schemaErrorMap,
      // then schema-bound map if available
      r,
      // then global override map
      r === We ? void 0 : We
      // then global default map
    ].filter((s) => !!s)
  });
  t.common.issues.push(n);
}
class R {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, r) {
    const n = [];
    for (const s of r) {
      if (s.status === "aborted")
        return _;
      s.status === "dirty" && e.dirty(), n.push(s.value);
    }
    return { status: e.value, value: n };
  }
  static async mergeObjectAsync(e, r) {
    const n = [];
    for (const s of r) {
      const a = await s.key, i = await s.value;
      n.push({
        key: a,
        value: i
      });
    }
    return R.mergeObjectSync(e, n);
  }
  static mergeObjectSync(e, r) {
    const n = {};
    for (const s of r) {
      const { key: a, value: i } = s;
      if (a.status === "aborted" || i.status === "aborted")
        return _;
      a.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof i.value < "u" || s.alwaysSet) && (n[a.value] = i.value);
    }
    return { status: e.value, value: n };
  }
}
const _ = Object.freeze({
  status: "aborted"
}), le = (t) => ({ status: "dirty", value: t }), O = (t) => ({ status: "valid", value: t }), ft = (t) => t.status === "aborted", ht = (t) => t.status === "dirty", re = (t) => t.status === "valid", _e = (t) => typeof Promise < "u" && t instanceof Promise;
var m;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(m || (m = {}));
class P {
  constructor(e, r, n, s) {
    this._cachedPath = [], this.parent = e, this.data = r, this._path = n, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const pt = (t, e) => {
  if (re(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const r = new M(t.common.issues);
      return this._error = r, this._error;
    }
  };
};
function x(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: r, required_error: n, description: s } = t;
  if (e && (r || n))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (i, o) => {
    const { message: c } = t;
    return i.code === "invalid_enum_value" ? { message: c ?? o.defaultError } : typeof o.data > "u" ? { message: c ?? n ?? o.defaultError } : i.code !== "invalid_type" ? { message: o.defaultError } : { message: c ?? r ?? o.defaultError };
  }, description: s };
}
class b {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return W(e.data);
  }
  _getOrReturnCtx(e, r) {
    return r || {
      common: e.parent.common,
      data: e.data,
      parsedType: W(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new R(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: W(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const r = this._parse(e);
    if (_e(r))
      throw new Error("Synchronous parse encountered promise.");
    return r;
  }
  _parseAsync(e) {
    const r = this._parse(e);
    return Promise.resolve(r);
  }
  parse(e, r) {
    const n = this.safeParse(e, r);
    if (n.success)
      return n.data;
    throw n.error;
  }
  safeParse(e, r) {
    const n = {
      common: {
        issues: [],
        async: (r == null ? void 0 : r.async) ?? !1,
        contextualErrorMap: r == null ? void 0 : r.errorMap
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: W(e)
    }, s = this._parseSync({ data: e, path: n.path, parent: n });
    return pt(n, s);
  }
  "~validate"(e) {
    var n, s;
    const r = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: W(e)
    };
    if (!this["~standard"].async)
      try {
        const a = this._parseSync({ data: e, path: [], parent: r });
        return re(a) ? {
          value: a.value
        } : {
          issues: r.common.issues
        };
      } catch (a) {
        (s = (n = a == null ? void 0 : a.message) == null ? void 0 : n.toLowerCase()) != null && s.includes("encountered") && (this["~standard"].async = !0), r.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: r }).then((a) => re(a) ? {
      value: a.value
    } : {
      issues: r.common.issues
    });
  }
  async parseAsync(e, r) {
    const n = await this.safeParseAsync(e, r);
    if (n.success)
      return n.data;
    throw n.error;
  }
  async safeParseAsync(e, r) {
    const n = {
      common: {
        issues: [],
        contextualErrorMap: r == null ? void 0 : r.errorMap,
        async: !0
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: W(e)
    }, s = this._parse({ data: e, path: n.path, parent: n }), a = await (_e(s) ? s : Promise.resolve(s));
    return pt(n, a);
  }
  refine(e, r) {
    const n = (s) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(s) : r;
    return this._refinement((s, a) => {
      const i = e(s), o = () => a.addIssue({
        code: l.custom,
        ...n(s)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((c) => c ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
    });
  }
  refinement(e, r) {
    return this._refinement((n, s) => e(n) ? !0 : (s.addIssue(typeof r == "function" ? r(n, s) : r), !1));
  }
  _refinement(e) {
    return new ae({
      schema: this,
      typeName: v.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (r) => this["~validate"](r)
    };
  }
  optional() {
    return U.create(this, this._def);
  }
  nullable() {
    return ie.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Z.create(this);
  }
  promise() {
    return Se.create(this, this._def);
  }
  or(e) {
    return be.create([this, e], this._def);
  }
  and(e) {
    return ke.create(this, e, this._def);
  }
  transform(e) {
    return new ae({
      ...x(this._def),
      schema: this,
      typeName: v.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const r = typeof e == "function" ? e : () => e;
    return new qe({
      ...x(this._def),
      innerType: this,
      defaultValue: r,
      typeName: v.ZodDefault
    });
  }
  brand() {
    return new an({
      typeName: v.ZodBranded,
      type: this,
      ...x(this._def)
    });
  }
  catch(e) {
    const r = typeof e == "function" ? e : () => e;
    return new He({
      ...x(this._def),
      innerType: this,
      catchValue: r,
      typeName: v.ZodCatch
    });
  }
  describe(e) {
    const r = this.constructor;
    return new r({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return Ke.create(this, e);
  }
  readonly() {
    return Ge.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const zr = /^c[^\s-]{8,}$/i, Mr = /^[0-9a-z]+$/, Vr = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Lr = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Br = /^[a-z0-9_-]{21}$/i, Dr = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Wr = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Ur = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Fr = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Pe;
const qr = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Hr = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Gr = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Jr = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Yr = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Xr = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, At = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Qr = new RegExp(`^${At}$`);
function It(t) {
  let e = "[0-5]\\d";
  t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`);
  const r = t.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${r}`;
}
function Kr(t) {
  return new RegExp(`^${It(t)}$`);
}
function en(t) {
  let e = `${At}T${It(t)}`;
  const r = [];
  return r.push(t.local ? "Z?" : "Z"), t.offset && r.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${r.join("|")})`, new RegExp(`^${e}$`);
}
function tn(t, e) {
  return !!((e === "v4" || !e) && qr.test(t) || (e === "v6" || !e) && Gr.test(t));
}
function rn(t, e) {
  if (!Dr.test(t))
    return !1;
  try {
    const [r] = t.split(".");
    if (!r)
      return !1;
    const n = r.replace(/-/g, "+").replace(/_/g, "/").padEnd(r.length + (4 - r.length % 4) % 4, "="), s = JSON.parse(atob(n));
    return !(typeof s != "object" || s === null || "typ" in s && (s == null ? void 0 : s.typ) !== "JWT" || !s.alg || e && s.alg !== e);
  } catch {
    return !1;
  }
}
function nn(t, e) {
  return !!((e === "v4" || !e) && Hr.test(t) || (e === "v6" || !e) && Jr.test(t));
}
class z extends b {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== p.string) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: l.invalid_type,
        expected: p.string,
        received: a.parsedType
      }), _;
    }
    const n = new R();
    let s;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (s = this._getOrReturnCtx(e, s), h(s, {
          code: l.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), n.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (s = this._getOrReturnCtx(e, s), h(s, {
          code: l.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), n.dirty());
      else if (a.kind === "length") {
        const i = e.data.length > a.value, o = e.data.length < a.value;
        (i || o) && (s = this._getOrReturnCtx(e, s), i ? h(s, {
          code: l.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : o && h(s, {
          code: l.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), n.dirty());
      } else if (a.kind === "email")
        Ur.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "email",
          code: l.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "emoji")
        Pe || (Pe = new RegExp(Fr, "u")), Pe.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "emoji",
          code: l.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "uuid")
        Lr.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "uuid",
          code: l.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "nanoid")
        Br.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "nanoid",
          code: l.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "cuid")
        zr.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "cuid",
          code: l.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "cuid2")
        Mr.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "cuid2",
          code: l.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "ulid")
        Vr.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "ulid",
          code: l.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), h(s, {
            validation: "url",
            code: l.invalid_string,
            message: a.message
          }), n.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "regex",
        code: l.invalid_string,
        message: a.message
      }), n.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: l.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), n.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: l.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), n.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: l.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), n.dirty()) : a.kind === "datetime" ? en(a).test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: l.invalid_string,
        validation: "datetime",
        message: a.message
      }), n.dirty()) : a.kind === "date" ? Qr.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: l.invalid_string,
        validation: "date",
        message: a.message
      }), n.dirty()) : a.kind === "time" ? Kr(a).test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: l.invalid_string,
        validation: "time",
        message: a.message
      }), n.dirty()) : a.kind === "duration" ? Wr.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "duration",
        code: l.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "ip" ? tn(e.data, a.version) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "ip",
        code: l.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "jwt" ? rn(e.data, a.alg) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "jwt",
        code: l.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "cidr" ? nn(e.data, a.version) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "cidr",
        code: l.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "base64" ? Yr.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "base64",
        code: l.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "base64url" ? Xr.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "base64url",
        code: l.invalid_string,
        message: a.message
      }), n.dirty()) : w.assertNever(a);
    return { status: n.value, value: e.data };
  }
  _regex(e, r, n) {
    return this.refinement((s) => e.test(s), {
      validation: r,
      code: l.invalid_string,
      ...m.errToObj(n)
    });
  }
  _addCheck(e) {
    return new z({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...m.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...m.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...m.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...m.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...m.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...m.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...m.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...m.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...m.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...m.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...m.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...m.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...m.errToObj(e) });
  }
  datetime(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (e == null ? void 0 : e.offset) ?? !1,
      local: (e == null ? void 0 : e.local) ?? !1,
      ...m.errToObj(e == null ? void 0 : e.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      ...m.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...m.errToObj(e) });
  }
  regex(e, r) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...m.errToObj(r)
    });
  }
  includes(e, r) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: r == null ? void 0 : r.position,
      ...m.errToObj(r == null ? void 0 : r.message)
    });
  }
  startsWith(e, r) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...m.errToObj(r)
    });
  }
  endsWith(e, r) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...m.errToObj(r)
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...m.errToObj(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...m.errToObj(r)
    });
  }
  length(e, r) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...m.errToObj(r)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, m.errToObj(e));
  }
  trim() {
    return new z({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new z({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new z({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
z.create = (t) => new z({
  checks: [],
  typeName: v.ZodString,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...x(t)
});
function sn(t, e) {
  const r = (t.toString().split(".")[1] || "").length, n = (e.toString().split(".")[1] || "").length, s = r > n ? r : n, a = Number.parseInt(t.toFixed(s).replace(".", "")), i = Number.parseInt(e.toFixed(s).replace(".", ""));
  return a % i / 10 ** s;
}
class ne extends b {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== p.number) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: l.invalid_type,
        expected: p.number,
        received: a.parsedType
      }), _;
    }
    let n;
    const s = new R();
    for (const a of this._def.checks)
      a.kind === "int" ? w.isInteger(e.data) || (n = this._getOrReturnCtx(e, n), h(n, {
        code: l.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), s.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (n = this._getOrReturnCtx(e, n), h(n, {
        code: l.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (n = this._getOrReturnCtx(e, n), h(n, {
        code: l.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? sn(e.data, a.value) !== 0 && (n = this._getOrReturnCtx(e, n), h(n, {
        code: l.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (n = this._getOrReturnCtx(e, n), h(n, {
        code: l.not_finite,
        message: a.message
      }), s.dirty()) : w.assertNever(a);
    return { status: s.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, m.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, m.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, m.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, m.toString(r));
  }
  setLimit(e, r, n, s) {
    return new ne({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: n,
          message: m.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new ne({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: m.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: m.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: m.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: m.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: m.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: m.toString(r)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: m.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: m.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: m.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && w.isInteger(e.value));
  }
  get isFinite() {
    let e = null, r = null;
    for (const n of this._def.checks) {
      if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf")
        return !0;
      n.kind === "min" ? (r === null || n.value > r) && (r = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    }
    return Number.isFinite(r) && Number.isFinite(e);
  }
}
ne.create = (t) => new ne({
  checks: [],
  typeName: v.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...x(t)
});
class ue extends b {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== p.bigint)
      return this._getInvalidInput(e);
    let n;
    const s = new R();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (n = this._getOrReturnCtx(e, n), h(n, {
        code: l.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (n = this._getOrReturnCtx(e, n), h(n, {
        code: l.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (n = this._getOrReturnCtx(e, n), h(n, {
        code: l.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : w.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _getInvalidInput(e) {
    const r = this._getOrReturnCtx(e);
    return h(r, {
      code: l.invalid_type,
      expected: p.bigint,
      received: r.parsedType
    }), _;
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, m.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, m.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, m.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, m.toString(r));
  }
  setLimit(e, r, n, s) {
    return new ue({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: n,
          message: m.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new ue({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: m.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: m.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: m.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: m.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: m.toString(r)
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
ue.create = (t) => new ue({
  checks: [],
  typeName: v.ZodBigInt,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...x(t)
});
class mt extends b {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== p.boolean) {
      const n = this._getOrReturnCtx(e);
      return h(n, {
        code: l.invalid_type,
        expected: p.boolean,
        received: n.parsedType
      }), _;
    }
    return O(e.data);
  }
}
mt.create = (t) => new mt({
  typeName: v.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...x(t)
});
class xe extends b {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== p.date) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: l.invalid_type,
        expected: p.date,
        received: a.parsedType
      }), _;
    }
    if (Number.isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: l.invalid_date
      }), _;
    }
    const n = new R();
    let s;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (s = this._getOrReturnCtx(e, s), h(s, {
        code: l.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), n.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (s = this._getOrReturnCtx(e, s), h(s, {
        code: l.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), n.dirty()) : w.assertNever(a);
    return {
      status: n.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new xe({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: m.toString(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: m.toString(r)
    });
  }
  get minDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
}
xe.create = (t) => new xe({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: v.ZodDate,
  ...x(t)
});
class yt extends b {
  _parse(e) {
    if (this._getType(e) !== p.symbol) {
      const n = this._getOrReturnCtx(e);
      return h(n, {
        code: l.invalid_type,
        expected: p.symbol,
        received: n.parsedType
      }), _;
    }
    return O(e.data);
  }
}
yt.create = (t) => new yt({
  typeName: v.ZodSymbol,
  ...x(t)
});
class gt extends b {
  _parse(e) {
    if (this._getType(e) !== p.undefined) {
      const n = this._getOrReturnCtx(e);
      return h(n, {
        code: l.invalid_type,
        expected: p.undefined,
        received: n.parsedType
      }), _;
    }
    return O(e.data);
  }
}
gt.create = (t) => new gt({
  typeName: v.ZodUndefined,
  ...x(t)
});
class vt extends b {
  _parse(e) {
    if (this._getType(e) !== p.null) {
      const n = this._getOrReturnCtx(e);
      return h(n, {
        code: l.invalid_type,
        expected: p.null,
        received: n.parsedType
      }), _;
    }
    return O(e.data);
  }
}
vt.create = (t) => new vt({
  typeName: v.ZodNull,
  ...x(t)
});
class _t extends b {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return O(e.data);
  }
}
_t.create = (t) => new _t({
  typeName: v.ZodAny,
  ...x(t)
});
class Ue extends b {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return O(e.data);
  }
}
Ue.create = (t) => new Ue({
  typeName: v.ZodUnknown,
  ...x(t)
});
class F extends b {
  _parse(e) {
    const r = this._getOrReturnCtx(e);
    return h(r, {
      code: l.invalid_type,
      expected: p.never,
      received: r.parsedType
    }), _;
  }
}
F.create = (t) => new F({
  typeName: v.ZodNever,
  ...x(t)
});
class xt extends b {
  _parse(e) {
    if (this._getType(e) !== p.undefined) {
      const n = this._getOrReturnCtx(e);
      return h(n, {
        code: l.invalid_type,
        expected: p.void,
        received: n.parsedType
      }), _;
    }
    return O(e.data);
  }
}
xt.create = (t) => new xt({
  typeName: v.ZodVoid,
  ...x(t)
});
class Z extends b {
  _parse(e) {
    const { ctx: r, status: n } = this._processInputParams(e), s = this._def;
    if (r.parsedType !== p.array)
      return h(r, {
        code: l.invalid_type,
        expected: p.array,
        received: r.parsedType
      }), _;
    if (s.exactLength !== null) {
      const i = r.data.length > s.exactLength.value, o = r.data.length < s.exactLength.value;
      (i || o) && (h(r, {
        code: i ? l.too_big : l.too_small,
        minimum: o ? s.exactLength.value : void 0,
        maximum: i ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), n.dirty());
    }
    if (s.minLength !== null && r.data.length < s.minLength.value && (h(r, {
      code: l.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), n.dirty()), s.maxLength !== null && r.data.length > s.maxLength.value && (h(r, {
      code: l.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), n.dirty()), r.common.async)
      return Promise.all([...r.data].map((i, o) => s.type._parseAsync(new P(r, i, r.path, o)))).then((i) => R.mergeArray(n, i));
    const a = [...r.data].map((i, o) => s.type._parseSync(new P(r, i, r.path, o)));
    return R.mergeArray(n, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, r) {
    return new Z({
      ...this._def,
      minLength: { value: e, message: m.toString(r) }
    });
  }
  max(e, r) {
    return new Z({
      ...this._def,
      maxLength: { value: e, message: m.toString(r) }
    });
  }
  length(e, r) {
    return new Z({
      ...this._def,
      exactLength: { value: e, message: m.toString(r) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Z.create = (t, e) => new Z({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: v.ZodArray,
  ...x(e)
});
function Q(t) {
  if (t instanceof N) {
    const e = {};
    for (const r in t.shape) {
      const n = t.shape[r];
      e[r] = U.create(Q(n));
    }
    return new N({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof Z ? new Z({
    ...t._def,
    type: Q(t.element)
  }) : t instanceof U ? U.create(Q(t.unwrap())) : t instanceof ie ? ie.create(Q(t.unwrap())) : t instanceof Y ? Y.create(t.items.map((e) => Q(e))) : t;
}
class N extends b {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), r = w.objectKeys(e);
    return this._cached = { shape: e, keys: r }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== p.object) {
      const d = this._getOrReturnCtx(e);
      return h(d, {
        code: l.invalid_type,
        expected: p.object,
        received: d.parsedType
      }), _;
    }
    const { status: n, ctx: s } = this._processInputParams(e), { shape: a, keys: i } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof F && this._def.unknownKeys === "strip"))
      for (const d in s.data)
        i.includes(d) || o.push(d);
    const c = [];
    for (const d of i) {
      const u = a[d], f = s.data[d];
      c.push({
        key: { status: "valid", value: d },
        value: u._parse(new P(s, f, s.path, d)),
        alwaysSet: d in s.data
      });
    }
    if (this._def.catchall instanceof F) {
      const d = this._def.unknownKeys;
      if (d === "passthrough")
        for (const u of o)
          c.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: s.data[u] }
          });
      else if (d === "strict")
        o.length > 0 && (h(s, {
          code: l.unrecognized_keys,
          keys: o
        }), n.dirty());
      else if (d !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const d = this._def.catchall;
      for (const u of o) {
        const f = s.data[u];
        c.push({
          key: { status: "valid", value: u },
          value: d._parse(
            new P(s, f, s.path, u)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: u in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const d = [];
      for (const u of c) {
        const f = await u.key, y = await u.value;
        d.push({
          key: f,
          value: y,
          alwaysSet: u.alwaysSet
        });
      }
      return d;
    }).then((d) => R.mergeObjectSync(n, d)) : R.mergeObjectSync(n, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return m.errToObj, new N({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (r, n) => {
          var a, i;
          const s = ((i = (a = this._def).errorMap) == null ? void 0 : i.call(a, r, n).message) ?? n.defaultError;
          return r.code === "unrecognized_keys" ? {
            message: m.errToObj(e).message ?? s
          } : {
            message: s
          };
        }
      } : {}
    });
  }
  strip() {
    return new N({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new N({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new N({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new N({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: v.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, r) {
    return this.augment({ [e]: r });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new N({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const r = {};
    for (const n of w.objectKeys(e))
      e[n] && this.shape[n] && (r[n] = this.shape[n]);
    return new N({
      ...this._def,
      shape: () => r
    });
  }
  omit(e) {
    const r = {};
    for (const n of w.objectKeys(this.shape))
      e[n] || (r[n] = this.shape[n]);
    return new N({
      ...this._def,
      shape: () => r
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return Q(this);
  }
  partial(e) {
    const r = {};
    for (const n of w.objectKeys(this.shape)) {
      const s = this.shape[n];
      e && !e[n] ? r[n] = s : r[n] = s.optional();
    }
    return new N({
      ...this._def,
      shape: () => r
    });
  }
  required(e) {
    const r = {};
    for (const n of w.objectKeys(this.shape))
      if (e && !e[n])
        r[n] = this.shape[n];
      else {
        let a = this.shape[n];
        for (; a instanceof U; )
          a = a._def.innerType;
        r[n] = a;
      }
    return new N({
      ...this._def,
      shape: () => r
    });
  }
  keyof() {
    return Ot(w.objectKeys(this.shape));
  }
}
N.create = (t, e) => new N({
  shape: () => t,
  unknownKeys: "strip",
  catchall: F.create(),
  typeName: v.ZodObject,
  ...x(e)
});
N.strictCreate = (t, e) => new N({
  shape: () => t,
  unknownKeys: "strict",
  catchall: F.create(),
  typeName: v.ZodObject,
  ...x(e)
});
N.lazycreate = (t, e) => new N({
  shape: t,
  unknownKeys: "strip",
  catchall: F.create(),
  typeName: v.ZodObject,
  ...x(e)
});
class be extends b {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = this._def.options;
    function s(a) {
      for (const o of a)
        if (o.result.status === "valid")
          return o.result;
      for (const o of a)
        if (o.result.status === "dirty")
          return r.common.issues.push(...o.ctx.common.issues), o.result;
      const i = a.map((o) => new M(o.ctx.common.issues));
      return h(r, {
        code: l.invalid_union,
        unionErrors: i
      }), _;
    }
    if (r.common.async)
      return Promise.all(n.map(async (a) => {
        const i = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: r.data,
            path: r.path,
            parent: i
          }),
          ctx: i
        };
      })).then(s);
    {
      let a;
      const i = [];
      for (const c of n) {
        const d = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        }, u = c._parseSync({
          data: r.data,
          path: r.path,
          parent: d
        });
        if (u.status === "valid")
          return u;
        u.status === "dirty" && !a && (a = { result: u, ctx: d }), d.common.issues.length && i.push(d.common.issues);
      }
      if (a)
        return r.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((c) => new M(c));
      return h(r, {
        code: l.invalid_union,
        unionErrors: o
      }), _;
    }
  }
  get options() {
    return this._def.options;
  }
}
be.create = (t, e) => new be({
  options: t,
  typeName: v.ZodUnion,
  ...x(e)
});
function Fe(t, e) {
  const r = W(t), n = W(e);
  if (t === e)
    return { valid: !0, data: t };
  if (r === p.object && n === p.object) {
    const s = w.objectKeys(e), a = w.objectKeys(t).filter((o) => s.indexOf(o) !== -1), i = { ...t, ...e };
    for (const o of a) {
      const c = Fe(t[o], e[o]);
      if (!c.valid)
        return { valid: !1 };
      i[o] = c.data;
    }
    return { valid: !0, data: i };
  } else if (r === p.array && n === p.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let a = 0; a < t.length; a++) {
      const i = t[a], o = e[a], c = Fe(i, o);
      if (!c.valid)
        return { valid: !1 };
      s.push(c.data);
    }
    return { valid: !0, data: s };
  } else return r === p.date && n === p.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class ke extends b {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e), s = (a, i) => {
      if (ft(a) || ft(i))
        return _;
      const o = Fe(a.value, i.value);
      return o.valid ? ((ht(a) || ht(i)) && r.dirty(), { status: r.value, value: o.data }) : (h(n, {
        code: l.invalid_intersection_types
      }), _);
    };
    return n.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }),
      this._def.right._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      })
    ]).then(([a, i]) => s(a, i)) : s(this._def.left._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }), this._def.right._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }));
  }
}
ke.create = (t, e, r) => new ke({
  left: t,
  right: e,
  typeName: v.ZodIntersection,
  ...x(r)
});
class Y extends b {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== p.array)
      return h(n, {
        code: l.invalid_type,
        expected: p.array,
        received: n.parsedType
      }), _;
    if (n.data.length < this._def.items.length)
      return h(n, {
        code: l.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), _;
    !this._def.rest && n.data.length > this._def.items.length && (h(n, {
      code: l.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const a = [...n.data].map((i, o) => {
      const c = this._def.items[o] || this._def.rest;
      return c ? c._parse(new P(n, i, n.path, o)) : null;
    }).filter((i) => !!i);
    return n.common.async ? Promise.all(a).then((i) => R.mergeArray(r, i)) : R.mergeArray(r, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new Y({
      ...this._def,
      rest: e
    });
  }
}
Y.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Y({
    items: t,
    typeName: v.ZodTuple,
    rest: null,
    ...x(e)
  });
};
class we extends b {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== p.object)
      return h(n, {
        code: l.invalid_type,
        expected: p.object,
        received: n.parsedType
      }), _;
    const s = [], a = this._def.keyType, i = this._def.valueType;
    for (const o in n.data)
      s.push({
        key: a._parse(new P(n, o, n.path, o)),
        value: i._parse(new P(n, n.data[o], n.path, o)),
        alwaysSet: o in n.data
      });
    return n.common.async ? R.mergeObjectAsync(r, s) : R.mergeObjectSync(r, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, r, n) {
    return r instanceof b ? new we({
      keyType: e,
      valueType: r,
      typeName: v.ZodRecord,
      ...x(n)
    }) : new we({
      keyType: z.create(),
      valueType: e,
      typeName: v.ZodRecord,
      ...x(r)
    });
  }
}
class bt extends b {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== p.map)
      return h(n, {
        code: l.invalid_type,
        expected: p.map,
        received: n.parsedType
      }), _;
    const s = this._def.keyType, a = this._def.valueType, i = [...n.data.entries()].map(([o, c], d) => ({
      key: s._parse(new P(n, o, n.path, [d, "key"])),
      value: a._parse(new P(n, c, n.path, [d, "value"]))
    }));
    if (n.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of i) {
          const d = await c.key, u = await c.value;
          if (d.status === "aborted" || u.status === "aborted")
            return _;
          (d.status === "dirty" || u.status === "dirty") && r.dirty(), o.set(d.value, u.value);
        }
        return { status: r.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const c of i) {
        const d = c.key, u = c.value;
        if (d.status === "aborted" || u.status === "aborted")
          return _;
        (d.status === "dirty" || u.status === "dirty") && r.dirty(), o.set(d.value, u.value);
      }
      return { status: r.value, value: o };
    }
  }
}
bt.create = (t, e, r) => new bt({
  valueType: e,
  keyType: t,
  typeName: v.ZodMap,
  ...x(r)
});
class fe extends b {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== p.set)
      return h(n, {
        code: l.invalid_type,
        expected: p.set,
        received: n.parsedType
      }), _;
    const s = this._def;
    s.minSize !== null && n.data.size < s.minSize.value && (h(n, {
      code: l.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), r.dirty()), s.maxSize !== null && n.data.size > s.maxSize.value && (h(n, {
      code: l.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), r.dirty());
    const a = this._def.valueType;
    function i(c) {
      const d = /* @__PURE__ */ new Set();
      for (const u of c) {
        if (u.status === "aborted")
          return _;
        u.status === "dirty" && r.dirty(), d.add(u.value);
      }
      return { status: r.value, value: d };
    }
    const o = [...n.data.values()].map((c, d) => a._parse(new P(n, c, n.path, d)));
    return n.common.async ? Promise.all(o).then((c) => i(c)) : i(o);
  }
  min(e, r) {
    return new fe({
      ...this._def,
      minSize: { value: e, message: m.toString(r) }
    });
  }
  max(e, r) {
    return new fe({
      ...this._def,
      maxSize: { value: e, message: m.toString(r) }
    });
  }
  size(e, r) {
    return this.min(e, r).max(e, r);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
fe.create = (t, e) => new fe({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: v.ZodSet,
  ...x(e)
});
class kt extends b {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
kt.create = (t, e) => new kt({
  getter: t,
  typeName: v.ZodLazy,
  ...x(e)
});
class wt extends b {
  _parse(e) {
    if (e.data !== this._def.value) {
      const r = this._getOrReturnCtx(e);
      return h(r, {
        received: r.data,
        code: l.invalid_literal,
        expected: this._def.value
      }), _;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
wt.create = (t, e) => new wt({
  value: t,
  typeName: v.ZodLiteral,
  ...x(e)
});
function Ot(t, e) {
  return new se({
    values: t,
    typeName: v.ZodEnum,
    ...x(e)
  });
}
class se extends b {
  _parse(e) {
    if (typeof e.data != "string") {
      const r = this._getOrReturnCtx(e), n = this._def.values;
      return h(r, {
        expected: w.joinValues(n),
        received: r.parsedType,
        code: l.invalid_type
      }), _;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const r = this._getOrReturnCtx(e), n = this._def.values;
      return h(r, {
        received: r.data,
        code: l.invalid_enum_value,
        options: n
      }), _;
    }
    return O(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Values() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  extract(e, r = this._def) {
    return se.create(e, {
      ...this._def,
      ...r
    });
  }
  exclude(e, r = this._def) {
    return se.create(this.options.filter((n) => !e.includes(n)), {
      ...this._def,
      ...r
    });
  }
}
se.create = Ot;
class St extends b {
  _parse(e) {
    const r = w.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
    if (n.parsedType !== p.string && n.parsedType !== p.number) {
      const s = w.objectValues(r);
      return h(n, {
        expected: w.joinValues(s),
        received: n.parsedType,
        code: l.invalid_type
      }), _;
    }
    if (this._cache || (this._cache = new Set(w.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const s = w.objectValues(r);
      return h(n, {
        received: n.data,
        code: l.invalid_enum_value,
        options: s
      }), _;
    }
    return O(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
St.create = (t, e) => new St({
  values: t,
  typeName: v.ZodNativeEnum,
  ...x(e)
});
class Se extends b {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== p.promise && r.common.async === !1)
      return h(r, {
        code: l.invalid_type,
        expected: p.promise,
        received: r.parsedType
      }), _;
    const n = r.parsedType === p.promise ? r.data : Promise.resolve(r.data);
    return O(n.then((s) => this._def.type.parseAsync(s, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
Se.create = (t, e) => new Se({
  type: t,
  typeName: v.ZodPromise,
  ...x(e)
});
class ae extends b {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === v.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e), s = this._def.effect || null, a = {
      addIssue: (i) => {
        h(n, i), i.fatal ? r.abort() : r.dirty();
      },
      get path() {
        return n.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), s.type === "preprocess") {
      const i = s.transform(n.data, a);
      if (n.common.async)
        return Promise.resolve(i).then(async (o) => {
          if (r.value === "aborted")
            return _;
          const c = await this._def.schema._parseAsync({
            data: o,
            path: n.path,
            parent: n
          });
          return c.status === "aborted" ? _ : c.status === "dirty" || r.value === "dirty" ? le(c.value) : c;
        });
      {
        if (r.value === "aborted")
          return _;
        const o = this._def.schema._parseSync({
          data: i,
          path: n.path,
          parent: n
        });
        return o.status === "aborted" ? _ : o.status === "dirty" || r.value === "dirty" ? le(o.value) : o;
      }
    }
    if (s.type === "refinement") {
      const i = (o) => {
        const c = s.refinement(o, a);
        if (n.common.async)
          return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (n.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return o.status === "aborted" ? _ : (o.status === "dirty" && r.dirty(), i(o.value), { status: r.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((o) => o.status === "aborted" ? _ : (o.status === "dirty" && r.dirty(), i(o.value).then(() => ({ status: r.value, value: o.value }))));
    }
    if (s.type === "transform")
      if (n.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        if (!re(i))
          return _;
        const o = s.transform(i.value, a);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((i) => re(i) ? Promise.resolve(s.transform(i.value, a)).then((o) => ({
          status: r.value,
          value: o
        })) : _);
    w.assertNever(s);
  }
}
ae.create = (t, e, r) => new ae({
  schema: t,
  typeName: v.ZodEffects,
  effect: e,
  ...x(r)
});
ae.createWithPreprocess = (t, e, r) => new ae({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: v.ZodEffects,
  ...x(r)
});
class U extends b {
  _parse(e) {
    return this._getType(e) === p.undefined ? O(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
U.create = (t, e) => new U({
  innerType: t,
  typeName: v.ZodOptional,
  ...x(e)
});
class ie extends b {
  _parse(e) {
    return this._getType(e) === p.null ? O(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ie.create = (t, e) => new ie({
  innerType: t,
  typeName: v.ZodNullable,
  ...x(e)
});
class qe extends b {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    let n = r.data;
    return r.parsedType === p.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
qe.create = (t, e) => new qe({
  innerType: t,
  typeName: v.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...x(e)
});
class He extends b {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = {
      ...r,
      common: {
        ...r.common,
        issues: []
      }
    }, s = this._def.innerType._parse({
      data: n.data,
      path: n.path,
      parent: {
        ...n
      }
    });
    return _e(s) ? s.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new M(n.common.issues);
        },
        input: n.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new M(n.common.issues);
        },
        input: n.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
He.create = (t, e) => new He({
  innerType: t,
  typeName: v.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...x(e)
});
class Ct extends b {
  _parse(e) {
    if (this._getType(e) !== p.nan) {
      const n = this._getOrReturnCtx(e);
      return h(n, {
        code: l.invalid_type,
        expected: p.nan,
        received: n.parsedType
      }), _;
    }
    return { status: "valid", value: e.data };
  }
}
Ct.create = (t) => new Ct({
  typeName: v.ZodNaN,
  ...x(t)
});
class an extends b {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = r.data;
    return this._def.type._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class Ke extends b {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return a.status === "aborted" ? _ : a.status === "dirty" ? (r.dirty(), le(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: n.path,
          parent: n
        });
      })();
    {
      const s = this._def.in._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      });
      return s.status === "aborted" ? _ : s.status === "dirty" ? (r.dirty(), {
        status: "dirty",
        value: s.value
      }) : this._def.out._parseSync({
        data: s.value,
        path: n.path,
        parent: n
      });
    }
  }
  static create(e, r) {
    return new Ke({
      in: e,
      out: r,
      typeName: v.ZodPipeline
    });
  }
}
class Ge extends b {
  _parse(e) {
    const r = this._def.innerType._parse(e), n = (s) => (re(s) && (s.value = Object.freeze(s.value)), s);
    return _e(r) ? r.then((s) => n(s)) : n(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ge.create = (t, e) => new Ge({
  innerType: t,
  typeName: v.ZodReadonly,
  ...x(e)
});
var v;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(v || (v = {}));
const g = z.create, jt = ne.create, et = Ue.create;
F.create;
const on = Z.create, $ = N.create;
be.create;
ke.create;
Y.create;
const Ae = we.create, X = se.create;
Se.create;
U.create;
ie.create;
$({
  taskId: g(),
  title: g(),
  userId: g()
});
$({
  taskId: g(),
  changes: Ae(et())
});
$({
  taskId: g()
});
$({
  reportId: g(),
  type: g(),
  title: g().optional()
});
$({
  userId: g(),
  email: g(),
  timestamp: g()
});
$({
  message: g(),
  variant: X(["info", "success", "error", "warning"]).default("info"),
  title: g().optional()
});
$({
  pluginId: g(),
  error: g(),
  stack: g().optional()
});
$({
  pluginId: g(),
  version: g().optional()
});
$({
  locale: g()
});
$({
  primaryColor: g(),
  label: g().optional()
});
const cn = $({
  id: g().min(1),
  name: g().min(1),
  version: g().regex(/^\d+\.\d+\.\d+$/),
  description: g(),
  author: g(),
  entry: g(),
  hostCompatibility: g().default("^1.0.0"),
  permissions: on(X(Or)).default([]),
  dependencies: Ae(g()).optional(),
  icon: g().optional(),
  category: g().optional()
});
$({
  path: g(),
  label: g().optional(),
  permission: g().optional()
});
$({
  slot: X(jr),
  priority: jt().default(0)
});
$({
  label: g(),
  path: g(),
  icon: g().optional(),
  section: g().optional(),
  order: jt().default(0)
});
$({
  email: g().email(),
  password: g().min(6)
});
$({
  version: g().optional()
});
$({
  version: g()
});
Ae(et());
const dn = $({
  title: g().min(1),
  description: g().optional(),
  status: X(["todo", "in_progress", "done"]).default("todo"),
  priority: X(["low", "medium", "high"]).default("medium")
});
dn.partial();
$({
  type: X(["tasks", "activity", "usage"]),
  format: X(["json", "csv"]).default("json"),
  title: g().optional()
});
$({
  pluginId: g(),
  event: g(),
  payload: Ae(et()).optional(),
  timestamp: g().optional()
});
function Et() {
  const t = typeof window < "u" ? window.__FPP_HOST_BRIDGE__ : null;
  if (!t)
    throw new Error("[PluginSDK] Host bridge not initialized");
  return t;
}
function ln(t) {
  return Et().getContext({ id: t });
}
function un(t) {
  const e = cn.safeParse(t.manifest);
  if (!e.success)
    throw new Error(
      `[PluginSDK] Invalid manifest: ${e.error.message}`
    );
  t.manifest.id;
  try {
    Et().registerContributions(t);
  } finally {
  }
}
const fn = $e(null);
function hn() {
  const t = Re(fn);
  if (!t)
    throw new Error(
      "[PluginSDK] usePluginId must be used within PluginIdProvider (wrap plugin UI in PluginBoundary)"
    );
  return t;
}
function pn() {
  const t = hn(), e = ln(t);
  return Rt(
    (r, n) => {
      e.events.emit(r, n);
    },
    [e]
  );
}
const mn = "com.fpp.themes", yn = "Theme Studio", gn = "1.0.0", vn = "Solid color themes that transform the entire app look and feel.", _n = "FPP Team", xn = "/plugins/com.fpp.themes/index.js", bn = "^1.0.0", kn = ["storage:local", "events:theme.*"], wn = "palette", Sn = "Appearance", Cn = {
  id: mn,
  name: yn,
  version: gn,
  description: vn,
  author: _n,
  entry: xn,
  hostCompatibility: bn,
  permissions: kn,
  icon: wn,
  category: Sn
};
function J(t) {
  return Object.keys(t);
}
function Tn(t) {
  return t.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
function Nn(t) {
  var e;
  return typeof t != "string" || !t.includes("var(--mantine-scale)") ? t : (e = t.match(/^calc\((.*?)\)$/)) == null ? void 0 : e[1].split("*")[0].trim();
}
function Ce(t) {
  const e = Nn(t);
  return typeof e == "number" ? e : typeof e == "string" ? e.includes("calc") || e.includes("var") ? e : e.includes("px") ? Number(e.replace("px", "")) : e.includes("rem") ? Number(e.replace("rem", "")) * 16 : e.includes("em") ? Number(e.replace("em", "")) * 16 : Number(e) : NaN;
}
function ze(t) {
  return t === "0rem" ? "0rem" : `calc(${t} * var(--mantine-scale))`;
}
function Zt(t, { shouldScale: e = !1 } = {}) {
  function r(n) {
    if (n === 0 || n === "0")
      return `0${t}`;
    if (typeof n == "number") {
      const s = `${n / 16}${t}`;
      return e ? ze(s) : s;
    }
    if (typeof n == "string") {
      if (n === "" || n.startsWith("calc(") || n.startsWith("clamp(") || n.includes("rgba("))
        return n;
      if (n.includes(","))
        return n.split(",").map((a) => r(a)).join(",");
      if (n.includes(" "))
        return n.split(" ").map((a) => r(a)).join(" ");
      if (n.includes(t))
        return e ? ze(n) : n;
      const s = n.replace("px", "");
      if (!Number.isNaN(Number(s))) {
        const a = `${Number(s) / 16}${t}`;
        return e ? ze(a) : a;
      }
    }
    return n;
  }
  return r;
}
const V = Zt("rem", { shouldScale: !0 });
Zt("em");
function he(t) {
  return Object.keys(t).reduce((e, r) => (t[r] !== void 0 && (e[r] = t[r]), e), {});
}
function Pt(t) {
  if (typeof t == "number")
    return !0;
  if (typeof t == "string") {
    if (t.startsWith("calc(") || t.startsWith("var(") || t.includes(" ") && t.trim() !== "")
      return !0;
    const e = /^[+-]?[0-9]+(\.[0-9]+)?(px|em|rem|ex|ch|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh|cm|mm|in|pt|pc|q|cqw|cqh|cqi|cqb|cqmin|cqmax|%)?$/;
    return t.trim().split(/\s+/).every((n) => e.test(n));
  }
  return !1;
}
function $n(t) {
  const e = $e(null);
  return [({ children: s, value: a }) => /* @__PURE__ */ S(e.Provider, { value: a, children: s }), () => {
    const s = Re(e);
    if (s === null)
      throw new Error(t);
    return s;
  }];
}
function oe(t, e = "size", r = !0) {
  if (t !== void 0)
    return Pt(t) ? r ? V(t) : t : `var(--${e}-${t})`;
}
function E(t) {
  return oe(t, "mantine-spacing");
}
function zt(t) {
  return t === void 0 ? "var(--mantine-radius-default)" : oe(t, "mantine-radius");
}
function Rn(t) {
  return oe(t, "mantine-font-size");
}
function An(t) {
  return oe(t, "mantine-line-height", !1);
}
function In(t) {
  if (t)
    return oe(t, "mantine-shadow", !1);
}
function On(t, e) {
  return t in e ? Ce(e[t]) : Ce(t);
}
function jn(t, e) {
  const r = t.map((n) => ({
    value: n,
    px: On(n, e)
  }));
  return r.sort((n, s) => n.px - s.px), r;
}
function ee(t) {
  return typeof t == "object" && t !== null ? "base" in t ? t.base : void 0 : t;
}
function Mt(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (e = 0; e < s; e++) t[e] && (r = Mt(t[e])) && (n && (n += " "), n += r);
  } else for (r in t) t[r] && (n && (n += " "), n += r);
  return n;
}
function Ie() {
  for (var t, e, r = 0, n = "", s = arguments.length; r < s; r++) (t = arguments[r]) && (e = Mt(t)) && (n && (n += " "), n += e);
  return n;
}
const En = {};
function Zn(t) {
  const e = {};
  return t.forEach((r) => {
    Object.entries(r).forEach(([n, s]) => {
      e[n] ? e[n] = Ie(e[n], s) : e[n] = s;
    });
  }), e;
}
function tt({ theme: t, classNames: e, props: r, stylesCtx: n }) {
  const a = (Array.isArray(e) ? e : [e]).map(
    (i) => typeof i == "function" ? i(t, r, n) : i || En
  );
  return Zn(a);
}
function Je({ theme: t, styles: e, props: r, stylesCtx: n }) {
  return (Array.isArray(e) ? e : [e]).reduce((a, i) => typeof i == "function" ? { ...a, ...i(t, r, n) } : { ...a, ...i }, {});
}
const Pn = $e(null);
function ce() {
  const t = Re(Pn);
  if (!t)
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  return t;
}
function zn() {
  return ce().classNamesPrefix;
}
function Mn() {
  return ce().getStyleNonce;
}
function Vn() {
  return ce().withStaticClasses;
}
function Ln() {
  return ce().headless;
}
function Bn() {
  var t;
  return (t = ce().stylesTransform) == null ? void 0 : t.sx;
}
function Dn() {
  var t;
  return (t = ce().stylesTransform) == null ? void 0 : t.styles;
}
function Wn(t) {
  return /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i.test(t);
}
function Un(t) {
  let e = t.replace("#", "");
  if (e.length === 3) {
    const i = e.split("");
    e = [
      i[0],
      i[0],
      i[1],
      i[1],
      i[2],
      i[2]
    ].join("");
  }
  if (e.length === 8) {
    const i = parseInt(e.slice(6, 8), 16) / 255;
    return {
      r: parseInt(e.slice(0, 2), 16),
      g: parseInt(e.slice(2, 4), 16),
      b: parseInt(e.slice(4, 6), 16),
      a: i
    };
  }
  const r = parseInt(e, 16), n = r >> 16 & 255, s = r >> 8 & 255, a = r & 255;
  return {
    r: n,
    g: s,
    b: a,
    a: 1
  };
}
function Fn(t) {
  const [e, r, n, s] = t.replace(/[^0-9,./]/g, "").split(/[/,]/).map(Number);
  return { r: e, g: r, b: n, a: s === void 0 ? 1 : s };
}
function qn(t) {
  const e = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i, r = t.match(e);
  if (!r)
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  const n = parseInt(r[1], 10), s = parseInt(r[2], 10) / 100, a = parseInt(r[3], 10) / 100, i = r[5] ? parseFloat(r[5]) : void 0, o = (1 - Math.abs(2 * a - 1)) * s, c = n / 60, d = o * (1 - Math.abs(c % 2 - 1)), u = a - o / 2;
  let f, y, k;
  return c >= 0 && c < 1 ? (f = o, y = d, k = 0) : c >= 1 && c < 2 ? (f = d, y = o, k = 0) : c >= 2 && c < 3 ? (f = 0, y = o, k = d) : c >= 3 && c < 4 ? (f = 0, y = d, k = o) : c >= 4 && c < 5 ? (f = d, y = 0, k = o) : (f = o, y = 0, k = d), {
    r: Math.round((f + u) * 255),
    g: Math.round((y + u) * 255),
    b: Math.round((k + u) * 255),
    a: i || 1
  };
}
function Hn(t) {
  return Wn(t) ? Un(t) : t.startsWith("rgb") ? Fn(t) : t.startsWith("hsl") ? qn(t) : {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function Gn(t, e) {
  return typeof t.primaryShade == "number" ? t.primaryShade : e === "dark" ? t.primaryShade.dark : t.primaryShade.light;
}
function Me(t) {
  return t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4;
}
function Jn(t) {
  const e = t.match(/oklch\((.*?)%\s/);
  return e ? parseFloat(e[1]) : null;
}
function Yn(t) {
  if (t.startsWith("oklch("))
    return (Jn(t) || 0) / 100;
  const { r: e, g: r, b: n } = Hn(t), s = e / 255, a = r / 255, i = n / 255, o = Me(s), c = Me(a), d = Me(i);
  return 0.2126 * o + 0.7152 * c + 0.0722 * d;
}
function de(t, e = 0.179) {
  return t.startsWith("var(") ? !1 : Yn(t) > e;
}
function rt({
  color: t,
  theme: e,
  colorScheme: r
}) {
  if (typeof t != "string")
    throw new Error(
      `[@mantine/core] Failed to parse color. Expected color to be a string, instead got ${typeof t}`
    );
  if (t === "bright")
    return {
      color: t,
      value: r === "dark" ? e.white : e.black,
      shade: void 0,
      isThemeColor: !1,
      isLight: de(
        r === "dark" ? e.white : e.black,
        e.luminanceThreshold
      ),
      variable: "--mantine-color-bright"
    };
  if (t === "dimmed")
    return {
      color: t,
      value: r === "dark" ? e.colors.dark[2] : e.colors.gray[7],
      shade: void 0,
      isThemeColor: !1,
      isLight: de(
        r === "dark" ? e.colors.dark[2] : e.colors.gray[6],
        e.luminanceThreshold
      ),
      variable: "--mantine-color-dimmed"
    };
  if (t === "white" || t === "black")
    return {
      color: t,
      value: t === "white" ? e.white : e.black,
      shade: void 0,
      isThemeColor: !1,
      isLight: de(
        t === "white" ? e.white : e.black,
        e.luminanceThreshold
      ),
      variable: `--mantine-color-${t}`
    };
  const [n, s] = t.split("."), a = s ? Number(s) : void 0, i = n in e.colors;
  if (i) {
    const o = a !== void 0 ? e.colors[n][a] : e.colors[n][Gn(e, r || "light")];
    return {
      color: n,
      value: o,
      shade: a,
      isThemeColor: i,
      isLight: de(o, e.luminanceThreshold),
      variable: s ? `--mantine-color-${n}-${a}` : `--mantine-color-${n}-filled`
    };
  }
  return {
    color: t,
    value: t,
    isThemeColor: i,
    isLight: de(t, e.luminanceThreshold),
    shade: a,
    variable: void 0
  };
}
function Ye(t, e) {
  const r = rt({ color: t || e.primaryColor, theme: e });
  return r.variable ? `var(${r.variable})` : t;
}
function Xn(t, e) {
  const r = {
    from: (t == null ? void 0 : t.from) || e.defaultGradient.from,
    to: (t == null ? void 0 : t.to) || e.defaultGradient.to,
    deg: (t == null ? void 0 : t.deg) ?? e.defaultGradient.deg ?? 0
  }, n = Ye(r.from, e), s = Ye(r.to, e);
  return `linear-gradient(${r.deg}deg, ${n} 0%, ${s} 100%)`;
}
const Qn = $e(null);
function pe() {
  const t = Re(Qn);
  if (!t)
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  return t;
}
const Kn = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function es({ theme: t, options: e, unstyled: r }) {
  return Ie(
    (e == null ? void 0 : e.focusable) && !r && (t.focusClassName || Kn[t.focusRing]),
    (e == null ? void 0 : e.active) && !r && t.activeClassName
  );
}
function ts({
  selector: t,
  stylesCtx: e,
  options: r,
  props: n,
  theme: s
}) {
  return tt({
    theme: s,
    classNames: r == null ? void 0 : r.classNames,
    props: (r == null ? void 0 : r.props) || n,
    stylesCtx: e
  })[t];
}
function Tt({
  selector: t,
  stylesCtx: e,
  theme: r,
  classNames: n,
  props: s
}) {
  return tt({ theme: r, classNames: n, props: s, stylesCtx: e })[t];
}
function rs({ rootSelector: t, selector: e, className: r }) {
  return t === e ? r : void 0;
}
function ns({ selector: t, classes: e, unstyled: r }) {
  return r ? void 0 : e[t];
}
function ss({
  themeName: t,
  classNamesPrefix: e,
  selector: r,
  withStaticClass: n
}) {
  return n === !1 ? [] : t.map((s) => `${e}-${s}-${r}`);
}
function as({
  themeName: t,
  theme: e,
  selector: r,
  props: n,
  stylesCtx: s
}) {
  return t.map(
    (a) => {
      var i, o;
      return (o = tt({
        theme: e,
        classNames: (i = e.components[a]) == null ? void 0 : i.classNames,
        props: n,
        stylesCtx: s
      })) == null ? void 0 : o[r];
    }
  );
}
function is({
  options: t,
  classes: e,
  selector: r,
  unstyled: n
}) {
  return t != null && t.variant && !n ? e[`${r}--${t.variant}`] : void 0;
}
function os({
  theme: t,
  options: e,
  themeName: r,
  selector: n,
  classNamesPrefix: s,
  classNames: a,
  classes: i,
  unstyled: o,
  className: c,
  rootSelector: d,
  props: u,
  stylesCtx: f,
  withStaticClasses: y,
  headless: k,
  transformedStyles: T
}) {
  return Ie(
    es({ theme: t, options: e, unstyled: o || k }),
    as({ theme: t, themeName: r, selector: n, props: u, stylesCtx: f }),
    is({ options: e, classes: i, selector: n, unstyled: o }),
    Tt({ selector: n, stylesCtx: f, theme: t, classNames: a, props: u }),
    Tt({ selector: n, stylesCtx: f, theme: t, classNames: T, props: u }),
    ts({ selector: n, stylesCtx: f, options: e, props: u, theme: t }),
    rs({ rootSelector: d, selector: n, className: c }),
    ns({ selector: n, classes: i, unstyled: o || k }),
    y && !k && ss({
      themeName: r,
      classNamesPrefix: s,
      selector: n,
      withStaticClass: e == null ? void 0 : e.withStaticClass
    }),
    e == null ? void 0 : e.className
  );
}
function cs({
  theme: t,
  themeName: e,
  props: r,
  stylesCtx: n,
  selector: s
}) {
  return e.map(
    (a) => {
      var i;
      return Je({
        theme: t,
        styles: (i = t.components[a]) == null ? void 0 : i.styles,
        props: r,
        stylesCtx: n
      })[s];
    }
  ).reduce((a, i) => ({ ...a, ...i }), {});
}
function Xe({ style: t, theme: e }) {
  return Array.isArray(t) ? [...t].reduce(
    (r, n) => ({ ...r, ...Xe({ style: n, theme: e }) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function ds(t) {
  return t.reduce((e, r) => (r && Object.keys(r).forEach((n) => {
    e[n] = { ...e[n], ...he(r[n]) };
  }), e), {});
}
function ls({
  vars: t,
  varsResolver: e,
  theme: r,
  props: n,
  stylesCtx: s,
  selector: a,
  themeName: i,
  headless: o
}) {
  var c;
  return (c = ds([
    o ? {} : e == null ? void 0 : e(r, n, s),
    ...i.map((d) => {
      var u, f, y;
      return (y = (f = (u = r.components) == null ? void 0 : u[d]) == null ? void 0 : f.vars) == null ? void 0 : y.call(f, r, n, s);
    }),
    t == null ? void 0 : t(r, n, s)
  ])) == null ? void 0 : c[a];
}
function us({
  theme: t,
  themeName: e,
  selector: r,
  options: n,
  props: s,
  stylesCtx: a,
  rootSelector: i,
  styles: o,
  style: c,
  vars: d,
  varsResolver: u,
  headless: f,
  withStylesTransform: y
}) {
  return {
    ...!y && cs({ theme: t, themeName: e, props: s, stylesCtx: a, selector: r }),
    ...!y && Je({ theme: t, styles: o, props: s, stylesCtx: a })[r],
    ...!y && Je({ theme: t, styles: n == null ? void 0 : n.styles, props: (n == null ? void 0 : n.props) || s, stylesCtx: a })[r],
    ...ls({ theme: t, props: s, stylesCtx: a, vars: d, varsResolver: u, selector: r, themeName: e, headless: f }),
    ...i === r ? Xe({ style: c, theme: t }) : null,
    ...Xe({ style: n == null ? void 0 : n.style, theme: t })
  };
}
function fs({ props: t, stylesCtx: e, themeName: r }) {
  var i;
  const n = pe(), s = (i = Dn()) == null ? void 0 : i();
  return {
    getTransformedStyles: (o) => s ? [
      ...o.map(
        (d) => s(d, { props: t, theme: n, ctx: e })
      ),
      ...r.map(
        (d) => {
          var u;
          return s((u = n.components[d]) == null ? void 0 : u.styles, { props: t, theme: n, ctx: e });
        }
      )
    ].filter(Boolean) : [],
    withStylesTransform: !!s
  };
}
function q({
  name: t,
  classes: e,
  props: r,
  stylesCtx: n,
  className: s,
  style: a,
  rootSelector: i = "root",
  unstyled: o,
  classNames: c,
  styles: d,
  vars: u,
  varsResolver: f
}) {
  const y = pe(), k = zn(), T = Vn(), C = Ln(), A = (Array.isArray(t) ? t : [t]).filter((I) => I), { withStylesTransform: D, getTransformedStyles: H } = fs({
    props: r,
    stylesCtx: n,
    themeName: A
  });
  return (I, j) => ({
    className: os({
      theme: y,
      options: j,
      themeName: A,
      selector: I,
      classNamesPrefix: k,
      classNames: c,
      classes: e,
      unstyled: o,
      className: s,
      rootSelector: i,
      props: r,
      stylesCtx: n,
      withStaticClasses: T,
      headless: C,
      transformedStyles: H([j == null ? void 0 : j.styles, d])
    }),
    style: us({
      theme: y,
      themeName: A,
      selector: I,
      options: j,
      props: r,
      stylesCtx: n,
      rootSelector: i,
      styles: d,
      style: a,
      vars: u,
      varsResolver: f,
      headless: C,
      withStylesTransform: D
    })
  });
}
function B(t, e, r) {
  var i;
  const n = pe(), s = (i = n.components[t]) == null ? void 0 : i.defaultProps, a = typeof s == "function" ? s(n) : s;
  return { ...e, ...a, ...he(r) };
}
function Ve(t) {
  return J(t).reduce(
    (e, r) => t[r] !== void 0 ? `${e}${Tn(r)}:${t[r]};` : e,
    ""
  ).trim();
}
function hs({ selector: t, styles: e, media: r, container: n }) {
  const s = e ? Ve(e) : "", a = Array.isArray(r) ? r.map((o) => `@media${o.query}{${t}{${Ve(o.styles)}}}`) : [], i = Array.isArray(n) ? n.map(
    (o) => `@container ${o.query}{${t}{${Ve(o.styles)}}}`
  ) : [];
  return `${s ? `${t}{${s}}` : ""}${a.join("")}${i.join("")}`.trim();
}
function nt(t) {
  const e = Mn();
  return /* @__PURE__ */ S(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: e == null ? void 0 : e(),
      dangerouslySetInnerHTML: { __html: hs(t) }
    }
  );
}
function ps(t) {
  const {
    m: e,
    mx: r,
    my: n,
    mt: s,
    mb: a,
    ml: i,
    mr: o,
    me: c,
    ms: d,
    p: u,
    px: f,
    py: y,
    pt: k,
    pb: T,
    pl: C,
    pr: A,
    pe: D,
    ps: H,
    bd: I,
    bg: j,
    c: ye,
    opacity: G,
    ff: ge,
    fz: ve,
    fw: Xt,
    lts: Qt,
    ta: Kt,
    lh: er,
    fs: tr,
    tt: rr,
    td: nr,
    w: sr,
    miw: ar,
    maw: ir,
    h: or,
    mih: cr,
    mah: dr,
    bgsz: lr,
    bgp: ur,
    bgr: fr,
    bga: hr,
    pos: pr,
    top: mr,
    left: yr,
    bottom: gr,
    right: vr,
    inset: _r,
    display: xr,
    flex: br,
    hiddenFrom: kr,
    visibleFrom: wr,
    lightHidden: Sr,
    darkHidden: Cr,
    sx: Tr,
    ...Nr
  } = t;
  return { styleProps: he({
    m: e,
    mx: r,
    my: n,
    mt: s,
    mb: a,
    ml: i,
    mr: o,
    me: c,
    ms: d,
    p: u,
    px: f,
    py: y,
    pt: k,
    pb: T,
    pl: C,
    pr: A,
    pe: D,
    ps: H,
    bd: I,
    bg: j,
    c: ye,
    opacity: G,
    ff: ge,
    fz: ve,
    fw: Xt,
    lts: Qt,
    ta: Kt,
    lh: er,
    fs: tr,
    tt: rr,
    td: nr,
    w: sr,
    miw: ar,
    maw: ir,
    h: or,
    mih: cr,
    mah: dr,
    bgsz: lr,
    bgp: ur,
    bgr: fr,
    bga: hr,
    pos: pr,
    top: mr,
    left: yr,
    bottom: gr,
    right: vr,
    inset: _r,
    display: xr,
    flex: br,
    hiddenFrom: kr,
    visibleFrom: wr,
    lightHidden: Sr,
    darkHidden: Cr,
    sx: Tr
  }), rest: Nr };
}
const ms = {
  m: { type: "spacing", property: "margin" },
  mt: { type: "spacing", property: "marginTop" },
  mb: { type: "spacing", property: "marginBottom" },
  ml: { type: "spacing", property: "marginLeft" },
  mr: { type: "spacing", property: "marginRight" },
  ms: { type: "spacing", property: "marginInlineStart" },
  me: { type: "spacing", property: "marginInlineEnd" },
  mx: { type: "spacing", property: "marginInline" },
  my: { type: "spacing", property: "marginBlock" },
  p: { type: "spacing", property: "padding" },
  pt: { type: "spacing", property: "paddingTop" },
  pb: { type: "spacing", property: "paddingBottom" },
  pl: { type: "spacing", property: "paddingLeft" },
  pr: { type: "spacing", property: "paddingRight" },
  ps: { type: "spacing", property: "paddingInlineStart" },
  pe: { type: "spacing", property: "paddingInlineEnd" },
  px: { type: "spacing", property: "paddingInline" },
  py: { type: "spacing", property: "paddingBlock" },
  bd: { type: "border", property: "border" },
  bg: { type: "color", property: "background" },
  c: { type: "textColor", property: "color" },
  opacity: { type: "identity", property: "opacity" },
  ff: { type: "fontFamily", property: "fontFamily" },
  fz: { type: "fontSize", property: "fontSize" },
  fw: { type: "identity", property: "fontWeight" },
  lts: { type: "size", property: "letterSpacing" },
  ta: { type: "identity", property: "textAlign" },
  lh: { type: "lineHeight", property: "lineHeight" },
  fs: { type: "identity", property: "fontStyle" },
  tt: { type: "identity", property: "textTransform" },
  td: { type: "identity", property: "textDecoration" },
  w: { type: "spacing", property: "width" },
  miw: { type: "spacing", property: "minWidth" },
  maw: { type: "spacing", property: "maxWidth" },
  h: { type: "spacing", property: "height" },
  mih: { type: "spacing", property: "minHeight" },
  mah: { type: "spacing", property: "maxHeight" },
  bgsz: { type: "size", property: "backgroundSize" },
  bgp: { type: "identity", property: "backgroundPosition" },
  bgr: { type: "identity", property: "backgroundRepeat" },
  bga: { type: "identity", property: "backgroundAttachment" },
  pos: { type: "identity", property: "position" },
  top: { type: "size", property: "top" },
  left: { type: "size", property: "left" },
  bottom: { type: "size", property: "bottom" },
  right: { type: "size", property: "right" },
  inset: { type: "size", property: "inset" },
  display: { type: "identity", property: "display" },
  flex: { type: "identity", property: "flex" }
};
function st(t, e) {
  const r = rt({ color: t, theme: e });
  return r.color === "dimmed" ? "var(--mantine-color-dimmed)" : r.color === "bright" ? "var(--mantine-color-bright)" : r.variable ? `var(${r.variable})` : r.color;
}
function ys(t, e) {
  const r = rt({ color: t, theme: e });
  return r.isThemeColor && r.shade === void 0 ? `var(--mantine-color-${r.color}-text)` : st(t, e);
}
function gs(t, e) {
  if (typeof t == "number")
    return V(t);
  if (typeof t == "string") {
    const [r, n, ...s] = t.split(" ").filter((i) => i.trim() !== "");
    let a = `${V(r)}`;
    return n && (a += ` ${n}`), s.length > 0 && (a += ` ${st(s.join(" "), e)}`), a.trim();
  }
  return t;
}
const Nt = {
  text: "var(--mantine-font-family)",
  mono: "var(--mantine-font-family-monospace)",
  monospace: "var(--mantine-font-family-monospace)",
  heading: "var(--mantine-font-family-headings)",
  headings: "var(--mantine-font-family-headings)"
};
function vs(t) {
  return typeof t == "string" && t in Nt ? Nt[t] : t;
}
const _s = ["h1", "h2", "h3", "h4", "h5", "h6"];
function xs(t, e) {
  return typeof t == "string" && t in e.fontSizes ? `var(--mantine-font-size-${t})` : typeof t == "string" && _s.includes(t) ? `var(--mantine-${t}-font-size)` : typeof t == "number" || typeof t == "string" ? V(t) : t;
}
function bs(t) {
  return t;
}
const ks = ["h1", "h2", "h3", "h4", "h5", "h6"];
function ws(t, e) {
  return typeof t == "string" && t in e.lineHeights ? `var(--mantine-line-height-${t})` : typeof t == "string" && ks.includes(t) ? `var(--mantine-${t}-line-height)` : t;
}
function Ss(t) {
  return typeof t == "number" ? V(t) : t;
}
function Cs(t, e) {
  if (typeof t == "number")
    return V(t);
  if (typeof t == "string") {
    const r = t.replace("-", "");
    if (!(r in e.spacing))
      return V(t);
    const n = `--mantine-spacing-${r}`;
    return t.startsWith("-") ? `calc(var(${n}) * -1)` : `var(${n})`;
  }
  return t;
}
const Le = {
  color: st,
  textColor: ys,
  fontSize: xs,
  spacing: Cs,
  identity: bs,
  size: Ss,
  lineHeight: ws,
  fontFamily: vs,
  border: gs
};
function $t(t) {
  return t.replace("(min-width: ", "").replace("em)", "");
}
function Ts({
  media: t,
  ...e
}) {
  const n = Object.keys(t).sort((s, a) => Number($t(s)) - Number($t(a))).map((s) => ({ query: s, styles: t[s] }));
  return { ...e, media: n };
}
function Ns(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.keys(t);
  return !(e.length === 1 && e[0] === "base");
}
function $s(t) {
  return typeof t == "object" && t !== null ? "base" in t ? t.base : void 0 : t;
}
function Rs(t) {
  return typeof t == "object" && t !== null ? J(t).filter((e) => e !== "base") : [];
}
function As(t, e) {
  return typeof t == "object" && t !== null && e in t ? t[e] : t;
}
function Is({
  styleProps: t,
  data: e,
  theme: r
}) {
  return Ts(
    J(t).reduce(
      (n, s) => {
        if (s === "hiddenFrom" || s === "visibleFrom" || s === "sx")
          return n;
        const a = e[s], i = Array.isArray(a.property) ? a.property : [a.property], o = $s(t[s]);
        if (!Ns(t[s]))
          return i.forEach((d) => {
            n.inlineStyles[d] = Le[a.type](o, r);
          }), n;
        n.hasResponsiveStyles = !0;
        const c = Rs(t[s]);
        return i.forEach((d) => {
          o && (n.styles[d] = Le[a.type](o, r)), c.forEach((u) => {
            const f = `(min-width: ${r.breakpoints[u]})`;
            n.media[f] = {
              ...n.media[f],
              [d]: Le[a.type](
                As(t[s], u),
                r
              )
            };
          });
        }), n;
      },
      {
        hasResponsiveStyles: !1,
        styles: {},
        inlineStyles: {},
        media: {}
      }
    )
  );
}
function Vt() {
  return `__m__-${$r().replace(/:/g, "")}`;
}
function Lt(t) {
  return t.startsWith("data-") ? t : `data-${t}`;
}
function Os(t) {
  return Object.keys(t).reduce((e, r) => {
    const n = t[r];
    return n === void 0 || n === "" || n === !1 || n === null || (e[Lt(r)] = t[r]), e;
  }, {});
}
function Bt(t) {
  return t ? typeof t == "string" ? { [Lt(t)]: !0 } : Array.isArray(t) ? [...t].reduce(
    (e, r) => ({ ...e, ...Bt(r) }),
    {}
  ) : Os(t) : null;
}
function Qe(t, e) {
  return Array.isArray(t) ? [...t].reduce(
    (r, n) => ({ ...r, ...Qe(n, e) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function js({
  theme: t,
  style: e,
  vars: r,
  styleProps: n
}) {
  const s = Qe(e, t), a = Qe(r, t);
  return { ...s, ...a, ...n };
}
const Dt = te(
  ({
    component: t,
    style: e,
    __vars: r,
    className: n,
    variant: s,
    mod: a,
    size: i,
    hiddenFrom: o,
    visibleFrom: c,
    lightHidden: d,
    darkHidden: u,
    renderRoot: f,
    __size: y,
    ...k
  }, T) => {
    var ve;
    const C = pe(), A = t || "div", { styleProps: D, rest: H } = ps(k), I = Bn(), j = (ve = I == null ? void 0 : I()) == null ? void 0 : ve(D.sx), ye = Vt(), G = Is({
      styleProps: D,
      theme: C,
      data: ms
    }), ge = {
      ref: T,
      style: js({
        theme: C,
        style: e,
        vars: r,
        styleProps: G.inlineStyles
      }),
      className: Ie(n, j, {
        [ye]: G.hasResponsiveStyles,
        "mantine-light-hidden": d,
        "mantine-dark-hidden": u,
        [`mantine-hidden-from-${o}`]: o,
        [`mantine-visible-from-${c}`]: c
      }),
      "data-variant": s,
      "data-size": Pt(i) ? void 0 : i || void 0,
      size: y,
      ...Bt(a),
      ...H
    };
    return /* @__PURE__ */ K(De, { children: [
      G.hasResponsiveStyles && /* @__PURE__ */ S(
        nt,
        {
          selector: `.${ye}`,
          styles: G.styles,
          media: G.media
        }
      ),
      typeof f == "function" ? f(ge) : /* @__PURE__ */ S(A, { ...ge })
    ] });
  }
);
Dt.displayName = "@mantine/core/Box";
const L = Dt;
function Wt(t) {
  return t;
}
function Oe(t) {
  const e = te(t);
  return e.extend = Wt, e.withProps = (r) => {
    const n = te((s, a) => /* @__PURE__ */ S(e, { ...r, ...s, ref: a }));
    return n.extend = e.extend, n.displayName = `WithProps(${e.displayName})`, n;
  }, e;
}
function me(t) {
  const e = te(t);
  return e.withProps = (r) => {
    const n = te((s, a) => /* @__PURE__ */ S(e, { ...r, ...s, ref: a }));
    return n.extend = e.extend, n.displayName = `WithProps(${e.displayName})`, n;
  }, e.extend = Wt, e;
}
var Ut = { root: "m_87cf2631" };
const Es = {
  __staticSelector: "UnstyledButton"
}, at = me(
  (t, e) => {
    const r = B("UnstyledButton", Es, t), {
      className: n,
      component: s = "button",
      __staticSelector: a,
      unstyled: i,
      classNames: o,
      styles: c,
      style: d,
      ...u
    } = r, f = q({
      name: a,
      props: r,
      classes: Ut,
      className: n,
      style: d,
      classNames: o,
      styles: c,
      unstyled: i
    });
    return /* @__PURE__ */ S(
      L,
      {
        ...f("root", { focusable: !0 }),
        component: s,
        ref: e,
        type: s === "button" ? "button" : void 0,
        ...u
      }
    );
  }
);
at.classes = Ut;
at.displayName = "@mantine/core/UnstyledButton";
var Ft = { root: "m_1b7284a3" };
const Zs = {}, Ps = (t, { radius: e, shadow: r }) => ({
  root: {
    "--paper-radius": e === void 0 ? void 0 : zt(e),
    "--paper-shadow": In(r)
  }
}), it = me((t, e) => {
  const r = B("Paper", Zs, t), {
    classNames: n,
    className: s,
    style: a,
    styles: i,
    unstyled: o,
    withBorder: c,
    vars: d,
    radius: u,
    shadow: f,
    variant: y,
    mod: k,
    ...T
  } = r, C = q({
    name: "Paper",
    props: r,
    classes: Ft,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: d,
    varsResolver: Ps
  });
  return /* @__PURE__ */ S(
    L,
    {
      ref: e,
      mod: [{ "data-with-border": c }, k],
      ...C("root"),
      variant: y,
      ...T
    }
  );
});
it.classes = Ft;
it.displayName = "@mantine/core/Paper";
var qt = { root: "m_b6d8b162" };
function zs(t) {
  if (t === "start")
    return "start";
  if (t === "end" || t)
    return "end";
}
const Ms = {
  inherit: !1
}, Vs = (t, { variant: e, lineClamp: r, gradient: n, size: s, color: a }) => ({
  root: {
    "--text-fz": Rn(s),
    "--text-lh": An(s),
    "--text-gradient": e === "gradient" ? Xn(n, t) : void 0,
    "--text-line-clamp": typeof r == "number" ? r.toString() : void 0,
    "--text-color": a ? Ye(a, t) : void 0
  }
}), Te = me((t, e) => {
  const r = B("Text", Ms, t), {
    lineClamp: n,
    truncate: s,
    inline: a,
    inherit: i,
    gradient: o,
    span: c,
    __staticSelector: d,
    vars: u,
    className: f,
    style: y,
    classNames: k,
    styles: T,
    unstyled: C,
    variant: A,
    mod: D,
    size: H,
    ...I
  } = r, j = q({
    name: ["Text", d],
    props: r,
    classes: qt,
    className: f,
    style: y,
    classNames: k,
    styles: T,
    unstyled: C,
    vars: u,
    varsResolver: Vs
  });
  return /* @__PURE__ */ S(
    L,
    {
      ...j("root", { focusable: !0 }),
      ref: e,
      component: c ? "span" : "p",
      variant: A,
      mod: [
        {
          "data-truncate": zs(s),
          "data-line-clamp": typeof n == "number",
          "data-inline": a,
          "data-inherit": i
        },
        D
      ],
      size: H,
      ...I
    }
  );
});
Te.classes = qt;
Te.displayName = "@mantine/core/Text";
const [Ls, Bs] = $n(
  "Card component was not found in tree"
);
var ot = { root: "m_e615b15f", section: "m_599a2148" };
const Ds = {}, je = me((t, e) => {
  const r = B("CardSection", Ds, t), { classNames: n, className: s, style: a, styles: i, vars: o, withBorder: c, inheritPadding: d, mod: u, ...f } = r, y = Bs();
  return /* @__PURE__ */ S(
    L,
    {
      ref: e,
      mod: [{ "with-border": c, "inherit-padding": d }, u],
      ...y.getStyles("section", { className: s, style: a, styles: i, classNames: n }),
      ...f
    }
  );
});
je.classes = ot;
je.displayName = "@mantine/core/CardSection";
const Ws = {}, Us = (t, { padding: e }) => ({
  root: {
    "--card-padding": E(e)
  }
}), Ee = me((t, e) => {
  const r = B("Card", Ws, t), { classNames: n, className: s, style: a, styles: i, unstyled: o, vars: c, children: d, padding: u, ...f } = r, y = q({
    name: "Card",
    props: r,
    classes: ot,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: c,
    varsResolver: Us
  }), k = Rr.toArray(d), T = k.map((C, A) => typeof C == "object" && C && "type" in C && C.type === je ? Ar(C, {
    "data-first-section": A === 0 || void 0,
    "data-last-section": A === k.length - 1 || void 0
  }) : C);
  return /* @__PURE__ */ S(Ls, { value: { getStyles: y }, children: /* @__PURE__ */ S(it, { ref: e, unstyled: o, ...y("root"), ...f, children: T }) });
});
Ee.classes = ot;
Ee.displayName = "@mantine/core/Card";
Ee.Section = je;
function Fs({
  spacing: t,
  verticalSpacing: e,
  cols: r,
  selector: n
}) {
  var u;
  const s = pe(), a = e === void 0 ? t : e, i = he({
    "--sg-spacing-x": E(ee(t)),
    "--sg-spacing-y": E(ee(a)),
    "--sg-cols": (u = ee(r)) == null ? void 0 : u.toString()
  }), o = J(s.breakpoints).reduce(
    (f, y) => (f[y] || (f[y] = {}), typeof t == "object" && t[y] !== void 0 && (f[y]["--sg-spacing-x"] = E(t[y])), typeof a == "object" && a[y] !== void 0 && (f[y]["--sg-spacing-y"] = E(a[y])), typeof r == "object" && r[y] !== void 0 && (f[y]["--sg-cols"] = r[y]), f),
    {}
  ), d = jn(J(o), s.breakpoints).filter(
    (f) => J(o[f.value]).length > 0
  ).map((f) => ({
    query: `(min-width: ${s.breakpoints[f.value]})`,
    styles: o[f.value]
  }));
  return /* @__PURE__ */ S(nt, { styles: i, media: d, selector: n });
}
function Be(t) {
  return typeof t == "object" && t !== null ? J(t) : [];
}
function qs(t) {
  return t.sort((e, r) => Ce(e) - Ce(r));
}
function Hs({
  spacing: t,
  verticalSpacing: e,
  cols: r
}) {
  const n = Array.from(
    /* @__PURE__ */ new Set([
      ...Be(t),
      ...Be(e),
      ...Be(r)
    ])
  );
  return qs(n);
}
function Gs({
  spacing: t,
  verticalSpacing: e,
  cols: r,
  selector: n
}) {
  var d;
  const s = e === void 0 ? t : e, a = he({
    "--sg-spacing-x": E(ee(t)),
    "--sg-spacing-y": E(ee(s)),
    "--sg-cols": (d = ee(r)) == null ? void 0 : d.toString()
  }), i = Hs({ spacing: t, verticalSpacing: e, cols: r }), o = i.reduce(
    (u, f) => (u[f] || (u[f] = {}), typeof t == "object" && t[f] !== void 0 && (u[f]["--sg-spacing-x"] = E(t[f])), typeof s == "object" && s[f] !== void 0 && (u[f]["--sg-spacing-y"] = E(s[f])), typeof r == "object" && r[f] !== void 0 && (u[f]["--sg-cols"] = r[f]), u),
    {}
  ), c = i.map((u) => ({
    query: `simple-grid (min-width: ${u})`,
    styles: o[u]
  }));
  return /* @__PURE__ */ S(nt, { styles: a, container: c, selector: n });
}
var Ht = { container: "m_925c2d2c", root: "m_2415a157" };
const Js = {
  cols: 1,
  spacing: "md",
  type: "media"
}, ct = Oe((t, e) => {
  const r = B("SimpleGrid", Js, t), {
    classNames: n,
    className: s,
    style: a,
    styles: i,
    unstyled: o,
    vars: c,
    cols: d,
    verticalSpacing: u,
    spacing: f,
    type: y,
    ...k
  } = r, T = q({
    name: "SimpleGrid",
    classes: Ht,
    props: r,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: c
  }), C = Vt();
  return y === "container" ? /* @__PURE__ */ K(De, { children: [
    /* @__PURE__ */ S(Gs, { ...r, selector: `.${C}` }),
    /* @__PURE__ */ S("div", { ...T("container"), children: /* @__PURE__ */ S(L, { ref: e, ...T("root", { className: C }), ...k }) })
  ] }) : /* @__PURE__ */ K(De, { children: [
    /* @__PURE__ */ S(Fs, { ...r, selector: `.${C}` }),
    /* @__PURE__ */ S(L, { ref: e, ...T("root", { className: C }), ...k })
  ] });
});
ct.classes = Ht;
ct.displayName = "@mantine/core/SimpleGrid";
var Gt = { root: "m_6d731127" };
const Ys = {
  gap: "md",
  align: "stretch",
  justify: "flex-start"
}, Xs = (t, { gap: e, align: r, justify: n }) => ({
  root: {
    "--stack-gap": E(e),
    "--stack-align": r,
    "--stack-justify": n
  }
}), Ne = Oe((t, e) => {
  const r = B("Stack", Ys, t), {
    classNames: n,
    className: s,
    style: a,
    styles: i,
    unstyled: o,
    vars: c,
    align: d,
    justify: u,
    gap: f,
    variant: y,
    ...k
  } = r, T = q({
    name: "Stack",
    props: r,
    classes: Gt,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: c,
    varsResolver: Xs
  });
  return /* @__PURE__ */ S(L, { ref: e, ...T("root"), variant: y, ...k });
});
Ne.classes = Gt;
Ne.displayName = "@mantine/core/Stack";
var Jt = { root: "m_7341320d" };
const Qs = {}, Ks = (t, { size: e, radius: r, variant: n, gradient: s, color: a, autoContrast: i }) => {
  const o = t.variantColorResolver({
    color: a || t.primaryColor,
    theme: t,
    gradient: s,
    variant: n || "filled",
    autoContrast: i
  });
  return {
    root: {
      "--ti-size": oe(e, "ti-size"),
      "--ti-radius": r === void 0 ? void 0 : zt(r),
      "--ti-bg": a || n ? o.background : void 0,
      "--ti-color": a || n ? o.color : void 0,
      "--ti-bd": a || n ? o.border : void 0
    }
  };
}, dt = Oe((t, e) => {
  const r = B("ThemeIcon", Qs, t), { classNames: n, className: s, style: a, styles: i, unstyled: o, vars: c, autoContrast: d, ...u } = r, f = q({
    name: "ThemeIcon",
    classes: Jt,
    props: r,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: c,
    varsResolver: Ks
  });
  return /* @__PURE__ */ S(L, { ref: e, ...f("root"), ...u });
});
dt.classes = Jt;
dt.displayName = "@mantine/core/ThemeIcon";
const ea = ["h1", "h2", "h3", "h4", "h5", "h6"], ta = ["xs", "sm", "md", "lg", "xl"];
function ra(t, e) {
  const r = e !== void 0 ? e : `h${t}`;
  return ea.includes(r) ? {
    fontSize: `var(--mantine-${r}-font-size)`,
    fontWeight: `var(--mantine-${r}-font-weight)`,
    lineHeight: `var(--mantine-${r}-line-height)`
  } : ta.includes(r) ? {
    fontSize: `var(--mantine-font-size-${r})`,
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  } : {
    fontSize: V(r),
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  };
}
var Yt = { root: "m_8a5d1357" };
const na = {
  order: 1
}, sa = (t, { order: e, size: r, lineClamp: n, textWrap: s }) => {
  const a = ra(e, r);
  return {
    root: {
      "--title-fw": a.fontWeight,
      "--title-lh": a.lineHeight,
      "--title-fz": a.fontSize,
      "--title-line-clamp": typeof n == "number" ? n.toString() : void 0,
      "--title-text-wrap": s
    }
  };
}, lt = Oe((t, e) => {
  const r = B("Title", na, t), {
    classNames: n,
    className: s,
    style: a,
    styles: i,
    unstyled: o,
    order: c,
    vars: d,
    size: u,
    variant: f,
    lineClamp: y,
    textWrap: k,
    mod: T,
    ...C
  } = r, A = q({
    name: "Title",
    props: r,
    classes: Yt,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: d,
    varsResolver: sa
  });
  return [1, 2, 3, 4, 5, 6].includes(c) ? /* @__PURE__ */ S(
    L,
    {
      ...A("root"),
      component: `h${c}`,
      variant: f,
      ref: e,
      mod: [{ order: c, "data-line-clamp": typeof y == "number" }, T],
      size: u,
      ...C
    }
  ) : null;
});
lt.classes = Yt;
lt.displayName = "@mantine/core/Title";
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var aa = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }
};
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ia = (t, e, r, n) => {
  const s = te(
    ({ color: a = "currentColor", size: i = 24, stroke: o = 2, title: c, className: d, children: u, ...f }, y) => Ze(
      "svg",
      {
        ref: y,
        ...aa[t],
        width: i,
        height: i,
        className: ["tabler-icon", `tabler-icon-${e}`, d].join(" "),
        strokeWidth: o,
        stroke: a,
        ...f
      },
      [
        c && Ze("title", { key: "svg-title" }, c),
        ...n.map(([k, T]) => Ze(k, T)),
        ...Array.isArray(u) ? u : [u]
      ]
    )
  );
  return s.displayName = `${r}`, s;
};
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oa = [["path", { d: "M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25", key: "svg-0" }], ["path", { d: "M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-1" }], ["path", { d: "M11.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-2" }], ["path", { d: "M15.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-3" }]], ca = ia("outline", "palette", "Palette", oa), da = [
  { id: "indigo", label: "Indigo", color: "#4f46e5" },
  { id: "violet", label: "Violet", color: "#7c3aed" },
  { id: "cyan", label: "Cyan", color: "#0891b2" },
  { id: "teal", label: "Teal", color: "#0d9488" },
  { id: "green", label: "Green", color: "#16a34a" },
  { id: "orange", label: "Orange", color: "#ea580c" },
  { id: "red", label: "Red", color: "#dc2626" },
  { id: "pink", label: "Pink", color: "#db2777" },
  { id: "grape", label: "Grape", color: "#9333ea" }
], la = Ir(function() {
  const e = pn(), r = Rt(
    (n, s) => {
      e("theme.preset", { primaryColor: n, label: s });
    },
    [e]
  );
  return /* @__PURE__ */ S(Ee, { padding: "lg", radius: "lg", withBorder: !0, children: /* @__PURE__ */ K(Ne, { gap: "md", children: [
    /* @__PURE__ */ K(Ne, { gap: 4, children: [
      /* @__PURE__ */ S(dt, { size: "lg", radius: "md", variant: "light", color: "pink", children: /* @__PURE__ */ S(ca, { size: 20 }) }),
      /* @__PURE__ */ S(lt, { order: 4, children: "Theme Studio" }),
      /* @__PURE__ */ S(Te, { size: "xs", c: "dimmed", children: "Solid color presets — updates Mantine primary across the whole app" })
    ] }),
    /* @__PURE__ */ S(ct, { cols: { base: 3, sm: 3 }, spacing: "sm", children: da.map((n) => /* @__PURE__ */ K(
      at,
      {
        onClick: () => r(n.id, n.label),
        p: "sm",
        style: {
          borderRadius: 12,
          border: "2px solid var(--mantine-color-gray-3)",
          textAlign: "center"
        },
        children: [
          /* @__PURE__ */ S(
            "div",
            {
              style: {
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: n.color,
                margin: "0 auto 8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }
            }
          ),
          /* @__PURE__ */ S(Te, { size: "xs", fw: 600, children: n.label })
        ]
      },
      n.id
    )) })
  ] }) });
});
function pa() {
  un({
    manifest: Cn,
    widgets: [{ slot: "dashboard.main", component: la, priority: 8 }]
  });
}
export {
  pa as activate
};
