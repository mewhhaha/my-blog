const Null = Symbol();
const Undefined = Symbol();
const Default = Symbol();

function s(value: undefined): typeof Undefined;
function s(value: null): typeof Null;
function s(value: "default"): typeof Default;
function s<VALUE>(value: VALUE): VALUE;

function s(value: null | undefined | unknown | "default") {
  if (value === null) {
    return Null;
  }

  if (value === undefined) {
    return Undefined;
  }

  if (value === "default") {
    return Default;
  }

  return value;
}

type serialize_value<
  value extends string | number | bigint | boolean | null | undefined,
> = value extends null
  ? typeof Null
  : value extends undefined
    ? typeof Undefined
    : value extends boolean
      ? "true" | "false"
      : `${value}`;

export const match = <
  const VALUE extends string | number | bigint | boolean | null | undefined,
  const CASES extends {
    [value in VALUE as serialize_value<value>]: (value: value) => RETURN;
  },
  const FALLTHROUGH extends string extends VALUE
    ? Record<typeof Default, (value: VALUE) => RETURN>
    : number extends VALUE
      ? Record<typeof Default, (value: VALUE) => RETURN>
      : bigint extends VALUE
        ? Record<typeof Default, (value: VALUE) => RETURN>
        :
            | Record<typeof Default, (value: VALUE) => RETURN>
            | Record<never, never>,
  const RETURN = CASES[keyof CASES] extends (
    value: unknown,
  ) => infer return_type
    ? return_type
    : never,
>(
  value: VALUE,
  cases: Record<never, never> extends FALLTHROUGH
    ? Pick<
        CASES,
        serialize_value<VALUE> extends keyof CASES
          ? serialize_value<VALUE>
          : never
      >
    : Partial<
        Pick<
          CASES,
          serialize_value<VALUE> extends keyof CASES
            ? serialize_value<VALUE>
            : never
        >
      > &
        FALLTHROUGH,
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
  return cases[s("default")](value);
};

match.Null = Null;
match.Default = Default;
match.Undefined = Undefined;
