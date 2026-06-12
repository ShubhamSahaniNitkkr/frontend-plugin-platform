import { jsx as g, jsxs as q, Fragment as Ce } from "react/jsx-runtime";
import { createContext as Ve, useContext as ft, useState as rt, useRef as Se, useEffect as Ie, useId as Hr, forwardRef as X, Children as Yr, cloneElement as Xr, createElement as Ye, memo as Qr, useReducer as Jr, useCallback as Kr } from "react";
import en from "react-dom";
const tn = [
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
], rn = [
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
var Tt;
(function(t) {
  t.mergeShapes = (e, r) => ({
    ...e,
    ...r
    // second overwrites first
  });
})(Tt || (Tt = {}));
const h = N.arrayToEnum([
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
]), ee = (t) => {
  switch (typeof t) {
    case "undefined":
      return h.undefined;
    case "string":
      return h.string;
    case "number":
      return Number.isNaN(t) ? h.nan : h.number;
    case "boolean":
      return h.boolean;
    case "function":
      return h.function;
    case "bigint":
      return h.bigint;
    case "symbol":
      return h.symbol;
    case "object":
      return Array.isArray(t) ? h.array : t === null ? h.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? h.promise : typeof Map < "u" && t instanceof Map ? h.map : typeof Set < "u" && t instanceof Set ? h.set : typeof Date < "u" && t instanceof Date ? h.date : h.object;
    default:
      return h.unknown;
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
class Q extends Error {
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
    if (!(e instanceof Q))
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
Q.create = (t) => new Q(t);
const nt = (t, e) => {
  let r;
  switch (t.code) {
    case u.invalid_type:
      t.received === h.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
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
let nn = nt;
function sn() {
  return nn;
}
const an = (t) => {
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
function p(t, e) {
  const r = sn(), n = an({
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
      r === nt ? void 0 : nt
      // then global default map
    ].filter((s) => !!s)
  });
  t.common.issues.push(n);
}
class P {
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
        return b;
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
    return P.mergeObjectSync(e, n);
  }
  static mergeObjectSync(e, r) {
    const n = {};
    for (const s of r) {
      const { key: a, value: i } = s;
      if (a.status === "aborted" || i.status === "aborted")
        return b;
      a.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof i.value < "u" || s.alwaysSet) && (n[a.value] = i.value);
    }
    return { status: e.value, value: n };
  }
}
const b = Object.freeze({
  status: "aborted"
}), we = (t) => ({ status: "dirty", value: t }), B = (t) => ({ status: "valid", value: t }), $t = (t) => t.status === "aborted", Rt = (t) => t.status === "dirty", fe = (t) => t.status === "valid", je = (t) => typeof Promise < "u" && t instanceof Promise;
var y;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(y || (y = {}));
class H {
  constructor(e, r, n, s) {
    this._cachedPath = [], this.parent = e, this.data = r, this._path = n, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Ot = (t, e) => {
  if (fe(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const r = new Q(t.common.issues);
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
    const { message: c } = t;
    return i.code === "invalid_enum_value" ? { message: c ?? o.defaultError } : typeof o.data > "u" ? { message: c ?? n ?? o.defaultError } : i.code !== "invalid_type" ? { message: o.defaultError } : { message: c ?? r ?? o.defaultError };
  }, description: s };
}
class C {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return ee(e.data);
  }
  _getOrReturnCtx(e, r) {
    return r || {
      common: e.parent.common,
      data: e.data,
      parsedType: ee(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new P(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: ee(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const r = this._parse(e);
    if (je(r))
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
      parsedType: ee(e)
    }, s = this._parseSync({ data: e, path: n.path, parent: n });
    return Ot(n, s);
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
      parsedType: ee(e)
    };
    if (!this["~standard"].async)
      try {
        const a = this._parseSync({ data: e, path: [], parent: r });
        return fe(a) ? {
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
    return this._parseAsync({ data: e, path: [], parent: r }).then((a) => fe(a) ? {
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
      parsedType: ee(e)
    }, s = this._parse({ data: e, path: n.path, parent: n }), a = await (je(s) ? s : Promise.resolve(s));
    return Ot(n, a);
  }
  refine(e, r) {
    const n = (s) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(s) : r;
    return this._refinement((s, a) => {
      const i = e(s), o = () => a.addIssue({
        code: u.custom,
        ...n(s)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((c) => c ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
    });
  }
  refinement(e, r) {
    return this._refinement((n, s) => e(n) ? !0 : (s.addIssue(typeof r == "function" ? r(n, s) : r), !1));
  }
  _refinement(e) {
    return new he({
      schema: this,
      typeName: _.ZodEffects,
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
    return te.create(this, this._def);
  }
  nullable() {
    return ye.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return G.create(this);
  }
  promise() {
    return Me.create(this, this._def);
  }
  or(e) {
    return Pe.create([this, e], this._def);
  }
  and(e) {
    return Ze.create(this, e, this._def);
  }
  transform(e) {
    return new he({
      ...w(this._def),
      schema: this,
      typeName: _.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const r = typeof e == "function" ? e : () => e;
    return new it({
      ...w(this._def),
      innerType: this,
      defaultValue: r,
      typeName: _.ZodDefault
    });
  }
  brand() {
    return new Rn({
      typeName: _.ZodBranded,
      type: this,
      ...w(this._def)
    });
  }
  catch(e) {
    const r = typeof e == "function" ? e : () => e;
    return new ot({
      ...w(this._def),
      innerType: this,
      catchValue: r,
      typeName: _.ZodCatch
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
    return pt.create(this, e);
  }
  readonly() {
    return ct.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const on = /^c[^\s-]{8,}$/i, cn = /^[0-9a-z]+$/, dn = /^[0-9A-HJKMNP-TV-Z]{26}$/i, ln = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, un = /^[a-z0-9_-]{21}$/i, fn = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, pn = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, mn = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, hn = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Xe;
const yn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, gn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, vn = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, _n = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, bn = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, xn = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, Yt = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", kn = new RegExp(`^${Yt}$`);
function Xt(t) {
  let e = "[0-5]\\d";
  t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`);
  const r = t.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${r}`;
}
function wn(t) {
  return new RegExp(`^${Xt(t)}$`);
}
function Sn(t) {
  let e = `${Yt}T${Xt(t)}`;
  const r = [];
  return r.push(t.local ? "Z?" : "Z"), t.offset && r.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${r.join("|")})`, new RegExp(`^${e}$`);
}
function Cn(t, e) {
  return !!((e === "v4" || !e) && yn.test(t) || (e === "v6" || !e) && vn.test(t));
}
function Nn(t, e) {
  if (!fn.test(t))
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
function Tn(t, e) {
  return !!((e === "v4" || !e) && gn.test(t) || (e === "v6" || !e) && _n.test(t));
}
class Y extends C {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== h.string) {
      const a = this._getOrReturnCtx(e);
      return p(a, {
        code: u.invalid_type,
        expected: h.string,
        received: a.parsedType
      }), b;
    }
    const n = new P();
    let s;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (s = this._getOrReturnCtx(e, s), p(s, {
          code: u.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), n.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (s = this._getOrReturnCtx(e, s), p(s, {
          code: u.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), n.dirty());
      else if (a.kind === "length") {
        const i = e.data.length > a.value, o = e.data.length < a.value;
        (i || o) && (s = this._getOrReturnCtx(e, s), i ? p(s, {
          code: u.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : o && p(s, {
          code: u.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), n.dirty());
      } else if (a.kind === "email")
        mn.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "email",
          code: u.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "emoji")
        Xe || (Xe = new RegExp(hn, "u")), Xe.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "emoji",
          code: u.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "uuid")
        ln.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "uuid",
          code: u.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "nanoid")
        un.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "nanoid",
          code: u.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "cuid")
        on.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "cuid",
          code: u.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "cuid2")
        cn.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "cuid2",
          code: u.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "ulid")
        dn.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
          validation: "ulid",
          code: u.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), p(s, {
            validation: "url",
            code: u.invalid_string,
            message: a.message
          }), n.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
        validation: "regex",
        code: u.invalid_string,
        message: a.message
      }), n.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (s = this._getOrReturnCtx(e, s), p(s, {
        code: u.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), n.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (s = this._getOrReturnCtx(e, s), p(s, {
        code: u.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), n.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (s = this._getOrReturnCtx(e, s), p(s, {
        code: u.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), n.dirty()) : a.kind === "datetime" ? Sn(a).test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
        code: u.invalid_string,
        validation: "datetime",
        message: a.message
      }), n.dirty()) : a.kind === "date" ? kn.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
        code: u.invalid_string,
        validation: "date",
        message: a.message
      }), n.dirty()) : a.kind === "time" ? wn(a).test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
        code: u.invalid_string,
        validation: "time",
        message: a.message
      }), n.dirty()) : a.kind === "duration" ? pn.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
        validation: "duration",
        code: u.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "ip" ? Cn(e.data, a.version) || (s = this._getOrReturnCtx(e, s), p(s, {
        validation: "ip",
        code: u.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "jwt" ? Nn(e.data, a.alg) || (s = this._getOrReturnCtx(e, s), p(s, {
        validation: "jwt",
        code: u.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "cidr" ? Tn(e.data, a.version) || (s = this._getOrReturnCtx(e, s), p(s, {
        validation: "cidr",
        code: u.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "base64" ? bn.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
        validation: "base64",
        code: u.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "base64url" ? xn.test(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
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
      ...y.errToObj(n)
    });
  }
  _addCheck(e) {
    return new Y({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...y.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...y.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...y.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...y.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...y.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...y.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...y.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...y.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...y.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...y.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...y.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...y.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...y.errToObj(e) });
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
      ...y.errToObj(e == null ? void 0 : e.message)
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
      ...y.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...y.errToObj(e) });
  }
  regex(e, r) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...y.errToObj(r)
    });
  }
  includes(e, r) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: r == null ? void 0 : r.position,
      ...y.errToObj(r == null ? void 0 : r.message)
    });
  }
  startsWith(e, r) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...y.errToObj(r)
    });
  }
  endsWith(e, r) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...y.errToObj(r)
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...y.errToObj(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...y.errToObj(r)
    });
  }
  length(e, r) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...y.errToObj(r)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, y.errToObj(e));
  }
  trim() {
    return new Y({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Y({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Y({
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
Y.create = (t) => new Y({
  checks: [],
  typeName: _.ZodString,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...w(t)
});
function $n(t, e) {
  const r = (t.toString().split(".")[1] || "").length, n = (e.toString().split(".")[1] || "").length, s = r > n ? r : n, a = Number.parseInt(t.toFixed(s).replace(".", "")), i = Number.parseInt(e.toFixed(s).replace(".", ""));
  return a % i / 10 ** s;
}
class pe extends C {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== h.number) {
      const a = this._getOrReturnCtx(e);
      return p(a, {
        code: u.invalid_type,
        expected: h.number,
        received: a.parsedType
      }), b;
    }
    let n;
    const s = new P();
    for (const a of this._def.checks)
      a.kind === "int" ? N.isInteger(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
        code: u.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), s.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (n = this._getOrReturnCtx(e, n), p(n, {
        code: u.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (n = this._getOrReturnCtx(e, n), p(n, {
        code: u.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? $n(e.data, a.value) !== 0 && (n = this._getOrReturnCtx(e, n), p(n, {
        code: u.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
        code: u.not_finite,
        message: a.message
      }), s.dirty()) : N.assertNever(a);
    return { status: s.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, y.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, y.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, y.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, y.toString(r));
  }
  setLimit(e, r, n, s) {
    return new pe({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: n,
          message: y.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new pe({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: y.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: y.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: y.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: y.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: y.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: y.toString(r)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: y.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: y.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: y.toString(e)
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
pe.create = (t) => new pe({
  checks: [],
  typeName: _.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...w(t)
});
class Ne extends C {
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
    if (this._getType(e) !== h.bigint)
      return this._getInvalidInput(e);
    let n;
    const s = new P();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (n = this._getOrReturnCtx(e, n), p(n, {
        code: u.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (n = this._getOrReturnCtx(e, n), p(n, {
        code: u.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (n = this._getOrReturnCtx(e, n), p(n, {
        code: u.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : N.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _getInvalidInput(e) {
    const r = this._getOrReturnCtx(e);
    return p(r, {
      code: u.invalid_type,
      expected: h.bigint,
      received: r.parsedType
    }), b;
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, y.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, y.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, y.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, y.toString(r));
  }
  setLimit(e, r, n, s) {
    return new Ne({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: n,
          message: y.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Ne({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: y.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: y.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: y.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: y.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: y.toString(r)
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
Ne.create = (t) => new Ne({
  checks: [],
  typeName: _.ZodBigInt,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...w(t)
});
class At extends C {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== h.boolean) {
      const n = this._getOrReturnCtx(e);
      return p(n, {
        code: u.invalid_type,
        expected: h.boolean,
        received: n.parsedType
      }), b;
    }
    return B(e.data);
  }
}
At.create = (t) => new At({
  typeName: _.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...w(t)
});
class Ee extends C {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== h.date) {
      const a = this._getOrReturnCtx(e);
      return p(a, {
        code: u.invalid_type,
        expected: h.date,
        received: a.parsedType
      }), b;
    }
    if (Number.isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return p(a, {
        code: u.invalid_date
      }), b;
    }
    const n = new P();
    let s;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (s = this._getOrReturnCtx(e, s), p(s, {
        code: u.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), n.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (s = this._getOrReturnCtx(e, s), p(s, {
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
    return new Ee({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: y.toString(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: y.toString(r)
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
Ee.create = (t) => new Ee({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: _.ZodDate,
  ...w(t)
});
class It extends C {
  _parse(e) {
    if (this._getType(e) !== h.symbol) {
      const n = this._getOrReturnCtx(e);
      return p(n, {
        code: u.invalid_type,
        expected: h.symbol,
        received: n.parsedType
      }), b;
    }
    return B(e.data);
  }
}
It.create = (t) => new It({
  typeName: _.ZodSymbol,
  ...w(t)
});
class jt extends C {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const n = this._getOrReturnCtx(e);
      return p(n, {
        code: u.invalid_type,
        expected: h.undefined,
        received: n.parsedType
      }), b;
    }
    return B(e.data);
  }
}
jt.create = (t) => new jt({
  typeName: _.ZodUndefined,
  ...w(t)
});
class Et extends C {
  _parse(e) {
    if (this._getType(e) !== h.null) {
      const n = this._getOrReturnCtx(e);
      return p(n, {
        code: u.invalid_type,
        expected: h.null,
        received: n.parsedType
      }), b;
    }
    return B(e.data);
  }
}
Et.create = (t) => new Et({
  typeName: _.ZodNull,
  ...w(t)
});
class Pt extends C {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return B(e.data);
  }
}
Pt.create = (t) => new Pt({
  typeName: _.ZodAny,
  ...w(t)
});
class st extends C {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return B(e.data);
  }
}
st.create = (t) => new st({
  typeName: _.ZodUnknown,
  ...w(t)
});
class re extends C {
  _parse(e) {
    const r = this._getOrReturnCtx(e);
    return p(r, {
      code: u.invalid_type,
      expected: h.never,
      received: r.parsedType
    }), b;
  }
}
re.create = (t) => new re({
  typeName: _.ZodNever,
  ...w(t)
});
class Zt extends C {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const n = this._getOrReturnCtx(e);
      return p(n, {
        code: u.invalid_type,
        expected: h.void,
        received: n.parsedType
      }), b;
    }
    return B(e.data);
  }
}
Zt.create = (t) => new Zt({
  typeName: _.ZodVoid,
  ...w(t)
});
class G extends C {
  _parse(e) {
    const { ctx: r, status: n } = this._processInputParams(e), s = this._def;
    if (r.parsedType !== h.array)
      return p(r, {
        code: u.invalid_type,
        expected: h.array,
        received: r.parsedType
      }), b;
    if (s.exactLength !== null) {
      const i = r.data.length > s.exactLength.value, o = r.data.length < s.exactLength.value;
      (i || o) && (p(r, {
        code: i ? u.too_big : u.too_small,
        minimum: o ? s.exactLength.value : void 0,
        maximum: i ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), n.dirty());
    }
    if (s.minLength !== null && r.data.length < s.minLength.value && (p(r, {
      code: u.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), n.dirty()), s.maxLength !== null && r.data.length > s.maxLength.value && (p(r, {
      code: u.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), n.dirty()), r.common.async)
      return Promise.all([...r.data].map((i, o) => s.type._parseAsync(new H(r, i, r.path, o)))).then((i) => P.mergeArray(n, i));
    const a = [...r.data].map((i, o) => s.type._parseSync(new H(r, i, r.path, o)));
    return P.mergeArray(n, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, r) {
    return new G({
      ...this._def,
      minLength: { value: e, message: y.toString(r) }
    });
  }
  max(e, r) {
    return new G({
      ...this._def,
      maxLength: { value: e, message: y.toString(r) }
    });
  }
  length(e, r) {
    return new G({
      ...this._def,
      exactLength: { value: e, message: y.toString(r) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
G.create = (t, e) => new G({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: _.ZodArray,
  ...w(e)
});
function le(t) {
  if (t instanceof $) {
    const e = {};
    for (const r in t.shape) {
      const n = t.shape[r];
      e[r] = te.create(le(n));
    }
    return new $({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof G ? new G({
    ...t._def,
    type: le(t.element)
  }) : t instanceof te ? te.create(le(t.unwrap())) : t instanceof ye ? ye.create(le(t.unwrap())) : t instanceof ae ? ae.create(t.items.map((e) => le(e))) : t;
}
class $ extends C {
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
    if (this._getType(e) !== h.object) {
      const d = this._getOrReturnCtx(e);
      return p(d, {
        code: u.invalid_type,
        expected: h.object,
        received: d.parsedType
      }), b;
    }
    const { status: n, ctx: s } = this._processInputParams(e), { shape: a, keys: i } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof re && this._def.unknownKeys === "strip"))
      for (const d in s.data)
        i.includes(d) || o.push(d);
    const c = [];
    for (const d of i) {
      const l = a[d], f = s.data[d];
      c.push({
        key: { status: "valid", value: d },
        value: l._parse(new H(s, f, s.path, d)),
        alwaysSet: d in s.data
      });
    }
    if (this._def.catchall instanceof re) {
      const d = this._def.unknownKeys;
      if (d === "passthrough")
        for (const l of o)
          c.push({
            key: { status: "valid", value: l },
            value: { status: "valid", value: s.data[l] }
          });
      else if (d === "strict")
        o.length > 0 && (p(s, {
          code: u.unrecognized_keys,
          keys: o
        }), n.dirty());
      else if (d !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const d = this._def.catchall;
      for (const l of o) {
        const f = s.data[l];
        c.push({
          key: { status: "valid", value: l },
          value: d._parse(
            new H(s, f, s.path, l)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: l in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const d = [];
      for (const l of c) {
        const f = await l.key, m = await l.value;
        d.push({
          key: f,
          value: m,
          alwaysSet: l.alwaysSet
        });
      }
      return d;
    }).then((d) => P.mergeObjectSync(n, d)) : P.mergeObjectSync(n, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return y.errToObj, new $({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (r, n) => {
          var a, i;
          const s = ((i = (a = this._def).errorMap) == null ? void 0 : i.call(a, r, n).message) ?? n.defaultError;
          return r.code === "unrecognized_keys" ? {
            message: y.errToObj(e).message ?? s
          } : {
            message: s
          };
        }
      } : {}
    });
  }
  strip() {
    return new $({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new $({
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
    return new $({
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
    return new $({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: _.ZodObject
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
    return new $({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const r = {};
    for (const n of N.objectKeys(e))
      e[n] && this.shape[n] && (r[n] = this.shape[n]);
    return new $({
      ...this._def,
      shape: () => r
    });
  }
  omit(e) {
    const r = {};
    for (const n of N.objectKeys(this.shape))
      e[n] || (r[n] = this.shape[n]);
    return new $({
      ...this._def,
      shape: () => r
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return le(this);
  }
  partial(e) {
    const r = {};
    for (const n of N.objectKeys(this.shape)) {
      const s = this.shape[n];
      e && !e[n] ? r[n] = s : r[n] = s.optional();
    }
    return new $({
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
        for (; a instanceof te; )
          a = a._def.innerType;
        r[n] = a;
      }
    return new $({
      ...this._def,
      shape: () => r
    });
  }
  keyof() {
    return Qt(N.objectKeys(this.shape));
  }
}
$.create = (t, e) => new $({
  shape: () => t,
  unknownKeys: "strip",
  catchall: re.create(),
  typeName: _.ZodObject,
  ...w(e)
});
$.strictCreate = (t, e) => new $({
  shape: () => t,
  unknownKeys: "strict",
  catchall: re.create(),
  typeName: _.ZodObject,
  ...w(e)
});
$.lazycreate = (t, e) => new $({
  shape: t,
  unknownKeys: "strip",
  catchall: re.create(),
  typeName: _.ZodObject,
  ...w(e)
});
class Pe extends C {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = this._def.options;
    function s(a) {
      for (const o of a)
        if (o.result.status === "valid")
          return o.result;
      for (const o of a)
        if (o.result.status === "dirty")
          return r.common.issues.push(...o.ctx.common.issues), o.result;
      const i = a.map((o) => new Q(o.ctx.common.issues));
      return p(r, {
        code: u.invalid_union,
        unionErrors: i
      }), b;
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
        }, l = c._parseSync({
          data: r.data,
          path: r.path,
          parent: d
        });
        if (l.status === "valid")
          return l;
        l.status === "dirty" && !a && (a = { result: l, ctx: d }), d.common.issues.length && i.push(d.common.issues);
      }
      if (a)
        return r.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((c) => new Q(c));
      return p(r, {
        code: u.invalid_union,
        unionErrors: o
      }), b;
    }
  }
  get options() {
    return this._def.options;
  }
}
Pe.create = (t, e) => new Pe({
  options: t,
  typeName: _.ZodUnion,
  ...w(e)
});
function at(t, e) {
  const r = ee(t), n = ee(e);
  if (t === e)
    return { valid: !0, data: t };
  if (r === h.object && n === h.object) {
    const s = N.objectKeys(e), a = N.objectKeys(t).filter((o) => s.indexOf(o) !== -1), i = { ...t, ...e };
    for (const o of a) {
      const c = at(t[o], e[o]);
      if (!c.valid)
        return { valid: !1 };
      i[o] = c.data;
    }
    return { valid: !0, data: i };
  } else if (r === h.array && n === h.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let a = 0; a < t.length; a++) {
      const i = t[a], o = e[a], c = at(i, o);
      if (!c.valid)
        return { valid: !1 };
      s.push(c.data);
    }
    return { valid: !0, data: s };
  } else return r === h.date && n === h.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class Ze extends C {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e), s = (a, i) => {
      if ($t(a) || $t(i))
        return b;
      const o = at(a.value, i.value);
      return o.valid ? ((Rt(a) || Rt(i)) && r.dirty(), { status: r.value, value: o.data }) : (p(n, {
        code: u.invalid_intersection_types
      }), b);
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
Ze.create = (t, e, r) => new Ze({
  left: t,
  right: e,
  typeName: _.ZodIntersection,
  ...w(r)
});
class ae extends C {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== h.array)
      return p(n, {
        code: u.invalid_type,
        expected: h.array,
        received: n.parsedType
      }), b;
    if (n.data.length < this._def.items.length)
      return p(n, {
        code: u.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), b;
    !this._def.rest && n.data.length > this._def.items.length && (p(n, {
      code: u.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const a = [...n.data].map((i, o) => {
      const c = this._def.items[o] || this._def.rest;
      return c ? c._parse(new H(n, i, n.path, o)) : null;
    }).filter((i) => !!i);
    return n.common.async ? Promise.all(a).then((i) => P.mergeArray(r, i)) : P.mergeArray(r, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new ae({
      ...this._def,
      rest: e
    });
  }
}
ae.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new ae({
    items: t,
    typeName: _.ZodTuple,
    rest: null,
    ...w(e)
  });
};
class Le extends C {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== h.object)
      return p(n, {
        code: u.invalid_type,
        expected: h.object,
        received: n.parsedType
      }), b;
    const s = [], a = this._def.keyType, i = this._def.valueType;
    for (const o in n.data)
      s.push({
        key: a._parse(new H(n, o, n.path, o)),
        value: i._parse(new H(n, n.data[o], n.path, o)),
        alwaysSet: o in n.data
      });
    return n.common.async ? P.mergeObjectAsync(r, s) : P.mergeObjectSync(r, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, r, n) {
    return r instanceof C ? new Le({
      keyType: e,
      valueType: r,
      typeName: _.ZodRecord,
      ...w(n)
    }) : new Le({
      keyType: Y.create(),
      valueType: e,
      typeName: _.ZodRecord,
      ...w(r)
    });
  }
}
class Lt extends C {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== h.map)
      return p(n, {
        code: u.invalid_type,
        expected: h.map,
        received: n.parsedType
      }), b;
    const s = this._def.keyType, a = this._def.valueType, i = [...n.data.entries()].map(([o, c], d) => ({
      key: s._parse(new H(n, o, n.path, [d, "key"])),
      value: a._parse(new H(n, c, n.path, [d, "value"]))
    }));
    if (n.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of i) {
          const d = await c.key, l = await c.value;
          if (d.status === "aborted" || l.status === "aborted")
            return b;
          (d.status === "dirty" || l.status === "dirty") && r.dirty(), o.set(d.value, l.value);
        }
        return { status: r.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const c of i) {
        const d = c.key, l = c.value;
        if (d.status === "aborted" || l.status === "aborted")
          return b;
        (d.status === "dirty" || l.status === "dirty") && r.dirty(), o.set(d.value, l.value);
      }
      return { status: r.value, value: o };
    }
  }
}
Lt.create = (t, e, r) => new Lt({
  valueType: e,
  keyType: t,
  typeName: _.ZodMap,
  ...w(r)
});
class Te extends C {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== h.set)
      return p(n, {
        code: u.invalid_type,
        expected: h.set,
        received: n.parsedType
      }), b;
    const s = this._def;
    s.minSize !== null && n.data.size < s.minSize.value && (p(n, {
      code: u.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), r.dirty()), s.maxSize !== null && n.data.size > s.maxSize.value && (p(n, {
      code: u.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), r.dirty());
    const a = this._def.valueType;
    function i(c) {
      const d = /* @__PURE__ */ new Set();
      for (const l of c) {
        if (l.status === "aborted")
          return b;
        l.status === "dirty" && r.dirty(), d.add(l.value);
      }
      return { status: r.value, value: d };
    }
    const o = [...n.data.values()].map((c, d) => a._parse(new H(n, c, n.path, d)));
    return n.common.async ? Promise.all(o).then((c) => i(c)) : i(o);
  }
  min(e, r) {
    return new Te({
      ...this._def,
      minSize: { value: e, message: y.toString(r) }
    });
  }
  max(e, r) {
    return new Te({
      ...this._def,
      maxSize: { value: e, message: y.toString(r) }
    });
  }
  size(e, r) {
    return this.min(e, r).max(e, r);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Te.create = (t, e) => new Te({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: _.ZodSet,
  ...w(e)
});
class Mt extends C {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
Mt.create = (t, e) => new Mt({
  getter: t,
  typeName: _.ZodLazy,
  ...w(e)
});
class Bt extends C {
  _parse(e) {
    if (e.data !== this._def.value) {
      const r = this._getOrReturnCtx(e);
      return p(r, {
        received: r.data,
        code: u.invalid_literal,
        expected: this._def.value
      }), b;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Bt.create = (t, e) => new Bt({
  value: t,
  typeName: _.ZodLiteral,
  ...w(e)
});
function Qt(t, e) {
  return new me({
    values: t,
    typeName: _.ZodEnum,
    ...w(e)
  });
}
class me extends C {
  _parse(e) {
    if (typeof e.data != "string") {
      const r = this._getOrReturnCtx(e), n = this._def.values;
      return p(r, {
        expected: N.joinValues(n),
        received: r.parsedType,
        code: u.invalid_type
      }), b;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const r = this._getOrReturnCtx(e), n = this._def.values;
      return p(r, {
        received: r.data,
        code: u.invalid_enum_value,
        options: n
      }), b;
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
    return me.create(e, {
      ...this._def,
      ...r
    });
  }
  exclude(e, r = this._def) {
    return me.create(this.options.filter((n) => !e.includes(n)), {
      ...this._def,
      ...r
    });
  }
}
me.create = Qt;
class zt extends C {
  _parse(e) {
    const r = N.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
    if (n.parsedType !== h.string && n.parsedType !== h.number) {
      const s = N.objectValues(r);
      return p(n, {
        expected: N.joinValues(s),
        received: n.parsedType,
        code: u.invalid_type
      }), b;
    }
    if (this._cache || (this._cache = new Set(N.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const s = N.objectValues(r);
      return p(n, {
        received: n.data,
        code: u.invalid_enum_value,
        options: s
      }), b;
    }
    return B(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
zt.create = (t, e) => new zt({
  values: t,
  typeName: _.ZodNativeEnum,
  ...w(e)
});
class Me extends C {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== h.promise && r.common.async === !1)
      return p(r, {
        code: u.invalid_type,
        expected: h.promise,
        received: r.parsedType
      }), b;
    const n = r.parsedType === h.promise ? r.data : Promise.resolve(r.data);
    return B(n.then((s) => this._def.type.parseAsync(s, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
Me.create = (t, e) => new Me({
  type: t,
  typeName: _.ZodPromise,
  ...w(e)
});
class he extends C {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === _.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e), s = this._def.effect || null, a = {
      addIssue: (i) => {
        p(n, i), i.fatal ? r.abort() : r.dirty();
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
            return b;
          const c = await this._def.schema._parseAsync({
            data: o,
            path: n.path,
            parent: n
          });
          return c.status === "aborted" ? b : c.status === "dirty" || r.value === "dirty" ? we(c.value) : c;
        });
      {
        if (r.value === "aborted")
          return b;
        const o = this._def.schema._parseSync({
          data: i,
          path: n.path,
          parent: n
        });
        return o.status === "aborted" ? b : o.status === "dirty" || r.value === "dirty" ? we(o.value) : o;
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
        return o.status === "aborted" ? b : (o.status === "dirty" && r.dirty(), i(o.value), { status: r.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((o) => o.status === "aborted" ? b : (o.status === "dirty" && r.dirty(), i(o.value).then(() => ({ status: r.value, value: o.value }))));
    }
    if (s.type === "transform")
      if (n.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        if (!fe(i))
          return b;
        const o = s.transform(i.value, a);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((i) => fe(i) ? Promise.resolve(s.transform(i.value, a)).then((o) => ({
          status: r.value,
          value: o
        })) : b);
    N.assertNever(s);
  }
}
he.create = (t, e, r) => new he({
  schema: t,
  typeName: _.ZodEffects,
  effect: e,
  ...w(r)
});
he.createWithPreprocess = (t, e, r) => new he({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: _.ZodEffects,
  ...w(r)
});
class te extends C {
  _parse(e) {
    return this._getType(e) === h.undefined ? B(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
te.create = (t, e) => new te({
  innerType: t,
  typeName: _.ZodOptional,
  ...w(e)
});
class ye extends C {
  _parse(e) {
    return this._getType(e) === h.null ? B(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ye.create = (t, e) => new ye({
  innerType: t,
  typeName: _.ZodNullable,
  ...w(e)
});
class it extends C {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    let n = r.data;
    return r.parsedType === h.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
it.create = (t, e) => new it({
  innerType: t,
  typeName: _.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...w(e)
});
class ot extends C {
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
    return je(s) ? s.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new Q(n.common.issues);
        },
        input: n.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new Q(n.common.issues);
        },
        input: n.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ot.create = (t, e) => new ot({
  innerType: t,
  typeName: _.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...w(e)
});
class Vt extends C {
  _parse(e) {
    if (this._getType(e) !== h.nan) {
      const n = this._getOrReturnCtx(e);
      return p(n, {
        code: u.invalid_type,
        expected: h.nan,
        received: n.parsedType
      }), b;
    }
    return { status: "valid", value: e.data };
  }
}
Vt.create = (t) => new Vt({
  typeName: _.ZodNaN,
  ...w(t)
});
class Rn extends C {
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
class pt extends C {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return a.status === "aborted" ? b : a.status === "dirty" ? (r.dirty(), we(a.value)) : this._def.out._parseAsync({
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
      return s.status === "aborted" ? b : s.status === "dirty" ? (r.dirty(), {
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
    return new pt({
      in: e,
      out: r,
      typeName: _.ZodPipeline
    });
  }
}
class ct extends C {
  _parse(e) {
    const r = this._def.innerType._parse(e), n = (s) => (fe(s) && (s.value = Object.freeze(s.value)), s);
    return je(r) ? r.then((s) => n(s)) : n(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ct.create = (t, e) => new ct({
  innerType: t,
  typeName: _.ZodReadonly,
  ...w(e)
});
var _;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(_ || (_ = {}));
const v = Y.create, Jt = pe.create, mt = st.create;
re.create;
const On = G.create, O = $.create;
Pe.create;
Ze.create;
ae.create;
const De = Le.create, ie = me.create;
Me.create;
te.create;
ye.create;
O({
  taskId: v(),
  title: v(),
  userId: v()
});
O({
  taskId: v(),
  changes: De(mt())
});
O({
  taskId: v()
});
O({
  reportId: v(),
  type: v(),
  title: v().optional()
});
O({
  userId: v(),
  email: v(),
  timestamp: v()
});
O({
  message: v(),
  variant: ie(["info", "success", "error", "warning"]).default("info"),
  title: v().optional()
});
O({
  pluginId: v(),
  error: v(),
  stack: v().optional()
});
O({
  pluginId: v(),
  version: v().optional()
});
O({
  locale: v()
});
O({
  primaryColor: v(),
  label: v().optional()
});
const An = O({
  id: v().min(1),
  name: v().min(1),
  version: v().regex(/^\d+\.\d+\.\d+$/),
  description: v(),
  author: v(),
  entry: v(),
  hostCompatibility: v().default("^1.0.0"),
  permissions: On(ie(tn)).default([]),
  dependencies: De(v()).optional(),
  icon: v().optional(),
  category: v().optional()
});
O({
  path: v(),
  label: v().optional(),
  permission: v().optional()
});
O({
  slot: ie(rn),
  priority: Jt().default(0)
});
O({
  label: v(),
  path: v(),
  icon: v().optional(),
  section: v().optional(),
  order: Jt().default(0)
});
O({
  email: v().email(),
  password: v().min(6)
});
O({
  version: v().optional()
});
O({
  version: v()
});
De(mt());
const In = O({
  title: v().min(1),
  description: v().optional(),
  status: ie(["todo", "in_progress", "done"]).default("todo"),
  priority: ie(["low", "medium", "high"]).default("medium")
});
In.partial();
O({
  type: ie(["tasks", "activity", "usage"]),
  format: ie(["json", "csv"]).default("json"),
  title: v().optional()
});
O({
  pluginId: v(),
  event: v(),
  payload: De(mt()).optional(),
  timestamp: v().optional()
});
function jn() {
  const t = typeof window < "u" ? window.__FPP_HOST_BRIDGE__ : null;
  if (!t)
    throw new Error("[PluginSDK] Host bridge not initialized");
  return t;
}
function En(t) {
  const e = An.safeParse(t.manifest);
  if (!e.success)
    throw new Error(
      `[PluginSDK] Invalid manifest: ${e.error.message}`
    );
  t.manifest.id;
  try {
    jn().registerContributions(t);
  } finally {
  }
}
Ve(null);
const Pn = "com.fpp.calculator", Zn = "Calculator", Ln = "1.0.0", Mn = "A clean calculator widget and full-page tool.", Bn = "FPP Team", zn = "/plugins/com.fpp.calculator/index.js", Vn = "^1.0.0", Dn = ["storage:local"], Wn = "calculator", Fn = "Utilities", Un = {
  id: Pn,
  name: Zn,
  version: Ln,
  description: Mn,
  author: Bn,
  entry: zn,
  hostCompatibility: Vn,
  permissions: Dn,
  icon: Wn,
  category: Fn
};
function se(t) {
  return Object.keys(t);
}
function Gn(t) {
  return t.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
function qn(t) {
  var e;
  return typeof t != "string" || !t.includes("var(--mantine-scale)") ? t : (e = t.match(/^calc\((.*?)\)$/)) == null ? void 0 : e[1].split("*")[0].trim();
}
function Be(t) {
  const e = qn(t);
  return typeof e == "number" ? e : typeof e == "string" ? e.includes("calc") || e.includes("var") ? e : e.includes("px") ? Number(e.replace("px", "")) : e.includes("rem") ? Number(e.replace("rem", "")) * 16 : e.includes("em") ? Number(e.replace("em", "")) * 16 : Number(e) : NaN;
}
function Qe(t) {
  return t === "0rem" ? "0rem" : `calc(${t} * var(--mantine-scale))`;
}
function Kt(t, { shouldScale: e = !1 } = {}) {
  function r(n) {
    if (n === 0 || n === "0")
      return `0${t}`;
    if (typeof n == "number") {
      const s = `${n / 16}${t}`;
      return e ? Qe(s) : s;
    }
    if (typeof n == "string") {
      if (n === "" || n.startsWith("calc(") || n.startsWith("clamp(") || n.includes("rgba("))
        return n;
      if (n.includes(","))
        return n.split(",").map((a) => r(a)).join(",");
      if (n.includes(" "))
        return n.split(" ").map((a) => r(a)).join(" ");
      if (n.includes(t))
        return e ? Qe(n) : n;
      const s = n.replace("px", "");
      if (!Number.isNaN(Number(s))) {
        const a = `${Number(s) / 16}${t}`;
        return e ? Qe(a) : a;
      }
    }
    return n;
  }
  return r;
}
const W = Kt("rem", { shouldScale: !0 });
Kt("em");
function Oe(t) {
  return Object.keys(t).reduce((e, r) => (t[r] !== void 0 && (e[r] = t[r]), e), {});
}
function er(t) {
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
function Hn(t) {
  const e = Ve(null);
  return [({ children: s, value: a }) => /* @__PURE__ */ g(e.Provider, { value: a, children: s }), () => {
    const s = ft(e);
    if (s === null)
      throw new Error(t);
    return s;
  }];
}
function F(t, e = "size", r = !0) {
  if (t !== void 0)
    return er(t) ? r ? W(t) : t : `var(--${e}-${t})`;
}
function U(t) {
  return F(t, "mantine-spacing");
}
function We(t) {
  return t === void 0 ? "var(--mantine-radius-default)" : F(t, "mantine-radius");
}
function $e(t) {
  return F(t, "mantine-font-size");
}
function Yn(t) {
  return F(t, "mantine-line-height", !1);
}
function Xn(t) {
  if (t)
    return F(t, "mantine-shadow", !1);
}
function Qn(t, e) {
  return t in e ? Be(e[t]) : Be(t);
}
function Jn(t, e) {
  const r = t.map((n) => ({
    value: n,
    px: Qn(n, e)
  }));
  return r.sort((n, s) => n.px - s.px), r;
}
function ue(t) {
  return typeof t == "object" && t !== null ? "base" in t ? t.base : void 0 : t;
}
function Kn(t, e) {
  try {
    return t.addEventListener("change", e), () => t.removeEventListener("change", e);
  } catch {
    return t.addListener(e), () => t.removeListener(e);
  }
}
function es(t, e) {
  return typeof window < "u" && "matchMedia" in window ? window.matchMedia(t).matches : !1;
}
function ts(t, e, { getInitialValueInEffect: r } = {
  getInitialValueInEffect: !0
}) {
  const [n, s] = rt(
    r ? e : es(t)
  ), a = Se(null);
  return Ie(() => {
    if ("matchMedia" in window)
      return a.current = window.matchMedia(t), s(a.current.matches), Kn(a.current, (i) => s(i.matches));
  }, [t]), n;
}
function rs(t, e) {
  const r = Se(!1);
  Ie(
    () => () => {
      r.current = !1;
    },
    []
  ), Ie(() => {
    if (r.current)
      return t();
    r.current = !0;
  }, e);
}
function ns(t, e) {
  return ts("(prefers-reduced-motion: reduce)", t, e);
}
function tr(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (e = 0; e < s; e++) t[e] && (r = tr(t[e])) && (n && (n += " "), n += r);
  } else for (r in t) t[r] && (n && (n += " "), n += r);
  return n;
}
function oe() {
  for (var t, e, r = 0, n = "", s = arguments.length; r < s; r++) (t = arguments[r]) && (e = tr(t)) && (n && (n += " "), n += e);
  return n;
}
const ss = {};
function as(t) {
  const e = {};
  return t.forEach((r) => {
    Object.entries(r).forEach(([n, s]) => {
      e[n] ? e[n] = oe(e[n], s) : e[n] = s;
    });
  }), e;
}
function ht({ theme: t, classNames: e, props: r, stylesCtx: n }) {
  const a = (Array.isArray(e) ? e : [e]).map(
    (i) => typeof i == "function" ? i(t, r, n) : i || ss
  );
  return as(a);
}
function dt({ theme: t, styles: e, props: r, stylesCtx: n }) {
  return (Array.isArray(e) ? e : [e]).reduce((a, i) => typeof i == "function" ? { ...a, ...i(t, r, n) } : { ...a, ...i }, {});
}
const is = Ve(null);
function ce() {
  const t = ft(is);
  if (!t)
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  return t;
}
function os() {
  return ce().classNamesPrefix;
}
function cs() {
  return ce().getStyleNonce;
}
function ds() {
  return ce().withStaticClasses;
}
function ls() {
  return ce().headless;
}
function us() {
  var t;
  return (t = ce().stylesTransform) == null ? void 0 : t.sx;
}
function fs() {
  var t;
  return (t = ce().stylesTransform) == null ? void 0 : t.styles;
}
function ps() {
  return ce().env || "default";
}
function ms(t) {
  return /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i.test(t);
}
function hs(t) {
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
function ys(t) {
  const [e, r, n, s] = t.replace(/[^0-9,./]/g, "").split(/[/,]/).map(Number);
  return { r: e, g: r, b: n, a: s === void 0 ? 1 : s };
}
function gs(t) {
  const e = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i, r = t.match(e);
  if (!r)
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  const n = parseInt(r[1], 10), s = parseInt(r[2], 10) / 100, a = parseInt(r[3], 10) / 100, i = r[5] ? parseFloat(r[5]) : void 0, o = (1 - Math.abs(2 * a - 1)) * s, c = n / 60, d = o * (1 - Math.abs(c % 2 - 1)), l = a - o / 2;
  let f, m, x;
  return c >= 0 && c < 1 ? (f = o, m = d, x = 0) : c >= 1 && c < 2 ? (f = d, m = o, x = 0) : c >= 2 && c < 3 ? (f = 0, m = o, x = d) : c >= 3 && c < 4 ? (f = 0, m = d, x = o) : c >= 4 && c < 5 ? (f = d, m = 0, x = o) : (f = o, m = 0, x = d), {
    r: Math.round((f + l) * 255),
    g: Math.round((m + l) * 255),
    b: Math.round((x + l) * 255),
    a: i || 1
  };
}
function vs(t) {
  return ms(t) ? hs(t) : t.startsWith("rgb") ? ys(t) : t.startsWith("hsl") ? gs(t) : {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function _s(t, e) {
  return typeof t.primaryShade == "number" ? t.primaryShade : e === "dark" ? t.primaryShade.dark : t.primaryShade.light;
}
function Je(t) {
  return t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4;
}
function bs(t) {
  const e = t.match(/oklch\((.*?)%\s/);
  return e ? parseFloat(e[1]) : null;
}
function xs(t) {
  if (t.startsWith("oklch("))
    return (bs(t) || 0) / 100;
  const { r: e, g: r, b: n } = vs(t), s = e / 255, a = r / 255, i = n / 255, o = Je(s), c = Je(a), d = Je(i);
  return 0.2126 * o + 0.7152 * c + 0.0722 * d;
}
function xe(t, e = 0.179) {
  return t.startsWith("var(") ? !1 : xs(t) > e;
}
function yt({
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
      isLight: xe(
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
      isLight: xe(
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
      isLight: xe(
        t === "white" ? e.white : e.black,
        e.luminanceThreshold
      ),
      variable: `--mantine-color-${t}`
    };
  const [n, s] = t.split("."), a = s ? Number(s) : void 0, i = n in e.colors;
  if (i) {
    const o = a !== void 0 ? e.colors[n][a] : e.colors[n][_s(e, r || "light")];
    return {
      color: n,
      value: o,
      shade: a,
      isThemeColor: i,
      isLight: xe(o, e.luminanceThreshold),
      variable: s ? `--mantine-color-${n}-${a}` : `--mantine-color-${n}-filled`
    };
  }
  return {
    color: t,
    value: t,
    isThemeColor: i,
    isLight: xe(t, e.luminanceThreshold),
    shade: a,
    variable: void 0
  };
}
function ze(t, e) {
  const r = yt({ color: t || e.primaryColor, theme: e });
  return r.variable ? `var(${r.variable})` : t;
}
function ks(t, e) {
  const r = {
    from: (t == null ? void 0 : t.from) || e.defaultGradient.from,
    to: (t == null ? void 0 : t.to) || e.defaultGradient.to,
    deg: (t == null ? void 0 : t.deg) ?? e.defaultGradient.deg ?? 0
  }, n = ze(r.from, e), s = ze(r.to, e);
  return `linear-gradient(${r.deg}deg, ${n} 0%, ${s} 100%)`;
}
const ws = Ve(null);
function ve() {
  const t = ft(ws);
  if (!t)
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  return t;
}
const Ss = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function Cs({ theme: t, options: e, unstyled: r }) {
  return oe(
    (e == null ? void 0 : e.focusable) && !r && (t.focusClassName || Ss[t.focusRing]),
    (e == null ? void 0 : e.active) && !r && t.activeClassName
  );
}
function Ns({
  selector: t,
  stylesCtx: e,
  options: r,
  props: n,
  theme: s
}) {
  return ht({
    theme: s,
    classNames: r == null ? void 0 : r.classNames,
    props: (r == null ? void 0 : r.props) || n,
    stylesCtx: e
  })[t];
}
function Dt({
  selector: t,
  stylesCtx: e,
  theme: r,
  classNames: n,
  props: s
}) {
  return ht({ theme: r, classNames: n, props: s, stylesCtx: e })[t];
}
function Ts({ rootSelector: t, selector: e, className: r }) {
  return t === e ? r : void 0;
}
function $s({ selector: t, classes: e, unstyled: r }) {
  return r ? void 0 : e[t];
}
function Rs({
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
      return (o = ht({
        theme: e,
        classNames: (i = e.components[a]) == null ? void 0 : i.classNames,
        props: n,
        stylesCtx: s
      })) == null ? void 0 : o[r];
    }
  );
}
function As({
  options: t,
  classes: e,
  selector: r,
  unstyled: n
}) {
  return t != null && t.variant && !n ? e[`${r}--${t.variant}`] : void 0;
}
function Is({
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
  props: l,
  stylesCtx: f,
  withStaticClasses: m,
  headless: x,
  transformedStyles: k
}) {
  return oe(
    Cs({ theme: t, options: e, unstyled: o || x }),
    Os({ theme: t, themeName: r, selector: n, props: l, stylesCtx: f }),
    As({ options: e, classes: i, selector: n, unstyled: o }),
    Dt({ selector: n, stylesCtx: f, theme: t, classNames: a, props: l }),
    Dt({ selector: n, stylesCtx: f, theme: t, classNames: k, props: l }),
    Ns({ selector: n, stylesCtx: f, options: e, props: l, theme: t }),
    Ts({ rootSelector: d, selector: n, className: c }),
    $s({ selector: n, classes: i, unstyled: o || x }),
    m && !x && Rs({
      themeName: r,
      classNamesPrefix: s,
      selector: n,
      withStaticClass: e == null ? void 0 : e.withStaticClass
    }),
    e == null ? void 0 : e.className
  );
}
function js({
  theme: t,
  themeName: e,
  props: r,
  stylesCtx: n,
  selector: s
}) {
  return e.map(
    (a) => {
      var i;
      return dt({
        theme: t,
        styles: (i = t.components[a]) == null ? void 0 : i.styles,
        props: r,
        stylesCtx: n
      })[s];
    }
  ).reduce((a, i) => ({ ...a, ...i }), {});
}
function lt({ style: t, theme: e }) {
  return Array.isArray(t) ? [...t].reduce(
    (r, n) => ({ ...r, ...lt({ style: n, theme: e }) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function Es(t) {
  return t.reduce((e, r) => (r && Object.keys(r).forEach((n) => {
    e[n] = { ...e[n], ...Oe(r[n]) };
  }), e), {});
}
function Ps({
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
  return (c = Es([
    o ? {} : e == null ? void 0 : e(r, n, s),
    ...i.map((d) => {
      var l, f, m;
      return (m = (f = (l = r.components) == null ? void 0 : l[d]) == null ? void 0 : f.vars) == null ? void 0 : m.call(f, r, n, s);
    }),
    t == null ? void 0 : t(r, n, s)
  ])) == null ? void 0 : c[a];
}
function Zs({
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
  varsResolver: l,
  headless: f,
  withStylesTransform: m
}) {
  return {
    ...!m && js({ theme: t, themeName: e, props: s, stylesCtx: a, selector: r }),
    ...!m && dt({ theme: t, styles: o, props: s, stylesCtx: a })[r],
    ...!m && dt({ theme: t, styles: n == null ? void 0 : n.styles, props: (n == null ? void 0 : n.props) || s, stylesCtx: a })[r],
    ...Ps({ theme: t, props: s, stylesCtx: a, vars: d, varsResolver: l, selector: r, themeName: e, headless: f }),
    ...i === r ? lt({ style: c, theme: t }) : null,
    ...lt({ style: n == null ? void 0 : n.style, theme: t })
  };
}
function Ls({ props: t, stylesCtx: e, themeName: r }) {
  var i;
  const n = ve(), s = (i = fs()) == null ? void 0 : i();
  return {
    getTransformedStyles: (o) => s ? [
      ...o.map(
        (d) => s(d, { props: t, theme: n, ctx: e })
      ),
      ...r.map(
        (d) => {
          var l;
          return s((l = n.components[d]) == null ? void 0 : l.styles, { props: t, theme: n, ctx: e });
        }
      )
    ].filter(Boolean) : [],
    withStylesTransform: !!s
  };
}
function z({
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
  vars: l,
  varsResolver: f
}) {
  const m = ve(), x = os(), k = ds(), S = ls(), T = (Array.isArray(t) ? t : [t]).filter((A) => A), { withStylesTransform: L, getTransformedStyles: M } = Ls({
    props: r,
    stylesCtx: n,
    themeName: T
  });
  return (A, j) => ({
    className: Is({
      theme: m,
      options: j,
      themeName: T,
      selector: A,
      classNamesPrefix: x,
      classNames: c,
      classes: e,
      unstyled: o,
      className: s,
      rootSelector: i,
      props: r,
      stylesCtx: n,
      withStaticClasses: k,
      headless: S,
      transformedStyles: M([j == null ? void 0 : j.styles, d])
    }),
    style: Zs({
      theme: m,
      themeName: T,
      selector: A,
      options: j,
      props: r,
      stylesCtx: n,
      rootSelector: i,
      styles: d,
      style: a,
      vars: l,
      varsResolver: f,
      headless: S,
      withStylesTransform: L
    })
  });
}
function Z(t, e, r) {
  var i;
  const n = ve(), s = (i = n.components[t]) == null ? void 0 : i.defaultProps, a = typeof s == "function" ? s(n) : s;
  return { ...e, ...a, ...Oe(r) };
}
function Ke(t) {
  return se(t).reduce(
    (e, r) => t[r] !== void 0 ? `${e}${Gn(r)}:${t[r]};` : e,
    ""
  ).trim();
}
function Ms({ selector: t, styles: e, media: r, container: n }) {
  const s = e ? Ke(e) : "", a = Array.isArray(r) ? r.map((o) => `@media${o.query}{${t}{${Ke(o.styles)}}}`) : [], i = Array.isArray(n) ? n.map(
    (o) => `@container ${o.query}{${t}{${Ke(o.styles)}}}`
  ) : [];
  return `${s ? `${t}{${s}}` : ""}${a.join("")}${i.join("")}`.trim();
}
function gt(t) {
  const e = cs();
  return /* @__PURE__ */ g(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: e == null ? void 0 : e(),
      dangerouslySetInnerHTML: { __html: Ms(t) }
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
    me: c,
    ms: d,
    p: l,
    px: f,
    py: m,
    pt: x,
    pb: k,
    pl: S,
    pr: T,
    pe: L,
    ps: M,
    bd: A,
    bg: j,
    c: J,
    opacity: V,
    ff: I,
    fz: E,
    fw: K,
    lts: ne,
    ta: He,
    lh: br,
    fs: xr,
    tt: kr,
    td: wr,
    w: Sr,
    miw: Cr,
    maw: Nr,
    h: Tr,
    mih: $r,
    mah: Rr,
    bgsz: Or,
    bgp: Ar,
    bgr: Ir,
    bga: jr,
    pos: Er,
    top: Pr,
    left: Zr,
    bottom: Lr,
    right: Mr,
    inset: Br,
    display: zr,
    flex: Vr,
    hiddenFrom: Dr,
    visibleFrom: Wr,
    lightHidden: Fr,
    darkHidden: Ur,
    sx: Gr,
    ...qr
  } = t;
  return { styleProps: Oe({
    m: e,
    mx: r,
    my: n,
    mt: s,
    mb: a,
    ml: i,
    mr: o,
    me: c,
    ms: d,
    p: l,
    px: f,
    py: m,
    pt: x,
    pb: k,
    pl: S,
    pr: T,
    pe: L,
    ps: M,
    bd: A,
    bg: j,
    c: J,
    opacity: V,
    ff: I,
    fz: E,
    fw: K,
    lts: ne,
    ta: He,
    lh: br,
    fs: xr,
    tt: kr,
    td: wr,
    w: Sr,
    miw: Cr,
    maw: Nr,
    h: Tr,
    mih: $r,
    mah: Rr,
    bgsz: Or,
    bgp: Ar,
    bgr: Ir,
    bga: jr,
    pos: Er,
    top: Pr,
    left: Zr,
    bottom: Lr,
    right: Mr,
    inset: Br,
    display: zr,
    flex: Vr,
    hiddenFrom: Dr,
    visibleFrom: Wr,
    lightHidden: Fr,
    darkHidden: Ur,
    sx: Gr
  }), rest: qr };
}
const zs = {
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
function vt(t, e) {
  const r = yt({ color: t, theme: e });
  return r.color === "dimmed" ? "var(--mantine-color-dimmed)" : r.color === "bright" ? "var(--mantine-color-bright)" : r.variable ? `var(${r.variable})` : r.color;
}
function Vs(t, e) {
  const r = yt({ color: t, theme: e });
  return r.isThemeColor && r.shade === void 0 ? `var(--mantine-color-${r.color}-text)` : vt(t, e);
}
function Ds(t, e) {
  if (typeof t == "number")
    return W(t);
  if (typeof t == "string") {
    const [r, n, ...s] = t.split(" ").filter((i) => i.trim() !== "");
    let a = `${W(r)}`;
    return n && (a += ` ${n}`), s.length > 0 && (a += ` ${vt(s.join(" "), e)}`), a.trim();
  }
  return t;
}
const Wt = {
  text: "var(--mantine-font-family)",
  mono: "var(--mantine-font-family-monospace)",
  monospace: "var(--mantine-font-family-monospace)",
  heading: "var(--mantine-font-family-headings)",
  headings: "var(--mantine-font-family-headings)"
};
function Ws(t) {
  return typeof t == "string" && t in Wt ? Wt[t] : t;
}
const Fs = ["h1", "h2", "h3", "h4", "h5", "h6"];
function Us(t, e) {
  return typeof t == "string" && t in e.fontSizes ? `var(--mantine-font-size-${t})` : typeof t == "string" && Fs.includes(t) ? `var(--mantine-${t}-font-size)` : typeof t == "number" || typeof t == "string" ? W(t) : t;
}
function Gs(t) {
  return t;
}
const qs = ["h1", "h2", "h3", "h4", "h5", "h6"];
function Hs(t, e) {
  return typeof t == "string" && t in e.lineHeights ? `var(--mantine-line-height-${t})` : typeof t == "string" && qs.includes(t) ? `var(--mantine-${t}-line-height)` : t;
}
function Ys(t) {
  return typeof t == "number" ? W(t) : t;
}
function Xs(t, e) {
  if (typeof t == "number")
    return W(t);
  if (typeof t == "string") {
    const r = t.replace("-", "");
    if (!(r in e.spacing))
      return W(t);
    const n = `--mantine-spacing-${r}`;
    return t.startsWith("-") ? `calc(var(${n}) * -1)` : `var(${n})`;
  }
  return t;
}
const et = {
  color: vt,
  textColor: Vs,
  fontSize: Us,
  spacing: Xs,
  identity: Gs,
  size: Ys,
  lineHeight: Hs,
  fontFamily: Ws,
  border: Ds
};
function Ft(t) {
  return t.replace("(min-width: ", "").replace("em)", "");
}
function Qs({
  media: t,
  ...e
}) {
  const n = Object.keys(t).sort((s, a) => Number(Ft(s)) - Number(Ft(a))).map((s) => ({ query: s, styles: t[s] }));
  return { ...e, media: n };
}
function Js(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.keys(t);
  return !(e.length === 1 && e[0] === "base");
}
function Ks(t) {
  return typeof t == "object" && t !== null ? "base" in t ? t.base : void 0 : t;
}
function ea(t) {
  return typeof t == "object" && t !== null ? se(t).filter((e) => e !== "base") : [];
}
function ta(t, e) {
  return typeof t == "object" && t !== null && e in t ? t[e] : t;
}
function ra({
  styleProps: t,
  data: e,
  theme: r
}) {
  return Qs(
    se(t).reduce(
      (n, s) => {
        if (s === "hiddenFrom" || s === "visibleFrom" || s === "sx")
          return n;
        const a = e[s], i = Array.isArray(a.property) ? a.property : [a.property], o = Ks(t[s]);
        if (!Js(t[s]))
          return i.forEach((d) => {
            n.inlineStyles[d] = et[a.type](o, r);
          }), n;
        n.hasResponsiveStyles = !0;
        const c = ea(t[s]);
        return i.forEach((d) => {
          o && (n.styles[d] = et[a.type](o, r)), c.forEach((l) => {
            const f = `(min-width: ${r.breakpoints[l]})`;
            n.media[f] = {
              ...n.media[f],
              [d]: et[a.type](
                ta(t[s], l),
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
function rr() {
  return `__m__-${Hr().replace(/:/g, "")}`;
}
function nr(t) {
  return t.startsWith("data-") ? t : `data-${t}`;
}
function na(t) {
  return Object.keys(t).reduce((e, r) => {
    const n = t[r];
    return n === void 0 || n === "" || n === !1 || n === null || (e[nr(r)] = t[r]), e;
  }, {});
}
function sr(t) {
  return t ? typeof t == "string" ? { [nr(t)]: !0 } : Array.isArray(t) ? [...t].reduce(
    (e, r) => ({ ...e, ...sr(r) }),
    {}
  ) : na(t) : null;
}
function ut(t, e) {
  return Array.isArray(t) ? [...t].reduce(
    (r, n) => ({ ...r, ...ut(n, e) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function sa({
  theme: t,
  style: e,
  vars: r,
  styleProps: n
}) {
  const s = ut(e, t), a = ut(r, t);
  return { ...s, ...a, ...n };
}
const ar = X(
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
    darkHidden: l,
    renderRoot: f,
    __size: m,
    ...x
  }, k) => {
    var E;
    const S = ve(), T = t || "div", { styleProps: L, rest: M } = Bs(x), A = us(), j = (E = A == null ? void 0 : A()) == null ? void 0 : E(L.sx), J = rr(), V = ra({
      styleProps: L,
      theme: S,
      data: zs
    }), I = {
      ref: k,
      style: sa({
        theme: S,
        style: e,
        vars: r,
        styleProps: V.inlineStyles
      }),
      className: oe(n, j, {
        [J]: V.hasResponsiveStyles,
        "mantine-light-hidden": d,
        "mantine-dark-hidden": l,
        [`mantine-hidden-from-${o}`]: o,
        [`mantine-visible-from-${c}`]: c
      }),
      "data-variant": s,
      "data-size": er(i) ? void 0 : i || void 0,
      size: m,
      ...sr(a),
      ...M
    };
    return /* @__PURE__ */ q(Ce, { children: [
      V.hasResponsiveStyles && /* @__PURE__ */ g(
        gt,
        {
          selector: `.${J}`,
          styles: V.styles,
          media: V.media
        }
      ),
      typeof f == "function" ? f(I) : /* @__PURE__ */ g(T, { ...I })
    ] });
  }
);
ar.displayName = "@mantine/core/Box";
const R = ar;
function ir(t) {
  return t;
}
function de(t) {
  const e = X(t);
  return e.extend = ir, e.withProps = (r) => {
    const n = X((s, a) => /* @__PURE__ */ g(e, { ...r, ...s, ref: a }));
    return n.extend = e.extend, n.displayName = `WithProps(${e.displayName})`, n;
  }, e;
}
function _e(t) {
  const e = X(t);
  return e.withProps = (r) => {
    const n = X((s, a) => /* @__PURE__ */ g(e, { ...r, ...s, ref: a }));
    return n.extend = e.extend, n.displayName = `WithProps(${e.displayName})`, n;
  }, e.extend = ir, e;
}
var or = { root: "m_87cf2631" };
const aa = {
  __staticSelector: "UnstyledButton"
}, _t = _e(
  (t, e) => {
    const r = Z("UnstyledButton", aa, t), {
      className: n,
      component: s = "button",
      __staticSelector: a,
      unstyled: i,
      classNames: o,
      styles: c,
      style: d,
      ...l
    } = r, f = z({
      name: a,
      props: r,
      classes: or,
      className: n,
      style: d,
      classNames: o,
      styles: c,
      unstyled: i
    });
    return /* @__PURE__ */ g(
      R,
      {
        ...f("root", { focusable: !0 }),
        component: s,
        ref: e,
        type: s === "button" ? "button" : void 0,
        ...l
      }
    );
  }
);
_t.classes = or;
_t.displayName = "@mantine/core/UnstyledButton";
var cr = { root: "m_1b7284a3" };
const ia = {}, oa = (t, { radius: e, shadow: r }) => ({
  root: {
    "--paper-radius": e === void 0 ? void 0 : We(e),
    "--paper-shadow": Xn(r)
  }
}), bt = _e((t, e) => {
  const r = Z("Paper", ia, t), {
    classNames: n,
    className: s,
    style: a,
    styles: i,
    unstyled: o,
    withBorder: c,
    vars: d,
    radius: l,
    shadow: f,
    variant: m,
    mod: x,
    ...k
  } = r, S = z({
    name: "Paper",
    props: r,
    classes: cr,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: d,
    varsResolver: oa
  });
  return /* @__PURE__ */ g(
    R,
    {
      ref: e,
      mod: [{ "data-with-border": c }, x],
      ...S("root"),
      variant: m,
      ...k
    }
  );
});
bt.classes = cr;
bt.displayName = "@mantine/core/Paper";
const ke = (t) => ({
  in: { opacity: 1, transform: "scale(1)" },
  out: { opacity: 0, transform: `scale(.9) translateY(${t === "bottom" ? 10 : -10}px)` },
  transitionProperty: "transform, opacity"
}), Ae = {
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
    ...ke("bottom"),
    common: { transformOrigin: "center center" }
  },
  "pop-bottom-left": {
    ...ke("bottom"),
    common: { transformOrigin: "bottom left" }
  },
  "pop-bottom-right": {
    ...ke("bottom"),
    common: { transformOrigin: "bottom right" }
  },
  "pop-top-left": {
    ...ke("top"),
    common: { transformOrigin: "top left" }
  },
  "pop-top-right": {
    ...ke("top"),
    common: { transformOrigin: "top right" }
  }
}, Ut = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function ca({
  transition: t,
  state: e,
  duration: r,
  timingFunction: n
}) {
  const s = {
    WebkitBackfaceVisibility: "hidden",
    willChange: "transform, opacity",
    transitionDuration: `${r}ms`,
    transitionTimingFunction: n
  };
  return typeof t == "string" ? t in Ae ? {
    transitionProperty: Ae[t].transitionProperty,
    ...s,
    ...Ae[t].common,
    ...Ae[t][Ut[e]]
  } : {} : {
    transitionProperty: t.transitionProperty,
    ...s,
    ...t.common,
    ...t[Ut[e]]
  };
}
function da({
  duration: t,
  exitDuration: e,
  timingFunction: r,
  mounted: n,
  onEnter: s,
  onExit: a,
  onEntered: i,
  onExited: o,
  enterDelay: c,
  exitDelay: d
}) {
  const l = ve(), f = ns(), m = l.respectReducedMotion ? f : !1, [x, k] = rt(m ? 0 : t), [S, T] = rt(n ? "entered" : "exited"), L = Se(-1), M = Se(-1), A = Se(-1);
  function j() {
    window.clearTimeout(L.current), window.clearTimeout(M.current), cancelAnimationFrame(A.current);
  }
  const J = (I) => {
    j();
    const E = I ? s : a, K = I ? i : o, ne = m ? 0 : I ? t : e;
    k(ne), ne === 0 ? (typeof E == "function" && E(), typeof K == "function" && K(), T(I ? "entered" : "exited")) : A.current = requestAnimationFrame(() => {
      en.flushSync(() => {
        T(I ? "pre-entering" : "pre-exiting");
      }), A.current = requestAnimationFrame(() => {
        typeof E == "function" && E(), T(I ? "entering" : "exiting"), L.current = window.setTimeout(() => {
          typeof K == "function" && K(), T(I ? "entered" : "exited");
        }, ne);
      });
    });
  }, V = (I) => {
    if (j(), typeof (I ? c : d) != "number") {
      J(I);
      return;
    }
    M.current = window.setTimeout(
      () => {
        J(I);
      },
      I ? c : d
    );
  };
  return rs(() => {
    V(n);
  }, [n]), Ie(
    () => () => {
      j();
    },
    []
  ), {
    transitionDuration: x,
    transitionStatus: S,
    transitionTimingFunction: r || "ease"
  };
}
function dr({
  keepMounted: t,
  transition: e = "fade",
  duration: r = 250,
  exitDuration: n = r,
  mounted: s,
  children: a,
  timingFunction: i = "ease",
  onExit: o,
  onEntered: c,
  onEnter: d,
  onExited: l,
  enterDelay: f,
  exitDelay: m
}) {
  const x = ps(), { transitionDuration: k, transitionStatus: S, transitionTimingFunction: T } = da({
    mounted: s,
    exitDuration: n,
    duration: r,
    timingFunction: i,
    onExit: o,
    onEntered: c,
    onEnter: d,
    onExited: l,
    enterDelay: f,
    exitDelay: m
  });
  return k === 0 || x === "test" ? s ? /* @__PURE__ */ g(Ce, { children: a({}) }) : t ? a({ display: "none" }) : null : S === "exited" ? t ? a({ display: "none" }) : null : /* @__PURE__ */ g(Ce, { children: a(
    ca({
      transition: e,
      duration: k,
      state: S,
      timingFunction: T
    })
  ) });
}
dr.displayName = "@mantine/core/Transition";
var D = { root: "m_5ae2e3c", barsLoader: "m_7a2bd4cd", bar: "m_870bb79", "bars-loader-animation": "m_5d2b3b9d", dotsLoader: "m_4e3f22d7", dot: "m_870c4af", "loader-dots-animation": "m_aac34a1", ovalLoader: "m_b34414df", "oval-loader-animation": "m_f8e89c4b" };
const lr = X(({ className: t, ...e }, r) => /* @__PURE__ */ q(R, { component: "span", className: oe(D.barsLoader, t), ...e, ref: r, children: [
  /* @__PURE__ */ g("span", { className: D.bar }),
  /* @__PURE__ */ g("span", { className: D.bar }),
  /* @__PURE__ */ g("span", { className: D.bar })
] }));
lr.displayName = "@mantine/core/Bars";
const ur = X(({ className: t, ...e }, r) => /* @__PURE__ */ q(R, { component: "span", className: oe(D.dotsLoader, t), ...e, ref: r, children: [
  /* @__PURE__ */ g("span", { className: D.dot }),
  /* @__PURE__ */ g("span", { className: D.dot }),
  /* @__PURE__ */ g("span", { className: D.dot })
] }));
ur.displayName = "@mantine/core/Dots";
const fr = X(({ className: t, ...e }, r) => /* @__PURE__ */ g(R, { component: "span", className: oe(D.ovalLoader, t), ...e, ref: r }));
fr.displayName = "@mantine/core/Oval";
const pr = {
  bars: lr,
  oval: fr,
  dots: ur
}, la = {
  loaders: pr,
  type: "oval"
}, ua = (t, { size: e, color: r }) => ({
  root: {
    "--loader-size": F(e, "loader-size"),
    "--loader-color": r ? ze(r, t) : void 0
  }
}), Fe = de((t, e) => {
  const r = Z("Loader", la, t), {
    size: n,
    color: s,
    type: a,
    vars: i,
    className: o,
    style: c,
    classNames: d,
    styles: l,
    unstyled: f,
    loaders: m,
    variant: x,
    children: k,
    ...S
  } = r, T = z({
    name: "Loader",
    props: r,
    classes: D,
    className: o,
    style: c,
    classNames: d,
    styles: l,
    unstyled: f,
    vars: i,
    varsResolver: ua
  });
  return k ? /* @__PURE__ */ g(R, { ...T("root"), ref: e, ...S, children: k }) : /* @__PURE__ */ g(
    R,
    {
      ...T("root"),
      ref: e,
      component: m[a],
      variant: x,
      size: n,
      ...S
    }
  );
});
Fe.defaultLoaders = pr;
Fe.classes = D;
Fe.displayName = "@mantine/core/Loader";
var mr = { root: "m_b6d8b162" };
function fa(t) {
  if (t === "start")
    return "start";
  if (t === "end" || t)
    return "end";
}
const pa = {
  inherit: !1
}, ma = (t, { variant: e, lineClamp: r, gradient: n, size: s, color: a }) => ({
  root: {
    "--text-fz": $e(s),
    "--text-lh": Yn(s),
    "--text-gradient": e === "gradient" ? ks(n, t) : void 0,
    "--text-line-clamp": typeof r == "number" ? r.toString() : void 0,
    "--text-color": a ? ze(a, t) : void 0
  }
}), xt = _e((t, e) => {
  const r = Z("Text", pa, t), {
    lineClamp: n,
    truncate: s,
    inline: a,
    inherit: i,
    gradient: o,
    span: c,
    __staticSelector: d,
    vars: l,
    className: f,
    style: m,
    classNames: x,
    styles: k,
    unstyled: S,
    variant: T,
    mod: L,
    size: M,
    ...A
  } = r, j = z({
    name: ["Text", d],
    props: r,
    classes: mr,
    className: f,
    style: m,
    classNames: x,
    styles: k,
    unstyled: S,
    vars: l,
    varsResolver: ma
  });
  return /* @__PURE__ */ g(
    R,
    {
      ...j("root", { focusable: !0 }),
      ref: e,
      component: c ? "span" : "p",
      variant: T,
      mod: [
        {
          "data-truncate": fa(s),
          "data-line-clamp": typeof n == "number",
          "data-inline": a,
          "data-inherit": i
        },
        L
      ],
      size: M,
      ...A
    }
  );
});
xt.classes = mr;
xt.displayName = "@mantine/core/Text";
var be = { root: "m_77c9d27d", inner: "m_80f1301b", label: "m_811560b9", section: "m_a74036a", loader: "m_a25b86ee", group: "m_80d6d844", groupSection: "m_70be2a01" };
const Gt = {
  orientation: "horizontal"
}, ha = (t, { borderWidth: e }) => ({
  group: { "--button-border-width": W(e) }
}), kt = de((t, e) => {
  const r = Z("ButtonGroup", Gt, t), {
    className: n,
    style: s,
    classNames: a,
    styles: i,
    unstyled: o,
    orientation: c,
    vars: d,
    borderWidth: l,
    variant: f,
    mod: m,
    ...x
  } = Z("ButtonGroup", Gt, t), k = z({
    name: "ButtonGroup",
    props: r,
    classes: be,
    className: n,
    style: s,
    classNames: a,
    styles: i,
    unstyled: o,
    vars: d,
    varsResolver: ha,
    rootSelector: "group"
  });
  return /* @__PURE__ */ g(
    R,
    {
      ...k("group"),
      ref: e,
      variant: f,
      mod: [{ "data-orientation": c }, m],
      role: "group",
      ...x
    }
  );
});
kt.classes = be;
kt.displayName = "@mantine/core/ButtonGroup";
const qt = {}, ya = (t, { radius: e, color: r, gradient: n, variant: s, autoContrast: a, size: i }) => {
  const o = t.variantColorResolver({
    color: r || t.primaryColor,
    theme: t,
    gradient: n,
    variant: s || "filled",
    autoContrast: a
  });
  return {
    groupSection: {
      "--section-height": F(i, "section-height"),
      "--section-padding-x": F(i, "section-padding-x"),
      "--section-fz": i != null && i.includes("compact") ? $e(i.replace("compact-", "")) : $e(i),
      "--section-radius": e === void 0 ? void 0 : We(e),
      "--section-bg": r || s ? o.background : void 0,
      "--section-color": o.color,
      "--section-bd": r || s ? o.border : void 0
    }
  };
}, wt = de((t, e) => {
  const r = Z("ButtonGroupSection", qt, t), {
    className: n,
    style: s,
    classNames: a,
    styles: i,
    unstyled: o,
    vars: c,
    variant: d,
    gradient: l,
    radius: f,
    autoContrast: m,
    ...x
  } = Z("ButtonGroupSection", qt, t), k = z({
    name: "ButtonGroupSection",
    props: r,
    classes: be,
    className: n,
    style: s,
    classNames: a,
    styles: i,
    unstyled: o,
    vars: c,
    varsResolver: ya,
    rootSelector: "groupSection"
  });
  return /* @__PURE__ */ g(R, { ...k("groupSection"), ref: e, variant: d, ...x });
});
wt.classes = be;
wt.displayName = "@mantine/core/ButtonGroupSection";
const ga = {
  in: { opacity: 1, transform: `translate(-50%, calc(-50% + ${W(1)}))` },
  out: { opacity: 0, transform: "translate(-50%, -200%)" },
  common: { transformOrigin: "center" },
  transitionProperty: "transform, opacity"
}, va = {}, _a = (t, { radius: e, color: r, gradient: n, variant: s, size: a, justify: i, autoContrast: o }) => {
  const c = t.variantColorResolver({
    color: r || t.primaryColor,
    theme: t,
    gradient: n,
    variant: s || "filled",
    autoContrast: o
  });
  return {
    root: {
      "--button-justify": i,
      "--button-height": F(a, "button-height"),
      "--button-padding-x": F(a, "button-padding-x"),
      "--button-fz": a != null && a.includes("compact") ? $e(a.replace("compact-", "")) : $e(a),
      "--button-radius": e === void 0 ? void 0 : We(e),
      "--button-bg": r || s ? c.background : void 0,
      "--button-hover": r || s ? c.hover : void 0,
      "--button-color": c.color,
      "--button-bd": r || s ? c.border : void 0,
      "--button-hover-color": r || s ? c.hoverColor : void 0
    }
  };
}, ge = _e((t, e) => {
  const r = Z("Button", va, t), {
    style: n,
    vars: s,
    className: a,
    color: i,
    disabled: o,
    children: c,
    leftSection: d,
    rightSection: l,
    fullWidth: f,
    variant: m,
    radius: x,
    loading: k,
    loaderProps: S,
    gradient: T,
    classNames: L,
    styles: M,
    unstyled: A,
    "data-disabled": j,
    autoContrast: J,
    mod: V,
    ...I
  } = r, E = z({
    name: "Button",
    props: r,
    classes: be,
    className: a,
    style: n,
    classNames: L,
    styles: M,
    unstyled: A,
    vars: s,
    varsResolver: _a
  }), K = !!d, ne = !!l;
  return /* @__PURE__ */ q(
    _t,
    {
      ref: e,
      ...E("root", { active: !o && !k && !j }),
      unstyled: A,
      variant: m,
      disabled: o || k,
      mod: [
        {
          disabled: o || j,
          loading: k,
          block: f,
          "with-left-section": K,
          "with-right-section": ne
        },
        V
      ],
      ...I,
      children: [
        /* @__PURE__ */ g(dr, { mounted: !!k, transition: ga, duration: 150, children: (He) => /* @__PURE__ */ g(R, { component: "span", ...E("loader", { style: He }), "aria-hidden": !0, children: /* @__PURE__ */ g(
          Fe,
          {
            color: "var(--button-color)",
            size: "calc(var(--button-height) / 1.8)",
            ...S
          }
        ) }) }),
        /* @__PURE__ */ q("span", { ...E("inner"), children: [
          d && /* @__PURE__ */ g(R, { component: "span", ...E("section"), mod: { position: "left" }, children: d }),
          /* @__PURE__ */ g(R, { component: "span", mod: { loading: k }, ...E("label"), children: c }),
          l && /* @__PURE__ */ g(R, { component: "span", ...E("section"), mod: { position: "right" }, children: l })
        ] })
      ]
    }
  );
});
ge.classes = be;
ge.displayName = "@mantine/core/Button";
ge.Group = kt;
ge.GroupSection = wt;
const [ba, xa] = Hn(
  "Card component was not found in tree"
);
var St = { root: "m_e615b15f", section: "m_599a2148" };
const ka = {}, Ue = _e((t, e) => {
  const r = Z("CardSection", ka, t), { classNames: n, className: s, style: a, styles: i, vars: o, withBorder: c, inheritPadding: d, mod: l, ...f } = r, m = xa();
  return /* @__PURE__ */ g(
    R,
    {
      ref: e,
      mod: [{ "with-border": c, "inherit-padding": d }, l],
      ...m.getStyles("section", { className: s, style: a, styles: i, classNames: n }),
      ...f
    }
  );
});
Ue.classes = St;
Ue.displayName = "@mantine/core/CardSection";
const wa = {}, Sa = (t, { padding: e }) => ({
  root: {
    "--card-padding": U(e)
  }
}), Ge = _e((t, e) => {
  const r = Z("Card", wa, t), { classNames: n, className: s, style: a, styles: i, unstyled: o, vars: c, children: d, padding: l, ...f } = r, m = z({
    name: "Card",
    props: r,
    classes: St,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: c,
    varsResolver: Sa
  }), x = Yr.toArray(d), k = x.map((S, T) => typeof S == "object" && S && "type" in S && S.type === Ue ? Xr(S, {
    "data-first-section": T === 0 || void 0,
    "data-last-section": T === x.length - 1 || void 0
  }) : S);
  return /* @__PURE__ */ g(ba, { value: { getStyles: m }, children: /* @__PURE__ */ g(bt, { ref: e, unstyled: o, ...m("root"), ...f, children: k }) });
});
Ge.classes = St;
Ge.displayName = "@mantine/core/Card";
Ge.Section = Ue;
function Ca({
  spacing: t,
  verticalSpacing: e,
  cols: r,
  selector: n
}) {
  var l;
  const s = ve(), a = e === void 0 ? t : e, i = Oe({
    "--sg-spacing-x": U(ue(t)),
    "--sg-spacing-y": U(ue(a)),
    "--sg-cols": (l = ue(r)) == null ? void 0 : l.toString()
  }), o = se(s.breakpoints).reduce(
    (f, m) => (f[m] || (f[m] = {}), typeof t == "object" && t[m] !== void 0 && (f[m]["--sg-spacing-x"] = U(t[m])), typeof a == "object" && a[m] !== void 0 && (f[m]["--sg-spacing-y"] = U(a[m])), typeof r == "object" && r[m] !== void 0 && (f[m]["--sg-cols"] = r[m]), f),
    {}
  ), d = Jn(se(o), s.breakpoints).filter(
    (f) => se(o[f.value]).length > 0
  ).map((f) => ({
    query: `(min-width: ${s.breakpoints[f.value]})`,
    styles: o[f.value]
  }));
  return /* @__PURE__ */ g(gt, { styles: i, media: d, selector: n });
}
function tt(t) {
  return typeof t == "object" && t !== null ? se(t) : [];
}
function Na(t) {
  return t.sort((e, r) => Be(e) - Be(r));
}
function Ta({
  spacing: t,
  verticalSpacing: e,
  cols: r
}) {
  const n = Array.from(
    /* @__PURE__ */ new Set([
      ...tt(t),
      ...tt(e),
      ...tt(r)
    ])
  );
  return Na(n);
}
function $a({
  spacing: t,
  verticalSpacing: e,
  cols: r,
  selector: n
}) {
  var d;
  const s = e === void 0 ? t : e, a = Oe({
    "--sg-spacing-x": U(ue(t)),
    "--sg-spacing-y": U(ue(s)),
    "--sg-cols": (d = ue(r)) == null ? void 0 : d.toString()
  }), i = Ta({ spacing: t, verticalSpacing: e, cols: r }), o = i.reduce(
    (l, f) => (l[f] || (l[f] = {}), typeof t == "object" && t[f] !== void 0 && (l[f]["--sg-spacing-x"] = U(t[f])), typeof s == "object" && s[f] !== void 0 && (l[f]["--sg-spacing-y"] = U(s[f])), typeof r == "object" && r[f] !== void 0 && (l[f]["--sg-cols"] = r[f]), l),
    {}
  ), c = i.map((l) => ({
    query: `simple-grid (min-width: ${l})`,
    styles: o[l]
  }));
  return /* @__PURE__ */ g(gt, { styles: a, container: c, selector: n });
}
var hr = { container: "m_925c2d2c", root: "m_2415a157" };
const Ra = {
  cols: 1,
  spacing: "md",
  type: "media"
}, Ct = de((t, e) => {
  const r = Z("SimpleGrid", Ra, t), {
    classNames: n,
    className: s,
    style: a,
    styles: i,
    unstyled: o,
    vars: c,
    cols: d,
    verticalSpacing: l,
    spacing: f,
    type: m,
    ...x
  } = r, k = z({
    name: "SimpleGrid",
    classes: hr,
    props: r,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: c
  }), S = rr();
  return m === "container" ? /* @__PURE__ */ q(Ce, { children: [
    /* @__PURE__ */ g($a, { ...r, selector: `.${S}` }),
    /* @__PURE__ */ g("div", { ...k("container"), children: /* @__PURE__ */ g(R, { ref: e, ...k("root", { className: S }), ...x }) })
  ] }) : /* @__PURE__ */ q(Ce, { children: [
    /* @__PURE__ */ g(Ca, { ...r, selector: `.${S}` }),
    /* @__PURE__ */ g(R, { ref: e, ...k("root", { className: S }), ...x })
  ] });
});
Ct.classes = hr;
Ct.displayName = "@mantine/core/SimpleGrid";
var yr = { root: "m_6d731127" };
const Oa = {
  gap: "md",
  align: "stretch",
  justify: "flex-start"
}, Aa = (t, { gap: e, align: r, justify: n }) => ({
  root: {
    "--stack-gap": U(e),
    "--stack-align": r,
    "--stack-justify": n
  }
}), Re = de((t, e) => {
  const r = Z("Stack", Oa, t), {
    classNames: n,
    className: s,
    style: a,
    styles: i,
    unstyled: o,
    vars: c,
    align: d,
    justify: l,
    gap: f,
    variant: m,
    ...x
  } = r, k = z({
    name: "Stack",
    props: r,
    classes: yr,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: c,
    varsResolver: Aa
  });
  return /* @__PURE__ */ g(R, { ref: e, ...k("root"), variant: m, ...x });
});
Re.classes = yr;
Re.displayName = "@mantine/core/Stack";
var gr = { root: "m_7341320d" };
const Ia = {}, ja = (t, { size: e, radius: r, variant: n, gradient: s, color: a, autoContrast: i }) => {
  const o = t.variantColorResolver({
    color: a || t.primaryColor,
    theme: t,
    gradient: s,
    variant: n || "filled",
    autoContrast: i
  });
  return {
    root: {
      "--ti-size": F(e, "ti-size"),
      "--ti-radius": r === void 0 ? void 0 : We(r),
      "--ti-bg": a || n ? o.background : void 0,
      "--ti-color": a || n ? o.color : void 0,
      "--ti-bd": a || n ? o.border : void 0
    }
  };
}, Nt = de((t, e) => {
  const r = Z("ThemeIcon", Ia, t), { classNames: n, className: s, style: a, styles: i, unstyled: o, vars: c, autoContrast: d, ...l } = r, f = z({
    name: "ThemeIcon",
    classes: gr,
    props: r,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: c,
    varsResolver: ja
  });
  return /* @__PURE__ */ g(R, { ref: e, ...f("root"), ...l });
});
Nt.classes = gr;
Nt.displayName = "@mantine/core/ThemeIcon";
const Ea = ["h1", "h2", "h3", "h4", "h5", "h6"], Pa = ["xs", "sm", "md", "lg", "xl"];
function Za(t, e) {
  const r = e !== void 0 ? e : `h${t}`;
  return Ea.includes(r) ? {
    fontSize: `var(--mantine-${r}-font-size)`,
    fontWeight: `var(--mantine-${r}-font-weight)`,
    lineHeight: `var(--mantine-${r}-line-height)`
  } : Pa.includes(r) ? {
    fontSize: `var(--mantine-font-size-${r})`,
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  } : {
    fontSize: W(r),
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  };
}
var vr = { root: "m_8a5d1357" };
const La = {
  order: 1
}, Ma = (t, { order: e, size: r, lineClamp: n, textWrap: s }) => {
  const a = Za(e, r);
  return {
    root: {
      "--title-fw": a.fontWeight,
      "--title-lh": a.lineHeight,
      "--title-fz": a.fontSize,
      "--title-line-clamp": typeof n == "number" ? n.toString() : void 0,
      "--title-text-wrap": s
    }
  };
}, qe = de((t, e) => {
  const r = Z("Title", La, t), {
    classNames: n,
    className: s,
    style: a,
    styles: i,
    unstyled: o,
    order: c,
    vars: d,
    size: l,
    variant: f,
    lineClamp: m,
    textWrap: x,
    mod: k,
    ...S
  } = r, T = z({
    name: "Title",
    props: r,
    classes: vr,
    className: s,
    style: a,
    classNames: n,
    styles: i,
    unstyled: o,
    vars: d,
    varsResolver: Ma
  });
  return [1, 2, 3, 4, 5, 6].includes(c) ? /* @__PURE__ */ g(
    R,
    {
      ...T("root"),
      component: `h${c}`,
      variant: f,
      ref: e,
      mod: [{ order: c, "data-line-clamp": typeof m == "number" }, k],
      size: l,
      ...S
    }
  ) : null;
});
qe.classes = vr;
qe.displayName = "@mantine/core/Title";
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ba = {
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
const za = (t, e, r, n) => {
  const s = X(
    ({ color: a = "currentColor", size: i = 24, stroke: o = 2, title: c, className: d, children: l, ...f }, m) => Ye(
      "svg",
      {
        ref: m,
        ...Ba[t],
        width: i,
        height: i,
        className: ["tabler-icon", `tabler-icon-${e}`, d].join(" "),
        strokeWidth: o,
        stroke: a,
        ...f
      },
      [
        c && Ye("title", { key: "svg-title" }, c),
        ...n.map(([x, k]) => Ye(x, k)),
        ...Array.isArray(l) ? l : [l]
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
const Va = [["path", { d: "M4 5a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -14", key: "svg-0" }], ["path", { d: "M8 8a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1l0 -1", key: "svg-1" }], ["path", { d: "M8 14l0 .01", key: "svg-2" }], ["path", { d: "M12 14l0 .01", key: "svg-3" }], ["path", { d: "M16 14l0 .01", key: "svg-4" }], ["path", { d: "M8 17l0 .01", key: "svg-5" }], ["path", { d: "M12 17l0 .01", key: "svg-6" }], ["path", { d: "M16 17l0 .01", key: "svg-7" }]], Da = za("outline", "calculator", "Calculator", Va);
function Wa(t, e) {
  switch (e.type) {
    case "CLEAR":
      return { display: "0", prev: null, op: null };
    case "DIGIT":
      return {
        ...t,
        display: t.display === "0" ? e.digit : t.display + e.digit
      };
    case "DOT":
      return t.display.includes(".") ? t : { ...t, display: t.display + "." };
    case "OP": {
      const r = parseFloat(t.display);
      if (t.prev !== null && t.op) {
        const n = Ht(t.prev, r, t.op);
        return { display: String(n), prev: n, op: e.op };
      }
      return { ...t, prev: r, op: e.op, display: "0" };
    }
    case "EQUALS": {
      if (t.prev === null || !t.op) return t;
      const r = Ht(t.prev, parseFloat(t.display), t.op);
      return { display: String(r), prev: null, op: null };
    }
    default:
      return t;
  }
}
function Ht(t, e, r) {
  switch (r) {
    case "+":
      return t + e;
    case "-":
      return t - e;
    case "×":
      return t * e;
    case "÷":
      return e === 0 ? 0 : t / e;
    default:
      return e;
  }
}
const Fa = [
  "7",
  "8",
  "9",
  "÷",
  "4",
  "5",
  "6",
  "×",
  "1",
  "2",
  "3",
  "-",
  "C",
  "0",
  ".",
  "+"
], _r = Qr(function({ compact: e = !1 }) {
  const [r, n] = Jr(Wa, {
    display: "0",
    prev: null,
    op: null
  }), s = Kr((a) => {
    a === "C" ? n({ type: "CLEAR" }) : ["+", "-", "×", "÷"].includes(a) ? n({ type: "OP", op: a }) : n(a === "." ? { type: "DOT" } : { type: "DIGIT", digit: a });
  }, []);
  return /* @__PURE__ */ g(Ge, { padding: e ? "md" : "lg", radius: "lg", withBorder: !0, children: /* @__PURE__ */ q(Re, { gap: "sm", children: [
    !e && /* @__PURE__ */ q(Re, { gap: 4, children: [
      /* @__PURE__ */ g(Nt, { variant: "light", color: "cyan", size: "lg", radius: "md", children: /* @__PURE__ */ g(Da, { size: 20 }) }),
      /* @__PURE__ */ g(qe, { order: 4, children: "Calculator" })
    ] }),
    /* @__PURE__ */ g(
      xt,
      {
        ta: "right",
        fw: 700,
        size: e ? "lg" : "xl",
        ff: "monospace",
        py: "xs",
        px: "sm",
        style: {
          background: "var(--mantine-color-gray-1)",
          borderRadius: 8,
          wordBreak: "break-all"
        },
        children: r.display
      }
    ),
    /* @__PURE__ */ g(Ct, { cols: 4, spacing: 6, children: Fa.map((a) => /* @__PURE__ */ g(
      ge,
      {
        variant: ["+", "-", "×", "÷"].includes(a) ? "filled" : "light",
        size: e ? "xs" : "sm",
        onClick: () => s(a),
        p: 0,
        children: a
      },
      a
    )) }),
    /* @__PURE__ */ g(ge, { fullWidth: !0, onClick: () => n({ type: "EQUALS" }), size: "sm", children: "=" })
  ] }) });
});
function Ua() {
  return /* @__PURE__ */ g(_r, { compact: !0 });
}
function Ga() {
  return /* @__PURE__ */ q(Re, { gap: "lg", maw: 400, mx: "auto", children: [
    /* @__PURE__ */ g(qe, { order: 2, children: "Calculator" }),
    /* @__PURE__ */ g(_r, {})
  ] });
}
function Qa() {
  En({
    manifest: Un,
    routes: [
      {
        path: "/plugins/com.fpp.calculator",
        component: Ga,
        label: "Calculator"
      }
    ],
    menuItems: [
      {
        label: "Calculator",
        path: "/plugins/com.fpp.calculator",
        icon: "calculator",
        order: 25
      }
    ],
    widgets: [
      {
        slot: "dashboard.sidebar",
        component: Ua,
        priority: 15
      }
    ]
  });
}
export {
  Qa as activate
};
