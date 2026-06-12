import { jsx as y, jsxs as ne, Fragment as Ct } from "react/jsx-runtime";
import * as D from "react";
import Vn, { createContext as ft, useContext as mt, useEffect as J, useCallback as ee, Fragment as ni, useState as V, useRef as q, useMemo as ri, useLayoutEffect as or, useId as si, forwardRef as G, cloneElement as nn, Children as Os, createElement as On, memo as ir, useReducer as oi } from "react";
import * as ii from "react-dom";
import ai, { createPortal as ci } from "react-dom";
const li = [
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
], di = [
  "dashboard.main",
  "dashboard.sidebar",
  "header.actions",
  "settings.sections",
  "reports.widgets",
  "sidebar.nav"
];
var Z;
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
    const o = {};
    for (const i of s)
      o[i] = i;
    return o;
  }, t.getValidEnumValues = (s) => {
    const o = t.objectKeys(s).filter((a) => typeof s[s[a]] != "number"), i = {};
    for (const a of o)
      i[a] = s[a];
    return t.objectValues(i);
  }, t.objectValues = (s) => t.objectKeys(s).map(function(o) {
    return s[o];
  }), t.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
    const o = [];
    for (const i in s)
      Object.prototype.hasOwnProperty.call(s, i) && o.push(i);
    return o;
  }, t.find = (s, o) => {
    for (const i of s)
      if (o(i))
        return i;
  }, t.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && Number.isFinite(s) && Math.floor(s) === s;
  function r(s, o = " | ") {
    return s.map((i) => typeof i == "string" ? `'${i}'` : i).join(o);
  }
  t.joinValues = r, t.jsonStringifyReplacer = (s, o) => typeof o == "bigint" ? o.toString() : o;
})(Z || (Z = {}));
var Ur;
(function(t) {
  t.mergeShapes = (e, n) => ({
    ...e,
    ...n
    // second overwrites first
  });
})(Ur || (Ur = {}));
const T = Z.arrayToEnum([
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
]), Me = (t) => {
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
}, _ = Z.arrayToEnum([
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
class $e extends Error {
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
    const n = e || function(o) {
      return o.message;
    }, r = { _errors: [] }, s = (o) => {
      for (const i of o.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(s);
        else if (i.code === "invalid_return_type")
          s(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          s(i.argumentsError);
        else if (i.path.length === 0)
          r._errors.push(n(i));
        else {
          let a = r, c = 0;
          for (; c < i.path.length; ) {
            const l = i.path[c];
            c === i.path.length - 1 ? (a[l] = a[l] || { _errors: [] }, a[l]._errors.push(n(i))) : a[l] = a[l] || { _errors: [] }, a = a[l], c++;
          }
        }
    };
    return s(this), r;
  }
  static assert(e) {
    if (!(e instanceof $e))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, Z.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (n) => n.message) {
    const n = {}, r = [];
    for (const s of this.issues)
      if (s.path.length > 0) {
        const o = s.path[0];
        n[o] = n[o] || [], n[o].push(e(s));
      } else
        r.push(e(s));
    return { formErrors: r, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
$e.create = (t) => new $e(t);
const Zn = (t, e) => {
  let n;
  switch (t.code) {
    case _.invalid_type:
      t.received === T.undefined ? n = "Required" : n = `Expected ${t.expected}, received ${t.received}`;
      break;
    case _.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(t.expected, Z.jsonStringifyReplacer)}`;
      break;
    case _.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${Z.joinValues(t.keys, ", ")}`;
      break;
    case _.invalid_union:
      n = "Invalid input";
      break;
    case _.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${Z.joinValues(t.options)}`;
      break;
    case _.invalid_enum_value:
      n = `Invalid enum value. Expected ${Z.joinValues(t.options)}, received '${t.received}'`;
      break;
    case _.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case _.invalid_return_type:
      n = "Invalid function return type";
      break;
    case _.invalid_date:
      n = "Invalid date";
      break;
    case _.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (n = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? n = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? n = `Invalid input: must end with "${t.validation.endsWith}"` : Z.assertNever(t.validation) : t.validation !== "regex" ? n = `Invalid ${t.validation}` : n = "Invalid";
      break;
    case _.too_small:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "bigint" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : n = "Invalid input";
      break;
    case _.too_big:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? n = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : n = "Invalid input";
      break;
    case _.custom:
      n = "Invalid input";
      break;
    case _.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case _.not_multiple_of:
      n = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case _.not_finite:
      n = "Number must be finite";
      break;
    default:
      n = e.defaultError, Z.assertNever(t);
  }
  return { message: n };
};
let ui = Zn;
function fi() {
  return ui;
}
const mi = (t) => {
  const { data: e, path: n, errorMaps: r, issueData: s } = t, o = [...n, ...s.path || []], i = {
    ...s,
    path: o
  };
  if (s.message !== void 0)
    return {
      ...s,
      path: o,
      message: s.message
    };
  let a = "";
  const c = r.filter((l) => !!l).slice().reverse();
  for (const l of c)
    a = l(i, { data: e, defaultError: a }).message;
  return {
    ...s,
    path: o,
    message: a
  };
};
function k(t, e) {
  const n = fi(), r = mi({
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
      n === Zn ? void 0 : Zn
      // then global default map
    ].filter((s) => !!s)
  });
  t.common.issues.push(r);
}
class ue {
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
        return I;
      s.status === "dirty" && e.dirty(), r.push(s.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, n) {
    const r = [];
    for (const s of n) {
      const o = await s.key, i = await s.value;
      r.push({
        key: o,
        value: i
      });
    }
    return ue.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, n) {
    const r = {};
    for (const s of n) {
      const { key: o, value: i } = s;
      if (o.status === "aborted" || i.status === "aborted")
        return I;
      o.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), o.value !== "__proto__" && (typeof i.value < "u" || s.alwaysSet) && (r[o.value] = i.value);
    }
    return { status: e.value, value: r };
  }
}
const I = Object.freeze({
  status: "aborted"
}), kt = (t) => ({ status: "dirty", value: t }), ge = (t) => ({ status: "valid", value: t }), Yr = (t) => t.status === "aborted", Xr = (t) => t.status === "dirty", nt = (t) => t.status === "valid", Wt = (t) => typeof Promise < "u" && t instanceof Promise;
var A;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(A || (A = {}));
class Ne {
  constructor(e, n, r, s) {
    this._cachedPath = [], this.parent = e, this.data = n, this._path = r, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const qr = (t, e) => {
  if (nt(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const n = new $e(t.common.issues);
      return this._error = n, this._error;
    }
  };
};
function L(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: n, required_error: r, description: s } = t;
  if (e && (n || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (i, a) => {
    const { message: c } = t;
    return i.code === "invalid_enum_value" ? { message: c ?? a.defaultError } : typeof a.data > "u" ? { message: c ?? r ?? a.defaultError } : i.code !== "invalid_type" ? { message: a.defaultError } : { message: c ?? n ?? a.defaultError };
  }, description: s };
}
class F {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return Me(e.data);
  }
  _getOrReturnCtx(e, n) {
    return n || {
      common: e.parent.common,
      data: e.data,
      parsedType: Me(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new ue(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: Me(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const n = this._parse(e);
    if (Wt(n))
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
      parsedType: Me(e)
    }, s = this._parseSync({ data: e, path: r.path, parent: r });
    return qr(r, s);
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
      parsedType: Me(e)
    };
    if (!this["~standard"].async)
      try {
        const o = this._parseSync({ data: e, path: [], parent: n });
        return nt(o) ? {
          value: o.value
        } : {
          issues: n.common.issues
        };
      } catch (o) {
        (s = (r = o == null ? void 0 : o.message) == null ? void 0 : r.toLowerCase()) != null && s.includes("encountered") && (this["~standard"].async = !0), n.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: n }).then((o) => nt(o) ? {
      value: o.value
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
      parsedType: Me(e)
    }, s = this._parse({ data: e, path: r.path, parent: r }), o = await (Wt(s) ? s : Promise.resolve(s));
    return qr(r, o);
  }
  refine(e, n) {
    const r = (s) => typeof n == "string" || typeof n > "u" ? { message: n } : typeof n == "function" ? n(s) : n;
    return this._refinement((s, o) => {
      const i = e(s), a = () => o.addIssue({
        code: _.custom,
        ...r(s)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((c) => c ? !0 : (a(), !1)) : i ? !0 : (a(), !1);
    });
  }
  refinement(e, n) {
    return this._refinement((r, s) => e(r) ? !0 : (s.addIssue(typeof n == "function" ? n(r, s) : n), !1));
  }
  _refinement(e) {
    return new ot({
      schema: this,
      typeName: E.ZodEffects,
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
    return Re.create(this);
  }
  promise() {
    return qt.create(this, this._def);
  }
  or(e) {
    return Ut.create([this, e], this._def);
  }
  and(e) {
    return Yt.create(this, e, this._def);
  }
  transform(e) {
    return new ot({
      ...L(this._def),
      schema: this,
      typeName: E.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const n = typeof e == "function" ? e : () => e;
    return new Hn({
      ...L(this._def),
      innerType: this,
      defaultValue: n,
      typeName: E.ZodDefault
    });
  }
  brand() {
    return new Mi({
      typeName: E.ZodBranded,
      type: this,
      ...L(this._def)
    });
  }
  catch(e) {
    const n = typeof e == "function" ? e : () => e;
    return new Un({
      ...L(this._def),
      innerType: this,
      catchValue: n,
      typeName: E.ZodCatch
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
    return ar.create(this, e);
  }
  readonly() {
    return Yn.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const pi = /^c[^\s-]{8,}$/i, hi = /^[0-9a-z]+$/, gi = /^[0-9A-HJKMNP-TV-Z]{26}$/i, yi = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, vi = /^[a-z0-9_-]{21}$/i, bi = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, wi = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, xi = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, _i = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let $n;
const Si = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ki = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Ci = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Ri = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Ti = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Ni = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, $s = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Ai = new RegExp(`^${$s}$`);
function Es(t) {
  let e = "[0-5]\\d";
  t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`);
  const n = t.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${n}`;
}
function Pi(t) {
  return new RegExp(`^${Es(t)}$`);
}
function Oi(t) {
  let e = `${$s}T${Es(t)}`;
  const n = [];
  return n.push(t.local ? "Z?" : "Z"), t.offset && n.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${n.join("|")})`, new RegExp(`^${e}$`);
}
function $i(t, e) {
  return !!((e === "v4" || !e) && Si.test(t) || (e === "v6" || !e) && Ci.test(t));
}
function Ei(t, e) {
  if (!bi.test(t))
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
function Ii(t, e) {
  return !!((e === "v4" || !e) && ki.test(t) || (e === "v6" || !e) && Ri.test(t));
}
class Oe extends F {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== T.string) {
      const o = this._getOrReturnCtx(e);
      return k(o, {
        code: _.invalid_type,
        expected: T.string,
        received: o.parsedType
      }), I;
    }
    const r = new ue();
    let s;
    for (const o of this._def.checks)
      if (o.kind === "min")
        e.data.length < o.value && (s = this._getOrReturnCtx(e, s), k(s, {
          code: _.too_small,
          minimum: o.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: o.message
        }), r.dirty());
      else if (o.kind === "max")
        e.data.length > o.value && (s = this._getOrReturnCtx(e, s), k(s, {
          code: _.too_big,
          maximum: o.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: o.message
        }), r.dirty());
      else if (o.kind === "length") {
        const i = e.data.length > o.value, a = e.data.length < o.value;
        (i || a) && (s = this._getOrReturnCtx(e, s), i ? k(s, {
          code: _.too_big,
          maximum: o.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: o.message
        }) : a && k(s, {
          code: _.too_small,
          minimum: o.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: o.message
        }), r.dirty());
      } else if (o.kind === "email")
        xi.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
          validation: "email",
          code: _.invalid_string,
          message: o.message
        }), r.dirty());
      else if (o.kind === "emoji")
        $n || ($n = new RegExp(_i, "u")), $n.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
          validation: "emoji",
          code: _.invalid_string,
          message: o.message
        }), r.dirty());
      else if (o.kind === "uuid")
        yi.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
          validation: "uuid",
          code: _.invalid_string,
          message: o.message
        }), r.dirty());
      else if (o.kind === "nanoid")
        vi.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
          validation: "nanoid",
          code: _.invalid_string,
          message: o.message
        }), r.dirty());
      else if (o.kind === "cuid")
        pi.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
          validation: "cuid",
          code: _.invalid_string,
          message: o.message
        }), r.dirty());
      else if (o.kind === "cuid2")
        hi.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
          validation: "cuid2",
          code: _.invalid_string,
          message: o.message
        }), r.dirty());
      else if (o.kind === "ulid")
        gi.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
          validation: "ulid",
          code: _.invalid_string,
          message: o.message
        }), r.dirty());
      else if (o.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), k(s, {
            validation: "url",
            code: _.invalid_string,
            message: o.message
          }), r.dirty();
        }
      else o.kind === "regex" ? (o.regex.lastIndex = 0, o.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
        validation: "regex",
        code: _.invalid_string,
        message: o.message
      }), r.dirty())) : o.kind === "trim" ? e.data = e.data.trim() : o.kind === "includes" ? e.data.includes(o.value, o.position) || (s = this._getOrReturnCtx(e, s), k(s, {
        code: _.invalid_string,
        validation: { includes: o.value, position: o.position },
        message: o.message
      }), r.dirty()) : o.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : o.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : o.kind === "startsWith" ? e.data.startsWith(o.value) || (s = this._getOrReturnCtx(e, s), k(s, {
        code: _.invalid_string,
        validation: { startsWith: o.value },
        message: o.message
      }), r.dirty()) : o.kind === "endsWith" ? e.data.endsWith(o.value) || (s = this._getOrReturnCtx(e, s), k(s, {
        code: _.invalid_string,
        validation: { endsWith: o.value },
        message: o.message
      }), r.dirty()) : o.kind === "datetime" ? Oi(o).test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
        code: _.invalid_string,
        validation: "datetime",
        message: o.message
      }), r.dirty()) : o.kind === "date" ? Ai.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
        code: _.invalid_string,
        validation: "date",
        message: o.message
      }), r.dirty()) : o.kind === "time" ? Pi(o).test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
        code: _.invalid_string,
        validation: "time",
        message: o.message
      }), r.dirty()) : o.kind === "duration" ? wi.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
        validation: "duration",
        code: _.invalid_string,
        message: o.message
      }), r.dirty()) : o.kind === "ip" ? $i(e.data, o.version) || (s = this._getOrReturnCtx(e, s), k(s, {
        validation: "ip",
        code: _.invalid_string,
        message: o.message
      }), r.dirty()) : o.kind === "jwt" ? Ei(e.data, o.alg) || (s = this._getOrReturnCtx(e, s), k(s, {
        validation: "jwt",
        code: _.invalid_string,
        message: o.message
      }), r.dirty()) : o.kind === "cidr" ? Ii(e.data, o.version) || (s = this._getOrReturnCtx(e, s), k(s, {
        validation: "cidr",
        code: _.invalid_string,
        message: o.message
      }), r.dirty()) : o.kind === "base64" ? Ti.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
        validation: "base64",
        code: _.invalid_string,
        message: o.message
      }), r.dirty()) : o.kind === "base64url" ? Ni.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
        validation: "base64url",
        code: _.invalid_string,
        message: o.message
      }), r.dirty()) : Z.assertNever(o);
    return { status: r.value, value: e.data };
  }
  _regex(e, n, r) {
    return this.refinement((s) => e.test(s), {
      validation: n,
      code: _.invalid_string,
      ...A.errToObj(r)
    });
  }
  _addCheck(e) {
    return new Oe({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...A.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...A.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...A.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...A.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...A.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...A.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...A.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...A.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...A.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...A.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...A.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...A.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...A.errToObj(e) });
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
      ...A.errToObj(e == null ? void 0 : e.message)
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
      ...A.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...A.errToObj(e) });
  }
  regex(e, n) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...A.errToObj(n)
    });
  }
  includes(e, n) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: n == null ? void 0 : n.position,
      ...A.errToObj(n == null ? void 0 : n.message)
    });
  }
  startsWith(e, n) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...A.errToObj(n)
    });
  }
  endsWith(e, n) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...A.errToObj(n)
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...A.errToObj(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...A.errToObj(n)
    });
  }
  length(e, n) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...A.errToObj(n)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, A.errToObj(e));
  }
  trim() {
    return new Oe({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Oe({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Oe({
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
Oe.create = (t) => new Oe({
  checks: [],
  typeName: E.ZodString,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...L(t)
});
function Di(t, e) {
  const n = (t.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, s = n > r ? n : r, o = Number.parseInt(t.toFixed(s).replace(".", "")), i = Number.parseInt(e.toFixed(s).replace(".", ""));
  return o % i / 10 ** s;
}
class rt extends F {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== T.number) {
      const o = this._getOrReturnCtx(e);
      return k(o, {
        code: _.invalid_type,
        expected: T.number,
        received: o.parsedType
      }), I;
    }
    let r;
    const s = new ue();
    for (const o of this._def.checks)
      o.kind === "int" ? Z.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), k(r, {
        code: _.invalid_type,
        expected: "integer",
        received: "float",
        message: o.message
      }), s.dirty()) : o.kind === "min" ? (o.inclusive ? e.data < o.value : e.data <= o.value) && (r = this._getOrReturnCtx(e, r), k(r, {
        code: _.too_small,
        minimum: o.value,
        type: "number",
        inclusive: o.inclusive,
        exact: !1,
        message: o.message
      }), s.dirty()) : o.kind === "max" ? (o.inclusive ? e.data > o.value : e.data >= o.value) && (r = this._getOrReturnCtx(e, r), k(r, {
        code: _.too_big,
        maximum: o.value,
        type: "number",
        inclusive: o.inclusive,
        exact: !1,
        message: o.message
      }), s.dirty()) : o.kind === "multipleOf" ? Di(e.data, o.value) !== 0 && (r = this._getOrReturnCtx(e, r), k(r, {
        code: _.not_multiple_of,
        multipleOf: o.value,
        message: o.message
      }), s.dirty()) : o.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), k(r, {
        code: _.not_finite,
        message: o.message
      }), s.dirty()) : Z.assertNever(o);
    return { status: s.value, value: e.data };
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, A.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, A.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, A.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, A.toString(n));
  }
  setLimit(e, n, r, s) {
    return new rt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: A.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new rt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: A.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: A.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: A.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: A.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: A.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: A.toString(n)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: A.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: A.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: A.toString(e)
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
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && Z.isInteger(e.value));
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
rt.create = (t) => new rt({
  checks: [],
  typeName: E.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...L(t)
});
class Rt extends F {
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
    const s = new ue();
    for (const o of this._def.checks)
      o.kind === "min" ? (o.inclusive ? e.data < o.value : e.data <= o.value) && (r = this._getOrReturnCtx(e, r), k(r, {
        code: _.too_small,
        type: "bigint",
        minimum: o.value,
        inclusive: o.inclusive,
        message: o.message
      }), s.dirty()) : o.kind === "max" ? (o.inclusive ? e.data > o.value : e.data >= o.value) && (r = this._getOrReturnCtx(e, r), k(r, {
        code: _.too_big,
        type: "bigint",
        maximum: o.value,
        inclusive: o.inclusive,
        message: o.message
      }), s.dirty()) : o.kind === "multipleOf" ? e.data % o.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), k(r, {
        code: _.not_multiple_of,
        multipleOf: o.value,
        message: o.message
      }), s.dirty()) : Z.assertNever(o);
    return { status: s.value, value: e.data };
  }
  _getInvalidInput(e) {
    const n = this._getOrReturnCtx(e);
    return k(n, {
      code: _.invalid_type,
      expected: T.bigint,
      received: n.parsedType
    }), I;
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, A.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, A.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, A.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, A.toString(n));
  }
  setLimit(e, n, r, s) {
    return new Rt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: A.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Rt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: A.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: A.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: A.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: A.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: A.toString(n)
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
Rt.create = (t) => new Rt({
  checks: [],
  typeName: E.ZodBigInt,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...L(t)
});
class Gr extends F {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== T.boolean) {
      const r = this._getOrReturnCtx(e);
      return k(r, {
        code: _.invalid_type,
        expected: T.boolean,
        received: r.parsedType
      }), I;
    }
    return ge(e.data);
  }
}
Gr.create = (t) => new Gr({
  typeName: E.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...L(t)
});
class Ht extends F {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== T.date) {
      const o = this._getOrReturnCtx(e);
      return k(o, {
        code: _.invalid_type,
        expected: T.date,
        received: o.parsedType
      }), I;
    }
    if (Number.isNaN(e.data.getTime())) {
      const o = this._getOrReturnCtx(e);
      return k(o, {
        code: _.invalid_date
      }), I;
    }
    const r = new ue();
    let s;
    for (const o of this._def.checks)
      o.kind === "min" ? e.data.getTime() < o.value && (s = this._getOrReturnCtx(e, s), k(s, {
        code: _.too_small,
        message: o.message,
        inclusive: !0,
        exact: !1,
        minimum: o.value,
        type: "date"
      }), r.dirty()) : o.kind === "max" ? e.data.getTime() > o.value && (s = this._getOrReturnCtx(e, s), k(s, {
        code: _.too_big,
        message: o.message,
        inclusive: !0,
        exact: !1,
        maximum: o.value,
        type: "date"
      }), r.dirty()) : Z.assertNever(o);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new Ht({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: A.toString(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: A.toString(n)
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
Ht.create = (t) => new Ht({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: E.ZodDate,
  ...L(t)
});
class Kr extends F {
  _parse(e) {
    if (this._getType(e) !== T.symbol) {
      const r = this._getOrReturnCtx(e);
      return k(r, {
        code: _.invalid_type,
        expected: T.symbol,
        received: r.parsedType
      }), I;
    }
    return ge(e.data);
  }
}
Kr.create = (t) => new Kr({
  typeName: E.ZodSymbol,
  ...L(t)
});
class Qr extends F {
  _parse(e) {
    if (this._getType(e) !== T.undefined) {
      const r = this._getOrReturnCtx(e);
      return k(r, {
        code: _.invalid_type,
        expected: T.undefined,
        received: r.parsedType
      }), I;
    }
    return ge(e.data);
  }
}
Qr.create = (t) => new Qr({
  typeName: E.ZodUndefined,
  ...L(t)
});
class Jr extends F {
  _parse(e) {
    if (this._getType(e) !== T.null) {
      const r = this._getOrReturnCtx(e);
      return k(r, {
        code: _.invalid_type,
        expected: T.null,
        received: r.parsedType
      }), I;
    }
    return ge(e.data);
  }
}
Jr.create = (t) => new Jr({
  typeName: E.ZodNull,
  ...L(t)
});
class es extends F {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return ge(e.data);
  }
}
es.create = (t) => new es({
  typeName: E.ZodAny,
  ...L(t)
});
class Bn extends F {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return ge(e.data);
  }
}
Bn.create = (t) => new Bn({
  typeName: E.ZodUnknown,
  ...L(t)
});
class ze extends F {
  _parse(e) {
    const n = this._getOrReturnCtx(e);
    return k(n, {
      code: _.invalid_type,
      expected: T.never,
      received: n.parsedType
    }), I;
  }
}
ze.create = (t) => new ze({
  typeName: E.ZodNever,
  ...L(t)
});
class ts extends F {
  _parse(e) {
    if (this._getType(e) !== T.undefined) {
      const r = this._getOrReturnCtx(e);
      return k(r, {
        code: _.invalid_type,
        expected: T.void,
        received: r.parsedType
      }), I;
    }
    return ge(e.data);
  }
}
ts.create = (t) => new ts({
  typeName: E.ZodVoid,
  ...L(t)
});
class Re extends F {
  _parse(e) {
    const { ctx: n, status: r } = this._processInputParams(e), s = this._def;
    if (n.parsedType !== T.array)
      return k(n, {
        code: _.invalid_type,
        expected: T.array,
        received: n.parsedType
      }), I;
    if (s.exactLength !== null) {
      const i = n.data.length > s.exactLength.value, a = n.data.length < s.exactLength.value;
      (i || a) && (k(n, {
        code: i ? _.too_big : _.too_small,
        minimum: a ? s.exactLength.value : void 0,
        maximum: i ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), r.dirty());
    }
    if (s.minLength !== null && n.data.length < s.minLength.value && (k(n, {
      code: _.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), r.dirty()), s.maxLength !== null && n.data.length > s.maxLength.value && (k(n, {
      code: _.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), r.dirty()), n.common.async)
      return Promise.all([...n.data].map((i, a) => s.type._parseAsync(new Ne(n, i, n.path, a)))).then((i) => ue.mergeArray(r, i));
    const o = [...n.data].map((i, a) => s.type._parseSync(new Ne(n, i, n.path, a)));
    return ue.mergeArray(r, o);
  }
  get element() {
    return this._def.type;
  }
  min(e, n) {
    return new Re({
      ...this._def,
      minLength: { value: e, message: A.toString(n) }
    });
  }
  max(e, n) {
    return new Re({
      ...this._def,
      maxLength: { value: e, message: A.toString(n) }
    });
  }
  length(e, n) {
    return new Re({
      ...this._def,
      exactLength: { value: e, message: A.toString(n) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Re.create = (t, e) => new Re({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: E.ZodArray,
  ...L(e)
});
function et(t) {
  if (t instanceof te) {
    const e = {};
    for (const n in t.shape) {
      const r = t.shape[n];
      e[n] = Le.create(et(r));
    }
    return new te({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof Re ? new Re({
    ...t._def,
    type: et(t.element)
  }) : t instanceof Le ? Le.create(et(t.unwrap())) : t instanceof it ? it.create(et(t.unwrap())) : t instanceof Ue ? Ue.create(t.items.map((e) => et(e))) : t;
}
class te extends F {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), n = Z.objectKeys(e);
    return this._cached = { shape: e, keys: n }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== T.object) {
      const l = this._getOrReturnCtx(e);
      return k(l, {
        code: _.invalid_type,
        expected: T.object,
        received: l.parsedType
      }), I;
    }
    const { status: r, ctx: s } = this._processInputParams(e), { shape: o, keys: i } = this._getCached(), a = [];
    if (!(this._def.catchall instanceof ze && this._def.unknownKeys === "strip"))
      for (const l in s.data)
        i.includes(l) || a.push(l);
    const c = [];
    for (const l of i) {
      const d = o[l], f = s.data[l];
      c.push({
        key: { status: "valid", value: l },
        value: d._parse(new Ne(s, f, s.path, l)),
        alwaysSet: l in s.data
      });
    }
    if (this._def.catchall instanceof ze) {
      const l = this._def.unknownKeys;
      if (l === "passthrough")
        for (const d of a)
          c.push({
            key: { status: "valid", value: d },
            value: { status: "valid", value: s.data[d] }
          });
      else if (l === "strict")
        a.length > 0 && (k(s, {
          code: _.unrecognized_keys,
          keys: a
        }), r.dirty());
      else if (l !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const l = this._def.catchall;
      for (const d of a) {
        const f = s.data[d];
        c.push({
          key: { status: "valid", value: d },
          value: l._parse(
            new Ne(s, f, s.path, d)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: d in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const l = [];
      for (const d of c) {
        const f = await d.key, u = await d.value;
        l.push({
          key: f,
          value: u,
          alwaysSet: d.alwaysSet
        });
      }
      return l;
    }).then((l) => ue.mergeObjectSync(r, l)) : ue.mergeObjectSync(r, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return A.errToObj, new te({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (n, r) => {
          var o, i;
          const s = ((i = (o = this._def).errorMap) == null ? void 0 : i.call(o, n, r).message) ?? r.defaultError;
          return n.code === "unrecognized_keys" ? {
            message: A.errToObj(e).message ?? s
          } : {
            message: s
          };
        }
      } : {}
    });
  }
  strip() {
    return new te({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new te({
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
    return new te({
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
    return new te({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: E.ZodObject
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
    return new te({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const n = {};
    for (const r of Z.objectKeys(e))
      e[r] && this.shape[r] && (n[r] = this.shape[r]);
    return new te({
      ...this._def,
      shape: () => n
    });
  }
  omit(e) {
    const n = {};
    for (const r of Z.objectKeys(this.shape))
      e[r] || (n[r] = this.shape[r]);
    return new te({
      ...this._def,
      shape: () => n
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return et(this);
  }
  partial(e) {
    const n = {};
    for (const r of Z.objectKeys(this.shape)) {
      const s = this.shape[r];
      e && !e[r] ? n[r] = s : n[r] = s.optional();
    }
    return new te({
      ...this._def,
      shape: () => n
    });
  }
  required(e) {
    const n = {};
    for (const r of Z.objectKeys(this.shape))
      if (e && !e[r])
        n[r] = this.shape[r];
      else {
        let o = this.shape[r];
        for (; o instanceof Le; )
          o = o._def.innerType;
        n[r] = o;
      }
    return new te({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return Is(Z.objectKeys(this.shape));
  }
}
te.create = (t, e) => new te({
  shape: () => t,
  unknownKeys: "strip",
  catchall: ze.create(),
  typeName: E.ZodObject,
  ...L(e)
});
te.strictCreate = (t, e) => new te({
  shape: () => t,
  unknownKeys: "strict",
  catchall: ze.create(),
  typeName: E.ZodObject,
  ...L(e)
});
te.lazycreate = (t, e) => new te({
  shape: t,
  unknownKeys: "strip",
  catchall: ze.create(),
  typeName: E.ZodObject,
  ...L(e)
});
class Ut extends F {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = this._def.options;
    function s(o) {
      for (const a of o)
        if (a.result.status === "valid")
          return a.result;
      for (const a of o)
        if (a.result.status === "dirty")
          return n.common.issues.push(...a.ctx.common.issues), a.result;
      const i = o.map((a) => new $e(a.ctx.common.issues));
      return k(n, {
        code: _.invalid_union,
        unionErrors: i
      }), I;
    }
    if (n.common.async)
      return Promise.all(r.map(async (o) => {
        const i = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await o._parseAsync({
            data: n.data,
            path: n.path,
            parent: i
          }),
          ctx: i
        };
      })).then(s);
    {
      let o;
      const i = [];
      for (const c of r) {
        const l = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        }, d = c._parseSync({
          data: n.data,
          path: n.path,
          parent: l
        });
        if (d.status === "valid")
          return d;
        d.status === "dirty" && !o && (o = { result: d, ctx: l }), l.common.issues.length && i.push(l.common.issues);
      }
      if (o)
        return n.common.issues.push(...o.ctx.common.issues), o.result;
      const a = i.map((c) => new $e(c));
      return k(n, {
        code: _.invalid_union,
        unionErrors: a
      }), I;
    }
  }
  get options() {
    return this._def.options;
  }
}
Ut.create = (t, e) => new Ut({
  options: t,
  typeName: E.ZodUnion,
  ...L(e)
});
function Wn(t, e) {
  const n = Me(t), r = Me(e);
  if (t === e)
    return { valid: !0, data: t };
  if (n === T.object && r === T.object) {
    const s = Z.objectKeys(e), o = Z.objectKeys(t).filter((a) => s.indexOf(a) !== -1), i = { ...t, ...e };
    for (const a of o) {
      const c = Wn(t[a], e[a]);
      if (!c.valid)
        return { valid: !1 };
      i[a] = c.data;
    }
    return { valid: !0, data: i };
  } else if (n === T.array && r === T.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let o = 0; o < t.length; o++) {
      const i = t[o], a = e[o], c = Wn(i, a);
      if (!c.valid)
        return { valid: !1 };
      s.push(c.data);
    }
    return { valid: !0, data: s };
  } else return n === T.date && r === T.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class Yt extends F {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), s = (o, i) => {
      if (Yr(o) || Yr(i))
        return I;
      const a = Wn(o.value, i.value);
      return a.valid ? ((Xr(o) || Xr(i)) && n.dirty(), { status: n.value, value: a.data }) : (k(r, {
        code: _.invalid_intersection_types
      }), I);
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
    ]).then(([o, i]) => s(o, i)) : s(this._def.left._parseSync({
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
Yt.create = (t, e, n) => new Yt({
  left: t,
  right: e,
  typeName: E.ZodIntersection,
  ...L(n)
});
class Ue extends F {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== T.array)
      return k(r, {
        code: _.invalid_type,
        expected: T.array,
        received: r.parsedType
      }), I;
    if (r.data.length < this._def.items.length)
      return k(r, {
        code: _.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), I;
    !this._def.rest && r.data.length > this._def.items.length && (k(r, {
      code: _.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), n.dirty());
    const o = [...r.data].map((i, a) => {
      const c = this._def.items[a] || this._def.rest;
      return c ? c._parse(new Ne(r, i, r.path, a)) : null;
    }).filter((i) => !!i);
    return r.common.async ? Promise.all(o).then((i) => ue.mergeArray(n, i)) : ue.mergeArray(n, o);
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
    typeName: E.ZodTuple,
    rest: null,
    ...L(e)
  });
};
class Xt extends F {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== T.object)
      return k(r, {
        code: _.invalid_type,
        expected: T.object,
        received: r.parsedType
      }), I;
    const s = [], o = this._def.keyType, i = this._def.valueType;
    for (const a in r.data)
      s.push({
        key: o._parse(new Ne(r, a, r.path, a)),
        value: i._parse(new Ne(r, r.data[a], r.path, a)),
        alwaysSet: a in r.data
      });
    return r.common.async ? ue.mergeObjectAsync(n, s) : ue.mergeObjectSync(n, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, n, r) {
    return n instanceof F ? new Xt({
      keyType: e,
      valueType: n,
      typeName: E.ZodRecord,
      ...L(r)
    }) : new Xt({
      keyType: Oe.create(),
      valueType: e,
      typeName: E.ZodRecord,
      ...L(n)
    });
  }
}
class ns extends F {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== T.map)
      return k(r, {
        code: _.invalid_type,
        expected: T.map,
        received: r.parsedType
      }), I;
    const s = this._def.keyType, o = this._def.valueType, i = [...r.data.entries()].map(([a, c], l) => ({
      key: s._parse(new Ne(r, a, r.path, [l, "key"])),
      value: o._parse(new Ne(r, c, r.path, [l, "value"]))
    }));
    if (r.common.async) {
      const a = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of i) {
          const l = await c.key, d = await c.value;
          if (l.status === "aborted" || d.status === "aborted")
            return I;
          (l.status === "dirty" || d.status === "dirty") && n.dirty(), a.set(l.value, d.value);
        }
        return { status: n.value, value: a };
      });
    } else {
      const a = /* @__PURE__ */ new Map();
      for (const c of i) {
        const l = c.key, d = c.value;
        if (l.status === "aborted" || d.status === "aborted")
          return I;
        (l.status === "dirty" || d.status === "dirty") && n.dirty(), a.set(l.value, d.value);
      }
      return { status: n.value, value: a };
    }
  }
}
ns.create = (t, e, n) => new ns({
  valueType: e,
  keyType: t,
  typeName: E.ZodMap,
  ...L(n)
});
class Tt extends F {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== T.set)
      return k(r, {
        code: _.invalid_type,
        expected: T.set,
        received: r.parsedType
      }), I;
    const s = this._def;
    s.minSize !== null && r.data.size < s.minSize.value && (k(r, {
      code: _.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), n.dirty()), s.maxSize !== null && r.data.size > s.maxSize.value && (k(r, {
      code: _.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), n.dirty());
    const o = this._def.valueType;
    function i(c) {
      const l = /* @__PURE__ */ new Set();
      for (const d of c) {
        if (d.status === "aborted")
          return I;
        d.status === "dirty" && n.dirty(), l.add(d.value);
      }
      return { status: n.value, value: l };
    }
    const a = [...r.data.values()].map((c, l) => o._parse(new Ne(r, c, r.path, l)));
    return r.common.async ? Promise.all(a).then((c) => i(c)) : i(a);
  }
  min(e, n) {
    return new Tt({
      ...this._def,
      minSize: { value: e, message: A.toString(n) }
    });
  }
  max(e, n) {
    return new Tt({
      ...this._def,
      maxSize: { value: e, message: A.toString(n) }
    });
  }
  size(e, n) {
    return this.min(e, n).max(e, n);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Tt.create = (t, e) => new Tt({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: E.ZodSet,
  ...L(e)
});
class rs extends F {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
rs.create = (t, e) => new rs({
  getter: t,
  typeName: E.ZodLazy,
  ...L(e)
});
class ss extends F {
  _parse(e) {
    if (e.data !== this._def.value) {
      const n = this._getOrReturnCtx(e);
      return k(n, {
        received: n.data,
        code: _.invalid_literal,
        expected: this._def.value
      }), I;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
ss.create = (t, e) => new ss({
  value: t,
  typeName: E.ZodLiteral,
  ...L(e)
});
function Is(t, e) {
  return new st({
    values: t,
    typeName: E.ZodEnum,
    ...L(e)
  });
}
class st extends F {
  _parse(e) {
    if (typeof e.data != "string") {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return k(n, {
        expected: Z.joinValues(r),
        received: n.parsedType,
        code: _.invalid_type
      }), I;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return k(n, {
        received: n.data,
        code: _.invalid_enum_value,
        options: r
      }), I;
    }
    return ge(e.data);
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
    return st.create(e, {
      ...this._def,
      ...n
    });
  }
  exclude(e, n = this._def) {
    return st.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...n
    });
  }
}
st.create = Is;
class os extends F {
  _parse(e) {
    const n = Z.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== T.string && r.parsedType !== T.number) {
      const s = Z.objectValues(n);
      return k(r, {
        expected: Z.joinValues(s),
        received: r.parsedType,
        code: _.invalid_type
      }), I;
    }
    if (this._cache || (this._cache = new Set(Z.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const s = Z.objectValues(n);
      return k(r, {
        received: r.data,
        code: _.invalid_enum_value,
        options: s
      }), I;
    }
    return ge(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
os.create = (t, e) => new os({
  values: t,
  typeName: E.ZodNativeEnum,
  ...L(e)
});
class qt extends F {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== T.promise && n.common.async === !1)
      return k(n, {
        code: _.invalid_type,
        expected: T.promise,
        received: n.parsedType
      }), I;
    const r = n.parsedType === T.promise ? n.data : Promise.resolve(n.data);
    return ge(r.then((s) => this._def.type.parseAsync(s, {
      path: n.path,
      errorMap: n.common.contextualErrorMap
    })));
  }
}
qt.create = (t, e) => new qt({
  type: t,
  typeName: E.ZodPromise,
  ...L(e)
});
class ot extends F {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === E.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), s = this._def.effect || null, o = {
      addIssue: (i) => {
        k(r, i), i.fatal ? n.abort() : n.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (o.addIssue = o.addIssue.bind(o), s.type === "preprocess") {
      const i = s.transform(r.data, o);
      if (r.common.async)
        return Promise.resolve(i).then(async (a) => {
          if (n.value === "aborted")
            return I;
          const c = await this._def.schema._parseAsync({
            data: a,
            path: r.path,
            parent: r
          });
          return c.status === "aborted" ? I : c.status === "dirty" || n.value === "dirty" ? kt(c.value) : c;
        });
      {
        if (n.value === "aborted")
          return I;
        const a = this._def.schema._parseSync({
          data: i,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? I : a.status === "dirty" || n.value === "dirty" ? kt(a.value) : a;
      }
    }
    if (s.type === "refinement") {
      const i = (a) => {
        const c = s.refinement(a, o);
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
        return a.status === "aborted" ? I : (a.status === "dirty" && n.dirty(), i(a.value), { status: n.value, value: a.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((a) => a.status === "aborted" ? I : (a.status === "dirty" && n.dirty(), i(a.value).then(() => ({ status: n.value, value: a.value }))));
    }
    if (s.type === "transform")
      if (r.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!nt(i))
          return I;
        const a = s.transform(i.value, o);
        if (a instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: n.value, value: a };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((i) => nt(i) ? Promise.resolve(s.transform(i.value, o)).then((a) => ({
          status: n.value,
          value: a
        })) : I);
    Z.assertNever(s);
  }
}
ot.create = (t, e, n) => new ot({
  schema: t,
  typeName: E.ZodEffects,
  effect: e,
  ...L(n)
});
ot.createWithPreprocess = (t, e, n) => new ot({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: E.ZodEffects,
  ...L(n)
});
class Le extends F {
  _parse(e) {
    return this._getType(e) === T.undefined ? ge(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Le.create = (t, e) => new Le({
  innerType: t,
  typeName: E.ZodOptional,
  ...L(e)
});
class it extends F {
  _parse(e) {
    return this._getType(e) === T.null ? ge(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
it.create = (t, e) => new it({
  innerType: t,
  typeName: E.ZodNullable,
  ...L(e)
});
class Hn extends F {
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
Hn.create = (t, e) => new Hn({
  innerType: t,
  typeName: E.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...L(e)
});
class Un extends F {
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
    return Wt(s) ? s.then((o) => ({
      status: "valid",
      value: o.status === "valid" ? o.value : this._def.catchValue({
        get error() {
          return new $e(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new $e(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Un.create = (t, e) => new Un({
  innerType: t,
  typeName: E.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...L(e)
});
class is extends F {
  _parse(e) {
    if (this._getType(e) !== T.nan) {
      const r = this._getOrReturnCtx(e);
      return k(r, {
        code: _.invalid_type,
        expected: T.nan,
        received: r.parsedType
      }), I;
    }
    return { status: "valid", value: e.data };
  }
}
is.create = (t) => new is({
  typeName: E.ZodNaN,
  ...L(t)
});
class Mi extends F {
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
class ar extends F {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const o = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? I : o.status === "dirty" ? (n.dirty(), kt(o.value)) : this._def.out._parseAsync({
          data: o.value,
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
      return s.status === "aborted" ? I : s.status === "dirty" ? (n.dirty(), {
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
    return new ar({
      in: e,
      out: n,
      typeName: E.ZodPipeline
    });
  }
}
class Yn extends F {
  _parse(e) {
    const n = this._def.innerType._parse(e), r = (s) => (nt(s) && (s.value = Object.freeze(s.value)), s);
    return Wt(n) ? n.then((s) => r(s)) : r(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Yn.create = (t, e) => new Yn({
  innerType: t,
  typeName: E.ZodReadonly,
  ...L(e)
});
var E;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(E || (E = {}));
const O = Oe.create, Ds = rt.create, cr = Bn.create;
ze.create;
const Li = Re.create, re = te.create;
Ut.create;
Yt.create;
Ue.create;
const rn = Xt.create, Ye = st.create;
qt.create;
Le.create;
it.create;
re({
  taskId: O(),
  title: O(),
  userId: O()
});
re({
  taskId: O(),
  changes: rn(cr())
});
re({
  taskId: O()
});
re({
  reportId: O(),
  type: O(),
  title: O().optional()
});
re({
  userId: O(),
  email: O(),
  timestamp: O()
});
re({
  message: O(),
  variant: Ye(["info", "success", "error", "warning"]).default("info"),
  title: O().optional()
});
re({
  pluginId: O(),
  error: O(),
  stack: O().optional()
});
re({
  pluginId: O(),
  version: O().optional()
});
re({
  locale: O()
});
re({
  primaryColor: O(),
  label: O().optional()
});
const zi = re({
  id: O().min(1),
  name: O().min(1),
  version: O().regex(/^\d+\.\d+\.\d+$/),
  description: O(),
  author: O(),
  entry: O(),
  hostCompatibility: O().default("^1.0.0"),
  permissions: Li(Ye(li)).default([]),
  dependencies: rn(O()).optional(),
  icon: O().optional(),
  category: O().optional()
});
re({
  path: O(),
  label: O().optional(),
  permission: O().optional()
});
re({
  slot: Ye(di),
  priority: Ds().default(0)
});
re({
  label: O(),
  path: O(),
  icon: O().optional(),
  section: O().optional(),
  order: Ds().default(0)
});
re({
  email: O().email(),
  password: O().min(6)
});
re({
  version: O().optional()
});
re({
  version: O()
});
rn(cr());
const ji = re({
  title: O().min(1),
  description: O().optional(),
  status: Ye(["todo", "in_progress", "done"]).default("todo"),
  priority: Ye(["low", "medium", "high"]).default("medium")
});
ji.partial();
re({
  type: Ye(["tasks", "activity", "usage"]),
  format: Ye(["json", "csv"]).default("json"),
  title: O().optional()
});
re({
  pluginId: O(),
  event: O(),
  payload: rn(cr()).optional(),
  timestamp: O().optional()
});
function Ms() {
  const t = typeof window < "u" ? window.__FPP_HOST_BRIDGE__ : null;
  if (!t)
    throw new Error("[PluginSDK] Host bridge not initialized");
  return t;
}
function Ls(t) {
  return Ms().getContext({ id: t });
}
function Fi(t) {
  const e = zi.safeParse(t.manifest);
  if (!e.success)
    throw new Error(
      `[PluginSDK] Invalid manifest: ${e.error.message}`
    );
  t.manifest.id;
  try {
    Ms().registerContributions(t);
  } finally {
  }
}
const Vi = ft(null);
function zs() {
  const t = mt(Vi);
  if (!t)
    throw new Error(
      "[PluginSDK] usePluginId must be used within PluginIdProvider (wrap plugin UI in PluginBoundary)"
    );
  return t;
}
function ve(t, e) {
  const n = zs();
  J(() => Ls(n).events.subscribe(t, e), [n, t, e]);
}
function Zi() {
  const t = zs(), e = Ls(t);
  return ee(
    (n, r = "info", s) => {
      e.events.emit("notification.show", { message: n, variant: r, title: s });
    },
    [e]
  );
}
const Bi = "com.fpp.notifications", Wi = "Notifications", Hi = "1.0.0", Ui = "Toast notifications, event alerts, and activity feed.", Yi = "FPP Team", Xi = "/plugins/com.fpp.notifications/index.js", qi = "^1.0.0", Gi = ["notifications:read", "notifications:write", "events:task.*", "events:report.*", "events:user.*"], Ki = "bell", Qi = "Communication", Ji = {
  id: Bi,
  name: Wi,
  version: Hi,
  description: Ui,
  author: Yi,
  entry: Xi,
  hostCompatibility: qi,
  permissions: Gi,
  icon: Ki,
  category: Qi
};
function lr(t) {
  return Object.keys(t);
}
function ea(t) {
  return t.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
function En(t) {
  return t === "0rem" ? "0rem" : `calc(${t} * var(--mantine-scale))`;
}
function js(t, { shouldScale: e = !1 } = {}) {
  function n(r) {
    if (r === 0 || r === "0")
      return `0${t}`;
    if (typeof r == "number") {
      const s = `${r / 16}${t}`;
      return e ? En(s) : s;
    }
    if (typeof r == "string") {
      if (r === "" || r.startsWith("calc(") || r.startsWith("clamp(") || r.includes("rgba("))
        return r;
      if (r.includes(","))
        return r.split(",").map((o) => n(o)).join(",");
      if (r.includes(" "))
        return r.split(" ").map((o) => n(o)).join(" ");
      if (r.includes(t))
        return e ? En(r) : r;
      const s = r.replace("px", "");
      if (!Number.isNaN(Number(s))) {
        const o = `${Number(s) / 16}${t}`;
        return e ? En(o) : o;
      }
    }
    return r;
  }
  return n;
}
const fe = js("rem", { shouldScale: !0 });
js("em");
function dr(t) {
  return Object.keys(t).reduce((e, n) => (t[n] !== void 0 && (e[n] = t[n]), e), {});
}
function Fs(t) {
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
function ur(t) {
  return Array.isArray(t) || t === null ? !1 : typeof t == "object" ? t.type !== ni : !1;
}
function At(t) {
  const e = ft(null);
  return [({ children: s, value: o }) => /* @__PURE__ */ y(e.Provider, { value: o, children: s }), () => {
    const s = mt(e);
    if (s === null)
      throw new Error(t);
    return s;
  }];
}
function Gt(t, e) {
  let n = t;
  for (; (n = n.parentElement) && !n.matches(e); )
    ;
  return n;
}
function ta(t, e, n) {
  for (let r = t - 1; r >= 0; r -= 1)
    if (!e[r].disabled)
      return r;
  if (n) {
    for (let r = e.length - 1; r > -1; r -= 1)
      if (!e[r].disabled)
        return r;
  }
  return t;
}
function na(t, e, n) {
  for (let r = t + 1; r < e.length; r += 1)
    if (!e[r].disabled)
      return r;
  if (n) {
    for (let r = 0; r < e.length; r += 1)
      if (!e[r].disabled)
        return r;
  }
  return t;
}
function ra(t, e, n) {
  return Gt(t, n) === Gt(e, n);
}
function sa({
  parentSelector: t,
  siblingSelector: e,
  onKeyDown: n,
  loop: r = !0,
  activateOnFocus: s = !1,
  dir: o = "rtl",
  orientation: i
}) {
  return (a) => {
    var u;
    n == null || n(a);
    const c = Array.from(
      ((u = Gt(a.currentTarget, t)) == null ? void 0 : u.querySelectorAll(
        e
      )) || []
    ).filter((m) => ra(a.currentTarget, m, t)), l = c.findIndex((m) => a.currentTarget === m), d = na(l, c, r), f = ta(l, c, r);
    switch (a.key) {
      case "ArrowRight":
        break;
      case "ArrowLeft":
        break;
      case "ArrowUp": {
        a.stopPropagation(), a.preventDefault(), c[f].focus(), s && c[f].click();
        break;
      }
      case "ArrowDown": {
        a.stopPropagation(), a.preventDefault(), c[d].focus(), s && c[d].click();
        break;
      }
      case "Home": {
        a.stopPropagation(), a.preventDefault(), !c[0].disabled && c[0].focus();
        break;
      }
      case "End": {
        a.stopPropagation(), a.preventDefault();
        const m = c.length - 1;
        !c[m].disabled && c[m].focus();
        break;
      }
    }
  };
}
const oa = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function Vs(t) {
  return oa[t];
}
const ia = () => {
};
function aa(t, e = { active: !0 }) {
  return typeof t != "function" || !e.active ? e.onKeyDown || ia : (n) => {
    var r;
    n.key === "Escape" && (t(n), (r = e.onTrigger) == null || r.call(e));
  };
}
function pe(t, e = "size", n = !0) {
  if (t !== void 0)
    return Fs(t) ? n ? fe(t) : t : `var(--${e}-${t})`;
}
function sn(t) {
  return pe(t, "mantine-spacing");
}
function Fe(t) {
  return t === void 0 ? "var(--mantine-radius-default)" : pe(t, "mantine-radius");
}
function Zs(t) {
  return pe(t, "mantine-font-size");
}
function ca(t) {
  return pe(t, "mantine-line-height", !1);
}
function Bs(t) {
  if (t)
    return pe(t, "mantine-shadow", !1);
}
function Ce(t, e) {
  return (n) => {
    t == null || t(n), e == null || e(n);
  };
}
function la(t, e, n) {
  var r;
  return n ? Array.from(
    ((r = Gt(n, e)) == null ? void 0 : r.querySelectorAll(t)) || []
  ).findIndex((s) => s === n) : null;
}
function da() {
  const [t, e] = V(-1);
  return [t, { setHovered: e, resetHovered: () => e(-1) }];
}
function Ws(t = "mantine-") {
  return `${t}${Math.random().toString(36).slice(2, 11)}`;
}
function Be(t) {
  const e = q(t);
  return J(() => {
    e.current = t;
  }), ri(() => (...n) => {
    var r;
    return (r = e.current) == null ? void 0 : r.call(e, ...n);
  }, []);
}
function on(t, e) {
  const n = typeof e == "number" ? e : e.delay, r = typeof e == "number" ? !1 : e.flushOnUnmount, s = Be(t), o = q(0), i = q(() => {
  }), a = Object.assign(
    ee(
      (...c) => {
        window.clearTimeout(o.current);
        const l = () => {
          o.current !== 0 && (o.current = 0, s(...c));
        };
        i.current = l, a.flush = l, o.current = window.setTimeout(l, n);
      },
      [s, n]
    ),
    { flush: i.current }
  );
  return J(
    () => () => {
      window.clearTimeout(o.current), r && a.flush();
    },
    [a, r]
  ), a;
}
const as = ["mousedown", "touchstart"];
function ua(t, e, n) {
  const r = q(null);
  return J(() => {
    const s = (o) => {
      const { target: i } = o ?? {};
      if (Array.isArray(n)) {
        const a = (i == null ? void 0 : i.hasAttribute("data-ignore-outside-clicks")) || !document.body.contains(i) && i.tagName !== "HTML";
        n.every((l) => !!l && !o.composedPath().includes(l)) && !a && t();
      } else r.current && !r.current.contains(i) && t();
    };
    return (e || as).forEach((o) => document.addEventListener(o, s)), () => {
      (e || as).forEach((o) => document.removeEventListener(o, s));
    };
  }, [r, t, n]), r;
}
function fa(t, e) {
  try {
    return t.addEventListener("change", e), () => t.removeEventListener("change", e);
  } catch {
    return t.addListener(e), () => t.removeListener(e);
  }
}
function ma(t, e) {
  return typeof window < "u" && "matchMedia" in window ? window.matchMedia(t).matches : !1;
}
function pa(t, e, { getInitialValueInEffect: n } = {
  getInitialValueInEffect: !0
}) {
  const [r, s] = V(
    n ? e : ma(t)
  ), o = q(null);
  return J(() => {
    if ("matchMedia" in window)
      return o.current = window.matchMedia(t), s(o.current.matches), fa(o.current, (i) => s(i.matches));
  }, [t]), r;
}
const fr = typeof document < "u" ? or : J;
function Xe(t, e) {
  const n = q(!1);
  J(
    () => () => {
      n.current = !1;
    },
    []
  ), J(() => {
    if (n.current)
      return t();
    n.current = !0;
  }, e);
}
function ha({ opened: t, shouldReturnFocus: e = !0 }) {
  const n = q(null), r = () => {
    var s;
    n.current && "focus" in n.current && typeof n.current.focus == "function" && ((s = n.current) == null || s.focus({ preventScroll: !0 }));
  };
  return Xe(() => {
    let s = -1;
    const o = (i) => {
      i.key === "Tab" && window.clearTimeout(s);
    };
    return document.addEventListener("keydown", o), t ? n.current = document.activeElement : e && (s = window.setTimeout(r, 10)), () => {
      window.clearTimeout(s), document.removeEventListener("keydown", o);
    };
  }, [t, e]), r;
}
const ga = /input|select|textarea|button|object/, Hs = "a, input, select, textarea, button, object, [tabindex]";
function ya(t) {
  return process.env.NODE_ENV === "test" ? !1 : t.style.display === "none";
}
function va(t) {
  if (t.getAttribute("aria-hidden") || t.getAttribute("hidden") || t.getAttribute("type") === "hidden")
    return !1;
  let n = t;
  for (; n && !(n === document.body || n.nodeType === 11); ) {
    if (ya(n))
      return !1;
    n = n.parentNode;
  }
  return !0;
}
function Us(t) {
  let e = t.getAttribute("tabindex");
  return e === null && (e = void 0), parseInt(e, 10);
}
function Xn(t) {
  const e = t.nodeName.toLowerCase(), n = !Number.isNaN(Us(t));
  return /* @ts-expect-error function accepts any html element but if it is a button, it should not be disabled to trigger the condition */ (ga.test(e) && !t.disabled || t instanceof HTMLAnchorElement && t.href || n) && va(t);
}
function Ys(t) {
  const e = Us(t);
  return (Number.isNaN(e) || e >= 0) && Xn(t);
}
function ba(t) {
  return Array.from(t.querySelectorAll(Hs)).filter(Ys);
}
function wa(t, e) {
  const n = ba(t);
  if (!n.length) {
    e.preventDefault();
    return;
  }
  const r = n[e.shiftKey ? 0 : n.length - 1], s = t.getRootNode();
  let o = r === s.activeElement || t === s.activeElement;
  const i = s.activeElement;
  if (i.tagName === "INPUT" && i.getAttribute("type") === "radio" && (o = n.filter(
    (d) => d.getAttribute("type") === "radio" && d.getAttribute("name") === i.getAttribute("name")
  ).includes(r)), !o)
    return;
  e.preventDefault();
  const c = n[e.shiftKey ? n.length - 1 : 0];
  c && c.focus();
}
function xa(t = !0) {
  const e = q(null), n = (s) => {
    let o = s.querySelector("[data-autofocus]");
    if (!o) {
      const i = Array.from(s.querySelectorAll(Hs));
      o = i.find(Ys) || i.find(Xn) || null, !o && Xn(s) && (o = s);
    }
    o ? o.focus({ preventScroll: !0 }) : process.env.NODE_ENV === "development" && console.warn(
      "[@mantine/hooks/use-focus-trap] Failed to find focusable element within provided node",
      s
    );
  }, r = ee(
    (s) => {
      t && s !== null && e.current !== s && (s ? (setTimeout(() => {
        s.getRootNode() ? n(s) : process.env.NODE_ENV === "development" && console.warn("[@mantine/hooks/use-focus-trap] Ref node is not part of the dom", s);
      }), e.current = s) : e.current = null);
    },
    [t]
  );
  return J(() => {
    if (!t)
      return;
    e.current && setTimeout(() => n(e.current));
    const s = (o) => {
      o.key === "Tab" && e.current && wa(e.current, o);
    };
    return document.addEventListener("keydown", s), () => document.removeEventListener("keydown", s);
  }, [t]), r;
}
const _a = Vn.useId || (() => {
});
function Sa() {
  const t = _a();
  return t ? `mantine-${t.replace(/:/g, "")}` : "";
}
function ka(t) {
  const e = Sa(), [n, r] = V(e);
  return fr(() => {
    r(Ws());
  }, []), typeof t == "string" ? t : typeof window > "u" ? e : n;
}
function qn(t, e) {
  if (typeof t == "function")
    return t(e);
  typeof t == "object" && t !== null && "current" in t && (t.current = e);
}
function Ca(...t) {
  const e = /* @__PURE__ */ new Map();
  return (n) => {
    if (t.forEach((r) => {
      const s = qn(r, n);
      s && e.set(r, s);
    }), e.size > 0)
      return () => {
        t.forEach((r) => {
          const s = e.get(r);
          s ? s() : qn(r, null);
        }), e.clear();
      };
  };
}
function ke(...t) {
  return ee(Ca(...t), t);
}
function Xs({
  value: t,
  defaultValue: e,
  finalValue: n,
  onChange: r = () => {
  }
}) {
  const [s, o] = V(
    e !== void 0 ? e : n
  ), i = (a, ...c) => {
    o(a), r == null || r(a, ...c);
  };
  return t !== void 0 ? [t, r, !0] : [s, i, !1];
}
function Ra(t, e) {
  return pa("(prefers-reduced-motion: reduce)", t, e);
}
function Ta(t) {
  var n;
  const e = Vn.version;
  return typeof Vn.version != "string" || e.startsWith("18.") ? t == null ? void 0 : t.ref : (n = t == null ? void 0 : t.props) == null ? void 0 : n.ref;
}
function qs(t) {
  var e, n, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (e = 0; e < s; e++) t[e] && (n = qs(t[e])) && (r && (r += " "), r += n);
  } else for (n in t) t[n] && (r && (r += " "), r += n);
  return r;
}
function Ve() {
  for (var t, e, n = 0, r = "", s = arguments.length; n < s; n++) (t = arguments[n]) && (e = qs(t)) && (r && (r += " "), r += e);
  return r;
}
const Na = {};
function Aa(t) {
  const e = {};
  return t.forEach((n) => {
    Object.entries(n).forEach(([r, s]) => {
      e[r] ? e[r] = Ve(e[r], s) : e[r] = s;
    });
  }), e;
}
function an({ theme: t, classNames: e, props: n, stylesCtx: r }) {
  const o = (Array.isArray(e) ? e : [e]).map(
    (i) => typeof i == "function" ? i(t, n, r) : i || Na
  );
  return Aa(o);
}
function Kt({ theme: t, styles: e, props: n, stylesCtx: r }) {
  return (Array.isArray(e) ? e : [e]).reduce((o, i) => typeof i == "function" ? { ...o, ...i(t, n, r) } : { ...o, ...i }, {});
}
const Pa = ft(null);
function Ge() {
  const t = mt(Pa);
  if (!t)
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  return t;
}
function Oa() {
  return Ge().classNamesPrefix;
}
function $a() {
  return Ge().getStyleNonce;
}
function Ea() {
  return Ge().withStaticClasses;
}
function Ia() {
  return Ge().headless;
}
function Da() {
  var t;
  return (t = Ge().stylesTransform) == null ? void 0 : t.sx;
}
function Ma() {
  var t;
  return (t = Ge().stylesTransform) == null ? void 0 : t.styles;
}
function Gs() {
  return Ge().env || "default";
}
function La(t) {
  return /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i.test(t);
}
function za(t) {
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
  const n = parseInt(e, 16), r = n >> 16 & 255, s = n >> 8 & 255, o = n & 255;
  return {
    r,
    g: s,
    b: o,
    a: 1
  };
}
function ja(t) {
  const [e, n, r, s] = t.replace(/[^0-9,./]/g, "").split(/[/,]/).map(Number);
  return { r: e, g: n, b: r, a: s === void 0 ? 1 : s };
}
function Fa(t) {
  const e = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i, n = t.match(e);
  if (!n)
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  const r = parseInt(n[1], 10), s = parseInt(n[2], 10) / 100, o = parseInt(n[3], 10) / 100, i = n[5] ? parseFloat(n[5]) : void 0, a = (1 - Math.abs(2 * o - 1)) * s, c = r / 60, l = a * (1 - Math.abs(c % 2 - 1)), d = o - a / 2;
  let f, u, m;
  return c >= 0 && c < 1 ? (f = a, u = l, m = 0) : c >= 1 && c < 2 ? (f = l, u = a, m = 0) : c >= 2 && c < 3 ? (f = 0, u = a, m = l) : c >= 3 && c < 4 ? (f = 0, u = l, m = a) : c >= 4 && c < 5 ? (f = l, u = 0, m = a) : (f = a, u = 0, m = l), {
    r: Math.round((f + d) * 255),
    g: Math.round((u + d) * 255),
    b: Math.round((m + d) * 255),
    a: i || 1
  };
}
function Ks(t) {
  return La(t) ? za(t) : t.startsWith("rgb") ? ja(t) : t.startsWith("hsl") ? Fa(t) : {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function Va(t, e) {
  return typeof t.primaryShade == "number" ? t.primaryShade : e === "dark" ? t.primaryShade.dark : t.primaryShade.light;
}
function In(t) {
  return t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4;
}
function Za(t) {
  const e = t.match(/oklch\((.*?)%\s/);
  return e ? parseFloat(e[1]) : null;
}
function Ba(t) {
  if (t.startsWith("oklch("))
    return (Za(t) || 0) / 100;
  const { r: e, g: n, b: r } = Ks(t), s = e / 255, o = n / 255, i = r / 255, a = In(s), c = In(o), l = In(i);
  return 0.2126 * a + 0.7152 * c + 0.0722 * l;
}
function _t(t, e = 0.179) {
  return t.startsWith("var(") ? !1 : Ba(t) > e;
}
function Pt({
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
      isLight: _t(
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
      isLight: _t(
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
      isLight: _t(
        t === "white" ? e.white : e.black,
        e.luminanceThreshold
      ),
      variable: `--mantine-color-${t}`
    };
  const [r, s] = t.split("."), o = s ? Number(s) : void 0, i = r in e.colors;
  if (i) {
    const a = o !== void 0 ? e.colors[r][o] : e.colors[r][Va(e, n || "light")];
    return {
      color: r,
      value: a,
      shade: o,
      isThemeColor: i,
      isLight: _t(a, e.luminanceThreshold),
      variable: s ? `--mantine-color-${r}-${o}` : `--mantine-color-${r}-filled`
    };
  }
  return {
    color: t,
    value: t,
    isThemeColor: i,
    isLight: _t(t, e.luminanceThreshold),
    shade: o,
    variable: void 0
  };
}
function at(t, e) {
  const n = Pt({ color: t || e.primaryColor, theme: e });
  return n.variable ? `var(${n.variable})` : t;
}
function Wa(t, e) {
  const n = {
    from: (t == null ? void 0 : t.from) || e.defaultGradient.from,
    to: (t == null ? void 0 : t.to) || e.defaultGradient.to,
    deg: (t == null ? void 0 : t.deg) ?? e.defaultGradient.deg ?? 0
  }, r = at(n.from, e), s = at(n.to, e);
  return `linear-gradient(${n.deg}deg, ${r} 0%, ${s} 100%)`;
}
function Ha(t, e) {
  if (typeof t != "string" || e > 1 || e < 0)
    return "rgba(0, 0, 0, 1)";
  if (t.startsWith("var(")) {
    const o = (1 - e) * 100;
    return `color-mix(in srgb, ${t}, transparent ${o}%)`;
  }
  if (t.startsWith("oklch"))
    return t.includes("/") ? t.replace(/\/\s*[\d.]+\s*\)/, `/ ${e})`) : t.replace(")", ` / ${e})`);
  const { r: n, g: r, b: s } = Ks(t);
  return `rgba(${n}, ${r}, ${s}, ${e})`;
}
const Ua = ft(null);
function Ke() {
  const t = mt(Ua);
  if (!t)
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  return t;
}
function Ya({ color: t, theme: e, autoContrast: n }) {
  return (typeof n == "boolean" ? n : e.autoContrast) && Pt({ color: t || e.primaryColor, theme: e }).isLight ? "var(--mantine-color-black)" : "var(--mantine-color-white)";
}
function Qs({
  classNames: t,
  styles: e,
  props: n,
  stylesCtx: r
}) {
  const s = Ke();
  return {
    resolvedClassNames: an({
      theme: s,
      classNames: t,
      props: n,
      stylesCtx: r || void 0
    }),
    resolvedStyles: Kt({
      theme: s,
      styles: e,
      props: n,
      stylesCtx: r || void 0
    })
  };
}
const Xa = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function qa({ theme: t, options: e, unstyled: n }) {
  return Ve(
    (e == null ? void 0 : e.focusable) && !n && (t.focusClassName || Xa[t.focusRing]),
    (e == null ? void 0 : e.active) && !n && t.activeClassName
  );
}
function Ga({
  selector: t,
  stylesCtx: e,
  options: n,
  props: r,
  theme: s
}) {
  return an({
    theme: s,
    classNames: n == null ? void 0 : n.classNames,
    props: (n == null ? void 0 : n.props) || r,
    stylesCtx: e
  })[t];
}
function cs({
  selector: t,
  stylesCtx: e,
  theme: n,
  classNames: r,
  props: s
}) {
  return an({ theme: n, classNames: r, props: s, stylesCtx: e })[t];
}
function Ka({ rootSelector: t, selector: e, className: n }) {
  return t === e ? n : void 0;
}
function Qa({ selector: t, classes: e, unstyled: n }) {
  return n ? void 0 : e[t];
}
function Ja({
  themeName: t,
  classNamesPrefix: e,
  selector: n,
  withStaticClass: r
}) {
  return r === !1 ? [] : t.map((s) => `${e}-${s}-${n}`);
}
function ec({
  themeName: t,
  theme: e,
  selector: n,
  props: r,
  stylesCtx: s
}) {
  return t.map(
    (o) => {
      var i, a;
      return (a = an({
        theme: e,
        classNames: (i = e.components[o]) == null ? void 0 : i.classNames,
        props: r,
        stylesCtx: s
      })) == null ? void 0 : a[n];
    }
  );
}
function tc({
  options: t,
  classes: e,
  selector: n,
  unstyled: r
}) {
  return t != null && t.variant && !r ? e[`${n}--${t.variant}`] : void 0;
}
function nc({
  theme: t,
  options: e,
  themeName: n,
  selector: r,
  classNamesPrefix: s,
  classNames: o,
  classes: i,
  unstyled: a,
  className: c,
  rootSelector: l,
  props: d,
  stylesCtx: f,
  withStaticClasses: u,
  headless: m,
  transformedStyles: p
}) {
  return Ve(
    qa({ theme: t, options: e, unstyled: a || m }),
    ec({ theme: t, themeName: n, selector: r, props: d, stylesCtx: f }),
    tc({ options: e, classes: i, selector: r, unstyled: a }),
    cs({ selector: r, stylesCtx: f, theme: t, classNames: o, props: d }),
    cs({ selector: r, stylesCtx: f, theme: t, classNames: p, props: d }),
    Ga({ selector: r, stylesCtx: f, options: e, props: d, theme: t }),
    Ka({ rootSelector: l, selector: r, className: c }),
    Qa({ selector: r, classes: i, unstyled: a || m }),
    u && !m && Ja({
      themeName: n,
      classNamesPrefix: s,
      selector: r,
      withStaticClass: e == null ? void 0 : e.withStaticClass
    }),
    e == null ? void 0 : e.className
  );
}
function rc({
  theme: t,
  themeName: e,
  props: n,
  stylesCtx: r,
  selector: s
}) {
  return e.map(
    (o) => {
      var i;
      return Kt({
        theme: t,
        styles: (i = t.components[o]) == null ? void 0 : i.styles,
        props: n,
        stylesCtx: r
      })[s];
    }
  ).reduce((o, i) => ({ ...o, ...i }), {});
}
function Gn({ style: t, theme: e }) {
  return Array.isArray(t) ? [...t].reduce(
    (n, r) => ({ ...n, ...Gn({ style: r, theme: e }) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function sc(t) {
  return t.reduce((e, n) => (n && Object.keys(n).forEach((r) => {
    e[r] = { ...e[r], ...dr(n[r]) };
  }), e), {});
}
function oc({
  vars: t,
  varsResolver: e,
  theme: n,
  props: r,
  stylesCtx: s,
  selector: o,
  themeName: i,
  headless: a
}) {
  var c;
  return (c = sc([
    a ? {} : e == null ? void 0 : e(n, r, s),
    ...i.map((l) => {
      var d, f, u;
      return (u = (f = (d = n.components) == null ? void 0 : d[l]) == null ? void 0 : f.vars) == null ? void 0 : u.call(f, n, r, s);
    }),
    t == null ? void 0 : t(n, r, s)
  ])) == null ? void 0 : c[o];
}
function ic({
  theme: t,
  themeName: e,
  selector: n,
  options: r,
  props: s,
  stylesCtx: o,
  rootSelector: i,
  styles: a,
  style: c,
  vars: l,
  varsResolver: d,
  headless: f,
  withStylesTransform: u
}) {
  return {
    ...!u && rc({ theme: t, themeName: e, props: s, stylesCtx: o, selector: n }),
    ...!u && Kt({ theme: t, styles: a, props: s, stylesCtx: o })[n],
    ...!u && Kt({ theme: t, styles: r == null ? void 0 : r.styles, props: (r == null ? void 0 : r.props) || s, stylesCtx: o })[n],
    ...oc({ theme: t, props: s, stylesCtx: o, vars: l, varsResolver: d, selector: n, themeName: e, headless: f }),
    ...i === n ? Gn({ style: c, theme: t }) : null,
    ...Gn({ style: r == null ? void 0 : r.style, theme: t })
  };
}
function ac({ props: t, stylesCtx: e, themeName: n }) {
  var i;
  const r = Ke(), s = (i = Ma()) == null ? void 0 : i();
  return {
    getTransformedStyles: (a) => s ? [
      ...a.map(
        (l) => s(l, { props: t, theme: r, ctx: e })
      ),
      ...n.map(
        (l) => {
          var d;
          return s((d = r.components[l]) == null ? void 0 : d.styles, { props: t, theme: r, ctx: e });
        }
      )
    ].filter(Boolean) : [],
    withStylesTransform: !!s
  };
}
function se({
  name: t,
  classes: e,
  props: n,
  stylesCtx: r,
  className: s,
  style: o,
  rootSelector: i = "root",
  unstyled: a,
  classNames: c,
  styles: l,
  vars: d,
  varsResolver: f
}) {
  const u = Ke(), m = Oa(), p = Ea(), h = Ia(), g = (Array.isArray(t) ? t : [t]).filter((v) => v), { withStylesTransform: b, getTransformedStyles: x } = ac({
    props: n,
    stylesCtx: r,
    themeName: g
  });
  return (v, w) => ({
    className: nc({
      theme: u,
      options: w,
      themeName: g,
      selector: v,
      classNamesPrefix: m,
      classNames: c,
      classes: e,
      unstyled: a,
      className: s,
      rootSelector: i,
      props: n,
      stylesCtx: r,
      withStaticClasses: p,
      headless: h,
      transformedStyles: x([w == null ? void 0 : w.styles, l])
    }),
    style: ic({
      theme: u,
      themeName: g,
      selector: v,
      options: w,
      props: n,
      stylesCtx: r,
      rootSelector: i,
      styles: l,
      style: o,
      vars: d,
      varsResolver: f,
      headless: h,
      withStylesTransform: b
    })
  });
}
function cc(t, e) {
  return typeof t == "boolean" ? t : e.autoContrast;
}
function B(t, e, n) {
  var i;
  const r = Ke(), s = (i = r.components[t]) == null ? void 0 : i.defaultProps, o = typeof s == "function" ? s(r) : s;
  return { ...e, ...o, ...dr(n) };
}
function Dn(t) {
  return lr(t).reduce(
    (e, n) => t[n] !== void 0 ? `${e}${ea(n)}:${t[n]};` : e,
    ""
  ).trim();
}
function lc({ selector: t, styles: e, media: n, container: r }) {
  const s = e ? Dn(e) : "", o = Array.isArray(n) ? n.map((a) => `@media${a.query}{${t}{${Dn(a.styles)}}}`) : [], i = Array.isArray(r) ? r.map(
    (a) => `@container ${a.query}{${t}{${Dn(a.styles)}}}`
  ) : [];
  return `${s ? `${t}{${s}}` : ""}${o.join("")}${i.join("")}`.trim();
}
function dc(t) {
  const e = $a();
  return /* @__PURE__ */ y(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: e == null ? void 0 : e(),
      dangerouslySetInnerHTML: { __html: lc(t) }
    }
  );
}
function uc(t) {
  const {
    m: e,
    mx: n,
    my: r,
    mt: s,
    mb: o,
    ml: i,
    mr: a,
    me: c,
    ms: l,
    p: d,
    px: f,
    py: u,
    pt: m,
    pb: p,
    pl: h,
    pr: g,
    pe: b,
    ps: x,
    bd: v,
    bg: w,
    c: S,
    opacity: R,
    ff: C,
    fz: N,
    fw: $,
    lts: P,
    ta: K,
    lh: z,
    fs: W,
    tt: H,
    td: U,
    w: j,
    miw: X,
    maw: M,
    h: Q,
    mih: ie,
    mah: bt,
    bgsz: Je,
    bgp: wt,
    bgr: xt,
    bga: xn,
    pos: _n,
    top: Lt,
    left: Sn,
    bottom: Pe,
    right: kn,
    inset: zt,
    display: Cn,
    flex: jt,
    hiddenFrom: Rn,
    visibleFrom: Tn,
    lightHidden: Nn,
    darkHidden: An,
    sx: Pn,
    ...Ft
  } = t;
  return { styleProps: dr({
    m: e,
    mx: n,
    my: r,
    mt: s,
    mb: o,
    ml: i,
    mr: a,
    me: c,
    ms: l,
    p: d,
    px: f,
    py: u,
    pt: m,
    pb: p,
    pl: h,
    pr: g,
    pe: b,
    ps: x,
    bd: v,
    bg: w,
    c: S,
    opacity: R,
    ff: C,
    fz: N,
    fw: $,
    lts: P,
    ta: K,
    lh: z,
    fs: W,
    tt: H,
    td: U,
    w: j,
    miw: X,
    maw: M,
    h: Q,
    mih: ie,
    mah: bt,
    bgsz: Je,
    bgp: wt,
    bgr: xt,
    bga: xn,
    pos: _n,
    top: Lt,
    left: Sn,
    bottom: Pe,
    right: kn,
    inset: zt,
    display: Cn,
    flex: jt,
    hiddenFrom: Rn,
    visibleFrom: Tn,
    lightHidden: Nn,
    darkHidden: An,
    sx: Pn
  }), rest: Ft };
}
const fc = {
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
function mr(t, e) {
  const n = Pt({ color: t, theme: e });
  return n.color === "dimmed" ? "var(--mantine-color-dimmed)" : n.color === "bright" ? "var(--mantine-color-bright)" : n.variable ? `var(${n.variable})` : n.color;
}
function mc(t, e) {
  const n = Pt({ color: t, theme: e });
  return n.isThemeColor && n.shade === void 0 ? `var(--mantine-color-${n.color}-text)` : mr(t, e);
}
function pc(t, e) {
  if (typeof t == "number")
    return fe(t);
  if (typeof t == "string") {
    const [n, r, ...s] = t.split(" ").filter((i) => i.trim() !== "");
    let o = `${fe(n)}`;
    return r && (o += ` ${r}`), s.length > 0 && (o += ` ${mr(s.join(" "), e)}`), o.trim();
  }
  return t;
}
const ls = {
  text: "var(--mantine-font-family)",
  mono: "var(--mantine-font-family-monospace)",
  monospace: "var(--mantine-font-family-monospace)",
  heading: "var(--mantine-font-family-headings)",
  headings: "var(--mantine-font-family-headings)"
};
function hc(t) {
  return typeof t == "string" && t in ls ? ls[t] : t;
}
const gc = ["h1", "h2", "h3", "h4", "h5", "h6"];
function yc(t, e) {
  return typeof t == "string" && t in e.fontSizes ? `var(--mantine-font-size-${t})` : typeof t == "string" && gc.includes(t) ? `var(--mantine-${t}-font-size)` : typeof t == "number" || typeof t == "string" ? fe(t) : t;
}
function vc(t) {
  return t;
}
const bc = ["h1", "h2", "h3", "h4", "h5", "h6"];
function wc(t, e) {
  return typeof t == "string" && t in e.lineHeights ? `var(--mantine-line-height-${t})` : typeof t == "string" && bc.includes(t) ? `var(--mantine-${t}-line-height)` : t;
}
function xc(t) {
  return typeof t == "number" ? fe(t) : t;
}
function _c(t, e) {
  if (typeof t == "number")
    return fe(t);
  if (typeof t == "string") {
    const n = t.replace("-", "");
    if (!(n in e.spacing))
      return fe(t);
    const r = `--mantine-spacing-${n}`;
    return t.startsWith("-") ? `calc(var(${r}) * -1)` : `var(${r})`;
  }
  return t;
}
const Mn = {
  color: mr,
  textColor: mc,
  fontSize: yc,
  spacing: _c,
  identity: vc,
  size: xc,
  lineHeight: wc,
  fontFamily: hc,
  border: pc
};
function ds(t) {
  return t.replace("(min-width: ", "").replace("em)", "");
}
function Sc({
  media: t,
  ...e
}) {
  const r = Object.keys(t).sort((s, o) => Number(ds(s)) - Number(ds(o))).map((s) => ({ query: s, styles: t[s] }));
  return { ...e, media: r };
}
function kc(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.keys(t);
  return !(e.length === 1 && e[0] === "base");
}
function Cc(t) {
  return typeof t == "object" && t !== null ? "base" in t ? t.base : void 0 : t;
}
function Rc(t) {
  return typeof t == "object" && t !== null ? lr(t).filter((e) => e !== "base") : [];
}
function Tc(t, e) {
  return typeof t == "object" && t !== null && e in t ? t[e] : t;
}
function Nc({
  styleProps: t,
  data: e,
  theme: n
}) {
  return Sc(
    lr(t).reduce(
      (r, s) => {
        if (s === "hiddenFrom" || s === "visibleFrom" || s === "sx")
          return r;
        const o = e[s], i = Array.isArray(o.property) ? o.property : [o.property], a = Cc(t[s]);
        if (!kc(t[s]))
          return i.forEach((l) => {
            r.inlineStyles[l] = Mn[o.type](a, n);
          }), r;
        r.hasResponsiveStyles = !0;
        const c = Rc(t[s]);
        return i.forEach((l) => {
          a && (r.styles[l] = Mn[o.type](a, n)), c.forEach((d) => {
            const f = `(min-width: ${n.breakpoints[d]})`;
            r.media[f] = {
              ...r.media[f],
              [l]: Mn[o.type](
                Tc(t[s], d),
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
function Ac() {
  return `__m__-${si().replace(/:/g, "")}`;
}
function Js(t) {
  return t.startsWith("data-") ? t : `data-${t}`;
}
function Pc(t) {
  return Object.keys(t).reduce((e, n) => {
    const r = t[n];
    return r === void 0 || r === "" || r === !1 || r === null || (e[Js(n)] = t[n]), e;
  }, {});
}
function eo(t) {
  return t ? typeof t == "string" ? { [Js(t)]: !0 } : Array.isArray(t) ? [...t].reduce(
    (e, n) => ({ ...e, ...eo(n) }),
    {}
  ) : Pc(t) : null;
}
function Kn(t, e) {
  return Array.isArray(t) ? [...t].reduce(
    (n, r) => ({ ...n, ...Kn(r, e) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function Oc({
  theme: t,
  style: e,
  vars: n,
  styleProps: r
}) {
  const s = Kn(e, t), o = Kn(n, t);
  return { ...s, ...o, ...r };
}
const to = G(
  ({
    component: t,
    style: e,
    __vars: n,
    className: r,
    variant: s,
    mod: o,
    size: i,
    hiddenFrom: a,
    visibleFrom: c,
    lightHidden: l,
    darkHidden: d,
    renderRoot: f,
    __size: u,
    ...m
  }, p) => {
    var N;
    const h = Ke(), g = t || "div", { styleProps: b, rest: x } = uc(m), v = Da(), w = (N = v == null ? void 0 : v()) == null ? void 0 : N(b.sx), S = Ac(), R = Nc({
      styleProps: b,
      theme: h,
      data: fc
    }), C = {
      ref: p,
      style: Oc({
        theme: h,
        style: e,
        vars: n,
        styleProps: R.inlineStyles
      }),
      className: Ve(r, w, {
        [S]: R.hasResponsiveStyles,
        "mantine-light-hidden": l,
        "mantine-dark-hidden": d,
        [`mantine-hidden-from-${a}`]: a,
        [`mantine-visible-from-${c}`]: c
      }),
      "data-variant": s,
      "data-size": Fs(i) ? void 0 : i || void 0,
      size: u,
      ...eo(o),
      ...x
    };
    return /* @__PURE__ */ ne(Ct, { children: [
      R.hasResponsiveStyles && /* @__PURE__ */ y(
        dc,
        {
          selector: `.${S}`,
          styles: R.styles,
          media: R.media
        }
      ),
      typeof f == "function" ? f(C) : /* @__PURE__ */ y(g, { ...C })
    ] });
  }
);
to.displayName = "@mantine/core/Box";
const Y = to;
function no(t) {
  return t;
}
function $c(t) {
  const e = t;
  return (n) => {
    const r = G((s, o) => /* @__PURE__ */ y(e, { ...n, ...s, ref: o }));
    return r.extend = e.extend, r.displayName = `WithProps(${e.displayName})`, r;
  };
}
function oe(t) {
  const e = G(t);
  return e.extend = no, e.withProps = (n) => {
    const r = G((s, o) => /* @__PURE__ */ y(e, { ...n, ...s, ref: o }));
    return r.extend = e.extend, r.displayName = `WithProps(${e.displayName})`, r;
  }, e;
}
function Ie(t) {
  const e = G(t);
  return e.withProps = (n) => {
    const r = G((s, o) => /* @__PURE__ */ y(e, { ...n, ...s, ref: o }));
    return r.extend = e.extend, r.displayName = `WithProps(${e.displayName})`, r;
  }, e.extend = no, e;
}
const Ec = ft({
  dir: "ltr",
  toggleDirection: () => {
  },
  setDirection: () => {
  }
});
function cn() {
  return mt(Ec);
}
function ln() {
  return typeof window < "u";
}
function pt(t) {
  return ro(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function he(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Ae(t) {
  var e;
  return (e = (ro(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function ro(t) {
  return ln() ? t instanceof Node || t instanceof he(t).Node : !1;
}
function le(t) {
  return ln() ? t instanceof Element || t instanceof he(t).Element : !1;
}
function De(t) {
  return ln() ? t instanceof HTMLElement || t instanceof he(t).HTMLElement : !1;
}
function us(t) {
  return !ln() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof he(t).ShadowRoot;
}
function Ot(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r,
    display: s
  } = xe(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + n) && s !== "inline" && s !== "contents";
}
function Ic(t) {
  return /^(table|td|th)$/.test(pt(t));
}
function dn(t) {
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
const Dc = /transform|translate|scale|rotate|perspective|filter/, Mc = /paint|layout|strict|content/, Ze = (t) => !!t && t !== "none";
let Ln;
function pr(t) {
  const e = le(t) ? xe(t) : t;
  return Ze(e.transform) || Ze(e.translate) || Ze(e.scale) || Ze(e.rotate) || Ze(e.perspective) || !hr() && (Ze(e.backdropFilter) || Ze(e.filter)) || Dc.test(e.willChange || "") || Mc.test(e.contain || "");
}
function Lc(t) {
  let e = je(t);
  for (; De(e) && !ct(e); ) {
    if (pr(e))
      return e;
    if (dn(e))
      return null;
    e = je(e);
  }
  return null;
}
function hr() {
  return Ln == null && (Ln = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Ln;
}
function ct(t) {
  return /^(html|body|#document)$/.test(pt(t));
}
function xe(t) {
  return he(t).getComputedStyle(t);
}
function un(t) {
  return le(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function je(t) {
  if (pt(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    us(t) && t.host || // Fallback.
    Ae(t)
  );
  return us(e) ? e.host : e;
}
function so(t) {
  const e = je(t);
  return ct(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : De(e) && Ot(e) ? e : so(e);
}
function Nt(t, e, n) {
  var r;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const s = so(t), o = s === ((r = t.ownerDocument) == null ? void 0 : r.body), i = he(s);
  if (o) {
    const a = Qn(i);
    return e.concat(i, i.visualViewport || [], Ot(s) ? s : [], a && n ? Nt(a) : []);
  } else
    return e.concat(s, Nt(s, [], n));
}
function Qn(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
const _e = Math.min, ce = Math.max, Qt = Math.round, Vt = Math.floor, Te = (t) => ({
  x: t,
  y: t
}), zc = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Jn(t, e, n) {
  return ce(t, _e(e, n));
}
function Ee(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Se(t) {
  return t.split("-")[0];
}
function ht(t) {
  return t.split("-")[1];
}
function gr(t) {
  return t === "x" ? "y" : "x";
}
function yr(t) {
  return t === "y" ? "height" : "width";
}
function be(t) {
  const e = t[0];
  return e === "t" || e === "b" ? "y" : "x";
}
function vr(t) {
  return gr(be(t));
}
function jc(t, e, n) {
  n === void 0 && (n = !1);
  const r = ht(t), s = vr(t), o = yr(s);
  let i = s === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[o] > e.floating[o] && (i = Jt(i)), [i, Jt(i)];
}
function Fc(t) {
  const e = Jt(t);
  return [er(t), e, er(e)];
}
function er(t) {
  return t.includes("start") ? t.replace("start", "end") : t.replace("end", "start");
}
const fs = ["left", "right"], ms = ["right", "left"], Vc = ["top", "bottom"], Zc = ["bottom", "top"];
function Bc(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? ms : fs : e ? fs : ms;
    case "left":
    case "right":
      return e ? Vc : Zc;
    default:
      return [];
  }
}
function Wc(t, e, n, r) {
  const s = ht(t);
  let o = Bc(Se(t), n === "start", r);
  return s && (o = o.map((i) => i + "-" + s), e && (o = o.concat(o.map(er)))), o;
}
function Jt(t) {
  const e = Se(t);
  return zc[e] + t.slice(e.length);
}
function Hc(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function br(t) {
  return typeof t != "number" ? Hc(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function lt(t) {
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
function ps(t, e, n) {
  let {
    reference: r,
    floating: s
  } = t;
  const o = be(e), i = vr(e), a = yr(i), c = Se(e), l = o === "y", d = r.x + r.width / 2 - s.width / 2, f = r.y + r.height / 2 - s.height / 2, u = r[a] / 2 - s[a] / 2;
  let m;
  switch (c) {
    case "top":
      m = {
        x: d,
        y: r.y - s.height
      };
      break;
    case "bottom":
      m = {
        x: d,
        y: r.y + r.height
      };
      break;
    case "right":
      m = {
        x: r.x + r.width,
        y: f
      };
      break;
    case "left":
      m = {
        x: r.x - s.width,
        y: f
      };
      break;
    default:
      m = {
        x: r.x,
        y: r.y
      };
  }
  switch (ht(e)) {
    case "start":
      m[i] -= u * (n && l ? -1 : 1);
      break;
    case "end":
      m[i] += u * (n && l ? -1 : 1);
      break;
  }
  return m;
}
async function Uc(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: r,
    y: s,
    platform: o,
    rects: i,
    elements: a,
    strategy: c
  } = t, {
    boundary: l = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: f = "floating",
    altBoundary: u = !1,
    padding: m = 0
  } = Ee(e, t), p = br(m), g = a[u ? f === "floating" ? "reference" : "floating" : f], b = lt(await o.getClippingRect({
    element: (n = await (o.isElement == null ? void 0 : o.isElement(g))) == null || n ? g : g.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: d,
    strategy: c
  })), x = f === "floating" ? {
    x: r,
    y: s,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, v = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(a.floating)), w = await (o.isElement == null ? void 0 : o.isElement(v)) ? await (o.getScale == null ? void 0 : o.getScale(v)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, S = lt(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: x,
    offsetParent: v,
    strategy: c
  }) : x);
  return {
    top: (b.top - S.top + p.top) / w.y,
    bottom: (S.bottom - b.bottom + p.bottom) / w.y,
    left: (b.left - S.left + p.left) / w.x,
    right: (S.right - b.right + p.right) / w.x
  };
}
const Yc = 50, Xc = async (t, e, n) => {
  const {
    placement: r = "bottom",
    strategy: s = "absolute",
    middleware: o = [],
    platform: i
  } = n, a = i.detectOverflow ? i : {
    ...i,
    detectOverflow: Uc
  }, c = await (i.isRTL == null ? void 0 : i.isRTL(e));
  let l = await i.getElementRects({
    reference: t,
    floating: e,
    strategy: s
  }), {
    x: d,
    y: f
  } = ps(l, r, c), u = r, m = 0;
  const p = {};
  for (let h = 0; h < o.length; h++) {
    const g = o[h];
    if (!g)
      continue;
    const {
      name: b,
      fn: x
    } = g, {
      x: v,
      y: w,
      data: S,
      reset: R
    } = await x({
      x: d,
      y: f,
      initialPlacement: r,
      placement: u,
      strategy: s,
      middlewareData: p,
      rects: l,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    d = v ?? d, f = w ?? f, p[b] = {
      ...p[b],
      ...S
    }, R && m < Yc && (m++, typeof R == "object" && (R.placement && (u = R.placement), R.rects && (l = R.rects === !0 ? await i.getElementRects({
      reference: t,
      floating: e,
      strategy: s
    }) : R.rects), {
      x: d,
      y: f
    } = ps(l, u, c)), h = -1);
  }
  return {
    x: d,
    y: f,
    placement: u,
    strategy: s,
    middlewareData: p
  };
}, qc = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: n,
      y: r,
      placement: s,
      rects: o,
      platform: i,
      elements: a,
      middlewareData: c
    } = e, {
      element: l,
      padding: d = 0
    } = Ee(t, e) || {};
    if (l == null)
      return {};
    const f = br(d), u = {
      x: n,
      y: r
    }, m = vr(s), p = yr(m), h = await i.getDimensions(l), g = m === "y", b = g ? "top" : "left", x = g ? "bottom" : "right", v = g ? "clientHeight" : "clientWidth", w = o.reference[p] + o.reference[m] - u[m] - o.floating[p], S = u[m] - o.reference[m], R = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l));
    let C = R ? R[v] : 0;
    (!C || !await (i.isElement == null ? void 0 : i.isElement(R))) && (C = a.floating[v] || o.floating[p]);
    const N = w / 2 - S / 2, $ = C / 2 - h[p] / 2 - 1, P = _e(f[b], $), K = _e(f[x], $), z = P, W = C - h[p] - K, H = C / 2 - h[p] / 2 + N, U = Jn(z, H, W), j = !c.arrow && ht(s) != null && H !== U && o.reference[p] / 2 - (H < z ? P : K) - h[p] / 2 < 0, X = j ? H < z ? H - z : H - W : 0;
    return {
      [m]: u[m] + X,
      data: {
        [m]: U,
        centerOffset: H - U - X,
        ...j && {
          alignmentOffset: X
        }
      },
      reset: j
    };
  }
}), Gc = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, r;
      const {
        placement: s,
        middlewareData: o,
        rects: i,
        initialPlacement: a,
        platform: c,
        elements: l
      } = e, {
        mainAxis: d = !0,
        crossAxis: f = !0,
        fallbackPlacements: u,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: p = "none",
        flipAlignment: h = !0,
        ...g
      } = Ee(t, e);
      if ((n = o.arrow) != null && n.alignmentOffset)
        return {};
      const b = Se(s), x = be(a), v = Se(a) === a, w = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), S = u || (v || !h ? [Jt(a)] : Fc(a)), R = p !== "none";
      !u && R && S.push(...Wc(a, h, p, w));
      const C = [a, ...S], N = await c.detectOverflow(e, g), $ = [];
      let P = ((r = o.flip) == null ? void 0 : r.overflows) || [];
      if (d && $.push(N[b]), f) {
        const H = jc(s, i, w);
        $.push(N[H[0]], N[H[1]]);
      }
      if (P = [...P, {
        placement: s,
        overflows: $
      }], !$.every((H) => H <= 0)) {
        var K, z;
        const H = (((K = o.flip) == null ? void 0 : K.index) || 0) + 1, U = C[H];
        if (U && (!(f === "alignment" ? x !== be(U) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        P.every((M) => be(M.placement) === x ? M.overflows[0] > 0 : !0)))
          return {
            data: {
              index: H,
              overflows: P
            },
            reset: {
              placement: U
            }
          };
        let j = (z = P.filter((X) => X.overflows[0] <= 0).sort((X, M) => X.overflows[1] - M.overflows[1])[0]) == null ? void 0 : z.placement;
        if (!j)
          switch (m) {
            case "bestFit": {
              var W;
              const X = (W = P.filter((M) => {
                if (R) {
                  const Q = be(M.placement);
                  return Q === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  Q === "y";
                }
                return !0;
              }).map((M) => [M.placement, M.overflows.filter((Q) => Q > 0).reduce((Q, ie) => Q + ie, 0)]).sort((M, Q) => M[1] - Q[1])[0]) == null ? void 0 : W[0];
              X && (j = X);
              break;
            }
            case "initialPlacement":
              j = a;
              break;
          }
        if (s !== j)
          return {
            reset: {
              placement: j
            }
          };
      }
      return {};
    }
  };
};
function oo(t) {
  const e = _e(...t.map((o) => o.left)), n = _e(...t.map((o) => o.top)), r = ce(...t.map((o) => o.right)), s = ce(...t.map((o) => o.bottom));
  return {
    x: e,
    y: n,
    width: r - e,
    height: s - n
  };
}
function Kc(t) {
  const e = t.slice().sort((s, o) => s.y - o.y), n = [];
  let r = null;
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    !r || o.y - r.y > r.height / 2 ? n.push([o]) : n[n.length - 1].push(o), r = o;
  }
  return n.map((s) => lt(oo(s)));
}
const Qc = function(t) {
  return t === void 0 && (t = {}), {
    name: "inline",
    options: t,
    async fn(e) {
      const {
        placement: n,
        elements: r,
        rects: s,
        platform: o,
        strategy: i
      } = e, {
        padding: a = 2,
        x: c,
        y: l
      } = Ee(t, e), d = Array.from(await (o.getClientRects == null ? void 0 : o.getClientRects(r.reference)) || []), f = Kc(d), u = lt(oo(d)), m = br(a);
      function p() {
        if (f.length === 2 && f[0].left > f[1].right && c != null && l != null)
          return f.find((g) => c > g.left - m.left && c < g.right + m.right && l > g.top - m.top && l < g.bottom + m.bottom) || u;
        if (f.length >= 2) {
          if (be(n) === "y") {
            const P = f[0], K = f[f.length - 1], z = Se(n) === "top", W = P.top, H = K.bottom, U = z ? P.left : K.left, j = z ? P.right : K.right, X = j - U, M = H - W;
            return {
              top: W,
              bottom: H,
              left: U,
              right: j,
              width: X,
              height: M,
              x: U,
              y: W
            };
          }
          const g = Se(n) === "left", b = ce(...f.map((P) => P.right)), x = _e(...f.map((P) => P.left)), v = f.filter((P) => g ? P.left === x : P.right === b), w = v[0].top, S = v[v.length - 1].bottom, R = x, C = b, N = C - R, $ = S - w;
          return {
            top: w,
            bottom: S,
            left: R,
            right: C,
            width: N,
            height: $,
            x: R,
            y: w
          };
        }
        return u;
      }
      const h = await o.getElementRects({
        reference: {
          getBoundingClientRect: p
        },
        floating: r.floating,
        strategy: i
      });
      return s.reference.x !== h.reference.x || s.reference.y !== h.reference.y || s.reference.width !== h.reference.width || s.reference.height !== h.reference.height ? {
        reset: {
          rects: h
        }
      } : {};
    }
  };
}, io = /* @__PURE__ */ new Set(["left", "top"]);
async function Jc(t, e) {
  const {
    placement: n,
    platform: r,
    elements: s
  } = t, o = await (r.isRTL == null ? void 0 : r.isRTL(s.floating)), i = Se(n), a = ht(n), c = be(n) === "y", l = io.has(i) ? -1 : 1, d = o && c ? -1 : 1, f = Ee(e, t);
  let {
    mainAxis: u,
    crossAxis: m,
    alignmentAxis: p
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return a && typeof p == "number" && (m = a === "end" ? p * -1 : p), c ? {
    x: m * d,
    y: u * l
  } : {
    x: u * l,
    y: m * d
  };
}
const el = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, r;
      const {
        x: s,
        y: o,
        placement: i,
        middlewareData: a
      } = e, c = await Jc(e, t);
      return i === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : {
        x: s + c.x,
        y: o + c.y,
        data: {
          ...c,
          placement: i
        }
      };
    }
  };
}, tl = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r,
        placement: s,
        platform: o
      } = e, {
        mainAxis: i = !0,
        crossAxis: a = !1,
        limiter: c = {
          fn: (b) => {
            let {
              x,
              y: v
            } = b;
            return {
              x,
              y: v
            };
          }
        },
        ...l
      } = Ee(t, e), d = {
        x: n,
        y: r
      }, f = await o.detectOverflow(e, l), u = be(Se(s)), m = gr(u);
      let p = d[m], h = d[u];
      if (i) {
        const b = m === "y" ? "top" : "left", x = m === "y" ? "bottom" : "right", v = p + f[b], w = p - f[x];
        p = Jn(v, p, w);
      }
      if (a) {
        const b = u === "y" ? "top" : "left", x = u === "y" ? "bottom" : "right", v = h + f[b], w = h - f[x];
        h = Jn(v, h, w);
      }
      const g = c.fn({
        ...e,
        [m]: p,
        [u]: h
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [m]: i,
            [u]: a
          }
        }
      };
    }
  };
}, nl = function(t) {
  return t === void 0 && (t = {}), {
    options: t,
    fn(e) {
      const {
        x: n,
        y: r,
        placement: s,
        rects: o,
        middlewareData: i
      } = e, {
        offset: a = 0,
        mainAxis: c = !0,
        crossAxis: l = !0
      } = Ee(t, e), d = {
        x: n,
        y: r
      }, f = be(s), u = gr(f);
      let m = d[u], p = d[f];
      const h = Ee(a, e), g = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (c) {
        const v = u === "y" ? "height" : "width", w = o.reference[u] - o.floating[v] + g.mainAxis, S = o.reference[u] + o.reference[v] - g.mainAxis;
        m < w ? m = w : m > S && (m = S);
      }
      if (l) {
        var b, x;
        const v = u === "y" ? "width" : "height", w = io.has(Se(s)), S = o.reference[f] - o.floating[v] + (w && ((b = i.offset) == null ? void 0 : b[f]) || 0) + (w ? 0 : g.crossAxis), R = o.reference[f] + o.reference[v] + (w ? 0 : ((x = i.offset) == null ? void 0 : x[f]) || 0) - (w ? g.crossAxis : 0);
        p < S ? p = S : p > R && (p = R);
      }
      return {
        [u]: m,
        [f]: p
      };
    }
  };
}, rl = function(t) {
  return t === void 0 && (t = {}), {
    name: "size",
    options: t,
    async fn(e) {
      var n, r;
      const {
        placement: s,
        rects: o,
        platform: i,
        elements: a
      } = e, {
        apply: c = () => {
        },
        ...l
      } = Ee(t, e), d = await i.detectOverflow(e, l), f = Se(s), u = ht(s), m = be(s) === "y", {
        width: p,
        height: h
      } = o.floating;
      let g, b;
      f === "top" || f === "bottom" ? (g = f, b = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (b = f, g = u === "end" ? "top" : "bottom");
      const x = h - d.top - d.bottom, v = p - d.left - d.right, w = _e(h - d[g], x), S = _e(p - d[b], v), R = !e.middlewareData.shift;
      let C = w, N = S;
      if ((n = e.middlewareData.shift) != null && n.enabled.x && (N = v), (r = e.middlewareData.shift) != null && r.enabled.y && (C = x), R && !u) {
        const P = ce(d.left, 0), K = ce(d.right, 0), z = ce(d.top, 0), W = ce(d.bottom, 0);
        m ? N = p - 2 * (P !== 0 || K !== 0 ? P + K : ce(d.left, d.right)) : C = h - 2 * (z !== 0 || W !== 0 ? z + W : ce(d.top, d.bottom));
      }
      await c({
        ...e,
        availableWidth: N,
        availableHeight: C
      });
      const $ = await i.getDimensions(a.floating);
      return p !== $.width || h !== $.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function ao(t) {
  const e = xe(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const s = De(t), o = s ? t.offsetWidth : n, i = s ? t.offsetHeight : r, a = Qt(n) !== o || Qt(r) !== i;
  return a && (n = o, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function wr(t) {
  return le(t) ? t : t.contextElement;
}
function tt(t) {
  const e = wr(t);
  if (!De(e))
    return Te(1);
  const n = e.getBoundingClientRect(), {
    width: r,
    height: s,
    $: o
  } = ao(e);
  let i = (o ? Qt(n.width) : n.width) / r, a = (o ? Qt(n.height) : n.height) / s;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const sl = /* @__PURE__ */ Te(0);
function co(t) {
  const e = he(t);
  return !hr() || !e.visualViewport ? sl : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function ol(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== he(t) ? !1 : e;
}
function qe(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const s = t.getBoundingClientRect(), o = wr(t);
  let i = Te(1);
  e && (r ? le(r) && (i = tt(r)) : i = tt(t));
  const a = ol(o, n, r) ? co(o) : Te(0);
  let c = (s.left + a.x) / i.x, l = (s.top + a.y) / i.y, d = s.width / i.x, f = s.height / i.y;
  if (o) {
    const u = he(o), m = r && le(r) ? he(r) : r;
    let p = u, h = Qn(p);
    for (; h && r && m !== p; ) {
      const g = tt(h), b = h.getBoundingClientRect(), x = xe(h), v = b.left + (h.clientLeft + parseFloat(x.paddingLeft)) * g.x, w = b.top + (h.clientTop + parseFloat(x.paddingTop)) * g.y;
      c *= g.x, l *= g.y, d *= g.x, f *= g.y, c += v, l += w, p = he(h), h = Qn(p);
    }
  }
  return lt({
    width: d,
    height: f,
    x: c,
    y: l
  });
}
function fn(t, e) {
  const n = un(t).scrollLeft;
  return e ? e.left + n : qe(Ae(t)).left + n;
}
function lo(t, e) {
  const n = t.getBoundingClientRect(), r = n.left + e.scrollLeft - fn(t, n), s = n.top + e.scrollTop;
  return {
    x: r,
    y: s
  };
}
function il(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: r,
    strategy: s
  } = t;
  const o = s === "fixed", i = Ae(r), a = e ? dn(e.floating) : !1;
  if (r === i || a && o)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = Te(1);
  const d = Te(0), f = De(r);
  if ((f || !f && !o) && ((pt(r) !== "body" || Ot(i)) && (c = un(r)), f)) {
    const m = qe(r);
    l = tt(r), d.x = m.x + r.clientLeft, d.y = m.y + r.clientTop;
  }
  const u = i && !f && !o ? lo(i, c) : Te(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + d.x + u.x,
    y: n.y * l.y - c.scrollTop * l.y + d.y + u.y
  };
}
function al(t) {
  return Array.from(t.getClientRects());
}
function cl(t) {
  const e = Ae(t), n = un(t), r = t.ownerDocument.body, s = ce(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), o = ce(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + fn(t);
  const a = -n.scrollTop;
  return xe(r).direction === "rtl" && (i += ce(e.clientWidth, r.clientWidth) - s), {
    width: s,
    height: o,
    x: i,
    y: a
  };
}
const hs = 25;
function ll(t, e) {
  const n = he(t), r = Ae(t), s = n.visualViewport;
  let o = r.clientWidth, i = r.clientHeight, a = 0, c = 0;
  if (s) {
    o = s.width, i = s.height;
    const d = hr();
    (!d || d && e === "fixed") && (a = s.offsetLeft, c = s.offsetTop);
  }
  const l = fn(r);
  if (l <= 0) {
    const d = r.ownerDocument, f = d.body, u = getComputedStyle(f), m = d.compatMode === "CSS1Compat" && parseFloat(u.marginLeft) + parseFloat(u.marginRight) || 0, p = Math.abs(r.clientWidth - f.clientWidth - m);
    p <= hs && (o -= p);
  } else l <= hs && (o += l);
  return {
    width: o,
    height: i,
    x: a,
    y: c
  };
}
function dl(t, e) {
  const n = qe(t, !0, e === "fixed"), r = n.top + t.clientTop, s = n.left + t.clientLeft, o = De(t) ? tt(t) : Te(1), i = t.clientWidth * o.x, a = t.clientHeight * o.y, c = s * o.x, l = r * o.y;
  return {
    width: i,
    height: a,
    x: c,
    y: l
  };
}
function gs(t, e, n) {
  let r;
  if (e === "viewport")
    r = ll(t, n);
  else if (e === "document")
    r = cl(Ae(t));
  else if (le(e))
    r = dl(e, n);
  else {
    const s = co(t);
    r = {
      x: e.x - s.x,
      y: e.y - s.y,
      width: e.width,
      height: e.height
    };
  }
  return lt(r);
}
function uo(t, e) {
  const n = je(t);
  return n === e || !le(n) || ct(n) ? !1 : xe(n).position === "fixed" || uo(n, e);
}
function ul(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let r = Nt(t, [], !1).filter((a) => le(a) && pt(a) !== "body"), s = null;
  const o = xe(t).position === "fixed";
  let i = o ? je(t) : t;
  for (; le(i) && !ct(i); ) {
    const a = xe(i), c = pr(i);
    !c && a.position === "fixed" && (s = null), (o ? !c && !s : !c && a.position === "static" && !!s && (s.position === "absolute" || s.position === "fixed") || Ot(i) && !c && uo(t, i)) ? r = r.filter((d) => d !== i) : s = a, i = je(i);
  }
  return e.set(t, r), r;
}
function fl(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: s
  } = t;
  const i = [...n === "clippingAncestors" ? dn(e) ? [] : ul(e, this._c) : [].concat(n), r], a = gs(e, i[0], s);
  let c = a.top, l = a.right, d = a.bottom, f = a.left;
  for (let u = 1; u < i.length; u++) {
    const m = gs(e, i[u], s);
    c = ce(m.top, c), l = _e(m.right, l), d = _e(m.bottom, d), f = ce(m.left, f);
  }
  return {
    width: l - f,
    height: d - c,
    x: f,
    y: c
  };
}
function ml(t) {
  const {
    width: e,
    height: n
  } = ao(t);
  return {
    width: e,
    height: n
  };
}
function pl(t, e, n) {
  const r = De(e), s = Ae(e), o = n === "fixed", i = qe(t, !0, o, e);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Te(0);
  function l() {
    c.x = fn(s);
  }
  if (r || !r && !o)
    if ((pt(e) !== "body" || Ot(s)) && (a = un(e)), r) {
      const m = qe(e, !0, o, e);
      c.x = m.x + e.clientLeft, c.y = m.y + e.clientTop;
    } else s && l();
  o && !r && s && l();
  const d = s && !r && !o ? lo(s, a) : Te(0), f = i.left + a.scrollLeft - c.x - d.x, u = i.top + a.scrollTop - c.y - d.y;
  return {
    x: f,
    y: u,
    width: i.width,
    height: i.height
  };
}
function zn(t) {
  return xe(t).position === "static";
}
function ys(t, e) {
  if (!De(t) || xe(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return Ae(t) === n && (n = n.ownerDocument.body), n;
}
function fo(t, e) {
  const n = he(t);
  if (dn(t))
    return n;
  if (!De(t)) {
    let s = je(t);
    for (; s && !ct(s); ) {
      if (le(s) && !zn(s))
        return s;
      s = je(s);
    }
    return n;
  }
  let r = ys(t, e);
  for (; r && Ic(r) && zn(r); )
    r = ys(r, e);
  return r && ct(r) && zn(r) && !pr(r) ? n : r || Lc(t) || n;
}
const hl = async function(t) {
  const e = this.getOffsetParent || fo, n = this.getDimensions, r = await n(t.floating);
  return {
    reference: pl(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function gl(t) {
  return xe(t).direction === "rtl";
}
const yl = {
  convertOffsetParentRelativeRectToViewportRelativeRect: il,
  getDocumentElement: Ae,
  getClippingRect: fl,
  getOffsetParent: fo,
  getElementRects: hl,
  getClientRects: al,
  getDimensions: ml,
  getScale: tt,
  isElement: le,
  isRTL: gl
};
function mo(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function vl(t, e) {
  let n = null, r;
  const s = Ae(t);
  function o() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function i(a, c) {
    a === void 0 && (a = !1), c === void 0 && (c = 1), o();
    const l = t.getBoundingClientRect(), {
      left: d,
      top: f,
      width: u,
      height: m
    } = l;
    if (a || e(), !u || !m)
      return;
    const p = Vt(f), h = Vt(s.clientWidth - (d + u)), g = Vt(s.clientHeight - (f + m)), b = Vt(d), v = {
      rootMargin: -p + "px " + -h + "px " + -g + "px " + -b + "px",
      threshold: ce(0, _e(1, c)) || 1
    };
    let w = !0;
    function S(R) {
      const C = R[0].intersectionRatio;
      if (C !== c) {
        if (!w)
          return i();
        C ? i(!1, C) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      C === 1 && !mo(l, t.getBoundingClientRect()) && i(), w = !1;
    }
    try {
      n = new IntersectionObserver(S, {
        ...v,
        // Handle <iframe>s
        root: s.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(S, v);
    }
    n.observe(t);
  }
  return i(!0), o;
}
function bl(t, e, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: s = !0,
    ancestorResize: o = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = wr(t), d = s || o ? [...l ? Nt(l) : [], ...e ? Nt(e) : []] : [];
  d.forEach((b) => {
    s && b.addEventListener("scroll", n, {
      passive: !0
    }), o && b.addEventListener("resize", n);
  });
  const f = l && a ? vl(l, n) : null;
  let u = -1, m = null;
  i && (m = new ResizeObserver((b) => {
    let [x] = b;
    x && x.target === l && m && e && (m.unobserve(e), cancelAnimationFrame(u), u = requestAnimationFrame(() => {
      var v;
      (v = m) == null || v.observe(e);
    })), n();
  }), l && !c && m.observe(l), e && m.observe(e));
  let p, h = c ? qe(t) : null;
  c && g();
  function g() {
    const b = qe(t);
    h && !mo(h, b) && n(), h = b, p = requestAnimationFrame(g);
  }
  return n(), () => {
    var b;
    d.forEach((x) => {
      s && x.removeEventListener("scroll", n), o && x.removeEventListener("resize", n);
    }), f == null || f(), (b = m) == null || b.disconnect(), m = null, c && cancelAnimationFrame(p);
  };
}
const wl = el, xl = tl, _l = Gc, Sl = rl, vs = qc, kl = Qc, Cl = nl, Rl = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), s = {
    platform: yl,
    ...n
  }, o = {
    ...s.platform,
    _c: r
  };
  return Xc(t, e, {
    ...s,
    platform: o
  });
};
var Tl = typeof document < "u", Nl = function() {
}, Bt = Tl ? or : Nl;
function en(t, e) {
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
        if (!en(t[r], e[r]))
          return !1;
      return !0;
    }
    if (s = Object.keys(t), n = s.length, n !== Object.keys(e).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(e, s[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const o = s[r];
      if (!(o === "_owner" && t.$$typeof) && !en(t[o], e[o]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}
function po(t) {
  return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function bs(t, e) {
  const n = po(t);
  return Math.round(e * n) / n;
}
function jn(t) {
  const e = D.useRef(t);
  return Bt(() => {
    e.current = t;
  }), e;
}
function Al(t) {
  t === void 0 && (t = {});
  const {
    placement: e = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: s,
    elements: {
      reference: o,
      floating: i
    } = {},
    transform: a = !0,
    whileElementsMounted: c,
    open: l
  } = t, [d, f] = D.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: e,
    middlewareData: {},
    isPositioned: !1
  }), [u, m] = D.useState(r);
  en(u, r) || m(r);
  const [p, h] = D.useState(null), [g, b] = D.useState(null), x = D.useCallback((M) => {
    M !== R.current && (R.current = M, h(M));
  }, []), v = D.useCallback((M) => {
    M !== C.current && (C.current = M, b(M));
  }, []), w = o || p, S = i || g, R = D.useRef(null), C = D.useRef(null), N = D.useRef(d), $ = c != null, P = jn(c), K = jn(s), z = jn(l), W = D.useCallback(() => {
    if (!R.current || !C.current)
      return;
    const M = {
      placement: e,
      strategy: n,
      middleware: u
    };
    K.current && (M.platform = K.current), Rl(R.current, C.current, M).then((Q) => {
      const ie = {
        ...Q,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: z.current !== !1
      };
      H.current && !en(N.current, ie) && (N.current = ie, ii.flushSync(() => {
        f(ie);
      }));
    });
  }, [u, e, n, K, z]);
  Bt(() => {
    l === !1 && N.current.isPositioned && (N.current.isPositioned = !1, f((M) => ({
      ...M,
      isPositioned: !1
    })));
  }, [l]);
  const H = D.useRef(!1);
  Bt(() => (H.current = !0, () => {
    H.current = !1;
  }), []), Bt(() => {
    if (w && (R.current = w), S && (C.current = S), w && S) {
      if (P.current)
        return P.current(w, S, W);
      W();
    }
  }, [w, S, W, P, $]);
  const U = D.useMemo(() => ({
    reference: R,
    floating: C,
    setReference: x,
    setFloating: v
  }), [x, v]), j = D.useMemo(() => ({
    reference: w,
    floating: S
  }), [w, S]), X = D.useMemo(() => {
    const M = {
      position: n,
      left: 0,
      top: 0
    };
    if (!j.floating)
      return M;
    const Q = bs(j.floating, d.x), ie = bs(j.floating, d.y);
    return a ? {
      ...M,
      transform: "translate(" + Q + "px, " + ie + "px)",
      ...po(j.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: Q,
      top: ie
    };
  }, [n, a, j.floating, d.x, d.y]);
  return D.useMemo(() => ({
    ...d,
    update: W,
    refs: U,
    elements: j,
    floatingStyles: X
  }), [d, W, U, j, X]);
}
const Pl = (t) => {
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
      return r && e(r) ? r.current != null ? vs({
        element: r.current,
        padding: s
      }).fn(n) : {} : r ? vs({
        element: r,
        padding: s
      }).fn(n) : {};
    }
  };
}, Ol = (t, e) => {
  const n = wl(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, $l = (t, e) => {
  const n = xl(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, ws = (t, e) => ({
  fn: Cl(t).fn,
  options: [t, e]
}), xs = (t, e) => {
  const n = _l(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, El = (t, e) => {
  const n = Sl(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, _s = (t, e) => {
  const n = kl(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Il = (t, e) => {
  const n = Pl(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
};
function Dl(t) {
  return D.useMemo(() => t.every((e) => e == null) ? null : (e) => {
    t.forEach((n) => {
      typeof n == "function" ? n(e) : n != null && (n.current = e);
    });
  }, t);
}
const ho = {
  ...D
}, Ml = ho.useInsertionEffect, Ll = Ml || ((t) => t());
function zl(t) {
  const e = D.useRef(() => {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Cannot call an event handler while rendering.");
  });
  return Ll(() => {
    e.current = t;
  }), D.useCallback(function() {
    for (var n = arguments.length, r = new Array(n), s = 0; s < n; s++)
      r[s] = arguments[s];
    return e.current == null ? void 0 : e.current(...r);
  }, []);
}
var tr = typeof document < "u" ? or : J;
let Ss = !1, jl = 0;
const ks = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + jl++
);
function Fl() {
  const [t, e] = D.useState(() => Ss ? ks() : void 0);
  return tr(() => {
    t == null && e(ks());
  }, []), D.useEffect(() => {
    Ss = !0;
  }, []), t;
}
const Vl = ho.useId, Zl = Vl || Fl;
let nr;
process.env.NODE_ENV !== "production" && (nr = /* @__PURE__ */ new Set());
function Bl() {
  for (var t, e = arguments.length, n = new Array(e), r = 0; r < e; r++)
    n[r] = arguments[r];
  const s = "Floating UI: " + n.join(" ");
  if (!((t = nr) != null && t.has(s))) {
    var o;
    (o = nr) == null || o.add(s), console.error(s);
  }
}
function Wl() {
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
const Hl = /* @__PURE__ */ D.createContext(null), Ul = /* @__PURE__ */ D.createContext(null), Yl = () => {
  var t;
  return ((t = D.useContext(Hl)) == null ? void 0 : t.id) || null;
}, Xl = () => D.useContext(Ul);
function ql(t) {
  const {
    open: e = !1,
    onOpenChange: n,
    elements: r
  } = t, s = Zl(), o = D.useRef({}), [i] = D.useState(() => Wl()), a = Yl() != null;
  if (process.env.NODE_ENV !== "production") {
    const m = r.reference;
    m && !le(m) && Bl("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
  }
  const [c, l] = D.useState(r.reference), d = zl((m, p, h) => {
    o.current.openEvent = m ? p : void 0, i.emit("openchange", {
      open: m,
      event: p,
      reason: h,
      nested: a
    }), n == null || n(m, p, h);
  }), f = D.useMemo(() => ({
    setPositionReference: l
  }), []), u = D.useMemo(() => ({
    reference: c || r.reference || null,
    floating: r.floating || null,
    domReference: r.reference
  }), [c, r.reference, r.floating]);
  return D.useMemo(() => ({
    dataRef: o,
    open: e,
    onOpenChange: d,
    elements: u,
    events: i,
    floatingId: s,
    refs: f
  }), [e, d, u, i, s, f]);
}
function Gl(t) {
  t === void 0 && (t = {});
  const {
    nodeId: e
  } = t, n = ql({
    ...t,
    elements: {
      reference: null,
      floating: null,
      ...t.elements
    }
  }), r = t.rootContext || n, s = r.elements, [o, i] = D.useState(null), [a, c] = D.useState(null), d = (s == null ? void 0 : s.domReference) || o, f = D.useRef(null), u = Xl();
  tr(() => {
    d && (f.current = d);
  }, [d]);
  const m = Al({
    ...t,
    elements: {
      ...s,
      ...a && {
        reference: a
      }
    }
  }), p = D.useCallback((v) => {
    const w = le(v) ? {
      getBoundingClientRect: () => v.getBoundingClientRect(),
      contextElement: v
    } : v;
    c(w), m.refs.setReference(w);
  }, [m.refs]), h = D.useCallback((v) => {
    (le(v) || v === null) && (f.current = v, i(v)), (le(m.refs.reference.current) || m.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    v !== null && !le(v)) && m.refs.setReference(v);
  }, [m.refs]), g = D.useMemo(() => ({
    ...m.refs,
    setReference: h,
    setPositionReference: p,
    domReference: f
  }), [m.refs, h, p]), b = D.useMemo(() => ({
    ...m.elements,
    domReference: d
  }), [m.elements, d]), x = D.useMemo(() => ({
    ...m,
    ...r,
    refs: g,
    elements: b,
    nodeId: e
  }), [m, g, b, e, r]);
  return tr(() => {
    r.dataRef.current.floatingContext = x;
    const v = u == null ? void 0 : u.nodesRef.current.find((w) => w.id === e);
    v && (v.context = x);
  }), D.useMemo(() => ({
    ...m,
    context: x,
    refs: g,
    elements: b
  }), [m, g, b, x]);
}
const [Kl, ye] = At(
  "ScrollArea.Root component was not found in tree"
);
function dt(t, e) {
  const n = Be(e);
  fr(() => {
    let r = 0;
    if (t) {
      const s = new ResizeObserver(() => {
        cancelAnimationFrame(r), r = window.requestAnimationFrame(n);
      });
      return s.observe(t), () => {
        window.cancelAnimationFrame(r), s.unobserve(t);
      };
    }
  }, [t, n]);
}
const Ql = G((t, e) => {
  const { style: n, ...r } = t, s = ye(), [o, i] = V(0), [a, c] = V(0), l = !!(o && a);
  return dt(s.scrollbarX, () => {
    var f;
    const d = ((f = s.scrollbarX) == null ? void 0 : f.offsetHeight) || 0;
    s.onCornerHeightChange(d), c(d);
  }), dt(s.scrollbarY, () => {
    var f;
    const d = ((f = s.scrollbarY) == null ? void 0 : f.offsetWidth) || 0;
    s.onCornerWidthChange(d), i(d);
  }), l ? /* @__PURE__ */ y("div", { ...r, ref: e, style: { ...n, width: o, height: a } }) : null;
}), Jl = G((t, e) => {
  const n = ye(), r = !!(n.scrollbarX && n.scrollbarY);
  return n.type !== "scroll" && r ? /* @__PURE__ */ y(Ql, { ...t, ref: e }) : null;
}), ed = {
  scrollHideDelay: 1e3,
  type: "hover"
}, go = G((t, e) => {
  const n = B("ScrollAreaRoot", ed, t), { type: r, scrollHideDelay: s, scrollbars: o, ...i } = n, [a, c] = V(null), [l, d] = V(null), [f, u] = V(null), [m, p] = V(null), [h, g] = V(null), [b, x] = V(0), [v, w] = V(0), [S, R] = V(!1), [C, N] = V(!1), $ = ke(e, (P) => c(P));
  return /* @__PURE__ */ y(
    Kl,
    {
      value: {
        type: r,
        scrollHideDelay: s,
        scrollArea: a,
        viewport: l,
        onViewportChange: d,
        content: f,
        onContentChange: u,
        scrollbarX: m,
        onScrollbarXChange: p,
        scrollbarXEnabled: S,
        onScrollbarXEnabledChange: R,
        scrollbarY: h,
        onScrollbarYChange: g,
        scrollbarYEnabled: C,
        onScrollbarYEnabledChange: N,
        onCornerWidthChange: x,
        onCornerHeightChange: w
      },
      children: /* @__PURE__ */ y(
        Y,
        {
          ...i,
          ref: $,
          __vars: {
            "--sa-corner-width": o !== "xy" ? "0px" : `${b}px`,
            "--sa-corner-height": o !== "xy" ? "0px" : `${v}px`
          }
        }
      )
    }
  );
});
go.displayName = "@mantine/core/ScrollAreaRoot";
function yo(t, e) {
  const n = t / e;
  return Number.isNaN(n) ? 0 : n;
}
function mn(t) {
  const e = yo(t.viewport, t.content), n = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, r = (t.scrollbar.size - n) * e;
  return Math.max(r, 18);
}
function vo(t, e) {
  return (n) => {
    if (t[0] === t[1] || e[0] === e[1])
      return e[0];
    const r = (e[1] - e[0]) / (t[1] - t[0]);
    return e[0] + r * (n - t[0]);
  };
}
function td(t, [e, n]) {
  return Math.min(n, Math.max(e, t));
}
function Cs(t, e, n = "ltr") {
  const r = mn(e), s = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, o = e.scrollbar.size - s, i = e.content - e.viewport, a = o - r, c = n === "ltr" ? [0, i] : [i * -1, 0], l = td(t, c);
  return vo([0, i], [0, a])(l);
}
function nd(t, e, n, r = "ltr") {
  const s = mn(n), o = s / 2, i = e || o, a = s - i, c = n.scrollbar.paddingStart + i, l = n.scrollbar.size - n.scrollbar.paddingEnd - a, d = n.content - n.viewport, f = r === "ltr" ? [0, d] : [d * -1, 0];
  return vo([c, l], f)(t);
}
function bo(t, e) {
  return t > 0 && t < e;
}
function tn(t) {
  return t ? parseInt(t, 10) : 0;
}
function We(t, e, { checkForDefaultPrevented: n = !0 } = {}) {
  return (r) => {
    t == null || t(r), (n === !1 || !r.defaultPrevented) && (e == null || e(r));
  };
}
const [rd, wo] = At(
  "ScrollAreaScrollbar was not found in tree"
), xo = G((t, e) => {
  const {
    sizes: n,
    hasThumb: r,
    onThumbChange: s,
    onThumbPointerUp: o,
    onThumbPointerDown: i,
    onThumbPositionChange: a,
    onDragScroll: c,
    onWheelScroll: l,
    onResize: d,
    ...f
  } = t, u = ye(), [m, p] = V(null), h = ke(e, (N) => p(N)), g = q(null), b = q(""), { viewport: x } = u, v = n.content - n.viewport, w = Be(l), S = Be(a), R = on(d, 10), C = (N) => {
    if (g.current) {
      const $ = N.clientX - g.current.left, P = N.clientY - g.current.top;
      c({ x: $, y: P });
    }
  };
  return J(() => {
    const N = ($) => {
      const P = $.target;
      (m == null ? void 0 : m.contains(P)) && w($, v);
    };
    return document.addEventListener("wheel", N, { passive: !1 }), () => document.removeEventListener("wheel", N, { passive: !1 });
  }, [x, m, v, w]), J(S, [n, S]), dt(m, R), dt(u.content, R), /* @__PURE__ */ y(
    rd,
    {
      value: {
        scrollbar: m,
        hasThumb: r,
        onThumbChange: Be(s),
        onThumbPointerUp: Be(o),
        onThumbPositionChange: S,
        onThumbPointerDown: Be(i)
      },
      children: /* @__PURE__ */ y(
        "div",
        {
          ...f,
          ref: h,
          "data-mantine-scrollbar": !0,
          style: { position: "absolute", ...f.style },
          onPointerDown: We(t.onPointerDown, (N) => {
            N.preventDefault(), N.button === 0 && (N.target.setPointerCapture(N.pointerId), g.current = m.getBoundingClientRect(), b.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", C(N));
          }),
          onPointerMove: We(t.onPointerMove, C),
          onPointerUp: We(t.onPointerUp, (N) => {
            const $ = N.target;
            $.hasPointerCapture(N.pointerId) && (N.preventDefault(), $.releasePointerCapture(N.pointerId));
          }),
          onLostPointerCapture: () => {
            document.body.style.webkitUserSelect = b.current, g.current = null;
          }
        }
      )
    }
  );
}), _o = G(
  (t, e) => {
    const { sizes: n, onSizesChange: r, style: s, ...o } = t, i = ye(), [a, c] = V(), l = q(null), d = ke(e, l, i.onScrollbarXChange);
    return J(() => {
      l.current && c(getComputedStyle(l.current));
    }, [l]), /* @__PURE__ */ y(
      xo,
      {
        "data-orientation": "horizontal",
        ...o,
        ref: d,
        sizes: n,
        style: {
          ...s,
          "--sa-thumb-width": `${mn(n)}px`
        },
        onThumbPointerDown: (f) => t.onThumbPointerDown(f.x),
        onDragScroll: (f) => t.onDragScroll(f.x),
        onWheelScroll: (f, u) => {
          if (i.viewport) {
            const m = i.viewport.scrollLeft + f.deltaX;
            t.onWheelScroll(m), bo(m, u) && f.preventDefault();
          }
        },
        onResize: () => {
          l.current && i.viewport && a && r({
            content: i.viewport.scrollWidth,
            viewport: i.viewport.offsetWidth,
            scrollbar: {
              size: l.current.clientWidth,
              paddingStart: tn(a.paddingLeft),
              paddingEnd: tn(a.paddingRight)
            }
          });
        }
      }
    );
  }
);
_o.displayName = "@mantine/core/ScrollAreaScrollbarX";
const So = G(
  (t, e) => {
    const { sizes: n, onSizesChange: r, style: s, ...o } = t, i = ye(), [a, c] = V(), l = q(null), d = ke(e, l, i.onScrollbarYChange);
    return J(() => {
      l.current && c(window.getComputedStyle(l.current));
    }, []), /* @__PURE__ */ y(
      xo,
      {
        ...o,
        "data-orientation": "vertical",
        ref: d,
        sizes: n,
        style: {
          "--sa-thumb-height": `${mn(n)}px`,
          ...s
        },
        onThumbPointerDown: (f) => t.onThumbPointerDown(f.y),
        onDragScroll: (f) => t.onDragScroll(f.y),
        onWheelScroll: (f, u) => {
          if (i.viewport) {
            const m = i.viewport.scrollTop + f.deltaY;
            t.onWheelScroll(m), bo(m, u) && f.preventDefault();
          }
        },
        onResize: () => {
          l.current && i.viewport && a && r({
            content: i.viewport.scrollHeight,
            viewport: i.viewport.offsetHeight,
            scrollbar: {
              size: l.current.clientHeight,
              paddingStart: tn(a.paddingTop),
              paddingEnd: tn(a.paddingBottom)
            }
          });
        }
      }
    );
  }
);
So.displayName = "@mantine/core/ScrollAreaScrollbarY";
const pn = G((t, e) => {
  const { orientation: n = "vertical", ...r } = t, { dir: s } = cn(), o = ye(), i = q(null), a = q(0), [c, l] = V({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), d = yo(c.viewport, c.content), f = {
    ...r,
    sizes: c,
    onSizesChange: l,
    hasThumb: d > 0 && d < 1,
    onThumbChange: (m) => {
      i.current = m;
    },
    onThumbPointerUp: () => {
      a.current = 0;
    },
    onThumbPointerDown: (m) => {
      a.current = m;
    }
  }, u = (m, p) => nd(m, a.current, c, p);
  return n === "horizontal" ? /* @__PURE__ */ y(
    _o,
    {
      ...f,
      ref: e,
      onThumbPositionChange: () => {
        if (o.viewport && i.current) {
          const m = o.viewport.scrollLeft, p = Cs(m, c, s);
          i.current.style.transform = `translate3d(${p}px, 0, 0)`;
        }
      },
      onWheelScroll: (m) => {
        o.viewport && (o.viewport.scrollLeft = m);
      },
      onDragScroll: (m) => {
        o.viewport && (o.viewport.scrollLeft = u(m, s));
      }
    }
  ) : n === "vertical" ? /* @__PURE__ */ y(
    So,
    {
      ...f,
      ref: e,
      onThumbPositionChange: () => {
        if (o.viewport && i.current) {
          const m = o.viewport.scrollTop, p = Cs(m, c);
          c.scrollbar.size === 0 ? i.current.style.setProperty("--thumb-opacity", "0") : i.current.style.setProperty("--thumb-opacity", "1"), i.current.style.transform = `translate3d(0, ${p}px, 0)`;
        }
      },
      onWheelScroll: (m) => {
        o.viewport && (o.viewport.scrollTop = m);
      },
      onDragScroll: (m) => {
        o.viewport && (o.viewport.scrollTop = u(m));
      }
    }
  ) : null;
});
pn.displayName = "@mantine/core/ScrollAreaScrollbarVisible";
const xr = G(
  (t, e) => {
    const n = ye(), { forceMount: r, ...s } = t, [o, i] = V(!1), a = t.orientation === "horizontal", c = on(() => {
      if (n.viewport) {
        const l = n.viewport.offsetWidth < n.viewport.scrollWidth, d = n.viewport.offsetHeight < n.viewport.scrollHeight;
        i(a ? l : d);
      }
    }, 10);
    return dt(n.viewport, c), dt(n.content, c), r || o ? /* @__PURE__ */ y(
      pn,
      {
        "data-state": o ? "visible" : "hidden",
        ...s,
        ref: e
      }
    ) : null;
  }
);
xr.displayName = "@mantine/core/ScrollAreaScrollbarAuto";
const ko = G(
  (t, e) => {
    const { forceMount: n, ...r } = t, s = ye(), [o, i] = V(!1);
    return J(() => {
      const { scrollArea: a } = s;
      let c = 0;
      if (a) {
        const l = () => {
          window.clearTimeout(c), i(!0);
        }, d = () => {
          c = window.setTimeout(() => i(!1), s.scrollHideDelay);
        };
        return a.addEventListener("pointerenter", l), a.addEventListener("pointerleave", d), () => {
          window.clearTimeout(c), a.removeEventListener("pointerenter", l), a.removeEventListener("pointerleave", d);
        };
      }
    }, [s.scrollArea, s.scrollHideDelay]), n || o ? /* @__PURE__ */ y(
      xr,
      {
        "data-state": o ? "visible" : "hidden",
        ...r,
        ref: e
      }
    ) : null;
  }
);
ko.displayName = "@mantine/core/ScrollAreaScrollbarHover";
const sd = G(
  (t, e) => {
    const { forceMount: n, ...r } = t, s = ye(), o = t.orientation === "horizontal", [i, a] = V("hidden"), c = on(() => a("idle"), 100);
    return J(() => {
      if (i === "idle") {
        const l = window.setTimeout(() => a("hidden"), s.scrollHideDelay);
        return () => window.clearTimeout(l);
      }
    }, [i, s.scrollHideDelay]), J(() => {
      const { viewport: l } = s, d = o ? "scrollLeft" : "scrollTop";
      if (l) {
        let f = l[d];
        const u = () => {
          const m = l[d];
          f !== m && (a("scrolling"), c()), f = m;
        };
        return l.addEventListener("scroll", u), () => l.removeEventListener("scroll", u);
      }
    }, [s.viewport, o, c]), n || i !== "hidden" ? /* @__PURE__ */ y(
      pn,
      {
        "data-state": i === "hidden" ? "hidden" : "visible",
        ...r,
        ref: e,
        onPointerEnter: We(t.onPointerEnter, () => a("interacting")),
        onPointerLeave: We(t.onPointerLeave, () => a("idle"))
      }
    ) : null;
  }
), rr = G(
  (t, e) => {
    const { forceMount: n, ...r } = t, s = ye(), { onScrollbarXEnabledChange: o, onScrollbarYEnabledChange: i } = s, a = t.orientation === "horizontal";
    return J(() => (a ? o(!0) : i(!0), () => {
      a ? o(!1) : i(!1);
    }), [a, o, i]), s.type === "hover" ? /* @__PURE__ */ y(ko, { ...r, ref: e, forceMount: n }) : s.type === "scroll" ? /* @__PURE__ */ y(sd, { ...r, ref: e, forceMount: n }) : s.type === "auto" ? /* @__PURE__ */ y(xr, { ...r, ref: e, forceMount: n }) : s.type === "always" ? /* @__PURE__ */ y(pn, { ...r, ref: e }) : null;
  }
);
rr.displayName = "@mantine/core/ScrollAreaScrollbar";
function od(t, e = () => {
}) {
  let n = { left: t.scrollLeft, top: t.scrollTop }, r = 0;
  return (function s() {
    const o = { left: t.scrollLeft, top: t.scrollTop }, i = n.left !== o.left, a = n.top !== o.top;
    (i || a) && e(), n = o, r = window.requestAnimationFrame(s);
  })(), () => window.cancelAnimationFrame(r);
}
const Co = G((t, e) => {
  const { style: n, ...r } = t, s = ye(), o = wo(), { onThumbPositionChange: i } = o, a = ke(e, (d) => o.onThumbChange(d)), c = q(void 0), l = on(() => {
    c.current && (c.current(), c.current = void 0);
  }, 100);
  return J(() => {
    const { viewport: d } = s;
    if (d) {
      const f = () => {
        if (l(), !c.current) {
          const u = od(d, i);
          c.current = u, i();
        }
      };
      return i(), d.addEventListener("scroll", f), () => d.removeEventListener("scroll", f);
    }
  }, [s.viewport, l, i]), /* @__PURE__ */ y(
    "div",
    {
      "data-state": o.hasThumb ? "visible" : "hidden",
      ...r,
      ref: a,
      style: {
        width: "var(--sa-thumb-width)",
        height: "var(--sa-thumb-height)",
        ...n
      },
      onPointerDownCapture: We(t.onPointerDownCapture, (d) => {
        const u = d.target.getBoundingClientRect(), m = d.clientX - u.left, p = d.clientY - u.top;
        o.onThumbPointerDown({ x: m, y: p });
      }),
      onPointerUp: We(t.onPointerUp, o.onThumbPointerUp)
    }
  );
});
Co.displayName = "@mantine/core/ScrollAreaThumb";
const sr = G(
  (t, e) => {
    const { forceMount: n, ...r } = t, s = wo();
    return n || s.hasThumb ? /* @__PURE__ */ y(Co, { ref: e, ...r }) : null;
  }
);
sr.displayName = "@mantine/core/ScrollAreaThumb";
const Ro = G(
  ({ children: t, style: e, ...n }, r) => {
    const s = ye(), o = ke(r, s.onViewportChange);
    return /* @__PURE__ */ y(
      Y,
      {
        ...n,
        ref: o,
        style: {
          overflowX: s.scrollbarXEnabled ? "scroll" : "hidden",
          overflowY: s.scrollbarYEnabled ? "scroll" : "hidden",
          ...e
        },
        children: /* @__PURE__ */ y("div", { style: { minWidth: "100%" }, ref: s.onContentChange, children: t })
      }
    );
  }
);
Ro.displayName = "@mantine/core/ScrollAreaViewport";
var _r = { root: "m_d57069b5", viewport: "m_c0783ff9", viewportInner: "m_f8f631dd", scrollbar: "m_c44ba933", thumb: "m_d8b5e363", corner: "m_21657268" };
const To = {
  scrollHideDelay: 1e3,
  type: "hover",
  scrollbars: "xy"
}, id = (t, { scrollbarSize: e, overscrollBehavior: n }) => ({
  root: {
    "--scrollarea-scrollbar-size": fe(e),
    "--scrollarea-over-scroll-behavior": n
  }
}), $t = oe((t, e) => {
  const n = B("ScrollArea", To, t), {
    classNames: r,
    className: s,
    style: o,
    styles: i,
    unstyled: a,
    scrollbarSize: c,
    vars: l,
    type: d,
    scrollHideDelay: f,
    viewportProps: u,
    viewportRef: m,
    onScrollPositionChange: p,
    children: h,
    offsetScrollbars: g,
    scrollbars: b,
    onBottomReached: x,
    onTopReached: v,
    overscrollBehavior: w,
    ...S
  } = n, [R, C] = V(!1), [N, $] = V(!1), [P, K] = V(!1), z = se({
    name: "ScrollArea",
    props: n,
    classes: _r,
    className: s,
    style: o,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: id
  }), W = q(null), H = Dl([m, W]);
  return J(() => {
    if (!W.current || g !== "present")
      return;
    const U = W.current, j = new ResizeObserver(() => {
      const { scrollHeight: X, clientHeight: M, scrollWidth: Q, clientWidth: ie } = U;
      $(X > M), K(Q > ie);
    });
    return j.observe(U), () => j.disconnect();
  }, [W, g]), /* @__PURE__ */ ne(
    go,
    {
      type: d === "never" ? "always" : d,
      scrollHideDelay: f,
      ref: e,
      scrollbars: b,
      ...z("root"),
      ...S,
      children: [
        /* @__PURE__ */ y(
          Ro,
          {
            ...u,
            ...z("viewport", { style: u == null ? void 0 : u.style }),
            ref: H,
            "data-offset-scrollbars": g === !0 ? "xy" : g || void 0,
            "data-scrollbars": b || void 0,
            "data-horizontal-hidden": g === "present" && !P ? "true" : void 0,
            "data-vertical-hidden": g === "present" && !N ? "true" : void 0,
            onScroll: (U) => {
              var Q;
              (Q = u == null ? void 0 : u.onScroll) == null || Q.call(u, U), p == null || p({ x: U.currentTarget.scrollLeft, y: U.currentTarget.scrollTop });
              const { scrollTop: j, scrollHeight: X, clientHeight: M } = U.currentTarget;
              j - (X - M) >= -0.6 && (x == null || x()), j === 0 && (v == null || v());
            },
            children: h
          }
        ),
        (b === "xy" || b === "x") && /* @__PURE__ */ y(
          rr,
          {
            ...z("scrollbar"),
            orientation: "horizontal",
            "data-hidden": d === "never" || g === "present" && !P ? !0 : void 0,
            forceMount: !0,
            onMouseEnter: () => C(!0),
            onMouseLeave: () => C(!1),
            children: /* @__PURE__ */ y(sr, { ...z("thumb") })
          }
        ),
        (b === "xy" || b === "y") && /* @__PURE__ */ y(
          rr,
          {
            ...z("scrollbar"),
            orientation: "vertical",
            "data-hidden": d === "never" || g === "present" && !N ? !0 : void 0,
            forceMount: !0,
            onMouseEnter: () => C(!0),
            onMouseLeave: () => C(!1),
            children: /* @__PURE__ */ y(sr, { ...z("thumb") })
          }
        ),
        /* @__PURE__ */ y(
          Jl,
          {
            ...z("corner"),
            "data-hovered": R || void 0,
            "data-hidden": d === "never" || void 0
          }
        )
      ]
    }
  );
});
$t.displayName = "@mantine/core/ScrollArea";
const Sr = oe((t, e) => {
  const {
    children: n,
    classNames: r,
    styles: s,
    scrollbarSize: o,
    scrollHideDelay: i,
    type: a,
    dir: c,
    offsetScrollbars: l,
    viewportRef: d,
    onScrollPositionChange: f,
    unstyled: u,
    variant: m,
    viewportProps: p,
    scrollbars: h,
    style: g,
    vars: b,
    onBottomReached: x,
    onTopReached: v,
    ...w
  } = B("ScrollAreaAutosize", To, t);
  return /* @__PURE__ */ y(Y, { ...w, ref: e, style: [{ display: "flex", overflow: "auto" }, g], children: /* @__PURE__ */ y(Y, { style: { display: "flex", flexDirection: "column", flex: 1 }, children: /* @__PURE__ */ y(
    $t,
    {
      classNames: r,
      styles: s,
      scrollHideDelay: i,
      scrollbarSize: o,
      type: a,
      dir: c,
      offsetScrollbars: l,
      viewportRef: d,
      onScrollPositionChange: f,
      unstyled: u,
      variant: m,
      viewportProps: p,
      vars: b,
      scrollbars: h,
      onBottomReached: x,
      onTopReached: v,
      children: n
    }
  ) }) });
});
$t.classes = _r;
Sr.displayName = "@mantine/core/ScrollAreaAutosize";
Sr.classes = _r;
$t.Autosize = Sr;
var No = { root: "m_87cf2631" };
const ad = {
  __staticSelector: "UnstyledButton"
}, hn = Ie(
  (t, e) => {
    const n = B("UnstyledButton", ad, t), {
      className: r,
      component: s = "button",
      __staticSelector: o,
      unstyled: i,
      classNames: a,
      styles: c,
      style: l,
      ...d
    } = n, f = se({
      name: o,
      props: n,
      classes: No,
      className: r,
      style: l,
      classNames: a,
      styles: c,
      unstyled: i
    });
    return /* @__PURE__ */ y(
      Y,
      {
        ...f("root", { focusable: !0 }),
        component: s,
        ref: e,
        type: s === "button" ? "button" : void 0,
        ...d
      }
    );
  }
);
hn.classes = No;
hn.displayName = "@mantine/core/UnstyledButton";
var Ao = { root: "m_515a97f8" };
const cd = {}, kr = oe((t, e) => {
  const n = B("VisuallyHidden", cd, t), { classNames: r, className: s, style: o, styles: i, unstyled: a, vars: c, ...l } = n, d = se({
    name: "VisuallyHidden",
    classes: Ao,
    props: n,
    className: s,
    style: o,
    classNames: r,
    styles: i,
    unstyled: a
  });
  return /* @__PURE__ */ y(Y, { component: "span", ref: e, ...d("root"), ...l });
});
kr.classes = Ao;
kr.displayName = "@mantine/core/VisuallyHidden";
var Po = { root: "m_1b7284a3" };
const ld = {}, dd = (t, { radius: e, shadow: n }) => ({
  root: {
    "--paper-radius": e === void 0 ? void 0 : Fe(e),
    "--paper-shadow": Bs(n)
  }
}), Cr = Ie((t, e) => {
  const n = B("Paper", ld, t), {
    classNames: r,
    className: s,
    style: o,
    styles: i,
    unstyled: a,
    withBorder: c,
    vars: l,
    radius: d,
    shadow: f,
    variant: u,
    mod: m,
    ...p
  } = n, h = se({
    name: "Paper",
    props: n,
    classes: Po,
    className: s,
    style: o,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: dd
  });
  return /* @__PURE__ */ y(
    Y,
    {
      ref: e,
      mod: [{ "data-with-border": c }, m],
      ...h("root"),
      variant: u,
      ...p
    }
  );
});
Cr.classes = Po;
Cr.displayName = "@mantine/core/Paper";
function ud(t, e) {
  if (t === "rtl" && (e.includes("right") || e.includes("left"))) {
    const [n, r] = e.split("-"), s = n === "right" ? "left" : "right";
    return r === void 0 ? s : `${s}-${r}`;
  }
  return e;
}
function Rs(t, e, n, r) {
  return t === "center" || r === "center" ? { top: e } : t === "end" ? { bottom: n } : t === "start" ? { top: n } : {};
}
function Ts(t, e, n, r, s) {
  return t === "center" || r === "center" ? { left: e } : t === "end" ? { [s === "ltr" ? "right" : "left"]: n } : t === "start" ? { [s === "ltr" ? "left" : "right"]: n } : {};
}
const fd = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius"
};
function md({
  position: t,
  arrowSize: e,
  arrowOffset: n,
  arrowRadius: r,
  arrowPosition: s,
  arrowX: o,
  arrowY: i,
  dir: a
}) {
  const [c, l = "center"] = t.split("-"), d = {
    width: e,
    height: e,
    transform: "rotate(45deg)",
    position: "absolute",
    [fd[c]]: r
  }, f = -e / 2;
  return c === "left" ? {
    ...d,
    ...Rs(l, i, n, s),
    right: f,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    clipPath: "polygon(100% 0, 0 0, 100% 100%)"
  } : c === "right" ? {
    ...d,
    ...Rs(l, i, n, s),
    left: f,
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    clipPath: "polygon(0 100%, 0 0, 100% 100%)"
  } : c === "top" ? {
    ...d,
    ...Ts(l, o, n, s, a),
    bottom: f,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    clipPath: "polygon(0 100%, 100% 100%, 100% 0)"
  } : c === "bottom" ? {
    ...d,
    ...Ts(l, o, n, s, a),
    top: f,
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    clipPath: "polygon(0 100%, 0 0, 100% 0)"
  } : {};
}
const Oo = G(
  ({
    position: t,
    arrowSize: e,
    arrowOffset: n,
    arrowRadius: r,
    arrowPosition: s,
    visible: o,
    arrowX: i,
    arrowY: a,
    style: c,
    ...l
  }, d) => {
    const { dir: f } = cn();
    return o ? /* @__PURE__ */ y(
      "div",
      {
        ...l,
        ref: d,
        style: {
          ...c,
          ...md({
            position: t,
            arrowSize: e,
            arrowOffset: n,
            arrowRadius: r,
            arrowPosition: s,
            dir: f,
            arrowX: i,
            arrowY: a
          })
        }
      }
    ) : null;
  }
);
Oo.displayName = "@mantine/core/FloatingArrow";
var $o = { root: "m_9814e45f" };
const pd = {
  zIndex: Vs("modal")
}, hd = (t, { gradient: e, color: n, backgroundOpacity: r, blur: s, radius: o, zIndex: i }) => ({
  root: {
    "--overlay-bg": e || (n !== void 0 || r !== void 0) && Ha(n || "#000", r ?? 0.6) || void 0,
    "--overlay-filter": s ? `blur(${fe(s)})` : void 0,
    "--overlay-radius": o === void 0 ? void 0 : Fe(o),
    "--overlay-z-index": i == null ? void 0 : i.toString()
  }
}), Rr = Ie((t, e) => {
  const n = B("Overlay", pd, t), {
    classNames: r,
    className: s,
    style: o,
    styles: i,
    unstyled: a,
    vars: c,
    fixed: l,
    center: d,
    children: f,
    radius: u,
    zIndex: m,
    gradient: p,
    blur: h,
    color: g,
    backgroundOpacity: b,
    mod: x,
    ...v
  } = n, w = se({
    name: "Overlay",
    props: n,
    classes: $o,
    className: s,
    style: o,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: hd
  });
  return /* @__PURE__ */ y(Y, { ref: e, ...w("root"), mod: [{ center: d, fixed: l }, x], ...v, children: f });
});
Rr.classes = $o;
Rr.displayName = "@mantine/core/Overlay";
function Fn(t) {
  const e = document.createElement("div");
  return e.setAttribute("data-portal", "true"), typeof t.className == "string" && e.classList.add(...t.className.split(" ").filter(Boolean)), typeof t.style == "object" && Object.assign(e.style, t.style), typeof t.id == "string" && e.setAttribute("id", t.id), e;
}
function gd({
  target: t,
  reuseTargetNode: e,
  ...n
}) {
  if (t)
    return typeof t == "string" ? document.querySelector(t) || Fn(n) : t;
  if (e) {
    const r = document.querySelector("[data-mantine-shared-portal-node]");
    if (r)
      return r;
    const s = Fn(n);
    return s.setAttribute("data-mantine-shared-portal-node", "true"), document.body.appendChild(s), s;
  }
  return Fn(n);
}
const yd = {}, Eo = oe((t, e) => {
  const { children: n, target: r, reuseTargetNode: s, ...o } = B("Portal", yd, t), [i, a] = V(!1), c = q(null);
  return fr(() => (a(!0), c.current = gd({ target: r, reuseTargetNode: s, ...o }), qn(e, c.current), !r && !s && c.current && document.body.appendChild(c.current), () => {
    !r && !s && c.current && document.body.removeChild(c.current);
  }), [r]), !i || !c.current ? null : ci(/* @__PURE__ */ y(Ct, { children: n }), c.current);
});
Eo.displayName = "@mantine/core/Portal";
const Tr = oe(
  ({ withinPortal: t = !0, children: e, ...n }, r) => Gs() === "test" || !t ? /* @__PURE__ */ y(Ct, { children: e }) : /* @__PURE__ */ y(Eo, { ref: r, ...n, children: e })
);
Tr.displayName = "@mantine/core/OptionalPortal";
const St = (t) => ({
  in: { opacity: 1, transform: "scale(1)" },
  out: { opacity: 0, transform: `scale(.9) translateY(${t === "bottom" ? 10 : -10}px)` },
  transitionProperty: "transform, opacity"
}), Zt = {
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
    ...St("bottom"),
    common: { transformOrigin: "center center" }
  },
  "pop-bottom-left": {
    ...St("bottom"),
    common: { transformOrigin: "bottom left" }
  },
  "pop-bottom-right": {
    ...St("bottom"),
    common: { transformOrigin: "bottom right" }
  },
  "pop-top-left": {
    ...St("top"),
    common: { transformOrigin: "top left" }
  },
  "pop-top-right": {
    ...St("top"),
    common: { transformOrigin: "top right" }
  }
}, Ns = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function vd({
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
  return typeof t == "string" ? t in Zt ? {
    transitionProperty: Zt[t].transitionProperty,
    ...s,
    ...Zt[t].common,
    ...Zt[t][Ns[e]]
  } : {} : {
    transitionProperty: t.transitionProperty,
    ...s,
    ...t.common,
    ...t[Ns[e]]
  };
}
function bd({
  duration: t,
  exitDuration: e,
  timingFunction: n,
  mounted: r,
  onEnter: s,
  onExit: o,
  onEntered: i,
  onExited: a,
  enterDelay: c,
  exitDelay: l
}) {
  const d = Ke(), f = Ra(), u = d.respectReducedMotion ? f : !1, [m, p] = V(u ? 0 : t), [h, g] = V(r ? "entered" : "exited"), b = q(-1), x = q(-1), v = q(-1);
  function w() {
    window.clearTimeout(b.current), window.clearTimeout(x.current), cancelAnimationFrame(v.current);
  }
  const S = (C) => {
    w();
    const N = C ? s : o, $ = C ? i : a, P = u ? 0 : C ? t : e;
    p(P), P === 0 ? (typeof N == "function" && N(), typeof $ == "function" && $(), g(C ? "entered" : "exited")) : v.current = requestAnimationFrame(() => {
      ai.flushSync(() => {
        g(C ? "pre-entering" : "pre-exiting");
      }), v.current = requestAnimationFrame(() => {
        typeof N == "function" && N(), g(C ? "entering" : "exiting"), b.current = window.setTimeout(() => {
          typeof $ == "function" && $(), g(C ? "entered" : "exited");
        }, P);
      });
    });
  }, R = (C) => {
    if (w(), typeof (C ? c : l) != "number") {
      S(C);
      return;
    }
    x.current = window.setTimeout(
      () => {
        S(C);
      },
      C ? c : l
    );
  };
  return Xe(() => {
    R(r);
  }, [r]), J(
    () => () => {
      w();
    },
    []
  ), {
    transitionDuration: m,
    transitionStatus: h,
    transitionTimingFunction: n || "ease"
  };
}
function gn({
  keepMounted: t,
  transition: e = "fade",
  duration: n = 250,
  exitDuration: r = n,
  mounted: s,
  children: o,
  timingFunction: i = "ease",
  onExit: a,
  onEntered: c,
  onEnter: l,
  onExited: d,
  enterDelay: f,
  exitDelay: u
}) {
  const m = Gs(), { transitionDuration: p, transitionStatus: h, transitionTimingFunction: g } = bd({
    mounted: s,
    exitDuration: r,
    duration: n,
    timingFunction: i,
    onExit: a,
    onEntered: c,
    onEnter: l,
    onExited: d,
    enterDelay: f,
    exitDelay: u
  });
  return p === 0 || m === "test" ? s ? /* @__PURE__ */ y(Ct, { children: o({}) }) : t ? o({ display: "none" }) : null : h === "exited" ? t ? o({ display: "none" }) : null : /* @__PURE__ */ y(Ct, { children: o(
    vd({
      transition: e,
      duration: p,
      state: h,
      timingFunction: g
    })
  ) });
}
gn.displayName = "@mantine/core/Transition";
const [wd, Io] = At(
  "Popover component was not found in the tree"
);
function Nr({
  children: t,
  active: e = !0,
  refProp: n = "ref",
  innerRef: r
}) {
  const s = xa(e), o = ke(s, r);
  return ur(t) ? nn(t, { [n]: o }) : t;
}
function Do(t) {
  return /* @__PURE__ */ y(kr, { tabIndex: -1, "data-autofocus": !0, ...t });
}
Nr.displayName = "@mantine/core/FocusTrap";
Do.displayName = "@mantine/core/FocusTrapInitialFocus";
Nr.InitialFocus = Do;
var Mo = { dropdown: "m_38a85659", arrow: "m_a31dc6c1", overlay: "m_3d7bc908" };
const xd = {}, Ar = oe((t, e) => {
  var g, b, x, v;
  const n = B("PopoverDropdown", xd, t), {
    className: r,
    style: s,
    vars: o,
    children: i,
    onKeyDownCapture: a,
    variant: c,
    classNames: l,
    styles: d,
    ...f
  } = n, u = Io(), m = ha({
    opened: u.opened,
    shouldReturnFocus: u.returnFocus
  }), p = u.withRoles ? {
    "aria-labelledby": u.getTargetId(),
    id: u.getDropdownId(),
    role: "dialog",
    tabIndex: -1
  } : {}, h = ke(e, u.floating);
  return u.disabled ? null : /* @__PURE__ */ y(Tr, { ...u.portalProps, withinPortal: u.withinPortal, children: /* @__PURE__ */ y(
    gn,
    {
      mounted: u.opened,
      ...u.transitionProps,
      transition: ((g = u.transitionProps) == null ? void 0 : g.transition) || "fade",
      duration: ((b = u.transitionProps) == null ? void 0 : b.duration) ?? 150,
      keepMounted: u.keepMounted,
      exitDuration: typeof ((x = u.transitionProps) == null ? void 0 : x.exitDuration) == "number" ? u.transitionProps.exitDuration : (v = u.transitionProps) == null ? void 0 : v.duration,
      children: (w) => /* @__PURE__ */ y(Nr, { active: u.trapFocus && u.opened, innerRef: h, children: /* @__PURE__ */ ne(
        Y,
        {
          ...p,
          ...f,
          variant: c,
          onKeyDownCapture: aa(
            () => {
              var S, R;
              (S = u.onClose) == null || S.call(u), (R = u.onDismiss) == null || R.call(u);
            },
            {
              active: u.closeOnEscape,
              onTrigger: m,
              onKeyDown: a
            }
          ),
          "data-position": u.placement,
          "data-fixed": u.floatingStrategy === "fixed" || void 0,
          ...u.getStyles("dropdown", {
            className: r,
            props: n,
            classNames: l,
            styles: d,
            style: [
              {
                ...w,
                zIndex: u.zIndex,
                top: u.y ?? 0,
                left: u.x ?? 0,
                width: u.width === "target" ? void 0 : fe(u.width)
              },
              u.resolvedStyles.dropdown,
              d == null ? void 0 : d.dropdown,
              s
            ]
          }),
          children: [
            i,
            /* @__PURE__ */ y(
              Oo,
              {
                ref: u.arrowRef,
                arrowX: u.arrowX,
                arrowY: u.arrowY,
                visible: u.withArrow,
                position: u.placement,
                arrowSize: u.arrowSize,
                arrowRadius: u.arrowRadius,
                arrowOffset: u.arrowOffset,
                arrowPosition: u.arrowPosition,
                ...u.getStyles("arrow", {
                  props: n,
                  classNames: l,
                  styles: d
                })
              }
            )
          ]
        }
      ) })
    }
  ) });
});
Ar.classes = Mo;
Ar.displayName = "@mantine/core/PopoverDropdown";
const _d = {
  refProp: "ref",
  popupType: "dialog"
}, Lo = oe((t, e) => {
  const { children: n, refProp: r, popupType: s, ...o } = B(
    "PopoverTarget",
    _d,
    t
  );
  if (!ur(n))
    throw new Error(
      "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const i = o, a = Io(), c = ke(a.reference, Ta(n), e), l = a.withRoles ? {
    "aria-haspopup": s,
    "aria-expanded": a.opened,
    "aria-controls": a.getDropdownId(),
    id: a.getTargetId()
  } : {};
  return nn(n, {
    ...i,
    ...l,
    ...a.targetProps,
    className: Ve(
      a.targetProps.className,
      i.className,
      n.props.className
    ),
    [r]: c,
    ...a.controlled ? null : { onClick: a.onToggle }
  });
});
Lo.displayName = "@mantine/core/PopoverTarget";
function Sd({
  opened: t,
  floating: e,
  position: n,
  positionDependencies: r
}) {
  const [s, o] = V(0);
  J(() => {
    if (e.refs.reference.current && e.refs.floating.current && t)
      return bl(
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
  ]), Xe(() => {
    e.update();
  }, r), Xe(() => {
    o((i) => i + 1);
  }, [t]);
}
function kd(t) {
  if (t === void 0)
    return { shift: !0, flip: !0 };
  const e = { ...t };
  return t.shift === void 0 && (e.shift = !0), t.flip === void 0 && (e.flip = !0), e;
}
function Cd(t, e) {
  const n = kd(t.middlewares), r = [Ol(t.offset)];
  return n.shift && r.push(
    $l(
      typeof n.shift == "boolean" ? { limiter: ws(), padding: 5 } : { limiter: ws(), padding: 5, ...n.shift }
    )
  ), n.flip && r.push(
    typeof n.flip == "boolean" ? xs() : xs(n.flip)
  ), n.inline && r.push(
    typeof n.inline == "boolean" ? _s() : _s(n.inline)
  ), r.push(Il({ element: t.arrowRef, padding: t.arrowOffset })), (n.size || t.width === "target") && r.push(
    El({
      ...typeof n.size == "boolean" ? {} : n.size,
      apply({ rects: s, availableWidth: o, availableHeight: i, ...a }) {
        var d;
        const l = ((d = e().refs.floating.current) == null ? void 0 : d.style) ?? {};
        n.size && (typeof n.size == "object" && n.size.apply ? n.size.apply({ rects: s, availableWidth: o, availableHeight: i, ...a }) : Object.assign(l, {
          maxWidth: `${o}px`,
          maxHeight: `${i}px`
        })), t.width === "target" && Object.assign(l, {
          width: `${s.reference.width}px`
        });
      }
    })
  ), r;
}
function Rd(t) {
  const [e, n] = Xs({
    value: t.opened,
    defaultValue: t.defaultOpened,
    finalValue: !1,
    onChange: t.onChange
  }), r = q(e), s = () => {
    e && !t.disabled && n(!1);
  }, o = () => !t.disabled && n(!e), i = Gl({
    strategy: t.strategy,
    placement: t.position,
    middleware: Cd(t, () => i)
  });
  return Sd({
    opened: e,
    position: t.position,
    positionDependencies: t.positionDependencies || [],
    floating: i
  }), Xe(() => {
    var a;
    (a = t.onPositionChange) == null || a.call(t, i.placement);
  }, [i.placement]), Xe(() => {
    var a, c;
    e !== r.current && (e ? (c = t.onOpen) == null || c.call(t) : (a = t.onClose) == null || a.call(t)), r.current = e;
  }, [e, t.onClose, t.onOpen]), {
    floating: i,
    controlled: typeof t.opened == "boolean",
    opened: e,
    onClose: s,
    onToggle: o
  };
}
const Td = {
  position: "bottom",
  offset: 8,
  positionDependencies: [],
  transitionProps: { transition: "fade", duration: 150 },
  middlewares: { flip: !0, shift: !0, inline: !1 },
  arrowSize: 7,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: "side",
  closeOnClickOutside: !0,
  withinPortal: !0,
  closeOnEscape: !0,
  trapFocus: !1,
  withRoles: !0,
  returnFocus: !1,
  withOverlay: !1,
  clickOutsideEvents: ["mousedown", "touchstart"],
  zIndex: Vs("popover"),
  __staticSelector: "Popover",
  width: "max-content"
}, Nd = (t, { radius: e, shadow: n }) => ({
  dropdown: {
    "--popover-radius": e === void 0 ? void 0 : Fe(e),
    "--popover-shadow": Bs(n)
  }
});
function Qe(t) {
  var Fr, Vr, Zr, Br, Wr, Hr;
  const e = B("Popover", Td, t), {
    children: n,
    position: r,
    offset: s,
    onPositionChange: o,
    positionDependencies: i,
    opened: a,
    transitionProps: c,
    onExitTransitionEnd: l,
    onEnterTransitionEnd: d,
    width: f,
    middlewares: u,
    withArrow: m,
    arrowSize: p,
    arrowOffset: h,
    arrowRadius: g,
    arrowPosition: b,
    unstyled: x,
    classNames: v,
    styles: w,
    closeOnClickOutside: S,
    withinPortal: R,
    portalProps: C,
    closeOnEscape: N,
    clickOutsideEvents: $,
    trapFocus: P,
    onClose: K,
    onDismiss: z,
    onOpen: W,
    onChange: H,
    zIndex: U,
    radius: j,
    shadow: X,
    id: M,
    defaultOpened: Q,
    __staticSelector: ie,
    withRoles: bt,
    disabled: Je,
    returnFocus: wt,
    variant: xt,
    keepMounted: xn,
    vars: _n,
    floatingStrategy: Lt,
    withOverlay: Sn,
    overlayProps: Pe,
    ...kn
  } = e, zt = se({
    name: ie,
    props: e,
    classes: Mo,
    classNames: v,
    styles: w,
    unstyled: x,
    rootSelector: "dropdown",
    vars: _n,
    varsResolver: Nd
  }), { resolvedStyles: Cn } = Qs({ classNames: v, styles: w, props: e }), jt = q(null), [Rn, Tn] = V(null), [Nn, An] = V(null), { dir: Pn } = cn(), Ft = ka(M), ae = Rd({
    middlewares: u,
    width: f,
    position: ud(Pn, r),
    offset: typeof s == "number" ? s + (m ? p / 2 : 0) : s,
    arrowRef: jt,
    arrowOffset: h,
    onPositionChange: o,
    positionDependencies: i,
    opened: a,
    defaultOpened: Q,
    onChange: H,
    onOpen: W,
    onClose: K,
    onDismiss: z,
    strategy: Lt,
    disabled: Je
  });
  ua(
    () => {
      S && (ae.onClose(), z == null || z());
    },
    $,
    [Rn, Nn]
  );
  const Qo = ee(
    (me) => {
      Tn(me), ae.floating.refs.setReference(me);
    },
    [ae.floating.refs.setReference]
  ), Jo = ee(
    (me) => {
      An(me), ae.floating.refs.setFloating(me);
    },
    [ae.floating.refs.setFloating]
  ), ei = ee(() => {
    var me;
    (me = c == null ? void 0 : c.onExited) == null || me.call(c), l == null || l();
  }, [c == null ? void 0 : c.onExited, l]), ti = ee(() => {
    var me;
    (me = c == null ? void 0 : c.onEntered) == null || me.call(c), d == null || d();
  }, [c == null ? void 0 : c.onEntered, d]);
  return /* @__PURE__ */ ne(
    wd,
    {
      value: {
        returnFocus: wt,
        disabled: Je,
        controlled: ae.controlled,
        reference: Qo,
        floating: Jo,
        x: ae.floating.x,
        y: ae.floating.y,
        arrowX: (Zr = (Vr = (Fr = ae.floating) == null ? void 0 : Fr.middlewareData) == null ? void 0 : Vr.arrow) == null ? void 0 : Zr.x,
        arrowY: (Hr = (Wr = (Br = ae.floating) == null ? void 0 : Br.middlewareData) == null ? void 0 : Wr.arrow) == null ? void 0 : Hr.y,
        opened: ae.opened,
        arrowRef: jt,
        transitionProps: { ...c, onExited: ei, onEntered: ti },
        width: f,
        withArrow: m,
        arrowSize: p,
        arrowOffset: h,
        arrowRadius: g,
        arrowPosition: b,
        placement: ae.floating.placement,
        trapFocus: P,
        withinPortal: R,
        portalProps: C,
        zIndex: U,
        radius: j,
        shadow: X,
        closeOnEscape: N,
        onDismiss: z,
        onClose: ae.onClose,
        onToggle: ae.onToggle,
        getTargetId: () => `${Ft}-target`,
        getDropdownId: () => `${Ft}-dropdown`,
        withRoles: bt,
        targetProps: kn,
        __staticSelector: ie,
        classNames: v,
        styles: w,
        unstyled: x,
        variant: xt,
        keepMounted: xn,
        getStyles: zt,
        resolvedStyles: Cn,
        floatingStrategy: Lt
      },
      children: [
        n,
        Sn && /* @__PURE__ */ y(
          gn,
          {
            transition: "fade",
            mounted: ae.opened,
            duration: (c == null ? void 0 : c.duration) || 250,
            exitDuration: (c == null ? void 0 : c.exitDuration) || 250,
            children: (me) => /* @__PURE__ */ y(Tr, { withinPortal: R, children: /* @__PURE__ */ y(
              Rr,
              {
                ...Pe,
                ...zt("overlay", {
                  className: Pe == null ? void 0 : Pe.className,
                  style: [me, Pe == null ? void 0 : Pe.style]
                })
              }
            ) })
          }
        )
      ]
    }
  );
}
Qe.Target = Lo;
Qe.Dropdown = Ar;
Qe.displayName = "@mantine/core/Popover";
Qe.extend = (t) => t;
var we = { root: "m_5ae2e3c", barsLoader: "m_7a2bd4cd", bar: "m_870bb79", "bars-loader-animation": "m_5d2b3b9d", dotsLoader: "m_4e3f22d7", dot: "m_870c4af", "loader-dots-animation": "m_aac34a1", ovalLoader: "m_b34414df", "oval-loader-animation": "m_f8e89c4b" };
const zo = G(({ className: t, ...e }, n) => /* @__PURE__ */ ne(Y, { component: "span", className: Ve(we.barsLoader, t), ...e, ref: n, children: [
  /* @__PURE__ */ y("span", { className: we.bar }),
  /* @__PURE__ */ y("span", { className: we.bar }),
  /* @__PURE__ */ y("span", { className: we.bar })
] }));
zo.displayName = "@mantine/core/Bars";
const jo = G(({ className: t, ...e }, n) => /* @__PURE__ */ ne(Y, { component: "span", className: Ve(we.dotsLoader, t), ...e, ref: n, children: [
  /* @__PURE__ */ y("span", { className: we.dot }),
  /* @__PURE__ */ y("span", { className: we.dot }),
  /* @__PURE__ */ y("span", { className: we.dot })
] }));
jo.displayName = "@mantine/core/Dots";
const Fo = G(({ className: t, ...e }, n) => /* @__PURE__ */ y(Y, { component: "span", className: Ve(we.ovalLoader, t), ...e, ref: n }));
Fo.displayName = "@mantine/core/Oval";
const Vo = {
  bars: zo,
  oval: Fo,
  dots: jo
}, Ad = {
  loaders: Vo,
  type: "oval"
}, Pd = (t, { size: e, color: n }) => ({
  root: {
    "--loader-size": pe(e, "loader-size"),
    "--loader-color": n ? at(n, t) : void 0
  }
}), yn = oe((t, e) => {
  const n = B("Loader", Ad, t), {
    size: r,
    color: s,
    type: o,
    vars: i,
    className: a,
    style: c,
    classNames: l,
    styles: d,
    unstyled: f,
    loaders: u,
    variant: m,
    children: p,
    ...h
  } = n, g = se({
    name: "Loader",
    props: n,
    classes: we,
    className: a,
    style: c,
    classNames: l,
    styles: d,
    unstyled: f,
    vars: i,
    varsResolver: Pd
  });
  return p ? /* @__PURE__ */ y(Y, { ...g("root"), ref: e, ...h, children: p }) : /* @__PURE__ */ y(
    Y,
    {
      ...g("root"),
      ref: e,
      component: u[o],
      variant: m,
      size: r,
      ...h
    }
  );
});
yn.defaultLoaders = Vo;
yn.classes = we;
yn.displayName = "@mantine/core/Loader";
var gt = { root: "m_8d3f4000", icon: "m_8d3afb97", loader: "m_302b9fb1", group: "m_1a0f1b21", groupSection: "m_437b6484" };
const As = {
  orientation: "horizontal"
}, Od = (t, { borderWidth: e }) => ({
  group: { "--ai-border-width": fe(e) }
}), Pr = oe((t, e) => {
  const n = B("ActionIconGroup", As, t), {
    className: r,
    style: s,
    classNames: o,
    styles: i,
    unstyled: a,
    orientation: c,
    vars: l,
    borderWidth: d,
    variant: f,
    mod: u,
    ...m
  } = B("ActionIconGroup", As, t), p = se({
    name: "ActionIconGroup",
    props: n,
    classes: gt,
    className: r,
    style: s,
    classNames: o,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: Od,
    rootSelector: "group"
  });
  return /* @__PURE__ */ y(
    Y,
    {
      ...p("group"),
      ref: e,
      variant: f,
      mod: [{ "data-orientation": c }, u],
      role: "group",
      ...m
    }
  );
});
Pr.classes = gt;
Pr.displayName = "@mantine/core/ActionIconGroup";
const Ps = {}, $d = (t, { radius: e, color: n, gradient: r, variant: s, autoContrast: o, size: i }) => {
  const a = t.variantColorResolver({
    color: n || t.primaryColor,
    theme: t,
    gradient: r,
    variant: s || "filled",
    autoContrast: o
  });
  return {
    groupSection: {
      "--section-height": pe(i, "section-height"),
      "--section-padding-x": pe(i, "section-padding-x"),
      "--section-fz": Zs(i),
      "--section-radius": e === void 0 ? void 0 : Fe(e),
      "--section-bg": n || s ? a.background : void 0,
      "--section-color": a.color,
      "--section-bd": n || s ? a.border : void 0
    }
  };
}, Or = oe((t, e) => {
  const n = B("ActionIconGroupSection", Ps, t), {
    className: r,
    style: s,
    classNames: o,
    styles: i,
    unstyled: a,
    vars: c,
    variant: l,
    gradient: d,
    radius: f,
    autoContrast: u,
    ...m
  } = B("ActionIconGroupSection", Ps, t), p = se({
    name: "ActionIconGroupSection",
    props: n,
    classes: gt,
    className: r,
    style: s,
    classNames: o,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: $d,
    rootSelector: "groupSection"
  });
  return /* @__PURE__ */ y(Y, { ...p("groupSection"), ref: e, variant: l, ...m });
});
Or.classes = gt;
Or.displayName = "@mantine/core/ActionIconGroupSection";
const Ed = {}, Id = (t, { size: e, radius: n, variant: r, gradient: s, color: o, autoContrast: i }) => {
  const a = t.variantColorResolver({
    color: o || t.primaryColor,
    theme: t,
    gradient: s,
    variant: r || "filled",
    autoContrast: i
  });
  return {
    root: {
      "--ai-size": pe(e, "ai-size"),
      "--ai-radius": n === void 0 ? void 0 : Fe(n),
      "--ai-bg": o || r ? a.background : void 0,
      "--ai-hover": o || r ? a.hover : void 0,
      "--ai-hover-color": o || r ? a.hoverColor : void 0,
      "--ai-color": a.color,
      "--ai-bd": o || r ? a.border : void 0
    }
  };
}, Et = Ie((t, e) => {
  const n = B("ActionIcon", Ed, t), {
    className: r,
    unstyled: s,
    variant: o,
    classNames: i,
    styles: a,
    style: c,
    loading: l,
    loaderProps: d,
    size: f,
    color: u,
    radius: m,
    __staticSelector: p,
    gradient: h,
    vars: g,
    children: b,
    disabled: x,
    "data-disabled": v,
    autoContrast: w,
    mod: S,
    ...R
  } = n, C = se({
    name: ["ActionIcon", p],
    props: n,
    className: r,
    style: c,
    classes: gt,
    classNames: i,
    styles: a,
    unstyled: s,
    vars: g,
    varsResolver: Id
  });
  return /* @__PURE__ */ ne(
    hn,
    {
      ...C("root", { active: !x && !l && !v }),
      ...R,
      unstyled: s,
      variant: o,
      size: f,
      disabled: x || l,
      ref: e,
      mod: [{ loading: l, disabled: x || v }, S],
      children: [
        /* @__PURE__ */ y(gn, { mounted: !!l, transition: "slide-down", duration: 150, children: (N) => /* @__PURE__ */ y(Y, { component: "span", ...C("loader", { style: N }), "aria-hidden": !0, children: /* @__PURE__ */ y(yn, { color: "var(--ai-color)", size: "calc(var(--ai-size) * 0.55)", ...d }) }) }),
        /* @__PURE__ */ y(Y, { component: "span", mod: { loading: l }, ...C("icon"), children: b })
      ]
    }
  );
});
Et.classes = gt;
Et.displayName = "@mantine/core/ActionIcon";
Et.Group = Pr;
Et.GroupSection = Or;
function Dd(t) {
  return Os.toArray(t).filter(Boolean);
}
var Zo = { root: "m_4081bf90" };
const Md = {
  preventGrowOverflow: !0,
  gap: "md",
  align: "center",
  justify: "flex-start",
  wrap: "wrap"
}, Ld = (t, { grow: e, preventGrowOverflow: n, gap: r, align: s, justify: o, wrap: i }, { childWidth: a }) => ({
  root: {
    "--group-child-width": e && n ? a : void 0,
    "--group-gap": sn(r),
    "--group-align": s,
    "--group-justify": o,
    "--group-wrap": i
  }
}), vn = oe((t, e) => {
  const n = B("Group", Md, t), {
    classNames: r,
    className: s,
    style: o,
    styles: i,
    unstyled: a,
    children: c,
    gap: l,
    align: d,
    justify: f,
    wrap: u,
    grow: m,
    preventGrowOverflow: p,
    vars: h,
    variant: g,
    __size: b,
    mod: x,
    ...v
  } = n, w = Dd(c), S = w.length, R = sn(l ?? "md"), N = { childWidth: `calc(${100 / S}% - (${R} - ${R} / ${S}))` }, $ = se({
    name: "Group",
    props: n,
    stylesCtx: N,
    className: s,
    style: o,
    classes: Zo,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: h,
    varsResolver: Ld
  });
  return /* @__PURE__ */ y(
    Y,
    {
      ...$("root"),
      ref: e,
      variant: g,
      mod: [{ grow: m }, x],
      size: b,
      ...v,
      children: w
    }
  );
});
vn.classes = Zo;
vn.displayName = "@mantine/core/Group";
var Bo = { root: "m_b6d8b162" };
function zd(t) {
  if (t === "start")
    return "start";
  if (t === "end" || t)
    return "end";
}
const jd = {
  inherit: !1
}, Fd = (t, { variant: e, lineClamp: n, gradient: r, size: s, color: o }) => ({
  root: {
    "--text-fz": Zs(s),
    "--text-lh": ca(s),
    "--text-gradient": e === "gradient" ? Wa(r, t) : void 0,
    "--text-line-clamp": typeof n == "number" ? n.toString() : void 0,
    "--text-color": o ? at(o, t) : void 0
  }
}), He = Ie((t, e) => {
  const n = B("Text", jd, t), {
    lineClamp: r,
    truncate: s,
    inline: o,
    inherit: i,
    gradient: a,
    span: c,
    __staticSelector: l,
    vars: d,
    className: f,
    style: u,
    classNames: m,
    styles: p,
    unstyled: h,
    variant: g,
    mod: b,
    size: x,
    ...v
  } = n, w = se({
    name: ["Text", l],
    props: n,
    classes: Bo,
    className: f,
    style: u,
    classNames: m,
    styles: p,
    unstyled: h,
    vars: d,
    varsResolver: Fd
  });
  return /* @__PURE__ */ y(
    Y,
    {
      ...w("root", { focusable: !0 }),
      ref: e,
      component: c ? "span" : "p",
      variant: g,
      mod: [
        {
          "data-truncate": zd(s),
          "data-line-clamp": typeof r == "number",
          "data-inline": o,
          "data-inherit": i
        },
        b
      ],
      size: x,
      ...v
    }
  );
});
He.classes = Bo;
He.displayName = "@mantine/core/Text";
var Wo = { root: "m_347db0ec", "root--dot": "m_fbd81e3d", label: "m_5add502a", section: "m_91fdda9b" };
const Vd = {}, Zd = (t, { radius: e, color: n, gradient: r, variant: s, size: o, autoContrast: i }) => {
  const a = t.variantColorResolver({
    color: n || t.primaryColor,
    theme: t,
    gradient: r,
    variant: s || "filled",
    autoContrast: i
  });
  return {
    root: {
      "--badge-height": pe(o, "badge-height"),
      "--badge-padding-x": pe(o, "badge-padding-x"),
      "--badge-fz": pe(o, "badge-fz"),
      "--badge-radius": e === void 0 ? void 0 : Fe(e),
      "--badge-bg": n || s ? a.background : void 0,
      "--badge-color": n || s ? a.color : void 0,
      "--badge-bd": n || s ? a.border : void 0,
      "--badge-dot-color": s === "dot" ? at(n, t) : void 0
    }
  };
}, bn = Ie((t, e) => {
  const n = B("Badge", Vd, t), {
    classNames: r,
    className: s,
    style: o,
    styles: i,
    unstyled: a,
    vars: c,
    radius: l,
    color: d,
    gradient: f,
    leftSection: u,
    rightSection: m,
    children: p,
    variant: h,
    fullWidth: g,
    autoContrast: b,
    circle: x,
    mod: v,
    ...w
  } = n, S = se({
    name: "Badge",
    props: n,
    classes: Wo,
    className: s,
    style: o,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: Zd
  });
  return /* @__PURE__ */ ne(
    Y,
    {
      variant: h,
      mod: [
        {
          block: g,
          circle: x,
          "with-right-section": !!m,
          "with-left-section": !!u
        },
        v
      ],
      ...S("root", { variant: h }),
      ref: e,
      ...w,
      children: [
        u && /* @__PURE__ */ y("span", { ...S("section"), "data-position": "left", children: u }),
        /* @__PURE__ */ y("span", { ...S("label"), children: p }),
        m && /* @__PURE__ */ y("span", { ...S("section"), "data-position": "right", children: m })
      ]
    }
  );
});
bn.classes = Wo;
bn.displayName = "@mantine/core/Badge";
const [Bd, Wd] = At(
  "Card component was not found in tree"
);
var $r = { root: "m_e615b15f", section: "m_599a2148" };
const Hd = {}, wn = Ie((t, e) => {
  const n = B("CardSection", Hd, t), { classNames: r, className: s, style: o, styles: i, vars: a, withBorder: c, inheritPadding: l, mod: d, ...f } = n, u = Wd();
  return /* @__PURE__ */ y(
    Y,
    {
      ref: e,
      mod: [{ "with-border": c, "inherit-padding": l }, d],
      ...u.getStyles("section", { className: s, style: o, styles: i, classNames: r }),
      ...f
    }
  );
});
wn.classes = $r;
wn.displayName = "@mantine/core/CardSection";
const Ud = {}, Yd = (t, { padding: e }) => ({
  root: {
    "--card-padding": sn(e)
  }
}), It = Ie((t, e) => {
  const n = B("Card", Ud, t), { classNames: r, className: s, style: o, styles: i, unstyled: a, vars: c, children: l, padding: d, ...f } = n, u = se({
    name: "Card",
    props: n,
    classes: $r,
    className: s,
    style: o,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: Yd
  }), m = Os.toArray(l), p = m.map((h, g) => typeof h == "object" && h && "type" in h && h.type === wn ? nn(h, {
    "data-first-section": g === 0 || void 0,
    "data-last-section": g === m.length - 1 || void 0
  }) : h);
  return /* @__PURE__ */ y(Bd, { value: { getStyles: u }, children: /* @__PURE__ */ y(Cr, { ref: e, unstyled: a, ...u("root"), ...f, children: p }) });
});
It.classes = $r;
It.displayName = "@mantine/core/Card";
It.Section = wn;
function Xd({ open: t, close: e, openDelay: n, closeDelay: r }) {
  const s = q(-1), o = q(-1), i = () => {
    window.clearTimeout(s.current), window.clearTimeout(o.current);
  }, a = () => {
    i(), n === 0 || n === void 0 ? t() : s.current = window.setTimeout(t, n);
  }, c = () => {
    i(), r === 0 || r === void 0 ? e() : o.current = window.setTimeout(e, r);
  };
  return J(() => i, []), { openDropdown: a, closeDropdown: c };
}
function qd(t = "top-end", e = 0) {
  const n = {
    "--indicator-top": void 0,
    "--indicator-bottom": void 0,
    "--indicator-left": void 0,
    "--indicator-right": void 0,
    "--indicator-translate-x": void 0,
    "--indicator-translate-y": void 0
  }, r = fe(e), [s, o] = t.split("-");
  return s === "top" && (n["--indicator-top"] = r, n["--indicator-translate-y"] = "-50%"), s === "middle" && (n["--indicator-top"] = "50%", n["--indicator-translate-y"] = "-50%"), s === "bottom" && (n["--indicator-bottom"] = r, n["--indicator-translate-y"] = "50%"), o === "start" && (n["--indicator-left"] = r, n["--indicator-translate-x"] = "-50%"), o === "center" && (n["--indicator-left"] = "50%", n["--indicator-translate-x"] = "-50%"), o === "end" && (n["--indicator-right"] = r, n["--indicator-translate-x"] = "50%"), n;
}
var Ho = { root: "m_e5262200", indicator: "m_760d1fb1", processing: "m_885901b1" };
const Gd = {
  position: "top-end",
  offset: 0,
  inline: !1,
  withBorder: !1,
  disabled: !1,
  processing: !1
}, Kd = (t, { color: e, position: n, offset: r, size: s, radius: o, zIndex: i, autoContrast: a }) => ({
  root: {
    "--indicator-color": e ? at(e, t) : void 0,
    "--indicator-text-color": cc(a, t) ? Ya({ color: e, theme: t, autoContrast: a }) : void 0,
    "--indicator-size": fe(s),
    "--indicator-radius": o === void 0 ? void 0 : Fe(o),
    "--indicator-z-index": i == null ? void 0 : i.toString(),
    ...qd(n, r)
  }
}), Er = oe((t, e) => {
  const n = B("Indicator", Gd, t), {
    classNames: r,
    className: s,
    style: o,
    styles: i,
    unstyled: a,
    vars: c,
    children: l,
    position: d,
    offset: f,
    inline: u,
    label: m,
    radius: p,
    color: h,
    withBorder: g,
    disabled: b,
    processing: x,
    zIndex: v,
    autoContrast: w,
    mod: S,
    ...R
  } = n, C = se({
    name: "Indicator",
    classes: Ho,
    props: n,
    className: s,
    style: o,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: Kd
  });
  return /* @__PURE__ */ ne(Y, { ref: e, ...C("root"), mod: [{ inline: u }, S], ...R, children: [
    !b && /* @__PURE__ */ y(
      Y,
      {
        mod: { "with-label": !!m, "with-border": g, processing: x },
        ...C("indicator"),
        children: m
      }
    ),
    l
  ] });
});
Er.classes = Ho;
Er.displayName = "@mantine/core/Indicator";
const [Qd, Dt] = At(
  "Menu component was not found in the tree"
);
var yt = { dropdown: "m_dc9b7c9f", label: "m_9bfac126", divider: "m_efdf90cb", item: "m_99ac2aa1", itemLabel: "m_5476e0d3", itemSection: "m_8b75e504" };
const Jd = {}, Ir = oe((t, e) => {
  const { classNames: n, className: r, style: s, styles: o, vars: i, ...a } = B(
    "MenuDivider",
    Jd,
    t
  ), c = Dt();
  return /* @__PURE__ */ y(
    Y,
    {
      ref: e,
      ...c.getStyles("divider", { className: r, style: s, styles: o, classNames: n }),
      ...a
    }
  );
});
Ir.classes = yt;
Ir.displayName = "@mantine/core/MenuDivider";
const eu = {}, Dr = oe((t, e) => {
  const {
    classNames: n,
    className: r,
    style: s,
    styles: o,
    vars: i,
    onMouseEnter: a,
    onMouseLeave: c,
    onKeyDown: l,
    children: d,
    ...f
  } = B("MenuDropdown", eu, t), u = q(null), m = Dt(), p = Ce(l, (b) => {
    var x, v;
    (b.key === "ArrowUp" || b.key === "ArrowDown") && (b.preventDefault(), (v = (x = u.current) == null ? void 0 : x.querySelectorAll("[data-menu-item]:not(:disabled)")[0]) == null || v.focus());
  }), h = Ce(
    a,
    () => (m.trigger === "hover" || m.trigger === "click-hover") && m.openDropdown()
  ), g = Ce(
    c,
    () => (m.trigger === "hover" || m.trigger === "click-hover") && m.closeDropdown()
  );
  return /* @__PURE__ */ ne(
    Qe.Dropdown,
    {
      ...f,
      onMouseEnter: h,
      onMouseLeave: g,
      role: "menu",
      "aria-orientation": "vertical",
      ref: ke(e, u),
      ...m.getStyles("dropdown", {
        className: r,
        style: s,
        styles: o,
        classNames: n,
        withStaticClass: !1
      }),
      tabIndex: -1,
      "data-menu-dropdown": !0,
      onKeyDown: p,
      children: [
        m.withInitialFocusPlaceholder && /* @__PURE__ */ y("div", { tabIndex: -1, "data-autofocus": !0, "data-mantine-stop-propagation": !0, style: { outline: 0 } }),
        d
      ]
    }
  );
});
Dr.classes = yt;
Dr.displayName = "@mantine/core/MenuDropdown";
const tu = {}, Mr = Ie((t, e) => {
  const {
    classNames: n,
    className: r,
    style: s,
    styles: o,
    vars: i,
    color: a,
    closeMenuOnClick: c,
    leftSection: l,
    rightSection: d,
    children: f,
    disabled: u,
    "data-disabled": m,
    ...p
  } = B("MenuItem", tu, t), h = Dt(), g = Ke(), { dir: b } = cn(), x = q(null), v = h.getItemIndex(x.current), w = p, S = Ce(w.onMouseLeave, () => h.setHovered(-1)), R = Ce(
    w.onMouseEnter,
    () => h.setHovered(h.getItemIndex(x.current))
  ), C = Ce(w.onClick, () => {
    m || (typeof c == "boolean" ? c && h.closeDropdownImmediately() : h.closeOnItemClick && h.closeDropdownImmediately());
  }), N = Ce(
    w.onFocus,
    () => h.setHovered(h.getItemIndex(x.current))
  ), $ = a ? g.variantColorResolver({ color: a, theme: g, variant: "light" }) : void 0, P = a ? Pt({ color: a, theme: g }) : null;
  return /* @__PURE__ */ ne(
    hn,
    {
      ...p,
      unstyled: h.unstyled,
      tabIndex: h.menuItemTabIndex,
      onFocus: N,
      ...h.getStyles("item", { className: r, style: s, styles: o, classNames: n }),
      ref: ke(x, e),
      role: "menuitem",
      disabled: u,
      "data-menu-item": !0,
      "data-disabled": u || m || void 0,
      "data-hovered": h.hovered === v ? !0 : void 0,
      "data-mantine-stop-propagation": !0,
      onMouseEnter: R,
      onMouseLeave: S,
      onClick: C,
      onKeyDown: sa({
        siblingSelector: "[data-menu-item]:not([data-disabled])",
        parentSelector: "[data-menu-dropdown]",
        activateOnFocus: !1,
        loop: h.loop,
        dir: b,
        orientation: "vertical",
        onKeyDown: w.onKeyDown
      }),
      __vars: {
        "--menu-item-color": P != null && P.isThemeColor && (P == null ? void 0 : P.shade) === void 0 ? `var(--mantine-color-${P.color}-6)` : $ == null ? void 0 : $.color,
        "--menu-item-hover": $ == null ? void 0 : $.hover
      },
      children: [
        l && /* @__PURE__ */ y("div", { ...h.getStyles("itemSection", { styles: o, classNames: n }), "data-position": "left", children: l }),
        f && /* @__PURE__ */ y("div", { ...h.getStyles("itemLabel", { styles: o, classNames: n }), children: f }),
        d && /* @__PURE__ */ y("div", { ...h.getStyles("itemSection", { styles: o, classNames: n }), "data-position": "right", children: d })
      ]
    }
  );
});
Mr.classes = yt;
Mr.displayName = "@mantine/core/MenuItem";
const nu = {}, Lr = oe((t, e) => {
  const { classNames: n, className: r, style: s, styles: o, vars: i, ...a } = B(
    "MenuLabel",
    nu,
    t
  ), c = Dt();
  return /* @__PURE__ */ y(
    Y,
    {
      ref: e,
      ...c.getStyles("label", { className: r, style: s, styles: o, classNames: n }),
      ...a
    }
  );
});
Lr.classes = yt;
Lr.displayName = "@mantine/core/MenuLabel";
const ru = {
  refProp: "ref"
}, Uo = G((t, e) => {
  const { children: n, refProp: r, ...s } = B("MenuTarget", ru, t);
  if (!ur(n))
    throw new Error(
      "Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const o = Dt(), i = n.props, a = Ce(i.onClick, () => {
    o.trigger === "click" ? o.toggleDropdown() : o.trigger === "click-hover" && (o.setOpenedViaClick(!0), o.opened || o.openDropdown());
  }), c = Ce(
    i.onMouseEnter,
    () => (o.trigger === "hover" || o.trigger === "click-hover") && o.openDropdown()
  ), l = Ce(i.onMouseLeave, () => {
    (o.trigger === "hover" || o.trigger === "click-hover" && !o.openedViaClick) && o.closeDropdown();
  });
  return /* @__PURE__ */ y(Qe.Target, { refProp: r, popupType: "menu", ref: e, ...s, children: nn(n, {
    onClick: a,
    onMouseEnter: c,
    onMouseLeave: l,
    "data-expanded": o.opened ? !0 : void 0
  }) });
});
Uo.displayName = "@mantine/core/MenuTarget";
const su = {
  trapFocus: !0,
  closeOnItemClick: !0,
  withInitialFocusPlaceholder: !0,
  clickOutsideEvents: ["mousedown", "touchstart", "keydown"],
  loop: !0,
  trigger: "click",
  openDelay: 0,
  closeDelay: 100,
  menuItemTabIndex: -1
};
function de(t) {
  const e = B("Menu", su, t), {
    children: n,
    onOpen: r,
    onClose: s,
    opened: o,
    defaultOpened: i,
    trapFocus: a,
    onChange: c,
    closeOnItemClick: l,
    loop: d,
    closeOnEscape: f,
    trigger: u,
    openDelay: m,
    closeDelay: p,
    classNames: h,
    styles: g,
    unstyled: b,
    variant: x,
    vars: v,
    menuItemTabIndex: w,
    keepMounted: S,
    withInitialFocusPlaceholder: R,
    ...C
  } = e, N = se({
    name: "Menu",
    classes: yt,
    props: e,
    classNames: h,
    styles: g,
    unstyled: b
  }), [$, { setHovered: P, resetHovered: K }] = da(), [z, W] = Xs({
    value: o,
    defaultValue: i,
    finalValue: !1,
    onChange: c
  }), [H, U] = V(!1), j = () => {
    W(!1), U(!1), z && (s == null || s());
  }, X = () => {
    W(!0), !z && (r == null || r());
  }, M = () => {
    z ? j() : X();
  }, { openDropdown: Q, closeDropdown: ie } = Xd({ open: X, close: j, closeDelay: p, openDelay: m }), bt = (xt) => la("[data-menu-item]", "[data-menu-dropdown]", xt), { resolvedClassNames: Je, resolvedStyles: wt } = Qs({
    classNames: h,
    styles: g,
    props: e
  });
  return Xe(() => {
    K();
  }, [z]), /* @__PURE__ */ y(
    Qd,
    {
      value: {
        getStyles: N,
        opened: z,
        toggleDropdown: M,
        getItemIndex: bt,
        hovered: $,
        setHovered: P,
        openedViaClick: H,
        setOpenedViaClick: U,
        closeOnItemClick: l,
        closeDropdown: u === "click" ? j : ie,
        openDropdown: u === "click" ? X : Q,
        closeDropdownImmediately: j,
        loop: d,
        trigger: u,
        unstyled: b,
        menuItemTabIndex: w,
        withInitialFocusPlaceholder: R
      },
      children: /* @__PURE__ */ y(
        Qe,
        {
          ...C,
          opened: z,
          onChange: M,
          defaultOpened: i,
          trapFocus: S ? !1 : a,
          closeOnEscape: f,
          __staticSelector: "Menu",
          classNames: Je,
          styles: wt,
          unstyled: b,
          variant: x,
          keepMounted: S,
          children: n
        }
      )
    }
  );
}
de.extend = (t) => t;
de.withProps = $c(de);
de.classes = yt;
de.displayName = "@mantine/core/Menu";
de.Item = Mr;
de.Label = Lr;
de.Dropdown = Dr;
de.Target = Uo;
de.Divider = Ir;
var Yo = { root: "m_6d731127" };
const ou = {
  gap: "md",
  align: "stretch",
  justify: "flex-start"
}, iu = (t, { gap: e, align: n, justify: r }) => ({
  root: {
    "--stack-gap": sn(e),
    "--stack-align": n,
    "--stack-justify": r
  }
}), ut = oe((t, e) => {
  const n = B("Stack", ou, t), {
    classNames: r,
    className: s,
    style: o,
    styles: i,
    unstyled: a,
    vars: c,
    align: l,
    justify: d,
    gap: f,
    variant: u,
    ...m
  } = n, p = se({
    name: "Stack",
    props: n,
    classes: Yo,
    className: s,
    style: o,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: iu
  });
  return /* @__PURE__ */ y(Y, { ref: e, ...p("root"), variant: u, ...m });
});
ut.classes = Yo;
ut.displayName = "@mantine/core/Stack";
var Xo = { root: "m_7341320d" };
const au = {}, cu = (t, { size: e, radius: n, variant: r, gradient: s, color: o, autoContrast: i }) => {
  const a = t.variantColorResolver({
    color: o || t.primaryColor,
    theme: t,
    gradient: s,
    variant: r || "filled",
    autoContrast: i
  });
  return {
    root: {
      "--ti-size": pe(e, "ti-size"),
      "--ti-radius": n === void 0 ? void 0 : Fe(n),
      "--ti-bg": o || r ? a.background : void 0,
      "--ti-color": o || r ? a.color : void 0,
      "--ti-bd": o || r ? a.border : void 0
    }
  };
}, zr = oe((t, e) => {
  const n = B("ThemeIcon", au, t), { classNames: r, className: s, style: o, styles: i, unstyled: a, vars: c, autoContrast: l, ...d } = n, f = se({
    name: "ThemeIcon",
    classes: Xo,
    props: n,
    className: s,
    style: o,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: cu
  });
  return /* @__PURE__ */ y(Y, { ref: e, ...f("root"), ...d });
});
zr.classes = Xo;
zr.displayName = "@mantine/core/ThemeIcon";
const lu = ["h1", "h2", "h3", "h4", "h5", "h6"], du = ["xs", "sm", "md", "lg", "xl"];
function uu(t, e) {
  const n = e !== void 0 ? e : `h${t}`;
  return lu.includes(n) ? {
    fontSize: `var(--mantine-${n}-font-size)`,
    fontWeight: `var(--mantine-${n}-font-weight)`,
    lineHeight: `var(--mantine-${n}-line-height)`
  } : du.includes(n) ? {
    fontSize: `var(--mantine-font-size-${n})`,
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  } : {
    fontSize: fe(n),
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  };
}
var qo = { root: "m_8a5d1357" };
const fu = {
  order: 1
}, mu = (t, { order: e, size: n, lineClamp: r, textWrap: s }) => {
  const o = uu(e, n);
  return {
    root: {
      "--title-fw": o.fontWeight,
      "--title-lh": o.lineHeight,
      "--title-fz": o.fontSize,
      "--title-line-clamp": typeof r == "number" ? r.toString() : void 0,
      "--title-text-wrap": s
    }
  };
}, jr = oe((t, e) => {
  const n = B("Title", fu, t), {
    classNames: r,
    className: s,
    style: o,
    styles: i,
    unstyled: a,
    order: c,
    vars: l,
    size: d,
    variant: f,
    lineClamp: u,
    textWrap: m,
    mod: p,
    ...h
  } = n, g = se({
    name: "Title",
    props: n,
    classes: qo,
    className: s,
    style: o,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: mu
  });
  return [1, 2, 3, 4, 5, 6].includes(c) ? /* @__PURE__ */ y(
    Y,
    {
      ...g("root"),
      component: `h${c}`,
      variant: f,
      ref: e,
      mod: [{ order: c, "data-line-clamp": typeof u == "number" }, p],
      size: d,
      ...h
    }
  ) : null;
});
jr.classes = qo;
jr.displayName = "@mantine/core/Title";
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var pu = {
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
const Go = (t, e, n, r) => {
  const s = G(
    ({ color: o = "currentColor", size: i = 24, stroke: a = 2, title: c, className: l, children: d, ...f }, u) => On(
      "svg",
      {
        ref: u,
        ...pu[t],
        width: i,
        height: i,
        className: ["tabler-icon", `tabler-icon-${e}`, l].join(" "),
        strokeWidth: a,
        stroke: o,
        ...f
      },
      [
        c && On("title", { key: "svg-title" }, c),
        ...r.map(([m, p]) => On(m, p)),
        ...Array.isArray(d) ? d : [d]
      ]
    )
  );
  return s.displayName = `${n}`, s;
};
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hu = [["path", { d: "M3 12h4l3 8l4 -16l3 8h4", key: "svg-0" }]], gu = Go("outline", "activity", "Activity", hu);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yu = [["path", { d: "M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6", key: "svg-0" }], ["path", { d: "M9 17v1a3 3 0 0 0 6 0v-1", key: "svg-1" }]], vu = Go("outline", "bell", "Bell", yu);
function bu(t, e) {
  switch (e.type) {
    case "ADD":
      return { items: [e.item, ...t.items].slice(0, 50) };
    case "CLEAR":
      return { items: [] };
    default:
      return t;
  }
}
const Ko = ft(null);
function wu({ children: t }) {
  const [e, n] = oi(bu, { items: [] }), r = Zi(), s = ee(
    (o, i, a = !1) => {
      n({
        type: "ADD",
        item: {
          id: `${Date.now()}-${Math.random()}`,
          type: o,
          message: i,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      }), a && r(i, "info");
    },
    [r]
  );
  return ve("task.created", ee(
    (o) => s("task", `Task created: ${o.title}`, !0),
    [s]
  )), ve("task.updated", ee(
    (o) => s("task", `Task updated: ${o.taskId}`),
    [s]
  )), ve("task.deleted", ee(
    (o) => s("task", `Task deleted: ${o.taskId}`, !0),
    [s]
  )), ve("report.generated", ee(
    (o) => s("report", `Report generated: ${o.type}`, !0),
    [s]
  )), ve("user.loggedIn", ee(
    (o) => s("user", `User logged in: ${o.email}`),
    [s]
  )), /* @__PURE__ */ y(Ko.Provider, { value: { items: e.items, addItem: s }, children: t });
}
function xu() {
  const t = mt(Ko);
  if (!t) throw new Error("useFeed must be used within FeedProvider");
  return t;
}
const _u = ir(function() {
  const { items: e } = xu();
  return /* @__PURE__ */ y($t, { h: 280, children: /* @__PURE__ */ ne(ut, { gap: "xs", children: [
    e.map((n) => /* @__PURE__ */ ne(It, { withBorder: !0, padding: "sm", radius: "md", children: [
      /* @__PURE__ */ ne(vn, { justify: "space-between", wrap: "nowrap", children: [
        /* @__PURE__ */ y(He, { size: "sm", lineClamp: 2, children: n.message }),
        /* @__PURE__ */ y(bn, { size: "xs", variant: "light", children: n.type })
      ] }),
      /* @__PURE__ */ y(He, { size: "xs", c: "dimmed", mt: 4, children: new Date(n.timestamp).toLocaleTimeString() })
    ] }, n.id)),
    e.length === 0 && /* @__PURE__ */ y(He, { c: "dimmed", ta: "center", py: "md", size: "sm", children: "Install this plugin, then create a task — events appear here instantly." })
  ] }) });
}), Su = ir(function() {
  return /* @__PURE__ */ y(wu, { children: /* @__PURE__ */ y(It, { withBorder: !0, padding: "lg", radius: "lg", children: /* @__PURE__ */ ne(ut, { gap: "md", children: [
    /* @__PURE__ */ ne(vn, { gap: "sm", children: [
      /* @__PURE__ */ y(zr, { variant: "light", color: "orange", size: "lg", radius: "md", children: /* @__PURE__ */ y(gu, { size: 20 }) }),
      /* @__PURE__ */ y(jr, { order: 4, children: "Live Activity Feed" })
    ] }),
    /* @__PURE__ */ y(_u, {})
  ] }) }) });
}), ku = ir(function() {
  const [e, n] = V([]), [r, s] = V(0), o = ee((i, a) => {
    n(
      (c) => [
        {
          id: `${Date.now()}-${Math.random()}`,
          type: i,
          message: a,
          time: (/* @__PURE__ */ new Date()).toLocaleTimeString()
        },
        ...c
      ].slice(0, 20)
    ), s((c) => c + 1);
  }, []);
  return ve("task.created", ee(
    (i) => o("task", `New task: ${i.title}`),
    [o]
  )), ve("task.updated", ee(
    (i) => o("task", `Task updated: ${i.taskId}`),
    [o]
  )), ve("task.deleted", ee(
    (i) => o("task", `Task deleted: ${i.taskId}`),
    [o]
  )), ve("report.generated", ee(
    (i) => o("report", `Report ready: ${i.type}`),
    [o]
  )), ve("plugin.enabled", ee(
    (i) => o("plugin", `Plugin enabled: ${i.pluginId}`),
    [o]
  )), /* @__PURE__ */ ne(
    de,
    {
      position: "bottom-end",
      width: 320,
      onOpen: () => s(0),
      children: [
        /* @__PURE__ */ y(de.Target, { children: /* @__PURE__ */ y(Er, { inline: !0, label: r > 0 ? r : void 0, size: 16, color: "red", disabled: r === 0, children: /* @__PURE__ */ y(Et, { variant: "subtle", "aria-label": "Notifications", children: /* @__PURE__ */ y(vu, { size: 18 }) }) }) }),
        /* @__PURE__ */ ne(de.Dropdown, { children: [
          /* @__PURE__ */ y(de.Label, { children: "Live event feed" }),
          e.length === 0 ? /* @__PURE__ */ y(He, { size: "sm", c: "dimmed", px: "sm", py: "xs", children: "Create a task or generate a report to see events." }) : /* @__PURE__ */ y(ut, { gap: 4, px: "xs", pb: "xs", mah: 280, style: { overflow: "auto" }, children: e.map((i) => /* @__PURE__ */ y(de.Item, { children: /* @__PURE__ */ ne(ut, { gap: 2, children: [
            /* @__PURE__ */ y(He, { size: "sm", children: i.message }),
            /* @__PURE__ */ ne(bn, { size: "xs", variant: "light", children: [
              i.type,
              " · ",
              i.time
            ] })
          ] }) }, i.id)) })
        ] })
      ]
    }
  );
});
function Cu(t) {
  let e = t, n = !1;
  const r = /* @__PURE__ */ new Set();
  return {
    getState() {
      return e;
    },
    updateState(s) {
      e = typeof s == "function" ? s(e) : s;
    },
    setState(s) {
      this.updateState(s), r.forEach((o) => o(e));
    },
    initialize(s) {
      n || (e = s, n = !0);
    },
    subscribe(s) {
      return r.add(s), () => r.delete(s);
    }
  };
}
function Ru(t, e, n) {
  const r = [], s = [], o = {};
  for (const i of t) {
    const a = i.position || e;
    o[a] = o[a] || 0, o[a] += 1, o[a] <= n ? s.push(i) : r.push(i);
  }
  return { notifications: s, queue: r };
}
const Tu = () => Cu({
  notifications: [],
  queue: [],
  defaultPosition: "bottom-right",
  limit: 5
}), Mt = Tu();
function vt(t, e) {
  const n = t.getState(), r = e([...n.notifications, ...n.queue]), s = Ru(r, n.defaultPosition, n.limit);
  t.setState({
    notifications: s.notifications,
    queue: s.queue,
    limit: n.limit,
    defaultPosition: n.defaultPosition
  });
}
function Nu(t, e = Mt) {
  const n = t.id || Ws();
  return vt(e, (r) => t.id && r.some((s) => s.id === t.id) ? r : [...r, { ...t, id: n }]), n;
}
function Au(t, e = Mt) {
  return vt(
    e,
    (n) => n.filter((r) => {
      var s;
      return r.id === t ? ((s = r.onClose) == null || s.call(r, r), !1) : !0;
    })
  ), t;
}
function Pu(t, e = Mt) {
  return vt(
    e,
    (n) => n.map((r) => r.id === t.id ? { ...r, ...t } : r)
  ), t.id;
}
function Ou(t = Mt) {
  vt(t, () => []);
}
function $u(t = Mt) {
  vt(
    t,
    (e) => e.slice(0, t.getState().limit)
  );
}
const Eu = {
  show: Nu,
  hide: Au,
  update: Pu,
  clean: Ou,
  cleanQueue: $u,
  updateState: vt
};
function Iu() {
  const t = ee(
    (e) => {
      Eu.show({
        title: e.title,
        message: e.message,
        color: e.variant === "error" ? "red" : e.variant === "success" ? "green" : e.variant === "warning" ? "yellow" : "blue",
        autoClose: 4e3
      });
    },
    []
  );
  return ve("notification.show", t), null;
}
function zu() {
  Fi({
    manifest: Ji,
    widgets: [
      {
        slot: "dashboard.sidebar",
        component: Su,
        priority: 20
      },
      {
        slot: "header.actions",
        component: Iu,
        priority: 1
      },
      {
        slot: "header.actions",
        component: ku,
        priority: 100
      }
    ]
  });
}
export {
  zu as activate
};
