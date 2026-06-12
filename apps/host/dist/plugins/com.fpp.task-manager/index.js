import { jsx as y, jsxs as ie, Fragment as ht } from "react/jsx-runtime";
import * as W from "react";
import cr, { createContext as It, useContext as Dt, useMemo as Gt, useCallback as Q, Fragment as ls, useRef as J, useEffect as te, useState as G, useLayoutEffect as Tr, useId as ds, forwardRef as re, cloneElement as tn, Children as us, createElement as gn, useReducer as ji } from "react";
import * as Fi from "react-dom";
import Vi, { createPortal as Wi } from "react-dom";
const Zi = [
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
], Hi = [
  "dashboard.main",
  "dashboard.sidebar",
  "header.actions",
  "settings.sections",
  "reports.widgets",
  "sidebar.nav"
];
var K;
(function(t) {
  t.assertEqual = (o) => {
  };
  function e(o) {
  }
  t.assertIs = e;
  function n(o) {
    throw new Error();
  }
  t.assertNever = n, t.arrayToEnum = (o) => {
    const s = {};
    for (const i of o)
      s[i] = i;
    return s;
  }, t.getValidEnumValues = (o) => {
    const s = t.objectKeys(o).filter((a) => typeof o[o[a]] != "number"), i = {};
    for (const a of s)
      i[a] = o[a];
    return t.objectValues(i);
  }, t.objectValues = (o) => t.objectKeys(o).map(function(s) {
    return o[s];
  }), t.objectKeys = typeof Object.keys == "function" ? (o) => Object.keys(o) : (o) => {
    const s = [];
    for (const i in o)
      Object.prototype.hasOwnProperty.call(o, i) && s.push(i);
    return s;
  }, t.find = (o, s) => {
    for (const i of o)
      if (s(i))
        return i;
  }, t.isInteger = typeof Number.isInteger == "function" ? (o) => Number.isInteger(o) : (o) => typeof o == "number" && Number.isFinite(o) && Math.floor(o) === o;
  function r(o, s = " | ") {
    return o.map((i) => typeof i == "string" ? `'${i}'` : i).join(s);
  }
  t.joinValues = r, t.jsonStringifyReplacer = (o, s) => typeof s == "bigint" ? s.toString() : s;
})(K || (K = {}));
var xo;
(function(t) {
  t.mergeShapes = (e, n) => ({
    ...e,
    ...n
    // second overwrites first
  });
})(xo || (xo = {}));
const A = K.arrayToEnum([
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
]), nt = (t) => {
  switch (typeof t) {
    case "undefined":
      return A.undefined;
    case "string":
      return A.string;
    case "number":
      return Number.isNaN(t) ? A.nan : A.number;
    case "boolean":
      return A.boolean;
    case "function":
      return A.function;
    case "bigint":
      return A.bigint;
    case "symbol":
      return A.symbol;
    case "object":
      return Array.isArray(t) ? A.array : t === null ? A.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? A.promise : typeof Map < "u" && t instanceof Map ? A.map : typeof Set < "u" && t instanceof Set ? A.set : typeof Date < "u" && t instanceof Date ? A.date : A.object;
    default:
      return A.unknown;
  }
}, _ = K.arrayToEnum([
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
class Ke extends Error {
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
    const n = e || function(s) {
      return s.message;
    }, r = { _errors: [] }, o = (s) => {
      for (const i of s.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(o);
        else if (i.code === "invalid_return_type")
          o(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          o(i.argumentsError);
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
    return o(this), r;
  }
  static assert(e) {
    if (!(e instanceof Ke))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, K.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (n) => n.message) {
    const n = {}, r = [];
    for (const o of this.issues)
      if (o.path.length > 0) {
        const s = o.path[0];
        n[s] = n[s] || [], n[s].push(e(o));
      } else
        r.push(e(o));
    return { formErrors: r, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
Ke.create = (t) => new Ke(t);
const lr = (t, e) => {
  let n;
  switch (t.code) {
    case _.invalid_type:
      t.received === A.undefined ? n = "Required" : n = `Expected ${t.expected}, received ${t.received}`;
      break;
    case _.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(t.expected, K.jsonStringifyReplacer)}`;
      break;
    case _.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${K.joinValues(t.keys, ", ")}`;
      break;
    case _.invalid_union:
      n = "Invalid input";
      break;
    case _.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${K.joinValues(t.options)}`;
      break;
    case _.invalid_enum_value:
      n = `Invalid enum value. Expected ${K.joinValues(t.options)}, received '${t.received}'`;
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
      typeof t.validation == "object" ? "includes" in t.validation ? (n = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? n = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? n = `Invalid input: must end with "${t.validation.endsWith}"` : K.assertNever(t.validation) : t.validation !== "regex" ? n = `Invalid ${t.validation}` : n = "Invalid";
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
      n = e.defaultError, K.assertNever(t);
  }
  return { message: n };
};
let Ui = lr;
function Yi() {
  return Ui;
}
const qi = (t) => {
  const { data: e, path: n, errorMaps: r, issueData: o } = t, s = [...n, ...o.path || []], i = {
    ...o,
    path: s
  };
  if (o.message !== void 0)
    return {
      ...o,
      path: s,
      message: o.message
    };
  let a = "";
  const c = r.filter((l) => !!l).slice().reverse();
  for (const l of c)
    a = l(i, { data: e, defaultError: a }).message;
  return {
    ...o,
    path: s,
    message: a
  };
};
function T(t, e) {
  const n = Yi(), r = qi({
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
      n === lr ? void 0 : lr
      // then global default map
    ].filter((o) => !!o)
  });
  t.common.issues.push(r);
}
class ye {
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
    for (const o of n) {
      if (o.status === "aborted")
        return B;
      o.status === "dirty" && e.dirty(), r.push(o.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, n) {
    const r = [];
    for (const o of n) {
      const s = await o.key, i = await o.value;
      r.push({
        key: s,
        value: i
      });
    }
    return ye.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, n) {
    const r = {};
    for (const o of n) {
      const { key: s, value: i } = o;
      if (s.status === "aborted" || i.status === "aborted")
        return B;
      s.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), s.value !== "__proto__" && (typeof i.value < "u" || o.alwaysSet) && (r[s.value] = i.value);
    }
    return { status: e.value, value: r };
  }
}
const B = Object.freeze({
  status: "aborted"
}), Ut = (t) => ({ status: "dirty", value: t }), Ne = (t) => ({ status: "valid", value: t }), _o = (t) => t.status === "aborted", So = (t) => t.status === "dirty", St = (t) => t.status === "valid", vn = (t) => typeof Promise < "u" && t instanceof Promise;
var O;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(O || (O = {}));
class Ze {
  constructor(e, n, r, o) {
    this._cachedPath = [], this.parent = e, this.data = n, this._path = r, this._key = o;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Co = (t, e) => {
  if (St(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const n = new Ke(t.common.issues);
      return this._error = n, this._error;
    }
  };
};
function Z(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: n, required_error: r, description: o } = t;
  if (e && (n || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: o } : { errorMap: (i, a) => {
    const { message: c } = t;
    return i.code === "invalid_enum_value" ? { message: c ?? a.defaultError } : typeof a.data > "u" ? { message: c ?? r ?? a.defaultError } : i.code !== "invalid_type" ? { message: a.defaultError } : { message: c ?? n ?? a.defaultError };
  }, description: o };
}
class Y {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return nt(e.data);
  }
  _getOrReturnCtx(e, n) {
    return n || {
      common: e.parent.common,
      data: e.data,
      parsedType: nt(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new ye(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: nt(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const n = this._parse(e);
    if (vn(n))
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
      parsedType: nt(e)
    }, o = this._parseSync({ data: e, path: r.path, parent: r });
    return Co(r, o);
  }
  "~validate"(e) {
    var r, o;
    const n = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: nt(e)
    };
    if (!this["~standard"].async)
      try {
        const s = this._parseSync({ data: e, path: [], parent: n });
        return St(s) ? {
          value: s.value
        } : {
          issues: n.common.issues
        };
      } catch (s) {
        (o = (r = s == null ? void 0 : s.message) == null ? void 0 : r.toLowerCase()) != null && o.includes("encountered") && (this["~standard"].async = !0), n.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: n }).then((s) => St(s) ? {
      value: s.value
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
      parsedType: nt(e)
    }, o = this._parse({ data: e, path: r.path, parent: r }), s = await (vn(o) ? o : Promise.resolve(o));
    return Co(r, s);
  }
  refine(e, n) {
    const r = (o) => typeof n == "string" || typeof n > "u" ? { message: n } : typeof n == "function" ? n(o) : n;
    return this._refinement((o, s) => {
      const i = e(o), a = () => s.addIssue({
        code: _.custom,
        ...r(o)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((c) => c ? !0 : (a(), !1)) : i ? !0 : (a(), !1);
    });
  }
  refinement(e, n) {
    return this._refinement((r, o) => e(r) ? !0 : (o.addIssue(typeof n == "function" ? n(r, o) : n), !1));
  }
  _refinement(e) {
    return new Tt({
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
    return rt.create(this, this._def);
  }
  nullable() {
    return Rt.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Ve.create(this);
  }
  promise() {
    return Sn.create(this, this._def);
  }
  or(e) {
    return wn.create([this, e], this._def);
  }
  and(e) {
    return xn.create(this, e, this._def);
  }
  transform(e) {
    return new Tt({
      ...Z(this._def),
      schema: this,
      typeName: L.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const n = typeof e == "function" ? e : () => e;
    return new fr({
      ...Z(this._def),
      innerType: this,
      defaultValue: n,
      typeName: L.ZodDefault
    });
  }
  brand() {
    return new ya({
      typeName: L.ZodBranded,
      type: this,
      ...Z(this._def)
    });
  }
  catch(e) {
    const n = typeof e == "function" ? e : () => e;
    return new pr({
      ...Z(this._def),
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
    return Rr.create(this, e);
  }
  readonly() {
    return mr.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Xi = /^c[^\s-]{8,}$/i, Gi = /^[0-9a-z]+$/, Ki = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Ji = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Qi = /^[a-z0-9_-]{21}$/i, ea = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, ta = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, na = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, ra = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Jn;
const oa = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, sa = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, ia = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, aa = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, ca = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, la = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, fs = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", da = new RegExp(`^${fs}$`);
function ps(t) {
  let e = "[0-5]\\d";
  t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`);
  const n = t.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${n}`;
}
function ua(t) {
  return new RegExp(`^${ps(t)}$`);
}
function fa(t) {
  let e = `${fs}T${ps(t)}`;
  const n = [];
  return n.push(t.local ? "Z?" : "Z"), t.offset && n.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${n.join("|")})`, new RegExp(`^${e}$`);
}
function pa(t, e) {
  return !!((e === "v4" || !e) && oa.test(t) || (e === "v6" || !e) && ia.test(t));
}
function ma(t, e) {
  if (!ea.test(t))
    return !1;
  try {
    const [n] = t.split(".");
    if (!n)
      return !1;
    const r = n.replace(/-/g, "+").replace(/_/g, "/").padEnd(n.length + (4 - n.length % 4) % 4, "="), o = JSON.parse(atob(r));
    return !(typeof o != "object" || o === null || "typ" in o && (o == null ? void 0 : o.typ) !== "JWT" || !o.alg || e && o.alg !== e);
  } catch {
    return !1;
  }
}
function ha(t, e) {
  return !!((e === "v4" || !e) && sa.test(t) || (e === "v6" || !e) && aa.test(t));
}
class Ge extends Y {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== A.string) {
      const s = this._getOrReturnCtx(e);
      return T(s, {
        code: _.invalid_type,
        expected: A.string,
        received: s.parsedType
      }), B;
    }
    const r = new ye();
    let o;
    for (const s of this._def.checks)
      if (s.kind === "min")
        e.data.length < s.value && (o = this._getOrReturnCtx(e, o), T(o, {
          code: _.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), r.dirty());
      else if (s.kind === "max")
        e.data.length > s.value && (o = this._getOrReturnCtx(e, o), T(o, {
          code: _.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), r.dirty());
      else if (s.kind === "length") {
        const i = e.data.length > s.value, a = e.data.length < s.value;
        (i || a) && (o = this._getOrReturnCtx(e, o), i ? T(o, {
          code: _.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }) : a && T(o, {
          code: _.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }), r.dirty());
      } else if (s.kind === "email")
        na.test(e.data) || (o = this._getOrReturnCtx(e, o), T(o, {
          validation: "email",
          code: _.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "emoji")
        Jn || (Jn = new RegExp(ra, "u")), Jn.test(e.data) || (o = this._getOrReturnCtx(e, o), T(o, {
          validation: "emoji",
          code: _.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "uuid")
        Ji.test(e.data) || (o = this._getOrReturnCtx(e, o), T(o, {
          validation: "uuid",
          code: _.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "nanoid")
        Qi.test(e.data) || (o = this._getOrReturnCtx(e, o), T(o, {
          validation: "nanoid",
          code: _.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "cuid")
        Xi.test(e.data) || (o = this._getOrReturnCtx(e, o), T(o, {
          validation: "cuid",
          code: _.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "cuid2")
        Gi.test(e.data) || (o = this._getOrReturnCtx(e, o), T(o, {
          validation: "cuid2",
          code: _.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "ulid")
        Ki.test(e.data) || (o = this._getOrReturnCtx(e, o), T(o, {
          validation: "ulid",
          code: _.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "url")
        try {
          new URL(e.data);
        } catch {
          o = this._getOrReturnCtx(e, o), T(o, {
            validation: "url",
            code: _.invalid_string,
            message: s.message
          }), r.dirty();
        }
      else s.kind === "regex" ? (s.regex.lastIndex = 0, s.regex.test(e.data) || (o = this._getOrReturnCtx(e, o), T(o, {
        validation: "regex",
        code: _.invalid_string,
        message: s.message
      }), r.dirty())) : s.kind === "trim" ? e.data = e.data.trim() : s.kind === "includes" ? e.data.includes(s.value, s.position) || (o = this._getOrReturnCtx(e, o), T(o, {
        code: _.invalid_string,
        validation: { includes: s.value, position: s.position },
        message: s.message
      }), r.dirty()) : s.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : s.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : s.kind === "startsWith" ? e.data.startsWith(s.value) || (o = this._getOrReturnCtx(e, o), T(o, {
        code: _.invalid_string,
        validation: { startsWith: s.value },
        message: s.message
      }), r.dirty()) : s.kind === "endsWith" ? e.data.endsWith(s.value) || (o = this._getOrReturnCtx(e, o), T(o, {
        code: _.invalid_string,
        validation: { endsWith: s.value },
        message: s.message
      }), r.dirty()) : s.kind === "datetime" ? fa(s).test(e.data) || (o = this._getOrReturnCtx(e, o), T(o, {
        code: _.invalid_string,
        validation: "datetime",
        message: s.message
      }), r.dirty()) : s.kind === "date" ? da.test(e.data) || (o = this._getOrReturnCtx(e, o), T(o, {
        code: _.invalid_string,
        validation: "date",
        message: s.message
      }), r.dirty()) : s.kind === "time" ? ua(s).test(e.data) || (o = this._getOrReturnCtx(e, o), T(o, {
        code: _.invalid_string,
        validation: "time",
        message: s.message
      }), r.dirty()) : s.kind === "duration" ? ta.test(e.data) || (o = this._getOrReturnCtx(e, o), T(o, {
        validation: "duration",
        code: _.invalid_string,
        message: s.message
      }), r.dirty()) : s.kind === "ip" ? pa(e.data, s.version) || (o = this._getOrReturnCtx(e, o), T(o, {
        validation: "ip",
        code: _.invalid_string,
        message: s.message
      }), r.dirty()) : s.kind === "jwt" ? ma(e.data, s.alg) || (o = this._getOrReturnCtx(e, o), T(o, {
        validation: "jwt",
        code: _.invalid_string,
        message: s.message
      }), r.dirty()) : s.kind === "cidr" ? ha(e.data, s.version) || (o = this._getOrReturnCtx(e, o), T(o, {
        validation: "cidr",
        code: _.invalid_string,
        message: s.message
      }), r.dirty()) : s.kind === "base64" ? ca.test(e.data) || (o = this._getOrReturnCtx(e, o), T(o, {
        validation: "base64",
        code: _.invalid_string,
        message: s.message
      }), r.dirty()) : s.kind === "base64url" ? la.test(e.data) || (o = this._getOrReturnCtx(e, o), T(o, {
        validation: "base64url",
        code: _.invalid_string,
        message: s.message
      }), r.dirty()) : K.assertNever(s);
    return { status: r.value, value: e.data };
  }
  _regex(e, n, r) {
    return this.refinement((o) => e.test(o), {
      validation: n,
      code: _.invalid_string,
      ...O.errToObj(r)
    });
  }
  _addCheck(e) {
    return new Ge({
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
    return new Ge({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Ge({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Ge({
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
Ge.create = (t) => new Ge({
  checks: [],
  typeName: L.ZodString,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...Z(t)
});
function ga(t, e) {
  const n = (t.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, o = n > r ? n : r, s = Number.parseInt(t.toFixed(o).replace(".", "")), i = Number.parseInt(e.toFixed(o).replace(".", ""));
  return s % i / 10 ** o;
}
class Ct extends Y {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== A.number) {
      const s = this._getOrReturnCtx(e);
      return T(s, {
        code: _.invalid_type,
        expected: A.number,
        received: s.parsedType
      }), B;
    }
    let r;
    const o = new ye();
    for (const s of this._def.checks)
      s.kind === "int" ? K.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), T(r, {
        code: _.invalid_type,
        expected: "integer",
        received: "float",
        message: s.message
      }), o.dirty()) : s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (r = this._getOrReturnCtx(e, r), T(r, {
        code: _.too_small,
        minimum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), o.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (r = this._getOrReturnCtx(e, r), T(r, {
        code: _.too_big,
        maximum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), o.dirty()) : s.kind === "multipleOf" ? ga(e.data, s.value) !== 0 && (r = this._getOrReturnCtx(e, r), T(r, {
        code: _.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), o.dirty()) : s.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), T(r, {
        code: _.not_finite,
        message: s.message
      }), o.dirty()) : K.assertNever(s);
    return { status: o.value, value: e.data };
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
  setLimit(e, n, r, o) {
    return new Ct({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: O.toString(o)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Ct({
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
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && K.isInteger(e.value));
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
Ct.create = (t) => new Ct({
  checks: [],
  typeName: L.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...Z(t)
});
class Kt extends Y {
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
    if (this._getType(e) !== A.bigint)
      return this._getInvalidInput(e);
    let r;
    const o = new ye();
    for (const s of this._def.checks)
      s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (r = this._getOrReturnCtx(e, r), T(r, {
        code: _.too_small,
        type: "bigint",
        minimum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), o.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (r = this._getOrReturnCtx(e, r), T(r, {
        code: _.too_big,
        type: "bigint",
        maximum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), o.dirty()) : s.kind === "multipleOf" ? e.data % s.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), T(r, {
        code: _.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), o.dirty()) : K.assertNever(s);
    return { status: o.value, value: e.data };
  }
  _getInvalidInput(e) {
    const n = this._getOrReturnCtx(e);
    return T(n, {
      code: _.invalid_type,
      expected: A.bigint,
      received: n.parsedType
    }), B;
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
  setLimit(e, n, r, o) {
    return new Kt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: O.toString(o)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Kt({
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
Kt.create = (t) => new Kt({
  checks: [],
  typeName: L.ZodBigInt,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...Z(t)
});
class ko extends Y {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== A.boolean) {
      const r = this._getOrReturnCtx(e);
      return T(r, {
        code: _.invalid_type,
        expected: A.boolean,
        received: r.parsedType
      }), B;
    }
    return Ne(e.data);
  }
}
ko.create = (t) => new ko({
  typeName: L.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...Z(t)
});
class bn extends Y {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== A.date) {
      const s = this._getOrReturnCtx(e);
      return T(s, {
        code: _.invalid_type,
        expected: A.date,
        received: s.parsedType
      }), B;
    }
    if (Number.isNaN(e.data.getTime())) {
      const s = this._getOrReturnCtx(e);
      return T(s, {
        code: _.invalid_date
      }), B;
    }
    const r = new ye();
    let o;
    for (const s of this._def.checks)
      s.kind === "min" ? e.data.getTime() < s.value && (o = this._getOrReturnCtx(e, o), T(o, {
        code: _.too_small,
        message: s.message,
        inclusive: !0,
        exact: !1,
        minimum: s.value,
        type: "date"
      }), r.dirty()) : s.kind === "max" ? e.data.getTime() > s.value && (o = this._getOrReturnCtx(e, o), T(o, {
        code: _.too_big,
        message: s.message,
        inclusive: !0,
        exact: !1,
        maximum: s.value,
        type: "date"
      }), r.dirty()) : K.assertNever(s);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new bn({
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
bn.create = (t) => new bn({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: L.ZodDate,
  ...Z(t)
});
class To extends Y {
  _parse(e) {
    if (this._getType(e) !== A.symbol) {
      const r = this._getOrReturnCtx(e);
      return T(r, {
        code: _.invalid_type,
        expected: A.symbol,
        received: r.parsedType
      }), B;
    }
    return Ne(e.data);
  }
}
To.create = (t) => new To({
  typeName: L.ZodSymbol,
  ...Z(t)
});
class Ro extends Y {
  _parse(e) {
    if (this._getType(e) !== A.undefined) {
      const r = this._getOrReturnCtx(e);
      return T(r, {
        code: _.invalid_type,
        expected: A.undefined,
        received: r.parsedType
      }), B;
    }
    return Ne(e.data);
  }
}
Ro.create = (t) => new Ro({
  typeName: L.ZodUndefined,
  ...Z(t)
});
class No extends Y {
  _parse(e) {
    if (this._getType(e) !== A.null) {
      const r = this._getOrReturnCtx(e);
      return T(r, {
        code: _.invalid_type,
        expected: A.null,
        received: r.parsedType
      }), B;
    }
    return Ne(e.data);
  }
}
No.create = (t) => new No({
  typeName: L.ZodNull,
  ...Z(t)
});
class Ao extends Y {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return Ne(e.data);
  }
}
Ao.create = (t) => new Ao({
  typeName: L.ZodAny,
  ...Z(t)
});
class dr extends Y {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return Ne(e.data);
  }
}
dr.create = (t) => new dr({
  typeName: L.ZodUnknown,
  ...Z(t)
});
class ot extends Y {
  _parse(e) {
    const n = this._getOrReturnCtx(e);
    return T(n, {
      code: _.invalid_type,
      expected: A.never,
      received: n.parsedType
    }), B;
  }
}
ot.create = (t) => new ot({
  typeName: L.ZodNever,
  ...Z(t)
});
class Po extends Y {
  _parse(e) {
    if (this._getType(e) !== A.undefined) {
      const r = this._getOrReturnCtx(e);
      return T(r, {
        code: _.invalid_type,
        expected: A.void,
        received: r.parsedType
      }), B;
    }
    return Ne(e.data);
  }
}
Po.create = (t) => new Po({
  typeName: L.ZodVoid,
  ...Z(t)
});
class Ve extends Y {
  _parse(e) {
    const { ctx: n, status: r } = this._processInputParams(e), o = this._def;
    if (n.parsedType !== A.array)
      return T(n, {
        code: _.invalid_type,
        expected: A.array,
        received: n.parsedType
      }), B;
    if (o.exactLength !== null) {
      const i = n.data.length > o.exactLength.value, a = n.data.length < o.exactLength.value;
      (i || a) && (T(n, {
        code: i ? _.too_big : _.too_small,
        minimum: a ? o.exactLength.value : void 0,
        maximum: i ? o.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: o.exactLength.message
      }), r.dirty());
    }
    if (o.minLength !== null && n.data.length < o.minLength.value && (T(n, {
      code: _.too_small,
      minimum: o.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: o.minLength.message
    }), r.dirty()), o.maxLength !== null && n.data.length > o.maxLength.value && (T(n, {
      code: _.too_big,
      maximum: o.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: o.maxLength.message
    }), r.dirty()), n.common.async)
      return Promise.all([...n.data].map((i, a) => o.type._parseAsync(new Ze(n, i, n.path, a)))).then((i) => ye.mergeArray(r, i));
    const s = [...n.data].map((i, a) => o.type._parseSync(new Ze(n, i, n.path, a)));
    return ye.mergeArray(r, s);
  }
  get element() {
    return this._def.type;
  }
  min(e, n) {
    return new Ve({
      ...this._def,
      minLength: { value: e, message: O.toString(n) }
    });
  }
  max(e, n) {
    return new Ve({
      ...this._def,
      maxLength: { value: e, message: O.toString(n) }
    });
  }
  length(e, n) {
    return new Ve({
      ...this._def,
      exactLength: { value: e, message: O.toString(n) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Ve.create = (t, e) => new Ve({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: L.ZodArray,
  ...Z(e)
});
function xt(t) {
  if (t instanceof ce) {
    const e = {};
    for (const n in t.shape) {
      const r = t.shape[n];
      e[n] = rt.create(xt(r));
    }
    return new ce({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof Ve ? new Ve({
    ...t._def,
    type: xt(t.element)
  }) : t instanceof rt ? rt.create(xt(t.unwrap())) : t instanceof Rt ? Rt.create(xt(t.unwrap())) : t instanceof gt ? gt.create(t.items.map((e) => xt(e))) : t;
}
class ce extends Y {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), n = K.objectKeys(e);
    return this._cached = { shape: e, keys: n }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== A.object) {
      const l = this._getOrReturnCtx(e);
      return T(l, {
        code: _.invalid_type,
        expected: A.object,
        received: l.parsedType
      }), B;
    }
    const { status: r, ctx: o } = this._processInputParams(e), { shape: s, keys: i } = this._getCached(), a = [];
    if (!(this._def.catchall instanceof ot && this._def.unknownKeys === "strip"))
      for (const l in o.data)
        i.includes(l) || a.push(l);
    const c = [];
    for (const l of i) {
      const d = s[l], u = o.data[l];
      c.push({
        key: { status: "valid", value: l },
        value: d._parse(new Ze(o, u, o.path, l)),
        alwaysSet: l in o.data
      });
    }
    if (this._def.catchall instanceof ot) {
      const l = this._def.unknownKeys;
      if (l === "passthrough")
        for (const d of a)
          c.push({
            key: { status: "valid", value: d },
            value: { status: "valid", value: o.data[d] }
          });
      else if (l === "strict")
        a.length > 0 && (T(o, {
          code: _.unrecognized_keys,
          keys: a
        }), r.dirty());
      else if (l !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const l = this._def.catchall;
      for (const d of a) {
        const u = o.data[d];
        c.push({
          key: { status: "valid", value: d },
          value: l._parse(
            new Ze(o, u, o.path, d)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: d in o.data
        });
      }
    }
    return o.common.async ? Promise.resolve().then(async () => {
      const l = [];
      for (const d of c) {
        const u = await d.key, f = await d.value;
        l.push({
          key: u,
          value: f,
          alwaysSet: d.alwaysSet
        });
      }
      return l;
    }).then((l) => ye.mergeObjectSync(r, l)) : ye.mergeObjectSync(r, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return O.errToObj, new ce({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (n, r) => {
          var s, i;
          const o = ((i = (s = this._def).errorMap) == null ? void 0 : i.call(s, n, r).message) ?? r.defaultError;
          return n.code === "unrecognized_keys" ? {
            message: O.errToObj(e).message ?? o
          } : {
            message: o
          };
        }
      } : {}
    });
  }
  strip() {
    return new ce({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ce({
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
    return new ce({
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
    return new ce({
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
    return new ce({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const n = {};
    for (const r of K.objectKeys(e))
      e[r] && this.shape[r] && (n[r] = this.shape[r]);
    return new ce({
      ...this._def,
      shape: () => n
    });
  }
  omit(e) {
    const n = {};
    for (const r of K.objectKeys(this.shape))
      e[r] || (n[r] = this.shape[r]);
    return new ce({
      ...this._def,
      shape: () => n
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return xt(this);
  }
  partial(e) {
    const n = {};
    for (const r of K.objectKeys(this.shape)) {
      const o = this.shape[r];
      e && !e[r] ? n[r] = o : n[r] = o.optional();
    }
    return new ce({
      ...this._def,
      shape: () => n
    });
  }
  required(e) {
    const n = {};
    for (const r of K.objectKeys(this.shape))
      if (e && !e[r])
        n[r] = this.shape[r];
      else {
        let s = this.shape[r];
        for (; s instanceof rt; )
          s = s._def.innerType;
        n[r] = s;
      }
    return new ce({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return ms(K.objectKeys(this.shape));
  }
}
ce.create = (t, e) => new ce({
  shape: () => t,
  unknownKeys: "strip",
  catchall: ot.create(),
  typeName: L.ZodObject,
  ...Z(e)
});
ce.strictCreate = (t, e) => new ce({
  shape: () => t,
  unknownKeys: "strict",
  catchall: ot.create(),
  typeName: L.ZodObject,
  ...Z(e)
});
ce.lazycreate = (t, e) => new ce({
  shape: t,
  unknownKeys: "strip",
  catchall: ot.create(),
  typeName: L.ZodObject,
  ...Z(e)
});
class wn extends Y {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = this._def.options;
    function o(s) {
      for (const a of s)
        if (a.result.status === "valid")
          return a.result;
      for (const a of s)
        if (a.result.status === "dirty")
          return n.common.issues.push(...a.ctx.common.issues), a.result;
      const i = s.map((a) => new Ke(a.ctx.common.issues));
      return T(n, {
        code: _.invalid_union,
        unionErrors: i
      }), B;
    }
    if (n.common.async)
      return Promise.all(r.map(async (s) => {
        const i = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await s._parseAsync({
            data: n.data,
            path: n.path,
            parent: i
          }),
          ctx: i
        };
      })).then(o);
    {
      let s;
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
        d.status === "dirty" && !s && (s = { result: d, ctx: l }), l.common.issues.length && i.push(l.common.issues);
      }
      if (s)
        return n.common.issues.push(...s.ctx.common.issues), s.result;
      const a = i.map((c) => new Ke(c));
      return T(n, {
        code: _.invalid_union,
        unionErrors: a
      }), B;
    }
  }
  get options() {
    return this._def.options;
  }
}
wn.create = (t, e) => new wn({
  options: t,
  typeName: L.ZodUnion,
  ...Z(e)
});
function ur(t, e) {
  const n = nt(t), r = nt(e);
  if (t === e)
    return { valid: !0, data: t };
  if (n === A.object && r === A.object) {
    const o = K.objectKeys(e), s = K.objectKeys(t).filter((a) => o.indexOf(a) !== -1), i = { ...t, ...e };
    for (const a of s) {
      const c = ur(t[a], e[a]);
      if (!c.valid)
        return { valid: !1 };
      i[a] = c.data;
    }
    return { valid: !0, data: i };
  } else if (n === A.array && r === A.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const o = [];
    for (let s = 0; s < t.length; s++) {
      const i = t[s], a = e[s], c = ur(i, a);
      if (!c.valid)
        return { valid: !1 };
      o.push(c.data);
    }
    return { valid: !0, data: o };
  } else return n === A.date && r === A.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class xn extends Y {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), o = (s, i) => {
      if (_o(s) || _o(i))
        return B;
      const a = ur(s.value, i.value);
      return a.valid ? ((So(s) || So(i)) && n.dirty(), { status: n.value, value: a.data }) : (T(r, {
        code: _.invalid_intersection_types
      }), B);
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
    ]).then(([s, i]) => o(s, i)) : o(this._def.left._parseSync({
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
xn.create = (t, e, n) => new xn({
  left: t,
  right: e,
  typeName: L.ZodIntersection,
  ...Z(n)
});
class gt extends Y {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== A.array)
      return T(r, {
        code: _.invalid_type,
        expected: A.array,
        received: r.parsedType
      }), B;
    if (r.data.length < this._def.items.length)
      return T(r, {
        code: _.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), B;
    !this._def.rest && r.data.length > this._def.items.length && (T(r, {
      code: _.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), n.dirty());
    const s = [...r.data].map((i, a) => {
      const c = this._def.items[a] || this._def.rest;
      return c ? c._parse(new Ze(r, i, r.path, a)) : null;
    }).filter((i) => !!i);
    return r.common.async ? Promise.all(s).then((i) => ye.mergeArray(n, i)) : ye.mergeArray(n, s);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new gt({
      ...this._def,
      rest: e
    });
  }
}
gt.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new gt({
    items: t,
    typeName: L.ZodTuple,
    rest: null,
    ...Z(e)
  });
};
class _n extends Y {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== A.object)
      return T(r, {
        code: _.invalid_type,
        expected: A.object,
        received: r.parsedType
      }), B;
    const o = [], s = this._def.keyType, i = this._def.valueType;
    for (const a in r.data)
      o.push({
        key: s._parse(new Ze(r, a, r.path, a)),
        value: i._parse(new Ze(r, r.data[a], r.path, a)),
        alwaysSet: a in r.data
      });
    return r.common.async ? ye.mergeObjectAsync(n, o) : ye.mergeObjectSync(n, o);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, n, r) {
    return n instanceof Y ? new _n({
      keyType: e,
      valueType: n,
      typeName: L.ZodRecord,
      ...Z(r)
    }) : new _n({
      keyType: Ge.create(),
      valueType: e,
      typeName: L.ZodRecord,
      ...Z(n)
    });
  }
}
class Oo extends Y {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== A.map)
      return T(r, {
        code: _.invalid_type,
        expected: A.map,
        received: r.parsedType
      }), B;
    const o = this._def.keyType, s = this._def.valueType, i = [...r.data.entries()].map(([a, c], l) => ({
      key: o._parse(new Ze(r, a, r.path, [l, "key"])),
      value: s._parse(new Ze(r, c, r.path, [l, "value"]))
    }));
    if (r.common.async) {
      const a = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of i) {
          const l = await c.key, d = await c.value;
          if (l.status === "aborted" || d.status === "aborted")
            return B;
          (l.status === "dirty" || d.status === "dirty") && n.dirty(), a.set(l.value, d.value);
        }
        return { status: n.value, value: a };
      });
    } else {
      const a = /* @__PURE__ */ new Map();
      for (const c of i) {
        const l = c.key, d = c.value;
        if (l.status === "aborted" || d.status === "aborted")
          return B;
        (l.status === "dirty" || d.status === "dirty") && n.dirty(), a.set(l.value, d.value);
      }
      return { status: n.value, value: a };
    }
  }
}
Oo.create = (t, e, n) => new Oo({
  valueType: e,
  keyType: t,
  typeName: L.ZodMap,
  ...Z(n)
});
class Jt extends Y {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== A.set)
      return T(r, {
        code: _.invalid_type,
        expected: A.set,
        received: r.parsedType
      }), B;
    const o = this._def;
    o.minSize !== null && r.data.size < o.minSize.value && (T(r, {
      code: _.too_small,
      minimum: o.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: o.minSize.message
    }), n.dirty()), o.maxSize !== null && r.data.size > o.maxSize.value && (T(r, {
      code: _.too_big,
      maximum: o.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: o.maxSize.message
    }), n.dirty());
    const s = this._def.valueType;
    function i(c) {
      const l = /* @__PURE__ */ new Set();
      for (const d of c) {
        if (d.status === "aborted")
          return B;
        d.status === "dirty" && n.dirty(), l.add(d.value);
      }
      return { status: n.value, value: l };
    }
    const a = [...r.data.values()].map((c, l) => s._parse(new Ze(r, c, r.path, l)));
    return r.common.async ? Promise.all(a).then((c) => i(c)) : i(a);
  }
  min(e, n) {
    return new Jt({
      ...this._def,
      minSize: { value: e, message: O.toString(n) }
    });
  }
  max(e, n) {
    return new Jt({
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
Jt.create = (t, e) => new Jt({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: L.ZodSet,
  ...Z(e)
});
class Eo extends Y {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
Eo.create = (t, e) => new Eo({
  getter: t,
  typeName: L.ZodLazy,
  ...Z(e)
});
class $o extends Y {
  _parse(e) {
    if (e.data !== this._def.value) {
      const n = this._getOrReturnCtx(e);
      return T(n, {
        received: n.data,
        code: _.invalid_literal,
        expected: this._def.value
      }), B;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
$o.create = (t, e) => new $o({
  value: t,
  typeName: L.ZodLiteral,
  ...Z(e)
});
function ms(t, e) {
  return new kt({
    values: t,
    typeName: L.ZodEnum,
    ...Z(e)
  });
}
class kt extends Y {
  _parse(e) {
    if (typeof e.data != "string") {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return T(n, {
        expected: K.joinValues(r),
        received: n.parsedType,
        code: _.invalid_type
      }), B;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return T(n, {
        received: n.data,
        code: _.invalid_enum_value,
        options: r
      }), B;
    }
    return Ne(e.data);
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
    return kt.create(e, {
      ...this._def,
      ...n
    });
  }
  exclude(e, n = this._def) {
    return kt.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...n
    });
  }
}
kt.create = ms;
class Io extends Y {
  _parse(e) {
    const n = K.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== A.string && r.parsedType !== A.number) {
      const o = K.objectValues(n);
      return T(r, {
        expected: K.joinValues(o),
        received: r.parsedType,
        code: _.invalid_type
      }), B;
    }
    if (this._cache || (this._cache = new Set(K.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const o = K.objectValues(n);
      return T(r, {
        received: r.data,
        code: _.invalid_enum_value,
        options: o
      }), B;
    }
    return Ne(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Io.create = (t, e) => new Io({
  values: t,
  typeName: L.ZodNativeEnum,
  ...Z(e)
});
class Sn extends Y {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== A.promise && n.common.async === !1)
      return T(n, {
        code: _.invalid_type,
        expected: A.promise,
        received: n.parsedType
      }), B;
    const r = n.parsedType === A.promise ? n.data : Promise.resolve(n.data);
    return Ne(r.then((o) => this._def.type.parseAsync(o, {
      path: n.path,
      errorMap: n.common.contextualErrorMap
    })));
  }
}
Sn.create = (t, e) => new Sn({
  type: t,
  typeName: L.ZodPromise,
  ...Z(e)
});
class Tt extends Y {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === L.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), o = this._def.effect || null, s = {
      addIssue: (i) => {
        T(r, i), i.fatal ? n.abort() : n.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (s.addIssue = s.addIssue.bind(s), o.type === "preprocess") {
      const i = o.transform(r.data, s);
      if (r.common.async)
        return Promise.resolve(i).then(async (a) => {
          if (n.value === "aborted")
            return B;
          const c = await this._def.schema._parseAsync({
            data: a,
            path: r.path,
            parent: r
          });
          return c.status === "aborted" ? B : c.status === "dirty" || n.value === "dirty" ? Ut(c.value) : c;
        });
      {
        if (n.value === "aborted")
          return B;
        const a = this._def.schema._parseSync({
          data: i,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? B : a.status === "dirty" || n.value === "dirty" ? Ut(a.value) : a;
      }
    }
    if (o.type === "refinement") {
      const i = (a) => {
        const c = o.refinement(a, s);
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
        return a.status === "aborted" ? B : (a.status === "dirty" && n.dirty(), i(a.value), { status: n.value, value: a.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((a) => a.status === "aborted" ? B : (a.status === "dirty" && n.dirty(), i(a.value).then(() => ({ status: n.value, value: a.value }))));
    }
    if (o.type === "transform")
      if (r.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!St(i))
          return B;
        const a = o.transform(i.value, s);
        if (a instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: n.value, value: a };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((i) => St(i) ? Promise.resolve(o.transform(i.value, s)).then((a) => ({
          status: n.value,
          value: a
        })) : B);
    K.assertNever(o);
  }
}
Tt.create = (t, e, n) => new Tt({
  schema: t,
  typeName: L.ZodEffects,
  effect: e,
  ...Z(n)
});
Tt.createWithPreprocess = (t, e, n) => new Tt({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: L.ZodEffects,
  ...Z(n)
});
class rt extends Y {
  _parse(e) {
    return this._getType(e) === A.undefined ? Ne(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
rt.create = (t, e) => new rt({
  innerType: t,
  typeName: L.ZodOptional,
  ...Z(e)
});
class Rt extends Y {
  _parse(e) {
    return this._getType(e) === A.null ? Ne(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Rt.create = (t, e) => new Rt({
  innerType: t,
  typeName: L.ZodNullable,
  ...Z(e)
});
class fr extends Y {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    let r = n.data;
    return n.parsedType === A.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
fr.create = (t, e) => new fr({
  innerType: t,
  typeName: L.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...Z(e)
});
class pr extends Y {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = {
      ...n,
      common: {
        ...n.common,
        issues: []
      }
    }, o = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return vn(o) ? o.then((s) => ({
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new Ke(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: o.status === "valid" ? o.value : this._def.catchValue({
        get error() {
          return new Ke(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
pr.create = (t, e) => new pr({
  innerType: t,
  typeName: L.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...Z(e)
});
class Do extends Y {
  _parse(e) {
    if (this._getType(e) !== A.nan) {
      const r = this._getOrReturnCtx(e);
      return T(r, {
        code: _.invalid_type,
        expected: A.nan,
        received: r.parsedType
      }), B;
    }
    return { status: "valid", value: e.data };
  }
}
Do.create = (t) => new Do({
  typeName: L.ZodNaN,
  ...Z(t)
});
class ya extends Y {
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
class Rr extends Y {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const s = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return s.status === "aborted" ? B : s.status === "dirty" ? (n.dirty(), Ut(s.value)) : this._def.out._parseAsync({
          data: s.value,
          path: r.path,
          parent: r
        });
      })();
    {
      const o = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      });
      return o.status === "aborted" ? B : o.status === "dirty" ? (n.dirty(), {
        status: "dirty",
        value: o.value
      }) : this._def.out._parseSync({
        data: o.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, n) {
    return new Rr({
      in: e,
      out: n,
      typeName: L.ZodPipeline
    });
  }
}
class mr extends Y {
  _parse(e) {
    const n = this._def.innerType._parse(e), r = (o) => (St(o) && (o.value = Object.freeze(o.value)), o);
    return vn(n) ? n.then((o) => r(o)) : r(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
mr.create = (t, e) => new mr({
  innerType: t,
  typeName: L.ZodReadonly,
  ...Z(e)
});
var L;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(L || (L = {}));
const z = Ge.create, hs = Ct.create, Nr = dr.create;
ot.create;
const va = Ve.create, ue = ce.create;
wn.create;
xn.create;
gt.create;
const On = _n.create, yt = kt.create;
Sn.create;
rt.create;
Rt.create;
ue({
  taskId: z(),
  title: z(),
  userId: z()
});
ue({
  taskId: z(),
  changes: On(Nr())
});
ue({
  taskId: z()
});
ue({
  reportId: z(),
  type: z(),
  title: z().optional()
});
ue({
  userId: z(),
  email: z(),
  timestamp: z()
});
ue({
  message: z(),
  variant: yt(["info", "success", "error", "warning"]).default("info"),
  title: z().optional()
});
ue({
  pluginId: z(),
  error: z(),
  stack: z().optional()
});
ue({
  pluginId: z(),
  version: z().optional()
});
const ba = ue({
  id: z().min(1),
  name: z().min(1),
  version: z().regex(/^\d+\.\d+\.\d+$/),
  description: z(),
  author: z(),
  entry: z(),
  hostCompatibility: z().default("^1.0.0"),
  permissions: va(yt(Zi)).default([]),
  dependencies: On(z()).optional(),
  icon: z().optional(),
  category: z().optional()
});
ue({
  path: z(),
  label: z().optional(),
  permission: z().optional()
});
ue({
  slot: yt(Hi),
  priority: hs().default(0)
});
ue({
  label: z(),
  path: z(),
  icon: z().optional(),
  section: z().optional(),
  order: hs().default(0)
});
ue({
  email: z().email(),
  password: z().min(6)
});
ue({
  version: z().optional()
});
ue({
  version: z()
});
On(Nr());
const wa = ue({
  title: z().min(1),
  description: z().optional(),
  status: yt(["todo", "in_progress", "done"]).default("todo"),
  priority: yt(["low", "medium", "high"]).default("medium")
});
wa.partial();
ue({
  type: yt(["tasks", "activity", "usage"]),
  format: yt(["json", "csv"]).default("json"),
  title: z().optional()
});
ue({
  pluginId: z(),
  event: z(),
  payload: On(Nr()).optional(),
  timestamp: z().optional()
});
function gs() {
  const t = typeof window < "u" ? window.__FPP_HOST_BRIDGE__ : null;
  if (!t)
    throw new Error("[PluginSDK] Host bridge not initialized");
  return t;
}
function ys(t) {
  return gs().getContext({ id: t });
}
function xa(t) {
  const e = ba.safeParse(t.manifest);
  if (!e.success)
    throw new Error(
      `[PluginSDK] Invalid manifest: ${e.error.message}`
    );
  t.manifest.id;
  try {
    gs().registerContributions(t);
  } finally {
  }
}
const _a = It(null);
function vs() {
  const t = Dt(_a);
  if (!t)
    throw new Error(
      "[PluginSDK] usePluginId must be used within PluginIdProvider (wrap plugin UI in PluginBoundary)"
    );
  return t;
}
function Sa() {
  const t = vs(), e = ys(t), n = e.permissions.getAll(), r = Gt(
    () => (o) => e.permissions.has(o),
    [e, n]
  );
  return { permissions: n, can: r };
}
function Ca() {
  const t = vs(), e = ys(t);
  return Q(
    (n, r) => {
      e.events.emit(n, r);
    },
    [e]
  );
}
const ka = "com.fpp.task-manager", Ta = "Task Manager", Ra = "1.0.0", Na = "Create, update, and manage tasks with a full dashboard.", Aa = "FPP Team", Pa = "/plugins/com.fpp.task-manager/index.js", Oa = "^1.0.0", Ea = ["tasks:read", "tasks:write", "tasks:delete", "events:task.*"], $a = "checklist", Ia = "Productivity", Da = {
  id: ka,
  name: Ta,
  version: Ra,
  description: Na,
  author: Aa,
  entry: Pa,
  hostCompatibility: Oa,
  permissions: Ea,
  icon: $a,
  category: Ia
};
function Ar(t) {
  return Object.keys(t);
}
function La(t) {
  return t.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
function Qn(t) {
  return t === "0rem" ? "0rem" : `calc(${t} * var(--mantine-scale))`;
}
function bs(t, { shouldScale: e = !1 } = {}) {
  function n(r) {
    if (r === 0 || r === "0")
      return `0${t}`;
    if (typeof r == "number") {
      const o = `${r / 16}${t}`;
      return e ? Qn(o) : o;
    }
    if (typeof r == "string") {
      if (r === "" || r.startsWith("calc(") || r.startsWith("clamp(") || r.includes("rgba("))
        return r;
      if (r.includes(","))
        return r.split(",").map((s) => n(s)).join(",");
      if (r.includes(" "))
        return r.split(" ").map((s) => n(s)).join(" ");
      if (r.includes(t))
        return e ? Qn(r) : r;
      const o = r.replace("px", "");
      if (!Number.isNaN(Number(o))) {
        const s = `${Number(o) / 16}${t}`;
        return e ? Qn(s) : s;
      }
    }
    return r;
  }
  return n;
}
const se = bs("rem", { shouldScale: !0 });
bs("em");
function Pr(t) {
  return Object.keys(t).reduce((e, n) => (t[n] !== void 0 && (e[n] = t[n]), e), {});
}
function ws(t) {
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
function nn(t) {
  return Array.isArray(t) || t === null ? !1 : typeof t == "object" ? t.type !== ls : !1;
}
function rn(t) {
  const e = It(null);
  return [({ children: o, value: s }) => /* @__PURE__ */ y(e.Provider, { value: s, children: o }), () => {
    const o = Dt(e);
    if (o === null)
      throw new Error(t);
    return o;
  }];
}
function xs(t = null) {
  const e = It(t);
  return [({ children: o, value: s }) => /* @__PURE__ */ y(e.Provider, { value: s, children: o }), () => Dt(e)];
}
const Ma = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function _s(t) {
  return Ma[t];
}
const za = () => {
};
function Ba(t, e = { active: !0 }) {
  return typeof t != "function" || !e.active ? e.onKeyDown || za : (n) => {
    var r;
    n.key === "Escape" && (t(n), (r = e.onTrigger) == null || r.call(e));
  };
}
function de(t, e = "size", n = !0) {
  if (t !== void 0)
    return ws(t) ? n ? se(t) : t : `var(--${e}-${t})`;
}
function En(t) {
  return de(t, "mantine-spacing");
}
function it(t) {
  return t === void 0 ? "var(--mantine-radius-default)" : de(t, "mantine-radius");
}
function be(t) {
  return de(t, "mantine-font-size");
}
function ja(t) {
  return de(t, "mantine-line-height", !1);
}
function Ss(t) {
  if (t)
    return de(t, "mantine-shadow", !1);
}
function Fa(t = "mantine-") {
  return `${t}${Math.random().toString(36).slice(2, 11)}`;
}
function pt(t) {
  const e = J(t);
  return te(() => {
    e.current = t;
  }), Gt(() => (...n) => {
    var r;
    return (r = e.current) == null ? void 0 : r.call(e, ...n);
  }, []);
}
function $n(t, e) {
  const n = typeof e == "number" ? e : e.delay, r = typeof e == "number" ? !1 : e.flushOnUnmount, o = pt(t), s = J(0), i = J(() => {
  }), a = Object.assign(
    Q(
      (...c) => {
        window.clearTimeout(s.current);
        const l = () => {
          s.current !== 0 && (s.current = 0, o(...c));
        };
        i.current = l, a.flush = l, s.current = window.setTimeout(l, n);
      },
      [o, n]
    ),
    { flush: i.current }
  );
  return te(
    () => () => {
      window.clearTimeout(s.current), r && a.flush();
    },
    [a, r]
  ), a;
}
const Lo = ["mousedown", "touchstart"];
function Va(t, e, n) {
  const r = J(null);
  return te(() => {
    const o = (s) => {
      const { target: i } = s ?? {};
      if (Array.isArray(n)) {
        const a = (i == null ? void 0 : i.hasAttribute("data-ignore-outside-clicks")) || !document.body.contains(i) && i.tagName !== "HTML";
        n.every((l) => !!l && !s.composedPath().includes(l)) && !a && t();
      } else r.current && !r.current.contains(i) && t();
    };
    return (e || Lo).forEach((s) => document.addEventListener(s, o)), () => {
      (e || Lo).forEach((s) => document.removeEventListener(s, o));
    };
  }, [r, t, n]), r;
}
function Wa(t, e) {
  try {
    return t.addEventListener("change", e), () => t.removeEventListener("change", e);
  } catch {
    return t.addListener(e), () => t.removeListener(e);
  }
}
function Za(t, e) {
  return typeof window < "u" && "matchMedia" in window ? window.matchMedia(t).matches : !1;
}
function Ha(t, e, { getInitialValueInEffect: n } = {
  getInitialValueInEffect: !0
}) {
  const [r, o] = G(
    n ? e : Za(t)
  ), s = J(null);
  return te(() => {
    if ("matchMedia" in window)
      return s.current = window.matchMedia(t), o(s.current.matches), Wa(s.current, (i) => o(i.matches));
  }, [t]), r;
}
const Or = typeof document < "u" ? Tr : te;
function Nt(t, e) {
  const n = J(!1);
  te(
    () => () => {
      n.current = !1;
    },
    []
  ), te(() => {
    if (n.current)
      return t();
    n.current = !0;
  }, e);
}
function Ua({ opened: t, shouldReturnFocus: e = !0 }) {
  const n = J(null), r = () => {
    var o;
    n.current && "focus" in n.current && typeof n.current.focus == "function" && ((o = n.current) == null || o.focus({ preventScroll: !0 }));
  };
  return Nt(() => {
    let o = -1;
    const s = (i) => {
      i.key === "Tab" && window.clearTimeout(o);
    };
    return document.addEventListener("keydown", s), t ? n.current = document.activeElement : e && (o = window.setTimeout(r, 10)), () => {
      window.clearTimeout(o), document.removeEventListener("keydown", s);
    };
  }, [t, e]), r;
}
const Ya = /input|select|textarea|button|object/, Cs = "a, input, select, textarea, button, object, [tabindex]";
function qa(t) {
  return process.env.NODE_ENV === "test" ? !1 : t.style.display === "none";
}
function Xa(t) {
  if (t.getAttribute("aria-hidden") || t.getAttribute("hidden") || t.getAttribute("type") === "hidden")
    return !1;
  let n = t;
  for (; n && !(n === document.body || n.nodeType === 11); ) {
    if (qa(n))
      return !1;
    n = n.parentNode;
  }
  return !0;
}
function ks(t) {
  let e = t.getAttribute("tabindex");
  return e === null && (e = void 0), parseInt(e, 10);
}
function hr(t) {
  const e = t.nodeName.toLowerCase(), n = !Number.isNaN(ks(t));
  return /* @ts-expect-error function accepts any html element but if it is a button, it should not be disabled to trigger the condition */ (Ya.test(e) && !t.disabled || t instanceof HTMLAnchorElement && t.href || n) && Xa(t);
}
function Ts(t) {
  const e = ks(t);
  return (Number.isNaN(e) || e >= 0) && hr(t);
}
function Ga(t) {
  return Array.from(t.querySelectorAll(Cs)).filter(Ts);
}
function Ka(t, e) {
  const n = Ga(t);
  if (!n.length) {
    e.preventDefault();
    return;
  }
  const r = n[e.shiftKey ? 0 : n.length - 1], o = t.getRootNode();
  let s = r === o.activeElement || t === o.activeElement;
  const i = o.activeElement;
  if (i.tagName === "INPUT" && i.getAttribute("type") === "radio" && (s = n.filter(
    (d) => d.getAttribute("type") === "radio" && d.getAttribute("name") === i.getAttribute("name")
  ).includes(r)), !s)
    return;
  e.preventDefault();
  const c = n[e.shiftKey ? n.length - 1 : 0];
  c && c.focus();
}
function Ja(t = !0) {
  const e = J(null), n = (o) => {
    let s = o.querySelector("[data-autofocus]");
    if (!s) {
      const i = Array.from(o.querySelectorAll(Cs));
      s = i.find(Ts) || i.find(hr) || null, !s && hr(o) && (s = o);
    }
    s ? s.focus({ preventScroll: !0 }) : process.env.NODE_ENV === "development" && console.warn(
      "[@mantine/hooks/use-focus-trap] Failed to find focusable element within provided node",
      o
    );
  }, r = Q(
    (o) => {
      t && o !== null && e.current !== o && (o ? (setTimeout(() => {
        o.getRootNode() ? n(o) : process.env.NODE_ENV === "development" && console.warn("[@mantine/hooks/use-focus-trap] Ref node is not part of the dom", o);
      }), e.current = o) : e.current = null);
    },
    [t]
  );
  return te(() => {
    if (!t)
      return;
    e.current && setTimeout(() => n(e.current));
    const o = (s) => {
      s.key === "Tab" && e.current && Ka(e.current, s);
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [t]), r;
}
const Qa = cr.useId || (() => {
});
function ec() {
  const t = Qa();
  return t ? `mantine-${t.replace(/:/g, "")}` : "";
}
function In(t) {
  const e = ec(), [n, r] = G(e);
  return Or(() => {
    r(Fa());
  }, []), typeof t == "string" ? t : typeof window > "u" ? e : n;
}
function gr(t, e) {
  if (typeof t == "function")
    return t(e);
  typeof t == "object" && t !== null && "current" in t && (t.current = e);
}
function tc(...t) {
  const e = /* @__PURE__ */ new Map();
  return (n) => {
    if (t.forEach((r) => {
      const o = gr(r, n);
      o && e.set(r, o);
    }), e.size > 0)
      return () => {
        t.forEach((r) => {
          const o = e.get(r);
          o ? o() : gr(r, null);
        }), e.clear();
      };
  };
}
function Ae(...t) {
  return Q(tc(...t), t);
}
function Cn({
  value: t,
  defaultValue: e,
  finalValue: n,
  onChange: r = () => {
  }
}) {
  const [o, s] = G(
    e !== void 0 ? e : n
  ), i = (a, ...c) => {
    s(a), r == null || r(a, ...c);
  };
  return t !== void 0 ? [t, r, !0] : [o, i, !1];
}
function nc(t, e) {
  return Ha("(prefers-reduced-motion: reduce)", t, e);
}
function rc(t) {
  const e = J(void 0);
  return te(() => {
    e.current = t;
  }, [t]), e.current;
}
function Rs(t) {
  var n;
  const e = cr.version;
  return typeof cr.version != "string" || e.startsWith("18.") ? t == null ? void 0 : t.ref : (n = t == null ? void 0 : t.props) == null ? void 0 : n.ref;
}
function Ns(t) {
  var e, n, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var o = t.length;
    for (e = 0; e < o; e++) t[e] && (n = Ns(t[e])) && (r && (r += " "), r += n);
  } else for (n in t) t[n] && (r && (r += " "), r += n);
  return r;
}
function Qe() {
  for (var t, e, n = 0, r = "", o = arguments.length; n < o; n++) (t = arguments[n]) && (e = Ns(t)) && (r && (r += " "), r += e);
  return r;
}
const oc = {};
function sc(t) {
  const e = {};
  return t.forEach((n) => {
    Object.entries(n).forEach(([r, o]) => {
      e[r] ? e[r] = Qe(e[r], o) : e[r] = o;
    });
  }), e;
}
function Dn({ theme: t, classNames: e, props: n, stylesCtx: r }) {
  const s = (Array.isArray(e) ? e : [e]).map(
    (i) => typeof i == "function" ? i(t, n, r) : i || oc
  );
  return sc(s);
}
function kn({ theme: t, styles: e, props: n, stylesCtx: r }) {
  return (Array.isArray(e) ? e : [e]).reduce((s, i) => typeof i == "function" ? { ...s, ...i(t, n, r) } : { ...s, ...i }, {});
}
const ic = It(null);
function bt() {
  const t = Dt(ic);
  if (!t)
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  return t;
}
function ac() {
  return bt().classNamesPrefix;
}
function cc() {
  return bt().getStyleNonce;
}
function lc() {
  return bt().withStaticClasses;
}
function dc() {
  return bt().headless;
}
function uc() {
  var t;
  return (t = bt().stylesTransform) == null ? void 0 : t.sx;
}
function fc() {
  var t;
  return (t = bt().stylesTransform) == null ? void 0 : t.styles;
}
function As() {
  return bt().env || "default";
}
function pc(t) {
  return /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i.test(t);
}
function mc(t) {
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
  const n = parseInt(e, 16), r = n >> 16 & 255, o = n >> 8 & 255, s = n & 255;
  return {
    r,
    g: o,
    b: s,
    a: 1
  };
}
function hc(t) {
  const [e, n, r, o] = t.replace(/[^0-9,./]/g, "").split(/[/,]/).map(Number);
  return { r: e, g: n, b: r, a: o === void 0 ? 1 : o };
}
function gc(t) {
  const e = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i, n = t.match(e);
  if (!n)
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  const r = parseInt(n[1], 10), o = parseInt(n[2], 10) / 100, s = parseInt(n[3], 10) / 100, i = n[5] ? parseFloat(n[5]) : void 0, a = (1 - Math.abs(2 * s - 1)) * o, c = r / 60, l = a * (1 - Math.abs(c % 2 - 1)), d = s - a / 2;
  let u, f, p;
  return c >= 0 && c < 1 ? (u = a, f = l, p = 0) : c >= 1 && c < 2 ? (u = l, f = a, p = 0) : c >= 2 && c < 3 ? (u = 0, f = a, p = l) : c >= 3 && c < 4 ? (u = 0, f = l, p = a) : c >= 4 && c < 5 ? (u = l, f = 0, p = a) : (u = a, f = 0, p = l), {
    r: Math.round((u + d) * 255),
    g: Math.round((f + d) * 255),
    b: Math.round((p + d) * 255),
    a: i || 1
  };
}
function Ps(t) {
  return pc(t) ? mc(t) : t.startsWith("rgb") ? hc(t) : t.startsWith("hsl") ? gc(t) : {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function yc(t, e) {
  return typeof t.primaryShade == "number" ? t.primaryShade : e === "dark" ? t.primaryShade.dark : t.primaryShade.light;
}
function er(t) {
  return t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4;
}
function vc(t) {
  const e = t.match(/oklch\((.*?)%\s/);
  return e ? parseFloat(e[1]) : null;
}
function bc(t) {
  if (t.startsWith("oklch("))
    return (vc(t) || 0) / 100;
  const { r: e, g: n, b: r } = Ps(t), o = e / 255, s = n / 255, i = r / 255, a = er(o), c = er(s), l = er(i);
  return 0.2126 * a + 0.7152 * c + 0.0722 * l;
}
function Zt(t, e = 0.179) {
  return t.startsWith("var(") ? !1 : bc(t) > e;
}
function Er({
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
      isLight: Zt(
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
      isLight: Zt(
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
      isLight: Zt(
        t === "white" ? e.white : e.black,
        e.luminanceThreshold
      ),
      variable: `--mantine-color-${t}`
    };
  const [r, o] = t.split("."), s = o ? Number(o) : void 0, i = r in e.colors;
  if (i) {
    const a = s !== void 0 ? e.colors[r][s] : e.colors[r][yc(e, n || "light")];
    return {
      color: r,
      value: a,
      shade: s,
      isThemeColor: i,
      isLight: Zt(a, e.luminanceThreshold),
      variable: o ? `--mantine-color-${r}-${s}` : `--mantine-color-${r}-filled`
    };
  }
  return {
    color: t,
    value: t,
    isThemeColor: i,
    isLight: Zt(t, e.luminanceThreshold),
    shade: s,
    variable: void 0
  };
}
function At(t, e) {
  const n = Er({ color: t || e.primaryColor, theme: e });
  return n.variable ? `var(${n.variable})` : t;
}
function wc(t, e) {
  const n = {
    from: (t == null ? void 0 : t.from) || e.defaultGradient.from,
    to: (t == null ? void 0 : t.to) || e.defaultGradient.to,
    deg: (t == null ? void 0 : t.deg) ?? e.defaultGradient.deg ?? 0
  }, r = At(n.from, e), o = At(n.to, e);
  return `linear-gradient(${n.deg}deg, ${r} 0%, ${o} 100%)`;
}
function xc(t, e) {
  if (typeof t != "string" || e > 1 || e < 0)
    return "rgba(0, 0, 0, 1)";
  if (t.startsWith("var(")) {
    const s = (1 - e) * 100;
    return `color-mix(in srgb, ${t}, transparent ${s}%)`;
  }
  if (t.startsWith("oklch"))
    return t.includes("/") ? t.replace(/\/\s*[\d.]+\s*\)/, `/ ${e})`) : t.replace(")", ` / ${e})`);
  const { r: n, g: r, b: o } = Ps(t);
  return `rgba(${n}, ${r}, ${o}, ${e})`;
}
const _c = It(null);
function Lt() {
  const t = Dt(_c);
  if (!t)
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  return t;
}
function $r({
  classNames: t,
  styles: e,
  props: n,
  stylesCtx: r
}) {
  const o = Lt();
  return {
    resolvedClassNames: Dn({
      theme: o,
      classNames: t,
      props: n,
      stylesCtx: r || void 0
    }),
    resolvedStyles: kn({
      theme: o,
      styles: e,
      props: n,
      stylesCtx: r || void 0
    })
  };
}
const Sc = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function Cc({ theme: t, options: e, unstyled: n }) {
  return Qe(
    (e == null ? void 0 : e.focusable) && !n && (t.focusClassName || Sc[t.focusRing]),
    (e == null ? void 0 : e.active) && !n && t.activeClassName
  );
}
function kc({
  selector: t,
  stylesCtx: e,
  options: n,
  props: r,
  theme: o
}) {
  return Dn({
    theme: o,
    classNames: n == null ? void 0 : n.classNames,
    props: (n == null ? void 0 : n.props) || r,
    stylesCtx: e
  })[t];
}
function Mo({
  selector: t,
  stylesCtx: e,
  theme: n,
  classNames: r,
  props: o
}) {
  return Dn({ theme: n, classNames: r, props: o, stylesCtx: e })[t];
}
function Tc({ rootSelector: t, selector: e, className: n }) {
  return t === e ? n : void 0;
}
function Rc({ selector: t, classes: e, unstyled: n }) {
  return n ? void 0 : e[t];
}
function Nc({
  themeName: t,
  classNamesPrefix: e,
  selector: n,
  withStaticClass: r
}) {
  return r === !1 ? [] : t.map((o) => `${e}-${o}-${n}`);
}
function Ac({
  themeName: t,
  theme: e,
  selector: n,
  props: r,
  stylesCtx: o
}) {
  return t.map(
    (s) => {
      var i, a;
      return (a = Dn({
        theme: e,
        classNames: (i = e.components[s]) == null ? void 0 : i.classNames,
        props: r,
        stylesCtx: o
      })) == null ? void 0 : a[n];
    }
  );
}
function Pc({
  options: t,
  classes: e,
  selector: n,
  unstyled: r
}) {
  return t != null && t.variant && !r ? e[`${n}--${t.variant}`] : void 0;
}
function Oc({
  theme: t,
  options: e,
  themeName: n,
  selector: r,
  classNamesPrefix: o,
  classNames: s,
  classes: i,
  unstyled: a,
  className: c,
  rootSelector: l,
  props: d,
  stylesCtx: u,
  withStaticClasses: f,
  headless: p,
  transformedStyles: h
}) {
  return Qe(
    Cc({ theme: t, options: e, unstyled: a || p }),
    Ac({ theme: t, themeName: n, selector: r, props: d, stylesCtx: u }),
    Pc({ options: e, classes: i, selector: r, unstyled: a }),
    Mo({ selector: r, stylesCtx: u, theme: t, classNames: s, props: d }),
    Mo({ selector: r, stylesCtx: u, theme: t, classNames: h, props: d }),
    kc({ selector: r, stylesCtx: u, options: e, props: d, theme: t }),
    Tc({ rootSelector: l, selector: r, className: c }),
    Rc({ selector: r, classes: i, unstyled: a || p }),
    f && !p && Nc({
      themeName: n,
      classNamesPrefix: o,
      selector: r,
      withStaticClass: e == null ? void 0 : e.withStaticClass
    }),
    e == null ? void 0 : e.className
  );
}
function Ec({
  theme: t,
  themeName: e,
  props: n,
  stylesCtx: r,
  selector: o
}) {
  return e.map(
    (s) => {
      var i;
      return kn({
        theme: t,
        styles: (i = t.components[s]) == null ? void 0 : i.styles,
        props: n,
        stylesCtx: r
      })[o];
    }
  ).reduce((s, i) => ({ ...s, ...i }), {});
}
function yr({ style: t, theme: e }) {
  return Array.isArray(t) ? [...t].reduce(
    (n, r) => ({ ...n, ...yr({ style: r, theme: e }) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function $c(t) {
  return t.reduce((e, n) => (n && Object.keys(n).forEach((r) => {
    e[r] = { ...e[r], ...Pr(n[r]) };
  }), e), {});
}
function Ic({
  vars: t,
  varsResolver: e,
  theme: n,
  props: r,
  stylesCtx: o,
  selector: s,
  themeName: i,
  headless: a
}) {
  var c;
  return (c = $c([
    a ? {} : e == null ? void 0 : e(n, r, o),
    ...i.map((l) => {
      var d, u, f;
      return (f = (u = (d = n.components) == null ? void 0 : d[l]) == null ? void 0 : u.vars) == null ? void 0 : f.call(u, n, r, o);
    }),
    t == null ? void 0 : t(n, r, o)
  ])) == null ? void 0 : c[s];
}
function Dc({
  theme: t,
  themeName: e,
  selector: n,
  options: r,
  props: o,
  stylesCtx: s,
  rootSelector: i,
  styles: a,
  style: c,
  vars: l,
  varsResolver: d,
  headless: u,
  withStylesTransform: f
}) {
  return {
    ...!f && Ec({ theme: t, themeName: e, props: o, stylesCtx: s, selector: n }),
    ...!f && kn({ theme: t, styles: a, props: o, stylesCtx: s })[n],
    ...!f && kn({ theme: t, styles: r == null ? void 0 : r.styles, props: (r == null ? void 0 : r.props) || o, stylesCtx: s })[n],
    ...Ic({ theme: t, props: o, stylesCtx: s, vars: l, varsResolver: d, selector: n, themeName: e, headless: u }),
    ...i === n ? yr({ style: c, theme: t }) : null,
    ...yr({ style: r == null ? void 0 : r.style, theme: t })
  };
}
function Lc({ props: t, stylesCtx: e, themeName: n }) {
  var i;
  const r = Lt(), o = (i = fc()) == null ? void 0 : i();
  return {
    getTransformedStyles: (a) => o ? [
      ...a.map(
        (l) => o(l, { props: t, theme: r, ctx: e })
      ),
      ...n.map(
        (l) => {
          var d;
          return o((d = r.components[l]) == null ? void 0 : d.styles, { props: t, theme: r, ctx: e });
        }
      )
    ].filter(Boolean) : [],
    withStylesTransform: !!o
  };
}
function oe({
  name: t,
  classes: e,
  props: n,
  stylesCtx: r,
  className: o,
  style: s,
  rootSelector: i = "root",
  unstyled: a,
  classNames: c,
  styles: l,
  vars: d,
  varsResolver: u
}) {
  const f = Lt(), p = ac(), h = lc(), m = dc(), g = (Array.isArray(t) ? t : [t]).filter((v) => v), { withStylesTransform: w, getTransformedStyles: x } = Lc({
    props: n,
    stylesCtx: r,
    themeName: g
  });
  return (v, b) => ({
    className: Oc({
      theme: f,
      options: b,
      themeName: g,
      selector: v,
      classNamesPrefix: p,
      classNames: c,
      classes: e,
      unstyled: a,
      className: o,
      rootSelector: i,
      props: n,
      stylesCtx: r,
      withStaticClasses: h,
      headless: m,
      transformedStyles: x([b == null ? void 0 : b.styles, l])
    }),
    style: Dc({
      theme: f,
      themeName: g,
      selector: v,
      options: b,
      props: n,
      stylesCtx: r,
      rootSelector: i,
      styles: l,
      style: s,
      vars: d,
      varsResolver: u,
      headless: m,
      withStylesTransform: w
    })
  });
}
function $(t, e, n) {
  var i;
  const r = Lt(), o = (i = r.components[t]) == null ? void 0 : i.defaultProps, s = typeof o == "function" ? o(r) : o;
  return { ...e, ...s, ...Pr(n) };
}
function tr(t) {
  return Ar(t).reduce(
    (e, n) => t[n] !== void 0 ? `${e}${La(n)}:${t[n]};` : e,
    ""
  ).trim();
}
function Mc({ selector: t, styles: e, media: n, container: r }) {
  const o = e ? tr(e) : "", s = Array.isArray(n) ? n.map((a) => `@media${a.query}{${t}{${tr(a.styles)}}}`) : [], i = Array.isArray(r) ? r.map(
    (a) => `@container ${a.query}{${t}{${tr(a.styles)}}}`
  ) : [];
  return `${o ? `${t}{${o}}` : ""}${s.join("")}${i.join("")}`.trim();
}
function zc(t) {
  const e = cc();
  return /* @__PURE__ */ y(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: e == null ? void 0 : e(),
      dangerouslySetInnerHTML: { __html: Mc(t) }
    }
  );
}
function Ir(t) {
  const {
    m: e,
    mx: n,
    my: r,
    mt: o,
    mb: s,
    ml: i,
    mr: a,
    me: c,
    ms: l,
    p: d,
    px: u,
    py: f,
    pt: p,
    pb: h,
    pl: m,
    pr: g,
    pe: w,
    ps: x,
    bd: v,
    bg: b,
    c: S,
    opacity: C,
    ff: R,
    fz: k,
    fw: I,
    lts: E,
    ta: U,
    lh: D,
    fs: V,
    tt: F,
    td: q,
    w: N,
    miw: M,
    maw: P,
    h: j,
    mih: ne,
    mah: ke,
    bgsz: je,
    bgp: ae,
    bgr: Ue,
    bga: Te,
    pos: Ye,
    top: Re,
    left: ct,
    bottom: _e,
    right: lt,
    inset: wt,
    display: Ft,
    flex: Vt,
    hiddenFrom: an,
    visibleFrom: cn,
    lightHidden: Wt,
    darkHidden: tt,
    sx: dt,
    ...$e
  } = t;
  return { styleProps: Pr({
    m: e,
    mx: n,
    my: r,
    mt: o,
    mb: s,
    ml: i,
    mr: a,
    me: c,
    ms: l,
    p: d,
    px: u,
    py: f,
    pt: p,
    pb: h,
    pl: m,
    pr: g,
    pe: w,
    ps: x,
    bd: v,
    bg: b,
    c: S,
    opacity: C,
    ff: R,
    fz: k,
    fw: I,
    lts: E,
    ta: U,
    lh: D,
    fs: V,
    tt: F,
    td: q,
    w: N,
    miw: M,
    maw: P,
    h: j,
    mih: ne,
    mah: ke,
    bgsz: je,
    bgp: ae,
    bgr: Ue,
    bga: Te,
    pos: Ye,
    top: Re,
    left: ct,
    bottom: _e,
    right: lt,
    inset: wt,
    display: Ft,
    flex: Vt,
    hiddenFrom: an,
    visibleFrom: cn,
    lightHidden: Wt,
    darkHidden: tt,
    sx: dt
  }), rest: $e };
}
const Bc = {
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
function Dr(t, e) {
  const n = Er({ color: t, theme: e });
  return n.color === "dimmed" ? "var(--mantine-color-dimmed)" : n.color === "bright" ? "var(--mantine-color-bright)" : n.variable ? `var(${n.variable})` : n.color;
}
function jc(t, e) {
  const n = Er({ color: t, theme: e });
  return n.isThemeColor && n.shade === void 0 ? `var(--mantine-color-${n.color}-text)` : Dr(t, e);
}
function Fc(t, e) {
  if (typeof t == "number")
    return se(t);
  if (typeof t == "string") {
    const [n, r, ...o] = t.split(" ").filter((i) => i.trim() !== "");
    let s = `${se(n)}`;
    return r && (s += ` ${r}`), o.length > 0 && (s += ` ${Dr(o.join(" "), e)}`), s.trim();
  }
  return t;
}
const zo = {
  text: "var(--mantine-font-family)",
  mono: "var(--mantine-font-family-monospace)",
  monospace: "var(--mantine-font-family-monospace)",
  heading: "var(--mantine-font-family-headings)",
  headings: "var(--mantine-font-family-headings)"
};
function Vc(t) {
  return typeof t == "string" && t in zo ? zo[t] : t;
}
const Wc = ["h1", "h2", "h3", "h4", "h5", "h6"];
function Zc(t, e) {
  return typeof t == "string" && t in e.fontSizes ? `var(--mantine-font-size-${t})` : typeof t == "string" && Wc.includes(t) ? `var(--mantine-${t}-font-size)` : typeof t == "number" || typeof t == "string" ? se(t) : t;
}
function Hc(t) {
  return t;
}
const Uc = ["h1", "h2", "h3", "h4", "h5", "h6"];
function Yc(t, e) {
  return typeof t == "string" && t in e.lineHeights ? `var(--mantine-line-height-${t})` : typeof t == "string" && Uc.includes(t) ? `var(--mantine-${t}-line-height)` : t;
}
function qc(t) {
  return typeof t == "number" ? se(t) : t;
}
function Xc(t, e) {
  if (typeof t == "number")
    return se(t);
  if (typeof t == "string") {
    const n = t.replace("-", "");
    if (!(n in e.spacing))
      return se(t);
    const r = `--mantine-spacing-${n}`;
    return t.startsWith("-") ? `calc(var(${r}) * -1)` : `var(${r})`;
  }
  return t;
}
const nr = {
  color: Dr,
  textColor: jc,
  fontSize: Zc,
  spacing: Xc,
  identity: Hc,
  size: qc,
  lineHeight: Yc,
  fontFamily: Vc,
  border: Fc
};
function Bo(t) {
  return t.replace("(min-width: ", "").replace("em)", "");
}
function Gc({
  media: t,
  ...e
}) {
  const r = Object.keys(t).sort((o, s) => Number(Bo(o)) - Number(Bo(s))).map((o) => ({ query: o, styles: t[o] }));
  return { ...e, media: r };
}
function Kc(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.keys(t);
  return !(e.length === 1 && e[0] === "base");
}
function Jc(t) {
  return typeof t == "object" && t !== null ? "base" in t ? t.base : void 0 : t;
}
function Qc(t) {
  return typeof t == "object" && t !== null ? Ar(t).filter((e) => e !== "base") : [];
}
function el(t, e) {
  return typeof t == "object" && t !== null && e in t ? t[e] : t;
}
function tl({
  styleProps: t,
  data: e,
  theme: n
}) {
  return Gc(
    Ar(t).reduce(
      (r, o) => {
        if (o === "hiddenFrom" || o === "visibleFrom" || o === "sx")
          return r;
        const s = e[o], i = Array.isArray(s.property) ? s.property : [s.property], a = Jc(t[o]);
        if (!Kc(t[o]))
          return i.forEach((l) => {
            r.inlineStyles[l] = nr[s.type](a, n);
          }), r;
        r.hasResponsiveStyles = !0;
        const c = Qc(t[o]);
        return i.forEach((l) => {
          a && (r.styles[l] = nr[s.type](a, n)), c.forEach((d) => {
            const u = `(min-width: ${n.breakpoints[d]})`;
            r.media[u] = {
              ...r.media[u],
              [l]: nr[s.type](
                el(t[o], d),
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
function nl() {
  return `__m__-${ds().replace(/:/g, "")}`;
}
function Os(t) {
  return t.startsWith("data-") ? t : `data-${t}`;
}
function rl(t) {
  return Object.keys(t).reduce((e, n) => {
    const r = t[n];
    return r === void 0 || r === "" || r === !1 || r === null || (e[Os(n)] = t[n]), e;
  }, {});
}
function Es(t) {
  return t ? typeof t == "string" ? { [Os(t)]: !0 } : Array.isArray(t) ? [...t].reduce(
    (e, n) => ({ ...e, ...Es(n) }),
    {}
  ) : rl(t) : null;
}
function vr(t, e) {
  return Array.isArray(t) ? [...t].reduce(
    (n, r) => ({ ...n, ...vr(r, e) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function ol({
  theme: t,
  style: e,
  vars: n,
  styleProps: r
}) {
  const o = vr(e, t), s = vr(n, t);
  return { ...o, ...s, ...r };
}
const $s = re(
  ({
    component: t,
    style: e,
    __vars: n,
    className: r,
    variant: o,
    mod: s,
    size: i,
    hiddenFrom: a,
    visibleFrom: c,
    lightHidden: l,
    darkHidden: d,
    renderRoot: u,
    __size: f,
    ...p
  }, h) => {
    var k;
    const m = Lt(), g = t || "div", { styleProps: w, rest: x } = Ir(p), v = uc(), b = (k = v == null ? void 0 : v()) == null ? void 0 : k(w.sx), S = nl(), C = tl({
      styleProps: w,
      theme: m,
      data: Bc
    }), R = {
      ref: h,
      style: ol({
        theme: m,
        style: e,
        vars: n,
        styleProps: C.inlineStyles
      }),
      className: Qe(r, b, {
        [S]: C.hasResponsiveStyles,
        "mantine-light-hidden": l,
        "mantine-dark-hidden": d,
        [`mantine-hidden-from-${a}`]: a,
        [`mantine-visible-from-${c}`]: c
      }),
      "data-variant": o,
      "data-size": ws(i) ? void 0 : i || void 0,
      size: f,
      ...Es(s),
      ...x
    };
    return /* @__PURE__ */ ie(ht, { children: [
      C.hasResponsiveStyles && /* @__PURE__ */ y(
        zc,
        {
          selector: `.${S}`,
          styles: C.styles,
          media: C.media
        }
      ),
      typeof u == "function" ? u(R) : /* @__PURE__ */ y(g, { ...R })
    ] });
  }
);
$s.displayName = "@mantine/core/Box";
const H = $s;
function Is(t) {
  return t;
}
function X(t) {
  const e = re(t);
  return e.extend = Is, e.withProps = (n) => {
    const r = re((o, s) => /* @__PURE__ */ y(e, { ...n, ...o, ref: s }));
    return r.extend = e.extend, r.displayName = `WithProps(${e.displayName})`, r;
  }, e;
}
function Be(t) {
  const e = re(t);
  return e.withProps = (n) => {
    const r = re((o, s) => /* @__PURE__ */ y(e, { ...n, ...o, ref: s }));
    return r.extend = e.extend, r.displayName = `WithProps(${e.displayName})`, r;
  }, e.extend = Is, e;
}
const sl = It({
  dir: "ltr",
  toggleDirection: () => {
  },
  setDirection: () => {
  }
});
function Lr() {
  return Dt(sl);
}
function Ln() {
  return typeof window < "u";
}
function Mt(t) {
  return Ds(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Ce(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function He(t) {
  var e;
  return (e = (Ds(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Ds(t) {
  return Ln() ? t instanceof Node || t instanceof Ce(t).Node : !1;
}
function he(t) {
  return Ln() ? t instanceof Element || t instanceof Ce(t).Element : !1;
}
function et(t) {
  return Ln() ? t instanceof HTMLElement || t instanceof Ce(t).HTMLElement : !1;
}
function jo(t) {
  return !Ln() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Ce(t).ShadowRoot;
}
function on(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r,
    display: o
  } = Le(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + n) && o !== "inline" && o !== "contents";
}
function il(t) {
  return /^(table|td|th)$/.test(Mt(t));
}
function Mn(t) {
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
const al = /transform|translate|scale|rotate|perspective|filter/, cl = /paint|layout|strict|content/, ft = (t) => !!t && t !== "none";
let rr;
function Mr(t) {
  const e = he(t) ? Le(t) : t;
  return ft(e.transform) || ft(e.translate) || ft(e.scale) || ft(e.rotate) || ft(e.perspective) || !zr() && (ft(e.backdropFilter) || ft(e.filter)) || al.test(e.willChange || "") || cl.test(e.contain || "");
}
function ll(t) {
  let e = st(t);
  for (; et(e) && !Pt(e); ) {
    if (Mr(e))
      return e;
    if (Mn(e))
      return null;
    e = st(e);
  }
  return null;
}
function zr() {
  return rr == null && (rr = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), rr;
}
function Pt(t) {
  return /^(html|body|#document)$/.test(Mt(t));
}
function Le(t) {
  return Ce(t).getComputedStyle(t);
}
function zn(t) {
  return he(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function st(t) {
  if (Mt(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    jo(t) && t.host || // Fallback.
    He(t)
  );
  return jo(e) ? e.host : e;
}
function Ls(t) {
  const e = st(t);
  return Pt(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : et(e) && on(e) ? e : Ls(e);
}
function Qt(t, e, n) {
  var r;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const o = Ls(t), s = o === ((r = t.ownerDocument) == null ? void 0 : r.body), i = Ce(o);
  if (s) {
    const a = br(i);
    return e.concat(i, i.visualViewport || [], on(o) ? o : [], a && n ? Qt(a) : []);
  } else
    return e.concat(o, Qt(o, [], n));
}
function br(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
const Me = Math.min, me = Math.max, Tn = Math.round, pn = Math.floor, We = (t) => ({
  x: t,
  y: t
}), dl = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function wr(t, e, n) {
  return me(t, Me(e, n));
}
function Je(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function ze(t) {
  return t.split("-")[0];
}
function zt(t) {
  return t.split("-")[1];
}
function Br(t) {
  return t === "x" ? "y" : "x";
}
function jr(t) {
  return t === "y" ? "height" : "width";
}
function Ie(t) {
  const e = t[0];
  return e === "t" || e === "b" ? "y" : "x";
}
function Fr(t) {
  return Br(Ie(t));
}
function ul(t, e, n) {
  n === void 0 && (n = !1);
  const r = zt(t), o = Fr(t), s = jr(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[s] > e.floating[s] && (i = Rn(i)), [i, Rn(i)];
}
function fl(t) {
  const e = Rn(t);
  return [xr(t), e, xr(e)];
}
function xr(t) {
  return t.includes("start") ? t.replace("start", "end") : t.replace("end", "start");
}
const Fo = ["left", "right"], Vo = ["right", "left"], pl = ["top", "bottom"], ml = ["bottom", "top"];
function hl(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? Vo : Fo : e ? Fo : Vo;
    case "left":
    case "right":
      return e ? pl : ml;
    default:
      return [];
  }
}
function gl(t, e, n, r) {
  const o = zt(t);
  let s = hl(ze(t), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), e && (s = s.concat(s.map(xr)))), s;
}
function Rn(t) {
  const e = ze(t);
  return dl[e] + t.slice(e.length);
}
function yl(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Vr(t) {
  return typeof t != "number" ? yl(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Ot(t) {
  const {
    x: e,
    y: n,
    width: r,
    height: o
  } = t;
  return {
    width: r,
    height: o,
    top: n,
    left: e,
    right: e + r,
    bottom: n + o,
    x: e,
    y: n
  };
}
function Wo(t, e, n) {
  let {
    reference: r,
    floating: o
  } = t;
  const s = Ie(e), i = Fr(e), a = jr(i), c = ze(e), l = s === "y", d = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, f = r[a] / 2 - o[a] / 2;
  let p;
  switch (c) {
    case "top":
      p = {
        x: d,
        y: r.y - o.height
      };
      break;
    case "bottom":
      p = {
        x: d,
        y: r.y + r.height
      };
      break;
    case "right":
      p = {
        x: r.x + r.width,
        y: u
      };
      break;
    case "left":
      p = {
        x: r.x - o.width,
        y: u
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  switch (zt(e)) {
    case "start":
      p[i] -= f * (n && l ? -1 : 1);
      break;
    case "end":
      p[i] += f * (n && l ? -1 : 1);
      break;
  }
  return p;
}
async function vl(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: r,
    y: o,
    platform: s,
    rects: i,
    elements: a,
    strategy: c
  } = t, {
    boundary: l = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: u = "floating",
    altBoundary: f = !1,
    padding: p = 0
  } = Je(e, t), h = Vr(p), g = a[f ? u === "floating" ? "reference" : "floating" : u], w = Ot(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(g))) == null || n ? g : g.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: d,
    strategy: c
  })), x = u === "floating" ? {
    x: r,
    y: o,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, v = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), b = await (s.isElement == null ? void 0 : s.isElement(v)) ? await (s.getScale == null ? void 0 : s.getScale(v)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, S = Ot(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: x,
    offsetParent: v,
    strategy: c
  }) : x);
  return {
    top: (w.top - S.top + h.top) / b.y,
    bottom: (S.bottom - w.bottom + h.bottom) / b.y,
    left: (w.left - S.left + h.left) / b.x,
    right: (S.right - w.right + h.right) / b.x
  };
}
const bl = 50, wl = async (t, e, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: i
  } = n, a = i.detectOverflow ? i : {
    ...i,
    detectOverflow: vl
  }, c = await (i.isRTL == null ? void 0 : i.isRTL(e));
  let l = await i.getElementRects({
    reference: t,
    floating: e,
    strategy: o
  }), {
    x: d,
    y: u
  } = Wo(l, r, c), f = r, p = 0;
  const h = {};
  for (let m = 0; m < s.length; m++) {
    const g = s[m];
    if (!g)
      continue;
    const {
      name: w,
      fn: x
    } = g, {
      x: v,
      y: b,
      data: S,
      reset: C
    } = await x({
      x: d,
      y: u,
      initialPlacement: r,
      placement: f,
      strategy: o,
      middlewareData: h,
      rects: l,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    d = v ?? d, u = b ?? u, h[w] = {
      ...h[w],
      ...S
    }, C && p < bl && (p++, typeof C == "object" && (C.placement && (f = C.placement), C.rects && (l = C.rects === !0 ? await i.getElementRects({
      reference: t,
      floating: e,
      strategy: o
    }) : C.rects), {
      x: d,
      y: u
    } = Wo(l, f, c)), m = -1);
  }
  return {
    x: d,
    y: u,
    placement: f,
    strategy: o,
    middlewareData: h
  };
}, xl = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: s,
      platform: i,
      elements: a,
      middlewareData: c
    } = e, {
      element: l,
      padding: d = 0
    } = Je(t, e) || {};
    if (l == null)
      return {};
    const u = Vr(d), f = {
      x: n,
      y: r
    }, p = Fr(o), h = jr(p), m = await i.getDimensions(l), g = p === "y", w = g ? "top" : "left", x = g ? "bottom" : "right", v = g ? "clientHeight" : "clientWidth", b = s.reference[h] + s.reference[p] - f[p] - s.floating[h], S = f[p] - s.reference[p], C = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l));
    let R = C ? C[v] : 0;
    (!R || !await (i.isElement == null ? void 0 : i.isElement(C))) && (R = a.floating[v] || s.floating[h]);
    const k = b / 2 - S / 2, I = R / 2 - m[h] / 2 - 1, E = Me(u[w], I), U = Me(u[x], I), D = E, V = R - m[h] - U, F = R / 2 - m[h] / 2 + k, q = wr(D, F, V), N = !c.arrow && zt(o) != null && F !== q && s.reference[h] / 2 - (F < D ? E : U) - m[h] / 2 < 0, M = N ? F < D ? F - D : F - V : 0;
    return {
      [p]: f[p] + M,
      data: {
        [p]: q,
        centerOffset: F - q - M,
        ...N && {
          alignmentOffset: M
        }
      },
      reset: N
    };
  }
}), _l = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, r;
      const {
        placement: o,
        middlewareData: s,
        rects: i,
        initialPlacement: a,
        platform: c,
        elements: l
      } = e, {
        mainAxis: d = !0,
        crossAxis: u = !0,
        fallbackPlacements: f,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: h = "none",
        flipAlignment: m = !0,
        ...g
      } = Je(t, e);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const w = ze(o), x = Ie(a), v = ze(a) === a, b = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), S = f || (v || !m ? [Rn(a)] : fl(a)), C = h !== "none";
      !f && C && S.push(...gl(a, m, h, b));
      const R = [a, ...S], k = await c.detectOverflow(e, g), I = [];
      let E = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (d && I.push(k[w]), u) {
        const F = ul(o, i, b);
        I.push(k[F[0]], k[F[1]]);
      }
      if (E = [...E, {
        placement: o,
        overflows: I
      }], !I.every((F) => F <= 0)) {
        var U, D;
        const F = (((U = s.flip) == null ? void 0 : U.index) || 0) + 1, q = R[F];
        if (q && (!(u === "alignment" ? x !== Ie(q) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        E.every((P) => Ie(P.placement) === x ? P.overflows[0] > 0 : !0)))
          return {
            data: {
              index: F,
              overflows: E
            },
            reset: {
              placement: q
            }
          };
        let N = (D = E.filter((M) => M.overflows[0] <= 0).sort((M, P) => M.overflows[1] - P.overflows[1])[0]) == null ? void 0 : D.placement;
        if (!N)
          switch (p) {
            case "bestFit": {
              var V;
              const M = (V = E.filter((P) => {
                if (C) {
                  const j = Ie(P.placement);
                  return j === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  j === "y";
                }
                return !0;
              }).map((P) => [P.placement, P.overflows.filter((j) => j > 0).reduce((j, ne) => j + ne, 0)]).sort((P, j) => P[1] - j[1])[0]) == null ? void 0 : V[0];
              M && (N = M);
              break;
            }
            case "initialPlacement":
              N = a;
              break;
          }
        if (o !== N)
          return {
            reset: {
              placement: N
            }
          };
      }
      return {};
    }
  };
};
function Ms(t) {
  const e = Me(...t.map((s) => s.left)), n = Me(...t.map((s) => s.top)), r = me(...t.map((s) => s.right)), o = me(...t.map((s) => s.bottom));
  return {
    x: e,
    y: n,
    width: r - e,
    height: o - n
  };
}
function Sl(t) {
  const e = t.slice().sort((o, s) => o.y - s.y), n = [];
  let r = null;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    !r || s.y - r.y > r.height / 2 ? n.push([s]) : n[n.length - 1].push(s), r = s;
  }
  return n.map((o) => Ot(Ms(o)));
}
const Cl = function(t) {
  return t === void 0 && (t = {}), {
    name: "inline",
    options: t,
    async fn(e) {
      const {
        placement: n,
        elements: r,
        rects: o,
        platform: s,
        strategy: i
      } = e, {
        padding: a = 2,
        x: c,
        y: l
      } = Je(t, e), d = Array.from(await (s.getClientRects == null ? void 0 : s.getClientRects(r.reference)) || []), u = Sl(d), f = Ot(Ms(d)), p = Vr(a);
      function h() {
        if (u.length === 2 && u[0].left > u[1].right && c != null && l != null)
          return u.find((g) => c > g.left - p.left && c < g.right + p.right && l > g.top - p.top && l < g.bottom + p.bottom) || f;
        if (u.length >= 2) {
          if (Ie(n) === "y") {
            const E = u[0], U = u[u.length - 1], D = ze(n) === "top", V = E.top, F = U.bottom, q = D ? E.left : U.left, N = D ? E.right : U.right, M = N - q, P = F - V;
            return {
              top: V,
              bottom: F,
              left: q,
              right: N,
              width: M,
              height: P,
              x: q,
              y: V
            };
          }
          const g = ze(n) === "left", w = me(...u.map((E) => E.right)), x = Me(...u.map((E) => E.left)), v = u.filter((E) => g ? E.left === x : E.right === w), b = v[0].top, S = v[v.length - 1].bottom, C = x, R = w, k = R - C, I = S - b;
          return {
            top: b,
            bottom: S,
            left: C,
            right: R,
            width: k,
            height: I,
            x: C,
            y: b
          };
        }
        return f;
      }
      const m = await s.getElementRects({
        reference: {
          getBoundingClientRect: h
        },
        floating: r.floating,
        strategy: i
      });
      return o.reference.x !== m.reference.x || o.reference.y !== m.reference.y || o.reference.width !== m.reference.width || o.reference.height !== m.reference.height ? {
        reset: {
          rects: m
        }
      } : {};
    }
  };
}, zs = /* @__PURE__ */ new Set(["left", "top"]);
async function kl(t, e) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = t, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = ze(n), a = zt(n), c = Ie(n) === "y", l = zs.has(i) ? -1 : 1, d = s && c ? -1 : 1, u = Je(e, t);
  let {
    mainAxis: f,
    crossAxis: p,
    alignmentAxis: h
  } = typeof u == "number" ? {
    mainAxis: u,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: u.mainAxis || 0,
    crossAxis: u.crossAxis || 0,
    alignmentAxis: u.alignmentAxis
  };
  return a && typeof h == "number" && (p = a === "end" ? h * -1 : h), c ? {
    x: p * d,
    y: f * l
  } : {
    x: f * l,
    y: p * d
  };
}
const Tl = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, r;
      const {
        x: o,
        y: s,
        placement: i,
        middlewareData: a
      } = e, c = await kl(e, t);
      return i === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : {
        x: o + c.x,
        y: s + c.y,
        data: {
          ...c,
          placement: i
        }
      };
    }
  };
}, Rl = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r,
        placement: o,
        platform: s
      } = e, {
        mainAxis: i = !0,
        crossAxis: a = !1,
        limiter: c = {
          fn: (w) => {
            let {
              x,
              y: v
            } = w;
            return {
              x,
              y: v
            };
          }
        },
        ...l
      } = Je(t, e), d = {
        x: n,
        y: r
      }, u = await s.detectOverflow(e, l), f = Ie(ze(o)), p = Br(f);
      let h = d[p], m = d[f];
      if (i) {
        const w = p === "y" ? "top" : "left", x = p === "y" ? "bottom" : "right", v = h + u[w], b = h - u[x];
        h = wr(v, h, b);
      }
      if (a) {
        const w = f === "y" ? "top" : "left", x = f === "y" ? "bottom" : "right", v = m + u[w], b = m - u[x];
        m = wr(v, m, b);
      }
      const g = c.fn({
        ...e,
        [p]: h,
        [f]: m
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [p]: i,
            [f]: a
          }
        }
      };
    }
  };
}, Nl = function(t) {
  return t === void 0 && (t = {}), {
    options: t,
    fn(e) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: s,
        middlewareData: i
      } = e, {
        offset: a = 0,
        mainAxis: c = !0,
        crossAxis: l = !0
      } = Je(t, e), d = {
        x: n,
        y: r
      }, u = Ie(o), f = Br(u);
      let p = d[f], h = d[u];
      const m = Je(a, e), g = typeof m == "number" ? {
        mainAxis: m,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...m
      };
      if (c) {
        const v = f === "y" ? "height" : "width", b = s.reference[f] - s.floating[v] + g.mainAxis, S = s.reference[f] + s.reference[v] - g.mainAxis;
        p < b ? p = b : p > S && (p = S);
      }
      if (l) {
        var w, x;
        const v = f === "y" ? "width" : "height", b = zs.has(ze(o)), S = s.reference[u] - s.floating[v] + (b && ((w = i.offset) == null ? void 0 : w[u]) || 0) + (b ? 0 : g.crossAxis), C = s.reference[u] + s.reference[v] + (b ? 0 : ((x = i.offset) == null ? void 0 : x[u]) || 0) - (b ? g.crossAxis : 0);
        h < S ? h = S : h > C && (h = C);
      }
      return {
        [f]: p,
        [u]: h
      };
    }
  };
}, Al = function(t) {
  return t === void 0 && (t = {}), {
    name: "size",
    options: t,
    async fn(e) {
      var n, r;
      const {
        placement: o,
        rects: s,
        platform: i,
        elements: a
      } = e, {
        apply: c = () => {
        },
        ...l
      } = Je(t, e), d = await i.detectOverflow(e, l), u = ze(o), f = zt(o), p = Ie(o) === "y", {
        width: h,
        height: m
      } = s.floating;
      let g, w;
      u === "top" || u === "bottom" ? (g = u, w = f === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (w = u, g = f === "end" ? "top" : "bottom");
      const x = m - d.top - d.bottom, v = h - d.left - d.right, b = Me(m - d[g], x), S = Me(h - d[w], v), C = !e.middlewareData.shift;
      let R = b, k = S;
      if ((n = e.middlewareData.shift) != null && n.enabled.x && (k = v), (r = e.middlewareData.shift) != null && r.enabled.y && (R = x), C && !f) {
        const E = me(d.left, 0), U = me(d.right, 0), D = me(d.top, 0), V = me(d.bottom, 0);
        p ? k = h - 2 * (E !== 0 || U !== 0 ? E + U : me(d.left, d.right)) : R = m - 2 * (D !== 0 || V !== 0 ? D + V : me(d.top, d.bottom));
      }
      await c({
        ...e,
        availableWidth: k,
        availableHeight: R
      });
      const I = await i.getDimensions(a.floating);
      return h !== I.width || m !== I.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Bs(t) {
  const e = Le(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const o = et(t), s = o ? t.offsetWidth : n, i = o ? t.offsetHeight : r, a = Tn(n) !== s || Tn(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function Wr(t) {
  return he(t) ? t : t.contextElement;
}
function _t(t) {
  const e = Wr(t);
  if (!et(e))
    return We(1);
  const n = e.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Bs(e);
  let i = (s ? Tn(n.width) : n.width) / r, a = (s ? Tn(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const Pl = /* @__PURE__ */ We(0);
function js(t) {
  const e = Ce(t);
  return !zr() || !e.visualViewport ? Pl : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Ol(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Ce(t) ? !1 : e;
}
function vt(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const o = t.getBoundingClientRect(), s = Wr(t);
  let i = We(1);
  e && (r ? he(r) && (i = _t(r)) : i = _t(t));
  const a = Ol(s, n, r) ? js(s) : We(0);
  let c = (o.left + a.x) / i.x, l = (o.top + a.y) / i.y, d = o.width / i.x, u = o.height / i.y;
  if (s) {
    const f = Ce(s), p = r && he(r) ? Ce(r) : r;
    let h = f, m = br(h);
    for (; m && r && p !== h; ) {
      const g = _t(m), w = m.getBoundingClientRect(), x = Le(m), v = w.left + (m.clientLeft + parseFloat(x.paddingLeft)) * g.x, b = w.top + (m.clientTop + parseFloat(x.paddingTop)) * g.y;
      c *= g.x, l *= g.y, d *= g.x, u *= g.y, c += v, l += b, h = Ce(m), m = br(h);
    }
  }
  return Ot({
    width: d,
    height: u,
    x: c,
    y: l
  });
}
function Bn(t, e) {
  const n = zn(t).scrollLeft;
  return e ? e.left + n : vt(He(t)).left + n;
}
function Fs(t, e) {
  const n = t.getBoundingClientRect(), r = n.left + e.scrollLeft - Bn(t, n), o = n.top + e.scrollTop;
  return {
    x: r,
    y: o
  };
}
function El(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: r,
    strategy: o
  } = t;
  const s = o === "fixed", i = He(r), a = e ? Mn(e.floating) : !1;
  if (r === i || a && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = We(1);
  const d = We(0), u = et(r);
  if ((u || !u && !s) && ((Mt(r) !== "body" || on(i)) && (c = zn(r)), u)) {
    const p = vt(r);
    l = _t(r), d.x = p.x + r.clientLeft, d.y = p.y + r.clientTop;
  }
  const f = i && !u && !s ? Fs(i, c) : We(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + d.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + d.y + f.y
  };
}
function $l(t) {
  return Array.from(t.getClientRects());
}
function Il(t) {
  const e = He(t), n = zn(t), r = t.ownerDocument.body, o = me(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), s = me(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + Bn(t);
  const a = -n.scrollTop;
  return Le(r).direction === "rtl" && (i += me(e.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const Zo = 25;
function Dl(t, e) {
  const n = Ce(t), r = He(t), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, c = 0;
  if (o) {
    s = o.width, i = o.height;
    const d = zr();
    (!d || d && e === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  const l = Bn(r);
  if (l <= 0) {
    const d = r.ownerDocument, u = d.body, f = getComputedStyle(u), p = d.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, h = Math.abs(r.clientWidth - u.clientWidth - p);
    h <= Zo && (s -= h);
  } else l <= Zo && (s += l);
  return {
    width: s,
    height: i,
    x: a,
    y: c
  };
}
function Ll(t, e) {
  const n = vt(t, !0, e === "fixed"), r = n.top + t.clientTop, o = n.left + t.clientLeft, s = et(t) ? _t(t) : We(1), i = t.clientWidth * s.x, a = t.clientHeight * s.y, c = o * s.x, l = r * s.y;
  return {
    width: i,
    height: a,
    x: c,
    y: l
  };
}
function Ho(t, e, n) {
  let r;
  if (e === "viewport")
    r = Dl(t, n);
  else if (e === "document")
    r = Il(He(t));
  else if (he(e))
    r = Ll(e, n);
  else {
    const o = js(t);
    r = {
      x: e.x - o.x,
      y: e.y - o.y,
      width: e.width,
      height: e.height
    };
  }
  return Ot(r);
}
function Vs(t, e) {
  const n = st(t);
  return n === e || !he(n) || Pt(n) ? !1 : Le(n).position === "fixed" || Vs(n, e);
}
function Ml(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let r = Qt(t, [], !1).filter((a) => he(a) && Mt(a) !== "body"), o = null;
  const s = Le(t).position === "fixed";
  let i = s ? st(t) : t;
  for (; he(i) && !Pt(i); ) {
    const a = Le(i), c = Mr(i);
    !c && a.position === "fixed" && (o = null), (s ? !c && !o : !c && a.position === "static" && !!o && (o.position === "absolute" || o.position === "fixed") || on(i) && !c && Vs(t, i)) ? r = r.filter((d) => d !== i) : o = a, i = st(i);
  }
  return e.set(t, r), r;
}
function zl(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = t;
  const i = [...n === "clippingAncestors" ? Mn(e) ? [] : Ml(e, this._c) : [].concat(n), r], a = Ho(e, i[0], o);
  let c = a.top, l = a.right, d = a.bottom, u = a.left;
  for (let f = 1; f < i.length; f++) {
    const p = Ho(e, i[f], o);
    c = me(p.top, c), l = Me(p.right, l), d = Me(p.bottom, d), u = me(p.left, u);
  }
  return {
    width: l - u,
    height: d - c,
    x: u,
    y: c
  };
}
function Bl(t) {
  const {
    width: e,
    height: n
  } = Bs(t);
  return {
    width: e,
    height: n
  };
}
function jl(t, e, n) {
  const r = et(e), o = He(e), s = n === "fixed", i = vt(t, !0, s, e);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = We(0);
  function l() {
    c.x = Bn(o);
  }
  if (r || !r && !s)
    if ((Mt(e) !== "body" || on(o)) && (a = zn(e)), r) {
      const p = vt(e, !0, s, e);
      c.x = p.x + e.clientLeft, c.y = p.y + e.clientTop;
    } else o && l();
  s && !r && o && l();
  const d = o && !r && !s ? Fs(o, a) : We(0), u = i.left + a.scrollLeft - c.x - d.x, f = i.top + a.scrollTop - c.y - d.y;
  return {
    x: u,
    y: f,
    width: i.width,
    height: i.height
  };
}
function or(t) {
  return Le(t).position === "static";
}
function Uo(t, e) {
  if (!et(t) || Le(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return He(t) === n && (n = n.ownerDocument.body), n;
}
function Ws(t, e) {
  const n = Ce(t);
  if (Mn(t))
    return n;
  if (!et(t)) {
    let o = st(t);
    for (; o && !Pt(o); ) {
      if (he(o) && !or(o))
        return o;
      o = st(o);
    }
    return n;
  }
  let r = Uo(t, e);
  for (; r && il(r) && or(r); )
    r = Uo(r, e);
  return r && Pt(r) && or(r) && !Mr(r) ? n : r || ll(t) || n;
}
const Fl = async function(t) {
  const e = this.getOffsetParent || Ws, n = this.getDimensions, r = await n(t.floating);
  return {
    reference: jl(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Vl(t) {
  return Le(t).direction === "rtl";
}
const Wl = {
  convertOffsetParentRelativeRectToViewportRelativeRect: El,
  getDocumentElement: He,
  getClippingRect: zl,
  getOffsetParent: Ws,
  getElementRects: Fl,
  getClientRects: $l,
  getDimensions: Bl,
  getScale: _t,
  isElement: he,
  isRTL: Vl
};
function Zs(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Zl(t, e) {
  let n = null, r;
  const o = He(t);
  function s() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function i(a, c) {
    a === void 0 && (a = !1), c === void 0 && (c = 1), s();
    const l = t.getBoundingClientRect(), {
      left: d,
      top: u,
      width: f,
      height: p
    } = l;
    if (a || e(), !f || !p)
      return;
    const h = pn(u), m = pn(o.clientWidth - (d + f)), g = pn(o.clientHeight - (u + p)), w = pn(d), v = {
      rootMargin: -h + "px " + -m + "px " + -g + "px " + -w + "px",
      threshold: me(0, Me(1, c)) || 1
    };
    let b = !0;
    function S(C) {
      const R = C[0].intersectionRatio;
      if (R !== c) {
        if (!b)
          return i();
        R ? i(!1, R) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      R === 1 && !Zs(l, t.getBoundingClientRect()) && i(), b = !1;
    }
    try {
      n = new IntersectionObserver(S, {
        ...v,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(S, v);
    }
    n.observe(t);
  }
  return i(!0), s;
}
function Hl(t, e, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = Wr(t), d = o || s ? [...l ? Qt(l) : [], ...e ? Qt(e) : []] : [];
  d.forEach((w) => {
    o && w.addEventListener("scroll", n, {
      passive: !0
    }), s && w.addEventListener("resize", n);
  });
  const u = l && a ? Zl(l, n) : null;
  let f = -1, p = null;
  i && (p = new ResizeObserver((w) => {
    let [x] = w;
    x && x.target === l && p && e && (p.unobserve(e), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var v;
      (v = p) == null || v.observe(e);
    })), n();
  }), l && !c && p.observe(l), e && p.observe(e));
  let h, m = c ? vt(t) : null;
  c && g();
  function g() {
    const w = vt(t);
    m && !Zs(m, w) && n(), m = w, h = requestAnimationFrame(g);
  }
  return n(), () => {
    var w;
    d.forEach((x) => {
      o && x.removeEventListener("scroll", n), s && x.removeEventListener("resize", n);
    }), u == null || u(), (w = p) == null || w.disconnect(), p = null, c && cancelAnimationFrame(h);
  };
}
const Ul = Tl, Yl = Rl, ql = _l, Xl = Al, Yo = xl, Gl = Cl, Kl = Nl, Jl = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Wl,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return wl(t, e, {
    ...o,
    platform: s
  });
};
var Ql = typeof document < "u", ed = function() {
}, yn = Ql ? Tr : ed;
function Nn(t, e) {
  if (t === e)
    return !0;
  if (typeof t != typeof e)
    return !1;
  if (typeof t == "function" && t.toString() === e.toString())
    return !0;
  let n, r, o;
  if (t && e && typeof t == "object") {
    if (Array.isArray(t)) {
      if (n = t.length, n !== e.length) return !1;
      for (r = n; r-- !== 0; )
        if (!Nn(t[r], e[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(t), n = o.length, n !== Object.keys(e).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(e, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const s = o[r];
      if (!(s === "_owner" && t.$$typeof) && !Nn(t[s], e[s]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}
function Hs(t) {
  return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function qo(t, e) {
  const n = Hs(t);
  return Math.round(e * n) / n;
}
function sr(t) {
  const e = W.useRef(t);
  return yn(() => {
    e.current = t;
  }), e;
}
function td(t) {
  t === void 0 && (t = {});
  const {
    placement: e = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: s,
      floating: i
    } = {},
    transform: a = !0,
    whileElementsMounted: c,
    open: l
  } = t, [d, u] = W.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: e,
    middlewareData: {},
    isPositioned: !1
  }), [f, p] = W.useState(r);
  Nn(f, r) || p(r);
  const [h, m] = W.useState(null), [g, w] = W.useState(null), x = W.useCallback((P) => {
    P !== C.current && (C.current = P, m(P));
  }, []), v = W.useCallback((P) => {
    P !== R.current && (R.current = P, w(P));
  }, []), b = s || h, S = i || g, C = W.useRef(null), R = W.useRef(null), k = W.useRef(d), I = c != null, E = sr(c), U = sr(o), D = sr(l), V = W.useCallback(() => {
    if (!C.current || !R.current)
      return;
    const P = {
      placement: e,
      strategy: n,
      middleware: f
    };
    U.current && (P.platform = U.current), Jl(C.current, R.current, P).then((j) => {
      const ne = {
        ...j,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: D.current !== !1
      };
      F.current && !Nn(k.current, ne) && (k.current = ne, Fi.flushSync(() => {
        u(ne);
      }));
    });
  }, [f, e, n, U, D]);
  yn(() => {
    l === !1 && k.current.isPositioned && (k.current.isPositioned = !1, u((P) => ({
      ...P,
      isPositioned: !1
    })));
  }, [l]);
  const F = W.useRef(!1);
  yn(() => (F.current = !0, () => {
    F.current = !1;
  }), []), yn(() => {
    if (b && (C.current = b), S && (R.current = S), b && S) {
      if (E.current)
        return E.current(b, S, V);
      V();
    }
  }, [b, S, V, E, I]);
  const q = W.useMemo(() => ({
    reference: C,
    floating: R,
    setReference: x,
    setFloating: v
  }), [x, v]), N = W.useMemo(() => ({
    reference: b,
    floating: S
  }), [b, S]), M = W.useMemo(() => {
    const P = {
      position: n,
      left: 0,
      top: 0
    };
    if (!N.floating)
      return P;
    const j = qo(N.floating, d.x), ne = qo(N.floating, d.y);
    return a ? {
      ...P,
      transform: "translate(" + j + "px, " + ne + "px)",
      ...Hs(N.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: j,
      top: ne
    };
  }, [n, a, N.floating, d.x, d.y]);
  return W.useMemo(() => ({
    ...d,
    update: V,
    refs: q,
    elements: N,
    floatingStyles: M
  }), [d, V, q, N, M]);
}
const nd = (t) => {
  function e(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: t,
    fn(n) {
      const {
        element: r,
        padding: o
      } = typeof t == "function" ? t(n) : t;
      return r && e(r) ? r.current != null ? Yo({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Yo({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, rd = (t, e) => {
  const n = Ul(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, od = (t, e) => {
  const n = Yl(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Xo = (t, e) => ({
  fn: Kl(t).fn,
  options: [t, e]
}), Go = (t, e) => {
  const n = ql(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, sd = (t, e) => {
  const n = Xl(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Ko = (t, e) => {
  const n = Gl(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, id = (t, e) => {
  const n = nd(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
};
function ad(t) {
  return W.useMemo(() => t.every((e) => e == null) ? null : (e) => {
    t.forEach((n) => {
      typeof n == "function" ? n(e) : n != null && (n.current = e);
    });
  }, t);
}
const Us = {
  ...W
}, cd = Us.useInsertionEffect, ld = cd || ((t) => t());
function dd(t) {
  const e = W.useRef(() => {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Cannot call an event handler while rendering.");
  });
  return ld(() => {
    e.current = t;
  }), W.useCallback(function() {
    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
      r[o] = arguments[o];
    return e.current == null ? void 0 : e.current(...r);
  }, []);
}
var _r = typeof document < "u" ? Tr : te;
let Jo = !1, ud = 0;
const Qo = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + ud++
);
function fd() {
  const [t, e] = W.useState(() => Jo ? Qo() : void 0);
  return _r(() => {
    t == null && e(Qo());
  }, []), W.useEffect(() => {
    Jo = !0;
  }, []), t;
}
const pd = Us.useId, md = pd || fd;
let Sr;
process.env.NODE_ENV !== "production" && (Sr = /* @__PURE__ */ new Set());
function hd() {
  for (var t, e = arguments.length, n = new Array(e), r = 0; r < e; r++)
    n[r] = arguments[r];
  const o = "Floating UI: " + n.join(" ");
  if (!((t = Sr) != null && t.has(o))) {
    var s;
    (s = Sr) == null || s.add(o), console.error(o);
  }
}
function gd() {
  const t = /* @__PURE__ */ new Map();
  return {
    emit(e, n) {
      var r;
      (r = t.get(e)) == null || r.forEach((o) => o(n));
    },
    on(e, n) {
      t.set(e, [...t.get(e) || [], n]);
    },
    off(e, n) {
      var r;
      t.set(e, ((r = t.get(e)) == null ? void 0 : r.filter((o) => o !== n)) || []);
    }
  };
}
const yd = /* @__PURE__ */ W.createContext(null), vd = /* @__PURE__ */ W.createContext(null), bd = () => {
  var t;
  return ((t = W.useContext(yd)) == null ? void 0 : t.id) || null;
}, wd = () => W.useContext(vd);
function xd(t) {
  const {
    open: e = !1,
    onOpenChange: n,
    elements: r
  } = t, o = md(), s = W.useRef({}), [i] = W.useState(() => gd()), a = bd() != null;
  if (process.env.NODE_ENV !== "production") {
    const p = r.reference;
    p && !he(p) && hd("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
  }
  const [c, l] = W.useState(r.reference), d = dd((p, h, m) => {
    s.current.openEvent = p ? h : void 0, i.emit("openchange", {
      open: p,
      event: h,
      reason: m,
      nested: a
    }), n == null || n(p, h, m);
  }), u = W.useMemo(() => ({
    setPositionReference: l
  }), []), f = W.useMemo(() => ({
    reference: c || r.reference || null,
    floating: r.floating || null,
    domReference: r.reference
  }), [c, r.reference, r.floating]);
  return W.useMemo(() => ({
    dataRef: s,
    open: e,
    onOpenChange: d,
    elements: f,
    events: i,
    floatingId: o,
    refs: u
  }), [e, d, f, i, o, u]);
}
function _d(t) {
  t === void 0 && (t = {});
  const {
    nodeId: e
  } = t, n = xd({
    ...t,
    elements: {
      reference: null,
      floating: null,
      ...t.elements
    }
  }), r = t.rootContext || n, o = r.elements, [s, i] = W.useState(null), [a, c] = W.useState(null), d = (o == null ? void 0 : o.domReference) || s, u = W.useRef(null), f = wd();
  _r(() => {
    d && (u.current = d);
  }, [d]);
  const p = td({
    ...t,
    elements: {
      ...o,
      ...a && {
        reference: a
      }
    }
  }), h = W.useCallback((v) => {
    const b = he(v) ? {
      getBoundingClientRect: () => v.getBoundingClientRect(),
      contextElement: v
    } : v;
    c(b), p.refs.setReference(b);
  }, [p.refs]), m = W.useCallback((v) => {
    (he(v) || v === null) && (u.current = v, i(v)), (he(p.refs.reference.current) || p.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    v !== null && !he(v)) && p.refs.setReference(v);
  }, [p.refs]), g = W.useMemo(() => ({
    ...p.refs,
    setReference: m,
    setPositionReference: h,
    domReference: u
  }), [p.refs, m, h]), w = W.useMemo(() => ({
    ...p.elements,
    domReference: d
  }), [p.elements, d]), x = W.useMemo(() => ({
    ...p,
    ...r,
    refs: g,
    elements: w,
    nodeId: e
  }), [p, g, w, e, r]);
  return _r(() => {
    r.dataRef.current.floatingContext = x;
    const v = f == null ? void 0 : f.nodesRef.current.find((b) => b.id === e);
    v && (v.context = x);
  }), W.useMemo(() => ({
    ...p,
    context: x,
    refs: g,
    elements: w
  }), [p, g, w, x]);
}
const [Sd, Pe] = rn(
  "ScrollArea.Root component was not found in tree"
);
function Et(t, e) {
  const n = pt(e);
  Or(() => {
    let r = 0;
    if (t) {
      const o = new ResizeObserver(() => {
        cancelAnimationFrame(r), r = window.requestAnimationFrame(n);
      });
      return o.observe(t), () => {
        window.cancelAnimationFrame(r), o.unobserve(t);
      };
    }
  }, [t, n]);
}
const Cd = re((t, e) => {
  const { style: n, ...r } = t, o = Pe(), [s, i] = G(0), [a, c] = G(0), l = !!(s && a);
  return Et(o.scrollbarX, () => {
    var u;
    const d = ((u = o.scrollbarX) == null ? void 0 : u.offsetHeight) || 0;
    o.onCornerHeightChange(d), c(d);
  }), Et(o.scrollbarY, () => {
    var u;
    const d = ((u = o.scrollbarY) == null ? void 0 : u.offsetWidth) || 0;
    o.onCornerWidthChange(d), i(d);
  }), l ? /* @__PURE__ */ y("div", { ...r, ref: e, style: { ...n, width: s, height: a } }) : null;
}), kd = re((t, e) => {
  const n = Pe(), r = !!(n.scrollbarX && n.scrollbarY);
  return n.type !== "scroll" && r ? /* @__PURE__ */ y(Cd, { ...t, ref: e }) : null;
}), Td = {
  scrollHideDelay: 1e3,
  type: "hover"
}, Ys = re((t, e) => {
  const n = $("ScrollAreaRoot", Td, t), { type: r, scrollHideDelay: o, scrollbars: s, ...i } = n, [a, c] = G(null), [l, d] = G(null), [u, f] = G(null), [p, h] = G(null), [m, g] = G(null), [w, x] = G(0), [v, b] = G(0), [S, C] = G(!1), [R, k] = G(!1), I = Ae(e, (E) => c(E));
  return /* @__PURE__ */ y(
    Sd,
    {
      value: {
        type: r,
        scrollHideDelay: o,
        scrollArea: a,
        viewport: l,
        onViewportChange: d,
        content: u,
        onContentChange: f,
        scrollbarX: p,
        onScrollbarXChange: h,
        scrollbarXEnabled: S,
        onScrollbarXEnabledChange: C,
        scrollbarY: m,
        onScrollbarYChange: g,
        scrollbarYEnabled: R,
        onScrollbarYEnabledChange: k,
        onCornerWidthChange: x,
        onCornerHeightChange: b
      },
      children: /* @__PURE__ */ y(
        H,
        {
          ...i,
          ref: I,
          __vars: {
            "--sa-corner-width": s !== "xy" ? "0px" : `${w}px`,
            "--sa-corner-height": s !== "xy" ? "0px" : `${v}px`
          }
        }
      )
    }
  );
});
Ys.displayName = "@mantine/core/ScrollAreaRoot";
function qs(t, e) {
  const n = t / e;
  return Number.isNaN(n) ? 0 : n;
}
function jn(t) {
  const e = qs(t.viewport, t.content), n = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, r = (t.scrollbar.size - n) * e;
  return Math.max(r, 18);
}
function Xs(t, e) {
  return (n) => {
    if (t[0] === t[1] || e[0] === e[1])
      return e[0];
    const r = (e[1] - e[0]) / (t[1] - t[0]);
    return e[0] + r * (n - t[0]);
  };
}
function Rd(t, [e, n]) {
  return Math.min(n, Math.max(e, t));
}
function es(t, e, n = "ltr") {
  const r = jn(e), o = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, s = e.scrollbar.size - o, i = e.content - e.viewport, a = s - r, c = n === "ltr" ? [0, i] : [i * -1, 0], l = Rd(t, c);
  return Xs([0, i], [0, a])(l);
}
function Nd(t, e, n, r = "ltr") {
  const o = jn(n), s = o / 2, i = e || s, a = o - i, c = n.scrollbar.paddingStart + i, l = n.scrollbar.size - n.scrollbar.paddingEnd - a, d = n.content - n.viewport, u = r === "ltr" ? [0, d] : [d * -1, 0];
  return Xs([c, l], u)(t);
}
function Gs(t, e) {
  return t > 0 && t < e;
}
function An(t) {
  return t ? parseInt(t, 10) : 0;
}
function mt(t, e, { checkForDefaultPrevented: n = !0 } = {}) {
  return (r) => {
    t == null || t(r), (n === !1 || !r.defaultPrevented) && (e == null || e(r));
  };
}
const [Ad, Ks] = rn(
  "ScrollAreaScrollbar was not found in tree"
), Js = re((t, e) => {
  const {
    sizes: n,
    hasThumb: r,
    onThumbChange: o,
    onThumbPointerUp: s,
    onThumbPointerDown: i,
    onThumbPositionChange: a,
    onDragScroll: c,
    onWheelScroll: l,
    onResize: d,
    ...u
  } = t, f = Pe(), [p, h] = G(null), m = Ae(e, (k) => h(k)), g = J(null), w = J(""), { viewport: x } = f, v = n.content - n.viewport, b = pt(l), S = pt(a), C = $n(d, 10), R = (k) => {
    if (g.current) {
      const I = k.clientX - g.current.left, E = k.clientY - g.current.top;
      c({ x: I, y: E });
    }
  };
  return te(() => {
    const k = (I) => {
      const E = I.target;
      (p == null ? void 0 : p.contains(E)) && b(I, v);
    };
    return document.addEventListener("wheel", k, { passive: !1 }), () => document.removeEventListener("wheel", k, { passive: !1 });
  }, [x, p, v, b]), te(S, [n, S]), Et(p, C), Et(f.content, C), /* @__PURE__ */ y(
    Ad,
    {
      value: {
        scrollbar: p,
        hasThumb: r,
        onThumbChange: pt(o),
        onThumbPointerUp: pt(s),
        onThumbPositionChange: S,
        onThumbPointerDown: pt(i)
      },
      children: /* @__PURE__ */ y(
        "div",
        {
          ...u,
          ref: m,
          "data-mantine-scrollbar": !0,
          style: { position: "absolute", ...u.style },
          onPointerDown: mt(t.onPointerDown, (k) => {
            k.preventDefault(), k.button === 0 && (k.target.setPointerCapture(k.pointerId), g.current = p.getBoundingClientRect(), w.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", R(k));
          }),
          onPointerMove: mt(t.onPointerMove, R),
          onPointerUp: mt(t.onPointerUp, (k) => {
            const I = k.target;
            I.hasPointerCapture(k.pointerId) && (k.preventDefault(), I.releasePointerCapture(k.pointerId));
          }),
          onLostPointerCapture: () => {
            document.body.style.webkitUserSelect = w.current, g.current = null;
          }
        }
      )
    }
  );
}), Qs = re(
  (t, e) => {
    const { sizes: n, onSizesChange: r, style: o, ...s } = t, i = Pe(), [a, c] = G(), l = J(null), d = Ae(e, l, i.onScrollbarXChange);
    return te(() => {
      l.current && c(getComputedStyle(l.current));
    }, [l]), /* @__PURE__ */ y(
      Js,
      {
        "data-orientation": "horizontal",
        ...s,
        ref: d,
        sizes: n,
        style: {
          ...o,
          "--sa-thumb-width": `${jn(n)}px`
        },
        onThumbPointerDown: (u) => t.onThumbPointerDown(u.x),
        onDragScroll: (u) => t.onDragScroll(u.x),
        onWheelScroll: (u, f) => {
          if (i.viewport) {
            const p = i.viewport.scrollLeft + u.deltaX;
            t.onWheelScroll(p), Gs(p, f) && u.preventDefault();
          }
        },
        onResize: () => {
          l.current && i.viewport && a && r({
            content: i.viewport.scrollWidth,
            viewport: i.viewport.offsetWidth,
            scrollbar: {
              size: l.current.clientWidth,
              paddingStart: An(a.paddingLeft),
              paddingEnd: An(a.paddingRight)
            }
          });
        }
      }
    );
  }
);
Qs.displayName = "@mantine/core/ScrollAreaScrollbarX";
const ei = re(
  (t, e) => {
    const { sizes: n, onSizesChange: r, style: o, ...s } = t, i = Pe(), [a, c] = G(), l = J(null), d = Ae(e, l, i.onScrollbarYChange);
    return te(() => {
      l.current && c(window.getComputedStyle(l.current));
    }, []), /* @__PURE__ */ y(
      Js,
      {
        ...s,
        "data-orientation": "vertical",
        ref: d,
        sizes: n,
        style: {
          "--sa-thumb-height": `${jn(n)}px`,
          ...o
        },
        onThumbPointerDown: (u) => t.onThumbPointerDown(u.y),
        onDragScroll: (u) => t.onDragScroll(u.y),
        onWheelScroll: (u, f) => {
          if (i.viewport) {
            const p = i.viewport.scrollTop + u.deltaY;
            t.onWheelScroll(p), Gs(p, f) && u.preventDefault();
          }
        },
        onResize: () => {
          l.current && i.viewport && a && r({
            content: i.viewport.scrollHeight,
            viewport: i.viewport.offsetHeight,
            scrollbar: {
              size: l.current.clientHeight,
              paddingStart: An(a.paddingTop),
              paddingEnd: An(a.paddingBottom)
            }
          });
        }
      }
    );
  }
);
ei.displayName = "@mantine/core/ScrollAreaScrollbarY";
const Fn = re((t, e) => {
  const { orientation: n = "vertical", ...r } = t, { dir: o } = Lr(), s = Pe(), i = J(null), a = J(0), [c, l] = G({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), d = qs(c.viewport, c.content), u = {
    ...r,
    sizes: c,
    onSizesChange: l,
    hasThumb: d > 0 && d < 1,
    onThumbChange: (p) => {
      i.current = p;
    },
    onThumbPointerUp: () => {
      a.current = 0;
    },
    onThumbPointerDown: (p) => {
      a.current = p;
    }
  }, f = (p, h) => Nd(p, a.current, c, h);
  return n === "horizontal" ? /* @__PURE__ */ y(
    Qs,
    {
      ...u,
      ref: e,
      onThumbPositionChange: () => {
        if (s.viewport && i.current) {
          const p = s.viewport.scrollLeft, h = es(p, c, o);
          i.current.style.transform = `translate3d(${h}px, 0, 0)`;
        }
      },
      onWheelScroll: (p) => {
        s.viewport && (s.viewport.scrollLeft = p);
      },
      onDragScroll: (p) => {
        s.viewport && (s.viewport.scrollLeft = f(p, o));
      }
    }
  ) : n === "vertical" ? /* @__PURE__ */ y(
    ei,
    {
      ...u,
      ref: e,
      onThumbPositionChange: () => {
        if (s.viewport && i.current) {
          const p = s.viewport.scrollTop, h = es(p, c);
          c.scrollbar.size === 0 ? i.current.style.setProperty("--thumb-opacity", "0") : i.current.style.setProperty("--thumb-opacity", "1"), i.current.style.transform = `translate3d(0, ${h}px, 0)`;
        }
      },
      onWheelScroll: (p) => {
        s.viewport && (s.viewport.scrollTop = p);
      },
      onDragScroll: (p) => {
        s.viewport && (s.viewport.scrollTop = f(p));
      }
    }
  ) : null;
});
Fn.displayName = "@mantine/core/ScrollAreaScrollbarVisible";
const Zr = re(
  (t, e) => {
    const n = Pe(), { forceMount: r, ...o } = t, [s, i] = G(!1), a = t.orientation === "horizontal", c = $n(() => {
      if (n.viewport) {
        const l = n.viewport.offsetWidth < n.viewport.scrollWidth, d = n.viewport.offsetHeight < n.viewport.scrollHeight;
        i(a ? l : d);
      }
    }, 10);
    return Et(n.viewport, c), Et(n.content, c), r || s ? /* @__PURE__ */ y(
      Fn,
      {
        "data-state": s ? "visible" : "hidden",
        ...o,
        ref: e
      }
    ) : null;
  }
);
Zr.displayName = "@mantine/core/ScrollAreaScrollbarAuto";
const ti = re(
  (t, e) => {
    const { forceMount: n, ...r } = t, o = Pe(), [s, i] = G(!1);
    return te(() => {
      const { scrollArea: a } = o;
      let c = 0;
      if (a) {
        const l = () => {
          window.clearTimeout(c), i(!0);
        }, d = () => {
          c = window.setTimeout(() => i(!1), o.scrollHideDelay);
        };
        return a.addEventListener("pointerenter", l), a.addEventListener("pointerleave", d), () => {
          window.clearTimeout(c), a.removeEventListener("pointerenter", l), a.removeEventListener("pointerleave", d);
        };
      }
    }, [o.scrollArea, o.scrollHideDelay]), n || s ? /* @__PURE__ */ y(
      Zr,
      {
        "data-state": s ? "visible" : "hidden",
        ...r,
        ref: e
      }
    ) : null;
  }
);
ti.displayName = "@mantine/core/ScrollAreaScrollbarHover";
const Pd = re(
  (t, e) => {
    const { forceMount: n, ...r } = t, o = Pe(), s = t.orientation === "horizontal", [i, a] = G("hidden"), c = $n(() => a("idle"), 100);
    return te(() => {
      if (i === "idle") {
        const l = window.setTimeout(() => a("hidden"), o.scrollHideDelay);
        return () => window.clearTimeout(l);
      }
    }, [i, o.scrollHideDelay]), te(() => {
      const { viewport: l } = o, d = s ? "scrollLeft" : "scrollTop";
      if (l) {
        let u = l[d];
        const f = () => {
          const p = l[d];
          u !== p && (a("scrolling"), c()), u = p;
        };
        return l.addEventListener("scroll", f), () => l.removeEventListener("scroll", f);
      }
    }, [o.viewport, s, c]), n || i !== "hidden" ? /* @__PURE__ */ y(
      Fn,
      {
        "data-state": i === "hidden" ? "hidden" : "visible",
        ...r,
        ref: e,
        onPointerEnter: mt(t.onPointerEnter, () => a("interacting")),
        onPointerLeave: mt(t.onPointerLeave, () => a("idle"))
      }
    ) : null;
  }
), Cr = re(
  (t, e) => {
    const { forceMount: n, ...r } = t, o = Pe(), { onScrollbarXEnabledChange: s, onScrollbarYEnabledChange: i } = o, a = t.orientation === "horizontal";
    return te(() => (a ? s(!0) : i(!0), () => {
      a ? s(!1) : i(!1);
    }), [a, s, i]), o.type === "hover" ? /* @__PURE__ */ y(ti, { ...r, ref: e, forceMount: n }) : o.type === "scroll" ? /* @__PURE__ */ y(Pd, { ...r, ref: e, forceMount: n }) : o.type === "auto" ? /* @__PURE__ */ y(Zr, { ...r, ref: e, forceMount: n }) : o.type === "always" ? /* @__PURE__ */ y(Fn, { ...r, ref: e }) : null;
  }
);
Cr.displayName = "@mantine/core/ScrollAreaScrollbar";
function Od(t, e = () => {
}) {
  let n = { left: t.scrollLeft, top: t.scrollTop }, r = 0;
  return (function o() {
    const s = { left: t.scrollLeft, top: t.scrollTop }, i = n.left !== s.left, a = n.top !== s.top;
    (i || a) && e(), n = s, r = window.requestAnimationFrame(o);
  })(), () => window.cancelAnimationFrame(r);
}
const ni = re((t, e) => {
  const { style: n, ...r } = t, o = Pe(), s = Ks(), { onThumbPositionChange: i } = s, a = Ae(e, (d) => s.onThumbChange(d)), c = J(void 0), l = $n(() => {
    c.current && (c.current(), c.current = void 0);
  }, 100);
  return te(() => {
    const { viewport: d } = o;
    if (d) {
      const u = () => {
        if (l(), !c.current) {
          const f = Od(d, i);
          c.current = f, i();
        }
      };
      return i(), d.addEventListener("scroll", u), () => d.removeEventListener("scroll", u);
    }
  }, [o.viewport, l, i]), /* @__PURE__ */ y(
    "div",
    {
      "data-state": s.hasThumb ? "visible" : "hidden",
      ...r,
      ref: a,
      style: {
        width: "var(--sa-thumb-width)",
        height: "var(--sa-thumb-height)",
        ...n
      },
      onPointerDownCapture: mt(t.onPointerDownCapture, (d) => {
        const f = d.target.getBoundingClientRect(), p = d.clientX - f.left, h = d.clientY - f.top;
        s.onThumbPointerDown({ x: p, y: h });
      }),
      onPointerUp: mt(t.onPointerUp, s.onThumbPointerUp)
    }
  );
});
ni.displayName = "@mantine/core/ScrollAreaThumb";
const kr = re(
  (t, e) => {
    const { forceMount: n, ...r } = t, o = Ks();
    return n || o.hasThumb ? /* @__PURE__ */ y(ni, { ref: e, ...r }) : null;
  }
);
kr.displayName = "@mantine/core/ScrollAreaThumb";
const ri = re(
  ({ children: t, style: e, ...n }, r) => {
    const o = Pe(), s = Ae(r, o.onViewportChange);
    return /* @__PURE__ */ y(
      H,
      {
        ...n,
        ref: s,
        style: {
          overflowX: o.scrollbarXEnabled ? "scroll" : "hidden",
          overflowY: o.scrollbarYEnabled ? "scroll" : "hidden",
          ...e
        },
        children: /* @__PURE__ */ y("div", { style: { minWidth: "100%" }, ref: o.onContentChange, children: t })
      }
    );
  }
);
ri.displayName = "@mantine/core/ScrollAreaViewport";
var Hr = { root: "m_d57069b5", viewport: "m_c0783ff9", viewportInner: "m_f8f631dd", scrollbar: "m_c44ba933", thumb: "m_d8b5e363", corner: "m_21657268" };
const oi = {
  scrollHideDelay: 1e3,
  type: "hover",
  scrollbars: "xy"
}, Ed = (t, { scrollbarSize: e, overscrollBehavior: n }) => ({
  root: {
    "--scrollarea-scrollbar-size": se(e),
    "--scrollarea-over-scroll-behavior": n
  }
}), sn = X((t, e) => {
  const n = $("ScrollArea", oi, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    scrollbarSize: c,
    vars: l,
    type: d,
    scrollHideDelay: u,
    viewportProps: f,
    viewportRef: p,
    onScrollPositionChange: h,
    children: m,
    offsetScrollbars: g,
    scrollbars: w,
    onBottomReached: x,
    onTopReached: v,
    overscrollBehavior: b,
    ...S
  } = n, [C, R] = G(!1), [k, I] = G(!1), [E, U] = G(!1), D = oe({
    name: "ScrollArea",
    props: n,
    classes: Hr,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: Ed
  }), V = J(null), F = ad([p, V]);
  return te(() => {
    if (!V.current || g !== "present")
      return;
    const q = V.current, N = new ResizeObserver(() => {
      const { scrollHeight: M, clientHeight: P, scrollWidth: j, clientWidth: ne } = q;
      I(M > P), U(j > ne);
    });
    return N.observe(q), () => N.disconnect();
  }, [V, g]), /* @__PURE__ */ ie(
    Ys,
    {
      type: d === "never" ? "always" : d,
      scrollHideDelay: u,
      ref: e,
      scrollbars: w,
      ...D("root"),
      ...S,
      children: [
        /* @__PURE__ */ y(
          ri,
          {
            ...f,
            ...D("viewport", { style: f == null ? void 0 : f.style }),
            ref: F,
            "data-offset-scrollbars": g === !0 ? "xy" : g || void 0,
            "data-scrollbars": w || void 0,
            "data-horizontal-hidden": g === "present" && !E ? "true" : void 0,
            "data-vertical-hidden": g === "present" && !k ? "true" : void 0,
            onScroll: (q) => {
              var j;
              (j = f == null ? void 0 : f.onScroll) == null || j.call(f, q), h == null || h({ x: q.currentTarget.scrollLeft, y: q.currentTarget.scrollTop });
              const { scrollTop: N, scrollHeight: M, clientHeight: P } = q.currentTarget;
              N - (M - P) >= -0.6 && (x == null || x()), N === 0 && (v == null || v());
            },
            children: m
          }
        ),
        (w === "xy" || w === "x") && /* @__PURE__ */ y(
          Cr,
          {
            ...D("scrollbar"),
            orientation: "horizontal",
            "data-hidden": d === "never" || g === "present" && !E ? !0 : void 0,
            forceMount: !0,
            onMouseEnter: () => R(!0),
            onMouseLeave: () => R(!1),
            children: /* @__PURE__ */ y(kr, { ...D("thumb") })
          }
        ),
        (w === "xy" || w === "y") && /* @__PURE__ */ y(
          Cr,
          {
            ...D("scrollbar"),
            orientation: "vertical",
            "data-hidden": d === "never" || g === "present" && !k ? !0 : void 0,
            forceMount: !0,
            onMouseEnter: () => R(!0),
            onMouseLeave: () => R(!1),
            children: /* @__PURE__ */ y(kr, { ...D("thumb") })
          }
        ),
        /* @__PURE__ */ y(
          kd,
          {
            ...D("corner"),
            "data-hovered": C || void 0,
            "data-hidden": d === "never" || void 0
          }
        )
      ]
    }
  );
});
sn.displayName = "@mantine/core/ScrollArea";
const Ur = X((t, e) => {
  const {
    children: n,
    classNames: r,
    styles: o,
    scrollbarSize: s,
    scrollHideDelay: i,
    type: a,
    dir: c,
    offsetScrollbars: l,
    viewportRef: d,
    onScrollPositionChange: u,
    unstyled: f,
    variant: p,
    viewportProps: h,
    scrollbars: m,
    style: g,
    vars: w,
    onBottomReached: x,
    onTopReached: v,
    ...b
  } = $("ScrollAreaAutosize", oi, t);
  return /* @__PURE__ */ y(H, { ...b, ref: e, style: [{ display: "flex", overflow: "auto" }, g], children: /* @__PURE__ */ y(H, { style: { display: "flex", flexDirection: "column", flex: 1 }, children: /* @__PURE__ */ y(
    sn,
    {
      classNames: r,
      styles: o,
      scrollHideDelay: i,
      scrollbarSize: s,
      type: a,
      dir: c,
      offsetScrollbars: l,
      viewportRef: d,
      onScrollPositionChange: u,
      unstyled: f,
      variant: p,
      viewportProps: h,
      vars: w,
      scrollbars: m,
      onBottomReached: x,
      onTopReached: v,
      children: n
    }
  ) }) });
});
sn.classes = Hr;
Ur.displayName = "@mantine/core/ScrollAreaAutosize";
Ur.classes = Hr;
sn.Autosize = Ur;
var si = { root: "m_87cf2631" };
const $d = {
  __staticSelector: "UnstyledButton"
}, Vn = Be(
  (t, e) => {
    const n = $("UnstyledButton", $d, t), {
      className: r,
      component: o = "button",
      __staticSelector: s,
      unstyled: i,
      classNames: a,
      styles: c,
      style: l,
      ...d
    } = n, u = oe({
      name: s,
      props: n,
      classes: si,
      className: r,
      style: l,
      classNames: a,
      styles: c,
      unstyled: i
    });
    return /* @__PURE__ */ y(
      H,
      {
        ...u("root", { focusable: !0 }),
        component: o,
        ref: e,
        type: o === "button" ? "button" : void 0,
        ...d
      }
    );
  }
);
Vn.classes = si;
Vn.displayName = "@mantine/core/UnstyledButton";
var ii = { root: "m_515a97f8" };
const Id = {}, Yr = X((t, e) => {
  const n = $("VisuallyHidden", Id, t), { classNames: r, className: o, style: s, styles: i, unstyled: a, vars: c, ...l } = n, d = oe({
    name: "VisuallyHidden",
    classes: ii,
    props: n,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a
  });
  return /* @__PURE__ */ y(H, { component: "span", ref: e, ...d("root"), ...l });
});
Yr.classes = ii;
Yr.displayName = "@mantine/core/VisuallyHidden";
var ai = { root: "m_1b7284a3" };
const Dd = {}, Ld = (t, { radius: e, shadow: n }) => ({
  root: {
    "--paper-radius": e === void 0 ? void 0 : it(e),
    "--paper-shadow": Ss(n)
  }
}), qr = Be((t, e) => {
  const n = $("Paper", Dd, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    withBorder: c,
    vars: l,
    radius: d,
    shadow: u,
    variant: f,
    mod: p,
    ...h
  } = n, m = oe({
    name: "Paper",
    props: n,
    classes: ai,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: Ld
  });
  return /* @__PURE__ */ y(
    H,
    {
      ref: e,
      mod: [{ "data-with-border": c }, p],
      ...m("root"),
      variant: f,
      ...h
    }
  );
});
qr.classes = ai;
qr.displayName = "@mantine/core/Paper";
function Md(t, e) {
  if (t === "rtl" && (e.includes("right") || e.includes("left"))) {
    const [n, r] = e.split("-"), o = n === "right" ? "left" : "right";
    return r === void 0 ? o : `${o}-${r}`;
  }
  return e;
}
function ts(t, e, n, r) {
  return t === "center" || r === "center" ? { top: e } : t === "end" ? { bottom: n } : t === "start" ? { top: n } : {};
}
function ns(t, e, n, r, o) {
  return t === "center" || r === "center" ? { left: e } : t === "end" ? { [o === "ltr" ? "right" : "left"]: n } : t === "start" ? { [o === "ltr" ? "left" : "right"]: n } : {};
}
const zd = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius"
};
function Bd({
  position: t,
  arrowSize: e,
  arrowOffset: n,
  arrowRadius: r,
  arrowPosition: o,
  arrowX: s,
  arrowY: i,
  dir: a
}) {
  const [c, l = "center"] = t.split("-"), d = {
    width: e,
    height: e,
    transform: "rotate(45deg)",
    position: "absolute",
    [zd[c]]: r
  }, u = -e / 2;
  return c === "left" ? {
    ...d,
    ...ts(l, i, n, o),
    right: u,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    clipPath: "polygon(100% 0, 0 0, 100% 100%)"
  } : c === "right" ? {
    ...d,
    ...ts(l, i, n, o),
    left: u,
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    clipPath: "polygon(0 100%, 0 0, 100% 100%)"
  } : c === "top" ? {
    ...d,
    ...ns(l, s, n, o, a),
    bottom: u,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    clipPath: "polygon(0 100%, 100% 100%, 100% 0)"
  } : c === "bottom" ? {
    ...d,
    ...ns(l, s, n, o, a),
    top: u,
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    clipPath: "polygon(0 100%, 0 0, 100% 0)"
  } : {};
}
const ci = re(
  ({
    position: t,
    arrowSize: e,
    arrowOffset: n,
    arrowRadius: r,
    arrowPosition: o,
    visible: s,
    arrowX: i,
    arrowY: a,
    style: c,
    ...l
  }, d) => {
    const { dir: u } = Lr();
    return s ? /* @__PURE__ */ y(
      "div",
      {
        ...l,
        ref: d,
        style: {
          ...c,
          ...Bd({
            position: t,
            arrowSize: e,
            arrowOffset: n,
            arrowRadius: r,
            arrowPosition: o,
            dir: u,
            arrowX: i,
            arrowY: a
          })
        }
      }
    ) : null;
  }
);
ci.displayName = "@mantine/core/FloatingArrow";
var li = { root: "m_9814e45f" };
const jd = {
  zIndex: _s("modal")
}, Fd = (t, { gradient: e, color: n, backgroundOpacity: r, blur: o, radius: s, zIndex: i }) => ({
  root: {
    "--overlay-bg": e || (n !== void 0 || r !== void 0) && xc(n || "#000", r ?? 0.6) || void 0,
    "--overlay-filter": o ? `blur(${se(o)})` : void 0,
    "--overlay-radius": s === void 0 ? void 0 : it(s),
    "--overlay-z-index": i == null ? void 0 : i.toString()
  }
}), Xr = Be((t, e) => {
  const n = $("Overlay", jd, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: c,
    fixed: l,
    center: d,
    children: u,
    radius: f,
    zIndex: p,
    gradient: h,
    blur: m,
    color: g,
    backgroundOpacity: w,
    mod: x,
    ...v
  } = n, b = oe({
    name: "Overlay",
    props: n,
    classes: li,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: Fd
  });
  return /* @__PURE__ */ y(H, { ref: e, ...b("root"), mod: [{ center: d, fixed: l }, x], ...v, children: u });
});
Xr.classes = li;
Xr.displayName = "@mantine/core/Overlay";
function ir(t) {
  const e = document.createElement("div");
  return e.setAttribute("data-portal", "true"), typeof t.className == "string" && e.classList.add(...t.className.split(" ").filter(Boolean)), typeof t.style == "object" && Object.assign(e.style, t.style), typeof t.id == "string" && e.setAttribute("id", t.id), e;
}
function Vd({
  target: t,
  reuseTargetNode: e,
  ...n
}) {
  if (t)
    return typeof t == "string" ? document.querySelector(t) || ir(n) : t;
  if (e) {
    const r = document.querySelector("[data-mantine-shared-portal-node]");
    if (r)
      return r;
    const o = ir(n);
    return o.setAttribute("data-mantine-shared-portal-node", "true"), document.body.appendChild(o), o;
  }
  return ir(n);
}
const Wd = {}, di = X((t, e) => {
  const { children: n, target: r, reuseTargetNode: o, ...s } = $("Portal", Wd, t), [i, a] = G(!1), c = J(null);
  return Or(() => (a(!0), c.current = Vd({ target: r, reuseTargetNode: o, ...s }), gr(e, c.current), !r && !o && c.current && document.body.appendChild(c.current), () => {
    !r && !o && c.current && document.body.removeChild(c.current);
  }), [r]), !i || !c.current ? null : Wi(/* @__PURE__ */ y(ht, { children: n }), c.current);
});
di.displayName = "@mantine/core/Portal";
const Gr = X(
  ({ withinPortal: t = !0, children: e, ...n }, r) => As() === "test" || !t ? /* @__PURE__ */ y(ht, { children: e }) : /* @__PURE__ */ y(di, { ref: r, ...n, children: e })
);
Gr.displayName = "@mantine/core/OptionalPortal";
const Ht = (t) => ({
  in: { opacity: 1, transform: "scale(1)" },
  out: { opacity: 0, transform: `scale(.9) translateY(${t === "bottom" ? 10 : -10}px)` },
  transitionProperty: "transform, opacity"
}), mn = {
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
    ...Ht("bottom"),
    common: { transformOrigin: "center center" }
  },
  "pop-bottom-left": {
    ...Ht("bottom"),
    common: { transformOrigin: "bottom left" }
  },
  "pop-bottom-right": {
    ...Ht("bottom"),
    common: { transformOrigin: "bottom right" }
  },
  "pop-top-left": {
    ...Ht("top"),
    common: { transformOrigin: "top left" }
  },
  "pop-top-right": {
    ...Ht("top"),
    common: { transformOrigin: "top right" }
  }
}, rs = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function Zd({
  transition: t,
  state: e,
  duration: n,
  timingFunction: r
}) {
  const o = {
    WebkitBackfaceVisibility: "hidden",
    willChange: "transform, opacity",
    transitionDuration: `${n}ms`,
    transitionTimingFunction: r
  };
  return typeof t == "string" ? t in mn ? {
    transitionProperty: mn[t].transitionProperty,
    ...o,
    ...mn[t].common,
    ...mn[t][rs[e]]
  } : {} : {
    transitionProperty: t.transitionProperty,
    ...o,
    ...t.common,
    ...t[rs[e]]
  };
}
function Hd({
  duration: t,
  exitDuration: e,
  timingFunction: n,
  mounted: r,
  onEnter: o,
  onExit: s,
  onEntered: i,
  onExited: a,
  enterDelay: c,
  exitDelay: l
}) {
  const d = Lt(), u = nc(), f = d.respectReducedMotion ? u : !1, [p, h] = G(f ? 0 : t), [m, g] = G(r ? "entered" : "exited"), w = J(-1), x = J(-1), v = J(-1);
  function b() {
    window.clearTimeout(w.current), window.clearTimeout(x.current), cancelAnimationFrame(v.current);
  }
  const S = (R) => {
    b();
    const k = R ? o : s, I = R ? i : a, E = f ? 0 : R ? t : e;
    h(E), E === 0 ? (typeof k == "function" && k(), typeof I == "function" && I(), g(R ? "entered" : "exited")) : v.current = requestAnimationFrame(() => {
      Vi.flushSync(() => {
        g(R ? "pre-entering" : "pre-exiting");
      }), v.current = requestAnimationFrame(() => {
        typeof k == "function" && k(), g(R ? "entering" : "exiting"), w.current = window.setTimeout(() => {
          typeof I == "function" && I(), g(R ? "entered" : "exited");
        }, E);
      });
    });
  }, C = (R) => {
    if (b(), typeof (R ? c : l) != "number") {
      S(R);
      return;
    }
    x.current = window.setTimeout(
      () => {
        S(R);
      },
      R ? c : l
    );
  };
  return Nt(() => {
    C(r);
  }, [r]), te(
    () => () => {
      b();
    },
    []
  ), {
    transitionDuration: p,
    transitionStatus: m,
    transitionTimingFunction: n || "ease"
  };
}
function Wn({
  keepMounted: t,
  transition: e = "fade",
  duration: n = 250,
  exitDuration: r = n,
  mounted: o,
  children: s,
  timingFunction: i = "ease",
  onExit: a,
  onEntered: c,
  onEnter: l,
  onExited: d,
  enterDelay: u,
  exitDelay: f
}) {
  const p = As(), { transitionDuration: h, transitionStatus: m, transitionTimingFunction: g } = Hd({
    mounted: o,
    exitDuration: r,
    duration: n,
    timingFunction: i,
    onExit: a,
    onEntered: c,
    onEnter: l,
    onExited: d,
    enterDelay: u,
    exitDelay: f
  });
  return h === 0 || p === "test" ? o ? /* @__PURE__ */ y(ht, { children: s({}) }) : t ? s({ display: "none" }) : null : m === "exited" ? t ? s({ display: "none" }) : null : /* @__PURE__ */ y(ht, { children: s(
    Zd({
      transition: e,
      duration: h,
      state: m,
      timingFunction: g
    })
  ) });
}
Wn.displayName = "@mantine/core/Transition";
const [Ud, ui] = rn(
  "Popover component was not found in the tree"
);
function Kr({
  children: t,
  active: e = !0,
  refProp: n = "ref",
  innerRef: r
}) {
  const o = Ja(e), s = Ae(o, r);
  return nn(t) ? tn(t, { [n]: s }) : t;
}
function fi(t) {
  return /* @__PURE__ */ y(Yr, { tabIndex: -1, "data-autofocus": !0, ...t });
}
Kr.displayName = "@mantine/core/FocusTrap";
fi.displayName = "@mantine/core/FocusTrapInitialFocus";
Kr.InitialFocus = fi;
var pi = { dropdown: "m_38a85659", arrow: "m_a31dc6c1", overlay: "m_3d7bc908" };
const Yd = {}, Jr = X((t, e) => {
  var g, w, x, v;
  const n = $("PopoverDropdown", Yd, t), {
    className: r,
    style: o,
    vars: s,
    children: i,
    onKeyDownCapture: a,
    variant: c,
    classNames: l,
    styles: d,
    ...u
  } = n, f = ui(), p = Ua({
    opened: f.opened,
    shouldReturnFocus: f.returnFocus
  }), h = f.withRoles ? {
    "aria-labelledby": f.getTargetId(),
    id: f.getDropdownId(),
    role: "dialog",
    tabIndex: -1
  } : {}, m = Ae(e, f.floating);
  return f.disabled ? null : /* @__PURE__ */ y(Gr, { ...f.portalProps, withinPortal: f.withinPortal, children: /* @__PURE__ */ y(
    Wn,
    {
      mounted: f.opened,
      ...f.transitionProps,
      transition: ((g = f.transitionProps) == null ? void 0 : g.transition) || "fade",
      duration: ((w = f.transitionProps) == null ? void 0 : w.duration) ?? 150,
      keepMounted: f.keepMounted,
      exitDuration: typeof ((x = f.transitionProps) == null ? void 0 : x.exitDuration) == "number" ? f.transitionProps.exitDuration : (v = f.transitionProps) == null ? void 0 : v.duration,
      children: (b) => /* @__PURE__ */ y(Kr, { active: f.trapFocus && f.opened, innerRef: m, children: /* @__PURE__ */ ie(
        H,
        {
          ...h,
          ...u,
          variant: c,
          onKeyDownCapture: Ba(
            () => {
              var S, C;
              (S = f.onClose) == null || S.call(f), (C = f.onDismiss) == null || C.call(f);
            },
            {
              active: f.closeOnEscape,
              onTrigger: p,
              onKeyDown: a
            }
          ),
          "data-position": f.placement,
          "data-fixed": f.floatingStrategy === "fixed" || void 0,
          ...f.getStyles("dropdown", {
            className: r,
            props: n,
            classNames: l,
            styles: d,
            style: [
              {
                ...b,
                zIndex: f.zIndex,
                top: f.y ?? 0,
                left: f.x ?? 0,
                width: f.width === "target" ? void 0 : se(f.width)
              },
              f.resolvedStyles.dropdown,
              d == null ? void 0 : d.dropdown,
              o
            ]
          }),
          children: [
            i,
            /* @__PURE__ */ y(
              ci,
              {
                ref: f.arrowRef,
                arrowX: f.arrowX,
                arrowY: f.arrowY,
                visible: f.withArrow,
                position: f.placement,
                arrowSize: f.arrowSize,
                arrowRadius: f.arrowRadius,
                arrowOffset: f.arrowOffset,
                arrowPosition: f.arrowPosition,
                ...f.getStyles("arrow", {
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
Jr.classes = pi;
Jr.displayName = "@mantine/core/PopoverDropdown";
const qd = {
  refProp: "ref",
  popupType: "dialog"
}, mi = X((t, e) => {
  const { children: n, refProp: r, popupType: o, ...s } = $(
    "PopoverTarget",
    qd,
    t
  );
  if (!nn(n))
    throw new Error(
      "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const i = s, a = ui(), c = Ae(a.reference, Rs(n), e), l = a.withRoles ? {
    "aria-haspopup": o,
    "aria-expanded": a.opened,
    "aria-controls": a.getDropdownId(),
    id: a.getTargetId()
  } : {};
  return tn(n, {
    ...i,
    ...l,
    ...a.targetProps,
    className: Qe(
      a.targetProps.className,
      i.className,
      n.props.className
    ),
    [r]: c,
    ...a.controlled ? null : { onClick: a.onToggle }
  });
});
mi.displayName = "@mantine/core/PopoverTarget";
function Xd({
  opened: t,
  floating: e,
  position: n,
  positionDependencies: r
}) {
  const [o, s] = G(0);
  te(() => {
    if (e.refs.reference.current && e.refs.floating.current && t)
      return Hl(
        e.refs.reference.current,
        e.refs.floating.current,
        e.update
      );
  }, [
    e.refs.reference.current,
    e.refs.floating.current,
    t,
    o,
    n
  ]), Nt(() => {
    e.update();
  }, r), Nt(() => {
    s((i) => i + 1);
  }, [t]);
}
function Gd(t) {
  if (t === void 0)
    return { shift: !0, flip: !0 };
  const e = { ...t };
  return t.shift === void 0 && (e.shift = !0), t.flip === void 0 && (e.flip = !0), e;
}
function Kd(t, e) {
  const n = Gd(t.middlewares), r = [rd(t.offset)];
  return n.shift && r.push(
    od(
      typeof n.shift == "boolean" ? { limiter: Xo(), padding: 5 } : { limiter: Xo(), padding: 5, ...n.shift }
    )
  ), n.flip && r.push(
    typeof n.flip == "boolean" ? Go() : Go(n.flip)
  ), n.inline && r.push(
    typeof n.inline == "boolean" ? Ko() : Ko(n.inline)
  ), r.push(id({ element: t.arrowRef, padding: t.arrowOffset })), (n.size || t.width === "target") && r.push(
    sd({
      ...typeof n.size == "boolean" ? {} : n.size,
      apply({ rects: o, availableWidth: s, availableHeight: i, ...a }) {
        var d;
        const l = ((d = e().refs.floating.current) == null ? void 0 : d.style) ?? {};
        n.size && (typeof n.size == "object" && n.size.apply ? n.size.apply({ rects: o, availableWidth: s, availableHeight: i, ...a }) : Object.assign(l, {
          maxWidth: `${s}px`,
          maxHeight: `${i}px`
        })), t.width === "target" && Object.assign(l, {
          width: `${o.reference.width}px`
        });
      }
    })
  ), r;
}
function Jd(t) {
  const [e, n] = Cn({
    value: t.opened,
    defaultValue: t.defaultOpened,
    finalValue: !1,
    onChange: t.onChange
  }), r = J(e), o = () => {
    e && !t.disabled && n(!1);
  }, s = () => !t.disabled && n(!e), i = _d({
    strategy: t.strategy,
    placement: t.position,
    middleware: Kd(t, () => i)
  });
  return Xd({
    opened: e,
    position: t.position,
    positionDependencies: t.positionDependencies || [],
    floating: i
  }), Nt(() => {
    var a;
    (a = t.onPositionChange) == null || a.call(t, i.placement);
  }, [i.placement]), Nt(() => {
    var a, c;
    e !== r.current && (e ? (c = t.onOpen) == null || c.call(t) : (a = t.onClose) == null || a.call(t)), r.current = e;
  }, [e, t.onClose, t.onOpen]), {
    floating: i,
    controlled: typeof t.opened == "boolean",
    opened: e,
    onClose: o,
    onToggle: s
  };
}
const Qd = {
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
  zIndex: _s("popover"),
  __staticSelector: "Popover",
  width: "max-content"
}, eu = (t, { radius: e, shadow: n }) => ({
  dropdown: {
    "--popover-radius": e === void 0 ? void 0 : it(e),
    "--popover-shadow": Ss(n)
  }
});
function at(t) {
  var qe, ut, un, fn, ge, Fe;
  const e = $("Popover", Qd, t), {
    children: n,
    position: r,
    offset: o,
    onPositionChange: s,
    positionDependencies: i,
    opened: a,
    transitionProps: c,
    onExitTransitionEnd: l,
    onEnterTransitionEnd: d,
    width: u,
    middlewares: f,
    withArrow: p,
    arrowSize: h,
    arrowOffset: m,
    arrowRadius: g,
    arrowPosition: w,
    unstyled: x,
    classNames: v,
    styles: b,
    closeOnClickOutside: S,
    withinPortal: C,
    portalProps: R,
    closeOnEscape: k,
    clickOutsideEvents: I,
    trapFocus: E,
    onClose: U,
    onDismiss: D,
    onOpen: V,
    onChange: F,
    zIndex: q,
    radius: N,
    shadow: M,
    id: P,
    defaultOpened: j,
    __staticSelector: ne,
    withRoles: ke,
    disabled: je,
    returnFocus: ae,
    variant: Ue,
    keepMounted: Te,
    vars: Ye,
    floatingStrategy: Re,
    withOverlay: ct,
    overlayProps: _e,
    ...lt
  } = e, wt = oe({
    name: ne,
    props: e,
    classes: pi,
    classNames: v,
    styles: b,
    unstyled: x,
    rootSelector: "dropdown",
    vars: Ye,
    varsResolver: eu
  }), { resolvedStyles: Ft } = $r({ classNames: v, styles: b, props: e }), Vt = J(null), [an, cn] = G(null), [Wt, tt] = G(null), { dir: dt } = Lr(), $e = In(P), le = Jd({
    middlewares: f,
    width: u,
    position: Md(dt, r),
    offset: typeof o == "number" ? o + (p ? h / 2 : 0) : o,
    arrowRef: Vt,
    arrowOffset: m,
    onPositionChange: s,
    positionDependencies: i,
    opened: a,
    defaultOpened: j,
    onChange: F,
    onOpen: V,
    onClose: U,
    onDismiss: D,
    strategy: Re,
    disabled: je
  });
  Va(
    () => {
      S && (le.onClose(), D == null || D());
    },
    I,
    [an, Wt]
  );
  const ve = Q(
    (pe) => {
      cn(pe), le.floating.refs.setReference(pe);
    },
    [le.floating.refs.setReference]
  ), ln = Q(
    (pe) => {
      tt(pe), le.floating.refs.setFloating(pe);
    },
    [le.floating.refs.setFloating]
  ), dn = Q(() => {
    var pe;
    (pe = c == null ? void 0 : c.onExited) == null || pe.call(c), l == null || l();
  }, [c == null ? void 0 : c.onExited, l]), Se = Q(() => {
    var pe;
    (pe = c == null ? void 0 : c.onEntered) == null || pe.call(c), d == null || d();
  }, [c == null ? void 0 : c.onEntered, d]);
  return /* @__PURE__ */ ie(
    Ud,
    {
      value: {
        returnFocus: ae,
        disabled: je,
        controlled: le.controlled,
        reference: ve,
        floating: ln,
        x: le.floating.x,
        y: le.floating.y,
        arrowX: (un = (ut = (qe = le.floating) == null ? void 0 : qe.middlewareData) == null ? void 0 : ut.arrow) == null ? void 0 : un.x,
        arrowY: (Fe = (ge = (fn = le.floating) == null ? void 0 : fn.middlewareData) == null ? void 0 : ge.arrow) == null ? void 0 : Fe.y,
        opened: le.opened,
        arrowRef: Vt,
        transitionProps: { ...c, onExited: dn, onEntered: Se },
        width: u,
        withArrow: p,
        arrowSize: h,
        arrowOffset: m,
        arrowRadius: g,
        arrowPosition: w,
        placement: le.floating.placement,
        trapFocus: E,
        withinPortal: C,
        portalProps: R,
        zIndex: q,
        radius: N,
        shadow: M,
        closeOnEscape: k,
        onDismiss: D,
        onClose: le.onClose,
        onToggle: le.onToggle,
        getTargetId: () => `${$e}-target`,
        getDropdownId: () => `${$e}-dropdown`,
        withRoles: ke,
        targetProps: lt,
        __staticSelector: ne,
        classNames: v,
        styles: b,
        unstyled: x,
        variant: Ue,
        keepMounted: Te,
        getStyles: wt,
        resolvedStyles: Ft,
        floatingStrategy: Re
      },
      children: [
        n,
        ct && /* @__PURE__ */ y(
          Wn,
          {
            transition: "fade",
            mounted: le.opened,
            duration: (c == null ? void 0 : c.duration) || 250,
            exitDuration: (c == null ? void 0 : c.exitDuration) || 250,
            children: (pe) => /* @__PURE__ */ y(Gr, { withinPortal: C, children: /* @__PURE__ */ y(
              Xr,
              {
                ..._e,
                ...wt("overlay", {
                  className: _e == null ? void 0 : _e.className,
                  style: [pe, _e == null ? void 0 : _e.style]
                })
              }
            ) })
          }
        )
      ]
    }
  );
}
at.Target = mi;
at.Dropdown = Jr;
at.displayName = "@mantine/core/Popover";
at.extend = (t) => t;
var De = { root: "m_5ae2e3c", barsLoader: "m_7a2bd4cd", bar: "m_870bb79", "bars-loader-animation": "m_5d2b3b9d", dotsLoader: "m_4e3f22d7", dot: "m_870c4af", "loader-dots-animation": "m_aac34a1", ovalLoader: "m_b34414df", "oval-loader-animation": "m_f8e89c4b" };
const hi = re(({ className: t, ...e }, n) => /* @__PURE__ */ ie(H, { component: "span", className: Qe(De.barsLoader, t), ...e, ref: n, children: [
  /* @__PURE__ */ y("span", { className: De.bar }),
  /* @__PURE__ */ y("span", { className: De.bar }),
  /* @__PURE__ */ y("span", { className: De.bar })
] }));
hi.displayName = "@mantine/core/Bars";
const gi = re(({ className: t, ...e }, n) => /* @__PURE__ */ ie(H, { component: "span", className: Qe(De.dotsLoader, t), ...e, ref: n, children: [
  /* @__PURE__ */ y("span", { className: De.dot }),
  /* @__PURE__ */ y("span", { className: De.dot }),
  /* @__PURE__ */ y("span", { className: De.dot })
] }));
gi.displayName = "@mantine/core/Dots";
const yi = re(({ className: t, ...e }, n) => /* @__PURE__ */ y(H, { component: "span", className: Qe(De.ovalLoader, t), ...e, ref: n }));
yi.displayName = "@mantine/core/Oval";
const vi = {
  bars: hi,
  oval: yi,
  dots: gi
}, tu = {
  loaders: vi,
  type: "oval"
}, nu = (t, { size: e, color: n }) => ({
  root: {
    "--loader-size": de(e, "loader-size"),
    "--loader-color": n ? At(n, t) : void 0
  }
}), Zn = X((t, e) => {
  const n = $("Loader", tu, t), {
    size: r,
    color: o,
    type: s,
    vars: i,
    className: a,
    style: c,
    classNames: l,
    styles: d,
    unstyled: u,
    loaders: f,
    variant: p,
    children: h,
    ...m
  } = n, g = oe({
    name: "Loader",
    props: n,
    classes: De,
    className: a,
    style: c,
    classNames: l,
    styles: d,
    unstyled: u,
    vars: i,
    varsResolver: nu
  });
  return h ? /* @__PURE__ */ y(H, { ...g("root"), ref: e, ...m, children: h }) : /* @__PURE__ */ y(
    H,
    {
      ...g("root"),
      ref: e,
      component: f[s],
      variant: p,
      size: r,
      ...m
    }
  );
});
Zn.defaultLoaders = vi;
Zn.classes = De;
Zn.displayName = "@mantine/core/Loader";
const bi = re(
  ({ size: t = "var(--cb-icon-size, 70%)", style: e, ...n }, r) => /* @__PURE__ */ y(
    "svg",
    {
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { ...e, width: t, height: t },
      ref: r,
      ...n,
      children: /* @__PURE__ */ y(
        "path",
        {
          d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd"
        }
      )
    }
  )
);
bi.displayName = "@mantine/core/CloseIcon";
var wi = { root: "m_86a44da5", "root--subtle": "m_220c80f2" };
const ru = {
  variant: "subtle"
}, ou = (t, { size: e, radius: n, iconSize: r }) => ({
  root: {
    "--cb-size": de(e, "cb-size"),
    "--cb-radius": n === void 0 ? void 0 : it(n),
    "--cb-icon-size": se(r)
  }
}), Qr = Be((t, e) => {
  const n = $("CloseButton", ru, t), {
    iconSize: r,
    children: o,
    vars: s,
    radius: i,
    className: a,
    classNames: c,
    style: l,
    styles: d,
    unstyled: u,
    "data-disabled": f,
    disabled: p,
    variant: h,
    icon: m,
    mod: g,
    __staticSelector: w,
    ...x
  } = n, v = oe({
    name: w || "CloseButton",
    props: n,
    className: a,
    style: l,
    classes: wi,
    classNames: c,
    styles: d,
    unstyled: u,
    vars: s,
    varsResolver: ou
  });
  return /* @__PURE__ */ ie(
    Vn,
    {
      ref: e,
      ...x,
      unstyled: u,
      variant: h,
      disabled: p,
      mod: [{ disabled: p || f }, g],
      ...v("root", { variant: h, active: !p && !f }),
      children: [
        m || /* @__PURE__ */ y(bi, {}),
        o
      ]
    }
  );
});
Qr.classes = wi;
Qr.displayName = "@mantine/core/CloseButton";
function su(t) {
  return us.toArray(t).filter(Boolean);
}
var xi = { root: "m_4081bf90" };
const iu = {
  preventGrowOverflow: !0,
  gap: "md",
  align: "center",
  justify: "flex-start",
  wrap: "wrap"
}, au = (t, { grow: e, preventGrowOverflow: n, gap: r, align: o, justify: s, wrap: i }, { childWidth: a }) => ({
  root: {
    "--group-child-width": e && n ? a : void 0,
    "--group-gap": En(r),
    "--group-align": o,
    "--group-justify": s,
    "--group-wrap": i
  }
}), Yt = X((t, e) => {
  const n = $("Group", iu, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    children: c,
    gap: l,
    align: d,
    justify: u,
    wrap: f,
    grow: p,
    preventGrowOverflow: h,
    vars: m,
    variant: g,
    __size: w,
    mod: x,
    ...v
  } = n, b = su(c), S = b.length, C = En(l ?? "md"), k = { childWidth: `calc(${100 / S}% - (${C} - ${C} / ${S}))` }, I = oe({
    name: "Group",
    props: n,
    stylesCtx: k,
    className: o,
    style: s,
    classes: xi,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: m,
    varsResolver: au
  });
  return /* @__PURE__ */ y(
    H,
    {
      ...I("root"),
      ref: e,
      variant: g,
      mod: [{ grow: p }, x],
      size: w,
      ...v,
      children: b
    }
  );
});
Yt.classes = xi;
Yt.displayName = "@mantine/core/Group";
const [cu, lu] = xs({
  size: "sm"
}), du = {}, _i = X((t, e) => {
  const n = $("InputClearButton", du, t), { size: r, variant: o, vars: s, classNames: i, styles: a, ...c } = n, l = lu(), { resolvedClassNames: d, resolvedStyles: u } = $r({
    classNames: i,
    styles: a,
    props: n
  });
  return /* @__PURE__ */ y(
    Qr,
    {
      variant: o || "transparent",
      ref: e,
      size: r || (l == null ? void 0 : l.size) || "sm",
      classNames: d,
      styles: u,
      __staticSelector: "InputClearButton",
      ...c
    }
  );
});
_i.displayName = "@mantine/core/InputClearButton";
const [uu, Hn] = xs({
  offsetBottom: !1,
  offsetTop: !1,
  describedBy: void 0,
  getStyles: null,
  inputId: void 0,
  labelId: void 0
});
var Oe = { wrapper: "m_6c018570", input: "m_8fb7ebe7", section: "m_82577fc2", placeholder: "m_88bacfd0", root: "m_46b77525", label: "m_8fdc1311", required: "m_78a94662", error: "m_8f816625", description: "m_fe47ce59" };
const os = {}, fu = (t, { size: e }) => ({
  description: {
    "--input-description-size": e === void 0 ? void 0 : `calc(${be(e)} - ${se(2)})`
  }
}), Un = X((t, e) => {
  const n = $("InputDescription", os, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: c,
    size: l,
    __staticSelector: d,
    __inheritStyles: u = !0,
    variant: f,
    ...p
  } = $("InputDescription", os, n), h = Hn(), m = oe({
    name: ["InputWrapper", d],
    props: n,
    classes: Oe,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    rootSelector: "description",
    vars: c,
    varsResolver: fu
  }), g = u && (h == null ? void 0 : h.getStyles) || m;
  return /* @__PURE__ */ y(
    H,
    {
      component: "p",
      ref: e,
      variant: f,
      size: l,
      ...g("description", h != null && h.getStyles ? { className: o, style: s } : void 0),
      ...p
    }
  );
});
Un.classes = Oe;
Un.displayName = "@mantine/core/InputDescription";
const pu = {}, mu = (t, { size: e }) => ({
  error: {
    "--input-error-size": e === void 0 ? void 0 : `calc(${be(e)} - ${se(2)})`
  }
}), Yn = X((t, e) => {
  const n = $("InputError", pu, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: c,
    size: l,
    __staticSelector: d,
    __inheritStyles: u = !0,
    variant: f,
    ...p
  } = n, h = oe({
    name: ["InputWrapper", d],
    props: n,
    classes: Oe,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    rootSelector: "error",
    vars: c,
    varsResolver: mu
  }), m = Hn(), g = u && (m == null ? void 0 : m.getStyles) || h;
  return /* @__PURE__ */ y(
    H,
    {
      component: "p",
      ref: e,
      variant: f,
      size: l,
      ...g("error", m != null && m.getStyles ? { className: o, style: s } : void 0),
      ...p
    }
  );
});
Yn.classes = Oe;
Yn.displayName = "@mantine/core/InputError";
const ss = {
  labelElement: "label"
}, hu = (t, { size: e }) => ({
  label: {
    "--input-label-size": be(e),
    "--input-asterisk-color": void 0
  }
}), qn = X((t, e) => {
  const n = $("InputLabel", ss, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: c,
    labelElement: l,
    size: d,
    required: u,
    htmlFor: f,
    onMouseDown: p,
    children: h,
    __staticSelector: m,
    variant: g,
    mod: w,
    ...x
  } = $("InputLabel", ss, n), v = oe({
    name: ["InputWrapper", m],
    props: n,
    classes: Oe,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    rootSelector: "label",
    vars: c,
    varsResolver: hu
  }), b = Hn(), S = (b == null ? void 0 : b.getStyles) || v;
  return /* @__PURE__ */ ie(
    H,
    {
      ...S("label", b != null && b.getStyles ? { className: o, style: s } : void 0),
      component: l,
      variant: g,
      size: d,
      ref: e,
      htmlFor: l === "label" ? f : void 0,
      mod: [{ required: u }, w],
      onMouseDown: (C) => {
        p == null || p(C), !C.defaultPrevented && C.detail > 1 && C.preventDefault();
      },
      ...x,
      children: [
        h,
        u && /* @__PURE__ */ y("span", { ...S("required"), "aria-hidden": !0, children: " *" })
      ]
    }
  );
});
qn.classes = Oe;
qn.displayName = "@mantine/core/InputLabel";
const is = {}, eo = X((t, e) => {
  const n = $("InputPlaceholder", is, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: c,
    __staticSelector: l,
    variant: d,
    error: u,
    mod: f,
    ...p
  } = $("InputPlaceholder", is, n), h = oe({
    name: ["InputPlaceholder", l],
    props: n,
    classes: Oe,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    rootSelector: "placeholder"
  });
  return /* @__PURE__ */ y(
    H,
    {
      ...h("placeholder"),
      mod: [{ error: !!u }, f],
      component: "span",
      variant: d,
      ref: e,
      ...p
    }
  );
});
eo.classes = Oe;
eo.displayName = "@mantine/core/InputPlaceholder";
function gu(t, { hasDescription: e, hasError: n }) {
  const r = t.findIndex((c) => c === "input"), o = t.slice(0, r), s = t.slice(r + 1), i = e && o.includes("description") || n && o.includes("error");
  return { offsetBottom: e && s.includes("description") || n && s.includes("error"), offsetTop: i };
}
const yu = {
  labelElement: "label",
  inputContainer: (t) => t,
  inputWrapperOrder: ["label", "description", "input", "error"]
}, vu = (t, { size: e }) => ({
  label: {
    "--input-label-size": be(e),
    "--input-asterisk-color": void 0
  },
  error: {
    "--input-error-size": e === void 0 ? void 0 : `calc(${be(e)} - ${se(2)})`
  },
  description: {
    "--input-description-size": e === void 0 ? void 0 : `calc(${be(e)} - ${se(2)})`
  }
}), to = X((t, e) => {
  const n = $("InputWrapper", yu, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: c,
    size: l,
    variant: d,
    __staticSelector: u,
    inputContainer: f,
    inputWrapperOrder: p,
    label: h,
    error: m,
    description: g,
    labelProps: w,
    descriptionProps: x,
    errorProps: v,
    labelElement: b,
    children: S,
    withAsterisk: C,
    id: R,
    required: k,
    __stylesApiProps: I,
    mod: E,
    ...U
  } = n, D = oe({
    name: ["InputWrapper", u],
    props: I || n,
    classes: Oe,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: vu
  }), V = {
    size: l,
    variant: d,
    __staticSelector: u
  }, F = In(R), q = typeof C == "boolean" ? C : k, N = (v == null ? void 0 : v.id) || `${F}-error`, M = (x == null ? void 0 : x.id) || `${F}-description`, P = F, j = !!m && typeof m != "boolean", ne = !!g, ke = `${j ? N : ""} ${ne ? M : ""}`, je = ke.trim().length > 0 ? ke.trim() : void 0, ae = (w == null ? void 0 : w.id) || `${F}-label`, Ue = h && /* @__PURE__ */ y(
    qn,
    {
      labelElement: b,
      id: ae,
      htmlFor: P,
      required: q,
      ...V,
      ...w,
      children: h
    },
    "label"
  ), Te = ne && /* @__PURE__ */ y(
    Un,
    {
      ...x,
      ...V,
      size: (x == null ? void 0 : x.size) || V.size,
      id: (x == null ? void 0 : x.id) || M,
      children: g
    },
    "description"
  ), Ye = /* @__PURE__ */ y(ls, { children: f(S) }, "input"), Re = j && /* @__PURE__ */ gn(
    Yn,
    {
      ...v,
      ...V,
      size: (v == null ? void 0 : v.size) || V.size,
      key: "error",
      id: (v == null ? void 0 : v.id) || N
    },
    m
  ), ct = p.map((_e) => {
    switch (_e) {
      case "label":
        return Ue;
      case "input":
        return Ye;
      case "description":
        return Te;
      case "error":
        return Re;
      default:
        return null;
    }
  });
  return /* @__PURE__ */ y(
    uu,
    {
      value: {
        getStyles: D,
        describedBy: je,
        inputId: P,
        labelId: ae,
        ...gu(p, { hasDescription: ne, hasError: j })
      },
      children: /* @__PURE__ */ y(
        H,
        {
          ref: e,
          variant: d,
          size: l,
          mod: [{ error: !!m }, E],
          ...D("root"),
          ...U,
          children: ct
        }
      )
    }
  );
});
to.classes = Oe;
to.displayName = "@mantine/core/InputWrapper";
const bu = {
  variant: "default",
  leftSectionPointerEvents: "none",
  rightSectionPointerEvents: "none",
  withAria: !0,
  withErrorStyles: !0
}, wu = (t, e, n) => ({
  wrapper: {
    "--input-margin-top": n.offsetTop ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
    "--input-margin-bottom": n.offsetBottom ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
    "--input-height": de(e.size, "input-height"),
    "--input-fz": be(e.size),
    "--input-radius": e.radius === void 0 ? void 0 : it(e.radius),
    "--input-left-section-width": e.leftSectionWidth !== void 0 ? se(e.leftSectionWidth) : void 0,
    "--input-right-section-width": e.rightSectionWidth !== void 0 ? se(e.rightSectionWidth) : void 0,
    "--input-padding-y": e.multiline ? de(e.size, "input-padding-y") : void 0,
    "--input-left-section-pointer-events": e.leftSectionPointerEvents,
    "--input-right-section-pointer-events": e.rightSectionPointerEvents
  }
}), we = Be((t, e) => {
  const n = $("Input", bu, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    required: c,
    __staticSelector: l,
    __stylesApiProps: d,
    size: u,
    wrapperProps: f,
    error: p,
    disabled: h,
    leftSection: m,
    leftSectionProps: g,
    leftSectionWidth: w,
    rightSection: x,
    rightSectionProps: v,
    rightSectionWidth: b,
    rightSectionPointerEvents: S,
    leftSectionPointerEvents: C,
    variant: R,
    vars: k,
    pointer: I,
    multiline: E,
    radius: U,
    id: D,
    withAria: V,
    withErrorStyles: F,
    mod: q,
    inputSize: N,
    __clearSection: M,
    __clearable: P,
    __defaultRightSection: j,
    ...ne
  } = n, { styleProps: ke, rest: je } = Ir(ne), ae = Hn(), Ue = { offsetBottom: ae == null ? void 0 : ae.offsetBottom, offsetTop: ae == null ? void 0 : ae.offsetTop }, Te = oe({
    name: ["Input", l],
    props: d || n,
    classes: Oe,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    stylesCtx: Ue,
    rootSelector: "wrapper",
    vars: k,
    varsResolver: wu
  }), Ye = V ? {
    required: c,
    disabled: h,
    "aria-invalid": !!p,
    "aria-describedby": ae == null ? void 0 : ae.describedBy,
    id: (ae == null ? void 0 : ae.inputId) || D
  } : {}, Re = x || P && M || j;
  return /* @__PURE__ */ y(cu, { value: { size: u || "sm" }, children: /* @__PURE__ */ ie(
    H,
    {
      ...Te("wrapper"),
      ...ke,
      ...f,
      mod: [
        {
          error: !!p && F,
          pointer: I,
          disabled: h,
          multiline: E,
          "data-with-right-section": !!Re,
          "data-with-left-section": !!m
        },
        q
      ],
      variant: R,
      size: u,
      children: [
        m && /* @__PURE__ */ y(
          "div",
          {
            ...g,
            "data-position": "left",
            ...Te("section", {
              className: g == null ? void 0 : g.className,
              style: g == null ? void 0 : g.style
            }),
            children: m
          }
        ),
        /* @__PURE__ */ y(
          H,
          {
            component: "input",
            ...je,
            ...Ye,
            ref: e,
            required: c,
            mod: { disabled: h, error: !!p && F },
            variant: R,
            __size: N,
            ...Te("input")
          }
        ),
        Re && /* @__PURE__ */ y(
          "div",
          {
            ...v,
            "data-position": "right",
            ...Te("section", {
              className: v == null ? void 0 : v.className,
              style: v == null ? void 0 : v.style
            }),
            children: Re
          }
        )
      ]
    }
  ) });
});
we.classes = Oe;
we.Wrapper = to;
we.Label = qn;
we.Error = Yn;
we.Description = Un;
we.Placeholder = eo;
we.ClearButton = _i;
we.displayName = "@mantine/core/Input";
function xu(t, e, n) {
  const r = $(t, e, n), {
    label: o,
    description: s,
    error: i,
    required: a,
    classNames: c,
    styles: l,
    className: d,
    unstyled: u,
    __staticSelector: f,
    __stylesApiProps: p,
    errorProps: h,
    labelProps: m,
    descriptionProps: g,
    wrapperProps: w,
    id: x,
    size: v,
    style: b,
    inputContainer: S,
    inputWrapperOrder: C,
    withAsterisk: R,
    variant: k,
    vars: I,
    mod: E,
    ...U
  } = r, { styleProps: D, rest: V } = Ir(U), F = {
    label: o,
    description: s,
    error: i,
    required: a,
    classNames: c,
    className: d,
    __staticSelector: f,
    __stylesApiProps: p || r,
    errorProps: h,
    labelProps: m,
    descriptionProps: g,
    unstyled: u,
    styles: l,
    size: v,
    style: b,
    inputContainer: S,
    inputWrapperOrder: C,
    withAsterisk: R,
    variant: k,
    id: x,
    mod: E,
    ...w
  };
  return {
    ...V,
    classNames: c,
    styles: l,
    unstyled: u,
    wrapperProps: { ...F, ...D },
    inputProps: {
      required: a,
      classNames: c,
      styles: l,
      unstyled: u,
      size: v,
      __staticSelector: f,
      __stylesApiProps: p || r,
      error: i,
      variant: k,
      id: x
    }
  };
}
const _u = {
  __staticSelector: "InputBase",
  withAria: !0
}, Bt = Be((t, e) => {
  const { inputProps: n, wrapperProps: r, ...o } = xu("InputBase", _u, t);
  return /* @__PURE__ */ y(we.Wrapper, { ...r, children: /* @__PURE__ */ y(we, { ...n, ...o, ref: e }) });
});
Bt.classes = { ...we.classes, ...we.Wrapper.classes };
Bt.displayName = "@mantine/core/InputBase";
var Si = { root: "m_b6d8b162" };
function Su(t) {
  if (t === "start")
    return "start";
  if (t === "end" || t)
    return "end";
}
const Cu = {
  inherit: !1
}, ku = (t, { variant: e, lineClamp: n, gradient: r, size: o, color: s }) => ({
  root: {
    "--text-fz": be(o),
    "--text-lh": ja(o),
    "--text-gradient": e === "gradient" ? wc(r, t) : void 0,
    "--text-line-clamp": typeof n == "number" ? n.toString() : void 0,
    "--text-color": s ? At(s, t) : void 0
  }
}), qt = Be((t, e) => {
  const n = $("Text", Cu, t), {
    lineClamp: r,
    truncate: o,
    inline: s,
    inherit: i,
    gradient: a,
    span: c,
    __staticSelector: l,
    vars: d,
    className: u,
    style: f,
    classNames: p,
    styles: h,
    unstyled: m,
    variant: g,
    mod: w,
    size: x,
    ...v
  } = n, b = oe({
    name: ["Text", l],
    props: n,
    classes: Si,
    className: u,
    style: f,
    classNames: p,
    styles: h,
    unstyled: m,
    vars: d,
    varsResolver: ku
  });
  return /* @__PURE__ */ y(
    H,
    {
      ...b("root", { focusable: !0 }),
      ref: e,
      component: c ? "span" : "p",
      variant: g,
      mod: [
        {
          "data-truncate": Su(o),
          "data-line-clamp": typeof r == "number",
          "data-inline": s,
          "data-inherit": i
        },
        w
      ],
      size: x,
      ...v
    }
  );
});
qt.classes = Si;
qt.displayName = "@mantine/core/Text";
function Ci(t) {
  return typeof t == "string" ? { value: t, label: t } : "value" in t && !("label" in t) ? { value: t.value, label: t.value, disabled: t.disabled } : typeof t == "number" ? { value: t.toString(), label: t.toString() } : "group" in t ? {
    group: t.group,
    items: t.items.map((e) => Ci(e))
  } : t;
}
function Tu(t) {
  return t ? t.map((e) => Ci(e)) : [];
}
function ki(t) {
  return t.reduce((e, n) => "group" in n ? { ...e, ...ki(n.items) } : (e[n.value] = n, e), {});
}
var xe = { dropdown: "m_88b62a41", search: "m_985517d8", options: "m_b2821a6e", option: "m_92253aa5", empty: "m_2530cd1d", header: "m_858f94bd", footer: "m_82b967cb", group: "m_254f3e4f", groupLabel: "m_2bb2e9e5", chevron: "m_2943220b", optionsDropdownOption: "m_390b5f4", optionsDropdownCheckIcon: "m_8ee53fc2" };
const Ru = {
  error: null
}, Nu = (t, { size: e, color: n }) => ({
  chevron: {
    "--combobox-chevron-size": de(e, "combobox-chevron-size"),
    "--combobox-chevron-color": n ? At(n, t) : void 0
  }
}), no = X((t, e) => {
  const n = $("ComboboxChevron", Ru, t), { size: r, error: o, style: s, className: i, classNames: a, styles: c, unstyled: l, vars: d, mod: u, ...f } = n, p = oe({
    name: "ComboboxChevron",
    classes: xe,
    props: n,
    style: s,
    className: i,
    classNames: a,
    styles: c,
    unstyled: l,
    vars: d,
    varsResolver: Nu,
    rootSelector: "chevron"
  });
  return /* @__PURE__ */ y(
    H,
    {
      component: "svg",
      ...f,
      ...p("chevron"),
      size: r,
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      mod: ["combobox-chevron", { error: o }, u],
      ref: e,
      children: /* @__PURE__ */ y(
        "path",
        {
          d: "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd"
        }
      )
    }
  );
});
no.classes = xe;
no.displayName = "@mantine/core/ComboboxChevron";
const [Au, Ee] = rn(
  "Combobox component was not found in tree"
), Ti = re(
  ({ size: t, onMouseDown: e, onClick: n, onClear: r, ...o }, s) => /* @__PURE__ */ y(
    we.ClearButton,
    {
      ref: s,
      tabIndex: -1,
      "aria-hidden": !0,
      ...o,
      onMouseDown: (i) => {
        i.preventDefault(), e == null || e(i);
      },
      onClick: (i) => {
        r(), n == null || n(i);
      }
    }
  )
);
Ti.displayName = "@mantine/core/ComboboxClearButton";
const Pu = {}, ro = X((t, e) => {
  const { classNames: n, styles: r, className: o, style: s, hidden: i, ...a } = $(
    "ComboboxDropdown",
    Pu,
    t
  ), c = Ee();
  return /* @__PURE__ */ y(
    at.Dropdown,
    {
      ...a,
      ref: e,
      role: "presentation",
      "data-hidden": i || void 0,
      ...c.getStyles("dropdown", { className: o, style: s, classNames: n, styles: r })
    }
  );
});
ro.classes = xe;
ro.displayName = "@mantine/core/ComboboxDropdown";
const Ou = {
  refProp: "ref"
}, Ri = X((t, e) => {
  const { children: n, refProp: r } = $("ComboboxDropdownTarget", Ou, t);
  if (Ee(), !nn(n))
    throw new Error(
      "Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  return /* @__PURE__ */ y(at.Target, { ref: e, refProp: r, children: n });
});
Ri.displayName = "@mantine/core/ComboboxDropdownTarget";
const Eu = {}, oo = X((t, e) => {
  const { classNames: n, className: r, style: o, styles: s, vars: i, ...a } = $(
    "ComboboxEmpty",
    Eu,
    t
  ), c = Ee();
  return /* @__PURE__ */ y(
    H,
    {
      ref: e,
      ...c.getStyles("empty", { className: r, classNames: n, styles: s, style: o }),
      ...a
    }
  );
});
oo.classes = xe;
oo.displayName = "@mantine/core/ComboboxEmpty";
function so({
  onKeyDown: t,
  withKeyboardNavigation: e,
  withAriaAttributes: n,
  withExpandedAttribute: r,
  targetType: o,
  autoComplete: s
}) {
  const i = Ee(), [a, c] = G(null), l = (u) => {
    if (t == null || t(u), !i.readOnly && e) {
      if (u.nativeEvent.isComposing)
        return;
      if (u.nativeEvent.code === "ArrowDown" && (u.preventDefault(), i.store.dropdownOpened ? c(i.store.selectNextOption()) : (i.store.openDropdown("keyboard"), c(i.store.selectActiveOption()), i.store.updateSelectedOptionIndex("selected", { scrollIntoView: !0 }))), u.nativeEvent.code === "ArrowUp" && (u.preventDefault(), i.store.dropdownOpened ? c(i.store.selectPreviousOption()) : (i.store.openDropdown("keyboard"), c(i.store.selectActiveOption()), i.store.updateSelectedOptionIndex("selected", { scrollIntoView: !0 }))), u.nativeEvent.code === "Enter" || u.nativeEvent.code === "NumpadEnter") {
        if (u.nativeEvent.keyCode === 229)
          return;
        const f = i.store.getSelectedOptionIndex();
        i.store.dropdownOpened && f !== -1 ? (u.preventDefault(), i.store.clickSelectedOption()) : o === "button" && (u.preventDefault(), i.store.openDropdown("keyboard"));
      }
      u.key === "Escape" && i.store.closeDropdown("keyboard"), u.nativeEvent.code === "Space" && o === "button" && (u.preventDefault(), i.store.toggleDropdown("keyboard"));
    }
  };
  return {
    ...n ? {
      "aria-haspopup": "listbox",
      "aria-expanded": r && !!(i.store.listId && i.store.dropdownOpened) || void 0,
      "aria-controls": i.store.dropdownOpened ? i.store.listId : void 0,
      "aria-activedescendant": i.store.dropdownOpened && a || void 0,
      autoComplete: s,
      "data-expanded": i.store.dropdownOpened || void 0,
      "data-mantine-stop-propagation": i.store.dropdownOpened || void 0
    } : {},
    onKeyDown: l
  };
}
const $u = {
  refProp: "ref",
  targetType: "input",
  withKeyboardNavigation: !0,
  withAriaAttributes: !0,
  withExpandedAttribute: !1,
  autoComplete: "off"
}, Ni = X((t, e) => {
  const {
    children: n,
    refProp: r,
    withKeyboardNavigation: o,
    withAriaAttributes: s,
    withExpandedAttribute: i,
    targetType: a,
    autoComplete: c,
    ...l
  } = $("ComboboxEventsTarget", $u, t);
  if (!nn(n))
    throw new Error(
      "Combobox.EventsTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const d = Ee(), u = so({
    targetType: a,
    withAriaAttributes: s,
    withKeyboardNavigation: o,
    withExpandedAttribute: i,
    onKeyDown: n.props.onKeyDown,
    autoComplete: c
  });
  return tn(n, {
    ...u,
    ...l,
    [r]: Ae(e, d.store.targetRef, Rs(n))
  });
});
Ni.displayName = "@mantine/core/ComboboxEventsTarget";
const Iu = {}, io = X((t, e) => {
  const { classNames: n, className: r, style: o, styles: s, vars: i, ...a } = $(
    "ComboboxFooter",
    Iu,
    t
  ), c = Ee();
  return /* @__PURE__ */ y(
    H,
    {
      ref: e,
      ...c.getStyles("footer", { className: r, classNames: n, style: o, styles: s }),
      ...a,
      onMouseDown: (l) => {
        l.preventDefault();
      }
    }
  );
});
io.classes = xe;
io.displayName = "@mantine/core/ComboboxFooter";
const Du = {}, ao = X((t, e) => {
  const { classNames: n, className: r, style: o, styles: s, vars: i, children: a, label: c, ...l } = $(
    "ComboboxGroup",
    Du,
    t
  ), d = Ee();
  return /* @__PURE__ */ ie(
    H,
    {
      ref: e,
      ...d.getStyles("group", { className: r, classNames: n, style: o, styles: s }),
      ...l,
      children: [
        c && /* @__PURE__ */ y("div", { ...d.getStyles("groupLabel", { classNames: n, styles: s }), children: c }),
        a
      ]
    }
  );
});
ao.classes = xe;
ao.displayName = "@mantine/core/ComboboxGroup";
const Lu = {}, co = X((t, e) => {
  const { classNames: n, className: r, style: o, styles: s, vars: i, ...a } = $(
    "ComboboxHeader",
    Lu,
    t
  ), c = Ee();
  return /* @__PURE__ */ y(
    H,
    {
      ref: e,
      ...c.getStyles("header", { className: r, classNames: n, style: o, styles: s }),
      ...a,
      onMouseDown: (l) => {
        l.preventDefault();
      }
    }
  );
});
co.classes = xe;
co.displayName = "@mantine/core/ComboboxHeader";
function Ai({
  value: t,
  valuesDivider: e = ",",
  ...n
}) {
  return /* @__PURE__ */ y(
    "input",
    {
      type: "hidden",
      value: Array.isArray(t) ? t.join(e) : t || "",
      ...n
    }
  );
}
Ai.displayName = "@mantine/core/ComboboxHiddenInput";
const Mu = {}, lo = X((t, e) => {
  const n = $("ComboboxOption", Mu, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    vars: a,
    onClick: c,
    id: l,
    active: d,
    onMouseDown: u,
    onMouseOver: f,
    disabled: p,
    selected: h,
    mod: m,
    ...g
  } = n, w = Ee(), x = ds(), v = l || x;
  return /* @__PURE__ */ y(
    H,
    {
      ...w.getStyles("option", { className: o, classNames: r, styles: i, style: s }),
      ...g,
      ref: e,
      id: v,
      mod: [
        "combobox-option",
        { "combobox-active": d, "combobox-disabled": p, "combobox-selected": h },
        m
      ],
      role: "option",
      onClick: (b) => {
        var S;
        p ? b.preventDefault() : ((S = w.onOptionSubmit) == null || S.call(w, n.value, n), c == null || c(b));
      },
      onMouseDown: (b) => {
        b.preventDefault(), u == null || u(b);
      },
      onMouseOver: (b) => {
        w.resetSelectionOnOptionHover && w.store.resetSelectedOption(), f == null || f(b);
      }
    }
  );
});
lo.classes = xe;
lo.displayName = "@mantine/core/ComboboxOption";
const zu = {}, uo = X((t, e) => {
  const n = $("ComboboxOptions", zu, t), { classNames: r, className: o, style: s, styles: i, id: a, onMouseDown: c, labelledBy: l, ...d } = n, u = Ee(), f = In(a);
  return te(() => {
    u.store.setListId(f);
  }, [f]), /* @__PURE__ */ y(
    H,
    {
      ref: e,
      ...u.getStyles("options", { className: o, style: s, classNames: r, styles: i }),
      ...d,
      id: f,
      role: "listbox",
      "aria-labelledby": l,
      onMouseDown: (p) => {
        p.preventDefault(), c == null || c(p);
      }
    }
  );
});
uo.classes = xe;
uo.displayName = "@mantine/core/ComboboxOptions";
const Bu = {
  withAriaAttributes: !0,
  withKeyboardNavigation: !0
}, fo = X((t, e) => {
  const n = $("ComboboxSearch", Bu, t), {
    classNames: r,
    styles: o,
    unstyled: s,
    vars: i,
    withAriaAttributes: a,
    onKeyDown: c,
    withKeyboardNavigation: l,
    size: d,
    ...u
  } = n, f = Ee(), p = f.getStyles("search"), h = so({
    targetType: "input",
    withAriaAttributes: a,
    withKeyboardNavigation: l,
    withExpandedAttribute: !1,
    onKeyDown: c,
    autoComplete: "off"
  });
  return /* @__PURE__ */ y(
    we,
    {
      ref: Ae(e, f.store.searchRef),
      classNames: [{ input: p.className }, r],
      styles: [{ input: p.style }, o],
      size: d || f.size,
      ...h,
      ...u,
      __staticSelector: "Combobox"
    }
  );
});
fo.classes = xe;
fo.displayName = "@mantine/core/ComboboxSearch";
const ju = {
  refProp: "ref",
  targetType: "input",
  withKeyboardNavigation: !0,
  withAriaAttributes: !0,
  withExpandedAttribute: !1,
  autoComplete: "off"
}, Pi = X((t, e) => {
  const {
    children: n,
    refProp: r,
    withKeyboardNavigation: o,
    withAriaAttributes: s,
    withExpandedAttribute: i,
    targetType: a,
    autoComplete: c,
    ...l
  } = $("ComboboxTarget", ju, t);
  if (!nn(n))
    throw new Error(
      "Combobox.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const d = Ee(), u = so({
    targetType: a,
    withAriaAttributes: s,
    withKeyboardNavigation: o,
    withExpandedAttribute: i,
    onKeyDown: n.props.onKeyDown,
    autoComplete: c
  }), f = tn(n, {
    ...u,
    ...l
  });
  return /* @__PURE__ */ y(at.Target, { ref: Ae(e, d.store.targetRef), children: f });
});
Pi.displayName = "@mantine/core/ComboboxTarget";
function Fu(t, e, n) {
  for (let r = t - 1; r >= 0; r -= 1)
    if (!e[r].hasAttribute("data-combobox-disabled"))
      return r;
  if (n) {
    for (let r = e.length - 1; r > -1; r -= 1)
      if (!e[r].hasAttribute("data-combobox-disabled"))
        return r;
  }
  return t;
}
function Vu(t, e, n) {
  for (let r = t + 1; r < e.length; r += 1)
    if (!e[r].hasAttribute("data-combobox-disabled"))
      return r;
  if (n) {
    for (let r = 0; r < e.length; r += 1)
      if (!e[r].hasAttribute("data-combobox-disabled"))
        return r;
  }
  return t;
}
function Wu(t) {
  for (let e = 0; e < t.length; e += 1)
    if (!t[e].hasAttribute("data-combobox-disabled"))
      return e;
  return -1;
}
function Oi({
  defaultOpened: t,
  opened: e,
  onOpenedChange: n,
  onDropdownClose: r,
  onDropdownOpen: o,
  loop: s = !0,
  scrollBehavior: i = "instant"
} = {}) {
  const [a, c] = Cn({
    value: e,
    defaultValue: t,
    finalValue: !1,
    onChange: n
  }), l = J(null), d = J(-1), u = J(null), f = J(null), p = J(-1), h = J(-1), m = J(-1), g = Q(
    (N = "unknown") => {
      a || (c(!0), o == null || o(N));
    },
    [c, o, a]
  ), w = Q(
    (N = "unknown") => {
      a && (c(!1), r == null || r(N));
    },
    [c, r, a]
  ), x = Q(
    (N = "unknown") => {
      a ? w(N) : g(N);
    },
    [w, g, a]
  ), v = Q(() => {
    const N = document.querySelector(`#${l.current} [data-combobox-selected]`);
    N == null || N.removeAttribute("data-combobox-selected"), N == null || N.removeAttribute("aria-selected");
  }, []), b = Q(
    (N) => {
      const M = document.getElementById(l.current), P = M == null ? void 0 : M.querySelectorAll("[data-combobox-option]");
      if (!P)
        return null;
      const j = N >= P.length ? 0 : N < 0 ? P.length - 1 : N;
      return d.current = j, P != null && P[j] && !P[j].hasAttribute("data-combobox-disabled") ? (v(), P[j].setAttribute("data-combobox-selected", "true"), P[j].setAttribute("aria-selected", "true"), P[j].scrollIntoView({ block: "nearest", behavior: i }), P[j].id) : null;
    },
    [i, v]
  ), S = Q(() => {
    const N = document.querySelector(
      `#${l.current} [data-combobox-active]`
    );
    if (N) {
      const M = document.querySelectorAll(
        `#${l.current} [data-combobox-option]`
      ), P = Array.from(M).findIndex((j) => j === N);
      return b(P);
    }
    return b(0);
  }, [b]), C = Q(
    () => b(
      Vu(
        d.current,
        document.querySelectorAll(`#${l.current} [data-combobox-option]`),
        s
      )
    ),
    [b, s]
  ), R = Q(
    () => b(
      Fu(
        d.current,
        document.querySelectorAll(`#${l.current} [data-combobox-option]`),
        s
      )
    ),
    [b, s]
  ), k = Q(
    () => b(
      Wu(
        document.querySelectorAll(`#${l.current} [data-combobox-option]`)
      )
    ),
    [b]
  ), I = Q(
    (N = "selected", M) => {
      m.current = window.setTimeout(() => {
        var ne;
        const P = document.querySelectorAll(
          `#${l.current} [data-combobox-option]`
        ), j = Array.from(P).findIndex(
          (ke) => ke.hasAttribute(`data-combobox-${N}`)
        );
        d.current = j, M != null && M.scrollIntoView && ((ne = P[j]) == null || ne.scrollIntoView({ block: "nearest", behavior: i }));
      }, 0);
    },
    []
  ), E = Q(() => {
    d.current = -1, v();
  }, [v]), U = Q(() => {
    const N = document.querySelectorAll(
      `#${l.current} [data-combobox-option]`
    ), M = N == null ? void 0 : N[d.current];
    M == null || M.click();
  }, []), D = Q((N) => {
    l.current = N;
  }, []), V = Q(() => {
    p.current = window.setTimeout(() => u.current.focus(), 0);
  }, []), F = Q(() => {
    h.current = window.setTimeout(() => f.current.focus(), 0);
  }, []), q = Q(() => d.current, []);
  return te(
    () => () => {
      window.clearTimeout(p.current), window.clearTimeout(h.current), window.clearTimeout(m.current);
    },
    []
  ), {
    dropdownOpened: a,
    openDropdown: g,
    closeDropdown: w,
    toggleDropdown: x,
    selectedOptionIndex: d.current,
    getSelectedOptionIndex: q,
    selectOption: b,
    selectFirstOption: k,
    selectActiveOption: S,
    selectNextOption: C,
    selectPreviousOption: R,
    resetSelectedOption: E,
    updateSelectedOptionIndex: I,
    listId: l.current,
    setListId: D,
    clickSelectedOption: U,
    searchRef: u,
    focusSearchInput: V,
    targetRef: f,
    focusTarget: F
  };
}
const Zu = {
  keepMounted: !0,
  withinPortal: !0,
  resetSelectionOnOptionHover: !1,
  width: "target",
  transitionProps: { transition: "fade", duration: 0 }
}, Hu = (t, { size: e, dropdownPadding: n }) => ({
  options: {
    "--combobox-option-fz": be(e),
    "--combobox-option-padding": de(e, "combobox-option-padding")
  },
  dropdown: {
    "--combobox-padding": n === void 0 ? void 0 : se(n),
    "--combobox-option-fz": be(e),
    "--combobox-option-padding": de(e, "combobox-option-padding")
  }
});
function ee(t) {
  const e = $("Combobox", Zu, t), {
    classNames: n,
    styles: r,
    unstyled: o,
    children: s,
    store: i,
    vars: a,
    onOptionSubmit: c,
    onClose: l,
    size: d,
    dropdownPadding: u,
    resetSelectionOnOptionHover: f,
    __staticSelector: p,
    readOnly: h,
    ...m
  } = e, g = Oi(), w = i || g, x = oe({
    name: p || "Combobox",
    classes: xe,
    props: e,
    classNames: n,
    styles: r,
    unstyled: o,
    vars: a,
    varsResolver: Hu
  }), v = () => {
    l == null || l(), w.closeDropdown();
  };
  return /* @__PURE__ */ y(
    Au,
    {
      value: {
        getStyles: x,
        store: w,
        onOptionSubmit: c,
        size: d,
        resetSelectionOnOptionHover: f,
        readOnly: h
      },
      children: /* @__PURE__ */ y(
        at,
        {
          opened: w.dropdownOpened,
          ...m,
          onChange: (b) => !b && v(),
          withRoles: !1,
          unstyled: o,
          children: s
        }
      )
    }
  );
}
const Uu = (t) => t;
ee.extend = Uu;
ee.classes = xe;
ee.displayName = "@mantine/core/Combobox";
ee.Target = Pi;
ee.Dropdown = ro;
ee.Options = uo;
ee.Option = lo;
ee.Search = fo;
ee.Empty = oo;
ee.Chevron = no;
ee.Footer = io;
ee.Header = co;
ee.EventsTarget = Ni;
ee.DropdownTarget = Ri;
ee.Group = ao;
ee.ClearButton = Ti;
ee.HiddenInput = Ai;
function Yu({ size: t, style: e, ...n }) {
  const r = t !== void 0 ? { width: se(t), height: se(t), ...e } : e;
  return /* @__PURE__ */ y(
    "svg",
    {
      viewBox: "0 0 10 7",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: r,
      "aria-hidden": !0,
      ...n,
      children: /* @__PURE__ */ y(
        "path",
        {
          d: "M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z",
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd"
        }
      )
    }
  );
}
function en(t) {
  return "group" in t;
}
function Ei({
  options: t,
  search: e,
  limit: n
}) {
  const r = e.trim().toLowerCase(), o = [];
  for (let s = 0; s < t.length; s += 1) {
    const i = t[s];
    if (o.length === n)
      return o;
    en(i) && o.push({
      group: i.group,
      items: Ei({
        options: i.items,
        search: e,
        limit: n - o.length
      })
    }), en(i) || i.label.toLowerCase().includes(r) && o.push(i);
  }
  return o;
}
function qu(t) {
  if (t.length === 0)
    return !0;
  for (const e of t)
    if (!("group" in e) || e.items.length > 0)
      return !1;
  return !0;
}
function $i(t, e = /* @__PURE__ */ new Set()) {
  if (Array.isArray(t))
    for (const n of t)
      if (en(n))
        $i(n.items, e);
      else {
        if (typeof n.value > "u")
          throw new Error("[@mantine/core] Each option must have value property");
        if (typeof n.value != "string")
          throw new Error(
            `[@mantine/core] Option value must be a string, other data formats are not supported, got ${typeof n.value}`
          );
        if (e.has(n.value))
          throw new Error(
            `[@mantine/core] Duplicate options are not supported. Option with value "${n.value}" was provided more than once`
          );
        e.add(n.value);
      }
}
function Xu(t, e) {
  return Array.isArray(t) ? t.includes(e) : t === e;
}
function Ii({
  data: t,
  withCheckIcon: e,
  value: n,
  checkIconPosition: r,
  unstyled: o,
  renderOption: s
}) {
  if (!en(t)) {
    const a = Xu(n, t.value), c = e && a && /* @__PURE__ */ y(Yu, { className: xe.optionsDropdownCheckIcon }), l = /* @__PURE__ */ ie(ht, { children: [
      r === "left" && c,
      /* @__PURE__ */ y("span", { children: t.label }),
      r === "right" && c
    ] });
    return /* @__PURE__ */ y(
      ee.Option,
      {
        value: t.value,
        disabled: t.disabled,
        className: Qe({ [xe.optionsDropdownOption]: !o }),
        "data-reverse": r === "right" || void 0,
        "data-checked": a || void 0,
        "aria-selected": a,
        active: a,
        children: typeof s == "function" ? s({ option: t, checked: a }) : l
      }
    );
  }
  const i = t.items.map((a) => /* @__PURE__ */ y(
    Ii,
    {
      data: a,
      value: n,
      unstyled: o,
      withCheckIcon: e,
      checkIconPosition: r,
      renderOption: s
    },
    a.value
  ));
  return /* @__PURE__ */ y(ee.Group, { label: t.group, children: i });
}
function Gu({
  data: t,
  hidden: e,
  hiddenWhenEmpty: n,
  filter: r,
  search: o,
  limit: s,
  maxDropdownHeight: i,
  withScrollArea: a = !0,
  filterOptions: c = !0,
  withCheckIcon: l = !1,
  value: d,
  checkIconPosition: u,
  nothingFoundMessage: f,
  unstyled: p,
  labelId: h,
  renderOption: m,
  scrollAreaProps: g,
  "aria-label": w
}) {
  $i(t);
  const v = typeof o == "string" ? (r || Ei)({
    options: t,
    search: c ? o : "",
    limit: s ?? 1 / 0
  }) : t, b = qu(v), S = v.map((C) => /* @__PURE__ */ y(
    Ii,
    {
      data: C,
      withCheckIcon: l,
      value: d,
      checkIconPosition: u,
      unstyled: p,
      renderOption: m
    },
    en(C) ? C.group : C.value
  ));
  return /* @__PURE__ */ y(ee.Dropdown, { hidden: e || n && b, "data-composed": !0, children: /* @__PURE__ */ ie(ee.Options, { labelledBy: h, "aria-label": w, children: [
    a ? /* @__PURE__ */ y(
      sn.Autosize,
      {
        mah: i ?? 220,
        type: "scroll",
        scrollbarSize: "var(--combobox-padding)",
        offsetScrollbars: "y",
        ...g,
        children: S
      }
    ) : S,
    b && f && /* @__PURE__ */ y(ee.Empty, { children: f })
  ] }) });
}
var Di = { root: "m_347db0ec", "root--dot": "m_fbd81e3d", label: "m_5add502a", section: "m_91fdda9b" };
const Ku = {}, Ju = (t, { radius: e, color: n, gradient: r, variant: o, size: s, autoContrast: i }) => {
  const a = t.variantColorResolver({
    color: n || t.primaryColor,
    theme: t,
    gradient: r,
    variant: o || "filled",
    autoContrast: i
  });
  return {
    root: {
      "--badge-height": de(s, "badge-height"),
      "--badge-padding-x": de(s, "badge-padding-x"),
      "--badge-fz": de(s, "badge-fz"),
      "--badge-radius": e === void 0 ? void 0 : it(e),
      "--badge-bg": n || o ? a.background : void 0,
      "--badge-color": n || o ? a.color : void 0,
      "--badge-bd": n || o ? a.border : void 0,
      "--badge-dot-color": o === "dot" ? At(n, t) : void 0
    }
  };
}, po = Be((t, e) => {
  const n = $("Badge", Ku, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: c,
    radius: l,
    color: d,
    gradient: u,
    leftSection: f,
    rightSection: p,
    children: h,
    variant: m,
    fullWidth: g,
    autoContrast: w,
    circle: x,
    mod: v,
    ...b
  } = n, S = oe({
    name: "Badge",
    props: n,
    classes: Di,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: Ju
  });
  return /* @__PURE__ */ ie(
    H,
    {
      variant: m,
      mod: [
        {
          block: g,
          circle: x,
          "with-right-section": !!p,
          "with-left-section": !!f
        },
        v
      ],
      ...S("root", { variant: m }),
      ref: e,
      ...b,
      children: [
        f && /* @__PURE__ */ y("span", { ...S("section"), "data-position": "left", children: f }),
        /* @__PURE__ */ y("span", { ...S("label"), children: h }),
        p && /* @__PURE__ */ y("span", { ...S("section"), "data-position": "right", children: p })
      ]
    }
  );
});
po.classes = Di;
po.displayName = "@mantine/core/Badge";
var jt = { root: "m_77c9d27d", inner: "m_80f1301b", label: "m_811560b9", section: "m_a74036a", loader: "m_a25b86ee", group: "m_80d6d844", groupSection: "m_70be2a01" };
const as = {
  orientation: "horizontal"
}, Qu = (t, { borderWidth: e }) => ({
  group: { "--button-border-width": se(e) }
}), mo = X((t, e) => {
  const n = $("ButtonGroup", as, t), {
    className: r,
    style: o,
    classNames: s,
    styles: i,
    unstyled: a,
    orientation: c,
    vars: l,
    borderWidth: d,
    variant: u,
    mod: f,
    ...p
  } = $("ButtonGroup", as, t), h = oe({
    name: "ButtonGroup",
    props: n,
    classes: jt,
    className: r,
    style: o,
    classNames: s,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: Qu,
    rootSelector: "group"
  });
  return /* @__PURE__ */ y(
    H,
    {
      ...h("group"),
      ref: e,
      variant: u,
      mod: [{ "data-orientation": c }, f],
      role: "group",
      ...p
    }
  );
});
mo.classes = jt;
mo.displayName = "@mantine/core/ButtonGroup";
const cs = {}, ef = (t, { radius: e, color: n, gradient: r, variant: o, autoContrast: s, size: i }) => {
  const a = t.variantColorResolver({
    color: n || t.primaryColor,
    theme: t,
    gradient: r,
    variant: o || "filled",
    autoContrast: s
  });
  return {
    groupSection: {
      "--section-height": de(i, "section-height"),
      "--section-padding-x": de(i, "section-padding-x"),
      "--section-fz": i != null && i.includes("compact") ? be(i.replace("compact-", "")) : be(i),
      "--section-radius": e === void 0 ? void 0 : it(e),
      "--section-bg": n || o ? a.background : void 0,
      "--section-color": a.color,
      "--section-bd": n || o ? a.border : void 0
    }
  };
}, ho = X((t, e) => {
  const n = $("ButtonGroupSection", cs, t), {
    className: r,
    style: o,
    classNames: s,
    styles: i,
    unstyled: a,
    vars: c,
    variant: l,
    gradient: d,
    radius: u,
    autoContrast: f,
    ...p
  } = $("ButtonGroupSection", cs, t), h = oe({
    name: "ButtonGroupSection",
    props: n,
    classes: jt,
    className: r,
    style: o,
    classNames: s,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: ef,
    rootSelector: "groupSection"
  });
  return /* @__PURE__ */ y(H, { ...h("groupSection"), ref: e, variant: l, ...p });
});
ho.classes = jt;
ho.displayName = "@mantine/core/ButtonGroupSection";
const tf = {
  in: { opacity: 1, transform: `translate(-50%, calc(-50% + ${se(1)}))` },
  out: { opacity: 0, transform: "translate(-50%, -200%)" },
  common: { transformOrigin: "center" },
  transitionProperty: "transform, opacity"
}, nf = {}, rf = (t, { radius: e, color: n, gradient: r, variant: o, size: s, justify: i, autoContrast: a }) => {
  const c = t.variantColorResolver({
    color: n || t.primaryColor,
    theme: t,
    gradient: r,
    variant: o || "filled",
    autoContrast: a
  });
  return {
    root: {
      "--button-justify": i,
      "--button-height": de(s, "button-height"),
      "--button-padding-x": de(s, "button-padding-x"),
      "--button-fz": s != null && s.includes("compact") ? be(s.replace("compact-", "")) : be(s),
      "--button-radius": e === void 0 ? void 0 : it(e),
      "--button-bg": n || o ? c.background : void 0,
      "--button-hover": n || o ? c.hover : void 0,
      "--button-color": c.color,
      "--button-bd": n || o ? c.border : void 0,
      "--button-hover-color": n || o ? c.hoverColor : void 0
    }
  };
}, $t = Be((t, e) => {
  const n = $("Button", nf, t), {
    style: r,
    vars: o,
    className: s,
    color: i,
    disabled: a,
    children: c,
    leftSection: l,
    rightSection: d,
    fullWidth: u,
    variant: f,
    radius: p,
    loading: h,
    loaderProps: m,
    gradient: g,
    classNames: w,
    styles: x,
    unstyled: v,
    "data-disabled": b,
    autoContrast: S,
    mod: C,
    ...R
  } = n, k = oe({
    name: "Button",
    props: n,
    classes: jt,
    className: s,
    style: r,
    classNames: w,
    styles: x,
    unstyled: v,
    vars: o,
    varsResolver: rf
  }), I = !!l, E = !!d;
  return /* @__PURE__ */ ie(
    Vn,
    {
      ref: e,
      ...k("root", { active: !a && !h && !b }),
      unstyled: v,
      variant: f,
      disabled: a || h,
      mod: [
        {
          disabled: a || b,
          loading: h,
          block: u,
          "with-left-section": I,
          "with-right-section": E
        },
        C
      ],
      ...R,
      children: [
        /* @__PURE__ */ y(Wn, { mounted: !!h, transition: tf, duration: 150, children: (U) => /* @__PURE__ */ y(H, { component: "span", ...k("loader", { style: U }), "aria-hidden": !0, children: /* @__PURE__ */ y(
          Zn,
          {
            color: "var(--button-color)",
            size: "calc(var(--button-height) / 1.8)",
            ...m
          }
        ) }) }),
        /* @__PURE__ */ ie("span", { ...k("inner"), children: [
          l && /* @__PURE__ */ y(H, { component: "span", ...k("section"), mod: { position: "left" }, children: l }),
          /* @__PURE__ */ y(H, { component: "span", mod: { loading: h }, ...k("label"), children: c }),
          d && /* @__PURE__ */ y(H, { component: "span", ...k("section"), mod: { position: "right" }, children: d })
        ] })
      ]
    }
  );
});
$t.classes = jt;
$t.displayName = "@mantine/core/Button";
$t.Group = mo;
$t.GroupSection = ho;
const [of, sf] = rn(
  "Card component was not found in tree"
);
var go = { root: "m_e615b15f", section: "m_599a2148" };
const af = {}, Xn = Be((t, e) => {
  const n = $("CardSection", af, t), { classNames: r, className: o, style: s, styles: i, vars: a, withBorder: c, inheritPadding: l, mod: d, ...u } = n, f = sf();
  return /* @__PURE__ */ y(
    H,
    {
      ref: e,
      mod: [{ "with-border": c, "inherit-padding": l }, d],
      ...f.getStyles("section", { className: o, style: s, styles: i, classNames: r }),
      ...u
    }
  );
});
Xn.classes = go;
Xn.displayName = "@mantine/core/CardSection";
const cf = {}, lf = (t, { padding: e }) => ({
  root: {
    "--card-padding": En(e)
  }
}), Gn = Be((t, e) => {
  const n = $("Card", cf, t), { classNames: r, className: o, style: s, styles: i, unstyled: a, vars: c, children: l, padding: d, ...u } = n, f = oe({
    name: "Card",
    props: n,
    classes: go,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: lf
  }), p = us.toArray(l), h = p.map((m, g) => typeof m == "object" && m && "type" in m && m.type === Xn ? tn(m, {
    "data-first-section": g === 0 || void 0,
    "data-last-section": g === p.length - 1 || void 0
  }) : m);
  return /* @__PURE__ */ y(of, { value: { getStyles: f }, children: /* @__PURE__ */ y(qr, { ref: e, unstyled: a, ...f("root"), ...u, children: h }) });
});
Gn.classes = go;
Gn.displayName = "@mantine/core/Card";
Gn.Section = Xn;
const df = {
  searchable: !1,
  withCheckIcon: !0,
  allowDeselect: !0,
  checkIconPosition: "left"
}, Pn = X((t, e) => {
  const n = $("Select", df, t), {
    classNames: r,
    styles: o,
    unstyled: s,
    vars: i,
    dropdownOpened: a,
    defaultDropdownOpened: c,
    onDropdownClose: l,
    onDropdownOpen: d,
    onFocus: u,
    onBlur: f,
    onClick: p,
    onChange: h,
    data: m,
    value: g,
    defaultValue: w,
    selectFirstOptionOnChange: x,
    onOptionSubmit: v,
    comboboxProps: b,
    readOnly: S,
    disabled: C,
    filter: R,
    limit: k,
    withScrollArea: I,
    maxDropdownHeight: E,
    size: U,
    searchable: D,
    rightSection: V,
    checkIconPosition: F,
    withCheckIcon: q,
    nothingFoundMessage: N,
    name: M,
    form: P,
    searchValue: j,
    defaultSearchValue: ne,
    onSearchChange: ke,
    allowDeselect: je,
    error: ae,
    rightSectionPointerEvents: Ue,
    id: Te,
    clearable: Ye,
    clearButtonProps: Re,
    hiddenInputProps: ct,
    renderOption: _e,
    onClear: lt,
    autoComplete: wt,
    scrollAreaProps: Ft,
    __defaultRightSection: Vt,
    __clearSection: an,
    __clearable: cn,
    chevronColor: Wt,
    ...tt
  } = n, dt = Gt(() => Tu(m), [m]), $e = Gt(() => ki(dt), [dt]), le = In(Te), [ve, ln, dn] = Cn({
    value: g,
    defaultValue: w,
    finalValue: null,
    onChange: h
  }), Se = typeof ve == "string" ? $e[ve] : void 0, qe = rc(Se), [ut, un, fn] = Cn({
    value: j,
    defaultValue: ne,
    finalValue: Se ? Se.label : "",
    onChange: ke
  }), ge = Oi({
    opened: a,
    defaultOpened: c,
    onDropdownOpen: () => {
      d == null || d(), ge.updateSelectedOptionIndex("active", { scrollIntoView: !0 });
    },
    onDropdownClose: () => {
      l == null || l(), ge.resetSelectedOption();
    }
  }), Fe = (fe) => {
    un(fe), ge.resetSelectedOption();
  }, { resolvedClassNames: pe, resolvedStyles: bo } = $r({
    props: n,
    styles: o,
    classNames: r
  });
  te(() => {
    x && ge.selectFirstOption();
  }, [x, ut]), te(() => {
    g === null && Fe(""), typeof g == "string" && Se && ((qe == null ? void 0 : qe.value) !== Se.value || (qe == null ? void 0 : qe.label) !== Se.label) && Fe(Se.label);
  }, [g, Se]), te(() => {
    var fe;
    !dn && !fn && Fe(typeof ve == "string" && ((fe = $e[ve]) == null ? void 0 : fe.label) || "");
  }, [m, ve]);
  const Bi = /* @__PURE__ */ y(
    ee.ClearButton,
    {
      ...Re,
      onClear: () => {
        ln(null, null), Fe(""), lt == null || lt();
      }
    }
  ), wo = Ye && !!ve && !C && !S;
  return /* @__PURE__ */ ie(ht, { children: [
    /* @__PURE__ */ ie(
      ee,
      {
        store: ge,
        __staticSelector: "Select",
        classNames: pe,
        styles: bo,
        unstyled: s,
        readOnly: S,
        onOptionSubmit: (fe) => {
          v == null || v(fe);
          const Xe = je && $e[fe].value === ve ? null : $e[fe], Kn = Xe ? Xe.value : null;
          Kn !== ve && ln(Kn, Xe), !dn && Fe(typeof Kn == "string" && (Xe == null ? void 0 : Xe.label) || ""), ge.closeDropdown();
        },
        size: U,
        ...b,
        children: [
          /* @__PURE__ */ y(ee.Target, { targetType: D ? "input" : "button", autoComplete: wt, children: /* @__PURE__ */ y(
            Bt,
            {
              id: le,
              ref: e,
              __defaultRightSection: /* @__PURE__ */ y(
                ee.Chevron,
                {
                  size: U,
                  error: ae,
                  unstyled: s,
                  color: Wt
                }
              ),
              __clearSection: Bi,
              __clearable: wo,
              rightSection: V,
              rightSectionPointerEvents: Ue || (wo ? "all" : "none"),
              ...tt,
              size: U,
              __staticSelector: "Select",
              disabled: C,
              readOnly: S || !D,
              value: ut,
              onChange: (fe) => {
                Fe(fe.currentTarget.value), ge.openDropdown(), x && ge.selectFirstOption();
              },
              onFocus: (fe) => {
                D && ge.openDropdown(), u == null || u(fe);
              },
              onBlur: (fe) => {
                var Xe;
                D && ge.closeDropdown(), Fe(ve != null && ((Xe = $e[ve]) == null ? void 0 : Xe.label) || ""), f == null || f(fe);
              },
              onClick: (fe) => {
                D ? ge.openDropdown() : ge.toggleDropdown(), p == null || p(fe);
              },
              classNames: pe,
              styles: bo,
              unstyled: s,
              pointer: !D,
              error: ae
            }
          ) }),
          /* @__PURE__ */ y(
            Gu,
            {
              data: dt,
              hidden: S || C,
              filter: R,
              search: ut,
              limit: k,
              hiddenWhenEmpty: !N,
              withScrollArea: I,
              maxDropdownHeight: E,
              filterOptions: D && (Se == null ? void 0 : Se.label) !== ut,
              value: ve,
              checkIconPosition: F,
              withCheckIcon: q,
              nothingFoundMessage: N,
              unstyled: s,
              labelId: tt.label ? `${le}-label` : void 0,
              "aria-label": tt.label ? void 0 : tt["aria-label"],
              renderOption: _e,
              scrollAreaProps: Ft
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ y(
      ee.HiddenInput,
      {
        value: ve,
        name: M,
        form: P,
        disabled: C,
        ...ct
      }
    )
  ] });
});
Pn.classes = { ...Bt.classes, ...ee.classes };
Pn.displayName = "@mantine/core/Select";
var Li = { root: "m_6d731127" };
const uf = {
  gap: "md",
  align: "stretch",
  justify: "flex-start"
}, ff = (t, { gap: e, align: n, justify: r }) => ({
  root: {
    "--stack-gap": En(e),
    "--stack-align": n,
    "--stack-justify": r
  }
}), Xt = X((t, e) => {
  const n = $("Stack", uf, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: c,
    align: l,
    justify: d,
    gap: u,
    variant: f,
    ...p
  } = n, h = oe({
    name: "Stack",
    props: n,
    classes: Li,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: ff
  });
  return /* @__PURE__ */ y(H, { ref: e, ...h("root"), variant: f, ...p });
});
Xt.classes = Li;
Xt.displayName = "@mantine/core/Stack";
const pf = {}, yo = X((t, e) => {
  const n = $("TextInput", pf, t);
  return /* @__PURE__ */ y(Bt, { component: "input", ref: e, ...n, __staticSelector: "TextInput" });
});
yo.classes = Bt.classes;
yo.displayName = "@mantine/core/TextInput";
const mf = ["h1", "h2", "h3", "h4", "h5", "h6"], hf = ["xs", "sm", "md", "lg", "xl"];
function gf(t, e) {
  const n = e !== void 0 ? e : `h${t}`;
  return mf.includes(n) ? {
    fontSize: `var(--mantine-${n}-font-size)`,
    fontWeight: `var(--mantine-${n}-font-weight)`,
    lineHeight: `var(--mantine-${n}-line-height)`
  } : hf.includes(n) ? {
    fontSize: `var(--mantine-font-size-${n})`,
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  } : {
    fontSize: se(n),
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  };
}
var Mi = { root: "m_8a5d1357" };
const yf = {
  order: 1
}, vf = (t, { order: e, size: n, lineClamp: r, textWrap: o }) => {
  const s = gf(e, n);
  return {
    root: {
      "--title-fw": s.fontWeight,
      "--title-lh": s.lineHeight,
      "--title-fz": s.fontSize,
      "--title-line-clamp": typeof r == "number" ? r.toString() : void 0,
      "--title-text-wrap": o
    }
  };
}, vo = X((t, e) => {
  const n = $("Title", yf, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    order: c,
    vars: l,
    size: d,
    variant: u,
    lineClamp: f,
    textWrap: p,
    mod: h,
    ...m
  } = n, g = oe({
    name: "Title",
    props: n,
    classes: Mi,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: vf
  });
  return [1, 2, 3, 4, 5, 6].includes(c) ? /* @__PURE__ */ y(
    H,
    {
      ...g("root"),
      component: `h${c}`,
      variant: u,
      ref: e,
      mod: [{ order: c, "data-line-clamp": typeof f == "number" }, h],
      size: d,
      ...m
    }
  ) : null;
});
vo.classes = Mi;
vo.displayName = "@mantine/core/Title";
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var bf = {
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
const zi = (t, e, n, r) => {
  const o = re(
    ({ color: s = "currentColor", size: i = 24, stroke: a = 2, title: c, className: l, children: d, ...u }, f) => gn(
      "svg",
      {
        ref: f,
        ...bf[t],
        width: i,
        height: i,
        className: ["tabler-icon", `tabler-icon-${e}`, l].join(" "),
        strokeWidth: a,
        stroke: s,
        ...u
      },
      [
        c && gn("title", { key: "svg-title" }, c),
        ...r.map(([p, h]) => gn(p, h)),
        ...Array.isArray(d) ? d : [d]
      ]
    )
  );
  return o.displayName = `${n}`, o;
};
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wf = [["path", { d: "M12 5l0 14", key: "svg-0" }], ["path", { d: "M5 12l14 0", key: "svg-1" }]], xf = zi("outline", "plus", "Plus", wf);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _f = [["path", { d: "M4 7l16 0", key: "svg-0" }], ["path", { d: "M10 11l0 6", key: "svg-1" }], ["path", { d: "M14 11l0 6", key: "svg-2" }], ["path", { d: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12", key: "svg-3" }], ["path", { d: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3", key: "svg-4" }]], Sf = zi("outline", "trash", "Trash", _f), Cf = {
  tasks: [],
  loading: !1,
  error: null,
  filter: "all"
};
function kf(t, e) {
  switch (e.type) {
    case "SET_TASKS":
      return { ...t, tasks: e.tasks, loading: !1 };
    case "ADD_TASK":
      return { ...t, tasks: [e.task, ...t.tasks] };
    case "UPDATE_TASK":
      return {
        ...t,
        tasks: t.tasks.map(
          (n) => n.id === e.task.id ? e.task : n
        )
      };
    case "REMOVE_TASK":
      return {
        ...t,
        tasks: t.tasks.filter((n) => n.id !== e.taskId)
      };
    case "SET_LOADING":
      return { ...t, loading: e.loading };
    case "SET_ERROR":
      return { ...t, error: e.error, loading: !1 };
    case "SET_FILTER":
      return { ...t, filter: e.filter };
    default:
      return t;
  }
}
const ar = {}, Tf = typeof import.meta < "u" && (ar == null ? void 0 : ar.PUBLIC_API_URL) || "http://localhost:3001/api/v1";
function Rf() {
  return typeof localStorage > "u" ? null : localStorage.getItem("fpp_token");
}
async function hn(t, e) {
  const n = Rf(), r = await fetch(`${Tf}${t}`, {
    ...e,
    headers: {
      "Content-Type": "application/json",
      ...n ? { Authorization: `Bearer ${n}` } : {},
      ...e == null ? void 0 : e.headers
    }
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
function Nf() {
  const [t, e] = ji(kf, Cf), [n, r] = G(""), o = J(null), { can: s } = Sa(), i = Ca(), a = s("tasks:write"), c = s("tasks:delete"), l = Q(async () => {
    e({ type: "SET_LOADING", loading: !0 });
    try {
      const m = await hn("/tasks");
      e({ type: "SET_TASKS", tasks: m.data });
    } catch (m) {
      e({
        type: "SET_ERROR",
        error: m instanceof Error ? m.message : "Failed to load"
      });
    }
  }, []);
  te(() => {
    l();
  }, [l]);
  const d = Q(async () => {
    var m;
    if (!(!n.trim() || !a))
      try {
        const g = await hn("/tasks", {
          method: "POST",
          body: JSON.stringify({ title: n })
        });
        e({ type: "ADD_TASK", task: g.data }), i("task.created", {
          taskId: g.data.id,
          title: g.data.title,
          userId: g.data.userId
        }), r(""), (m = o.current) == null || m.focus();
      } catch (g) {
        e({
          type: "SET_ERROR",
          error: g instanceof Error ? g.message : "Create failed"
        });
      }
  }, [n, a]), u = Q(
    async (m) => {
      if (c)
        try {
          await hn(`/tasks/${m}`, { method: "DELETE" }), e({ type: "REMOVE_TASK", taskId: m }), i("task.deleted", { taskId: m });
        } catch (g) {
          e({
            type: "SET_ERROR",
            error: g instanceof Error ? g.message : "Delete failed"
          });
        }
    },
    [c]
  ), f = Q(
    async (m, g) => {
      if (a)
        try {
          const w = await hn(`/tasks/${m.id}`, {
            method: "PATCH",
            body: JSON.stringify({ status: g })
          });
          e({ type: "UPDATE_TASK", task: w.data }), i("task.updated", {
            taskId: m.id,
            changes: { status: g }
          });
        } catch (w) {
          e({
            type: "SET_ERROR",
            error: w instanceof Error ? w.message : "Update failed"
          });
        }
    },
    [a]
  ), p = Gt(() => t.filter === "all" ? t.tasks : t.tasks.filter((m) => m.status === t.filter), [t.tasks, t.filter]), h = (m) => {
    switch (m) {
      case "done":
        return "green";
      case "in_progress":
        return "blue";
      default:
        return "gray";
    }
  };
  return /* @__PURE__ */ ie(Xt, { gap: "lg", children: [
    /* @__PURE__ */ y(vo, { order: 2, children: "Tasks" }),
    t.error && /* @__PURE__ */ y(qt, { c: "red", size: "sm", children: t.error }),
    a && /* @__PURE__ */ ie(Yt, { children: [
      /* @__PURE__ */ y(
        yo,
        {
          ref: o,
          placeholder: "New task title...",
          value: n,
          onChange: (m) => r(m.currentTarget.value),
          onKeyDown: (m) => m.key === "Enter" && void d(),
          style: { flex: 1 }
        }
      ),
      /* @__PURE__ */ y($t, { leftSection: /* @__PURE__ */ y(xf, { size: 16 }), onClick: () => void d(), children: "Add Task" })
    ] }),
    /* @__PURE__ */ y(
      Pn,
      {
        label: "Filter",
        value: t.filter,
        onChange: (m) => e({ type: "SET_FILTER", filter: m ?? "all" }),
        data: [
          { value: "all", label: "All" },
          { value: "todo", label: "To Do" },
          { value: "in_progress", label: "In Progress" },
          { value: "done", label: "Done" }
        ],
        w: 200
      }
    ),
    /* @__PURE__ */ ie(Xt, { gap: "sm", children: [
      p.map((m) => /* @__PURE__ */ y(Gn, { withBorder: !0, padding: "md", children: /* @__PURE__ */ ie(Yt, { justify: "space-between", children: [
        /* @__PURE__ */ ie(Xt, { gap: 4, children: [
          /* @__PURE__ */ y(qt, { fw: 500, children: m.title }),
          /* @__PURE__ */ y(po, { size: "sm", color: h(m.status), variant: "light", children: m.status.replace("_", " ") })
        ] }),
        /* @__PURE__ */ ie(Yt, { children: [
          a && /* @__PURE__ */ y(
            Pn,
            {
              size: "xs",
              value: m.status,
              onChange: (g) => g && void f(m, g),
              data: [
                { value: "todo", label: "To Do" },
                { value: "in_progress", label: "In Progress" },
                { value: "done", label: "Done" }
              ],
              w: 130
            }
          ),
          c && /* @__PURE__ */ y(
            $t,
            {
              size: "xs",
              color: "red",
              variant: "subtle",
              onClick: () => void u(m.id),
              children: /* @__PURE__ */ y(Sf, { size: 14 })
            }
          )
        ] })
      ] }) }, m.id)),
      p.length === 0 && !t.loading && /* @__PURE__ */ y(qt, { c: "dimmed", ta: "center", py: "xl", children: "No tasks yet. Create one above." })
    ] })
  ] });
}
xa({
  manifest: Da,
  routes: [
    {
      path: "/plugins/com.fpp.task-manager/tasks",
      component: Nf,
      label: "Tasks",
      permission: "tasks:read"
    }
  ],
  menuItems: [
    {
      label: "Tasks",
      path: "/plugins/com.fpp.task-manager/tasks",
      icon: "checklist",
      order: 10
    }
  ],
  widgets: []
});
