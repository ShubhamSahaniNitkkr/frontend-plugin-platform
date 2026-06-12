import { jsx as M, jsxs as te, Fragment as We } from "react/jsx-runtime";
import * as x from "react";
import yn, { createContext as ct, useContext as lt, useState as ae, useEffect as ge, useCallback as Ce, Fragment as Gs, useRef as Te, useLayoutEffect as Mn, useId as Xs, forwardRef as et, Children as Wr, cloneElement as Ln, createElement as qs, memo as Ur, useMemo as Hr } from "react";
import * as Ks from "react-dom";
import Js, { createPortal as Qs } from "react-dom";
const ei = [
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
  "storage:local"
], ti = [
  "dashboard.main",
  "dashboard.sidebar",
  "header.actions",
  "settings.sections",
  "reports.widgets",
  "sidebar.nav"
];
var X;
(function(t) {
  t.assertEqual = (s) => {
  };
  function e(s) {
  }
  t.assertIs = e;
  function n(s) {
    throw new Error();
  }
  t.assertNever = n, t.arrayToEnum = (s) => {
    const i = {};
    for (const o of s)
      i[o] = o;
    return i;
  }, t.getValidEnumValues = (s) => {
    const i = t.objectKeys(s).filter((a) => typeof s[s[a]] != "number"), o = {};
    for (const a of i)
      o[a] = s[a];
    return t.objectValues(o);
  }, t.objectValues = (s) => t.objectKeys(s).map(function(i) {
    return s[i];
  }), t.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
    const i = [];
    for (const o in s)
      Object.prototype.hasOwnProperty.call(s, o) && i.push(o);
    return i;
  }, t.find = (s, i) => {
    for (const o of s)
      if (i(o))
        return o;
  }, t.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && Number.isFinite(s) && Math.floor(s) === s;
  function r(s, i = " | ") {
    return s.map((o) => typeof o == "string" ? `'${o}'` : o).join(i);
  }
  t.joinValues = r, t.jsonStringifyReplacer = (s, i) => typeof i == "bigint" ? i.toString() : i;
})(X || (X = {}));
var ir;
(function(t) {
  t.mergeShapes = (e, n) => ({
    ...e,
    ...n
    // second overwrites first
  });
})(ir || (ir = {}));
const T = X.arrayToEnum([
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
]), Ie = (t) => {
  switch (typeof t) {
    case "undefined":
      return T.undefined;
    case "string":
      return T.string;
    case "number":
      return Number.isNaN(t) ? T.nan : T.number;
    case "boolean":
      return T.boolean;
    case "function":
      return T.function;
    case "bigint":
      return T.bigint;
    case "symbol":
      return T.symbol;
    case "object":
      return Array.isArray(t) ? T.array : t === null ? T.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? T.promise : typeof Map < "u" && t instanceof Map ? T.map : typeof Set < "u" && t instanceof Set ? T.set : typeof Date < "u" && t instanceof Date ? T.date : T.object;
    default:
      return T.unknown;
  }
}, b = X.arrayToEnum([
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
class Ee extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (r) => {
      this.issues = [...this.issues, r];
    }, this.addIssues = (r = []) => {
      this.issues = [...this.issues, ...r];
    };
    const n = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, n) : this.__proto__ = n, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const n = e || function(i) {
      return i.message;
    }, r = { _errors: [] }, s = (i) => {
      for (const o of i.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(s);
        else if (o.code === "invalid_return_type")
          s(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          s(o.argumentsError);
        else if (o.path.length === 0)
          r._errors.push(n(o));
        else {
          let a = r, c = 0;
          for (; c < o.path.length; ) {
            const l = o.path[c];
            c === o.path.length - 1 ? (a[l] = a[l] || { _errors: [] }, a[l]._errors.push(n(o))) : a[l] = a[l] || { _errors: [] }, a = a[l], c++;
          }
        }
    };
    return s(this), r;
  }
  static assert(e) {
    if (!(e instanceof Ee))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, X.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (n) => n.message) {
    const n = {}, r = [];
    for (const s of this.issues)
      if (s.path.length > 0) {
        const i = s.path[0];
        n[i] = n[i] || [], n[i].push(e(s));
      } else
        r.push(e(s));
    return { formErrors: r, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
Ee.create = (t) => new Ee(t);
const vn = (t, e) => {
  let n;
  switch (t.code) {
    case b.invalid_type:
      t.received === T.undefined ? n = "Required" : n = `Expected ${t.expected}, received ${t.received}`;
      break;
    case b.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(t.expected, X.jsonStringifyReplacer)}`;
      break;
    case b.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${X.joinValues(t.keys, ", ")}`;
      break;
    case b.invalid_union:
      n = "Invalid input";
      break;
    case b.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${X.joinValues(t.options)}`;
      break;
    case b.invalid_enum_value:
      n = `Invalid enum value. Expected ${X.joinValues(t.options)}, received '${t.received}'`;
      break;
    case b.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case b.invalid_return_type:
      n = "Invalid function return type";
      break;
    case b.invalid_date:
      n = "Invalid date";
      break;
    case b.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (n = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? n = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? n = `Invalid input: must end with "${t.validation.endsWith}"` : X.assertNever(t.validation) : t.validation !== "regex" ? n = `Invalid ${t.validation}` : n = "Invalid";
      break;
    case b.too_small:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "bigint" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : n = "Invalid input";
      break;
    case b.too_big:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? n = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : n = "Invalid input";
      break;
    case b.custom:
      n = "Invalid input";
      break;
    case b.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case b.not_multiple_of:
      n = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case b.not_finite:
      n = "Number must be finite";
      break;
    default:
      n = e.defaultError, X.assertNever(t);
  }
  return { message: n };
};
let ni = vn;
function ri() {
  return ni;
}
const si = (t) => {
  const { data: e, path: n, errorMaps: r, issueData: s } = t, i = [...n, ...s.path || []], o = {
    ...s,
    path: i
  };
  if (s.message !== void 0)
    return {
      ...s,
      path: i,
      message: s.message
    };
  let a = "";
  const c = r.filter((l) => !!l).slice().reverse();
  for (const l of c)
    a = l(o, { data: e, defaultError: a }).message;
  return {
    ...s,
    path: i,
    message: a
  };
};
function R(t, e) {
  const n = ri(), r = si({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      // contextual error map is first priority
      t.schemaErrorMap,
      // then schema-bound map if available
      n,
      // then global override map
      n === vn ? void 0 : vn
      // then global default map
    ].filter((s) => !!s)
  });
  t.common.issues.push(r);
}
class ne {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, n) {
    const r = [];
    for (const s of n) {
      if (s.status === "aborted")
        return Z;
      s.status === "dirty" && e.dirty(), r.push(s.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, n) {
    const r = [];
    for (const s of n) {
      const i = await s.key, o = await s.value;
      r.push({
        key: i,
        value: o
      });
    }
    return ne.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, n) {
    const r = {};
    for (const s of n) {
      const { key: i, value: o } = s;
      if (i.status === "aborted" || o.status === "aborted")
        return Z;
      i.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), i.value !== "__proto__" && (typeof o.value < "u" || s.alwaysSet) && (r[i.value] = o.value);
    }
    return { status: e.value, value: r };
  }
}
const Z = Object.freeze({
  status: "aborted"
}), gt = (t) => ({ status: "dirty", value: t }), le = (t) => ({ status: "valid", value: t }), or = (t) => t.status === "aborted", ar = (t) => t.status === "dirty", tt = (t) => t.status === "valid", It = (t) => typeof Promise < "u" && t instanceof Promise;
var O;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(O || (O = {}));
class ye {
  constructor(e, n, r, s) {
    this._cachedPath = [], this.parent = e, this.data = n, this._path = r, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const cr = (t, e) => {
  if (tt(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const n = new Ee(t.common.issues);
      return this._error = n, this._error;
    }
  };
};
function W(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: n, required_error: r, description: s } = t;
  if (e && (n || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (o, a) => {
    const { message: c } = t;
    return o.code === "invalid_enum_value" ? { message: c ?? a.defaultError } : typeof a.data > "u" ? { message: c ?? r ?? a.defaultError } : o.code !== "invalid_type" ? { message: a.defaultError } : { message: c ?? n ?? a.defaultError };
  }, description: s };
}
class U {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return Ie(e.data);
  }
  _getOrReturnCtx(e, n) {
    return n || {
      common: e.parent.common,
      data: e.data,
      parsedType: Ie(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new ne(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: Ie(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const n = this._parse(e);
    if (It(n))
      throw new Error("Synchronous parse encountered promise.");
    return n;
  }
  _parseAsync(e) {
    const n = this._parse(e);
    return Promise.resolve(n);
  }
  parse(e, n) {
    const r = this.safeParse(e, n);
    if (r.success)
      return r.data;
    throw r.error;
  }
  safeParse(e, n) {
    const r = {
      common: {
        issues: [],
        async: (n == null ? void 0 : n.async) ?? !1,
        contextualErrorMap: n == null ? void 0 : n.errorMap
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Ie(e)
    }, s = this._parseSync({ data: e, path: r.path, parent: r });
    return cr(r, s);
  }
  "~validate"(e) {
    var r, s;
    const n = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Ie(e)
    };
    if (!this["~standard"].async)
      try {
        const i = this._parseSync({ data: e, path: [], parent: n });
        return tt(i) ? {
          value: i.value
        } : {
          issues: n.common.issues
        };
      } catch (i) {
        (s = (r = i == null ? void 0 : i.message) == null ? void 0 : r.toLowerCase()) != null && s.includes("encountered") && (this["~standard"].async = !0), n.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: n }).then((i) => tt(i) ? {
      value: i.value
    } : {
      issues: n.common.issues
    });
  }
  async parseAsync(e, n) {
    const r = await this.safeParseAsync(e, n);
    if (r.success)
      return r.data;
    throw r.error;
  }
  async safeParseAsync(e, n) {
    const r = {
      common: {
        issues: [],
        contextualErrorMap: n == null ? void 0 : n.errorMap,
        async: !0
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Ie(e)
    }, s = this._parse({ data: e, path: r.path, parent: r }), i = await (It(s) ? s : Promise.resolve(s));
    return cr(r, i);
  }
  refine(e, n) {
    const r = (s) => typeof n == "string" || typeof n > "u" ? { message: n } : typeof n == "function" ? n(s) : n;
    return this._refinement((s, i) => {
      const o = e(s), a = () => i.addIssue({
        code: b.custom,
        ...r(s)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((c) => c ? !0 : (a(), !1)) : o ? !0 : (a(), !1);
    });
  }
  refinement(e, n) {
    return this._refinement((r, s) => e(r) ? !0 : (s.addIssue(typeof n == "function" ? n(r, s) : n), !1));
  }
  _refinement(e) {
    return new st({
      schema: this,
      typeName: L.ZodEffects,
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
      validate: (n) => this["~validate"](n)
    };
  }
  optional() {
    return Le.create(this, this._def);
  }
  nullable() {
    return it.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return fe.create(this);
  }
  promise() {
    return Zt.create(this, this._def);
  }
  or(e) {
    return Lt.create([this, e], this._def);
  }
  and(e) {
    return Dt.create(this, e, this._def);
  }
  transform(e) {
    return new st({
      ...W(this._def),
      schema: this,
      typeName: L.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const n = typeof e == "function" ? e : () => e;
    return new _n({
      ...W(this._def),
      innerType: this,
      defaultValue: n,
      typeName: L.ZodDefault
    });
  }
  brand() {
    return new Si({
      typeName: L.ZodBranded,
      type: this,
      ...W(this._def)
    });
  }
  catch(e) {
    const n = typeof e == "function" ? e : () => e;
    return new wn({
      ...W(this._def),
      innerType: this,
      catchValue: n,
      typeName: L.ZodCatch
    });
  }
  describe(e) {
    const n = this.constructor;
    return new n({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return Dn.create(this, e);
  }
  readonly() {
    return kn.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const ii = /^c[^\s-]{8,}$/i, oi = /^[0-9a-z]+$/, ai = /^[0-9A-HJKMNP-TV-Z]{26}$/i, ci = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, li = /^[a-z0-9_-]{21}$/i, ui = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, di = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, fi = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, pi = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let nn;
const mi = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, hi = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, gi = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, yi = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, vi = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, bi = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, Yr = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", xi = new RegExp(`^${Yr}$`);
function Gr(t) {
  let e = "[0-5]\\d";
  t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`);
  const n = t.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${n}`;
}
function _i(t) {
  return new RegExp(`^${Gr(t)}$`);
}
function wi(t) {
  let e = `${Yr}T${Gr(t)}`;
  const n = [];
  return n.push(t.local ? "Z?" : "Z"), t.offset && n.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${n.join("|")})`, new RegExp(`^${e}$`);
}
function ki(t, e) {
  return !!((e === "v4" || !e) && mi.test(t) || (e === "v6" || !e) && gi.test(t));
}
function Ri(t, e) {
  if (!ui.test(t))
    return !1;
  try {
    const [n] = t.split(".");
    if (!n)
      return !1;
    const r = n.replace(/-/g, "+").replace(/_/g, "/").padEnd(n.length + (4 - n.length % 4) % 4, "="), s = JSON.parse(atob(r));
    return !(typeof s != "object" || s === null || "typ" in s && (s == null ? void 0 : s.typ) !== "JWT" || !s.alg || e && s.alg !== e);
  } catch {
    return !1;
  }
}
function Ci(t, e) {
  return !!((e === "v4" || !e) && hi.test(t) || (e === "v6" || !e) && yi.test(t));
}
class ke extends U {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== T.string) {
      const i = this._getOrReturnCtx(e);
      return R(i, {
        code: b.invalid_type,
        expected: T.string,
        received: i.parsedType
      }), Z;
    }
    const r = new ne();
    let s;
    for (const i of this._def.checks)
      if (i.kind === "min")
        e.data.length < i.value && (s = this._getOrReturnCtx(e, s), R(s, {
          code: b.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), r.dirty());
      else if (i.kind === "max")
        e.data.length > i.value && (s = this._getOrReturnCtx(e, s), R(s, {
          code: b.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), r.dirty());
      else if (i.kind === "length") {
        const o = e.data.length > i.value, a = e.data.length < i.value;
        (o || a) && (s = this._getOrReturnCtx(e, s), o ? R(s, {
          code: b.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }) : a && R(s, {
          code: b.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }), r.dirty());
      } else if (i.kind === "email")
        fi.test(e.data) || (s = this._getOrReturnCtx(e, s), R(s, {
          validation: "email",
          code: b.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "emoji")
        nn || (nn = new RegExp(pi, "u")), nn.test(e.data) || (s = this._getOrReturnCtx(e, s), R(s, {
          validation: "emoji",
          code: b.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "uuid")
        ci.test(e.data) || (s = this._getOrReturnCtx(e, s), R(s, {
          validation: "uuid",
          code: b.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "nanoid")
        li.test(e.data) || (s = this._getOrReturnCtx(e, s), R(s, {
          validation: "nanoid",
          code: b.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "cuid")
        ii.test(e.data) || (s = this._getOrReturnCtx(e, s), R(s, {
          validation: "cuid",
          code: b.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "cuid2")
        oi.test(e.data) || (s = this._getOrReturnCtx(e, s), R(s, {
          validation: "cuid2",
          code: b.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "ulid")
        ai.test(e.data) || (s = this._getOrReturnCtx(e, s), R(s, {
          validation: "ulid",
          code: b.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), R(s, {
            validation: "url",
            code: b.invalid_string,
            message: i.message
          }), r.dirty();
        }
      else i.kind === "regex" ? (i.regex.lastIndex = 0, i.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), R(s, {
        validation: "regex",
        code: b.invalid_string,
        message: i.message
      }), r.dirty())) : i.kind === "trim" ? e.data = e.data.trim() : i.kind === "includes" ? e.data.includes(i.value, i.position) || (s = this._getOrReturnCtx(e, s), R(s, {
        code: b.invalid_string,
        validation: { includes: i.value, position: i.position },
        message: i.message
      }), r.dirty()) : i.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : i.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : i.kind === "startsWith" ? e.data.startsWith(i.value) || (s = this._getOrReturnCtx(e, s), R(s, {
        code: b.invalid_string,
        validation: { startsWith: i.value },
        message: i.message
      }), r.dirty()) : i.kind === "endsWith" ? e.data.endsWith(i.value) || (s = this._getOrReturnCtx(e, s), R(s, {
        code: b.invalid_string,
        validation: { endsWith: i.value },
        message: i.message
      }), r.dirty()) : i.kind === "datetime" ? wi(i).test(e.data) || (s = this._getOrReturnCtx(e, s), R(s, {
        code: b.invalid_string,
        validation: "datetime",
        message: i.message
      }), r.dirty()) : i.kind === "date" ? xi.test(e.data) || (s = this._getOrReturnCtx(e, s), R(s, {
        code: b.invalid_string,
        validation: "date",
        message: i.message
      }), r.dirty()) : i.kind === "time" ? _i(i).test(e.data) || (s = this._getOrReturnCtx(e, s), R(s, {
        code: b.invalid_string,
        validation: "time",
        message: i.message
      }), r.dirty()) : i.kind === "duration" ? di.test(e.data) || (s = this._getOrReturnCtx(e, s), R(s, {
        validation: "duration",
        code: b.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "ip" ? ki(e.data, i.version) || (s = this._getOrReturnCtx(e, s), R(s, {
        validation: "ip",
        code: b.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "jwt" ? Ri(e.data, i.alg) || (s = this._getOrReturnCtx(e, s), R(s, {
        validation: "jwt",
        code: b.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "cidr" ? Ci(e.data, i.version) || (s = this._getOrReturnCtx(e, s), R(s, {
        validation: "cidr",
        code: b.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "base64" ? vi.test(e.data) || (s = this._getOrReturnCtx(e, s), R(s, {
        validation: "base64",
        code: b.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "base64url" ? bi.test(e.data) || (s = this._getOrReturnCtx(e, s), R(s, {
        validation: "base64url",
        code: b.invalid_string,
        message: i.message
      }), r.dirty()) : X.assertNever(i);
    return { status: r.value, value: e.data };
  }
  _regex(e, n, r) {
    return this.refinement((s) => e.test(s), {
      validation: n,
      code: b.invalid_string,
      ...O.errToObj(r)
    });
  }
  _addCheck(e) {
    return new ke({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...O.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...O.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...O.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...O.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...O.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...O.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...O.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...O.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...O.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...O.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...O.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...O.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...O.errToObj(e) });
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
      ...O.errToObj(e == null ? void 0 : e.message)
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
      ...O.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...O.errToObj(e) });
  }
  regex(e, n) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...O.errToObj(n)
    });
  }
  includes(e, n) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: n == null ? void 0 : n.position,
      ...O.errToObj(n == null ? void 0 : n.message)
    });
  }
  startsWith(e, n) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...O.errToObj(n)
    });
  }
  endsWith(e, n) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...O.errToObj(n)
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...O.errToObj(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...O.errToObj(n)
    });
  }
  length(e, n) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...O.errToObj(n)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, O.errToObj(e));
  }
  trim() {
    return new ke({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ke({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ke({
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
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
}
ke.create = (t) => new ke({
  checks: [],
  typeName: L.ZodString,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...W(t)
});
function Ti(t, e) {
  const n = (t.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, s = n > r ? n : r, i = Number.parseInt(t.toFixed(s).replace(".", "")), o = Number.parseInt(e.toFixed(s).replace(".", ""));
  return i % o / 10 ** s;
}
class nt extends U {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== T.number) {
      const i = this._getOrReturnCtx(e);
      return R(i, {
        code: b.invalid_type,
        expected: T.number,
        received: i.parsedType
      }), Z;
    }
    let r;
    const s = new ne();
    for (const i of this._def.checks)
      i.kind === "int" ? X.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), R(r, {
        code: b.invalid_type,
        expected: "integer",
        received: "float",
        message: i.message
      }), s.dirty()) : i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (r = this._getOrReturnCtx(e, r), R(r, {
        code: b.too_small,
        minimum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), s.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (r = this._getOrReturnCtx(e, r), R(r, {
        code: b.too_big,
        maximum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), s.dirty()) : i.kind === "multipleOf" ? Ti(e.data, i.value) !== 0 && (r = this._getOrReturnCtx(e, r), R(r, {
        code: b.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), s.dirty()) : i.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), R(r, {
        code: b.not_finite,
        message: i.message
      }), s.dirty()) : X.assertNever(i);
    return { status: s.value, value: e.data };
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, O.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, O.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, O.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, O.toString(n));
  }
  setLimit(e, n, r, s) {
    return new nt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: O.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new nt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: O.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: O.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: O.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: O.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: O.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: O.toString(n)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: O.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: O.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: O.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && X.isInteger(e.value));
  }
  get isFinite() {
    let e = null, n = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min" ? (n === null || r.value > n) && (n = r.value) : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    }
    return Number.isFinite(n) && Number.isFinite(e);
  }
}
nt.create = (t) => new nt({
  checks: [],
  typeName: L.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...W(t)
});
class bt extends U {
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
    if (this._getType(e) !== T.bigint)
      return this._getInvalidInput(e);
    let r;
    const s = new ne();
    for (const i of this._def.checks)
      i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (r = this._getOrReturnCtx(e, r), R(r, {
        code: b.too_small,
        type: "bigint",
        minimum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), s.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (r = this._getOrReturnCtx(e, r), R(r, {
        code: b.too_big,
        type: "bigint",
        maximum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), s.dirty()) : i.kind === "multipleOf" ? e.data % i.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), R(r, {
        code: b.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), s.dirty()) : X.assertNever(i);
    return { status: s.value, value: e.data };
  }
  _getInvalidInput(e) {
    const n = this._getOrReturnCtx(e);
    return R(n, {
      code: b.invalid_type,
      expected: T.bigint,
      received: n.parsedType
    }), Z;
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, O.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, O.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, O.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, O.toString(n));
  }
  setLimit(e, n, r, s) {
    return new bt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: O.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new bt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: O.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: O.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: O.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: O.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: O.toString(n)
    });
  }
  get minValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
}
bt.create = (t) => new bt({
  checks: [],
  typeName: L.ZodBigInt,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...W(t)
});
class lr extends U {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== T.boolean) {
      const r = this._getOrReturnCtx(e);
      return R(r, {
        code: b.invalid_type,
        expected: T.boolean,
        received: r.parsedType
      }), Z;
    }
    return le(e.data);
  }
}
lr.create = (t) => new lr({
  typeName: L.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...W(t)
});
class Mt extends U {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== T.date) {
      const i = this._getOrReturnCtx(e);
      return R(i, {
        code: b.invalid_type,
        expected: T.date,
        received: i.parsedType
      }), Z;
    }
    if (Number.isNaN(e.data.getTime())) {
      const i = this._getOrReturnCtx(e);
      return R(i, {
        code: b.invalid_date
      }), Z;
    }
    const r = new ne();
    let s;
    for (const i of this._def.checks)
      i.kind === "min" ? e.data.getTime() < i.value && (s = this._getOrReturnCtx(e, s), R(s, {
        code: b.too_small,
        message: i.message,
        inclusive: !0,
        exact: !1,
        minimum: i.value,
        type: "date"
      }), r.dirty()) : i.kind === "max" ? e.data.getTime() > i.value && (s = this._getOrReturnCtx(e, s), R(s, {
        code: b.too_big,
        message: i.message,
        inclusive: !0,
        exact: !1,
        maximum: i.value,
        type: "date"
      }), r.dirty()) : X.assertNever(i);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new Mt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: O.toString(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: O.toString(n)
    });
  }
  get minDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
}
Mt.create = (t) => new Mt({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: L.ZodDate,
  ...W(t)
});
class ur extends U {
  _parse(e) {
    if (this._getType(e) !== T.symbol) {
      const r = this._getOrReturnCtx(e);
      return R(r, {
        code: b.invalid_type,
        expected: T.symbol,
        received: r.parsedType
      }), Z;
    }
    return le(e.data);
  }
}
ur.create = (t) => new ur({
  typeName: L.ZodSymbol,
  ...W(t)
});
class dr extends U {
  _parse(e) {
    if (this._getType(e) !== T.undefined) {
      const r = this._getOrReturnCtx(e);
      return R(r, {
        code: b.invalid_type,
        expected: T.undefined,
        received: r.parsedType
      }), Z;
    }
    return le(e.data);
  }
}
dr.create = (t) => new dr({
  typeName: L.ZodUndefined,
  ...W(t)
});
class fr extends U {
  _parse(e) {
    if (this._getType(e) !== T.null) {
      const r = this._getOrReturnCtx(e);
      return R(r, {
        code: b.invalid_type,
        expected: T.null,
        received: r.parsedType
      }), Z;
    }
    return le(e.data);
  }
}
fr.create = (t) => new fr({
  typeName: L.ZodNull,
  ...W(t)
});
class pr extends U {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return le(e.data);
  }
}
pr.create = (t) => new pr({
  typeName: L.ZodAny,
  ...W(t)
});
class bn extends U {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return le(e.data);
  }
}
bn.create = (t) => new bn({
  typeName: L.ZodUnknown,
  ...W(t)
});
class De extends U {
  _parse(e) {
    const n = this._getOrReturnCtx(e);
    return R(n, {
      code: b.invalid_type,
      expected: T.never,
      received: n.parsedType
    }), Z;
  }
}
De.create = (t) => new De({
  typeName: L.ZodNever,
  ...W(t)
});
class mr extends U {
  _parse(e) {
    if (this._getType(e) !== T.undefined) {
      const r = this._getOrReturnCtx(e);
      return R(r, {
        code: b.invalid_type,
        expected: T.void,
        received: r.parsedType
      }), Z;
    }
    return le(e.data);
  }
}
mr.create = (t) => new mr({
  typeName: L.ZodVoid,
  ...W(t)
});
class fe extends U {
  _parse(e) {
    const { ctx: n, status: r } = this._processInputParams(e), s = this._def;
    if (n.parsedType !== T.array)
      return R(n, {
        code: b.invalid_type,
        expected: T.array,
        received: n.parsedType
      }), Z;
    if (s.exactLength !== null) {
      const o = n.data.length > s.exactLength.value, a = n.data.length < s.exactLength.value;
      (o || a) && (R(n, {
        code: o ? b.too_big : b.too_small,
        minimum: a ? s.exactLength.value : void 0,
        maximum: o ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), r.dirty());
    }
    if (s.minLength !== null && n.data.length < s.minLength.value && (R(n, {
      code: b.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), r.dirty()), s.maxLength !== null && n.data.length > s.maxLength.value && (R(n, {
      code: b.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), r.dirty()), n.common.async)
      return Promise.all([...n.data].map((o, a) => s.type._parseAsync(new ye(n, o, n.path, a)))).then((o) => ne.mergeArray(r, o));
    const i = [...n.data].map((o, a) => s.type._parseSync(new ye(n, o, n.path, a)));
    return ne.mergeArray(r, i);
  }
  get element() {
    return this._def.type;
  }
  min(e, n) {
    return new fe({
      ...this._def,
      minLength: { value: e, message: O.toString(n) }
    });
  }
  max(e, n) {
    return new fe({
      ...this._def,
      maxLength: { value: e, message: O.toString(n) }
    });
  }
  length(e, n) {
    return new fe({
      ...this._def,
      exactLength: { value: e, message: O.toString(n) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
fe.create = (t, e) => new fe({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: L.ZodArray,
  ...W(e)
});
function qe(t) {
  if (t instanceof J) {
    const e = {};
    for (const n in t.shape) {
      const r = t.shape[n];
      e[n] = Le.create(qe(r));
    }
    return new J({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof fe ? new fe({
    ...t._def,
    type: qe(t.element)
  }) : t instanceof Le ? Le.create(qe(t.unwrap())) : t instanceof it ? it.create(qe(t.unwrap())) : t instanceof Ue ? Ue.create(t.items.map((e) => qe(e))) : t;
}
class J extends U {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), n = X.objectKeys(e);
    return this._cached = { shape: e, keys: n }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== T.object) {
      const l = this._getOrReturnCtx(e);
      return R(l, {
        code: b.invalid_type,
        expected: T.object,
        received: l.parsedType
      }), Z;
    }
    const { status: r, ctx: s } = this._processInputParams(e), { shape: i, keys: o } = this._getCached(), a = [];
    if (!(this._def.catchall instanceof De && this._def.unknownKeys === "strip"))
      for (const l in s.data)
        o.includes(l) || a.push(l);
    const c = [];
    for (const l of o) {
      const u = i[l], d = s.data[l];
      c.push({
        key: { status: "valid", value: l },
        value: u._parse(new ye(s, d, s.path, l)),
        alwaysSet: l in s.data
      });
    }
    if (this._def.catchall instanceof De) {
      const l = this._def.unknownKeys;
      if (l === "passthrough")
        for (const u of a)
          c.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: s.data[u] }
          });
      else if (l === "strict")
        a.length > 0 && (R(s, {
          code: b.unrecognized_keys,
          keys: a
        }), r.dirty());
      else if (l !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const l = this._def.catchall;
      for (const u of a) {
        const d = s.data[u];
        c.push({
          key: { status: "valid", value: u },
          value: l._parse(
            new ye(s, d, s.path, u)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: u in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const l = [];
      for (const u of c) {
        const d = await u.key, p = await u.value;
        l.push({
          key: d,
          value: p,
          alwaysSet: u.alwaysSet
        });
      }
      return l;
    }).then((l) => ne.mergeObjectSync(r, l)) : ne.mergeObjectSync(r, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return O.errToObj, new J({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (n, r) => {
          var i, o;
          const s = ((o = (i = this._def).errorMap) == null ? void 0 : o.call(i, n, r).message) ?? r.defaultError;
          return n.code === "unrecognized_keys" ? {
            message: O.errToObj(e).message ?? s
          } : {
            message: s
          };
        }
      } : {}
    });
  }
  strip() {
    return new J({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new J({
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
    return new J({
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
    return new J({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: L.ZodObject
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
  setKey(e, n) {
    return this.augment({ [e]: n });
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
    return new J({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const n = {};
    for (const r of X.objectKeys(e))
      e[r] && this.shape[r] && (n[r] = this.shape[r]);
    return new J({
      ...this._def,
      shape: () => n
    });
  }
  omit(e) {
    const n = {};
    for (const r of X.objectKeys(this.shape))
      e[r] || (n[r] = this.shape[r]);
    return new J({
      ...this._def,
      shape: () => n
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return qe(this);
  }
  partial(e) {
    const n = {};
    for (const r of X.objectKeys(this.shape)) {
      const s = this.shape[r];
      e && !e[r] ? n[r] = s : n[r] = s.optional();
    }
    return new J({
      ...this._def,
      shape: () => n
    });
  }
  required(e) {
    const n = {};
    for (const r of X.objectKeys(this.shape))
      if (e && !e[r])
        n[r] = this.shape[r];
      else {
        let i = this.shape[r];
        for (; i instanceof Le; )
          i = i._def.innerType;
        n[r] = i;
      }
    return new J({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return Xr(X.objectKeys(this.shape));
  }
}
J.create = (t, e) => new J({
  shape: () => t,
  unknownKeys: "strip",
  catchall: De.create(),
  typeName: L.ZodObject,
  ...W(e)
});
J.strictCreate = (t, e) => new J({
  shape: () => t,
  unknownKeys: "strict",
  catchall: De.create(),
  typeName: L.ZodObject,
  ...W(e)
});
J.lazycreate = (t, e) => new J({
  shape: t,
  unknownKeys: "strip",
  catchall: De.create(),
  typeName: L.ZodObject,
  ...W(e)
});
class Lt extends U {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = this._def.options;
    function s(i) {
      for (const a of i)
        if (a.result.status === "valid")
          return a.result;
      for (const a of i)
        if (a.result.status === "dirty")
          return n.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((a) => new Ee(a.ctx.common.issues));
      return R(n, {
        code: b.invalid_union,
        unionErrors: o
      }), Z;
    }
    if (n.common.async)
      return Promise.all(r.map(async (i) => {
        const o = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await i._parseAsync({
            data: n.data,
            path: n.path,
            parent: o
          }),
          ctx: o
        };
      })).then(s);
    {
      let i;
      const o = [];
      for (const c of r) {
        const l = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        }, u = c._parseSync({
          data: n.data,
          path: n.path,
          parent: l
        });
        if (u.status === "valid")
          return u;
        u.status === "dirty" && !i && (i = { result: u, ctx: l }), l.common.issues.length && o.push(l.common.issues);
      }
      if (i)
        return n.common.issues.push(...i.ctx.common.issues), i.result;
      const a = o.map((c) => new Ee(c));
      return R(n, {
        code: b.invalid_union,
        unionErrors: a
      }), Z;
    }
  }
  get options() {
    return this._def.options;
  }
}
Lt.create = (t, e) => new Lt({
  options: t,
  typeName: L.ZodUnion,
  ...W(e)
});
function xn(t, e) {
  const n = Ie(t), r = Ie(e);
  if (t === e)
    return { valid: !0, data: t };
  if (n === T.object && r === T.object) {
    const s = X.objectKeys(e), i = X.objectKeys(t).filter((a) => s.indexOf(a) !== -1), o = { ...t, ...e };
    for (const a of i) {
      const c = xn(t[a], e[a]);
      if (!c.valid)
        return { valid: !1 };
      o[a] = c.data;
    }
    return { valid: !0, data: o };
  } else if (n === T.array && r === T.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let i = 0; i < t.length; i++) {
      const o = t[i], a = e[i], c = xn(o, a);
      if (!c.valid)
        return { valid: !1 };
      s.push(c.data);
    }
    return { valid: !0, data: s };
  } else return n === T.date && r === T.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class Dt extends U {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), s = (i, o) => {
      if (or(i) || or(o))
        return Z;
      const a = xn(i.value, o.value);
      return a.valid ? ((ar(i) || ar(o)) && n.dirty(), { status: n.value, value: a.data }) : (R(r, {
        code: b.invalid_intersection_types
      }), Z);
    };
    return r.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }),
      this._def.right._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      })
    ]).then(([i, o]) => s(i, o)) : s(this._def.left._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }), this._def.right._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }));
  }
}
Dt.create = (t, e, n) => new Dt({
  left: t,
  right: e,
  typeName: L.ZodIntersection,
  ...W(n)
});
class Ue extends U {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== T.array)
      return R(r, {
        code: b.invalid_type,
        expected: T.array,
        received: r.parsedType
      }), Z;
    if (r.data.length < this._def.items.length)
      return R(r, {
        code: b.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), Z;
    !this._def.rest && r.data.length > this._def.items.length && (R(r, {
      code: b.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), n.dirty());
    const i = [...r.data].map((o, a) => {
      const c = this._def.items[a] || this._def.rest;
      return c ? c._parse(new ye(r, o, r.path, a)) : null;
    }).filter((o) => !!o);
    return r.common.async ? Promise.all(i).then((o) => ne.mergeArray(n, o)) : ne.mergeArray(n, i);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new Ue({
      ...this._def,
      rest: e
    });
  }
}
Ue.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Ue({
    items: t,
    typeName: L.ZodTuple,
    rest: null,
    ...W(e)
  });
};
class jt extends U {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== T.object)
      return R(r, {
        code: b.invalid_type,
        expected: T.object,
        received: r.parsedType
      }), Z;
    const s = [], i = this._def.keyType, o = this._def.valueType;
    for (const a in r.data)
      s.push({
        key: i._parse(new ye(r, a, r.path, a)),
        value: o._parse(new ye(r, r.data[a], r.path, a)),
        alwaysSet: a in r.data
      });
    return r.common.async ? ne.mergeObjectAsync(n, s) : ne.mergeObjectSync(n, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, n, r) {
    return n instanceof U ? new jt({
      keyType: e,
      valueType: n,
      typeName: L.ZodRecord,
      ...W(r)
    }) : new jt({
      keyType: ke.create(),
      valueType: e,
      typeName: L.ZodRecord,
      ...W(n)
    });
  }
}
class hr extends U {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== T.map)
      return R(r, {
        code: b.invalid_type,
        expected: T.map,
        received: r.parsedType
      }), Z;
    const s = this._def.keyType, i = this._def.valueType, o = [...r.data.entries()].map(([a, c], l) => ({
      key: s._parse(new ye(r, a, r.path, [l, "key"])),
      value: i._parse(new ye(r, c, r.path, [l, "value"]))
    }));
    if (r.common.async) {
      const a = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of o) {
          const l = await c.key, u = await c.value;
          if (l.status === "aborted" || u.status === "aborted")
            return Z;
          (l.status === "dirty" || u.status === "dirty") && n.dirty(), a.set(l.value, u.value);
        }
        return { status: n.value, value: a };
      });
    } else {
      const a = /* @__PURE__ */ new Map();
      for (const c of o) {
        const l = c.key, u = c.value;
        if (l.status === "aborted" || u.status === "aborted")
          return Z;
        (l.status === "dirty" || u.status === "dirty") && n.dirty(), a.set(l.value, u.value);
      }
      return { status: n.value, value: a };
    }
  }
}
hr.create = (t, e, n) => new hr({
  valueType: e,
  keyType: t,
  typeName: L.ZodMap,
  ...W(n)
});
class xt extends U {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== T.set)
      return R(r, {
        code: b.invalid_type,
        expected: T.set,
        received: r.parsedType
      }), Z;
    const s = this._def;
    s.minSize !== null && r.data.size < s.minSize.value && (R(r, {
      code: b.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), n.dirty()), s.maxSize !== null && r.data.size > s.maxSize.value && (R(r, {
      code: b.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), n.dirty());
    const i = this._def.valueType;
    function o(c) {
      const l = /* @__PURE__ */ new Set();
      for (const u of c) {
        if (u.status === "aborted")
          return Z;
        u.status === "dirty" && n.dirty(), l.add(u.value);
      }
      return { status: n.value, value: l };
    }
    const a = [...r.data.values()].map((c, l) => i._parse(new ye(r, c, r.path, l)));
    return r.common.async ? Promise.all(a).then((c) => o(c)) : o(a);
  }
  min(e, n) {
    return new xt({
      ...this._def,
      minSize: { value: e, message: O.toString(n) }
    });
  }
  max(e, n) {
    return new xt({
      ...this._def,
      maxSize: { value: e, message: O.toString(n) }
    });
  }
  size(e, n) {
    return this.min(e, n).max(e, n);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
xt.create = (t, e) => new xt({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: L.ZodSet,
  ...W(e)
});
class gr extends U {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
gr.create = (t, e) => new gr({
  getter: t,
  typeName: L.ZodLazy,
  ...W(e)
});
class yr extends U {
  _parse(e) {
    if (e.data !== this._def.value) {
      const n = this._getOrReturnCtx(e);
      return R(n, {
        received: n.data,
        code: b.invalid_literal,
        expected: this._def.value
      }), Z;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
yr.create = (t, e) => new yr({
  value: t,
  typeName: L.ZodLiteral,
  ...W(e)
});
function Xr(t, e) {
  return new rt({
    values: t,
    typeName: L.ZodEnum,
    ...W(e)
  });
}
class rt extends U {
  _parse(e) {
    if (typeof e.data != "string") {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return R(n, {
        expected: X.joinValues(r),
        received: n.parsedType,
        code: b.invalid_type
      }), Z;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return R(n, {
        received: n.data,
        code: b.invalid_enum_value,
        options: r
      }), Z;
    }
    return le(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  get Values() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  get Enum() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  extract(e, n = this._def) {
    return rt.create(e, {
      ...this._def,
      ...n
    });
  }
  exclude(e, n = this._def) {
    return rt.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...n
    });
  }
}
rt.create = Xr;
class vr extends U {
  _parse(e) {
    const n = X.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== T.string && r.parsedType !== T.number) {
      const s = X.objectValues(n);
      return R(r, {
        expected: X.joinValues(s),
        received: r.parsedType,
        code: b.invalid_type
      }), Z;
    }
    if (this._cache || (this._cache = new Set(X.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const s = X.objectValues(n);
      return R(r, {
        received: r.data,
        code: b.invalid_enum_value,
        options: s
      }), Z;
    }
    return le(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
vr.create = (t, e) => new vr({
  values: t,
  typeName: L.ZodNativeEnum,
  ...W(e)
});
class Zt extends U {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== T.promise && n.common.async === !1)
      return R(n, {
        code: b.invalid_type,
        expected: T.promise,
        received: n.parsedType
      }), Z;
    const r = n.parsedType === T.promise ? n.data : Promise.resolve(n.data);
    return le(r.then((s) => this._def.type.parseAsync(s, {
      path: n.path,
      errorMap: n.common.contextualErrorMap
    })));
  }
}
Zt.create = (t, e) => new Zt({
  type: t,
  typeName: L.ZodPromise,
  ...W(e)
});
class st extends U {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === L.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), s = this._def.effect || null, i = {
      addIssue: (o) => {
        R(r, o), o.fatal ? n.abort() : n.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (i.addIssue = i.addIssue.bind(i), s.type === "preprocess") {
      const o = s.transform(r.data, i);
      if (r.common.async)
        return Promise.resolve(o).then(async (a) => {
          if (n.value === "aborted")
            return Z;
          const c = await this._def.schema._parseAsync({
            data: a,
            path: r.path,
            parent: r
          });
          return c.status === "aborted" ? Z : c.status === "dirty" || n.value === "dirty" ? gt(c.value) : c;
        });
      {
        if (n.value === "aborted")
          return Z;
        const a = this._def.schema._parseSync({
          data: o,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? Z : a.status === "dirty" || n.value === "dirty" ? gt(a.value) : a;
      }
    }
    if (s.type === "refinement") {
      const o = (a) => {
        const c = s.refinement(a, i);
        if (r.common.async)
          return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return a;
      };
      if (r.common.async === !1) {
        const a = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? Z : (a.status === "dirty" && n.dirty(), o(a.value), { status: n.value, value: a.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((a) => a.status === "aborted" ? Z : (a.status === "dirty" && n.dirty(), o(a.value).then(() => ({ status: n.value, value: a.value }))));
    }
    if (s.type === "transform")
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!tt(o))
          return Z;
        const a = s.transform(o.value, i);
        if (a instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: n.value, value: a };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => tt(o) ? Promise.resolve(s.transform(o.value, i)).then((a) => ({
          status: n.value,
          value: a
        })) : Z);
    X.assertNever(s);
  }
}
st.create = (t, e, n) => new st({
  schema: t,
  typeName: L.ZodEffects,
  effect: e,
  ...W(n)
});
st.createWithPreprocess = (t, e, n) => new st({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: L.ZodEffects,
  ...W(n)
});
class Le extends U {
  _parse(e) {
    return this._getType(e) === T.undefined ? le(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Le.create = (t, e) => new Le({
  innerType: t,
  typeName: L.ZodOptional,
  ...W(e)
});
class it extends U {
  _parse(e) {
    return this._getType(e) === T.null ? le(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
it.create = (t, e) => new it({
  innerType: t,
  typeName: L.ZodNullable,
  ...W(e)
});
class _n extends U {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    let r = n.data;
    return n.parsedType === T.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
_n.create = (t, e) => new _n({
  innerType: t,
  typeName: L.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...W(e)
});
class wn extends U {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = {
      ...n,
      common: {
        ...n.common,
        issues: []
      }
    }, s = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return It(s) ? s.then((i) => ({
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new Ee(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new Ee(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
wn.create = (t, e) => new wn({
  innerType: t,
  typeName: L.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...W(e)
});
class br extends U {
  _parse(e) {
    if (this._getType(e) !== T.nan) {
      const r = this._getOrReturnCtx(e);
      return R(r, {
        code: b.invalid_type,
        expected: T.nan,
        received: r.parsedType
      }), Z;
    }
    return { status: "valid", value: e.data };
  }
}
br.create = (t) => new br({
  typeName: L.ZodNaN,
  ...W(t)
});
class Si extends U {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = n.data;
    return this._def.type._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class Dn extends U {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const i = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return i.status === "aborted" ? Z : i.status === "dirty" ? (n.dirty(), gt(i.value)) : this._def.out._parseAsync({
          data: i.value,
          path: r.path,
          parent: r
        });
      })();
    {
      const s = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      });
      return s.status === "aborted" ? Z : s.status === "dirty" ? (n.dirty(), {
        status: "dirty",
        value: s.value
      }) : this._def.out._parseSync({
        data: s.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, n) {
    return new Dn({
      in: e,
      out: n,
      typeName: L.ZodPipeline
    });
  }
}
class kn extends U {
  _parse(e) {
    const n = this._def.innerType._parse(e), r = (s) => (tt(s) && (s.value = Object.freeze(s.value)), s);
    return It(n) ? n.then((s) => r(s)) : r(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
kn.create = (t, e) => new kn({
  innerType: t,
  typeName: L.ZodReadonly,
  ...W(e)
});
var L;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(L || (L = {}));
const j = ke.create, qr = nt.create, jn = bn.create;
De.create;
const Ei = fe.create, Q = J.create;
Lt.create;
Dt.create;
Ue.create;
const Wt = jt.create, He = rt.create;
Zt.create;
Le.create;
it.create;
Q({
  taskId: j(),
  title: j(),
  userId: j()
});
Q({
  taskId: j(),
  changes: Wt(jn())
});
Q({
  taskId: j()
});
Q({
  reportId: j(),
  type: j(),
  title: j().optional()
});
Q({
  userId: j(),
  email: j(),
  timestamp: j()
});
Q({
  message: j(),
  variant: He(["info", "success", "error", "warning"]).default("info"),
  title: j().optional()
});
Q({
  pluginId: j(),
  error: j(),
  stack: j().optional()
});
Q({
  pluginId: j(),
  version: j().optional()
});
const Pi = Q({
  id: j().min(1),
  name: j().min(1),
  version: j().regex(/^\d+\.\d+\.\d+$/),
  description: j(),
  author: j(),
  entry: j(),
  hostCompatibility: j().default("^1.0.0"),
  permissions: Ei(He(ei)).default([]),
  dependencies: Wt(j()).optional(),
  icon: j().optional(),
  category: j().optional()
});
Q({
  path: j(),
  label: j().optional(),
  permission: j().optional()
});
Q({
  slot: He(ti),
  priority: qr().default(0)
});
Q({
  label: j(),
  path: j(),
  icon: j().optional(),
  section: j().optional(),
  order: qr().default(0)
});
Q({
  email: j().email(),
  password: j().min(6)
});
Q({
  version: j().optional()
});
Q({
  version: j()
});
Wt(jn());
const Oi = Q({
  title: j().min(1),
  description: j().optional(),
  status: He(["todo", "in_progress", "done"]).default("todo"),
  priority: He(["low", "medium", "high"]).default("medium")
});
Oi.partial();
Q({
  type: He(["tasks", "activity", "usage"]),
  format: He(["json", "csv"]).default("json"),
  title: j().optional()
});
Q({
  pluginId: j(),
  event: j(),
  payload: Wt(jn()).optional(),
  timestamp: j().optional()
});
function Kr() {
  const t = typeof window < "u" ? window.__FPP_HOST_BRIDGE__ : null;
  if (!t)
    throw new Error("[PluginSDK] Host bridge not initialized");
  return t;
}
function Jr(t) {
  return Kr().getContext({ id: t });
}
function Ai(t) {
  const e = Pi.safeParse(t.manifest);
  if (!e.success)
    throw new Error(
      `[PluginSDK] Invalid manifest: ${e.error.message}`
    );
  t.manifest.id;
  try {
    Kr().registerContributions(t);
  } finally {
  }
}
const Ni = ct(null);
function Qr() {
  const t = lt(Ni);
  if (!t)
    throw new Error(
      "[PluginSDK] usePluginId must be used within PluginIdProvider (wrap plugin UI in PluginBoundary)"
    );
  return t;
}
function $i(t) {
  const e = Qr(), n = Jr(e), [r, s] = ae(() => ({
    ...t,
    ...n.config.get()
  }));
  ge(() => {
    s({ ...t, ...n.config.get() });
  }, [e]);
  const i = Ce(
    async (o) => {
      const a = { ...r, ...o };
      s(a), await n.config.set(o);
    },
    [r, n]
  );
  return [r, i];
}
function yt(t, e) {
  const n = Qr();
  ge(() => Jr(n).events.subscribe(t, e), [n, t, e]);
}
const Ii = "com.fpp.analytics", Mi = "Analytics", Li = "1.0.0", Di = "Dashboard widgets, usage statistics, and activity charts.", ji = "FPP Team", Zi = "/plugins/com.fpp.analytics/index.js", Fi = "^1.0.0", zi = ["analytics:read", "events:task.*", "events:user.*"], Vi = "chart-bar", Bi = "Productivity", Wi = {
  id: Ii,
  name: Mi,
  version: Li,
  description: Di,
  author: ji,
  entry: Zi,
  hostCompatibility: Fi,
  permissions: zi,
  icon: Vi,
  category: Bi
};
function Zn(t) {
  return Object.keys(t);
}
function Ui(t) {
  return t.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
function rn(t) {
  return t === "0rem" ? "0rem" : `calc(${t} * var(--mantine-scale))`;
}
function es(t, { shouldScale: e = !1 } = {}) {
  function n(r) {
    if (r === 0 || r === "0")
      return `0${t}`;
    if (typeof r == "number") {
      const s = `${r / 16}${t}`;
      return e ? rn(s) : s;
    }
    if (typeof r == "string") {
      if (r === "" || r.startsWith("calc(") || r.startsWith("clamp(") || r.includes("rgba("))
        return r;
      if (r.includes(","))
        return r.split(",").map((i) => n(i)).join(",");
      if (r.includes(" "))
        return r.split(" ").map((i) => n(i)).join(" ");
      if (r.includes(t))
        return e ? rn(r) : r;
      const s = r.replace("px", "");
      if (!Number.isNaN(Number(s))) {
        const i = `${Number(s) / 16}${t}`;
        return e ? rn(i) : i;
      }
    }
    return r;
  }
  return n;
}
const de = es("rem", { shouldScale: !0 });
es("em");
function Fn(t) {
  return Object.keys(t).reduce((e, n) => (t[n] !== void 0 && (e[n] = t[n]), e), {});
}
function ts(t) {
  if (typeof t == "number")
    return !0;
  if (typeof t == "string") {
    if (t.startsWith("calc(") || t.startsWith("var(") || t.includes(" ") && t.trim() !== "")
      return !0;
    const e = /^[+-]?[0-9]+(\.[0-9]+)?(px|em|rem|ex|ch|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh|cm|mm|in|pt|pc|q|cqw|cqh|cqi|cqb|cqmin|cqmax|%)?$/;
    return t.trim().split(/\s+/).every((r) => e.test(r));
  }
  return !1;
}
function ns(t) {
  return Array.isArray(t) || t === null ? !1 : typeof t == "object" ? t.type !== Gs : !1;
}
function Hi(t) {
  const e = ct(null);
  return [({ children: s, value: i }) => /* @__PURE__ */ M(e.Provider, { value: i, children: s }), () => {
    const s = lt(e);
    if (s === null)
      throw new Error(t);
    return s;
  }];
}
const Yi = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function rs(t) {
  return Yi[t];
}
function kt(t, e = "size", n = !0) {
  if (t !== void 0)
    return ts(t) ? n ? de(t) : t : `var(--${e}-${t})`;
}
function Ut(t) {
  return kt(t, "mantine-spacing");
}
function zn(t) {
  return t === void 0 ? "var(--mantine-radius-default)" : kt(t, "mantine-radius");
}
function Gi(t) {
  return kt(t, "mantine-font-size");
}
function Xi(t) {
  return kt(t, "mantine-line-height", !1);
}
function qi(t) {
  if (t)
    return kt(t, "mantine-shadow", !1);
}
function Ki(t = "mantine-") {
  return `${t}${Math.random().toString(36).slice(2, 11)}`;
}
function Ji(t, e) {
  try {
    return t.addEventListener("change", e), () => t.removeEventListener("change", e);
  } catch {
    return t.addListener(e), () => t.removeListener(e);
  }
}
function Qi(t, e) {
  return typeof window < "u" && "matchMedia" in window ? window.matchMedia(t).matches : !1;
}
function eo(t, e, { getInitialValueInEffect: n } = {
  getInitialValueInEffect: !0
}) {
  const [r, s] = ae(
    n ? e : Qi(t)
  ), i = Te(null);
  return ge(() => {
    if ("matchMedia" in window)
      return i.current = window.matchMedia(t), s(i.current.matches), Ji(i.current, (o) => s(o.matches));
  }, [t]), r;
}
const ss = typeof document < "u" ? Mn : ge;
function Ft(t, e) {
  const n = Te(!1);
  ge(
    () => () => {
      n.current = !1;
    },
    []
  ), ge(() => {
    if (n.current)
      return t();
    n.current = !0;
  }, e);
}
const to = yn.useId || (() => {
});
function no() {
  const t = to();
  return t ? `mantine-${t.replace(/:/g, "")}` : "";
}
function ro(t) {
  const e = no(), [n, r] = ae(e);
  return ss(() => {
    r(Ki());
  }, []), typeof window > "u" ? e : n;
}
function Rn(t, e) {
  if (typeof t == "function")
    return t(e);
  typeof t == "object" && t !== null && "current" in t && (t.current = e);
}
function so(...t) {
  const e = /* @__PURE__ */ new Map();
  return (n) => {
    if (t.forEach((r) => {
      const s = Rn(r, n);
      s && e.set(r, s);
    }), e.size > 0)
      return () => {
        t.forEach((r) => {
          const s = e.get(r);
          s ? s() : Rn(r, null);
        }), e.clear();
      };
  };
}
function is(...t) {
  return Ce(so(...t), t);
}
function io(t, e) {
  return eo("(prefers-reduced-motion: reduce)", t, e);
}
function os(t) {
  var n;
  const e = yn.version;
  return typeof yn.version != "string" || e.startsWith("18.") ? t == null ? void 0 : t.ref : (n = t == null ? void 0 : t.props) == null ? void 0 : n.ref;
}
function as(t) {
  var e, n, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (e = 0; e < s; e++) t[e] && (n = as(t[e])) && (r && (r += " "), r += n);
  } else for (n in t) t[n] && (r && (r += " "), r += n);
  return r;
}
function Rt() {
  for (var t, e, n = 0, r = "", s = arguments.length; n < s; n++) (t = arguments[n]) && (e = as(t)) && (r && (r += " "), r += e);
  return r;
}
const oo = {};
function ao(t) {
  const e = {};
  return t.forEach((n) => {
    Object.entries(n).forEach(([r, s]) => {
      e[r] ? e[r] = Rt(e[r], s) : e[r] = s;
    });
  }), e;
}
function Vn({ theme: t, classNames: e, props: n, stylesCtx: r }) {
  const i = (Array.isArray(e) ? e : [e]).map(
    (o) => typeof o == "function" ? o(t, n, r) : o || oo
  );
  return ao(i);
}
function Cn({ theme: t, styles: e, props: n, stylesCtx: r }) {
  return (Array.isArray(e) ? e : [e]).reduce((i, o) => typeof o == "function" ? { ...i, ...o(t, n, r) } : { ...i, ...o }, {});
}
const co = ct(null);
function Ge() {
  const t = lt(co);
  if (!t)
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  return t;
}
function lo() {
  return Ge().classNamesPrefix;
}
function uo() {
  return Ge().getStyleNonce;
}
function fo() {
  return Ge().withStaticClasses;
}
function po() {
  return Ge().headless;
}
function mo() {
  var t;
  return (t = Ge().stylesTransform) == null ? void 0 : t.sx;
}
function ho() {
  var t;
  return (t = Ge().stylesTransform) == null ? void 0 : t.styles;
}
function cs() {
  return Ge().env || "default";
}
function go(t) {
  return /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i.test(t);
}
function yo(t) {
  let e = t.replace("#", "");
  if (e.length === 3) {
    const o = e.split("");
    e = [
      o[0],
      o[0],
      o[1],
      o[1],
      o[2],
      o[2]
    ].join("");
  }
  if (e.length === 8) {
    const o = parseInt(e.slice(6, 8), 16) / 255;
    return {
      r: parseInt(e.slice(0, 2), 16),
      g: parseInt(e.slice(2, 4), 16),
      b: parseInt(e.slice(4, 6), 16),
      a: o
    };
  }
  const n = parseInt(e, 16), r = n >> 16 & 255, s = n >> 8 & 255, i = n & 255;
  return {
    r,
    g: s,
    b: i,
    a: 1
  };
}
function vo(t) {
  const [e, n, r, s] = t.replace(/[^0-9,./]/g, "").split(/[/,]/).map(Number);
  return { r: e, g: n, b: r, a: s === void 0 ? 1 : s };
}
function bo(t) {
  const e = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i, n = t.match(e);
  if (!n)
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  const r = parseInt(n[1], 10), s = parseInt(n[2], 10) / 100, i = parseInt(n[3], 10) / 100, o = n[5] ? parseFloat(n[5]) : void 0, a = (1 - Math.abs(2 * i - 1)) * s, c = r / 60, l = a * (1 - Math.abs(c % 2 - 1)), u = i - a / 2;
  let d, p, f;
  return c >= 0 && c < 1 ? (d = a, p = l, f = 0) : c >= 1 && c < 2 ? (d = l, p = a, f = 0) : c >= 2 && c < 3 ? (d = 0, p = a, f = l) : c >= 3 && c < 4 ? (d = 0, p = l, f = a) : c >= 4 && c < 5 ? (d = l, p = 0, f = a) : (d = a, p = 0, f = l), {
    r: Math.round((d + u) * 255),
    g: Math.round((p + u) * 255),
    b: Math.round((f + u) * 255),
    a: o || 1
  };
}
function xo(t) {
  return go(t) ? yo(t) : t.startsWith("rgb") ? vo(t) : t.startsWith("hsl") ? bo(t) : {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function _o(t, e) {
  return typeof t.primaryShade == "number" ? t.primaryShade : e === "dark" ? t.primaryShade.dark : t.primaryShade.light;
}
function sn(t) {
  return t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4;
}
function wo(t) {
  const e = t.match(/oklch\((.*?)%\s/);
  return e ? parseFloat(e[1]) : null;
}
function ko(t) {
  if (t.startsWith("oklch("))
    return (wo(t) || 0) / 100;
  const { r: e, g: n, b: r } = xo(t), s = e / 255, i = n / 255, o = r / 255, a = sn(s), c = sn(i), l = sn(o);
  return 0.2126 * a + 0.7152 * c + 0.0722 * l;
}
function mt(t, e = 0.179) {
  return t.startsWith("var(") ? !1 : ko(t) > e;
}
function Bn({
  color: t,
  theme: e,
  colorScheme: n
}) {
  if (typeof t != "string")
    throw new Error(
      `[@mantine/core] Failed to parse color. Expected color to be a string, instead got ${typeof t}`
    );
  if (t === "bright")
    return {
      color: t,
      value: n === "dark" ? e.white : e.black,
      shade: void 0,
      isThemeColor: !1,
      isLight: mt(
        n === "dark" ? e.white : e.black,
        e.luminanceThreshold
      ),
      variable: "--mantine-color-bright"
    };
  if (t === "dimmed")
    return {
      color: t,
      value: n === "dark" ? e.colors.dark[2] : e.colors.gray[7],
      shade: void 0,
      isThemeColor: !1,
      isLight: mt(
        n === "dark" ? e.colors.dark[2] : e.colors.gray[6],
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
      isLight: mt(
        t === "white" ? e.white : e.black,
        e.luminanceThreshold
      ),
      variable: `--mantine-color-${t}`
    };
  const [r, s] = t.split("."), i = s ? Number(s) : void 0, o = r in e.colors;
  if (o) {
    const a = i !== void 0 ? e.colors[r][i] : e.colors[r][_o(e, n || "light")];
    return {
      color: r,
      value: a,
      shade: i,
      isThemeColor: o,
      isLight: mt(a, e.luminanceThreshold),
      variable: s ? `--mantine-color-${r}-${i}` : `--mantine-color-${r}-filled`
    };
  }
  return {
    color: t,
    value: t,
    isThemeColor: o,
    isLight: mt(t, e.luminanceThreshold),
    shade: i,
    variable: void 0
  };
}
function ot(t, e) {
  const n = Bn({ color: t || e.primaryColor, theme: e });
  return n.variable ? `var(${n.variable})` : t;
}
function Ro(t, e) {
  const n = {
    from: (t == null ? void 0 : t.from) || e.defaultGradient.from,
    to: (t == null ? void 0 : t.to) || e.defaultGradient.to,
    deg: (t == null ? void 0 : t.deg) ?? e.defaultGradient.deg ?? 0
  }, r = ot(n.from, e), s = ot(n.to, e);
  return `linear-gradient(${n.deg}deg, ${r} 0%, ${s} 100%)`;
}
const Co = ct(null);
function Xe() {
  const t = lt(Co);
  if (!t)
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  return t;
}
const To = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function So({ theme: t, options: e, unstyled: n }) {
  return Rt(
    (e == null ? void 0 : e.focusable) && !n && (t.focusClassName || To[t.focusRing]),
    (e == null ? void 0 : e.active) && !n && t.activeClassName
  );
}
function Eo({
  selector: t,
  stylesCtx: e,
  options: n,
  props: r,
  theme: s
}) {
  return Vn({
    theme: s,
    classNames: n == null ? void 0 : n.classNames,
    props: (n == null ? void 0 : n.props) || r,
    stylesCtx: e
  })[t];
}
function xr({
  selector: t,
  stylesCtx: e,
  theme: n,
  classNames: r,
  props: s
}) {
  return Vn({ theme: n, classNames: r, props: s, stylesCtx: e })[t];
}
function Po({ rootSelector: t, selector: e, className: n }) {
  return t === e ? n : void 0;
}
function Oo({ selector: t, classes: e, unstyled: n }) {
  return n ? void 0 : e[t];
}
function Ao({
  themeName: t,
  classNamesPrefix: e,
  selector: n,
  withStaticClass: r
}) {
  return r === !1 ? [] : t.map((s) => `${e}-${s}-${n}`);
}
function No({
  themeName: t,
  theme: e,
  selector: n,
  props: r,
  stylesCtx: s
}) {
  return t.map(
    (i) => {
      var o, a;
      return (a = Vn({
        theme: e,
        classNames: (o = e.components[i]) == null ? void 0 : o.classNames,
        props: r,
        stylesCtx: s
      })) == null ? void 0 : a[n];
    }
  );
}
function $o({
  options: t,
  classes: e,
  selector: n,
  unstyled: r
}) {
  return t != null && t.variant && !r ? e[`${n}--${t.variant}`] : void 0;
}
function Io({
  theme: t,
  options: e,
  themeName: n,
  selector: r,
  classNamesPrefix: s,
  classNames: i,
  classes: o,
  unstyled: a,
  className: c,
  rootSelector: l,
  props: u,
  stylesCtx: d,
  withStaticClasses: p,
  headless: f,
  transformedStyles: h
}) {
  return Rt(
    So({ theme: t, options: e, unstyled: a || f }),
    No({ theme: t, themeName: n, selector: r, props: u, stylesCtx: d }),
    $o({ options: e, classes: o, selector: r, unstyled: a }),
    xr({ selector: r, stylesCtx: d, theme: t, classNames: i, props: u }),
    xr({ selector: r, stylesCtx: d, theme: t, classNames: h, props: u }),
    Eo({ selector: r, stylesCtx: d, options: e, props: u, theme: t }),
    Po({ rootSelector: l, selector: r, className: c }),
    Oo({ selector: r, classes: o, unstyled: a || f }),
    p && !f && Ao({
      themeName: n,
      classNamesPrefix: s,
      selector: r,
      withStaticClass: e == null ? void 0 : e.withStaticClass
    }),
    e == null ? void 0 : e.className
  );
}
function Mo({
  theme: t,
  themeName: e,
  props: n,
  stylesCtx: r,
  selector: s
}) {
  return e.map(
    (i) => {
      var o;
      return Cn({
        theme: t,
        styles: (o = t.components[i]) == null ? void 0 : o.styles,
        props: n,
        stylesCtx: r
      })[s];
    }
  ).reduce((i, o) => ({ ...i, ...o }), {});
}
function Tn({ style: t, theme: e }) {
  return Array.isArray(t) ? [...t].reduce(
    (n, r) => ({ ...n, ...Tn({ style: r, theme: e }) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function Lo(t) {
  return t.reduce((e, n) => (n && Object.keys(n).forEach((r) => {
    e[r] = { ...e[r], ...Fn(n[r]) };
  }), e), {});
}
function Do({
  vars: t,
  varsResolver: e,
  theme: n,
  props: r,
  stylesCtx: s,
  selector: i,
  themeName: o,
  headless: a
}) {
  var c;
  return (c = Lo([
    a ? {} : e == null ? void 0 : e(n, r, s),
    ...o.map((l) => {
      var u, d, p;
      return (p = (d = (u = n.components) == null ? void 0 : u[l]) == null ? void 0 : d.vars) == null ? void 0 : p.call(d, n, r, s);
    }),
    t == null ? void 0 : t(n, r, s)
  ])) == null ? void 0 : c[i];
}
function jo({
  theme: t,
  themeName: e,
  selector: n,
  options: r,
  props: s,
  stylesCtx: i,
  rootSelector: o,
  styles: a,
  style: c,
  vars: l,
  varsResolver: u,
  headless: d,
  withStylesTransform: p
}) {
  return {
    ...!p && Mo({ theme: t, themeName: e, props: s, stylesCtx: i, selector: n }),
    ...!p && Cn({ theme: t, styles: a, props: s, stylesCtx: i })[n],
    ...!p && Cn({ theme: t, styles: r == null ? void 0 : r.styles, props: (r == null ? void 0 : r.props) || s, stylesCtx: i })[n],
    ...Do({ theme: t, props: s, stylesCtx: i, vars: l, varsResolver: u, selector: n, themeName: e, headless: d }),
    ...o === n ? Tn({ style: c, theme: t }) : null,
    ...Tn({ style: r == null ? void 0 : r.style, theme: t })
  };
}
function Zo({ props: t, stylesCtx: e, themeName: n }) {
  var o;
  const r = Xe(), s = (o = ho()) == null ? void 0 : o();
  return {
    getTransformedStyles: (a) => s ? [
      ...a.map(
        (l) => s(l, { props: t, theme: r, ctx: e })
      ),
      ...n.map(
        (l) => {
          var u;
          return s((u = r.components[l]) == null ? void 0 : u.styles, { props: t, theme: r, ctx: e });
        }
      )
    ].filter(Boolean) : [],
    withStylesTransform: !!s
  };
}
function Ne({
  name: t,
  classes: e,
  props: n,
  stylesCtx: r,
  className: s,
  style: i,
  rootSelector: o = "root",
  unstyled: a,
  classNames: c,
  styles: l,
  vars: u,
  varsResolver: d
}) {
  const p = Xe(), f = lo(), h = fo(), m = po(), g = (Array.isArray(t) ? t : [t]).filter((v) => v), { withStylesTransform: y, getTransformedStyles: k } = Zo({
    props: n,
    stylesCtx: r,
    themeName: g
  });
  return (v, w) => ({
    className: Io({
      theme: p,
      options: w,
      themeName: g,
      selector: v,
      classNamesPrefix: f,
      classNames: c,
      classes: e,
      unstyled: a,
      className: s,
      rootSelector: o,
      props: n,
      stylesCtx: r,
      withStaticClasses: h,
      headless: m,
      transformedStyles: k([w == null ? void 0 : w.styles, l])
    }),
    style: jo({
      theme: p,
      themeName: g,
      selector: v,
      options: w,
      props: n,
      stylesCtx: r,
      rootSelector: o,
      styles: l,
      style: i,
      vars: u,
      varsResolver: d,
      headless: m,
      withStylesTransform: y
    })
  });
}
function ie(t, e, n) {
  var o;
  const r = Xe(), s = (o = r.components[t]) == null ? void 0 : o.defaultProps, i = typeof s == "function" ? s(r) : s;
  return { ...e, ...i, ...Fn(n) };
}
function on(t) {
  return Zn(t).reduce(
    (e, n) => t[n] !== void 0 ? `${e}${Ui(n)}:${t[n]};` : e,
    ""
  ).trim();
}
function Fo({ selector: t, styles: e, media: n, container: r }) {
  const s = e ? on(e) : "", i = Array.isArray(n) ? n.map((a) => `@media${a.query}{${t}{${on(a.styles)}}}`) : [], o = Array.isArray(r) ? r.map(
    (a) => `@container ${a.query}{${t}{${on(a.styles)}}}`
  ) : [];
  return `${s ? `${t}{${s}}` : ""}${i.join("")}${o.join("")}`.trim();
}
function zo(t) {
  const e = uo();
  return /* @__PURE__ */ M(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: e == null ? void 0 : e(),
      dangerouslySetInnerHTML: { __html: Fo(t) }
    }
  );
}
function Vo(t) {
  const {
    m: e,
    mx: n,
    my: r,
    mt: s,
    mb: i,
    ml: o,
    mr: a,
    me: c,
    ms: l,
    p: u,
    px: d,
    py: p,
    pt: f,
    pb: h,
    pl: m,
    pr: g,
    pe: y,
    ps: k,
    bd: v,
    bg: w,
    c: A,
    opacity: E,
    ff: P,
    fz: z,
    fw: $,
    lts: F,
    ta: H,
    lh: Y,
    fs: G,
    tt: B,
    td: N,
    w: D,
    miw: S,
    maw: _,
    h: C,
    mih: V,
    mah: I,
    bgsz: q,
    bgp: xe,
    bgr: $e,
    bga: Fe,
    pos: ee,
    top: oe,
    left: _e,
    bottom: ft,
    right: se,
    inset: pt,
    display: en,
    flex: Et,
    hiddenFrom: Pt,
    visibleFrom: tn,
    lightHidden: Ws,
    darkHidden: Us,
    sx: Hs,
    ...Ys
  } = t;
  return { styleProps: Fn({
    m: e,
    mx: n,
    my: r,
    mt: s,
    mb: i,
    ml: o,
    mr: a,
    me: c,
    ms: l,
    p: u,
    px: d,
    py: p,
    pt: f,
    pb: h,
    pl: m,
    pr: g,
    pe: y,
    ps: k,
    bd: v,
    bg: w,
    c: A,
    opacity: E,
    ff: P,
    fz: z,
    fw: $,
    lts: F,
    ta: H,
    lh: Y,
    fs: G,
    tt: B,
    td: N,
    w: D,
    miw: S,
    maw: _,
    h: C,
    mih: V,
    mah: I,
    bgsz: q,
    bgp: xe,
    bgr: $e,
    bga: Fe,
    pos: ee,
    top: oe,
    left: _e,
    bottom: ft,
    right: se,
    inset: pt,
    display: en,
    flex: Et,
    hiddenFrom: Pt,
    visibleFrom: tn,
    lightHidden: Ws,
    darkHidden: Us,
    sx: Hs
  }), rest: Ys };
}
const Bo = {
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
function Wn(t, e) {
  const n = Bn({ color: t, theme: e });
  return n.color === "dimmed" ? "var(--mantine-color-dimmed)" : n.color === "bright" ? "var(--mantine-color-bright)" : n.variable ? `var(${n.variable})` : n.color;
}
function Wo(t, e) {
  const n = Bn({ color: t, theme: e });
  return n.isThemeColor && n.shade === void 0 ? `var(--mantine-color-${n.color}-text)` : Wn(t, e);
}
function Uo(t, e) {
  if (typeof t == "number")
    return de(t);
  if (typeof t == "string") {
    const [n, r, ...s] = t.split(" ").filter((o) => o.trim() !== "");
    let i = `${de(n)}`;
    return r && (i += ` ${r}`), s.length > 0 && (i += ` ${Wn(s.join(" "), e)}`), i.trim();
  }
  return t;
}
const _r = {
  text: "var(--mantine-font-family)",
  mono: "var(--mantine-font-family-monospace)",
  monospace: "var(--mantine-font-family-monospace)",
  heading: "var(--mantine-font-family-headings)",
  headings: "var(--mantine-font-family-headings)"
};
function Ho(t) {
  return typeof t == "string" && t in _r ? _r[t] : t;
}
const Yo = ["h1", "h2", "h3", "h4", "h5", "h6"];
function Go(t, e) {
  return typeof t == "string" && t in e.fontSizes ? `var(--mantine-font-size-${t})` : typeof t == "string" && Yo.includes(t) ? `var(--mantine-${t}-font-size)` : typeof t == "number" || typeof t == "string" ? de(t) : t;
}
function Xo(t) {
  return t;
}
const qo = ["h1", "h2", "h3", "h4", "h5", "h6"];
function Ko(t, e) {
  return typeof t == "string" && t in e.lineHeights ? `var(--mantine-line-height-${t})` : typeof t == "string" && qo.includes(t) ? `var(--mantine-${t}-line-height)` : t;
}
function Jo(t) {
  return typeof t == "number" ? de(t) : t;
}
function Qo(t, e) {
  if (typeof t == "number")
    return de(t);
  if (typeof t == "string") {
    const n = t.replace("-", "");
    if (!(n in e.spacing))
      return de(t);
    const r = `--mantine-spacing-${n}`;
    return t.startsWith("-") ? `calc(var(${r}) * -1)` : `var(${r})`;
  }
  return t;
}
const an = {
  color: Wn,
  textColor: Wo,
  fontSize: Go,
  spacing: Qo,
  identity: Xo,
  size: Jo,
  lineHeight: Ko,
  fontFamily: Ho,
  border: Uo
};
function wr(t) {
  return t.replace("(min-width: ", "").replace("em)", "");
}
function ea({
  media: t,
  ...e
}) {
  const r = Object.keys(t).sort((s, i) => Number(wr(s)) - Number(wr(i))).map((s) => ({ query: s, styles: t[s] }));
  return { ...e, media: r };
}
function ta(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.keys(t);
  return !(e.length === 1 && e[0] === "base");
}
function na(t) {
  return typeof t == "object" && t !== null ? "base" in t ? t.base : void 0 : t;
}
function ra(t) {
  return typeof t == "object" && t !== null ? Zn(t).filter((e) => e !== "base") : [];
}
function sa(t, e) {
  return typeof t == "object" && t !== null && e in t ? t[e] : t;
}
function ia({
  styleProps: t,
  data: e,
  theme: n
}) {
  return ea(
    Zn(t).reduce(
      (r, s) => {
        if (s === "hiddenFrom" || s === "visibleFrom" || s === "sx")
          return r;
        const i = e[s], o = Array.isArray(i.property) ? i.property : [i.property], a = na(t[s]);
        if (!ta(t[s]))
          return o.forEach((l) => {
            r.inlineStyles[l] = an[i.type](a, n);
          }), r;
        r.hasResponsiveStyles = !0;
        const c = ra(t[s]);
        return o.forEach((l) => {
          a && (r.styles[l] = an[i.type](a, n)), c.forEach((u) => {
            const d = `(min-width: ${n.breakpoints[u]})`;
            r.media[d] = {
              ...r.media[d],
              [l]: an[i.type](
                sa(t[s], u),
                n
              )
            };
          });
        }), r;
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
function oa() {
  return `__m__-${Xs().replace(/:/g, "")}`;
}
function ls(t, e) {
  return Array.isArray(t) ? [...t].reduce(
    (n, r) => ({ ...n, ...ls(r, e) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function us(t) {
  return t.startsWith("data-") ? t : `data-${t}`;
}
function aa(t) {
  return Object.keys(t).reduce((e, n) => {
    const r = t[n];
    return r === void 0 || r === "" || r === !1 || r === null || (e[us(n)] = t[n]), e;
  }, {});
}
function ds(t) {
  return t ? typeof t == "string" ? { [us(t)]: !0 } : Array.isArray(t) ? [...t].reduce(
    (e, n) => ({ ...e, ...ds(n) }),
    {}
  ) : aa(t) : null;
}
function Sn(t, e) {
  return Array.isArray(t) ? [...t].reduce(
    (n, r) => ({ ...n, ...Sn(r, e) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function ca({
  theme: t,
  style: e,
  vars: n,
  styleProps: r
}) {
  const s = Sn(e, t), i = Sn(n, t);
  return { ...s, ...i, ...r };
}
const fs = et(
  ({
    component: t,
    style: e,
    __vars: n,
    className: r,
    variant: s,
    mod: i,
    size: o,
    hiddenFrom: a,
    visibleFrom: c,
    lightHidden: l,
    darkHidden: u,
    renderRoot: d,
    __size: p,
    ...f
  }, h) => {
    var z;
    const m = Xe(), g = t || "div", { styleProps: y, rest: k } = Vo(f), v = mo(), w = (z = v == null ? void 0 : v()) == null ? void 0 : z(y.sx), A = oa(), E = ia({
      styleProps: y,
      theme: m,
      data: Bo
    }), P = {
      ref: h,
      style: ca({
        theme: m,
        style: e,
        vars: n,
        styleProps: E.inlineStyles
      }),
      className: Rt(r, w, {
        [A]: E.hasResponsiveStyles,
        "mantine-light-hidden": l,
        "mantine-dark-hidden": u,
        [`mantine-hidden-from-${a}`]: a,
        [`mantine-visible-from-${c}`]: c
      }),
      "data-variant": s,
      "data-size": ts(o) ? void 0 : o || void 0,
      size: p,
      ...ds(i),
      ...k
    };
    return /* @__PURE__ */ te(We, { children: [
      E.hasResponsiveStyles && /* @__PURE__ */ M(
        zo,
        {
          selector: `.${A}`,
          styles: E.styles,
          media: E.media
        }
      ),
      typeof d == "function" ? d(P) : /* @__PURE__ */ M(g, { ...P })
    ] });
  }
);
fs.displayName = "@mantine/core/Box";
const ve = fs;
function ps(t) {
  return t;
}
function Ze(t) {
  const e = et(t);
  return e.extend = ps, e.withProps = (n) => {
    const r = et((s, i) => /* @__PURE__ */ M(e, { ...n, ...s, ref: i }));
    return r.extend = e.extend, r.displayName = `WithProps(${e.displayName})`, r;
  }, e;
}
function Ht(t) {
  const e = et(t);
  return e.withProps = (n) => {
    const r = et((s, i) => /* @__PURE__ */ M(e, { ...n, ...s, ref: i }));
    return r.extend = e.extend, r.displayName = `WithProps(${e.displayName})`, r;
  }, e.extend = ps, e;
}
const la = ct({
  dir: "ltr",
  toggleDirection: () => {
  },
  setDirection: () => {
  }
});
function ms() {
  return lt(la);
}
function Yt() {
  return typeof window < "u";
}
function ut(t) {
  return hs(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function re(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function be(t) {
  var e;
  return (e = (hs(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function hs(t) {
  return Yt() ? t instanceof Node || t instanceof re(t).Node : !1;
}
function K(t) {
  return Yt() ? t instanceof Element || t instanceof re(t).Element : !1;
}
function ue(t) {
  return Yt() ? t instanceof HTMLElement || t instanceof re(t).HTMLElement : !1;
}
function En(t) {
  return !Yt() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof re(t).ShadowRoot;
}
function Ct(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r,
    display: s
  } = ce(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + n) && s !== "inline" && s !== "contents";
}
function ua(t) {
  return /^(table|td|th)$/.test(ut(t));
}
function Gt(t) {
  try {
    if (t.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return t.matches(":modal");
  } catch {
    return !1;
  }
}
const da = /transform|translate|scale|rotate|perspective|filter/, fa = /paint|layout|strict|content/, ze = (t) => !!t && t !== "none";
let cn;
function Un(t) {
  const e = K(t) ? ce(t) : t;
  return ze(e.transform) || ze(e.translate) || ze(e.scale) || ze(e.rotate) || ze(e.perspective) || !Xt() && (ze(e.backdropFilter) || ze(e.filter)) || da.test(e.willChange || "") || fa.test(e.contain || "");
}
function pa(t) {
  let e = Pe(t);
  for (; ue(e) && !je(e); ) {
    if (Un(e))
      return e;
    if (Gt(e))
      return null;
    e = Pe(e);
  }
  return null;
}
function Xt() {
  return cn == null && (cn = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), cn;
}
function je(t) {
  return /^(html|body|#document)$/.test(ut(t));
}
function ce(t) {
  return re(t).getComputedStyle(t);
}
function qt(t) {
  return K(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function Pe(t) {
  if (ut(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    En(t) && t.host || // Fallback.
    be(t)
  );
  return En(e) ? e.host : e;
}
function gs(t) {
  const e = Pe(t);
  return je(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : ue(e) && Ct(e) ? e : gs(e);
}
function Se(t, e, n) {
  var r;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const s = gs(t), i = s === ((r = t.ownerDocument) == null ? void 0 : r.body), o = re(s);
  if (i) {
    const a = Pn(o);
    return e.concat(o, o.visualViewport || [], Ct(s) ? s : [], a && n ? Se(a) : []);
  } else
    return e.concat(s, Se(s, [], n));
}
function Pn(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function kr(t) {
  let e = t.activeElement;
  for (; ((n = e) == null || (n = n.shadowRoot) == null ? void 0 : n.activeElement) != null; ) {
    var n;
    e = e.shadowRoot.activeElement;
  }
  return e;
}
function _t(t, e) {
  if (!t || !e)
    return !1;
  const n = e.getRootNode == null ? void 0 : e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && En(n)) {
    let r = e;
    for (; r; ) {
      if (t === r)
        return !0;
      r = r.parentNode || r.host;
    }
  }
  return !1;
}
function ys() {
  const t = navigator.userAgentData;
  return t != null && t.platform ? t.platform : navigator.platform;
}
function vs() {
  const t = navigator.userAgentData;
  return t && Array.isArray(t.brands) ? t.brands.map((e) => {
    let {
      brand: n,
      version: r
    } = e;
    return n + "/" + r;
  }).join(" ") : navigator.userAgent;
}
function ma(t) {
  return ya() ? !1 : !Rr() && t.width === 0 && t.height === 0 || Rr() && t.width === 1 && t.height === 1 && t.pressure === 0 && t.detail === 0 && t.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  t.width < 1 && t.height < 1 && t.pressure === 0 && t.detail === 0 && t.pointerType === "touch";
}
function ha() {
  return /apple/i.test(navigator.vendor);
}
function Rr() {
  const t = /android/i;
  return t.test(ys()) || t.test(vs());
}
function ga() {
  return ys().toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
}
function ya() {
  return vs().includes("jsdom/");
}
function On(t, e) {
  const n = ["mouse", "pen"];
  return n.push("", void 0), n.includes(t);
}
function va(t) {
  return "nativeEvent" in t;
}
function ba(t) {
  return t.matches("html,body");
}
function Ve(t) {
  return (t == null ? void 0 : t.ownerDocument) || document;
}
function ln(t, e) {
  if (e == null)
    return !1;
  if ("composedPath" in t)
    return t.composedPath().includes(e);
  const n = t;
  return n.target != null && e.contains(n.target);
}
function Ke(t) {
  return "composedPath" in t ? t.composedPath()[0] : t.target;
}
const xa = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function _a(t) {
  return ue(t) && t.matches(xa);
}
const Oe = Math.min, pe = Math.max, zt = Math.round, Ot = Math.floor, me = (t) => ({
  x: t,
  y: t
}), wa = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function An(t, e, n) {
  return pe(t, Oe(e, n));
}
function dt(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Ae(t) {
  return t.split("-")[0];
}
function Tt(t) {
  return t.split("-")[1];
}
function bs(t) {
  return t === "x" ? "y" : "x";
}
function Hn(t) {
  return t === "y" ? "height" : "width";
}
function Re(t) {
  const e = t[0];
  return e === "t" || e === "b" ? "y" : "x";
}
function Yn(t) {
  return bs(Re(t));
}
function ka(t, e, n) {
  n === void 0 && (n = !1);
  const r = Tt(t), s = Yn(t), i = Hn(s);
  let o = s === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[i] > e.floating[i] && (o = Vt(o)), [o, Vt(o)];
}
function Ra(t) {
  const e = Vt(t);
  return [Nn(t), e, Nn(e)];
}
function Nn(t) {
  return t.includes("start") ? t.replace("start", "end") : t.replace("end", "start");
}
const Cr = ["left", "right"], Tr = ["right", "left"], Ca = ["top", "bottom"], Ta = ["bottom", "top"];
function Sa(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? Tr : Cr : e ? Cr : Tr;
    case "left":
    case "right":
      return e ? Ca : Ta;
    default:
      return [];
  }
}
function Ea(t, e, n, r) {
  const s = Tt(t);
  let i = Sa(Ae(t), n === "start", r);
  return s && (i = i.map((o) => o + "-" + s), e && (i = i.concat(i.map(Nn)))), i;
}
function Vt(t) {
  const e = Ae(t);
  return wa[e] + t.slice(e.length);
}
function Pa(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Gn(t) {
  return typeof t != "number" ? Pa(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function at(t) {
  const {
    x: e,
    y: n,
    width: r,
    height: s
  } = t;
  return {
    width: r,
    height: s,
    top: n,
    left: e,
    right: e + r,
    bottom: n + s,
    x: e,
    y: n
  };
}
function Sr(t, e, n) {
  let {
    reference: r,
    floating: s
  } = t;
  const i = Re(e), o = Yn(e), a = Hn(o), c = Ae(e), l = i === "y", u = r.x + r.width / 2 - s.width / 2, d = r.y + r.height / 2 - s.height / 2, p = r[a] / 2 - s[a] / 2;
  let f;
  switch (c) {
    case "top":
      f = {
        x: u,
        y: r.y - s.height
      };
      break;
    case "bottom":
      f = {
        x: u,
        y: r.y + r.height
      };
      break;
    case "right":
      f = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      f = {
        x: r.x - s.width,
        y: d
      };
      break;
    default:
      f = {
        x: r.x,
        y: r.y
      };
  }
  switch (Tt(e)) {
    case "start":
      f[o] -= p * (n && l ? -1 : 1);
      break;
    case "end":
      f[o] += p * (n && l ? -1 : 1);
      break;
  }
  return f;
}
async function Oa(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: r,
    y: s,
    platform: i,
    rects: o,
    elements: a,
    strategy: c
  } = t, {
    boundary: l = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: d = "floating",
    altBoundary: p = !1,
    padding: f = 0
  } = dt(e, t), h = Gn(f), g = a[p ? d === "floating" ? "reference" : "floating" : d], y = at(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(g))) == null || n ? g : g.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: u,
    strategy: c
  })), k = d === "floating" ? {
    x: r,
    y: s,
    width: o.floating.width,
    height: o.floating.height
  } : o.reference, v = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a.floating)), w = await (i.isElement == null ? void 0 : i.isElement(v)) ? await (i.getScale == null ? void 0 : i.getScale(v)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, A = at(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: k,
    offsetParent: v,
    strategy: c
  }) : k);
  return {
    top: (y.top - A.top + h.top) / w.y,
    bottom: (A.bottom - y.bottom + h.bottom) / w.y,
    left: (y.left - A.left + h.left) / w.x,
    right: (A.right - y.right + h.right) / w.x
  };
}
const Aa = 50, Na = async (t, e, n) => {
  const {
    placement: r = "bottom",
    strategy: s = "absolute",
    middleware: i = [],
    platform: o
  } = n, a = o.detectOverflow ? o : {
    ...o,
    detectOverflow: Oa
  }, c = await (o.isRTL == null ? void 0 : o.isRTL(e));
  let l = await o.getElementRects({
    reference: t,
    floating: e,
    strategy: s
  }), {
    x: u,
    y: d
  } = Sr(l, r, c), p = r, f = 0;
  const h = {};
  for (let m = 0; m < i.length; m++) {
    const g = i[m];
    if (!g)
      continue;
    const {
      name: y,
      fn: k
    } = g, {
      x: v,
      y: w,
      data: A,
      reset: E
    } = await k({
      x: u,
      y: d,
      initialPlacement: r,
      placement: p,
      strategy: s,
      middlewareData: h,
      rects: l,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    u = v ?? u, d = w ?? d, h[y] = {
      ...h[y],
      ...A
    }, E && f < Aa && (f++, typeof E == "object" && (E.placement && (p = E.placement), E.rects && (l = E.rects === !0 ? await o.getElementRects({
      reference: t,
      floating: e,
      strategy: s
    }) : E.rects), {
      x: u,
      y: d
    } = Sr(l, p, c)), m = -1);
  }
  return {
    x: u,
    y: d,
    placement: p,
    strategy: s,
    middlewareData: h
  };
}, $a = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: n,
      y: r,
      placement: s,
      rects: i,
      platform: o,
      elements: a,
      middlewareData: c
    } = e, {
      element: l,
      padding: u = 0
    } = dt(t, e) || {};
    if (l == null)
      return {};
    const d = Gn(u), p = {
      x: n,
      y: r
    }, f = Yn(s), h = Hn(f), m = await o.getDimensions(l), g = f === "y", y = g ? "top" : "left", k = g ? "bottom" : "right", v = g ? "clientHeight" : "clientWidth", w = i.reference[h] + i.reference[f] - p[f] - i.floating[h], A = p[f] - i.reference[f], E = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l));
    let P = E ? E[v] : 0;
    (!P || !await (o.isElement == null ? void 0 : o.isElement(E))) && (P = a.floating[v] || i.floating[h]);
    const z = w / 2 - A / 2, $ = P / 2 - m[h] / 2 - 1, F = Oe(d[y], $), H = Oe(d[k], $), Y = F, G = P - m[h] - H, B = P / 2 - m[h] / 2 + z, N = An(Y, B, G), D = !c.arrow && Tt(s) != null && B !== N && i.reference[h] / 2 - (B < Y ? F : H) - m[h] / 2 < 0, S = D ? B < Y ? B - Y : B - G : 0;
    return {
      [f]: p[f] + S,
      data: {
        [f]: N,
        centerOffset: B - N - S,
        ...D && {
          alignmentOffset: S
        }
      },
      reset: D
    };
  }
}), Ia = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, r;
      const {
        placement: s,
        middlewareData: i,
        rects: o,
        initialPlacement: a,
        platform: c,
        elements: l
      } = e, {
        mainAxis: u = !0,
        crossAxis: d = !0,
        fallbackPlacements: p,
        fallbackStrategy: f = "bestFit",
        fallbackAxisSideDirection: h = "none",
        flipAlignment: m = !0,
        ...g
      } = dt(t, e);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const y = Ae(s), k = Re(a), v = Ae(a) === a, w = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), A = p || (v || !m ? [Vt(a)] : Ra(a)), E = h !== "none";
      !p && E && A.push(...Ea(a, m, h, w));
      const P = [a, ...A], z = await c.detectOverflow(e, g), $ = [];
      let F = ((r = i.flip) == null ? void 0 : r.overflows) || [];
      if (u && $.push(z[y]), d) {
        const B = ka(s, o, w);
        $.push(z[B[0]], z[B[1]]);
      }
      if (F = [...F, {
        placement: s,
        overflows: $
      }], !$.every((B) => B <= 0)) {
        var H, Y;
        const B = (((H = i.flip) == null ? void 0 : H.index) || 0) + 1, N = P[B];
        if (N && (!(d === "alignment" ? k !== Re(N) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        F.every((_) => Re(_.placement) === k ? _.overflows[0] > 0 : !0)))
          return {
            data: {
              index: B,
              overflows: F
            },
            reset: {
              placement: N
            }
          };
        let D = (Y = F.filter((S) => S.overflows[0] <= 0).sort((S, _) => S.overflows[1] - _.overflows[1])[0]) == null ? void 0 : Y.placement;
        if (!D)
          switch (f) {
            case "bestFit": {
              var G;
              const S = (G = F.filter((_) => {
                if (E) {
                  const C = Re(_.placement);
                  return C === k || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  C === "y";
                }
                return !0;
              }).map((_) => [_.placement, _.overflows.filter((C) => C > 0).reduce((C, V) => C + V, 0)]).sort((_, C) => _[1] - C[1])[0]) == null ? void 0 : G[0];
              S && (D = S);
              break;
            }
            case "initialPlacement":
              D = a;
              break;
          }
        if (s !== D)
          return {
            reset: {
              placement: D
            }
          };
      }
      return {};
    }
  };
};
function xs(t) {
  const e = Oe(...t.map((i) => i.left)), n = Oe(...t.map((i) => i.top)), r = pe(...t.map((i) => i.right)), s = pe(...t.map((i) => i.bottom));
  return {
    x: e,
    y: n,
    width: r - e,
    height: s - n
  };
}
function Ma(t) {
  const e = t.slice().sort((s, i) => s.y - i.y), n = [];
  let r = null;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    !r || i.y - r.y > r.height / 2 ? n.push([i]) : n[n.length - 1].push(i), r = i;
  }
  return n.map((s) => at(xs(s)));
}
const La = function(t) {
  return t === void 0 && (t = {}), {
    name: "inline",
    options: t,
    async fn(e) {
      const {
        placement: n,
        elements: r,
        rects: s,
        platform: i,
        strategy: o
      } = e, {
        padding: a = 2,
        x: c,
        y: l
      } = dt(t, e), u = Array.from(await (i.getClientRects == null ? void 0 : i.getClientRects(r.reference)) || []), d = Ma(u), p = at(xs(u)), f = Gn(a);
      function h() {
        if (d.length === 2 && d[0].left > d[1].right && c != null && l != null)
          return d.find((g) => c > g.left - f.left && c < g.right + f.right && l > g.top - f.top && l < g.bottom + f.bottom) || p;
        if (d.length >= 2) {
          if (Re(n) === "y") {
            const F = d[0], H = d[d.length - 1], Y = Ae(n) === "top", G = F.top, B = H.bottom, N = Y ? F.left : H.left, D = Y ? F.right : H.right, S = D - N, _ = B - G;
            return {
              top: G,
              bottom: B,
              left: N,
              right: D,
              width: S,
              height: _,
              x: N,
              y: G
            };
          }
          const g = Ae(n) === "left", y = pe(...d.map((F) => F.right)), k = Oe(...d.map((F) => F.left)), v = d.filter((F) => g ? F.left === k : F.right === y), w = v[0].top, A = v[v.length - 1].bottom, E = k, P = y, z = P - E, $ = A - w;
          return {
            top: w,
            bottom: A,
            left: E,
            right: P,
            width: z,
            height: $,
            x: E,
            y: w
          };
        }
        return p;
      }
      const m = await i.getElementRects({
        reference: {
          getBoundingClientRect: h
        },
        floating: r.floating,
        strategy: o
      });
      return s.reference.x !== m.reference.x || s.reference.y !== m.reference.y || s.reference.width !== m.reference.width || s.reference.height !== m.reference.height ? {
        reset: {
          rects: m
        }
      } : {};
    }
  };
}, Da = /* @__PURE__ */ new Set(["left", "top"]);
async function ja(t, e) {
  const {
    placement: n,
    platform: r,
    elements: s
  } = t, i = await (r.isRTL == null ? void 0 : r.isRTL(s.floating)), o = Ae(n), a = Tt(n), c = Re(n) === "y", l = Da.has(o) ? -1 : 1, u = i && c ? -1 : 1, d = dt(e, t);
  let {
    mainAxis: p,
    crossAxis: f,
    alignmentAxis: h
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return a && typeof h == "number" && (f = a === "end" ? h * -1 : h), c ? {
    x: f * u,
    y: p * l
  } : {
    x: p * l,
    y: f * u
  };
}
const Za = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, r;
      const {
        x: s,
        y: i,
        placement: o,
        middlewareData: a
      } = e, c = await ja(e, t);
      return o === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : {
        x: s + c.x,
        y: i + c.y,
        data: {
          ...c,
          placement: o
        }
      };
    }
  };
}, Fa = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r,
        placement: s,
        platform: i
      } = e, {
        mainAxis: o = !0,
        crossAxis: a = !1,
        limiter: c = {
          fn: (y) => {
            let {
              x: k,
              y: v
            } = y;
            return {
              x: k,
              y: v
            };
          }
        },
        ...l
      } = dt(t, e), u = {
        x: n,
        y: r
      }, d = await i.detectOverflow(e, l), p = Re(Ae(s)), f = bs(p);
      let h = u[f], m = u[p];
      if (o) {
        const y = f === "y" ? "top" : "left", k = f === "y" ? "bottom" : "right", v = h + d[y], w = h - d[k];
        h = An(v, h, w);
      }
      if (a) {
        const y = p === "y" ? "top" : "left", k = p === "y" ? "bottom" : "right", v = m + d[y], w = m - d[k];
        m = An(v, m, w);
      }
      const g = c.fn({
        ...e,
        [f]: h,
        [p]: m
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [f]: o,
            [p]: a
          }
        }
      };
    }
  };
};
function _s(t) {
  const e = ce(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const s = ue(t), i = s ? t.offsetWidth : n, o = s ? t.offsetHeight : r, a = zt(n) !== i || zt(r) !== o;
  return a && (n = i, r = o), {
    width: n,
    height: r,
    $: a
  };
}
function Xn(t) {
  return K(t) ? t : t.contextElement;
}
function Je(t) {
  const e = Xn(t);
  if (!ue(e))
    return me(1);
  const n = e.getBoundingClientRect(), {
    width: r,
    height: s,
    $: i
  } = _s(e);
  let o = (i ? zt(n.width) : n.width) / r, a = (i ? zt(n.height) : n.height) / s;
  return (!o || !Number.isFinite(o)) && (o = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: o,
    y: a
  };
}
const za = /* @__PURE__ */ me(0);
function ws(t) {
  const e = re(t);
  return !Xt() || !e.visualViewport ? za : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Va(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== re(t) ? !1 : e;
}
function Ye(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const s = t.getBoundingClientRect(), i = Xn(t);
  let o = me(1);
  e && (r ? K(r) && (o = Je(r)) : o = Je(t));
  const a = Va(i, n, r) ? ws(i) : me(0);
  let c = (s.left + a.x) / o.x, l = (s.top + a.y) / o.y, u = s.width / o.x, d = s.height / o.y;
  if (i) {
    const p = re(i), f = r && K(r) ? re(r) : r;
    let h = p, m = Pn(h);
    for (; m && r && f !== h; ) {
      const g = Je(m), y = m.getBoundingClientRect(), k = ce(m), v = y.left + (m.clientLeft + parseFloat(k.paddingLeft)) * g.x, w = y.top + (m.clientTop + parseFloat(k.paddingTop)) * g.y;
      c *= g.x, l *= g.y, u *= g.x, d *= g.y, c += v, l += w, h = re(m), m = Pn(h);
    }
  }
  return at({
    width: u,
    height: d,
    x: c,
    y: l
  });
}
function Kt(t, e) {
  const n = qt(t).scrollLeft;
  return e ? e.left + n : Ye(be(t)).left + n;
}
function ks(t, e) {
  const n = t.getBoundingClientRect(), r = n.left + e.scrollLeft - Kt(t, n), s = n.top + e.scrollTop;
  return {
    x: r,
    y: s
  };
}
function Ba(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: r,
    strategy: s
  } = t;
  const i = s === "fixed", o = be(r), a = e ? Gt(e.floating) : !1;
  if (r === o || a && i)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = me(1);
  const u = me(0), d = ue(r);
  if ((d || !d && !i) && ((ut(r) !== "body" || Ct(o)) && (c = qt(r)), d)) {
    const f = Ye(r);
    l = Je(r), u.x = f.x + r.clientLeft, u.y = f.y + r.clientTop;
  }
  const p = o && !d && !i ? ks(o, c) : me(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + p.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + p.y
  };
}
function Wa(t) {
  return Array.from(t.getClientRects());
}
function Ua(t) {
  const e = be(t), n = qt(t), r = t.ownerDocument.body, s = pe(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), i = pe(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -n.scrollLeft + Kt(t);
  const a = -n.scrollTop;
  return ce(r).direction === "rtl" && (o += pe(e.clientWidth, r.clientWidth) - s), {
    width: s,
    height: i,
    x: o,
    y: a
  };
}
const Er = 25;
function Ha(t, e) {
  const n = re(t), r = be(t), s = n.visualViewport;
  let i = r.clientWidth, o = r.clientHeight, a = 0, c = 0;
  if (s) {
    i = s.width, o = s.height;
    const u = Xt();
    (!u || u && e === "fixed") && (a = s.offsetLeft, c = s.offsetTop);
  }
  const l = Kt(r);
  if (l <= 0) {
    const u = r.ownerDocument, d = u.body, p = getComputedStyle(d), f = u.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight) || 0, h = Math.abs(r.clientWidth - d.clientWidth - f);
    h <= Er && (i -= h);
  } else l <= Er && (i += l);
  return {
    width: i,
    height: o,
    x: a,
    y: c
  };
}
function Ya(t, e) {
  const n = Ye(t, !0, e === "fixed"), r = n.top + t.clientTop, s = n.left + t.clientLeft, i = ue(t) ? Je(t) : me(1), o = t.clientWidth * i.x, a = t.clientHeight * i.y, c = s * i.x, l = r * i.y;
  return {
    width: o,
    height: a,
    x: c,
    y: l
  };
}
function Pr(t, e, n) {
  let r;
  if (e === "viewport")
    r = Ha(t, n);
  else if (e === "document")
    r = Ua(be(t));
  else if (K(e))
    r = Ya(e, n);
  else {
    const s = ws(t);
    r = {
      x: e.x - s.x,
      y: e.y - s.y,
      width: e.width,
      height: e.height
    };
  }
  return at(r);
}
function Rs(t, e) {
  const n = Pe(t);
  return n === e || !K(n) || je(n) ? !1 : ce(n).position === "fixed" || Rs(n, e);
}
function Ga(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let r = Se(t, [], !1).filter((a) => K(a) && ut(a) !== "body"), s = null;
  const i = ce(t).position === "fixed";
  let o = i ? Pe(t) : t;
  for (; K(o) && !je(o); ) {
    const a = ce(o), c = Un(o);
    !c && a.position === "fixed" && (s = null), (i ? !c && !s : !c && a.position === "static" && !!s && (s.position === "absolute" || s.position === "fixed") || Ct(o) && !c && Rs(t, o)) ? r = r.filter((u) => u !== o) : s = a, o = Pe(o);
  }
  return e.set(t, r), r;
}
function Xa(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: s
  } = t;
  const o = [...n === "clippingAncestors" ? Gt(e) ? [] : Ga(e, this._c) : [].concat(n), r], a = Pr(e, o[0], s);
  let c = a.top, l = a.right, u = a.bottom, d = a.left;
  for (let p = 1; p < o.length; p++) {
    const f = Pr(e, o[p], s);
    c = pe(f.top, c), l = Oe(f.right, l), u = Oe(f.bottom, u), d = pe(f.left, d);
  }
  return {
    width: l - d,
    height: u - c,
    x: d,
    y: c
  };
}
function qa(t) {
  const {
    width: e,
    height: n
  } = _s(t);
  return {
    width: e,
    height: n
  };
}
function Ka(t, e, n) {
  const r = ue(e), s = be(e), i = n === "fixed", o = Ye(t, !0, i, e);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = me(0);
  function l() {
    c.x = Kt(s);
  }
  if (r || !r && !i)
    if ((ut(e) !== "body" || Ct(s)) && (a = qt(e)), r) {
      const f = Ye(e, !0, i, e);
      c.x = f.x + e.clientLeft, c.y = f.y + e.clientTop;
    } else s && l();
  i && !r && s && l();
  const u = s && !r && !i ? ks(s, a) : me(0), d = o.left + a.scrollLeft - c.x - u.x, p = o.top + a.scrollTop - c.y - u.y;
  return {
    x: d,
    y: p,
    width: o.width,
    height: o.height
  };
}
function un(t) {
  return ce(t).position === "static";
}
function Or(t, e) {
  if (!ue(t) || ce(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return be(t) === n && (n = n.ownerDocument.body), n;
}
function Cs(t, e) {
  const n = re(t);
  if (Gt(t))
    return n;
  if (!ue(t)) {
    let s = Pe(t);
    for (; s && !je(s); ) {
      if (K(s) && !un(s))
        return s;
      s = Pe(s);
    }
    return n;
  }
  let r = Or(t, e);
  for (; r && ua(r) && un(r); )
    r = Or(r, e);
  return r && je(r) && un(r) && !Un(r) ? n : r || pa(t) || n;
}
const Ja = async function(t) {
  const e = this.getOffsetParent || Cs, n = this.getDimensions, r = await n(t.floating);
  return {
    reference: Ka(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Qa(t) {
  return ce(t).direction === "rtl";
}
const ec = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ba,
  getDocumentElement: be,
  getClippingRect: Xa,
  getOffsetParent: Cs,
  getElementRects: Ja,
  getClientRects: Wa,
  getDimensions: qa,
  getScale: Je,
  isElement: K,
  isRTL: Qa
};
function Ts(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function tc(t, e) {
  let n = null, r;
  const s = be(t);
  function i() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function o(a, c) {
    a === void 0 && (a = !1), c === void 0 && (c = 1), i();
    const l = t.getBoundingClientRect(), {
      left: u,
      top: d,
      width: p,
      height: f
    } = l;
    if (a || e(), !p || !f)
      return;
    const h = Ot(d), m = Ot(s.clientWidth - (u + p)), g = Ot(s.clientHeight - (d + f)), y = Ot(u), v = {
      rootMargin: -h + "px " + -m + "px " + -g + "px " + -y + "px",
      threshold: pe(0, Oe(1, c)) || 1
    };
    let w = !0;
    function A(E) {
      const P = E[0].intersectionRatio;
      if (P !== c) {
        if (!w)
          return o();
        P ? o(!1, P) : r = setTimeout(() => {
          o(!1, 1e-7);
        }, 1e3);
      }
      P === 1 && !Ts(l, t.getBoundingClientRect()) && o(), w = !1;
    }
    try {
      n = new IntersectionObserver(A, {
        ...v,
        // Handle <iframe>s
        root: s.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(A, v);
    }
    n.observe(t);
  }
  return o(!0), i;
}
function nc(t, e, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: s = !0,
    ancestorResize: i = !0,
    elementResize: o = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = Xn(t), u = s || i ? [...l ? Se(l) : [], ...e ? Se(e) : []] : [];
  u.forEach((y) => {
    s && y.addEventListener("scroll", n, {
      passive: !0
    }), i && y.addEventListener("resize", n);
  });
  const d = l && a ? tc(l, n) : null;
  let p = -1, f = null;
  o && (f = new ResizeObserver((y) => {
    let [k] = y;
    k && k.target === l && f && e && (f.unobserve(e), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var v;
      (v = f) == null || v.observe(e);
    })), n();
  }), l && !c && f.observe(l), e && f.observe(e));
  let h, m = c ? Ye(t) : null;
  c && g();
  function g() {
    const y = Ye(t);
    m && !Ts(m, y) && n(), m = y, h = requestAnimationFrame(g);
  }
  return n(), () => {
    var y;
    u.forEach((k) => {
      s && k.removeEventListener("scroll", n), i && k.removeEventListener("resize", n);
    }), d == null || d(), (y = f) == null || y.disconnect(), f = null, c && cancelAnimationFrame(h);
  };
}
const rc = Za, sc = Fa, ic = Ia, Ar = $a, oc = La, ac = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), s = {
    platform: ec,
    ...n
  }, i = {
    ...s.platform,
    _c: r
  };
  return Na(t, e, {
    ...s,
    platform: i
  });
};
var cc = typeof document < "u", lc = function() {
}, Nt = cc ? Mn : lc;
function Bt(t, e) {
  if (t === e)
    return !0;
  if (typeof t != typeof e)
    return !1;
  if (typeof t == "function" && t.toString() === e.toString())
    return !0;
  let n, r, s;
  if (t && e && typeof t == "object") {
    if (Array.isArray(t)) {
      if (n = t.length, n !== e.length) return !1;
      for (r = n; r-- !== 0; )
        if (!Bt(t[r], e[r]))
          return !1;
      return !0;
    }
    if (s = Object.keys(t), n = s.length, n !== Object.keys(e).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(e, s[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const i = s[r];
      if (!(i === "_owner" && t.$$typeof) && !Bt(t[i], e[i]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}
function Ss(t) {
  return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Nr(t, e) {
  const n = Ss(t);
  return Math.round(e * n) / n;
}
function dn(t) {
  const e = x.useRef(t);
  return Nt(() => {
    e.current = t;
  }), e;
}
function uc(t) {
  t === void 0 && (t = {});
  const {
    placement: e = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: s,
    elements: {
      reference: i,
      floating: o
    } = {},
    transform: a = !0,
    whileElementsMounted: c,
    open: l
  } = t, [u, d] = x.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: e,
    middlewareData: {},
    isPositioned: !1
  }), [p, f] = x.useState(r);
  Bt(p, r) || f(r);
  const [h, m] = x.useState(null), [g, y] = x.useState(null), k = x.useCallback((_) => {
    _ !== E.current && (E.current = _, m(_));
  }, []), v = x.useCallback((_) => {
    _ !== P.current && (P.current = _, y(_));
  }, []), w = i || h, A = o || g, E = x.useRef(null), P = x.useRef(null), z = x.useRef(u), $ = c != null, F = dn(c), H = dn(s), Y = dn(l), G = x.useCallback(() => {
    if (!E.current || !P.current)
      return;
    const _ = {
      placement: e,
      strategy: n,
      middleware: p
    };
    H.current && (_.platform = H.current), ac(E.current, P.current, _).then((C) => {
      const V = {
        ...C,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: Y.current !== !1
      };
      B.current && !Bt(z.current, V) && (z.current = V, Ks.flushSync(() => {
        d(V);
      }));
    });
  }, [p, e, n, H, Y]);
  Nt(() => {
    l === !1 && z.current.isPositioned && (z.current.isPositioned = !1, d((_) => ({
      ..._,
      isPositioned: !1
    })));
  }, [l]);
  const B = x.useRef(!1);
  Nt(() => (B.current = !0, () => {
    B.current = !1;
  }), []), Nt(() => {
    if (w && (E.current = w), A && (P.current = A), w && A) {
      if (F.current)
        return F.current(w, A, G);
      G();
    }
  }, [w, A, G, F, $]);
  const N = x.useMemo(() => ({
    reference: E,
    floating: P,
    setReference: k,
    setFloating: v
  }), [k, v]), D = x.useMemo(() => ({
    reference: w,
    floating: A
  }), [w, A]), S = x.useMemo(() => {
    const _ = {
      position: n,
      left: 0,
      top: 0
    };
    if (!D.floating)
      return _;
    const C = Nr(D.floating, u.x), V = Nr(D.floating, u.y);
    return a ? {
      ..._,
      transform: "translate(" + C + "px, " + V + "px)",
      ...Ss(D.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: C,
      top: V
    };
  }, [n, a, D.floating, u.x, u.y]);
  return x.useMemo(() => ({
    ...u,
    update: G,
    refs: N,
    elements: D,
    floatingStyles: S
  }), [u, G, N, D, S]);
}
const dc = (t) => {
  function e(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: t,
    fn(n) {
      const {
        element: r,
        padding: s
      } = typeof t == "function" ? t(n) : t;
      return r && e(r) ? r.current != null ? Ar({
        element: r.current,
        padding: s
      }).fn(n) : {} : r ? Ar({
        element: r,
        padding: s
      }).fn(n) : {};
    }
  };
}, fc = (t, e) => {
  const n = rc(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Es = (t, e) => {
  const n = sc(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, $r = (t, e) => {
  const n = ic(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, fn = (t, e) => {
  const n = oc(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, pc = (t, e) => {
  const n = dc(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Ps = {
  ...x
}, mc = Ps.useInsertionEffect, hc = mc || ((t) => t());
function we(t) {
  const e = x.useRef(() => {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Cannot call an event handler while rendering.");
  });
  return hc(() => {
    e.current = t;
  }), x.useCallback(function() {
    for (var n = arguments.length, r = new Array(n), s = 0; s < n; s++)
      r[s] = arguments[s];
    return e.current == null ? void 0 : e.current(...r);
  }, []);
}
var he = typeof document < "u" ? Mn : ge;
let Ir = !1, gc = 0;
const Mr = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + gc++
);
function yc() {
  const [t, e] = x.useState(() => Ir ? Mr() : void 0);
  return he(() => {
    t == null && e(Mr());
  }, []), x.useEffect(() => {
    Ir = !0;
  }, []), t;
}
const vc = Ps.useId, Os = vc || yc;
let $n;
process.env.NODE_ENV !== "production" && ($n = /* @__PURE__ */ new Set());
function bc() {
  for (var t, e = arguments.length, n = new Array(e), r = 0; r < e; r++)
    n[r] = arguments[r];
  const s = "Floating UI: " + n.join(" ");
  if (!((t = $n) != null && t.has(s))) {
    var i;
    (i = $n) == null || i.add(s), console.error(s);
  }
}
function xc() {
  const t = /* @__PURE__ */ new Map();
  return {
    emit(e, n) {
      var r;
      (r = t.get(e)) == null || r.forEach((s) => s(n));
    },
    on(e, n) {
      t.set(e, [...t.get(e) || [], n]);
    },
    off(e, n) {
      var r;
      t.set(e, ((r = t.get(e)) == null ? void 0 : r.filter((s) => s !== n)) || []);
    }
  };
}
const _c = /* @__PURE__ */ x.createContext(null), wc = /* @__PURE__ */ x.createContext(null), qn = () => {
  var t;
  return ((t = x.useContext(_c)) == null ? void 0 : t.id) || null;
}, Kn = () => x.useContext(wc);
function Jn(t) {
  return "data-floating-ui-" + t;
}
function pn(t) {
  const e = Te(t);
  return he(() => {
    e.current = t;
  }), e;
}
const Lr = /* @__PURE__ */ Jn("safe-polygon");
function $t(t, e, n) {
  return n && !On(n) ? 0 : typeof t == "number" ? t : t == null ? void 0 : t[e];
}
function kc(t, e) {
  e === void 0 && (e = {});
  const {
    open: n,
    onOpenChange: r,
    dataRef: s,
    events: i,
    elements: o
  } = t, {
    enabled: a = !0,
    delay: c = 0,
    handleClose: l = null,
    mouseOnly: u = !1,
    restMs: d = 0,
    move: p = !0
  } = e, f = Kn(), h = qn(), m = pn(l), g = pn(c), y = pn(n), k = x.useRef(), v = x.useRef(-1), w = x.useRef(), A = x.useRef(-1), E = x.useRef(!0), P = x.useRef(!1), z = x.useRef(() => {
  }), $ = x.useRef(!1), F = x.useCallback(() => {
    var S;
    const _ = (S = s.current.openEvent) == null ? void 0 : S.type;
    return (_ == null ? void 0 : _.includes("mouse")) && _ !== "mousedown";
  }, [s]);
  x.useEffect(() => {
    if (!a) return;
    function S(_) {
      let {
        open: C
      } = _;
      C || (clearTimeout(v.current), clearTimeout(A.current), E.current = !0, $.current = !1);
    }
    return i.on("openchange", S), () => {
      i.off("openchange", S);
    };
  }, [a, i]), x.useEffect(() => {
    if (!a || !m.current || !n) return;
    function S(C) {
      F() && r(!1, C, "hover");
    }
    const _ = Ve(o.floating).documentElement;
    return _.addEventListener("mouseleave", S), () => {
      _.removeEventListener("mouseleave", S);
    };
  }, [o.floating, n, r, a, m, F]);
  const H = x.useCallback(function(S, _, C) {
    _ === void 0 && (_ = !0), C === void 0 && (C = "hover");
    const V = $t(g.current, "close", k.current);
    V && !w.current ? (clearTimeout(v.current), v.current = window.setTimeout(() => r(!1, S, C), V)) : _ && (clearTimeout(v.current), r(!1, S, C));
  }, [g, r]), Y = we(() => {
    z.current(), w.current = void 0;
  }), G = we(() => {
    if (P.current) {
      const S = Ve(o.floating).body;
      S.style.pointerEvents = "", S.removeAttribute(Lr), P.current = !1;
    }
  }), B = we(() => s.current.openEvent ? ["click", "mousedown"].includes(s.current.openEvent.type) : !1);
  x.useEffect(() => {
    if (!a) return;
    function S(I) {
      if (clearTimeout(v.current), E.current = !1, u && !On(k.current) || d > 0 && !$t(g.current, "open"))
        return;
      const q = $t(g.current, "open", k.current);
      q ? v.current = window.setTimeout(() => {
        y.current || r(!0, I, "hover");
      }, q) : n || r(!0, I, "hover");
    }
    function _(I) {
      if (B()) return;
      z.current();
      const q = Ve(o.floating);
      if (clearTimeout(A.current), $.current = !1, m.current && s.current.floatingContext) {
        n || clearTimeout(v.current), w.current = m.current({
          ...s.current.floatingContext,
          tree: f,
          x: I.clientX,
          y: I.clientY,
          onClose() {
            G(), Y(), B() || H(I, !0, "safe-polygon");
          }
        });
        const $e = w.current;
        q.addEventListener("mousemove", $e), z.current = () => {
          q.removeEventListener("mousemove", $e);
        };
        return;
      }
      (k.current === "touch" ? !_t(o.floating, I.relatedTarget) : !0) && H(I);
    }
    function C(I) {
      B() || s.current.floatingContext && (m.current == null || m.current({
        ...s.current.floatingContext,
        tree: f,
        x: I.clientX,
        y: I.clientY,
        onClose() {
          G(), Y(), B() || H(I);
        }
      })(I));
    }
    if (K(o.domReference)) {
      var V;
      const I = o.domReference;
      return n && I.addEventListener("mouseleave", C), (V = o.floating) == null || V.addEventListener("mouseleave", C), p && I.addEventListener("mousemove", S, {
        once: !0
      }), I.addEventListener("mouseenter", S), I.addEventListener("mouseleave", _), () => {
        var q;
        n && I.removeEventListener("mouseleave", C), (q = o.floating) == null || q.removeEventListener("mouseleave", C), p && I.removeEventListener("mousemove", S), I.removeEventListener("mouseenter", S), I.removeEventListener("mouseleave", _);
      };
    }
  }, [o, a, t, u, d, p, H, Y, G, r, n, y, f, g, m, s, B]), he(() => {
    var S;
    if (a && n && (S = m.current) != null && S.__options.blockPointerEvents && F()) {
      P.current = !0;
      const C = o.floating;
      if (K(o.domReference) && C) {
        var _;
        const V = Ve(o.floating).body;
        V.setAttribute(Lr, "");
        const I = o.domReference, q = f == null || (_ = f.nodesRef.current.find((xe) => xe.id === h)) == null || (_ = _.context) == null ? void 0 : _.elements.floating;
        return q && (q.style.pointerEvents = ""), V.style.pointerEvents = "none", I.style.pointerEvents = "auto", C.style.pointerEvents = "auto", () => {
          V.style.pointerEvents = "", I.style.pointerEvents = "", C.style.pointerEvents = "";
        };
      }
    }
  }, [a, n, h, o, f, m, F]), he(() => {
    n || (k.current = void 0, $.current = !1, Y(), G());
  }, [n, Y, G]), x.useEffect(() => () => {
    Y(), clearTimeout(v.current), clearTimeout(A.current), G();
  }, [a, o.domReference, Y, G]);
  const N = x.useMemo(() => {
    function S(_) {
      k.current = _.pointerType;
    }
    return {
      onPointerDown: S,
      onPointerEnter: S,
      onMouseMove(_) {
        const {
          nativeEvent: C
        } = _;
        function V() {
          !E.current && !y.current && r(!0, C, "hover");
        }
        u && !On(k.current) || n || d === 0 || $.current && _.movementX ** 2 + _.movementY ** 2 < 2 || (clearTimeout(A.current), k.current === "touch" ? V() : ($.current = !0, A.current = window.setTimeout(V, d)));
      }
    };
  }, [u, r, n, y, d]), D = x.useMemo(() => ({
    onMouseEnter() {
      clearTimeout(v.current);
    },
    onMouseLeave(S) {
      B() || H(S.nativeEvent, !1);
    }
  }), [H, B]);
  return x.useMemo(() => a ? {
    reference: N,
    floating: D
  } : {}, [a, N, D]);
}
const In = () => {
}, As = /* @__PURE__ */ x.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: In,
  setState: In,
  isInstantPhase: !1
}), Rc = () => x.useContext(As);
function Cc(t) {
  const {
    children: e,
    delay: n,
    timeoutMs: r = 0
  } = t, [s, i] = x.useReducer((c, l) => ({
    ...c,
    ...l
  }), {
    delay: n,
    timeoutMs: r,
    initialDelay: n,
    currentId: null,
    isInstantPhase: !1
  }), o = x.useRef(null), a = x.useCallback((c) => {
    i({
      currentId: c
    });
  }, []);
  return he(() => {
    s.currentId ? o.current === null ? o.current = s.currentId : s.isInstantPhase || i({
      isInstantPhase: !0
    }) : (s.isInstantPhase && i({
      isInstantPhase: !1
    }), o.current = null);
  }, [s.currentId, s.isInstantPhase]), /* @__PURE__ */ x.createElement(As.Provider, {
    value: x.useMemo(() => ({
      ...s,
      setState: i,
      setCurrentId: a
    }), [s, a])
  }, e);
}
function Tc(t, e) {
  e === void 0 && (e = {});
  const {
    open: n,
    onOpenChange: r,
    floatingId: s
  } = t, {
    id: i,
    enabled: o = !0
  } = e, a = i ?? s, c = Rc(), {
    currentId: l,
    setCurrentId: u,
    initialDelay: d,
    setState: p,
    timeoutMs: f
  } = c;
  return he(() => {
    o && l && (p({
      delay: {
        open: 1,
        close: $t(d, "close")
      }
    }), l !== a && r(!1));
  }, [o, a, r, p, l, d]), he(() => {
    function h() {
      r(!1), p({
        delay: d,
        currentId: null
      });
    }
    if (o && l && !n && l === a) {
      if (f) {
        const m = window.setTimeout(h, f);
        return () => {
          clearTimeout(m);
        };
      }
      h();
    }
  }, [o, n, p, l, a, r, d, f]), he(() => {
    o && (u === In || !n || u(a));
  }, [o, n, u, a]), c;
}
function mn(t, e) {
  let n = t.filter((s) => {
    var i;
    return s.parentId === e && ((i = s.context) == null ? void 0 : i.open);
  }), r = n;
  for (; r.length; )
    r = t.filter((s) => {
      var i;
      return (i = r) == null ? void 0 : i.some((o) => {
        var a;
        return s.parentId === o.id && ((a = s.context) == null ? void 0 : a.open);
      });
    }), n = n.concat(r);
  return n;
}
const Sc = "data-floating-ui-focusable", Ec = {
  pointerdown: "onPointerDown",
  mousedown: "onMouseDown",
  click: "onClick"
}, Pc = {
  pointerdown: "onPointerDownCapture",
  mousedown: "onMouseDownCapture",
  click: "onClickCapture"
}, Dr = (t) => {
  var e, n;
  return {
    escapeKey: typeof t == "boolean" ? t : (e = t == null ? void 0 : t.escapeKey) != null ? e : !1,
    outsidePress: typeof t == "boolean" ? t : (n = t == null ? void 0 : t.outsidePress) != null ? n : !0
  };
};
function Oc(t, e) {
  e === void 0 && (e = {});
  const {
    open: n,
    onOpenChange: r,
    elements: s,
    dataRef: i
  } = t, {
    enabled: o = !0,
    escapeKey: a = !0,
    outsidePress: c = !0,
    outsidePressEvent: l = "pointerdown",
    referencePress: u = !1,
    referencePressEvent: d = "pointerdown",
    ancestorScroll: p = !1,
    bubbles: f,
    capture: h
  } = e, m = Kn(), g = we(typeof c == "function" ? c : () => !1), y = typeof c == "function" ? g : c, k = x.useRef(!1), v = x.useRef(!1), {
    escapeKey: w,
    outsidePress: A
  } = Dr(f), {
    escapeKey: E,
    outsidePress: P
  } = Dr(h), z = x.useRef(!1), $ = we((N) => {
    var D;
    if (!n || !o || !a || N.key !== "Escape" || z.current)
      return;
    const S = (D = i.current.floatingContext) == null ? void 0 : D.nodeId, _ = m ? mn(m.nodesRef.current, S) : [];
    if (!w && (N.stopPropagation(), _.length > 0)) {
      let C = !0;
      if (_.forEach((V) => {
        var I;
        if ((I = V.context) != null && I.open && !V.context.dataRef.current.__escapeKeyBubbles) {
          C = !1;
          return;
        }
      }), !C)
        return;
    }
    r(!1, va(N) ? N.nativeEvent : N, "escape-key");
  }), F = we((N) => {
    var D;
    const S = () => {
      var _;
      $(N), (_ = Ke(N)) == null || _.removeEventListener("keydown", S);
    };
    (D = Ke(N)) == null || D.addEventListener("keydown", S);
  }), H = we((N) => {
    var D;
    const S = k.current;
    k.current = !1;
    const _ = v.current;
    if (v.current = !1, l === "click" && _ || S || typeof y == "function" && !y(N))
      return;
    const C = Ke(N), V = "[" + Jn("inert") + "]", I = Ve(s.floating).querySelectorAll(V);
    let q = K(C) ? C : null;
    for (; q && !je(q); ) {
      const ee = Pe(q);
      if (je(ee) || !K(ee))
        break;
      q = ee;
    }
    if (I.length && K(C) && !ba(C) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
    !_t(C, s.floating) && // If the target root element contains none of the markers, then the
    // element was injected after the floating element rendered.
    Array.from(I).every((ee) => !_t(q, ee)))
      return;
    if (ue(C) && B) {
      const ee = C.clientWidth > 0 && C.scrollWidth > C.clientWidth, oe = C.clientHeight > 0 && C.scrollHeight > C.clientHeight;
      let _e = oe && N.offsetX > C.clientWidth;
      if (oe && ce(C).direction === "rtl" && (_e = N.offsetX <= C.offsetWidth - C.clientWidth), _e || ee && N.offsetY > C.clientHeight)
        return;
    }
    const xe = (D = i.current.floatingContext) == null ? void 0 : D.nodeId, $e = m && mn(m.nodesRef.current, xe).some((ee) => {
      var oe;
      return ln(N, (oe = ee.context) == null ? void 0 : oe.elements.floating);
    });
    if (ln(N, s.floating) || ln(N, s.domReference) || $e)
      return;
    const Fe = m ? mn(m.nodesRef.current, xe) : [];
    if (Fe.length > 0) {
      let ee = !0;
      if (Fe.forEach((oe) => {
        var _e;
        if ((_e = oe.context) != null && _e.open && !oe.context.dataRef.current.__outsidePressBubbles) {
          ee = !1;
          return;
        }
      }), !ee)
        return;
    }
    r(!1, N, "outside-press");
  }), Y = we((N) => {
    var D;
    const S = () => {
      var _;
      H(N), (_ = Ke(N)) == null || _.removeEventListener(l, S);
    };
    (D = Ke(N)) == null || D.addEventListener(l, S);
  });
  x.useEffect(() => {
    if (!n || !o)
      return;
    i.current.__escapeKeyBubbles = w, i.current.__outsidePressBubbles = A;
    let N = -1;
    function D(I) {
      r(!1, I, "ancestor-scroll");
    }
    function S() {
      window.clearTimeout(N), z.current = !0;
    }
    function _() {
      N = window.setTimeout(
        () => {
          z.current = !1;
        },
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        Xt() ? 5 : 0
      );
    }
    const C = Ve(s.floating);
    a && (C.addEventListener("keydown", E ? F : $, E), C.addEventListener("compositionstart", S), C.addEventListener("compositionend", _)), y && C.addEventListener(l, P ? Y : H, P);
    let V = [];
    return p && (K(s.domReference) && (V = Se(s.domReference)), K(s.floating) && (V = V.concat(Se(s.floating))), !K(s.reference) && s.reference && s.reference.contextElement && (V = V.concat(Se(s.reference.contextElement)))), V = V.filter((I) => {
      var q;
      return I !== ((q = C.defaultView) == null ? void 0 : q.visualViewport);
    }), V.forEach((I) => {
      I.addEventListener("scroll", D, {
        passive: !0
      });
    }), () => {
      a && (C.removeEventListener("keydown", E ? F : $, E), C.removeEventListener("compositionstart", S), C.removeEventListener("compositionend", _)), y && C.removeEventListener(l, P ? Y : H, P), V.forEach((I) => {
        I.removeEventListener("scroll", D);
      }), window.clearTimeout(N);
    };
  }, [i, s, a, y, l, n, r, p, o, w, A, $, E, F, H, P, Y]), x.useEffect(() => {
    k.current = !1;
  }, [y, l]);
  const G = x.useMemo(() => ({
    onKeyDown: $,
    [Ec[d]]: (N) => {
      u && r(!1, N.nativeEvent, "reference-press");
    }
  }), [$, r, u, d]), B = x.useMemo(() => ({
    onKeyDown: $,
    onMouseDown() {
      v.current = !0;
    },
    onMouseUp() {
      v.current = !0;
    },
    [Pc[l]]: () => {
      k.current = !0;
    }
  }), [$, l]);
  return x.useMemo(() => o ? {
    reference: G,
    floating: B
  } : {}, [o, G, B]);
}
function Ac(t) {
  const {
    open: e = !1,
    onOpenChange: n,
    elements: r
  } = t, s = Os(), i = x.useRef({}), [o] = x.useState(() => xc()), a = qn() != null;
  if (process.env.NODE_ENV !== "production") {
    const f = r.reference;
    f && !K(f) && bc("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
  }
  const [c, l] = x.useState(r.reference), u = we((f, h, m) => {
    i.current.openEvent = f ? h : void 0, o.emit("openchange", {
      open: f,
      event: h,
      reason: m,
      nested: a
    }), n == null || n(f, h, m);
  }), d = x.useMemo(() => ({
    setPositionReference: l
  }), []), p = x.useMemo(() => ({
    reference: c || r.reference || null,
    floating: r.floating || null,
    domReference: r.reference
  }), [c, r.reference, r.floating]);
  return x.useMemo(() => ({
    dataRef: i,
    open: e,
    onOpenChange: u,
    elements: p,
    events: o,
    floatingId: s,
    refs: d
  }), [e, u, p, o, s, d]);
}
function Ns(t) {
  t === void 0 && (t = {});
  const {
    nodeId: e
  } = t, n = Ac({
    ...t,
    elements: {
      reference: null,
      floating: null,
      ...t.elements
    }
  }), r = t.rootContext || n, s = r.elements, [i, o] = x.useState(null), [a, c] = x.useState(null), u = (s == null ? void 0 : s.domReference) || i, d = x.useRef(null), p = Kn();
  he(() => {
    u && (d.current = u);
  }, [u]);
  const f = uc({
    ...t,
    elements: {
      ...s,
      ...a && {
        reference: a
      }
    }
  }), h = x.useCallback((v) => {
    const w = K(v) ? {
      getBoundingClientRect: () => v.getBoundingClientRect(),
      contextElement: v
    } : v;
    c(w), f.refs.setReference(w);
  }, [f.refs]), m = x.useCallback((v) => {
    (K(v) || v === null) && (d.current = v, o(v)), (K(f.refs.reference.current) || f.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    v !== null && !K(v)) && f.refs.setReference(v);
  }, [f.refs]), g = x.useMemo(() => ({
    ...f.refs,
    setReference: m,
    setPositionReference: h,
    domReference: d
  }), [f.refs, m, h]), y = x.useMemo(() => ({
    ...f.elements,
    domReference: u
  }), [f.elements, u]), k = x.useMemo(() => ({
    ...f,
    ...r,
    refs: g,
    elements: y,
    nodeId: e
  }), [f, g, y, e, r]);
  return he(() => {
    r.dataRef.current.floatingContext = k;
    const v = p == null ? void 0 : p.nodesRef.current.find((w) => w.id === e);
    v && (v.context = k);
  }), x.useMemo(() => ({
    ...f,
    context: k,
    refs: g,
    elements: y
  }), [f, g, y, k]);
}
function Nc(t, e) {
  e === void 0 && (e = {});
  const {
    open: n,
    onOpenChange: r,
    events: s,
    dataRef: i,
    elements: o
  } = t, {
    enabled: a = !0,
    visibleOnly: c = !0
  } = e, l = x.useRef(!1), u = x.useRef(), d = x.useRef(!0);
  x.useEffect(() => {
    if (!a) return;
    const f = re(o.domReference);
    function h() {
      !n && ue(o.domReference) && o.domReference === kr(Ve(o.domReference)) && (l.current = !0);
    }
    function m() {
      d.current = !0;
    }
    return f.addEventListener("blur", h), f.addEventListener("keydown", m, !0), () => {
      f.removeEventListener("blur", h), f.removeEventListener("keydown", m, !0);
    };
  }, [o.domReference, n, a]), x.useEffect(() => {
    if (!a) return;
    function f(h) {
      let {
        reason: m
      } = h;
      (m === "reference-press" || m === "escape-key") && (l.current = !0);
    }
    return s.on("openchange", f), () => {
      s.off("openchange", f);
    };
  }, [s, a]), x.useEffect(() => () => {
    clearTimeout(u.current);
  }, []);
  const p = x.useMemo(() => ({
    onPointerDown(f) {
      ma(f.nativeEvent) || (d.current = !1);
    },
    onMouseLeave() {
      l.current = !1;
    },
    onFocus(f) {
      if (l.current) return;
      const h = Ke(f.nativeEvent);
      if (c && K(h))
        try {
          if (ha() && ga()) throw Error();
          if (!h.matches(":focus-visible")) return;
        } catch {
          if (!d.current && !_a(h))
            return;
        }
      r(!0, f.nativeEvent, "focus");
    },
    onBlur(f) {
      l.current = !1;
      const h = f.relatedTarget, m = f.nativeEvent, g = K(h) && h.hasAttribute(Jn("focus-guard")) && h.getAttribute("data-type") === "outside";
      u.current = window.setTimeout(() => {
        var y;
        const k = kr(o.domReference ? o.domReference.ownerDocument : document);
        !h && k === o.domReference || _t((y = i.current.floatingContext) == null ? void 0 : y.refs.floating.current, k) || _t(o.domReference, k) || g || r(!1, m, "focus");
      });
    }
  }), [i, o.domReference, r, c]);
  return x.useMemo(() => a ? {
    reference: p
  } : {}, [a, p]);
}
const jr = "active", Zr = "selected";
function hn(t, e, n) {
  const r = /* @__PURE__ */ new Map(), s = n === "item";
  let i = t;
  if (s && t) {
    const {
      [jr]: o,
      [Zr]: a,
      ...c
    } = t;
    i = c;
  }
  return {
    ...n === "floating" && {
      tabIndex: -1,
      [Sc]: ""
    },
    ...i,
    ...e.map((o) => {
      const a = o ? o[n] : null;
      return typeof a == "function" ? t ? a(t) : null : a;
    }).concat(t).reduce((o, a) => (a && Object.entries(a).forEach((c) => {
      let [l, u] = c;
      if (!(s && [jr, Zr].includes(l)))
        if (l.indexOf("on") === 0) {
          if (r.has(l) || r.set(l, []), typeof u == "function") {
            var d;
            (d = r.get(l)) == null || d.push(u), o[l] = function() {
              for (var p, f = arguments.length, h = new Array(f), m = 0; m < f; m++)
                h[m] = arguments[m];
              return (p = r.get(l)) == null ? void 0 : p.map((g) => g(...h)).find((g) => g !== void 0);
            };
          }
        } else
          o[l] = u;
    }), o), {})
  };
}
function $c(t) {
  t === void 0 && (t = []);
  const e = t.map((a) => a == null ? void 0 : a.reference), n = t.map((a) => a == null ? void 0 : a.floating), r = t.map((a) => a == null ? void 0 : a.item), s = x.useCallback(
    (a) => hn(a, t, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    e
  ), i = x.useCallback(
    (a) => hn(a, t, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n
  ), o = x.useCallback(
    (a) => hn(a, t, "item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    r
  );
  return x.useMemo(() => ({
    getReferenceProps: s,
    getFloatingProps: i,
    getItemProps: o
  }), [s, i, o]);
}
const Ic = /* @__PURE__ */ new Map([["select", "listbox"], ["combobox", "listbox"], ["label", !1]]);
function Mc(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    open: r,
    floatingId: s
  } = t, {
    enabled: i = !0,
    role: o = "dialog"
  } = e, a = (n = Ic.get(o)) != null ? n : o, c = Os(), u = qn() != null, d = x.useMemo(() => a === "tooltip" || o === "label" ? {
    ["aria-" + (o === "label" ? "labelledby" : "describedby")]: r ? s : void 0
  } : {
    "aria-expanded": r ? "true" : "false",
    "aria-haspopup": a === "alertdialog" ? "dialog" : a,
    "aria-controls": r ? s : void 0,
    ...a === "listbox" && {
      role: "combobox"
    },
    ...a === "menu" && {
      id: c
    },
    ...a === "menu" && u && {
      role: "menuitem"
    },
    ...o === "select" && {
      "aria-autocomplete": "none"
    },
    ...o === "combobox" && {
      "aria-autocomplete": "list"
    }
  }, [a, s, u, r, c, o]), p = x.useMemo(() => {
    const h = {
      id: s,
      ...a && {
        role: a
      }
    };
    return a === "tooltip" || o === "label" ? h : {
      ...h,
      ...a === "menu" && {
        "aria-labelledby": c
      }
    };
  }, [a, s, c, o]), f = x.useCallback((h) => {
    let {
      active: m,
      selected: g
    } = h;
    const y = {
      role: "option",
      ...m && {
        id: s + "-option"
      }
    };
    switch (o) {
      case "select":
        return {
          ...y,
          "aria-selected": m && g
        };
      case "combobox":
        return {
          ...y,
          ...m && {
            "aria-selected": !0
          }
        };
    }
    return {};
  }, [s, o]);
  return x.useMemo(() => i ? {
    reference: d,
    floating: p,
    item: f
  } : {}, [i, d, p, f]);
}
var $s = { root: "m_1b7284a3" };
const Lc = {}, Dc = (t, { radius: e, shadow: n }) => ({
  root: {
    "--paper-radius": e === void 0 ? void 0 : zn(e),
    "--paper-shadow": qi(n)
  }
}), Qn = Ht((t, e) => {
  const n = ie("Paper", Lc, t), {
    classNames: r,
    className: s,
    style: i,
    styles: o,
    unstyled: a,
    withBorder: c,
    vars: l,
    radius: u,
    shadow: d,
    variant: p,
    mod: f,
    ...h
  } = n, m = Ne({
    name: "Paper",
    props: n,
    classes: $s,
    className: s,
    style: i,
    classNames: r,
    styles: o,
    unstyled: a,
    vars: l,
    varsResolver: Dc
  });
  return /* @__PURE__ */ M(
    ve,
    {
      ref: e,
      mod: [{ "data-with-border": c }, f],
      ...m("root"),
      variant: p,
      ...h
    }
  );
});
Qn.classes = $s;
Qn.displayName = "@mantine/core/Paper";
function jc(t, e) {
  if (t === "rtl" && (e.includes("right") || e.includes("left"))) {
    const [n, r] = e.split("-"), s = n === "right" ? "left" : "right";
    return r === void 0 ? s : `${s}-${r}`;
  }
  return e;
}
function Fr(t, e, n, r) {
  return t === "center" || r === "center" ? { top: e } : t === "end" ? { bottom: n } : t === "start" ? { top: n } : {};
}
function zr(t, e, n, r, s) {
  return t === "center" || r === "center" ? { left: e } : t === "end" ? { [s === "ltr" ? "right" : "left"]: n } : t === "start" ? { [s === "ltr" ? "left" : "right"]: n } : {};
}
const Zc = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius"
};
function Fc({
  position: t,
  arrowSize: e,
  arrowOffset: n,
  arrowRadius: r,
  arrowPosition: s,
  arrowX: i,
  arrowY: o,
  dir: a
}) {
  const [c, l = "center"] = t.split("-"), u = {
    width: e,
    height: e,
    transform: "rotate(45deg)",
    position: "absolute",
    [Zc[c]]: r
  }, d = -e / 2;
  return c === "left" ? {
    ...u,
    ...Fr(l, o, n, s),
    right: d,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    clipPath: "polygon(100% 0, 0 0, 100% 100%)"
  } : c === "right" ? {
    ...u,
    ...Fr(l, o, n, s),
    left: d,
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    clipPath: "polygon(0 100%, 0 0, 100% 100%)"
  } : c === "top" ? {
    ...u,
    ...zr(l, i, n, s, a),
    bottom: d,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    clipPath: "polygon(0 100%, 100% 100%, 100% 0)"
  } : c === "bottom" ? {
    ...u,
    ...zr(l, i, n, s, a),
    top: d,
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    clipPath: "polygon(0 100%, 0 0, 100% 0)"
  } : {};
}
const Is = et(
  ({
    position: t,
    arrowSize: e,
    arrowOffset: n,
    arrowRadius: r,
    arrowPosition: s,
    visible: i,
    arrowX: o,
    arrowY: a,
    style: c,
    ...l
  }, u) => {
    const { dir: d } = ms();
    return i ? /* @__PURE__ */ M(
      "div",
      {
        ...l,
        ref: u,
        style: {
          ...c,
          ...Fc({
            position: t,
            arrowSize: e,
            arrowOffset: n,
            arrowRadius: r,
            arrowPosition: s,
            dir: d,
            arrowX: o,
            arrowY: a
          })
        }
      }
    ) : null;
  }
);
Is.displayName = "@mantine/core/FloatingArrow";
function gn(t) {
  const e = document.createElement("div");
  return e.setAttribute("data-portal", "true"), typeof t.className == "string" && e.classList.add(...t.className.split(" ").filter(Boolean)), typeof t.style == "object" && Object.assign(e.style, t.style), typeof t.id == "string" && e.setAttribute("id", t.id), e;
}
function zc({
  target: t,
  reuseTargetNode: e,
  ...n
}) {
  if (t)
    return typeof t == "string" ? document.querySelector(t) || gn(n) : t;
  if (e) {
    const r = document.querySelector("[data-mantine-shared-portal-node]");
    if (r)
      return r;
    const s = gn(n);
    return s.setAttribute("data-mantine-shared-portal-node", "true"), document.body.appendChild(s), s;
  }
  return gn(n);
}
const Vc = {}, Ms = Ze((t, e) => {
  const { children: n, target: r, reuseTargetNode: s, ...i } = ie("Portal", Vc, t), [o, a] = ae(!1), c = Te(null);
  return ss(() => (a(!0), c.current = zc({ target: r, reuseTargetNode: s, ...i }), Rn(e, c.current), !r && !s && c.current && document.body.appendChild(c.current), () => {
    !r && !s && c.current && document.body.removeChild(c.current);
  }), [r]), !o || !c.current ? null : Qs(/* @__PURE__ */ M(We, { children: n }), c.current);
});
Ms.displayName = "@mantine/core/Portal";
const er = Ze(
  ({ withinPortal: t = !0, children: e, ...n }, r) => cs() === "test" || !t ? /* @__PURE__ */ M(We, { children: e }) : /* @__PURE__ */ M(Ms, { ref: r, ...n, children: e })
);
er.displayName = "@mantine/core/OptionalPortal";
const ht = (t) => ({
  in: { opacity: 1, transform: "scale(1)" },
  out: { opacity: 0, transform: `scale(.9) translateY(${t === "bottom" ? 10 : -10}px)` },
  transitionProperty: "transform, opacity"
}), At = {
  fade: {
    in: { opacity: 1 },
    out: { opacity: 0 },
    transitionProperty: "opacity"
  },
  "fade-up": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(30px)" },
    transitionProperty: "opacity, transform"
  },
  "fade-down": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(-30px)" },
    transitionProperty: "opacity, transform"
  },
  "fade-left": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(30px)" },
    transitionProperty: "opacity, transform"
  },
  "fade-right": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(-30px)" },
    transitionProperty: "opacity, transform"
  },
  scale: {
    in: { opacity: 1, transform: "scale(1)" },
    out: { opacity: 0, transform: "scale(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "scale-y": {
    in: { opacity: 1, transform: "scaleY(1)" },
    out: { opacity: 0, transform: "scaleY(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "scale-x": {
    in: { opacity: 1, transform: "scaleX(1)" },
    out: { opacity: 0, transform: "scaleX(0)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity"
  },
  "skew-up": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: "translateY(-20px) skew(-10deg, -5deg)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "skew-down": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: "translateY(20px) skew(-10deg, -5deg)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-left": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: "translateY(20px) rotate(-5deg)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-right": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: "translateY(20px) rotate(5deg)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "slide-down": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(-100%)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "slide-up": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(100%)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "slide-left": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(100%)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity"
  },
  "slide-right": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(-100%)" },
    common: { transformOrigin: "right" },
    transitionProperty: "transform, opacity"
  },
  pop: {
    ...ht("bottom"),
    common: { transformOrigin: "center center" }
  },
  "pop-bottom-left": {
    ...ht("bottom"),
    common: { transformOrigin: "bottom left" }
  },
  "pop-bottom-right": {
    ...ht("bottom"),
    common: { transformOrigin: "bottom right" }
  },
  "pop-top-left": {
    ...ht("top"),
    common: { transformOrigin: "top left" }
  },
  "pop-top-right": {
    ...ht("top"),
    common: { transformOrigin: "top right" }
  }
}, Vr = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function Bc({
  transition: t,
  state: e,
  duration: n,
  timingFunction: r
}) {
  const s = {
    WebkitBackfaceVisibility: "hidden",
    willChange: "transform, opacity",
    transitionDuration: `${n}ms`,
    transitionTimingFunction: r
  };
  return typeof t == "string" ? t in At ? {
    transitionProperty: At[t].transitionProperty,
    ...s,
    ...At[t].common,
    ...At[t][Vr[e]]
  } : {} : {
    transitionProperty: t.transitionProperty,
    ...s,
    ...t.common,
    ...t[Vr[e]]
  };
}
function Wc({
  duration: t,
  exitDuration: e,
  timingFunction: n,
  mounted: r,
  onEnter: s,
  onExit: i,
  onEntered: o,
  onExited: a,
  enterDelay: c,
  exitDelay: l
}) {
  const u = Xe(), d = io(), p = u.respectReducedMotion ? d : !1, [f, h] = ae(p ? 0 : t), [m, g] = ae(r ? "entered" : "exited"), y = Te(-1), k = Te(-1), v = Te(-1);
  function w() {
    window.clearTimeout(y.current), window.clearTimeout(k.current), cancelAnimationFrame(v.current);
  }
  const A = (P) => {
    w();
    const z = P ? s : i, $ = P ? o : a, F = p ? 0 : P ? t : e;
    h(F), F === 0 ? (typeof z == "function" && z(), typeof $ == "function" && $(), g(P ? "entered" : "exited")) : v.current = requestAnimationFrame(() => {
      Js.flushSync(() => {
        g(P ? "pre-entering" : "pre-exiting");
      }), v.current = requestAnimationFrame(() => {
        typeof z == "function" && z(), g(P ? "entering" : "exiting"), y.current = window.setTimeout(() => {
          typeof $ == "function" && $(), g(P ? "entered" : "exited");
        }, F);
      });
    });
  }, E = (P) => {
    if (w(), typeof (P ? c : l) != "number") {
      A(P);
      return;
    }
    k.current = window.setTimeout(
      () => {
        A(P);
      },
      P ? c : l
    );
  };
  return Ft(() => {
    E(r);
  }, [r]), ge(
    () => () => {
      w();
    },
    []
  ), {
    transitionDuration: f,
    transitionStatus: m,
    transitionTimingFunction: n || "ease"
  };
}
function Ls({
  keepMounted: t,
  transition: e = "fade",
  duration: n = 250,
  exitDuration: r = n,
  mounted: s,
  children: i,
  timingFunction: o = "ease",
  onExit: a,
  onEntered: c,
  onEnter: l,
  onExited: u,
  enterDelay: d,
  exitDelay: p
}) {
  const f = cs(), { transitionDuration: h, transitionStatus: m, transitionTimingFunction: g } = Wc({
    mounted: s,
    exitDuration: r,
    duration: n,
    timingFunction: o,
    onExit: a,
    onEntered: c,
    onEnter: l,
    onExited: u,
    enterDelay: d,
    exitDelay: p
  });
  return h === 0 || f === "test" ? s ? /* @__PURE__ */ M(We, { children: i({}) }) : t ? i({ display: "none" }) : null : m === "exited" ? t ? i({ display: "none" }) : null : /* @__PURE__ */ M(We, { children: i(
    Bc({
      transition: e,
      duration: h,
      state: m,
      timingFunction: g
    })
  ) });
}
Ls.displayName = "@mantine/core/Transition";
function Uc({
  opened: t,
  floating: e,
  position: n,
  positionDependencies: r
}) {
  const [s, i] = ae(0);
  ge(() => {
    if (e.refs.reference.current && e.refs.floating.current && t)
      return nc(
        e.refs.reference.current,
        e.refs.floating.current,
        e.update
      );
  }, [
    e.refs.reference.current,
    e.refs.floating.current,
    t,
    s,
    n
  ]), Ft(() => {
    e.update();
  }, r), Ft(() => {
    i((o) => o + 1);
  }, [t]);
}
function Hc(t) {
  return Wr.toArray(t).filter(Boolean);
}
var Ds = { root: "m_4081bf90" };
const Yc = {
  preventGrowOverflow: !0,
  gap: "md",
  align: "center",
  justify: "flex-start",
  wrap: "wrap"
}, Gc = (t, { grow: e, preventGrowOverflow: n, gap: r, align: s, justify: i, wrap: o }, { childWidth: a }) => ({
  root: {
    "--group-child-width": e && n ? a : void 0,
    "--group-gap": Ut(r),
    "--group-align": s,
    "--group-justify": i,
    "--group-wrap": o
  }
}), vt = Ze((t, e) => {
  const n = ie("Group", Yc, t), {
    classNames: r,
    className: s,
    style: i,
    styles: o,
    unstyled: a,
    children: c,
    gap: l,
    align: u,
    justify: d,
    wrap: p,
    grow: f,
    preventGrowOverflow: h,
    vars: m,
    variant: g,
    __size: y,
    mod: k,
    ...v
  } = n, w = Hc(c), A = w.length, E = Ut(l ?? "md"), z = { childWidth: `calc(${100 / A}% - (${E} - ${E} / ${A}))` }, $ = Ne({
    name: "Group",
    props: n,
    stylesCtx: z,
    className: s,
    style: i,
    classes: Ds,
    classNames: r,
    styles: o,
    unstyled: a,
    vars: m,
    varsResolver: Gc
  });
  return /* @__PURE__ */ M(
    ve,
    {
      ...$("root"),
      ref: e,
      variant: g,
      mod: [{ grow: f }, k],
      size: y,
      ...v,
      children: w
    }
  );
});
vt.classes = Ds;
vt.displayName = "@mantine/core/Group";
var js = { root: "m_b6d8b162" };
function Xc(t) {
  if (t === "start")
    return "start";
  if (t === "end" || t)
    return "end";
}
const qc = {
  inherit: !1
}, Kc = (t, { variant: e, lineClamp: n, gradient: r, size: s, color: i }) => ({
  root: {
    "--text-fz": Gi(s),
    "--text-lh": Xi(s),
    "--text-gradient": e === "gradient" ? Ro(r, t) : void 0,
    "--text-line-clamp": typeof n == "number" ? n.toString() : void 0,
    "--text-color": i ? ot(i, t) : void 0
  }
}), Me = Ht((t, e) => {
  const n = ie("Text", qc, t), {
    lineClamp: r,
    truncate: s,
    inline: i,
    inherit: o,
    gradient: a,
    span: c,
    __staticSelector: l,
    vars: u,
    className: d,
    style: p,
    classNames: f,
    styles: h,
    unstyled: m,
    variant: g,
    mod: y,
    size: k,
    ...v
  } = n, w = Ne({
    name: ["Text", l],
    props: n,
    classes: js,
    className: d,
    style: p,
    classNames: f,
    styles: h,
    unstyled: m,
    vars: u,
    varsResolver: Kc
  });
  return /* @__PURE__ */ M(
    ve,
    {
      ...w("root", { focusable: !0 }),
      ref: e,
      component: c ? "span" : "p",
      variant: g,
      mod: [
        {
          "data-truncate": Xc(s),
          "data-line-clamp": typeof r == "number",
          "data-inline": i,
          "data-inherit": o
        },
        y
      ],
      size: k,
      ...v
    }
  );
});
Me.classes = js;
Me.displayName = "@mantine/core/Text";
const [Jc, Qc] = Hi(
  "Card component was not found in tree"
);
var tr = { root: "m_e615b15f", section: "m_599a2148" };
const el = {}, Jt = Ht((t, e) => {
  const n = ie("CardSection", el, t), { classNames: r, className: s, style: i, styles: o, vars: a, withBorder: c, inheritPadding: l, mod: u, ...d } = n, p = Qc();
  return /* @__PURE__ */ M(
    ve,
    {
      ref: e,
      mod: [{ "with-border": c, "inherit-padding": l }, u],
      ...p.getStyles("section", { className: s, style: i, styles: o, classNames: r }),
      ...d
    }
  );
});
Jt.classes = tr;
Jt.displayName = "@mantine/core/CardSection";
const tl = {}, nl = (t, { padding: e }) => ({
  root: {
    "--card-padding": Ut(e)
  }
}), Be = Ht((t, e) => {
  const n = ie("Card", tl, t), { classNames: r, className: s, style: i, styles: o, unstyled: a, vars: c, children: l, padding: u, ...d } = n, p = Ne({
    name: "Card",
    props: n,
    classes: tr,
    className: s,
    style: i,
    classNames: r,
    styles: o,
    unstyled: a,
    vars: c,
    varsResolver: nl
  }), f = Wr.toArray(l), h = f.map((m, g) => typeof m == "object" && m && "type" in m && m.type === Jt ? Ln(m, {
    "data-first-section": g === 0 || void 0,
    "data-last-section": g === f.length - 1 || void 0
  }) : m);
  return /* @__PURE__ */ M(Jc, { value: { getStyles: p }, children: /* @__PURE__ */ M(Qn, { ref: e, unstyled: a, ...p("root"), ...d, children: h }) });
});
Be.classes = tr;
Be.displayName = "@mantine/core/Card";
Be.Section = Jt;
const rl = {
  duration: 100,
  transition: "fade"
};
function sl(t, e) {
  return { ...rl, ...e, ...t };
}
function il({
  offset: t,
  position: e,
  defaultOpened: n
}) {
  const [r, s] = ae(n), i = Te(null), { x: o, y: a, elements: c, refs: l, update: u, placement: d } = Ns({
    placement: e,
    middleware: [
      Es({
        crossAxis: !0,
        padding: 5,
        rootBoundary: "document"
      })
    ]
  }), p = d.includes("right") ? t : e.includes("left") ? t * -1 : 0, f = d.includes("bottom") ? t : e.includes("top") ? t * -1 : 0, h = Ce(
    ({ clientX: m, clientY: g }) => {
      l.setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: m,
            y: g,
            left: m + p,
            top: g + f,
            right: m,
            bottom: g
          };
        }
      });
    },
    [c.reference]
  );
  return ge(() => {
    if (l.floating.current) {
      const m = i.current;
      m.addEventListener("mousemove", h);
      const g = Se(l.floating.current);
      return g.forEach((y) => {
        y.addEventListener("scroll", u);
      }), () => {
        m.removeEventListener("mousemove", h), g.forEach((y) => {
          y.removeEventListener("scroll", u);
        });
      };
    }
  }, [c.reference, l.floating.current, u, h, r]), { handleMouseMove: h, x: o, y: a, opened: r, setOpened: s, boundaryRef: i, floating: l.setFloating };
}
var Qt = { tooltip: "m_1b3c8819", arrow: "m_f898399f" };
const ol = {
  refProp: "ref",
  withinPortal: !0,
  offset: 10,
  defaultOpened: !1,
  position: "right",
  zIndex: rs("popover")
}, al = (t, { radius: e, color: n }) => ({
  tooltip: {
    "--tooltip-radius": e === void 0 ? void 0 : zn(e),
    "--tooltip-bg": n ? ot(n, t) : void 0,
    "--tooltip-color": n ? "var(--mantine-color-white)" : void 0
  }
}), nr = Ze((t, e) => {
  const n = ie("TooltipFloating", ol, t), {
    children: r,
    refProp: s,
    withinPortal: i,
    style: o,
    className: a,
    classNames: c,
    styles: l,
    unstyled: u,
    radius: d,
    color: p,
    label: f,
    offset: h,
    position: m,
    multiline: g,
    zIndex: y,
    disabled: k,
    defaultOpened: v,
    variant: w,
    vars: A,
    portalProps: E,
    ...P
  } = n, z = Xe(), $ = Ne({
    name: "TooltipFloating",
    props: n,
    classes: Qt,
    className: a,
    style: o,
    classNames: c,
    styles: l,
    unstyled: u,
    rootSelector: "tooltip",
    vars: A,
    varsResolver: al
  }), { handleMouseMove: F, x: H, y: Y, opened: G, boundaryRef: B, floating: N, setOpened: D } = il({
    offset: h,
    position: m,
    defaultOpened: v
  });
  if (!ns(r))
    throw new Error(
      "[@mantine/core] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  const S = is(B, os(r), e), _ = r.props, C = (I) => {
    var q;
    (q = _.onMouseEnter) == null || q.call(_, I), F(I), D(!0);
  }, V = (I) => {
    var q;
    (q = _.onMouseLeave) == null || q.call(_, I), D(!1);
  };
  return /* @__PURE__ */ te(We, { children: [
    /* @__PURE__ */ M(er, { ...E, withinPortal: i, children: /* @__PURE__ */ M(
      ve,
      {
        ...P,
        ...$("tooltip", {
          style: {
            ...ls(o, z),
            zIndex: y,
            display: !k && G ? "block" : "none",
            top: (Y && Math.round(Y)) ?? "",
            left: (H && Math.round(H)) ?? ""
          }
        }),
        variant: w,
        ref: N,
        mod: { multiline: g },
        children: f
      }
    ) }),
    Ln(r, {
      ..._,
      [s]: S,
      onMouseEnter: C,
      onMouseLeave: V
    })
  ] });
});
nr.classes = Qt;
nr.displayName = "@mantine/core/TooltipFloating";
const Zs = ct(!1), cl = Zs.Provider, ll = () => lt(Zs), ul = {
  openDelay: 0,
  closeDelay: 0
};
function rr(t) {
  const { openDelay: e, closeDelay: n, children: r } = ie("TooltipGroup", ul, t);
  return /* @__PURE__ */ M(cl, { value: !0, children: /* @__PURE__ */ M(Cc, { delay: { open: e, close: n }, children: r }) });
}
rr.displayName = "@mantine/core/TooltipGroup";
rr.extend = (t) => t;
function dl(t) {
  if (t === void 0)
    return { shift: !0, flip: !0 };
  const e = { ...t };
  return t.shift === void 0 && (e.shift = !0), t.flip === void 0 && (e.flip = !0), e;
}
function fl(t) {
  const e = dl(t.middlewares), n = [fc(t.offset)];
  return e.shift && n.push(
    Es(
      typeof e.shift == "boolean" ? { padding: 8 } : { padding: 8, ...e.shift }
    )
  ), e.flip && n.push(
    typeof e.flip == "boolean" ? $r() : $r(e.flip)
  ), n.push(pc({ element: t.arrowRef, padding: t.arrowOffset })), e.inline ? n.push(
    typeof e.inline == "boolean" ? fn() : fn(e.inline)
  ) : t.inline && n.push(fn()), n;
}
function pl(t) {
  var E, P, z;
  const [e, n] = ae(t.defaultOpened), s = typeof t.opened == "boolean" ? t.opened : e, i = ll(), o = ro(), a = Ce(
    ($) => {
      n($), $ && k(o);
    },
    [o]
  ), {
    x: c,
    y: l,
    context: u,
    refs: d,
    update: p,
    placement: f,
    middlewareData: { arrow: { x: h, y: m } = {} }
  } = Ns({
    strategy: t.strategy,
    placement: t.position,
    open: s,
    onOpenChange: a,
    middleware: fl(t)
  }), { delay: g, currentId: y, setCurrentId: k } = Tc(u, { id: o }), { getReferenceProps: v, getFloatingProps: w } = $c([
    kc(u, {
      enabled: (E = t.events) == null ? void 0 : E.hover,
      delay: i ? g : { open: t.openDelay, close: t.closeDelay },
      mouseOnly: !((P = t.events) != null && P.touch)
    }),
    Nc(u, { enabled: (z = t.events) == null ? void 0 : z.focus, visibleOnly: !0 }),
    Mc(u, { role: "tooltip" }),
    // Cannot be used with controlled tooltip, page jumps
    Oc(u, { enabled: typeof t.opened > "u" })
  ]);
  Uc({
    opened: s,
    position: t.position,
    positionDependencies: t.positionDependencies,
    floating: { refs: d, update: p }
  }), Ft(() => {
    var $;
    ($ = t.onPositionChange) == null || $.call(t, f);
  }, [f]);
  const A = s && y && y !== o;
  return {
    x: c,
    y: l,
    arrowX: h,
    arrowY: m,
    reference: d.setReference,
    floating: d.setFloating,
    getFloatingProps: w,
    getReferenceProps: v,
    isGroupPhase: A,
    opened: s,
    placement: f
  };
}
const Br = {
  position: "top",
  refProp: "ref",
  withinPortal: !0,
  inline: !1,
  defaultOpened: !1,
  arrowSize: 4,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: "side",
  offset: 5,
  transitionProps: { duration: 100, transition: "fade" },
  events: { hover: !0, focus: !1, touch: !1 },
  zIndex: rs("popover"),
  positionDependencies: [],
  middlewares: { flip: !0, shift: !0, inline: !1 }
}, ml = (t, { radius: e, color: n }) => ({
  tooltip: {
    "--tooltip-radius": e === void 0 ? void 0 : zn(e),
    "--tooltip-bg": n ? ot(n, t) : void 0,
    "--tooltip-color": n ? "var(--mantine-color-white)" : void 0
  }
}), St = Ze((t, e) => {
  const n = ie("Tooltip", Br, t), {
    children: r,
    position: s,
    refProp: i,
    label: o,
    openDelay: a,
    closeDelay: c,
    onPositionChange: l,
    opened: u,
    defaultOpened: d,
    withinPortal: p,
    radius: f,
    color: h,
    classNames: m,
    styles: g,
    unstyled: y,
    style: k,
    className: v,
    withArrow: w,
    arrowSize: A,
    arrowOffset: E,
    arrowRadius: P,
    arrowPosition: z,
    offset: $,
    transitionProps: F,
    multiline: H,
    events: Y,
    zIndex: G,
    disabled: B,
    positionDependencies: N,
    onClick: D,
    onMouseEnter: S,
    onMouseLeave: _,
    inline: C,
    variant: V,
    keepMounted: I,
    vars: q,
    portalProps: xe,
    mod: $e,
    floatingStrategy: Fe,
    middlewares: ee,
    ...oe
  } = ie("Tooltip", Br, n), { dir: _e } = ms(), ft = Te(null), se = pl({
    position: jc(_e, s),
    closeDelay: c,
    openDelay: a,
    onPositionChange: l,
    opened: u,
    defaultOpened: d,
    events: Y,
    arrowRef: ft,
    arrowOffset: E,
    offset: typeof $ == "number" ? $ + (w ? A / 2 : 0) : $,
    positionDependencies: [...N, r],
    inline: C,
    strategy: Fe,
    middlewares: ee
  }), pt = Ne({
    name: "Tooltip",
    props: n,
    classes: Qt,
    className: v,
    style: k,
    classNames: m,
    styles: g,
    unstyled: y,
    rootSelector: "tooltip",
    vars: q,
    varsResolver: ml
  });
  if (!ns(r))
    throw new Error(
      "[@mantine/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  const en = is(se.reference, os(r), e), Et = sl(F, { duration: 100, transition: "fade" }), Pt = r.props;
  return /* @__PURE__ */ te(We, { children: [
    /* @__PURE__ */ M(er, { ...xe, withinPortal: p, children: /* @__PURE__ */ M(
      Ls,
      {
        ...Et,
        keepMounted: I,
        mounted: !B && !!se.opened,
        duration: se.isGroupPhase ? 10 : Et.duration,
        children: (tn) => /* @__PURE__ */ te(
          ve,
          {
            ...oe,
            "data-fixed": Fe === "fixed" || void 0,
            variant: V,
            mod: [{ multiline: H }, $e],
            ...se.getFloatingProps({
              ref: se.floating,
              className: pt("tooltip").className,
              style: {
                ...pt("tooltip").style,
                ...tn,
                zIndex: G,
                top: se.y ?? 0,
                left: se.x ?? 0
              }
            }),
            children: [
              o,
              /* @__PURE__ */ M(
                Is,
                {
                  ref: ft,
                  arrowX: se.arrowX,
                  arrowY: se.arrowY,
                  visible: w,
                  position: se.placement,
                  arrowSize: A,
                  arrowOffset: E,
                  arrowRadius: P,
                  arrowPosition: z,
                  ...pt("arrow")
                }
              )
            ]
          }
        )
      }
    ) }),
    Ln(
      r,
      se.getReferenceProps({
        onClick: D,
        onMouseEnter: S,
        onMouseLeave: _,
        onMouseMove: n.onMouseMove,
        onPointerDown: n.onPointerDown,
        onPointerEnter: n.onPointerEnter,
        className: Rt(v, Pt.className),
        ...Pt,
        [i]: en
      })
    )
  ] });
});
St.classes = Qt;
St.displayName = "@mantine/core/Tooltip";
St.Floating = nr;
St.Group = rr;
function hl({ size: t, thickness: e, sum: n, value: r, root: s, offset: i }) {
  const o = (t * 0.9 - e * 2) / 2, a = Math.PI * o * 2 / 100, c = s || r === void 0 ? `${(100 - n) * a}, ${n * a}` : `${r * a}, ${(100 - r) * a}`;
  return {
    strokeWidth: Number.isNaN(e) ? 12 : e,
    cx: t / 2 || 0,
    cy: t / 2 || 0,
    r: o || 0,
    transform: s ? `scale(1, -1) translate(0, -${t})` : void 0,
    strokeDasharray: c,
    strokeDashoffset: s ? 0 : i || 0
  };
}
function Fs({
  size: t,
  value: e,
  offset: n,
  sum: r,
  thickness: s,
  root: i,
  color: o,
  lineRoundCaps: a,
  tooltip: c,
  getStyles: l,
  display: u,
  ...d
}) {
  const p = Xe();
  return /* @__PURE__ */ M(St.Floating, { disabled: !c, label: c, children: /* @__PURE__ */ M(
    ve,
    {
      component: "circle",
      ...d,
      ...l("curve"),
      __vars: { "--curve-color": o ? ot(o, p) : void 0 },
      fill: "none",
      strokeLinecap: a ? "round" : "butt",
      ...hl({ sum: r, size: t, thickness: s, value: e, offset: n, root: i })
    }
  ) });
}
Fs.displayName = "@mantine/core/Curve";
function gl({
  size: t,
  thickness: e,
  sections: n,
  renderRoundedLineCaps: r,
  rootColor: s
}) {
  const i = n.reduce((u, d) => u + d.value, 0), o = Math.PI * ((t * 0.9 - e * 2) / 2) * 2;
  let a = o;
  const c = [], l = [];
  for (let u = 0; u < n.length; u += 1)
    c.push({ sum: i, offset: a, data: n[u], root: !1 }), a -= n[u].value / 100 * o;
  if (c.push({ sum: i, offset: a, data: { color: s }, root: !0 }), l.push({ ...c[c.length - 1], lineRoundCaps: !1 }), c.length > 2) {
    l.push({ ...c[0], lineRoundCaps: r }), l.push({ ...c[c.length - 2], lineRoundCaps: r });
    for (let u = 1; u <= c.length - 3; u += 1)
      l.push({ ...c[u], lineRoundCaps: !1 });
  } else
    l.push({ ...c[0], lineRoundCaps: r });
  return l;
}
var zs = { root: "m_b32e4812", svg: "m_d43b5134", curve: "m_b1ca1fbf", label: "m_b23f9dc4" };
function yl(t, e) {
  return Math.min(t || 12, (e || 120) / 4);
}
const vl = {
  size: 120,
  thickness: 12
}, bl = (t, { size: e, thickness: n, transitionDuration: r }) => ({
  root: {
    "--rp-size": de(e),
    "--rp-label-offset": de(n * 2),
    "--rp-transition-duration": r ? `${r}ms` : void 0
  }
}), sr = Ze((t, e) => {
  const n = ie("RingProgress", vl, t), {
    classNames: r,
    className: s,
    style: i,
    styles: o,
    unstyled: a,
    vars: c,
    label: l,
    sections: u,
    size: d,
    thickness: p,
    roundCaps: f,
    rootColor: h,
    transitionDuration: m,
    ...g
  } = n, y = Ne({
    name: "RingProgress",
    classes: zs,
    props: n,
    className: s,
    style: i,
    classNames: r,
    styles: o,
    unstyled: a,
    vars: c,
    varsResolver: bl
  }), k = yl(p, d), v = gl({
    size: d,
    thickness: k,
    sections: u,
    renderRoundedLineCaps: f,
    rootColor: h
  }).map(({ data: w, sum: A, root: E, lineRoundCaps: P, offset: z }, $) => /* @__PURE__ */ qs(
    Fs,
    {
      ...w,
      key: $,
      size: d,
      thickness: k,
      sum: A,
      offset: z,
      color: w == null ? void 0 : w.color,
      root: E,
      lineRoundCaps: P,
      getStyles: y
    }
  ));
  return /* @__PURE__ */ te(ve, { ...y("root"), size: d, ref: e, ...g, children: [
    /* @__PURE__ */ M("svg", { ...y("svg"), children: v }),
    l && /* @__PURE__ */ M("div", { ...y("label"), children: l })
  ] });
});
sr.classes = zs;
sr.displayName = "@mantine/core/RingProgress";
var Vs = { root: "m_6d731127" };
const xl = {
  gap: "md",
  align: "stretch",
  justify: "flex-start"
}, _l = (t, { gap: e, align: n, justify: r }) => ({
  root: {
    "--stack-gap": Ut(e),
    "--stack-align": n,
    "--stack-justify": r
  }
}), wt = Ze((t, e) => {
  const n = ie("Stack", xl, t), {
    classNames: r,
    className: s,
    style: i,
    styles: o,
    unstyled: a,
    vars: c,
    align: l,
    justify: u,
    gap: d,
    variant: p,
    ...f
  } = n, h = Ne({
    name: "Stack",
    props: n,
    classes: Vs,
    className: s,
    style: i,
    classNames: r,
    styles: o,
    unstyled: a,
    vars: c,
    varsResolver: _l
  });
  return /* @__PURE__ */ M(ve, { ref: e, ...h("root"), variant: p, ...f });
});
wt.classes = Vs;
wt.displayName = "@mantine/core/Stack";
const wl = ["h1", "h2", "h3", "h4", "h5", "h6"], kl = ["xs", "sm", "md", "lg", "xl"];
function Rl(t, e) {
  const n = e !== void 0 ? e : `h${t}`;
  return wl.includes(n) ? {
    fontSize: `var(--mantine-${n}-font-size)`,
    fontWeight: `var(--mantine-${n}-font-weight)`,
    lineHeight: `var(--mantine-${n}-line-height)`
  } : kl.includes(n) ? {
    fontSize: `var(--mantine-font-size-${n})`,
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  } : {
    fontSize: de(n),
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  };
}
var Bs = { root: "m_8a5d1357" };
const Cl = {
  order: 1
}, Tl = (t, { order: e, size: n, lineClamp: r, textWrap: s }) => {
  const i = Rl(e, n);
  return {
    root: {
      "--title-fw": i.fontWeight,
      "--title-lh": i.lineHeight,
      "--title-fz": i.fontSize,
      "--title-line-clamp": typeof r == "number" ? r.toString() : void 0,
      "--title-text-wrap": s
    }
  };
}, Qe = Ze((t, e) => {
  const n = ie("Title", Cl, t), {
    classNames: r,
    className: s,
    style: i,
    styles: o,
    unstyled: a,
    order: c,
    vars: l,
    size: u,
    variant: d,
    lineClamp: p,
    textWrap: f,
    mod: h,
    ...m
  } = n, g = Ne({
    name: "Title",
    props: n,
    classes: Bs,
    className: s,
    style: i,
    classNames: r,
    styles: o,
    unstyled: a,
    vars: l,
    varsResolver: Tl
  });
  return [1, 2, 3, 4, 5, 6].includes(c) ? /* @__PURE__ */ M(
    ve,
    {
      ...g("root"),
      component: `h${c}`,
      variant: d,
      ref: e,
      mod: [{ order: c, "data-line-clamp": typeof p == "number" }, h],
      size: u,
      ...m
    }
  ) : null;
});
Qe.classes = Bs;
Qe.displayName = "@mantine/core/Title";
const Sl = Ur(function() {
  const [e] = $i({
    showCharts: !0,
    refreshInterval: 30
  }), [n, r] = ae(0), [s, i] = ae(0);
  yt("task.created", Ce(() => {
    r((a) => a + 1);
  }, [])), yt("user.loggedIn", Ce(() => {
    i((a) => a + 1);
  }, []));
  const o = Hr(
    () => [
      { value: Math.min(n * 10, 60), color: "blue" },
      { value: Math.min(s * 20, 40), color: "teal" }
    ],
    [n, s]
  );
  return /* @__PURE__ */ M(Be, { withBorder: !0, padding: "lg", radius: "md", children: /* @__PURE__ */ te(wt, { gap: "md", children: [
    /* @__PURE__ */ te(vt, { justify: "space-between", children: [
      /* @__PURE__ */ M(Qe, { order: 4, children: "Usage Analytics" }),
      /* @__PURE__ */ te(Me, { size: "xs", c: "dimmed", children: [
        "Refresh: ",
        e.refreshInterval,
        "s"
      ] })
    ] }),
    e.showCharts && /* @__PURE__ */ M(vt, { justify: "center", children: /* @__PURE__ */ M(
      sr,
      {
        size: 120,
        thickness: 12,
        sections: o,
        label: /* @__PURE__ */ te(Me, { ta: "center", size: "xs", children: [
          n,
          " tasks"
        ] })
      }
    ) }),
    /* @__PURE__ */ te(vt, { grow: !0, children: [
      /* @__PURE__ */ te(Be, { withBorder: !0, padding: "sm", children: [
        /* @__PURE__ */ M(Me, { size: "xs", c: "dimmed", children: "Tasks Created" }),
        /* @__PURE__ */ M(Qe, { order: 3, children: n })
      ] }),
      /* @__PURE__ */ te(Be, { withBorder: !0, padding: "sm", children: [
        /* @__PURE__ */ M(Me, { size: "xs", c: "dimmed", children: "User Logins" }),
        /* @__PURE__ */ M(Qe, { order: 3, children: s })
      ] })
    ] })
  ] }) });
}), El = Ur(function() {
  const [e, n] = ae([
    { label: "Tasks", value: 0 },
    { label: "Reports", value: 0 },
    { label: "Logins", value: 0 }
  ]);
  yt("task.created", Ce(() => {
    n(
      (s) => s.map((i) => i.label === "Tasks" ? { ...i, value: i.value + 1 } : i)
    );
  }, [])), yt("report.generated", Ce(() => {
    n(
      (s) => s.map(
        (i) => i.label === "Reports" ? { ...i, value: i.value + 1 } : i
      )
    );
  }, [])), yt("user.loggedIn", Ce(() => {
    n(
      (s) => s.map((i) => i.label === "Logins" ? { ...i, value: i.value + 1 } : i)
    );
  }, []));
  const r = Hr(
    () => Math.max(...e.map((s) => s.value), 1),
    [e]
  );
  return /* @__PURE__ */ M(Be, { withBorder: !0, padding: "lg", radius: "md", children: /* @__PURE__ */ te(wt, { gap: "md", children: [
    /* @__PURE__ */ M(Qe, { order: 4, children: "Activity Chart" }),
    e.map((s) => /* @__PURE__ */ te(wt, { gap: 4, children: [
      /* @__PURE__ */ te(Pl, { justify: "space-between", children: [
        /* @__PURE__ */ M(Me, { size: "sm", children: s.label }),
        /* @__PURE__ */ M(Me, { size: "sm", fw: 600, children: s.value })
      ] }),
      /* @__PURE__ */ M(
        "div",
        {
          style: {
            height: 8,
            borderRadius: 4,
            background: "var(--mantine-color-gray-2)",
            overflow: "hidden"
          },
          children: /* @__PURE__ */ M(
            "div",
            {
              style: {
                height: "100%",
                width: `${s.value / r * 100}%`,
                background: "var(--mantine-color-blue-6)",
                borderRadius: 4,
                transition: "width 0.3s ease"
              }
            }
          )
        }
      )
    ] }, s.label))
  ] }) });
});
function Pl({
  justify: t,
  children: e
}) {
  return /* @__PURE__ */ M("div", { style: { display: "flex", justifyContent: t, alignItems: "center" }, children: e });
}
Ai({
  manifest: Wi,
  widgets: [
    { slot: "dashboard.main", component: Sl, priority: 10 },
    { slot: "dashboard.sidebar", component: El, priority: 5 }
  ]
});
