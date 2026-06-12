import { jsx as w, jsxs as J, Fragment as Be } from "react/jsx-runtime";
import * as P from "react";
import On, { createContext as wt, useContext as _t, useCallback as Te, Fragment as Ci, useState as ge, useRef as oe, useEffect as ke, useLayoutEffect as Hn, useId as Ri, forwardRef as de, cloneElement as Yt, Children as ps, createElement as bn, memo as hs } from "react";
import * as Ni from "react-dom";
import Ti, { createPortal as Ai } from "react-dom";
const Oi = [
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
], $i = [
  "dashboard.main",
  "dashboard.sidebar",
  "header.actions",
  "settings.sections",
  "reports.widgets",
  "sidebar.nav"
];
var z;
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
})(z || (z = {}));
var Or;
(function(t) {
  t.mergeShapes = (e, n) => ({
    ...e,
    ...n
    // second overwrites first
  });
})(Or || (Or = {}));
const S = z.arrayToEnum([
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
]), Pe = (t) => {
  switch (typeof t) {
    case "undefined":
      return S.undefined;
    case "string":
      return S.string;
    case "number":
      return Number.isNaN(t) ? S.nan : S.number;
    case "boolean":
      return S.boolean;
    case "function":
      return S.function;
    case "bigint":
      return S.bigint;
    case "symbol":
      return S.symbol;
    case "object":
      return Array.isArray(t) ? S.array : t === null ? S.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? S.promise : typeof Map < "u" && t instanceof Map ? S.map : typeof Set < "u" && t instanceof Set ? S.set : typeof Date < "u" && t instanceof Date ? S.date : S.object;
    default:
      return S.unknown;
  }
}, v = z.arrayToEnum([
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
class Oe extends Error {
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
    if (!(e instanceof Oe))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, z.jsonStringifyReplacer, 2);
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
Oe.create = (t) => new Oe(t);
const $n = (t, e) => {
  let n;
  switch (t.code) {
    case v.invalid_type:
      t.received === S.undefined ? n = "Required" : n = `Expected ${t.expected}, received ${t.received}`;
      break;
    case v.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(t.expected, z.jsonStringifyReplacer)}`;
      break;
    case v.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${z.joinValues(t.keys, ", ")}`;
      break;
    case v.invalid_union:
      n = "Invalid input";
      break;
    case v.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${z.joinValues(t.options)}`;
      break;
    case v.invalid_enum_value:
      n = `Invalid enum value. Expected ${z.joinValues(t.options)}, received '${t.received}'`;
      break;
    case v.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case v.invalid_return_type:
      n = "Invalid function return type";
      break;
    case v.invalid_date:
      n = "Invalid date";
      break;
    case v.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (n = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? n = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? n = `Invalid input: must end with "${t.validation.endsWith}"` : z.assertNever(t.validation) : t.validation !== "regex" ? n = `Invalid ${t.validation}` : n = "Invalid";
      break;
    case v.too_small:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "bigint" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : n = "Invalid input";
      break;
    case v.too_big:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? n = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : n = "Invalid input";
      break;
    case v.custom:
      n = "Invalid input";
      break;
    case v.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case v.not_multiple_of:
      n = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case v.not_finite:
      n = "Number must be finite";
      break;
    default:
      n = e.defaultError, z.assertNever(t);
  }
  return { message: n };
};
let Ei = $n;
function Pi() {
  return Ei;
}
const Ii = (t) => {
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
function k(t, e) {
  const n = Pi(), r = Ii({
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
      n === $n ? void 0 : $n
      // then global default map
    ].filter((s) => !!s)
  });
  t.common.issues.push(r);
}
class ae {
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
        return E;
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
    return ae.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, n) {
    const r = {};
    for (const s of n) {
      const { key: i, value: o } = s;
      if (i.status === "aborted" || o.status === "aborted")
        return E;
      i.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), i.value !== "__proto__" && (typeof o.value < "u" || s.alwaysSet) && (r[i.value] = o.value);
    }
    return { status: e.value, value: r };
  }
}
const E = Object.freeze({
  status: "aborted"
}), yt = (t) => ({ status: "dirty", value: t }), me = (t) => ({ status: "valid", value: t }), $r = (t) => t.status === "aborted", Er = (t) => t.status === "dirty", et = (t) => t.status === "valid", Dt = (t) => typeof Promise < "u" && t instanceof Promise;
var C;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(C || (C = {}));
class Se {
  constructor(e, n, r, s) {
    this._cachedPath = [], this.parent = e, this.data = n, this._path = r, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Pr = (t, e) => {
  if (et(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const n = new Oe(t.common.issues);
      return this._error = n, this._error;
    }
  };
};
function I(t) {
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
class L {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return Pe(e.data);
  }
  _getOrReturnCtx(e, n) {
    return n || {
      common: e.parent.common,
      data: e.data,
      parsedType: Pe(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new ae(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: Pe(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const n = this._parse(e);
    if (Dt(n))
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
      parsedType: Pe(e)
    }, s = this._parseSync({ data: e, path: r.path, parent: r });
    return Pr(r, s);
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
      parsedType: Pe(e)
    };
    if (!this["~standard"].async)
      try {
        const i = this._parseSync({ data: e, path: [], parent: n });
        return et(i) ? {
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
    return this._parseAsync({ data: e, path: [], parent: n }).then((i) => et(i) ? {
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
      parsedType: Pe(e)
    }, s = this._parse({ data: e, path: r.path, parent: r }), i = await (Dt(s) ? s : Promise.resolve(s));
    return Pr(r, i);
  }
  refine(e, n) {
    const r = (s) => typeof n == "string" || typeof n > "u" ? { message: n } : typeof n == "function" ? n(s) : n;
    return this._refinement((s, i) => {
      const o = e(s), a = () => i.addIssue({
        code: v.custom,
        ...r(s)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((c) => c ? !0 : (a(), !1)) : o ? !0 : (a(), !1);
    });
  }
  refinement(e, n) {
    return this._refinement((r, s) => e(r) ? !0 : (s.addIssue(typeof n == "function" ? n(r, s) : n), !1));
  }
  _refinement(e) {
    return new rt({
      schema: this,
      typeName: O.ZodEffects,
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
    return Ie.create(this, this._def);
  }
  nullable() {
    return st.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return we.create(this);
  }
  promise() {
    return Zt.create(this, this._def);
  }
  or(e) {
    return jt.create([this, e], this._def);
  }
  and(e) {
    return zt.create(this, e, this._def);
  }
  transform(e) {
    return new rt({
      ...I(this._def),
      schema: this,
      typeName: O.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const n = typeof e == "function" ? e : () => e;
    return new In({
      ...I(this._def),
      innerType: this,
      defaultValue: n,
      typeName: O.ZodDefault
    });
  }
  brand() {
    return new ro({
      typeName: O.ZodBranded,
      type: this,
      ...I(this._def)
    });
  }
  catch(e) {
    const n = typeof e == "function" ? e : () => e;
    return new Mn({
      ...I(this._def),
      innerType: this,
      catchValue: n,
      typeName: O.ZodCatch
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
    return Gn.create(this, e);
  }
  readonly() {
    return Dn.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Mi = /^c[^\s-]{8,}$/i, Di = /^[0-9a-z]+$/, Li = /^[0-9A-HJKMNP-TV-Z]{26}$/i, ji = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, zi = /^[a-z0-9_-]{21}$/i, Fi = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Zi = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Vi = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Bi = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let xn;
const Wi = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Ui = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Hi = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Gi = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, qi = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Yi = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, gs = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Xi = new RegExp(`^${gs}$`);
function ys(t) {
  let e = "[0-5]\\d";
  t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`);
  const n = t.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${n}`;
}
function Ki(t) {
  return new RegExp(`^${ys(t)}$`);
}
function Ji(t) {
  let e = `${gs}T${ys(t)}`;
  const n = [];
  return n.push(t.local ? "Z?" : "Z"), t.offset && n.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${n.join("|")})`, new RegExp(`^${e}$`);
}
function Qi(t, e) {
  return !!((e === "v4" || !e) && Wi.test(t) || (e === "v6" || !e) && Hi.test(t));
}
function eo(t, e) {
  if (!Fi.test(t))
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
function to(t, e) {
  return !!((e === "v4" || !e) && Ui.test(t) || (e === "v6" || !e) && Gi.test(t));
}
class Ae extends L {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== S.string) {
      const i = this._getOrReturnCtx(e);
      return k(i, {
        code: v.invalid_type,
        expected: S.string,
        received: i.parsedType
      }), E;
    }
    const r = new ae();
    let s;
    for (const i of this._def.checks)
      if (i.kind === "min")
        e.data.length < i.value && (s = this._getOrReturnCtx(e, s), k(s, {
          code: v.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), r.dirty());
      else if (i.kind === "max")
        e.data.length > i.value && (s = this._getOrReturnCtx(e, s), k(s, {
          code: v.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), r.dirty());
      else if (i.kind === "length") {
        const o = e.data.length > i.value, a = e.data.length < i.value;
        (o || a) && (s = this._getOrReturnCtx(e, s), o ? k(s, {
          code: v.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }) : a && k(s, {
          code: v.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }), r.dirty());
      } else if (i.kind === "email")
        Vi.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
          validation: "email",
          code: v.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "emoji")
        xn || (xn = new RegExp(Bi, "u")), xn.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
          validation: "emoji",
          code: v.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "uuid")
        ji.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
          validation: "uuid",
          code: v.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "nanoid")
        zi.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
          validation: "nanoid",
          code: v.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "cuid")
        Mi.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
          validation: "cuid",
          code: v.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "cuid2")
        Di.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
          validation: "cuid2",
          code: v.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "ulid")
        Li.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
          validation: "ulid",
          code: v.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), k(s, {
            validation: "url",
            code: v.invalid_string,
            message: i.message
          }), r.dirty();
        }
      else i.kind === "regex" ? (i.regex.lastIndex = 0, i.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
        validation: "regex",
        code: v.invalid_string,
        message: i.message
      }), r.dirty())) : i.kind === "trim" ? e.data = e.data.trim() : i.kind === "includes" ? e.data.includes(i.value, i.position) || (s = this._getOrReturnCtx(e, s), k(s, {
        code: v.invalid_string,
        validation: { includes: i.value, position: i.position },
        message: i.message
      }), r.dirty()) : i.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : i.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : i.kind === "startsWith" ? e.data.startsWith(i.value) || (s = this._getOrReturnCtx(e, s), k(s, {
        code: v.invalid_string,
        validation: { startsWith: i.value },
        message: i.message
      }), r.dirty()) : i.kind === "endsWith" ? e.data.endsWith(i.value) || (s = this._getOrReturnCtx(e, s), k(s, {
        code: v.invalid_string,
        validation: { endsWith: i.value },
        message: i.message
      }), r.dirty()) : i.kind === "datetime" ? Ji(i).test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
        code: v.invalid_string,
        validation: "datetime",
        message: i.message
      }), r.dirty()) : i.kind === "date" ? Xi.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
        code: v.invalid_string,
        validation: "date",
        message: i.message
      }), r.dirty()) : i.kind === "time" ? Ki(i).test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
        code: v.invalid_string,
        validation: "time",
        message: i.message
      }), r.dirty()) : i.kind === "duration" ? Zi.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
        validation: "duration",
        code: v.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "ip" ? Qi(e.data, i.version) || (s = this._getOrReturnCtx(e, s), k(s, {
        validation: "ip",
        code: v.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "jwt" ? eo(e.data, i.alg) || (s = this._getOrReturnCtx(e, s), k(s, {
        validation: "jwt",
        code: v.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "cidr" ? to(e.data, i.version) || (s = this._getOrReturnCtx(e, s), k(s, {
        validation: "cidr",
        code: v.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "base64" ? qi.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
        validation: "base64",
        code: v.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "base64url" ? Yi.test(e.data) || (s = this._getOrReturnCtx(e, s), k(s, {
        validation: "base64url",
        code: v.invalid_string,
        message: i.message
      }), r.dirty()) : z.assertNever(i);
    return { status: r.value, value: e.data };
  }
  _regex(e, n, r) {
    return this.refinement((s) => e.test(s), {
      validation: n,
      code: v.invalid_string,
      ...C.errToObj(r)
    });
  }
  _addCheck(e) {
    return new Ae({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...C.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...C.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...C.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...C.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...C.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...C.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...C.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...C.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...C.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...C.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...C.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...C.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...C.errToObj(e) });
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
      ...C.errToObj(e == null ? void 0 : e.message)
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
      ...C.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...C.errToObj(e) });
  }
  regex(e, n) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...C.errToObj(n)
    });
  }
  includes(e, n) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: n == null ? void 0 : n.position,
      ...C.errToObj(n == null ? void 0 : n.message)
    });
  }
  startsWith(e, n) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...C.errToObj(n)
    });
  }
  endsWith(e, n) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...C.errToObj(n)
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...C.errToObj(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...C.errToObj(n)
    });
  }
  length(e, n) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...C.errToObj(n)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, C.errToObj(e));
  }
  trim() {
    return new Ae({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Ae({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Ae({
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
Ae.create = (t) => new Ae({
  checks: [],
  typeName: O.ZodString,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...I(t)
});
function no(t, e) {
  const n = (t.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, s = n > r ? n : r, i = Number.parseInt(t.toFixed(s).replace(".", "")), o = Number.parseInt(e.toFixed(s).replace(".", ""));
  return i % o / 10 ** s;
}
class tt extends L {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== S.number) {
      const i = this._getOrReturnCtx(e);
      return k(i, {
        code: v.invalid_type,
        expected: S.number,
        received: i.parsedType
      }), E;
    }
    let r;
    const s = new ae();
    for (const i of this._def.checks)
      i.kind === "int" ? z.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), k(r, {
        code: v.invalid_type,
        expected: "integer",
        received: "float",
        message: i.message
      }), s.dirty()) : i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (r = this._getOrReturnCtx(e, r), k(r, {
        code: v.too_small,
        minimum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), s.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (r = this._getOrReturnCtx(e, r), k(r, {
        code: v.too_big,
        maximum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), s.dirty()) : i.kind === "multipleOf" ? no(e.data, i.value) !== 0 && (r = this._getOrReturnCtx(e, r), k(r, {
        code: v.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), s.dirty()) : i.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), k(r, {
        code: v.not_finite,
        message: i.message
      }), s.dirty()) : z.assertNever(i);
    return { status: s.value, value: e.data };
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, C.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, C.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, C.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, C.toString(n));
  }
  setLimit(e, n, r, s) {
    return new tt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: C.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new tt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: C.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: C.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: C.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: C.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: C.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: C.toString(n)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: C.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: C.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: C.toString(e)
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
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && z.isInteger(e.value));
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
tt.create = (t) => new tt({
  checks: [],
  typeName: O.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...I(t)
});
class vt extends L {
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
    if (this._getType(e) !== S.bigint)
      return this._getInvalidInput(e);
    let r;
    const s = new ae();
    for (const i of this._def.checks)
      i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (r = this._getOrReturnCtx(e, r), k(r, {
        code: v.too_small,
        type: "bigint",
        minimum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), s.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (r = this._getOrReturnCtx(e, r), k(r, {
        code: v.too_big,
        type: "bigint",
        maximum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), s.dirty()) : i.kind === "multipleOf" ? e.data % i.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), k(r, {
        code: v.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), s.dirty()) : z.assertNever(i);
    return { status: s.value, value: e.data };
  }
  _getInvalidInput(e) {
    const n = this._getOrReturnCtx(e);
    return k(n, {
      code: v.invalid_type,
      expected: S.bigint,
      received: n.parsedType
    }), E;
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, C.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, C.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, C.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, C.toString(n));
  }
  setLimit(e, n, r, s) {
    return new vt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: C.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new vt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: C.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: C.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: C.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: C.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: C.toString(n)
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
vt.create = (t) => new vt({
  checks: [],
  typeName: O.ZodBigInt,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...I(t)
});
class Ir extends L {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== S.boolean) {
      const r = this._getOrReturnCtx(e);
      return k(r, {
        code: v.invalid_type,
        expected: S.boolean,
        received: r.parsedType
      }), E;
    }
    return me(e.data);
  }
}
Ir.create = (t) => new Ir({
  typeName: O.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...I(t)
});
class Lt extends L {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== S.date) {
      const i = this._getOrReturnCtx(e);
      return k(i, {
        code: v.invalid_type,
        expected: S.date,
        received: i.parsedType
      }), E;
    }
    if (Number.isNaN(e.data.getTime())) {
      const i = this._getOrReturnCtx(e);
      return k(i, {
        code: v.invalid_date
      }), E;
    }
    const r = new ae();
    let s;
    for (const i of this._def.checks)
      i.kind === "min" ? e.data.getTime() < i.value && (s = this._getOrReturnCtx(e, s), k(s, {
        code: v.too_small,
        message: i.message,
        inclusive: !0,
        exact: !1,
        minimum: i.value,
        type: "date"
      }), r.dirty()) : i.kind === "max" ? e.data.getTime() > i.value && (s = this._getOrReturnCtx(e, s), k(s, {
        code: v.too_big,
        message: i.message,
        inclusive: !0,
        exact: !1,
        maximum: i.value,
        type: "date"
      }), r.dirty()) : z.assertNever(i);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new Lt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: C.toString(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: C.toString(n)
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
Lt.create = (t) => new Lt({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: O.ZodDate,
  ...I(t)
});
class Mr extends L {
  _parse(e) {
    if (this._getType(e) !== S.symbol) {
      const r = this._getOrReturnCtx(e);
      return k(r, {
        code: v.invalid_type,
        expected: S.symbol,
        received: r.parsedType
      }), E;
    }
    return me(e.data);
  }
}
Mr.create = (t) => new Mr({
  typeName: O.ZodSymbol,
  ...I(t)
});
class Dr extends L {
  _parse(e) {
    if (this._getType(e) !== S.undefined) {
      const r = this._getOrReturnCtx(e);
      return k(r, {
        code: v.invalid_type,
        expected: S.undefined,
        received: r.parsedType
      }), E;
    }
    return me(e.data);
  }
}
Dr.create = (t) => new Dr({
  typeName: O.ZodUndefined,
  ...I(t)
});
class Lr extends L {
  _parse(e) {
    if (this._getType(e) !== S.null) {
      const r = this._getOrReturnCtx(e);
      return k(r, {
        code: v.invalid_type,
        expected: S.null,
        received: r.parsedType
      }), E;
    }
    return me(e.data);
  }
}
Lr.create = (t) => new Lr({
  typeName: O.ZodNull,
  ...I(t)
});
class jr extends L {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return me(e.data);
  }
}
jr.create = (t) => new jr({
  typeName: O.ZodAny,
  ...I(t)
});
class En extends L {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return me(e.data);
  }
}
En.create = (t) => new En({
  typeName: O.ZodUnknown,
  ...I(t)
});
class Me extends L {
  _parse(e) {
    const n = this._getOrReturnCtx(e);
    return k(n, {
      code: v.invalid_type,
      expected: S.never,
      received: n.parsedType
    }), E;
  }
}
Me.create = (t) => new Me({
  typeName: O.ZodNever,
  ...I(t)
});
class zr extends L {
  _parse(e) {
    if (this._getType(e) !== S.undefined) {
      const r = this._getOrReturnCtx(e);
      return k(r, {
        code: v.invalid_type,
        expected: S.void,
        received: r.parsedType
      }), E;
    }
    return me(e.data);
  }
}
zr.create = (t) => new zr({
  typeName: O.ZodVoid,
  ...I(t)
});
class we extends L {
  _parse(e) {
    const { ctx: n, status: r } = this._processInputParams(e), s = this._def;
    if (n.parsedType !== S.array)
      return k(n, {
        code: v.invalid_type,
        expected: S.array,
        received: n.parsedType
      }), E;
    if (s.exactLength !== null) {
      const o = n.data.length > s.exactLength.value, a = n.data.length < s.exactLength.value;
      (o || a) && (k(n, {
        code: o ? v.too_big : v.too_small,
        minimum: a ? s.exactLength.value : void 0,
        maximum: o ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), r.dirty());
    }
    if (s.minLength !== null && n.data.length < s.minLength.value && (k(n, {
      code: v.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), r.dirty()), s.maxLength !== null && n.data.length > s.maxLength.value && (k(n, {
      code: v.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), r.dirty()), n.common.async)
      return Promise.all([...n.data].map((o, a) => s.type._parseAsync(new Se(n, o, n.path, a)))).then((o) => ae.mergeArray(r, o));
    const i = [...n.data].map((o, a) => s.type._parseSync(new Se(n, o, n.path, a)));
    return ae.mergeArray(r, i);
  }
  get element() {
    return this._def.type;
  }
  min(e, n) {
    return new we({
      ...this._def,
      minLength: { value: e, message: C.toString(n) }
    });
  }
  max(e, n) {
    return new we({
      ...this._def,
      maxLength: { value: e, message: C.toString(n) }
    });
  }
  length(e, n) {
    return new we({
      ...this._def,
      exactLength: { value: e, message: C.toString(n) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
we.create = (t, e) => new we({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: O.ZodArray,
  ...I(e)
});
function Ke(t) {
  if (t instanceof Y) {
    const e = {};
    for (const n in t.shape) {
      const r = t.shape[n];
      e[n] = Ie.create(Ke(r));
    }
    return new Y({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof we ? new we({
    ...t._def,
    type: Ke(t.element)
  }) : t instanceof Ie ? Ie.create(Ke(t.unwrap())) : t instanceof st ? st.create(Ke(t.unwrap())) : t instanceof We ? We.create(t.items.map((e) => Ke(e))) : t;
}
class Y extends L {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), n = z.objectKeys(e);
    return this._cached = { shape: e, keys: n }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== S.object) {
      const l = this._getOrReturnCtx(e);
      return k(l, {
        code: v.invalid_type,
        expected: S.object,
        received: l.parsedType
      }), E;
    }
    const { status: r, ctx: s } = this._processInputParams(e), { shape: i, keys: o } = this._getCached(), a = [];
    if (!(this._def.catchall instanceof Me && this._def.unknownKeys === "strip"))
      for (const l in s.data)
        o.includes(l) || a.push(l);
    const c = [];
    for (const l of o) {
      const u = i[l], d = s.data[l];
      c.push({
        key: { status: "valid", value: l },
        value: u._parse(new Se(s, d, s.path, l)),
        alwaysSet: l in s.data
      });
    }
    if (this._def.catchall instanceof Me) {
      const l = this._def.unknownKeys;
      if (l === "passthrough")
        for (const u of a)
          c.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: s.data[u] }
          });
      else if (l === "strict")
        a.length > 0 && (k(s, {
          code: v.unrecognized_keys,
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
            new Se(s, d, s.path, u)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: u in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const l = [];
      for (const u of c) {
        const d = await u.key, f = await u.value;
        l.push({
          key: d,
          value: f,
          alwaysSet: u.alwaysSet
        });
      }
      return l;
    }).then((l) => ae.mergeObjectSync(r, l)) : ae.mergeObjectSync(r, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return C.errToObj, new Y({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (n, r) => {
          var i, o;
          const s = ((o = (i = this._def).errorMap) == null ? void 0 : o.call(i, n, r).message) ?? r.defaultError;
          return n.code === "unrecognized_keys" ? {
            message: C.errToObj(e).message ?? s
          } : {
            message: s
          };
        }
      } : {}
    });
  }
  strip() {
    return new Y({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new Y({
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
    return new Y({
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
    return new Y({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: O.ZodObject
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
    return new Y({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const n = {};
    for (const r of z.objectKeys(e))
      e[r] && this.shape[r] && (n[r] = this.shape[r]);
    return new Y({
      ...this._def,
      shape: () => n
    });
  }
  omit(e) {
    const n = {};
    for (const r of z.objectKeys(this.shape))
      e[r] || (n[r] = this.shape[r]);
    return new Y({
      ...this._def,
      shape: () => n
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return Ke(this);
  }
  partial(e) {
    const n = {};
    for (const r of z.objectKeys(this.shape)) {
      const s = this.shape[r];
      e && !e[r] ? n[r] = s : n[r] = s.optional();
    }
    return new Y({
      ...this._def,
      shape: () => n
    });
  }
  required(e) {
    const n = {};
    for (const r of z.objectKeys(this.shape))
      if (e && !e[r])
        n[r] = this.shape[r];
      else {
        let i = this.shape[r];
        for (; i instanceof Ie; )
          i = i._def.innerType;
        n[r] = i;
      }
    return new Y({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return vs(z.objectKeys(this.shape));
  }
}
Y.create = (t, e) => new Y({
  shape: () => t,
  unknownKeys: "strip",
  catchall: Me.create(),
  typeName: O.ZodObject,
  ...I(e)
});
Y.strictCreate = (t, e) => new Y({
  shape: () => t,
  unknownKeys: "strict",
  catchall: Me.create(),
  typeName: O.ZodObject,
  ...I(e)
});
Y.lazycreate = (t, e) => new Y({
  shape: t,
  unknownKeys: "strip",
  catchall: Me.create(),
  typeName: O.ZodObject,
  ...I(e)
});
class jt extends L {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = this._def.options;
    function s(i) {
      for (const a of i)
        if (a.result.status === "valid")
          return a.result;
      for (const a of i)
        if (a.result.status === "dirty")
          return n.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((a) => new Oe(a.ctx.common.issues));
      return k(n, {
        code: v.invalid_union,
        unionErrors: o
      }), E;
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
      const a = o.map((c) => new Oe(c));
      return k(n, {
        code: v.invalid_union,
        unionErrors: a
      }), E;
    }
  }
  get options() {
    return this._def.options;
  }
}
jt.create = (t, e) => new jt({
  options: t,
  typeName: O.ZodUnion,
  ...I(e)
});
function Pn(t, e) {
  const n = Pe(t), r = Pe(e);
  if (t === e)
    return { valid: !0, data: t };
  if (n === S.object && r === S.object) {
    const s = z.objectKeys(e), i = z.objectKeys(t).filter((a) => s.indexOf(a) !== -1), o = { ...t, ...e };
    for (const a of i) {
      const c = Pn(t[a], e[a]);
      if (!c.valid)
        return { valid: !1 };
      o[a] = c.data;
    }
    return { valid: !0, data: o };
  } else if (n === S.array && r === S.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let i = 0; i < t.length; i++) {
      const o = t[i], a = e[i], c = Pn(o, a);
      if (!c.valid)
        return { valid: !1 };
      s.push(c.data);
    }
    return { valid: !0, data: s };
  } else return n === S.date && r === S.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class zt extends L {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), s = (i, o) => {
      if ($r(i) || $r(o))
        return E;
      const a = Pn(i.value, o.value);
      return a.valid ? ((Er(i) || Er(o)) && n.dirty(), { status: n.value, value: a.data }) : (k(r, {
        code: v.invalid_intersection_types
      }), E);
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
zt.create = (t, e, n) => new zt({
  left: t,
  right: e,
  typeName: O.ZodIntersection,
  ...I(n)
});
class We extends L {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== S.array)
      return k(r, {
        code: v.invalid_type,
        expected: S.array,
        received: r.parsedType
      }), E;
    if (r.data.length < this._def.items.length)
      return k(r, {
        code: v.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), E;
    !this._def.rest && r.data.length > this._def.items.length && (k(r, {
      code: v.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), n.dirty());
    const i = [...r.data].map((o, a) => {
      const c = this._def.items[a] || this._def.rest;
      return c ? c._parse(new Se(r, o, r.path, a)) : null;
    }).filter((o) => !!o);
    return r.common.async ? Promise.all(i).then((o) => ae.mergeArray(n, o)) : ae.mergeArray(n, i);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new We({
      ...this._def,
      rest: e
    });
  }
}
We.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new We({
    items: t,
    typeName: O.ZodTuple,
    rest: null,
    ...I(e)
  });
};
class Ft extends L {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== S.object)
      return k(r, {
        code: v.invalid_type,
        expected: S.object,
        received: r.parsedType
      }), E;
    const s = [], i = this._def.keyType, o = this._def.valueType;
    for (const a in r.data)
      s.push({
        key: i._parse(new Se(r, a, r.path, a)),
        value: o._parse(new Se(r, r.data[a], r.path, a)),
        alwaysSet: a in r.data
      });
    return r.common.async ? ae.mergeObjectAsync(n, s) : ae.mergeObjectSync(n, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, n, r) {
    return n instanceof L ? new Ft({
      keyType: e,
      valueType: n,
      typeName: O.ZodRecord,
      ...I(r)
    }) : new Ft({
      keyType: Ae.create(),
      valueType: e,
      typeName: O.ZodRecord,
      ...I(n)
    });
  }
}
class Fr extends L {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== S.map)
      return k(r, {
        code: v.invalid_type,
        expected: S.map,
        received: r.parsedType
      }), E;
    const s = this._def.keyType, i = this._def.valueType, o = [...r.data.entries()].map(([a, c], l) => ({
      key: s._parse(new Se(r, a, r.path, [l, "key"])),
      value: i._parse(new Se(r, c, r.path, [l, "value"]))
    }));
    if (r.common.async) {
      const a = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of o) {
          const l = await c.key, u = await c.value;
          if (l.status === "aborted" || u.status === "aborted")
            return E;
          (l.status === "dirty" || u.status === "dirty") && n.dirty(), a.set(l.value, u.value);
        }
        return { status: n.value, value: a };
      });
    } else {
      const a = /* @__PURE__ */ new Map();
      for (const c of o) {
        const l = c.key, u = c.value;
        if (l.status === "aborted" || u.status === "aborted")
          return E;
        (l.status === "dirty" || u.status === "dirty") && n.dirty(), a.set(l.value, u.value);
      }
      return { status: n.value, value: a };
    }
  }
}
Fr.create = (t, e, n) => new Fr({
  valueType: e,
  keyType: t,
  typeName: O.ZodMap,
  ...I(n)
});
class bt extends L {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== S.set)
      return k(r, {
        code: v.invalid_type,
        expected: S.set,
        received: r.parsedType
      }), E;
    const s = this._def;
    s.minSize !== null && r.data.size < s.minSize.value && (k(r, {
      code: v.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), n.dirty()), s.maxSize !== null && r.data.size > s.maxSize.value && (k(r, {
      code: v.too_big,
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
          return E;
        u.status === "dirty" && n.dirty(), l.add(u.value);
      }
      return { status: n.value, value: l };
    }
    const a = [...r.data.values()].map((c, l) => i._parse(new Se(r, c, r.path, l)));
    return r.common.async ? Promise.all(a).then((c) => o(c)) : o(a);
  }
  min(e, n) {
    return new bt({
      ...this._def,
      minSize: { value: e, message: C.toString(n) }
    });
  }
  max(e, n) {
    return new bt({
      ...this._def,
      maxSize: { value: e, message: C.toString(n) }
    });
  }
  size(e, n) {
    return this.min(e, n).max(e, n);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
bt.create = (t, e) => new bt({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: O.ZodSet,
  ...I(e)
});
class Zr extends L {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
Zr.create = (t, e) => new Zr({
  getter: t,
  typeName: O.ZodLazy,
  ...I(e)
});
class Vr extends L {
  _parse(e) {
    if (e.data !== this._def.value) {
      const n = this._getOrReturnCtx(e);
      return k(n, {
        received: n.data,
        code: v.invalid_literal,
        expected: this._def.value
      }), E;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Vr.create = (t, e) => new Vr({
  value: t,
  typeName: O.ZodLiteral,
  ...I(e)
});
function vs(t, e) {
  return new nt({
    values: t,
    typeName: O.ZodEnum,
    ...I(e)
  });
}
class nt extends L {
  _parse(e) {
    if (typeof e.data != "string") {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return k(n, {
        expected: z.joinValues(r),
        received: n.parsedType,
        code: v.invalid_type
      }), E;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return k(n, {
        received: n.data,
        code: v.invalid_enum_value,
        options: r
      }), E;
    }
    return me(e.data);
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
    return nt.create(e, {
      ...this._def,
      ...n
    });
  }
  exclude(e, n = this._def) {
    return nt.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...n
    });
  }
}
nt.create = vs;
class Br extends L {
  _parse(e) {
    const n = z.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== S.string && r.parsedType !== S.number) {
      const s = z.objectValues(n);
      return k(r, {
        expected: z.joinValues(s),
        received: r.parsedType,
        code: v.invalid_type
      }), E;
    }
    if (this._cache || (this._cache = new Set(z.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const s = z.objectValues(n);
      return k(r, {
        received: r.data,
        code: v.invalid_enum_value,
        options: s
      }), E;
    }
    return me(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Br.create = (t, e) => new Br({
  values: t,
  typeName: O.ZodNativeEnum,
  ...I(e)
});
class Zt extends L {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== S.promise && n.common.async === !1)
      return k(n, {
        code: v.invalid_type,
        expected: S.promise,
        received: n.parsedType
      }), E;
    const r = n.parsedType === S.promise ? n.data : Promise.resolve(n.data);
    return me(r.then((s) => this._def.type.parseAsync(s, {
      path: n.path,
      errorMap: n.common.contextualErrorMap
    })));
  }
}
Zt.create = (t, e) => new Zt({
  type: t,
  typeName: O.ZodPromise,
  ...I(e)
});
class rt extends L {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === O.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), s = this._def.effect || null, i = {
      addIssue: (o) => {
        k(r, o), o.fatal ? n.abort() : n.dirty();
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
            return E;
          const c = await this._def.schema._parseAsync({
            data: a,
            path: r.path,
            parent: r
          });
          return c.status === "aborted" ? E : c.status === "dirty" || n.value === "dirty" ? yt(c.value) : c;
        });
      {
        if (n.value === "aborted")
          return E;
        const a = this._def.schema._parseSync({
          data: o,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? E : a.status === "dirty" || n.value === "dirty" ? yt(a.value) : a;
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
        return a.status === "aborted" ? E : (a.status === "dirty" && n.dirty(), o(a.value), { status: n.value, value: a.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((a) => a.status === "aborted" ? E : (a.status === "dirty" && n.dirty(), o(a.value).then(() => ({ status: n.value, value: a.value }))));
    }
    if (s.type === "transform")
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!et(o))
          return E;
        const a = s.transform(o.value, i);
        if (a instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: n.value, value: a };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => et(o) ? Promise.resolve(s.transform(o.value, i)).then((a) => ({
          status: n.value,
          value: a
        })) : E);
    z.assertNever(s);
  }
}
rt.create = (t, e, n) => new rt({
  schema: t,
  typeName: O.ZodEffects,
  effect: e,
  ...I(n)
});
rt.createWithPreprocess = (t, e, n) => new rt({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: O.ZodEffects,
  ...I(n)
});
class Ie extends L {
  _parse(e) {
    return this._getType(e) === S.undefined ? me(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ie.create = (t, e) => new Ie({
  innerType: t,
  typeName: O.ZodOptional,
  ...I(e)
});
class st extends L {
  _parse(e) {
    return this._getType(e) === S.null ? me(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
st.create = (t, e) => new st({
  innerType: t,
  typeName: O.ZodNullable,
  ...I(e)
});
class In extends L {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    let r = n.data;
    return n.parsedType === S.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
In.create = (t, e) => new In({
  innerType: t,
  typeName: O.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...I(e)
});
class Mn extends L {
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
    return Dt(s) ? s.then((i) => ({
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new Oe(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new Oe(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Mn.create = (t, e) => new Mn({
  innerType: t,
  typeName: O.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...I(e)
});
class Wr extends L {
  _parse(e) {
    if (this._getType(e) !== S.nan) {
      const r = this._getOrReturnCtx(e);
      return k(r, {
        code: v.invalid_type,
        expected: S.nan,
        received: r.parsedType
      }), E;
    }
    return { status: "valid", value: e.data };
  }
}
Wr.create = (t) => new Wr({
  typeName: O.ZodNaN,
  ...I(t)
});
class ro extends L {
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
class Gn extends L {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const i = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return i.status === "aborted" ? E : i.status === "dirty" ? (n.dirty(), yt(i.value)) : this._def.out._parseAsync({
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
      return s.status === "aborted" ? E : s.status === "dirty" ? (n.dirty(), {
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
    return new Gn({
      in: e,
      out: n,
      typeName: O.ZodPipeline
    });
  }
}
class Dn extends L {
  _parse(e) {
    const n = this._def.innerType._parse(e), r = (s) => (et(s) && (s.value = Object.freeze(s.value)), s);
    return Dt(n) ? n.then((s) => r(s)) : r(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Dn.create = (t, e) => new Dn({
  innerType: t,
  typeName: O.ZodReadonly,
  ...I(e)
});
var O;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(O || (O = {}));
const A = Ae.create, bs = tt.create, qn = En.create;
Me.create;
const so = we.create, X = Y.create;
jt.create;
zt.create;
We.create;
const Xt = Ft.create, Ue = nt.create;
Zt.create;
Ie.create;
st.create;
X({
  taskId: A(),
  title: A(),
  userId: A()
});
X({
  taskId: A(),
  changes: Xt(qn())
});
X({
  taskId: A()
});
X({
  reportId: A(),
  type: A(),
  title: A().optional()
});
X({
  userId: A(),
  email: A(),
  timestamp: A()
});
X({
  message: A(),
  variant: Ue(["info", "success", "error", "warning"]).default("info"),
  title: A().optional()
});
X({
  pluginId: A(),
  error: A(),
  stack: A().optional()
});
X({
  pluginId: A(),
  version: A().optional()
});
X({
  locale: A()
});
X({
  primaryColor: A(),
  label: A().optional()
});
const io = X({
  id: A().min(1),
  name: A().min(1),
  version: A().regex(/^\d+\.\d+\.\d+$/),
  description: A(),
  author: A(),
  entry: A(),
  hostCompatibility: A().default("^1.0.0"),
  permissions: so(Ue(Oi)).default([]),
  dependencies: Xt(A()).optional(),
  icon: A().optional(),
  category: A().optional()
});
X({
  path: A(),
  label: A().optional(),
  permission: A().optional()
});
X({
  slot: Ue($i),
  priority: bs().default(0)
});
X({
  label: A(),
  path: A(),
  icon: A().optional(),
  section: A().optional(),
  order: bs().default(0)
});
X({
  email: A().email(),
  password: A().min(6)
});
X({
  version: A().optional()
});
X({
  version: A()
});
Xt(qn());
const oo = X({
  title: A().min(1),
  description: A().optional(),
  status: Ue(["todo", "in_progress", "done"]).default("todo"),
  priority: Ue(["low", "medium", "high"]).default("medium")
});
oo.partial();
X({
  type: Ue(["tasks", "activity", "usage"]),
  format: Ue(["json", "csv"]).default("json"),
  title: A().optional()
});
X({
  pluginId: A(),
  event: A(),
  payload: Xt(qn()).optional(),
  timestamp: A().optional()
});
function xs() {
  const t = typeof window < "u" ? window.__FPP_HOST_BRIDGE__ : null;
  if (!t)
    throw new Error("[PluginSDK] Host bridge not initialized");
  return t;
}
function ao(t) {
  return xs().getContext({ id: t });
}
function co(t) {
  const e = io.safeParse(t.manifest);
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
const lo = wt(null);
function uo() {
  const t = _t(lo);
  if (!t)
    throw new Error(
      "[PluginSDK] usePluginId must be used within PluginIdProvider (wrap plugin UI in PluginBoundary)"
    );
  return t;
}
function ws() {
  const t = uo(), e = ao(t);
  return Te(
    (n, r) => {
      e.events.emit(n, r);
    },
    [e]
  );
}
const fo = "com.fpp.i18n", mo = "Language Pack", po = "1.0.0", ho = "Translate the entire app UI into multiple languages instantly.", go = "FPP Team", yo = "/plugins/com.fpp.i18n/index.js", vo = "^1.0.0", bo = ["storage:local", "events:locale.*"], xo = "language", wo = "Localization", _o = {
  id: fo,
  name: mo,
  version: po,
  description: ho,
  author: go,
  entry: yo,
  hostCompatibility: vo,
  permissions: bo,
  icon: xo,
  category: wo
};
function Ze(t) {
  return Object.keys(t);
}
function ko(t) {
  return t.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
function So(t) {
  var e;
  return typeof t != "string" || !t.includes("var(--mantine-scale)") ? t : (e = t.match(/^calc\((.*?)\)$/)) == null ? void 0 : e[1].split("*")[0].trim();
}
function Vt(t) {
  const e = So(t);
  return typeof e == "number" ? e : typeof e == "string" ? e.includes("calc") || e.includes("var") ? e : e.includes("px") ? Number(e.replace("px", "")) : e.includes("rem") ? Number(e.replace("rem", "")) * 16 : e.includes("em") ? Number(e.replace("em", "")) * 16 : Number(e) : NaN;
}
function wn(t) {
  return t === "0rem" ? "0rem" : `calc(${t} * var(--mantine-scale))`;
}
function _s(t, { shouldScale: e = !1 } = {}) {
  function n(r) {
    if (r === 0 || r === "0")
      return `0${t}`;
    if (typeof r == "number") {
      const s = `${r / 16}${t}`;
      return e ? wn(s) : s;
    }
    if (typeof r == "string") {
      if (r === "" || r.startsWith("calc(") || r.startsWith("clamp(") || r.includes("rgba("))
        return r;
      if (r.includes(","))
        return r.split(",").map((i) => n(i)).join(",");
      if (r.includes(" "))
        return r.split(" ").map((i) => n(i)).join(" ");
      if (r.includes(t))
        return e ? wn(r) : r;
      const s = r.replace("px", "");
      if (!Number.isNaN(Number(s))) {
        const i = `${Number(s) / 16}${t}`;
        return e ? wn(i) : i;
      }
    }
    return r;
  }
  return n;
}
const fe = _s("rem", { shouldScale: !0 });
_s("em");
function kt(t) {
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
function Yn(t) {
  return Array.isArray(t) || t === null ? !1 : typeof t == "object" ? t.type !== Ci : !1;
}
function Xn(t) {
  const e = wt(null);
  return [({ children: s, value: i }) => /* @__PURE__ */ w(e.Provider, { value: i, children: s }), () => {
    const s = _t(e);
    if (s === null)
      throw new Error(t);
    return s;
  }];
}
function Bt(t, e) {
  let n = t;
  for (; (n = n.parentElement) && !n.matches(e); )
    ;
  return n;
}
function Co(t, e, n) {
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
function Ro(t, e, n) {
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
function No(t, e, n) {
  return Bt(t, n) === Bt(e, n);
}
function To({
  parentSelector: t,
  siblingSelector: e,
  onKeyDown: n,
  loop: r = !0,
  activateOnFocus: s = !1,
  dir: i = "rtl",
  orientation: o
}) {
  return (a) => {
    var f;
    n == null || n(a);
    const c = Array.from(
      ((f = Bt(a.currentTarget, t)) == null ? void 0 : f.querySelectorAll(
        e
      )) || []
    ).filter((m) => No(a.currentTarget, m, t)), l = c.findIndex((m) => a.currentTarget === m), u = Ro(l, c, r), d = Co(l, c, r);
    switch (a.key) {
      case "ArrowRight":
        break;
      case "ArrowLeft":
        break;
      case "ArrowUp": {
        a.stopPropagation(), a.preventDefault(), c[d].focus(), s && c[d].click();
        break;
      }
      case "ArrowDown": {
        a.stopPropagation(), a.preventDefault(), c[u].focus(), s && c[u].click();
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
const Ao = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function Ss(t) {
  return Ao[t];
}
const Oo = () => {
};
function $o(t, e = { active: !0 }) {
  return typeof t != "function" || !e.active ? e.onKeyDown || Oo : (n) => {
    var r;
    n.key === "Escape" && (t(n), (r = e.onTrigger) == null || r.call(e));
  };
}
function Ce(t, e = "size", n = !0) {
  if (t !== void 0)
    return ks(t) ? n ? fe(t) : t : `var(--${e}-${t})`;
}
function ue(t) {
  return Ce(t, "mantine-spacing");
}
function at(t) {
  return t === void 0 ? "var(--mantine-radius-default)" : Ce(t, "mantine-radius");
}
function Cs(t) {
  return Ce(t, "mantine-font-size");
}
function Eo(t) {
  return Ce(t, "mantine-line-height", !1);
}
function Rs(t) {
  if (t)
    return Ce(t, "mantine-shadow", !1);
}
function xe(t, e) {
  return (n) => {
    t == null || t(n), e == null || e(n);
  };
}
function Po(t, e) {
  return t in e ? Vt(e[t]) : Vt(t);
}
function Io(t, e) {
  const n = t.map((r) => ({
    value: r,
    px: Po(r, e)
  }));
  return n.sort((r, s) => r.px - s.px), n;
}
function Je(t) {
  return typeof t == "object" && t !== null ? "base" in t ? t.base : void 0 : t;
}
function Mo(t, e, n) {
  var r;
  return n ? Array.from(
    ((r = Bt(n, e)) == null ? void 0 : r.querySelectorAll(t)) || []
  ).findIndex((s) => s === n) : null;
}
function Do() {
  const [t, e] = ge(-1);
  return [t, { setHovered: e, resetHovered: () => e(-1) }];
}
function Lo(t = "mantine-") {
  return `${t}${Math.random().toString(36).slice(2, 11)}`;
}
const Ur = ["mousedown", "touchstart"];
function jo(t, e, n) {
  const r = oe(null);
  return ke(() => {
    const s = (i) => {
      const { target: o } = i ?? {};
      if (Array.isArray(n)) {
        const a = (o == null ? void 0 : o.hasAttribute("data-ignore-outside-clicks")) || !document.body.contains(o) && o.tagName !== "HTML";
        n.every((l) => !!l && !i.composedPath().includes(l)) && !a && t();
      } else r.current && !r.current.contains(o) && t();
    };
    return (e || Ur).forEach((i) => document.addEventListener(i, s)), () => {
      (e || Ur).forEach((i) => document.removeEventListener(i, s));
    };
  }, [r, t, n]), r;
}
function zo(t, e) {
  try {
    return t.addEventListener("change", e), () => t.removeEventListener("change", e);
  } catch {
    return t.addListener(e), () => t.removeListener(e);
  }
}
function Fo(t, e) {
  return typeof window < "u" && "matchMedia" in window ? window.matchMedia(t).matches : !1;
}
function Zo(t, e, { getInitialValueInEffect: n } = {
  getInitialValueInEffect: !0
}) {
  const [r, s] = ge(
    n ? e : Fo(t)
  ), i = oe(null);
  return ke(() => {
    if ("matchMedia" in window)
      return i.current = window.matchMedia(t), s(i.current.matches), zo(i.current, (o) => s(o.matches));
  }, [t]), r;
}
const Ns = typeof document < "u" ? Hn : ke;
function He(t, e) {
  const n = oe(!1);
  ke(
    () => () => {
      n.current = !1;
    },
    []
  ), ke(() => {
    if (n.current)
      return t();
    n.current = !0;
  }, e);
}
function Vo({ opened: t, shouldReturnFocus: e = !0 }) {
  const n = oe(null), r = () => {
    var s;
    n.current && "focus" in n.current && typeof n.current.focus == "function" && ((s = n.current) == null || s.focus({ preventScroll: !0 }));
  };
  return He(() => {
    let s = -1;
    const i = (o) => {
      o.key === "Tab" && window.clearTimeout(s);
    };
    return document.addEventListener("keydown", i), t ? n.current = document.activeElement : e && (s = window.setTimeout(r, 10)), () => {
      window.clearTimeout(s), document.removeEventListener("keydown", i);
    };
  }, [t, e]), r;
}
const Bo = /input|select|textarea|button|object/, Ts = "a, input, select, textarea, button, object, [tabindex]";
function Wo(t) {
  return process.env.NODE_ENV === "test" ? !1 : t.style.display === "none";
}
function Uo(t) {
  if (t.getAttribute("aria-hidden") || t.getAttribute("hidden") || t.getAttribute("type") === "hidden")
    return !1;
  let n = t;
  for (; n && !(n === document.body || n.nodeType === 11); ) {
    if (Wo(n))
      return !1;
    n = n.parentNode;
  }
  return !0;
}
function As(t) {
  let e = t.getAttribute("tabindex");
  return e === null && (e = void 0), parseInt(e, 10);
}
function Ln(t) {
  const e = t.nodeName.toLowerCase(), n = !Number.isNaN(As(t));
  return /* @ts-expect-error function accepts any html element but if it is a button, it should not be disabled to trigger the condition */ (Bo.test(e) && !t.disabled || t instanceof HTMLAnchorElement && t.href || n) && Uo(t);
}
function Os(t) {
  const e = As(t);
  return (Number.isNaN(e) || e >= 0) && Ln(t);
}
function Ho(t) {
  return Array.from(t.querySelectorAll(Ts)).filter(Os);
}
function Go(t, e) {
  const n = Ho(t);
  if (!n.length) {
    e.preventDefault();
    return;
  }
  const r = n[e.shiftKey ? 0 : n.length - 1], s = t.getRootNode();
  let i = r === s.activeElement || t === s.activeElement;
  const o = s.activeElement;
  if (o.tagName === "INPUT" && o.getAttribute("type") === "radio" && (i = n.filter(
    (u) => u.getAttribute("type") === "radio" && u.getAttribute("name") === o.getAttribute("name")
  ).includes(r)), !i)
    return;
  e.preventDefault();
  const c = n[e.shiftKey ? n.length - 1 : 0];
  c && c.focus();
}
function qo(t = !0) {
  const e = oe(null), n = (s) => {
    let i = s.querySelector("[data-autofocus]");
    if (!i) {
      const o = Array.from(s.querySelectorAll(Ts));
      i = o.find(Os) || o.find(Ln) || null, !i && Ln(s) && (i = s);
    }
    i ? i.focus({ preventScroll: !0 }) : process.env.NODE_ENV === "development" && console.warn(
      "[@mantine/hooks/use-focus-trap] Failed to find focusable element within provided node",
      s
    );
  }, r = Te(
    (s) => {
      t && s !== null && e.current !== s && (s ? (setTimeout(() => {
        s.getRootNode() ? n(s) : process.env.NODE_ENV === "development" && console.warn("[@mantine/hooks/use-focus-trap] Ref node is not part of the dom", s);
      }), e.current = s) : e.current = null);
    },
    [t]
  );
  return ke(() => {
    if (!t)
      return;
    e.current && setTimeout(() => n(e.current));
    const s = (i) => {
      i.key === "Tab" && e.current && Go(e.current, i);
    };
    return document.addEventListener("keydown", s), () => document.removeEventListener("keydown", s);
  }, [t]), r;
}
const Yo = On.useId || (() => {
});
function Xo() {
  const t = Yo();
  return t ? `mantine-${t.replace(/:/g, "")}` : "";
}
function Ko(t) {
  const e = Xo(), [n, r] = ge(e);
  return Ns(() => {
    r(Lo());
  }, []), typeof t == "string" ? t : typeof window > "u" ? e : n;
}
function jn(t, e) {
  if (typeof t == "function")
    return t(e);
  typeof t == "object" && t !== null && "current" in t && (t.current = e);
}
function Jo(...t) {
  const e = /* @__PURE__ */ new Map();
  return (n) => {
    if (t.forEach((r) => {
      const s = jn(r, n);
      s && e.set(r, s);
    }), e.size > 0)
      return () => {
        t.forEach((r) => {
          const s = e.get(r);
          s ? s() : jn(r, null);
        }), e.clear();
      };
  };
}
function St(...t) {
  return Te(Jo(...t), t);
}
function $s({
  value: t,
  defaultValue: e,
  finalValue: n,
  onChange: r = () => {
  }
}) {
  const [s, i] = ge(
    e !== void 0 ? e : n
  ), o = (a, ...c) => {
    i(a), r == null || r(a, ...c);
  };
  return t !== void 0 ? [t, r, !0] : [s, o, !1];
}
function Qo(t, e) {
  return Zo("(prefers-reduced-motion: reduce)", t, e);
}
function ea(t) {
  var n;
  const e = On.version;
  return typeof On.version != "string" || e.startsWith("18.") ? t == null ? void 0 : t.ref : (n = t == null ? void 0 : t.props) == null ? void 0 : n.ref;
}
function Es(t) {
  var e, n, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (e = 0; e < s; e++) t[e] && (n = Es(t[e])) && (r && (r += " "), r += n);
  } else for (n in t) t[n] && (r && (r += " "), r += n);
  return r;
}
function Le() {
  for (var t, e, n = 0, r = "", s = arguments.length; n < s; n++) (t = arguments[n]) && (e = Es(t)) && (r && (r += " "), r += e);
  return r;
}
const ta = {};
function na(t) {
  const e = {};
  return t.forEach((n) => {
    Object.entries(n).forEach(([r, s]) => {
      e[r] ? e[r] = Le(e[r], s) : e[r] = s;
    });
  }), e;
}
function Kt({ theme: t, classNames: e, props: n, stylesCtx: r }) {
  const i = (Array.isArray(e) ? e : [e]).map(
    (o) => typeof o == "function" ? o(t, n, r) : o || ta
  );
  return na(i);
}
function Wt({ theme: t, styles: e, props: n, stylesCtx: r }) {
  return (Array.isArray(e) ? e : [e]).reduce((i, o) => typeof o == "function" ? { ...i, ...o(t, n, r) } : { ...i, ...o }, {});
}
const ra = wt(null);
function qe() {
  const t = _t(ra);
  if (!t)
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  return t;
}
function sa() {
  return qe().classNamesPrefix;
}
function ia() {
  return qe().getStyleNonce;
}
function oa() {
  return qe().withStaticClasses;
}
function aa() {
  return qe().headless;
}
function ca() {
  var t;
  return (t = qe().stylesTransform) == null ? void 0 : t.sx;
}
function la() {
  var t;
  return (t = qe().stylesTransform) == null ? void 0 : t.styles;
}
function Ps() {
  return qe().env || "default";
}
function ua(t) {
  return /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i.test(t);
}
function da(t) {
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
function fa(t) {
  const [e, n, r, s] = t.replace(/[^0-9,./]/g, "").split(/[/,]/).map(Number);
  return { r: e, g: n, b: r, a: s === void 0 ? 1 : s };
}
function ma(t) {
  const e = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i, n = t.match(e);
  if (!n)
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  const r = parseInt(n[1], 10), s = parseInt(n[2], 10) / 100, i = parseInt(n[3], 10) / 100, o = n[5] ? parseFloat(n[5]) : void 0, a = (1 - Math.abs(2 * i - 1)) * s, c = r / 60, l = a * (1 - Math.abs(c % 2 - 1)), u = i - a / 2;
  let d, f, m;
  return c >= 0 && c < 1 ? (d = a, f = l, m = 0) : c >= 1 && c < 2 ? (d = l, f = a, m = 0) : c >= 2 && c < 3 ? (d = 0, f = a, m = l) : c >= 3 && c < 4 ? (d = 0, f = l, m = a) : c >= 4 && c < 5 ? (d = l, f = 0, m = a) : (d = a, f = 0, m = l), {
    r: Math.round((d + u) * 255),
    g: Math.round((f + u) * 255),
    b: Math.round((m + u) * 255),
    a: o || 1
  };
}
function Is(t) {
  return ua(t) ? da(t) : t.startsWith("rgb") ? fa(t) : t.startsWith("hsl") ? ma(t) : {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function pa(t, e) {
  return typeof t.primaryShade == "number" ? t.primaryShade : e === "dark" ? t.primaryShade.dark : t.primaryShade.light;
}
function _n(t) {
  return t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4;
}
function ha(t) {
  const e = t.match(/oklch\((.*?)%\s/);
  return e ? parseFloat(e[1]) : null;
}
function ga(t) {
  if (t.startsWith("oklch("))
    return (ha(t) || 0) / 100;
  const { r: e, g: n, b: r } = Is(t), s = e / 255, i = n / 255, o = r / 255, a = _n(s), c = _n(i), l = _n(o);
  return 0.2126 * a + 0.7152 * c + 0.0722 * l;
}
function ht(t, e = 0.179) {
  return t.startsWith("var(") ? !1 : ga(t) > e;
}
function Jt({
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
      isLight: ht(
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
      isLight: ht(
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
      isLight: ht(
        t === "white" ? e.white : e.black,
        e.luminanceThreshold
      ),
      variable: `--mantine-color-${t}`
    };
  const [r, s] = t.split("."), i = s ? Number(s) : void 0, o = r in e.colors;
  if (o) {
    const a = i !== void 0 ? e.colors[r][i] : e.colors[r][pa(e, n || "light")];
    return {
      color: r,
      value: a,
      shade: i,
      isThemeColor: o,
      isLight: ht(a, e.luminanceThreshold),
      variable: s ? `--mantine-color-${r}-${i}` : `--mantine-color-${r}-filled`
    };
  }
  return {
    color: t,
    value: t,
    isThemeColor: o,
    isLight: ht(t, e.luminanceThreshold),
    shade: i,
    variable: void 0
  };
}
function Ut(t, e) {
  const n = Jt({ color: t || e.primaryColor, theme: e });
  return n.variable ? `var(${n.variable})` : t;
}
function ya(t, e) {
  const n = {
    from: (t == null ? void 0 : t.from) || e.defaultGradient.from,
    to: (t == null ? void 0 : t.to) || e.defaultGradient.to,
    deg: (t == null ? void 0 : t.deg) ?? e.defaultGradient.deg ?? 0
  }, r = Ut(n.from, e), s = Ut(n.to, e);
  return `linear-gradient(${n.deg}deg, ${r} 0%, ${s} 100%)`;
}
function va(t, e) {
  if (typeof t != "string" || e > 1 || e < 0)
    return "rgba(0, 0, 0, 1)";
  if (t.startsWith("var(")) {
    const i = (1 - e) * 100;
    return `color-mix(in srgb, ${t}, transparent ${i}%)`;
  }
  if (t.startsWith("oklch"))
    return t.includes("/") ? t.replace(/\/\s*[\d.]+\s*\)/, `/ ${e})`) : t.replace(")", ` / ${e})`);
  const { r: n, g: r, b: s } = Is(t);
  return `rgba(${n}, ${r}, ${s}, ${e})`;
}
const ba = wt(null);
function je() {
  const t = _t(ba);
  if (!t)
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  return t;
}
function Ms({
  classNames: t,
  styles: e,
  props: n,
  stylesCtx: r
}) {
  const s = je();
  return {
    resolvedClassNames: Kt({
      theme: s,
      classNames: t,
      props: n,
      stylesCtx: r || void 0
    }),
    resolvedStyles: Wt({
      theme: s,
      styles: e,
      props: n,
      stylesCtx: r || void 0
    })
  };
}
const xa = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function wa({ theme: t, options: e, unstyled: n }) {
  return Le(
    (e == null ? void 0 : e.focusable) && !n && (t.focusClassName || xa[t.focusRing]),
    (e == null ? void 0 : e.active) && !n && t.activeClassName
  );
}
function _a({
  selector: t,
  stylesCtx: e,
  options: n,
  props: r,
  theme: s
}) {
  return Kt({
    theme: s,
    classNames: n == null ? void 0 : n.classNames,
    props: (n == null ? void 0 : n.props) || r,
    stylesCtx: e
  })[t];
}
function Hr({
  selector: t,
  stylesCtx: e,
  theme: n,
  classNames: r,
  props: s
}) {
  return Kt({ theme: n, classNames: r, props: s, stylesCtx: e })[t];
}
function ka({ rootSelector: t, selector: e, className: n }) {
  return t === e ? n : void 0;
}
function Sa({ selector: t, classes: e, unstyled: n }) {
  return n ? void 0 : e[t];
}
function Ca({
  themeName: t,
  classNamesPrefix: e,
  selector: n,
  withStaticClass: r
}) {
  return r === !1 ? [] : t.map((s) => `${e}-${s}-${n}`);
}
function Ra({
  themeName: t,
  theme: e,
  selector: n,
  props: r,
  stylesCtx: s
}) {
  return t.map(
    (i) => {
      var o, a;
      return (a = Kt({
        theme: e,
        classNames: (o = e.components[i]) == null ? void 0 : o.classNames,
        props: r,
        stylesCtx: s
      })) == null ? void 0 : a[n];
    }
  );
}
function Na({
  options: t,
  classes: e,
  selector: n,
  unstyled: r
}) {
  return t != null && t.variant && !r ? e[`${n}--${t.variant}`] : void 0;
}
function Ta({
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
  withStaticClasses: f,
  headless: m,
  transformedStyles: h
}) {
  return Le(
    wa({ theme: t, options: e, unstyled: a || m }),
    Ra({ theme: t, themeName: n, selector: r, props: u, stylesCtx: d }),
    Na({ options: e, classes: o, selector: r, unstyled: a }),
    Hr({ selector: r, stylesCtx: d, theme: t, classNames: i, props: u }),
    Hr({ selector: r, stylesCtx: d, theme: t, classNames: h, props: u }),
    _a({ selector: r, stylesCtx: d, options: e, props: u, theme: t }),
    ka({ rootSelector: l, selector: r, className: c }),
    Sa({ selector: r, classes: o, unstyled: a || m }),
    f && !m && Ca({
      themeName: n,
      classNamesPrefix: s,
      selector: r,
      withStaticClass: e == null ? void 0 : e.withStaticClass
    }),
    e == null ? void 0 : e.className
  );
}
function Aa({
  theme: t,
  themeName: e,
  props: n,
  stylesCtx: r,
  selector: s
}) {
  return e.map(
    (i) => {
      var o;
      return Wt({
        theme: t,
        styles: (o = t.components[i]) == null ? void 0 : o.styles,
        props: n,
        stylesCtx: r
      })[s];
    }
  ).reduce((i, o) => ({ ...i, ...o }), {});
}
function zn({ style: t, theme: e }) {
  return Array.isArray(t) ? [...t].reduce(
    (n, r) => ({ ...n, ...zn({ style: r, theme: e }) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function Oa(t) {
  return t.reduce((e, n) => (n && Object.keys(n).forEach((r) => {
    e[r] = { ...e[r], ...kt(n[r]) };
  }), e), {});
}
function $a({
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
  return (c = Oa([
    a ? {} : e == null ? void 0 : e(n, r, s),
    ...o.map((l) => {
      var u, d, f;
      return (f = (d = (u = n.components) == null ? void 0 : u[l]) == null ? void 0 : d.vars) == null ? void 0 : f.call(d, n, r, s);
    }),
    t == null ? void 0 : t(n, r, s)
  ])) == null ? void 0 : c[i];
}
function Ea({
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
  withStylesTransform: f
}) {
  return {
    ...!f && Aa({ theme: t, themeName: e, props: s, stylesCtx: i, selector: n }),
    ...!f && Wt({ theme: t, styles: a, props: s, stylesCtx: i })[n],
    ...!f && Wt({ theme: t, styles: r == null ? void 0 : r.styles, props: (r == null ? void 0 : r.props) || s, stylesCtx: i })[n],
    ...$a({ theme: t, props: s, stylesCtx: i, vars: l, varsResolver: u, selector: n, themeName: e, headless: d }),
    ...o === n ? zn({ style: c, theme: t }) : null,
    ...zn({ style: r == null ? void 0 : r.style, theme: t })
  };
}
function Pa({ props: t, stylesCtx: e, themeName: n }) {
  var o;
  const r = je(), s = (o = la()) == null ? void 0 : o();
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
function Q({
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
  const f = je(), m = sa(), h = oa(), p = aa(), g = (Array.isArray(t) ? t : [t]).filter((y) => y), { withStylesTransform: x, getTransformedStyles: _ } = Pa({
    props: n,
    stylesCtx: r,
    themeName: g
  });
  return (y, b) => ({
    className: Ta({
      theme: f,
      options: b,
      themeName: g,
      selector: y,
      classNamesPrefix: m,
      classNames: c,
      classes: e,
      unstyled: a,
      className: s,
      rootSelector: o,
      props: n,
      stylesCtx: r,
      withStaticClasses: h,
      headless: p,
      transformedStyles: _([b == null ? void 0 : b.styles, l])
    }),
    style: Ea({
      theme: f,
      themeName: g,
      selector: y,
      options: b,
      props: n,
      stylesCtx: r,
      rootSelector: o,
      styles: l,
      style: i,
      vars: u,
      varsResolver: d,
      headless: p,
      withStylesTransform: x
    })
  });
}
function B(t, e, n) {
  var o;
  const r = je(), s = (o = r.components[t]) == null ? void 0 : o.defaultProps, i = typeof s == "function" ? s(r) : s;
  return { ...e, ...i, ...kt(n) };
}
function kn(t) {
  return Ze(t).reduce(
    (e, n) => t[n] !== void 0 ? `${e}${ko(n)}:${t[n]};` : e,
    ""
  ).trim();
}
function Ia({ selector: t, styles: e, media: n, container: r }) {
  const s = e ? kn(e) : "", i = Array.isArray(n) ? n.map((a) => `@media${a.query}{${t}{${kn(a.styles)}}}`) : [], o = Array.isArray(r) ? r.map(
    (a) => `@container ${a.query}{${t}{${kn(a.styles)}}}`
  ) : [];
  return `${s ? `${t}{${s}}` : ""}${i.join("")}${o.join("")}`.trim();
}
function Kn(t) {
  const e = ia();
  return /* @__PURE__ */ w(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: e == null ? void 0 : e(),
      dangerouslySetInnerHTML: { __html: Ia(t) }
    }
  );
}
function Ma(t) {
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
    py: f,
    pt: m,
    pb: h,
    pl: p,
    pr: g,
    pe: x,
    ps: _,
    bd: y,
    bg: b,
    c: N,
    opacity: R,
    ff: T,
    fz: M,
    fw: j,
    lts: $,
    ta: G,
    lh: F,
    fs: W,
    tt: V,
    td: q,
    w: Z,
    miw: U,
    maw: D,
    h: K,
    mih: se,
    mah: ft,
    bgsz: Xe,
    bgp: mt,
    bgr: pt,
    bga: ln,
    pos: un,
    top: At,
    left: dn,
    bottom: Ne,
    right: fn,
    inset: Ot,
    display: mn,
    flex: $t,
    hiddenFrom: pn,
    visibleFrom: hn,
    lightHidden: gn,
    darkHidden: yn,
    sx: vn,
    ...Et
  } = t;
  return { styleProps: kt({
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
    py: f,
    pt: m,
    pb: h,
    pl: p,
    pr: g,
    pe: x,
    ps: _,
    bd: y,
    bg: b,
    c: N,
    opacity: R,
    ff: T,
    fz: M,
    fw: j,
    lts: $,
    ta: G,
    lh: F,
    fs: W,
    tt: V,
    td: q,
    w: Z,
    miw: U,
    maw: D,
    h: K,
    mih: se,
    mah: ft,
    bgsz: Xe,
    bgp: mt,
    bgr: pt,
    bga: ln,
    pos: un,
    top: At,
    left: dn,
    bottom: Ne,
    right: fn,
    inset: Ot,
    display: mn,
    flex: $t,
    hiddenFrom: pn,
    visibleFrom: hn,
    lightHidden: gn,
    darkHidden: yn,
    sx: vn
  }), rest: Et };
}
const Da = {
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
function Jn(t, e) {
  const n = Jt({ color: t, theme: e });
  return n.color === "dimmed" ? "var(--mantine-color-dimmed)" : n.color === "bright" ? "var(--mantine-color-bright)" : n.variable ? `var(${n.variable})` : n.color;
}
function La(t, e) {
  const n = Jt({ color: t, theme: e });
  return n.isThemeColor && n.shade === void 0 ? `var(--mantine-color-${n.color}-text)` : Jn(t, e);
}
function ja(t, e) {
  if (typeof t == "number")
    return fe(t);
  if (typeof t == "string") {
    const [n, r, ...s] = t.split(" ").filter((o) => o.trim() !== "");
    let i = `${fe(n)}`;
    return r && (i += ` ${r}`), s.length > 0 && (i += ` ${Jn(s.join(" "), e)}`), i.trim();
  }
  return t;
}
const Gr = {
  text: "var(--mantine-font-family)",
  mono: "var(--mantine-font-family-monospace)",
  monospace: "var(--mantine-font-family-monospace)",
  heading: "var(--mantine-font-family-headings)",
  headings: "var(--mantine-font-family-headings)"
};
function za(t) {
  return typeof t == "string" && t in Gr ? Gr[t] : t;
}
const Fa = ["h1", "h2", "h3", "h4", "h5", "h6"];
function Za(t, e) {
  return typeof t == "string" && t in e.fontSizes ? `var(--mantine-font-size-${t})` : typeof t == "string" && Fa.includes(t) ? `var(--mantine-${t}-font-size)` : typeof t == "number" || typeof t == "string" ? fe(t) : t;
}
function Va(t) {
  return t;
}
const Ba = ["h1", "h2", "h3", "h4", "h5", "h6"];
function Wa(t, e) {
  return typeof t == "string" && t in e.lineHeights ? `var(--mantine-line-height-${t})` : typeof t == "string" && Ba.includes(t) ? `var(--mantine-${t}-line-height)` : t;
}
function Ua(t) {
  return typeof t == "number" ? fe(t) : t;
}
function Ha(t, e) {
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
const Sn = {
  color: Jn,
  textColor: La,
  fontSize: Za,
  spacing: Ha,
  identity: Va,
  size: Ua,
  lineHeight: Wa,
  fontFamily: za,
  border: ja
};
function qr(t) {
  return t.replace("(min-width: ", "").replace("em)", "");
}
function Ga({
  media: t,
  ...e
}) {
  const r = Object.keys(t).sort((s, i) => Number(qr(s)) - Number(qr(i))).map((s) => ({ query: s, styles: t[s] }));
  return { ...e, media: r };
}
function qa(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.keys(t);
  return !(e.length === 1 && e[0] === "base");
}
function Ya(t) {
  return typeof t == "object" && t !== null ? "base" in t ? t.base : void 0 : t;
}
function Xa(t) {
  return typeof t == "object" && t !== null ? Ze(t).filter((e) => e !== "base") : [];
}
function Ka(t, e) {
  return typeof t == "object" && t !== null && e in t ? t[e] : t;
}
function Ja({
  styleProps: t,
  data: e,
  theme: n
}) {
  return Ga(
    Ze(t).reduce(
      (r, s) => {
        if (s === "hiddenFrom" || s === "visibleFrom" || s === "sx")
          return r;
        const i = e[s], o = Array.isArray(i.property) ? i.property : [i.property], a = Ya(t[s]);
        if (!qa(t[s]))
          return o.forEach((l) => {
            r.inlineStyles[l] = Sn[i.type](a, n);
          }), r;
        r.hasResponsiveStyles = !0;
        const c = Xa(t[s]);
        return o.forEach((l) => {
          a && (r.styles[l] = Sn[i.type](a, n)), c.forEach((u) => {
            const d = `(min-width: ${n.breakpoints[u]})`;
            r.media[d] = {
              ...r.media[d],
              [l]: Sn[i.type](
                Ka(t[s], u),
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
function Ds() {
  return `__m__-${Ri().replace(/:/g, "")}`;
}
function Ls(t) {
  return t.startsWith("data-") ? t : `data-${t}`;
}
function Qa(t) {
  return Object.keys(t).reduce((e, n) => {
    const r = t[n];
    return r === void 0 || r === "" || r === !1 || r === null || (e[Ls(n)] = t[n]), e;
  }, {});
}
function js(t) {
  return t ? typeof t == "string" ? { [Ls(t)]: !0 } : Array.isArray(t) ? [...t].reduce(
    (e, n) => ({ ...e, ...js(n) }),
    {}
  ) : Qa(t) : null;
}
function Fn(t, e) {
  return Array.isArray(t) ? [...t].reduce(
    (n, r) => ({ ...n, ...Fn(r, e) }),
    {}
  ) : typeof t == "function" ? t(e) : t ?? {};
}
function ec({
  theme: t,
  style: e,
  vars: n,
  styleProps: r
}) {
  const s = Fn(e, t), i = Fn(n, t);
  return { ...s, ...i, ...r };
}
const zs = de(
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
    __size: f,
    ...m
  }, h) => {
    var M;
    const p = je(), g = t || "div", { styleProps: x, rest: _ } = Ma(m), y = ca(), b = (M = y == null ? void 0 : y()) == null ? void 0 : M(x.sx), N = Ds(), R = Ja({
      styleProps: x,
      theme: p,
      data: Da
    }), T = {
      ref: h,
      style: ec({
        theme: p,
        style: e,
        vars: n,
        styleProps: R.inlineStyles
      }),
      className: Le(r, b, {
        [N]: R.hasResponsiveStyles,
        "mantine-light-hidden": l,
        "mantine-dark-hidden": u,
        [`mantine-hidden-from-${a}`]: a,
        [`mantine-visible-from-${c}`]: c
      }),
      "data-variant": s,
      "data-size": ks(o) ? void 0 : o || void 0,
      size: f,
      ...js(i),
      ..._
    };
    return /* @__PURE__ */ J(Be, { children: [
      R.hasResponsiveStyles && /* @__PURE__ */ w(
        Kn,
        {
          selector: `.${N}`,
          styles: R.styles,
          media: R.media
        }
      ),
      typeof d == "function" ? d(T) : /* @__PURE__ */ w(g, { ...T })
    ] });
  }
);
zs.displayName = "@mantine/core/Box";
const H = zs;
function Fs(t) {
  return t;
}
function tc(t) {
  const e = t;
  return (n) => {
    const r = de((s, i) => /* @__PURE__ */ w(e, { ...n, ...s, ref: i }));
    return r.extend = e.extend, r.displayName = `WithProps(${e.displayName})`, r;
  };
}
function re(t) {
  const e = de(t);
  return e.extend = Fs, e.withProps = (n) => {
    const r = de((s, i) => /* @__PURE__ */ w(e, { ...n, ...s, ref: i }));
    return r.extend = e.extend, r.displayName = `WithProps(${e.displayName})`, r;
  }, e;
}
function ze(t) {
  const e = de(t);
  return e.withProps = (n) => {
    const r = de((s, i) => /* @__PURE__ */ w(e, { ...n, ...s, ref: i }));
    return r.extend = e.extend, r.displayName = `WithProps(${e.displayName})`, r;
  }, e.extend = Fs, e;
}
const nc = wt({
  dir: "ltr",
  toggleDirection: () => {
  },
  setDirection: () => {
  }
});
function Qn() {
  return _t(nc);
}
function Qt() {
  return typeof window < "u";
}
function ct(t) {
  return Zs(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function le(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Re(t) {
  var e;
  return (e = (Zs(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Zs(t) {
  return Qt() ? t instanceof Node || t instanceof le(t).Node : !1;
}
function ne(t) {
  return Qt() ? t instanceof Element || t instanceof le(t).Element : !1;
}
function Ee(t) {
  return Qt() ? t instanceof HTMLElement || t instanceof le(t).HTMLElement : !1;
}
function Yr(t) {
  return !Qt() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof le(t).ShadowRoot;
}
function Ct(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r,
    display: s
  } = ye(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + n) && s !== "inline" && s !== "contents";
}
function rc(t) {
  return /^(table|td|th)$/.test(ct(t));
}
function en(t) {
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
const sc = /transform|translate|scale|rotate|perspective|filter/, ic = /paint|layout|strict|content/, Fe = (t) => !!t && t !== "none";
let Cn;
function er(t) {
  const e = ne(t) ? ye(t) : t;
  return Fe(e.transform) || Fe(e.translate) || Fe(e.scale) || Fe(e.rotate) || Fe(e.perspective) || !tr() && (Fe(e.backdropFilter) || Fe(e.filter)) || sc.test(e.willChange || "") || ic.test(e.contain || "");
}
function oc(t) {
  let e = De(t);
  for (; Ee(e) && !it(e); ) {
    if (er(e))
      return e;
    if (en(e))
      return null;
    e = De(e);
  }
  return null;
}
function tr() {
  return Cn == null && (Cn = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Cn;
}
function it(t) {
  return /^(html|body|#document)$/.test(ct(t));
}
function ye(t) {
  return le(t).getComputedStyle(t);
}
function tn(t) {
  return ne(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function De(t) {
  if (ct(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    Yr(t) && t.host || // Fallback.
    Re(t)
  );
  return Yr(e) ? e.host : e;
}
function Vs(t) {
  const e = De(t);
  return it(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Ee(e) && Ct(e) ? e : Vs(e);
}
function xt(t, e, n) {
  var r;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const s = Vs(t), i = s === ((r = t.ownerDocument) == null ? void 0 : r.body), o = le(s);
  if (i) {
    const a = Zn(o);
    return e.concat(o, o.visualViewport || [], Ct(s) ? s : [], a && n ? xt(a) : []);
  } else
    return e.concat(s, xt(s, [], n));
}
function Zn(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
const ve = Math.min, te = Math.max, Ht = Math.round, Pt = Math.floor, _e = (t) => ({
  x: t,
  y: t
}), ac = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Vn(t, e, n) {
  return te(t, ve(e, n));
}
function $e(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function be(t) {
  return t.split("-")[0];
}
function lt(t) {
  return t.split("-")[1];
}
function nr(t) {
  return t === "x" ? "y" : "x";
}
function rr(t) {
  return t === "y" ? "height" : "width";
}
function pe(t) {
  const e = t[0];
  return e === "t" || e === "b" ? "y" : "x";
}
function sr(t) {
  return nr(pe(t));
}
function cc(t, e, n) {
  n === void 0 && (n = !1);
  const r = lt(t), s = sr(t), i = rr(s);
  let o = s === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[i] > e.floating[i] && (o = Gt(o)), [o, Gt(o)];
}
function lc(t) {
  const e = Gt(t);
  return [Bn(t), e, Bn(e)];
}
function Bn(t) {
  return t.includes("start") ? t.replace("start", "end") : t.replace("end", "start");
}
const Xr = ["left", "right"], Kr = ["right", "left"], uc = ["top", "bottom"], dc = ["bottom", "top"];
function fc(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? Kr : Xr : e ? Xr : Kr;
    case "left":
    case "right":
      return e ? uc : dc;
    default:
      return [];
  }
}
function mc(t, e, n, r) {
  const s = lt(t);
  let i = fc(be(t), n === "start", r);
  return s && (i = i.map((o) => o + "-" + s), e && (i = i.concat(i.map(Bn)))), i;
}
function Gt(t) {
  const e = be(t);
  return ac[e] + t.slice(e.length);
}
function pc(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function ir(t) {
  return typeof t != "number" ? pc(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function ot(t) {
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
function Jr(t, e, n) {
  let {
    reference: r,
    floating: s
  } = t;
  const i = pe(e), o = sr(e), a = rr(o), c = be(e), l = i === "y", u = r.x + r.width / 2 - s.width / 2, d = r.y + r.height / 2 - s.height / 2, f = r[a] / 2 - s[a] / 2;
  let m;
  switch (c) {
    case "top":
      m = {
        x: u,
        y: r.y - s.height
      };
      break;
    case "bottom":
      m = {
        x: u,
        y: r.y + r.height
      };
      break;
    case "right":
      m = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      m = {
        x: r.x - s.width,
        y: d
      };
      break;
    default:
      m = {
        x: r.x,
        y: r.y
      };
  }
  switch (lt(e)) {
    case "start":
      m[o] -= f * (n && l ? -1 : 1);
      break;
    case "end":
      m[o] += f * (n && l ? -1 : 1);
      break;
  }
  return m;
}
async function hc(t, e) {
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
    altBoundary: f = !1,
    padding: m = 0
  } = $e(e, t), h = ir(m), g = a[f ? d === "floating" ? "reference" : "floating" : d], x = ot(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(g))) == null || n ? g : g.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: u,
    strategy: c
  })), _ = d === "floating" ? {
    x: r,
    y: s,
    width: o.floating.width,
    height: o.floating.height
  } : o.reference, y = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a.floating)), b = await (i.isElement == null ? void 0 : i.isElement(y)) ? await (i.getScale == null ? void 0 : i.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, N = ot(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: _,
    offsetParent: y,
    strategy: c
  }) : _);
  return {
    top: (x.top - N.top + h.top) / b.y,
    bottom: (N.bottom - x.bottom + h.bottom) / b.y,
    left: (x.left - N.left + h.left) / b.x,
    right: (N.right - x.right + h.right) / b.x
  };
}
const gc = 50, yc = async (t, e, n) => {
  const {
    placement: r = "bottom",
    strategy: s = "absolute",
    middleware: i = [],
    platform: o
  } = n, a = o.detectOverflow ? o : {
    ...o,
    detectOverflow: hc
  }, c = await (o.isRTL == null ? void 0 : o.isRTL(e));
  let l = await o.getElementRects({
    reference: t,
    floating: e,
    strategy: s
  }), {
    x: u,
    y: d
  } = Jr(l, r, c), f = r, m = 0;
  const h = {};
  for (let p = 0; p < i.length; p++) {
    const g = i[p];
    if (!g)
      continue;
    const {
      name: x,
      fn: _
    } = g, {
      x: y,
      y: b,
      data: N,
      reset: R
    } = await _({
      x: u,
      y: d,
      initialPlacement: r,
      placement: f,
      strategy: s,
      middlewareData: h,
      rects: l,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    u = y ?? u, d = b ?? d, h[x] = {
      ...h[x],
      ...N
    }, R && m < gc && (m++, typeof R == "object" && (R.placement && (f = R.placement), R.rects && (l = R.rects === !0 ? await o.getElementRects({
      reference: t,
      floating: e,
      strategy: s
    }) : R.rects), {
      x: u,
      y: d
    } = Jr(l, f, c)), p = -1);
  }
  return {
    x: u,
    y: d,
    placement: f,
    strategy: s,
    middlewareData: h
  };
}, vc = (t) => ({
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
    } = $e(t, e) || {};
    if (l == null)
      return {};
    const d = ir(u), f = {
      x: n,
      y: r
    }, m = sr(s), h = rr(m), p = await o.getDimensions(l), g = m === "y", x = g ? "top" : "left", _ = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = i.reference[h] + i.reference[m] - f[m] - i.floating[h], N = f[m] - i.reference[m], R = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l));
    let T = R ? R[y] : 0;
    (!T || !await (o.isElement == null ? void 0 : o.isElement(R))) && (T = a.floating[y] || i.floating[h]);
    const M = b / 2 - N / 2, j = T / 2 - p[h] / 2 - 1, $ = ve(d[x], j), G = ve(d[_], j), F = $, W = T - p[h] - G, V = T / 2 - p[h] / 2 + M, q = Vn(F, V, W), Z = !c.arrow && lt(s) != null && V !== q && i.reference[h] / 2 - (V < F ? $ : G) - p[h] / 2 < 0, U = Z ? V < F ? V - F : V - W : 0;
    return {
      [m]: f[m] + U,
      data: {
        [m]: q,
        centerOffset: V - q - U,
        ...Z && {
          alignmentOffset: U
        }
      },
      reset: Z
    };
  }
}), bc = function(t) {
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
        fallbackPlacements: f,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: h = "none",
        flipAlignment: p = !0,
        ...g
      } = $e(t, e);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const x = be(s), _ = pe(a), y = be(a) === a, b = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), N = f || (y || !p ? [Gt(a)] : lc(a)), R = h !== "none";
      !f && R && N.push(...mc(a, p, h, b));
      const T = [a, ...N], M = await c.detectOverflow(e, g), j = [];
      let $ = ((r = i.flip) == null ? void 0 : r.overflows) || [];
      if (u && j.push(M[x]), d) {
        const V = cc(s, o, b);
        j.push(M[V[0]], M[V[1]]);
      }
      if ($ = [...$, {
        placement: s,
        overflows: j
      }], !j.every((V) => V <= 0)) {
        var G, F;
        const V = (((G = i.flip) == null ? void 0 : G.index) || 0) + 1, q = T[V];
        if (q && (!(d === "alignment" ? _ !== pe(q) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        $.every((D) => pe(D.placement) === _ ? D.overflows[0] > 0 : !0)))
          return {
            data: {
              index: V,
              overflows: $
            },
            reset: {
              placement: q
            }
          };
        let Z = (F = $.filter((U) => U.overflows[0] <= 0).sort((U, D) => U.overflows[1] - D.overflows[1])[0]) == null ? void 0 : F.placement;
        if (!Z)
          switch (m) {
            case "bestFit": {
              var W;
              const U = (W = $.filter((D) => {
                if (R) {
                  const K = pe(D.placement);
                  return K === _ || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  K === "y";
                }
                return !0;
              }).map((D) => [D.placement, D.overflows.filter((K) => K > 0).reduce((K, se) => K + se, 0)]).sort((D, K) => D[1] - K[1])[0]) == null ? void 0 : W[0];
              U && (Z = U);
              break;
            }
            case "initialPlacement":
              Z = a;
              break;
          }
        if (s !== Z)
          return {
            reset: {
              placement: Z
            }
          };
      }
      return {};
    }
  };
};
function Bs(t) {
  const e = ve(...t.map((i) => i.left)), n = ve(...t.map((i) => i.top)), r = te(...t.map((i) => i.right)), s = te(...t.map((i) => i.bottom));
  return {
    x: e,
    y: n,
    width: r - e,
    height: s - n
  };
}
function xc(t) {
  const e = t.slice().sort((s, i) => s.y - i.y), n = [];
  let r = null;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    !r || i.y - r.y > r.height / 2 ? n.push([i]) : n[n.length - 1].push(i), r = i;
  }
  return n.map((s) => ot(Bs(s)));
}
const wc = function(t) {
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
      } = $e(t, e), u = Array.from(await (i.getClientRects == null ? void 0 : i.getClientRects(r.reference)) || []), d = xc(u), f = ot(Bs(u)), m = ir(a);
      function h() {
        if (d.length === 2 && d[0].left > d[1].right && c != null && l != null)
          return d.find((g) => c > g.left - m.left && c < g.right + m.right && l > g.top - m.top && l < g.bottom + m.bottom) || f;
        if (d.length >= 2) {
          if (pe(n) === "y") {
            const $ = d[0], G = d[d.length - 1], F = be(n) === "top", W = $.top, V = G.bottom, q = F ? $.left : G.left, Z = F ? $.right : G.right, U = Z - q, D = V - W;
            return {
              top: W,
              bottom: V,
              left: q,
              right: Z,
              width: U,
              height: D,
              x: q,
              y: W
            };
          }
          const g = be(n) === "left", x = te(...d.map(($) => $.right)), _ = ve(...d.map(($) => $.left)), y = d.filter(($) => g ? $.left === _ : $.right === x), b = y[0].top, N = y[y.length - 1].bottom, R = _, T = x, M = T - R, j = N - b;
          return {
            top: b,
            bottom: N,
            left: R,
            right: T,
            width: M,
            height: j,
            x: R,
            y: b
          };
        }
        return f;
      }
      const p = await i.getElementRects({
        reference: {
          getBoundingClientRect: h
        },
        floating: r.floating,
        strategy: o
      });
      return s.reference.x !== p.reference.x || s.reference.y !== p.reference.y || s.reference.width !== p.reference.width || s.reference.height !== p.reference.height ? {
        reset: {
          rects: p
        }
      } : {};
    }
  };
}, Ws = /* @__PURE__ */ new Set(["left", "top"]);
async function _c(t, e) {
  const {
    placement: n,
    platform: r,
    elements: s
  } = t, i = await (r.isRTL == null ? void 0 : r.isRTL(s.floating)), o = be(n), a = lt(n), c = pe(n) === "y", l = Ws.has(o) ? -1 : 1, u = i && c ? -1 : 1, d = $e(e, t);
  let {
    mainAxis: f,
    crossAxis: m,
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
  return a && typeof h == "number" && (m = a === "end" ? h * -1 : h), c ? {
    x: m * u,
    y: f * l
  } : {
    x: f * l,
    y: m * u
  };
}
const kc = function(t) {
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
      } = e, c = await _c(e, t);
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
}, Sc = function(t) {
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
          fn: (x) => {
            let {
              x: _,
              y
            } = x;
            return {
              x: _,
              y
            };
          }
        },
        ...l
      } = $e(t, e), u = {
        x: n,
        y: r
      }, d = await i.detectOverflow(e, l), f = pe(be(s)), m = nr(f);
      let h = u[m], p = u[f];
      if (o) {
        const x = m === "y" ? "top" : "left", _ = m === "y" ? "bottom" : "right", y = h + d[x], b = h - d[_];
        h = Vn(y, h, b);
      }
      if (a) {
        const x = f === "y" ? "top" : "left", _ = f === "y" ? "bottom" : "right", y = p + d[x], b = p - d[_];
        p = Vn(y, p, b);
      }
      const g = c.fn({
        ...e,
        [m]: h,
        [f]: p
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [m]: o,
            [f]: a
          }
        }
      };
    }
  };
}, Cc = function(t) {
  return t === void 0 && (t = {}), {
    options: t,
    fn(e) {
      const {
        x: n,
        y: r,
        placement: s,
        rects: i,
        middlewareData: o
      } = e, {
        offset: a = 0,
        mainAxis: c = !0,
        crossAxis: l = !0
      } = $e(t, e), u = {
        x: n,
        y: r
      }, d = pe(s), f = nr(d);
      let m = u[f], h = u[d];
      const p = $e(a, e), g = typeof p == "number" ? {
        mainAxis: p,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...p
      };
      if (c) {
        const y = f === "y" ? "height" : "width", b = i.reference[f] - i.floating[y] + g.mainAxis, N = i.reference[f] + i.reference[y] - g.mainAxis;
        m < b ? m = b : m > N && (m = N);
      }
      if (l) {
        var x, _;
        const y = f === "y" ? "width" : "height", b = Ws.has(be(s)), N = i.reference[d] - i.floating[y] + (b && ((x = o.offset) == null ? void 0 : x[d]) || 0) + (b ? 0 : g.crossAxis), R = i.reference[d] + i.reference[y] + (b ? 0 : ((_ = o.offset) == null ? void 0 : _[d]) || 0) - (b ? g.crossAxis : 0);
        h < N ? h = N : h > R && (h = R);
      }
      return {
        [f]: m,
        [d]: h
      };
    }
  };
}, Rc = function(t) {
  return t === void 0 && (t = {}), {
    name: "size",
    options: t,
    async fn(e) {
      var n, r;
      const {
        placement: s,
        rects: i,
        platform: o,
        elements: a
      } = e, {
        apply: c = () => {
        },
        ...l
      } = $e(t, e), u = await o.detectOverflow(e, l), d = be(s), f = lt(s), m = pe(s) === "y", {
        width: h,
        height: p
      } = i.floating;
      let g, x;
      d === "top" || d === "bottom" ? (g = d, x = f === (await (o.isRTL == null ? void 0 : o.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (x = d, g = f === "end" ? "top" : "bottom");
      const _ = p - u.top - u.bottom, y = h - u.left - u.right, b = ve(p - u[g], _), N = ve(h - u[x], y), R = !e.middlewareData.shift;
      let T = b, M = N;
      if ((n = e.middlewareData.shift) != null && n.enabled.x && (M = y), (r = e.middlewareData.shift) != null && r.enabled.y && (T = _), R && !f) {
        const $ = te(u.left, 0), G = te(u.right, 0), F = te(u.top, 0), W = te(u.bottom, 0);
        m ? M = h - 2 * ($ !== 0 || G !== 0 ? $ + G : te(u.left, u.right)) : T = p - 2 * (F !== 0 || W !== 0 ? F + W : te(u.top, u.bottom));
      }
      await c({
        ...e,
        availableWidth: M,
        availableHeight: T
      });
      const j = await o.getDimensions(a.floating);
      return h !== j.width || p !== j.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Us(t) {
  const e = ye(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const s = Ee(t), i = s ? t.offsetWidth : n, o = s ? t.offsetHeight : r, a = Ht(n) !== i || Ht(r) !== o;
  return a && (n = i, r = o), {
    width: n,
    height: r,
    $: a
  };
}
function or(t) {
  return ne(t) ? t : t.contextElement;
}
function Qe(t) {
  const e = or(t);
  if (!Ee(e))
    return _e(1);
  const n = e.getBoundingClientRect(), {
    width: r,
    height: s,
    $: i
  } = Us(e);
  let o = (i ? Ht(n.width) : n.width) / r, a = (i ? Ht(n.height) : n.height) / s;
  return (!o || !Number.isFinite(o)) && (o = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: o,
    y: a
  };
}
const Nc = /* @__PURE__ */ _e(0);
function Hs(t) {
  const e = le(t);
  return !tr() || !e.visualViewport ? Nc : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Tc(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== le(t) ? !1 : e;
}
function Ge(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const s = t.getBoundingClientRect(), i = or(t);
  let o = _e(1);
  e && (r ? ne(r) && (o = Qe(r)) : o = Qe(t));
  const a = Tc(i, n, r) ? Hs(i) : _e(0);
  let c = (s.left + a.x) / o.x, l = (s.top + a.y) / o.y, u = s.width / o.x, d = s.height / o.y;
  if (i) {
    const f = le(i), m = r && ne(r) ? le(r) : r;
    let h = f, p = Zn(h);
    for (; p && r && m !== h; ) {
      const g = Qe(p), x = p.getBoundingClientRect(), _ = ye(p), y = x.left + (p.clientLeft + parseFloat(_.paddingLeft)) * g.x, b = x.top + (p.clientTop + parseFloat(_.paddingTop)) * g.y;
      c *= g.x, l *= g.y, u *= g.x, d *= g.y, c += y, l += b, h = le(p), p = Zn(h);
    }
  }
  return ot({
    width: u,
    height: d,
    x: c,
    y: l
  });
}
function nn(t, e) {
  const n = tn(t).scrollLeft;
  return e ? e.left + n : Ge(Re(t)).left + n;
}
function Gs(t, e) {
  const n = t.getBoundingClientRect(), r = n.left + e.scrollLeft - nn(t, n), s = n.top + e.scrollTop;
  return {
    x: r,
    y: s
  };
}
function Ac(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: r,
    strategy: s
  } = t;
  const i = s === "fixed", o = Re(r), a = e ? en(e.floating) : !1;
  if (r === o || a && i)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = _e(1);
  const u = _e(0), d = Ee(r);
  if ((d || !d && !i) && ((ct(r) !== "body" || Ct(o)) && (c = tn(r)), d)) {
    const m = Ge(r);
    l = Qe(r), u.x = m.x + r.clientLeft, u.y = m.y + r.clientTop;
  }
  const f = o && !d && !i ? Gs(o, c) : _e(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
  };
}
function Oc(t) {
  return Array.from(t.getClientRects());
}
function $c(t) {
  const e = Re(t), n = tn(t), r = t.ownerDocument.body, s = te(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), i = te(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -n.scrollLeft + nn(t);
  const a = -n.scrollTop;
  return ye(r).direction === "rtl" && (o += te(e.clientWidth, r.clientWidth) - s), {
    width: s,
    height: i,
    x: o,
    y: a
  };
}
const Qr = 25;
function Ec(t, e) {
  const n = le(t), r = Re(t), s = n.visualViewport;
  let i = r.clientWidth, o = r.clientHeight, a = 0, c = 0;
  if (s) {
    i = s.width, o = s.height;
    const u = tr();
    (!u || u && e === "fixed") && (a = s.offsetLeft, c = s.offsetTop);
  }
  const l = nn(r);
  if (l <= 0) {
    const u = r.ownerDocument, d = u.body, f = getComputedStyle(d), m = u.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, h = Math.abs(r.clientWidth - d.clientWidth - m);
    h <= Qr && (i -= h);
  } else l <= Qr && (i += l);
  return {
    width: i,
    height: o,
    x: a,
    y: c
  };
}
function Pc(t, e) {
  const n = Ge(t, !0, e === "fixed"), r = n.top + t.clientTop, s = n.left + t.clientLeft, i = Ee(t) ? Qe(t) : _e(1), o = t.clientWidth * i.x, a = t.clientHeight * i.y, c = s * i.x, l = r * i.y;
  return {
    width: o,
    height: a,
    x: c,
    y: l
  };
}
function es(t, e, n) {
  let r;
  if (e === "viewport")
    r = Ec(t, n);
  else if (e === "document")
    r = $c(Re(t));
  else if (ne(e))
    r = Pc(e, n);
  else {
    const s = Hs(t);
    r = {
      x: e.x - s.x,
      y: e.y - s.y,
      width: e.width,
      height: e.height
    };
  }
  return ot(r);
}
function qs(t, e) {
  const n = De(t);
  return n === e || !ne(n) || it(n) ? !1 : ye(n).position === "fixed" || qs(n, e);
}
function Ic(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let r = xt(t, [], !1).filter((a) => ne(a) && ct(a) !== "body"), s = null;
  const i = ye(t).position === "fixed";
  let o = i ? De(t) : t;
  for (; ne(o) && !it(o); ) {
    const a = ye(o), c = er(o);
    !c && a.position === "fixed" && (s = null), (i ? !c && !s : !c && a.position === "static" && !!s && (s.position === "absolute" || s.position === "fixed") || Ct(o) && !c && qs(t, o)) ? r = r.filter((u) => u !== o) : s = a, o = De(o);
  }
  return e.set(t, r), r;
}
function Mc(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: s
  } = t;
  const o = [...n === "clippingAncestors" ? en(e) ? [] : Ic(e, this._c) : [].concat(n), r], a = es(e, o[0], s);
  let c = a.top, l = a.right, u = a.bottom, d = a.left;
  for (let f = 1; f < o.length; f++) {
    const m = es(e, o[f], s);
    c = te(m.top, c), l = ve(m.right, l), u = ve(m.bottom, u), d = te(m.left, d);
  }
  return {
    width: l - d,
    height: u - c,
    x: d,
    y: c
  };
}
function Dc(t) {
  const {
    width: e,
    height: n
  } = Us(t);
  return {
    width: e,
    height: n
  };
}
function Lc(t, e, n) {
  const r = Ee(e), s = Re(e), i = n === "fixed", o = Ge(t, !0, i, e);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = _e(0);
  function l() {
    c.x = nn(s);
  }
  if (r || !r && !i)
    if ((ct(e) !== "body" || Ct(s)) && (a = tn(e)), r) {
      const m = Ge(e, !0, i, e);
      c.x = m.x + e.clientLeft, c.y = m.y + e.clientTop;
    } else s && l();
  i && !r && s && l();
  const u = s && !r && !i ? Gs(s, a) : _e(0), d = o.left + a.scrollLeft - c.x - u.x, f = o.top + a.scrollTop - c.y - u.y;
  return {
    x: d,
    y: f,
    width: o.width,
    height: o.height
  };
}
function Rn(t) {
  return ye(t).position === "static";
}
function ts(t, e) {
  if (!Ee(t) || ye(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return Re(t) === n && (n = n.ownerDocument.body), n;
}
function Ys(t, e) {
  const n = le(t);
  if (en(t))
    return n;
  if (!Ee(t)) {
    let s = De(t);
    for (; s && !it(s); ) {
      if (ne(s) && !Rn(s))
        return s;
      s = De(s);
    }
    return n;
  }
  let r = ts(t, e);
  for (; r && rc(r) && Rn(r); )
    r = ts(r, e);
  return r && it(r) && Rn(r) && !er(r) ? n : r || oc(t) || n;
}
const jc = async function(t) {
  const e = this.getOffsetParent || Ys, n = this.getDimensions, r = await n(t.floating);
  return {
    reference: Lc(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function zc(t) {
  return ye(t).direction === "rtl";
}
const Fc = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ac,
  getDocumentElement: Re,
  getClippingRect: Mc,
  getOffsetParent: Ys,
  getElementRects: jc,
  getClientRects: Oc,
  getDimensions: Dc,
  getScale: Qe,
  isElement: ne,
  isRTL: zc
};
function Xs(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Zc(t, e) {
  let n = null, r;
  const s = Re(t);
  function i() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function o(a, c) {
    a === void 0 && (a = !1), c === void 0 && (c = 1), i();
    const l = t.getBoundingClientRect(), {
      left: u,
      top: d,
      width: f,
      height: m
    } = l;
    if (a || e(), !f || !m)
      return;
    const h = Pt(d), p = Pt(s.clientWidth - (u + f)), g = Pt(s.clientHeight - (d + m)), x = Pt(u), y = {
      rootMargin: -h + "px " + -p + "px " + -g + "px " + -x + "px",
      threshold: te(0, ve(1, c)) || 1
    };
    let b = !0;
    function N(R) {
      const T = R[0].intersectionRatio;
      if (T !== c) {
        if (!b)
          return o();
        T ? o(!1, T) : r = setTimeout(() => {
          o(!1, 1e-7);
        }, 1e3);
      }
      T === 1 && !Xs(l, t.getBoundingClientRect()) && o(), b = !1;
    }
    try {
      n = new IntersectionObserver(N, {
        ...y,
        // Handle <iframe>s
        root: s.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(N, y);
    }
    n.observe(t);
  }
  return o(!0), i;
}
function Vc(t, e, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: s = !0,
    ancestorResize: i = !0,
    elementResize: o = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = or(t), u = s || i ? [...l ? xt(l) : [], ...e ? xt(e) : []] : [];
  u.forEach((x) => {
    s && x.addEventListener("scroll", n, {
      passive: !0
    }), i && x.addEventListener("resize", n);
  });
  const d = l && a ? Zc(l, n) : null;
  let f = -1, m = null;
  o && (m = new ResizeObserver((x) => {
    let [_] = x;
    _ && _.target === l && m && e && (m.unobserve(e), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var y;
      (y = m) == null || y.observe(e);
    })), n();
  }), l && !c && m.observe(l), e && m.observe(e));
  let h, p = c ? Ge(t) : null;
  c && g();
  function g() {
    const x = Ge(t);
    p && !Xs(p, x) && n(), p = x, h = requestAnimationFrame(g);
  }
  return n(), () => {
    var x;
    u.forEach((_) => {
      s && _.removeEventListener("scroll", n), i && _.removeEventListener("resize", n);
    }), d == null || d(), (x = m) == null || x.disconnect(), m = null, c && cancelAnimationFrame(h);
  };
}
const Bc = kc, Wc = Sc, Uc = bc, Hc = Rc, ns = vc, Gc = wc, qc = Cc, Yc = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), s = {
    platform: Fc,
    ...n
  }, i = {
    ...s.platform,
    _c: r
  };
  return yc(t, e, {
    ...s,
    platform: i
  });
};
var Xc = typeof document < "u", Kc = function() {
}, Mt = Xc ? Hn : Kc;
function qt(t, e) {
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
        if (!qt(t[r], e[r]))
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
      if (!(i === "_owner" && t.$$typeof) && !qt(t[i], e[i]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}
function Ks(t) {
  return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function rs(t, e) {
  const n = Ks(t);
  return Math.round(e * n) / n;
}
function Nn(t) {
  const e = P.useRef(t);
  return Mt(() => {
    e.current = t;
  }), e;
}
function Jc(t) {
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
  } = t, [u, d] = P.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: e,
    middlewareData: {},
    isPositioned: !1
  }), [f, m] = P.useState(r);
  qt(f, r) || m(r);
  const [h, p] = P.useState(null), [g, x] = P.useState(null), _ = P.useCallback((D) => {
    D !== R.current && (R.current = D, p(D));
  }, []), y = P.useCallback((D) => {
    D !== T.current && (T.current = D, x(D));
  }, []), b = i || h, N = o || g, R = P.useRef(null), T = P.useRef(null), M = P.useRef(u), j = c != null, $ = Nn(c), G = Nn(s), F = Nn(l), W = P.useCallback(() => {
    if (!R.current || !T.current)
      return;
    const D = {
      placement: e,
      strategy: n,
      middleware: f
    };
    G.current && (D.platform = G.current), Yc(R.current, T.current, D).then((K) => {
      const se = {
        ...K,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: F.current !== !1
      };
      V.current && !qt(M.current, se) && (M.current = se, Ni.flushSync(() => {
        d(se);
      }));
    });
  }, [f, e, n, G, F]);
  Mt(() => {
    l === !1 && M.current.isPositioned && (M.current.isPositioned = !1, d((D) => ({
      ...D,
      isPositioned: !1
    })));
  }, [l]);
  const V = P.useRef(!1);
  Mt(() => (V.current = !0, () => {
    V.current = !1;
  }), []), Mt(() => {
    if (b && (R.current = b), N && (T.current = N), b && N) {
      if ($.current)
        return $.current(b, N, W);
      W();
    }
  }, [b, N, W, $, j]);
  const q = P.useMemo(() => ({
    reference: R,
    floating: T,
    setReference: _,
    setFloating: y
  }), [_, y]), Z = P.useMemo(() => ({
    reference: b,
    floating: N
  }), [b, N]), U = P.useMemo(() => {
    const D = {
      position: n,
      left: 0,
      top: 0
    };
    if (!Z.floating)
      return D;
    const K = rs(Z.floating, u.x), se = rs(Z.floating, u.y);
    return a ? {
      ...D,
      transform: "translate(" + K + "px, " + se + "px)",
      ...Ks(Z.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: K,
      top: se
    };
  }, [n, a, Z.floating, u.x, u.y]);
  return P.useMemo(() => ({
    ...u,
    update: W,
    refs: q,
    elements: Z,
    floatingStyles: U
  }), [u, W, q, Z, U]);
}
const Qc = (t) => {
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
      return r && e(r) ? r.current != null ? ns({
        element: r.current,
        padding: s
      }).fn(n) : {} : r ? ns({
        element: r,
        padding: s
      }).fn(n) : {};
    }
  };
}, el = (t, e) => {
  const n = Bc(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, tl = (t, e) => {
  const n = Wc(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, ss = (t, e) => ({
  fn: qc(t).fn,
  options: [t, e]
}), is = (t, e) => {
  const n = Uc(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, nl = (t, e) => {
  const n = Hc(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, os = (t, e) => {
  const n = Gc(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, rl = (t, e) => {
  const n = Qc(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Js = {
  ...P
}, sl = Js.useInsertionEffect, il = sl || ((t) => t());
function ol(t) {
  const e = P.useRef(() => {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Cannot call an event handler while rendering.");
  });
  return il(() => {
    e.current = t;
  }), P.useCallback(function() {
    for (var n = arguments.length, r = new Array(n), s = 0; s < n; s++)
      r[s] = arguments[s];
    return e.current == null ? void 0 : e.current(...r);
  }, []);
}
var Wn = typeof document < "u" ? Hn : ke;
let as = !1, al = 0;
const cs = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + al++
);
function cl() {
  const [t, e] = P.useState(() => as ? cs() : void 0);
  return Wn(() => {
    t == null && e(cs());
  }, []), P.useEffect(() => {
    as = !0;
  }, []), t;
}
const ll = Js.useId, ul = ll || cl;
let Un;
process.env.NODE_ENV !== "production" && (Un = /* @__PURE__ */ new Set());
function dl() {
  for (var t, e = arguments.length, n = new Array(e), r = 0; r < e; r++)
    n[r] = arguments[r];
  const s = "Floating UI: " + n.join(" ");
  if (!((t = Un) != null && t.has(s))) {
    var i;
    (i = Un) == null || i.add(s), console.error(s);
  }
}
function fl() {
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
const ml = /* @__PURE__ */ P.createContext(null), pl = /* @__PURE__ */ P.createContext(null), hl = () => {
  var t;
  return ((t = P.useContext(ml)) == null ? void 0 : t.id) || null;
}, gl = () => P.useContext(pl);
function yl(t) {
  const {
    open: e = !1,
    onOpenChange: n,
    elements: r
  } = t, s = ul(), i = P.useRef({}), [o] = P.useState(() => fl()), a = hl() != null;
  if (process.env.NODE_ENV !== "production") {
    const m = r.reference;
    m && !ne(m) && dl("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
  }
  const [c, l] = P.useState(r.reference), u = ol((m, h, p) => {
    i.current.openEvent = m ? h : void 0, o.emit("openchange", {
      open: m,
      event: h,
      reason: p,
      nested: a
    }), n == null || n(m, h, p);
  }), d = P.useMemo(() => ({
    setPositionReference: l
  }), []), f = P.useMemo(() => ({
    reference: c || r.reference || null,
    floating: r.floating || null,
    domReference: r.reference
  }), [c, r.reference, r.floating]);
  return P.useMemo(() => ({
    dataRef: i,
    open: e,
    onOpenChange: u,
    elements: f,
    events: o,
    floatingId: s,
    refs: d
  }), [e, u, f, o, s, d]);
}
function vl(t) {
  t === void 0 && (t = {});
  const {
    nodeId: e
  } = t, n = yl({
    ...t,
    elements: {
      reference: null,
      floating: null,
      ...t.elements
    }
  }), r = t.rootContext || n, s = r.elements, [i, o] = P.useState(null), [a, c] = P.useState(null), u = (s == null ? void 0 : s.domReference) || i, d = P.useRef(null), f = gl();
  Wn(() => {
    u && (d.current = u);
  }, [u]);
  const m = Jc({
    ...t,
    elements: {
      ...s,
      ...a && {
        reference: a
      }
    }
  }), h = P.useCallback((y) => {
    const b = ne(y) ? {
      getBoundingClientRect: () => y.getBoundingClientRect(),
      contextElement: y
    } : y;
    c(b), m.refs.setReference(b);
  }, [m.refs]), p = P.useCallback((y) => {
    (ne(y) || y === null) && (d.current = y, o(y)), (ne(m.refs.reference.current) || m.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    y !== null && !ne(y)) && m.refs.setReference(y);
  }, [m.refs]), g = P.useMemo(() => ({
    ...m.refs,
    setReference: p,
    setPositionReference: h,
    domReference: d
  }), [m.refs, p, h]), x = P.useMemo(() => ({
    ...m.elements,
    domReference: u
  }), [m.elements, u]), _ = P.useMemo(() => ({
    ...m,
    ...r,
    refs: g,
    elements: x,
    nodeId: e
  }), [m, g, x, e, r]);
  return Wn(() => {
    r.dataRef.current.floatingContext = _;
    const y = f == null ? void 0 : f.nodesRef.current.find((b) => b.id === e);
    y && (y.context = _);
  }), P.useMemo(() => ({
    ...m,
    context: _,
    refs: g,
    elements: x
  }), [m, g, x, _]);
}
var Qs = { root: "m_87cf2631" };
const bl = {
  __staticSelector: "UnstyledButton"
}, Rt = ze(
  (t, e) => {
    const n = B("UnstyledButton", bl, t), {
      className: r,
      component: s = "button",
      __staticSelector: i,
      unstyled: o,
      classNames: a,
      styles: c,
      style: l,
      ...u
    } = n, d = Q({
      name: i,
      props: n,
      classes: Qs,
      className: r,
      style: l,
      classNames: a,
      styles: c,
      unstyled: o
    });
    return /* @__PURE__ */ w(
      H,
      {
        ...d("root", { focusable: !0 }),
        component: s,
        ref: e,
        type: s === "button" ? "button" : void 0,
        ...u
      }
    );
  }
);
Rt.classes = Qs;
Rt.displayName = "@mantine/core/UnstyledButton";
var ei = { root: "m_515a97f8" };
const xl = {}, ar = re((t, e) => {
  const n = B("VisuallyHidden", xl, t), { classNames: r, className: s, style: i, styles: o, unstyled: a, vars: c, ...l } = n, u = Q({
    name: "VisuallyHidden",
    classes: ei,
    props: n,
    className: s,
    style: i,
    classNames: r,
    styles: o,
    unstyled: a
  });
  return /* @__PURE__ */ w(H, { component: "span", ref: e, ...u("root"), ...l });
});
ar.classes = ei;
ar.displayName = "@mantine/core/VisuallyHidden";
var ti = { root: "m_1b7284a3" };
const wl = {}, _l = (t, { radius: e, shadow: n }) => ({
  root: {
    "--paper-radius": e === void 0 ? void 0 : at(e),
    "--paper-shadow": Rs(n)
  }
}), cr = ze((t, e) => {
  const n = B("Paper", wl, t), {
    classNames: r,
    className: s,
    style: i,
    styles: o,
    unstyled: a,
    withBorder: c,
    vars: l,
    radius: u,
    shadow: d,
    variant: f,
    mod: m,
    ...h
  } = n, p = Q({
    name: "Paper",
    props: n,
    classes: ti,
    className: s,
    style: i,
    classNames: r,
    styles: o,
    unstyled: a,
    vars: l,
    varsResolver: _l
  });
  return /* @__PURE__ */ w(
    H,
    {
      ref: e,
      mod: [{ "data-with-border": c }, m],
      ...p("root"),
      variant: f,
      ...h
    }
  );
});
cr.classes = ti;
cr.displayName = "@mantine/core/Paper";
function kl(t, e) {
  if (t === "rtl" && (e.includes("right") || e.includes("left"))) {
    const [n, r] = e.split("-"), s = n === "right" ? "left" : "right";
    return r === void 0 ? s : `${s}-${r}`;
  }
  return e;
}
function ls(t, e, n, r) {
  return t === "center" || r === "center" ? { top: e } : t === "end" ? { bottom: n } : t === "start" ? { top: n } : {};
}
function us(t, e, n, r, s) {
  return t === "center" || r === "center" ? { left: e } : t === "end" ? { [s === "ltr" ? "right" : "left"]: n } : t === "start" ? { [s === "ltr" ? "left" : "right"]: n } : {};
}
const Sl = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius"
};
function Cl({
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
    [Sl[c]]: r
  }, d = -e / 2;
  return c === "left" ? {
    ...u,
    ...ls(l, o, n, s),
    right: d,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    clipPath: "polygon(100% 0, 0 0, 100% 100%)"
  } : c === "right" ? {
    ...u,
    ...ls(l, o, n, s),
    left: d,
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    clipPath: "polygon(0 100%, 0 0, 100% 100%)"
  } : c === "top" ? {
    ...u,
    ...us(l, i, n, s, a),
    bottom: d,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    clipPath: "polygon(0 100%, 100% 100%, 100% 0)"
  } : c === "bottom" ? {
    ...u,
    ...us(l, i, n, s, a),
    top: d,
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    clipPath: "polygon(0 100%, 0 0, 100% 0)"
  } : {};
}
const ni = de(
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
    const { dir: d } = Qn();
    return i ? /* @__PURE__ */ w(
      "div",
      {
        ...l,
        ref: u,
        style: {
          ...c,
          ...Cl({
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
ni.displayName = "@mantine/core/FloatingArrow";
var ri = { root: "m_9814e45f" };
const Rl = {
  zIndex: Ss("modal")
}, Nl = (t, { gradient: e, color: n, backgroundOpacity: r, blur: s, radius: i, zIndex: o }) => ({
  root: {
    "--overlay-bg": e || (n !== void 0 || r !== void 0) && va(n || "#000", r ?? 0.6) || void 0,
    "--overlay-filter": s ? `blur(${fe(s)})` : void 0,
    "--overlay-radius": i === void 0 ? void 0 : at(i),
    "--overlay-z-index": o == null ? void 0 : o.toString()
  }
}), lr = ze((t, e) => {
  const n = B("Overlay", Rl, t), {
    classNames: r,
    className: s,
    style: i,
    styles: o,
    unstyled: a,
    vars: c,
    fixed: l,
    center: u,
    children: d,
    radius: f,
    zIndex: m,
    gradient: h,
    blur: p,
    color: g,
    backgroundOpacity: x,
    mod: _,
    ...y
  } = n, b = Q({
    name: "Overlay",
    props: n,
    classes: ri,
    className: s,
    style: i,
    classNames: r,
    styles: o,
    unstyled: a,
    vars: c,
    varsResolver: Nl
  });
  return /* @__PURE__ */ w(H, { ref: e, ...b("root"), mod: [{ center: u, fixed: l }, _], ...y, children: d });
});
lr.classes = ri;
lr.displayName = "@mantine/core/Overlay";
function Tn(t) {
  const e = document.createElement("div");
  return e.setAttribute("data-portal", "true"), typeof t.className == "string" && e.classList.add(...t.className.split(" ").filter(Boolean)), typeof t.style == "object" && Object.assign(e.style, t.style), typeof t.id == "string" && e.setAttribute("id", t.id), e;
}
function Tl({
  target: t,
  reuseTargetNode: e,
  ...n
}) {
  if (t)
    return typeof t == "string" ? document.querySelector(t) || Tn(n) : t;
  if (e) {
    const r = document.querySelector("[data-mantine-shared-portal-node]");
    if (r)
      return r;
    const s = Tn(n);
    return s.setAttribute("data-mantine-shared-portal-node", "true"), document.body.appendChild(s), s;
  }
  return Tn(n);
}
const Al = {}, si = re((t, e) => {
  const { children: n, target: r, reuseTargetNode: s, ...i } = B("Portal", Al, t), [o, a] = ge(!1), c = oe(null);
  return Ns(() => (a(!0), c.current = Tl({ target: r, reuseTargetNode: s, ...i }), jn(e, c.current), !r && !s && c.current && document.body.appendChild(c.current), () => {
    !r && !s && c.current && document.body.removeChild(c.current);
  }), [r]), !o || !c.current ? null : Ai(/* @__PURE__ */ w(Be, { children: n }), c.current);
});
si.displayName = "@mantine/core/Portal";
const ur = re(
  ({ withinPortal: t = !0, children: e, ...n }, r) => Ps() === "test" || !t ? /* @__PURE__ */ w(Be, { children: e }) : /* @__PURE__ */ w(si, { ref: r, ...n, children: e })
);
ur.displayName = "@mantine/core/OptionalPortal";
const gt = (t) => ({
  in: { opacity: 1, transform: "scale(1)" },
  out: { opacity: 0, transform: `scale(.9) translateY(${t === "bottom" ? 10 : -10}px)` },
  transitionProperty: "transform, opacity"
}), It = {
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
    ...gt("bottom"),
    common: { transformOrigin: "center center" }
  },
  "pop-bottom-left": {
    ...gt("bottom"),
    common: { transformOrigin: "bottom left" }
  },
  "pop-bottom-right": {
    ...gt("bottom"),
    common: { transformOrigin: "bottom right" }
  },
  "pop-top-left": {
    ...gt("top"),
    common: { transformOrigin: "top left" }
  },
  "pop-top-right": {
    ...gt("top"),
    common: { transformOrigin: "top right" }
  }
}, ds = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function Ol({
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
  return typeof t == "string" ? t in It ? {
    transitionProperty: It[t].transitionProperty,
    ...s,
    ...It[t].common,
    ...It[t][ds[e]]
  } : {} : {
    transitionProperty: t.transitionProperty,
    ...s,
    ...t.common,
    ...t[ds[e]]
  };
}
function $l({
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
  const u = je(), d = Qo(), f = u.respectReducedMotion ? d : !1, [m, h] = ge(f ? 0 : t), [p, g] = ge(r ? "entered" : "exited"), x = oe(-1), _ = oe(-1), y = oe(-1);
  function b() {
    window.clearTimeout(x.current), window.clearTimeout(_.current), cancelAnimationFrame(y.current);
  }
  const N = (T) => {
    b();
    const M = T ? s : i, j = T ? o : a, $ = f ? 0 : T ? t : e;
    h($), $ === 0 ? (typeof M == "function" && M(), typeof j == "function" && j(), g(T ? "entered" : "exited")) : y.current = requestAnimationFrame(() => {
      Ti.flushSync(() => {
        g(T ? "pre-entering" : "pre-exiting");
      }), y.current = requestAnimationFrame(() => {
        typeof M == "function" && M(), g(T ? "entering" : "exiting"), x.current = window.setTimeout(() => {
          typeof j == "function" && j(), g(T ? "entered" : "exited");
        }, $);
      });
    });
  }, R = (T) => {
    if (b(), typeof (T ? c : l) != "number") {
      N(T);
      return;
    }
    _.current = window.setTimeout(
      () => {
        N(T);
      },
      T ? c : l
    );
  };
  return He(() => {
    R(r);
  }, [r]), ke(
    () => () => {
      b();
    },
    []
  ), {
    transitionDuration: m,
    transitionStatus: p,
    transitionTimingFunction: n || "ease"
  };
}
function rn({
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
  exitDelay: f
}) {
  const m = Ps(), { transitionDuration: h, transitionStatus: p, transitionTimingFunction: g } = $l({
    mounted: s,
    exitDuration: r,
    duration: n,
    timingFunction: o,
    onExit: a,
    onEntered: c,
    onEnter: l,
    onExited: u,
    enterDelay: d,
    exitDelay: f
  });
  return h === 0 || m === "test" ? s ? /* @__PURE__ */ w(Be, { children: i({}) }) : t ? i({ display: "none" }) : null : p === "exited" ? t ? i({ display: "none" }) : null : /* @__PURE__ */ w(Be, { children: i(
    Ol({
      transition: e,
      duration: h,
      state: p,
      timingFunction: g
    })
  ) });
}
rn.displayName = "@mantine/core/Transition";
const [El, ii] = Xn(
  "Popover component was not found in the tree"
);
function dr({
  children: t,
  active: e = !0,
  refProp: n = "ref",
  innerRef: r
}) {
  const s = qo(e), i = St(s, r);
  return Yn(t) ? Yt(t, { [n]: i }) : t;
}
function oi(t) {
  return /* @__PURE__ */ w(ar, { tabIndex: -1, "data-autofocus": !0, ...t });
}
dr.displayName = "@mantine/core/FocusTrap";
oi.displayName = "@mantine/core/FocusTrapInitialFocus";
dr.InitialFocus = oi;
var ai = { dropdown: "m_38a85659", arrow: "m_a31dc6c1", overlay: "m_3d7bc908" };
const Pl = {}, fr = re((t, e) => {
  var g, x, _, y;
  const n = B("PopoverDropdown", Pl, t), {
    className: r,
    style: s,
    vars: i,
    children: o,
    onKeyDownCapture: a,
    variant: c,
    classNames: l,
    styles: u,
    ...d
  } = n, f = ii(), m = Vo({
    opened: f.opened,
    shouldReturnFocus: f.returnFocus
  }), h = f.withRoles ? {
    "aria-labelledby": f.getTargetId(),
    id: f.getDropdownId(),
    role: "dialog",
    tabIndex: -1
  } : {}, p = St(e, f.floating);
  return f.disabled ? null : /* @__PURE__ */ w(ur, { ...f.portalProps, withinPortal: f.withinPortal, children: /* @__PURE__ */ w(
    rn,
    {
      mounted: f.opened,
      ...f.transitionProps,
      transition: ((g = f.transitionProps) == null ? void 0 : g.transition) || "fade",
      duration: ((x = f.transitionProps) == null ? void 0 : x.duration) ?? 150,
      keepMounted: f.keepMounted,
      exitDuration: typeof ((_ = f.transitionProps) == null ? void 0 : _.exitDuration) == "number" ? f.transitionProps.exitDuration : (y = f.transitionProps) == null ? void 0 : y.duration,
      children: (b) => /* @__PURE__ */ w(dr, { active: f.trapFocus && f.opened, innerRef: p, children: /* @__PURE__ */ J(
        H,
        {
          ...h,
          ...d,
          variant: c,
          onKeyDownCapture: $o(
            () => {
              var N, R;
              (N = f.onClose) == null || N.call(f), (R = f.onDismiss) == null || R.call(f);
            },
            {
              active: f.closeOnEscape,
              onTrigger: m,
              onKeyDown: a
            }
          ),
          "data-position": f.placement,
          "data-fixed": f.floatingStrategy === "fixed" || void 0,
          ...f.getStyles("dropdown", {
            className: r,
            props: n,
            classNames: l,
            styles: u,
            style: [
              {
                ...b,
                zIndex: f.zIndex,
                top: f.y ?? 0,
                left: f.x ?? 0,
                width: f.width === "target" ? void 0 : fe(f.width)
              },
              f.resolvedStyles.dropdown,
              u == null ? void 0 : u.dropdown,
              s
            ]
          }),
          children: [
            o,
            /* @__PURE__ */ w(
              ni,
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
                  styles: u
                })
              }
            )
          ]
        }
      ) })
    }
  ) });
});
fr.classes = ai;
fr.displayName = "@mantine/core/PopoverDropdown";
const Il = {
  refProp: "ref",
  popupType: "dialog"
}, ci = re((t, e) => {
  const { children: n, refProp: r, popupType: s, ...i } = B(
    "PopoverTarget",
    Il,
    t
  );
  if (!Yn(n))
    throw new Error(
      "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const o = i, a = ii(), c = St(a.reference, ea(n), e), l = a.withRoles ? {
    "aria-haspopup": s,
    "aria-expanded": a.opened,
    "aria-controls": a.getDropdownId(),
    id: a.getTargetId()
  } : {};
  return Yt(n, {
    ...o,
    ...l,
    ...a.targetProps,
    className: Le(
      a.targetProps.className,
      o.className,
      n.props.className
    ),
    [r]: c,
    ...a.controlled ? null : { onClick: a.onToggle }
  });
});
ci.displayName = "@mantine/core/PopoverTarget";
function Ml({
  opened: t,
  floating: e,
  position: n,
  positionDependencies: r
}) {
  const [s, i] = ge(0);
  ke(() => {
    if (e.refs.reference.current && e.refs.floating.current && t)
      return Vc(
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
  ]), He(() => {
    e.update();
  }, r), He(() => {
    i((o) => o + 1);
  }, [t]);
}
function Dl(t) {
  if (t === void 0)
    return { shift: !0, flip: !0 };
  const e = { ...t };
  return t.shift === void 0 && (e.shift = !0), t.flip === void 0 && (e.flip = !0), e;
}
function Ll(t, e) {
  const n = Dl(t.middlewares), r = [el(t.offset)];
  return n.shift && r.push(
    tl(
      typeof n.shift == "boolean" ? { limiter: ss(), padding: 5 } : { limiter: ss(), padding: 5, ...n.shift }
    )
  ), n.flip && r.push(
    typeof n.flip == "boolean" ? is() : is(n.flip)
  ), n.inline && r.push(
    typeof n.inline == "boolean" ? os() : os(n.inline)
  ), r.push(rl({ element: t.arrowRef, padding: t.arrowOffset })), (n.size || t.width === "target") && r.push(
    nl({
      ...typeof n.size == "boolean" ? {} : n.size,
      apply({ rects: s, availableWidth: i, availableHeight: o, ...a }) {
        var u;
        const l = ((u = e().refs.floating.current) == null ? void 0 : u.style) ?? {};
        n.size && (typeof n.size == "object" && n.size.apply ? n.size.apply({ rects: s, availableWidth: i, availableHeight: o, ...a }) : Object.assign(l, {
          maxWidth: `${i}px`,
          maxHeight: `${o}px`
        })), t.width === "target" && Object.assign(l, {
          width: `${s.reference.width}px`
        });
      }
    })
  ), r;
}
function jl(t) {
  const [e, n] = $s({
    value: t.opened,
    defaultValue: t.defaultOpened,
    finalValue: !1,
    onChange: t.onChange
  }), r = oe(e), s = () => {
    e && !t.disabled && n(!1);
  }, i = () => !t.disabled && n(!e), o = vl({
    strategy: t.strategy,
    placement: t.position,
    middleware: Ll(t, () => o)
  });
  return Ml({
    opened: e,
    position: t.position,
    positionDependencies: t.positionDependencies || [],
    floating: o
  }), He(() => {
    var a;
    (a = t.onPositionChange) == null || a.call(t, o.placement);
  }, [o.placement]), He(() => {
    var a, c;
    e !== r.current && (e ? (c = t.onOpen) == null || c.call(t) : (a = t.onClose) == null || a.call(t)), r.current = e;
  }, [e, t.onClose, t.onOpen]), {
    floating: o,
    controlled: typeof t.opened == "boolean",
    opened: e,
    onClose: s,
    onToggle: i
  };
}
const zl = {
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
  zIndex: Ss("popover"),
  __staticSelector: "Popover",
  width: "max-content"
}, Fl = (t, { radius: e, shadow: n }) => ({
  dropdown: {
    "--popover-radius": e === void 0 ? void 0 : at(e),
    "--popover-shadow": Rs(n)
  }
});
function Ye(t) {
  var Sr, Cr, Rr, Nr, Tr, Ar;
  const e = B("Popover", zl, t), {
    children: n,
    position: r,
    offset: s,
    onPositionChange: i,
    positionDependencies: o,
    opened: a,
    transitionProps: c,
    onExitTransitionEnd: l,
    onEnterTransitionEnd: u,
    width: d,
    middlewares: f,
    withArrow: m,
    arrowSize: h,
    arrowOffset: p,
    arrowRadius: g,
    arrowPosition: x,
    unstyled: _,
    classNames: y,
    styles: b,
    closeOnClickOutside: N,
    withinPortal: R,
    portalProps: T,
    closeOnEscape: M,
    clickOutsideEvents: j,
    trapFocus: $,
    onClose: G,
    onDismiss: F,
    onOpen: W,
    onChange: V,
    zIndex: q,
    radius: Z,
    shadow: U,
    id: D,
    defaultOpened: K,
    __staticSelector: se,
    withRoles: ft,
    disabled: Xe,
    returnFocus: mt,
    variant: pt,
    keepMounted: ln,
    vars: un,
    floatingStrategy: At,
    withOverlay: dn,
    overlayProps: Ne,
    ...fn
  } = e, Ot = Q({
    name: se,
    props: e,
    classes: ai,
    classNames: y,
    styles: b,
    unstyled: _,
    rootSelector: "dropdown",
    vars: un,
    varsResolver: Fl
  }), { resolvedStyles: mn } = Ms({ classNames: y, styles: b, props: e }), $t = oe(null), [pn, hn] = ge(null), [gn, yn] = ge(null), { dir: vn } = Qn(), Et = Ko(D), ee = jl({
    middlewares: f,
    width: d,
    position: kl(vn, r),
    offset: typeof s == "number" ? s + (m ? h / 2 : 0) : s,
    arrowRef: $t,
    arrowOffset: p,
    onPositionChange: i,
    positionDependencies: o,
    opened: a,
    defaultOpened: K,
    onChange: V,
    onOpen: W,
    onClose: G,
    onDismiss: F,
    strategy: At,
    disabled: Xe
  });
  jo(
    () => {
      N && (ee.onClose(), F == null || F());
    },
    j,
    [pn, gn]
  );
  const wi = Te(
    (ce) => {
      hn(ce), ee.floating.refs.setReference(ce);
    },
    [ee.floating.refs.setReference]
  ), _i = Te(
    (ce) => {
      yn(ce), ee.floating.refs.setFloating(ce);
    },
    [ee.floating.refs.setFloating]
  ), ki = Te(() => {
    var ce;
    (ce = c == null ? void 0 : c.onExited) == null || ce.call(c), l == null || l();
  }, [c == null ? void 0 : c.onExited, l]), Si = Te(() => {
    var ce;
    (ce = c == null ? void 0 : c.onEntered) == null || ce.call(c), u == null || u();
  }, [c == null ? void 0 : c.onEntered, u]);
  return /* @__PURE__ */ J(
    El,
    {
      value: {
        returnFocus: mt,
        disabled: Xe,
        controlled: ee.controlled,
        reference: wi,
        floating: _i,
        x: ee.floating.x,
        y: ee.floating.y,
        arrowX: (Rr = (Cr = (Sr = ee.floating) == null ? void 0 : Sr.middlewareData) == null ? void 0 : Cr.arrow) == null ? void 0 : Rr.x,
        arrowY: (Ar = (Tr = (Nr = ee.floating) == null ? void 0 : Nr.middlewareData) == null ? void 0 : Tr.arrow) == null ? void 0 : Ar.y,
        opened: ee.opened,
        arrowRef: $t,
        transitionProps: { ...c, onExited: ki, onEntered: Si },
        width: d,
        withArrow: m,
        arrowSize: h,
        arrowOffset: p,
        arrowRadius: g,
        arrowPosition: x,
        placement: ee.floating.placement,
        trapFocus: $,
        withinPortal: R,
        portalProps: T,
        zIndex: q,
        radius: Z,
        shadow: U,
        closeOnEscape: M,
        onDismiss: F,
        onClose: ee.onClose,
        onToggle: ee.onToggle,
        getTargetId: () => `${Et}-target`,
        getDropdownId: () => `${Et}-dropdown`,
        withRoles: ft,
        targetProps: fn,
        __staticSelector: se,
        classNames: y,
        styles: b,
        unstyled: _,
        variant: pt,
        keepMounted: ln,
        getStyles: Ot,
        resolvedStyles: mn,
        floatingStrategy: At
      },
      children: [
        n,
        dn && /* @__PURE__ */ w(
          rn,
          {
            transition: "fade",
            mounted: ee.opened,
            duration: (c == null ? void 0 : c.duration) || 250,
            exitDuration: (c == null ? void 0 : c.exitDuration) || 250,
            children: (ce) => /* @__PURE__ */ w(ur, { withinPortal: R, children: /* @__PURE__ */ w(
              lr,
              {
                ...Ne,
                ...Ot("overlay", {
                  className: Ne == null ? void 0 : Ne.className,
                  style: [ce, Ne == null ? void 0 : Ne.style]
                })
              }
            ) })
          }
        )
      ]
    }
  );
}
Ye.Target = ci;
Ye.Dropdown = fr;
Ye.displayName = "@mantine/core/Popover";
Ye.extend = (t) => t;
var he = { root: "m_5ae2e3c", barsLoader: "m_7a2bd4cd", bar: "m_870bb79", "bars-loader-animation": "m_5d2b3b9d", dotsLoader: "m_4e3f22d7", dot: "m_870c4af", "loader-dots-animation": "m_aac34a1", ovalLoader: "m_b34414df", "oval-loader-animation": "m_f8e89c4b" };
const li = de(({ className: t, ...e }, n) => /* @__PURE__ */ J(H, { component: "span", className: Le(he.barsLoader, t), ...e, ref: n, children: [
  /* @__PURE__ */ w("span", { className: he.bar }),
  /* @__PURE__ */ w("span", { className: he.bar }),
  /* @__PURE__ */ w("span", { className: he.bar })
] }));
li.displayName = "@mantine/core/Bars";
const ui = de(({ className: t, ...e }, n) => /* @__PURE__ */ J(H, { component: "span", className: Le(he.dotsLoader, t), ...e, ref: n, children: [
  /* @__PURE__ */ w("span", { className: he.dot }),
  /* @__PURE__ */ w("span", { className: he.dot }),
  /* @__PURE__ */ w("span", { className: he.dot })
] }));
ui.displayName = "@mantine/core/Dots";
const di = de(({ className: t, ...e }, n) => /* @__PURE__ */ w(H, { component: "span", className: Le(he.ovalLoader, t), ...e, ref: n }));
di.displayName = "@mantine/core/Oval";
const fi = {
  bars: li,
  oval: di,
  dots: ui
}, Zl = {
  loaders: fi,
  type: "oval"
}, Vl = (t, { size: e, color: n }) => ({
  root: {
    "--loader-size": Ce(e, "loader-size"),
    "--loader-color": n ? Ut(n, t) : void 0
  }
}), sn = re((t, e) => {
  const n = B("Loader", Zl, t), {
    size: r,
    color: s,
    type: i,
    vars: o,
    className: a,
    style: c,
    classNames: l,
    styles: u,
    unstyled: d,
    loaders: f,
    variant: m,
    children: h,
    ...p
  } = n, g = Q({
    name: "Loader",
    props: n,
    classes: he,
    className: a,
    style: c,
    classNames: l,
    styles: u,
    unstyled: d,
    vars: o,
    varsResolver: Vl
  });
  return h ? /* @__PURE__ */ w(H, { ...g("root"), ref: e, ...p, children: h }) : /* @__PURE__ */ w(
    H,
    {
      ...g("root"),
      ref: e,
      component: f[i],
      variant: m,
      size: r,
      ...p
    }
  );
});
sn.defaultLoaders = fi;
sn.classes = he;
sn.displayName = "@mantine/core/Loader";
var ut = { root: "m_8d3f4000", icon: "m_8d3afb97", loader: "m_302b9fb1", group: "m_1a0f1b21", groupSection: "m_437b6484" };
const fs = {
  orientation: "horizontal"
}, Bl = (t, { borderWidth: e }) => ({
  group: { "--ai-border-width": fe(e) }
}), mr = re((t, e) => {
  const n = B("ActionIconGroup", fs, t), {
    className: r,
    style: s,
    classNames: i,
    styles: o,
    unstyled: a,
    orientation: c,
    vars: l,
    borderWidth: u,
    variant: d,
    mod: f,
    ...m
  } = B("ActionIconGroup", fs, t), h = Q({
    name: "ActionIconGroup",
    props: n,
    classes: ut,
    className: r,
    style: s,
    classNames: i,
    styles: o,
    unstyled: a,
    vars: l,
    varsResolver: Bl,
    rootSelector: "group"
  });
  return /* @__PURE__ */ w(
    H,
    {
      ...h("group"),
      ref: e,
      variant: d,
      mod: [{ "data-orientation": c }, f],
      role: "group",
      ...m
    }
  );
});
mr.classes = ut;
mr.displayName = "@mantine/core/ActionIconGroup";
const ms = {}, Wl = (t, { radius: e, color: n, gradient: r, variant: s, autoContrast: i, size: o }) => {
  const a = t.variantColorResolver({
    color: n || t.primaryColor,
    theme: t,
    gradient: r,
    variant: s || "filled",
    autoContrast: i
  });
  return {
    groupSection: {
      "--section-height": Ce(o, "section-height"),
      "--section-padding-x": Ce(o, "section-padding-x"),
      "--section-fz": Cs(o),
      "--section-radius": e === void 0 ? void 0 : at(e),
      "--section-bg": n || s ? a.background : void 0,
      "--section-color": a.color,
      "--section-bd": n || s ? a.border : void 0
    }
  };
}, pr = re((t, e) => {
  const n = B("ActionIconGroupSection", ms, t), {
    className: r,
    style: s,
    classNames: i,
    styles: o,
    unstyled: a,
    vars: c,
    variant: l,
    gradient: u,
    radius: d,
    autoContrast: f,
    ...m
  } = B("ActionIconGroupSection", ms, t), h = Q({
    name: "ActionIconGroupSection",
    props: n,
    classes: ut,
    className: r,
    style: s,
    classNames: i,
    styles: o,
    unstyled: a,
    vars: c,
    varsResolver: Wl,
    rootSelector: "groupSection"
  });
  return /* @__PURE__ */ w(H, { ...h("groupSection"), ref: e, variant: l, ...m });
});
pr.classes = ut;
pr.displayName = "@mantine/core/ActionIconGroupSection";
const Ul = {}, Hl = (t, { size: e, radius: n, variant: r, gradient: s, color: i, autoContrast: o }) => {
  const a = t.variantColorResolver({
    color: i || t.primaryColor,
    theme: t,
    gradient: s,
    variant: r || "filled",
    autoContrast: o
  });
  return {
    root: {
      "--ai-size": Ce(e, "ai-size"),
      "--ai-radius": n === void 0 ? void 0 : at(n),
      "--ai-bg": i || r ? a.background : void 0,
      "--ai-hover": i || r ? a.hover : void 0,
      "--ai-hover-color": i || r ? a.hoverColor : void 0,
      "--ai-color": a.color,
      "--ai-bd": i || r ? a.border : void 0
    }
  };
}, Nt = ze((t, e) => {
  const n = B("ActionIcon", Ul, t), {
    className: r,
    unstyled: s,
    variant: i,
    classNames: o,
    styles: a,
    style: c,
    loading: l,
    loaderProps: u,
    size: d,
    color: f,
    radius: m,
    __staticSelector: h,
    gradient: p,
    vars: g,
    children: x,
    disabled: _,
    "data-disabled": y,
    autoContrast: b,
    mod: N,
    ...R
  } = n, T = Q({
    name: ["ActionIcon", h],
    props: n,
    className: r,
    style: c,
    classes: ut,
    classNames: o,
    styles: a,
    unstyled: s,
    vars: g,
    varsResolver: Hl
  });
  return /* @__PURE__ */ J(
    Rt,
    {
      ...T("root", { active: !_ && !l && !y }),
      ...R,
      unstyled: s,
      variant: i,
      size: d,
      disabled: _ || l,
      ref: e,
      mod: [{ loading: l, disabled: _ || y }, N],
      children: [
        /* @__PURE__ */ w(rn, { mounted: !!l, transition: "slide-down", duration: 150, children: (M) => /* @__PURE__ */ w(H, { component: "span", ...T("loader", { style: M }), "aria-hidden": !0, children: /* @__PURE__ */ w(sn, { color: "var(--ai-color)", size: "calc(var(--ai-size) * 0.55)", ...u }) }) }),
        /* @__PURE__ */ w(H, { component: "span", mod: { loading: l }, ...T("icon"), children: x })
      ]
    }
  );
});
Nt.classes = ut;
Nt.displayName = "@mantine/core/ActionIcon";
Nt.Group = mr;
Nt.GroupSection = pr;
function Gl(t) {
  return ps.toArray(t).filter(Boolean);
}
var mi = { root: "m_4081bf90" };
const ql = {
  preventGrowOverflow: !0,
  gap: "md",
  align: "center",
  justify: "flex-start",
  wrap: "wrap"
}, Yl = (t, { grow: e, preventGrowOverflow: n, gap: r, align: s, justify: i, wrap: o }, { childWidth: a }) => ({
  root: {
    "--group-child-width": e && n ? a : void 0,
    "--group-gap": ue(r),
    "--group-align": s,
    "--group-justify": i,
    "--group-wrap": o
  }
}), on = re((t, e) => {
  const n = B("Group", ql, t), {
    classNames: r,
    className: s,
    style: i,
    styles: o,
    unstyled: a,
    children: c,
    gap: l,
    align: u,
    justify: d,
    wrap: f,
    grow: m,
    preventGrowOverflow: h,
    vars: p,
    variant: g,
    __size: x,
    mod: _,
    ...y
  } = n, b = Gl(c), N = b.length, R = ue(l ?? "md"), M = { childWidth: `calc(${100 / N}% - (${R} - ${R} / ${N}))` }, j = Q({
    name: "Group",
    props: n,
    stylesCtx: M,
    className: s,
    style: i,
    classes: mi,
    classNames: r,
    styles: o,
    unstyled: a,
    vars: p,
    varsResolver: Yl
  });
  return /* @__PURE__ */ w(
    H,
    {
      ...j("root"),
      ref: e,
      variant: g,
      mod: [{ grow: m }, _],
      size: x,
      ...y,
      children: b
    }
  );
});
on.classes = mi;
on.displayName = "@mantine/core/Group";
var pi = { root: "m_b6d8b162" };
function Xl(t) {
  if (t === "start")
    return "start";
  if (t === "end" || t)
    return "end";
}
const Kl = {
  inherit: !1
}, Jl = (t, { variant: e, lineClamp: n, gradient: r, size: s, color: i }) => ({
  root: {
    "--text-fz": Cs(s),
    "--text-lh": Eo(s),
    "--text-gradient": e === "gradient" ? ya(r, t) : void 0,
    "--text-line-clamp": typeof n == "number" ? n.toString() : void 0,
    "--text-color": i ? Ut(i, t) : void 0
  }
}), Ve = ze((t, e) => {
  const n = B("Text", Kl, t), {
    lineClamp: r,
    truncate: s,
    inline: i,
    inherit: o,
    gradient: a,
    span: c,
    __staticSelector: l,
    vars: u,
    className: d,
    style: f,
    classNames: m,
    styles: h,
    unstyled: p,
    variant: g,
    mod: x,
    size: _,
    ...y
  } = n, b = Q({
    name: ["Text", l],
    props: n,
    classes: pi,
    className: d,
    style: f,
    classNames: m,
    styles: h,
    unstyled: p,
    vars: u,
    varsResolver: Jl
  });
  return /* @__PURE__ */ w(
    H,
    {
      ...b("root", { focusable: !0 }),
      ref: e,
      component: c ? "span" : "p",
      variant: g,
      mod: [
        {
          "data-truncate": Xl(s),
          "data-line-clamp": typeof r == "number",
          "data-inline": i,
          "data-inherit": o
        },
        x
      ],
      size: _,
      ...y
    }
  );
});
Ve.classes = pi;
Ve.displayName = "@mantine/core/Text";
const [Ql, eu] = Xn(
  "Card component was not found in tree"
);
var hr = { root: "m_e615b15f", section: "m_599a2148" };
const tu = {}, an = ze((t, e) => {
  const n = B("CardSection", tu, t), { classNames: r, className: s, style: i, styles: o, vars: a, withBorder: c, inheritPadding: l, mod: u, ...d } = n, f = eu();
  return /* @__PURE__ */ w(
    H,
    {
      ref: e,
      mod: [{ "with-border": c, "inherit-padding": l }, u],
      ...f.getStyles("section", { className: s, style: i, styles: o, classNames: r }),
      ...d
    }
  );
});
an.classes = hr;
an.displayName = "@mantine/core/CardSection";
const nu = {}, ru = (t, { padding: e }) => ({
  root: {
    "--card-padding": ue(e)
  }
}), cn = ze((t, e) => {
  const n = B("Card", nu, t), { classNames: r, className: s, style: i, styles: o, unstyled: a, vars: c, children: l, padding: u, ...d } = n, f = Q({
    name: "Card",
    props: n,
    classes: hr,
    className: s,
    style: i,
    classNames: r,
    styles: o,
    unstyled: a,
    vars: c,
    varsResolver: ru
  }), m = ps.toArray(l), h = m.map((p, g) => typeof p == "object" && p && "type" in p && p.type === an ? Yt(p, {
    "data-first-section": g === 0 || void 0,
    "data-last-section": g === m.length - 1 || void 0
  }) : p);
  return /* @__PURE__ */ w(Ql, { value: { getStyles: f }, children: /* @__PURE__ */ w(cr, { ref: e, unstyled: a, ...f("root"), ...d, children: h }) });
});
cn.classes = hr;
cn.displayName = "@mantine/core/Card";
cn.Section = an;
function su({ open: t, close: e, openDelay: n, closeDelay: r }) {
  const s = oe(-1), i = oe(-1), o = () => {
    window.clearTimeout(s.current), window.clearTimeout(i.current);
  }, a = () => {
    o(), n === 0 || n === void 0 ? t() : s.current = window.setTimeout(t, n);
  }, c = () => {
    o(), r === 0 || r === void 0 ? e() : i.current = window.setTimeout(e, r);
  };
  return ke(() => o, []), { openDropdown: a, closeDropdown: c };
}
const [iu, Tt] = Xn(
  "Menu component was not found in the tree"
);
var dt = { dropdown: "m_dc9b7c9f", label: "m_9bfac126", divider: "m_efdf90cb", item: "m_99ac2aa1", itemLabel: "m_5476e0d3", itemSection: "m_8b75e504" };
const ou = {}, gr = re((t, e) => {
  const { classNames: n, className: r, style: s, styles: i, vars: o, ...a } = B(
    "MenuDivider",
    ou,
    t
  ), c = Tt();
  return /* @__PURE__ */ w(
    H,
    {
      ref: e,
      ...c.getStyles("divider", { className: r, style: s, styles: i, classNames: n }),
      ...a
    }
  );
});
gr.classes = dt;
gr.displayName = "@mantine/core/MenuDivider";
const au = {}, yr = re((t, e) => {
  const {
    classNames: n,
    className: r,
    style: s,
    styles: i,
    vars: o,
    onMouseEnter: a,
    onMouseLeave: c,
    onKeyDown: l,
    children: u,
    ...d
  } = B("MenuDropdown", au, t), f = oe(null), m = Tt(), h = xe(l, (x) => {
    var _, y;
    (x.key === "ArrowUp" || x.key === "ArrowDown") && (x.preventDefault(), (y = (_ = f.current) == null ? void 0 : _.querySelectorAll("[data-menu-item]:not(:disabled)")[0]) == null || y.focus());
  }), p = xe(
    a,
    () => (m.trigger === "hover" || m.trigger === "click-hover") && m.openDropdown()
  ), g = xe(
    c,
    () => (m.trigger === "hover" || m.trigger === "click-hover") && m.closeDropdown()
  );
  return /* @__PURE__ */ J(
    Ye.Dropdown,
    {
      ...d,
      onMouseEnter: p,
      onMouseLeave: g,
      role: "menu",
      "aria-orientation": "vertical",
      ref: St(e, f),
      ...m.getStyles("dropdown", {
        className: r,
        style: s,
        styles: i,
        classNames: n,
        withStaticClass: !1
      }),
      tabIndex: -1,
      "data-menu-dropdown": !0,
      onKeyDown: h,
      children: [
        m.withInitialFocusPlaceholder && /* @__PURE__ */ w("div", { tabIndex: -1, "data-autofocus": !0, "data-mantine-stop-propagation": !0, style: { outline: 0 } }),
        u
      ]
    }
  );
});
yr.classes = dt;
yr.displayName = "@mantine/core/MenuDropdown";
const cu = {}, vr = ze((t, e) => {
  const {
    classNames: n,
    className: r,
    style: s,
    styles: i,
    vars: o,
    color: a,
    closeMenuOnClick: c,
    leftSection: l,
    rightSection: u,
    children: d,
    disabled: f,
    "data-disabled": m,
    ...h
  } = B("MenuItem", cu, t), p = Tt(), g = je(), { dir: x } = Qn(), _ = oe(null), y = p.getItemIndex(_.current), b = h, N = xe(b.onMouseLeave, () => p.setHovered(-1)), R = xe(
    b.onMouseEnter,
    () => p.setHovered(p.getItemIndex(_.current))
  ), T = xe(b.onClick, () => {
    m || (typeof c == "boolean" ? c && p.closeDropdownImmediately() : p.closeOnItemClick && p.closeDropdownImmediately());
  }), M = xe(
    b.onFocus,
    () => p.setHovered(p.getItemIndex(_.current))
  ), j = a ? g.variantColorResolver({ color: a, theme: g, variant: "light" }) : void 0, $ = a ? Jt({ color: a, theme: g }) : null;
  return /* @__PURE__ */ J(
    Rt,
    {
      ...h,
      unstyled: p.unstyled,
      tabIndex: p.menuItemTabIndex,
      onFocus: M,
      ...p.getStyles("item", { className: r, style: s, styles: i, classNames: n }),
      ref: St(_, e),
      role: "menuitem",
      disabled: f,
      "data-menu-item": !0,
      "data-disabled": f || m || void 0,
      "data-hovered": p.hovered === y ? !0 : void 0,
      "data-mantine-stop-propagation": !0,
      onMouseEnter: R,
      onMouseLeave: N,
      onClick: T,
      onKeyDown: To({
        siblingSelector: "[data-menu-item]:not([data-disabled])",
        parentSelector: "[data-menu-dropdown]",
        activateOnFocus: !1,
        loop: p.loop,
        dir: x,
        orientation: "vertical",
        onKeyDown: b.onKeyDown
      }),
      __vars: {
        "--menu-item-color": $ != null && $.isThemeColor && ($ == null ? void 0 : $.shade) === void 0 ? `var(--mantine-color-${$.color}-6)` : j == null ? void 0 : j.color,
        "--menu-item-hover": j == null ? void 0 : j.hover
      },
      children: [
        l && /* @__PURE__ */ w("div", { ...p.getStyles("itemSection", { styles: i, classNames: n }), "data-position": "left", children: l }),
        d && /* @__PURE__ */ w("div", { ...p.getStyles("itemLabel", { styles: i, classNames: n }), children: d }),
        u && /* @__PURE__ */ w("div", { ...p.getStyles("itemSection", { styles: i, classNames: n }), "data-position": "right", children: u })
      ]
    }
  );
});
vr.classes = dt;
vr.displayName = "@mantine/core/MenuItem";
const lu = {}, br = re((t, e) => {
  const { classNames: n, className: r, style: s, styles: i, vars: o, ...a } = B(
    "MenuLabel",
    lu,
    t
  ), c = Tt();
  return /* @__PURE__ */ w(
    H,
    {
      ref: e,
      ...c.getStyles("label", { className: r, style: s, styles: i, classNames: n }),
      ...a
    }
  );
});
br.classes = dt;
br.displayName = "@mantine/core/MenuLabel";
const uu = {
  refProp: "ref"
}, hi = de((t, e) => {
  const { children: n, refProp: r, ...s } = B("MenuTarget", uu, t);
  if (!Yn(n))
    throw new Error(
      "Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const i = Tt(), o = n.props, a = xe(o.onClick, () => {
    i.trigger === "click" ? i.toggleDropdown() : i.trigger === "click-hover" && (i.setOpenedViaClick(!0), i.opened || i.openDropdown());
  }), c = xe(
    o.onMouseEnter,
    () => (i.trigger === "hover" || i.trigger === "click-hover") && i.openDropdown()
  ), l = xe(o.onMouseLeave, () => {
    (i.trigger === "hover" || i.trigger === "click-hover" && !i.openedViaClick) && i.closeDropdown();
  });
  return /* @__PURE__ */ w(Ye.Target, { refProp: r, popupType: "menu", ref: e, ...s, children: Yt(n, {
    onClick: a,
    onMouseEnter: c,
    onMouseLeave: l,
    "data-expanded": i.opened ? !0 : void 0
  }) });
});
hi.displayName = "@mantine/core/MenuTarget";
const du = {
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
function ie(t) {
  const e = B("Menu", du, t), {
    children: n,
    onOpen: r,
    onClose: s,
    opened: i,
    defaultOpened: o,
    trapFocus: a,
    onChange: c,
    closeOnItemClick: l,
    loop: u,
    closeOnEscape: d,
    trigger: f,
    openDelay: m,
    closeDelay: h,
    classNames: p,
    styles: g,
    unstyled: x,
    variant: _,
    vars: y,
    menuItemTabIndex: b,
    keepMounted: N,
    withInitialFocusPlaceholder: R,
    ...T
  } = e, M = Q({
    name: "Menu",
    classes: dt,
    props: e,
    classNames: p,
    styles: g,
    unstyled: x
  }), [j, { setHovered: $, resetHovered: G }] = Do(), [F, W] = $s({
    value: i,
    defaultValue: o,
    finalValue: !1,
    onChange: c
  }), [V, q] = ge(!1), Z = () => {
    W(!1), q(!1), F && (s == null || s());
  }, U = () => {
    W(!0), !F && (r == null || r());
  }, D = () => {
    F ? Z() : U();
  }, { openDropdown: K, closeDropdown: se } = su({ open: U, close: Z, closeDelay: h, openDelay: m }), ft = (pt) => Mo("[data-menu-item]", "[data-menu-dropdown]", pt), { resolvedClassNames: Xe, resolvedStyles: mt } = Ms({
    classNames: p,
    styles: g,
    props: e
  });
  return He(() => {
    G();
  }, [F]), /* @__PURE__ */ w(
    iu,
    {
      value: {
        getStyles: M,
        opened: F,
        toggleDropdown: D,
        getItemIndex: ft,
        hovered: j,
        setHovered: $,
        openedViaClick: V,
        setOpenedViaClick: q,
        closeOnItemClick: l,
        closeDropdown: f === "click" ? Z : se,
        openDropdown: f === "click" ? U : K,
        closeDropdownImmediately: Z,
        loop: u,
        trigger: f,
        unstyled: x,
        menuItemTabIndex: b,
        withInitialFocusPlaceholder: R
      },
      children: /* @__PURE__ */ w(
        Ye,
        {
          ...T,
          opened: F,
          onChange: D,
          defaultOpened: o,
          trapFocus: N ? !1 : a,
          closeOnEscape: d,
          __staticSelector: "Menu",
          classNames: Xe,
          styles: mt,
          unstyled: x,
          variant: _,
          keepMounted: N,
          children: n
        }
      )
    }
  );
}
ie.extend = (t) => t;
ie.withProps = tc(ie);
ie.classes = dt;
ie.displayName = "@mantine/core/Menu";
ie.Item = vr;
ie.Label = br;
ie.Dropdown = yr;
ie.Target = hi;
ie.Divider = gr;
function fu({
  spacing: t,
  verticalSpacing: e,
  cols: n,
  selector: r
}) {
  var u;
  const s = je(), i = e === void 0 ? t : e, o = kt({
    "--sg-spacing-x": ue(Je(t)),
    "--sg-spacing-y": ue(Je(i)),
    "--sg-cols": (u = Je(n)) == null ? void 0 : u.toString()
  }), a = Ze(s.breakpoints).reduce(
    (d, f) => (d[f] || (d[f] = {}), typeof t == "object" && t[f] !== void 0 && (d[f]["--sg-spacing-x"] = ue(t[f])), typeof i == "object" && i[f] !== void 0 && (d[f]["--sg-spacing-y"] = ue(i[f])), typeof n == "object" && n[f] !== void 0 && (d[f]["--sg-cols"] = n[f]), d),
    {}
  ), l = Io(Ze(a), s.breakpoints).filter(
    (d) => Ze(a[d.value]).length > 0
  ).map((d) => ({
    query: `(min-width: ${s.breakpoints[d.value]})`,
    styles: a[d.value]
  }));
  return /* @__PURE__ */ w(Kn, { styles: o, media: l, selector: r });
}
function An(t) {
  return typeof t == "object" && t !== null ? Ze(t) : [];
}
function mu(t) {
  return t.sort((e, n) => Vt(e) - Vt(n));
}
function pu({
  spacing: t,
  verticalSpacing: e,
  cols: n
}) {
  const r = Array.from(
    /* @__PURE__ */ new Set([
      ...An(t),
      ...An(e),
      ...An(n)
    ])
  );
  return mu(r);
}
function hu({
  spacing: t,
  verticalSpacing: e,
  cols: n,
  selector: r
}) {
  var l;
  const s = e === void 0 ? t : e, i = kt({
    "--sg-spacing-x": ue(Je(t)),
    "--sg-spacing-y": ue(Je(s)),
    "--sg-cols": (l = Je(n)) == null ? void 0 : l.toString()
  }), o = pu({ spacing: t, verticalSpacing: e, cols: n }), a = o.reduce(
    (u, d) => (u[d] || (u[d] = {}), typeof t == "object" && t[d] !== void 0 && (u[d]["--sg-spacing-x"] = ue(t[d])), typeof s == "object" && s[d] !== void 0 && (u[d]["--sg-spacing-y"] = ue(s[d])), typeof n == "object" && n[d] !== void 0 && (u[d]["--sg-cols"] = n[d]), u),
    {}
  ), c = o.map((u) => ({
    query: `simple-grid (min-width: ${u})`,
    styles: a[u]
  }));
  return /* @__PURE__ */ w(Kn, { styles: i, container: c, selector: r });
}
var gi = { container: "m_925c2d2c", root: "m_2415a157" };
const gu = {
  cols: 1,
  spacing: "md",
  type: "media"
}, xr = re((t, e) => {
  const n = B("SimpleGrid", gu, t), {
    classNames: r,
    className: s,
    style: i,
    styles: o,
    unstyled: a,
    vars: c,
    cols: l,
    verticalSpacing: u,
    spacing: d,
    type: f,
    ...m
  } = n, h = Q({
    name: "SimpleGrid",
    classes: gi,
    props: n,
    className: s,
    style: i,
    classNames: r,
    styles: o,
    unstyled: a,
    vars: c
  }), p = Ds();
  return f === "container" ? /* @__PURE__ */ J(Be, { children: [
    /* @__PURE__ */ w(hu, { ...n, selector: `.${p}` }),
    /* @__PURE__ */ w("div", { ...h("container"), children: /* @__PURE__ */ w(H, { ref: e, ...h("root", { className: p }), ...m }) })
  ] }) : /* @__PURE__ */ J(Be, { children: [
    /* @__PURE__ */ w(fu, { ...n, selector: `.${p}` }),
    /* @__PURE__ */ w(H, { ref: e, ...h("root", { className: p }), ...m })
  ] });
});
xr.classes = gi;
xr.displayName = "@mantine/core/SimpleGrid";
var yi = { root: "m_6d731127" };
const yu = {
  gap: "md",
  align: "stretch",
  justify: "flex-start"
}, vu = (t, { gap: e, align: n, justify: r }) => ({
  root: {
    "--stack-gap": ue(e),
    "--stack-align": n,
    "--stack-justify": r
  }
}), wr = re((t, e) => {
  const n = B("Stack", yu, t), {
    classNames: r,
    className: s,
    style: i,
    styles: o,
    unstyled: a,
    vars: c,
    align: l,
    justify: u,
    gap: d,
    variant: f,
    ...m
  } = n, h = Q({
    name: "Stack",
    props: n,
    classes: yi,
    className: s,
    style: i,
    classNames: r,
    styles: o,
    unstyled: a,
    vars: c,
    varsResolver: vu
  });
  return /* @__PURE__ */ w(H, { ref: e, ...h("root"), variant: f, ...m });
});
wr.classes = yi;
wr.displayName = "@mantine/core/Stack";
var vi = { root: "m_7341320d" };
const bu = {}, xu = (t, { size: e, radius: n, variant: r, gradient: s, color: i, autoContrast: o }) => {
  const a = t.variantColorResolver({
    color: i || t.primaryColor,
    theme: t,
    gradient: s,
    variant: r || "filled",
    autoContrast: o
  });
  return {
    root: {
      "--ti-size": Ce(e, "ti-size"),
      "--ti-radius": n === void 0 ? void 0 : at(n),
      "--ti-bg": i || r ? a.background : void 0,
      "--ti-color": i || r ? a.color : void 0,
      "--ti-bd": i || r ? a.border : void 0
    }
  };
}, _r = re((t, e) => {
  const n = B("ThemeIcon", bu, t), { classNames: r, className: s, style: i, styles: o, unstyled: a, vars: c, autoContrast: l, ...u } = n, d = Q({
    name: "ThemeIcon",
    classes: vi,
    props: n,
    className: s,
    style: i,
    classNames: r,
    styles: o,
    unstyled: a,
    vars: c,
    varsResolver: xu
  });
  return /* @__PURE__ */ w(H, { ref: e, ...d("root"), ...u });
});
_r.classes = vi;
_r.displayName = "@mantine/core/ThemeIcon";
const wu = ["h1", "h2", "h3", "h4", "h5", "h6"], _u = ["xs", "sm", "md", "lg", "xl"];
function ku(t, e) {
  const n = e !== void 0 ? e : `h${t}`;
  return wu.includes(n) ? {
    fontSize: `var(--mantine-${n}-font-size)`,
    fontWeight: `var(--mantine-${n}-font-weight)`,
    lineHeight: `var(--mantine-${n}-line-height)`
  } : _u.includes(n) ? {
    fontSize: `var(--mantine-font-size-${n})`,
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  } : {
    fontSize: fe(n),
    fontWeight: `var(--mantine-h${t}-font-weight)`,
    lineHeight: `var(--mantine-h${t}-line-height)`
  };
}
var bi = { root: "m_8a5d1357" };
const Su = {
  order: 1
}, Cu = (t, { order: e, size: n, lineClamp: r, textWrap: s }) => {
  const i = ku(e, n);
  return {
    root: {
      "--title-fw": i.fontWeight,
      "--title-lh": i.lineHeight,
      "--title-fz": i.fontSize,
      "--title-line-clamp": typeof r == "number" ? r.toString() : void 0,
      "--title-text-wrap": s
    }
  };
}, kr = re((t, e) => {
  const n = B("Title", Su, t), {
    classNames: r,
    className: s,
    style: i,
    styles: o,
    unstyled: a,
    order: c,
    vars: l,
    size: u,
    variant: d,
    lineClamp: f,
    textWrap: m,
    mod: h,
    ...p
  } = n, g = Q({
    name: "Title",
    props: n,
    classes: bi,
    className: s,
    style: i,
    classNames: r,
    styles: o,
    unstyled: a,
    vars: l,
    varsResolver: Cu
  });
  return [1, 2, 3, 4, 5, 6].includes(c) ? /* @__PURE__ */ w(
    H,
    {
      ...g("root"),
      component: `h${c}`,
      variant: d,
      ref: e,
      mod: [{ order: c, "data-line-clamp": typeof f == "number" }, h],
      size: u,
      ...p
    }
  ) : null;
});
kr.classes = bi;
kr.displayName = "@mantine/core/Title";
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ru = {
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
const Nu = (t, e, n, r) => {
  const s = de(
    ({ color: i = "currentColor", size: o = 24, stroke: a = 2, title: c, className: l, children: u, ...d }, f) => bn(
      "svg",
      {
        ref: f,
        ...Ru[t],
        width: o,
        height: o,
        className: ["tabler-icon", `tabler-icon-${e}`, l].join(" "),
        strokeWidth: a,
        stroke: i,
        ...d
      },
      [
        c && bn("title", { key: "svg-title" }, c),
        ...r.map(([m, h]) => bn(m, h)),
        ...Array.isArray(u) ? u : [u]
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
const Tu = [["path", { d: "M9 6.371c0 4.418 -2.239 6.629 -5 6.629", key: "svg-0" }], ["path", { d: "M4 6.371h7", key: "svg-1" }], ["path", { d: "M5 9c0 2.144 2.252 3.908 6 4", key: "svg-2" }], ["path", { d: "M12 20l4 -9l4 9", key: "svg-3" }], ["path", { d: "M19.1 18h-6.2", key: "svg-4" }], ["path", { d: "M6.694 3l.793 .582", key: "svg-5" }]], xi = Nu("outline", "language", "Language", Tu), Au = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ja", label: "日本語", flag: "🇯🇵" }
], Ou = hs(function() {
  const e = ws(), n = Te(
    (r) => {
      e("locale.changed", { locale: r });
    },
    [e]
  );
  return /* @__PURE__ */ J(ie, { position: "bottom-end", width: 200, children: [
    /* @__PURE__ */ w(ie.Target, { children: /* @__PURE__ */ w(Nt, { variant: "subtle", "aria-label": "Change language", children: /* @__PURE__ */ w(xi, { size: 18 }) }) }),
    /* @__PURE__ */ J(ie.Dropdown, { children: [
      /* @__PURE__ */ w(ie.Label, { children: "App language" }),
      Au.map((r) => /* @__PURE__ */ w(ie.Item, { onClick: () => n(r.code), children: /* @__PURE__ */ J(on, { gap: "sm", children: [
        /* @__PURE__ */ w(Ve, { children: r.flag }),
        /* @__PURE__ */ w(Ve, { size: "sm", children: r.label })
      ] }) }, r.code))
    ] })
  ] });
}), $u = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ja", label: "日本語", flag: "🇯🇵" }
], Eu = hs(function() {
  const e = ws(), n = Te(
    (r) => {
      e("locale.changed", { locale: r });
    },
    [e]
  );
  return /* @__PURE__ */ w(cn, { padding: "lg", radius: "lg", withBorder: !0, children: /* @__PURE__ */ J(wr, { gap: "md", children: [
    /* @__PURE__ */ J(on, { gap: "sm", children: [
      /* @__PURE__ */ w(_r, { size: "lg", radius: "md", variant: "light", color: "violet", children: /* @__PURE__ */ w(xi, { size: 20 }) }),
      /* @__PURE__ */ J("div", { children: [
        /* @__PURE__ */ w(kr, { order: 4, children: "Language Pack" }),
        /* @__PURE__ */ w(Ve, { size: "xs", c: "dimmed", children: "Changes the entire host UI via event bus" })
      ] })
    ] }),
    /* @__PURE__ */ w(xr, { cols: { base: 2, sm: 3 }, spacing: "sm", children: $u.map((r) => /* @__PURE__ */ J(
      Rt,
      {
        onClick: () => n(r.code),
        p: "sm",
        style: {
          borderRadius: 12,
          border: "1px solid var(--mantine-color-gray-3)",
          textAlign: "center"
        },
        children: [
          /* @__PURE__ */ w(Ve, { size: "xl", children: r.flag }),
          /* @__PURE__ */ w(Ve, { size: "sm", fw: 500, children: r.label })
        ]
      },
      r.code
    )) })
  ] }) });
});
function Du() {
  co({
    manifest: _o,
    widgets: [
      { slot: "dashboard.main", component: Eu, priority: 5 },
      { slot: "header.actions", component: Ou, priority: 50 }
    ]
  });
}
export {
  Du as activate
};
