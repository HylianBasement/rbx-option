type ClassName = 'Option';

type None = {
        /** @hidden */
        readonly __nominal_Option_none: unique symbol;
};

export interface MatchTable<T, R> {
        Some(value: T): R | void;
        None(): R | void;
}

export interface IOption<T> {
        Serialize(): { ClassName: ClassName; Value: T };
        Match<R>(matches: MatchTable<T, R>): R;
        IsSome(): boolean;
        IsNone(): boolean;
        Unwrap(): T;
        Expect(errMsg: string): T;
        ExpectNone(errMsg: string): void;
        UnwrapOr(defaultValue: T): T;
        UnwrapOrElse(defaultValue: () => T): T;
        And<O extends IOption<unknown>>(optB: O): O;
        AndThen<O extends IOption<unknown>>(predicate: (unwrapped: T) => O): T extends None ? IOption<None> : O;
        Or<O extends IOption<unknown>>(optB: O): T extends None ? O : IOption<T>;
        OrElse<O extends IOption<unknown>>(orElseFunc: () => O): T extends None ? O : IOption<T>;
        XOr<O extends IOption<unknown>>(optB: O): IOption<T> extends O
                ? IOption<None>
                : T extends None
                ? O
                : IOption<T>;
        Contains(value: T): boolean;
}

declare const Option: {
        Some: <T extends defined>(anyNonNilValue: T) => IOption<T>;
        Wrap: <T>(anyValue: T) => IOption<T>;
        None: IOption<None>;
        Is: (obj: any) => obj is IOption<unknown>;
        Assert: (obj: defined) => void;
        Deserialize: <D extends { ClassName: ClassName; Value: unknown }>(
          data: D
        ) => D['Value'] extends defined ? IOption<D['Value']> : IOption<None>;
}

export default Option;