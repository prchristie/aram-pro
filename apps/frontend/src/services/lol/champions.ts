/* eslint-disable */
// @ts-nocheck

// To parse this data:
//
//   import { Convert, RunesReforged } from "./file";
//
//   const runesReforged = Convert.toRunesReforged(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Champions {
  readonly type:    Type;
  readonly format:  string;
  readonly version: Version;
  readonly data:    { [key: string]: Champion };
}

export interface Champion {
  readonly version: Version;
  readonly id:      string;
  readonly key:     string;
  readonly name:    string;
  readonly title:   string;
  readonly blurb:   string;
  readonly info:    Info;
  readonly image:   Image;
  readonly tags:    Tag[];
  readonly partype: string;
  readonly stats:   { [key: string]: number };
}

export interface Image {
  readonly full:   string;
  readonly sprite: Sprite;
  readonly group:  Type;
  readonly x:      number;
  readonly y:      number;
  readonly w:      number;
  readonly h:      number;
}

export enum Type {
  Champion = "champion",
}

export enum Sprite {
  Champion0PNG = "champion0.png",
  Champion1PNG = "champion1.png",
  Champion2PNG = "champion2.png",
  Champion3PNG = "champion3.png",
  Champion4PNG = "champion4.png",
  Champion5PNG = "champion5.png",
}

export interface Info {
  readonly attack:     number;
  readonly defense:    number;
  readonly magic:      number;
  readonly difficulty: number;
}

export enum Tag {
  Assassin = "Assassin",
  Fighter = "Fighter",
  Mage = "Mage",
  Marksman = "Marksman",
  Support = "Support",
  Tank = "Tank",
}

export enum Version {
  The1521 = "15.2.1",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toChampions(json: string): Champions {
      return cast(JSON.parse(json), r("RunesReforged"));
  }

  public static championsToJson(value: Champions): string {
      return JSON.stringify(uncast(value, r("RunesReforged")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : '';
  const keyText = key ? ` for key "${key}"` : '';
  throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
      if (typ.length === 2 && typ[0] === undefined) {
          return `an optional ${prettyTypeName(typ[1])}`;
      } else {
          return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
      }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
      return typ.literal;
  } else {
      return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
      typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
      typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
      if (typeof typ === typeof val) return val;
      return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
      // val must validate against one typ in typs
      const l = typs.length;
      for (let i = 0; i < l; i++) {
          const typ = typs[i];
          try {
              return transform(val, typ, getProps);
          } catch (_) {}
      }
      return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
      if (cases.indexOf(val) !== -1) return val;
      return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
  }

  function transformArray(typ: any, val: any): any {
      // val must be an array with no invalid elements
      if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
      return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
      if (val === null) {
          return null;
      }
      const d = new Date(val);
      if (isNaN(d.valueOf())) {
          return invalidValue(l("Date"), val, key, parent);
      }
      return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
      if (val === null || typeof val !== "object" || Array.isArray(val)) {
          return invalidValue(l(ref || "object"), val, key, parent);
      }
      const result: any = {};
      Object.getOwnPropertyNames(props).forEach(key => {
          const prop = props[key];
          const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
          result[prop.key] = transform(v, prop.typ, getProps, key, ref);
      });
      Object.getOwnPropertyNames(val).forEach(key => {
          if (!Object.prototype.hasOwnProperty.call(props, key)) {
              result[key] = transform(val[key], additional, getProps, key, ref);
          }
      });
      return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
      if (val === null) return val;
      return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
      ref = typ.ref;
      typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
      return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
          : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
          : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  "RunesReforged": o([
      { json: "type", js: "type", typ: r("Type") },
      { json: "format", js: "format", typ: "" },
      { json: "version", js: "version", typ: r("Version") },
      { json: "data", js: "data", typ: m(r("Datum")) },
  ], false),
  "Datum": o([
      { json: "version", js: "version", typ: r("Version") },
      { json: "id", js: "id", typ: "" },
      { json: "key", js: "key", typ: "" },
      { json: "name", js: "name", typ: "" },
      { json: "title", js: "title", typ: "" },
      { json: "blurb", js: "blurb", typ: "" },
      { json: "info", js: "info", typ: r("Info") },
      { json: "image", js: "image", typ: r("Image") },
      { json: "tags", js: "tags", typ: a(r("Tag")) },
      { json: "partype", js: "partype", typ: "" },
      { json: "stats", js: "stats", typ: m(3.14) },
  ], false),
  "Image": o([
      { json: "full", js: "full", typ: "" },
      { json: "sprite", js: "sprite", typ: r("Sprite") },
      { json: "group", js: "group", typ: r("Type") },
      { json: "x", js: "x", typ: 0 },
      { json: "y", js: "y", typ: 0 },
      { json: "w", js: "w", typ: 0 },
      { json: "h", js: "h", typ: 0 },
  ], false),
  "Info": o([
      { json: "attack", js: "attack", typ: 0 },
      { json: "defense", js: "defense", typ: 0 },
      { json: "magic", js: "magic", typ: 0 },
      { json: "difficulty", js: "difficulty", typ: 0 },
  ], false),
  "Type": [
      "champion",
  ],
  "Sprite": [
      "champion0.png",
      "champion1.png",
      "champion2.png",
      "champion3.png",
      "champion4.png",
      "champion5.png",
  ],
  "Tag": [
      "Assassin",
      "Fighter",
      "Mage",
      "Marksman",
      "Support",
      "Tank",
  ],
  "Version": [
      "15.2.1",
  ],
};
