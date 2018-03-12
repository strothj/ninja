// Opposite of Pick.
// Ref: http://ideasintosoftware.com/typescript-advanced-tricks/

type Diff<T extends string, U extends string> = ({[P in T]: P } &
  {[P in U]: never } & { [x: string]: never })[T];

/**
 * Remove one or more fields from a type definition.
 */
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
