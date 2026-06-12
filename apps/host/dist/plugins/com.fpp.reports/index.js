import { jsx as h, jsxs as ae, Fragment as it } from "react/jsx-runtime";
import * as Z from "react";
import cr, { createContext as Mt, useContext as zt, useMemo as vn, useCallback as ee, Fragment as ms, useRef as J, useEffect as te, useState as G, useLayoutEffect as Rr, useId as hs, forwardRef as oe, cloneElement as nn, Children as gs, createElement as hn } from "react";
import * as Xi from "react-dom";
import Gi, { createPortal as Ki } from "react-dom";
const Ji = [
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
], Qi = [
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
var To;
(function(t) {
  t.mergeShapes = (e, n) => ({
    ...e,
    ...n
    // second overwrites first
  });
})(To || (To = {}));
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
]), rt = (t) => {
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
class Je extends Error {
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
    if (!(e instanceof Je))
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
Je.create = (t) => new Je(t);
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
let ea = lr;
function ta() {
  return ea;
}
const na = (t) => {
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
function R(t, e) {
  const n = ta(), r = na({
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
class ve {
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
    return ve.mergeObjectSync(e, r);
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
}), Gt = (t) => ({ status: "dirty", value: t }), Ae = (t) => ({ status: "valid", value: t }), Ro = (t) => t.status === "aborted", No = (t) => t.status === "dirty", Rt = (t) => t.status === "valid", bn = (t) => typeof Promise < "u" && t instanceof Promise;
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
const Ao = (t, e) => {
  if (Rt(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const n = new Je(t.common.issues);
      return this._error = n, this._error;
    }
  };
};
function H(t) {
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
    return rt(e.data);
  }
  _getOrReturnCtx(e, n) {
    return n || {
      common: e.parent.common,
      data: e.data,
      parsedType: rt(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new ve(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: rt(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const n = this._parse(e);
    if (bn(n))
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
      parsedType: rt(e)
    }, o = this._parseSync({ data: e, path: r.path, parent: r });
    return Ao(r, o);
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
      parsedType: rt(e)
    };
    if (!this["~standard"].async)
      try {
        const s = this._parseSync({ data: e, path: [], parent: n });
        return Rt(s) ? {
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
    return this._parseAsync({ data: e, path: [], parent: n }).then((s) => Rt(s) ? {
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
      parsedType: rt(e)
    }, o = this._parse({ data: e, path: r.path, parent: r }), s = await (bn(o) ? o : Promise.resolve(o));
    return Ao(r, s);
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
    return new Pt({
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
    return ot.create(this, this._def);
  }
  nullable() {
    return Ot.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Ve.create(this);
  }
  promise() {
    return Cn.create(this, this._def);
  }
  or(e) {
    return xn.create([this, e], this._def);
  }
  and(e) {
    return _n.create(this, e, this._def);
  }
  transform(e) {
    return new Pt({
      ...H(this._def),
      schema: this,
      typeName: L.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const n = typeof e == "function" ? e : () => e;
    return new fr({
      ...H(this._def),
      innerType: this,
      defaultValue: n,
      typeName: L.ZodDefault
    });
  }
  brand() {
    return new ka({
      typeName: L.ZodBranded,
      type: this,
      ...H(this._def)
    });
  }
  catch(e) {
    const n = typeof e == "function" ? e : () => e;
    return new pr({
      ...H(this._def),
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
    return Nr.create(this, e);
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
const ra = /^c[^\s-]{8,}$/i, oa = /^[0-9a-z]+$/, sa = /^[0-9A-HJKMNP-TV-Z]{26}$/i, ia = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, aa = /^[a-z0-9_-]{21}$/i, ca = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, la = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, da = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, ua = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Kn;
const fa = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, pa = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, ma = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, ha = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, ga = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, ya = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, ys = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", va = new RegExp(`^${ys}$`);
function vs(t) {
  let e = "[0-5]\\d";
  t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`);
  const n = t.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${n}`;
}
function ba(t) {
  return new RegExp(`^${vs(t)}$`);
}
function wa(t) {
  let e = `${ys}T${vs(t)}`;
  const n = [];
  return n.push(t.local ? "Z?" : "Z"), t.offset && n.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${n.join("|")})`, new RegExp(`^${e}$`);
}
function xa(t, e) {
  return !!((e === "v4" || !e) && fa.test(t) || (e === "v6" || !e) && ma.test(t));
}
function _a(t, e) {
  if (!ca.test(t))
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
function Sa(t, e) {
  return !!((e === "v4" || !e) && pa.test(t) || (e === "v6" || !e) && ha.test(t));
}
class Ke extends Y {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== A.string) {
      const s = this._getOrReturnCtx(e);
      return R(s, {
        code: _.invalid_type,
        expected: A.string,
        received: s.parsedType
      }), B;
    }
    const r = new ve();
    let o;
    for (const s of this._def.checks)
      if (s.kind === "min")
        e.data.length < s.value && (o = this._getOrReturnCtx(e, o), R(o, {
          code: _.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), r.dirty());
      else if (s.kind === "max")
        e.data.length > s.value && (o = this._getOrReturnCtx(e, o), R(o, {
          code: _.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), r.dirty());
      else if (s.kind === "length") {
        const i = e.data.length > s.value, a = e.data.length < s.value;
        (i || a) && (o = this._getOrReturnCtx(e, o), i ? R(o, {
          code: _.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }) : a && R(o, {
          code: _.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }), r.dirty());
      } else if (s.kind === "email")
        da.test(e.data) || (o = this._getOrReturnCtx(e, o), R(o, {
          validation: "email",
          code: _.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "emoji")
        Kn || (Kn = new RegExp(ua, "u")), Kn.test(e.data) || (o = this._getOrReturnCtx(e, o), R(o, {
          validation: "emoji",
          code: _.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "uuid")
        ia.test(e.data) || (o = this._getOrReturnCtx(e, o), R(o, {
          validation: "uuid",
          code: _.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "nanoid")
        aa.test(e.data) || (o = this._getOrReturnCtx(e, o), R(o, {
          validation: "nanoid",
          code: _.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "cuid")
        ra.test(e.data) || (o = this._getOrReturnCtx(e, o), R(o, {
          validation: "cuid",
          code: _.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "cuid2")
        oa.test(e.data) || (o = this._getOrReturnCtx(e, o), R(o, {
          validation: "cuid2",
          code: _.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "ulid")
        sa.test(e.data) || (o = this._getOrReturnCtx(e, o), R(o, {
          validation: "ulid",
          code: _.invalid_string,
          message: s.message
        }), r.dirty());
      else if (s.kind === "url")
        try {
          new URL(e.data);
        } catch {
          o = this._getOrReturnCtx(e, o), R(o, {
            validation: "url",
            code: _.invalid_string,
            message: s.message
          }), r.dirty();
        }
      else s.kind === "regex" ? (s.regex.lastIndex = 0, s.regex.test(e.data) || (o = this._getOrReturnCtx(e, o), R(o, {
        validation: "regex",
        code: _.invalid_string,
        message: s.message
      }), r.dirty())) : s.kind === "trim" ? e.data = e.data.trim() : s.kind === "includes" ? e.data.includes(s.value, s.position) || (o = this._getOrReturnCtx(e, o), R(o, {
        code: _.invalid_string,
        validation: { includes: s.value, position: s.position },
        message: s.message
      }), r.dirty()) : s.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : s.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : s.kind === "startsWith" ? e.data.startsWith(s.value) || (o = this._getOrReturnCtx(e, o), R(o, {
        code: _.invalid_string,
        validation: { startsWith: s.value },
        message: s.message
      }), r.dirty()) : s.kind === "endsWith" ? e.data.endsWith(s.value) || (o = this._getOrReturnCtx(e, o), R(o, {
        code: _.invalid_string,
        validation: { endsWith: s.value },
        message: s.message
      }), r.dirty()) : s.kind === "datetime" ? wa(s).test(e.data) || (o = this._getOrReturnCtx(e, o), R(o, {
        code: _.invalid_string,
        validation: "datetime",
        message: s.message
      }), r.dirty()) : s.kind === "date" ? va.test(e.data) || (o = this._getOrReturnCtx(e, o), R(o, {
        code: _.invalid_string,
        validation: "date",
        message: s.message
      }), r.dirty()) : s.kind === "time" ? ba(s).test(e.data) || (o = this._getOrReturnCtx(e, o), R(o, {
        code: _.invalid_string,
        validation: "time",
        message: s.message
      }), r.dirty()) : s.kind === "duration" ? la.test(e.data) || (o = this._getOrReturnCtx(e, o), R(o, {
        validation: "duration",
        code: _.invalid_string,
        message: s.message
      }), r.dirty()) : s.kind === "ip" ? xa(e.data, s.version) || (o = this._getOrReturnCtx(e, o), R(o, {
        validation: "ip",
        code: _.invalid_string,
        message: s.message
      }), r.dirty()) : s.kind === "jwt" ? _a(e.data, s.alg) || (o = this._getOrReturnCtx(e, o), R(o, {
        validation: "jwt",
        code: _.invalid_string,
        message: s.message
      }), r.dirty()) : s.kind === "cidr" ? Sa(e.data, s.version) || (o = this._getOrReturnCtx(e, o), R(o, {
        validation: "cidr",
        code: _.invalid_string,
        message: s.message
      }), r.dirty()) : s.kind === "base64" ? ga.test(e.data) || (o = this._getOrReturnCtx(e, o), R(o, {
        validation: "base64",
        code: _.invalid_string,
        message: s.message
      }), r.dirty()) : s.kind === "base64url" ? ya.test(e.data) || (o = this._getOrReturnCtx(e, o), R(o, {
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
    return new Ke({
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
    return new Ke({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Ke({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Ke({
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
Ke.create = (t) => new Ke({
  checks: [],
  typeName: L.ZodString,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...H(t)
});
function Ca(t, e) {
  const n = (t.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, o = n > r ? n : r, s = Number.parseInt(t.toFixed(o).replace(".", "")), i = Number.parseInt(e.toFixed(o).replace(".", ""));
  return s % i / 10 ** o;
}
class Nt extends Y {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== A.number) {
      const s = this._getOrReturnCtx(e);
      return R(s, {
        code: _.invalid_type,
        expected: A.number,
        received: s.parsedType
      }), B;
    }
    let r;
    const o = new ve();
    for (const s of this._def.checks)
      s.kind === "int" ? K.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), R(r, {
        code: _.invalid_type,
        expected: "integer",
        received: "float",
        message: s.message
      }), o.dirty()) : s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (r = this._getOrReturnCtx(e, r), R(r, {
        code: _.too_small,
        minimum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), o.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (r = this._getOrReturnCtx(e, r), R(r, {
        code: _.too_big,
        maximum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), o.dirty()) : s.kind === "multipleOf" ? Ca(e.data, s.value) !== 0 && (r = this._getOrReturnCtx(e, r), R(r, {
        code: _.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), o.dirty()) : s.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), R(r, {
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
    return new Nt({
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
    return new Nt({
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
Nt.create = (t) => new Nt({
  checks: [],
  typeName: L.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...H(t)
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
    const o = new ve();
    for (const s of this._def.checks)
      s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (r = this._getOrReturnCtx(e, r), R(r, {
        code: _.too_small,
        type: "bigint",
        minimum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), o.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (r = this._getOrReturnCtx(e, r), R(r, {
        code: _.too_big,
        type: "bigint",
        maximum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), o.dirty()) : s.kind === "multipleOf" ? e.data % s.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), R(r, {
        code: _.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), o.dirty()) : K.assertNever(s);
    return { status: o.value, value: e.data };
  }
  _getInvalidInput(e) {
    const n = this._getOrReturnCtx(e);
    return R(n, {
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
  ...H(t)
});
class Po extends Y {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== A.boolean) {
      const r = this._getOrReturnCtx(e);
      return R(r, {
        code: _.invalid_type,
        expected: A.boolean,
        received: r.parsedType
      }), B;
    }
    return Ae(e.data);
  }
}
Po.create = (t) => new Po({
  typeName: L.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...H(t)
});
class wn extends Y {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== A.date) {
      const s = this._getOrReturnCtx(e);
      return R(s, {
        code: _.invalid_type,
        expected: A.date,
        received: s.parsedType
      }), B;
    }
    if (Number.isNaN(e.data.getTime())) {
      const s = this._getOrReturnCtx(e);
      return R(s, {
        code: _.invalid_date
      }), B;
    }
    const r = new ve();
    let o;
    for (const s of this._def.checks)
      s.kind === "min" ? e.data.getTime() < s.value && (o = this._getOrReturnCtx(e, o), R(o, {
        code: _.too_small,
        message: s.message,
        inclusive: !0,
        exact: !1,
        minimum: s.value,
        type: "date"
      }), r.dirty()) : s.kind === "max" ? e.data.getTime() > s.value && (o = this._getOrReturnCtx(e, o), R(o, {
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
    return new wn({
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
wn.create = (t) => new wn({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: L.ZodDate,
  ...H(t)
});
class Oo extends Y {
  _parse(e) {
    if (this._getType(e) !== A.symbol) {
      const r = this._getOrReturnCtx(e);
      return R(r, {
        code: _.invalid_type,
        expected: A.symbol,
        received: r.parsedType
      }), B;
    }
    return Ae(e.data);
  }
}
Oo.create = (t) => new Oo({
  typeName: L.ZodSymbol,
  ...H(t)
});
class $o extends Y {
  _parse(e) {
    if (this._getType(e) !== A.undefined) {
      const r = this._getOrReturnCtx(e);
      return R(r, {
        code: _.invalid_type,
        expected: A.undefined,
        received: r.parsedType
      }), B;
    }
    return Ae(e.data);
  }
}
$o.create = (t) => new $o({
  typeName: L.ZodUndefined,
  ...H(t)
});
class Eo extends Y {
  _parse(e) {
    if (this._getType(e) !== A.null) {
      const r = this._getOrReturnCtx(e);
      return R(r, {
        code: _.invalid_type,
        expected: A.null,
        received: r.parsedType
      }), B;
    }
    return Ae(e.data);
  }
}
Eo.create = (t) => new Eo({
  typeName: L.ZodNull,
  ...H(t)
});
class Io extends Y {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return Ae(e.data);
  }
}
Io.create = (t) => new Io({
  typeName: L.ZodAny,
  ...H(t)
});
class dr extends Y {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return Ae(e.data);
  }
}
dr.create = (t) => new dr({
  typeName: L.ZodUnknown,
  ...H(t)
});
class at extends Y {
  _parse(e) {
    const n = this._getOrReturnCtx(e);
    return R(n, {
      code: _.invalid_type,
      expected: A.never,
      received: n.parsedType
    }), B;
  }
}
at.create = (t) => new at({
  typeName: L.ZodNever,
  ...H(t)
});
class Do extends Y {
  _parse(e) {
    if (this._getType(e) !== A.undefined) {
      const r = this._getOrReturnCtx(e);
      return R(r, {
        code: _.invalid_type,
        expected: A.void,
        received: r.parsedType
      }), B;
    }
    return Ae(e.data);
  }
}
Do.create = (t) => new Do({
  typeName: L.ZodVoid,
  ...H(t)
});
class Ve extends Y {
  _parse(e) {
    const { ctx: n, status: r } = this._processInputParams(e), o = this._def;
    if (n.parsedType !== A.array)
      return R(n, {
        code: _.invalid_type,
        expected: A.array,
        received: n.parsedType
      }), B;
    if (o.exactLength !== null) {
      const i = n.data.length > o.exactLength.value, a = n.data.length < o.exactLength.value;
      (i || a) && (R(n, {
        code: i ? _.too_big : _.too_small,
        minimum: a ? o.exactLength.value : void 0,
        maximum: i ? o.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: o.exactLength.message
      }), r.dirty());
    }
    if (o.minLength !== null && n.data.length < o.minLength.value && (R(n, {
      code: _.too_small,
      minimum: o.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: o.minLength.message
    }), r.dirty()), o.maxLength !== null && n.data.length > o.maxLength.value && (R(n, {
      code: _.too_big,
      maximum: o.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: o.maxLength.message
    }), r.dirty()), n.common.async)
      return Promise.all([...n.data].map((i, a) => o.type._parseAsync(new Ze(n, i, n.path, a)))).then((i) => ve.mergeArray(r, i));
    const s = [...n.data].map((i, a) => o.type._parseSync(new Ze(n, i, n.path, a)));
    return ve.mergeArray(r, s);
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
  ...H(e)
});
function kt(t) {
  if (t instanceof le) {
    const e = {};
    for (const n in t.shape) {
      const r = t.shape[n];
      e[n] = ot.create(kt(r));
    }
    return new le({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof Ve ? new Ve({
    ...t._def,
    type: kt(t.element)
  }) : t instanceof ot ? ot.create(kt(t.unwrap())) : t instanceof Ot ? Ot.create(kt(t.unwrap())) : t instanceof vt ? vt.create(t.items.map((e) => kt(e))) : t;
}
class le extends Y {
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
      return R(l, {
        code: _.invalid_type,
        expected: A.object,
        received: l.parsedType
      }), B;
    }
    const { status: r, ctx: o } = this._processInputParams(e), { shape: s, keys: i } = this._getCached(), a = [];
    if (!(this._def.catchall instanceof at && this._def.unknownKeys === "strip"))
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
    if (this._def.catchall instanceof at) {
      const l = this._def.unknownKeys;
      if (l === "passthrough")
        for (const d of a)
          c.push({
            key: { status: "valid", value: d },
            value: { status: "valid", value: o.data[d] }
          });
      else if (l === "strict")
        a.length > 0 && (R(o, {
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
    }).then((l) => ve.mergeObjectSync(r, l)) : ve.mergeObjectSync(r, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return O.errToObj, new le({
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
    return new le({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new le({
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
    return new le({
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
    return new le({
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
    return new le({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const n = {};
    for (const r of K.objectKeys(e))
      e[r] && this.shape[r] && (n[r] = this.shape[r]);
    return new le({
      ...this._def,
      shape: () => n
    });
  }
  omit(e) {
    const n = {};
    for (const r of K.objectKeys(this.shape))
      e[r] || (n[r] = this.shape[r]);
    return new le({
      ...this._def,
      shape: () => n
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return kt(this);
  }
  partial(e) {
    const n = {};
    for (const r of K.objectKeys(this.shape)) {
      const o = this.shape[r];
      e && !e[r] ? n[r] = o : n[r] = o.optional();
    }
    return new le({
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
        for (; s instanceof ot; )
          s = s._def.innerType;
        n[r] = s;
      }
    return new le({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return bs(K.objectKeys(this.shape));
  }
}
le.create = (t, e) => new le({
  shape: () => t,
  unknownKeys: "strip",
  catchall: at.create(),
  typeName: L.ZodObject,
  ...H(e)
});
le.strictCreate = (t, e) => new le({
  shape: () => t,
  unknownKeys: "strict",
  catchall: at.create(),
  typeName: L.ZodObject,
  ...H(e)
});
le.lazycreate = (t, e) => new le({
  shape: t,
  unknownKeys: "strip",
  catchall: at.create(),
  typeName: L.ZodObject,
  ...H(e)
});
class xn extends Y {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = this._def.options;
    function o(s) {
      for (const a of s)
        if (a.result.status === "valid")
          return a.result;
      for (const a of s)
        if (a.result.status === "dirty")
          return n.common.issues.push(...a.ctx.common.issues), a.result;
      const i = s.map((a) => new Je(a.ctx.common.issues));
      return R(n, {
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
      const a = i.map((c) => new Je(c));
      return R(n, {
        code: _.invalid_union,
        unionErrors: a
      }), B;
    }
  }
  get options() {
    return this._def.options;
  }
}
xn.create = (t, e) => new xn({
  options: t,
  typeName: L.ZodUnion,
  ...H(e)
});
function ur(t, e) {
  const n = rt(t), r = rt(e);
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
class _n extends Y {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), o = (s, i) => {
      if (Ro(s) || Ro(i))
        return B;
      const a = ur(s.value, i.value);
      return a.valid ? ((No(s) || No(i)) && n.dirty(), { status: n.value, value: a.data }) : (R(r, {
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
_n.create = (t, e, n) => new _n({
  left: t,
  right: e,
  typeName: L.ZodIntersection,
  ...H(n)
});
class vt extends Y {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== A.array)
      return R(r, {
        code: _.invalid_type,
        expected: A.array,
        received: r.parsedType
      }), B;
    if (r.data.length < this._def.items.length)
      return R(r, {
        code: _.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), B;
    !this._def.rest && r.data.length > this._def.items.length && (R(r, {
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
    return r.common.async ? Promise.all(s).then((i) => ve.mergeArray(n, i)) : ve.mergeArray(n, s);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new vt({
      ...this._def,
      rest: e
    });
  }
}
vt.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new vt({
    items: t,
    typeName: L.ZodTuple,
    rest: null,
    ...H(e)
  });
};
class Sn extends Y {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== A.object)
      return R(r, {
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
    return r.common.async ? ve.mergeObjectAsync(n, o) : ve.mergeObjectSync(n, o);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, n, r) {
    return n instanceof Y ? new Sn({
      keyType: e,
      valueType: n,
      typeName: L.ZodRecord,
      ...H(r)
    }) : new Sn({
      keyType: Ke.create(),
      valueType: e,
      typeName: L.ZodRecord,
      ...H(n)
    });
  }
}
class Lo extends Y {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== A.map)
      return R(r, {
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
Lo.create = (t, e, n) => new Lo({
  valueType: e,
  keyType: t,
  typeName: L.ZodMap,
  ...H(n)
});
class Jt extends Y {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== A.set)
      return R(r, {
        code: _.invalid_type,
        expected: A.set,
        received: r.parsedType
      }), B;
    const o = this._def;
    o.minSize !== null && r.data.size < o.minSize.value && (R(r, {
      code: _.too_small,
      minimum: o.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: o.minSize.message
    }), n.dirty()), o.maxSize !== null && r.data.size > o.maxSize.value && (R(r, {
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
  ...H(e)
});
class Mo extends Y {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
Mo.create = (t, e) => new Mo({
  getter: t,
  typeName: L.ZodLazy,
  ...H(e)
});
class zo extends Y {
  _parse(e) {
    if (e.data !== this._def.value) {
      const n = this._getOrReturnCtx(e);
      return R(n, {
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
zo.create = (t, e) => new zo({
  value: t,
  typeName: L.ZodLiteral,
  ...H(e)
});
function bs(t, e) {
  return new At({
    values: t,
    typeName: L.ZodEnum,
    ...H(e)
  });
}
class At extends Y {
  _parse(e) {
    if (typeof e.data != "string") {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return R(n, {
        expected: K.joinValues(r),
        received: n.parsedType,
        code: _.invalid_type
      }), B;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return R(n, {
        received: n.data,
        code: _.invalid_enum_value,
        options: r
      }), B;
    }
    return Ae(e.data);
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
    return At.create(e, {
      ...this._def,
      ...n
    });
  }
  exclude(e, n = this._def) {
    return At.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...n
    });
  }
}
At.create = bs;
class Bo extends Y {
  _parse(e) {
    const n = K.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== A.string && r.parsedType !== A.number) {
      const o = K.objectValues(n);
      return R(r, {
        expected: K.joinValues(o),
        received: r.parsedType,
        code: _.invalid_type
      }), B;
    }
    if (this._cache || (this._cache = new Set(K.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const o = K.objectValues(n);
      return R(r, {
        received: r.data,
        code: _.invalid_enum_value,
        options: o
      }), B;
    }
    return Ae(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Bo.create = (t, e) => new Bo({
  values: t,
  typeName: L.ZodNativeEnum,
  ...H(e)
});
class Cn extends Y {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== A.promise && n.common.async === !1)
      return R(n, {
        code: _.invalid_type,
        expected: A.promise,
        received: n.parsedType
      }), B;
    const r = n.parsedType === A.promise ? n.data : Promise.resolve(n.data);
    return Ae(r.then((o) => this._def.type.parseAsync(o, {
      path: n.path,
      errorMap: n.common.contextualErrorMap
    })));
  }
}
Cn.create = (t, e) => new Cn({
  type: t,
  typeName: L.ZodPromise,
  ...H(e)
});
class Pt extends Y {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === L.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), o = this._def.effect || null, s = {
      addIssue: (i) => {
        R(r, i), i.fatal ? n.abort() : n.dirty();
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
          return c.status === "aborted" ? B : c.status === "dirty" || n.value === "dirty" ? Gt(c.value) : c;
        });
      {
        if (n.value === "aborted")
          return B;
        const a = this._def.schema._parseSync({
          data: i,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? B : a.status === "dirty" || n.value === "dirty" ? Gt(a.value) : a;
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
        if (!Rt(i))
          return B;
        const a = o.transform(i.value, s);
        if (a instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: n.value, value: a };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((i) => Rt(i) ? Promise.resolve(o.transform(i.value, s)).then((a) => ({
          status: n.value,
          value: a
        })) : B);
    K.assertNever(o);
  }
}
Pt.create = (t, e, n) => new Pt({
  schema: t,
  typeName: L.ZodEffects,
  effect: e,
  ...H(n)
});
Pt.createWithPreprocess = (t, e, n) => new Pt({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: L.ZodEffects,
  ...H(n)
});
class ot extends Y {
  _parse(e) {
    return this._getType(e) === A.undefined ? Ae(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ot.create = (t, e) => new ot({
  innerType: t,
  typeName: L.ZodOptional,
  ...H(e)
});
class Ot extends Y {
  _parse(e) {
    return this._getType(e) === A.null ? Ae(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ot.create = (t, e) => new Ot({
  innerType: t,
  typeName: L.ZodNullable,
  ...H(e)
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
  ...H(e)
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
    return bn(o) ? o.then((s) => ({
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new Je(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: o.status === "valid" ? o.value : this._def.catchValue({
        get error() {
          return new Je(r.common.issues);
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
  ...H(e)
});
class jo extends Y {
  _parse(e) {
    if (this._getType(e) !== A.nan) {
      const r = this._getOrReturnCtx(e);
      return R(r, {
        code: _.invalid_type,
        expected: A.nan,
        received: r.parsedType
      }), B;
    }
    return { status: "valid", value: e.data };
  }
}
jo.create = (t) => new jo({
  typeName: L.ZodNaN,
  ...H(t)
});
class ka extends Y {
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
class Nr extends Y {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const s = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return s.status === "aborted" ? B : s.status === "dirty" ? (n.dirty(), Gt(s.value)) : this._def.out._parseAsync({
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
    return new Nr({
      in: e,
      out: n,
      typeName: L.ZodPipeline
    });
  }
}
class mr extends Y {
  _parse(e) {
    const n = this._def.innerType._parse(e), r = (o) => (Rt(o) && (o.value = Object.freeze(o.value)), o);
    return bn(n) ? n.then((o) => r(o)) : r(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
mr.create = (t, e) => new mr({
  innerType: t,
  typeName: L.ZodReadonly,
  ...H(e)
});
var L;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(L || (L = {}));
const z = Ke.create, ws = Nt.create, Ar = dr.create;
at.create;
const Ta = Ve.create, ue = le.create;
xn.create;
_n.create;
vt.create;
const On = Sn.create, bt = At.create;
Cn.create;
ot.create;
Ot.create;
ue({
  taskId: z(),
  title: z(),
  userId: z()
});
ue({
  taskId: z(),
  changes: On(Ar())
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
  variant: bt(["info", "success", "error", "warning"]).default("info"),
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
const Ra = ue({
  id: z().min(1),
  name: z().min(1),
  version: z().regex(/^\d+\.\d+\.\d+$/),
  description: z(),
  author: z(),
  entry: z(),
  hostCompatibility: z().default("^1.0.0"),
  permissions: Ta(bt(Ji)).default([]),
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
  slot: bt(Qi),
  priority: ws().default(0)
});
ue({
  label: z(),
  path: z(),
  icon: z().optional(),
  section: z().optional(),
  order: ws().default(0)
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
On(Ar());
const Na = ue({
  title: z().min(1),
  description: z().optional(),
  status: bt(["todo", "in_progress", "done"]).default("todo"),
  priority: bt(["low", "medium", "high"]).default("medium")
});
Na.partial();
ue({
  type: bt(["tasks", "activity", "usage"]),
  format: bt(["json", "csv"]).default("json"),
  title: z().optional()
});
ue({
  pluginId: z(),
  event: z(),
  payload: On(Ar()).optional(),
  timestamp: z().optional()
});
function xs() {
  const t = typeof window < "u" ? window.__FPP_HOST_BRIDGE__ : null;
  if (!t)
    throw new Error("[PluginSDK] Host bridge not initialized");
  return t;
}
function _s(t) {
  return xs().getContext({ id: t });
}
function Aa(t) {
  const e = Ra.safeParse(t.manifest);
  if (!e.success)
    throw new Error(
      `[PluginSDK] Invalid manifest: ${e.error.message}`
    );
  t.manifest.id;
  try {
    xs().registerContributions(t);
  } finally {
  }
}
const Pa = Mt(null);
function Ss() {
  const t = zt(Pa);
  if (!t)
    throw new Error(
      "[PluginSDK] usePluginId must be used within PluginIdProvider (wrap plugin UI in PluginBoundary)"
    );
  return t;
}
function Oa() {
  const t = Ss(), e = _s(t), n = e.permissions.getAll(), r = vn(
    () => (o) => e.permissions.has(o),
    [e, n]
  );
  return { permissions: n, can: r };
}
function $a() {
  const t = Ss(), e = _s(t);
  return ee(
    (n, r) => {
      e.events.emit(n, r);
    },
    [e]
  );
}
const Ea = "com.fpp.reports", Ia = "Reports", Da = "1.0.0", La = "Generate and export reports from platform data.", Ma = "FPP Team", za = "/plugins/com.fpp.reports/index.js", Ba = "^1.0.0", ja = ["reports:read", "reports:generate", "reports:export", "tasks:read", "events:report.*"], Fa = "file-analytics", Va = "Analytics", Wa = {
  id: Ea,
  name: Ia,
  version: Da,
  description: La,
  author: Ma,
  entry: za,
  hostCompatibility: Ba,
  permissions: ja,
  icon: Fa,
  category: Va
};
function Pr(t) {
  return Object.keys(t);
}
function Za(t) {
  return t.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
function Jn(t) {
  return t === "0rem" ? "0rem" : `calc(${t} * var(--mantine-scale))`;
}
function Cs(t, { shouldScale: e = !1 } = {}) {
  function n(r) {
    if (r === 0 || r === "0")
      return `0${t}`;
    if (typeof r == "number") {
      const o = `${r / 16}${t}`;
      return e ? Jn(o) : o;
    }
    if (typeof r == "string") {
      if (r === "" || r.startsWith("calc(") || r.startsWith("clamp(") || r.includes("rgba("))
        return r;
      if (r.includes(","))
        return r.split(",").map((s) => n(s)).join(",");
      if (r.includes(" "))
        return r.split(" ").map((s) => n(s)).join(" ");
      if (r.includes(t))
        return e ? Jn(r) : r;
      const o = r.replace("px", "");
      if (!Number.isNaN(Number(o))) {
        const s = `${Number(o) / 16}${t}`;
        return e ? Jn(s) : s;
      }
    }
    return r;
  }
  return n;
}
const ne = Cs("rem", { shouldScale: !0 });
Cs("em");
function Or(t) {
  return Object.keys(t).reduce((e, n) => (t[n] !== void 0 && (e[n] = t[n]), e), {});
}
function ks(t) {
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
function rn(t) {
  return Array.isArray(t) || t === null ? !1 : typeof t == "object" ? t.type !== ms : !1;
}
function Bt(t) {
  const e = Mt(null);
  return [({ children: o, value: s }) => /* @__PURE__ */ h(e.Provider, { value: s, children: o }), () => {
    const o = zt(e);
    if (o === null)
      throw new Error(t);
    return o;
  }];
}
function Ts(t = null) {
  const e = Mt(t);
  return [({ children: o, value: s }) => /* @__PURE__ */ h(e.Provider, { value: s, children: o }), () => zt(e)];
}
const Ha = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function Rs(t) {
  return Ha[t];
}
const Ua = () => {
};
function Ya(t, e = { active: !0 }) {
  return typeof t != "function" || !e.active ? e.onKeyDown || Ua : (n) => {
    var r;
    n.key === "Escape" && (t(n), (r = e.onTrigger) == null || r.call(e));
  };
}
function ge(t, e = "size", n = !0) {
  if (t !== void 0)
    return ks(t) ? n ? ne(t) : t : `var(--${e}-${t})`;
}
function $t(t) {
  return ge(t, "mantine-spacing");
}
function xt(t) {
  return t === void 0 ? "var(--mantine-radius-default)" : ge(t, "mantine-radius");
}
function we(t) {
  return ge(t, "mantine-font-size");
}
function qa(t) {
  return ge(t, "mantine-line-height", !1);
}
function Ns(t) {
  if (t)
    return ge(t, "mantine-shadow", !1);
}
function Xa(t = "mantine-") {
  return `${t}${Math.random().toString(36).slice(2, 11)}`;
}
function ht(t) {
  const e = J(t);
  return te(() => {
    e.current = t;
  }), vn(() => (...n) => {
    var r;
    return (r = e.current) == null ? void 0 : r.call(e, ...n);
  }, []);
}
function $n(t, e) {
  const n = typeof e == "number" ? e : e.delay, r = typeof e == "number" ? !1 : e.flushOnUnmount, o = ht(t), s = J(0), i = J(() => {
  }), a = Object.assign(
    ee(
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
const Fo = ["mousedown", "touchstart"];
function Ga(t, e, n) {
  const r = J(null);
  return te(() => {
    const o = (s) => {
      const { target: i } = s ?? {};
      if (Array.isArray(n)) {
        const a = (i == null ? void 0 : i.hasAttribute("data-ignore-outside-clicks")) || !document.body.contains(i) && i.tagName !== "HTML";
        n.every((l) => !!l && !s.composedPath().includes(l)) && !a && t();
      } else r.current && !r.current.contains(i) && t();
    };
    return (e || Fo).forEach((s) => document.addEventListener(s, o)), () => {
      (e || Fo).forEach((s) => document.removeEventListener(s, o));
    };
  }, [r, t, n]), r;
}
function Ka(t, e) {
  try {
    return t.addEventListener("change", e), () => t.removeEventListener("change", e);
  } catch {
    return t.addListener(e), () => t.removeListener(e);
  }
}
function Ja(t, e) {
  return typeof window < "u" && "matchMedia" in window ? window.matchMedia(t).matches : !1;
}
function Qa(t, e, { getInitialValueInEffect: n } = {
  getInitialValueInEffect: !0
}) {
  const [r, o] = G(
    n ? e : Ja(t)
  ), s = J(null);
  return te(() => {
    if ("matchMedia" in window)
      return s.current = window.matchMedia(t), o(s.current.matches), Ka(s.current, (i) => o(i.matches));
  }, [t]), r;
}
const $r = typeof document < "u" ? Rr : te;
function Et(t, e) {
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
function ec({ opened: t, shouldReturnFocus: e = !0 }) {
  const n = J(null), r = () => {
    var o;
    n.current && "focus" in n.current && typeof n.current.focus == "function" && ((o = n.current) == null || o.focus({ preventScroll: !0 }));
  };
  return Et(() => {
    let o = -1;
    const s = (i) => {
      i.key === "Tab" && window.clearTimeout(o);
    };
    return document.addEventListener("keydown", s), t ? n.current = document.activeElement : e && (o = window.setTimeout(r, 10)), () => {
      window.clearTimeout(o), document.removeEventListener("keydown", s);
    };
  }, [t, e]), r;
}
const tc = /input|select|textarea|button|object/, As = "a, input, select, textarea, button, object, [tabindex]";
function nc(t) {
  return process.env.NODE_ENV === "test" ? !1 : t.style.display === "none";
}
function rc(t) {
  if (t.getAttribute("aria-hidden") || t.getAttribute("hidden") || t.getAttribute("type") === "hidden")
    return !1;
  let n = t;
  for (; n && !(n === document.body || n.nodeType === 11); ) {
    if (nc(n))
      return !1;
    n = n.parentNode;
  }
  return !0;
}
function Ps(t) {
  let e = t.getAttribute("tabindex");
  return e === null && (e = void 0), parseInt(e, 10);
}
function hr(t) {
  const e = t.nodeName.toLowerCase(), n = !Number.isNaN(Ps(t));
  return /* @ts-expect-error function accepts any html element but if it is a button, it should not be disabled to trigger the condition */ (tc.test(e) && !t.disabled || t instanceof HTMLAnchorElement && t.href || n) && rc(t);
}
function Os(t) {
  const e = Ps(t);
  return (Number.isNaN(e) || e >= 0) && hr(t);
}
function oc(t) {
  return Array.from(t.querySelectorAll(As)).filter(Os);
}
function sc(t, e) {
  const n = oc(t);
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
function ic(t = !0) {
  const e = J(null), n = (o) => {
    let s = o.querySelector("[data-autofocus]");
    if (!s) {
      const i = Array.from(o.querySelectorAll(As));
      s = i.find(Os) || i.find(hr) || null, !s && hr(o) && (s = o);
    }
    s ? s.focus({ preventScroll: !0 }) : process.env.NODE_ENV === "development" && console.warn(
      "[@mantine/hooks/use-focus-trap] Failed to find focusable element within provided node",
      o
    );
  }, r = ee(
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
      s.key === "Tab" && e.current && sc(e.current, s);
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [t]), r;
}
const ac = cr.useId || (() => {
});
function cc() {
  const t = ac();
  return t ? `mantine-${t.replace(/:/g, "")}` : "";
}
function En(t) {
  const e = cc(), [n, r] = G(e);
  return $r(() => {
    r(Xa());
  }, []), typeof t == "string" ? t : typeof window > "u" ? e : n;
}
function gr(t, e) {
  if (typeof t == "function")
    return t(e);
  typeof t == "object" && t !== null && "current" in t && (t.current = e);
}
function lc(...t) {
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
function Pe(...t) {
  return ee(lc(...t), t);
}
function kn({
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
function dc(t, e) {
  return Qa("(prefers-reduced-motion: reduce)", t, e);
}
function uc(t) {
  const e = J(void 0);
  return te(() => {
    e.current = t;
  }, [t]), e.current;
}
function $s(t) {
  var n;
  const e = cr.version;
  return typeof cr.version != "string" || e.startsWith("18.") ? t == null ? void 0 : t.ref : (n = t == null ? void 0 : t.props) == null ? void 0 : n.ref;
}
function Es(t) {
  var e, n, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var o = t.length;
    for (e = 0; e < o; e++) t[e] && (n = Es(t[e])) && (r && (r += " "), r += n);
  } else for (n in t) t[n] && (r && (r += " "), r += n);
  return r;
}
function et() {
  for (var t, e, n = 0, r = "", o = arguments.length; n < o; n++) (t = arguments[n]) && (e = Es(t)) && (r && (r += " "), r += e);
  return r;
}
const fc = {};
function pc(t) {
  const e = {};
  return t.forEach((n) => {
    Object.entries(n).forEach(([r, o]) => {
      e[r] ? e[r] = et(e[r], o) : e[r] = o;
    });
  }), e;
}
function In({ theme: t, classNames: e, props: n, stylesCtx: r }) {
  const s = (Array.isArray(e) ? e : [e]).map(
    (i) => typeof i == "function" ? i(t, n, r) : i || fc
  );
  return pc(s);
}
function Tn({ theme: t, styles: e, props: n, stylesCtx: r }) {
  return (Array.isArray(e) ? e : [e]).reduce((s, i) => typeof i == "function" ? { ...s, ...i(t, n, r) } : { ...s, ...i }, {});
}
const mc = Mt(null);
function _t() {
  const t = zt(mc);
  if (!t)
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  return t;
}
function hc() {
  return _t().classNamesPrefix;
}
function gc() {
  return _t().getStyleNonce;
}
function yc() {
  return _t().withStaticClasses;
}
function vc() {
  return _t().headless;
}
function bc() {
  var t;
  return (t = _t().stylesTransform) == null ? void 0 : t.sx;
}
function wc() {
  var t;
  return (t = _t().stylesTransform) == null ? void 0 : t.styles;
}
function Is() {
  return _t().env || "default";
}
function xc(t) {
  return /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i.test(t);
}
function _c(t) {
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
function Sc(t) {
  const [e, n, r, o] = t.replace(/[^0-9,./]/g, "").split(/[/,]/).map(Number);
  return { r: e, g: n, b: r, a: o === void 0 ? 1 : o };
}
function Cc(t) {
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
function Ds(t) {
  return xc(t) ? _c(t) : t.startsWith("rgb") ? Sc(t) : t.startsWith("hsl") ? Cc(t) : {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function kc(t, e) {
  return typeof t.primaryShade == "number" ? t.primaryShade : e === "dark" ? t.primaryShade.dark : t.primaryShade.light;
}
function Qn(t) {
  return t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4;
}
function Tc(t) {
  const e = t.match(/oklch\((.*?)%\s/);
  return e ? parseFloat(e[1]) : null;
}
function Rc(t) {
  if (t.startsWith("oklch("))
    return (Tc(t) || 0) / 100;
  const { r: e, g: n, b: r } = Ds(t), o = e / 255, s = n / 255, i = r / 255, a = Qn(o), c = Qn(s), l = Qn(i);
  return 0.2126 * a + 0.7152 * c + 0.0722 * l;
}
function qt(t, e = 0.179) {
  return t.startsWith("var(") ? !1 : Rc(t) > e;
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
      isLight: qt(
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
      isLight: qt(
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
      isLight: qt(
        t === "white" ? e.white : e.black,
        e.luminanceThreshold
      ),
      variable: `--mantine-color-${t}`
    };
  const [r, o] = t.split("."), s = o ? Number(o) : void 0, i = r in e.colors;
  if (i) {
    const a = s !== void 0 ? e.colors[r][s] : e.colors[r][kc(e, n || "light")];
    return {
      color: r,
      value: a,
      shade: s,
      isThemeColor: i,
      isLight: qt(a, e.luminanceThreshold),
      variable: o ? `--mantine-color-${r}-${s}` : `--mantine-color-${r}-filled`
    };
  }
  return {
    color: t,
    value: t,
    isThemeColor: i,
    isLight: qt(t, e.luminanceThreshold),
    shade: s,
    variable: void 0
  };
}
function st(t, e) {
  const n = Er({ color: t || e.primaryColor, theme: e });
  return n.variable ? `var(${n.variable})` : t;
}
function Nc(t, e) {
  const n = {
    from: (t == null ? void 0 : t.from) || e.defaultGradient.from,
    to: (t == null ? void 0 : t.to) || e.defaultGradient.to,
    deg: (t == null ? void 0 : t.deg) ?? e.defaultGradient.deg ?? 0
  }, r = st(n.from, e), o = st(n.to, e);
  return `linear-gradient(${n.deg}deg, ${r} 0%, ${o} 100%)`;
}
function Ac(t, e) {
  if (typeof t != "string" || e > 1 || e < 0)
    return "rgba(0, 0, 0, 1)";
  if (t.startsWith("var(")) {
    const s = (1 - e) * 100;
    return `color-mix(in srgb, ${t}, transparent ${s}%)`;
  }
  if (t.startsWith("oklch"))
    return t.includes("/") ? t.replace(/\/\s*[\d.]+\s*\)/, `/ ${e})`) : t.replace(")", ` / ${e})`);
  const { r: n, g: r, b: o } = Ds(t);
  return `rgba(${n}, ${r}, ${o}, ${e})`;
}
const Pc = Mt(null);
function jt() {
  const t = zt(Pc);
  if (!t)
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  return t;
}
function Ir({
  classNames: t,
  styles: e,
  props: n,
  stylesCtx: r
}) {
  const o = jt();
  return {
    resolvedClassNames: In({
      theme: o,
      classNames: t,
      props: n,
      stylesCtx: r || void 0
    }),
    resolvedStyles: Tn({
      theme: o,
      styles: e,
      props: n,
      stylesCtx: r || void 0
    })
  };
}
const Oc = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function $c({ theme: t, options: e, unstyled: n }) {
  return et(
    (e == null ? void 0 : e.focusable) && !n && (t.focusClassName || Oc[t.focusRing]),
    (e == null ? void 0 : e.active) && !n && t.activeClassName
  );
}
function Ec({
  selector: t,
  stylesCtx: e,
  options: n,
  props: r,
  theme: o
}) {
  return In({
    theme: o,
    classNames: n == null ? void 0 : n.classNames,
    props: (n == null ? void 0 : n.props) || r,
    stylesCtx: e
  })[t];
}
function Vo({
  selector: t,
  stylesCtx: e,
  theme: n,
  classNames: r,
  props: o
}) {
  return In({ theme: n, classNames: r, props: o, stylesCtx: e })[t];
}
function Ic({ rootSelector: t, selector: e, className: n }) {
  return t === e ? n : void 0;
}
function Dc({ selector: t, classes: e, unstyled: n }) {
  return n ? void 0 : e[t];
}
function Lc({
  themeName: t,
  classNamesPrefix: e,
  selector: n,
  withStaticClass: r
}) {
  return r === !1 ? [] : t.map((o) => `${e}-${o}-${n}`);
}
function Mc({
  themeName: t,
  theme: e,
  selector: n,
  props: r,
  stylesCtx: o
}) {
  return t.map(
    (s) => {
      var i, a;
      return (a = In({
        theme: e,
        classNames: (i = e.components[s]) == null ? void 0 : i.classNames,
        props: r,
        stylesCtx: o
      })) == null ? void 0 : a[n];
    }
  );
}
function zc({
  options: t,
  classes: e,
  selector: n,
  unstyled: r
}) {
  return t != null && t.variant && !r ? e[`${n}--${t.variant}`] : void 0;
}
function Bc({
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
  transformedStyles: m
}) {
  return et(
    $c({ theme: t, options: e, unstyled: a || p }),
    Mc({ theme: t, themeName: n, selector: r, props: d, stylesCtx: u }),
    zc({ options: e, classes: i, selector: r, unstyled: a }),
    Vo({ selector: r, stylesCtx: u, theme: t, classNames: s, props: d }),
    Vo({ selector: r, stylesCtx: u, theme: t, classNames: m, props: d }),
    Ec({ selector: r, stylesCtx: u, options: e, props: d, theme: t }),
    Ic({ rootSelector: l, selector: r, className: c }),
    Dc({ selector: r, classes: i, unstyled: a || p }),
    f && !p && Lc({
      themeName: n,
      classNamesPrefix: o,
      selector: r,
      withStaticClass: e == null ? void 0 : e.withStaticClass
    }),
    e == null ? void 0 : e.className
  );
}
function jc({
  theme: t,
  themeName: e,
  props: n,
  stylesCtx: r,
  selector: o
}) {
  return e.map(
    (s) => {
      var i;
      return Tn({
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
function Fc(t) {
  return t.reduce((e, n) => (n && Object.keys(n).forEach((r) => {
    e[r] = { ...e[r], ...Or(n[r]) };
  }), e), {});
}
function Vc({
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
  return (c = Fc([
    a ? {} : e == null ? void 0 : e(n, r, o),
    ...i.map((l) => {
      var d, u, f;
      return (f = (u = (d = n.components) == null ? void 0 : d[l]) == null ? void 0 : u.vars) == null ? void 0 : f.call(u, n, r, o);
    }),
    t == null ? void 0 : t(n, r, o)
  ])) == null ? void 0 : c[s];
}
function Wc({
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
    ...!f && jc({ theme: t, themeName: e, props: o, stylesCtx: s, selector: n }),
    ...!f && Tn({ theme: t, styles: a, props: o, stylesCtx: s })[n],
    ...!f && Tn({ theme: t, styles: r == null ? void 0 : r.styles, props: (r == null ? void 0 : r.props) || o, stylesCtx: s })[n],
    ...Vc({ theme: t, props: o, stylesCtx: s, vars: l, varsResolver: d, selector: n, themeName: e, headless: u }),
    ...i === n ? yr({ style: c, theme: t }) : null,
    ...yr({ style: r == null ? void 0 : r.style, theme: t })
  };
}
function Zc({ props: t, stylesCtx: e, themeName: n }) {
  var i;
  const r = jt(), o = (i = wc()) == null ? void 0 : i();
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
function se({
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
  const f = jt(), p = hc(), m = yc(), g = vc(), y = (Array.isArray(t) ? t : [t]).filter((v) => v), { withStylesTransform: w, getTransformedStyles: x } = Zc({
    props: n,
    stylesCtx: r,
    themeName: y
  });
  return (v, b) => ({
    className: Bc({
      theme: f,
      options: b,
      themeName: y,
      selector: v,
      classNamesPrefix: p,
      classNames: c,
      classes: e,
      unstyled: a,
      className: o,
      rootSelector: i,
      props: n,
      stylesCtx: r,
      withStaticClasses: m,
      headless: g,
      transformedStyles: x([b == null ? void 0 : b.styles, l])
    }),
    style: Wc({
      theme: f,
      themeName: y,
      selector: v,
      options: b,
      props: n,
      stylesCtx: r,
      rootSelector: i,
      styles: l,
      style: s,
      vars: d,
      varsResolver: u,
      headless: g,
      withStylesTransform: w
    })
  });
}
function E(t, e, n) {
  var i;
  const r = jt(), o = (i = r.components[t]) == null ? void 0 : i.defaultProps, s = typeof o == "function" ? o(r) : o;
  return { ...e, ...s, ...Or(n) };
}
function er(t) {
  return Pr(t).reduce(
    (e, n) => t[n] !== void 0 ? `${e}${Za(n)}:${t[n]};` : e,
    ""
  ).trim();
}
function Hc({ selector: t, styles: e, media: n, container: r }) {
  const o = e ? er(e) : "", s = Array.isArray(n) ? n.map((a) => `@media${a.query}{${t}{${er(a.styles)}}}`) : [], i = Array.isArray(r) ? r.map(
    (a) => `@container ${a.query}{${t}{${er(a.styles)}}}`
  ) : [];
  return `${o ? `${t}{${o}}` : ""}${s.join("")}${i.join("")}`.trim();
}
function Uc(t) {
  const e = gc();
  return /* @__PURE__ */ h(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: e == null ? void 0 : e(),
      dangerouslySetInnerHTML: { __html: Hc(t) }
    }
  );
}
function Dr(t) {
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
    pb: m,
    pl: g,
    pr: y,
    pe: w,
    ps: x,
    bd: v,
    bg: b,
    c: C,
    opacity: S,
    ff: T,
    fz: k,
    fw: D,
    lts: $,
    ta: U,
    lh: I,
    fs: j,
    tt: V,
    td: X,
    w: N,
    miw: M,
    maw: P,
    h: F,
    mih: re,
    mah: Te,
    bgsz: je,
    bgp: ce,
    bgr: Ye,
    bga: Re,
    pos: qe,
    top: Ne,
    left: dt,
    bottom: Se,
    right: ut,
    inset: Ct,
    display: Ht,
    flex: Ut,
    hiddenFrom: an,
    visibleFrom: cn,
    lightHidden: Yt,
    darkHidden: nt,
    sx: ft,
    ...Ie
  } = t;
  return { styleProps: Or({
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
    pb: m,
    pl: g,
    pr: y,
    pe: w,
    ps: x,
    bd: v,
    bg: b,
    c: C,
    opacity: S,
    ff: T,
    fz: k,
    fw: D,
    lts: $,
    ta: U,
    lh: I,
    fs: j,
    tt: V,
    td: X,
    w: N,
    miw: M,
    maw: P,
    h: F,
    mih: re,
    mah: Te,
    bgsz: je,
    bgp: ce,
    bgr: Ye,
    bga: Re,
    pos: qe,
    top: Ne,
    left: dt,
    bottom: Se,
    right: ut,
    inset: Ct,
    display: Ht,
    flex: Ut,
    hiddenFrom: an,
    visibleFrom: cn,
    lightHidden: Yt,
    darkHidden: nt,
    sx: ft
  }), rest: Ie };
}
const Yc = {
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
function Lr(t, e) {
  const n = Er({ color: t, theme: e });
  return n.color === "dimmed" ? "var(--mantine-color-dimmed)" : n.color === "bright" ? "var(--mantine-color-bright)" : n.variable ? `var(${n.variable})` : n.color;
}
function qc(t, e) {
  const n = Er({ color: t, theme: e });
  return n.isThemeColor && n.shade === void 0 ? `var(--mantine-color-${n.color}-text)` : Lr(t, e);
}
function Xc(t, e) {
  if (typeof t == "number")
    return ne(t);
  if (typeof t == "string") {
    const [n, r, ...o] = t.split(" ").filter((i) => i.trim() !== "");
    let s = `${ne(n)}`;
    return r && (s += ` ${r}`), o.length > 0 && (s += ` ${Lr(o.join(" "), e)}`), s.trim();
  }
  return t;
}
const Wo = {
  text: "var(--mantine-font-family)",
  mono: "var(--mantine-font-family-monospace)",
  monospace: "var(--mantine-font-family-monospace)",
  heading: "var(--mantine-font-family-headings)",
  headings: "var(--mantine-font-family-headings)"
};
function Gc(t) {
  return typeof t == "string" && t in Wo ? Wo[t] : t;
}
const Kc = ["h1", "h2", "h3", "h4", "h5", "h6"];
function Jc(t, e) {
  return typeof t == "string" && t in e.fontSizes ? `var(--mantine-font-size-${t})` : typeof t == "string" && Kc.includes(t) ? `var(--mantine-${t}-font-size)` : typeof t == "number" || typeof t == "string" ? ne(t) : t;
}
function Qc(t) {
  return t;
}
const el = ["h1", "h2", "h3", "h4", "h5", "h6"];
function tl(t, e) {
  return typeof t == "string" && t in e.lineHeights ? `var(--mantine-line-height-${t})` : typeof t == "string" && el.includes(t) ? `var(--mantine-${t}-line-height)` : t;
}
function nl(t) {
  return typeof t == "number" ? ne(t) : t;
}
function rl(t, e) {
  if (typeof t == "number")
    return ne(t);
  if (typeof t == "string") {
    const n = t.replace("-", "");
    if (!(n in e.spacing))
      return ne(t);
    const r = `--mantine-spacing-${n}`;
    return t.startsWith("-") ? `calc(var(${r}) * -1)` : `var(${r})`;
  }
  return t;
}
const tr = {
  color: Lr,
  textColor: qc,
  fontSize: Jc,
  spacing: rl,
  identity: Qc,
  size: nl,
  lineHeight: tl,
  fontFamily: Gc,
  border: Xc
};
function Zo(t) {
  return t.replace("(min-width: ", "").replace("em)", "");
}
function ol({
  media: t,
  ...e
}) {
  const r = Object.keys(t).sort((o, s) => Number(Zo(o)) - Number(Zo(s))).map((o) => ({ query: o, styles: t[o] }));
  return { ...e, media: r };
}
function sl(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.keys(t);
  return !(e.length === 1 && e[0] === "base");
}
function il(t) {
  return typeof t == "object" && t !== null ? "base" in t ? t.base : void 0 : t;
}
function al(t) {
  return typeof t == "object" && t !== null ? Pr(t).filter((e) => e !== "base") : [];
}
function cl(t, e) {
  return typeof t == "object" && t !== null && e in t ? t[e] : t;
}
function ll({
  styleProps: t,
  data: e,
  theme: n
}) {
  return ol(
    Pr(t).reduce(
      (r, o) => {
        if (o === "hiddenFrom" || o === "visibleFrom" || o === "sx")
          return r;
        const s = e[o], i = Array.isArray(s.property) ? s.property : [s.property], a = il(t[o]);
        if (!sl(t[o]))
          return i.forEach((l) => {
            r.inlineStyles[l] = tr[s.type](a, n);
          }), r;
        r.hasResponsiveStyles = !0;
        const c = al(t[o]);
        return i.forEach((l) => {
          a && (r.styles[l] = tr[s.type](a, n)), c.forEach((d) => {
            const u = `(min-width: ${n.breakpoints[d]})`;
            r.media[u] = {
              ...r.media[u],
              [l]: tr[s.type](
                cl(t[o], d),
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
function dl() {
  return `__m__-${hs().replace(/:/g, "")}`;
}
function Ls(t) {
  return t.startsWith("data-") ? t : `data-${t}`;
}
function ul(t) {
  return Object.keys(t).reduce((e, n) => {
    const r = t[n];
    return r === void 0 || r === "" || r === !1 || r === null || (e[Ls(n)] = t[n]), e;
  }, {});
}
function Ms(t) {
  return t ? typeof t == "string" ? { [Ls(t)]: !0 } : Array.isArray(t) ? [...t].reduce(
    (e, n) => ({ ...e, ...Ms(n) }),
    {}
  ) : ul(t) : null;
}
function vr(t, e) {
  return Array.isArray(t) ? [...t].reduce(
    (n, r) => ({ ...n, ...vr(r, e) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function fl({
  theme: t,
  style: e,
  vars: n,
  styleProps: r
}) {
  const o = vr(e, t), s = vr(n, t);
  return { ...o, ...s, ...r };
}
const zs = oe(
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
  }, m) => {
    var k;
    const g = jt(), y = t || "div", { styleProps: w, rest: x } = Dr(p), v = bc(), b = (k = v == null ? void 0 : v()) == null ? void 0 : k(w.sx), C = dl(), S = ll({
      styleProps: w,
      theme: g,
      data: Yc
    }), T = {
      ref: m,
      style: fl({
        theme: g,
        style: e,
        vars: n,
        styleProps: S.inlineStyles
      }),
      className: et(r, b, {
        [C]: S.hasResponsiveStyles,
        "mantine-light-hidden": l,
        "mantine-dark-hidden": d,
        [`mantine-hidden-from-${a}`]: a,
        [`mantine-visible-from-${c}`]: c
      }),
      "data-variant": o,
      "data-size": ks(i) ? void 0 : i || void 0,
      size: f,
      ...Ms(s),
      ...x
    };
    return /* @__PURE__ */ ae(it, { children: [
      S.hasResponsiveStyles && /* @__PURE__ */ h(
        Uc,
        {
          selector: `.${C}`,
          styles: S.styles,
          media: S.media
        }
      ),
      typeof u == "function" ? u(T) : /* @__PURE__ */ h(y, { ...T })
    ] });
  }
);
zs.displayName = "@mantine/core/Box";
const W = zs;
function Bs(t) {
  return t;
}
function q(t) {
  const e = oe(t);
  return e.extend = Bs, e.withProps = (n) => {
    const r = oe((o, s) => /* @__PURE__ */ h(e, { ...n, ...o, ref: s }));
    return r.extend = e.extend, r.displayName = `WithProps(${e.displayName})`, r;
  }, e;
}
function He(t) {
  const e = oe(t);
  return e.withProps = (n) => {
    const r = oe((o, s) => /* @__PURE__ */ h(e, { ...n, ...o, ref: s }));
    return r.extend = e.extend, r.displayName = `WithProps(${e.displayName})`, r;
  }, e.extend = Bs, e;
}
const pl = Mt({
  dir: "ltr",
  toggleDirection: () => {
  },
  setDirection: () => {
  }
});
function Mr() {
  return zt(pl);
}
function Dn() {
  return typeof window < "u";
}
function Ft(t) {
  return js(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function ke(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Ue(t) {
  var e;
  return (e = (js(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function js(t) {
  return Dn() ? t instanceof Node || t instanceof ke(t).Node : !1;
}
function he(t) {
  return Dn() ? t instanceof Element || t instanceof ke(t).Element : !1;
}
function tt(t) {
  return Dn() ? t instanceof HTMLElement || t instanceof ke(t).HTMLElement : !1;
}
function Ho(t) {
  return !Dn() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof ke(t).ShadowRoot;
}
function on(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r,
    display: o
  } = Me(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + n) && o !== "inline" && o !== "contents";
}
function ml(t) {
  return /^(table|td|th)$/.test(Ft(t));
}
function Ln(t) {
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
const hl = /transform|translate|scale|rotate|perspective|filter/, gl = /paint|layout|strict|content/, mt = (t) => !!t && t !== "none";
let nr;
function zr(t) {
  const e = he(t) ? Me(t) : t;
  return mt(e.transform) || mt(e.translate) || mt(e.scale) || mt(e.rotate) || mt(e.perspective) || !Br() && (mt(e.backdropFilter) || mt(e.filter)) || hl.test(e.willChange || "") || gl.test(e.contain || "");
}
function yl(t) {
  let e = ct(t);
  for (; tt(e) && !It(e); ) {
    if (zr(e))
      return e;
    if (Ln(e))
      return null;
    e = ct(e);
  }
  return null;
}
function Br() {
  return nr == null && (nr = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), nr;
}
function It(t) {
  return /^(html|body|#document)$/.test(Ft(t));
}
function Me(t) {
  return ke(t).getComputedStyle(t);
}
function Mn(t) {
  return he(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function ct(t) {
  if (Ft(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    Ho(t) && t.host || // Fallback.
    Ue(t)
  );
  return Ho(e) ? e.host : e;
}
function Fs(t) {
  const e = ct(t);
  return It(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : tt(e) && on(e) ? e : Fs(e);
}
function Qt(t, e, n) {
  var r;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const o = Fs(t), s = o === ((r = t.ownerDocument) == null ? void 0 : r.body), i = ke(o);
  if (s) {
    const a = br(i);
    return e.concat(i, i.visualViewport || [], on(o) ? o : [], a && n ? Qt(a) : []);
  } else
    return e.concat(o, Qt(o, [], n));
}
function br(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
const ze = Math.min, me = Math.max, Rn = Math.round, pn = Math.floor, We = (t) => ({
  x: t,
  y: t
}), vl = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function wr(t, e, n) {
  return me(t, ze(e, n));
}
function Qe(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Be(t) {
  return t.split("-")[0];
}
function Vt(t) {
  return t.split("-")[1];
}
function jr(t) {
  return t === "x" ? "y" : "x";
}
function Fr(t) {
  return t === "y" ? "height" : "width";
}
function De(t) {
  const e = t[0];
  return e === "t" || e === "b" ? "y" : "x";
}
function Vr(t) {
  return jr(De(t));
}
function bl(t, e, n) {
  n === void 0 && (n = !1);
  const r = Vt(t), o = Vr(t), s = Fr(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[s] > e.floating[s] && (i = Nn(i)), [i, Nn(i)];
}
function wl(t) {
  const e = Nn(t);
  return [xr(t), e, xr(e)];
}
function xr(t) {
  return t.includes("start") ? t.replace("start", "end") : t.replace("end", "start");
}
const Uo = ["left", "right"], Yo = ["right", "left"], xl = ["top", "bottom"], _l = ["bottom", "top"];
function Sl(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? Yo : Uo : e ? Uo : Yo;
    case "left":
    case "right":
      return e ? xl : _l;
    default:
      return [];
  }
}
function Cl(t, e, n, r) {
  const o = Vt(t);
  let s = Sl(Be(t), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), e && (s = s.concat(s.map(xr)))), s;
}
function Nn(t) {
  const e = Be(t);
  return vl[e] + t.slice(e.length);
}
function kl(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Wr(t) {
  return typeof t != "number" ? kl(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Dt(t) {
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
function qo(t, e, n) {
  let {
    reference: r,
    floating: o
  } = t;
  const s = De(e), i = Vr(e), a = Fr(i), c = Be(e), l = s === "y", d = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, f = r[a] / 2 - o[a] / 2;
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
  switch (Vt(e)) {
    case "start":
      p[i] -= f * (n && l ? -1 : 1);
      break;
    case "end":
      p[i] += f * (n && l ? -1 : 1);
      break;
  }
  return p;
}
async function Tl(t, e) {
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
  } = Qe(e, t), m = Wr(p), y = a[f ? u === "floating" ? "reference" : "floating" : u], w = Dt(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
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
  }, C = Dt(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: x,
    offsetParent: v,
    strategy: c
  }) : x);
  return {
    top: (w.top - C.top + m.top) / b.y,
    bottom: (C.bottom - w.bottom + m.bottom) / b.y,
    left: (w.left - C.left + m.left) / b.x,
    right: (C.right - w.right + m.right) / b.x
  };
}
const Rl = 50, Nl = async (t, e, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: i
  } = n, a = i.detectOverflow ? i : {
    ...i,
    detectOverflow: Tl
  }, c = await (i.isRTL == null ? void 0 : i.isRTL(e));
  let l = await i.getElementRects({
    reference: t,
    floating: e,
    strategy: o
  }), {
    x: d,
    y: u
  } = qo(l, r, c), f = r, p = 0;
  const m = {};
  for (let g = 0; g < s.length; g++) {
    const y = s[g];
    if (!y)
      continue;
    const {
      name: w,
      fn: x
    } = y, {
      x: v,
      y: b,
      data: C,
      reset: S
    } = await x({
      x: d,
      y: u,
      initialPlacement: r,
      placement: f,
      strategy: o,
      middlewareData: m,
      rects: l,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    d = v ?? d, u = b ?? u, m[w] = {
      ...m[w],
      ...C
    }, S && p < Rl && (p++, typeof S == "object" && (S.placement && (f = S.placement), S.rects && (l = S.rects === !0 ? await i.getElementRects({
      reference: t,
      floating: e,
      strategy: o
    }) : S.rects), {
      x: d,
      y: u
    } = qo(l, f, c)), g = -1);
  }
  return {
    x: d,
    y: u,
    placement: f,
    strategy: o,
    middlewareData: m
  };
}, Al = (t) => ({
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
    } = Qe(t, e) || {};
    if (l == null)
      return {};
    const u = Wr(d), f = {
      x: n,
      y: r
    }, p = Vr(o), m = Fr(p), g = await i.getDimensions(l), y = p === "y", w = y ? "top" : "left", x = y ? "bottom" : "right", v = y ? "clientHeight" : "clientWidth", b = s.reference[m] + s.reference[p] - f[p] - s.floating[m], C = f[p] - s.reference[p], S = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l));
    let T = S ? S[v] : 0;
    (!T || !await (i.isElement == null ? void 0 : i.isElement(S))) && (T = a.floating[v] || s.floating[m]);
    const k = b / 2 - C / 2, D = T / 2 - g[m] / 2 - 1, $ = ze(u[w], D), U = ze(u[x], D), I = $, j = T - g[m] - U, V = T / 2 - g[m] / 2 + k, X = wr(I, V, j), N = !c.arrow && Vt(o) != null && V !== X && s.reference[m] / 2 - (V < I ? $ : U) - g[m] / 2 < 0, M = N ? V < I ? V - I : V - j : 0;
    return {
      [p]: f[p] + M,
      data: {
        [p]: X,
        centerOffset: V - X - M,
        ...N && {
          alignmentOffset: M
        }
      },
      reset: N
    };
  }
}), Pl = function(t) {
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
        fallbackAxisSideDirection: m = "none",
        flipAlignment: g = !0,
        ...y
      } = Qe(t, e);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const w = Be(o), x = De(a), v = Be(a) === a, b = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), C = f || (v || !g ? [Nn(a)] : wl(a)), S = m !== "none";
      !f && S && C.push(...Cl(a, g, m, b));
      const T = [a, ...C], k = await c.detectOverflow(e, y), D = [];
      let $ = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (d && D.push(k[w]), u) {
        const V = bl(o, i, b);
        D.push(k[V[0]], k[V[1]]);
      }
      if ($ = [...$, {
        placement: o,
        overflows: D
      }], !D.every((V) => V <= 0)) {
        var U, I;
        const V = (((U = s.flip) == null ? void 0 : U.index) || 0) + 1, X = T[V];
        if (X && (!(u === "alignment" ? x !== De(X) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        $.every((P) => De(P.placement) === x ? P.overflows[0] > 0 : !0)))
          return {
            data: {
              index: V,
              overflows: $
            },
            reset: {
              placement: X
            }
          };
        let N = (I = $.filter((M) => M.overflows[0] <= 0).sort((M, P) => M.overflows[1] - P.overflows[1])[0]) == null ? void 0 : I.placement;
        if (!N)
          switch (p) {
            case "bestFit": {
              var j;
              const M = (j = $.filter((P) => {
                if (S) {
                  const F = De(P.placement);
                  return F === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  F === "y";
                }
                return !0;
              }).map((P) => [P.placement, P.overflows.filter((F) => F > 0).reduce((F, re) => F + re, 0)]).sort((P, F) => P[1] - F[1])[0]) == null ? void 0 : j[0];
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
function Vs(t) {
  const e = ze(...t.map((s) => s.left)), n = ze(...t.map((s) => s.top)), r = me(...t.map((s) => s.right)), o = me(...t.map((s) => s.bottom));
  return {
    x: e,
    y: n,
    width: r - e,
    height: o - n
  };
}
function Ol(t) {
  const e = t.slice().sort((o, s) => o.y - s.y), n = [];
  let r = null;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    !r || s.y - r.y > r.height / 2 ? n.push([s]) : n[n.length - 1].push(s), r = s;
  }
  return n.map((o) => Dt(Vs(o)));
}
const $l = function(t) {
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
      } = Qe(t, e), d = Array.from(await (s.getClientRects == null ? void 0 : s.getClientRects(r.reference)) || []), u = Ol(d), f = Dt(Vs(d)), p = Wr(a);
      function m() {
        if (u.length === 2 && u[0].left > u[1].right && c != null && l != null)
          return u.find((y) => c > y.left - p.left && c < y.right + p.right && l > y.top - p.top && l < y.bottom + p.bottom) || f;
        if (u.length >= 2) {
          if (De(n) === "y") {
            const $ = u[0], U = u[u.length - 1], I = Be(n) === "top", j = $.top, V = U.bottom, X = I ? $.left : U.left, N = I ? $.right : U.right, M = N - X, P = V - j;
            return {
              top: j,
              bottom: V,
              left: X,
              right: N,
              width: M,
              height: P,
              x: X,
              y: j
            };
          }
          const y = Be(n) === "left", w = me(...u.map(($) => $.right)), x = ze(...u.map(($) => $.left)), v = u.filter(($) => y ? $.left === x : $.right === w), b = v[0].top, C = v[v.length - 1].bottom, S = x, T = w, k = T - S, D = C - b;
          return {
            top: b,
            bottom: C,
            left: S,
            right: T,
            width: k,
            height: D,
            x: S,
            y: b
          };
        }
        return f;
      }
      const g = await s.getElementRects({
        reference: {
          getBoundingClientRect: m
        },
        floating: r.floating,
        strategy: i
      });
      return o.reference.x !== g.reference.x || o.reference.y !== g.reference.y || o.reference.width !== g.reference.width || o.reference.height !== g.reference.height ? {
        reset: {
          rects: g
        }
      } : {};
    }
  };
}, Ws = /* @__PURE__ */ new Set(["left", "top"]);
async function El(t, e) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = t, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = Be(n), a = Vt(n), c = De(n) === "y", l = Ws.has(i) ? -1 : 1, d = s && c ? -1 : 1, u = Qe(e, t);
  let {
    mainAxis: f,
    crossAxis: p,
    alignmentAxis: m
  } = typeof u == "number" ? {
    mainAxis: u,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: u.mainAxis || 0,
    crossAxis: u.crossAxis || 0,
    alignmentAxis: u.alignmentAxis
  };
  return a && typeof m == "number" && (p = a === "end" ? m * -1 : m), c ? {
    x: p * d,
    y: f * l
  } : {
    x: f * l,
    y: p * d
  };
}
const Il = function(t) {
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
      } = e, c = await El(e, t);
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
}, Dl = function(t) {
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
      } = Qe(t, e), d = {
        x: n,
        y: r
      }, u = await s.detectOverflow(e, l), f = De(Be(o)), p = jr(f);
      let m = d[p], g = d[f];
      if (i) {
        const w = p === "y" ? "top" : "left", x = p === "y" ? "bottom" : "right", v = m + u[w], b = m - u[x];
        m = wr(v, m, b);
      }
      if (a) {
        const w = f === "y" ? "top" : "left", x = f === "y" ? "bottom" : "right", v = g + u[w], b = g - u[x];
        g = wr(v, g, b);
      }
      const y = c.fn({
        ...e,
        [p]: m,
        [f]: g
      });
      return {
        ...y,
        data: {
          x: y.x - n,
          y: y.y - r,
          enabled: {
            [p]: i,
            [f]: a
          }
        }
      };
    }
  };
}, Ll = function(t) {
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
      } = Qe(t, e), d = {
        x: n,
        y: r
      }, u = De(o), f = jr(u);
      let p = d[f], m = d[u];
      const g = Qe(a, e), y = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (c) {
        const v = f === "y" ? "height" : "width", b = s.reference[f] - s.floating[v] + y.mainAxis, C = s.reference[f] + s.reference[v] - y.mainAxis;
        p < b ? p = b : p > C && (p = C);
      }
      if (l) {
        var w, x;
        const v = f === "y" ? "width" : "height", b = Ws.has(Be(o)), C = s.reference[u] - s.floating[v] + (b && ((w = i.offset) == null ? void 0 : w[u]) || 0) + (b ? 0 : y.crossAxis), S = s.reference[u] + s.reference[v] + (b ? 0 : ((x = i.offset) == null ? void 0 : x[u]) || 0) - (b ? y.crossAxis : 0);
        m < C ? m = C : m > S && (m = S);
      }
      return {
        [f]: p,
        [u]: m
      };
    }
  };
}, Ml = function(t) {
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
      } = Qe(t, e), d = await i.detectOverflow(e, l), u = Be(o), f = Vt(o), p = De(o) === "y", {
        width: m,
        height: g
      } = s.floating;
      let y, w;
      u === "top" || u === "bottom" ? (y = u, w = f === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (w = u, y = f === "end" ? "top" : "bottom");
      const x = g - d.top - d.bottom, v = m - d.left - d.right, b = ze(g - d[y], x), C = ze(m - d[w], v), S = !e.middlewareData.shift;
      let T = b, k = C;
      if ((n = e.middlewareData.shift) != null && n.enabled.x && (k = v), (r = e.middlewareData.shift) != null && r.enabled.y && (T = x), S && !f) {
        const $ = me(d.left, 0), U = me(d.right, 0), I = me(d.top, 0), j = me(d.bottom, 0);
        p ? k = m - 2 * ($ !== 0 || U !== 0 ? $ + U : me(d.left, d.right)) : T = g - 2 * (I !== 0 || j !== 0 ? I + j : me(d.top, d.bottom));
      }
      await c({
        ...e,
        availableWidth: k,
        availableHeight: T
      });
      const D = await i.getDimensions(a.floating);
      return m !== D.width || g !== D.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Zs(t) {
  const e = Me(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const o = tt(t), s = o ? t.offsetWidth : n, i = o ? t.offsetHeight : r, a = Rn(n) !== s || Rn(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function Zr(t) {
  return he(t) ? t : t.contextElement;
}
function Tt(t) {
  const e = Zr(t);
  if (!tt(e))
    return We(1);
  const n = e.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Zs(e);
  let i = (s ? Rn(n.width) : n.width) / r, a = (s ? Rn(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const zl = /* @__PURE__ */ We(0);
function Hs(t) {
  const e = ke(t);
  return !Br() || !e.visualViewport ? zl : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Bl(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== ke(t) ? !1 : e;
}
function wt(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const o = t.getBoundingClientRect(), s = Zr(t);
  let i = We(1);
  e && (r ? he(r) && (i = Tt(r)) : i = Tt(t));
  const a = Bl(s, n, r) ? Hs(s) : We(0);
  let c = (o.left + a.x) / i.x, l = (o.top + a.y) / i.y, d = o.width / i.x, u = o.height / i.y;
  if (s) {
    const f = ke(s), p = r && he(r) ? ke(r) : r;
    let m = f, g = br(m);
    for (; g && r && p !== m; ) {
      const y = Tt(g), w = g.getBoundingClientRect(), x = Me(g), v = w.left + (g.clientLeft + parseFloat(x.paddingLeft)) * y.x, b = w.top + (g.clientTop + parseFloat(x.paddingTop)) * y.y;
      c *= y.x, l *= y.y, d *= y.x, u *= y.y, c += v, l += b, m = ke(g), g = br(m);
    }
  }
  return Dt({
    width: d,
    height: u,
    x: c,
    y: l
  });
}
function zn(t, e) {
  const n = Mn(t).scrollLeft;
  return e ? e.left + n : wt(Ue(t)).left + n;
}
function Us(t, e) {
  const n = t.getBoundingClientRect(), r = n.left + e.scrollLeft - zn(t, n), o = n.top + e.scrollTop;
  return {
    x: r,
    y: o
  };
}
function jl(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: r,
    strategy: o
  } = t;
  const s = o === "fixed", i = Ue(r), a = e ? Ln(e.floating) : !1;
  if (r === i || a && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = We(1);
  const d = We(0), u = tt(r);
  if ((u || !u && !s) && ((Ft(r) !== "body" || on(i)) && (c = Mn(r)), u)) {
    const p = wt(r);
    l = Tt(r), d.x = p.x + r.clientLeft, d.y = p.y + r.clientTop;
  }
  const f = i && !u && !s ? Us(i, c) : We(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + d.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + d.y + f.y
  };
}
function Fl(t) {
  return Array.from(t.getClientRects());
}
function Vl(t) {
  const e = Ue(t), n = Mn(t), r = t.ownerDocument.body, o = me(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), s = me(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + zn(t);
  const a = -n.scrollTop;
  return Me(r).direction === "rtl" && (i += me(e.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
const Xo = 25;
function Wl(t, e) {
  const n = ke(t), r = Ue(t), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, c = 0;
  if (o) {
    s = o.width, i = o.height;
    const d = Br();
    (!d || d && e === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  const l = zn(r);
  if (l <= 0) {
    const d = r.ownerDocument, u = d.body, f = getComputedStyle(u), p = d.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, m = Math.abs(r.clientWidth - u.clientWidth - p);
    m <= Xo && (s -= m);
  } else l <= Xo && (s += l);
  return {
    width: s,
    height: i,
    x: a,
    y: c
  };
}
function Zl(t, e) {
  const n = wt(t, !0, e === "fixed"), r = n.top + t.clientTop, o = n.left + t.clientLeft, s = tt(t) ? Tt(t) : We(1), i = t.clientWidth * s.x, a = t.clientHeight * s.y, c = o * s.x, l = r * s.y;
  return {
    width: i,
    height: a,
    x: c,
    y: l
  };
}
function Go(t, e, n) {
  let r;
  if (e === "viewport")
    r = Wl(t, n);
  else if (e === "document")
    r = Vl(Ue(t));
  else if (he(e))
    r = Zl(e, n);
  else {
    const o = Hs(t);
    r = {
      x: e.x - o.x,
      y: e.y - o.y,
      width: e.width,
      height: e.height
    };
  }
  return Dt(r);
}
function Ys(t, e) {
  const n = ct(t);
  return n === e || !he(n) || It(n) ? !1 : Me(n).position === "fixed" || Ys(n, e);
}
function Hl(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let r = Qt(t, [], !1).filter((a) => he(a) && Ft(a) !== "body"), o = null;
  const s = Me(t).position === "fixed";
  let i = s ? ct(t) : t;
  for (; he(i) && !It(i); ) {
    const a = Me(i), c = zr(i);
    !c && a.position === "fixed" && (o = null), (s ? !c && !o : !c && a.position === "static" && !!o && (o.position === "absolute" || o.position === "fixed") || on(i) && !c && Ys(t, i)) ? r = r.filter((d) => d !== i) : o = a, i = ct(i);
  }
  return e.set(t, r), r;
}
function Ul(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = t;
  const i = [...n === "clippingAncestors" ? Ln(e) ? [] : Hl(e, this._c) : [].concat(n), r], a = Go(e, i[0], o);
  let c = a.top, l = a.right, d = a.bottom, u = a.left;
  for (let f = 1; f < i.length; f++) {
    const p = Go(e, i[f], o);
    c = me(p.top, c), l = ze(p.right, l), d = ze(p.bottom, d), u = me(p.left, u);
  }
  return {
    width: l - u,
    height: d - c,
    x: u,
    y: c
  };
}
function Yl(t) {
  const {
    width: e,
    height: n
  } = Zs(t);
  return {
    width: e,
    height: n
  };
}
function ql(t, e, n) {
  const r = tt(e), o = Ue(e), s = n === "fixed", i = wt(t, !0, s, e);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = We(0);
  function l() {
    c.x = zn(o);
  }
  if (r || !r && !s)
    if ((Ft(e) !== "body" || on(o)) && (a = Mn(e)), r) {
      const p = wt(e, !0, s, e);
      c.x = p.x + e.clientLeft, c.y = p.y + e.clientTop;
    } else o && l();
  s && !r && o && l();
  const d = o && !r && !s ? Us(o, a) : We(0), u = i.left + a.scrollLeft - c.x - d.x, f = i.top + a.scrollTop - c.y - d.y;
  return {
    x: u,
    y: f,
    width: i.width,
    height: i.height
  };
}
function rr(t) {
  return Me(t).position === "static";
}
function Ko(t, e) {
  if (!tt(t) || Me(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return Ue(t) === n && (n = n.ownerDocument.body), n;
}
function qs(t, e) {
  const n = ke(t);
  if (Ln(t))
    return n;
  if (!tt(t)) {
    let o = ct(t);
    for (; o && !It(o); ) {
      if (he(o) && !rr(o))
        return o;
      o = ct(o);
    }
    return n;
  }
  let r = Ko(t, e);
  for (; r && ml(r) && rr(r); )
    r = Ko(r, e);
  return r && It(r) && rr(r) && !zr(r) ? n : r || yl(t) || n;
}
const Xl = async function(t) {
  const e = this.getOffsetParent || qs, n = this.getDimensions, r = await n(t.floating);
  return {
    reference: ql(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Gl(t) {
  return Me(t).direction === "rtl";
}
const Kl = {
  convertOffsetParentRelativeRectToViewportRelativeRect: jl,
  getDocumentElement: Ue,
  getClippingRect: Ul,
  getOffsetParent: qs,
  getElementRects: Xl,
  getClientRects: Fl,
  getDimensions: Yl,
  getScale: Tt,
  isElement: he,
  isRTL: Gl
};
function Xs(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Jl(t, e) {
  let n = null, r;
  const o = Ue(t);
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
    const m = pn(u), g = pn(o.clientWidth - (d + f)), y = pn(o.clientHeight - (u + p)), w = pn(d), v = {
      rootMargin: -m + "px " + -g + "px " + -y + "px " + -w + "px",
      threshold: me(0, ze(1, c)) || 1
    };
    let b = !0;
    function C(S) {
      const T = S[0].intersectionRatio;
      if (T !== c) {
        if (!b)
          return i();
        T ? i(!1, T) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      T === 1 && !Xs(l, t.getBoundingClientRect()) && i(), b = !1;
    }
    try {
      n = new IntersectionObserver(C, {
        ...v,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(C, v);
    }
    n.observe(t);
  }
  return i(!0), s;
}
function Ql(t, e, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = Zr(t), d = o || s ? [...l ? Qt(l) : [], ...e ? Qt(e) : []] : [];
  d.forEach((w) => {
    o && w.addEventListener("scroll", n, {
      passive: !0
    }), s && w.addEventListener("resize", n);
  });
  const u = l && a ? Jl(l, n) : null;
  let f = -1, p = null;
  i && (p = new ResizeObserver((w) => {
    let [x] = w;
    x && x.target === l && p && e && (p.unobserve(e), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var v;
      (v = p) == null || v.observe(e);
    })), n();
  }), l && !c && p.observe(l), e && p.observe(e));
  let m, g = c ? wt(t) : null;
  c && y();
  function y() {
    const w = wt(t);
    g && !Xs(g, w) && n(), g = w, m = requestAnimationFrame(y);
  }
  return n(), () => {
    var w;
    d.forEach((x) => {
      o && x.removeEventListener("scroll", n), s && x.removeEventListener("resize", n);
    }), u == null || u(), (w = p) == null || w.disconnect(), p = null, c && cancelAnimationFrame(m);
  };
}
const ed = Il, td = Dl, nd = Pl, rd = Ml, Jo = Al, od = $l, sd = Ll, id = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Kl,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return Nl(t, e, {
    ...o,
    platform: s
  });
};
var ad = typeof document < "u", cd = function() {
}, gn = ad ? Rr : cd;
function An(t, e) {
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
        if (!An(t[r], e[r]))
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
      if (!(s === "_owner" && t.$$typeof) && !An(t[s], e[s]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}
function Gs(t) {
  return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Qo(t, e) {
  const n = Gs(t);
  return Math.round(e * n) / n;
}
function or(t) {
  const e = Z.useRef(t);
  return gn(() => {
    e.current = t;
  }), e;
}
function ld(t) {
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
  } = t, [d, u] = Z.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: e,
    middlewareData: {},
    isPositioned: !1
  }), [f, p] = Z.useState(r);
  An(f, r) || p(r);
  const [m, g] = Z.useState(null), [y, w] = Z.useState(null), x = Z.useCallback((P) => {
    P !== S.current && (S.current = P, g(P));
  }, []), v = Z.useCallback((P) => {
    P !== T.current && (T.current = P, w(P));
  }, []), b = s || m, C = i || y, S = Z.useRef(null), T = Z.useRef(null), k = Z.useRef(d), D = c != null, $ = or(c), U = or(o), I = or(l), j = Z.useCallback(() => {
    if (!S.current || !T.current)
      return;
    const P = {
      placement: e,
      strategy: n,
      middleware: f
    };
    U.current && (P.platform = U.current), id(S.current, T.current, P).then((F) => {
      const re = {
        ...F,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: I.current !== !1
      };
      V.current && !An(k.current, re) && (k.current = re, Xi.flushSync(() => {
        u(re);
      }));
    });
  }, [f, e, n, U, I]);
  gn(() => {
    l === !1 && k.current.isPositioned && (k.current.isPositioned = !1, u((P) => ({
      ...P,
      isPositioned: !1
    })));
  }, [l]);
  const V = Z.useRef(!1);
  gn(() => (V.current = !0, () => {
    V.current = !1;
  }), []), gn(() => {
    if (b && (S.current = b), C && (T.current = C), b && C) {
      if ($.current)
        return $.current(b, C, j);
      j();
    }
  }, [b, C, j, $, D]);
  const X = Z.useMemo(() => ({
    reference: S,
    floating: T,
    setReference: x,
    setFloating: v
  }), [x, v]), N = Z.useMemo(() => ({
    reference: b,
    floating: C
  }), [b, C]), M = Z.useMemo(() => {
    const P = {
      position: n,
      left: 0,
      top: 0
    };
    if (!N.floating)
      return P;
    const F = Qo(N.floating, d.x), re = Qo(N.floating, d.y);
    return a ? {
      ...P,
      transform: "translate(" + F + "px, " + re + "px)",
      ...Gs(N.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: F,
      top: re
    };
  }, [n, a, N.floating, d.x, d.y]);
  return Z.useMemo(() => ({
    ...d,
    update: j,
    refs: X,
    elements: N,
    floatingStyles: M
  }), [d, j, X, N, M]);
}
const dd = (t) => {
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
      return r && e(r) ? r.current != null ? Jo({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Jo({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, ud = (t, e) => {
  const n = ed(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, fd = (t, e) => {
  const n = td(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, es = (t, e) => ({
  fn: sd(t).fn,
  options: [t, e]
}), ts = (t, e) => {
  const n = nd(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, pd = (t, e) => {
  const n = rd(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, ns = (t, e) => {
  const n = od(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, md = (t, e) => {
  const n = dd(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
};
function hd(t) {
  return Z.useMemo(() => t.every((e) => e == null) ? null : (e) => {
    t.forEach((n) => {
      typeof n == "function" ? n(e) : n != null && (n.current = e);
    });
  }, t);
}
const Ks = {
  ...Z
}, gd = Ks.useInsertionEffect, yd = gd || ((t) => t());
function vd(t) {
  const e = Z.useRef(() => {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Cannot call an event handler while rendering.");
  });
  return yd(() => {
    e.current = t;
  }), Z.useCallback(function() {
    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
      r[o] = arguments[o];
    return e.current == null ? void 0 : e.current(...r);
  }, []);
}
var _r = typeof document < "u" ? Rr : te;
let rs = !1, bd = 0;
const os = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + bd++
);
function wd() {
  const [t, e] = Z.useState(() => rs ? os() : void 0);
  return _r(() => {
    t == null && e(os());
  }, []), Z.useEffect(() => {
    rs = !0;
  }, []), t;
}
const xd = Ks.useId, _d = xd || wd;
let Sr;
process.env.NODE_ENV !== "production" && (Sr = /* @__PURE__ */ new Set());
function Sd() {
  for (var t, e = arguments.length, n = new Array(e), r = 0; r < e; r++)
    n[r] = arguments[r];
  const o = "Floating UI: " + n.join(" ");
  if (!((t = Sr) != null && t.has(o))) {
    var s;
    (s = Sr) == null || s.add(o), console.error(o);
  }
}
function Cd() {
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
const kd = /* @__PURE__ */ Z.createContext(null), Td = /* @__PURE__ */ Z.createContext(null), Rd = () => {
  var t;
  return ((t = Z.useContext(kd)) == null ? void 0 : t.id) || null;
}, Nd = () => Z.useContext(Td);
function Ad(t) {
  const {
    open: e = !1,
    onOpenChange: n,
    elements: r
  } = t, o = _d(), s = Z.useRef({}), [i] = Z.useState(() => Cd()), a = Rd() != null;
  if (process.env.NODE_ENV !== "production") {
    const p = r.reference;
    p && !he(p) && Sd("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
  }
  const [c, l] = Z.useState(r.reference), d = vd((p, m, g) => {
    s.current.openEvent = p ? m : void 0, i.emit("openchange", {
      open: p,
      event: m,
      reason: g,
      nested: a
    }), n == null || n(p, m, g);
  }), u = Z.useMemo(() => ({
    setPositionReference: l
  }), []), f = Z.useMemo(() => ({
    reference: c || r.reference || null,
    floating: r.floating || null,
    domReference: r.reference
  }), [c, r.reference, r.floating]);
  return Z.useMemo(() => ({
    dataRef: s,
    open: e,
    onOpenChange: d,
    elements: f,
    events: i,
    floatingId: o,
    refs: u
  }), [e, d, f, i, o, u]);
}
function Pd(t) {
  t === void 0 && (t = {});
  const {
    nodeId: e
  } = t, n = Ad({
    ...t,
    elements: {
      reference: null,
      floating: null,
      ...t.elements
    }
  }), r = t.rootContext || n, o = r.elements, [s, i] = Z.useState(null), [a, c] = Z.useState(null), d = (o == null ? void 0 : o.domReference) || s, u = Z.useRef(null), f = Nd();
  _r(() => {
    d && (u.current = d);
  }, [d]);
  const p = ld({
    ...t,
    elements: {
      ...o,
      ...a && {
        reference: a
      }
    }
  }), m = Z.useCallback((v) => {
    const b = he(v) ? {
      getBoundingClientRect: () => v.getBoundingClientRect(),
      contextElement: v
    } : v;
    c(b), p.refs.setReference(b);
  }, [p.refs]), g = Z.useCallback((v) => {
    (he(v) || v === null) && (u.current = v, i(v)), (he(p.refs.reference.current) || p.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    v !== null && !he(v)) && p.refs.setReference(v);
  }, [p.refs]), y = Z.useMemo(() => ({
    ...p.refs,
    setReference: g,
    setPositionReference: m,
    domReference: u
  }), [p.refs, g, m]), w = Z.useMemo(() => ({
    ...p.elements,
    domReference: d
  }), [p.elements, d]), x = Z.useMemo(() => ({
    ...p,
    ...r,
    refs: y,
    elements: w,
    nodeId: e
  }), [p, y, w, e, r]);
  return _r(() => {
    r.dataRef.current.floatingContext = x;
    const v = f == null ? void 0 : f.nodesRef.current.find((b) => b.id === e);
    v && (v.context = x);
  }), Z.useMemo(() => ({
    ...p,
    context: x,
    refs: y,
    elements: w
  }), [p, y, w, x]);
}
const [Od, Oe] = Bt(
  "ScrollArea.Root component was not found in tree"
);
function Lt(t, e) {
  const n = ht(e);
  $r(() => {
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
const $d = oe((t, e) => {
  const { style: n, ...r } = t, o = Oe(), [s, i] = G(0), [a, c] = G(0), l = !!(s && a);
  return Lt(o.scrollbarX, () => {
    var u;
    const d = ((u = o.scrollbarX) == null ? void 0 : u.offsetHeight) || 0;
    o.onCornerHeightChange(d), c(d);
  }), Lt(o.scrollbarY, () => {
    var u;
    const d = ((u = o.scrollbarY) == null ? void 0 : u.offsetWidth) || 0;
    o.onCornerWidthChange(d), i(d);
  }), l ? /* @__PURE__ */ h("div", { ...r, ref: e, style: { ...n, width: s, height: a } }) : null;
}), Ed = oe((t, e) => {
  const n = Oe(), r = !!(n.scrollbarX && n.scrollbarY);
  return n.type !== "scroll" && r ? /* @__PURE__ */ h($d, { ...t, ref: e }) : null;
}), Id = {
  scrollHideDelay: 1e3,
  type: "hover"
}, Js = oe((t, e) => {
  const n = E("ScrollAreaRoot", Id, t), { type: r, scrollHideDelay: o, scrollbars: s, ...i } = n, [a, c] = G(null), [l, d] = G(null), [u, f] = G(null), [p, m] = G(null), [g, y] = G(null), [w, x] = G(0), [v, b] = G(0), [C, S] = G(!1), [T, k] = G(!1), D = Pe(e, ($) => c($));
  return /* @__PURE__ */ h(
    Od,
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
        onScrollbarXChange: m,
        scrollbarXEnabled: C,
        onScrollbarXEnabledChange: S,
        scrollbarY: g,
        onScrollbarYChange: y,
        scrollbarYEnabled: T,
        onScrollbarYEnabledChange: k,
        onCornerWidthChange: x,
        onCornerHeightChange: b
      },
      children: /* @__PURE__ */ h(
        W,
        {
          ...i,
          ref: D,
          __vars: {
            "--sa-corner-width": s !== "xy" ? "0px" : `${w}px`,
            "--sa-corner-height": s !== "xy" ? "0px" : `${v}px`
          }
        }
      )
    }
  );
});
Js.displayName = "@mantine/core/ScrollAreaRoot";
function Qs(t, e) {
  const n = t / e;
  return Number.isNaN(n) ? 0 : n;
}
function Bn(t) {
  const e = Qs(t.viewport, t.content), n = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, r = (t.scrollbar.size - n) * e;
  return Math.max(r, 18);
}
function ei(t, e) {
  return (n) => {
    if (t[0] === t[1] || e[0] === e[1])
      return e[0];
    const r = (e[1] - e[0]) / (t[1] - t[0]);
    return e[0] + r * (n - t[0]);
  };
}
function Dd(t, [e, n]) {
  return Math.min(n, Math.max(e, t));
}
function ss(t, e, n = "ltr") {
  const r = Bn(e), o = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, s = e.scrollbar.size - o, i = e.content - e.viewport, a = s - r, c = n === "ltr" ? [0, i] : [i * -1, 0], l = Dd(t, c);
  return ei([0, i], [0, a])(l);
}
function Ld(t, e, n, r = "ltr") {
  const o = Bn(n), s = o / 2, i = e || s, a = o - i, c = n.scrollbar.paddingStart + i, l = n.scrollbar.size - n.scrollbar.paddingEnd - a, d = n.content - n.viewport, u = r === "ltr" ? [0, d] : [d * -1, 0];
  return ei([c, l], u)(t);
}
function ti(t, e) {
  return t > 0 && t < e;
}
function Pn(t) {
  return t ? parseInt(t, 10) : 0;
}
function gt(t, e, { checkForDefaultPrevented: n = !0 } = {}) {
  return (r) => {
    t == null || t(r), (n === !1 || !r.defaultPrevented) && (e == null || e(r));
  };
}
const [Md, ni] = Bt(
  "ScrollAreaScrollbar was not found in tree"
), ri = oe((t, e) => {
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
  } = t, f = Oe(), [p, m] = G(null), g = Pe(e, (k) => m(k)), y = J(null), w = J(""), { viewport: x } = f, v = n.content - n.viewport, b = ht(l), C = ht(a), S = $n(d, 10), T = (k) => {
    if (y.current) {
      const D = k.clientX - y.current.left, $ = k.clientY - y.current.top;
      c({ x: D, y: $ });
    }
  };
  return te(() => {
    const k = (D) => {
      const $ = D.target;
      (p == null ? void 0 : p.contains($)) && b(D, v);
    };
    return document.addEventListener("wheel", k, { passive: !1 }), () => document.removeEventListener("wheel", k, { passive: !1 });
  }, [x, p, v, b]), te(C, [n, C]), Lt(p, S), Lt(f.content, S), /* @__PURE__ */ h(
    Md,
    {
      value: {
        scrollbar: p,
        hasThumb: r,
        onThumbChange: ht(o),
        onThumbPointerUp: ht(s),
        onThumbPositionChange: C,
        onThumbPointerDown: ht(i)
      },
      children: /* @__PURE__ */ h(
        "div",
        {
          ...u,
          ref: g,
          "data-mantine-scrollbar": !0,
          style: { position: "absolute", ...u.style },
          onPointerDown: gt(t.onPointerDown, (k) => {
            k.preventDefault(), k.button === 0 && (k.target.setPointerCapture(k.pointerId), y.current = p.getBoundingClientRect(), w.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", T(k));
          }),
          onPointerMove: gt(t.onPointerMove, T),
          onPointerUp: gt(t.onPointerUp, (k) => {
            const D = k.target;
            D.hasPointerCapture(k.pointerId) && (k.preventDefault(), D.releasePointerCapture(k.pointerId));
          }),
          onLostPointerCapture: () => {
            document.body.style.webkitUserSelect = w.current, y.current = null;
          }
        }
      )
    }
  );
}), oi = oe(
  (t, e) => {
    const { sizes: n, onSizesChange: r, style: o, ...s } = t, i = Oe(), [a, c] = G(), l = J(null), d = Pe(e, l, i.onScrollbarXChange);
    return te(() => {
      l.current && c(getComputedStyle(l.current));
    }, [l]), /* @__PURE__ */ h(
      ri,
      {
        "data-orientation": "horizontal",
        ...s,
        ref: d,
        sizes: n,
        style: {
          ...o,
          "--sa-thumb-width": `${Bn(n)}px`
        },
        onThumbPointerDown: (u) => t.onThumbPointerDown(u.x),
        onDragScroll: (u) => t.onDragScroll(u.x),
        onWheelScroll: (u, f) => {
          if (i.viewport) {
            const p = i.viewport.scrollLeft + u.deltaX;
            t.onWheelScroll(p), ti(p, f) && u.preventDefault();
          }
        },
        onResize: () => {
          l.current && i.viewport && a && r({
            content: i.viewport.scrollWidth,
            viewport: i.viewport.offsetWidth,
            scrollbar: {
              size: l.current.clientWidth,
              paddingStart: Pn(a.paddingLeft),
              paddingEnd: Pn(a.paddingRight)
            }
          });
        }
      }
    );
  }
);
oi.displayName = "@mantine/core/ScrollAreaScrollbarX";
const si = oe(
  (t, e) => {
    const { sizes: n, onSizesChange: r, style: o, ...s } = t, i = Oe(), [a, c] = G(), l = J(null), d = Pe(e, l, i.onScrollbarYChange);
    return te(() => {
      l.current && c(window.getComputedStyle(l.current));
    }, []), /* @__PURE__ */ h(
      ri,
      {
        ...s,
        "data-orientation": "vertical",
        ref: d,
        sizes: n,
        style: {
          "--sa-thumb-height": `${Bn(n)}px`,
          ...o
        },
        onThumbPointerDown: (u) => t.onThumbPointerDown(u.y),
        onDragScroll: (u) => t.onDragScroll(u.y),
        onWheelScroll: (u, f) => {
          if (i.viewport) {
            const p = i.viewport.scrollTop + u.deltaY;
            t.onWheelScroll(p), ti(p, f) && u.preventDefault();
          }
        },
        onResize: () => {
          l.current && i.viewport && a && r({
            content: i.viewport.scrollHeight,
            viewport: i.viewport.offsetHeight,
            scrollbar: {
              size: l.current.clientHeight,
              paddingStart: Pn(a.paddingTop),
              paddingEnd: Pn(a.paddingBottom)
            }
          });
        }
      }
    );
  }
);
si.displayName = "@mantine/core/ScrollAreaScrollbarY";
const jn = oe((t, e) => {
  const { orientation: n = "vertical", ...r } = t, { dir: o } = Mr(), s = Oe(), i = J(null), a = J(0), [c, l] = G({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), d = Qs(c.viewport, c.content), u = {
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
  }, f = (p, m) => Ld(p, a.current, c, m);
  return n === "horizontal" ? /* @__PURE__ */ h(
    oi,
    {
      ...u,
      ref: e,
      onThumbPositionChange: () => {
        if (s.viewport && i.current) {
          const p = s.viewport.scrollLeft, m = ss(p, c, o);
          i.current.style.transform = `translate3d(${m}px, 0, 0)`;
        }
      },
      onWheelScroll: (p) => {
        s.viewport && (s.viewport.scrollLeft = p);
      },
      onDragScroll: (p) => {
        s.viewport && (s.viewport.scrollLeft = f(p, o));
      }
    }
  ) : n === "vertical" ? /* @__PURE__ */ h(
    si,
    {
      ...u,
      ref: e,
      onThumbPositionChange: () => {
        if (s.viewport && i.current) {
          const p = s.viewport.scrollTop, m = ss(p, c);
          c.scrollbar.size === 0 ? i.current.style.setProperty("--thumb-opacity", "0") : i.current.style.setProperty("--thumb-opacity", "1"), i.current.style.transform = `translate3d(0, ${m}px, 0)`;
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
jn.displayName = "@mantine/core/ScrollAreaScrollbarVisible";
const Hr = oe(
  (t, e) => {
    const n = Oe(), { forceMount: r, ...o } = t, [s, i] = G(!1), a = t.orientation === "horizontal", c = $n(() => {
      if (n.viewport) {
        const l = n.viewport.offsetWidth < n.viewport.scrollWidth, d = n.viewport.offsetHeight < n.viewport.scrollHeight;
        i(a ? l : d);
      }
    }, 10);
    return Lt(n.viewport, c), Lt(n.content, c), r || s ? /* @__PURE__ */ h(
      jn,
      {
        "data-state": s ? "visible" : "hidden",
        ...o,
        ref: e
      }
    ) : null;
  }
);
Hr.displayName = "@mantine/core/ScrollAreaScrollbarAuto";
const ii = oe(
  (t, e) => {
    const { forceMount: n, ...r } = t, o = Oe(), [s, i] = G(!1);
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
    }, [o.scrollArea, o.scrollHideDelay]), n || s ? /* @__PURE__ */ h(
      Hr,
      {
        "data-state": s ? "visible" : "hidden",
        ...r,
        ref: e
      }
    ) : null;
  }
);
ii.displayName = "@mantine/core/ScrollAreaScrollbarHover";
const zd = oe(
  (t, e) => {
    const { forceMount: n, ...r } = t, o = Oe(), s = t.orientation === "horizontal", [i, a] = G("hidden"), c = $n(() => a("idle"), 100);
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
    }, [o.viewport, s, c]), n || i !== "hidden" ? /* @__PURE__ */ h(
      jn,
      {
        "data-state": i === "hidden" ? "hidden" : "visible",
        ...r,
        ref: e,
        onPointerEnter: gt(t.onPointerEnter, () => a("interacting")),
        onPointerLeave: gt(t.onPointerLeave, () => a("idle"))
      }
    ) : null;
  }
), Cr = oe(
  (t, e) => {
    const { forceMount: n, ...r } = t, o = Oe(), { onScrollbarXEnabledChange: s, onScrollbarYEnabledChange: i } = o, a = t.orientation === "horizontal";
    return te(() => (a ? s(!0) : i(!0), () => {
      a ? s(!1) : i(!1);
    }), [a, s, i]), o.type === "hover" ? /* @__PURE__ */ h(ii, { ...r, ref: e, forceMount: n }) : o.type === "scroll" ? /* @__PURE__ */ h(zd, { ...r, ref: e, forceMount: n }) : o.type === "auto" ? /* @__PURE__ */ h(Hr, { ...r, ref: e, forceMount: n }) : o.type === "always" ? /* @__PURE__ */ h(jn, { ...r, ref: e }) : null;
  }
);
Cr.displayName = "@mantine/core/ScrollAreaScrollbar";
function Bd(t, e = () => {
}) {
  let n = { left: t.scrollLeft, top: t.scrollTop }, r = 0;
  return (function o() {
    const s = { left: t.scrollLeft, top: t.scrollTop }, i = n.left !== s.left, a = n.top !== s.top;
    (i || a) && e(), n = s, r = window.requestAnimationFrame(o);
  })(), () => window.cancelAnimationFrame(r);
}
const ai = oe((t, e) => {
  const { style: n, ...r } = t, o = Oe(), s = ni(), { onThumbPositionChange: i } = s, a = Pe(e, (d) => s.onThumbChange(d)), c = J(void 0), l = $n(() => {
    c.current && (c.current(), c.current = void 0);
  }, 100);
  return te(() => {
    const { viewport: d } = o;
    if (d) {
      const u = () => {
        if (l(), !c.current) {
          const f = Bd(d, i);
          c.current = f, i();
        }
      };
      return i(), d.addEventListener("scroll", u), () => d.removeEventListener("scroll", u);
    }
  }, [o.viewport, l, i]), /* @__PURE__ */ h(
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
      onPointerDownCapture: gt(t.onPointerDownCapture, (d) => {
        const f = d.target.getBoundingClientRect(), p = d.clientX - f.left, m = d.clientY - f.top;
        s.onThumbPointerDown({ x: p, y: m });
      }),
      onPointerUp: gt(t.onPointerUp, s.onThumbPointerUp)
    }
  );
});
ai.displayName = "@mantine/core/ScrollAreaThumb";
const kr = oe(
  (t, e) => {
    const { forceMount: n, ...r } = t, o = ni();
    return n || o.hasThumb ? /* @__PURE__ */ h(ai, { ref: e, ...r }) : null;
  }
);
kr.displayName = "@mantine/core/ScrollAreaThumb";
const ci = oe(
  ({ children: t, style: e, ...n }, r) => {
    const o = Oe(), s = Pe(r, o.onViewportChange);
    return /* @__PURE__ */ h(
      W,
      {
        ...n,
        ref: s,
        style: {
          overflowX: o.scrollbarXEnabled ? "scroll" : "hidden",
          overflowY: o.scrollbarYEnabled ? "scroll" : "hidden",
          ...e
        },
        children: /* @__PURE__ */ h("div", { style: { minWidth: "100%" }, ref: o.onContentChange, children: t })
      }
    );
  }
);
ci.displayName = "@mantine/core/ScrollAreaViewport";
var Ur = { root: "m_d57069b5", viewport: "m_c0783ff9", viewportInner: "m_f8f631dd", scrollbar: "m_c44ba933", thumb: "m_d8b5e363", corner: "m_21657268" };
const li = {
  scrollHideDelay: 1e3,
  type: "hover",
  scrollbars: "xy"
}, jd = (t, { scrollbarSize: e, overscrollBehavior: n }) => ({
  root: {
    "--scrollarea-scrollbar-size": ne(e),
    "--scrollarea-over-scroll-behavior": n
  }
}), Wt = q((t, e) => {
  const n = E("ScrollArea", li, t), {
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
    onScrollPositionChange: m,
    children: g,
    offsetScrollbars: y,
    scrollbars: w,
    onBottomReached: x,
    onTopReached: v,
    overscrollBehavior: b,
    ...C
  } = n, [S, T] = G(!1), [k, D] = G(!1), [$, U] = G(!1), I = se({
    name: "ScrollArea",
    props: n,
    classes: Ur,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: jd
  }), j = J(null), V = hd([p, j]);
  return te(() => {
    if (!j.current || y !== "present")
      return;
    const X = j.current, N = new ResizeObserver(() => {
      const { scrollHeight: M, clientHeight: P, scrollWidth: F, clientWidth: re } = X;
      D(M > P), U(F > re);
    });
    return N.observe(X), () => N.disconnect();
  }, [j, y]), /* @__PURE__ */ ae(
    Js,
    {
      type: d === "never" ? "always" : d,
      scrollHideDelay: u,
      ref: e,
      scrollbars: w,
      ...I("root"),
      ...C,
      children: [
        /* @__PURE__ */ h(
          ci,
          {
            ...f,
            ...I("viewport", { style: f == null ? void 0 : f.style }),
            ref: V,
            "data-offset-scrollbars": y === !0 ? "xy" : y || void 0,
            "data-scrollbars": w || void 0,
            "data-horizontal-hidden": y === "present" && !$ ? "true" : void 0,
            "data-vertical-hidden": y === "present" && !k ? "true" : void 0,
            onScroll: (X) => {
              var F;
              (F = f == null ? void 0 : f.onScroll) == null || F.call(f, X), m == null || m({ x: X.currentTarget.scrollLeft, y: X.currentTarget.scrollTop });
              const { scrollTop: N, scrollHeight: M, clientHeight: P } = X.currentTarget;
              N - (M - P) >= -0.6 && (x == null || x()), N === 0 && (v == null || v());
            },
            children: g
          }
        ),
        (w === "xy" || w === "x") && /* @__PURE__ */ h(
          Cr,
          {
            ...I("scrollbar"),
            orientation: "horizontal",
            "data-hidden": d === "never" || y === "present" && !$ ? !0 : void 0,
            forceMount: !0,
            onMouseEnter: () => T(!0),
            onMouseLeave: () => T(!1),
            children: /* @__PURE__ */ h(kr, { ...I("thumb") })
          }
        ),
        (w === "xy" || w === "y") && /* @__PURE__ */ h(
          Cr,
          {
            ...I("scrollbar"),
            orientation: "vertical",
            "data-hidden": d === "never" || y === "present" && !k ? !0 : void 0,
            forceMount: !0,
            onMouseEnter: () => T(!0),
            onMouseLeave: () => T(!1),
            children: /* @__PURE__ */ h(kr, { ...I("thumb") })
          }
        ),
        /* @__PURE__ */ h(
          Ed,
          {
            ...I("corner"),
            "data-hovered": S || void 0,
            "data-hidden": d === "never" || void 0
          }
        )
      ]
    }
  );
});
Wt.displayName = "@mantine/core/ScrollArea";
const Yr = q((t, e) => {
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
    viewportProps: m,
    scrollbars: g,
    style: y,
    vars: w,
    onBottomReached: x,
    onTopReached: v,
    ...b
  } = E("ScrollAreaAutosize", li, t);
  return /* @__PURE__ */ h(W, { ...b, ref: e, style: [{ display: "flex", overflow: "auto" }, y], children: /* @__PURE__ */ h(W, { style: { display: "flex", flexDirection: "column", flex: 1 }, children: /* @__PURE__ */ h(
    Wt,
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
      viewportProps: m,
      vars: w,
      scrollbars: g,
      onBottomReached: x,
      onTopReached: v,
      children: n
    }
  ) }) });
});
Wt.classes = Ur;
Yr.displayName = "@mantine/core/ScrollAreaAutosize";
Yr.classes = Ur;
Wt.Autosize = Yr;
var di = { root: "m_87cf2631" };
const Fd = {
  __staticSelector: "UnstyledButton"
}, Fn = He(
  (t, e) => {
    const n = E("UnstyledButton", Fd, t), {
      className: r,
      component: o = "button",
      __staticSelector: s,
      unstyled: i,
      classNames: a,
      styles: c,
      style: l,
      ...d
    } = n, u = se({
      name: s,
      props: n,
      classes: di,
      className: r,
      style: l,
      classNames: a,
      styles: c,
      unstyled: i
    });
    return /* @__PURE__ */ h(
      W,
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
Fn.classes = di;
Fn.displayName = "@mantine/core/UnstyledButton";
var ui = { root: "m_515a97f8" };
const Vd = {}, qr = q((t, e) => {
  const n = E("VisuallyHidden", Vd, t), { classNames: r, className: o, style: s, styles: i, unstyled: a, vars: c, ...l } = n, d = se({
    name: "VisuallyHidden",
    classes: ui,
    props: n,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a
  });
  return /* @__PURE__ */ h(W, { component: "span", ref: e, ...d("root"), ...l });
});
qr.classes = ui;
qr.displayName = "@mantine/core/VisuallyHidden";
var fi = { root: "m_1b7284a3" };
const Wd = {}, Zd = (t, { radius: e, shadow: n }) => ({
  root: {
    "--paper-radius": e === void 0 ? void 0 : xt(e),
    "--paper-shadow": Ns(n)
  }
}), Xr = He((t, e) => {
  const n = E("Paper", Wd, t), {
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
    ...m
  } = n, g = se({
    name: "Paper",
    props: n,
    classes: fi,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: Zd
  });
  return /* @__PURE__ */ h(
    W,
    {
      ref: e,
      mod: [{ "data-with-border": c }, p],
      ...g("root"),
      variant: f,
      ...m
    }
  );
});
Xr.classes = fi;
Xr.displayName = "@mantine/core/Paper";
function Hd(t, e) {
  if (t === "rtl" && (e.includes("right") || e.includes("left"))) {
    const [n, r] = e.split("-"), o = n === "right" ? "left" : "right";
    return r === void 0 ? o : `${o}-${r}`;
  }
  return e;
}
function is(t, e, n, r) {
  return t === "center" || r === "center" ? { top: e } : t === "end" ? { bottom: n } : t === "start" ? { top: n } : {};
}
function as(t, e, n, r, o) {
  return t === "center" || r === "center" ? { left: e } : t === "end" ? { [o === "ltr" ? "right" : "left"]: n } : t === "start" ? { [o === "ltr" ? "left" : "right"]: n } : {};
}
const Ud = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius"
};
function Yd({
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
    [Ud[c]]: r
  }, u = -e / 2;
  return c === "left" ? {
    ...d,
    ...is(l, i, n, o),
    right: u,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    clipPath: "polygon(100% 0, 0 0, 100% 100%)"
  } : c === "right" ? {
    ...d,
    ...is(l, i, n, o),
    left: u,
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    clipPath: "polygon(0 100%, 0 0, 100% 100%)"
  } : c === "top" ? {
    ...d,
    ...as(l, s, n, o, a),
    bottom: u,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    clipPath: "polygon(0 100%, 100% 100%, 100% 0)"
  } : c === "bottom" ? {
    ...d,
    ...as(l, s, n, o, a),
    top: u,
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    clipPath: "polygon(0 100%, 0 0, 100% 0)"
  } : {};
}
const pi = oe(
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
    const { dir: u } = Mr();
    return s ? /* @__PURE__ */ h(
      "div",
      {
        ...l,
        ref: d,
        style: {
          ...c,
          ...Yd({
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
pi.displayName = "@mantine/core/FloatingArrow";
var mi = { root: "m_9814e45f" };
const qd = {
  zIndex: Rs("modal")
}, Xd = (t, { gradient: e, color: n, backgroundOpacity: r, blur: o, radius: s, zIndex: i }) => ({
  root: {
    "--overlay-bg": e || (n !== void 0 || r !== void 0) && Ac(n || "#000", r ?? 0.6) || void 0,
    "--overlay-filter": o ? `blur(${ne(o)})` : void 0,
    "--overlay-radius": s === void 0 ? void 0 : xt(s),
    "--overlay-z-index": i == null ? void 0 : i.toString()
  }
}), Gr = He((t, e) => {
  const n = E("Overlay", qd, t), {
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
    gradient: m,
    blur: g,
    color: y,
    backgroundOpacity: w,
    mod: x,
    ...v
  } = n, b = se({
    name: "Overlay",
    props: n,
    classes: mi,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: Xd
  });
  return /* @__PURE__ */ h(W, { ref: e, ...b("root"), mod: [{ center: d, fixed: l }, x], ...v, children: u });
});
Gr.classes = mi;
Gr.displayName = "@mantine/core/Overlay";
function sr(t) {
  const e = document.createElement("div");
  return e.setAttribute("data-portal", "true"), typeof t.className == "string" && e.classList.add(...t.className.split(" ").filter(Boolean)), typeof t.style == "object" && Object.assign(e.style, t.style), typeof t.id == "string" && e.setAttribute("id", t.id), e;
}
function Gd({
  target: t,
  reuseTargetNode: e,
  ...n
}) {
  if (t)
    return typeof t == "string" ? document.querySelector(t) || sr(n) : t;
  if (e) {
    const r = document.querySelector("[data-mantine-shared-portal-node]");
    if (r)
      return r;
    const o = sr(n);
    return o.setAttribute("data-mantine-shared-portal-node", "true"), document.body.appendChild(o), o;
  }
  return sr(n);
}
const Kd = {}, hi = q((t, e) => {
  const { children: n, target: r, reuseTargetNode: o, ...s } = E("Portal", Kd, t), [i, a] = G(!1), c = J(null);
  return $r(() => (a(!0), c.current = Gd({ target: r, reuseTargetNode: o, ...s }), gr(e, c.current), !r && !o && c.current && document.body.appendChild(c.current), () => {
    !r && !o && c.current && document.body.removeChild(c.current);
  }), [r]), !i || !c.current ? null : Ki(/* @__PURE__ */ h(it, { children: n }), c.current);
});
hi.displayName = "@mantine/core/Portal";
const Kr = q(
  ({ withinPortal: t = !0, children: e, ...n }, r) => Is() === "test" || !t ? /* @__PURE__ */ h(it, { children: e }) : /* @__PURE__ */ h(hi, { ref: r, ...n, children: e })
);
Kr.displayName = "@mantine/core/OptionalPortal";
const Xt = (t) => ({
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
    ...Xt("bottom"),
    common: { transformOrigin: "center center" }
  },
  "pop-bottom-left": {
    ...Xt("bottom"),
    common: { transformOrigin: "bottom left" }
  },
  "pop-bottom-right": {
    ...Xt("bottom"),
    common: { transformOrigin: "bottom right" }
  },
  "pop-top-left": {
    ...Xt("top"),
    common: { transformOrigin: "top left" }
  },
  "pop-top-right": {
    ...Xt("top"),
    common: { transformOrigin: "top right" }
  }
}, cs = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function Jd({
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
    ...mn[t][cs[e]]
  } : {} : {
    transitionProperty: t.transitionProperty,
    ...o,
    ...t.common,
    ...t[cs[e]]
  };
}
function Qd({
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
  const d = jt(), u = dc(), f = d.respectReducedMotion ? u : !1, [p, m] = G(f ? 0 : t), [g, y] = G(r ? "entered" : "exited"), w = J(-1), x = J(-1), v = J(-1);
  function b() {
    window.clearTimeout(w.current), window.clearTimeout(x.current), cancelAnimationFrame(v.current);
  }
  const C = (T) => {
    b();
    const k = T ? o : s, D = T ? i : a, $ = f ? 0 : T ? t : e;
    m($), $ === 0 ? (typeof k == "function" && k(), typeof D == "function" && D(), y(T ? "entered" : "exited")) : v.current = requestAnimationFrame(() => {
      Gi.flushSync(() => {
        y(T ? "pre-entering" : "pre-exiting");
      }), v.current = requestAnimationFrame(() => {
        typeof k == "function" && k(), y(T ? "entering" : "exiting"), w.current = window.setTimeout(() => {
          typeof D == "function" && D(), y(T ? "entered" : "exited");
        }, $);
      });
    });
  }, S = (T) => {
    if (b(), typeof (T ? c : l) != "number") {
      C(T);
      return;
    }
    x.current = window.setTimeout(
      () => {
        C(T);
      },
      T ? c : l
    );
  };
  return Et(() => {
    S(r);
  }, [r]), te(
    () => () => {
      b();
    },
    []
  ), {
    transitionDuration: p,
    transitionStatus: g,
    transitionTimingFunction: n || "ease"
  };
}
function Vn({
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
  const p = Is(), { transitionDuration: m, transitionStatus: g, transitionTimingFunction: y } = Qd({
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
  return m === 0 || p === "test" ? o ? /* @__PURE__ */ h(it, { children: s({}) }) : t ? s({ display: "none" }) : null : g === "exited" ? t ? s({ display: "none" }) : null : /* @__PURE__ */ h(it, { children: s(
    Jd({
      transition: e,
      duration: m,
      state: g,
      timingFunction: y
    })
  ) });
}
Vn.displayName = "@mantine/core/Transition";
const [eu, gi] = Bt(
  "Popover component was not found in the tree"
);
function Jr({
  children: t,
  active: e = !0,
  refProp: n = "ref",
  innerRef: r
}) {
  const o = ic(e), s = Pe(o, r);
  return rn(t) ? nn(t, { [n]: s }) : t;
}
function yi(t) {
  return /* @__PURE__ */ h(qr, { tabIndex: -1, "data-autofocus": !0, ...t });
}
Jr.displayName = "@mantine/core/FocusTrap";
yi.displayName = "@mantine/core/FocusTrapInitialFocus";
Jr.InitialFocus = yi;
var vi = { dropdown: "m_38a85659", arrow: "m_a31dc6c1", overlay: "m_3d7bc908" };
const tu = {}, Qr = q((t, e) => {
  var y, w, x, v;
  const n = E("PopoverDropdown", tu, t), {
    className: r,
    style: o,
    vars: s,
    children: i,
    onKeyDownCapture: a,
    variant: c,
    classNames: l,
    styles: d,
    ...u
  } = n, f = gi(), p = ec({
    opened: f.opened,
    shouldReturnFocus: f.returnFocus
  }), m = f.withRoles ? {
    "aria-labelledby": f.getTargetId(),
    id: f.getDropdownId(),
    role: "dialog",
    tabIndex: -1
  } : {}, g = Pe(e, f.floating);
  return f.disabled ? null : /* @__PURE__ */ h(Kr, { ...f.portalProps, withinPortal: f.withinPortal, children: /* @__PURE__ */ h(
    Vn,
    {
      mounted: f.opened,
      ...f.transitionProps,
      transition: ((y = f.transitionProps) == null ? void 0 : y.transition) || "fade",
      duration: ((w = f.transitionProps) == null ? void 0 : w.duration) ?? 150,
      keepMounted: f.keepMounted,
      exitDuration: typeof ((x = f.transitionProps) == null ? void 0 : x.exitDuration) == "number" ? f.transitionProps.exitDuration : (v = f.transitionProps) == null ? void 0 : v.duration,
      children: (b) => /* @__PURE__ */ h(Jr, { active: f.trapFocus && f.opened, innerRef: g, children: /* @__PURE__ */ ae(
        W,
        {
          ...m,
          ...u,
          variant: c,
          onKeyDownCapture: Ya(
            () => {
              var C, S;
              (C = f.onClose) == null || C.call(f), (S = f.onDismiss) == null || S.call(f);
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
                width: f.width === "target" ? void 0 : ne(f.width)
              },
              f.resolvedStyles.dropdown,
              d == null ? void 0 : d.dropdown,
              o
            ]
          }),
          children: [
            i,
            /* @__PURE__ */ h(
              pi,
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
Qr.classes = vi;
Qr.displayName = "@mantine/core/PopoverDropdown";
const nu = {
  refProp: "ref",
  popupType: "dialog"
}, bi = q((t, e) => {
  const { children: n, refProp: r, popupType: o, ...s } = E(
    "PopoverTarget",
    nu,
    t
  );
  if (!rn(n))
    throw new Error(
      "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const i = s, a = gi(), c = Pe(a.reference, $s(n), e), l = a.withRoles ? {
    "aria-haspopup": o,
    "aria-expanded": a.opened,
    "aria-controls": a.getDropdownId(),
    id: a.getTargetId()
  } : {};
  return nn(n, {
    ...i,
    ...l,
    ...a.targetProps,
    className: et(
      a.targetProps.className,
      i.className,
      n.props.className
    ),
    [r]: c,
    ...a.controlled ? null : { onClick: a.onToggle }
  });
});
bi.displayName = "@mantine/core/PopoverTarget";
function ru({
  opened: t,
  floating: e,
  position: n,
  positionDependencies: r
}) {
  const [o, s] = G(0);
  te(() => {
    if (e.refs.reference.current && e.refs.floating.current && t)
      return Ql(
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
  ]), Et(() => {
    e.update();
  }, r), Et(() => {
    s((i) => i + 1);
  }, [t]);
}
function ou(t) {
  if (t === void 0)
    return { shift: !0, flip: !0 };
  const e = { ...t };
  return t.shift === void 0 && (e.shift = !0), t.flip === void 0 && (e.flip = !0), e;
}
function su(t, e) {
  const n = ou(t.middlewares), r = [ud(t.offset)];
  return n.shift && r.push(
    fd(
      typeof n.shift == "boolean" ? { limiter: es(), padding: 5 } : { limiter: es(), padding: 5, ...n.shift }
    )
  ), n.flip && r.push(
    typeof n.flip == "boolean" ? ts() : ts(n.flip)
  ), n.inline && r.push(
    typeof n.inline == "boolean" ? ns() : ns(n.inline)
  ), r.push(md({ element: t.arrowRef, padding: t.arrowOffset })), (n.size || t.width === "target") && r.push(
    pd({
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
function iu(t) {
  const [e, n] = kn({
    value: t.opened,
    defaultValue: t.defaultOpened,
    finalValue: !1,
    onChange: t.onChange
  }), r = J(e), o = () => {
    e && !t.disabled && n(!1);
  }, s = () => !t.disabled && n(!e), i = Pd({
    strategy: t.strategy,
    placement: t.position,
    middleware: su(t, () => i)
  });
  return ru({
    opened: e,
    position: t.position,
    positionDependencies: t.positionDependencies || [],
    floating: i
  }), Et(() => {
    var a;
    (a = t.onPositionChange) == null || a.call(t, i.placement);
  }, [i.placement]), Et(() => {
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
const au = {
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
  zIndex: Rs("popover"),
  __staticSelector: "Popover",
  width: "max-content"
}, cu = (t, { radius: e, shadow: n }) => ({
  dropdown: {
    "--popover-radius": e === void 0 ? void 0 : xt(e),
    "--popover-shadow": Ns(n)
  }
});
function lt(t) {
  var Xe, pt, un, fn, ye, Fe;
  const e = E("Popover", au, t), {
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
    arrowSize: m,
    arrowOffset: g,
    arrowRadius: y,
    arrowPosition: w,
    unstyled: x,
    classNames: v,
    styles: b,
    closeOnClickOutside: C,
    withinPortal: S,
    portalProps: T,
    closeOnEscape: k,
    clickOutsideEvents: D,
    trapFocus: $,
    onClose: U,
    onDismiss: I,
    onOpen: j,
    onChange: V,
    zIndex: X,
    radius: N,
    shadow: M,
    id: P,
    defaultOpened: F,
    __staticSelector: re,
    withRoles: Te,
    disabled: je,
    returnFocus: ce,
    variant: Ye,
    keepMounted: Re,
    vars: qe,
    floatingStrategy: Ne,
    withOverlay: dt,
    overlayProps: Se,
    ...ut
  } = e, Ct = se({
    name: re,
    props: e,
    classes: vi,
    classNames: v,
    styles: b,
    unstyled: x,
    rootSelector: "dropdown",
    vars: qe,
    varsResolver: cu
  }), { resolvedStyles: Ht } = Ir({ classNames: v, styles: b, props: e }), Ut = J(null), [an, cn] = G(null), [Yt, nt] = G(null), { dir: ft } = Mr(), Ie = En(P), de = iu({
    middlewares: f,
    width: u,
    position: Hd(ft, r),
    offset: typeof o == "number" ? o + (p ? m / 2 : 0) : o,
    arrowRef: Ut,
    arrowOffset: g,
    onPositionChange: s,
    positionDependencies: i,
    opened: a,
    defaultOpened: F,
    onChange: V,
    onOpen: j,
    onClose: U,
    onDismiss: I,
    strategy: Ne,
    disabled: je
  });
  Ga(
    () => {
      C && (de.onClose(), I == null || I());
    },
    D,
    [an, Yt]
  );
  const be = ee(
    (pe) => {
      cn(pe), de.floating.refs.setReference(pe);
    },
    [de.floating.refs.setReference]
  ), ln = ee(
    (pe) => {
      nt(pe), de.floating.refs.setFloating(pe);
    },
    [de.floating.refs.setFloating]
  ), dn = ee(() => {
    var pe;
    (pe = c == null ? void 0 : c.onExited) == null || pe.call(c), l == null || l();
  }, [c == null ? void 0 : c.onExited, l]), Ce = ee(() => {
    var pe;
    (pe = c == null ? void 0 : c.onEntered) == null || pe.call(c), d == null || d();
  }, [c == null ? void 0 : c.onEntered, d]);
  return /* @__PURE__ */ ae(
    eu,
    {
      value: {
        returnFocus: ce,
        disabled: je,
        controlled: de.controlled,
        reference: be,
        floating: ln,
        x: de.floating.x,
        y: de.floating.y,
        arrowX: (un = (pt = (Xe = de.floating) == null ? void 0 : Xe.middlewareData) == null ? void 0 : pt.arrow) == null ? void 0 : un.x,
        arrowY: (Fe = (ye = (fn = de.floating) == null ? void 0 : fn.middlewareData) == null ? void 0 : ye.arrow) == null ? void 0 : Fe.y,
        opened: de.opened,
        arrowRef: Ut,
        transitionProps: { ...c, onExited: dn, onEntered: Ce },
        width: u,
        withArrow: p,
        arrowSize: m,
        arrowOffset: g,
        arrowRadius: y,
        arrowPosition: w,
        placement: de.floating.placement,
        trapFocus: $,
        withinPortal: S,
        portalProps: T,
        zIndex: X,
        radius: N,
        shadow: M,
        closeOnEscape: k,
        onDismiss: I,
        onClose: de.onClose,
        onToggle: de.onToggle,
        getTargetId: () => `${Ie}-target`,
        getDropdownId: () => `${Ie}-dropdown`,
        withRoles: Te,
        targetProps: ut,
        __staticSelector: re,
        classNames: v,
        styles: b,
        unstyled: x,
        variant: Ye,
        keepMounted: Re,
        getStyles: Ct,
        resolvedStyles: Ht,
        floatingStrategy: Ne
      },
      children: [
        n,
        dt && /* @__PURE__ */ h(
          Vn,
          {
            transition: "fade",
            mounted: de.opened,
            duration: (c == null ? void 0 : c.duration) || 250,
            exitDuration: (c == null ? void 0 : c.exitDuration) || 250,
            children: (pe) => /* @__PURE__ */ h(Kr, { withinPortal: S, children: /* @__PURE__ */ h(
              Gr,
              {
                ...Se,
                ...Ct("overlay", {
                  className: Se == null ? void 0 : Se.className,
                  style: [pe, Se == null ? void 0 : Se.style]
                })
              }
            ) })
          }
        )
      ]
    }
  );
}
lt.Target = bi;
lt.Dropdown = Qr;
lt.displayName = "@mantine/core/Popover";
lt.extend = (t) => t;
var Le = { root: "m_5ae2e3c", barsLoader: "m_7a2bd4cd", bar: "m_870bb79", "bars-loader-animation": "m_5d2b3b9d", dotsLoader: "m_4e3f22d7", dot: "m_870c4af", "loader-dots-animation": "m_aac34a1", ovalLoader: "m_b34414df", "oval-loader-animation": "m_f8e89c4b" };
const wi = oe(({ className: t, ...e }, n) => /* @__PURE__ */ ae(W, { component: "span", className: et(Le.barsLoader, t), ...e, ref: n, children: [
  /* @__PURE__ */ h("span", { className: Le.bar }),
  /* @__PURE__ */ h("span", { className: Le.bar }),
  /* @__PURE__ */ h("span", { className: Le.bar })
] }));
wi.displayName = "@mantine/core/Bars";
const xi = oe(({ className: t, ...e }, n) => /* @__PURE__ */ ae(W, { component: "span", className: et(Le.dotsLoader, t), ...e, ref: n, children: [
  /* @__PURE__ */ h("span", { className: Le.dot }),
  /* @__PURE__ */ h("span", { className: Le.dot }),
  /* @__PURE__ */ h("span", { className: Le.dot })
] }));
xi.displayName = "@mantine/core/Dots";
const _i = oe(({ className: t, ...e }, n) => /* @__PURE__ */ h(W, { component: "span", className: et(Le.ovalLoader, t), ...e, ref: n }));
_i.displayName = "@mantine/core/Oval";
const Si = {
  bars: wi,
  oval: _i,
  dots: xi
}, lu = {
  loaders: Si,
  type: "oval"
}, du = (t, { size: e, color: n }) => ({
  root: {
    "--loader-size": ge(e, "loader-size"),
    "--loader-color": n ? st(n, t) : void 0
  }
}), Wn = q((t, e) => {
  const n = E("Loader", lu, t), {
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
    children: m,
    ...g
  } = n, y = se({
    name: "Loader",
    props: n,
    classes: Le,
    className: a,
    style: c,
    classNames: l,
    styles: d,
    unstyled: u,
    vars: i,
    varsResolver: du
  });
  return m ? /* @__PURE__ */ h(W, { ...y("root"), ref: e, ...g, children: m }) : /* @__PURE__ */ h(
    W,
    {
      ...y("root"),
      ref: e,
      component: f[s],
      variant: p,
      size: r,
      ...g
    }
  );
});
Wn.defaultLoaders = Si;
Wn.classes = Le;
Wn.displayName = "@mantine/core/Loader";
const Ci = oe(
  ({ size: t = "var(--cb-icon-size, 70%)", style: e, ...n }, r) => /* @__PURE__ */ h(
    "svg",
    {
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { ...e, width: t, height: t },
      ref: r,
      ...n,
      children: /* @__PURE__ */ h(
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
Ci.displayName = "@mantine/core/CloseIcon";
var ki = { root: "m_86a44da5", "root--subtle": "m_220c80f2" };
const uu = {
  variant: "subtle"
}, fu = (t, { size: e, radius: n, iconSize: r }) => ({
  root: {
    "--cb-size": ge(e, "cb-size"),
    "--cb-radius": n === void 0 ? void 0 : xt(n),
    "--cb-icon-size": ne(r)
  }
}), eo = He((t, e) => {
  const n = E("CloseButton", uu, t), {
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
    variant: m,
    icon: g,
    mod: y,
    __staticSelector: w,
    ...x
  } = n, v = se({
    name: w || "CloseButton",
    props: n,
    className: a,
    style: l,
    classes: ki,
    classNames: c,
    styles: d,
    unstyled: u,
    vars: s,
    varsResolver: fu
  });
  return /* @__PURE__ */ ae(
    Fn,
    {
      ref: e,
      ...x,
      unstyled: u,
      variant: m,
      disabled: p,
      mod: [{ disabled: p || f }, y],
      ...v("root", { variant: m, active: !p && !f }),
      children: [
        g || /* @__PURE__ */ h(Ci, {}),
        o
      ]
    }
  );
});
eo.classes = ki;
eo.displayName = "@mantine/core/CloseButton";
function pu(t) {
  return gs.toArray(t).filter(Boolean);
}
var Ti = { root: "m_4081bf90" };
const mu = {
  preventGrowOverflow: !0,
  gap: "md",
  align: "center",
  justify: "flex-start",
  wrap: "wrap"
}, hu = (t, { grow: e, preventGrowOverflow: n, gap: r, align: o, justify: s, wrap: i }, { childWidth: a }) => ({
  root: {
    "--group-child-width": e && n ? a : void 0,
    "--group-gap": $t(r),
    "--group-align": o,
    "--group-justify": s,
    "--group-wrap": i
  }
}), to = q((t, e) => {
  const n = E("Group", mu, t), {
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
    preventGrowOverflow: m,
    vars: g,
    variant: y,
    __size: w,
    mod: x,
    ...v
  } = n, b = pu(c), C = b.length, S = $t(l ?? "md"), k = { childWidth: `calc(${100 / C}% - (${S} - ${S} / ${C}))` }, D = se({
    name: "Group",
    props: n,
    stylesCtx: k,
    className: o,
    style: s,
    classes: Ti,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: g,
    varsResolver: hu
  });
  return /* @__PURE__ */ h(
    W,
    {
      ...D("root"),
      ref: e,
      variant: y,
      mod: [{ grow: p }, x],
      size: w,
      ...v,
      children: b
    }
  );
});
to.classes = Ti;
to.displayName = "@mantine/core/Group";
const [gu, yu] = Ts({
  size: "sm"
}), vu = {}, Ri = q((t, e) => {
  const n = E("InputClearButton", vu, t), { size: r, variant: o, vars: s, classNames: i, styles: a, ...c } = n, l = yu(), { resolvedClassNames: d, resolvedStyles: u } = Ir({
    classNames: i,
    styles: a,
    props: n
  });
  return /* @__PURE__ */ h(
    eo,
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
Ri.displayName = "@mantine/core/InputClearButton";
const [bu, Zn] = Ts({
  offsetBottom: !1,
  offsetTop: !1,
  describedBy: void 0,
  getStyles: null,
  inputId: void 0,
  labelId: void 0
});
var $e = { wrapper: "m_6c018570", input: "m_8fb7ebe7", section: "m_82577fc2", placeholder: "m_88bacfd0", root: "m_46b77525", label: "m_8fdc1311", required: "m_78a94662", error: "m_8f816625", description: "m_fe47ce59" };
const ls = {}, wu = (t, { size: e }) => ({
  description: {
    "--input-description-size": e === void 0 ? void 0 : `calc(${we(e)} - ${ne(2)})`
  }
}), Hn = q((t, e) => {
  const n = E("InputDescription", ls, t), {
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
  } = E("InputDescription", ls, n), m = Zn(), g = se({
    name: ["InputWrapper", d],
    props: n,
    classes: $e,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    rootSelector: "description",
    vars: c,
    varsResolver: wu
  }), y = u && (m == null ? void 0 : m.getStyles) || g;
  return /* @__PURE__ */ h(
    W,
    {
      component: "p",
      ref: e,
      variant: f,
      size: l,
      ...y("description", m != null && m.getStyles ? { className: o, style: s } : void 0),
      ...p
    }
  );
});
Hn.classes = $e;
Hn.displayName = "@mantine/core/InputDescription";
const xu = {}, _u = (t, { size: e }) => ({
  error: {
    "--input-error-size": e === void 0 ? void 0 : `calc(${we(e)} - ${ne(2)})`
  }
}), Un = q((t, e) => {
  const n = E("InputError", xu, t), {
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
  } = n, m = se({
    name: ["InputWrapper", d],
    props: n,
    classes: $e,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    rootSelector: "error",
    vars: c,
    varsResolver: _u
  }), g = Zn(), y = u && (g == null ? void 0 : g.getStyles) || m;
  return /* @__PURE__ */ h(
    W,
    {
      component: "p",
      ref: e,
      variant: f,
      size: l,
      ...y("error", g != null && g.getStyles ? { className: o, style: s } : void 0),
      ...p
    }
  );
});
Un.classes = $e;
Un.displayName = "@mantine/core/InputError";
const ds = {
  labelElement: "label"
}, Su = (t, { size: e }) => ({
  label: {
    "--input-label-size": we(e),
    "--input-asterisk-color": void 0
  }
}), Yn = q((t, e) => {
  const n = E("InputLabel", ds, t), {
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
    children: m,
    __staticSelector: g,
    variant: y,
    mod: w,
    ...x
  } = E("InputLabel", ds, n), v = se({
    name: ["InputWrapper", g],
    props: n,
    classes: $e,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    rootSelector: "label",
    vars: c,
    varsResolver: Su
  }), b = Zn(), C = (b == null ? void 0 : b.getStyles) || v;
  return /* @__PURE__ */ ae(
    W,
    {
      ...C("label", b != null && b.getStyles ? { className: o, style: s } : void 0),
      component: l,
      variant: y,
      size: d,
      ref: e,
      htmlFor: l === "label" ? f : void 0,
      mod: [{ required: u }, w],
      onMouseDown: (S) => {
        p == null || p(S), !S.defaultPrevented && S.detail > 1 && S.preventDefault();
      },
      ...x,
      children: [
        m,
        u && /* @__PURE__ */ h("span", { ...C("required"), "aria-hidden": !0, children: " *" })
      ]
    }
  );
});
Yn.classes = $e;
Yn.displayName = "@mantine/core/InputLabel";
const us = {}, no = q((t, e) => {
  const n = E("InputPlaceholder", us, t), {
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
  } = E("InputPlaceholder", us, n), m = se({
    name: ["InputPlaceholder", l],
    props: n,
    classes: $e,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    rootSelector: "placeholder"
  });
  return /* @__PURE__ */ h(
    W,
    {
      ...m("placeholder"),
      mod: [{ error: !!u }, f],
      component: "span",
      variant: d,
      ref: e,
      ...p
    }
  );
});
no.classes = $e;
no.displayName = "@mantine/core/InputPlaceholder";
function Cu(t, { hasDescription: e, hasError: n }) {
  const r = t.findIndex((c) => c === "input"), o = t.slice(0, r), s = t.slice(r + 1), i = e && o.includes("description") || n && o.includes("error");
  return { offsetBottom: e && s.includes("description") || n && s.includes("error"), offsetTop: i };
}
const ku = {
  labelElement: "label",
  inputContainer: (t) => t,
  inputWrapperOrder: ["label", "description", "input", "error"]
}, Tu = (t, { size: e }) => ({
  label: {
    "--input-label-size": we(e),
    "--input-asterisk-color": void 0
  },
  error: {
    "--input-error-size": e === void 0 ? void 0 : `calc(${we(e)} - ${ne(2)})`
  },
  description: {
    "--input-description-size": e === void 0 ? void 0 : `calc(${we(e)} - ${ne(2)})`
  }
}), ro = q((t, e) => {
  const n = E("InputWrapper", ku, t), {
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
    label: m,
    error: g,
    description: y,
    labelProps: w,
    descriptionProps: x,
    errorProps: v,
    labelElement: b,
    children: C,
    withAsterisk: S,
    id: T,
    required: k,
    __stylesApiProps: D,
    mod: $,
    ...U
  } = n, I = se({
    name: ["InputWrapper", u],
    props: D || n,
    classes: $e,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: Tu
  }), j = {
    size: l,
    variant: d,
    __staticSelector: u
  }, V = En(T), X = typeof S == "boolean" ? S : k, N = (v == null ? void 0 : v.id) || `${V}-error`, M = (x == null ? void 0 : x.id) || `${V}-description`, P = V, F = !!g && typeof g != "boolean", re = !!y, Te = `${F ? N : ""} ${re ? M : ""}`, je = Te.trim().length > 0 ? Te.trim() : void 0, ce = (w == null ? void 0 : w.id) || `${V}-label`, Ye = m && /* @__PURE__ */ h(
    Yn,
    {
      labelElement: b,
      id: ce,
      htmlFor: P,
      required: X,
      ...j,
      ...w,
      children: m
    },
    "label"
  ), Re = re && /* @__PURE__ */ h(
    Hn,
    {
      ...x,
      ...j,
      size: (x == null ? void 0 : x.size) || j.size,
      id: (x == null ? void 0 : x.id) || M,
      children: y
    },
    "description"
  ), qe = /* @__PURE__ */ h(ms, { children: f(C) }, "input"), Ne = F && /* @__PURE__ */ hn(
    Un,
    {
      ...v,
      ...j,
      size: (v == null ? void 0 : v.size) || j.size,
      key: "error",
      id: (v == null ? void 0 : v.id) || N
    },
    g
  ), dt = p.map((Se) => {
    switch (Se) {
      case "label":
        return Ye;
      case "input":
        return qe;
      case "description":
        return Re;
      case "error":
        return Ne;
      default:
        return null;
    }
  });
  return /* @__PURE__ */ h(
    bu,
    {
      value: {
        getStyles: I,
        describedBy: je,
        inputId: P,
        labelId: ce,
        ...Cu(p, { hasDescription: re, hasError: F })
      },
      children: /* @__PURE__ */ h(
        W,
        {
          ref: e,
          variant: d,
          size: l,
          mod: [{ error: !!g }, $],
          ...I("root"),
          ...U,
          children: dt
        }
      )
    }
  );
});
ro.classes = $e;
ro.displayName = "@mantine/core/InputWrapper";
const Ru = {
  variant: "default",
  leftSectionPointerEvents: "none",
  rightSectionPointerEvents: "none",
  withAria: !0,
  withErrorStyles: !0
}, Nu = (t, e, n) => ({
  wrapper: {
    "--input-margin-top": n.offsetTop ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
    "--input-margin-bottom": n.offsetBottom ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
    "--input-height": ge(e.size, "input-height"),
    "--input-fz": we(e.size),
    "--input-radius": e.radius === void 0 ? void 0 : xt(e.radius),
    "--input-left-section-width": e.leftSectionWidth !== void 0 ? ne(e.leftSectionWidth) : void 0,
    "--input-right-section-width": e.rightSectionWidth !== void 0 ? ne(e.rightSectionWidth) : void 0,
    "--input-padding-y": e.multiline ? ge(e.size, "input-padding-y") : void 0,
    "--input-left-section-pointer-events": e.leftSectionPointerEvents,
    "--input-right-section-pointer-events": e.rightSectionPointerEvents
  }
}), xe = He((t, e) => {
  const n = E("Input", Ru, t), {
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
    disabled: m,
    leftSection: g,
    leftSectionProps: y,
    leftSectionWidth: w,
    rightSection: x,
    rightSectionProps: v,
    rightSectionWidth: b,
    rightSectionPointerEvents: C,
    leftSectionPointerEvents: S,
    variant: T,
    vars: k,
    pointer: D,
    multiline: $,
    radius: U,
    id: I,
    withAria: j,
    withErrorStyles: V,
    mod: X,
    inputSize: N,
    __clearSection: M,
    __clearable: P,
    __defaultRightSection: F,
    ...re
  } = n, { styleProps: Te, rest: je } = Dr(re), ce = Zn(), Ye = { offsetBottom: ce == null ? void 0 : ce.offsetBottom, offsetTop: ce == null ? void 0 : ce.offsetTop }, Re = se({
    name: ["Input", l],
    props: d || n,
    classes: $e,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    stylesCtx: Ye,
    rootSelector: "wrapper",
    vars: k,
    varsResolver: Nu
  }), qe = j ? {
    required: c,
    disabled: m,
    "aria-invalid": !!p,
    "aria-describedby": ce == null ? void 0 : ce.describedBy,
    id: (ce == null ? void 0 : ce.inputId) || I
  } : {}, Ne = x || P && M || F;
  return /* @__PURE__ */ h(gu, { value: { size: u || "sm" }, children: /* @__PURE__ */ ae(
    W,
    {
      ...Re("wrapper"),
      ...Te,
      ...f,
      mod: [
        {
          error: !!p && V,
          pointer: D,
          disabled: m,
          multiline: $,
          "data-with-right-section": !!Ne,
          "data-with-left-section": !!g
        },
        X
      ],
      variant: T,
      size: u,
      children: [
        g && /* @__PURE__ */ h(
          "div",
          {
            ...y,
            "data-position": "left",
            ...Re("section", {
              className: y == null ? void 0 : y.className,
              style: y == null ? void 0 : y.style
            }),
            children: g
          }
        ),
        /* @__PURE__ */ h(
          W,
          {
            component: "input",
            ...je,
            ...qe,
            ref: e,
            required: c,
            mod: { disabled: m, error: !!p && V },
            variant: T,
            __size: N,
            ...Re("input")
          }
        ),
        Ne && /* @__PURE__ */ h(
          "div",
          {
            ...v,
            "data-position": "right",
            ...Re("section", {
              className: v == null ? void 0 : v.className,
              style: v == null ? void 0 : v.style
            }),
            children: Ne
          }
        )
      ]
    }
  ) });
});
xe.classes = $e;
xe.Wrapper = ro;
xe.Label = Yn;
xe.Error = Un;
xe.Description = Hn;
xe.Placeholder = no;
xe.ClearButton = Ri;
xe.displayName = "@mantine/core/Input";
function Au(t, e, n) {
  const r = E(t, e, n), {
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
    errorProps: m,
    labelProps: g,
    descriptionProps: y,
    wrapperProps: w,
    id: x,
    size: v,
    style: b,
    inputContainer: C,
    inputWrapperOrder: S,
    withAsterisk: T,
    variant: k,
    vars: D,
    mod: $,
    ...U
  } = r, { styleProps: I, rest: j } = Dr(U), V = {
    label: o,
    description: s,
    error: i,
    required: a,
    classNames: c,
    className: d,
    __staticSelector: f,
    __stylesApiProps: p || r,
    errorProps: m,
    labelProps: g,
    descriptionProps: y,
    unstyled: u,
    styles: l,
    size: v,
    style: b,
    inputContainer: C,
    inputWrapperOrder: S,
    withAsterisk: T,
    variant: k,
    id: x,
    mod: $,
    ...w
  };
  return {
    ...j,
    classNames: c,
    styles: l,
    unstyled: u,
    wrapperProps: { ...V, ...I },
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
const Pu = {
  __staticSelector: "InputBase",
  withAria: !0
}, qn = He((t, e) => {
  const { inputProps: n, wrapperProps: r, ...o } = Au("InputBase", Pu, t);
  return /* @__PURE__ */ h(xe.Wrapper, { ...r, children: /* @__PURE__ */ h(xe, { ...n, ...o, ref: e }) });
});
qn.classes = { ...xe.classes, ...xe.Wrapper.classes };
qn.displayName = "@mantine/core/InputBase";
var Ni = { root: "m_b6d8b162" };
function Ou(t) {
  if (t === "start")
    return "start";
  if (t === "end" || t)
    return "end";
}
const $u = {
  inherit: !1
}, Eu = (t, { variant: e, lineClamp: n, gradient: r, size: o, color: s }) => ({
  root: {
    "--text-fz": we(o),
    "--text-lh": qa(o),
    "--text-gradient": e === "gradient" ? Nc(r, t) : void 0,
    "--text-line-clamp": typeof n == "number" ? n.toString() : void 0,
    "--text-color": s ? st(s, t) : void 0
  }
}), oo = He((t, e) => {
  const n = E("Text", $u, t), {
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
    styles: m,
    unstyled: g,
    variant: y,
    mod: w,
    size: x,
    ...v
  } = n, b = se({
    name: ["Text", l],
    props: n,
    classes: Ni,
    className: u,
    style: f,
    classNames: p,
    styles: m,
    unstyled: g,
    vars: d,
    varsResolver: Eu
  });
  return /* @__PURE__ */ h(
    W,
    {
      ...b("root", { focusable: !0 }),
      ref: e,
      component: c ? "span" : "p",
      variant: y,
      mod: [
        {
          "data-truncate": Ou(o),
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
oo.classes = Ni;
oo.displayName = "@mantine/core/Text";
function Ai(t) {
  return typeof t == "string" ? { value: t, label: t } : "value" in t && !("label" in t) ? { value: t.value, label: t.value, disabled: t.disabled } : typeof t == "number" ? { value: t.toString(), label: t.toString() } : "group" in t ? {
    group: t.group,
    items: t.items.map((e) => Ai(e))
  } : t;
}
function Iu(t) {
  return t ? t.map((e) => Ai(e)) : [];
}
function Pi(t) {
  return t.reduce((e, n) => "group" in n ? { ...e, ...Pi(n.items) } : (e[n.value] = n, e), {});
}
var _e = { dropdown: "m_88b62a41", search: "m_985517d8", options: "m_b2821a6e", option: "m_92253aa5", empty: "m_2530cd1d", header: "m_858f94bd", footer: "m_82b967cb", group: "m_254f3e4f", groupLabel: "m_2bb2e9e5", chevron: "m_2943220b", optionsDropdownOption: "m_390b5f4", optionsDropdownCheckIcon: "m_8ee53fc2" };
const Du = {
  error: null
}, Lu = (t, { size: e, color: n }) => ({
  chevron: {
    "--combobox-chevron-size": ge(e, "combobox-chevron-size"),
    "--combobox-chevron-color": n ? st(n, t) : void 0
  }
}), so = q((t, e) => {
  const n = E("ComboboxChevron", Du, t), { size: r, error: o, style: s, className: i, classNames: a, styles: c, unstyled: l, vars: d, mod: u, ...f } = n, p = se({
    name: "ComboboxChevron",
    classes: _e,
    props: n,
    style: s,
    className: i,
    classNames: a,
    styles: c,
    unstyled: l,
    vars: d,
    varsResolver: Lu,
    rootSelector: "chevron"
  });
  return /* @__PURE__ */ h(
    W,
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
      children: /* @__PURE__ */ h(
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
so.classes = _e;
so.displayName = "@mantine/core/ComboboxChevron";
const [Mu, Ee] = Bt(
  "Combobox component was not found in tree"
), Oi = oe(
  ({ size: t, onMouseDown: e, onClick: n, onClear: r, ...o }, s) => /* @__PURE__ */ h(
    xe.ClearButton,
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
Oi.displayName = "@mantine/core/ComboboxClearButton";
const zu = {}, io = q((t, e) => {
  const { classNames: n, styles: r, className: o, style: s, hidden: i, ...a } = E(
    "ComboboxDropdown",
    zu,
    t
  ), c = Ee();
  return /* @__PURE__ */ h(
    lt.Dropdown,
    {
      ...a,
      ref: e,
      role: "presentation",
      "data-hidden": i || void 0,
      ...c.getStyles("dropdown", { className: o, style: s, classNames: n, styles: r })
    }
  );
});
io.classes = _e;
io.displayName = "@mantine/core/ComboboxDropdown";
const Bu = {
  refProp: "ref"
}, $i = q((t, e) => {
  const { children: n, refProp: r } = E("ComboboxDropdownTarget", Bu, t);
  if (Ee(), !rn(n))
    throw new Error(
      "Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  return /* @__PURE__ */ h(lt.Target, { ref: e, refProp: r, children: n });
});
$i.displayName = "@mantine/core/ComboboxDropdownTarget";
const ju = {}, ao = q((t, e) => {
  const { classNames: n, className: r, style: o, styles: s, vars: i, ...a } = E(
    "ComboboxEmpty",
    ju,
    t
  ), c = Ee();
  return /* @__PURE__ */ h(
    W,
    {
      ref: e,
      ...c.getStyles("empty", { className: r, classNames: n, styles: s, style: o }),
      ...a
    }
  );
});
ao.classes = _e;
ao.displayName = "@mantine/core/ComboboxEmpty";
function co({
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
const Fu = {
  refProp: "ref",
  targetType: "input",
  withKeyboardNavigation: !0,
  withAriaAttributes: !0,
  withExpandedAttribute: !1,
  autoComplete: "off"
}, Ei = q((t, e) => {
  const {
    children: n,
    refProp: r,
    withKeyboardNavigation: o,
    withAriaAttributes: s,
    withExpandedAttribute: i,
    targetType: a,
    autoComplete: c,
    ...l
  } = E("ComboboxEventsTarget", Fu, t);
  if (!rn(n))
    throw new Error(
      "Combobox.EventsTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const d = Ee(), u = co({
    targetType: a,
    withAriaAttributes: s,
    withKeyboardNavigation: o,
    withExpandedAttribute: i,
    onKeyDown: n.props.onKeyDown,
    autoComplete: c
  });
  return nn(n, {
    ...u,
    ...l,
    [r]: Pe(e, d.store.targetRef, $s(n))
  });
});
Ei.displayName = "@mantine/core/ComboboxEventsTarget";
const Vu = {}, lo = q((t, e) => {
  const { classNames: n, className: r, style: o, styles: s, vars: i, ...a } = E(
    "ComboboxFooter",
    Vu,
    t
  ), c = Ee();
  return /* @__PURE__ */ h(
    W,
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
lo.classes = _e;
lo.displayName = "@mantine/core/ComboboxFooter";
const Wu = {}, uo = q((t, e) => {
  const { classNames: n, className: r, style: o, styles: s, vars: i, children: a, label: c, ...l } = E(
    "ComboboxGroup",
    Wu,
    t
  ), d = Ee();
  return /* @__PURE__ */ ae(
    W,
    {
      ref: e,
      ...d.getStyles("group", { className: r, classNames: n, style: o, styles: s }),
      ...l,
      children: [
        c && /* @__PURE__ */ h("div", { ...d.getStyles("groupLabel", { classNames: n, styles: s }), children: c }),
        a
      ]
    }
  );
});
uo.classes = _e;
uo.displayName = "@mantine/core/ComboboxGroup";
const Zu = {}, fo = q((t, e) => {
  const { classNames: n, className: r, style: o, styles: s, vars: i, ...a } = E(
    "ComboboxHeader",
    Zu,
    t
  ), c = Ee();
  return /* @__PURE__ */ h(
    W,
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
fo.classes = _e;
fo.displayName = "@mantine/core/ComboboxHeader";
function Ii({
  value: t,
  valuesDivider: e = ",",
  ...n
}) {
  return /* @__PURE__ */ h(
    "input",
    {
      type: "hidden",
      value: Array.isArray(t) ? t.join(e) : t || "",
      ...n
    }
  );
}
Ii.displayName = "@mantine/core/ComboboxHiddenInput";
const Hu = {}, po = q((t, e) => {
  const n = E("ComboboxOption", Hu, t), {
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
    selected: m,
    mod: g,
    ...y
  } = n, w = Ee(), x = hs(), v = l || x;
  return /* @__PURE__ */ h(
    W,
    {
      ...w.getStyles("option", { className: o, classNames: r, styles: i, style: s }),
      ...y,
      ref: e,
      id: v,
      mod: [
        "combobox-option",
        { "combobox-active": d, "combobox-disabled": p, "combobox-selected": m },
        g
      ],
      role: "option",
      onClick: (b) => {
        var C;
        p ? b.preventDefault() : ((C = w.onOptionSubmit) == null || C.call(w, n.value, n), c == null || c(b));
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
po.classes = _e;
po.displayName = "@mantine/core/ComboboxOption";
const Uu = {}, mo = q((t, e) => {
  const n = E("ComboboxOptions", Uu, t), { classNames: r, className: o, style: s, styles: i, id: a, onMouseDown: c, labelledBy: l, ...d } = n, u = Ee(), f = En(a);
  return te(() => {
    u.store.setListId(f);
  }, [f]), /* @__PURE__ */ h(
    W,
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
mo.classes = _e;
mo.displayName = "@mantine/core/ComboboxOptions";
const Yu = {
  withAriaAttributes: !0,
  withKeyboardNavigation: !0
}, ho = q((t, e) => {
  const n = E("ComboboxSearch", Yu, t), {
    classNames: r,
    styles: o,
    unstyled: s,
    vars: i,
    withAriaAttributes: a,
    onKeyDown: c,
    withKeyboardNavigation: l,
    size: d,
    ...u
  } = n, f = Ee(), p = f.getStyles("search"), m = co({
    targetType: "input",
    withAriaAttributes: a,
    withKeyboardNavigation: l,
    withExpandedAttribute: !1,
    onKeyDown: c,
    autoComplete: "off"
  });
  return /* @__PURE__ */ h(
    xe,
    {
      ref: Pe(e, f.store.searchRef),
      classNames: [{ input: p.className }, r],
      styles: [{ input: p.style }, o],
      size: d || f.size,
      ...m,
      ...u,
      __staticSelector: "Combobox"
    }
  );
});
ho.classes = _e;
ho.displayName = "@mantine/core/ComboboxSearch";
const qu = {
  refProp: "ref",
  targetType: "input",
  withKeyboardNavigation: !0,
  withAriaAttributes: !0,
  withExpandedAttribute: !1,
  autoComplete: "off"
}, Di = q((t, e) => {
  const {
    children: n,
    refProp: r,
    withKeyboardNavigation: o,
    withAriaAttributes: s,
    withExpandedAttribute: i,
    targetType: a,
    autoComplete: c,
    ...l
  } = E("ComboboxTarget", qu, t);
  if (!rn(n))
    throw new Error(
      "Combobox.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const d = Ee(), u = co({
    targetType: a,
    withAriaAttributes: s,
    withKeyboardNavigation: o,
    withExpandedAttribute: i,
    onKeyDown: n.props.onKeyDown,
    autoComplete: c
  }), f = nn(n, {
    ...u,
    ...l
  });
  return /* @__PURE__ */ h(lt.Target, { ref: Pe(e, d.store.targetRef), children: f });
});
Di.displayName = "@mantine/core/ComboboxTarget";
function Xu(t, e, n) {
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
function Gu(t, e, n) {
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
function Ku(t) {
  for (let e = 0; e < t.length; e += 1)
    if (!t[e].hasAttribute("data-combobox-disabled"))
      return e;
  return -1;
}
function Li({
  defaultOpened: t,
  opened: e,
  onOpenedChange: n,
  onDropdownClose: r,
  onDropdownOpen: o,
  loop: s = !0,
  scrollBehavior: i = "instant"
} = {}) {
  const [a, c] = kn({
    value: e,
    defaultValue: t,
    finalValue: !1,
    onChange: n
  }), l = J(null), d = J(-1), u = J(null), f = J(null), p = J(-1), m = J(-1), g = J(-1), y = ee(
    (N = "unknown") => {
      a || (c(!0), o == null || o(N));
    },
    [c, o, a]
  ), w = ee(
    (N = "unknown") => {
      a && (c(!1), r == null || r(N));
    },
    [c, r, a]
  ), x = ee(
    (N = "unknown") => {
      a ? w(N) : y(N);
    },
    [w, y, a]
  ), v = ee(() => {
    const N = document.querySelector(`#${l.current} [data-combobox-selected]`);
    N == null || N.removeAttribute("data-combobox-selected"), N == null || N.removeAttribute("aria-selected");
  }, []), b = ee(
    (N) => {
      const M = document.getElementById(l.current), P = M == null ? void 0 : M.querySelectorAll("[data-combobox-option]");
      if (!P)
        return null;
      const F = N >= P.length ? 0 : N < 0 ? P.length - 1 : N;
      return d.current = F, P != null && P[F] && !P[F].hasAttribute("data-combobox-disabled") ? (v(), P[F].setAttribute("data-combobox-selected", "true"), P[F].setAttribute("aria-selected", "true"), P[F].scrollIntoView({ block: "nearest", behavior: i }), P[F].id) : null;
    },
    [i, v]
  ), C = ee(() => {
    const N = document.querySelector(
      `#${l.current} [data-combobox-active]`
    );
    if (N) {
      const M = document.querySelectorAll(
        `#${l.current} [data-combobox-option]`
      ), P = Array.from(M).findIndex((F) => F === N);
      return b(P);
    }
    return b(0);
  }, [b]), S = ee(
    () => b(
      Gu(
        d.current,
        document.querySelectorAll(`#${l.current} [data-combobox-option]`),
        s
      )
    ),
    [b, s]
  ), T = ee(
    () => b(
      Xu(
        d.current,
        document.querySelectorAll(`#${l.current} [data-combobox-option]`),
        s
      )
    ),
    [b, s]
  ), k = ee(
    () => b(
      Ku(
        document.querySelectorAll(`#${l.current} [data-combobox-option]`)
      )
    ),
    [b]
  ), D = ee(
    (N = "selected", M) => {
      g.current = window.setTimeout(() => {
        var re;
        const P = document.querySelectorAll(
          `#${l.current} [data-combobox-option]`
        ), F = Array.from(P).findIndex(
          (Te) => Te.hasAttribute(`data-combobox-${N}`)
        );
        d.current = F, M != null && M.scrollIntoView && ((re = P[F]) == null || re.scrollIntoView({ block: "nearest", behavior: i }));
      }, 0);
    },
    []
  ), $ = ee(() => {
    d.current = -1, v();
  }, [v]), U = ee(() => {
    const N = document.querySelectorAll(
      `#${l.current} [data-combobox-option]`
    ), M = N == null ? void 0 : N[d.current];
    M == null || M.click();
  }, []), I = ee((N) => {
    l.current = N;
  }, []), j = ee(() => {
    p.current = window.setTimeout(() => u.current.focus(), 0);
  }, []), V = ee(() => {
    m.current = window.setTimeout(() => f.current.focus(), 0);
  }, []), X = ee(() => d.current, []);
  return te(
    () => () => {
      window.clearTimeout(p.current), window.clearTimeout(m.current), window.clearTimeout(g.current);
    },
    []
  ), {
    dropdownOpened: a,
    openDropdown: y,
    closeDropdown: w,
    toggleDropdown: x,
    selectedOptionIndex: d.current,
    getSelectedOptionIndex: X,
    selectOption: b,
    selectFirstOption: k,
    selectActiveOption: C,
    selectNextOption: S,
    selectPreviousOption: T,
    resetSelectedOption: $,
    updateSelectedOptionIndex: D,
    listId: l.current,
    setListId: I,
    clickSelectedOption: U,
    searchRef: u,
    focusSearchInput: j,
    targetRef: f,
    focusTarget: V
  };
}
const Ju = {
  keepMounted: !0,
  withinPortal: !0,
  resetSelectionOnOptionHover: !1,
  width: "target",
  transitionProps: { transition: "fade", duration: 0 }
}, Qu = (t, { size: e, dropdownPadding: n }) => ({
  options: {
    "--combobox-option-fz": we(e),
    "--combobox-option-padding": ge(e, "combobox-option-padding")
  },
  dropdown: {
    "--combobox-padding": n === void 0 ? void 0 : ne(n),
    "--combobox-option-fz": we(e),
    "--combobox-option-padding": ge(e, "combobox-option-padding")
  }
});
function Q(t) {
  const e = E("Combobox", Ju, t), {
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
    readOnly: m,
    ...g
  } = e, y = Li(), w = i || y, x = se({
    name: p || "Combobox",
    classes: _e,
    props: e,
    classNames: n,
    styles: r,
    unstyled: o,
    vars: a,
    varsResolver: Qu
  }), v = () => {
    l == null || l(), w.closeDropdown();
  };
  return /* @__PURE__ */ h(
    Mu,
    {
      value: {
        getStyles: x,
        store: w,
        onOptionSubmit: c,
        size: d,
        resetSelectionOnOptionHover: f,
        readOnly: m
      },
      children: /* @__PURE__ */ h(
        lt,
        {
          opened: w.dropdownOpened,
          ...g,
          onChange: (b) => !b && v(),
          withRoles: !1,
          unstyled: o,
          children: s
        }
      )
    }
  );
}
const ef = (t) => t;
Q.extend = ef;
Q.classes = _e;
Q.displayName = "@mantine/core/Combobox";
Q.Target = Di;
Q.Dropdown = io;
Q.Options = mo;
Q.Option = po;
Q.Search = ho;
Q.Empty = ao;
Q.Chevron = so;
Q.Footer = lo;
Q.Header = fo;
Q.EventsTarget = Ei;
Q.DropdownTarget = $i;
Q.Group = uo;
Q.ClearButton = Oi;
Q.HiddenInput = Ii;
function tf({ size: t, style: e, ...n }) {
  const r = t !== void 0 ? { width: ne(t), height: ne(t), ...e } : e;
  return /* @__PURE__ */ h(
    "svg",
    {
      viewBox: "0 0 10 7",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: r,
      "aria-hidden": !0,
      ...n,
      children: /* @__PURE__ */ h(
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
function Mi({
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
      items: Mi({
        options: i.items,
        search: e,
        limit: n - o.length
      })
    }), en(i) || i.label.toLowerCase().includes(r) && o.push(i);
  }
  return o;
}
function nf(t) {
  if (t.length === 0)
    return !0;
  for (const e of t)
    if (!("group" in e) || e.items.length > 0)
      return !1;
  return !0;
}
function zi(t, e = /* @__PURE__ */ new Set()) {
  if (Array.isArray(t))
    for (const n of t)
      if (en(n))
        zi(n.items, e);
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
function rf(t, e) {
  return Array.isArray(t) ? t.includes(e) : t === e;
}
function Bi({
  data: t,
  withCheckIcon: e,
  value: n,
  checkIconPosition: r,
  unstyled: o,
  renderOption: s
}) {
  if (!en(t)) {
    const a = rf(n, t.value), c = e && a && /* @__PURE__ */ h(tf, { className: _e.optionsDropdownCheckIcon }), l = /* @__PURE__ */ ae(it, { children: [
      r === "left" && c,
      /* @__PURE__ */ h("span", { children: t.label }),
      r === "right" && c
    ] });
    return /* @__PURE__ */ h(
      Q.Option,
      {
        value: t.value,
        disabled: t.disabled,
        className: et({ [_e.optionsDropdownOption]: !o }),
        "data-reverse": r === "right" || void 0,
        "data-checked": a || void 0,
        "aria-selected": a,
        active: a,
        children: typeof s == "function" ? s({ option: t, checked: a }) : l
      }
    );
  }
  const i = t.items.map((a) => /* @__PURE__ */ h(
    Bi,
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
  return /* @__PURE__ */ h(Q.Group, { label: t.group, children: i });
}
function of({
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
  labelId: m,
  renderOption: g,
  scrollAreaProps: y,
  "aria-label": w
}) {
  zi(t);
  const v = typeof o == "string" ? (r || Mi)({
    options: t,
    search: c ? o : "",
    limit: s ?? 1 / 0
  }) : t, b = nf(v), C = v.map((S) => /* @__PURE__ */ h(
    Bi,
    {
      data: S,
      withCheckIcon: l,
      value: d,
      checkIconPosition: u,
      unstyled: p,
      renderOption: g
    },
    en(S) ? S.group : S.value
  ));
  return /* @__PURE__ */ h(Q.Dropdown, { hidden: e || n && b, "data-composed": !0, children: /* @__PURE__ */ ae(Q.Options, { labelledBy: m, "aria-label": w, children: [
    a ? /* @__PURE__ */ h(
      Wt.Autosize,
      {
        mah: i ?? 220,
        type: "scroll",
        scrollbarSize: "var(--combobox-padding)",
        offsetScrollbars: "y",
        ...y,
        children: C
      }
    ) : C,
    b && f && /* @__PURE__ */ h(Q.Empty, { children: f })
  ] }) });
}
var Zt = { root: "m_77c9d27d", inner: "m_80f1301b", label: "m_811560b9", section: "m_a74036a", loader: "m_a25b86ee", group: "m_80d6d844", groupSection: "m_70be2a01" };
const fs = {
  orientation: "horizontal"
}, sf = (t, { borderWidth: e }) => ({
  group: { "--button-border-width": ne(e) }
}), go = q((t, e) => {
  const n = E("ButtonGroup", fs, t), {
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
  } = E("ButtonGroup", fs, t), m = se({
    name: "ButtonGroup",
    props: n,
    classes: Zt,
    className: r,
    style: o,
    classNames: s,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: sf,
    rootSelector: "group"
  });
  return /* @__PURE__ */ h(
    W,
    {
      ...m("group"),
      ref: e,
      variant: u,
      mod: [{ "data-orientation": c }, f],
      role: "group",
      ...p
    }
  );
});
go.classes = Zt;
go.displayName = "@mantine/core/ButtonGroup";
const ps = {}, af = (t, { radius: e, color: n, gradient: r, variant: o, autoContrast: s, size: i }) => {
  const a = t.variantColorResolver({
    color: n || t.primaryColor,
    theme: t,
    gradient: r,
    variant: o || "filled",
    autoContrast: s
  });
  return {
    groupSection: {
      "--section-height": ge(i, "section-height"),
      "--section-padding-x": ge(i, "section-padding-x"),
      "--section-fz": i != null && i.includes("compact") ? we(i.replace("compact-", "")) : we(i),
      "--section-radius": e === void 0 ? void 0 : xt(e),
      "--section-bg": n || o ? a.background : void 0,
      "--section-color": a.color,
      "--section-bd": n || o ? a.border : void 0
    }
  };
}, yo = q((t, e) => {
  const n = E("ButtonGroupSection", ps, t), {
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
  } = E("ButtonGroupSection", ps, t), m = se({
    name: "ButtonGroupSection",
    props: n,
    classes: Zt,
    className: r,
    style: o,
    classNames: s,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: af,
    rootSelector: "groupSection"
  });
  return /* @__PURE__ */ h(W, { ...m("groupSection"), ref: e, variant: l, ...p });
});
yo.classes = Zt;
yo.displayName = "@mantine/core/ButtonGroupSection";
const cf = {
  in: { opacity: 1, transform: `translate(-50%, calc(-50% + ${ne(1)}))` },
  out: { opacity: 0, transform: "translate(-50%, -200%)" },
  common: { transformOrigin: "center" },
  transitionProperty: "transform, opacity"
}, lf = {}, df = (t, { radius: e, color: n, gradient: r, variant: o, size: s, justify: i, autoContrast: a }) => {
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
      "--button-height": ge(s, "button-height"),
      "--button-padding-x": ge(s, "button-padding-x"),
      "--button-fz": s != null && s.includes("compact") ? we(s.replace("compact-", "")) : we(s),
      "--button-radius": e === void 0 ? void 0 : xt(e),
      "--button-bg": n || o ? c.background : void 0,
      "--button-hover": n || o ? c.hover : void 0,
      "--button-color": c.color,
      "--button-bd": n || o ? c.border : void 0,
      "--button-hover-color": n || o ? c.hoverColor : void 0
    }
  };
}, yt = He((t, e) => {
  const n = E("Button", lf, t), {
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
    loading: m,
    loaderProps: g,
    gradient: y,
    classNames: w,
    styles: x,
    unstyled: v,
    "data-disabled": b,
    autoContrast: C,
    mod: S,
    ...T
  } = n, k = se({
    name: "Button",
    props: n,
    classes: Zt,
    className: s,
    style: r,
    classNames: w,
    styles: x,
    unstyled: v,
    vars: o,
    varsResolver: df
  }), D = !!l, $ = !!d;
  return /* @__PURE__ */ ae(
    Fn,
    {
      ref: e,
      ...k("root", { active: !a && !m && !b }),
      unstyled: v,
      variant: f,
      disabled: a || m,
      mod: [
        {
          disabled: a || b,
          loading: m,
          block: u,
          "with-left-section": D,
          "with-right-section": $
        },
        S
      ],
      ...T,
      children: [
        /* @__PURE__ */ h(Vn, { mounted: !!m, transition: cf, duration: 150, children: (U) => /* @__PURE__ */ h(W, { component: "span", ...k("loader", { style: U }), "aria-hidden": !0, children: /* @__PURE__ */ h(
          Wn,
          {
            color: "var(--button-color)",
            size: "calc(var(--button-height) / 1.8)",
            ...g
          }
        ) }) }),
        /* @__PURE__ */ ae("span", { ...k("inner"), children: [
          l && /* @__PURE__ */ h(W, { component: "span", ...k("section"), mod: { position: "left" }, children: l }),
          /* @__PURE__ */ h(W, { component: "span", mod: { loading: m }, ...k("label"), children: c }),
          d && /* @__PURE__ */ h(W, { component: "span", ...k("section"), mod: { position: "right" }, children: d })
        ] })
      ]
    }
  );
});
yt.classes = Zt;
yt.displayName = "@mantine/core/Button";
yt.Group = go;
yt.GroupSection = yo;
const [uf, ff] = Bt(
  "Card component was not found in tree"
);
var vo = { root: "m_e615b15f", section: "m_599a2148" };
const pf = {}, Xn = He((t, e) => {
  const n = E("CardSection", pf, t), { classNames: r, className: o, style: s, styles: i, vars: a, withBorder: c, inheritPadding: l, mod: d, ...u } = n, f = ff();
  return /* @__PURE__ */ h(
    W,
    {
      ref: e,
      mod: [{ "with-border": c, "inherit-padding": l }, d],
      ...f.getStyles("section", { className: o, style: s, styles: i, classNames: r }),
      ...u
    }
  );
});
Xn.classes = vo;
Xn.displayName = "@mantine/core/CardSection";
const mf = {}, hf = (t, { padding: e }) => ({
  root: {
    "--card-padding": $t(e)
  }
}), tn = He((t, e) => {
  const n = E("Card", mf, t), { classNames: r, className: o, style: s, styles: i, unstyled: a, vars: c, children: l, padding: d, ...u } = n, f = se({
    name: "Card",
    props: n,
    classes: vo,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: hf
  }), p = gs.toArray(l), m = p.map((g, y) => typeof g == "object" && g && "type" in g && g.type === Xn ? nn(g, {
    "data-first-section": y === 0 || void 0,
    "data-last-section": y === p.length - 1 || void 0
  }) : g);
  return /* @__PURE__ */ h(uf, { value: { getStyles: f }, children: /* @__PURE__ */ h(Xr, { ref: e, unstyled: a, ...f("root"), ...u, children: m }) });
});
tn.classes = vo;
tn.displayName = "@mantine/core/Card";
tn.Section = Xn;
const gf = {
  searchable: !1,
  withCheckIcon: !0,
  allowDeselect: !0,
  checkIconPosition: "left"
}, bo = q((t, e) => {
  const n = E("Select", gf, t), {
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
    onChange: m,
    data: g,
    value: y,
    defaultValue: w,
    selectFirstOptionOnChange: x,
    onOptionSubmit: v,
    comboboxProps: b,
    readOnly: C,
    disabled: S,
    filter: T,
    limit: k,
    withScrollArea: D,
    maxDropdownHeight: $,
    size: U,
    searchable: I,
    rightSection: j,
    checkIconPosition: V,
    withCheckIcon: X,
    nothingFoundMessage: N,
    name: M,
    form: P,
    searchValue: F,
    defaultSearchValue: re,
    onSearchChange: Te,
    allowDeselect: je,
    error: ce,
    rightSectionPointerEvents: Ye,
    id: Re,
    clearable: qe,
    clearButtonProps: Ne,
    hiddenInputProps: dt,
    renderOption: Se,
    onClear: ut,
    autoComplete: Ct,
    scrollAreaProps: Ht,
    __defaultRightSection: Ut,
    __clearSection: an,
    __clearable: cn,
    chevronColor: Yt,
    ...nt
  } = n, ft = vn(() => Iu(g), [g]), Ie = vn(() => Pi(ft), [ft]), de = En(Re), [be, ln, dn] = kn({
    value: y,
    defaultValue: w,
    finalValue: null,
    onChange: m
  }), Ce = typeof be == "string" ? Ie[be] : void 0, Xe = uc(Ce), [pt, un, fn] = kn({
    value: F,
    defaultValue: re,
    finalValue: Ce ? Ce.label : "",
    onChange: Te
  }), ye = Li({
    opened: a,
    defaultOpened: c,
    onDropdownOpen: () => {
      d == null || d(), ye.updateSelectedOptionIndex("active", { scrollIntoView: !0 });
    },
    onDropdownClose: () => {
      l == null || l(), ye.resetSelectedOption();
    }
  }), Fe = (fe) => {
    un(fe), ye.resetSelectedOption();
  }, { resolvedClassNames: pe, resolvedStyles: Co } = Ir({
    props: n,
    styles: o,
    classNames: r
  });
  te(() => {
    x && ye.selectFirstOption();
  }, [x, pt]), te(() => {
    y === null && Fe(""), typeof y == "string" && Ce && ((Xe == null ? void 0 : Xe.value) !== Ce.value || (Xe == null ? void 0 : Xe.label) !== Ce.label) && Fe(Ce.label);
  }, [y, Ce]), te(() => {
    var fe;
    !dn && !fn && Fe(typeof be == "string" && ((fe = Ie[be]) == null ? void 0 : fe.label) || "");
  }, [g, be]);
  const qi = /* @__PURE__ */ h(
    Q.ClearButton,
    {
      ...Ne,
      onClear: () => {
        ln(null, null), Fe(""), ut == null || ut();
      }
    }
  ), ko = qe && !!be && !S && !C;
  return /* @__PURE__ */ ae(it, { children: [
    /* @__PURE__ */ ae(
      Q,
      {
        store: ye,
        __staticSelector: "Select",
        classNames: pe,
        styles: Co,
        unstyled: s,
        readOnly: C,
        onOptionSubmit: (fe) => {
          v == null || v(fe);
          const Ge = je && Ie[fe].value === be ? null : Ie[fe], Gn = Ge ? Ge.value : null;
          Gn !== be && ln(Gn, Ge), !dn && Fe(typeof Gn == "string" && (Ge == null ? void 0 : Ge.label) || ""), ye.closeDropdown();
        },
        size: U,
        ...b,
        children: [
          /* @__PURE__ */ h(Q.Target, { targetType: I ? "input" : "button", autoComplete: Ct, children: /* @__PURE__ */ h(
            qn,
            {
              id: de,
              ref: e,
              __defaultRightSection: /* @__PURE__ */ h(
                Q.Chevron,
                {
                  size: U,
                  error: ce,
                  unstyled: s,
                  color: Yt
                }
              ),
              __clearSection: qi,
              __clearable: ko,
              rightSection: j,
              rightSectionPointerEvents: Ye || (ko ? "all" : "none"),
              ...nt,
              size: U,
              __staticSelector: "Select",
              disabled: S,
              readOnly: C || !I,
              value: pt,
              onChange: (fe) => {
                Fe(fe.currentTarget.value), ye.openDropdown(), x && ye.selectFirstOption();
              },
              onFocus: (fe) => {
                I && ye.openDropdown(), u == null || u(fe);
              },
              onBlur: (fe) => {
                var Ge;
                I && ye.closeDropdown(), Fe(be != null && ((Ge = Ie[be]) == null ? void 0 : Ge.label) || ""), f == null || f(fe);
              },
              onClick: (fe) => {
                I ? ye.openDropdown() : ye.toggleDropdown(), p == null || p(fe);
              },
              classNames: pe,
              styles: Co,
              unstyled: s,
              pointer: !I,
              error: ce
            }
          ) }),
          /* @__PURE__ */ h(
            of,
            {
              data: ft,
              hidden: C || S,
              filter: T,
              search: pt,
              limit: k,
              hiddenWhenEmpty: !N,
              withScrollArea: D,
              maxDropdownHeight: $,
              filterOptions: I && (Ce == null ? void 0 : Ce.label) !== pt,
              value: be,
              checkIconPosition: V,
              withCheckIcon: X,
              nothingFoundMessage: N,
              unstyled: s,
              labelId: nt.label ? `${de}-label` : void 0,
              "aria-label": nt.label ? void 0 : nt["aria-label"],
              renderOption: Se,
              scrollAreaProps: Ht
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ h(
      Q.HiddenInput,
      {
        value: be,
        name: M,
        form: P,
        disabled: S,
        ...dt
      }
    )
  ] });
});
bo.classes = { ...qn.classes, ...Q.classes };
bo.displayName = "@mantine/core/Select";
var ji = { root: "m_6d731127" };
const yf = {
  gap: "md",
  align: "stretch",
  justify: "flex-start"
}, vf = (t, { gap: e, align: n, justify: r }) => ({
  root: {
    "--stack-gap": $t(e),
    "--stack-align": n,
    "--stack-justify": r
  }
}), wo = q((t, e) => {
  const n = E("Stack", yf, t), {
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
  } = n, m = se({
    name: "Stack",
    props: n,
    classes: ji,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: vf
  });
  return /* @__PURE__ */ h(W, { ref: e, ...m("root"), variant: f, ...p });
});
wo.classes = ji;
wo.displayName = "@mantine/core/Stack";
const [bf, wf] = Bt(
  "Table component was not found in the tree"
);
var sn = { table: "m_b23fa0ef", th: "m_4e7aa4f3", tr: "m_4e7aa4fd", td: "m_4e7aa4ef", tbody: "m_b2404537", thead: "m_b242d975", caption: "m_9e5a3ac7", scrollContainer: "m_a100c15", scrollContainerInner: "m_62259741" };
function xf(t, e) {
  if (!e)
    return;
  const n = {};
  return e.columnBorder && t.withColumnBorders && (n["data-with-column-border"] = !0), e.rowBorder && t.withRowBorders && (n["data-with-row-border"] = !0), e.striped && t.striped && (n["data-striped"] = t.striped), e.highlightOnHover && t.highlightOnHover && (n["data-hover"] = !0), e.captionSide && t.captionSide && (n["data-side"] = t.captionSide), e.stickyHeader && t.stickyHeader && (n["data-sticky"] = !0), n;
}
function St(t, e) {
  const n = `Table${t.charAt(0).toUpperCase()}${t.slice(1)}`, r = q((o, s) => {
    const i = E(n, {}, o), { classNames: a, className: c, style: l, styles: d, ...u } = i, f = wf();
    return /* @__PURE__ */ h(
      W,
      {
        component: t,
        ref: s,
        ...xf(f, e),
        ...f.getStyles(t, { className: c, classNames: a, style: l, styles: d, props: i }),
        ...u
      }
    );
  });
  return r.displayName = `@mantine/core/${n}`, r.classes = sn, r;
}
const Tr = St("th", { columnBorder: !0 }), Fi = St("td", { columnBorder: !0 }), yn = St("tr", {
  rowBorder: !0,
  striped: !0,
  highlightOnHover: !0
}), Vi = St("thead", { stickyHeader: !0 }), Wi = St("tbody"), Zi = St("tfoot"), Hi = St("caption", { captionSide: !0 });
function xo({ data: t }) {
  return /* @__PURE__ */ ae(it, { children: [
    t.caption && /* @__PURE__ */ h(Hi, { children: t.caption }),
    t.head && /* @__PURE__ */ h(Vi, { children: /* @__PURE__ */ h(yn, { children: t.head.map((e, n) => /* @__PURE__ */ h(Tr, { children: e }, n)) }) }),
    t.body && /* @__PURE__ */ h(Wi, { children: t.body.map((e, n) => /* @__PURE__ */ h(yn, { children: e.map((r, o) => /* @__PURE__ */ h(Fi, { children: r }, o)) }, n)) }),
    t.foot && /* @__PURE__ */ h(Zi, { children: /* @__PURE__ */ h(yn, { children: t.foot.map((e, n) => /* @__PURE__ */ h(Tr, { children: e }, n)) }) })
  ] });
}
xo.displayName = "@mantine/core/TableDataRenderer";
const _f = {
  type: "scrollarea"
}, Sf = (t, { minWidth: e, maxHeight: n, type: r }) => ({
  scrollContainer: {
    "--table-min-width": ne(e),
    "--table-max-height": ne(n),
    "--table-overflow": r === "native" ? "auto" : void 0
  }
}), _o = q((t, e) => {
  const n = E("TableScrollContainer", _f, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: c,
    children: l,
    minWidth: d,
    maxHeight: u,
    type: f,
    scrollAreaProps: p,
    ...m
  } = n, g = se({
    name: "TableScrollContainer",
    classes: sn,
    props: n,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: Sf,
    rootSelector: "scrollContainer"
  });
  return /* @__PURE__ */ h(
    W,
    {
      component: f === "scrollarea" ? Wt : "div",
      ...f === "scrollarea" ? u ? { offsetScrollbars: "xy", ...p } : { offsetScrollbars: "x", ...p } : {},
      ref: e,
      ...g("scrollContainer"),
      ...m,
      children: /* @__PURE__ */ h("div", { ...g("scrollContainerInner"), children: l })
    }
  );
});
_o.classes = sn;
_o.displayName = "@mantine/core/TableScrollContainer";
const Cf = {
  withRowBorders: !0,
  verticalSpacing: 7
}, kf = (t, {
  layout: e,
  captionSide: n,
  horizontalSpacing: r,
  verticalSpacing: o,
  borderColor: s,
  stripedColor: i,
  highlightOnHoverColor: a,
  striped: c,
  highlightOnHover: l,
  stickyHeaderOffset: d,
  stickyHeader: u
}) => ({
  table: {
    "--table-layout": e,
    "--table-caption-side": n,
    "--table-horizontal-spacing": $t(r),
    "--table-vertical-spacing": $t(o),
    "--table-border-color": s ? st(s, t) : void 0,
    "--table-striped-color": c && i ? st(i, t) : void 0,
    "--table-highlight-on-hover-color": l && a ? st(a, t) : void 0,
    "--table-sticky-header-offset": u ? ne(d) : void 0
  }
}), ie = q((t, e) => {
  const n = E("Table", Cf, t), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: c,
    horizontalSpacing: l,
    verticalSpacing: d,
    captionSide: u,
    stripedColor: f,
    highlightOnHoverColor: p,
    striped: m,
    highlightOnHover: g,
    withColumnBorders: y,
    withRowBorders: w,
    withTableBorder: x,
    borderColor: v,
    layout: b,
    variant: C,
    data: S,
    children: T,
    stickyHeader: k,
    stickyHeaderOffset: D,
    mod: $,
    tabularNums: U,
    ...I
  } = n, j = se({
    name: "Table",
    props: n,
    className: o,
    style: s,
    classes: sn,
    classNames: r,
    styles: i,
    unstyled: a,
    rootSelector: "table",
    vars: c,
    varsResolver: kf
  });
  return /* @__PURE__ */ h(
    bf,
    {
      value: {
        getStyles: j,
        stickyHeader: k,
        striped: m === !0 ? "odd" : m || void 0,
        highlightOnHover: g,
        withColumnBorders: y,
        withRowBorders: w,
        captionSide: u || "bottom"
      },
      children: /* @__PURE__ */ h(
        W,
        {
          component: "table",
          variant: C,
          ref: e,
          mod: [{ "data-with-table-border": x, "data-tabular-nums": U }, $],
          ...j("table"),
          ...I,
          children: T || !!S && /* @__PURE__ */ h(xo, { data: S })
        }
      )
    }
  );
});
ie.classes = sn;
ie.displayName = "@mantine/core/Table";
ie.Td = Fi;
ie.Th = Tr;
ie.Tr = yn;
ie.Thead = Vi;
ie.Tbody = Wi;
ie.Tfoot = Zi;
ie.Caption = Hi;
ie.ScrollContainer = _o;
ie.DataRenderer = xo;
const Tf = ["h1", "h2", "h3", "h4", "h5", "h6"], Rf = ["xs", "sm", "md", "lg", "xl"];
function Nf(t, e) {
  const n = e !== void 0 ? e : `h${t}`;
  return Tf.includes(n) ? {
    fontSize: `var(--mantine-${n}-font-size)`,
    fontWeight: `var(--mantine-${n}-font-weight)`,
    lineHeight: `var(--mantine-${n}-line-height)`
  } : Rf.includes(n) ? {
    fontSize: `var(--mantine-font-size-${n})`,
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  } : {
    fontSize: ne(n),
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  };
}
var Ui = { root: "m_8a5d1357" };
const Af = {
  order: 1
}, Pf = (t, { order: e, size: n, lineClamp: r, textWrap: o }) => {
  const s = Nf(e, n);
  return {
    root: {
      "--title-fw": s.fontWeight,
      "--title-lh": s.lineHeight,
      "--title-fz": s.fontSize,
      "--title-line-clamp": typeof r == "number" ? r.toString() : void 0,
      "--title-text-wrap": o
    }
  };
}, So = q((t, e) => {
  const n = E("Title", Af, t), {
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
    mod: m,
    ...g
  } = n, y = se({
    name: "Title",
    props: n,
    classes: Ui,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: Pf
  });
  return [1, 2, 3, 4, 5, 6].includes(c) ? /* @__PURE__ */ h(
    W,
    {
      ...y("root"),
      component: `h${c}`,
      variant: u,
      ref: e,
      mod: [{ order: c, "data-line-clamp": typeof f == "number" }, m],
      size: d,
      ...g
    }
  ) : null;
});
So.classes = Ui;
So.displayName = "@mantine/core/Title";
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Of = {
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
const Yi = (t, e, n, r) => {
  const o = oe(
    ({ color: s = "currentColor", size: i = 24, stroke: a = 2, title: c, className: l, children: d, ...u }, f) => hn(
      "svg",
      {
        ref: f,
        ...Of[t],
        width: i,
        height: i,
        className: ["tabler-icon", `tabler-icon-${e}`, l].join(" "),
        strokeWidth: a,
        stroke: s,
        ...u
      },
      [
        c && hn("title", { key: "svg-title" }, c),
        ...r.map(([p, m]) => hn(p, m)),
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
const $f = [["path", { d: "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2", key: "svg-0" }], ["path", { d: "M7 11l5 5l5 -5", key: "svg-1" }], ["path", { d: "M12 4l0 12", key: "svg-2" }]], Ef = Yi("outline", "download", "Download", $f);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const If = [["path", { d: "M14 3v4a1 1 0 0 0 1 1h4", key: "svg-0" }], ["path", { d: "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2", key: "svg-1" }], ["path", { d: "M9 17l0 -5", key: "svg-2" }], ["path", { d: "M12 17l0 -1", key: "svg-3" }], ["path", { d: "M15 17l0 -3", key: "svg-4" }]], Df = Yi("outline", "file-analytics", "FileAnalytics", If), ir = "http://localhost:3001/api/v1";
function ar() {
  return typeof localStorage < "u" ? localStorage.getItem("fpp_token") : null;
}
function Lf() {
  const [t, e] = G([]), [n, r] = G("tasks"), [o, s] = G(!1), { can: i } = Oa(), a = $a(), c = i("reports:generate"), l = i("reports:export"), d = ee(async () => {
    const p = ar(), g = await (await fetch(`${ir}/reports`, {
      headers: { Authorization: `Bearer ${p}` }
    })).json();
    e(g.data ?? []);
  }, []), u = ee(async () => {
    if (!(!c || !n)) {
      s(!0);
      try {
        const p = ar(), g = await (await fetch(`${ir}/reports`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${p}`
          },
          body: JSON.stringify({ type: n })
        })).json();
        a("report.generated", {
          reportId: g.data.id,
          type: g.data.type,
          title: g.data.title
        }), await d();
      } finally {
        s(!1);
      }
    }
  }, [c, n, d]), f = ee(
    async (p) => {
      if (!l) return;
      const m = ar(), y = await (await fetch(
        `${ir}/reports/${p}/export?format=json`,
        { headers: { Authorization: `Bearer ${m}` } }
      )).blob(), w = URL.createObjectURL(y), x = document.createElement("a");
      x.href = w, x.download = `report-${p}.json`, x.click(), URL.revokeObjectURL(w);
    },
    [l]
  );
  return /* @__PURE__ */ ae(wo, { gap: "lg", children: [
    /* @__PURE__ */ h(So, { order: 2, children: "Reports" }),
    c && /* @__PURE__ */ h(tn, { withBorder: !0, padding: "md", children: /* @__PURE__ */ ae(to, { children: [
      /* @__PURE__ */ h(
        bo,
        {
          label: "Report Type",
          value: n,
          onChange: r,
          data: [
            { value: "tasks", label: "Tasks Report" },
            { value: "activity", label: "Activity Report" },
            { value: "usage", label: "Usage Report" }
          ],
          w: 200
        }
      ),
      /* @__PURE__ */ h(
        yt,
        {
          leftSection: /* @__PURE__ */ h(Df, { size: 16 }),
          onClick: () => void u(),
          loading: o,
          mt: 24,
          children: "Generate Report"
        }
      ),
      /* @__PURE__ */ h(yt, { variant: "subtle", onClick: () => void d(), mt: 24, children: "Refresh List" })
    ] }) }),
    /* @__PURE__ */ ae(tn, { withBorder: !0, children: [
      /* @__PURE__ */ ae(ie, { children: [
        /* @__PURE__ */ h(ie.Thead, { children: /* @__PURE__ */ ae(ie.Tr, { children: [
          /* @__PURE__ */ h(ie.Th, { children: "Title" }),
          /* @__PURE__ */ h(ie.Th, { children: "Type" }),
          /* @__PURE__ */ h(ie.Th, { children: "Created" }),
          /* @__PURE__ */ h(ie.Th, { children: "Actions" })
        ] }) }),
        /* @__PURE__ */ h(ie.Tbody, { children: t.map((p) => /* @__PURE__ */ ae(ie.Tr, { children: [
          /* @__PURE__ */ h(ie.Td, { children: p.title }),
          /* @__PURE__ */ h(ie.Td, { children: p.type }),
          /* @__PURE__ */ h(ie.Td, { children: new Date(p.createdAt).toLocaleString() }),
          /* @__PURE__ */ h(ie.Td, { children: l && /* @__PURE__ */ h(
            yt,
            {
              size: "xs",
              variant: "light",
              leftSection: /* @__PURE__ */ h(Ef, { size: 14 }),
              onClick: () => void f(p.id),
              children: "Export"
            }
          ) })
        ] }, p.id)) })
      ] }),
      t.length === 0 && /* @__PURE__ */ h(oo, { c: "dimmed", ta: "center", py: "xl", children: "No reports generated yet." })
    ] })
  ] });
}
Aa({
  manifest: Wa,
  routes: [
    {
      path: "/plugins/com.fpp.reports",
      component: Lf,
      label: "Reports",
      permission: "reports:read"
    }
  ],
  menuItems: [
    {
      label: "Reports",
      path: "/plugins/com.fpp.reports",
      icon: "file-analytics",
      order: 40
    }
  ],
  widgets: []
});
