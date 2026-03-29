
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model OtpCode
 * 
 */
export type OtpCode = $Result.DefaultSelection<Prisma.$OtpCodePayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model StockMovement
 * 
 */
export type StockMovement = $Result.DefaultSelection<Prisma.$StockMovementPayload>
/**
 * Model AffiliateLink
 * 
 */
export type AffiliateLink = $Result.DefaultSelection<Prisma.$AffiliateLinkPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model CODVerification
 * 
 */
export type CODVerification = $Result.DefaultSelection<Prisma.$CODVerificationPayload>
/**
 * Model VendorEarning
 * 
 */
export type VendorEarning = $Result.DefaultSelection<Prisma.$VendorEarningPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StockMovementType: {
  IN: 'IN',
  OUT: 'OUT'
};

export type StockMovementType = (typeof StockMovementType)[keyof typeof StockMovementType]


export const OrderStatus: {
  PENDING: 'PENDING',
  AWAITING_VERIFICATION: 'AWAITING_VERIFICATION',
  VERIFIED: 'VERIFIED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const PaymentStatus: {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const VerificationStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  REJECTED: 'REJECTED'
};

export type VerificationStatus = (typeof VerificationStatus)[keyof typeof VerificationStatus]

}

export type StockMovementType = $Enums.StockMovementType

export const StockMovementType: typeof $Enums.StockMovementType

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type VerificationStatus = $Enums.VerificationStatus

export const VerificationStatus: typeof $Enums.VerificationStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otpCode`: Exposes CRUD operations for the **OtpCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OtpCodes
    * const otpCodes = await prisma.otpCode.findMany()
    * ```
    */
  get otpCode(): Prisma.OtpCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stockMovement`: Exposes CRUD operations for the **StockMovement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StockMovements
    * const stockMovements = await prisma.stockMovement.findMany()
    * ```
    */
  get stockMovement(): Prisma.StockMovementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.affiliateLink`: Exposes CRUD operations for the **AffiliateLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AffiliateLinks
    * const affiliateLinks = await prisma.affiliateLink.findMany()
    * ```
    */
  get affiliateLink(): Prisma.AffiliateLinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cODVerification`: Exposes CRUD operations for the **CODVerification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CODVerifications
    * const cODVerifications = await prisma.cODVerification.findMany()
    * ```
    */
  get cODVerification(): Prisma.CODVerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vendorEarning`: Exposes CRUD operations for the **VendorEarning** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VendorEarnings
    * const vendorEarnings = await prisma.vendorEarning.findMany()
    * ```
    */
  get vendorEarning(): Prisma.VendorEarningDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    OtpCode: 'OtpCode',
    Product: 'Product',
    StockMovement: 'StockMovement',
    AffiliateLink: 'AffiliateLink',
    Order: 'Order',
    OrderItem: 'OrderItem',
    Payment: 'Payment',
    CODVerification: 'CODVerification',
    VendorEarning: 'VendorEarning'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "otpCode" | "product" | "stockMovement" | "affiliateLink" | "order" | "orderItem" | "payment" | "cODVerification" | "vendorEarning"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      OtpCode: {
        payload: Prisma.$OtpCodePayload<ExtArgs>
        fields: Prisma.OtpCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OtpCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OtpCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          findFirst: {
            args: Prisma.OtpCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OtpCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          findMany: {
            args: Prisma.OtpCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>[]
          }
          create: {
            args: Prisma.OtpCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          createMany: {
            args: Prisma.OtpCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OtpCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>[]
          }
          delete: {
            args: Prisma.OtpCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          update: {
            args: Prisma.OtpCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          deleteMany: {
            args: Prisma.OtpCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OtpCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OtpCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>[]
          }
          upsert: {
            args: Prisma.OtpCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          aggregate: {
            args: Prisma.OtpCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtpCode>
          }
          groupBy: {
            args: Prisma.OtpCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtpCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.OtpCodeCountArgs<ExtArgs>
            result: $Utils.Optional<OtpCodeCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      StockMovement: {
        payload: Prisma.$StockMovementPayload<ExtArgs>
        fields: Prisma.StockMovementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockMovementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockMovementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          findFirst: {
            args: Prisma.StockMovementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockMovementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          findMany: {
            args: Prisma.StockMovementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>[]
          }
          create: {
            args: Prisma.StockMovementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          createMany: {
            args: Prisma.StockMovementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockMovementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>[]
          }
          delete: {
            args: Prisma.StockMovementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          update: {
            args: Prisma.StockMovementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          deleteMany: {
            args: Prisma.StockMovementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockMovementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StockMovementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>[]
          }
          upsert: {
            args: Prisma.StockMovementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          aggregate: {
            args: Prisma.StockMovementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStockMovement>
          }
          groupBy: {
            args: Prisma.StockMovementGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockMovementGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockMovementCountArgs<ExtArgs>
            result: $Utils.Optional<StockMovementCountAggregateOutputType> | number
          }
        }
      }
      AffiliateLink: {
        payload: Prisma.$AffiliateLinkPayload<ExtArgs>
        fields: Prisma.AffiliateLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AffiliateLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AffiliateLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLinkPayload>
          }
          findFirst: {
            args: Prisma.AffiliateLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AffiliateLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLinkPayload>
          }
          findMany: {
            args: Prisma.AffiliateLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLinkPayload>[]
          }
          create: {
            args: Prisma.AffiliateLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLinkPayload>
          }
          createMany: {
            args: Prisma.AffiliateLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AffiliateLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLinkPayload>[]
          }
          delete: {
            args: Prisma.AffiliateLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLinkPayload>
          }
          update: {
            args: Prisma.AffiliateLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLinkPayload>
          }
          deleteMany: {
            args: Prisma.AffiliateLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AffiliateLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AffiliateLinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLinkPayload>[]
          }
          upsert: {
            args: Prisma.AffiliateLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateLinkPayload>
          }
          aggregate: {
            args: Prisma.AffiliateLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAffiliateLink>
          }
          groupBy: {
            args: Prisma.AffiliateLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<AffiliateLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.AffiliateLinkCountArgs<ExtArgs>
            result: $Utils.Optional<AffiliateLinkCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      CODVerification: {
        payload: Prisma.$CODVerificationPayload<ExtArgs>
        fields: Prisma.CODVerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CODVerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CODVerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CODVerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CODVerificationPayload>
          }
          findFirst: {
            args: Prisma.CODVerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CODVerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CODVerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CODVerificationPayload>
          }
          findMany: {
            args: Prisma.CODVerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CODVerificationPayload>[]
          }
          create: {
            args: Prisma.CODVerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CODVerificationPayload>
          }
          createMany: {
            args: Prisma.CODVerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CODVerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CODVerificationPayload>[]
          }
          delete: {
            args: Prisma.CODVerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CODVerificationPayload>
          }
          update: {
            args: Prisma.CODVerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CODVerificationPayload>
          }
          deleteMany: {
            args: Prisma.CODVerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CODVerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CODVerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CODVerificationPayload>[]
          }
          upsert: {
            args: Prisma.CODVerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CODVerificationPayload>
          }
          aggregate: {
            args: Prisma.CODVerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCODVerification>
          }
          groupBy: {
            args: Prisma.CODVerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CODVerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CODVerificationCountArgs<ExtArgs>
            result: $Utils.Optional<CODVerificationCountAggregateOutputType> | number
          }
        }
      }
      VendorEarning: {
        payload: Prisma.$VendorEarningPayload<ExtArgs>
        fields: Prisma.VendorEarningFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendorEarningFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorEarningPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendorEarningFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorEarningPayload>
          }
          findFirst: {
            args: Prisma.VendorEarningFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorEarningPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendorEarningFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorEarningPayload>
          }
          findMany: {
            args: Prisma.VendorEarningFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorEarningPayload>[]
          }
          create: {
            args: Prisma.VendorEarningCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorEarningPayload>
          }
          createMany: {
            args: Prisma.VendorEarningCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendorEarningCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorEarningPayload>[]
          }
          delete: {
            args: Prisma.VendorEarningDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorEarningPayload>
          }
          update: {
            args: Prisma.VendorEarningUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorEarningPayload>
          }
          deleteMany: {
            args: Prisma.VendorEarningDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendorEarningUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VendorEarningUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorEarningPayload>[]
          }
          upsert: {
            args: Prisma.VendorEarningUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorEarningPayload>
          }
          aggregate: {
            args: Prisma.VendorEarningAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendorEarning>
          }
          groupBy: {
            args: Prisma.VendorEarningGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendorEarningGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendorEarningCountArgs<ExtArgs>
            result: $Utils.Optional<VendorEarningCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    otpCode?: OtpCodeOmit
    product?: ProductOmit
    stockMovement?: StockMovementOmit
    affiliateLink?: AffiliateLinkOmit
    order?: OrderOmit
    orderItem?: OrderItemOmit
    payment?: PaymentOmit
    cODVerification?: CODVerificationOmit
    vendorEarning?: VendorEarningOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    orders: number
    affiliates: number
    earnings: number
    verifications: number
    stockMovements: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | UserCountOutputTypeCountOrdersArgs
    affiliates?: boolean | UserCountOutputTypeCountAffiliatesArgs
    earnings?: boolean | UserCountOutputTypeCountEarningsArgs
    verifications?: boolean | UserCountOutputTypeCountVerificationsArgs
    stockMovements?: boolean | UserCountOutputTypeCountStockMovementsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAffiliatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateLinkWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEarningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorEarningWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVerificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CODVerificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStockMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockMovementWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    movements: number
    orderItems: number
    affiliates: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movements?: boolean | ProductCountOutputTypeCountMovementsArgs
    orderItems?: boolean | ProductCountOutputTypeCountOrderItemsArgs
    affiliates?: boolean | ProductCountOutputTypeCountAffiliatesArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockMovementWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountAffiliatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateLinkWhereInput
  }


  /**
   * Count Type AffiliateLinkCountOutputType
   */

  export type AffiliateLinkCountOutputType = {
    orders: number
    vendorEarnings: number
  }

  export type AffiliateLinkCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | AffiliateLinkCountOutputTypeCountOrdersArgs
    vendorEarnings?: boolean | AffiliateLinkCountOutputTypeCountVendorEarningsArgs
  }

  // Custom InputTypes
  /**
   * AffiliateLinkCountOutputType without action
   */
  export type AffiliateLinkCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLinkCountOutputType
     */
    select?: AffiliateLinkCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AffiliateLinkCountOutputType without action
   */
  export type AffiliateLinkCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * AffiliateLinkCountOutputType without action
   */
  export type AffiliateLinkCountOutputTypeCountVendorEarningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorEarningWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
    earnings: number
    stockMovements: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
    earnings?: boolean | OrderCountOutputTypeCountEarningsArgs
    stockMovements?: boolean | OrderCountOutputTypeCountStockMovementsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountEarningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorEarningWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountStockMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockMovementWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    phone: string | null
    address: string | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    phone: string | null
    address: string | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    phone: number
    address: number
    roles: number
    updatedAt: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    address?: true
    updatedAt?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    address?: true
    updatedAt?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    address?: true
    roles?: true
    updatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    phone: string | null
    address: string | null
    roles: string[]
    updatedAt: Date
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    roles?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    orders?: boolean | User$ordersArgs<ExtArgs>
    affiliates?: boolean | User$affiliatesArgs<ExtArgs>
    earnings?: boolean | User$earningsArgs<ExtArgs>
    verifications?: boolean | User$verificationsArgs<ExtArgs>
    stockMovements?: boolean | User$stockMovementsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    roles?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    roles?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    roles?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "phone" | "address" | "roles" | "updatedAt" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | User$ordersArgs<ExtArgs>
    affiliates?: boolean | User$affiliatesArgs<ExtArgs>
    earnings?: boolean | User$earningsArgs<ExtArgs>
    verifications?: boolean | User$verificationsArgs<ExtArgs>
    stockMovements?: boolean | User$stockMovementsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      orders: Prisma.$OrderPayload<ExtArgs>[]
      affiliates: Prisma.$AffiliateLinkPayload<ExtArgs>[]
      earnings: Prisma.$VendorEarningPayload<ExtArgs>[]
      verifications: Prisma.$CODVerificationPayload<ExtArgs>[]
      stockMovements: Prisma.$StockMovementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      phone: string | null
      address: string | null
      roles: string[]
      updatedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orders<T extends User$ordersArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    affiliates<T extends User$affiliatesArgs<ExtArgs> = {}>(args?: Subset<T, User$affiliatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    earnings<T extends User$earningsArgs<ExtArgs> = {}>(args?: Subset<T, User$earningsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorEarningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    verifications<T extends User$verificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$verificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CODVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    stockMovements<T extends User$stockMovementsArgs<ExtArgs> = {}>(args?: Subset<T, User$stockMovementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
    readonly roles: FieldRef<"User", 'String[]'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.orders
   */
  export type User$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User.affiliates
   */
  export type User$affiliatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLink
     */
    select?: AffiliateLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLink
     */
    omit?: AffiliateLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateLinkInclude<ExtArgs> | null
    where?: AffiliateLinkWhereInput
    orderBy?: AffiliateLinkOrderByWithRelationInput | AffiliateLinkOrderByWithRelationInput[]
    cursor?: AffiliateLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AffiliateLinkScalarFieldEnum | AffiliateLinkScalarFieldEnum[]
  }

  /**
   * User.earnings
   */
  export type User$earningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorEarning
     */
    select?: VendorEarningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorEarning
     */
    omit?: VendorEarningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorEarningInclude<ExtArgs> | null
    where?: VendorEarningWhereInput
    orderBy?: VendorEarningOrderByWithRelationInput | VendorEarningOrderByWithRelationInput[]
    cursor?: VendorEarningWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VendorEarningScalarFieldEnum | VendorEarningScalarFieldEnum[]
  }

  /**
   * User.verifications
   */
  export type User$verificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CODVerification
     */
    select?: CODVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CODVerification
     */
    omit?: CODVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CODVerificationInclude<ExtArgs> | null
    where?: CODVerificationWhereInput
    orderBy?: CODVerificationOrderByWithRelationInput | CODVerificationOrderByWithRelationInput[]
    cursor?: CODVerificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CODVerificationScalarFieldEnum | CODVerificationScalarFieldEnum[]
  }

  /**
   * User.stockMovements
   */
  export type User$stockMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    where?: StockMovementWhereInput
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    cursor?: StockMovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model OtpCode
   */

  export type AggregateOtpCode = {
    _count: OtpCodeCountAggregateOutputType | null
    _min: OtpCodeMinAggregateOutputType | null
    _max: OtpCodeMaxAggregateOutputType | null
  }

  export type OtpCodeMinAggregateOutputType = {
    id: string | null
    email: string | null
    code: string | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
  }

  export type OtpCodeMaxAggregateOutputType = {
    id: string | null
    email: string | null
    code: string | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
  }

  export type OtpCodeCountAggregateOutputType = {
    id: number
    email: number
    code: number
    expiresAt: number
    used: number
    createdAt: number
    _all: number
  }


  export type OtpCodeMinAggregateInputType = {
    id?: true
    email?: true
    code?: true
    expiresAt?: true
    used?: true
    createdAt?: true
  }

  export type OtpCodeMaxAggregateInputType = {
    id?: true
    email?: true
    code?: true
    expiresAt?: true
    used?: true
    createdAt?: true
  }

  export type OtpCodeCountAggregateInputType = {
    id?: true
    email?: true
    code?: true
    expiresAt?: true
    used?: true
    createdAt?: true
    _all?: true
  }

  export type OtpCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpCode to aggregate.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OtpCodes
    **/
    _count?: true | OtpCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtpCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtpCodeMaxAggregateInputType
  }

  export type GetOtpCodeAggregateType<T extends OtpCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateOtpCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtpCode[P]>
      : GetScalarType<T[P], AggregateOtpCode[P]>
  }




  export type OtpCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpCodeWhereInput
    orderBy?: OtpCodeOrderByWithAggregationInput | OtpCodeOrderByWithAggregationInput[]
    by: OtpCodeScalarFieldEnum[] | OtpCodeScalarFieldEnum
    having?: OtpCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtpCodeCountAggregateInputType | true
    _min?: OtpCodeMinAggregateInputType
    _max?: OtpCodeMaxAggregateInputType
  }

  export type OtpCodeGroupByOutputType = {
    id: string
    email: string
    code: string
    expiresAt: Date
    used: boolean
    createdAt: Date
    _count: OtpCodeCountAggregateOutputType | null
    _min: OtpCodeMinAggregateOutputType | null
    _max: OtpCodeMaxAggregateOutputType | null
  }

  type GetOtpCodeGroupByPayload<T extends OtpCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtpCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtpCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtpCodeGroupByOutputType[P]>
            : GetScalarType<T[P], OtpCodeGroupByOutputType[P]>
        }
      >
    >


  export type OtpCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    code?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpCode"]>

  export type OtpCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    code?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpCode"]>

  export type OtpCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    code?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpCode"]>

  export type OtpCodeSelectScalar = {
    id?: boolean
    email?: boolean
    code?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
  }

  export type OtpCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "code" | "expiresAt" | "used" | "createdAt", ExtArgs["result"]["otpCode"]>

  export type $OtpCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OtpCode"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      code: string
      expiresAt: Date
      used: boolean
      createdAt: Date
    }, ExtArgs["result"]["otpCode"]>
    composites: {}
  }

  type OtpCodeGetPayload<S extends boolean | null | undefined | OtpCodeDefaultArgs> = $Result.GetResult<Prisma.$OtpCodePayload, S>

  type OtpCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OtpCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtpCodeCountAggregateInputType | true
    }

  export interface OtpCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OtpCode'], meta: { name: 'OtpCode' } }
    /**
     * Find zero or one OtpCode that matches the filter.
     * @param {OtpCodeFindUniqueArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OtpCodeFindUniqueArgs>(args: SelectSubset<T, OtpCodeFindUniqueArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OtpCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OtpCodeFindUniqueOrThrowArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OtpCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, OtpCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeFindFirstArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OtpCodeFindFirstArgs>(args?: SelectSubset<T, OtpCodeFindFirstArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeFindFirstOrThrowArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OtpCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, OtpCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OtpCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OtpCodes
     * const otpCodes = await prisma.otpCode.findMany()
     * 
     * // Get first 10 OtpCodes
     * const otpCodes = await prisma.otpCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otpCodeWithIdOnly = await prisma.otpCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OtpCodeFindManyArgs>(args?: SelectSubset<T, OtpCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OtpCode.
     * @param {OtpCodeCreateArgs} args - Arguments to create a OtpCode.
     * @example
     * // Create one OtpCode
     * const OtpCode = await prisma.otpCode.create({
     *   data: {
     *     // ... data to create a OtpCode
     *   }
     * })
     * 
     */
    create<T extends OtpCodeCreateArgs>(args: SelectSubset<T, OtpCodeCreateArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OtpCodes.
     * @param {OtpCodeCreateManyArgs} args - Arguments to create many OtpCodes.
     * @example
     * // Create many OtpCodes
     * const otpCode = await prisma.otpCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OtpCodeCreateManyArgs>(args?: SelectSubset<T, OtpCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OtpCodes and returns the data saved in the database.
     * @param {OtpCodeCreateManyAndReturnArgs} args - Arguments to create many OtpCodes.
     * @example
     * // Create many OtpCodes
     * const otpCode = await prisma.otpCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OtpCodes and only return the `id`
     * const otpCodeWithIdOnly = await prisma.otpCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OtpCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, OtpCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OtpCode.
     * @param {OtpCodeDeleteArgs} args - Arguments to delete one OtpCode.
     * @example
     * // Delete one OtpCode
     * const OtpCode = await prisma.otpCode.delete({
     *   where: {
     *     // ... filter to delete one OtpCode
     *   }
     * })
     * 
     */
    delete<T extends OtpCodeDeleteArgs>(args: SelectSubset<T, OtpCodeDeleteArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OtpCode.
     * @param {OtpCodeUpdateArgs} args - Arguments to update one OtpCode.
     * @example
     * // Update one OtpCode
     * const otpCode = await prisma.otpCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OtpCodeUpdateArgs>(args: SelectSubset<T, OtpCodeUpdateArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OtpCodes.
     * @param {OtpCodeDeleteManyArgs} args - Arguments to filter OtpCodes to delete.
     * @example
     * // Delete a few OtpCodes
     * const { count } = await prisma.otpCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OtpCodeDeleteManyArgs>(args?: SelectSubset<T, OtpCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OtpCodes
     * const otpCode = await prisma.otpCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OtpCodeUpdateManyArgs>(args: SelectSubset<T, OtpCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpCodes and returns the data updated in the database.
     * @param {OtpCodeUpdateManyAndReturnArgs} args - Arguments to update many OtpCodes.
     * @example
     * // Update many OtpCodes
     * const otpCode = await prisma.otpCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OtpCodes and only return the `id`
     * const otpCodeWithIdOnly = await prisma.otpCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OtpCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, OtpCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OtpCode.
     * @param {OtpCodeUpsertArgs} args - Arguments to update or create a OtpCode.
     * @example
     * // Update or create a OtpCode
     * const otpCode = await prisma.otpCode.upsert({
     *   create: {
     *     // ... data to create a OtpCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OtpCode we want to update
     *   }
     * })
     */
    upsert<T extends OtpCodeUpsertArgs>(args: SelectSubset<T, OtpCodeUpsertArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OtpCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeCountArgs} args - Arguments to filter OtpCodes to count.
     * @example
     * // Count the number of OtpCodes
     * const count = await prisma.otpCode.count({
     *   where: {
     *     // ... the filter for the OtpCodes we want to count
     *   }
     * })
    **/
    count<T extends OtpCodeCountArgs>(
      args?: Subset<T, OtpCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtpCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OtpCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OtpCodeAggregateArgs>(args: Subset<T, OtpCodeAggregateArgs>): Prisma.PrismaPromise<GetOtpCodeAggregateType<T>>

    /**
     * Group by OtpCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OtpCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OtpCodeGroupByArgs['orderBy'] }
        : { orderBy?: OtpCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OtpCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OtpCode model
   */
  readonly fields: OtpCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OtpCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OtpCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OtpCode model
   */
  interface OtpCodeFieldRefs {
    readonly id: FieldRef<"OtpCode", 'String'>
    readonly email: FieldRef<"OtpCode", 'String'>
    readonly code: FieldRef<"OtpCode", 'String'>
    readonly expiresAt: FieldRef<"OtpCode", 'DateTime'>
    readonly used: FieldRef<"OtpCode", 'Boolean'>
    readonly createdAt: FieldRef<"OtpCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OtpCode findUnique
   */
  export type OtpCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode findUniqueOrThrow
   */
  export type OtpCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode findFirst
   */
  export type OtpCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpCodes.
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpCodes.
     */
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * OtpCode findFirstOrThrow
   */
  export type OtpCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpCodes.
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpCodes.
     */
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * OtpCode findMany
   */
  export type OtpCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter, which OtpCodes to fetch.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OtpCodes.
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpCodes.
     */
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * OtpCode create
   */
  export type OtpCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data needed to create a OtpCode.
     */
    data: XOR<OtpCodeCreateInput, OtpCodeUncheckedCreateInput>
  }

  /**
   * OtpCode createMany
   */
  export type OtpCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OtpCodes.
     */
    data: OtpCodeCreateManyInput | OtpCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpCode createManyAndReturn
   */
  export type OtpCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data used to create many OtpCodes.
     */
    data: OtpCodeCreateManyInput | OtpCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpCode update
   */
  export type OtpCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data needed to update a OtpCode.
     */
    data: XOR<OtpCodeUpdateInput, OtpCodeUncheckedUpdateInput>
    /**
     * Choose, which OtpCode to update.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode updateMany
   */
  export type OtpCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OtpCodes.
     */
    data: XOR<OtpCodeUpdateManyMutationInput, OtpCodeUncheckedUpdateManyInput>
    /**
     * Filter which OtpCodes to update
     */
    where?: OtpCodeWhereInput
    /**
     * Limit how many OtpCodes to update.
     */
    limit?: number
  }

  /**
   * OtpCode updateManyAndReturn
   */
  export type OtpCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data used to update OtpCodes.
     */
    data: XOR<OtpCodeUpdateManyMutationInput, OtpCodeUncheckedUpdateManyInput>
    /**
     * Filter which OtpCodes to update
     */
    where?: OtpCodeWhereInput
    /**
     * Limit how many OtpCodes to update.
     */
    limit?: number
  }

  /**
   * OtpCode upsert
   */
  export type OtpCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The filter to search for the OtpCode to update in case it exists.
     */
    where: OtpCodeWhereUniqueInput
    /**
     * In case the OtpCode found by the `where` argument doesn't exist, create a new OtpCode with this data.
     */
    create: XOR<OtpCodeCreateInput, OtpCodeUncheckedCreateInput>
    /**
     * In case the OtpCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OtpCodeUpdateInput, OtpCodeUncheckedUpdateInput>
  }

  /**
   * OtpCode delete
   */
  export type OtpCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter which OtpCode to delete.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode deleteMany
   */
  export type OtpCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpCodes to delete
     */
    where?: OtpCodeWhereInput
    /**
     * Limit how many OtpCodes to delete.
     */
    limit?: number
  }

  /**
   * OtpCode without action
   */
  export type OtpCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: number | null
    totalStock: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: number | null
    totalStock: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    description: string | null
    price: number | null
    totalStock: number | null
    status: string | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    description: string | null
    price: number | null
    totalStock: number | null
    status: string | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    slug: number
    title: number
    description: number
    price: number
    totalStock: number
    status: number
    updatedAt: number
    createdAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
    totalStock?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
    totalStock?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    description?: true
    price?: true
    totalStock?: true
    status?: true
    updatedAt?: true
    createdAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    description?: true
    price?: true
    totalStock?: true
    status?: true
    updatedAt?: true
    createdAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    description?: true
    price?: true
    totalStock?: true
    status?: true
    updatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    slug: string
    title: string
    description: string | null
    price: number
    totalStock: number
    status: string
    updatedAt: Date
    createdAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    totalStock?: boolean
    status?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    movements?: boolean | Product$movementsArgs<ExtArgs>
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    affiliates?: boolean | Product$affiliatesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    totalStock?: boolean
    status?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    totalStock?: boolean
    status?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    totalStock?: boolean
    status?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "title" | "description" | "price" | "totalStock" | "status" | "updatedAt" | "createdAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movements?: boolean | Product$movementsArgs<ExtArgs>
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    affiliates?: boolean | Product$affiliatesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      movements: Prisma.$StockMovementPayload<ExtArgs>[]
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[]
      affiliates: Prisma.$AffiliateLinkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      title: string
      description: string | null
      price: number
      totalStock: number
      status: string
      updatedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    movements<T extends Product$movementsArgs<ExtArgs> = {}>(args?: Subset<T, Product$movementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orderItems<T extends Product$orderItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    affiliates<T extends Product$affiliatesArgs<ExtArgs> = {}>(args?: Subset<T, Product$affiliatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly slug: FieldRef<"Product", 'String'>
    readonly title: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Float'>
    readonly totalStock: FieldRef<"Product", 'Int'>
    readonly status: FieldRef<"Product", 'String'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.movements
   */
  export type Product$movementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    where?: StockMovementWhereInput
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    cursor?: StockMovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * Product.orderItems
   */
  export type Product$orderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Product.affiliates
   */
  export type Product$affiliatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLink
     */
    select?: AffiliateLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLink
     */
    omit?: AffiliateLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateLinkInclude<ExtArgs> | null
    where?: AffiliateLinkWhereInput
    orderBy?: AffiliateLinkOrderByWithRelationInput | AffiliateLinkOrderByWithRelationInput[]
    cursor?: AffiliateLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AffiliateLinkScalarFieldEnum | AffiliateLinkScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model StockMovement
   */

  export type AggregateStockMovement = {
    _count: StockMovementCountAggregateOutputType | null
    _avg: StockMovementAvgAggregateOutputType | null
    _sum: StockMovementSumAggregateOutputType | null
    _min: StockMovementMinAggregateOutputType | null
    _max: StockMovementMaxAggregateOutputType | null
  }

  export type StockMovementAvgAggregateOutputType = {
    quantity: number | null
  }

  export type StockMovementSumAggregateOutputType = {
    quantity: number | null
  }

  export type StockMovementMinAggregateOutputType = {
    id: string | null
    productId: string | null
    type: $Enums.StockMovementType | null
    quantity: number | null
    reason: string | null
    orderId: string | null
    userId: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type StockMovementMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    type: $Enums.StockMovementType | null
    quantity: number | null
    reason: string | null
    orderId: string | null
    userId: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type StockMovementCountAggregateOutputType = {
    id: number
    productId: number
    type: number
    quantity: number
    reason: number
    orderId: number
    userId: number
    notes: number
    createdAt: number
    _all: number
  }


  export type StockMovementAvgAggregateInputType = {
    quantity?: true
  }

  export type StockMovementSumAggregateInputType = {
    quantity?: true
  }

  export type StockMovementMinAggregateInputType = {
    id?: true
    productId?: true
    type?: true
    quantity?: true
    reason?: true
    orderId?: true
    userId?: true
    notes?: true
    createdAt?: true
  }

  export type StockMovementMaxAggregateInputType = {
    id?: true
    productId?: true
    type?: true
    quantity?: true
    reason?: true
    orderId?: true
    userId?: true
    notes?: true
    createdAt?: true
  }

  export type StockMovementCountAggregateInputType = {
    id?: true
    productId?: true
    type?: true
    quantity?: true
    reason?: true
    orderId?: true
    userId?: true
    notes?: true
    createdAt?: true
    _all?: true
  }

  export type StockMovementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockMovement to aggregate.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StockMovements
    **/
    _count?: true | StockMovementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockMovementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockMovementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockMovementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockMovementMaxAggregateInputType
  }

  export type GetStockMovementAggregateType<T extends StockMovementAggregateArgs> = {
        [P in keyof T & keyof AggregateStockMovement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStockMovement[P]>
      : GetScalarType<T[P], AggregateStockMovement[P]>
  }




  export type StockMovementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockMovementWhereInput
    orderBy?: StockMovementOrderByWithAggregationInput | StockMovementOrderByWithAggregationInput[]
    by: StockMovementScalarFieldEnum[] | StockMovementScalarFieldEnum
    having?: StockMovementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockMovementCountAggregateInputType | true
    _avg?: StockMovementAvgAggregateInputType
    _sum?: StockMovementSumAggregateInputType
    _min?: StockMovementMinAggregateInputType
    _max?: StockMovementMaxAggregateInputType
  }

  export type StockMovementGroupByOutputType = {
    id: string
    productId: string
    type: $Enums.StockMovementType
    quantity: number
    reason: string
    orderId: string | null
    userId: string | null
    notes: string | null
    createdAt: Date
    _count: StockMovementCountAggregateOutputType | null
    _avg: StockMovementAvgAggregateOutputType | null
    _sum: StockMovementSumAggregateOutputType | null
    _min: StockMovementMinAggregateOutputType | null
    _max: StockMovementMaxAggregateOutputType | null
  }

  type GetStockMovementGroupByPayload<T extends StockMovementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockMovementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockMovementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockMovementGroupByOutputType[P]>
            : GetScalarType<T[P], StockMovementGroupByOutputType[P]>
        }
      >
    >


  export type StockMovementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    type?: boolean
    quantity?: boolean
    reason?: boolean
    orderId?: boolean
    userId?: boolean
    notes?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    order?: boolean | StockMovement$orderArgs<ExtArgs>
    user?: boolean | StockMovement$userArgs<ExtArgs>
  }, ExtArgs["result"]["stockMovement"]>

  export type StockMovementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    type?: boolean
    quantity?: boolean
    reason?: boolean
    orderId?: boolean
    userId?: boolean
    notes?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    order?: boolean | StockMovement$orderArgs<ExtArgs>
    user?: boolean | StockMovement$userArgs<ExtArgs>
  }, ExtArgs["result"]["stockMovement"]>

  export type StockMovementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    type?: boolean
    quantity?: boolean
    reason?: boolean
    orderId?: boolean
    userId?: boolean
    notes?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    order?: boolean | StockMovement$orderArgs<ExtArgs>
    user?: boolean | StockMovement$userArgs<ExtArgs>
  }, ExtArgs["result"]["stockMovement"]>

  export type StockMovementSelectScalar = {
    id?: boolean
    productId?: boolean
    type?: boolean
    quantity?: boolean
    reason?: boolean
    orderId?: boolean
    userId?: boolean
    notes?: boolean
    createdAt?: boolean
  }

  export type StockMovementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "type" | "quantity" | "reason" | "orderId" | "userId" | "notes" | "createdAt", ExtArgs["result"]["stockMovement"]>
  export type StockMovementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    order?: boolean | StockMovement$orderArgs<ExtArgs>
    user?: boolean | StockMovement$userArgs<ExtArgs>
  }
  export type StockMovementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    order?: boolean | StockMovement$orderArgs<ExtArgs>
    user?: boolean | StockMovement$userArgs<ExtArgs>
  }
  export type StockMovementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    order?: boolean | StockMovement$orderArgs<ExtArgs>
    user?: boolean | StockMovement$userArgs<ExtArgs>
  }

  export type $StockMovementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StockMovement"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      order: Prisma.$OrderPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      type: $Enums.StockMovementType
      quantity: number
      reason: string
      orderId: string | null
      userId: string | null
      notes: string | null
      createdAt: Date
    }, ExtArgs["result"]["stockMovement"]>
    composites: {}
  }

  type StockMovementGetPayload<S extends boolean | null | undefined | StockMovementDefaultArgs> = $Result.GetResult<Prisma.$StockMovementPayload, S>

  type StockMovementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockMovementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockMovementCountAggregateInputType | true
    }

  export interface StockMovementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StockMovement'], meta: { name: 'StockMovement' } }
    /**
     * Find zero or one StockMovement that matches the filter.
     * @param {StockMovementFindUniqueArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockMovementFindUniqueArgs>(args: SelectSubset<T, StockMovementFindUniqueArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StockMovement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockMovementFindUniqueOrThrowArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockMovementFindUniqueOrThrowArgs>(args: SelectSubset<T, StockMovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockMovement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindFirstArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockMovementFindFirstArgs>(args?: SelectSubset<T, StockMovementFindFirstArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockMovement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindFirstOrThrowArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockMovementFindFirstOrThrowArgs>(args?: SelectSubset<T, StockMovementFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StockMovements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockMovements
     * const stockMovements = await prisma.stockMovement.findMany()
     * 
     * // Get first 10 StockMovements
     * const stockMovements = await prisma.stockMovement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockMovementWithIdOnly = await prisma.stockMovement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockMovementFindManyArgs>(args?: SelectSubset<T, StockMovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StockMovement.
     * @param {StockMovementCreateArgs} args - Arguments to create a StockMovement.
     * @example
     * // Create one StockMovement
     * const StockMovement = await prisma.stockMovement.create({
     *   data: {
     *     // ... data to create a StockMovement
     *   }
     * })
     * 
     */
    create<T extends StockMovementCreateArgs>(args: SelectSubset<T, StockMovementCreateArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StockMovements.
     * @param {StockMovementCreateManyArgs} args - Arguments to create many StockMovements.
     * @example
     * // Create many StockMovements
     * const stockMovement = await prisma.stockMovement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockMovementCreateManyArgs>(args?: SelectSubset<T, StockMovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StockMovements and returns the data saved in the database.
     * @param {StockMovementCreateManyAndReturnArgs} args - Arguments to create many StockMovements.
     * @example
     * // Create many StockMovements
     * const stockMovement = await prisma.stockMovement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StockMovements and only return the `id`
     * const stockMovementWithIdOnly = await prisma.stockMovement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockMovementCreateManyAndReturnArgs>(args?: SelectSubset<T, StockMovementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StockMovement.
     * @param {StockMovementDeleteArgs} args - Arguments to delete one StockMovement.
     * @example
     * // Delete one StockMovement
     * const StockMovement = await prisma.stockMovement.delete({
     *   where: {
     *     // ... filter to delete one StockMovement
     *   }
     * })
     * 
     */
    delete<T extends StockMovementDeleteArgs>(args: SelectSubset<T, StockMovementDeleteArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StockMovement.
     * @param {StockMovementUpdateArgs} args - Arguments to update one StockMovement.
     * @example
     * // Update one StockMovement
     * const stockMovement = await prisma.stockMovement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockMovementUpdateArgs>(args: SelectSubset<T, StockMovementUpdateArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StockMovements.
     * @param {StockMovementDeleteManyArgs} args - Arguments to filter StockMovements to delete.
     * @example
     * // Delete a few StockMovements
     * const { count } = await prisma.stockMovement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockMovementDeleteManyArgs>(args?: SelectSubset<T, StockMovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockMovements
     * const stockMovement = await prisma.stockMovement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockMovementUpdateManyArgs>(args: SelectSubset<T, StockMovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockMovements and returns the data updated in the database.
     * @param {StockMovementUpdateManyAndReturnArgs} args - Arguments to update many StockMovements.
     * @example
     * // Update many StockMovements
     * const stockMovement = await prisma.stockMovement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StockMovements and only return the `id`
     * const stockMovementWithIdOnly = await prisma.stockMovement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StockMovementUpdateManyAndReturnArgs>(args: SelectSubset<T, StockMovementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StockMovement.
     * @param {StockMovementUpsertArgs} args - Arguments to update or create a StockMovement.
     * @example
     * // Update or create a StockMovement
     * const stockMovement = await prisma.stockMovement.upsert({
     *   create: {
     *     // ... data to create a StockMovement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockMovement we want to update
     *   }
     * })
     */
    upsert<T extends StockMovementUpsertArgs>(args: SelectSubset<T, StockMovementUpsertArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementCountArgs} args - Arguments to filter StockMovements to count.
     * @example
     * // Count the number of StockMovements
     * const count = await prisma.stockMovement.count({
     *   where: {
     *     // ... the filter for the StockMovements we want to count
     *   }
     * })
    **/
    count<T extends StockMovementCountArgs>(
      args?: Subset<T, StockMovementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockMovementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StockMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockMovementAggregateArgs>(args: Subset<T, StockMovementAggregateArgs>): Prisma.PrismaPromise<GetStockMovementAggregateType<T>>

    /**
     * Group by StockMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StockMovementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockMovementGroupByArgs['orderBy'] }
        : { orderBy?: StockMovementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StockMovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StockMovement model
   */
  readonly fields: StockMovementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StockMovement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockMovementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    order<T extends StockMovement$orderArgs<ExtArgs> = {}>(args?: Subset<T, StockMovement$orderArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends StockMovement$userArgs<ExtArgs> = {}>(args?: Subset<T, StockMovement$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StockMovement model
   */
  interface StockMovementFieldRefs {
    readonly id: FieldRef<"StockMovement", 'String'>
    readonly productId: FieldRef<"StockMovement", 'String'>
    readonly type: FieldRef<"StockMovement", 'StockMovementType'>
    readonly quantity: FieldRef<"StockMovement", 'Int'>
    readonly reason: FieldRef<"StockMovement", 'String'>
    readonly orderId: FieldRef<"StockMovement", 'String'>
    readonly userId: FieldRef<"StockMovement", 'String'>
    readonly notes: FieldRef<"StockMovement", 'String'>
    readonly createdAt: FieldRef<"StockMovement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StockMovement findUnique
   */
  export type StockMovementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement findUniqueOrThrow
   */
  export type StockMovementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement findFirst
   */
  export type StockMovementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockMovements.
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockMovements.
     */
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * StockMovement findFirstOrThrow
   */
  export type StockMovementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockMovements.
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockMovements.
     */
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * StockMovement findMany
   */
  export type StockMovementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter, which StockMovements to fetch.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StockMovements.
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockMovements.
     */
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * StockMovement create
   */
  export type StockMovementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * The data needed to create a StockMovement.
     */
    data: XOR<StockMovementCreateInput, StockMovementUncheckedCreateInput>
  }

  /**
   * StockMovement createMany
   */
  export type StockMovementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockMovements.
     */
    data: StockMovementCreateManyInput | StockMovementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockMovement createManyAndReturn
   */
  export type StockMovementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * The data used to create many StockMovements.
     */
    data: StockMovementCreateManyInput | StockMovementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockMovement update
   */
  export type StockMovementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * The data needed to update a StockMovement.
     */
    data: XOR<StockMovementUpdateInput, StockMovementUncheckedUpdateInput>
    /**
     * Choose, which StockMovement to update.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement updateMany
   */
  export type StockMovementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StockMovements.
     */
    data: XOR<StockMovementUpdateManyMutationInput, StockMovementUncheckedUpdateManyInput>
    /**
     * Filter which StockMovements to update
     */
    where?: StockMovementWhereInput
    /**
     * Limit how many StockMovements to update.
     */
    limit?: number
  }

  /**
   * StockMovement updateManyAndReturn
   */
  export type StockMovementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * The data used to update StockMovements.
     */
    data: XOR<StockMovementUpdateManyMutationInput, StockMovementUncheckedUpdateManyInput>
    /**
     * Filter which StockMovements to update
     */
    where?: StockMovementWhereInput
    /**
     * Limit how many StockMovements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockMovement upsert
   */
  export type StockMovementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * The filter to search for the StockMovement to update in case it exists.
     */
    where: StockMovementWhereUniqueInput
    /**
     * In case the StockMovement found by the `where` argument doesn't exist, create a new StockMovement with this data.
     */
    create: XOR<StockMovementCreateInput, StockMovementUncheckedCreateInput>
    /**
     * In case the StockMovement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockMovementUpdateInput, StockMovementUncheckedUpdateInput>
  }

  /**
   * StockMovement delete
   */
  export type StockMovementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    /**
     * Filter which StockMovement to delete.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement deleteMany
   */
  export type StockMovementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockMovements to delete
     */
    where?: StockMovementWhereInput
    /**
     * Limit how many StockMovements to delete.
     */
    limit?: number
  }

  /**
   * StockMovement.order
   */
  export type StockMovement$orderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
  }

  /**
   * StockMovement.user
   */
  export type StockMovement$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * StockMovement without action
   */
  export type StockMovementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
  }


  /**
   * Model AffiliateLink
   */

  export type AggregateAffiliateLink = {
    _count: AffiliateLinkCountAggregateOutputType | null
    _avg: AffiliateLinkAvgAggregateOutputType | null
    _sum: AffiliateLinkSumAggregateOutputType | null
    _min: AffiliateLinkMinAggregateOutputType | null
    _max: AffiliateLinkMaxAggregateOutputType | null
  }

  export type AffiliateLinkAvgAggregateOutputType = {
    discountValue: number | null
    commissionValue: number | null
  }

  export type AffiliateLinkSumAggregateOutputType = {
    discountValue: number | null
    commissionValue: number | null
  }

  export type AffiliateLinkMinAggregateOutputType = {
    id: string | null
    code: string | null
    vendorId: string | null
    productId: string | null
    discountType: string | null
    discountValue: number | null
    commissionType: string | null
    commissionValue: number | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type AffiliateLinkMaxAggregateOutputType = {
    id: string | null
    code: string | null
    vendorId: string | null
    productId: string | null
    discountType: string | null
    discountValue: number | null
    commissionType: string | null
    commissionValue: number | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type AffiliateLinkCountAggregateOutputType = {
    id: number
    code: number
    vendorId: number
    productId: number
    discountType: number
    discountValue: number
    commissionType: number
    commissionValue: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type AffiliateLinkAvgAggregateInputType = {
    discountValue?: true
    commissionValue?: true
  }

  export type AffiliateLinkSumAggregateInputType = {
    discountValue?: true
    commissionValue?: true
  }

  export type AffiliateLinkMinAggregateInputType = {
    id?: true
    code?: true
    vendorId?: true
    productId?: true
    discountType?: true
    discountValue?: true
    commissionType?: true
    commissionValue?: true
    isActive?: true
    createdAt?: true
  }

  export type AffiliateLinkMaxAggregateInputType = {
    id?: true
    code?: true
    vendorId?: true
    productId?: true
    discountType?: true
    discountValue?: true
    commissionType?: true
    commissionValue?: true
    isActive?: true
    createdAt?: true
  }

  export type AffiliateLinkCountAggregateInputType = {
    id?: true
    code?: true
    vendorId?: true
    productId?: true
    discountType?: true
    discountValue?: true
    commissionType?: true
    commissionValue?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type AffiliateLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliateLink to aggregate.
     */
    where?: AffiliateLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateLinks to fetch.
     */
    orderBy?: AffiliateLinkOrderByWithRelationInput | AffiliateLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AffiliateLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AffiliateLinks
    **/
    _count?: true | AffiliateLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AffiliateLinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AffiliateLinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AffiliateLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AffiliateLinkMaxAggregateInputType
  }

  export type GetAffiliateLinkAggregateType<T extends AffiliateLinkAggregateArgs> = {
        [P in keyof T & keyof AggregateAffiliateLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAffiliateLink[P]>
      : GetScalarType<T[P], AggregateAffiliateLink[P]>
  }




  export type AffiliateLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateLinkWhereInput
    orderBy?: AffiliateLinkOrderByWithAggregationInput | AffiliateLinkOrderByWithAggregationInput[]
    by: AffiliateLinkScalarFieldEnum[] | AffiliateLinkScalarFieldEnum
    having?: AffiliateLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AffiliateLinkCountAggregateInputType | true
    _avg?: AffiliateLinkAvgAggregateInputType
    _sum?: AffiliateLinkSumAggregateInputType
    _min?: AffiliateLinkMinAggregateInputType
    _max?: AffiliateLinkMaxAggregateInputType
  }

  export type AffiliateLinkGroupByOutputType = {
    id: string
    code: string
    vendorId: string
    productId: string | null
    discountType: string
    discountValue: number
    commissionType: string
    commissionValue: number
    isActive: boolean
    createdAt: Date
    _count: AffiliateLinkCountAggregateOutputType | null
    _avg: AffiliateLinkAvgAggregateOutputType | null
    _sum: AffiliateLinkSumAggregateOutputType | null
    _min: AffiliateLinkMinAggregateOutputType | null
    _max: AffiliateLinkMaxAggregateOutputType | null
  }

  type GetAffiliateLinkGroupByPayload<T extends AffiliateLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AffiliateLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AffiliateLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AffiliateLinkGroupByOutputType[P]>
            : GetScalarType<T[P], AffiliateLinkGroupByOutputType[P]>
        }
      >
    >


  export type AffiliateLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    vendorId?: boolean
    productId?: boolean
    discountType?: boolean
    discountValue?: boolean
    commissionType?: boolean
    commissionValue?: boolean
    isActive?: boolean
    createdAt?: boolean
    vendor?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | AffiliateLink$productArgs<ExtArgs>
    orders?: boolean | AffiliateLink$ordersArgs<ExtArgs>
    vendorEarnings?: boolean | AffiliateLink$vendorEarningsArgs<ExtArgs>
    _count?: boolean | AffiliateLinkCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliateLink"]>

  export type AffiliateLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    vendorId?: boolean
    productId?: boolean
    discountType?: boolean
    discountValue?: boolean
    commissionType?: boolean
    commissionValue?: boolean
    isActive?: boolean
    createdAt?: boolean
    vendor?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | AffiliateLink$productArgs<ExtArgs>
  }, ExtArgs["result"]["affiliateLink"]>

  export type AffiliateLinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    vendorId?: boolean
    productId?: boolean
    discountType?: boolean
    discountValue?: boolean
    commissionType?: boolean
    commissionValue?: boolean
    isActive?: boolean
    createdAt?: boolean
    vendor?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | AffiliateLink$productArgs<ExtArgs>
  }, ExtArgs["result"]["affiliateLink"]>

  export type AffiliateLinkSelectScalar = {
    id?: boolean
    code?: boolean
    vendorId?: boolean
    productId?: boolean
    discountType?: boolean
    discountValue?: boolean
    commissionType?: boolean
    commissionValue?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type AffiliateLinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "vendorId" | "productId" | "discountType" | "discountValue" | "commissionType" | "commissionValue" | "isActive" | "createdAt", ExtArgs["result"]["affiliateLink"]>
  export type AffiliateLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | AffiliateLink$productArgs<ExtArgs>
    orders?: boolean | AffiliateLink$ordersArgs<ExtArgs>
    vendorEarnings?: boolean | AffiliateLink$vendorEarningsArgs<ExtArgs>
    _count?: boolean | AffiliateLinkCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AffiliateLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | AffiliateLink$productArgs<ExtArgs>
  }
  export type AffiliateLinkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | AffiliateLink$productArgs<ExtArgs>
  }

  export type $AffiliateLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AffiliateLink"
    objects: {
      vendor: Prisma.$UserPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs> | null
      orders: Prisma.$OrderPayload<ExtArgs>[]
      vendorEarnings: Prisma.$VendorEarningPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      vendorId: string
      productId: string | null
      discountType: string
      discountValue: number
      commissionType: string
      commissionValue: number
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["affiliateLink"]>
    composites: {}
  }

  type AffiliateLinkGetPayload<S extends boolean | null | undefined | AffiliateLinkDefaultArgs> = $Result.GetResult<Prisma.$AffiliateLinkPayload, S>

  type AffiliateLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AffiliateLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AffiliateLinkCountAggregateInputType | true
    }

  export interface AffiliateLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AffiliateLink'], meta: { name: 'AffiliateLink' } }
    /**
     * Find zero or one AffiliateLink that matches the filter.
     * @param {AffiliateLinkFindUniqueArgs} args - Arguments to find a AffiliateLink
     * @example
     * // Get one AffiliateLink
     * const affiliateLink = await prisma.affiliateLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AffiliateLinkFindUniqueArgs>(args: SelectSubset<T, AffiliateLinkFindUniqueArgs<ExtArgs>>): Prisma__AffiliateLinkClient<$Result.GetResult<Prisma.$AffiliateLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AffiliateLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AffiliateLinkFindUniqueOrThrowArgs} args - Arguments to find a AffiliateLink
     * @example
     * // Get one AffiliateLink
     * const affiliateLink = await prisma.affiliateLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AffiliateLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, AffiliateLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AffiliateLinkClient<$Result.GetResult<Prisma.$AffiliateLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliateLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateLinkFindFirstArgs} args - Arguments to find a AffiliateLink
     * @example
     * // Get one AffiliateLink
     * const affiliateLink = await prisma.affiliateLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AffiliateLinkFindFirstArgs>(args?: SelectSubset<T, AffiliateLinkFindFirstArgs<ExtArgs>>): Prisma__AffiliateLinkClient<$Result.GetResult<Prisma.$AffiliateLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliateLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateLinkFindFirstOrThrowArgs} args - Arguments to find a AffiliateLink
     * @example
     * // Get one AffiliateLink
     * const affiliateLink = await prisma.affiliateLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AffiliateLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, AffiliateLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__AffiliateLinkClient<$Result.GetResult<Prisma.$AffiliateLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AffiliateLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AffiliateLinks
     * const affiliateLinks = await prisma.affiliateLink.findMany()
     * 
     * // Get first 10 AffiliateLinks
     * const affiliateLinks = await prisma.affiliateLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const affiliateLinkWithIdOnly = await prisma.affiliateLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AffiliateLinkFindManyArgs>(args?: SelectSubset<T, AffiliateLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AffiliateLink.
     * @param {AffiliateLinkCreateArgs} args - Arguments to create a AffiliateLink.
     * @example
     * // Create one AffiliateLink
     * const AffiliateLink = await prisma.affiliateLink.create({
     *   data: {
     *     // ... data to create a AffiliateLink
     *   }
     * })
     * 
     */
    create<T extends AffiliateLinkCreateArgs>(args: SelectSubset<T, AffiliateLinkCreateArgs<ExtArgs>>): Prisma__AffiliateLinkClient<$Result.GetResult<Prisma.$AffiliateLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AffiliateLinks.
     * @param {AffiliateLinkCreateManyArgs} args - Arguments to create many AffiliateLinks.
     * @example
     * // Create many AffiliateLinks
     * const affiliateLink = await prisma.affiliateLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AffiliateLinkCreateManyArgs>(args?: SelectSubset<T, AffiliateLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AffiliateLinks and returns the data saved in the database.
     * @param {AffiliateLinkCreateManyAndReturnArgs} args - Arguments to create many AffiliateLinks.
     * @example
     * // Create many AffiliateLinks
     * const affiliateLink = await prisma.affiliateLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AffiliateLinks and only return the `id`
     * const affiliateLinkWithIdOnly = await prisma.affiliateLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AffiliateLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, AffiliateLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AffiliateLink.
     * @param {AffiliateLinkDeleteArgs} args - Arguments to delete one AffiliateLink.
     * @example
     * // Delete one AffiliateLink
     * const AffiliateLink = await prisma.affiliateLink.delete({
     *   where: {
     *     // ... filter to delete one AffiliateLink
     *   }
     * })
     * 
     */
    delete<T extends AffiliateLinkDeleteArgs>(args: SelectSubset<T, AffiliateLinkDeleteArgs<ExtArgs>>): Prisma__AffiliateLinkClient<$Result.GetResult<Prisma.$AffiliateLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AffiliateLink.
     * @param {AffiliateLinkUpdateArgs} args - Arguments to update one AffiliateLink.
     * @example
     * // Update one AffiliateLink
     * const affiliateLink = await prisma.affiliateLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AffiliateLinkUpdateArgs>(args: SelectSubset<T, AffiliateLinkUpdateArgs<ExtArgs>>): Prisma__AffiliateLinkClient<$Result.GetResult<Prisma.$AffiliateLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AffiliateLinks.
     * @param {AffiliateLinkDeleteManyArgs} args - Arguments to filter AffiliateLinks to delete.
     * @example
     * // Delete a few AffiliateLinks
     * const { count } = await prisma.affiliateLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AffiliateLinkDeleteManyArgs>(args?: SelectSubset<T, AffiliateLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliateLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AffiliateLinks
     * const affiliateLink = await prisma.affiliateLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AffiliateLinkUpdateManyArgs>(args: SelectSubset<T, AffiliateLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliateLinks and returns the data updated in the database.
     * @param {AffiliateLinkUpdateManyAndReturnArgs} args - Arguments to update many AffiliateLinks.
     * @example
     * // Update many AffiliateLinks
     * const affiliateLink = await prisma.affiliateLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AffiliateLinks and only return the `id`
     * const affiliateLinkWithIdOnly = await prisma.affiliateLink.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AffiliateLinkUpdateManyAndReturnArgs>(args: SelectSubset<T, AffiliateLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AffiliateLink.
     * @param {AffiliateLinkUpsertArgs} args - Arguments to update or create a AffiliateLink.
     * @example
     * // Update or create a AffiliateLink
     * const affiliateLink = await prisma.affiliateLink.upsert({
     *   create: {
     *     // ... data to create a AffiliateLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AffiliateLink we want to update
     *   }
     * })
     */
    upsert<T extends AffiliateLinkUpsertArgs>(args: SelectSubset<T, AffiliateLinkUpsertArgs<ExtArgs>>): Prisma__AffiliateLinkClient<$Result.GetResult<Prisma.$AffiliateLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AffiliateLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateLinkCountArgs} args - Arguments to filter AffiliateLinks to count.
     * @example
     * // Count the number of AffiliateLinks
     * const count = await prisma.affiliateLink.count({
     *   where: {
     *     // ... the filter for the AffiliateLinks we want to count
     *   }
     * })
    **/
    count<T extends AffiliateLinkCountArgs>(
      args?: Subset<T, AffiliateLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AffiliateLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AffiliateLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AffiliateLinkAggregateArgs>(args: Subset<T, AffiliateLinkAggregateArgs>): Prisma.PrismaPromise<GetAffiliateLinkAggregateType<T>>

    /**
     * Group by AffiliateLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateLinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AffiliateLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AffiliateLinkGroupByArgs['orderBy'] }
        : { orderBy?: AffiliateLinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AffiliateLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAffiliateLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AffiliateLink model
   */
  readonly fields: AffiliateLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AffiliateLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AffiliateLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vendor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends AffiliateLink$productArgs<ExtArgs> = {}>(args?: Subset<T, AffiliateLink$productArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    orders<T extends AffiliateLink$ordersArgs<ExtArgs> = {}>(args?: Subset<T, AffiliateLink$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    vendorEarnings<T extends AffiliateLink$vendorEarningsArgs<ExtArgs> = {}>(args?: Subset<T, AffiliateLink$vendorEarningsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorEarningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AffiliateLink model
   */
  interface AffiliateLinkFieldRefs {
    readonly id: FieldRef<"AffiliateLink", 'String'>
    readonly code: FieldRef<"AffiliateLink", 'String'>
    readonly vendorId: FieldRef<"AffiliateLink", 'String'>
    readonly productId: FieldRef<"AffiliateLink", 'String'>
    readonly discountType: FieldRef<"AffiliateLink", 'String'>
    readonly discountValue: FieldRef<"AffiliateLink", 'Float'>
    readonly commissionType: FieldRef<"AffiliateLink", 'String'>
    readonly commissionValue: FieldRef<"AffiliateLink", 'Float'>
    readonly isActive: FieldRef<"AffiliateLink", 'Boolean'>
    readonly createdAt: FieldRef<"AffiliateLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AffiliateLink findUnique
   */
  export type AffiliateLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLink
     */
    select?: AffiliateLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLink
     */
    omit?: AffiliateLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateLinkInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateLink to fetch.
     */
    where: AffiliateLinkWhereUniqueInput
  }

  /**
   * AffiliateLink findUniqueOrThrow
   */
  export type AffiliateLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLink
     */
    select?: AffiliateLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLink
     */
    omit?: AffiliateLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateLinkInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateLink to fetch.
     */
    where: AffiliateLinkWhereUniqueInput
  }

  /**
   * AffiliateLink findFirst
   */
  export type AffiliateLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLink
     */
    select?: AffiliateLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLink
     */
    omit?: AffiliateLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateLinkInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateLink to fetch.
     */
    where?: AffiliateLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateLinks to fetch.
     */
    orderBy?: AffiliateLinkOrderByWithRelationInput | AffiliateLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliateLinks.
     */
    cursor?: AffiliateLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateLinks.
     */
    distinct?: AffiliateLinkScalarFieldEnum | AffiliateLinkScalarFieldEnum[]
  }

  /**
   * AffiliateLink findFirstOrThrow
   */
  export type AffiliateLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLink
     */
    select?: AffiliateLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLink
     */
    omit?: AffiliateLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateLinkInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateLink to fetch.
     */
    where?: AffiliateLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateLinks to fetch.
     */
    orderBy?: AffiliateLinkOrderByWithRelationInput | AffiliateLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliateLinks.
     */
    cursor?: AffiliateLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateLinks.
     */
    distinct?: AffiliateLinkScalarFieldEnum | AffiliateLinkScalarFieldEnum[]
  }

  /**
   * AffiliateLink findMany
   */
  export type AffiliateLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLink
     */
    select?: AffiliateLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLink
     */
    omit?: AffiliateLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateLinkInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateLinks to fetch.
     */
    where?: AffiliateLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateLinks to fetch.
     */
    orderBy?: AffiliateLinkOrderByWithRelationInput | AffiliateLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AffiliateLinks.
     */
    cursor?: AffiliateLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateLinks.
     */
    distinct?: AffiliateLinkScalarFieldEnum | AffiliateLinkScalarFieldEnum[]
  }

  /**
   * AffiliateLink create
   */
  export type AffiliateLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLink
     */
    select?: AffiliateLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLink
     */
    omit?: AffiliateLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a AffiliateLink.
     */
    data: XOR<AffiliateLinkCreateInput, AffiliateLinkUncheckedCreateInput>
  }

  /**
   * AffiliateLink createMany
   */
  export type AffiliateLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AffiliateLinks.
     */
    data: AffiliateLinkCreateManyInput | AffiliateLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AffiliateLink createManyAndReturn
   */
  export type AffiliateLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLink
     */
    select?: AffiliateLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLink
     */
    omit?: AffiliateLinkOmit<ExtArgs> | null
    /**
     * The data used to create many AffiliateLinks.
     */
    data: AffiliateLinkCreateManyInput | AffiliateLinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateLinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AffiliateLink update
   */
  export type AffiliateLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLink
     */
    select?: AffiliateLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLink
     */
    omit?: AffiliateLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a AffiliateLink.
     */
    data: XOR<AffiliateLinkUpdateInput, AffiliateLinkUncheckedUpdateInput>
    /**
     * Choose, which AffiliateLink to update.
     */
    where: AffiliateLinkWhereUniqueInput
  }

  /**
   * AffiliateLink updateMany
   */
  export type AffiliateLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AffiliateLinks.
     */
    data: XOR<AffiliateLinkUpdateManyMutationInput, AffiliateLinkUncheckedUpdateManyInput>
    /**
     * Filter which AffiliateLinks to update
     */
    where?: AffiliateLinkWhereInput
    /**
     * Limit how many AffiliateLinks to update.
     */
    limit?: number
  }

  /**
   * AffiliateLink updateManyAndReturn
   */
  export type AffiliateLinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLink
     */
    select?: AffiliateLinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLink
     */
    omit?: AffiliateLinkOmit<ExtArgs> | null
    /**
     * The data used to update AffiliateLinks.
     */
    data: XOR<AffiliateLinkUpdateManyMutationInput, AffiliateLinkUncheckedUpdateManyInput>
    /**
     * Filter which AffiliateLinks to update
     */
    where?: AffiliateLinkWhereInput
    /**
     * Limit how many AffiliateLinks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateLinkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AffiliateLink upsert
   */
  export type AffiliateLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLink
     */
    select?: AffiliateLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLink
     */
    omit?: AffiliateLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the AffiliateLink to update in case it exists.
     */
    where: AffiliateLinkWhereUniqueInput
    /**
     * In case the AffiliateLink found by the `where` argument doesn't exist, create a new AffiliateLink with this data.
     */
    create: XOR<AffiliateLinkCreateInput, AffiliateLinkUncheckedCreateInput>
    /**
     * In case the AffiliateLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AffiliateLinkUpdateInput, AffiliateLinkUncheckedUpdateInput>
  }

  /**
   * AffiliateLink delete
   */
  export type AffiliateLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLink
     */
    select?: AffiliateLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLink
     */
    omit?: AffiliateLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateLinkInclude<ExtArgs> | null
    /**
     * Filter which AffiliateLink to delete.
     */
    where: AffiliateLinkWhereUniqueInput
  }

  /**
   * AffiliateLink deleteMany
   */
  export type AffiliateLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliateLinks to delete
     */
    where?: AffiliateLinkWhereInput
    /**
     * Limit how many AffiliateLinks to delete.
     */
    limit?: number
  }

  /**
   * AffiliateLink.product
   */
  export type AffiliateLink$productArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
  }

  /**
   * AffiliateLink.orders
   */
  export type AffiliateLink$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * AffiliateLink.vendorEarnings
   */
  export type AffiliateLink$vendorEarningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorEarning
     */
    select?: VendorEarningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorEarning
     */
    omit?: VendorEarningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorEarningInclude<ExtArgs> | null
    where?: VendorEarningWhereInput
    orderBy?: VendorEarningOrderByWithRelationInput | VendorEarningOrderByWithRelationInput[]
    cursor?: VendorEarningWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VendorEarningScalarFieldEnum | VendorEarningScalarFieldEnum[]
  }

  /**
   * AffiliateLink without action
   */
  export type AffiliateLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLink
     */
    select?: AffiliateLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLink
     */
    omit?: AffiliateLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateLinkInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    totalAmount: number | null
    discountAmount: number | null
    finalAmount: number | null
  }

  export type OrderSumAggregateOutputType = {
    totalAmount: number | null
    discountAmount: number | null
    finalAmount: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    userId: string | null
    affiliateId: string | null
    totalAmount: number | null
    discountAmount: number | null
    finalAmount: number | null
    paymentMethod: string | null
    status: $Enums.OrderStatus | null
    createdAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    affiliateId: string | null
    totalAmount: number | null
    discountAmount: number | null
    finalAmount: number | null
    paymentMethod: string | null
    status: $Enums.OrderStatus | null
    createdAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    userId: number
    affiliateId: number
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: number
    status: number
    createdAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    totalAmount?: true
    discountAmount?: true
    finalAmount?: true
  }

  export type OrderSumAggregateInputType = {
    totalAmount?: true
    discountAmount?: true
    finalAmount?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    userId?: true
    affiliateId?: true
    totalAmount?: true
    discountAmount?: true
    finalAmount?: true
    paymentMethod?: true
    status?: true
    createdAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    userId?: true
    affiliateId?: true
    totalAmount?: true
    discountAmount?: true
    finalAmount?: true
    paymentMethod?: true
    status?: true
    createdAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    userId?: true
    affiliateId?: true
    totalAmount?: true
    discountAmount?: true
    finalAmount?: true
    paymentMethod?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    userId: string | null
    affiliateId: string | null
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    affiliateId?: boolean
    totalAmount?: boolean
    discountAmount?: boolean
    finalAmount?: boolean
    paymentMethod?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | Order$userArgs<ExtArgs>
    affiliate?: boolean | Order$affiliateArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    payment?: boolean | Order$paymentArgs<ExtArgs>
    verification?: boolean | Order$verificationArgs<ExtArgs>
    earnings?: boolean | Order$earningsArgs<ExtArgs>
    stockMovements?: boolean | Order$stockMovementsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    affiliateId?: boolean
    totalAmount?: boolean
    discountAmount?: boolean
    finalAmount?: boolean
    paymentMethod?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | Order$userArgs<ExtArgs>
    affiliate?: boolean | Order$affiliateArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    affiliateId?: boolean
    totalAmount?: boolean
    discountAmount?: boolean
    finalAmount?: boolean
    paymentMethod?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | Order$userArgs<ExtArgs>
    affiliate?: boolean | Order$affiliateArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    userId?: boolean
    affiliateId?: boolean
    totalAmount?: boolean
    discountAmount?: boolean
    finalAmount?: boolean
    paymentMethod?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "affiliateId" | "totalAmount" | "discountAmount" | "finalAmount" | "paymentMethod" | "status" | "createdAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Order$userArgs<ExtArgs>
    affiliate?: boolean | Order$affiliateArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    payment?: boolean | Order$paymentArgs<ExtArgs>
    verification?: boolean | Order$verificationArgs<ExtArgs>
    earnings?: boolean | Order$earningsArgs<ExtArgs>
    stockMovements?: boolean | Order$stockMovementsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Order$userArgs<ExtArgs>
    affiliate?: boolean | Order$affiliateArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Order$userArgs<ExtArgs>
    affiliate?: boolean | Order$affiliateArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      affiliate: Prisma.$AffiliateLinkPayload<ExtArgs> | null
      items: Prisma.$OrderItemPayload<ExtArgs>[]
      payment: Prisma.$PaymentPayload<ExtArgs> | null
      verification: Prisma.$CODVerificationPayload<ExtArgs> | null
      earnings: Prisma.$VendorEarningPayload<ExtArgs>[]
      stockMovements: Prisma.$StockMovementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      affiliateId: string | null
      totalAmount: number
      discountAmount: number
      finalAmount: number
      paymentMethod: string
      status: $Enums.OrderStatus
      createdAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Order$userArgs<ExtArgs> = {}>(args?: Subset<T, Order$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    affiliate<T extends Order$affiliateArgs<ExtArgs> = {}>(args?: Subset<T, Order$affiliateArgs<ExtArgs>>): Prisma__AffiliateLinkClient<$Result.GetResult<Prisma.$AffiliateLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payment<T extends Order$paymentArgs<ExtArgs> = {}>(args?: Subset<T, Order$paymentArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    verification<T extends Order$verificationArgs<ExtArgs> = {}>(args?: Subset<T, Order$verificationArgs<ExtArgs>>): Prisma__CODVerificationClient<$Result.GetResult<Prisma.$CODVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    earnings<T extends Order$earningsArgs<ExtArgs> = {}>(args?: Subset<T, Order$earningsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorEarningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    stockMovements<T extends Order$stockMovementsArgs<ExtArgs> = {}>(args?: Subset<T, Order$stockMovementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly userId: FieldRef<"Order", 'String'>
    readonly affiliateId: FieldRef<"Order", 'String'>
    readonly totalAmount: FieldRef<"Order", 'Float'>
    readonly discountAmount: FieldRef<"Order", 'Float'>
    readonly finalAmount: FieldRef<"Order", 'Float'>
    readonly paymentMethod: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.user
   */
  export type Order$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Order.affiliate
   */
  export type Order$affiliateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateLink
     */
    select?: AffiliateLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateLink
     */
    omit?: AffiliateLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateLinkInclude<ExtArgs> | null
    where?: AffiliateLinkWhereInput
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order.payment
   */
  export type Order$paymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
  }

  /**
   * Order.verification
   */
  export type Order$verificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CODVerification
     */
    select?: CODVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CODVerification
     */
    omit?: CODVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CODVerificationInclude<ExtArgs> | null
    where?: CODVerificationWhereInput
  }

  /**
   * Order.earnings
   */
  export type Order$earningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorEarning
     */
    select?: VendorEarningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorEarning
     */
    omit?: VendorEarningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorEarningInclude<ExtArgs> | null
    where?: VendorEarningWhereInput
    orderBy?: VendorEarningOrderByWithRelationInput | VendorEarningOrderByWithRelationInput[]
    cursor?: VendorEarningWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VendorEarningScalarFieldEnum | VendorEarningScalarFieldEnum[]
  }

  /**
   * Order.stockMovements
   */
  export type Order$stockMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: StockMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockMovementInclude<ExtArgs> | null
    where?: StockMovementWhereInput
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    cursor?: StockMovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    quantity: number | null
    price: number | null
    total: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    quantity: number | null
    price: number | null
    total: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    quantity: number | null
    price: number | null
    total: number | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    quantity: number | null
    price: number | null
    total: number | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    productId: number
    quantity: number
    price: number
    total: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    quantity?: true
    price?: true
    total?: true
  }

  export type OrderItemSumAggregateInputType = {
    quantity?: true
    price?: true
    total?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    price?: true
    total?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    price?: true
    total?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    price?: true
    total?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: string
    orderId: string
    productId: string
    quantity: number
    price: number
    total: number
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    price?: boolean
    total?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    price?: boolean
    total?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    price?: boolean
    total?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    price?: boolean
    total?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "productId" | "quantity" | "price" | "total", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      productId: string
      quantity: number
      price: number
      total: number
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'String'>
    readonly orderId: FieldRef<"OrderItem", 'String'>
    readonly productId: FieldRef<"OrderItem", 'String'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly price: FieldRef<"OrderItem", 'Float'>
    readonly total: FieldRef<"OrderItem", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    provider: string | null
    amount: number | null
    transactionId: string | null
    status: $Enums.PaymentStatus | null
    paidAt: Date | null
    createdAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    provider: string | null
    amount: number | null
    transactionId: string | null
    status: $Enums.PaymentStatus | null
    paidAt: Date | null
    createdAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    orderId: number
    provider: number
    amount: number
    transactionId: number
    status: number
    paidAt: number
    createdAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    orderId?: true
    provider?: true
    amount?: true
    transactionId?: true
    status?: true
    paidAt?: true
    createdAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    orderId?: true
    provider?: true
    amount?: true
    transactionId?: true
    status?: true
    paidAt?: true
    createdAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    orderId?: true
    provider?: true
    amount?: true
    transactionId?: true
    status?: true
    paidAt?: true
    createdAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    orderId: string
    provider: string
    amount: number
    transactionId: string | null
    status: $Enums.PaymentStatus
    paidAt: Date | null
    createdAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    provider?: boolean
    amount?: boolean
    transactionId?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    provider?: boolean
    amount?: boolean
    transactionId?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    provider?: boolean
    amount?: boolean
    transactionId?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    orderId?: boolean
    provider?: boolean
    amount?: boolean
    transactionId?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "provider" | "amount" | "transactionId" | "status" | "paidAt" | "createdAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      provider: string
      amount: number
      transactionId: string | null
      status: $Enums.PaymentStatus
      paidAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly orderId: FieldRef<"Payment", 'String'>
    readonly provider: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly transactionId: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly paidAt: FieldRef<"Payment", 'DateTime'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model CODVerification
   */

  export type AggregateCODVerification = {
    _count: CODVerificationCountAggregateOutputType | null
    _min: CODVerificationMinAggregateOutputType | null
    _max: CODVerificationMaxAggregateOutputType | null
  }

  export type CODVerificationMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    verifiedBy: string | null
    verificationStatus: $Enums.VerificationStatus | null
    customerResponse: string | null
    remarks: string | null
    verifiedAt: Date | null
    createdAt: Date | null
  }

  export type CODVerificationMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    verifiedBy: string | null
    verificationStatus: $Enums.VerificationStatus | null
    customerResponse: string | null
    remarks: string | null
    verifiedAt: Date | null
    createdAt: Date | null
  }

  export type CODVerificationCountAggregateOutputType = {
    id: number
    orderId: number
    verifiedBy: number
    verificationStatus: number
    customerResponse: number
    remarks: number
    verifiedAt: number
    createdAt: number
    _all: number
  }


  export type CODVerificationMinAggregateInputType = {
    id?: true
    orderId?: true
    verifiedBy?: true
    verificationStatus?: true
    customerResponse?: true
    remarks?: true
    verifiedAt?: true
    createdAt?: true
  }

  export type CODVerificationMaxAggregateInputType = {
    id?: true
    orderId?: true
    verifiedBy?: true
    verificationStatus?: true
    customerResponse?: true
    remarks?: true
    verifiedAt?: true
    createdAt?: true
  }

  export type CODVerificationCountAggregateInputType = {
    id?: true
    orderId?: true
    verifiedBy?: true
    verificationStatus?: true
    customerResponse?: true
    remarks?: true
    verifiedAt?: true
    createdAt?: true
    _all?: true
  }

  export type CODVerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CODVerification to aggregate.
     */
    where?: CODVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CODVerifications to fetch.
     */
    orderBy?: CODVerificationOrderByWithRelationInput | CODVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CODVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CODVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CODVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CODVerifications
    **/
    _count?: true | CODVerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CODVerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CODVerificationMaxAggregateInputType
  }

  export type GetCODVerificationAggregateType<T extends CODVerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateCODVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCODVerification[P]>
      : GetScalarType<T[P], AggregateCODVerification[P]>
  }




  export type CODVerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CODVerificationWhereInput
    orderBy?: CODVerificationOrderByWithAggregationInput | CODVerificationOrderByWithAggregationInput[]
    by: CODVerificationScalarFieldEnum[] | CODVerificationScalarFieldEnum
    having?: CODVerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CODVerificationCountAggregateInputType | true
    _min?: CODVerificationMinAggregateInputType
    _max?: CODVerificationMaxAggregateInputType
  }

  export type CODVerificationGroupByOutputType = {
    id: string
    orderId: string
    verifiedBy: string
    verificationStatus: $Enums.VerificationStatus
    customerResponse: string
    remarks: string | null
    verifiedAt: Date | null
    createdAt: Date
    _count: CODVerificationCountAggregateOutputType | null
    _min: CODVerificationMinAggregateOutputType | null
    _max: CODVerificationMaxAggregateOutputType | null
  }

  type GetCODVerificationGroupByPayload<T extends CODVerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CODVerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CODVerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CODVerificationGroupByOutputType[P]>
            : GetScalarType<T[P], CODVerificationGroupByOutputType[P]>
        }
      >
    >


  export type CODVerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    verifiedBy?: boolean
    verificationStatus?: boolean
    customerResponse?: boolean
    remarks?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cODVerification"]>

  export type CODVerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    verifiedBy?: boolean
    verificationStatus?: boolean
    customerResponse?: boolean
    remarks?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cODVerification"]>

  export type CODVerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    verifiedBy?: boolean
    verificationStatus?: boolean
    customerResponse?: boolean
    remarks?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cODVerification"]>

  export type CODVerificationSelectScalar = {
    id?: boolean
    orderId?: boolean
    verifiedBy?: boolean
    verificationStatus?: boolean
    customerResponse?: boolean
    remarks?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
  }

  export type CODVerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "verifiedBy" | "verificationStatus" | "customerResponse" | "remarks" | "verifiedAt" | "createdAt", ExtArgs["result"]["cODVerification"]>
  export type CODVerificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CODVerificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CODVerificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CODVerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CODVerification"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      admin: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      verifiedBy: string
      verificationStatus: $Enums.VerificationStatus
      customerResponse: string
      remarks: string | null
      verifiedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["cODVerification"]>
    composites: {}
  }

  type CODVerificationGetPayload<S extends boolean | null | undefined | CODVerificationDefaultArgs> = $Result.GetResult<Prisma.$CODVerificationPayload, S>

  type CODVerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CODVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CODVerificationCountAggregateInputType | true
    }

  export interface CODVerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CODVerification'], meta: { name: 'CODVerification' } }
    /**
     * Find zero or one CODVerification that matches the filter.
     * @param {CODVerificationFindUniqueArgs} args - Arguments to find a CODVerification
     * @example
     * // Get one CODVerification
     * const cODVerification = await prisma.cODVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CODVerificationFindUniqueArgs>(args: SelectSubset<T, CODVerificationFindUniqueArgs<ExtArgs>>): Prisma__CODVerificationClient<$Result.GetResult<Prisma.$CODVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CODVerification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CODVerificationFindUniqueOrThrowArgs} args - Arguments to find a CODVerification
     * @example
     * // Get one CODVerification
     * const cODVerification = await prisma.cODVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CODVerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, CODVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CODVerificationClient<$Result.GetResult<Prisma.$CODVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CODVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CODVerificationFindFirstArgs} args - Arguments to find a CODVerification
     * @example
     * // Get one CODVerification
     * const cODVerification = await prisma.cODVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CODVerificationFindFirstArgs>(args?: SelectSubset<T, CODVerificationFindFirstArgs<ExtArgs>>): Prisma__CODVerificationClient<$Result.GetResult<Prisma.$CODVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CODVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CODVerificationFindFirstOrThrowArgs} args - Arguments to find a CODVerification
     * @example
     * // Get one CODVerification
     * const cODVerification = await prisma.cODVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CODVerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, CODVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CODVerificationClient<$Result.GetResult<Prisma.$CODVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CODVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CODVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CODVerifications
     * const cODVerifications = await prisma.cODVerification.findMany()
     * 
     * // Get first 10 CODVerifications
     * const cODVerifications = await prisma.cODVerification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cODVerificationWithIdOnly = await prisma.cODVerification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CODVerificationFindManyArgs>(args?: SelectSubset<T, CODVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CODVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CODVerification.
     * @param {CODVerificationCreateArgs} args - Arguments to create a CODVerification.
     * @example
     * // Create one CODVerification
     * const CODVerification = await prisma.cODVerification.create({
     *   data: {
     *     // ... data to create a CODVerification
     *   }
     * })
     * 
     */
    create<T extends CODVerificationCreateArgs>(args: SelectSubset<T, CODVerificationCreateArgs<ExtArgs>>): Prisma__CODVerificationClient<$Result.GetResult<Prisma.$CODVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CODVerifications.
     * @param {CODVerificationCreateManyArgs} args - Arguments to create many CODVerifications.
     * @example
     * // Create many CODVerifications
     * const cODVerification = await prisma.cODVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CODVerificationCreateManyArgs>(args?: SelectSubset<T, CODVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CODVerifications and returns the data saved in the database.
     * @param {CODVerificationCreateManyAndReturnArgs} args - Arguments to create many CODVerifications.
     * @example
     * // Create many CODVerifications
     * const cODVerification = await prisma.cODVerification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CODVerifications and only return the `id`
     * const cODVerificationWithIdOnly = await prisma.cODVerification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CODVerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, CODVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CODVerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CODVerification.
     * @param {CODVerificationDeleteArgs} args - Arguments to delete one CODVerification.
     * @example
     * // Delete one CODVerification
     * const CODVerification = await prisma.cODVerification.delete({
     *   where: {
     *     // ... filter to delete one CODVerification
     *   }
     * })
     * 
     */
    delete<T extends CODVerificationDeleteArgs>(args: SelectSubset<T, CODVerificationDeleteArgs<ExtArgs>>): Prisma__CODVerificationClient<$Result.GetResult<Prisma.$CODVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CODVerification.
     * @param {CODVerificationUpdateArgs} args - Arguments to update one CODVerification.
     * @example
     * // Update one CODVerification
     * const cODVerification = await prisma.cODVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CODVerificationUpdateArgs>(args: SelectSubset<T, CODVerificationUpdateArgs<ExtArgs>>): Prisma__CODVerificationClient<$Result.GetResult<Prisma.$CODVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CODVerifications.
     * @param {CODVerificationDeleteManyArgs} args - Arguments to filter CODVerifications to delete.
     * @example
     * // Delete a few CODVerifications
     * const { count } = await prisma.cODVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CODVerificationDeleteManyArgs>(args?: SelectSubset<T, CODVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CODVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CODVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CODVerifications
     * const cODVerification = await prisma.cODVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CODVerificationUpdateManyArgs>(args: SelectSubset<T, CODVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CODVerifications and returns the data updated in the database.
     * @param {CODVerificationUpdateManyAndReturnArgs} args - Arguments to update many CODVerifications.
     * @example
     * // Update many CODVerifications
     * const cODVerification = await prisma.cODVerification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CODVerifications and only return the `id`
     * const cODVerificationWithIdOnly = await prisma.cODVerification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CODVerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, CODVerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CODVerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CODVerification.
     * @param {CODVerificationUpsertArgs} args - Arguments to update or create a CODVerification.
     * @example
     * // Update or create a CODVerification
     * const cODVerification = await prisma.cODVerification.upsert({
     *   create: {
     *     // ... data to create a CODVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CODVerification we want to update
     *   }
     * })
     */
    upsert<T extends CODVerificationUpsertArgs>(args: SelectSubset<T, CODVerificationUpsertArgs<ExtArgs>>): Prisma__CODVerificationClient<$Result.GetResult<Prisma.$CODVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CODVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CODVerificationCountArgs} args - Arguments to filter CODVerifications to count.
     * @example
     * // Count the number of CODVerifications
     * const count = await prisma.cODVerification.count({
     *   where: {
     *     // ... the filter for the CODVerifications we want to count
     *   }
     * })
    **/
    count<T extends CODVerificationCountArgs>(
      args?: Subset<T, CODVerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CODVerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CODVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CODVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CODVerificationAggregateArgs>(args: Subset<T, CODVerificationAggregateArgs>): Prisma.PrismaPromise<GetCODVerificationAggregateType<T>>

    /**
     * Group by CODVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CODVerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CODVerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CODVerificationGroupByArgs['orderBy'] }
        : { orderBy?: CODVerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CODVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCODVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CODVerification model
   */
  readonly fields: CODVerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CODVerification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CODVerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    admin<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CODVerification model
   */
  interface CODVerificationFieldRefs {
    readonly id: FieldRef<"CODVerification", 'String'>
    readonly orderId: FieldRef<"CODVerification", 'String'>
    readonly verifiedBy: FieldRef<"CODVerification", 'String'>
    readonly verificationStatus: FieldRef<"CODVerification", 'VerificationStatus'>
    readonly customerResponse: FieldRef<"CODVerification", 'String'>
    readonly remarks: FieldRef<"CODVerification", 'String'>
    readonly verifiedAt: FieldRef<"CODVerification", 'DateTime'>
    readonly createdAt: FieldRef<"CODVerification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CODVerification findUnique
   */
  export type CODVerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CODVerification
     */
    select?: CODVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CODVerification
     */
    omit?: CODVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CODVerificationInclude<ExtArgs> | null
    /**
     * Filter, which CODVerification to fetch.
     */
    where: CODVerificationWhereUniqueInput
  }

  /**
   * CODVerification findUniqueOrThrow
   */
  export type CODVerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CODVerification
     */
    select?: CODVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CODVerification
     */
    omit?: CODVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CODVerificationInclude<ExtArgs> | null
    /**
     * Filter, which CODVerification to fetch.
     */
    where: CODVerificationWhereUniqueInput
  }

  /**
   * CODVerification findFirst
   */
  export type CODVerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CODVerification
     */
    select?: CODVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CODVerification
     */
    omit?: CODVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CODVerificationInclude<ExtArgs> | null
    /**
     * Filter, which CODVerification to fetch.
     */
    where?: CODVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CODVerifications to fetch.
     */
    orderBy?: CODVerificationOrderByWithRelationInput | CODVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CODVerifications.
     */
    cursor?: CODVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CODVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CODVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CODVerifications.
     */
    distinct?: CODVerificationScalarFieldEnum | CODVerificationScalarFieldEnum[]
  }

  /**
   * CODVerification findFirstOrThrow
   */
  export type CODVerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CODVerification
     */
    select?: CODVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CODVerification
     */
    omit?: CODVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CODVerificationInclude<ExtArgs> | null
    /**
     * Filter, which CODVerification to fetch.
     */
    where?: CODVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CODVerifications to fetch.
     */
    orderBy?: CODVerificationOrderByWithRelationInput | CODVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CODVerifications.
     */
    cursor?: CODVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CODVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CODVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CODVerifications.
     */
    distinct?: CODVerificationScalarFieldEnum | CODVerificationScalarFieldEnum[]
  }

  /**
   * CODVerification findMany
   */
  export type CODVerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CODVerification
     */
    select?: CODVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CODVerification
     */
    omit?: CODVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CODVerificationInclude<ExtArgs> | null
    /**
     * Filter, which CODVerifications to fetch.
     */
    where?: CODVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CODVerifications to fetch.
     */
    orderBy?: CODVerificationOrderByWithRelationInput | CODVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CODVerifications.
     */
    cursor?: CODVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CODVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CODVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CODVerifications.
     */
    distinct?: CODVerificationScalarFieldEnum | CODVerificationScalarFieldEnum[]
  }

  /**
   * CODVerification create
   */
  export type CODVerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CODVerification
     */
    select?: CODVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CODVerification
     */
    omit?: CODVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CODVerificationInclude<ExtArgs> | null
    /**
     * The data needed to create a CODVerification.
     */
    data: XOR<CODVerificationCreateInput, CODVerificationUncheckedCreateInput>
  }

  /**
   * CODVerification createMany
   */
  export type CODVerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CODVerifications.
     */
    data: CODVerificationCreateManyInput | CODVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CODVerification createManyAndReturn
   */
  export type CODVerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CODVerification
     */
    select?: CODVerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CODVerification
     */
    omit?: CODVerificationOmit<ExtArgs> | null
    /**
     * The data used to create many CODVerifications.
     */
    data: CODVerificationCreateManyInput | CODVerificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CODVerificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CODVerification update
   */
  export type CODVerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CODVerification
     */
    select?: CODVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CODVerification
     */
    omit?: CODVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CODVerificationInclude<ExtArgs> | null
    /**
     * The data needed to update a CODVerification.
     */
    data: XOR<CODVerificationUpdateInput, CODVerificationUncheckedUpdateInput>
    /**
     * Choose, which CODVerification to update.
     */
    where: CODVerificationWhereUniqueInput
  }

  /**
   * CODVerification updateMany
   */
  export type CODVerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CODVerifications.
     */
    data: XOR<CODVerificationUpdateManyMutationInput, CODVerificationUncheckedUpdateManyInput>
    /**
     * Filter which CODVerifications to update
     */
    where?: CODVerificationWhereInput
    /**
     * Limit how many CODVerifications to update.
     */
    limit?: number
  }

  /**
   * CODVerification updateManyAndReturn
   */
  export type CODVerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CODVerification
     */
    select?: CODVerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CODVerification
     */
    omit?: CODVerificationOmit<ExtArgs> | null
    /**
     * The data used to update CODVerifications.
     */
    data: XOR<CODVerificationUpdateManyMutationInput, CODVerificationUncheckedUpdateManyInput>
    /**
     * Filter which CODVerifications to update
     */
    where?: CODVerificationWhereInput
    /**
     * Limit how many CODVerifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CODVerificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CODVerification upsert
   */
  export type CODVerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CODVerification
     */
    select?: CODVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CODVerification
     */
    omit?: CODVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CODVerificationInclude<ExtArgs> | null
    /**
     * The filter to search for the CODVerification to update in case it exists.
     */
    where: CODVerificationWhereUniqueInput
    /**
     * In case the CODVerification found by the `where` argument doesn't exist, create a new CODVerification with this data.
     */
    create: XOR<CODVerificationCreateInput, CODVerificationUncheckedCreateInput>
    /**
     * In case the CODVerification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CODVerificationUpdateInput, CODVerificationUncheckedUpdateInput>
  }

  /**
   * CODVerification delete
   */
  export type CODVerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CODVerification
     */
    select?: CODVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CODVerification
     */
    omit?: CODVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CODVerificationInclude<ExtArgs> | null
    /**
     * Filter which CODVerification to delete.
     */
    where: CODVerificationWhereUniqueInput
  }

  /**
   * CODVerification deleteMany
   */
  export type CODVerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CODVerifications to delete
     */
    where?: CODVerificationWhereInput
    /**
     * Limit how many CODVerifications to delete.
     */
    limit?: number
  }

  /**
   * CODVerification without action
   */
  export type CODVerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CODVerification
     */
    select?: CODVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CODVerification
     */
    omit?: CODVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CODVerificationInclude<ExtArgs> | null
  }


  /**
   * Model VendorEarning
   */

  export type AggregateVendorEarning = {
    _count: VendorEarningCountAggregateOutputType | null
    _avg: VendorEarningAvgAggregateOutputType | null
    _sum: VendorEarningSumAggregateOutputType | null
    _min: VendorEarningMinAggregateOutputType | null
    _max: VendorEarningMaxAggregateOutputType | null
  }

  export type VendorEarningAvgAggregateOutputType = {
    commission: number | null
  }

  export type VendorEarningSumAggregateOutputType = {
    commission: number | null
  }

  export type VendorEarningMinAggregateOutputType = {
    id: string | null
    vendorId: string | null
    orderId: string | null
    affiliateId: string | null
    commission: number | null
    createdAt: Date | null
  }

  export type VendorEarningMaxAggregateOutputType = {
    id: string | null
    vendorId: string | null
    orderId: string | null
    affiliateId: string | null
    commission: number | null
    createdAt: Date | null
  }

  export type VendorEarningCountAggregateOutputType = {
    id: number
    vendorId: number
    orderId: number
    affiliateId: number
    commission: number
    createdAt: number
    _all: number
  }


  export type VendorEarningAvgAggregateInputType = {
    commission?: true
  }

  export type VendorEarningSumAggregateInputType = {
    commission?: true
  }

  export type VendorEarningMinAggregateInputType = {
    id?: true
    vendorId?: true
    orderId?: true
    affiliateId?: true
    commission?: true
    createdAt?: true
  }

  export type VendorEarningMaxAggregateInputType = {
    id?: true
    vendorId?: true
    orderId?: true
    affiliateId?: true
    commission?: true
    createdAt?: true
  }

  export type VendorEarningCountAggregateInputType = {
    id?: true
    vendorId?: true
    orderId?: true
    affiliateId?: true
    commission?: true
    createdAt?: true
    _all?: true
  }

  export type VendorEarningAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendorEarning to aggregate.
     */
    where?: VendorEarningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorEarnings to fetch.
     */
    orderBy?: VendorEarningOrderByWithRelationInput | VendorEarningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendorEarningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorEarnings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorEarnings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VendorEarnings
    **/
    _count?: true | VendorEarningCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VendorEarningAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VendorEarningSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendorEarningMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendorEarningMaxAggregateInputType
  }

  export type GetVendorEarningAggregateType<T extends VendorEarningAggregateArgs> = {
        [P in keyof T & keyof AggregateVendorEarning]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendorEarning[P]>
      : GetScalarType<T[P], AggregateVendorEarning[P]>
  }




  export type VendorEarningGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorEarningWhereInput
    orderBy?: VendorEarningOrderByWithAggregationInput | VendorEarningOrderByWithAggregationInput[]
    by: VendorEarningScalarFieldEnum[] | VendorEarningScalarFieldEnum
    having?: VendorEarningScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendorEarningCountAggregateInputType | true
    _avg?: VendorEarningAvgAggregateInputType
    _sum?: VendorEarningSumAggregateInputType
    _min?: VendorEarningMinAggregateInputType
    _max?: VendorEarningMaxAggregateInputType
  }

  export type VendorEarningGroupByOutputType = {
    id: string
    vendorId: string
    orderId: string
    affiliateId: string
    commission: number
    createdAt: Date
    _count: VendorEarningCountAggregateOutputType | null
    _avg: VendorEarningAvgAggregateOutputType | null
    _sum: VendorEarningSumAggregateOutputType | null
    _min: VendorEarningMinAggregateOutputType | null
    _max: VendorEarningMaxAggregateOutputType | null
  }

  type GetVendorEarningGroupByPayload<T extends VendorEarningGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendorEarningGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendorEarningGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendorEarningGroupByOutputType[P]>
            : GetScalarType<T[P], VendorEarningGroupByOutputType[P]>
        }
      >
    >


  export type VendorEarningSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendorId?: boolean
    orderId?: boolean
    affiliateId?: boolean
    commission?: boolean
    createdAt?: boolean
    vendor?: boolean | UserDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
    affiliate?: boolean | AffiliateLinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendorEarning"]>

  export type VendorEarningSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendorId?: boolean
    orderId?: boolean
    affiliateId?: boolean
    commission?: boolean
    createdAt?: boolean
    vendor?: boolean | UserDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
    affiliate?: boolean | AffiliateLinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendorEarning"]>

  export type VendorEarningSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendorId?: boolean
    orderId?: boolean
    affiliateId?: boolean
    commission?: boolean
    createdAt?: boolean
    vendor?: boolean | UserDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
    affiliate?: boolean | AffiliateLinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendorEarning"]>

  export type VendorEarningSelectScalar = {
    id?: boolean
    vendorId?: boolean
    orderId?: boolean
    affiliateId?: boolean
    commission?: boolean
    createdAt?: boolean
  }

  export type VendorEarningOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vendorId" | "orderId" | "affiliateId" | "commission" | "createdAt", ExtArgs["result"]["vendorEarning"]>
  export type VendorEarningInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | UserDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
    affiliate?: boolean | AffiliateLinkDefaultArgs<ExtArgs>
  }
  export type VendorEarningIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | UserDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
    affiliate?: boolean | AffiliateLinkDefaultArgs<ExtArgs>
  }
  export type VendorEarningIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | UserDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
    affiliate?: boolean | AffiliateLinkDefaultArgs<ExtArgs>
  }

  export type $VendorEarningPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VendorEarning"
    objects: {
      vendor: Prisma.$UserPayload<ExtArgs>
      order: Prisma.$OrderPayload<ExtArgs>
      affiliate: Prisma.$AffiliateLinkPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vendorId: string
      orderId: string
      affiliateId: string
      commission: number
      createdAt: Date
    }, ExtArgs["result"]["vendorEarning"]>
    composites: {}
  }

  type VendorEarningGetPayload<S extends boolean | null | undefined | VendorEarningDefaultArgs> = $Result.GetResult<Prisma.$VendorEarningPayload, S>

  type VendorEarningCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VendorEarningFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VendorEarningCountAggregateInputType | true
    }

  export interface VendorEarningDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VendorEarning'], meta: { name: 'VendorEarning' } }
    /**
     * Find zero or one VendorEarning that matches the filter.
     * @param {VendorEarningFindUniqueArgs} args - Arguments to find a VendorEarning
     * @example
     * // Get one VendorEarning
     * const vendorEarning = await prisma.vendorEarning.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendorEarningFindUniqueArgs>(args: SelectSubset<T, VendorEarningFindUniqueArgs<ExtArgs>>): Prisma__VendorEarningClient<$Result.GetResult<Prisma.$VendorEarningPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VendorEarning that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VendorEarningFindUniqueOrThrowArgs} args - Arguments to find a VendorEarning
     * @example
     * // Get one VendorEarning
     * const vendorEarning = await prisma.vendorEarning.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendorEarningFindUniqueOrThrowArgs>(args: SelectSubset<T, VendorEarningFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendorEarningClient<$Result.GetResult<Prisma.$VendorEarningPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VendorEarning that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorEarningFindFirstArgs} args - Arguments to find a VendorEarning
     * @example
     * // Get one VendorEarning
     * const vendorEarning = await prisma.vendorEarning.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendorEarningFindFirstArgs>(args?: SelectSubset<T, VendorEarningFindFirstArgs<ExtArgs>>): Prisma__VendorEarningClient<$Result.GetResult<Prisma.$VendorEarningPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VendorEarning that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorEarningFindFirstOrThrowArgs} args - Arguments to find a VendorEarning
     * @example
     * // Get one VendorEarning
     * const vendorEarning = await prisma.vendorEarning.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendorEarningFindFirstOrThrowArgs>(args?: SelectSubset<T, VendorEarningFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendorEarningClient<$Result.GetResult<Prisma.$VendorEarningPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VendorEarnings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorEarningFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VendorEarnings
     * const vendorEarnings = await prisma.vendorEarning.findMany()
     * 
     * // Get first 10 VendorEarnings
     * const vendorEarnings = await prisma.vendorEarning.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendorEarningWithIdOnly = await prisma.vendorEarning.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VendorEarningFindManyArgs>(args?: SelectSubset<T, VendorEarningFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorEarningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VendorEarning.
     * @param {VendorEarningCreateArgs} args - Arguments to create a VendorEarning.
     * @example
     * // Create one VendorEarning
     * const VendorEarning = await prisma.vendorEarning.create({
     *   data: {
     *     // ... data to create a VendorEarning
     *   }
     * })
     * 
     */
    create<T extends VendorEarningCreateArgs>(args: SelectSubset<T, VendorEarningCreateArgs<ExtArgs>>): Prisma__VendorEarningClient<$Result.GetResult<Prisma.$VendorEarningPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VendorEarnings.
     * @param {VendorEarningCreateManyArgs} args - Arguments to create many VendorEarnings.
     * @example
     * // Create many VendorEarnings
     * const vendorEarning = await prisma.vendorEarning.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendorEarningCreateManyArgs>(args?: SelectSubset<T, VendorEarningCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VendorEarnings and returns the data saved in the database.
     * @param {VendorEarningCreateManyAndReturnArgs} args - Arguments to create many VendorEarnings.
     * @example
     * // Create many VendorEarnings
     * const vendorEarning = await prisma.vendorEarning.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VendorEarnings and only return the `id`
     * const vendorEarningWithIdOnly = await prisma.vendorEarning.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendorEarningCreateManyAndReturnArgs>(args?: SelectSubset<T, VendorEarningCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorEarningPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VendorEarning.
     * @param {VendorEarningDeleteArgs} args - Arguments to delete one VendorEarning.
     * @example
     * // Delete one VendorEarning
     * const VendorEarning = await prisma.vendorEarning.delete({
     *   where: {
     *     // ... filter to delete one VendorEarning
     *   }
     * })
     * 
     */
    delete<T extends VendorEarningDeleteArgs>(args: SelectSubset<T, VendorEarningDeleteArgs<ExtArgs>>): Prisma__VendorEarningClient<$Result.GetResult<Prisma.$VendorEarningPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VendorEarning.
     * @param {VendorEarningUpdateArgs} args - Arguments to update one VendorEarning.
     * @example
     * // Update one VendorEarning
     * const vendorEarning = await prisma.vendorEarning.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendorEarningUpdateArgs>(args: SelectSubset<T, VendorEarningUpdateArgs<ExtArgs>>): Prisma__VendorEarningClient<$Result.GetResult<Prisma.$VendorEarningPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VendorEarnings.
     * @param {VendorEarningDeleteManyArgs} args - Arguments to filter VendorEarnings to delete.
     * @example
     * // Delete a few VendorEarnings
     * const { count } = await prisma.vendorEarning.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendorEarningDeleteManyArgs>(args?: SelectSubset<T, VendorEarningDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendorEarnings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorEarningUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VendorEarnings
     * const vendorEarning = await prisma.vendorEarning.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendorEarningUpdateManyArgs>(args: SelectSubset<T, VendorEarningUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendorEarnings and returns the data updated in the database.
     * @param {VendorEarningUpdateManyAndReturnArgs} args - Arguments to update many VendorEarnings.
     * @example
     * // Update many VendorEarnings
     * const vendorEarning = await prisma.vendorEarning.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VendorEarnings and only return the `id`
     * const vendorEarningWithIdOnly = await prisma.vendorEarning.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VendorEarningUpdateManyAndReturnArgs>(args: SelectSubset<T, VendorEarningUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorEarningPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VendorEarning.
     * @param {VendorEarningUpsertArgs} args - Arguments to update or create a VendorEarning.
     * @example
     * // Update or create a VendorEarning
     * const vendorEarning = await prisma.vendorEarning.upsert({
     *   create: {
     *     // ... data to create a VendorEarning
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VendorEarning we want to update
     *   }
     * })
     */
    upsert<T extends VendorEarningUpsertArgs>(args: SelectSubset<T, VendorEarningUpsertArgs<ExtArgs>>): Prisma__VendorEarningClient<$Result.GetResult<Prisma.$VendorEarningPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VendorEarnings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorEarningCountArgs} args - Arguments to filter VendorEarnings to count.
     * @example
     * // Count the number of VendorEarnings
     * const count = await prisma.vendorEarning.count({
     *   where: {
     *     // ... the filter for the VendorEarnings we want to count
     *   }
     * })
    **/
    count<T extends VendorEarningCountArgs>(
      args?: Subset<T, VendorEarningCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendorEarningCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VendorEarning.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorEarningAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VendorEarningAggregateArgs>(args: Subset<T, VendorEarningAggregateArgs>): Prisma.PrismaPromise<GetVendorEarningAggregateType<T>>

    /**
     * Group by VendorEarning.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorEarningGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VendorEarningGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendorEarningGroupByArgs['orderBy'] }
        : { orderBy?: VendorEarningGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VendorEarningGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorEarningGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VendorEarning model
   */
  readonly fields: VendorEarningFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VendorEarning.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendorEarningClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vendor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    affiliate<T extends AffiliateLinkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AffiliateLinkDefaultArgs<ExtArgs>>): Prisma__AffiliateLinkClient<$Result.GetResult<Prisma.$AffiliateLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VendorEarning model
   */
  interface VendorEarningFieldRefs {
    readonly id: FieldRef<"VendorEarning", 'String'>
    readonly vendorId: FieldRef<"VendorEarning", 'String'>
    readonly orderId: FieldRef<"VendorEarning", 'String'>
    readonly affiliateId: FieldRef<"VendorEarning", 'String'>
    readonly commission: FieldRef<"VendorEarning", 'Float'>
    readonly createdAt: FieldRef<"VendorEarning", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VendorEarning findUnique
   */
  export type VendorEarningFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorEarning
     */
    select?: VendorEarningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorEarning
     */
    omit?: VendorEarningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorEarningInclude<ExtArgs> | null
    /**
     * Filter, which VendorEarning to fetch.
     */
    where: VendorEarningWhereUniqueInput
  }

  /**
   * VendorEarning findUniqueOrThrow
   */
  export type VendorEarningFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorEarning
     */
    select?: VendorEarningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorEarning
     */
    omit?: VendorEarningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorEarningInclude<ExtArgs> | null
    /**
     * Filter, which VendorEarning to fetch.
     */
    where: VendorEarningWhereUniqueInput
  }

  /**
   * VendorEarning findFirst
   */
  export type VendorEarningFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorEarning
     */
    select?: VendorEarningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorEarning
     */
    omit?: VendorEarningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorEarningInclude<ExtArgs> | null
    /**
     * Filter, which VendorEarning to fetch.
     */
    where?: VendorEarningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorEarnings to fetch.
     */
    orderBy?: VendorEarningOrderByWithRelationInput | VendorEarningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendorEarnings.
     */
    cursor?: VendorEarningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorEarnings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorEarnings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendorEarnings.
     */
    distinct?: VendorEarningScalarFieldEnum | VendorEarningScalarFieldEnum[]
  }

  /**
   * VendorEarning findFirstOrThrow
   */
  export type VendorEarningFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorEarning
     */
    select?: VendorEarningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorEarning
     */
    omit?: VendorEarningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorEarningInclude<ExtArgs> | null
    /**
     * Filter, which VendorEarning to fetch.
     */
    where?: VendorEarningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorEarnings to fetch.
     */
    orderBy?: VendorEarningOrderByWithRelationInput | VendorEarningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendorEarnings.
     */
    cursor?: VendorEarningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorEarnings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorEarnings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendorEarnings.
     */
    distinct?: VendorEarningScalarFieldEnum | VendorEarningScalarFieldEnum[]
  }

  /**
   * VendorEarning findMany
   */
  export type VendorEarningFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorEarning
     */
    select?: VendorEarningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorEarning
     */
    omit?: VendorEarningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorEarningInclude<ExtArgs> | null
    /**
     * Filter, which VendorEarnings to fetch.
     */
    where?: VendorEarningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorEarnings to fetch.
     */
    orderBy?: VendorEarningOrderByWithRelationInput | VendorEarningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VendorEarnings.
     */
    cursor?: VendorEarningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorEarnings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorEarnings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendorEarnings.
     */
    distinct?: VendorEarningScalarFieldEnum | VendorEarningScalarFieldEnum[]
  }

  /**
   * VendorEarning create
   */
  export type VendorEarningCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorEarning
     */
    select?: VendorEarningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorEarning
     */
    omit?: VendorEarningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorEarningInclude<ExtArgs> | null
    /**
     * The data needed to create a VendorEarning.
     */
    data: XOR<VendorEarningCreateInput, VendorEarningUncheckedCreateInput>
  }

  /**
   * VendorEarning createMany
   */
  export type VendorEarningCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VendorEarnings.
     */
    data: VendorEarningCreateManyInput | VendorEarningCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VendorEarning createManyAndReturn
   */
  export type VendorEarningCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorEarning
     */
    select?: VendorEarningSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VendorEarning
     */
    omit?: VendorEarningOmit<ExtArgs> | null
    /**
     * The data used to create many VendorEarnings.
     */
    data: VendorEarningCreateManyInput | VendorEarningCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorEarningIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VendorEarning update
   */
  export type VendorEarningUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorEarning
     */
    select?: VendorEarningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorEarning
     */
    omit?: VendorEarningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorEarningInclude<ExtArgs> | null
    /**
     * The data needed to update a VendorEarning.
     */
    data: XOR<VendorEarningUpdateInput, VendorEarningUncheckedUpdateInput>
    /**
     * Choose, which VendorEarning to update.
     */
    where: VendorEarningWhereUniqueInput
  }

  /**
   * VendorEarning updateMany
   */
  export type VendorEarningUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VendorEarnings.
     */
    data: XOR<VendorEarningUpdateManyMutationInput, VendorEarningUncheckedUpdateManyInput>
    /**
     * Filter which VendorEarnings to update
     */
    where?: VendorEarningWhereInput
    /**
     * Limit how many VendorEarnings to update.
     */
    limit?: number
  }

  /**
   * VendorEarning updateManyAndReturn
   */
  export type VendorEarningUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorEarning
     */
    select?: VendorEarningSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VendorEarning
     */
    omit?: VendorEarningOmit<ExtArgs> | null
    /**
     * The data used to update VendorEarnings.
     */
    data: XOR<VendorEarningUpdateManyMutationInput, VendorEarningUncheckedUpdateManyInput>
    /**
     * Filter which VendorEarnings to update
     */
    where?: VendorEarningWhereInput
    /**
     * Limit how many VendorEarnings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorEarningIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VendorEarning upsert
   */
  export type VendorEarningUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorEarning
     */
    select?: VendorEarningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorEarning
     */
    omit?: VendorEarningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorEarningInclude<ExtArgs> | null
    /**
     * The filter to search for the VendorEarning to update in case it exists.
     */
    where: VendorEarningWhereUniqueInput
    /**
     * In case the VendorEarning found by the `where` argument doesn't exist, create a new VendorEarning with this data.
     */
    create: XOR<VendorEarningCreateInput, VendorEarningUncheckedCreateInput>
    /**
     * In case the VendorEarning was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendorEarningUpdateInput, VendorEarningUncheckedUpdateInput>
  }

  /**
   * VendorEarning delete
   */
  export type VendorEarningDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorEarning
     */
    select?: VendorEarningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorEarning
     */
    omit?: VendorEarningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorEarningInclude<ExtArgs> | null
    /**
     * Filter which VendorEarning to delete.
     */
    where: VendorEarningWhereUniqueInput
  }

  /**
   * VendorEarning deleteMany
   */
  export type VendorEarningDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendorEarnings to delete
     */
    where?: VendorEarningWhereInput
    /**
     * Limit how many VendorEarnings to delete.
     */
    limit?: number
  }

  /**
   * VendorEarning without action
   */
  export type VendorEarningDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorEarning
     */
    select?: VendorEarningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorEarning
     */
    omit?: VendorEarningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorEarningInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    phone: 'phone',
    address: 'address',
    roles: 'roles',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OtpCodeScalarFieldEnum: {
    id: 'id',
    email: 'email',
    code: 'code',
    expiresAt: 'expiresAt',
    used: 'used',
    createdAt: 'createdAt'
  };

  export type OtpCodeScalarFieldEnum = (typeof OtpCodeScalarFieldEnum)[keyof typeof OtpCodeScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    title: 'title',
    description: 'description',
    price: 'price',
    totalStock: 'totalStock',
    status: 'status',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const StockMovementScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    type: 'type',
    quantity: 'quantity',
    reason: 'reason',
    orderId: 'orderId',
    userId: 'userId',
    notes: 'notes',
    createdAt: 'createdAt'
  };

  export type StockMovementScalarFieldEnum = (typeof StockMovementScalarFieldEnum)[keyof typeof StockMovementScalarFieldEnum]


  export const AffiliateLinkScalarFieldEnum: {
    id: 'id',
    code: 'code',
    vendorId: 'vendorId',
    productId: 'productId',
    discountType: 'discountType',
    discountValue: 'discountValue',
    commissionType: 'commissionType',
    commissionValue: 'commissionValue',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type AffiliateLinkScalarFieldEnum = (typeof AffiliateLinkScalarFieldEnum)[keyof typeof AffiliateLinkScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    affiliateId: 'affiliateId',
    totalAmount: 'totalAmount',
    discountAmount: 'discountAmount',
    finalAmount: 'finalAmount',
    paymentMethod: 'paymentMethod',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    quantity: 'quantity',
    price: 'price',
    total: 'total'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    provider: 'provider',
    amount: 'amount',
    transactionId: 'transactionId',
    status: 'status',
    paidAt: 'paidAt',
    createdAt: 'createdAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const CODVerificationScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    verifiedBy: 'verifiedBy',
    verificationStatus: 'verificationStatus',
    customerResponse: 'customerResponse',
    remarks: 'remarks',
    verifiedAt: 'verifiedAt',
    createdAt: 'createdAt'
  };

  export type CODVerificationScalarFieldEnum = (typeof CODVerificationScalarFieldEnum)[keyof typeof CODVerificationScalarFieldEnum]


  export const VendorEarningScalarFieldEnum: {
    id: 'id',
    vendorId: 'vendorId',
    orderId: 'orderId',
    affiliateId: 'affiliateId',
    commission: 'commission',
    createdAt: 'createdAt'
  };

  export type VendorEarningScalarFieldEnum = (typeof VendorEarningScalarFieldEnum)[keyof typeof VendorEarningScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'StockMovementType'
   */
  export type EnumStockMovementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StockMovementType'>
    


  /**
   * Reference to a field of type 'StockMovementType[]'
   */
  export type ListEnumStockMovementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StockMovementType[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'VerificationStatus'
   */
  export type EnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus'>
    


  /**
   * Reference to a field of type 'VerificationStatus[]'
   */
  export type ListEnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    roles?: StringNullableListFilter<"User">
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    orders?: OrderListRelationFilter
    affiliates?: AffiliateLinkListRelationFilter
    earnings?: VendorEarningListRelationFilter
    verifications?: CODVerificationListRelationFilter
    stockMovements?: StockMovementListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    roles?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    orders?: OrderOrderByRelationAggregateInput
    affiliates?: AffiliateLinkOrderByRelationAggregateInput
    earnings?: VendorEarningOrderByRelationAggregateInput
    verifications?: CODVerificationOrderByRelationAggregateInput
    stockMovements?: StockMovementOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    phone?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    roles?: StringNullableListFilter<"User">
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    orders?: OrderListRelationFilter
    affiliates?: AffiliateLinkListRelationFilter
    earnings?: VendorEarningListRelationFilter
    verifications?: CODVerificationListRelationFilter
    stockMovements?: StockMovementListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    roles?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    address?: StringNullableWithAggregatesFilter<"User"> | string | null
    roles?: StringNullableListFilter<"User">
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type OtpCodeWhereInput = {
    AND?: OtpCodeWhereInput | OtpCodeWhereInput[]
    OR?: OtpCodeWhereInput[]
    NOT?: OtpCodeWhereInput | OtpCodeWhereInput[]
    id?: StringFilter<"OtpCode"> | string
    email?: StringFilter<"OtpCode"> | string
    code?: StringFilter<"OtpCode"> | string
    expiresAt?: DateTimeFilter<"OtpCode"> | Date | string
    used?: BoolFilter<"OtpCode"> | boolean
    createdAt?: DateTimeFilter<"OtpCode"> | Date | string
  }

  export type OtpCodeOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OtpCodeWhereInput | OtpCodeWhereInput[]
    OR?: OtpCodeWhereInput[]
    NOT?: OtpCodeWhereInput | OtpCodeWhereInput[]
    email?: StringFilter<"OtpCode"> | string
    code?: StringFilter<"OtpCode"> | string
    expiresAt?: DateTimeFilter<"OtpCode"> | Date | string
    used?: BoolFilter<"OtpCode"> | boolean
    createdAt?: DateTimeFilter<"OtpCode"> | Date | string
  }, "id">

  export type OtpCodeOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    _count?: OtpCodeCountOrderByAggregateInput
    _max?: OtpCodeMaxOrderByAggregateInput
    _min?: OtpCodeMinOrderByAggregateInput
  }

  export type OtpCodeScalarWhereWithAggregatesInput = {
    AND?: OtpCodeScalarWhereWithAggregatesInput | OtpCodeScalarWhereWithAggregatesInput[]
    OR?: OtpCodeScalarWhereWithAggregatesInput[]
    NOT?: OtpCodeScalarWhereWithAggregatesInput | OtpCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OtpCode"> | string
    email?: StringWithAggregatesFilter<"OtpCode"> | string
    code?: StringWithAggregatesFilter<"OtpCode"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"OtpCode"> | Date | string
    used?: BoolWithAggregatesFilter<"OtpCode"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"OtpCode"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    slug?: StringFilter<"Product"> | string
    title?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: FloatFilter<"Product"> | number
    totalStock?: IntFilter<"Product"> | number
    status?: StringFilter<"Product"> | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    movements?: StockMovementListRelationFilter
    orderItems?: OrderItemListRelationFilter
    affiliates?: AffiliateLinkListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    totalStock?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    movements?: StockMovementOrderByRelationAggregateInput
    orderItems?: OrderItemOrderByRelationAggregateInput
    affiliates?: AffiliateLinkOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    title?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: FloatFilter<"Product"> | number
    totalStock?: IntFilter<"Product"> | number
    status?: StringFilter<"Product"> | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    movements?: StockMovementListRelationFilter
    orderItems?: OrderItemListRelationFilter
    affiliates?: AffiliateLinkListRelationFilter
  }, "id" | "slug">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    totalStock?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    slug?: StringWithAggregatesFilter<"Product"> | string
    title?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    price?: FloatWithAggregatesFilter<"Product"> | number
    totalStock?: IntWithAggregatesFilter<"Product"> | number
    status?: StringWithAggregatesFilter<"Product"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type StockMovementWhereInput = {
    AND?: StockMovementWhereInput | StockMovementWhereInput[]
    OR?: StockMovementWhereInput[]
    NOT?: StockMovementWhereInput | StockMovementWhereInput[]
    id?: StringFilter<"StockMovement"> | string
    productId?: StringFilter<"StockMovement"> | string
    type?: EnumStockMovementTypeFilter<"StockMovement"> | $Enums.StockMovementType
    quantity?: IntFilter<"StockMovement"> | number
    reason?: StringFilter<"StockMovement"> | string
    orderId?: StringNullableFilter<"StockMovement"> | string | null
    userId?: StringNullableFilter<"StockMovement"> | string | null
    notes?: StringNullableFilter<"StockMovement"> | string | null
    createdAt?: DateTimeFilter<"StockMovement"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    order?: XOR<OrderNullableScalarRelationFilter, OrderWhereInput> | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type StockMovementOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    orderId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    order?: OrderOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type StockMovementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StockMovementWhereInput | StockMovementWhereInput[]
    OR?: StockMovementWhereInput[]
    NOT?: StockMovementWhereInput | StockMovementWhereInput[]
    productId?: StringFilter<"StockMovement"> | string
    type?: EnumStockMovementTypeFilter<"StockMovement"> | $Enums.StockMovementType
    quantity?: IntFilter<"StockMovement"> | number
    reason?: StringFilter<"StockMovement"> | string
    orderId?: StringNullableFilter<"StockMovement"> | string | null
    userId?: StringNullableFilter<"StockMovement"> | string | null
    notes?: StringNullableFilter<"StockMovement"> | string | null
    createdAt?: DateTimeFilter<"StockMovement"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    order?: XOR<OrderNullableScalarRelationFilter, OrderWhereInput> | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type StockMovementOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    orderId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: StockMovementCountOrderByAggregateInput
    _avg?: StockMovementAvgOrderByAggregateInput
    _max?: StockMovementMaxOrderByAggregateInput
    _min?: StockMovementMinOrderByAggregateInput
    _sum?: StockMovementSumOrderByAggregateInput
  }

  export type StockMovementScalarWhereWithAggregatesInput = {
    AND?: StockMovementScalarWhereWithAggregatesInput | StockMovementScalarWhereWithAggregatesInput[]
    OR?: StockMovementScalarWhereWithAggregatesInput[]
    NOT?: StockMovementScalarWhereWithAggregatesInput | StockMovementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StockMovement"> | string
    productId?: StringWithAggregatesFilter<"StockMovement"> | string
    type?: EnumStockMovementTypeWithAggregatesFilter<"StockMovement"> | $Enums.StockMovementType
    quantity?: IntWithAggregatesFilter<"StockMovement"> | number
    reason?: StringWithAggregatesFilter<"StockMovement"> | string
    orderId?: StringNullableWithAggregatesFilter<"StockMovement"> | string | null
    userId?: StringNullableWithAggregatesFilter<"StockMovement"> | string | null
    notes?: StringNullableWithAggregatesFilter<"StockMovement"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StockMovement"> | Date | string
  }

  export type AffiliateLinkWhereInput = {
    AND?: AffiliateLinkWhereInput | AffiliateLinkWhereInput[]
    OR?: AffiliateLinkWhereInput[]
    NOT?: AffiliateLinkWhereInput | AffiliateLinkWhereInput[]
    id?: StringFilter<"AffiliateLink"> | string
    code?: StringFilter<"AffiliateLink"> | string
    vendorId?: StringFilter<"AffiliateLink"> | string
    productId?: StringNullableFilter<"AffiliateLink"> | string | null
    discountType?: StringFilter<"AffiliateLink"> | string
    discountValue?: FloatFilter<"AffiliateLink"> | number
    commissionType?: StringFilter<"AffiliateLink"> | string
    commissionValue?: FloatFilter<"AffiliateLink"> | number
    isActive?: BoolFilter<"AffiliateLink"> | boolean
    createdAt?: DateTimeFilter<"AffiliateLink"> | Date | string
    vendor?: XOR<UserScalarRelationFilter, UserWhereInput>
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
    orders?: OrderListRelationFilter
    vendorEarnings?: VendorEarningListRelationFilter
  }

  export type AffiliateLinkOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    vendorId?: SortOrder
    productId?: SortOrderInput | SortOrder
    discountType?: SortOrder
    discountValue?: SortOrder
    commissionType?: SortOrder
    commissionValue?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    vendor?: UserOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
    vendorEarnings?: VendorEarningOrderByRelationAggregateInput
  }

  export type AffiliateLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: AffiliateLinkWhereInput | AffiliateLinkWhereInput[]
    OR?: AffiliateLinkWhereInput[]
    NOT?: AffiliateLinkWhereInput | AffiliateLinkWhereInput[]
    vendorId?: StringFilter<"AffiliateLink"> | string
    productId?: StringNullableFilter<"AffiliateLink"> | string | null
    discountType?: StringFilter<"AffiliateLink"> | string
    discountValue?: FloatFilter<"AffiliateLink"> | number
    commissionType?: StringFilter<"AffiliateLink"> | string
    commissionValue?: FloatFilter<"AffiliateLink"> | number
    isActive?: BoolFilter<"AffiliateLink"> | boolean
    createdAt?: DateTimeFilter<"AffiliateLink"> | Date | string
    vendor?: XOR<UserScalarRelationFilter, UserWhereInput>
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
    orders?: OrderListRelationFilter
    vendorEarnings?: VendorEarningListRelationFilter
  }, "id" | "code">

  export type AffiliateLinkOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    vendorId?: SortOrder
    productId?: SortOrderInput | SortOrder
    discountType?: SortOrder
    discountValue?: SortOrder
    commissionType?: SortOrder
    commissionValue?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: AffiliateLinkCountOrderByAggregateInput
    _avg?: AffiliateLinkAvgOrderByAggregateInput
    _max?: AffiliateLinkMaxOrderByAggregateInput
    _min?: AffiliateLinkMinOrderByAggregateInput
    _sum?: AffiliateLinkSumOrderByAggregateInput
  }

  export type AffiliateLinkScalarWhereWithAggregatesInput = {
    AND?: AffiliateLinkScalarWhereWithAggregatesInput | AffiliateLinkScalarWhereWithAggregatesInput[]
    OR?: AffiliateLinkScalarWhereWithAggregatesInput[]
    NOT?: AffiliateLinkScalarWhereWithAggregatesInput | AffiliateLinkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AffiliateLink"> | string
    code?: StringWithAggregatesFilter<"AffiliateLink"> | string
    vendorId?: StringWithAggregatesFilter<"AffiliateLink"> | string
    productId?: StringNullableWithAggregatesFilter<"AffiliateLink"> | string | null
    discountType?: StringWithAggregatesFilter<"AffiliateLink"> | string
    discountValue?: FloatWithAggregatesFilter<"AffiliateLink"> | number
    commissionType?: StringWithAggregatesFilter<"AffiliateLink"> | string
    commissionValue?: FloatWithAggregatesFilter<"AffiliateLink"> | number
    isActive?: BoolWithAggregatesFilter<"AffiliateLink"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AffiliateLink"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    userId?: StringNullableFilter<"Order"> | string | null
    affiliateId?: StringNullableFilter<"Order"> | string | null
    totalAmount?: FloatFilter<"Order"> | number
    discountAmount?: FloatFilter<"Order"> | number
    finalAmount?: FloatFilter<"Order"> | number
    paymentMethod?: StringFilter<"Order"> | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    createdAt?: DateTimeFilter<"Order"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    affiliate?: XOR<AffiliateLinkNullableScalarRelationFilter, AffiliateLinkWhereInput> | null
    items?: OrderItemListRelationFilter
    payment?: XOR<PaymentNullableScalarRelationFilter, PaymentWhereInput> | null
    verification?: XOR<CODVerificationNullableScalarRelationFilter, CODVerificationWhereInput> | null
    earnings?: VendorEarningListRelationFilter
    stockMovements?: StockMovementListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    affiliateId?: SortOrderInput | SortOrder
    totalAmount?: SortOrder
    discountAmount?: SortOrder
    finalAmount?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    affiliate?: AffiliateLinkOrderByWithRelationInput
    items?: OrderItemOrderByRelationAggregateInput
    payment?: PaymentOrderByWithRelationInput
    verification?: CODVerificationOrderByWithRelationInput
    earnings?: VendorEarningOrderByRelationAggregateInput
    stockMovements?: StockMovementOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    userId?: StringNullableFilter<"Order"> | string | null
    affiliateId?: StringNullableFilter<"Order"> | string | null
    totalAmount?: FloatFilter<"Order"> | number
    discountAmount?: FloatFilter<"Order"> | number
    finalAmount?: FloatFilter<"Order"> | number
    paymentMethod?: StringFilter<"Order"> | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    createdAt?: DateTimeFilter<"Order"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    affiliate?: XOR<AffiliateLinkNullableScalarRelationFilter, AffiliateLinkWhereInput> | null
    items?: OrderItemListRelationFilter
    payment?: XOR<PaymentNullableScalarRelationFilter, PaymentWhereInput> | null
    verification?: XOR<CODVerificationNullableScalarRelationFilter, CODVerificationWhereInput> | null
    earnings?: VendorEarningListRelationFilter
    stockMovements?: StockMovementListRelationFilter
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    affiliateId?: SortOrderInput | SortOrder
    totalAmount?: SortOrder
    discountAmount?: SortOrder
    finalAmount?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    userId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    affiliateId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    totalAmount?: FloatWithAggregatesFilter<"Order"> | number
    discountAmount?: FloatWithAggregatesFilter<"Order"> | number
    finalAmount?: FloatWithAggregatesFilter<"Order"> | number
    paymentMethod?: StringWithAggregatesFilter<"Order"> | string
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    price?: FloatFilter<"OrderItem"> | number
    total?: FloatFilter<"OrderItem"> | number
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    total?: SortOrder
    order?: OrderOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    price?: FloatFilter<"OrderItem"> | number
    total?: FloatFilter<"OrderItem"> | number
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    total?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderItem"> | string
    orderId?: StringWithAggregatesFilter<"OrderItem"> | string
    productId?: StringWithAggregatesFilter<"OrderItem"> | string
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    price?: FloatWithAggregatesFilter<"OrderItem"> | number
    total?: FloatWithAggregatesFilter<"OrderItem"> | number
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    orderId?: StringFilter<"Payment"> | string
    provider?: StringFilter<"Payment"> | string
    amount?: FloatFilter<"Payment"> | number
    transactionId?: StringNullableFilter<"Payment"> | string | null
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    provider?: SortOrder
    amount?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    status?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderId?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    provider?: StringFilter<"Payment"> | string
    amount?: FloatFilter<"Payment"> | number
    transactionId?: StringNullableFilter<"Payment"> | string | null
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id" | "orderId">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    provider?: SortOrder
    amount?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    status?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    orderId?: StringWithAggregatesFilter<"Payment"> | string
    provider?: StringWithAggregatesFilter<"Payment"> | string
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    transactionId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    paidAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type CODVerificationWhereInput = {
    AND?: CODVerificationWhereInput | CODVerificationWhereInput[]
    OR?: CODVerificationWhereInput[]
    NOT?: CODVerificationWhereInput | CODVerificationWhereInput[]
    id?: StringFilter<"CODVerification"> | string
    orderId?: StringFilter<"CODVerification"> | string
    verifiedBy?: StringFilter<"CODVerification"> | string
    verificationStatus?: EnumVerificationStatusFilter<"CODVerification"> | $Enums.VerificationStatus
    customerResponse?: StringFilter<"CODVerification"> | string
    remarks?: StringNullableFilter<"CODVerification"> | string | null
    verifiedAt?: DateTimeNullableFilter<"CODVerification"> | Date | string | null
    createdAt?: DateTimeFilter<"CODVerification"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CODVerificationOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    verifiedBy?: SortOrder
    verificationStatus?: SortOrder
    customerResponse?: SortOrder
    remarks?: SortOrderInput | SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    admin?: UserOrderByWithRelationInput
  }

  export type CODVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderId?: string
    AND?: CODVerificationWhereInput | CODVerificationWhereInput[]
    OR?: CODVerificationWhereInput[]
    NOT?: CODVerificationWhereInput | CODVerificationWhereInput[]
    verifiedBy?: StringFilter<"CODVerification"> | string
    verificationStatus?: EnumVerificationStatusFilter<"CODVerification"> | $Enums.VerificationStatus
    customerResponse?: StringFilter<"CODVerification"> | string
    remarks?: StringNullableFilter<"CODVerification"> | string | null
    verifiedAt?: DateTimeNullableFilter<"CODVerification"> | Date | string | null
    createdAt?: DateTimeFilter<"CODVerification"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "orderId">

  export type CODVerificationOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    verifiedBy?: SortOrder
    verificationStatus?: SortOrder
    customerResponse?: SortOrder
    remarks?: SortOrderInput | SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CODVerificationCountOrderByAggregateInput
    _max?: CODVerificationMaxOrderByAggregateInput
    _min?: CODVerificationMinOrderByAggregateInput
  }

  export type CODVerificationScalarWhereWithAggregatesInput = {
    AND?: CODVerificationScalarWhereWithAggregatesInput | CODVerificationScalarWhereWithAggregatesInput[]
    OR?: CODVerificationScalarWhereWithAggregatesInput[]
    NOT?: CODVerificationScalarWhereWithAggregatesInput | CODVerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CODVerification"> | string
    orderId?: StringWithAggregatesFilter<"CODVerification"> | string
    verifiedBy?: StringWithAggregatesFilter<"CODVerification"> | string
    verificationStatus?: EnumVerificationStatusWithAggregatesFilter<"CODVerification"> | $Enums.VerificationStatus
    customerResponse?: StringWithAggregatesFilter<"CODVerification"> | string
    remarks?: StringNullableWithAggregatesFilter<"CODVerification"> | string | null
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"CODVerification"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CODVerification"> | Date | string
  }

  export type VendorEarningWhereInput = {
    AND?: VendorEarningWhereInput | VendorEarningWhereInput[]
    OR?: VendorEarningWhereInput[]
    NOT?: VendorEarningWhereInput | VendorEarningWhereInput[]
    id?: StringFilter<"VendorEarning"> | string
    vendorId?: StringFilter<"VendorEarning"> | string
    orderId?: StringFilter<"VendorEarning"> | string
    affiliateId?: StringFilter<"VendorEarning"> | string
    commission?: FloatFilter<"VendorEarning"> | number
    createdAt?: DateTimeFilter<"VendorEarning"> | Date | string
    vendor?: XOR<UserScalarRelationFilter, UserWhereInput>
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    affiliate?: XOR<AffiliateLinkScalarRelationFilter, AffiliateLinkWhereInput>
  }

  export type VendorEarningOrderByWithRelationInput = {
    id?: SortOrder
    vendorId?: SortOrder
    orderId?: SortOrder
    affiliateId?: SortOrder
    commission?: SortOrder
    createdAt?: SortOrder
    vendor?: UserOrderByWithRelationInput
    order?: OrderOrderByWithRelationInput
    affiliate?: AffiliateLinkOrderByWithRelationInput
  }

  export type VendorEarningWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VendorEarningWhereInput | VendorEarningWhereInput[]
    OR?: VendorEarningWhereInput[]
    NOT?: VendorEarningWhereInput | VendorEarningWhereInput[]
    vendorId?: StringFilter<"VendorEarning"> | string
    orderId?: StringFilter<"VendorEarning"> | string
    affiliateId?: StringFilter<"VendorEarning"> | string
    commission?: FloatFilter<"VendorEarning"> | number
    createdAt?: DateTimeFilter<"VendorEarning"> | Date | string
    vendor?: XOR<UserScalarRelationFilter, UserWhereInput>
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    affiliate?: XOR<AffiliateLinkScalarRelationFilter, AffiliateLinkWhereInput>
  }, "id">

  export type VendorEarningOrderByWithAggregationInput = {
    id?: SortOrder
    vendorId?: SortOrder
    orderId?: SortOrder
    affiliateId?: SortOrder
    commission?: SortOrder
    createdAt?: SortOrder
    _count?: VendorEarningCountOrderByAggregateInput
    _avg?: VendorEarningAvgOrderByAggregateInput
    _max?: VendorEarningMaxOrderByAggregateInput
    _min?: VendorEarningMinOrderByAggregateInput
    _sum?: VendorEarningSumOrderByAggregateInput
  }

  export type VendorEarningScalarWhereWithAggregatesInput = {
    AND?: VendorEarningScalarWhereWithAggregatesInput | VendorEarningScalarWhereWithAggregatesInput[]
    OR?: VendorEarningScalarWhereWithAggregatesInput[]
    NOT?: VendorEarningScalarWhereWithAggregatesInput | VendorEarningScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VendorEarning"> | string
    vendorId?: StringWithAggregatesFilter<"VendorEarning"> | string
    orderId?: StringWithAggregatesFilter<"VendorEarning"> | string
    affiliateId?: StringWithAggregatesFilter<"VendorEarning"> | string
    commission?: FloatWithAggregatesFilter<"VendorEarning"> | number
    createdAt?: DateTimeWithAggregatesFilter<"VendorEarning"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    phone?: string | null
    address?: string | null
    roles?: UserCreaterolesInput | string[]
    updatedAt?: Date | string
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutUserInput
    affiliates?: AffiliateLinkCreateNestedManyWithoutVendorInput
    earnings?: VendorEarningCreateNestedManyWithoutVendorInput
    verifications?: CODVerificationCreateNestedManyWithoutAdminInput
    stockMovements?: StockMovementCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    phone?: string | null
    address?: string | null
    roles?: UserCreaterolesInput | string[]
    updatedAt?: Date | string
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    affiliates?: AffiliateLinkUncheckedCreateNestedManyWithoutVendorInput
    earnings?: VendorEarningUncheckedCreateNestedManyWithoutVendorInput
    verifications?: CODVerificationUncheckedCreateNestedManyWithoutAdminInput
    stockMovements?: StockMovementUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutUserNestedInput
    affiliates?: AffiliateLinkUpdateManyWithoutVendorNestedInput
    earnings?: VendorEarningUpdateManyWithoutVendorNestedInput
    verifications?: CODVerificationUpdateManyWithoutAdminNestedInput
    stockMovements?: StockMovementUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    affiliates?: AffiliateLinkUncheckedUpdateManyWithoutVendorNestedInput
    earnings?: VendorEarningUncheckedUpdateManyWithoutVendorNestedInput
    verifications?: CODVerificationUncheckedUpdateManyWithoutAdminNestedInput
    stockMovements?: StockMovementUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    phone?: string | null
    address?: string | null
    roles?: UserCreaterolesInput | string[]
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeCreateInput = {
    id?: string
    email: string
    code: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type OtpCodeUncheckedCreateInput = {
    id?: string
    email: string
    code: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type OtpCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeCreateManyInput = {
    id?: string
    email: string
    code: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type OtpCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    price: number
    totalStock?: number
    status: string
    updatedAt?: Date | string
    createdAt?: Date | string
    movements?: StockMovementCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    affiliates?: AffiliateLinkCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    price: number
    totalStock?: number
    status: string
    updatedAt?: Date | string
    createdAt?: Date | string
    movements?: StockMovementUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    affiliates?: AffiliateLinkUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: StockMovementUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    affiliates?: AffiliateLinkUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: StockMovementUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    affiliates?: AffiliateLinkUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    price: number
    totalStock?: number
    status: string
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementCreateInput = {
    id?: string
    type: $Enums.StockMovementType
    quantity: number
    reason: string
    notes?: string | null
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutMovementsInput
    order?: OrderCreateNestedOneWithoutStockMovementsInput
    user?: UserCreateNestedOneWithoutStockMovementsInput
  }

  export type StockMovementUncheckedCreateInput = {
    id?: string
    productId: string
    type: $Enums.StockMovementType
    quantity: number
    reason: string
    orderId?: string | null
    userId?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type StockMovementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutMovementsNestedInput
    order?: OrderUpdateOneWithoutStockMovementsNestedInput
    user?: UserUpdateOneWithoutStockMovementsNestedInput
  }

  export type StockMovementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementCreateManyInput = {
    id?: string
    productId: string
    type: $Enums.StockMovementType
    quantity: number
    reason: string
    orderId?: string | null
    userId?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type StockMovementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateLinkCreateInput = {
    id?: string
    code: string
    discountType: string
    discountValue: number
    commissionType: string
    commissionValue: number
    isActive?: boolean
    createdAt?: Date | string
    vendor: UserCreateNestedOneWithoutAffiliatesInput
    product?: ProductCreateNestedOneWithoutAffiliatesInput
    orders?: OrderCreateNestedManyWithoutAffiliateInput
    vendorEarnings?: VendorEarningCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateLinkUncheckedCreateInput = {
    id?: string
    code: string
    vendorId: string
    productId?: string | null
    discountType: string
    discountValue: number
    commissionType: string
    commissionValue: number
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutAffiliateInput
    vendorEarnings?: VendorEarningUncheckedCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateLinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    commissionType?: StringFieldUpdateOperationsInput | string
    commissionValue?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: UserUpdateOneRequiredWithoutAffiliatesNestedInput
    product?: ProductUpdateOneWithoutAffiliatesNestedInput
    orders?: OrderUpdateManyWithoutAffiliateNestedInput
    vendorEarnings?: VendorEarningUpdateManyWithoutAffiliateNestedInput
  }

  export type AffiliateLinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    commissionType?: StringFieldUpdateOperationsInput | string
    commissionValue?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutAffiliateNestedInput
    vendorEarnings?: VendorEarningUncheckedUpdateManyWithoutAffiliateNestedInput
  }

  export type AffiliateLinkCreateManyInput = {
    id?: string
    code: string
    vendorId: string
    productId?: string | null
    discountType: string
    discountValue: number
    commissionType: string
    commissionValue: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type AffiliateLinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    commissionType?: StringFieldUpdateOperationsInput | string
    commissionValue?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateLinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    commissionType?: StringFieldUpdateOperationsInput | string
    commissionValue?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutOrdersInput
    affiliate?: AffiliateLinkCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    payment?: PaymentCreateNestedOneWithoutOrderInput
    verification?: CODVerificationCreateNestedOneWithoutOrderInput
    earnings?: VendorEarningCreateNestedManyWithoutOrderInput
    stockMovements?: StockMovementCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    userId?: string | null
    affiliateId?: string | null
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    payment?: PaymentUncheckedCreateNestedOneWithoutOrderInput
    verification?: CODVerificationUncheckedCreateNestedOneWithoutOrderInput
    earnings?: VendorEarningUncheckedCreateNestedManyWithoutOrderInput
    stockMovements?: StockMovementUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutOrdersNestedInput
    affiliate?: AffiliateLinkUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    payment?: PaymentUpdateOneWithoutOrderNestedInput
    verification?: CODVerificationUpdateOneWithoutOrderNestedInput
    earnings?: VendorEarningUpdateManyWithoutOrderNestedInput
    stockMovements?: StockMovementUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    affiliateId?: NullableStringFieldUpdateOperationsInput | string | null
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    payment?: PaymentUncheckedUpdateOneWithoutOrderNestedInput
    verification?: CODVerificationUncheckedUpdateOneWithoutOrderNestedInput
    earnings?: VendorEarningUncheckedUpdateManyWithoutOrderNestedInput
    stockMovements?: StockMovementUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    userId?: string | null
    affiliateId?: string | null
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    affiliateId?: NullableStringFieldUpdateOperationsInput | string | null
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateInput = {
    id?: string
    quantity: number
    price: number
    total: number
    order: OrderCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: string
    orderId: string
    productId: string
    quantity: number
    price: number
    total: number
  }

  export type OrderItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemCreateManyInput = {
    id?: string
    orderId: string
    productId: string
    quantity: number
    price: number
    total: number
  }

  export type OrderItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
  }

  export type PaymentCreateInput = {
    id?: string
    provider: string
    amount: number
    transactionId?: string | null
    status: $Enums.PaymentStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    orderId: string
    provider: string
    amount: number
    transactionId?: string | null
    status: $Enums.PaymentStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    orderId: string
    provider: string
    amount: number
    transactionId?: string | null
    status: $Enums.PaymentStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CODVerificationCreateInput = {
    id?: string
    verificationStatus: $Enums.VerificationStatus
    customerResponse: string
    remarks?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutVerificationInput
    admin: UserCreateNestedOneWithoutVerificationsInput
  }

  export type CODVerificationUncheckedCreateInput = {
    id?: string
    orderId: string
    verifiedBy: string
    verificationStatus: $Enums.VerificationStatus
    customerResponse: string
    remarks?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CODVerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    customerResponse?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutVerificationNestedInput
    admin?: UserUpdateOneRequiredWithoutVerificationsNestedInput
  }

  export type CODVerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    verifiedBy?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    customerResponse?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CODVerificationCreateManyInput = {
    id?: string
    orderId: string
    verifiedBy: string
    verificationStatus: $Enums.VerificationStatus
    customerResponse: string
    remarks?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CODVerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    customerResponse?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CODVerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    verifiedBy?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    customerResponse?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorEarningCreateInput = {
    id?: string
    commission: number
    createdAt?: Date | string
    vendor: UserCreateNestedOneWithoutEarningsInput
    order: OrderCreateNestedOneWithoutEarningsInput
    affiliate: AffiliateLinkCreateNestedOneWithoutVendorEarningsInput
  }

  export type VendorEarningUncheckedCreateInput = {
    id?: string
    vendorId: string
    orderId: string
    affiliateId: string
    commission: number
    createdAt?: Date | string
  }

  export type VendorEarningUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    commission?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: UserUpdateOneRequiredWithoutEarningsNestedInput
    order?: OrderUpdateOneRequiredWithoutEarningsNestedInput
    affiliate?: AffiliateLinkUpdateOneRequiredWithoutVendorEarningsNestedInput
  }

  export type VendorEarningUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    affiliateId?: StringFieldUpdateOperationsInput | string
    commission?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorEarningCreateManyInput = {
    id?: string
    vendorId: string
    orderId: string
    affiliateId: string
    commission: number
    createdAt?: Date | string
  }

  export type VendorEarningUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    commission?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorEarningUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    affiliateId?: StringFieldUpdateOperationsInput | string
    commission?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type AffiliateLinkListRelationFilter = {
    every?: AffiliateLinkWhereInput
    some?: AffiliateLinkWhereInput
    none?: AffiliateLinkWhereInput
  }

  export type VendorEarningListRelationFilter = {
    every?: VendorEarningWhereInput
    some?: VendorEarningWhereInput
    none?: VendorEarningWhereInput
  }

  export type CODVerificationListRelationFilter = {
    every?: CODVerificationWhereInput
    some?: CODVerificationWhereInput
    none?: CODVerificationWhereInput
  }

  export type StockMovementListRelationFilter = {
    every?: StockMovementWhereInput
    some?: StockMovementWhereInput
    none?: StockMovementWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AffiliateLinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VendorEarningOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CODVerificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StockMovementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    roles?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OtpCodeCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpCodeMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    totalStock?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
    totalStock?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    totalStock?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    totalStock?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
    totalStock?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumStockMovementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StockMovementType | EnumStockMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStockMovementTypeFilter<$PrismaModel> | $Enums.StockMovementType
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type OrderNullableScalarRelationFilter = {
    is?: OrderWhereInput | null
    isNot?: OrderWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type StockMovementCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    orderId?: SortOrder
    userId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type StockMovementAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type StockMovementMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    orderId?: SortOrder
    userId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type StockMovementMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    orderId?: SortOrder
    userId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type StockMovementSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type EnumStockMovementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StockMovementType | EnumStockMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStockMovementTypeWithAggregatesFilter<$PrismaModel> | $Enums.StockMovementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStockMovementTypeFilter<$PrismaModel>
    _max?: NestedEnumStockMovementTypeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProductNullableScalarRelationFilter = {
    is?: ProductWhereInput | null
    isNot?: ProductWhereInput | null
  }

  export type AffiliateLinkCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    vendorId?: SortOrder
    productId?: SortOrder
    discountType?: SortOrder
    discountValue?: SortOrder
    commissionType?: SortOrder
    commissionValue?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type AffiliateLinkAvgOrderByAggregateInput = {
    discountValue?: SortOrder
    commissionValue?: SortOrder
  }

  export type AffiliateLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    vendorId?: SortOrder
    productId?: SortOrder
    discountType?: SortOrder
    discountValue?: SortOrder
    commissionType?: SortOrder
    commissionValue?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type AffiliateLinkMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    vendorId?: SortOrder
    productId?: SortOrder
    discountType?: SortOrder
    discountValue?: SortOrder
    commissionType?: SortOrder
    commissionValue?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type AffiliateLinkSumOrderByAggregateInput = {
    discountValue?: SortOrder
    commissionValue?: SortOrder
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type AffiliateLinkNullableScalarRelationFilter = {
    is?: AffiliateLinkWhereInput | null
    isNot?: AffiliateLinkWhereInput | null
  }

  export type PaymentNullableScalarRelationFilter = {
    is?: PaymentWhereInput | null
    isNot?: PaymentWhereInput | null
  }

  export type CODVerificationNullableScalarRelationFilter = {
    is?: CODVerificationWhereInput | null
    isNot?: CODVerificationWhereInput | null
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    affiliateId?: SortOrder
    totalAmount?: SortOrder
    discountAmount?: SortOrder
    finalAmount?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    totalAmount?: SortOrder
    discountAmount?: SortOrder
    finalAmount?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    affiliateId?: SortOrder
    totalAmount?: SortOrder
    discountAmount?: SortOrder
    finalAmount?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    affiliateId?: SortOrder
    totalAmount?: SortOrder
    discountAmount?: SortOrder
    finalAmount?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    totalAmount?: SortOrder
    discountAmount?: SortOrder
    finalAmount?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    total?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
    total?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    total?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    total?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
    total?: SortOrder
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    provider?: SortOrder
    amount?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    provider?: SortOrder
    amount?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    provider?: SortOrder
    amount?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type CODVerificationCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    verifiedBy?: SortOrder
    verificationStatus?: SortOrder
    customerResponse?: SortOrder
    remarks?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CODVerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    verifiedBy?: SortOrder
    verificationStatus?: SortOrder
    customerResponse?: SortOrder
    remarks?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CODVerificationMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    verifiedBy?: SortOrder
    verificationStatus?: SortOrder
    customerResponse?: SortOrder
    remarks?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
  }

  export type AffiliateLinkScalarRelationFilter = {
    is?: AffiliateLinkWhereInput
    isNot?: AffiliateLinkWhereInput
  }

  export type VendorEarningCountOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    orderId?: SortOrder
    affiliateId?: SortOrder
    commission?: SortOrder
    createdAt?: SortOrder
  }

  export type VendorEarningAvgOrderByAggregateInput = {
    commission?: SortOrder
  }

  export type VendorEarningMaxOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    orderId?: SortOrder
    affiliateId?: SortOrder
    commission?: SortOrder
    createdAt?: SortOrder
  }

  export type VendorEarningMinOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    orderId?: SortOrder
    affiliateId?: SortOrder
    commission?: SortOrder
    createdAt?: SortOrder
  }

  export type VendorEarningSumOrderByAggregateInput = {
    commission?: SortOrder
  }

  export type UserCreaterolesInput = {
    set: string[]
  }

  export type OrderCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type AffiliateLinkCreateNestedManyWithoutVendorInput = {
    create?: XOR<AffiliateLinkCreateWithoutVendorInput, AffiliateLinkUncheckedCreateWithoutVendorInput> | AffiliateLinkCreateWithoutVendorInput[] | AffiliateLinkUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: AffiliateLinkCreateOrConnectWithoutVendorInput | AffiliateLinkCreateOrConnectWithoutVendorInput[]
    createMany?: AffiliateLinkCreateManyVendorInputEnvelope
    connect?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
  }

  export type VendorEarningCreateNestedManyWithoutVendorInput = {
    create?: XOR<VendorEarningCreateWithoutVendorInput, VendorEarningUncheckedCreateWithoutVendorInput> | VendorEarningCreateWithoutVendorInput[] | VendorEarningUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VendorEarningCreateOrConnectWithoutVendorInput | VendorEarningCreateOrConnectWithoutVendorInput[]
    createMany?: VendorEarningCreateManyVendorInputEnvelope
    connect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
  }

  export type CODVerificationCreateNestedManyWithoutAdminInput = {
    create?: XOR<CODVerificationCreateWithoutAdminInput, CODVerificationUncheckedCreateWithoutAdminInput> | CODVerificationCreateWithoutAdminInput[] | CODVerificationUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CODVerificationCreateOrConnectWithoutAdminInput | CODVerificationCreateOrConnectWithoutAdminInput[]
    createMany?: CODVerificationCreateManyAdminInputEnvelope
    connect?: CODVerificationWhereUniqueInput | CODVerificationWhereUniqueInput[]
  }

  export type StockMovementCreateNestedManyWithoutUserInput = {
    create?: XOR<StockMovementCreateWithoutUserInput, StockMovementUncheckedCreateWithoutUserInput> | StockMovementCreateWithoutUserInput[] | StockMovementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutUserInput | StockMovementCreateOrConnectWithoutUserInput[]
    createMany?: StockMovementCreateManyUserInputEnvelope
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type AffiliateLinkUncheckedCreateNestedManyWithoutVendorInput = {
    create?: XOR<AffiliateLinkCreateWithoutVendorInput, AffiliateLinkUncheckedCreateWithoutVendorInput> | AffiliateLinkCreateWithoutVendorInput[] | AffiliateLinkUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: AffiliateLinkCreateOrConnectWithoutVendorInput | AffiliateLinkCreateOrConnectWithoutVendorInput[]
    createMany?: AffiliateLinkCreateManyVendorInputEnvelope
    connect?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
  }

  export type VendorEarningUncheckedCreateNestedManyWithoutVendorInput = {
    create?: XOR<VendorEarningCreateWithoutVendorInput, VendorEarningUncheckedCreateWithoutVendorInput> | VendorEarningCreateWithoutVendorInput[] | VendorEarningUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VendorEarningCreateOrConnectWithoutVendorInput | VendorEarningCreateOrConnectWithoutVendorInput[]
    createMany?: VendorEarningCreateManyVendorInputEnvelope
    connect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
  }

  export type CODVerificationUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<CODVerificationCreateWithoutAdminInput, CODVerificationUncheckedCreateWithoutAdminInput> | CODVerificationCreateWithoutAdminInput[] | CODVerificationUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CODVerificationCreateOrConnectWithoutAdminInput | CODVerificationCreateOrConnectWithoutAdminInput[]
    createMany?: CODVerificationCreateManyAdminInputEnvelope
    connect?: CODVerificationWhereUniqueInput | CODVerificationWhereUniqueInput[]
  }

  export type StockMovementUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<StockMovementCreateWithoutUserInput, StockMovementUncheckedCreateWithoutUserInput> | StockMovementCreateWithoutUserInput[] | StockMovementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutUserInput | StockMovementCreateOrConnectWithoutUserInput[]
    createMany?: StockMovementCreateManyUserInputEnvelope
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdaterolesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type AffiliateLinkUpdateManyWithoutVendorNestedInput = {
    create?: XOR<AffiliateLinkCreateWithoutVendorInput, AffiliateLinkUncheckedCreateWithoutVendorInput> | AffiliateLinkCreateWithoutVendorInput[] | AffiliateLinkUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: AffiliateLinkCreateOrConnectWithoutVendorInput | AffiliateLinkCreateOrConnectWithoutVendorInput[]
    upsert?: AffiliateLinkUpsertWithWhereUniqueWithoutVendorInput | AffiliateLinkUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: AffiliateLinkCreateManyVendorInputEnvelope
    set?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    disconnect?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    delete?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    connect?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    update?: AffiliateLinkUpdateWithWhereUniqueWithoutVendorInput | AffiliateLinkUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: AffiliateLinkUpdateManyWithWhereWithoutVendorInput | AffiliateLinkUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: AffiliateLinkScalarWhereInput | AffiliateLinkScalarWhereInput[]
  }

  export type VendorEarningUpdateManyWithoutVendorNestedInput = {
    create?: XOR<VendorEarningCreateWithoutVendorInput, VendorEarningUncheckedCreateWithoutVendorInput> | VendorEarningCreateWithoutVendorInput[] | VendorEarningUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VendorEarningCreateOrConnectWithoutVendorInput | VendorEarningCreateOrConnectWithoutVendorInput[]
    upsert?: VendorEarningUpsertWithWhereUniqueWithoutVendorInput | VendorEarningUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: VendorEarningCreateManyVendorInputEnvelope
    set?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    disconnect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    delete?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    connect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    update?: VendorEarningUpdateWithWhereUniqueWithoutVendorInput | VendorEarningUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: VendorEarningUpdateManyWithWhereWithoutVendorInput | VendorEarningUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: VendorEarningScalarWhereInput | VendorEarningScalarWhereInput[]
  }

  export type CODVerificationUpdateManyWithoutAdminNestedInput = {
    create?: XOR<CODVerificationCreateWithoutAdminInput, CODVerificationUncheckedCreateWithoutAdminInput> | CODVerificationCreateWithoutAdminInput[] | CODVerificationUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CODVerificationCreateOrConnectWithoutAdminInput | CODVerificationCreateOrConnectWithoutAdminInput[]
    upsert?: CODVerificationUpsertWithWhereUniqueWithoutAdminInput | CODVerificationUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: CODVerificationCreateManyAdminInputEnvelope
    set?: CODVerificationWhereUniqueInput | CODVerificationWhereUniqueInput[]
    disconnect?: CODVerificationWhereUniqueInput | CODVerificationWhereUniqueInput[]
    delete?: CODVerificationWhereUniqueInput | CODVerificationWhereUniqueInput[]
    connect?: CODVerificationWhereUniqueInput | CODVerificationWhereUniqueInput[]
    update?: CODVerificationUpdateWithWhereUniqueWithoutAdminInput | CODVerificationUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: CODVerificationUpdateManyWithWhereWithoutAdminInput | CODVerificationUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: CODVerificationScalarWhereInput | CODVerificationScalarWhereInput[]
  }

  export type StockMovementUpdateManyWithoutUserNestedInput = {
    create?: XOR<StockMovementCreateWithoutUserInput, StockMovementUncheckedCreateWithoutUserInput> | StockMovementCreateWithoutUserInput[] | StockMovementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutUserInput | StockMovementCreateOrConnectWithoutUserInput[]
    upsert?: StockMovementUpsertWithWhereUniqueWithoutUserInput | StockMovementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StockMovementCreateManyUserInputEnvelope
    set?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    disconnect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    delete?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    update?: StockMovementUpdateWithWhereUniqueWithoutUserInput | StockMovementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StockMovementUpdateManyWithWhereWithoutUserInput | StockMovementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type AffiliateLinkUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: XOR<AffiliateLinkCreateWithoutVendorInput, AffiliateLinkUncheckedCreateWithoutVendorInput> | AffiliateLinkCreateWithoutVendorInput[] | AffiliateLinkUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: AffiliateLinkCreateOrConnectWithoutVendorInput | AffiliateLinkCreateOrConnectWithoutVendorInput[]
    upsert?: AffiliateLinkUpsertWithWhereUniqueWithoutVendorInput | AffiliateLinkUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: AffiliateLinkCreateManyVendorInputEnvelope
    set?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    disconnect?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    delete?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    connect?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    update?: AffiliateLinkUpdateWithWhereUniqueWithoutVendorInput | AffiliateLinkUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: AffiliateLinkUpdateManyWithWhereWithoutVendorInput | AffiliateLinkUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: AffiliateLinkScalarWhereInput | AffiliateLinkScalarWhereInput[]
  }

  export type VendorEarningUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: XOR<VendorEarningCreateWithoutVendorInput, VendorEarningUncheckedCreateWithoutVendorInput> | VendorEarningCreateWithoutVendorInput[] | VendorEarningUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VendorEarningCreateOrConnectWithoutVendorInput | VendorEarningCreateOrConnectWithoutVendorInput[]
    upsert?: VendorEarningUpsertWithWhereUniqueWithoutVendorInput | VendorEarningUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: VendorEarningCreateManyVendorInputEnvelope
    set?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    disconnect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    delete?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    connect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    update?: VendorEarningUpdateWithWhereUniqueWithoutVendorInput | VendorEarningUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: VendorEarningUpdateManyWithWhereWithoutVendorInput | VendorEarningUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: VendorEarningScalarWhereInput | VendorEarningScalarWhereInput[]
  }

  export type CODVerificationUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<CODVerificationCreateWithoutAdminInput, CODVerificationUncheckedCreateWithoutAdminInput> | CODVerificationCreateWithoutAdminInput[] | CODVerificationUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CODVerificationCreateOrConnectWithoutAdminInput | CODVerificationCreateOrConnectWithoutAdminInput[]
    upsert?: CODVerificationUpsertWithWhereUniqueWithoutAdminInput | CODVerificationUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: CODVerificationCreateManyAdminInputEnvelope
    set?: CODVerificationWhereUniqueInput | CODVerificationWhereUniqueInput[]
    disconnect?: CODVerificationWhereUniqueInput | CODVerificationWhereUniqueInput[]
    delete?: CODVerificationWhereUniqueInput | CODVerificationWhereUniqueInput[]
    connect?: CODVerificationWhereUniqueInput | CODVerificationWhereUniqueInput[]
    update?: CODVerificationUpdateWithWhereUniqueWithoutAdminInput | CODVerificationUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: CODVerificationUpdateManyWithWhereWithoutAdminInput | CODVerificationUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: CODVerificationScalarWhereInput | CODVerificationScalarWhereInput[]
  }

  export type StockMovementUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<StockMovementCreateWithoutUserInput, StockMovementUncheckedCreateWithoutUserInput> | StockMovementCreateWithoutUserInput[] | StockMovementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutUserInput | StockMovementCreateOrConnectWithoutUserInput[]
    upsert?: StockMovementUpsertWithWhereUniqueWithoutUserInput | StockMovementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StockMovementCreateManyUserInputEnvelope
    set?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    disconnect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    delete?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    update?: StockMovementUpdateWithWhereUniqueWithoutUserInput | StockMovementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StockMovementUpdateManyWithWhereWithoutUserInput | StockMovementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type StockMovementCreateNestedManyWithoutProductInput = {
    create?: XOR<StockMovementCreateWithoutProductInput, StockMovementUncheckedCreateWithoutProductInput> | StockMovementCreateWithoutProductInput[] | StockMovementUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutProductInput | StockMovementCreateOrConnectWithoutProductInput[]
    createMany?: StockMovementCreateManyProductInputEnvelope
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
  }

  export type OrderItemCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type AffiliateLinkCreateNestedManyWithoutProductInput = {
    create?: XOR<AffiliateLinkCreateWithoutProductInput, AffiliateLinkUncheckedCreateWithoutProductInput> | AffiliateLinkCreateWithoutProductInput[] | AffiliateLinkUncheckedCreateWithoutProductInput[]
    connectOrCreate?: AffiliateLinkCreateOrConnectWithoutProductInput | AffiliateLinkCreateOrConnectWithoutProductInput[]
    createMany?: AffiliateLinkCreateManyProductInputEnvelope
    connect?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
  }

  export type StockMovementUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<StockMovementCreateWithoutProductInput, StockMovementUncheckedCreateWithoutProductInput> | StockMovementCreateWithoutProductInput[] | StockMovementUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutProductInput | StockMovementCreateOrConnectWithoutProductInput[]
    createMany?: StockMovementCreateManyProductInputEnvelope
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type AffiliateLinkUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<AffiliateLinkCreateWithoutProductInput, AffiliateLinkUncheckedCreateWithoutProductInput> | AffiliateLinkCreateWithoutProductInput[] | AffiliateLinkUncheckedCreateWithoutProductInput[]
    connectOrCreate?: AffiliateLinkCreateOrConnectWithoutProductInput | AffiliateLinkCreateOrConnectWithoutProductInput[]
    createMany?: AffiliateLinkCreateManyProductInputEnvelope
    connect?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StockMovementUpdateManyWithoutProductNestedInput = {
    create?: XOR<StockMovementCreateWithoutProductInput, StockMovementUncheckedCreateWithoutProductInput> | StockMovementCreateWithoutProductInput[] | StockMovementUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutProductInput | StockMovementCreateOrConnectWithoutProductInput[]
    upsert?: StockMovementUpsertWithWhereUniqueWithoutProductInput | StockMovementUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: StockMovementCreateManyProductInputEnvelope
    set?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    disconnect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    delete?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    update?: StockMovementUpdateWithWhereUniqueWithoutProductInput | StockMovementUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: StockMovementUpdateManyWithWhereWithoutProductInput | StockMovementUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
  }

  export type OrderItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type AffiliateLinkUpdateManyWithoutProductNestedInput = {
    create?: XOR<AffiliateLinkCreateWithoutProductInput, AffiliateLinkUncheckedCreateWithoutProductInput> | AffiliateLinkCreateWithoutProductInput[] | AffiliateLinkUncheckedCreateWithoutProductInput[]
    connectOrCreate?: AffiliateLinkCreateOrConnectWithoutProductInput | AffiliateLinkCreateOrConnectWithoutProductInput[]
    upsert?: AffiliateLinkUpsertWithWhereUniqueWithoutProductInput | AffiliateLinkUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: AffiliateLinkCreateManyProductInputEnvelope
    set?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    disconnect?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    delete?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    connect?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    update?: AffiliateLinkUpdateWithWhereUniqueWithoutProductInput | AffiliateLinkUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: AffiliateLinkUpdateManyWithWhereWithoutProductInput | AffiliateLinkUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: AffiliateLinkScalarWhereInput | AffiliateLinkScalarWhereInput[]
  }

  export type StockMovementUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<StockMovementCreateWithoutProductInput, StockMovementUncheckedCreateWithoutProductInput> | StockMovementCreateWithoutProductInput[] | StockMovementUncheckedCreateWithoutProductInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutProductInput | StockMovementCreateOrConnectWithoutProductInput[]
    upsert?: StockMovementUpsertWithWhereUniqueWithoutProductInput | StockMovementUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: StockMovementCreateManyProductInputEnvelope
    set?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    disconnect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    delete?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    update?: StockMovementUpdateWithWhereUniqueWithoutProductInput | StockMovementUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: StockMovementUpdateManyWithWhereWithoutProductInput | StockMovementUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type AffiliateLinkUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<AffiliateLinkCreateWithoutProductInput, AffiliateLinkUncheckedCreateWithoutProductInput> | AffiliateLinkCreateWithoutProductInput[] | AffiliateLinkUncheckedCreateWithoutProductInput[]
    connectOrCreate?: AffiliateLinkCreateOrConnectWithoutProductInput | AffiliateLinkCreateOrConnectWithoutProductInput[]
    upsert?: AffiliateLinkUpsertWithWhereUniqueWithoutProductInput | AffiliateLinkUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: AffiliateLinkCreateManyProductInputEnvelope
    set?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    disconnect?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    delete?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    connect?: AffiliateLinkWhereUniqueInput | AffiliateLinkWhereUniqueInput[]
    update?: AffiliateLinkUpdateWithWhereUniqueWithoutProductInput | AffiliateLinkUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: AffiliateLinkUpdateManyWithWhereWithoutProductInput | AffiliateLinkUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: AffiliateLinkScalarWhereInput | AffiliateLinkScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutMovementsInput = {
    create?: XOR<ProductCreateWithoutMovementsInput, ProductUncheckedCreateWithoutMovementsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutMovementsInput
    connect?: ProductWhereUniqueInput
  }

  export type OrderCreateNestedOneWithoutStockMovementsInput = {
    create?: XOR<OrderCreateWithoutStockMovementsInput, OrderUncheckedCreateWithoutStockMovementsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutStockMovementsInput
    connect?: OrderWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutStockMovementsInput = {
    create?: XOR<UserCreateWithoutStockMovementsInput, UserUncheckedCreateWithoutStockMovementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStockMovementsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumStockMovementTypeFieldUpdateOperationsInput = {
    set?: $Enums.StockMovementType
  }

  export type ProductUpdateOneRequiredWithoutMovementsNestedInput = {
    create?: XOR<ProductCreateWithoutMovementsInput, ProductUncheckedCreateWithoutMovementsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutMovementsInput
    upsert?: ProductUpsertWithoutMovementsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutMovementsInput, ProductUpdateWithoutMovementsInput>, ProductUncheckedUpdateWithoutMovementsInput>
  }

  export type OrderUpdateOneWithoutStockMovementsNestedInput = {
    create?: XOR<OrderCreateWithoutStockMovementsInput, OrderUncheckedCreateWithoutStockMovementsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutStockMovementsInput
    upsert?: OrderUpsertWithoutStockMovementsInput
    disconnect?: OrderWhereInput | boolean
    delete?: OrderWhereInput | boolean
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutStockMovementsInput, OrderUpdateWithoutStockMovementsInput>, OrderUncheckedUpdateWithoutStockMovementsInput>
  }

  export type UserUpdateOneWithoutStockMovementsNestedInput = {
    create?: XOR<UserCreateWithoutStockMovementsInput, UserUncheckedCreateWithoutStockMovementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStockMovementsInput
    upsert?: UserUpsertWithoutStockMovementsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStockMovementsInput, UserUpdateWithoutStockMovementsInput>, UserUncheckedUpdateWithoutStockMovementsInput>
  }

  export type UserCreateNestedOneWithoutAffiliatesInput = {
    create?: XOR<UserCreateWithoutAffiliatesInput, UserUncheckedCreateWithoutAffiliatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAffiliatesInput
    connect?: UserWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutAffiliatesInput = {
    create?: XOR<ProductCreateWithoutAffiliatesInput, ProductUncheckedCreateWithoutAffiliatesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutAffiliatesInput
    connect?: ProductWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutAffiliateInput = {
    create?: XOR<OrderCreateWithoutAffiliateInput, OrderUncheckedCreateWithoutAffiliateInput> | OrderCreateWithoutAffiliateInput[] | OrderUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAffiliateInput | OrderCreateOrConnectWithoutAffiliateInput[]
    createMany?: OrderCreateManyAffiliateInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type VendorEarningCreateNestedManyWithoutAffiliateInput = {
    create?: XOR<VendorEarningCreateWithoutAffiliateInput, VendorEarningUncheckedCreateWithoutAffiliateInput> | VendorEarningCreateWithoutAffiliateInput[] | VendorEarningUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: VendorEarningCreateOrConnectWithoutAffiliateInput | VendorEarningCreateOrConnectWithoutAffiliateInput[]
    createMany?: VendorEarningCreateManyAffiliateInputEnvelope
    connect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutAffiliateInput = {
    create?: XOR<OrderCreateWithoutAffiliateInput, OrderUncheckedCreateWithoutAffiliateInput> | OrderCreateWithoutAffiliateInput[] | OrderUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAffiliateInput | OrderCreateOrConnectWithoutAffiliateInput[]
    createMany?: OrderCreateManyAffiliateInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type VendorEarningUncheckedCreateNestedManyWithoutAffiliateInput = {
    create?: XOR<VendorEarningCreateWithoutAffiliateInput, VendorEarningUncheckedCreateWithoutAffiliateInput> | VendorEarningCreateWithoutAffiliateInput[] | VendorEarningUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: VendorEarningCreateOrConnectWithoutAffiliateInput | VendorEarningCreateOrConnectWithoutAffiliateInput[]
    createMany?: VendorEarningCreateManyAffiliateInputEnvelope
    connect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutAffiliatesNestedInput = {
    create?: XOR<UserCreateWithoutAffiliatesInput, UserUncheckedCreateWithoutAffiliatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAffiliatesInput
    upsert?: UserUpsertWithoutAffiliatesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAffiliatesInput, UserUpdateWithoutAffiliatesInput>, UserUncheckedUpdateWithoutAffiliatesInput>
  }

  export type ProductUpdateOneWithoutAffiliatesNestedInput = {
    create?: XOR<ProductCreateWithoutAffiliatesInput, ProductUncheckedCreateWithoutAffiliatesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutAffiliatesInput
    upsert?: ProductUpsertWithoutAffiliatesInput
    disconnect?: ProductWhereInput | boolean
    delete?: ProductWhereInput | boolean
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutAffiliatesInput, ProductUpdateWithoutAffiliatesInput>, ProductUncheckedUpdateWithoutAffiliatesInput>
  }

  export type OrderUpdateManyWithoutAffiliateNestedInput = {
    create?: XOR<OrderCreateWithoutAffiliateInput, OrderUncheckedCreateWithoutAffiliateInput> | OrderCreateWithoutAffiliateInput[] | OrderUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAffiliateInput | OrderCreateOrConnectWithoutAffiliateInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutAffiliateInput | OrderUpsertWithWhereUniqueWithoutAffiliateInput[]
    createMany?: OrderCreateManyAffiliateInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutAffiliateInput | OrderUpdateWithWhereUniqueWithoutAffiliateInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutAffiliateInput | OrderUpdateManyWithWhereWithoutAffiliateInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type VendorEarningUpdateManyWithoutAffiliateNestedInput = {
    create?: XOR<VendorEarningCreateWithoutAffiliateInput, VendorEarningUncheckedCreateWithoutAffiliateInput> | VendorEarningCreateWithoutAffiliateInput[] | VendorEarningUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: VendorEarningCreateOrConnectWithoutAffiliateInput | VendorEarningCreateOrConnectWithoutAffiliateInput[]
    upsert?: VendorEarningUpsertWithWhereUniqueWithoutAffiliateInput | VendorEarningUpsertWithWhereUniqueWithoutAffiliateInput[]
    createMany?: VendorEarningCreateManyAffiliateInputEnvelope
    set?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    disconnect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    delete?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    connect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    update?: VendorEarningUpdateWithWhereUniqueWithoutAffiliateInput | VendorEarningUpdateWithWhereUniqueWithoutAffiliateInput[]
    updateMany?: VendorEarningUpdateManyWithWhereWithoutAffiliateInput | VendorEarningUpdateManyWithWhereWithoutAffiliateInput[]
    deleteMany?: VendorEarningScalarWhereInput | VendorEarningScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutAffiliateNestedInput = {
    create?: XOR<OrderCreateWithoutAffiliateInput, OrderUncheckedCreateWithoutAffiliateInput> | OrderCreateWithoutAffiliateInput[] | OrderUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAffiliateInput | OrderCreateOrConnectWithoutAffiliateInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutAffiliateInput | OrderUpsertWithWhereUniqueWithoutAffiliateInput[]
    createMany?: OrderCreateManyAffiliateInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutAffiliateInput | OrderUpdateWithWhereUniqueWithoutAffiliateInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutAffiliateInput | OrderUpdateManyWithWhereWithoutAffiliateInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type VendorEarningUncheckedUpdateManyWithoutAffiliateNestedInput = {
    create?: XOR<VendorEarningCreateWithoutAffiliateInput, VendorEarningUncheckedCreateWithoutAffiliateInput> | VendorEarningCreateWithoutAffiliateInput[] | VendorEarningUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: VendorEarningCreateOrConnectWithoutAffiliateInput | VendorEarningCreateOrConnectWithoutAffiliateInput[]
    upsert?: VendorEarningUpsertWithWhereUniqueWithoutAffiliateInput | VendorEarningUpsertWithWhereUniqueWithoutAffiliateInput[]
    createMany?: VendorEarningCreateManyAffiliateInputEnvelope
    set?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    disconnect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    delete?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    connect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    update?: VendorEarningUpdateWithWhereUniqueWithoutAffiliateInput | VendorEarningUpdateWithWhereUniqueWithoutAffiliateInput[]
    updateMany?: VendorEarningUpdateManyWithWhereWithoutAffiliateInput | VendorEarningUpdateManyWithWhereWithoutAffiliateInput[]
    deleteMany?: VendorEarningScalarWhereInput | VendorEarningScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type AffiliateLinkCreateNestedOneWithoutOrdersInput = {
    create?: XOR<AffiliateLinkCreateWithoutOrdersInput, AffiliateLinkUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: AffiliateLinkCreateOrConnectWithoutOrdersInput
    connect?: AffiliateLinkWhereUniqueInput
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type PaymentCreateNestedOneWithoutOrderInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput
    connect?: PaymentWhereUniqueInput
  }

  export type CODVerificationCreateNestedOneWithoutOrderInput = {
    create?: XOR<CODVerificationCreateWithoutOrderInput, CODVerificationUncheckedCreateWithoutOrderInput>
    connectOrCreate?: CODVerificationCreateOrConnectWithoutOrderInput
    connect?: CODVerificationWhereUniqueInput
  }

  export type VendorEarningCreateNestedManyWithoutOrderInput = {
    create?: XOR<VendorEarningCreateWithoutOrderInput, VendorEarningUncheckedCreateWithoutOrderInput> | VendorEarningCreateWithoutOrderInput[] | VendorEarningUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: VendorEarningCreateOrConnectWithoutOrderInput | VendorEarningCreateOrConnectWithoutOrderInput[]
    createMany?: VendorEarningCreateManyOrderInputEnvelope
    connect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
  }

  export type StockMovementCreateNestedManyWithoutOrderInput = {
    create?: XOR<StockMovementCreateWithoutOrderInput, StockMovementUncheckedCreateWithoutOrderInput> | StockMovementCreateWithoutOrderInput[] | StockMovementUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutOrderInput | StockMovementCreateOrConnectWithoutOrderInput[]
    createMany?: StockMovementCreateManyOrderInputEnvelope
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedOneWithoutOrderInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput
    connect?: PaymentWhereUniqueInput
  }

  export type CODVerificationUncheckedCreateNestedOneWithoutOrderInput = {
    create?: XOR<CODVerificationCreateWithoutOrderInput, CODVerificationUncheckedCreateWithoutOrderInput>
    connectOrCreate?: CODVerificationCreateOrConnectWithoutOrderInput
    connect?: CODVerificationWhereUniqueInput
  }

  export type VendorEarningUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<VendorEarningCreateWithoutOrderInput, VendorEarningUncheckedCreateWithoutOrderInput> | VendorEarningCreateWithoutOrderInput[] | VendorEarningUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: VendorEarningCreateOrConnectWithoutOrderInput | VendorEarningCreateOrConnectWithoutOrderInput[]
    createMany?: VendorEarningCreateManyOrderInputEnvelope
    connect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
  }

  export type StockMovementUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<StockMovementCreateWithoutOrderInput, StockMovementUncheckedCreateWithoutOrderInput> | StockMovementCreateWithoutOrderInput[] | StockMovementUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutOrderInput | StockMovementCreateOrConnectWithoutOrderInput[]
    createMany?: StockMovementCreateManyOrderInputEnvelope
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type UserUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    upsert?: UserUpsertWithoutOrdersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersInput, UserUpdateWithoutOrdersInput>, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type AffiliateLinkUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<AffiliateLinkCreateWithoutOrdersInput, AffiliateLinkUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: AffiliateLinkCreateOrConnectWithoutOrdersInput
    upsert?: AffiliateLinkUpsertWithoutOrdersInput
    disconnect?: AffiliateLinkWhereInput | boolean
    delete?: AffiliateLinkWhereInput | boolean
    connect?: AffiliateLinkWhereUniqueInput
    update?: XOR<XOR<AffiliateLinkUpdateToOneWithWhereWithoutOrdersInput, AffiliateLinkUpdateWithoutOrdersInput>, AffiliateLinkUncheckedUpdateWithoutOrdersInput>
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type PaymentUpdateOneWithoutOrderNestedInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput
    upsert?: PaymentUpsertWithoutOrderInput
    disconnect?: PaymentWhereInput | boolean
    delete?: PaymentWhereInput | boolean
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutOrderInput, PaymentUpdateWithoutOrderInput>, PaymentUncheckedUpdateWithoutOrderInput>
  }

  export type CODVerificationUpdateOneWithoutOrderNestedInput = {
    create?: XOR<CODVerificationCreateWithoutOrderInput, CODVerificationUncheckedCreateWithoutOrderInput>
    connectOrCreate?: CODVerificationCreateOrConnectWithoutOrderInput
    upsert?: CODVerificationUpsertWithoutOrderInput
    disconnect?: CODVerificationWhereInput | boolean
    delete?: CODVerificationWhereInput | boolean
    connect?: CODVerificationWhereUniqueInput
    update?: XOR<XOR<CODVerificationUpdateToOneWithWhereWithoutOrderInput, CODVerificationUpdateWithoutOrderInput>, CODVerificationUncheckedUpdateWithoutOrderInput>
  }

  export type VendorEarningUpdateManyWithoutOrderNestedInput = {
    create?: XOR<VendorEarningCreateWithoutOrderInput, VendorEarningUncheckedCreateWithoutOrderInput> | VendorEarningCreateWithoutOrderInput[] | VendorEarningUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: VendorEarningCreateOrConnectWithoutOrderInput | VendorEarningCreateOrConnectWithoutOrderInput[]
    upsert?: VendorEarningUpsertWithWhereUniqueWithoutOrderInput | VendorEarningUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: VendorEarningCreateManyOrderInputEnvelope
    set?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    disconnect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    delete?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    connect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    update?: VendorEarningUpdateWithWhereUniqueWithoutOrderInput | VendorEarningUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: VendorEarningUpdateManyWithWhereWithoutOrderInput | VendorEarningUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: VendorEarningScalarWhereInput | VendorEarningScalarWhereInput[]
  }

  export type StockMovementUpdateManyWithoutOrderNestedInput = {
    create?: XOR<StockMovementCreateWithoutOrderInput, StockMovementUncheckedCreateWithoutOrderInput> | StockMovementCreateWithoutOrderInput[] | StockMovementUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutOrderInput | StockMovementCreateOrConnectWithoutOrderInput[]
    upsert?: StockMovementUpsertWithWhereUniqueWithoutOrderInput | StockMovementUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: StockMovementCreateManyOrderInputEnvelope
    set?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    disconnect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    delete?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    update?: StockMovementUpdateWithWhereUniqueWithoutOrderInput | StockMovementUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: StockMovementUpdateManyWithWhereWithoutOrderInput | StockMovementUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateOneWithoutOrderNestedInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput
    upsert?: PaymentUpsertWithoutOrderInput
    disconnect?: PaymentWhereInput | boolean
    delete?: PaymentWhereInput | boolean
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutOrderInput, PaymentUpdateWithoutOrderInput>, PaymentUncheckedUpdateWithoutOrderInput>
  }

  export type CODVerificationUncheckedUpdateOneWithoutOrderNestedInput = {
    create?: XOR<CODVerificationCreateWithoutOrderInput, CODVerificationUncheckedCreateWithoutOrderInput>
    connectOrCreate?: CODVerificationCreateOrConnectWithoutOrderInput
    upsert?: CODVerificationUpsertWithoutOrderInput
    disconnect?: CODVerificationWhereInput | boolean
    delete?: CODVerificationWhereInput | boolean
    connect?: CODVerificationWhereUniqueInput
    update?: XOR<XOR<CODVerificationUpdateToOneWithWhereWithoutOrderInput, CODVerificationUpdateWithoutOrderInput>, CODVerificationUncheckedUpdateWithoutOrderInput>
  }

  export type VendorEarningUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<VendorEarningCreateWithoutOrderInput, VendorEarningUncheckedCreateWithoutOrderInput> | VendorEarningCreateWithoutOrderInput[] | VendorEarningUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: VendorEarningCreateOrConnectWithoutOrderInput | VendorEarningCreateOrConnectWithoutOrderInput[]
    upsert?: VendorEarningUpsertWithWhereUniqueWithoutOrderInput | VendorEarningUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: VendorEarningCreateManyOrderInputEnvelope
    set?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    disconnect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    delete?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    connect?: VendorEarningWhereUniqueInput | VendorEarningWhereUniqueInput[]
    update?: VendorEarningUpdateWithWhereUniqueWithoutOrderInput | VendorEarningUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: VendorEarningUpdateManyWithWhereWithoutOrderInput | VendorEarningUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: VendorEarningScalarWhereInput | VendorEarningScalarWhereInput[]
  }

  export type StockMovementUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<StockMovementCreateWithoutOrderInput, StockMovementUncheckedCreateWithoutOrderInput> | StockMovementCreateWithoutOrderInput[] | StockMovementUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: StockMovementCreateOrConnectWithoutOrderInput | StockMovementCreateOrConnectWithoutOrderInput[]
    upsert?: StockMovementUpsertWithWhereUniqueWithoutOrderInput | StockMovementUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: StockMovementCreateManyOrderInputEnvelope
    set?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    disconnect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    delete?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    connect?: StockMovementWhereUniqueInput | StockMovementWhereUniqueInput[]
    update?: StockMovementUpdateWithWhereUniqueWithoutOrderInput | StockMovementUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: StockMovementUpdateManyWithWhereWithoutOrderInput | StockMovementUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    upsert?: ProductUpsertWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrderItemsInput, ProductUpdateWithoutOrderItemsInput>, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type OrderCreateNestedOneWithoutPaymentInput = {
    create?: XOR<OrderCreateWithoutPaymentInput, OrderUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: OrderCreateOrConnectWithoutPaymentInput
    connect?: OrderWhereUniqueInput
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type OrderUpdateOneRequiredWithoutPaymentNestedInput = {
    create?: XOR<OrderCreateWithoutPaymentInput, OrderUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: OrderCreateOrConnectWithoutPaymentInput
    upsert?: OrderUpsertWithoutPaymentInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutPaymentInput, OrderUpdateWithoutPaymentInput>, OrderUncheckedUpdateWithoutPaymentInput>
  }

  export type OrderCreateNestedOneWithoutVerificationInput = {
    create?: XOR<OrderCreateWithoutVerificationInput, OrderUncheckedCreateWithoutVerificationInput>
    connectOrCreate?: OrderCreateOrConnectWithoutVerificationInput
    connect?: OrderWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutVerificationsInput = {
    create?: XOR<UserCreateWithoutVerificationsInput, UserUncheckedCreateWithoutVerificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerificationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumVerificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.VerificationStatus
  }

  export type OrderUpdateOneRequiredWithoutVerificationNestedInput = {
    create?: XOR<OrderCreateWithoutVerificationInput, OrderUncheckedCreateWithoutVerificationInput>
    connectOrCreate?: OrderCreateOrConnectWithoutVerificationInput
    upsert?: OrderUpsertWithoutVerificationInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutVerificationInput, OrderUpdateWithoutVerificationInput>, OrderUncheckedUpdateWithoutVerificationInput>
  }

  export type UserUpdateOneRequiredWithoutVerificationsNestedInput = {
    create?: XOR<UserCreateWithoutVerificationsInput, UserUncheckedCreateWithoutVerificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerificationsInput
    upsert?: UserUpsertWithoutVerificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVerificationsInput, UserUpdateWithoutVerificationsInput>, UserUncheckedUpdateWithoutVerificationsInput>
  }

  export type UserCreateNestedOneWithoutEarningsInput = {
    create?: XOR<UserCreateWithoutEarningsInput, UserUncheckedCreateWithoutEarningsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEarningsInput
    connect?: UserWhereUniqueInput
  }

  export type OrderCreateNestedOneWithoutEarningsInput = {
    create?: XOR<OrderCreateWithoutEarningsInput, OrderUncheckedCreateWithoutEarningsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutEarningsInput
    connect?: OrderWhereUniqueInput
  }

  export type AffiliateLinkCreateNestedOneWithoutVendorEarningsInput = {
    create?: XOR<AffiliateLinkCreateWithoutVendorEarningsInput, AffiliateLinkUncheckedCreateWithoutVendorEarningsInput>
    connectOrCreate?: AffiliateLinkCreateOrConnectWithoutVendorEarningsInput
    connect?: AffiliateLinkWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEarningsNestedInput = {
    create?: XOR<UserCreateWithoutEarningsInput, UserUncheckedCreateWithoutEarningsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEarningsInput
    upsert?: UserUpsertWithoutEarningsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEarningsInput, UserUpdateWithoutEarningsInput>, UserUncheckedUpdateWithoutEarningsInput>
  }

  export type OrderUpdateOneRequiredWithoutEarningsNestedInput = {
    create?: XOR<OrderCreateWithoutEarningsInput, OrderUncheckedCreateWithoutEarningsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutEarningsInput
    upsert?: OrderUpsertWithoutEarningsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutEarningsInput, OrderUpdateWithoutEarningsInput>, OrderUncheckedUpdateWithoutEarningsInput>
  }

  export type AffiliateLinkUpdateOneRequiredWithoutVendorEarningsNestedInput = {
    create?: XOR<AffiliateLinkCreateWithoutVendorEarningsInput, AffiliateLinkUncheckedCreateWithoutVendorEarningsInput>
    connectOrCreate?: AffiliateLinkCreateOrConnectWithoutVendorEarningsInput
    upsert?: AffiliateLinkUpsertWithoutVendorEarningsInput
    connect?: AffiliateLinkWhereUniqueInput
    update?: XOR<XOR<AffiliateLinkUpdateToOneWithWhereWithoutVendorEarningsInput, AffiliateLinkUpdateWithoutVendorEarningsInput>, AffiliateLinkUncheckedUpdateWithoutVendorEarningsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumStockMovementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StockMovementType | EnumStockMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStockMovementTypeFilter<$PrismaModel> | $Enums.StockMovementType
  }

  export type NestedEnumStockMovementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StockMovementType | EnumStockMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockMovementType[] | ListEnumStockMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStockMovementTypeWithAggregatesFilter<$PrismaModel> | $Enums.StockMovementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStockMovementTypeFilter<$PrismaModel>
    _max?: NestedEnumStockMovementTypeFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
  }

  export type OrderCreateWithoutUserInput = {
    id?: string
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    affiliate?: AffiliateLinkCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    payment?: PaymentCreateNestedOneWithoutOrderInput
    verification?: CODVerificationCreateNestedOneWithoutOrderInput
    earnings?: VendorEarningCreateNestedManyWithoutOrderInput
    stockMovements?: StockMovementCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutUserInput = {
    id?: string
    affiliateId?: string | null
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    payment?: PaymentUncheckedCreateNestedOneWithoutOrderInput
    verification?: CODVerificationUncheckedCreateNestedOneWithoutOrderInput
    earnings?: VendorEarningUncheckedCreateNestedManyWithoutOrderInput
    stockMovements?: StockMovementUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderCreateManyUserInputEnvelope = {
    data: OrderCreateManyUserInput | OrderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AffiliateLinkCreateWithoutVendorInput = {
    id?: string
    code: string
    discountType: string
    discountValue: number
    commissionType: string
    commissionValue: number
    isActive?: boolean
    createdAt?: Date | string
    product?: ProductCreateNestedOneWithoutAffiliatesInput
    orders?: OrderCreateNestedManyWithoutAffiliateInput
    vendorEarnings?: VendorEarningCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateLinkUncheckedCreateWithoutVendorInput = {
    id?: string
    code: string
    productId?: string | null
    discountType: string
    discountValue: number
    commissionType: string
    commissionValue: number
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutAffiliateInput
    vendorEarnings?: VendorEarningUncheckedCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateLinkCreateOrConnectWithoutVendorInput = {
    where: AffiliateLinkWhereUniqueInput
    create: XOR<AffiliateLinkCreateWithoutVendorInput, AffiliateLinkUncheckedCreateWithoutVendorInput>
  }

  export type AffiliateLinkCreateManyVendorInputEnvelope = {
    data: AffiliateLinkCreateManyVendorInput | AffiliateLinkCreateManyVendorInput[]
    skipDuplicates?: boolean
  }

  export type VendorEarningCreateWithoutVendorInput = {
    id?: string
    commission: number
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutEarningsInput
    affiliate: AffiliateLinkCreateNestedOneWithoutVendorEarningsInput
  }

  export type VendorEarningUncheckedCreateWithoutVendorInput = {
    id?: string
    orderId: string
    affiliateId: string
    commission: number
    createdAt?: Date | string
  }

  export type VendorEarningCreateOrConnectWithoutVendorInput = {
    where: VendorEarningWhereUniqueInput
    create: XOR<VendorEarningCreateWithoutVendorInput, VendorEarningUncheckedCreateWithoutVendorInput>
  }

  export type VendorEarningCreateManyVendorInputEnvelope = {
    data: VendorEarningCreateManyVendorInput | VendorEarningCreateManyVendorInput[]
    skipDuplicates?: boolean
  }

  export type CODVerificationCreateWithoutAdminInput = {
    id?: string
    verificationStatus: $Enums.VerificationStatus
    customerResponse: string
    remarks?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutVerificationInput
  }

  export type CODVerificationUncheckedCreateWithoutAdminInput = {
    id?: string
    orderId: string
    verificationStatus: $Enums.VerificationStatus
    customerResponse: string
    remarks?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CODVerificationCreateOrConnectWithoutAdminInput = {
    where: CODVerificationWhereUniqueInput
    create: XOR<CODVerificationCreateWithoutAdminInput, CODVerificationUncheckedCreateWithoutAdminInput>
  }

  export type CODVerificationCreateManyAdminInputEnvelope = {
    data: CODVerificationCreateManyAdminInput | CODVerificationCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type StockMovementCreateWithoutUserInput = {
    id?: string
    type: $Enums.StockMovementType
    quantity: number
    reason: string
    notes?: string | null
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutMovementsInput
    order?: OrderCreateNestedOneWithoutStockMovementsInput
  }

  export type StockMovementUncheckedCreateWithoutUserInput = {
    id?: string
    productId: string
    type: $Enums.StockMovementType
    quantity: number
    reason: string
    orderId?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type StockMovementCreateOrConnectWithoutUserInput = {
    where: StockMovementWhereUniqueInput
    create: XOR<StockMovementCreateWithoutUserInput, StockMovementUncheckedCreateWithoutUserInput>
  }

  export type StockMovementCreateManyUserInputEnvelope = {
    data: StockMovementCreateManyUserInput | StockMovementCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutUserInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    userId?: StringNullableFilter<"Order"> | string | null
    affiliateId?: StringNullableFilter<"Order"> | string | null
    totalAmount?: FloatFilter<"Order"> | number
    discountAmount?: FloatFilter<"Order"> | number
    finalAmount?: FloatFilter<"Order"> | number
    paymentMethod?: StringFilter<"Order"> | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    createdAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type AffiliateLinkUpsertWithWhereUniqueWithoutVendorInput = {
    where: AffiliateLinkWhereUniqueInput
    update: XOR<AffiliateLinkUpdateWithoutVendorInput, AffiliateLinkUncheckedUpdateWithoutVendorInput>
    create: XOR<AffiliateLinkCreateWithoutVendorInput, AffiliateLinkUncheckedCreateWithoutVendorInput>
  }

  export type AffiliateLinkUpdateWithWhereUniqueWithoutVendorInput = {
    where: AffiliateLinkWhereUniqueInput
    data: XOR<AffiliateLinkUpdateWithoutVendorInput, AffiliateLinkUncheckedUpdateWithoutVendorInput>
  }

  export type AffiliateLinkUpdateManyWithWhereWithoutVendorInput = {
    where: AffiliateLinkScalarWhereInput
    data: XOR<AffiliateLinkUpdateManyMutationInput, AffiliateLinkUncheckedUpdateManyWithoutVendorInput>
  }

  export type AffiliateLinkScalarWhereInput = {
    AND?: AffiliateLinkScalarWhereInput | AffiliateLinkScalarWhereInput[]
    OR?: AffiliateLinkScalarWhereInput[]
    NOT?: AffiliateLinkScalarWhereInput | AffiliateLinkScalarWhereInput[]
    id?: StringFilter<"AffiliateLink"> | string
    code?: StringFilter<"AffiliateLink"> | string
    vendorId?: StringFilter<"AffiliateLink"> | string
    productId?: StringNullableFilter<"AffiliateLink"> | string | null
    discountType?: StringFilter<"AffiliateLink"> | string
    discountValue?: FloatFilter<"AffiliateLink"> | number
    commissionType?: StringFilter<"AffiliateLink"> | string
    commissionValue?: FloatFilter<"AffiliateLink"> | number
    isActive?: BoolFilter<"AffiliateLink"> | boolean
    createdAt?: DateTimeFilter<"AffiliateLink"> | Date | string
  }

  export type VendorEarningUpsertWithWhereUniqueWithoutVendorInput = {
    where: VendorEarningWhereUniqueInput
    update: XOR<VendorEarningUpdateWithoutVendorInput, VendorEarningUncheckedUpdateWithoutVendorInput>
    create: XOR<VendorEarningCreateWithoutVendorInput, VendorEarningUncheckedCreateWithoutVendorInput>
  }

  export type VendorEarningUpdateWithWhereUniqueWithoutVendorInput = {
    where: VendorEarningWhereUniqueInput
    data: XOR<VendorEarningUpdateWithoutVendorInput, VendorEarningUncheckedUpdateWithoutVendorInput>
  }

  export type VendorEarningUpdateManyWithWhereWithoutVendorInput = {
    where: VendorEarningScalarWhereInput
    data: XOR<VendorEarningUpdateManyMutationInput, VendorEarningUncheckedUpdateManyWithoutVendorInput>
  }

  export type VendorEarningScalarWhereInput = {
    AND?: VendorEarningScalarWhereInput | VendorEarningScalarWhereInput[]
    OR?: VendorEarningScalarWhereInput[]
    NOT?: VendorEarningScalarWhereInput | VendorEarningScalarWhereInput[]
    id?: StringFilter<"VendorEarning"> | string
    vendorId?: StringFilter<"VendorEarning"> | string
    orderId?: StringFilter<"VendorEarning"> | string
    affiliateId?: StringFilter<"VendorEarning"> | string
    commission?: FloatFilter<"VendorEarning"> | number
    createdAt?: DateTimeFilter<"VendorEarning"> | Date | string
  }

  export type CODVerificationUpsertWithWhereUniqueWithoutAdminInput = {
    where: CODVerificationWhereUniqueInput
    update: XOR<CODVerificationUpdateWithoutAdminInput, CODVerificationUncheckedUpdateWithoutAdminInput>
    create: XOR<CODVerificationCreateWithoutAdminInput, CODVerificationUncheckedCreateWithoutAdminInput>
  }

  export type CODVerificationUpdateWithWhereUniqueWithoutAdminInput = {
    where: CODVerificationWhereUniqueInput
    data: XOR<CODVerificationUpdateWithoutAdminInput, CODVerificationUncheckedUpdateWithoutAdminInput>
  }

  export type CODVerificationUpdateManyWithWhereWithoutAdminInput = {
    where: CODVerificationScalarWhereInput
    data: XOR<CODVerificationUpdateManyMutationInput, CODVerificationUncheckedUpdateManyWithoutAdminInput>
  }

  export type CODVerificationScalarWhereInput = {
    AND?: CODVerificationScalarWhereInput | CODVerificationScalarWhereInput[]
    OR?: CODVerificationScalarWhereInput[]
    NOT?: CODVerificationScalarWhereInput | CODVerificationScalarWhereInput[]
    id?: StringFilter<"CODVerification"> | string
    orderId?: StringFilter<"CODVerification"> | string
    verifiedBy?: StringFilter<"CODVerification"> | string
    verificationStatus?: EnumVerificationStatusFilter<"CODVerification"> | $Enums.VerificationStatus
    customerResponse?: StringFilter<"CODVerification"> | string
    remarks?: StringNullableFilter<"CODVerification"> | string | null
    verifiedAt?: DateTimeNullableFilter<"CODVerification"> | Date | string | null
    createdAt?: DateTimeFilter<"CODVerification"> | Date | string
  }

  export type StockMovementUpsertWithWhereUniqueWithoutUserInput = {
    where: StockMovementWhereUniqueInput
    update: XOR<StockMovementUpdateWithoutUserInput, StockMovementUncheckedUpdateWithoutUserInput>
    create: XOR<StockMovementCreateWithoutUserInput, StockMovementUncheckedCreateWithoutUserInput>
  }

  export type StockMovementUpdateWithWhereUniqueWithoutUserInput = {
    where: StockMovementWhereUniqueInput
    data: XOR<StockMovementUpdateWithoutUserInput, StockMovementUncheckedUpdateWithoutUserInput>
  }

  export type StockMovementUpdateManyWithWhereWithoutUserInput = {
    where: StockMovementScalarWhereInput
    data: XOR<StockMovementUpdateManyMutationInput, StockMovementUncheckedUpdateManyWithoutUserInput>
  }

  export type StockMovementScalarWhereInput = {
    AND?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
    OR?: StockMovementScalarWhereInput[]
    NOT?: StockMovementScalarWhereInput | StockMovementScalarWhereInput[]
    id?: StringFilter<"StockMovement"> | string
    productId?: StringFilter<"StockMovement"> | string
    type?: EnumStockMovementTypeFilter<"StockMovement"> | $Enums.StockMovementType
    quantity?: IntFilter<"StockMovement"> | number
    reason?: StringFilter<"StockMovement"> | string
    orderId?: StringNullableFilter<"StockMovement"> | string | null
    userId?: StringNullableFilter<"StockMovement"> | string | null
    notes?: StringNullableFilter<"StockMovement"> | string | null
    createdAt?: DateTimeFilter<"StockMovement"> | Date | string
  }

  export type StockMovementCreateWithoutProductInput = {
    id?: string
    type: $Enums.StockMovementType
    quantity: number
    reason: string
    notes?: string | null
    createdAt?: Date | string
    order?: OrderCreateNestedOneWithoutStockMovementsInput
    user?: UserCreateNestedOneWithoutStockMovementsInput
  }

  export type StockMovementUncheckedCreateWithoutProductInput = {
    id?: string
    type: $Enums.StockMovementType
    quantity: number
    reason: string
    orderId?: string | null
    userId?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type StockMovementCreateOrConnectWithoutProductInput = {
    where: StockMovementWhereUniqueInput
    create: XOR<StockMovementCreateWithoutProductInput, StockMovementUncheckedCreateWithoutProductInput>
  }

  export type StockMovementCreateManyProductInputEnvelope = {
    data: StockMovementCreateManyProductInput | StockMovementCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemCreateWithoutProductInput = {
    id?: string
    quantity: number
    price: number
    total: number
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateWithoutProductInput = {
    id?: string
    orderId: string
    quantity: number
    price: number
    total: number
  }

  export type OrderItemCreateOrConnectWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemCreateManyProductInputEnvelope = {
    data: OrderItemCreateManyProductInput | OrderItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type AffiliateLinkCreateWithoutProductInput = {
    id?: string
    code: string
    discountType: string
    discountValue: number
    commissionType: string
    commissionValue: number
    isActive?: boolean
    createdAt?: Date | string
    vendor: UserCreateNestedOneWithoutAffiliatesInput
    orders?: OrderCreateNestedManyWithoutAffiliateInput
    vendorEarnings?: VendorEarningCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateLinkUncheckedCreateWithoutProductInput = {
    id?: string
    code: string
    vendorId: string
    discountType: string
    discountValue: number
    commissionType: string
    commissionValue: number
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutAffiliateInput
    vendorEarnings?: VendorEarningUncheckedCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateLinkCreateOrConnectWithoutProductInput = {
    where: AffiliateLinkWhereUniqueInput
    create: XOR<AffiliateLinkCreateWithoutProductInput, AffiliateLinkUncheckedCreateWithoutProductInput>
  }

  export type AffiliateLinkCreateManyProductInputEnvelope = {
    data: AffiliateLinkCreateManyProductInput | AffiliateLinkCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type StockMovementUpsertWithWhereUniqueWithoutProductInput = {
    where: StockMovementWhereUniqueInput
    update: XOR<StockMovementUpdateWithoutProductInput, StockMovementUncheckedUpdateWithoutProductInput>
    create: XOR<StockMovementCreateWithoutProductInput, StockMovementUncheckedCreateWithoutProductInput>
  }

  export type StockMovementUpdateWithWhereUniqueWithoutProductInput = {
    where: StockMovementWhereUniqueInput
    data: XOR<StockMovementUpdateWithoutProductInput, StockMovementUncheckedUpdateWithoutProductInput>
  }

  export type StockMovementUpdateManyWithWhereWithoutProductInput = {
    where: StockMovementScalarWhereInput
    data: XOR<StockMovementUpdateManyMutationInput, StockMovementUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderItemUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutProductInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    price?: FloatFilter<"OrderItem"> | number
    total?: FloatFilter<"OrderItem"> | number
  }

  export type AffiliateLinkUpsertWithWhereUniqueWithoutProductInput = {
    where: AffiliateLinkWhereUniqueInput
    update: XOR<AffiliateLinkUpdateWithoutProductInput, AffiliateLinkUncheckedUpdateWithoutProductInput>
    create: XOR<AffiliateLinkCreateWithoutProductInput, AffiliateLinkUncheckedCreateWithoutProductInput>
  }

  export type AffiliateLinkUpdateWithWhereUniqueWithoutProductInput = {
    where: AffiliateLinkWhereUniqueInput
    data: XOR<AffiliateLinkUpdateWithoutProductInput, AffiliateLinkUncheckedUpdateWithoutProductInput>
  }

  export type AffiliateLinkUpdateManyWithWhereWithoutProductInput = {
    where: AffiliateLinkScalarWhereInput
    data: XOR<AffiliateLinkUpdateManyMutationInput, AffiliateLinkUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductCreateWithoutMovementsInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    price: number
    totalStock?: number
    status: string
    updatedAt?: Date | string
    createdAt?: Date | string
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    affiliates?: AffiliateLinkCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutMovementsInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    price: number
    totalStock?: number
    status: string
    updatedAt?: Date | string
    createdAt?: Date | string
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    affiliates?: AffiliateLinkUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutMovementsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutMovementsInput, ProductUncheckedCreateWithoutMovementsInput>
  }

  export type OrderCreateWithoutStockMovementsInput = {
    id?: string
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutOrdersInput
    affiliate?: AffiliateLinkCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    payment?: PaymentCreateNestedOneWithoutOrderInput
    verification?: CODVerificationCreateNestedOneWithoutOrderInput
    earnings?: VendorEarningCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutStockMovementsInput = {
    id?: string
    userId?: string | null
    affiliateId?: string | null
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    payment?: PaymentUncheckedCreateNestedOneWithoutOrderInput
    verification?: CODVerificationUncheckedCreateNestedOneWithoutOrderInput
    earnings?: VendorEarningUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutStockMovementsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutStockMovementsInput, OrderUncheckedCreateWithoutStockMovementsInput>
  }

  export type UserCreateWithoutStockMovementsInput = {
    id?: string
    email: string
    phone?: string | null
    address?: string | null
    roles?: UserCreaterolesInput | string[]
    updatedAt?: Date | string
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutUserInput
    affiliates?: AffiliateLinkCreateNestedManyWithoutVendorInput
    earnings?: VendorEarningCreateNestedManyWithoutVendorInput
    verifications?: CODVerificationCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutStockMovementsInput = {
    id?: string
    email: string
    phone?: string | null
    address?: string | null
    roles?: UserCreaterolesInput | string[]
    updatedAt?: Date | string
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    affiliates?: AffiliateLinkUncheckedCreateNestedManyWithoutVendorInput
    earnings?: VendorEarningUncheckedCreateNestedManyWithoutVendorInput
    verifications?: CODVerificationUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutStockMovementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStockMovementsInput, UserUncheckedCreateWithoutStockMovementsInput>
  }

  export type ProductUpsertWithoutMovementsInput = {
    update: XOR<ProductUpdateWithoutMovementsInput, ProductUncheckedUpdateWithoutMovementsInput>
    create: XOR<ProductCreateWithoutMovementsInput, ProductUncheckedCreateWithoutMovementsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutMovementsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutMovementsInput, ProductUncheckedUpdateWithoutMovementsInput>
  }

  export type ProductUpdateWithoutMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    affiliates?: AffiliateLinkUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    affiliates?: AffiliateLinkUncheckedUpdateManyWithoutProductNestedInput
  }

  export type OrderUpsertWithoutStockMovementsInput = {
    update: XOR<OrderUpdateWithoutStockMovementsInput, OrderUncheckedUpdateWithoutStockMovementsInput>
    create: XOR<OrderCreateWithoutStockMovementsInput, OrderUncheckedCreateWithoutStockMovementsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutStockMovementsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutStockMovementsInput, OrderUncheckedUpdateWithoutStockMovementsInput>
  }

  export type OrderUpdateWithoutStockMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutOrdersNestedInput
    affiliate?: AffiliateLinkUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    payment?: PaymentUpdateOneWithoutOrderNestedInput
    verification?: CODVerificationUpdateOneWithoutOrderNestedInput
    earnings?: VendorEarningUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutStockMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    affiliateId?: NullableStringFieldUpdateOperationsInput | string | null
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    payment?: PaymentUncheckedUpdateOneWithoutOrderNestedInput
    verification?: CODVerificationUncheckedUpdateOneWithoutOrderNestedInput
    earnings?: VendorEarningUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type UserUpsertWithoutStockMovementsInput = {
    update: XOR<UserUpdateWithoutStockMovementsInput, UserUncheckedUpdateWithoutStockMovementsInput>
    create: XOR<UserCreateWithoutStockMovementsInput, UserUncheckedCreateWithoutStockMovementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStockMovementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStockMovementsInput, UserUncheckedUpdateWithoutStockMovementsInput>
  }

  export type UserUpdateWithoutStockMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutUserNestedInput
    affiliates?: AffiliateLinkUpdateManyWithoutVendorNestedInput
    earnings?: VendorEarningUpdateManyWithoutVendorNestedInput
    verifications?: CODVerificationUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutStockMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    affiliates?: AffiliateLinkUncheckedUpdateManyWithoutVendorNestedInput
    earnings?: VendorEarningUncheckedUpdateManyWithoutVendorNestedInput
    verifications?: CODVerificationUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type UserCreateWithoutAffiliatesInput = {
    id?: string
    email: string
    phone?: string | null
    address?: string | null
    roles?: UserCreaterolesInput | string[]
    updatedAt?: Date | string
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutUserInput
    earnings?: VendorEarningCreateNestedManyWithoutVendorInput
    verifications?: CODVerificationCreateNestedManyWithoutAdminInput
    stockMovements?: StockMovementCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAffiliatesInput = {
    id?: string
    email: string
    phone?: string | null
    address?: string | null
    roles?: UserCreaterolesInput | string[]
    updatedAt?: Date | string
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    earnings?: VendorEarningUncheckedCreateNestedManyWithoutVendorInput
    verifications?: CODVerificationUncheckedCreateNestedManyWithoutAdminInput
    stockMovements?: StockMovementUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAffiliatesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAffiliatesInput, UserUncheckedCreateWithoutAffiliatesInput>
  }

  export type ProductCreateWithoutAffiliatesInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    price: number
    totalStock?: number
    status: string
    updatedAt?: Date | string
    createdAt?: Date | string
    movements?: StockMovementCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutAffiliatesInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    price: number
    totalStock?: number
    status: string
    updatedAt?: Date | string
    createdAt?: Date | string
    movements?: StockMovementUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutAffiliatesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutAffiliatesInput, ProductUncheckedCreateWithoutAffiliatesInput>
  }

  export type OrderCreateWithoutAffiliateInput = {
    id?: string
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    payment?: PaymentCreateNestedOneWithoutOrderInput
    verification?: CODVerificationCreateNestedOneWithoutOrderInput
    earnings?: VendorEarningCreateNestedManyWithoutOrderInput
    stockMovements?: StockMovementCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutAffiliateInput = {
    id?: string
    userId?: string | null
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    payment?: PaymentUncheckedCreateNestedOneWithoutOrderInput
    verification?: CODVerificationUncheckedCreateNestedOneWithoutOrderInput
    earnings?: VendorEarningUncheckedCreateNestedManyWithoutOrderInput
    stockMovements?: StockMovementUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutAffiliateInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutAffiliateInput, OrderUncheckedCreateWithoutAffiliateInput>
  }

  export type OrderCreateManyAffiliateInputEnvelope = {
    data: OrderCreateManyAffiliateInput | OrderCreateManyAffiliateInput[]
    skipDuplicates?: boolean
  }

  export type VendorEarningCreateWithoutAffiliateInput = {
    id?: string
    commission: number
    createdAt?: Date | string
    vendor: UserCreateNestedOneWithoutEarningsInput
    order: OrderCreateNestedOneWithoutEarningsInput
  }

  export type VendorEarningUncheckedCreateWithoutAffiliateInput = {
    id?: string
    vendorId: string
    orderId: string
    commission: number
    createdAt?: Date | string
  }

  export type VendorEarningCreateOrConnectWithoutAffiliateInput = {
    where: VendorEarningWhereUniqueInput
    create: XOR<VendorEarningCreateWithoutAffiliateInput, VendorEarningUncheckedCreateWithoutAffiliateInput>
  }

  export type VendorEarningCreateManyAffiliateInputEnvelope = {
    data: VendorEarningCreateManyAffiliateInput | VendorEarningCreateManyAffiliateInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAffiliatesInput = {
    update: XOR<UserUpdateWithoutAffiliatesInput, UserUncheckedUpdateWithoutAffiliatesInput>
    create: XOR<UserCreateWithoutAffiliatesInput, UserUncheckedCreateWithoutAffiliatesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAffiliatesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAffiliatesInput, UserUncheckedUpdateWithoutAffiliatesInput>
  }

  export type UserUpdateWithoutAffiliatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutUserNestedInput
    earnings?: VendorEarningUpdateManyWithoutVendorNestedInput
    verifications?: CODVerificationUpdateManyWithoutAdminNestedInput
    stockMovements?: StockMovementUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAffiliatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    earnings?: VendorEarningUncheckedUpdateManyWithoutVendorNestedInput
    verifications?: CODVerificationUncheckedUpdateManyWithoutAdminNestedInput
    stockMovements?: StockMovementUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProductUpsertWithoutAffiliatesInput = {
    update: XOR<ProductUpdateWithoutAffiliatesInput, ProductUncheckedUpdateWithoutAffiliatesInput>
    create: XOR<ProductCreateWithoutAffiliatesInput, ProductUncheckedCreateWithoutAffiliatesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutAffiliatesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutAffiliatesInput, ProductUncheckedUpdateWithoutAffiliatesInput>
  }

  export type ProductUpdateWithoutAffiliatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: StockMovementUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutAffiliatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: StockMovementUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutAffiliateInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutAffiliateInput, OrderUncheckedUpdateWithoutAffiliateInput>
    create: XOR<OrderCreateWithoutAffiliateInput, OrderUncheckedCreateWithoutAffiliateInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutAffiliateInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutAffiliateInput, OrderUncheckedUpdateWithoutAffiliateInput>
  }

  export type OrderUpdateManyWithWhereWithoutAffiliateInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutAffiliateInput>
  }

  export type VendorEarningUpsertWithWhereUniqueWithoutAffiliateInput = {
    where: VendorEarningWhereUniqueInput
    update: XOR<VendorEarningUpdateWithoutAffiliateInput, VendorEarningUncheckedUpdateWithoutAffiliateInput>
    create: XOR<VendorEarningCreateWithoutAffiliateInput, VendorEarningUncheckedCreateWithoutAffiliateInput>
  }

  export type VendorEarningUpdateWithWhereUniqueWithoutAffiliateInput = {
    where: VendorEarningWhereUniqueInput
    data: XOR<VendorEarningUpdateWithoutAffiliateInput, VendorEarningUncheckedUpdateWithoutAffiliateInput>
  }

  export type VendorEarningUpdateManyWithWhereWithoutAffiliateInput = {
    where: VendorEarningScalarWhereInput
    data: XOR<VendorEarningUpdateManyMutationInput, VendorEarningUncheckedUpdateManyWithoutAffiliateInput>
  }

  export type UserCreateWithoutOrdersInput = {
    id?: string
    email: string
    phone?: string | null
    address?: string | null
    roles?: UserCreaterolesInput | string[]
    updatedAt?: Date | string
    createdAt?: Date | string
    affiliates?: AffiliateLinkCreateNestedManyWithoutVendorInput
    earnings?: VendorEarningCreateNestedManyWithoutVendorInput
    verifications?: CODVerificationCreateNestedManyWithoutAdminInput
    stockMovements?: StockMovementCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrdersInput = {
    id?: string
    email: string
    phone?: string | null
    address?: string | null
    roles?: UserCreaterolesInput | string[]
    updatedAt?: Date | string
    createdAt?: Date | string
    affiliates?: AffiliateLinkUncheckedCreateNestedManyWithoutVendorInput
    earnings?: VendorEarningUncheckedCreateNestedManyWithoutVendorInput
    verifications?: CODVerificationUncheckedCreateNestedManyWithoutAdminInput
    stockMovements?: StockMovementUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
  }

  export type AffiliateLinkCreateWithoutOrdersInput = {
    id?: string
    code: string
    discountType: string
    discountValue: number
    commissionType: string
    commissionValue: number
    isActive?: boolean
    createdAt?: Date | string
    vendor: UserCreateNestedOneWithoutAffiliatesInput
    product?: ProductCreateNestedOneWithoutAffiliatesInput
    vendorEarnings?: VendorEarningCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateLinkUncheckedCreateWithoutOrdersInput = {
    id?: string
    code: string
    vendorId: string
    productId?: string | null
    discountType: string
    discountValue: number
    commissionType: string
    commissionValue: number
    isActive?: boolean
    createdAt?: Date | string
    vendorEarnings?: VendorEarningUncheckedCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateLinkCreateOrConnectWithoutOrdersInput = {
    where: AffiliateLinkWhereUniqueInput
    create: XOR<AffiliateLinkCreateWithoutOrdersInput, AffiliateLinkUncheckedCreateWithoutOrdersInput>
  }

  export type OrderItemCreateWithoutOrderInput = {
    id?: string
    quantity: number
    price: number
    total: number
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: string
    productId: string
    quantity: number
    price: number
    total: number
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutOrderInput = {
    id?: string
    provider: string
    amount: number
    transactionId?: string | null
    status: $Enums.PaymentStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentUncheckedCreateWithoutOrderInput = {
    id?: string
    provider: string
    amount: number
    transactionId?: string | null
    status: $Enums.PaymentStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutOrderInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
  }

  export type CODVerificationCreateWithoutOrderInput = {
    id?: string
    verificationStatus: $Enums.VerificationStatus
    customerResponse: string
    remarks?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    admin: UserCreateNestedOneWithoutVerificationsInput
  }

  export type CODVerificationUncheckedCreateWithoutOrderInput = {
    id?: string
    verifiedBy: string
    verificationStatus: $Enums.VerificationStatus
    customerResponse: string
    remarks?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CODVerificationCreateOrConnectWithoutOrderInput = {
    where: CODVerificationWhereUniqueInput
    create: XOR<CODVerificationCreateWithoutOrderInput, CODVerificationUncheckedCreateWithoutOrderInput>
  }

  export type VendorEarningCreateWithoutOrderInput = {
    id?: string
    commission: number
    createdAt?: Date | string
    vendor: UserCreateNestedOneWithoutEarningsInput
    affiliate: AffiliateLinkCreateNestedOneWithoutVendorEarningsInput
  }

  export type VendorEarningUncheckedCreateWithoutOrderInput = {
    id?: string
    vendorId: string
    affiliateId: string
    commission: number
    createdAt?: Date | string
  }

  export type VendorEarningCreateOrConnectWithoutOrderInput = {
    where: VendorEarningWhereUniqueInput
    create: XOR<VendorEarningCreateWithoutOrderInput, VendorEarningUncheckedCreateWithoutOrderInput>
  }

  export type VendorEarningCreateManyOrderInputEnvelope = {
    data: VendorEarningCreateManyOrderInput | VendorEarningCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type StockMovementCreateWithoutOrderInput = {
    id?: string
    type: $Enums.StockMovementType
    quantity: number
    reason: string
    notes?: string | null
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutMovementsInput
    user?: UserCreateNestedOneWithoutStockMovementsInput
  }

  export type StockMovementUncheckedCreateWithoutOrderInput = {
    id?: string
    productId: string
    type: $Enums.StockMovementType
    quantity: number
    reason: string
    userId?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type StockMovementCreateOrConnectWithoutOrderInput = {
    where: StockMovementWhereUniqueInput
    create: XOR<StockMovementCreateWithoutOrderInput, StockMovementUncheckedCreateWithoutOrderInput>
  }

  export type StockMovementCreateManyOrderInputEnvelope = {
    data: StockMovementCreateManyOrderInput | StockMovementCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliates?: AffiliateLinkUpdateManyWithoutVendorNestedInput
    earnings?: VendorEarningUpdateManyWithoutVendorNestedInput
    verifications?: CODVerificationUpdateManyWithoutAdminNestedInput
    stockMovements?: StockMovementUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliates?: AffiliateLinkUncheckedUpdateManyWithoutVendorNestedInput
    earnings?: VendorEarningUncheckedUpdateManyWithoutVendorNestedInput
    verifications?: CODVerificationUncheckedUpdateManyWithoutAdminNestedInput
    stockMovements?: StockMovementUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AffiliateLinkUpsertWithoutOrdersInput = {
    update: XOR<AffiliateLinkUpdateWithoutOrdersInput, AffiliateLinkUncheckedUpdateWithoutOrdersInput>
    create: XOR<AffiliateLinkCreateWithoutOrdersInput, AffiliateLinkUncheckedCreateWithoutOrdersInput>
    where?: AffiliateLinkWhereInput
  }

  export type AffiliateLinkUpdateToOneWithWhereWithoutOrdersInput = {
    where?: AffiliateLinkWhereInput
    data: XOR<AffiliateLinkUpdateWithoutOrdersInput, AffiliateLinkUncheckedUpdateWithoutOrdersInput>
  }

  export type AffiliateLinkUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    commissionType?: StringFieldUpdateOperationsInput | string
    commissionValue?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: UserUpdateOneRequiredWithoutAffiliatesNestedInput
    product?: ProductUpdateOneWithoutAffiliatesNestedInput
    vendorEarnings?: VendorEarningUpdateManyWithoutAffiliateNestedInput
  }

  export type AffiliateLinkUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    commissionType?: StringFieldUpdateOperationsInput | string
    commissionValue?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendorEarnings?: VendorEarningUncheckedUpdateManyWithoutAffiliateNestedInput
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type PaymentUpsertWithoutOrderInput = {
    update: XOR<PaymentUpdateWithoutOrderInput, PaymentUncheckedUpdateWithoutOrderInput>
    create: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
    where?: PaymentWhereInput
  }

  export type PaymentUpdateToOneWithWhereWithoutOrderInput = {
    where?: PaymentWhereInput
    data: XOR<PaymentUpdateWithoutOrderInput, PaymentUncheckedUpdateWithoutOrderInput>
  }

  export type PaymentUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CODVerificationUpsertWithoutOrderInput = {
    update: XOR<CODVerificationUpdateWithoutOrderInput, CODVerificationUncheckedUpdateWithoutOrderInput>
    create: XOR<CODVerificationCreateWithoutOrderInput, CODVerificationUncheckedCreateWithoutOrderInput>
    where?: CODVerificationWhereInput
  }

  export type CODVerificationUpdateToOneWithWhereWithoutOrderInput = {
    where?: CODVerificationWhereInput
    data: XOR<CODVerificationUpdateWithoutOrderInput, CODVerificationUncheckedUpdateWithoutOrderInput>
  }

  export type CODVerificationUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    customerResponse?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutVerificationsNestedInput
  }

  export type CODVerificationUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    verifiedBy?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    customerResponse?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorEarningUpsertWithWhereUniqueWithoutOrderInput = {
    where: VendorEarningWhereUniqueInput
    update: XOR<VendorEarningUpdateWithoutOrderInput, VendorEarningUncheckedUpdateWithoutOrderInput>
    create: XOR<VendorEarningCreateWithoutOrderInput, VendorEarningUncheckedCreateWithoutOrderInput>
  }

  export type VendorEarningUpdateWithWhereUniqueWithoutOrderInput = {
    where: VendorEarningWhereUniqueInput
    data: XOR<VendorEarningUpdateWithoutOrderInput, VendorEarningUncheckedUpdateWithoutOrderInput>
  }

  export type VendorEarningUpdateManyWithWhereWithoutOrderInput = {
    where: VendorEarningScalarWhereInput
    data: XOR<VendorEarningUpdateManyMutationInput, VendorEarningUncheckedUpdateManyWithoutOrderInput>
  }

  export type StockMovementUpsertWithWhereUniqueWithoutOrderInput = {
    where: StockMovementWhereUniqueInput
    update: XOR<StockMovementUpdateWithoutOrderInput, StockMovementUncheckedUpdateWithoutOrderInput>
    create: XOR<StockMovementCreateWithoutOrderInput, StockMovementUncheckedCreateWithoutOrderInput>
  }

  export type StockMovementUpdateWithWhereUniqueWithoutOrderInput = {
    where: StockMovementWhereUniqueInput
    data: XOR<StockMovementUpdateWithoutOrderInput, StockMovementUncheckedUpdateWithoutOrderInput>
  }

  export type StockMovementUpdateManyWithWhereWithoutOrderInput = {
    where: StockMovementScalarWhereInput
    data: XOR<StockMovementUpdateManyMutationInput, StockMovementUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderCreateWithoutItemsInput = {
    id?: string
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutOrdersInput
    affiliate?: AffiliateLinkCreateNestedOneWithoutOrdersInput
    payment?: PaymentCreateNestedOneWithoutOrderInput
    verification?: CODVerificationCreateNestedOneWithoutOrderInput
    earnings?: VendorEarningCreateNestedManyWithoutOrderInput
    stockMovements?: StockMovementCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: string
    userId?: string | null
    affiliateId?: string | null
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutOrderInput
    verification?: CODVerificationUncheckedCreateNestedOneWithoutOrderInput
    earnings?: VendorEarningUncheckedCreateNestedManyWithoutOrderInput
    stockMovements?: StockMovementUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutOrderItemsInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    price: number
    totalStock?: number
    status: string
    updatedAt?: Date | string
    createdAt?: Date | string
    movements?: StockMovementCreateNestedManyWithoutProductInput
    affiliates?: AffiliateLinkCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutOrderItemsInput = {
    id?: string
    slug: string
    title: string
    description?: string | null
    price: number
    totalStock?: number
    status: string
    updatedAt?: Date | string
    createdAt?: Date | string
    movements?: StockMovementUncheckedCreateNestedManyWithoutProductInput
    affiliates?: AffiliateLinkUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutOrderItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutOrdersNestedInput
    affiliate?: AffiliateLinkUpdateOneWithoutOrdersNestedInput
    payment?: PaymentUpdateOneWithoutOrderNestedInput
    verification?: CODVerificationUpdateOneWithoutOrderNestedInput
    earnings?: VendorEarningUpdateManyWithoutOrderNestedInput
    stockMovements?: StockMovementUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    affiliateId?: NullableStringFieldUpdateOperationsInput | string | null
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutOrderNestedInput
    verification?: CODVerificationUncheckedUpdateOneWithoutOrderNestedInput
    earnings?: VendorEarningUncheckedUpdateManyWithoutOrderNestedInput
    stockMovements?: StockMovementUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type ProductUpsertWithoutOrderItemsInput = {
    update: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type ProductUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: StockMovementUpdateManyWithoutProductNestedInput
    affiliates?: AffiliateLinkUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    totalStock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: StockMovementUncheckedUpdateManyWithoutProductNestedInput
    affiliates?: AffiliateLinkUncheckedUpdateManyWithoutProductNestedInput
  }

  export type OrderCreateWithoutPaymentInput = {
    id?: string
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutOrdersInput
    affiliate?: AffiliateLinkCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    verification?: CODVerificationCreateNestedOneWithoutOrderInput
    earnings?: VendorEarningCreateNestedManyWithoutOrderInput
    stockMovements?: StockMovementCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutPaymentInput = {
    id?: string
    userId?: string | null
    affiliateId?: string | null
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    verification?: CODVerificationUncheckedCreateNestedOneWithoutOrderInput
    earnings?: VendorEarningUncheckedCreateNestedManyWithoutOrderInput
    stockMovements?: StockMovementUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutPaymentInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutPaymentInput, OrderUncheckedCreateWithoutPaymentInput>
  }

  export type OrderUpsertWithoutPaymentInput = {
    update: XOR<OrderUpdateWithoutPaymentInput, OrderUncheckedUpdateWithoutPaymentInput>
    create: XOR<OrderCreateWithoutPaymentInput, OrderUncheckedCreateWithoutPaymentInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutPaymentInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutPaymentInput, OrderUncheckedUpdateWithoutPaymentInput>
  }

  export type OrderUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutOrdersNestedInput
    affiliate?: AffiliateLinkUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    verification?: CODVerificationUpdateOneWithoutOrderNestedInput
    earnings?: VendorEarningUpdateManyWithoutOrderNestedInput
    stockMovements?: StockMovementUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    affiliateId?: NullableStringFieldUpdateOperationsInput | string | null
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    verification?: CODVerificationUncheckedUpdateOneWithoutOrderNestedInput
    earnings?: VendorEarningUncheckedUpdateManyWithoutOrderNestedInput
    stockMovements?: StockMovementUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateWithoutVerificationInput = {
    id?: string
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutOrdersInput
    affiliate?: AffiliateLinkCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    payment?: PaymentCreateNestedOneWithoutOrderInput
    earnings?: VendorEarningCreateNestedManyWithoutOrderInput
    stockMovements?: StockMovementCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutVerificationInput = {
    id?: string
    userId?: string | null
    affiliateId?: string | null
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    payment?: PaymentUncheckedCreateNestedOneWithoutOrderInput
    earnings?: VendorEarningUncheckedCreateNestedManyWithoutOrderInput
    stockMovements?: StockMovementUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutVerificationInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutVerificationInput, OrderUncheckedCreateWithoutVerificationInput>
  }

  export type UserCreateWithoutVerificationsInput = {
    id?: string
    email: string
    phone?: string | null
    address?: string | null
    roles?: UserCreaterolesInput | string[]
    updatedAt?: Date | string
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutUserInput
    affiliates?: AffiliateLinkCreateNestedManyWithoutVendorInput
    earnings?: VendorEarningCreateNestedManyWithoutVendorInput
    stockMovements?: StockMovementCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVerificationsInput = {
    id?: string
    email: string
    phone?: string | null
    address?: string | null
    roles?: UserCreaterolesInput | string[]
    updatedAt?: Date | string
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    affiliates?: AffiliateLinkUncheckedCreateNestedManyWithoutVendorInput
    earnings?: VendorEarningUncheckedCreateNestedManyWithoutVendorInput
    stockMovements?: StockMovementUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVerificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVerificationsInput, UserUncheckedCreateWithoutVerificationsInput>
  }

  export type OrderUpsertWithoutVerificationInput = {
    update: XOR<OrderUpdateWithoutVerificationInput, OrderUncheckedUpdateWithoutVerificationInput>
    create: XOR<OrderCreateWithoutVerificationInput, OrderUncheckedCreateWithoutVerificationInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutVerificationInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutVerificationInput, OrderUncheckedUpdateWithoutVerificationInput>
  }

  export type OrderUpdateWithoutVerificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutOrdersNestedInput
    affiliate?: AffiliateLinkUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    payment?: PaymentUpdateOneWithoutOrderNestedInput
    earnings?: VendorEarningUpdateManyWithoutOrderNestedInput
    stockMovements?: StockMovementUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutVerificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    affiliateId?: NullableStringFieldUpdateOperationsInput | string | null
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    payment?: PaymentUncheckedUpdateOneWithoutOrderNestedInput
    earnings?: VendorEarningUncheckedUpdateManyWithoutOrderNestedInput
    stockMovements?: StockMovementUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type UserUpsertWithoutVerificationsInput = {
    update: XOR<UserUpdateWithoutVerificationsInput, UserUncheckedUpdateWithoutVerificationsInput>
    create: XOR<UserCreateWithoutVerificationsInput, UserUncheckedCreateWithoutVerificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVerificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVerificationsInput, UserUncheckedUpdateWithoutVerificationsInput>
  }

  export type UserUpdateWithoutVerificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutUserNestedInput
    affiliates?: AffiliateLinkUpdateManyWithoutVendorNestedInput
    earnings?: VendorEarningUpdateManyWithoutVendorNestedInput
    stockMovements?: StockMovementUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVerificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    affiliates?: AffiliateLinkUncheckedUpdateManyWithoutVendorNestedInput
    earnings?: VendorEarningUncheckedUpdateManyWithoutVendorNestedInput
    stockMovements?: StockMovementUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutEarningsInput = {
    id?: string
    email: string
    phone?: string | null
    address?: string | null
    roles?: UserCreaterolesInput | string[]
    updatedAt?: Date | string
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutUserInput
    affiliates?: AffiliateLinkCreateNestedManyWithoutVendorInput
    verifications?: CODVerificationCreateNestedManyWithoutAdminInput
    stockMovements?: StockMovementCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEarningsInput = {
    id?: string
    email: string
    phone?: string | null
    address?: string | null
    roles?: UserCreaterolesInput | string[]
    updatedAt?: Date | string
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    affiliates?: AffiliateLinkUncheckedCreateNestedManyWithoutVendorInput
    verifications?: CODVerificationUncheckedCreateNestedManyWithoutAdminInput
    stockMovements?: StockMovementUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEarningsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEarningsInput, UserUncheckedCreateWithoutEarningsInput>
  }

  export type OrderCreateWithoutEarningsInput = {
    id?: string
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutOrdersInput
    affiliate?: AffiliateLinkCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    payment?: PaymentCreateNestedOneWithoutOrderInput
    verification?: CODVerificationCreateNestedOneWithoutOrderInput
    stockMovements?: StockMovementCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutEarningsInput = {
    id?: string
    userId?: string | null
    affiliateId?: string | null
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    payment?: PaymentUncheckedCreateNestedOneWithoutOrderInput
    verification?: CODVerificationUncheckedCreateNestedOneWithoutOrderInput
    stockMovements?: StockMovementUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutEarningsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutEarningsInput, OrderUncheckedCreateWithoutEarningsInput>
  }

  export type AffiliateLinkCreateWithoutVendorEarningsInput = {
    id?: string
    code: string
    discountType: string
    discountValue: number
    commissionType: string
    commissionValue: number
    isActive?: boolean
    createdAt?: Date | string
    vendor: UserCreateNestedOneWithoutAffiliatesInput
    product?: ProductCreateNestedOneWithoutAffiliatesInput
    orders?: OrderCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateLinkUncheckedCreateWithoutVendorEarningsInput = {
    id?: string
    code: string
    vendorId: string
    productId?: string | null
    discountType: string
    discountValue: number
    commissionType: string
    commissionValue: number
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateLinkCreateOrConnectWithoutVendorEarningsInput = {
    where: AffiliateLinkWhereUniqueInput
    create: XOR<AffiliateLinkCreateWithoutVendorEarningsInput, AffiliateLinkUncheckedCreateWithoutVendorEarningsInput>
  }

  export type UserUpsertWithoutEarningsInput = {
    update: XOR<UserUpdateWithoutEarningsInput, UserUncheckedUpdateWithoutEarningsInput>
    create: XOR<UserCreateWithoutEarningsInput, UserUncheckedCreateWithoutEarningsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEarningsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEarningsInput, UserUncheckedUpdateWithoutEarningsInput>
  }

  export type UserUpdateWithoutEarningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutUserNestedInput
    affiliates?: AffiliateLinkUpdateManyWithoutVendorNestedInput
    verifications?: CODVerificationUpdateManyWithoutAdminNestedInput
    stockMovements?: StockMovementUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEarningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | string[]
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    affiliates?: AffiliateLinkUncheckedUpdateManyWithoutVendorNestedInput
    verifications?: CODVerificationUncheckedUpdateManyWithoutAdminNestedInput
    stockMovements?: StockMovementUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrderUpsertWithoutEarningsInput = {
    update: XOR<OrderUpdateWithoutEarningsInput, OrderUncheckedUpdateWithoutEarningsInput>
    create: XOR<OrderCreateWithoutEarningsInput, OrderUncheckedCreateWithoutEarningsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutEarningsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutEarningsInput, OrderUncheckedUpdateWithoutEarningsInput>
  }

  export type OrderUpdateWithoutEarningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutOrdersNestedInput
    affiliate?: AffiliateLinkUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    payment?: PaymentUpdateOneWithoutOrderNestedInput
    verification?: CODVerificationUpdateOneWithoutOrderNestedInput
    stockMovements?: StockMovementUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutEarningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    affiliateId?: NullableStringFieldUpdateOperationsInput | string | null
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    payment?: PaymentUncheckedUpdateOneWithoutOrderNestedInput
    verification?: CODVerificationUncheckedUpdateOneWithoutOrderNestedInput
    stockMovements?: StockMovementUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type AffiliateLinkUpsertWithoutVendorEarningsInput = {
    update: XOR<AffiliateLinkUpdateWithoutVendorEarningsInput, AffiliateLinkUncheckedUpdateWithoutVendorEarningsInput>
    create: XOR<AffiliateLinkCreateWithoutVendorEarningsInput, AffiliateLinkUncheckedCreateWithoutVendorEarningsInput>
    where?: AffiliateLinkWhereInput
  }

  export type AffiliateLinkUpdateToOneWithWhereWithoutVendorEarningsInput = {
    where?: AffiliateLinkWhereInput
    data: XOR<AffiliateLinkUpdateWithoutVendorEarningsInput, AffiliateLinkUncheckedUpdateWithoutVendorEarningsInput>
  }

  export type AffiliateLinkUpdateWithoutVendorEarningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    commissionType?: StringFieldUpdateOperationsInput | string
    commissionValue?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: UserUpdateOneRequiredWithoutAffiliatesNestedInput
    product?: ProductUpdateOneWithoutAffiliatesNestedInput
    orders?: OrderUpdateManyWithoutAffiliateNestedInput
  }

  export type AffiliateLinkUncheckedUpdateWithoutVendorEarningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    commissionType?: StringFieldUpdateOperationsInput | string
    commissionValue?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutAffiliateNestedInput
  }

  export type OrderCreateManyUserInput = {
    id?: string
    affiliateId?: string | null
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
  }

  export type AffiliateLinkCreateManyVendorInput = {
    id?: string
    code: string
    productId?: string | null
    discountType: string
    discountValue: number
    commissionType: string
    commissionValue: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type VendorEarningCreateManyVendorInput = {
    id?: string
    orderId: string
    affiliateId: string
    commission: number
    createdAt?: Date | string
  }

  export type CODVerificationCreateManyAdminInput = {
    id?: string
    orderId: string
    verificationStatus: $Enums.VerificationStatus
    customerResponse: string
    remarks?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type StockMovementCreateManyUserInput = {
    id?: string
    productId: string
    type: $Enums.StockMovementType
    quantity: number
    reason: string
    orderId?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type OrderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliate?: AffiliateLinkUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    payment?: PaymentUpdateOneWithoutOrderNestedInput
    verification?: CODVerificationUpdateOneWithoutOrderNestedInput
    earnings?: VendorEarningUpdateManyWithoutOrderNestedInput
    stockMovements?: StockMovementUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    affiliateId?: NullableStringFieldUpdateOperationsInput | string | null
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    payment?: PaymentUncheckedUpdateOneWithoutOrderNestedInput
    verification?: CODVerificationUncheckedUpdateOneWithoutOrderNestedInput
    earnings?: VendorEarningUncheckedUpdateManyWithoutOrderNestedInput
    stockMovements?: StockMovementUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    affiliateId?: NullableStringFieldUpdateOperationsInput | string | null
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateLinkUpdateWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    commissionType?: StringFieldUpdateOperationsInput | string
    commissionValue?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneWithoutAffiliatesNestedInput
    orders?: OrderUpdateManyWithoutAffiliateNestedInput
    vendorEarnings?: VendorEarningUpdateManyWithoutAffiliateNestedInput
  }

  export type AffiliateLinkUncheckedUpdateWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    commissionType?: StringFieldUpdateOperationsInput | string
    commissionValue?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutAffiliateNestedInput
    vendorEarnings?: VendorEarningUncheckedUpdateManyWithoutAffiliateNestedInput
  }

  export type AffiliateLinkUncheckedUpdateManyWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    commissionType?: StringFieldUpdateOperationsInput | string
    commissionValue?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorEarningUpdateWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string
    commission?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutEarningsNestedInput
    affiliate?: AffiliateLinkUpdateOneRequiredWithoutVendorEarningsNestedInput
  }

  export type VendorEarningUncheckedUpdateWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    affiliateId?: StringFieldUpdateOperationsInput | string
    commission?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorEarningUncheckedUpdateManyWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    affiliateId?: StringFieldUpdateOperationsInput | string
    commission?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CODVerificationUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    customerResponse?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutVerificationNestedInput
  }

  export type CODVerificationUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    customerResponse?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CODVerificationUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    customerResponse?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutMovementsNestedInput
    order?: OrderUpdateOneWithoutStockMovementsNestedInput
  }

  export type StockMovementUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementCreateManyProductInput = {
    id?: string
    type: $Enums.StockMovementType
    quantity: number
    reason: string
    orderId?: string | null
    userId?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type OrderItemCreateManyProductInput = {
    id?: string
    orderId: string
    quantity: number
    price: number
    total: number
  }

  export type AffiliateLinkCreateManyProductInput = {
    id?: string
    code: string
    vendorId: string
    discountType: string
    discountValue: number
    commissionType: string
    commissionValue: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type StockMovementUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneWithoutStockMovementsNestedInput
    user?: UserUpdateOneWithoutStockMovementsNestedInput
  }

  export type StockMovementUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
  }

  export type AffiliateLinkUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    commissionType?: StringFieldUpdateOperationsInput | string
    commissionValue?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: UserUpdateOneRequiredWithoutAffiliatesNestedInput
    orders?: OrderUpdateManyWithoutAffiliateNestedInput
    vendorEarnings?: VendorEarningUpdateManyWithoutAffiliateNestedInput
  }

  export type AffiliateLinkUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    commissionType?: StringFieldUpdateOperationsInput | string
    commissionValue?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutAffiliateNestedInput
    vendorEarnings?: VendorEarningUncheckedUpdateManyWithoutAffiliateNestedInput
  }

  export type AffiliateLinkUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    discountType?: StringFieldUpdateOperationsInput | string
    discountValue?: FloatFieldUpdateOperationsInput | number
    commissionType?: StringFieldUpdateOperationsInput | string
    commissionValue?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyAffiliateInput = {
    id?: string
    userId?: string | null
    totalAmount: number
    discountAmount: number
    finalAmount: number
    paymentMethod: string
    status: $Enums.OrderStatus
    createdAt?: Date | string
  }

  export type VendorEarningCreateManyAffiliateInput = {
    id?: string
    vendorId: string
    orderId: string
    commission: number
    createdAt?: Date | string
  }

  export type OrderUpdateWithoutAffiliateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    payment?: PaymentUpdateOneWithoutOrderNestedInput
    verification?: CODVerificationUpdateOneWithoutOrderNestedInput
    earnings?: VendorEarningUpdateManyWithoutOrderNestedInput
    stockMovements?: StockMovementUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutAffiliateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    payment?: PaymentUncheckedUpdateOneWithoutOrderNestedInput
    verification?: CODVerificationUncheckedUpdateOneWithoutOrderNestedInput
    earnings?: VendorEarningUncheckedUpdateManyWithoutOrderNestedInput
    stockMovements?: StockMovementUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutAffiliateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorEarningUpdateWithoutAffiliateInput = {
    id?: StringFieldUpdateOperationsInput | string
    commission?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: UserUpdateOneRequiredWithoutEarningsNestedInput
    order?: OrderUpdateOneRequiredWithoutEarningsNestedInput
  }

  export type VendorEarningUncheckedUpdateWithoutAffiliateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    commission?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorEarningUncheckedUpdateManyWithoutAffiliateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    commission?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyOrderInput = {
    id?: string
    productId: string
    quantity: number
    price: number
    total: number
  }

  export type VendorEarningCreateManyOrderInput = {
    id?: string
    vendorId: string
    affiliateId: string
    commission: number
    createdAt?: Date | string
  }

  export type StockMovementCreateManyOrderInput = {
    id?: string
    productId: string
    type: $Enums.StockMovementType
    quantity: number
    reason: string
    userId?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type OrderItemUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
  }

  export type VendorEarningUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    commission?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: UserUpdateOneRequiredWithoutEarningsNestedInput
    affiliate?: AffiliateLinkUpdateOneRequiredWithoutVendorEarningsNestedInput
  }

  export type VendorEarningUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    affiliateId?: StringFieldUpdateOperationsInput | string
    commission?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorEarningUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    affiliateId?: StringFieldUpdateOperationsInput | string
    commission?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutMovementsNestedInput
    user?: UserUpdateOneWithoutStockMovementsNestedInput
  }

  export type StockMovementUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    type?: EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType
    quantity?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}