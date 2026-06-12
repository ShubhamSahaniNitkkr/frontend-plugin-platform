import { jsx as v, jsxs as de, Fragment as rn } from "react/jsx-runtime";
import * as nn from "react";
import { createContext as ke, useContext as Se, useEffect as W, useRef as U, useMemo as sn, useCallback as re, useLayoutEffect as an, useId as on, forwardRef as z, useState as O, Children as nr, cloneElement as cn, memo as sr, useReducer as ln } from "react";
import "react-dom";
const dn = [
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
], un = [
  "dashboard.main",
  "dashboard.sidebar",
  "header.actions",
  "settings.sections",
  "reports.widgets",
  "sidebar.nav"
];
var N;
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
})(N || (N = {}));
var Zt;
(function(t) {
  t.mergeShapes = (e, r) => ({
    ...e,
    ...r
    // second overwrites first
  });
})(Zt || (Zt = {}));
const y = N.arrayToEnum([
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
]), ne = (t) => {
  switch (typeof t) {
    case "undefined":
      return y.undefined;
    case "string":
      return y.string;
    case "number":
      return Number.isNaN(t) ? y.nan : y.number;
    case "boolean":
      return y.boolean;
    case "function":
      return y.function;
    case "bigint":
      return y.bigint;
    case "symbol":
      return y.symbol;
    case "object":
      return Array.isArray(t) ? y.array : t === null ? y.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? y.promise : typeof Map < "u" && t instanceof Map ? y.map : typeof Set < "u" && t instanceof Set ? y.set : typeof Date < "u" && t instanceof Date ? y.date : y.object;
    default:
      return y.unknown;
  }
}, u = N.arrayToEnum([
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
class te extends Error {
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
          let o = n, l = 0;
          for (; l < i.path.length; ) {
            const c = i.path[l];
            l === i.path.length - 1 ? (o[c] = o[c] || { _errors: [] }, o[c]._errors.push(r(i))) : o[c] = o[c] || { _errors: [] }, o = o[c], l++;
          }
        }
    };
    return s(this), n;
  }
  static assert(e) {
    if (!(e instanceof te))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, N.jsonStringifyReplacer, 2);
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
te.create = (t) => new te(t);
const dt = (t, e) => {
  let r;
  switch (t.code) {
    case u.invalid_type:
      t.received === y.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
      break;
    case u.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(t.expected, N.jsonStringifyReplacer)}`;
      break;
    case u.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${N.joinValues(t.keys, ", ")}`;
      break;
    case u.invalid_union:
      r = "Invalid input";
      break;
    case u.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${N.joinValues(t.options)}`;
      break;
    case u.invalid_enum_value:
      r = `Invalid enum value. Expected ${N.joinValues(t.options)}, received '${t.received}'`;
      break;
    case u.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case u.invalid_return_type:
      r = "Invalid function return type";
      break;
    case u.invalid_date:
      r = "Invalid date";
      break;
    case u.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input: must end with "${t.validation.endsWith}"` : N.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r = "Invalid";
      break;
    case u.too_small:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "bigint" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : r = "Invalid input";
      break;
    case u.too_big:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : r = "Invalid input";
      break;
    case u.custom:
      r = "Invalid input";
      break;
    case u.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case u.not_multiple_of:
      r = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case u.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = e.defaultError, N.assertNever(t);
  }
  return { message: r };
};
let fn = dt;
function hn() {
  return fn;
}
const pn = (t) => {
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
  const l = n.filter((c) => !!c).slice().reverse();
  for (const c of l)
    o = c(i, { data: e, defaultError: o }).message;
  return {
    ...s,
    path: a,
    message: o
  };
};
function m(t, e) {
  const r = hn(), n = pn({
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
      r === dt ? void 0 : dt
      // then global default map
    ].filter((s) => !!s)
  });
  t.common.issues.push(n);
}
class V {
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
        return x;
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
    return V.mergeObjectSync(e, n);
  }
  static mergeObjectSync(e, r) {
    const n = {};
    for (const s of r) {
      const { key: a, value: i } = s;
      if (a.status === "aborted" || i.status === "aborted")
        return x;
      a.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof i.value < "u" || s.alwaysSet) && (n[a.value] = i.value);
    }
    return { status: e.value, value: n };
  }
}
const x = Object.freeze({
  status: "aborted"
}), Pe = (t) => ({ status: "dirty", value: t }), B = (t) => ({ status: "valid", value: t }), Mt = (t) => t.status === "aborted", Lt = (t) => t.status === "dirty", ge = (t) => t.status === "valid", De = (t) => typeof Promise < "u" && t instanceof Promise;
var g;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(g || (g = {}));
class G {
  constructor(e, r, n, s) {
    this._cachedPath = [], this.parent = e, this.data = r, this._path = n, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Dt = (t, e) => {
  if (ge(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const r = new te(t.common.issues);
      return this._error = r, this._error;
    }
  };
};
function w(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: r, required_error: n, description: s } = t;
  if (e && (r || n))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (i, o) => {
    const { message: l } = t;
    return i.code === "invalid_enum_value" ? { message: l ?? o.defaultError } : typeof o.data > "u" ? { message: l ?? n ?? o.defaultError } : i.code !== "invalid_type" ? { message: o.defaultError } : { message: l ?? r ?? o.defaultError };
  }, description: s };
}
class C {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return ne(e.data);
  }
  _getOrReturnCtx(e, r) {
    return r || {
      common: e.parent.common,
      data: e.data,
      parsedType: ne(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new V(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: ne(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const r = this._parse(e);
    if (De(r))
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
      parsedType: ne(e)
    }, s = this._parseSync({ data: e, path: n.path, parent: n });
    return Dt(n, s);
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
      parsedType: ne(e)
    };
    if (!this["~standard"].async)
      try {
        const a = this._parseSync({ data: e, path: [], parent: r });
        return ge(a) ? {
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
    return this._parseAsync({ data: e, path: [], parent: r }).then((a) => ge(a) ? {
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
      parsedType: ne(e)
    }, s = this._parse({ data: e, path: n.path, parent: n }), a = await (De(s) ? s : Promise.resolve(s));
    return Dt(n, a);
  }
  refine(e, r) {
    const n = (s) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(s) : r;
    return this._refinement((s, a) => {
      const i = e(s), o = () => a.addIssue({
        code: u.custom,
        ...n(s)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((l) => l ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
    });
  }
  refinement(e, r) {
    return this._refinement((n, s) => e(n) ? !0 : (s.addIssue(typeof r == "function" ? r(n, s) : r), !1));
  }
  _refinement(e) {
    return new _e({
      schema: this,
      typeName: b.ZodEffects,
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
    return se.create(this, this._def);
  }
  nullable() {
    return xe.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return X.create(this);
  }
  promise() {
    return He.create(this, this._def);
  }
  or(e) {
    return We.create([this, e], this._def);
  }
  and(e) {
    return Be.create(this, e, this._def);
  }
  transform(e) {
    return new _e({
      ...w(this._def),
      schema: this,
      typeName: b.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const r = typeof e == "function" ? e : () => e;
    return new ht({
      ...w(this._def),
      innerType: this,
      defaultValue: r,
      typeName: b.ZodDefault
    });
  }
  brand() {
    return new Zn({
      typeName: b.ZodBranded,
      type: this,
      ...w(this._def)
    });
  }
  catch(e) {
    const r = typeof e == "function" ? e : () => e;
    return new pt({
      ...w(this._def),
      innerType: this,
      catchValue: r,
      typeName: b.ZodCatch
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
    return xt.create(this, e);
  }
  readonly() {
    return mt.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const mn = /^c[^\s-]{8,}$/i, yn = /^[0-9a-z]+$/, gn = /^[0-9A-HJKMNP-TV-Z]{26}$/i, vn = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, bn = /^[a-z0-9_-]{21}$/i, _n = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, xn = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, wn = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, kn = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let at;
const Sn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Cn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Tn = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Nn = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, An = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Rn = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, ar = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", $n = new RegExp(`^${ar}$`);
function ir(t) {
  let e = "[0-5]\\d";
  t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`);
  const r = t.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${r}`;
}
function Pn(t) {
  return new RegExp(`^${ir(t)}$`);
}
function En(t) {
  let e = `${ar}T${ir(t)}`;
  const r = [];
  return r.push(t.local ? "Z?" : "Z"), t.offset && r.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${r.join("|")})`, new RegExp(`^${e}$`);
}
function On(t, e) {
  return !!((e === "v4" || !e) && Sn.test(t) || (e === "v6" || !e) && Tn.test(t));
}
function In(t, e) {
  if (!_n.test(t))
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
function jn(t, e) {
  return !!((e === "v4" || !e) && Cn.test(t) || (e === "v6" || !e) && Nn.test(t));
}
class ee extends C {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== y.string) {
      const a = this._getOrReturnCtx(e);
      return m(a, {
        code: u.invalid_type,
        expected: y.string,
        received: a.parsedType
      }), x;
    }
    const n = new V();
    let s;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (s = this._getOrReturnCtx(e, s), m(s, {
          code: u.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), n.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (s = this._getOrReturnCtx(e, s), m(s, {
          code: u.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), n.dirty());
      else if (a.kind === "length") {
        const i = e.data.length > a.value, o = e.data.length < a.value;
        (i || o) && (s = this._getOrReturnCtx(e, s), i ? m(s, {
          code: u.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : o && m(s, {
          code: u.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), n.dirty());
      } else if (a.kind === "email")
        wn.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
          validation: "email",
          code: u.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "emoji")
        at || (at = new RegExp(kn, "u")), at.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
          validation: "emoji",
          code: u.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "uuid")
        vn.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
          validation: "uuid",
          code: u.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "nanoid")
        bn.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
          validation: "nanoid",
          code: u.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "cuid")
        mn.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
          validation: "cuid",
          code: u.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "cuid2")
        yn.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
          validation: "cuid2",
          code: u.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "ulid")
        gn.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
          validation: "ulid",
          code: u.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), m(s, {
            validation: "url",
            code: u.invalid_string,
            message: a.message
          }), n.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
        validation: "regex",
        code: u.invalid_string,
        message: a.message
      }), n.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (s = this._getOrReturnCtx(e, s), m(s, {
        code: u.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), n.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (s = this._getOrReturnCtx(e, s), m(s, {
        code: u.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), n.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (s = this._getOrReturnCtx(e, s), m(s, {
        code: u.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), n.dirty()) : a.kind === "datetime" ? En(a).test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
        code: u.invalid_string,
        validation: "datetime",
        message: a.message
      }), n.dirty()) : a.kind === "date" ? $n.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
        code: u.invalid_string,
        validation: "date",
        message: a.message
      }), n.dirty()) : a.kind === "time" ? Pn(a).test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
        code: u.invalid_string,
        validation: "time",
        message: a.message
      }), n.dirty()) : a.kind === "duration" ? xn.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
        validation: "duration",
        code: u.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "ip" ? On(e.data, a.version) || (s = this._getOrReturnCtx(e, s), m(s, {
        validation: "ip",
        code: u.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "jwt" ? In(e.data, a.alg) || (s = this._getOrReturnCtx(e, s), m(s, {
        validation: "jwt",
        code: u.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "cidr" ? jn(e.data, a.version) || (s = this._getOrReturnCtx(e, s), m(s, {
        validation: "cidr",
        code: u.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "base64" ? An.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
        validation: "base64",
        code: u.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "base64url" ? Rn.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
        validation: "base64url",
        code: u.invalid_string,
        message: a.message
      }), n.dirty()) : N.assertNever(a);
    return { status: n.value, value: e.data };
  }
  _regex(e, r, n) {
    return this.refinement((s) => e.test(s), {
      validation: r,
      code: u.invalid_string,
      ...g.errToObj(n)
    });
  }
  _addCheck(e) {
    return new ee({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...g.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...g.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...g.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...g.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...g.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...g.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...g.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...g.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...g.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...g.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...g.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...g.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...g.errToObj(e) });
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
      ...g.errToObj(e == null ? void 0 : e.message)
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
      ...g.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...g.errToObj(e) });
  }
  regex(e, r) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...g.errToObj(r)
    });
  }
  includes(e, r) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: r == null ? void 0 : r.position,
      ...g.errToObj(r == null ? void 0 : r.message)
    });
  }
  startsWith(e, r) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...g.errToObj(r)
    });
  }
  endsWith(e, r) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...g.errToObj(r)
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...g.errToObj(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...g.errToObj(r)
    });
  }
  length(e, r) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...g.errToObj(r)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, g.errToObj(e));
  }
  trim() {
    return new ee({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ee({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ee({
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
ee.create = (t) => new ee({
  checks: [],
  typeName: b.ZodString,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...w(t)
});
function zn(t, e) {
  const r = (t.toString().split(".")[1] || "").length, n = (e.toString().split(".")[1] || "").length, s = r > n ? r : n, a = Number.parseInt(t.toFixed(s).replace(".", "")), i = Number.parseInt(e.toFixed(s).replace(".", ""));
  return a % i / 10 ** s;
}
class ve extends C {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== y.number) {
      const a = this._getOrReturnCtx(e);
      return m(a, {
        code: u.invalid_type,
        expected: y.number,
        received: a.parsedType
      }), x;
    }
    let n;
    const s = new V();
    for (const a of this._def.checks)
      a.kind === "int" ? N.isInteger(e.data) || (n = this._getOrReturnCtx(e, n), m(n, {
        code: u.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), s.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (n = this._getOrReturnCtx(e, n), m(n, {
        code: u.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (n = this._getOrReturnCtx(e, n), m(n, {
        code: u.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? zn(e.data, a.value) !== 0 && (n = this._getOrReturnCtx(e, n), m(n, {
        code: u.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (n = this._getOrReturnCtx(e, n), m(n, {
        code: u.not_finite,
        message: a.message
      }), s.dirty()) : N.assertNever(a);
    return { status: s.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, g.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, g.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, g.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, g.toString(r));
  }
  setLimit(e, r, n, s) {
    return new ve({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: n,
          message: g.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new ve({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: g.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: g.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: g.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: g.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: g.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: g.toString(r)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: g.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: g.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: g.toString(e)
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
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && N.isInteger(e.value));
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
ve.create = (t) => new ve({
  checks: [],
  typeName: b.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...w(t)
});
class Oe extends C {
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
    if (this._getType(e) !== y.bigint)
      return this._getInvalidInput(e);
    let n;
    const s = new V();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (n = this._getOrReturnCtx(e, n), m(n, {
        code: u.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (n = this._getOrReturnCtx(e, n), m(n, {
        code: u.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (n = this._getOrReturnCtx(e, n), m(n, {
        code: u.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : N.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _getInvalidInput(e) {
    const r = this._getOrReturnCtx(e);
    return m(r, {
      code: u.invalid_type,
      expected: y.bigint,
      received: r.parsedType
    }), x;
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, g.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, g.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, g.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, g.toString(r));
  }
  setLimit(e, r, n, s) {
    return new Oe({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: n,
          message: g.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Oe({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: g.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: g.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: g.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: g.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: g.toString(r)
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
Oe.create = (t) => new Oe({
  checks: [],
  typeName: b.ZodBigInt,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...w(t)
});
class Vt extends C {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== y.boolean) {
      const n = this._getOrReturnCtx(e);
      return m(n, {
        code: u.invalid_type,
        expected: y.boolean,
        received: n.parsedType
      }), x;
    }
    return B(e.data);
  }
}
Vt.create = (t) => new Vt({
  typeName: b.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...w(t)
});
class Ve extends C {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== y.date) {
      const a = this._getOrReturnCtx(e);
      return m(a, {
        code: u.invalid_type,
        expected: y.date,
        received: a.parsedType
      }), x;
    }
    if (Number.isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return m(a, {
        code: u.invalid_date
      }), x;
    }
    const n = new V();
    let s;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (s = this._getOrReturnCtx(e, s), m(s, {
        code: u.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), n.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (s = this._getOrReturnCtx(e, s), m(s, {
        code: u.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), n.dirty()) : N.assertNever(a);
    return {
      status: n.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new Ve({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: g.toString(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: g.toString(r)
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
Ve.create = (t) => new Ve({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: b.ZodDate,
  ...w(t)
});
class Wt extends C {
  _parse(e) {
    if (this._getType(e) !== y.symbol) {
      const n = this._getOrReturnCtx(e);
      return m(n, {
        code: u.invalid_type,
        expected: y.symbol,
        received: n.parsedType
      }), x;
    }
    return B(e.data);
  }
}
Wt.create = (t) => new Wt({
  typeName: b.ZodSymbol,
  ...w(t)
});
class Bt extends C {
  _parse(e) {
    if (this._getType(e) !== y.undefined) {
      const n = this._getOrReturnCtx(e);
      return m(n, {
        code: u.invalid_type,
        expected: y.undefined,
        received: n.parsedType
      }), x;
    }
    return B(e.data);
  }
}
Bt.create = (t) => new Bt({
  typeName: b.ZodUndefined,
  ...w(t)
});
class Ft extends C {
  _parse(e) {
    if (this._getType(e) !== y.null) {
      const n = this._getOrReturnCtx(e);
      return m(n, {
        code: u.invalid_type,
        expected: y.null,
        received: n.parsedType
      }), x;
    }
    return B(e.data);
  }
}
Ft.create = (t) => new Ft({
  typeName: b.ZodNull,
  ...w(t)
});
class Ht extends C {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return B(e.data);
  }
}
Ht.create = (t) => new Ht({
  typeName: b.ZodAny,
  ...w(t)
});
class ut extends C {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return B(e.data);
  }
}
ut.create = (t) => new ut({
  typeName: b.ZodUnknown,
  ...w(t)
});
class ie extends C {
  _parse(e) {
    const r = this._getOrReturnCtx(e);
    return m(r, {
      code: u.invalid_type,
      expected: y.never,
      received: r.parsedType
    }), x;
  }
}
ie.create = (t) => new ie({
  typeName: b.ZodNever,
  ...w(t)
});
class Ut extends C {
  _parse(e) {
    if (this._getType(e) !== y.undefined) {
      const n = this._getOrReturnCtx(e);
      return m(n, {
        code: u.invalid_type,
        expected: y.void,
        received: n.parsedType
      }), x;
    }
    return B(e.data);
  }
}
Ut.create = (t) => new Ut({
  typeName: b.ZodVoid,
  ...w(t)
});
class X extends C {
  _parse(e) {
    const { ctx: r, status: n } = this._processInputParams(e), s = this._def;
    if (r.parsedType !== y.array)
      return m(r, {
        code: u.invalid_type,
        expected: y.array,
        received: r.parsedType
      }), x;
    if (s.exactLength !== null) {
      const i = r.data.length > s.exactLength.value, o = r.data.length < s.exactLength.value;
      (i || o) && (m(r, {
        code: i ? u.too_big : u.too_small,
        minimum: o ? s.exactLength.value : void 0,
        maximum: i ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), n.dirty());
    }
    if (s.minLength !== null && r.data.length < s.minLength.value && (m(r, {
      code: u.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), n.dirty()), s.maxLength !== null && r.data.length > s.maxLength.value && (m(r, {
      code: u.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), n.dirty()), r.common.async)
      return Promise.all([...r.data].map((i, o) => s.type._parseAsync(new G(r, i, r.path, o)))).then((i) => V.mergeArray(n, i));
    const a = [...r.data].map((i, o) => s.type._parseSync(new G(r, i, r.path, o)));
    return V.mergeArray(n, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, r) {
    return new X({
      ...this._def,
      minLength: { value: e, message: g.toString(r) }
    });
  }
  max(e, r) {
    return new X({
      ...this._def,
      maxLength: { value: e, message: g.toString(r) }
    });
  }
  length(e, r) {
    return new X({
      ...this._def,
      exactLength: { value: e, message: g.toString(r) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
X.create = (t, e) => new X({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: b.ZodArray,
  ...w(e)
});
function ye(t) {
  if (t instanceof j) {
    const e = {};
    for (const r in t.shape) {
      const n = t.shape[r];
      e[r] = se.create(ye(n));
    }
    return new j({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof X ? new X({
    ...t._def,
    type: ye(t.element)
  }) : t instanceof se ? se.create(ye(t.unwrap())) : t instanceof xe ? xe.create(ye(t.unwrap())) : t instanceof fe ? fe.create(t.items.map((e) => ye(e))) : t;
}
class j extends C {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), r = N.objectKeys(e);
    return this._cached = { shape: e, keys: r }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== y.object) {
      const c = this._getOrReturnCtx(e);
      return m(c, {
        code: u.invalid_type,
        expected: y.object,
        received: c.parsedType
      }), x;
    }
    const { status: n, ctx: s } = this._processInputParams(e), { shape: a, keys: i } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof ie && this._def.unknownKeys === "strip"))
      for (const c in s.data)
        i.includes(c) || o.push(c);
    const l = [];
    for (const c of i) {
      const d = a[c], f = s.data[c];
      l.push({
        key: { status: "valid", value: c },
        value: d._parse(new G(s, f, s.path, c)),
        alwaysSet: c in s.data
      });
    }
    if (this._def.catchall instanceof ie) {
      const c = this._def.unknownKeys;
      if (c === "passthrough")
        for (const d of o)
          l.push({
            key: { status: "valid", value: d },
            value: { status: "valid", value: s.data[d] }
          });
      else if (c === "strict")
        o.length > 0 && (m(s, {
          code: u.unrecognized_keys,
          keys: o
        }), n.dirty());
      else if (c !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const c = this._def.catchall;
      for (const d of o) {
        const f = s.data[d];
        l.push({
          key: { status: "valid", value: d },
          value: c._parse(
            new G(s, f, s.path, d)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: d in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const c = [];
      for (const d of l) {
        const f = await d.key, h = await d.value;
        c.push({
          key: f,
          value: h,
          alwaysSet: d.alwaysSet
        });
      }
      return c;
    }).then((c) => V.mergeObjectSync(n, c)) : V.mergeObjectSync(n, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return g.errToObj, new j({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (r, n) => {
          var a, i;
          const s = ((i = (a = this._def).errorMap) == null ? void 0 : i.call(a, r, n).message) ?? n.defaultError;
          return r.code === "unrecognized_keys" ? {
            message: g.errToObj(e).message ?? s
          } : {
            message: s
          };
        }
      } : {}
    });
  }
  strip() {
    return new j({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new j({
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
    return new j({
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
    return new j({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: b.ZodObject
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
    return new j({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const r = {};
    for (const n of N.objectKeys(e))
      e[n] && this.shape[n] && (r[n] = this.shape[n]);
    return new j({
      ...this._def,
      shape: () => r
    });
  }
  omit(e) {
    const r = {};
    for (const n of N.objectKeys(this.shape))
      e[n] || (r[n] = this.shape[n]);
    return new j({
      ...this._def,
      shape: () => r
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return ye(this);
  }
  partial(e) {
    const r = {};
    for (const n of N.objectKeys(this.shape)) {
      const s = this.shape[n];
      e && !e[n] ? r[n] = s : r[n] = s.optional();
    }
    return new j({
      ...this._def,
      shape: () => r
    });
  }
  required(e) {
    const r = {};
    for (const n of N.objectKeys(this.shape))
      if (e && !e[n])
        r[n] = this.shape[n];
      else {
        let a = this.shape[n];
        for (; a instanceof se; )
          a = a._def.innerType;
        r[n] = a;
      }
    return new j({
      ...this._def,
      shape: () => r
    });
  }
  keyof() {
    return or(N.objectKeys(this.shape));
  }
}
j.create = (t, e) => new j({
  shape: () => t,
  unknownKeys: "strip",
  catchall: ie.create(),
  typeName: b.ZodObject,
  ...w(e)
});
j.strictCreate = (t, e) => new j({
  shape: () => t,
  unknownKeys: "strict",
  catchall: ie.create(),
  typeName: b.ZodObject,
  ...w(e)
});
j.lazycreate = (t, e) => new j({
  shape: t,
  unknownKeys: "strip",
  catchall: ie.create(),
  typeName: b.ZodObject,
  ...w(e)
});
class We extends C {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = this._def.options;
    function s(a) {
      for (const o of a)
        if (o.result.status === "valid")
          return o.result;
      for (const o of a)
        if (o.result.status === "dirty")
          return r.common.issues.push(...o.ctx.common.issues), o.result;
      const i = a.map((o) => new te(o.ctx.common.issues));
      return m(r, {
        code: u.invalid_union,
        unionErrors: i
      }), x;
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
      for (const l of n) {
        const c = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        }, d = l._parseSync({
          data: r.data,
          path: r.path,
          parent: c
        });
        if (d.status === "valid")
          return d;
        d.status === "dirty" && !a && (a = { result: d, ctx: c }), c.common.issues.length && i.push(c.common.issues);
      }
      if (a)
        return r.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((l) => new te(l));
      return m(r, {
        code: u.invalid_union,
        unionErrors: o
      }), x;
    }
  }
  get options() {
    return this._def.options;
  }
}
We.create = (t, e) => new We({
  options: t,
  typeName: b.ZodUnion,
  ...w(e)
});
function ft(t, e) {
  const r = ne(t), n = ne(e);
  if (t === e)
    return { valid: !0, data: t };
  if (r === y.object && n === y.object) {
    const s = N.objectKeys(e), a = N.objectKeys(t).filter((o) => s.indexOf(o) !== -1), i = { ...t, ...e };
    for (const o of a) {
      const l = ft(t[o], e[o]);
      if (!l.valid)
        return { valid: !1 };
      i[o] = l.data;
    }
    return { valid: !0, data: i };
  } else if (r === y.array && n === y.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let a = 0; a < t.length; a++) {
      const i = t[a], o = e[a], l = ft(i, o);
      if (!l.valid)
        return { valid: !1 };
      s.push(l.data);
    }
    return { valid: !0, data: s };
  } else return r === y.date && n === y.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class Be extends C {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e), s = (a, i) => {
      if (Mt(a) || Mt(i))
        return x;
      const o = ft(a.value, i.value);
      return o.valid ? ((Lt(a) || Lt(i)) && r.dirty(), { status: r.value, value: o.data }) : (m(n, {
        code: u.invalid_intersection_types
      }), x);
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
Be.create = (t, e, r) => new Be({
  left: t,
  right: e,
  typeName: b.ZodIntersection,
  ...w(r)
});
class fe extends C {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== y.array)
      return m(n, {
        code: u.invalid_type,
        expected: y.array,
        received: n.parsedType
      }), x;
    if (n.data.length < this._def.items.length)
      return m(n, {
        code: u.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), x;
    !this._def.rest && n.data.length > this._def.items.length && (m(n, {
      code: u.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const a = [...n.data].map((i, o) => {
      const l = this._def.items[o] || this._def.rest;
      return l ? l._parse(new G(n, i, n.path, o)) : null;
    }).filter((i) => !!i);
    return n.common.async ? Promise.all(a).then((i) => V.mergeArray(r, i)) : V.mergeArray(r, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new fe({
      ...this._def,
      rest: e
    });
  }
}
fe.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new fe({
    items: t,
    typeName: b.ZodTuple,
    rest: null,
    ...w(e)
  });
};
class Fe extends C {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== y.object)
      return m(n, {
        code: u.invalid_type,
        expected: y.object,
        received: n.parsedType
      }), x;
    const s = [], a = this._def.keyType, i = this._def.valueType;
    for (const o in n.data)
      s.push({
        key: a._parse(new G(n, o, n.path, o)),
        value: i._parse(new G(n, n.data[o], n.path, o)),
        alwaysSet: o in n.data
      });
    return n.common.async ? V.mergeObjectAsync(r, s) : V.mergeObjectSync(r, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, r, n) {
    return r instanceof C ? new Fe({
      keyType: e,
      valueType: r,
      typeName: b.ZodRecord,
      ...w(n)
    }) : new Fe({
      keyType: ee.create(),
      valueType: e,
      typeName: b.ZodRecord,
      ...w(r)
    });
  }
}
class qt extends C {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== y.map)
      return m(n, {
        code: u.invalid_type,
        expected: y.map,
        received: n.parsedType
      }), x;
    const s = this._def.keyType, a = this._def.valueType, i = [...n.data.entries()].map(([o, l], c) => ({
      key: s._parse(new G(n, o, n.path, [c, "key"])),
      value: a._parse(new G(n, l, n.path, [c, "value"]))
    }));
    if (n.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const l of i) {
          const c = await l.key, d = await l.value;
          if (c.status === "aborted" || d.status === "aborted")
            return x;
          (c.status === "dirty" || d.status === "dirty") && r.dirty(), o.set(c.value, d.value);
        }
        return { status: r.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const l of i) {
        const c = l.key, d = l.value;
        if (c.status === "aborted" || d.status === "aborted")
          return x;
        (c.status === "dirty" || d.status === "dirty") && r.dirty(), o.set(c.value, d.value);
      }
      return { status: r.value, value: o };
    }
  }
}
qt.create = (t, e, r) => new qt({
  valueType: e,
  keyType: t,
  typeName: b.ZodMap,
  ...w(r)
});
class Ie extends C {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== y.set)
      return m(n, {
        code: u.invalid_type,
        expected: y.set,
        received: n.parsedType
      }), x;
    const s = this._def;
    s.minSize !== null && n.data.size < s.minSize.value && (m(n, {
      code: u.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), r.dirty()), s.maxSize !== null && n.data.size > s.maxSize.value && (m(n, {
      code: u.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), r.dirty());
    const a = this._def.valueType;
    function i(l) {
      const c = /* @__PURE__ */ new Set();
      for (const d of l) {
        if (d.status === "aborted")
          return x;
        d.status === "dirty" && r.dirty(), c.add(d.value);
      }
      return { status: r.value, value: c };
    }
    const o = [...n.data.values()].map((l, c) => a._parse(new G(n, l, n.path, c)));
    return n.common.async ? Promise.all(o).then((l) => i(l)) : i(o);
  }
  min(e, r) {
    return new Ie({
      ...this._def,
      minSize: { value: e, message: g.toString(r) }
    });
  }
  max(e, r) {
    return new Ie({
      ...this._def,
      maxSize: { value: e, message: g.toString(r) }
    });
  }
  size(e, r) {
    return this.min(e, r).max(e, r);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Ie.create = (t, e) => new Ie({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: b.ZodSet,
  ...w(e)
});
class Yt extends C {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
Yt.create = (t, e) => new Yt({
  getter: t,
  typeName: b.ZodLazy,
  ...w(e)
});
class Xt extends C {
  _parse(e) {
    if (e.data !== this._def.value) {
      const r = this._getOrReturnCtx(e);
      return m(r, {
        received: r.data,
        code: u.invalid_literal,
        expected: this._def.value
      }), x;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Xt.create = (t, e) => new Xt({
  value: t,
  typeName: b.ZodLiteral,
  ...w(e)
});
function or(t, e) {
  return new be({
    values: t,
    typeName: b.ZodEnum,
    ...w(e)
  });
}
class be extends C {
  _parse(e) {
    if (typeof e.data != "string") {
      const r = this._getOrReturnCtx(e), n = this._def.values;
      return m(r, {
        expected: N.joinValues(n),
        received: r.parsedType,
        code: u.invalid_type
      }), x;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const r = this._getOrReturnCtx(e), n = this._def.values;
      return m(r, {
        received: r.data,
        code: u.invalid_enum_value,
        options: n
      }), x;
    }
    return B(e.data);
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
    return be.create(e, {
      ...this._def,
      ...r
    });
  }
  exclude(e, r = this._def) {
    return be.create(this.options.filter((n) => !e.includes(n)), {
      ...this._def,
      ...r
    });
  }
}
be.create = or;
class Gt extends C {
  _parse(e) {
    const r = N.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
    if (n.parsedType !== y.string && n.parsedType !== y.number) {
      const s = N.objectValues(r);
      return m(n, {
        expected: N.joinValues(s),
        received: n.parsedType,
        code: u.invalid_type
      }), x;
    }
    if (this._cache || (this._cache = new Set(N.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const s = N.objectValues(r);
      return m(n, {
        received: n.data,
        code: u.invalid_enum_value,
        options: s
      }), x;
    }
    return B(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Gt.create = (t, e) => new Gt({
  values: t,
  typeName: b.ZodNativeEnum,
  ...w(e)
});
class He extends C {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== y.promise && r.common.async === !1)
      return m(r, {
        code: u.invalid_type,
        expected: y.promise,
        received: r.parsedType
      }), x;
    const n = r.parsedType === y.promise ? r.data : Promise.resolve(r.data);
    return B(n.then((s) => this._def.type.parseAsync(s, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
He.create = (t, e) => new He({
  type: t,
  typeName: b.ZodPromise,
  ...w(e)
});
class _e extends C {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === b.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e), s = this._def.effect || null, a = {
      addIssue: (i) => {
        m(n, i), i.fatal ? r.abort() : r.dirty();
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
            return x;
          const l = await this._def.schema._parseAsync({
            data: o,
            path: n.path,
            parent: n
          });
          return l.status === "aborted" ? x : l.status === "dirty" || r.value === "dirty" ? Pe(l.value) : l;
        });
      {
        if (r.value === "aborted")
          return x;
        const o = this._def.schema._parseSync({
          data: i,
          path: n.path,
          parent: n
        });
        return o.status === "aborted" ? x : o.status === "dirty" || r.value === "dirty" ? Pe(o.value) : o;
      }
    }
    if (s.type === "refinement") {
      const i = (o) => {
        const l = s.refinement(o, a);
        if (n.common.async)
          return Promise.resolve(l);
        if (l instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (n.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return o.status === "aborted" ? x : (o.status === "dirty" && r.dirty(), i(o.value), { status: r.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((o) => o.status === "aborted" ? x : (o.status === "dirty" && r.dirty(), i(o.value).then(() => ({ status: r.value, value: o.value }))));
    }
    if (s.type === "transform")
      if (n.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        if (!ge(i))
          return x;
        const o = s.transform(i.value, a);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((i) => ge(i) ? Promise.resolve(s.transform(i.value, a)).then((o) => ({
          status: r.value,
          value: o
        })) : x);
    N.assertNever(s);
  }
}
_e.create = (t, e, r) => new _e({
  schema: t,
  typeName: b.ZodEffects,
  effect: e,
  ...w(r)
});
_e.createWithPreprocess = (t, e, r) => new _e({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: b.ZodEffects,
  ...w(r)
});
class se extends C {
  _parse(e) {
    return this._getType(e) === y.undefined ? B(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
se.create = (t, e) => new se({
  innerType: t,
  typeName: b.ZodOptional,
  ...w(e)
});
class xe extends C {
  _parse(e) {
    return this._getType(e) === y.null ? B(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
xe.create = (t, e) => new xe({
  innerType: t,
  typeName: b.ZodNullable,
  ...w(e)
});
class ht extends C {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    let n = r.data;
    return r.parsedType === y.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ht.create = (t, e) => new ht({
  innerType: t,
  typeName: b.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...w(e)
});
class pt extends C {
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
    return De(s) ? s.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new te(n.common.issues);
        },
        input: n.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new te(n.common.issues);
        },
        input: n.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
pt.create = (t, e) => new pt({
  innerType: t,
  typeName: b.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...w(e)
});
class Jt extends C {
  _parse(e) {
    if (this._getType(e) !== y.nan) {
      const n = this._getOrReturnCtx(e);
      return m(n, {
        code: u.invalid_type,
        expected: y.nan,
        received: n.parsedType
      }), x;
    }
    return { status: "valid", value: e.data };
  }
}
Jt.create = (t) => new Jt({
  typeName: b.ZodNaN,
  ...w(t)
});
class Zn extends C {
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
class xt extends C {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return a.status === "aborted" ? x : a.status === "dirty" ? (r.dirty(), Pe(a.value)) : this._def.out._parseAsync({
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
      return s.status === "aborted" ? x : s.status === "dirty" ? (r.dirty(), {
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
    return new xt({
      in: e,
      out: r,
      typeName: b.ZodPipeline
    });
  }
}
class mt extends C {
  _parse(e) {
    const r = this._def.innerType._parse(e), n = (s) => (ge(s) && (s.value = Object.freeze(s.value)), s);
    return De(r) ? r.then((s) => n(s)) : n(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
mt.create = (t, e) => new mt({
  innerType: t,
  typeName: b.ZodReadonly,
  ...w(e)
});
var b;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(b || (b = {}));
const _ = ee.create, cr = ve.create, wt = ut.create;
ie.create;
const Mn = X.create, Z = j.create;
We.create;
Be.create;
fe.create;
const Ye = Fe.create, he = be.create;
He.create;
se.create;
xe.create;
Z({
  taskId: _(),
  title: _(),
  userId: _()
});
Z({
  taskId: _(),
  changes: Ye(wt())
});
Z({
  taskId: _()
});
Z({
  reportId: _(),
  type: _(),
  title: _().optional()
});
Z({
  userId: _(),
  email: _(),
  timestamp: _()
});
Z({
  message: _(),
  variant: he(["info", "success", "error", "warning"]).default("info"),
  title: _().optional()
});
Z({
  pluginId: _(),
  error: _(),
  stack: _().optional()
});
Z({
  pluginId: _(),
  version: _().optional()
});
const Ln = Z({
  id: _().min(1),
  name: _().min(1),
  version: _().regex(/^\d+\.\d+\.\d+$/),
  description: _(),
  author: _(),
  entry: _(),
  hostCompatibility: _().default("^1.0.0"),
  permissions: Mn(he(dn)).default([]),
  dependencies: Ye(_()).optional(),
  icon: _().optional(),
  category: _().optional()
});
Z({
  path: _(),
  label: _().optional(),
  permission: _().optional()
});
Z({
  slot: he(un),
  priority: cr().default(0)
});
Z({
  label: _(),
  path: _(),
  icon: _().optional(),
  section: _().optional(),
  order: cr().default(0)
});
Z({
  email: _().email(),
  password: _().min(6)
});
Z({
  version: _().optional()
});
Z({
  version: _()
});
Ye(wt());
const Dn = Z({
  title: _().min(1),
  description: _().optional(),
  status: he(["todo", "in_progress", "done"]).default("todo"),
  priority: he(["low", "medium", "high"]).default("medium")
});
Dn.partial();
Z({
  type: he(["tasks", "activity", "usage"]),
  format: he(["json", "csv"]).default("json"),
  title: _().optional()
});
Z({
  pluginId: _(),
  event: _(),
  payload: Ye(wt()).optional(),
  timestamp: _().optional()
});
function lr() {
  const t = typeof window < "u" ? window.__FPP_HOST_BRIDGE__ : null;
  if (!t)
    throw new Error("[PluginSDK] Host bridge not initialized");
  return t;
}
function Vn(t) {
  return lr().getContext({ id: t });
}
function Wn(t) {
  const e = Ln.safeParse(t.manifest);
  if (!e.success)
    throw new Error(
      `[PluginSDK] Invalid manifest: ${e.error.message}`
    );
  t.manifest.id;
  try {
    lr().registerContributions(t);
  } finally {
  }
}
const Bn = ke(null);
function Fn() {
  const t = Se(Bn);
  if (!t)
    throw new Error(
      "[PluginSDK] usePluginId must be used within PluginIdProvider (wrap plugin UI in PluginBoundary)"
    );
  return t;
}
function Re(t, e) {
  const r = Fn();
  W(() => Vn(r).events.subscribe(t, e), [r, t, e]);
}
const Hn = "com.fpp.notifications", Un = "Notifications", qn = "1.0.0", Yn = "Toast notifications, event alerts, and activity feed.", Xn = "FPP Team", Gn = "/plugins/com.fpp.notifications/index.js", Jn = "^1.0.0", Qn = ["notifications:read", "notifications:write", "events:task.*", "events:report.*", "events:user.*"], Kn = "bell", es = "Communication", ts = {
  id: Hn,
  name: Un,
  version: qn,
  description: Yn,
  author: Xn,
  entry: Gn,
  hostCompatibility: Jn,
  permissions: Qn,
  icon: Kn,
  category: es
};
function kt(t) {
  return Object.keys(t);
}
function rs(t) {
  return t.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
function it(t) {
  return t === "0rem" ? "0rem" : `calc(${t} * var(--mantine-scale))`;
}
function dr(t, { shouldScale: e = !1 } = {}) {
  function r(n) {
    if (n === 0 || n === "0")
      return `0${t}`;
    if (typeof n == "number") {
      const s = `${n / 16}${t}`;
      return e ? it(s) : s;
    }
    if (typeof n == "string") {
      if (n === "" || n.startsWith("calc(") || n.startsWith("clamp(") || n.includes("rgba("))
        return n;
      if (n.includes(","))
        return n.split(",").map((a) => r(a)).join(",");
      if (n.includes(" "))
        return n.split(" ").map((a) => r(a)).join(" ");
      if (n.includes(t))
        return e ? it(n) : n;
      const s = n.replace("px", "");
      if (!Number.isNaN(Number(s))) {
        const a = `${Number(s) / 16}${t}`;
        return e ? it(a) : a;
      }
    }
    return n;
  }
  return r;
}
const J = dr("rem", { shouldScale: !0 });
dr("em");
function St(t) {
  return Object.keys(t).reduce((e, r) => (t[r] !== void 0 && (e[r] = t[r]), e), {});
}
function ur(t) {
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
function Ct(t) {
  const e = ke(null);
  return [({ children: s, value: a }) => /* @__PURE__ */ v(e.Provider, { value: a, children: s }), () => {
    const s = Se(e);
    if (s === null)
      throw new Error(t);
    return s;
  }];
}
function ae(t, e = "size", r = !0) {
  if (t !== void 0)
    return ur(t) ? r ? J(t) : t : `var(--${e}-${t})`;
}
function Xe(t) {
  return ae(t, "mantine-spacing");
}
function fr(t) {
  return t === void 0 ? "var(--mantine-radius-default)" : ae(t, "mantine-radius");
}
function ns(t) {
  return ae(t, "mantine-font-size");
}
function ss(t) {
  return ae(t, "mantine-line-height", !1);
}
function as(t) {
  if (t)
    return ae(t, "mantine-shadow", !1);
}
function le(t) {
  const e = U(t);
  return W(() => {
    e.current = t;
  }), sn(() => (...r) => {
    var n;
    return (n = e.current) == null ? void 0 : n.call(e, ...r);
  }, []);
}
function Ge(t, e) {
  const r = typeof e == "number" ? e : e.delay, n = typeof e == "number" ? !1 : e.flushOnUnmount, s = le(t), a = U(0), i = U(() => {
  }), o = Object.assign(
    re(
      (...l) => {
        window.clearTimeout(a.current);
        const c = () => {
          a.current !== 0 && (a.current = 0, s(...l));
        };
        i.current = c, o.flush = c, a.current = window.setTimeout(c, r);
      },
      [s, r]
    ),
    { flush: i.current }
  );
  return W(
    () => () => {
      window.clearTimeout(a.current), n && o.flush();
    },
    [o, n]
  ), o;
}
const is = typeof document < "u" ? an : W;
function Qt(t, e) {
  if (typeof t == "function")
    return t(e);
  typeof t == "object" && t !== null && "current" in t && (t.current = e);
}
function os(...t) {
  const e = /* @__PURE__ */ new Map();
  return (r) => {
    if (t.forEach((n) => {
      const s = Qt(n, r);
      s && e.set(n, s);
    }), e.size > 0)
      return () => {
        t.forEach((n) => {
          const s = e.get(n);
          s ? s() : Qt(n, null);
        }), e.clear();
      };
  };
}
function Ce(...t) {
  return re(os(...t), t);
}
function hr(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (e = 0; e < s; e++) t[e] && (r = hr(t[e])) && (n && (n += " "), n += r);
  } else for (r in t) t[r] && (n && (n += " "), n += r);
  return n;
}
function Je() {
  for (var t, e, r = 0, n = "", s = arguments.length; r < s; r++) (t = arguments[r]) && (e = hr(t)) && (n && (n += " "), n += e);
  return n;
}
const cs = {};
function ls(t) {
  const e = {};
  return t.forEach((r) => {
    Object.entries(r).forEach(([n, s]) => {
      e[n] ? e[n] = Je(e[n], s) : e[n] = s;
    });
  }), e;
}
function Tt({ theme: t, classNames: e, props: r, stylesCtx: n }) {
  const a = (Array.isArray(e) ? e : [e]).map(
    (i) => typeof i == "function" ? i(t, r, n) : i || cs
  );
  return ls(a);
}
function yt({ theme: t, styles: e, props: r, stylesCtx: n }) {
  return (Array.isArray(e) ? e : [e]).reduce((a, i) => typeof i == "function" ? { ...a, ...i(t, r, n) } : { ...a, ...i }, {});
}
const ds = ke(null);
function Te() {
  const t = Se(ds);
  if (!t)
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  return t;
}
function us() {
  return Te().classNamesPrefix;
}
function fs() {
  return Te().getStyleNonce;
}
function hs() {
  return Te().withStaticClasses;
}
function ps() {
  return Te().headless;
}
function ms() {
  var t;
  return (t = Te().stylesTransform) == null ? void 0 : t.sx;
}
function ys() {
  var t;
  return (t = Te().stylesTransform) == null ? void 0 : t.styles;
}
function gs(t) {
  return /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i.test(t);
}
function vs(t) {
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
function bs(t) {
  const [e, r, n, s] = t.replace(/[^0-9,./]/g, "").split(/[/,]/).map(Number);
  return { r: e, g: r, b: n, a: s === void 0 ? 1 : s };
}
function _s(t) {
  const e = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i, r = t.match(e);
  if (!r)
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  const n = parseInt(r[1], 10), s = parseInt(r[2], 10) / 100, a = parseInt(r[3], 10) / 100, i = r[5] ? parseFloat(r[5]) : void 0, o = (1 - Math.abs(2 * a - 1)) * s, l = n / 60, c = o * (1 - Math.abs(l % 2 - 1)), d = a - o / 2;
  let f, h, p;
  return l >= 0 && l < 1 ? (f = o, h = c, p = 0) : l >= 1 && l < 2 ? (f = c, h = o, p = 0) : l >= 2 && l < 3 ? (f = 0, h = o, p = c) : l >= 3 && l < 4 ? (f = 0, h = c, p = o) : l >= 4 && l < 5 ? (f = c, h = 0, p = o) : (f = o, h = 0, p = c), {
    r: Math.round((f + d) * 255),
    g: Math.round((h + d) * 255),
    b: Math.round((p + d) * 255),
    a: i || 1
  };
}
function xs(t) {
  return gs(t) ? vs(t) : t.startsWith("rgb") ? bs(t) : t.startsWith("hsl") ? _s(t) : {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function ws(t, e) {
  return typeof t.primaryShade == "number" ? t.primaryShade : e === "dark" ? t.primaryShade.dark : t.primaryShade.light;
}
function ot(t) {
  return t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4;
}
function ks(t) {
  const e = t.match(/oklch\((.*?)%\s/);
  return e ? parseFloat(e[1]) : null;
}
function Ss(t) {
  if (t.startsWith("oklch("))
    return (ks(t) || 0) / 100;
  const { r: e, g: r, b: n } = xs(t), s = e / 255, a = r / 255, i = n / 255, o = ot(s), l = ot(a), c = ot(i);
  return 0.2126 * o + 0.7152 * l + 0.0722 * c;
}
function $e(t, e = 0.179) {
  return t.startsWith("var(") ? !1 : Ss(t) > e;
}
function Nt({
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
      isLight: $e(
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
      isLight: $e(
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
      isLight: $e(
        t === "white" ? e.white : e.black,
        e.luminanceThreshold
      ),
      variable: `--mantine-color-${t}`
    };
  const [n, s] = t.split("."), a = s ? Number(s) : void 0, i = n in e.colors;
  if (i) {
    const o = a !== void 0 ? e.colors[n][a] : e.colors[n][ws(e, r || "light")];
    return {
      color: n,
      value: o,
      shade: a,
      isThemeColor: i,
      isLight: $e(o, e.luminanceThreshold),
      variable: s ? `--mantine-color-${n}-${a}` : `--mantine-color-${n}-filled`
    };
  }
  return {
    color: t,
    value: t,
    isThemeColor: i,
    isLight: $e(t, e.luminanceThreshold),
    shade: a,
    variable: void 0
  };
}
function Ue(t, e) {
  const r = Nt({ color: t || e.primaryColor, theme: e });
  return r.variable ? `var(${r.variable})` : t;
}
function Cs(t, e) {
  const r = {
    from: (t == null ? void 0 : t.from) || e.defaultGradient.from,
    to: (t == null ? void 0 : t.to) || e.defaultGradient.to,
    deg: (t == null ? void 0 : t.deg) ?? e.defaultGradient.deg ?? 0
  }, n = Ue(r.from, e), s = Ue(r.to, e);
  return `linear-gradient(${r.deg}deg, ${n} 0%, ${s} 100%)`;
}
const Ts = ke(null);
function Qe() {
  const t = Se(Ts);
  if (!t)
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  return t;
}
const Ns = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function As({ theme: t, options: e, unstyled: r }) {
  return Je(
    (e == null ? void 0 : e.focusable) && !r && (t.focusClassName || Ns[t.focusRing]),
    (e == null ? void 0 : e.active) && !r && t.activeClassName
  );
}
function Rs({
  selector: t,
  stylesCtx: e,
  options: r,
  props: n,
  theme: s
}) {
  return Tt({
    theme: s,
    classNames: r == null ? void 0 : r.classNames,
    props: (r == null ? void 0 : r.props) || n,
    stylesCtx: e
  })[t];
}
function Kt({
  selector: t,
  stylesCtx: e,
  theme: r,
  classNames: n,
  props: s
}) {
  return Tt({ theme: r, classNames: n, props: s, stylesCtx: e })[t];
}
function $s({ rootSelector: t, selector: e, className: r }) {
  return t === e ? r : void 0;
}
function Ps({ selector: t, classes: e, unstyled: r }) {
  return r ? void 0 : e[t];
}
function Es({
  themeName: t,
  classNamesPrefix: e,
  selector: r,
  withStaticClass: n
}) {
  return n === !1 ? [] : t.map((s) => `${e}-${s}-${r}`);
}
function Os({
  themeName: t,
  theme: e,
  selector: r,
  props: n,
  stylesCtx: s
}) {
  return t.map(
    (a) => {
      var i, o;
      return (o = Tt({
        theme: e,
        classNames: (i = e.components[a]) == null ? void 0 : i.classNames,
        props: n,
        stylesCtx: s
      })) == null ? void 0 : o[r];
    }
  );
}
function Is({
  options: t,
  classes: e,
  selector: r,
  unstyled: n
}) {
  return t != null && t.variant && !n ? e[`${r}--${t.variant}`] : void 0;
}
function js({
  theme: t,
  options: e,
  themeName: r,
  selector: n,
  classNamesPrefix: s,
  classNames: a,
  classes: i,
  unstyled: o,
  className: l,
  rootSelector: c,
  props: d,
  stylesCtx: f,
  withStaticClasses: h,
  headless: p,
  transformedStyles: k
}) {
  return Je(
    As({ theme: t, options: e, unstyled: o || p }),
    Os({ theme: t, themeName: r, selector: n, props: d, stylesCtx: f }),
    Is({ options: e, classes: i, selector: n, unstyled: o }),
    Kt({ selector: n, stylesCtx: f, theme: t, classNames: a, props: d }),
    Kt({ selector: n, stylesCtx: f, theme: t, classNames: k, props: d }),
    Rs({ selector: n, stylesCtx: f, options: e, props: d, theme: t }),
    $s({ rootSelector: c, selector: n, className: l }),
    Ps({ selector: n, classes: i, unstyled: o || p }),
    h && !p && Es({
      themeName: r,
      classNamesPrefix: s,
      selector: n,
      withStaticClass: e == null ? void 0 : e.withStaticClass
    }),
    e == null ? void 0 : e.className
  );
}
function zs({
  theme: t,
  themeName: e,
  props: r,
  stylesCtx: n,
  selector: s
}) {
  return e.map(
    (a) => {
      var i;
      return yt({
        theme: t,
        styles: (i = t.components[a]) == null ? void 0 : i.styles,
        props: r,
        stylesCtx: n
      })[s];
    }
  ).reduce((a, i) => ({ ...a, ...i }), {});
}
function gt({ style: t, theme: e }) {
  return Array.isArray(t) ? [...t].reduce(
    (r, n) => ({ ...r, ...gt({ style: n, theme: e }) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function Zs(t) {
  return t.reduce((e, r) => (r && Object.keys(r).forEach((n) => {
    e[n] = { ...e[n], ...St(r[n]) };
  }), e), {});
}
function Ms({
  vars: t,
  varsResolver: e,
  theme: r,
  props: n,
  stylesCtx: s,
  selector: a,
  themeName: i,
  headless: o
}) {
  var l;
  return (l = Zs([
    o ? {} : e == null ? void 0 : e(r, n, s),
    ...i.map((c) => {
      var d, f, h;
      return (h = (f = (d = r.components) == null ? void 0 : d[c]) == null ? void 0 : f.vars) == null ? void 0 : h.call(f, r, n, s);
    }),
    t == null ? void 0 : t(r, n, s)
  ])) == null ? void 0 : l[a];
}
function Ls({
  theme: t,
  themeName: e,
  selector: r,
  options: n,
  props: s,
  stylesCtx: a,
  rootSelector: i,
  styles: o,
  style: l,
  vars: c,
  varsResolver: d,
  headless: f,
  withStylesTransform: h
}) {
  return {
    ...!h && zs({ theme: t, themeName: e, props: s, stylesCtx: a, selector: r }),
    ...!h && yt({ theme: t, styles: o, props: s, stylesCtx: a })[r],
    ...!h && yt({ theme: t, styles: n == null ? void 0 : n.styles, props: (n == null ? void 0 : n.props) || s, stylesCtx: a })[r],
    ...Ms({ theme: t, props: s, stylesCtx: a, vars: c, varsResolver: d, selector: r, themeName: e, headless: f }),
    ...i === r ? gt({ style: l, theme: t }) : null,
    ...gt({ style: n == null ? void 0 : n.style, theme: t })
  };
}
function Ds({ props: t, stylesCtx: e, themeName: r }) {
  var i;
  const n = Qe(), s = (i = ys()) == null ? void 0 : i();
  return {
    getTransformedStyles: (o) => s ? [
      ...o.map(
        (c) => s(c, { props: t, theme: n, ctx: e })
      ),
      ...r.map(
        (c) => {
          var d;
          return s((d = n.components[c]) == null ? void 0 : d.styles, { props: t, theme: n, ctx: e });
        }
      )
    ].filter(Boolean) : [],
    withStylesTransform: !!s
  };
}
function oe({
  name: t,
  classes: e,
  props: r,
  stylesCtx: n,
  className: s,
  style: a,
  rootSelector: i = "root",
  unstyled: o,
  classNames: l,
  styles: c,
  vars: d,
  varsResolver: f
}) {
  const h = Qe(), p = us(), k = hs(), T = ps(), S = (Array.isArray(t) ? t : [t]).filter((R) => R), { withStylesTransform: $, getTransformedStyles: E } = Ds({
    props: r,
    stylesCtx: n,
    themeName: S
  });
  return (R, P) => ({
    className: js({
      theme: h,
      options: P,
      themeName: S,
      selector: R,
      classNamesPrefix: p,
      classNames: l,
      classes: e,
      unstyled: o,
      className: s,
      rootSelector: i,
      props: r,
      stylesCtx: n,
      withStaticClasses: k,
      headless: T,
      transformedStyles: E([P == null ? void 0 : P.styles, c])
    }),
    style: Ls({
      theme: h,
      themeName: S,
      selector: R,
      options: P,
      props: r,
      stylesCtx: n,
      rootSelector: i,
      styles: c,
      style: a,
      vars: d,
      varsResolver: f,
      headless: T,
      withStylesTransform: $
    })
  });
}
function Y(t, e, r) {
  var i;
  const n = Qe(), s = (i = n.components[t]) == null ? void 0 : i.defaultProps, a = typeof s == "function" ? s(n) : s;
  return { ...e, ...a, ...St(r) };
}
function ct(t) {
  return kt(t).reduce(
    (e, r) => t[r] !== void 0 ? `${e}${rs(r)}:${t[r]};` : e,
    ""
  ).trim();
}
function Vs({ selector: t, styles: e, media: r, container: n }) {
  const s = e ? ct(e) : "", a = Array.isArray(r) ? r.map((o) => `@media${o.query}{${t}{${ct(o.styles)}}}`) : [], i = Array.isArray(n) ? n.map(
    (o) => `@container ${o.query}{${t}{${ct(o.styles)}}}`
  ) : [];
  return `${s ? `${t}{${s}}` : ""}${a.join("")}${i.join("")}`.trim();
}
function Ws(t) {
  const e = fs();
  return /* @__PURE__ */ v(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: e == null ? void 0 : e(),
      dangerouslySetInnerHTML: { __html: Vs(t) }
    }
  );
}
function Bs(t) {
  const {
    m: e,
    mx: r,
    my: n,
    mt: s,
    mb: a,
    ml: i,
    mr: o,
    me: l,
    ms: c,
    p: d,
    px: f,
    py: h,
    pt: p,
    pb: k,
    pl: T,
    pr: S,
    pe: $,
    ps: E,
    bd: R,
    bg: P,
    c: I,
    opacity: M,
    ff: D,
    fz: A,
    fw: L,
    lts: H,
    ta: Le,
    lh: Q,
    fs: pe,
    tt: nt,
    td: K,
    w: ce,
    miw: Ne,
    maw: Ae,
    h: me,
    mih: st,
    mah: Zr,
    bgsz: Mr,
    bgp: Lr,
    bgr: Dr,
    bga: Vr,
    pos: Wr,
    top: Br,
    left: Fr,
    bottom: Hr,
    right: Ur,
    inset: qr,
    display: Yr,
    flex: Xr,
    hiddenFrom: Gr,
    visibleFrom: Jr,
    lightHidden: Qr,
    darkHidden: Kr,
    sx: en,
    ...tn
  } = t;
  return { styleProps: St({
    m: e,
    mx: r,
    my: n,
    mt: s,
    mb: a,
    ml: i,
    mr: o,
    me: l,
    ms: c,
    p: d,
    px: f,
    py: h,
    pt: p,
    pb: k,
    pl: T,
    pr: S,
    pe: $,
    ps: E,
    bd: R,
    bg: P,
    c: I,
    opacity: M,
    ff: D,
    fz: A,
    fw: L,
    lts: H,
    ta: Le,
    lh: Q,
    fs: pe,
    tt: nt,
    td: K,
    w: ce,
    miw: Ne,
    maw: Ae,
    h: me,
    mih: st,
    mah: Zr,
    bgsz: Mr,
    bgp: Lr,
    bgr: Dr,
    bga: Vr,
    pos: Wr,
    top: Br,
    left: Fr,
    bottom: Hr,
    right: Ur,
    inset: qr,
    display: Yr,
    flex: Xr,
    hiddenFrom: Gr,
    visibleFrom: Jr,
    lightHidden: Qr,
    darkHidden: Kr,
    sx: en
  }), rest: tn };
}
const Fs = {
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
function At(t, e) {
  const r = Nt({ color: t, theme: e });
  return r.color === "dimmed" ? "var(--mantine-color-dimmed)" : r.color === "bright" ? "var(--mantine-color-bright)" : r.variable ? `var(${r.variable})` : r.color;
}
function Hs(t, e) {
  const r = Nt({ color: t, theme: e });
  return r.isThemeColor && r.shade === void 0 ? `var(--mantine-color-${r.color}-text)` : At(t, e);
}
function Us(t, e) {
  if (typeof t == "number")
    return J(t);
  if (typeof t == "string") {
    const [r, n, ...s] = t.split(" ").filter((i) => i.trim() !== "");
    let a = `${J(r)}`;
    return n && (a += ` ${n}`), s.length > 0 && (a += ` ${At(s.join(" "), e)}`), a.trim();
  }
  return t;
}
const er = {
  text: "var(--mantine-font-family)",
  mono: "var(--mantine-font-family-monospace)",
  monospace: "var(--mantine-font-family-monospace)",
  heading: "var(--mantine-font-family-headings)",
  headings: "var(--mantine-font-family-headings)"
};
function qs(t) {
  return typeof t == "string" && t in er ? er[t] : t;
}
const Ys = ["h1", "h2", "h3", "h4", "h5", "h6"];
function Xs(t, e) {
  return typeof t == "string" && t in e.fontSizes ? `var(--mantine-font-size-${t})` : typeof t == "string" && Ys.includes(t) ? `var(--mantine-${t}-font-size)` : typeof t == "number" || typeof t == "string" ? J(t) : t;
}
function Gs(t) {
  return t;
}
const Js = ["h1", "h2", "h3", "h4", "h5", "h6"];
function Qs(t, e) {
  return typeof t == "string" && t in e.lineHeights ? `var(--mantine-line-height-${t})` : typeof t == "string" && Js.includes(t) ? `var(--mantine-${t}-line-height)` : t;
}
function Ks(t) {
  return typeof t == "number" ? J(t) : t;
}
function ea(t, e) {
  if (typeof t == "number")
    return J(t);
  if (typeof t == "string") {
    const r = t.replace("-", "");
    if (!(r in e.spacing))
      return J(t);
    const n = `--mantine-spacing-${r}`;
    return t.startsWith("-") ? `calc(var(${n}) * -1)` : `var(${n})`;
  }
  return t;
}
const lt = {
  color: At,
  textColor: Hs,
  fontSize: Xs,
  spacing: ea,
  identity: Gs,
  size: Ks,
  lineHeight: Qs,
  fontFamily: qs,
  border: Us
};
function tr(t) {
  return t.replace("(min-width: ", "").replace("em)", "");
}
function ta({
  media: t,
  ...e
}) {
  const n = Object.keys(t).sort((s, a) => Number(tr(s)) - Number(tr(a))).map((s) => ({ query: s, styles: t[s] }));
  return { ...e, media: n };
}
function ra(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.keys(t);
  return !(e.length === 1 && e[0] === "base");
}
function na(t) {
  return typeof t == "object" && t !== null ? "base" in t ? t.base : void 0 : t;
}
function sa(t) {
  return typeof t == "object" && t !== null ? kt(t).filter((e) => e !== "base") : [];
}
function aa(t, e) {
  return typeof t == "object" && t !== null && e in t ? t[e] : t;
}
function ia({
  styleProps: t,
  data: e,
  theme: r
}) {
  return ta(
    kt(t).reduce(
      (n, s) => {
        if (s === "hiddenFrom" || s === "visibleFrom" || s === "sx")
          return n;
        const a = e[s], i = Array.isArray(a.property) ? a.property : [a.property], o = na(t[s]);
        if (!ra(t[s]))
          return i.forEach((c) => {
            n.inlineStyles[c] = lt[a.type](o, r);
          }), n;
        n.hasResponsiveStyles = !0;
        const l = sa(t[s]);
        return i.forEach((c) => {
          o && (n.styles[c] = lt[a.type](o, r)), l.forEach((d) => {
            const f = `(min-width: ${r.breakpoints[d]})`;
            n.media[f] = {
              ...n.media[f],
              [c]: lt[a.type](
                aa(t[s], d),
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
function oa() {
  return `__m__-${on().replace(/:/g, "")}`;
}
function pr(t) {
  return t.startsWith("data-") ? t : `data-${t}`;
}
function ca(t) {
  return Object.keys(t).reduce((e, r) => {
    const n = t[r];
    return n === void 0 || n === "" || n === !1 || n === null || (e[pr(r)] = t[r]), e;
  }, {});
}
function mr(t) {
  return t ? typeof t == "string" ? { [pr(t)]: !0 } : Array.isArray(t) ? [...t].reduce(
    (e, r) => ({ ...e, ...mr(r) }),
    {}
  ) : ca(t) : null;
}
function vt(t, e) {
  return Array.isArray(t) ? [...t].reduce(
    (r, n) => ({ ...r, ...vt(n, e) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function la({
  theme: t,
  style: e,
  vars: r,
  styleProps: n
}) {
  const s = vt(e, t), a = vt(r, t);
  return { ...s, ...a, ...n };
}
const yr = z(
  ({
    component: t,
    style: e,
    __vars: r,
    className: n,
    variant: s,
    mod: a,
    size: i,
    hiddenFrom: o,
    visibleFrom: l,
    lightHidden: c,
    darkHidden: d,
    renderRoot: f,
    __size: h,
    ...p
  }, k) => {
    var A;
    const T = Qe(), S = t || "div", { styleProps: $, rest: E } = Bs(p), R = ms(), P = (A = R == null ? void 0 : R()) == null ? void 0 : A($.sx), I = oa(), M = ia({
      styleProps: $,
      theme: T,
      data: Fs
    }), D = {
      ref: k,
      style: la({
        theme: T,
        style: e,
        vars: r,
        styleProps: M.inlineStyles
      }),
      className: Je(n, P, {
        [I]: M.hasResponsiveStyles,
        "mantine-light-hidden": c,
        "mantine-dark-hidden": d,
        [`mantine-hidden-from-${o}`]: o,
        [`mantine-visible-from-${l}`]: l
      }),
      "data-variant": s,
      "data-size": ur(i) ? void 0 : i || void 0,
      size: h,
      ...mr(a),
      ...E
    };
    return /* @__PURE__ */ de(rn, { children: [
      M.hasResponsiveStyles && /* @__PURE__ */ v(
        Ws,
        {
          selector: `.${I}`,
          styles: M.styles,
          media: M.media
        }
      ),
      typeof f == "function" ? f(D) : /* @__PURE__ */ v(S, { ...D })
    ] });
  }
);
yr.displayName = "@mantine/core/Box";
const q = yr;
function gr(t) {
  return t;
}
function je(t) {
  const e = z(t);
  return e.extend = gr, e.withProps = (r) => {
    const n = z((s, a) => /* @__PURE__ */ v(e, { ...r, ...s, ref: a }));
    return n.extend = e.extend, n.displayName = `WithProps(${e.displayName})`, n;
  }, e;
}
function ze(t) {
  const e = z(t);
  return e.withProps = (r) => {
    const n = z((s, a) => /* @__PURE__ */ v(e, { ...r, ...s, ref: a }));
    return n.extend = e.extend, n.displayName = `WithProps(${e.displayName})`, n;
  }, e.extend = gr, e;
}
const da = ke({
  dir: "ltr",
  toggleDirection: () => {
  },
  setDirection: () => {
  }
});
function ua() {
  return Se(da);
}
function fa(t) {
  return nn.useMemo(() => t.every((e) => e == null) ? null : (e) => {
    t.forEach((r) => {
      typeof r == "function" ? r(e) : r != null && (r.current = e);
    });
  }, t);
}
process.env.NODE_ENV;
const [ha, F] = Ct(
  "ScrollArea.Root component was not found in tree"
);
function we(t, e) {
  const r = le(e);
  is(() => {
    let n = 0;
    if (t) {
      const s = new ResizeObserver(() => {
        cancelAnimationFrame(n), n = window.requestAnimationFrame(r);
      });
      return s.observe(t), () => {
        window.cancelAnimationFrame(n), s.unobserve(t);
      };
    }
  }, [t, r]);
}
const pa = z((t, e) => {
  const { style: r, ...n } = t, s = F(), [a, i] = O(0), [o, l] = O(0), c = !!(a && o);
  return we(s.scrollbarX, () => {
    var f;
    const d = ((f = s.scrollbarX) == null ? void 0 : f.offsetHeight) || 0;
    s.onCornerHeightChange(d), l(d);
  }), we(s.scrollbarY, () => {
    var f;
    const d = ((f = s.scrollbarY) == null ? void 0 : f.offsetWidth) || 0;
    s.onCornerWidthChange(d), i(d);
  }), c ? /* @__PURE__ */ v("div", { ...n, ref: e, style: { ...r, width: a, height: o } }) : null;
}), ma = z((t, e) => {
  const r = F(), n = !!(r.scrollbarX && r.scrollbarY);
  return r.type !== "scroll" && n ? /* @__PURE__ */ v(pa, { ...t, ref: e }) : null;
}), ya = {
  scrollHideDelay: 1e3,
  type: "hover"
}, vr = z((t, e) => {
  const r = Y("ScrollAreaRoot", ya, t), { type: n, scrollHideDelay: s, scrollbars: a, ...i } = r, [o, l] = O(null), [c, d] = O(null), [f, h] = O(null), [p, k] = O(null), [T, S] = O(null), [$, E] = O(0), [R, P] = O(0), [I, M] = O(!1), [D, A] = O(!1), L = Ce(e, (H) => l(H));
  return /* @__PURE__ */ v(
    ha,
    {
      value: {
        type: n,
        scrollHideDelay: s,
        scrollArea: o,
        viewport: c,
        onViewportChange: d,
        content: f,
        onContentChange: h,
        scrollbarX: p,
        onScrollbarXChange: k,
        scrollbarXEnabled: I,
        onScrollbarXEnabledChange: M,
        scrollbarY: T,
        onScrollbarYChange: S,
        scrollbarYEnabled: D,
        onScrollbarYEnabledChange: A,
        onCornerWidthChange: E,
        onCornerHeightChange: P
      },
      children: /* @__PURE__ */ v(
        q,
        {
          ...i,
          ref: L,
          __vars: {
            "--sa-corner-width": a !== "xy" ? "0px" : `${$}px`,
            "--sa-corner-height": a !== "xy" ? "0px" : `${R}px`
          }
        }
      )
    }
  );
});
vr.displayName = "@mantine/core/ScrollAreaRoot";
function br(t, e) {
  const r = t / e;
  return Number.isNaN(r) ? 0 : r;
}
function Ke(t) {
  const e = br(t.viewport, t.content), r = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, n = (t.scrollbar.size - r) * e;
  return Math.max(n, 18);
}
function _r(t, e) {
  return (r) => {
    if (t[0] === t[1] || e[0] === e[1])
      return e[0];
    const n = (e[1] - e[0]) / (t[1] - t[0]);
    return e[0] + n * (r - t[0]);
  };
}
function ga(t, [e, r]) {
  return Math.min(r, Math.max(e, t));
}
function rr(t, e, r = "ltr") {
  const n = Ke(e), s = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, a = e.scrollbar.size - s, i = e.content - e.viewport, o = a - n, l = r === "ltr" ? [0, i] : [i * -1, 0], c = ga(t, l);
  return _r([0, i], [0, o])(c);
}
function va(t, e, r, n = "ltr") {
  const s = Ke(r), a = s / 2, i = e || a, o = s - i, l = r.scrollbar.paddingStart + i, c = r.scrollbar.size - r.scrollbar.paddingEnd - o, d = r.content - r.viewport, f = n === "ltr" ? [0, d] : [d * -1, 0];
  return _r([l, c], f)(t);
}
function xr(t, e) {
  return t > 0 && t < e;
}
function qe(t) {
  return t ? parseInt(t, 10) : 0;
}
function ue(t, e, { checkForDefaultPrevented: r = !0 } = {}) {
  return (n) => {
    t == null || t(n), (r === !1 || !n.defaultPrevented) && (e == null || e(n));
  };
}
const [ba, wr] = Ct(
  "ScrollAreaScrollbar was not found in tree"
), kr = z((t, e) => {
  const {
    sizes: r,
    hasThumb: n,
    onThumbChange: s,
    onThumbPointerUp: a,
    onThumbPointerDown: i,
    onThumbPositionChange: o,
    onDragScroll: l,
    onWheelScroll: c,
    onResize: d,
    ...f
  } = t, h = F(), [p, k] = O(null), T = Ce(e, (A) => k(A)), S = U(null), $ = U(""), { viewport: E } = h, R = r.content - r.viewport, P = le(c), I = le(o), M = Ge(d, 10), D = (A) => {
    if (S.current) {
      const L = A.clientX - S.current.left, H = A.clientY - S.current.top;
      l({ x: L, y: H });
    }
  };
  return W(() => {
    const A = (L) => {
      const H = L.target;
      (p == null ? void 0 : p.contains(H)) && P(L, R);
    };
    return document.addEventListener("wheel", A, { passive: !1 }), () => document.removeEventListener("wheel", A, { passive: !1 });
  }, [E, p, R, P]), W(I, [r, I]), we(p, M), we(h.content, M), /* @__PURE__ */ v(
    ba,
    {
      value: {
        scrollbar: p,
        hasThumb: n,
        onThumbChange: le(s),
        onThumbPointerUp: le(a),
        onThumbPositionChange: I,
        onThumbPointerDown: le(i)
      },
      children: /* @__PURE__ */ v(
        "div",
        {
          ...f,
          ref: T,
          "data-mantine-scrollbar": !0,
          style: { position: "absolute", ...f.style },
          onPointerDown: ue(t.onPointerDown, (A) => {
            A.preventDefault(), A.button === 0 && (A.target.setPointerCapture(A.pointerId), S.current = p.getBoundingClientRect(), $.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", D(A));
          }),
          onPointerMove: ue(t.onPointerMove, D),
          onPointerUp: ue(t.onPointerUp, (A) => {
            const L = A.target;
            L.hasPointerCapture(A.pointerId) && (A.preventDefault(), L.releasePointerCapture(A.pointerId));
          }),
          onLostPointerCapture: () => {
            document.body.style.webkitUserSelect = $.current, S.current = null;
          }
        }
      )
    }
  );
}), Sr = z(
  (t, e) => {
    const { sizes: r, onSizesChange: n, style: s, ...a } = t, i = F(), [o, l] = O(), c = U(null), d = Ce(e, c, i.onScrollbarXChange);
    return W(() => {
      c.current && l(getComputedStyle(c.current));
    }, [c]), /* @__PURE__ */ v(
      kr,
      {
        "data-orientation": "horizontal",
        ...a,
        ref: d,
        sizes: r,
        style: {
          ...s,
          "--sa-thumb-width": `${Ke(r)}px`
        },
        onThumbPointerDown: (f) => t.onThumbPointerDown(f.x),
        onDragScroll: (f) => t.onDragScroll(f.x),
        onWheelScroll: (f, h) => {
          if (i.viewport) {
            const p = i.viewport.scrollLeft + f.deltaX;
            t.onWheelScroll(p), xr(p, h) && f.preventDefault();
          }
        },
        onResize: () => {
          c.current && i.viewport && o && n({
            content: i.viewport.scrollWidth,
            viewport: i.viewport.offsetWidth,
            scrollbar: {
              size: c.current.clientWidth,
              paddingStart: qe(o.paddingLeft),
              paddingEnd: qe(o.paddingRight)
            }
          });
        }
      }
    );
  }
);
Sr.displayName = "@mantine/core/ScrollAreaScrollbarX";
const Cr = z(
  (t, e) => {
    const { sizes: r, onSizesChange: n, style: s, ...a } = t, i = F(), [o, l] = O(), c = U(null), d = Ce(e, c, i.onScrollbarYChange);
    return W(() => {
      c.current && l(window.getComputedStyle(c.current));
    }, []), /* @__PURE__ */ v(
      kr,
      {
        ...a,
        "data-orientation": "vertical",
        ref: d,
        sizes: r,
        style: {
          "--sa-thumb-height": `${Ke(r)}px`,
          ...s
        },
        onThumbPointerDown: (f) => t.onThumbPointerDown(f.y),
        onDragScroll: (f) => t.onDragScroll(f.y),
        onWheelScroll: (f, h) => {
          if (i.viewport) {
            const p = i.viewport.scrollTop + f.deltaY;
            t.onWheelScroll(p), xr(p, h) && f.preventDefault();
          }
        },
        onResize: () => {
          c.current && i.viewport && o && n({
            content: i.viewport.scrollHeight,
            viewport: i.viewport.offsetHeight,
            scrollbar: {
              size: c.current.clientHeight,
              paddingStart: qe(o.paddingTop),
              paddingEnd: qe(o.paddingBottom)
            }
          });
        }
      }
    );
  }
);
Cr.displayName = "@mantine/core/ScrollAreaScrollbarY";
const et = z((t, e) => {
  const { orientation: r = "vertical", ...n } = t, { dir: s } = ua(), a = F(), i = U(null), o = U(0), [l, c] = O({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), d = br(l.viewport, l.content), f = {
    ...n,
    sizes: l,
    onSizesChange: c,
    hasThumb: d > 0 && d < 1,
    onThumbChange: (p) => {
      i.current = p;
    },
    onThumbPointerUp: () => {
      o.current = 0;
    },
    onThumbPointerDown: (p) => {
      o.current = p;
    }
  }, h = (p, k) => va(p, o.current, l, k);
  return r === "horizontal" ? /* @__PURE__ */ v(
    Sr,
    {
      ...f,
      ref: e,
      onThumbPositionChange: () => {
        if (a.viewport && i.current) {
          const p = a.viewport.scrollLeft, k = rr(p, l, s);
          i.current.style.transform = `translate3d(${k}px, 0, 0)`;
        }
      },
      onWheelScroll: (p) => {
        a.viewport && (a.viewport.scrollLeft = p);
      },
      onDragScroll: (p) => {
        a.viewport && (a.viewport.scrollLeft = h(p, s));
      }
    }
  ) : r === "vertical" ? /* @__PURE__ */ v(
    Cr,
    {
      ...f,
      ref: e,
      onThumbPositionChange: () => {
        if (a.viewport && i.current) {
          const p = a.viewport.scrollTop, k = rr(p, l);
          l.scrollbar.size === 0 ? i.current.style.setProperty("--thumb-opacity", "0") : i.current.style.setProperty("--thumb-opacity", "1"), i.current.style.transform = `translate3d(0, ${k}px, 0)`;
        }
      },
      onWheelScroll: (p) => {
        a.viewport && (a.viewport.scrollTop = p);
      },
      onDragScroll: (p) => {
        a.viewport && (a.viewport.scrollTop = h(p));
      }
    }
  ) : null;
});
et.displayName = "@mantine/core/ScrollAreaScrollbarVisible";
const Rt = z(
  (t, e) => {
    const r = F(), { forceMount: n, ...s } = t, [a, i] = O(!1), o = t.orientation === "horizontal", l = Ge(() => {
      if (r.viewport) {
        const c = r.viewport.offsetWidth < r.viewport.scrollWidth, d = r.viewport.offsetHeight < r.viewport.scrollHeight;
        i(o ? c : d);
      }
    }, 10);
    return we(r.viewport, l), we(r.content, l), n || a ? /* @__PURE__ */ v(
      et,
      {
        "data-state": a ? "visible" : "hidden",
        ...s,
        ref: e
      }
    ) : null;
  }
);
Rt.displayName = "@mantine/core/ScrollAreaScrollbarAuto";
const Tr = z(
  (t, e) => {
    const { forceMount: r, ...n } = t, s = F(), [a, i] = O(!1);
    return W(() => {
      const { scrollArea: o } = s;
      let l = 0;
      if (o) {
        const c = () => {
          window.clearTimeout(l), i(!0);
        }, d = () => {
          l = window.setTimeout(() => i(!1), s.scrollHideDelay);
        };
        return o.addEventListener("pointerenter", c), o.addEventListener("pointerleave", d), () => {
          window.clearTimeout(l), o.removeEventListener("pointerenter", c), o.removeEventListener("pointerleave", d);
        };
      }
    }, [s.scrollArea, s.scrollHideDelay]), r || a ? /* @__PURE__ */ v(
      Rt,
      {
        "data-state": a ? "visible" : "hidden",
        ...n,
        ref: e
      }
    ) : null;
  }
);
Tr.displayName = "@mantine/core/ScrollAreaScrollbarHover";
const _a = z(
  (t, e) => {
    const { forceMount: r, ...n } = t, s = F(), a = t.orientation === "horizontal", [i, o] = O("hidden"), l = Ge(() => o("idle"), 100);
    return W(() => {
      if (i === "idle") {
        const c = window.setTimeout(() => o("hidden"), s.scrollHideDelay);
        return () => window.clearTimeout(c);
      }
    }, [i, s.scrollHideDelay]), W(() => {
      const { viewport: c } = s, d = a ? "scrollLeft" : "scrollTop";
      if (c) {
        let f = c[d];
        const h = () => {
          const p = c[d];
          f !== p && (o("scrolling"), l()), f = p;
        };
        return c.addEventListener("scroll", h), () => c.removeEventListener("scroll", h);
      }
    }, [s.viewport, a, l]), r || i !== "hidden" ? /* @__PURE__ */ v(
      et,
      {
        "data-state": i === "hidden" ? "hidden" : "visible",
        ...n,
        ref: e,
        onPointerEnter: ue(t.onPointerEnter, () => o("interacting")),
        onPointerLeave: ue(t.onPointerLeave, () => o("idle"))
      }
    ) : null;
  }
), bt = z(
  (t, e) => {
    const { forceMount: r, ...n } = t, s = F(), { onScrollbarXEnabledChange: a, onScrollbarYEnabledChange: i } = s, o = t.orientation === "horizontal";
    return W(() => (o ? a(!0) : i(!0), () => {
      o ? a(!1) : i(!1);
    }), [o, a, i]), s.type === "hover" ? /* @__PURE__ */ v(Tr, { ...n, ref: e, forceMount: r }) : s.type === "scroll" ? /* @__PURE__ */ v(_a, { ...n, ref: e, forceMount: r }) : s.type === "auto" ? /* @__PURE__ */ v(Rt, { ...n, ref: e, forceMount: r }) : s.type === "always" ? /* @__PURE__ */ v(et, { ...n, ref: e }) : null;
  }
);
bt.displayName = "@mantine/core/ScrollAreaScrollbar";
function xa(t, e = () => {
}) {
  let r = { left: t.scrollLeft, top: t.scrollTop }, n = 0;
  return (function s() {
    const a = { left: t.scrollLeft, top: t.scrollTop }, i = r.left !== a.left, o = r.top !== a.top;
    (i || o) && e(), r = a, n = window.requestAnimationFrame(s);
  })(), () => window.cancelAnimationFrame(n);
}
const Nr = z((t, e) => {
  const { style: r, ...n } = t, s = F(), a = wr(), { onThumbPositionChange: i } = a, o = Ce(e, (d) => a.onThumbChange(d)), l = U(void 0), c = Ge(() => {
    l.current && (l.current(), l.current = void 0);
  }, 100);
  return W(() => {
    const { viewport: d } = s;
    if (d) {
      const f = () => {
        if (c(), !l.current) {
          const h = xa(d, i);
          l.current = h, i();
        }
      };
      return i(), d.addEventListener("scroll", f), () => d.removeEventListener("scroll", f);
    }
  }, [s.viewport, c, i]), /* @__PURE__ */ v(
    "div",
    {
      "data-state": a.hasThumb ? "visible" : "hidden",
      ...n,
      ref: o,
      style: {
        width: "var(--sa-thumb-width)",
        height: "var(--sa-thumb-height)",
        ...r
      },
      onPointerDownCapture: ue(t.onPointerDownCapture, (d) => {
        const h = d.target.getBoundingClientRect(), p = d.clientX - h.left, k = d.clientY - h.top;
        a.onThumbPointerDown({ x: p, y: k });
      }),
      onPointerUp: ue(t.onPointerUp, a.onThumbPointerUp)
    }
  );
});
Nr.displayName = "@mantine/core/ScrollAreaThumb";
const _t = z(
  (t, e) => {
    const { forceMount: r, ...n } = t, s = wr();
    return r || s.hasThumb ? /* @__PURE__ */ v(Nr, { ref: e, ...n }) : null;
  }
);
_t.displayName = "@mantine/core/ScrollAreaThumb";
const Ar = z(
  ({ children: t, style: e, ...r }, n) => {
    const s = F(), a = Ce(n, s.onViewportChange);
    return /* @__PURE__ */ v(
      q,
      {
        ...r,
        ref: a,
        style: {
          overflowX: s.scrollbarXEnabled ? "scroll" : "hidden",
          overflowY: s.scrollbarYEnabled ? "scroll" : "hidden",
          ...e
        },
        children: /* @__PURE__ */ v("div", { style: { minWidth: "100%" }, ref: s.onContentChange, children: t })
      }
    );
  }
);
Ar.displayName = "@mantine/core/ScrollAreaViewport";
var $t = { root: "m_d57069b5", viewport: "m_c0783ff9", viewportInner: "m_f8f631dd", scrollbar: "m_c44ba933", thumb: "m_d8b5e363", corner: "m_21657268" };
const Rr = {
  scrollHideDelay: 1e3,
  type: "hover",
  scrollbars: "xy"
}, wa = (t, { scrollbarSize: e, overscrollBehavior: r }) => ({
  root: {
    "--scrollarea-scrollbar-size": J(e),
    "--scrollarea-over-scroll-behavior": r
  }
}), Ze = je((t, e) => {
  const r = Y("ScrollArea", Rr, t), {
    classNames: n,
    className: s,
    style: a,
    styles: i,
    unstyled: o,
    scrollbarSize: l,
    vars: c,
    type: d,
    scrollHideDelay: f,
    viewportProps: h,
    viewportRef: p,
    onScrollPositionChange: k,
    children: T,
    offsetScrollbars: S,
    scrollbars: $,
    onBottomReached: E,
    onTopReached: R,
    overscrollBehavior: P,
    ...I
  } = r, [M, D] = O(!1), [A, L] = O(!1), [H, Le] = O(!1), Q = oe({
    name: "ScrollArea",
    props: r,
    classes: $t,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: c,
    varsResolver: wa
  }), pe = U(null), nt = fa([p, pe]);
  return W(() => {
    if (!pe.current || S !== "present")
      return;
    const K = pe.current, ce = new ResizeObserver(() => {
      const { scrollHeight: Ne, clientHeight: Ae, scrollWidth: me, clientWidth: st } = K;
      L(Ne > Ae), Le(me > st);
    });
    return ce.observe(K), () => ce.disconnect();
  }, [pe, S]), /* @__PURE__ */ de(
    vr,
    {
      type: d === "never" ? "always" : d,
      scrollHideDelay: f,
      ref: e,
      scrollbars: $,
      ...Q("root"),
      ...I,
      children: [
        /* @__PURE__ */ v(
          Ar,
          {
            ...h,
            ...Q("viewport", { style: h == null ? void 0 : h.style }),
            ref: nt,
            "data-offset-scrollbars": S === !0 ? "xy" : S || void 0,
            "data-scrollbars": $ || void 0,
            "data-horizontal-hidden": S === "present" && !H ? "true" : void 0,
            "data-vertical-hidden": S === "present" && !A ? "true" : void 0,
            onScroll: (K) => {
              var me;
              (me = h == null ? void 0 : h.onScroll) == null || me.call(h, K), k == null || k({ x: K.currentTarget.scrollLeft, y: K.currentTarget.scrollTop });
              const { scrollTop: ce, scrollHeight: Ne, clientHeight: Ae } = K.currentTarget;
              ce - (Ne - Ae) >= -0.6 && (E == null || E()), ce === 0 && (R == null || R());
            },
            children: T
          }
        ),
        ($ === "xy" || $ === "x") && /* @__PURE__ */ v(
          bt,
          {
            ...Q("scrollbar"),
            orientation: "horizontal",
            "data-hidden": d === "never" || S === "present" && !H ? !0 : void 0,
            forceMount: !0,
            onMouseEnter: () => D(!0),
            onMouseLeave: () => D(!1),
            children: /* @__PURE__ */ v(_t, { ...Q("thumb") })
          }
        ),
        ($ === "xy" || $ === "y") && /* @__PURE__ */ v(
          bt,
          {
            ...Q("scrollbar"),
            orientation: "vertical",
            "data-hidden": d === "never" || S === "present" && !A ? !0 : void 0,
            forceMount: !0,
            onMouseEnter: () => D(!0),
            onMouseLeave: () => D(!1),
            children: /* @__PURE__ */ v(_t, { ...Q("thumb") })
          }
        ),
        /* @__PURE__ */ v(
          ma,
          {
            ...Q("corner"),
            "data-hovered": M || void 0,
            "data-hidden": d === "never" || void 0
          }
        )
      ]
    }
  );
});
Ze.displayName = "@mantine/core/ScrollArea";
const Pt = je((t, e) => {
  const {
    children: r,
    classNames: n,
    styles: s,
    scrollbarSize: a,
    scrollHideDelay: i,
    type: o,
    dir: l,
    offsetScrollbars: c,
    viewportRef: d,
    onScrollPositionChange: f,
    unstyled: h,
    variant: p,
    viewportProps: k,
    scrollbars: T,
    style: S,
    vars: $,
    onBottomReached: E,
    onTopReached: R,
    ...P
  } = Y("ScrollAreaAutosize", Rr, t);
  return /* @__PURE__ */ v(q, { ...P, ref: e, style: [{ display: "flex", overflow: "auto" }, S], children: /* @__PURE__ */ v(q, { style: { display: "flex", flexDirection: "column", flex: 1 }, children: /* @__PURE__ */ v(
    Ze,
    {
      classNames: n,
      styles: s,
      scrollHideDelay: i,
      scrollbarSize: a,
      type: o,
      dir: l,
      offsetScrollbars: c,
      viewportRef: d,
      onScrollPositionChange: f,
      unstyled: h,
      variant: p,
      viewportProps: k,
      vars: $,
      scrollbars: T,
      onBottomReached: E,
      onTopReached: R,
      children: r
    }
  ) }) });
});
Ze.classes = $t;
Pt.displayName = "@mantine/core/ScrollAreaAutosize";
Pt.classes = $t;
Ze.Autosize = Pt;
var $r = { root: "m_1b7284a3" };
const ka = {}, Sa = (t, { radius: e, shadow: r }) => ({
  root: {
    "--paper-radius": e === void 0 ? void 0 : fr(e),
    "--paper-shadow": as(r)
  }
}), Et = ze((t, e) => {
  const r = Y("Paper", ka, t), {
    classNames: n,
    className: s,
    style: a,
    styles: i,
    unstyled: o,
    withBorder: l,
    vars: c,
    radius: d,
    shadow: f,
    variant: h,
    mod: p,
    ...k
  } = r, T = oe({
    name: "Paper",
    props: r,
    classes: $r,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: c,
    varsResolver: Sa
  });
  return /* @__PURE__ */ v(
    q,
    {
      ref: e,
      mod: [{ "data-with-border": l }, p],
      ...T("root"),
      variant: h,
      ...k
    }
  );
});
Et.classes = $r;
Et.displayName = "@mantine/core/Paper";
function Ca(t) {
  return nr.toArray(t).filter(Boolean);
}
var Pr = { root: "m_4081bf90" };
const Ta = {
  preventGrowOverflow: !0,
  gap: "md",
  align: "center",
  justify: "flex-start",
  wrap: "wrap"
}, Na = (t, { grow: e, preventGrowOverflow: r, gap: n, align: s, justify: a, wrap: i }, { childWidth: o }) => ({
  root: {
    "--group-child-width": e && r ? o : void 0,
    "--group-gap": Xe(n),
    "--group-align": s,
    "--group-justify": a,
    "--group-wrap": i
  }
}), Ot = je((t, e) => {
  const r = Y("Group", Ta, t), {
    classNames: n,
    className: s,
    style: a,
    styles: i,
    unstyled: o,
    children: l,
    gap: c,
    align: d,
    justify: f,
    wrap: h,
    grow: p,
    preventGrowOverflow: k,
    vars: T,
    variant: S,
    __size: $,
    mod: E,
    ...R
  } = r, P = Ca(l), I = P.length, M = Xe(c ?? "md"), A = { childWidth: `calc(${100 / I}% - (${M} - ${M} / ${I}))` }, L = oe({
    name: "Group",
    props: r,
    stylesCtx: A,
    className: s,
    style: a,
    classes: Pr,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: T,
    varsResolver: Na
  });
  return /* @__PURE__ */ v(
    q,
    {
      ...L("root"),
      ref: e,
      variant: S,
      mod: [{ grow: p }, E],
      size: $,
      ...R,
      children: P
    }
  );
});
Ot.classes = Pr;
Ot.displayName = "@mantine/core/Group";
var Er = { root: "m_b6d8b162" };
function Aa(t) {
  if (t === "start")
    return "start";
  if (t === "end" || t)
    return "end";
}
const Ra = {
  inherit: !1
}, $a = (t, { variant: e, lineClamp: r, gradient: n, size: s, color: a }) => ({
  root: {
    "--text-fz": ns(s),
    "--text-lh": ss(s),
    "--text-gradient": e === "gradient" ? Cs(n, t) : void 0,
    "--text-line-clamp": typeof r == "number" ? r.toString() : void 0,
    "--text-color": a ? Ue(a, t) : void 0
  }
}), Ee = ze((t, e) => {
  const r = Y("Text", Ra, t), {
    lineClamp: n,
    truncate: s,
    inline: a,
    inherit: i,
    gradient: o,
    span: l,
    __staticSelector: c,
    vars: d,
    className: f,
    style: h,
    classNames: p,
    styles: k,
    unstyled: T,
    variant: S,
    mod: $,
    size: E,
    ...R
  } = r, P = oe({
    name: ["Text", c],
    props: r,
    classes: Er,
    className: f,
    style: h,
    classNames: p,
    styles: k,
    unstyled: T,
    vars: d,
    varsResolver: $a
  });
  return /* @__PURE__ */ v(
    q,
    {
      ...P("root", { focusable: !0 }),
      ref: e,
      component: l ? "span" : "p",
      variant: S,
      mod: [
        {
          "data-truncate": Aa(s),
          "data-line-clamp": typeof n == "number",
          "data-inline": a,
          "data-inherit": i
        },
        $
      ],
      size: E,
      ...R
    }
  );
});
Ee.classes = Er;
Ee.displayName = "@mantine/core/Text";
var Or = { root: "m_347db0ec", "root--dot": "m_fbd81e3d", label: "m_5add502a", section: "m_91fdda9b" };
const Pa = {}, Ea = (t, { radius: e, color: r, gradient: n, variant: s, size: a, autoContrast: i }) => {
  const o = t.variantColorResolver({
    color: r || t.primaryColor,
    theme: t,
    gradient: n,
    variant: s || "filled",
    autoContrast: i
  });
  return {
    root: {
      "--badge-height": ae(a, "badge-height"),
      "--badge-padding-x": ae(a, "badge-padding-x"),
      "--badge-fz": ae(a, "badge-fz"),
      "--badge-radius": e === void 0 ? void 0 : fr(e),
      "--badge-bg": r || s ? o.background : void 0,
      "--badge-color": r || s ? o.color : void 0,
      "--badge-bd": r || s ? o.border : void 0,
      "--badge-dot-color": s === "dot" ? Ue(r, t) : void 0
    }
  };
}, It = ze((t, e) => {
  const r = Y("Badge", Pa, t), {
    classNames: n,
    className: s,
    style: a,
    styles: i,
    unstyled: o,
    vars: l,
    radius: c,
    color: d,
    gradient: f,
    leftSection: h,
    rightSection: p,
    children: k,
    variant: T,
    fullWidth: S,
    autoContrast: $,
    circle: E,
    mod: R,
    ...P
  } = r, I = oe({
    name: "Badge",
    props: r,
    classes: Or,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: l,
    varsResolver: Ea
  });
  return /* @__PURE__ */ de(
    q,
    {
      variant: T,
      mod: [
        {
          block: S,
          circle: E,
          "with-right-section": !!p,
          "with-left-section": !!h
        },
        R
      ],
      ...I("root", { variant: T }),
      ref: e,
      ...P,
      children: [
        h && /* @__PURE__ */ v("span", { ...I("section"), "data-position": "left", children: h }),
        /* @__PURE__ */ v("span", { ...I("label"), children: k }),
        p && /* @__PURE__ */ v("span", { ...I("section"), "data-position": "right", children: p })
      ]
    }
  );
});
It.classes = Or;
It.displayName = "@mantine/core/Badge";
const [Oa, Ia] = Ct(
  "Card component was not found in tree"
);
var jt = { root: "m_e615b15f", section: "m_599a2148" };
const ja = {}, tt = ze((t, e) => {
  const r = Y("CardSection", ja, t), { classNames: n, className: s, style: a, styles: i, vars: o, withBorder: l, inheritPadding: c, mod: d, ...f } = r, h = Ia();
  return /* @__PURE__ */ v(
    q,
    {
      ref: e,
      mod: [{ "with-border": l, "inherit-padding": c }, d],
      ...h.getStyles("section", { className: s, style: a, styles: i, classNames: n }),
      ...f
    }
  );
});
tt.classes = jt;
tt.displayName = "@mantine/core/CardSection";
const za = {}, Za = (t, { padding: e }) => ({
  root: {
    "--card-padding": Xe(e)
  }
}), Me = ze((t, e) => {
  const r = Y("Card", za, t), { classNames: n, className: s, style: a, styles: i, unstyled: o, vars: l, children: c, padding: d, ...f } = r, h = oe({
    name: "Card",
    props: r,
    classes: jt,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: l,
    varsResolver: Za
  }), p = nr.toArray(c), k = p.map((T, S) => typeof T == "object" && T && "type" in T && T.type === tt ? cn(T, {
    "data-first-section": S === 0 || void 0,
    "data-last-section": S === p.length - 1 || void 0
  }) : T);
  return /* @__PURE__ */ v(Oa, { value: { getStyles: h }, children: /* @__PURE__ */ v(Et, { ref: e, unstyled: o, ...h("root"), ...f, children: k }) });
});
Me.classes = jt;
Me.displayName = "@mantine/core/Card";
Me.Section = tt;
var Ir = { root: "m_6d731127" };
const Ma = {
  gap: "md",
  align: "stretch",
  justify: "flex-start"
}, La = (t, { gap: e, align: r, justify: n }) => ({
  root: {
    "--stack-gap": Xe(e),
    "--stack-align": r,
    "--stack-justify": n
  }
}), rt = je((t, e) => {
  const r = Y("Stack", Ma, t), {
    classNames: n,
    className: s,
    style: a,
    styles: i,
    unstyled: o,
    vars: l,
    align: c,
    justify: d,
    gap: f,
    variant: h,
    ...p
  } = r, k = oe({
    name: "Stack",
    props: r,
    classes: Ir,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: l,
    varsResolver: La
  });
  return /* @__PURE__ */ v(q, { ref: e, ...k("root"), variant: h, ...p });
});
rt.classes = Ir;
rt.displayName = "@mantine/core/Stack";
const Da = ["h1", "h2", "h3", "h4", "h5", "h6"], Va = ["xs", "sm", "md", "lg", "xl"];
function Wa(t, e) {
  const r = e !== void 0 ? e : `h${t}`;
  return Da.includes(r) ? {
    fontSize: `var(--mantine-${r}-font-size)`,
    fontWeight: `var(--mantine-${r}-font-weight)`,
    lineHeight: `var(--mantine-${r}-line-height)`
  } : Va.includes(r) ? {
    fontSize: `var(--mantine-font-size-${r})`,
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  } : {
    fontSize: J(r),
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  };
}
var jr = { root: "m_8a5d1357" };
const Ba = {
  order: 1
}, Fa = (t, { order: e, size: r, lineClamp: n, textWrap: s }) => {
  const a = Wa(e, r);
  return {
    root: {
      "--title-fw": a.fontWeight,
      "--title-lh": a.lineHeight,
      "--title-fz": a.fontSize,
      "--title-line-clamp": typeof n == "number" ? n.toString() : void 0,
      "--title-text-wrap": s
    }
  };
}, zt = je((t, e) => {
  const r = Y("Title", Ba, t), {
    classNames: n,
    className: s,
    style: a,
    styles: i,
    unstyled: o,
    order: l,
    vars: c,
    size: d,
    variant: f,
    lineClamp: h,
    textWrap: p,
    mod: k,
    ...T
  } = r, S = oe({
    name: "Title",
    props: r,
    classes: jr,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: c,
    varsResolver: Fa
  });
  return [1, 2, 3, 4, 5, 6].includes(l) ? /* @__PURE__ */ v(
    q,
    {
      ...S("root"),
      component: `h${l}`,
      variant: f,
      ref: e,
      mod: [{ order: l, "data-line-clamp": typeof h == "number" }, k],
      size: d,
      ...T
    }
  ) : null;
});
zt.classes = jr;
zt.displayName = "@mantine/core/Title";
function Ha(t, e) {
  switch (e.type) {
    case "ADD":
      return { items: [e.item, ...t.items].slice(0, 50) };
    case "CLEAR":
      return { items: [] };
    default:
      return t;
  }
}
const zr = ke(null);
function Ua({ children: t }) {
  const [e, r] = ln(Ha, { items: [] }), n = re((s, a) => {
    r({
      type: "ADD",
      item: {
        id: `${Date.now()}-${Math.random()}`,
        type: s,
        message: a,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
  }, []);
  return Re("task.created", re(
    (s) => n("task", `Task created: ${s.title}`),
    [n]
  )), Re("task.updated", re(
    (s) => n("task", `Task updated: ${s.taskId}`),
    [n]
  )), Re("task.deleted", re(
    (s) => n("task", `Task deleted: ${s.taskId}`),
    [n]
  )), Re("report.generated", re(
    (s) => n("report", `Report generated: ${s.type}`),
    [n]
  )), Re("user.loggedIn", re(
    (s) => n("user", `User logged in: ${s.email}`),
    [n]
  )), /* @__PURE__ */ v(zr.Provider, { value: { items: e.items, addItem: n }, children: t });
}
function qa() {
  const t = Se(zr);
  if (!t) throw new Error("useFeed must be used within FeedProvider");
  return t;
}
const Ya = sr(function() {
  const { items: e } = qa();
  return /* @__PURE__ */ v(Ze, { h: 300, children: /* @__PURE__ */ de(rt, { gap: "xs", children: [
    e.map((r) => /* @__PURE__ */ de(Me, { withBorder: !0, padding: "sm", children: [
      /* @__PURE__ */ de(Ot, { justify: "space-between", children: [
        /* @__PURE__ */ v(Ee, { size: "sm", children: r.message }),
        /* @__PURE__ */ v(It, { size: "xs", variant: "light", children: r.type })
      ] }),
      /* @__PURE__ */ v(Ee, { size: "xs", c: "dimmed", children: new Date(r.timestamp).toLocaleTimeString() })
    ] }, r.id)),
    e.length === 0 && /* @__PURE__ */ v(Ee, { c: "dimmed", ta: "center", py: "md", size: "sm", children: "No activity yet. Events will appear here." })
  ] }) });
}), Xa = sr(function() {
  return /* @__PURE__ */ v(Ua, { children: /* @__PURE__ */ v(Me, { withBorder: !0, padding: "lg", radius: "md", children: /* @__PURE__ */ de(rt, { gap: "md", children: [
    /* @__PURE__ */ v(zt, { order: 4, children: "Activity Feed" }),
    /* @__PURE__ */ v(Ya, {})
  ] }) }) });
});
Wn({
  manifest: ts,
  widgets: [
    {
      slot: "dashboard.sidebar",
      component: Xa,
      priority: 10
    }
  ]
});
