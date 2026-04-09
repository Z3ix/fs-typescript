export const assertNever = (value: never): never => {
  throw new Error(
    `Unreachable switch case was reached. gg. ${value}`
  );
};