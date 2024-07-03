
const sNull = Symbol();
const sUndefined = Symbol();
const sDefault = Symbol();

function s(value: undefined): typeof sUndefined;
function s(value: null): typeof sNull;
function s(value: 'default'): typeof sDefault;
function s<VALUE>(value: VALUE): VALUE;

function s(value: null | undefined | unknown | 'default') {
  if (value === null) {
    return sNull;
  }

  if (value === undefined) {
    return sUndefined;
  }

  if (value === 'default') {
    return sDefault;
  }

  return value;
}

type key = string | number | bigint | boolean | null | undefined;

type serialize_value<value extends key> =
  value extends null ? typeof sNull
  : value extends undefined ? typeof sUndefined
  : value extends boolean ? 'true' | 'false'
  : `${value}`;

type find_required_fallthrough<value extends key, r> =
  string extends value ? Record<typeof sDefault, (value: value) => r>
  : number extends value ? Record<typeof sDefault, (value: value) => r>
  : bigint extends value ? Record<typeof sDefault, (value: value) => r>
  : Record<typeof sDefault, (value: value) => r> | Record<never, never>;

type handle_fallthrough<cases, fallthrough, value extends key> =
  // There is no fallthrough defined
  Record<never, never> extends fallthrough ?
    // All keys are required
    Pick<cases, serialize_value<value> extends keyof cases ? serialize_value<value> : never>
  : // Make keys optional and include the fallthrough
    Partial<
      Pick<cases, serialize_value<value> extends keyof cases ? serialize_value<value> : never>
    > &
      fallthrough;

export const match = <
  const VALUE extends string | number | bigint | boolean | null | undefined,
  const CASES extends {
    [value in VALUE as serialize_value<value>]: (value: value) => RETURN;
  },
  const FALLTHROUGH extends find_required_fallthrough<VALUE, RETURN>,
  const RETURN = CASES[keyof CASES] extends (value: unknown) => infer return_type ? return_type
  : never,
>(
  value: VALUE,
  cases: handle_fallthrough<CASES, FALLTHROUGH, VALUE>,
): RETURN => {
  const replacedValue = s(value);

  // @ts-expect-error Hard to validate this in types
  // even though it's correct
  const f = cases[replacedValue as keyof CASES];

  if (f) {
    return f(value);
  }

  // @ts-expect-error Hard to validate this in types
  // even though it's correct
  return cases[s('default')](value);
};

// Can be used to match null values { [match.Null]: () => {} }
match.Null = sNull;

// Can be used to match undefined values { [match.Undefined]: () => {} }
match.Undefined = sUndefined;

// Can be used to create a default match { [match.Default]: () => {} }
match.Default = sDefault;
