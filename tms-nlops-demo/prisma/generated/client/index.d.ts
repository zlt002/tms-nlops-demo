
/**
 * Client
**/

import * as runtime from './runtime/library.js';
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
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model Vehicle
 * 
 */
export type Vehicle = $Result.DefaultSelection<Prisma.$VehiclePayload>
/**
 * Model Schedule
 * 
 */
export type Schedule = $Result.DefaultSelection<Prisma.$SchedulePayload>
/**
 * Model Tracking
 * 
 */
export type Tracking = $Result.DefaultSelection<Prisma.$TrackingPayload>
/**
 * Model Receipt
 * 
 */
export type Receipt = $Result.DefaultSelection<Prisma.$ReceiptPayload>
/**
 * Model NLCommand
 * 
 */
export type NLCommand = $Result.DefaultSelection<Prisma.$NLCommandPayload>
/**
 * Model Intent
 * 
 */
export type Intent = $Result.DefaultSelection<Prisma.$IntentPayload>
/**
 * Model SystemConfig
 * 
 */
export type SystemConfig = $Result.DefaultSelection<Prisma.$SystemConfigPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  DRIVER: 'DRIVER',
  CUSTOMER: 'CUSTOMER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const OrderStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const VehicleType: {
  TRUCK: 'TRUCK',
  VAN: 'VAN',
  TRAILER: 'TRAILER'
};

export type VehicleType = (typeof VehicleType)[keyof typeof VehicleType]


export const VehicleStatus: {
  AVAILABLE: 'AVAILABLE',
  IN_TRANSIT: 'IN_TRANSIT',
  MAINTENANCE: 'MAINTENANCE',
  UNAVAILABLE: 'UNAVAILABLE'
};

export type VehicleStatus = (typeof VehicleStatus)[keyof typeof VehicleStatus]


export const ScheduleStatus: {
  PLANNED: 'PLANNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  DELAYED: 'DELAYED'
};

export type ScheduleStatus = (typeof ScheduleStatus)[keyof typeof ScheduleStatus]


export const TrackingStatus: {
  PICKUP: 'PICKUP',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERY: 'DELIVERY',
  COMPLETED: 'COMPLETED'
};

export type TrackingStatus = (typeof TrackingStatus)[keyof typeof TrackingStatus]


export const ReceiptStatus: {
  PENDING: 'PENDING',
  UPLOADED: 'UPLOADED',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED'
};

export type ReceiptStatus = (typeof ReceiptStatus)[keyof typeof ReceiptStatus]


export const CommandStatus: {
  PENDING: 'PENDING',
  EXECUTING: 'EXECUTING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type CommandStatus = (typeof CommandStatus)[keyof typeof CommandStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type VehicleType = $Enums.VehicleType

export const VehicleType: typeof $Enums.VehicleType

export type VehicleStatus = $Enums.VehicleStatus

export const VehicleStatus: typeof $Enums.VehicleStatus

export type ScheduleStatus = $Enums.ScheduleStatus

export const ScheduleStatus: typeof $Enums.ScheduleStatus

export type TrackingStatus = $Enums.TrackingStatus

export const TrackingStatus: typeof $Enums.TrackingStatus

export type ReceiptStatus = $Enums.ReceiptStatus

export const ReceiptStatus: typeof $Enums.ReceiptStatus

export type CommandStatus = $Enums.CommandStatus

export const CommandStatus: typeof $Enums.CommandStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
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
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vehicles
    * const vehicles = await prisma.vehicle.findMany()
    * ```
    */
  get vehicle(): Prisma.VehicleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.schedule`: Exposes CRUD operations for the **Schedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schedules
    * const schedules = await prisma.schedule.findMany()
    * ```
    */
  get schedule(): Prisma.ScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tracking`: Exposes CRUD operations for the **Tracking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trackings
    * const trackings = await prisma.tracking.findMany()
    * ```
    */
  get tracking(): Prisma.TrackingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.receipt`: Exposes CRUD operations for the **Receipt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Receipts
    * const receipts = await prisma.receipt.findMany()
    * ```
    */
  get receipt(): Prisma.ReceiptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nLCommand`: Exposes CRUD operations for the **NLCommand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NLCommands
    * const nLCommands = await prisma.nLCommand.findMany()
    * ```
    */
  get nLCommand(): Prisma.NLCommandDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.intent`: Exposes CRUD operations for the **Intent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Intents
    * const intents = await prisma.intent.findMany()
    * ```
    */
  get intent(): Prisma.IntentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemConfig`: Exposes CRUD operations for the **SystemConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemConfigs
    * const systemConfigs = await prisma.systemConfig.findMany()
    * ```
    */
  get systemConfig(): Prisma.SystemConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    Customer: 'Customer',
    Order: 'Order',
    Vehicle: 'Vehicle',
    Schedule: 'Schedule',
    Tracking: 'Tracking',
    Receipt: 'Receipt',
    NLCommand: 'NLCommand',
    Intent: 'Intent',
    SystemConfig: 'SystemConfig',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "customer" | "order" | "vehicle" | "schedule" | "tracking" | "receipt" | "nLCommand" | "intent" | "systemConfig" | "auditLog"
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
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
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
      Vehicle: {
        payload: Prisma.$VehiclePayload<ExtArgs>
        fields: Prisma.VehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findFirst: {
            args: Prisma.VehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findMany: {
            args: Prisma.VehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          create: {
            args: Prisma.VehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          createMany: {
            args: Prisma.VehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          delete: {
            args: Prisma.VehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          update: {
            args: Prisma.VehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          deleteMany: {
            args: Prisma.VehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          upsert: {
            args: Prisma.VehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          aggregate: {
            args: Prisma.VehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicle>
          }
          groupBy: {
            args: Prisma.VehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleCountAggregateOutputType> | number
          }
        }
      }
      Schedule: {
        payload: Prisma.$SchedulePayload<ExtArgs>
        fields: Prisma.ScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findFirst: {
            args: Prisma.ScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findMany: {
            args: Prisma.ScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          create: {
            args: Prisma.ScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          createMany: {
            args: Prisma.ScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          delete: {
            args: Prisma.ScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          update: {
            args: Prisma.ScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          deleteMany: {
            args: Prisma.ScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScheduleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          upsert: {
            args: Prisma.ScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          aggregate: {
            args: Prisma.ScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchedule>
          }
          groupBy: {
            args: Prisma.ScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<ScheduleCountAggregateOutputType> | number
          }
        }
      }
      Tracking: {
        payload: Prisma.$TrackingPayload<ExtArgs>
        fields: Prisma.TrackingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrackingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrackingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          findFirst: {
            args: Prisma.TrackingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrackingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          findMany: {
            args: Prisma.TrackingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>[]
          }
          create: {
            args: Prisma.TrackingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          createMany: {
            args: Prisma.TrackingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrackingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>[]
          }
          delete: {
            args: Prisma.TrackingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          update: {
            args: Prisma.TrackingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          deleteMany: {
            args: Prisma.TrackingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrackingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrackingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>[]
          }
          upsert: {
            args: Prisma.TrackingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          aggregate: {
            args: Prisma.TrackingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTracking>
          }
          groupBy: {
            args: Prisma.TrackingGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrackingGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrackingCountArgs<ExtArgs>
            result: $Utils.Optional<TrackingCountAggregateOutputType> | number
          }
        }
      }
      Receipt: {
        payload: Prisma.$ReceiptPayload<ExtArgs>
        fields: Prisma.ReceiptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReceiptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReceiptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          findFirst: {
            args: Prisma.ReceiptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReceiptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          findMany: {
            args: Prisma.ReceiptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>[]
          }
          create: {
            args: Prisma.ReceiptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          createMany: {
            args: Prisma.ReceiptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReceiptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>[]
          }
          delete: {
            args: Prisma.ReceiptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          update: {
            args: Prisma.ReceiptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          deleteMany: {
            args: Prisma.ReceiptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReceiptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReceiptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>[]
          }
          upsert: {
            args: Prisma.ReceiptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          aggregate: {
            args: Prisma.ReceiptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReceipt>
          }
          groupBy: {
            args: Prisma.ReceiptGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReceiptGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReceiptCountArgs<ExtArgs>
            result: $Utils.Optional<ReceiptCountAggregateOutputType> | number
          }
        }
      }
      NLCommand: {
        payload: Prisma.$NLCommandPayload<ExtArgs>
        fields: Prisma.NLCommandFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NLCommandFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NLCommandPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NLCommandFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NLCommandPayload>
          }
          findFirst: {
            args: Prisma.NLCommandFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NLCommandPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NLCommandFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NLCommandPayload>
          }
          findMany: {
            args: Prisma.NLCommandFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NLCommandPayload>[]
          }
          create: {
            args: Prisma.NLCommandCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NLCommandPayload>
          }
          createMany: {
            args: Prisma.NLCommandCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NLCommandCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NLCommandPayload>[]
          }
          delete: {
            args: Prisma.NLCommandDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NLCommandPayload>
          }
          update: {
            args: Prisma.NLCommandUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NLCommandPayload>
          }
          deleteMany: {
            args: Prisma.NLCommandDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NLCommandUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NLCommandUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NLCommandPayload>[]
          }
          upsert: {
            args: Prisma.NLCommandUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NLCommandPayload>
          }
          aggregate: {
            args: Prisma.NLCommandAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNLCommand>
          }
          groupBy: {
            args: Prisma.NLCommandGroupByArgs<ExtArgs>
            result: $Utils.Optional<NLCommandGroupByOutputType>[]
          }
          count: {
            args: Prisma.NLCommandCountArgs<ExtArgs>
            result: $Utils.Optional<NLCommandCountAggregateOutputType> | number
          }
        }
      }
      Intent: {
        payload: Prisma.$IntentPayload<ExtArgs>
        fields: Prisma.IntentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IntentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IntentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntentPayload>
          }
          findFirst: {
            args: Prisma.IntentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IntentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntentPayload>
          }
          findMany: {
            args: Prisma.IntentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntentPayload>[]
          }
          create: {
            args: Prisma.IntentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntentPayload>
          }
          createMany: {
            args: Prisma.IntentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IntentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntentPayload>[]
          }
          delete: {
            args: Prisma.IntentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntentPayload>
          }
          update: {
            args: Prisma.IntentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntentPayload>
          }
          deleteMany: {
            args: Prisma.IntentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IntentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IntentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntentPayload>[]
          }
          upsert: {
            args: Prisma.IntentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntentPayload>
          }
          aggregate: {
            args: Prisma.IntentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIntent>
          }
          groupBy: {
            args: Prisma.IntentGroupByArgs<ExtArgs>
            result: $Utils.Optional<IntentGroupByOutputType>[]
          }
          count: {
            args: Prisma.IntentCountArgs<ExtArgs>
            result: $Utils.Optional<IntentCountAggregateOutputType> | number
          }
        }
      }
      SystemConfig: {
        payload: Prisma.$SystemConfigPayload<ExtArgs>
        fields: Prisma.SystemConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          findFirst: {
            args: Prisma.SystemConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          findMany: {
            args: Prisma.SystemConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          create: {
            args: Prisma.SystemConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          createMany: {
            args: Prisma.SystemConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          delete: {
            args: Prisma.SystemConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          update: {
            args: Prisma.SystemConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          deleteMany: {
            args: Prisma.SystemConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SystemConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          upsert: {
            args: Prisma.SystemConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          aggregate: {
            args: Prisma.SystemConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemConfig>
          }
          groupBy: {
            args: Prisma.SystemConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemConfigCountArgs<ExtArgs>
            result: $Utils.Optional<SystemConfigCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
    adapter?: runtime.SqlDriverAdapterFactory | null
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
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    customer?: CustomerOmit
    order?: OrderOmit
    vehicle?: VehicleOmit
    schedule?: ScheduleOmit
    tracking?: TrackingOmit
    receipt?: ReceiptOmit
    nLCommand?: NLCommandOmit
    intent?: IntentOmit
    systemConfig?: SystemConfigOmit
    auditLog?: AuditLogOmit
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
    vehicles: number
    receipts: number
    nlCommands: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicles?: boolean | UserCountOutputTypeCountVehiclesArgs
    receipts?: boolean | UserCountOutputTypeCountReceiptsArgs
    nlCommands?: boolean | UserCountOutputTypeCountNlCommandsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
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
  export type UserCountOutputTypeCountVehiclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceiptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReceiptWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNlCommandsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NLCommandWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    orders: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | CustomerCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    schedules: number
    trackings: number
    receipts: number
    nlCommands: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedules?: boolean | OrderCountOutputTypeCountSchedulesArgs
    trackings?: boolean | OrderCountOutputTypeCountTrackingsArgs
    receipts?: boolean | OrderCountOutputTypeCountReceiptsArgs
    nlCommands?: boolean | OrderCountOutputTypeCountNlCommandsArgs
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
  export type OrderCountOutputTypeCountSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountTrackingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackingWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountReceiptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReceiptWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountNlCommandsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NLCommandWhereInput
  }


  /**
   * Count Type VehicleCountOutputType
   */

  export type VehicleCountOutputType = {
    schedules: number
    orders: number
  }

  export type VehicleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedules?: boolean | VehicleCountOutputTypeCountSchedulesArgs
    orders?: boolean | VehicleCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleCountOutputType
     */
    select?: VehicleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
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
    name: string | null
    role: $Enums.UserRole | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: $Enums.UserRole | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    role: number
    avatar: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
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
    name: string
    role: $Enums.UserRole
    avatar: string | null
    createdAt: Date
    updatedAt: Date
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
    name?: boolean
    role?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vehicles?: boolean | User$vehiclesArgs<ExtArgs>
    receipts?: boolean | User$receiptsArgs<ExtArgs>
    nlCommands?: boolean | User$nlCommandsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "role" | "avatar" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicles?: boolean | User$vehiclesArgs<ExtArgs>
    receipts?: boolean | User$receiptsArgs<ExtArgs>
    nlCommands?: boolean | User$nlCommandsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      vehicles: Prisma.$VehiclePayload<ExtArgs>[]
      receipts: Prisma.$ReceiptPayload<ExtArgs>[]
      nlCommands: Prisma.$NLCommandPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      role: $Enums.UserRole
      avatar: string | null
      createdAt: Date
      updatedAt: Date
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
    vehicles<T extends User$vehiclesArgs<ExtArgs> = {}>(args?: Subset<T, User$vehiclesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receipts<T extends User$receiptsArgs<ExtArgs> = {}>(args?: Subset<T, User$receiptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    nlCommands<T extends User$nlCommandsArgs<ExtArgs> = {}>(args?: Subset<T, User$nlCommandsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NLCommandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
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
   * User.vehicles
   */
  export type User$vehiclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    cursor?: VehicleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * User.receipts
   */
  export type User$receiptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    where?: ReceiptWhereInput
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    cursor?: ReceiptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * User.nlCommands
   */
  export type User$nlCommandsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NLCommand
     */
    select?: NLCommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NLCommand
     */
    omit?: NLCommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NLCommandInclude<ExtArgs> | null
    where?: NLCommandWhereInput
    orderBy?: NLCommandOrderByWithRelationInput | NLCommandOrderByWithRelationInput[]
    cursor?: NLCommandWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NLCommandScalarFieldEnum | NLCommandScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
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
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerAvgAggregateOutputType = {
    creditLimit: number | null
  }

  export type CustomerSumAggregateOutputType = {
    creditLimit: number | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    name: string | null
    contactPerson: string | null
    phone: string | null
    email: string | null
    address: string | null
    company: string | null
    creditLimit: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    contactPerson: string | null
    phone: string | null
    email: string | null
    address: string | null
    company: string | null
    creditLimit: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    name: number
    contactPerson: number
    phone: number
    email: number
    address: number
    company: number
    creditLimit: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerAvgAggregateInputType = {
    creditLimit?: true
  }

  export type CustomerSumAggregateInputType = {
    creditLimit?: true
  }

  export type CustomerMinAggregateInputType = {
    id?: true
    name?: true
    contactPerson?: true
    phone?: true
    email?: true
    address?: true
    company?: true
    creditLimit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    name?: true
    contactPerson?: true
    phone?: true
    email?: true
    address?: true
    company?: true
    creditLimit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    name?: true
    contactPerson?: true
    phone?: true
    email?: true
    address?: true
    company?: true
    creditLimit?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _avg?: CustomerAvgAggregateInputType
    _sum?: CustomerSumAggregateInputType
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    name: string
    contactPerson: string
    phone: string
    email: string
    address: string
    company: string
    creditLimit: number | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contactPerson?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    company?: boolean
    creditLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    orders?: boolean | Customer$ordersArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contactPerson?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    company?: boolean
    creditLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contactPerson?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    company?: boolean
    creditLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    name?: boolean
    contactPerson?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    company?: boolean
    creditLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "contactPerson" | "phone" | "email" | "address" | "company" | "creditLimit" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | Customer$ordersArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      contactPerson: string
      phone: string
      email: string
      address: string
      company: string
      creditLimit: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
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
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
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
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orders<T extends Customer$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Customer$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly contactPerson: FieldRef<"Customer", 'String'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly address: FieldRef<"Customer", 'String'>
    readonly company: FieldRef<"Customer", 'String'>
    readonly creditLimit: FieldRef<"Customer", 'Float'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.orders
   */
  export type Customer$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
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
    weight: number | null
    volume: number | null
    value: number | null
  }

  export type OrderSumAggregateOutputType = {
    weight: number | null
    volume: number | null
    value: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    orderNumber: string | null
    customerId: string | null
    status: $Enums.OrderStatus | null
    origin: string | null
    destination: string | null
    weight: number | null
    volume: number | null
    value: number | null
    pickupTime: Date | null
    deliveryTime: Date | null
    specialInstructions: string | null
    assignedVehicleId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    orderNumber: string | null
    customerId: string | null
    status: $Enums.OrderStatus | null
    origin: string | null
    destination: string | null
    weight: number | null
    volume: number | null
    value: number | null
    pickupTime: Date | null
    deliveryTime: Date | null
    specialInstructions: string | null
    assignedVehicleId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    orderNumber: number
    customerId: number
    status: number
    origin: number
    destination: number
    weight: number
    volume: number
    value: number
    pickupTime: number
    deliveryTime: number
    specialInstructions: number
    assignedVehicleId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    weight?: true
    volume?: true
    value?: true
  }

  export type OrderSumAggregateInputType = {
    weight?: true
    volume?: true
    value?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    orderNumber?: true
    customerId?: true
    status?: true
    origin?: true
    destination?: true
    weight?: true
    volume?: true
    value?: true
    pickupTime?: true
    deliveryTime?: true
    specialInstructions?: true
    assignedVehicleId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    orderNumber?: true
    customerId?: true
    status?: true
    origin?: true
    destination?: true
    weight?: true
    volume?: true
    value?: true
    pickupTime?: true
    deliveryTime?: true
    specialInstructions?: true
    assignedVehicleId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    orderNumber?: true
    customerId?: true
    status?: true
    origin?: true
    destination?: true
    weight?: true
    volume?: true
    value?: true
    pickupTime?: true
    deliveryTime?: true
    specialInstructions?: true
    assignedVehicleId?: true
    createdAt?: true
    updatedAt?: true
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
    orderNumber: string
    customerId: string
    status: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value: number | null
    pickupTime: Date
    deliveryTime: Date
    specialInstructions: string | null
    assignedVehicleId: string | null
    createdAt: Date
    updatedAt: Date
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
    orderNumber?: boolean
    customerId?: boolean
    status?: boolean
    origin?: boolean
    destination?: boolean
    weight?: boolean
    volume?: boolean
    value?: boolean
    pickupTime?: boolean
    deliveryTime?: boolean
    specialInstructions?: boolean
    assignedVehicleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    assignedVehicle?: boolean | Order$assignedVehicleArgs<ExtArgs>
    schedules?: boolean | Order$schedulesArgs<ExtArgs>
    trackings?: boolean | Order$trackingsArgs<ExtArgs>
    receipts?: boolean | Order$receiptsArgs<ExtArgs>
    nlCommands?: boolean | Order$nlCommandsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    customerId?: boolean
    status?: boolean
    origin?: boolean
    destination?: boolean
    weight?: boolean
    volume?: boolean
    value?: boolean
    pickupTime?: boolean
    deliveryTime?: boolean
    specialInstructions?: boolean
    assignedVehicleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    assignedVehicle?: boolean | Order$assignedVehicleArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    customerId?: boolean
    status?: boolean
    origin?: boolean
    destination?: boolean
    weight?: boolean
    volume?: boolean
    value?: boolean
    pickupTime?: boolean
    deliveryTime?: boolean
    specialInstructions?: boolean
    assignedVehicleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    assignedVehicle?: boolean | Order$assignedVehicleArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    orderNumber?: boolean
    customerId?: boolean
    status?: boolean
    origin?: boolean
    destination?: boolean
    weight?: boolean
    volume?: boolean
    value?: boolean
    pickupTime?: boolean
    deliveryTime?: boolean
    specialInstructions?: boolean
    assignedVehicleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderNumber" | "customerId" | "status" | "origin" | "destination" | "weight" | "volume" | "value" | "pickupTime" | "deliveryTime" | "specialInstructions" | "assignedVehicleId" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    assignedVehicle?: boolean | Order$assignedVehicleArgs<ExtArgs>
    schedules?: boolean | Order$schedulesArgs<ExtArgs>
    trackings?: boolean | Order$trackingsArgs<ExtArgs>
    receipts?: boolean | Order$receiptsArgs<ExtArgs>
    nlCommands?: boolean | Order$nlCommandsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    assignedVehicle?: boolean | Order$assignedVehicleArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    assignedVehicle?: boolean | Order$assignedVehicleArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      assignedVehicle: Prisma.$VehiclePayload<ExtArgs> | null
      schedules: Prisma.$SchedulePayload<ExtArgs>[]
      trackings: Prisma.$TrackingPayload<ExtArgs>[]
      receipts: Prisma.$ReceiptPayload<ExtArgs>[]
      nlCommands: Prisma.$NLCommandPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderNumber: string
      customerId: string
      status: $Enums.OrderStatus
      origin: string
      destination: string
      weight: number
      volume: number
      value: number | null
      pickupTime: Date
      deliveryTime: Date
      specialInstructions: string | null
      assignedVehicleId: string | null
      createdAt: Date
      updatedAt: Date
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
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignedVehicle<T extends Order$assignedVehicleArgs<ExtArgs> = {}>(args?: Subset<T, Order$assignedVehicleArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    schedules<T extends Order$schedulesArgs<ExtArgs> = {}>(args?: Subset<T, Order$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trackings<T extends Order$trackingsArgs<ExtArgs> = {}>(args?: Subset<T, Order$trackingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receipts<T extends Order$receiptsArgs<ExtArgs> = {}>(args?: Subset<T, Order$receiptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    nlCommands<T extends Order$nlCommandsArgs<ExtArgs> = {}>(args?: Subset<T, Order$nlCommandsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NLCommandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly orderNumber: FieldRef<"Order", 'String'>
    readonly customerId: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly origin: FieldRef<"Order", 'String'>
    readonly destination: FieldRef<"Order", 'String'>
    readonly weight: FieldRef<"Order", 'Float'>
    readonly volume: FieldRef<"Order", 'Float'>
    readonly value: FieldRef<"Order", 'Float'>
    readonly pickupTime: FieldRef<"Order", 'DateTime'>
    readonly deliveryTime: FieldRef<"Order", 'DateTime'>
    readonly specialInstructions: FieldRef<"Order", 'String'>
    readonly assignedVehicleId: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
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
   * Order.assignedVehicle
   */
  export type Order$assignedVehicleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    where?: VehicleWhereInput
  }

  /**
   * Order.schedules
   */
  export type Order$schedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    cursor?: ScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Order.trackings
   */
  export type Order$trackingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    where?: TrackingWhereInput
    orderBy?: TrackingOrderByWithRelationInput | TrackingOrderByWithRelationInput[]
    cursor?: TrackingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrackingScalarFieldEnum | TrackingScalarFieldEnum[]
  }

  /**
   * Order.receipts
   */
  export type Order$receiptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    where?: ReceiptWhereInput
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    cursor?: ReceiptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Order.nlCommands
   */
  export type Order$nlCommandsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NLCommand
     */
    select?: NLCommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NLCommand
     */
    omit?: NLCommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NLCommandInclude<ExtArgs> | null
    where?: NLCommandWhereInput
    orderBy?: NLCommandOrderByWithRelationInput | NLCommandOrderByWithRelationInput[]
    cursor?: NLCommandWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NLCommandScalarFieldEnum | NLCommandScalarFieldEnum[]
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
   * Model Vehicle
   */

  export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  export type VehicleAvgAggregateOutputType = {
    capacity: number | null
  }

  export type VehicleSumAggregateOutputType = {
    capacity: number | null
  }

  export type VehicleMinAggregateOutputType = {
    id: string | null
    licensePlate: string | null
    type: $Enums.VehicleType | null
    capacity: number | null
    driverId: string | null
    status: $Enums.VehicleStatus | null
    currentLocation: string | null
    lastMaintenance: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleMaxAggregateOutputType = {
    id: string | null
    licensePlate: string | null
    type: $Enums.VehicleType | null
    capacity: number | null
    driverId: string | null
    status: $Enums.VehicleStatus | null
    currentLocation: string | null
    lastMaintenance: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleCountAggregateOutputType = {
    id: number
    licensePlate: number
    type: number
    capacity: number
    driverId: number
    status: number
    currentLocation: number
    lastMaintenance: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VehicleAvgAggregateInputType = {
    capacity?: true
  }

  export type VehicleSumAggregateInputType = {
    capacity?: true
  }

  export type VehicleMinAggregateInputType = {
    id?: true
    licensePlate?: true
    type?: true
    capacity?: true
    driverId?: true
    status?: true
    currentLocation?: true
    lastMaintenance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleMaxAggregateInputType = {
    id?: true
    licensePlate?: true
    type?: true
    capacity?: true
    driverId?: true
    status?: true
    currentLocation?: true
    lastMaintenance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleCountAggregateInputType = {
    id?: true
    licensePlate?: true
    type?: true
    capacity?: true
    driverId?: true
    status?: true
    currentLocation?: true
    lastMaintenance?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicle to aggregate.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vehicles
    **/
    _count?: true | VehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMaxAggregateInputType
  }

  export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicle[P]>
      : GetScalarType<T[P], AggregateVehicle[P]>
  }




  export type VehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithAggregationInput | VehicleOrderByWithAggregationInput[]
    by: VehicleScalarFieldEnum[] | VehicleScalarFieldEnum
    having?: VehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleCountAggregateInputType | true
    _avg?: VehicleAvgAggregateInputType
    _sum?: VehicleSumAggregateInputType
    _min?: VehicleMinAggregateInputType
    _max?: VehicleMaxAggregateInputType
  }

  export type VehicleGroupByOutputType = {
    id: string
    licensePlate: string
    type: $Enums.VehicleType
    capacity: number
    driverId: string
    status: $Enums.VehicleStatus
    currentLocation: string | null
    lastMaintenance: Date | null
    createdAt: Date
    updatedAt: Date
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    licensePlate?: boolean
    type?: boolean
    capacity?: boolean
    driverId?: boolean
    status?: boolean
    currentLocation?: boolean
    lastMaintenance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    driver?: boolean | UserDefaultArgs<ExtArgs>
    schedules?: boolean | Vehicle$schedulesArgs<ExtArgs>
    orders?: boolean | Vehicle$ordersArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    licensePlate?: boolean
    type?: boolean
    capacity?: boolean
    driverId?: boolean
    status?: boolean
    currentLocation?: boolean
    lastMaintenance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    driver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    licensePlate?: boolean
    type?: boolean
    capacity?: boolean
    driverId?: boolean
    status?: boolean
    currentLocation?: boolean
    lastMaintenance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    driver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectScalar = {
    id?: boolean
    licensePlate?: boolean
    type?: boolean
    capacity?: boolean
    driverId?: boolean
    status?: boolean
    currentLocation?: boolean
    lastMaintenance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VehicleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "licensePlate" | "type" | "capacity" | "driverId" | "status" | "currentLocation" | "lastMaintenance" | "createdAt" | "updatedAt", ExtArgs["result"]["vehicle"]>
  export type VehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | UserDefaultArgs<ExtArgs>
    schedules?: boolean | Vehicle$schedulesArgs<ExtArgs>
    orders?: boolean | Vehicle$ordersArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vehicle"
    objects: {
      driver: Prisma.$UserPayload<ExtArgs>
      schedules: Prisma.$SchedulePayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      licensePlate: string
      type: $Enums.VehicleType
      capacity: number
      driverId: string
      status: $Enums.VehicleStatus
      currentLocation: string | null
      lastMaintenance: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vehicle"]>
    composites: {}
  }

  type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = $Result.GetResult<Prisma.$VehiclePayload, S>

  type VehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleCountAggregateInputType | true
    }

  export interface VehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'], meta: { name: 'Vehicle' } }
    /**
     * Find zero or one Vehicle that matches the filter.
     * @param {VehicleFindUniqueArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleFindUniqueArgs>(args: SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vehicle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleFindUniqueOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleFindFirstArgs>(args?: SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vehicles
     * const vehicles = await prisma.vehicle.findMany()
     * 
     * // Get first 10 Vehicles
     * const vehicles = await prisma.vehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleFindManyArgs>(args?: SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vehicle.
     * @param {VehicleCreateArgs} args - Arguments to create a Vehicle.
     * @example
     * // Create one Vehicle
     * const Vehicle = await prisma.vehicle.create({
     *   data: {
     *     // ... data to create a Vehicle
     *   }
     * })
     * 
     */
    create<T extends VehicleCreateArgs>(args: SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vehicles.
     * @param {VehicleCreateManyArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleCreateManyArgs>(args?: SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vehicles and returns the data saved in the database.
     * @param {VehicleCreateManyAndReturnArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vehicle.
     * @param {VehicleDeleteArgs} args - Arguments to delete one Vehicle.
     * @example
     * // Delete one Vehicle
     * const Vehicle = await prisma.vehicle.delete({
     *   where: {
     *     // ... filter to delete one Vehicle
     *   }
     * })
     * 
     */
    delete<T extends VehicleDeleteArgs>(args: SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vehicle.
     * @param {VehicleUpdateArgs} args - Arguments to update one Vehicle.
     * @example
     * // Update one Vehicle
     * const vehicle = await prisma.vehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleUpdateArgs>(args: SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vehicles.
     * @param {VehicleDeleteManyArgs} args - Arguments to filter Vehicles to delete.
     * @example
     * // Delete a few Vehicles
     * const { count } = await prisma.vehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDeleteManyArgs>(args?: SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleUpdateManyArgs>(args: SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles and returns the data updated in the database.
     * @param {VehicleUpdateManyAndReturnArgs} args - Arguments to update many Vehicles.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.updateManyAndReturn({
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
    updateManyAndReturn<T extends VehicleUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vehicle.
     * @param {VehicleUpsertArgs} args - Arguments to update or create a Vehicle.
     * @example
     * // Update or create a Vehicle
     * const vehicle = await prisma.vehicle.upsert({
     *   create: {
     *     // ... data to create a Vehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vehicle we want to update
     *   }
     * })
     */
    upsert<T extends VehicleUpsertArgs>(args: SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleCountArgs} args - Arguments to filter Vehicles to count.
     * @example
     * // Count the number of Vehicles
     * const count = await prisma.vehicle.count({
     *   where: {
     *     // ... the filter for the Vehicles we want to count
     *   }
     * })
    **/
    count<T extends VehicleCountArgs>(
      args?: Subset<T, VehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VehicleAggregateArgs>(args: Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>

    /**
     * Group by Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleGroupByArgs} args - Group by arguments.
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
      T extends VehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vehicle model
   */
  readonly fields: VehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    driver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    schedules<T extends Vehicle$schedulesArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Vehicle$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Vehicle model
   */
  interface VehicleFieldRefs {
    readonly id: FieldRef<"Vehicle", 'String'>
    readonly licensePlate: FieldRef<"Vehicle", 'String'>
    readonly type: FieldRef<"Vehicle", 'VehicleType'>
    readonly capacity: FieldRef<"Vehicle", 'Float'>
    readonly driverId: FieldRef<"Vehicle", 'String'>
    readonly status: FieldRef<"Vehicle", 'VehicleStatus'>
    readonly currentLocation: FieldRef<"Vehicle", 'String'>
    readonly lastMaintenance: FieldRef<"Vehicle", 'DateTime'>
    readonly createdAt: FieldRef<"Vehicle", 'DateTime'>
    readonly updatedAt: FieldRef<"Vehicle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vehicle findUnique
   */
  export type VehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findUniqueOrThrow
   */
  export type VehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findFirst
   */
  export type VehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findFirstOrThrow
   */
  export type VehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findMany
   */
  export type VehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicles to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle create
   */
  export type VehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a Vehicle.
     */
    data: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
  }

  /**
   * Vehicle createMany
   */
  export type VehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle createManyAndReturn
   */
  export type VehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vehicle update
   */
  export type VehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a Vehicle.
     */
    data: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
    /**
     * Choose, which Vehicle to update.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle updateMany
   */
  export type VehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle updateManyAndReturn
   */
  export type VehicleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vehicle upsert
   */
  export type VehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the Vehicle to update in case it exists.
     */
    where: VehicleWhereUniqueInput
    /**
     * In case the Vehicle found by the `where` argument doesn't exist, create a new Vehicle with this data.
     */
    create: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
    /**
     * In case the Vehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
  }

  /**
   * Vehicle delete
   */
  export type VehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter which Vehicle to delete.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle deleteMany
   */
  export type VehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicles to delete
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to delete.
     */
    limit?: number
  }

  /**
   * Vehicle.schedules
   */
  export type Vehicle$schedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    cursor?: ScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Vehicle.orders
   */
  export type Vehicle$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Vehicle without action
   */
  export type VehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
  }


  /**
   * Model Schedule
   */

  export type AggregateSchedule = {
    _count: ScheduleCountAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  export type ScheduleMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    vehicleId: string | null
    plannedDeparture: Date | null
    plannedArrival: Date | null
    actualDeparture: Date | null
    actualArrival: Date | null
    status: $Enums.ScheduleStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ScheduleMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    vehicleId: string | null
    plannedDeparture: Date | null
    plannedArrival: Date | null
    actualDeparture: Date | null
    actualArrival: Date | null
    status: $Enums.ScheduleStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ScheduleCountAggregateOutputType = {
    id: number
    orderId: number
    vehicleId: number
    plannedDeparture: number
    plannedArrival: number
    actualDeparture: number
    actualArrival: number
    status: number
    route: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ScheduleMinAggregateInputType = {
    id?: true
    orderId?: true
    vehicleId?: true
    plannedDeparture?: true
    plannedArrival?: true
    actualDeparture?: true
    actualArrival?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ScheduleMaxAggregateInputType = {
    id?: true
    orderId?: true
    vehicleId?: true
    plannedDeparture?: true
    plannedArrival?: true
    actualDeparture?: true
    actualArrival?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ScheduleCountAggregateInputType = {
    id?: true
    orderId?: true
    vehicleId?: true
    plannedDeparture?: true
    plannedArrival?: true
    actualDeparture?: true
    actualArrival?: true
    status?: true
    route?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedule to aggregate.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Schedules
    **/
    _count?: true | ScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScheduleMaxAggregateInputType
  }

  export type GetScheduleAggregateType<T extends ScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchedule[P]>
      : GetScalarType<T[P], AggregateSchedule[P]>
  }




  export type ScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithAggregationInput | ScheduleOrderByWithAggregationInput[]
    by: ScheduleScalarFieldEnum[] | ScheduleScalarFieldEnum
    having?: ScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScheduleCountAggregateInputType | true
    _min?: ScheduleMinAggregateInputType
    _max?: ScheduleMaxAggregateInputType
  }

  export type ScheduleGroupByOutputType = {
    id: string
    orderId: string
    vehicleId: string
    plannedDeparture: Date
    plannedArrival: Date
    actualDeparture: Date | null
    actualArrival: Date | null
    status: $Enums.ScheduleStatus
    route: string[]
    createdAt: Date
    updatedAt: Date
    _count: ScheduleCountAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  type GetScheduleGroupByPayload<T extends ScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
        }
      >
    >


  export type ScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    vehicleId?: boolean
    plannedDeparture?: boolean
    plannedArrival?: boolean
    actualDeparture?: boolean
    actualArrival?: boolean
    status?: boolean
    route?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    vehicleId?: boolean
    plannedDeparture?: boolean
    plannedArrival?: boolean
    actualDeparture?: boolean
    actualArrival?: boolean
    status?: boolean
    route?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    vehicleId?: boolean
    plannedDeparture?: boolean
    plannedArrival?: boolean
    actualDeparture?: boolean
    actualArrival?: boolean
    status?: boolean
    route?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectScalar = {
    id?: boolean
    orderId?: boolean
    vehicleId?: boolean
    plannedDeparture?: boolean
    plannedArrival?: boolean
    actualDeparture?: boolean
    actualArrival?: boolean
    status?: boolean
    route?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "vehicleId" | "plannedDeparture" | "plannedArrival" | "actualDeparture" | "actualArrival" | "status" | "route" | "createdAt" | "updatedAt", ExtArgs["result"]["schedule"]>
  export type ScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type ScheduleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type ScheduleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }

  export type $SchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Schedule"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      vehicle: Prisma.$VehiclePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      vehicleId: string
      plannedDeparture: Date
      plannedArrival: Date
      actualDeparture: Date | null
      actualArrival: Date | null
      status: $Enums.ScheduleStatus
      route: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["schedule"]>
    composites: {}
  }

  type ScheduleGetPayload<S extends boolean | null | undefined | ScheduleDefaultArgs> = $Result.GetResult<Prisma.$SchedulePayload, S>

  type ScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScheduleCountAggregateInputType | true
    }

  export interface ScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Schedule'], meta: { name: 'Schedule' } }
    /**
     * Find zero or one Schedule that matches the filter.
     * @param {ScheduleFindUniqueArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduleFindUniqueArgs>(args: SelectSubset<T, ScheduleFindUniqueArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Schedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScheduleFindUniqueOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, ScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduleFindFirstArgs>(args?: SelectSubset<T, ScheduleFindFirstArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, ScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Schedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schedules
     * const schedules = await prisma.schedule.findMany()
     * 
     * // Get first 10 Schedules
     * const schedules = await prisma.schedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scheduleWithIdOnly = await prisma.schedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScheduleFindManyArgs>(args?: SelectSubset<T, ScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Schedule.
     * @param {ScheduleCreateArgs} args - Arguments to create a Schedule.
     * @example
     * // Create one Schedule
     * const Schedule = await prisma.schedule.create({
     *   data: {
     *     // ... data to create a Schedule
     *   }
     * })
     * 
     */
    create<T extends ScheduleCreateArgs>(args: SelectSubset<T, ScheduleCreateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Schedules.
     * @param {ScheduleCreateManyArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScheduleCreateManyArgs>(args?: SelectSubset<T, ScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Schedules and returns the data saved in the database.
     * @param {ScheduleCreateManyAndReturnArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Schedules and only return the `id`
     * const scheduleWithIdOnly = await prisma.schedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, ScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Schedule.
     * @param {ScheduleDeleteArgs} args - Arguments to delete one Schedule.
     * @example
     * // Delete one Schedule
     * const Schedule = await prisma.schedule.delete({
     *   where: {
     *     // ... filter to delete one Schedule
     *   }
     * })
     * 
     */
    delete<T extends ScheduleDeleteArgs>(args: SelectSubset<T, ScheduleDeleteArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Schedule.
     * @param {ScheduleUpdateArgs} args - Arguments to update one Schedule.
     * @example
     * // Update one Schedule
     * const schedule = await prisma.schedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScheduleUpdateArgs>(args: SelectSubset<T, ScheduleUpdateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Schedules.
     * @param {ScheduleDeleteManyArgs} args - Arguments to filter Schedules to delete.
     * @example
     * // Delete a few Schedules
     * const { count } = await prisma.schedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScheduleDeleteManyArgs>(args?: SelectSubset<T, ScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schedules
     * const schedule = await prisma.schedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScheduleUpdateManyArgs>(args: SelectSubset<T, ScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedules and returns the data updated in the database.
     * @param {ScheduleUpdateManyAndReturnArgs} args - Arguments to update many Schedules.
     * @example
     * // Update many Schedules
     * const schedule = await prisma.schedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Schedules and only return the `id`
     * const scheduleWithIdOnly = await prisma.schedule.updateManyAndReturn({
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
    updateManyAndReturn<T extends ScheduleUpdateManyAndReturnArgs>(args: SelectSubset<T, ScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Schedule.
     * @param {ScheduleUpsertArgs} args - Arguments to update or create a Schedule.
     * @example
     * // Update or create a Schedule
     * const schedule = await prisma.schedule.upsert({
     *   create: {
     *     // ... data to create a Schedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Schedule we want to update
     *   }
     * })
     */
    upsert<T extends ScheduleUpsertArgs>(args: SelectSubset<T, ScheduleUpsertArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleCountArgs} args - Arguments to filter Schedules to count.
     * @example
     * // Count the number of Schedules
     * const count = await prisma.schedule.count({
     *   where: {
     *     // ... the filter for the Schedules we want to count
     *   }
     * })
    **/
    count<T extends ScheduleCountArgs>(
      args?: Subset<T, ScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ScheduleAggregateArgs>(args: Subset<T, ScheduleAggregateArgs>): Prisma.PrismaPromise<GetScheduleAggregateType<T>>

    /**
     * Group by Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleGroupByArgs} args - Group by arguments.
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
      T extends ScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduleGroupByArgs['orderBy'] }
        : { orderBy?: ScheduleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Schedule model
   */
  readonly fields: ScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Schedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Schedule model
   */
  interface ScheduleFieldRefs {
    readonly id: FieldRef<"Schedule", 'String'>
    readonly orderId: FieldRef<"Schedule", 'String'>
    readonly vehicleId: FieldRef<"Schedule", 'String'>
    readonly plannedDeparture: FieldRef<"Schedule", 'DateTime'>
    readonly plannedArrival: FieldRef<"Schedule", 'DateTime'>
    readonly actualDeparture: FieldRef<"Schedule", 'DateTime'>
    readonly actualArrival: FieldRef<"Schedule", 'DateTime'>
    readonly status: FieldRef<"Schedule", 'ScheduleStatus'>
    readonly route: FieldRef<"Schedule", 'String[]'>
    readonly createdAt: FieldRef<"Schedule", 'DateTime'>
    readonly updatedAt: FieldRef<"Schedule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Schedule findUnique
   */
  export type ScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findUniqueOrThrow
   */
  export type ScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findFirst
   */
  export type ScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findFirstOrThrow
   */
  export type ScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findMany
   */
  export type ScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedules to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule create
   */
  export type ScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a Schedule.
     */
    data: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
  }

  /**
   * Schedule createMany
   */
  export type ScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Schedule createManyAndReturn
   */
  export type ScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Schedule update
   */
  export type ScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a Schedule.
     */
    data: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
    /**
     * Choose, which Schedule to update.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule updateMany
   */
  export type ScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Schedules.
     */
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyInput>
    /**
     * Filter which Schedules to update
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to update.
     */
    limit?: number
  }

  /**
   * Schedule updateManyAndReturn
   */
  export type ScheduleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * The data used to update Schedules.
     */
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyInput>
    /**
     * Filter which Schedules to update
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Schedule upsert
   */
  export type ScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the Schedule to update in case it exists.
     */
    where: ScheduleWhereUniqueInput
    /**
     * In case the Schedule found by the `where` argument doesn't exist, create a new Schedule with this data.
     */
    create: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
    /**
     * In case the Schedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
  }

  /**
   * Schedule delete
   */
  export type ScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter which Schedule to delete.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule deleteMany
   */
  export type ScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedules to delete
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to delete.
     */
    limit?: number
  }

  /**
   * Schedule without action
   */
  export type ScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
  }


  /**
   * Model Tracking
   */

  export type AggregateTracking = {
    _count: TrackingCountAggregateOutputType | null
    _min: TrackingMinAggregateOutputType | null
    _max: TrackingMaxAggregateOutputType | null
  }

  export type TrackingMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    location: string | null
    status: $Enums.TrackingStatus | null
    timestamp: Date | null
    notes: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrackingMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    location: string | null
    status: $Enums.TrackingStatus | null
    timestamp: Date | null
    notes: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrackingCountAggregateOutputType = {
    id: number
    orderId: number
    location: number
    coordinates: number
    status: number
    timestamp: number
    notes: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TrackingMinAggregateInputType = {
    id?: true
    orderId?: true
    location?: true
    status?: true
    timestamp?: true
    notes?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrackingMaxAggregateInputType = {
    id?: true
    orderId?: true
    location?: true
    status?: true
    timestamp?: true
    notes?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrackingCountAggregateInputType = {
    id?: true
    orderId?: true
    location?: true
    coordinates?: true
    status?: true
    timestamp?: true
    notes?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TrackingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tracking to aggregate.
     */
    where?: TrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trackings to fetch.
     */
    orderBy?: TrackingOrderByWithRelationInput | TrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trackings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trackings
    **/
    _count?: true | TrackingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrackingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrackingMaxAggregateInputType
  }

  export type GetTrackingAggregateType<T extends TrackingAggregateArgs> = {
        [P in keyof T & keyof AggregateTracking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTracking[P]>
      : GetScalarType<T[P], AggregateTracking[P]>
  }




  export type TrackingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackingWhereInput
    orderBy?: TrackingOrderByWithAggregationInput | TrackingOrderByWithAggregationInput[]
    by: TrackingScalarFieldEnum[] | TrackingScalarFieldEnum
    having?: TrackingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrackingCountAggregateInputType | true
    _min?: TrackingMinAggregateInputType
    _max?: TrackingMaxAggregateInputType
  }

  export type TrackingGroupByOutputType = {
    id: string
    orderId: string
    location: string
    coordinates: JsonValue
    status: $Enums.TrackingStatus
    timestamp: Date
    notes: string | null
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: TrackingCountAggregateOutputType | null
    _min: TrackingMinAggregateOutputType | null
    _max: TrackingMaxAggregateOutputType | null
  }

  type GetTrackingGroupByPayload<T extends TrackingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrackingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrackingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrackingGroupByOutputType[P]>
            : GetScalarType<T[P], TrackingGroupByOutputType[P]>
        }
      >
    >


  export type TrackingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    location?: boolean
    coordinates?: boolean
    status?: boolean
    timestamp?: boolean
    notes?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tracking"]>

  export type TrackingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    location?: boolean
    coordinates?: boolean
    status?: boolean
    timestamp?: boolean
    notes?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tracking"]>

  export type TrackingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    location?: boolean
    coordinates?: boolean
    status?: boolean
    timestamp?: boolean
    notes?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tracking"]>

  export type TrackingSelectScalar = {
    id?: boolean
    orderId?: boolean
    location?: boolean
    coordinates?: boolean
    status?: boolean
    timestamp?: boolean
    notes?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TrackingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "location" | "coordinates" | "status" | "timestamp" | "notes" | "imageUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["tracking"]>
  export type TrackingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type TrackingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type TrackingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $TrackingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tracking"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      location: string
      coordinates: Prisma.JsonValue
      status: $Enums.TrackingStatus
      timestamp: Date
      notes: string | null
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tracking"]>
    composites: {}
  }

  type TrackingGetPayload<S extends boolean | null | undefined | TrackingDefaultArgs> = $Result.GetResult<Prisma.$TrackingPayload, S>

  type TrackingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrackingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrackingCountAggregateInputType | true
    }

  export interface TrackingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tracking'], meta: { name: 'Tracking' } }
    /**
     * Find zero or one Tracking that matches the filter.
     * @param {TrackingFindUniqueArgs} args - Arguments to find a Tracking
     * @example
     * // Get one Tracking
     * const tracking = await prisma.tracking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrackingFindUniqueArgs>(args: SelectSubset<T, TrackingFindUniqueArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tracking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrackingFindUniqueOrThrowArgs} args - Arguments to find a Tracking
     * @example
     * // Get one Tracking
     * const tracking = await prisma.tracking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrackingFindUniqueOrThrowArgs>(args: SelectSubset<T, TrackingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tracking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingFindFirstArgs} args - Arguments to find a Tracking
     * @example
     * // Get one Tracking
     * const tracking = await prisma.tracking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrackingFindFirstArgs>(args?: SelectSubset<T, TrackingFindFirstArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tracking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingFindFirstOrThrowArgs} args - Arguments to find a Tracking
     * @example
     * // Get one Tracking
     * const tracking = await prisma.tracking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrackingFindFirstOrThrowArgs>(args?: SelectSubset<T, TrackingFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trackings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trackings
     * const trackings = await prisma.tracking.findMany()
     * 
     * // Get first 10 Trackings
     * const trackings = await prisma.tracking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trackingWithIdOnly = await prisma.tracking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrackingFindManyArgs>(args?: SelectSubset<T, TrackingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tracking.
     * @param {TrackingCreateArgs} args - Arguments to create a Tracking.
     * @example
     * // Create one Tracking
     * const Tracking = await prisma.tracking.create({
     *   data: {
     *     // ... data to create a Tracking
     *   }
     * })
     * 
     */
    create<T extends TrackingCreateArgs>(args: SelectSubset<T, TrackingCreateArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trackings.
     * @param {TrackingCreateManyArgs} args - Arguments to create many Trackings.
     * @example
     * // Create many Trackings
     * const tracking = await prisma.tracking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrackingCreateManyArgs>(args?: SelectSubset<T, TrackingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trackings and returns the data saved in the database.
     * @param {TrackingCreateManyAndReturnArgs} args - Arguments to create many Trackings.
     * @example
     * // Create many Trackings
     * const tracking = await prisma.tracking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trackings and only return the `id`
     * const trackingWithIdOnly = await prisma.tracking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrackingCreateManyAndReturnArgs>(args?: SelectSubset<T, TrackingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tracking.
     * @param {TrackingDeleteArgs} args - Arguments to delete one Tracking.
     * @example
     * // Delete one Tracking
     * const Tracking = await prisma.tracking.delete({
     *   where: {
     *     // ... filter to delete one Tracking
     *   }
     * })
     * 
     */
    delete<T extends TrackingDeleteArgs>(args: SelectSubset<T, TrackingDeleteArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tracking.
     * @param {TrackingUpdateArgs} args - Arguments to update one Tracking.
     * @example
     * // Update one Tracking
     * const tracking = await prisma.tracking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrackingUpdateArgs>(args: SelectSubset<T, TrackingUpdateArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trackings.
     * @param {TrackingDeleteManyArgs} args - Arguments to filter Trackings to delete.
     * @example
     * // Delete a few Trackings
     * const { count } = await prisma.tracking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrackingDeleteManyArgs>(args?: SelectSubset<T, TrackingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trackings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trackings
     * const tracking = await prisma.tracking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrackingUpdateManyArgs>(args: SelectSubset<T, TrackingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trackings and returns the data updated in the database.
     * @param {TrackingUpdateManyAndReturnArgs} args - Arguments to update many Trackings.
     * @example
     * // Update many Trackings
     * const tracking = await prisma.tracking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trackings and only return the `id`
     * const trackingWithIdOnly = await prisma.tracking.updateManyAndReturn({
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
    updateManyAndReturn<T extends TrackingUpdateManyAndReturnArgs>(args: SelectSubset<T, TrackingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tracking.
     * @param {TrackingUpsertArgs} args - Arguments to update or create a Tracking.
     * @example
     * // Update or create a Tracking
     * const tracking = await prisma.tracking.upsert({
     *   create: {
     *     // ... data to create a Tracking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tracking we want to update
     *   }
     * })
     */
    upsert<T extends TrackingUpsertArgs>(args: SelectSubset<T, TrackingUpsertArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trackings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingCountArgs} args - Arguments to filter Trackings to count.
     * @example
     * // Count the number of Trackings
     * const count = await prisma.tracking.count({
     *   where: {
     *     // ... the filter for the Trackings we want to count
     *   }
     * })
    **/
    count<T extends TrackingCountArgs>(
      args?: Subset<T, TrackingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrackingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tracking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TrackingAggregateArgs>(args: Subset<T, TrackingAggregateArgs>): Prisma.PrismaPromise<GetTrackingAggregateType<T>>

    /**
     * Group by Tracking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingGroupByArgs} args - Group by arguments.
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
      T extends TrackingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrackingGroupByArgs['orderBy'] }
        : { orderBy?: TrackingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TrackingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tracking model
   */
  readonly fields: TrackingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tracking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrackingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Tracking model
   */
  interface TrackingFieldRefs {
    readonly id: FieldRef<"Tracking", 'String'>
    readonly orderId: FieldRef<"Tracking", 'String'>
    readonly location: FieldRef<"Tracking", 'String'>
    readonly coordinates: FieldRef<"Tracking", 'Json'>
    readonly status: FieldRef<"Tracking", 'TrackingStatus'>
    readonly timestamp: FieldRef<"Tracking", 'DateTime'>
    readonly notes: FieldRef<"Tracking", 'String'>
    readonly imageUrl: FieldRef<"Tracking", 'String'>
    readonly createdAt: FieldRef<"Tracking", 'DateTime'>
    readonly updatedAt: FieldRef<"Tracking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tracking findUnique
   */
  export type TrackingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter, which Tracking to fetch.
     */
    where: TrackingWhereUniqueInput
  }

  /**
   * Tracking findUniqueOrThrow
   */
  export type TrackingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter, which Tracking to fetch.
     */
    where: TrackingWhereUniqueInput
  }

  /**
   * Tracking findFirst
   */
  export type TrackingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter, which Tracking to fetch.
     */
    where?: TrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trackings to fetch.
     */
    orderBy?: TrackingOrderByWithRelationInput | TrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trackings.
     */
    cursor?: TrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trackings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trackings.
     */
    distinct?: TrackingScalarFieldEnum | TrackingScalarFieldEnum[]
  }

  /**
   * Tracking findFirstOrThrow
   */
  export type TrackingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter, which Tracking to fetch.
     */
    where?: TrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trackings to fetch.
     */
    orderBy?: TrackingOrderByWithRelationInput | TrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trackings.
     */
    cursor?: TrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trackings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trackings.
     */
    distinct?: TrackingScalarFieldEnum | TrackingScalarFieldEnum[]
  }

  /**
   * Tracking findMany
   */
  export type TrackingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter, which Trackings to fetch.
     */
    where?: TrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trackings to fetch.
     */
    orderBy?: TrackingOrderByWithRelationInput | TrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trackings.
     */
    cursor?: TrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trackings.
     */
    skip?: number
    distinct?: TrackingScalarFieldEnum | TrackingScalarFieldEnum[]
  }

  /**
   * Tracking create
   */
  export type TrackingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * The data needed to create a Tracking.
     */
    data: XOR<TrackingCreateInput, TrackingUncheckedCreateInput>
  }

  /**
   * Tracking createMany
   */
  export type TrackingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trackings.
     */
    data: TrackingCreateManyInput | TrackingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tracking createManyAndReturn
   */
  export type TrackingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * The data used to create many Trackings.
     */
    data: TrackingCreateManyInput | TrackingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tracking update
   */
  export type TrackingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * The data needed to update a Tracking.
     */
    data: XOR<TrackingUpdateInput, TrackingUncheckedUpdateInput>
    /**
     * Choose, which Tracking to update.
     */
    where: TrackingWhereUniqueInput
  }

  /**
   * Tracking updateMany
   */
  export type TrackingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trackings.
     */
    data: XOR<TrackingUpdateManyMutationInput, TrackingUncheckedUpdateManyInput>
    /**
     * Filter which Trackings to update
     */
    where?: TrackingWhereInput
    /**
     * Limit how many Trackings to update.
     */
    limit?: number
  }

  /**
   * Tracking updateManyAndReturn
   */
  export type TrackingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * The data used to update Trackings.
     */
    data: XOR<TrackingUpdateManyMutationInput, TrackingUncheckedUpdateManyInput>
    /**
     * Filter which Trackings to update
     */
    where?: TrackingWhereInput
    /**
     * Limit how many Trackings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tracking upsert
   */
  export type TrackingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * The filter to search for the Tracking to update in case it exists.
     */
    where: TrackingWhereUniqueInput
    /**
     * In case the Tracking found by the `where` argument doesn't exist, create a new Tracking with this data.
     */
    create: XOR<TrackingCreateInput, TrackingUncheckedCreateInput>
    /**
     * In case the Tracking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrackingUpdateInput, TrackingUncheckedUpdateInput>
  }

  /**
   * Tracking delete
   */
  export type TrackingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter which Tracking to delete.
     */
    where: TrackingWhereUniqueInput
  }

  /**
   * Tracking deleteMany
   */
  export type TrackingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trackings to delete
     */
    where?: TrackingWhereInput
    /**
     * Limit how many Trackings to delete.
     */
    limit?: number
  }

  /**
   * Tracking without action
   */
  export type TrackingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
  }


  /**
   * Model Receipt
   */

  export type AggregateReceipt = {
    _count: ReceiptCountAggregateOutputType | null
    _min: ReceiptMinAggregateOutputType | null
    _max: ReceiptMaxAggregateOutputType | null
  }

  export type ReceiptMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    status: $Enums.ReceiptStatus | null
    imageUrl: string | null
    notes: string | null
    verifiedBy: string | null
    verifiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReceiptMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    status: $Enums.ReceiptStatus | null
    imageUrl: string | null
    notes: string | null
    verifiedBy: string | null
    verifiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReceiptCountAggregateOutputType = {
    id: number
    orderId: number
    status: number
    imageUrl: number
    notes: number
    verifiedBy: number
    verifiedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReceiptMinAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    imageUrl?: true
    notes?: true
    verifiedBy?: true
    verifiedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReceiptMaxAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    imageUrl?: true
    notes?: true
    verifiedBy?: true
    verifiedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReceiptCountAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    imageUrl?: true
    notes?: true
    verifiedBy?: true
    verifiedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReceiptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Receipt to aggregate.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Receipts
    **/
    _count?: true | ReceiptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReceiptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReceiptMaxAggregateInputType
  }

  export type GetReceiptAggregateType<T extends ReceiptAggregateArgs> = {
        [P in keyof T & keyof AggregateReceipt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReceipt[P]>
      : GetScalarType<T[P], AggregateReceipt[P]>
  }




  export type ReceiptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReceiptWhereInput
    orderBy?: ReceiptOrderByWithAggregationInput | ReceiptOrderByWithAggregationInput[]
    by: ReceiptScalarFieldEnum[] | ReceiptScalarFieldEnum
    having?: ReceiptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReceiptCountAggregateInputType | true
    _min?: ReceiptMinAggregateInputType
    _max?: ReceiptMaxAggregateInputType
  }

  export type ReceiptGroupByOutputType = {
    id: string
    orderId: string
    status: $Enums.ReceiptStatus
    imageUrl: string | null
    notes: string | null
    verifiedBy: string | null
    verifiedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ReceiptCountAggregateOutputType | null
    _min: ReceiptMinAggregateOutputType | null
    _max: ReceiptMaxAggregateOutputType | null
  }

  type GetReceiptGroupByPayload<T extends ReceiptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReceiptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReceiptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReceiptGroupByOutputType[P]>
            : GetScalarType<T[P], ReceiptGroupByOutputType[P]>
        }
      >
    >


  export type ReceiptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    status?: boolean
    imageUrl?: boolean
    notes?: boolean
    verifiedBy?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    verifier?: boolean | Receipt$verifierArgs<ExtArgs>
  }, ExtArgs["result"]["receipt"]>

  export type ReceiptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    status?: boolean
    imageUrl?: boolean
    notes?: boolean
    verifiedBy?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    verifier?: boolean | Receipt$verifierArgs<ExtArgs>
  }, ExtArgs["result"]["receipt"]>

  export type ReceiptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    status?: boolean
    imageUrl?: boolean
    notes?: boolean
    verifiedBy?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    verifier?: boolean | Receipt$verifierArgs<ExtArgs>
  }, ExtArgs["result"]["receipt"]>

  export type ReceiptSelectScalar = {
    id?: boolean
    orderId?: boolean
    status?: boolean
    imageUrl?: boolean
    notes?: boolean
    verifiedBy?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReceiptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "status" | "imageUrl" | "notes" | "verifiedBy" | "verifiedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["receipt"]>
  export type ReceiptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    verifier?: boolean | Receipt$verifierArgs<ExtArgs>
  }
  export type ReceiptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    verifier?: boolean | Receipt$verifierArgs<ExtArgs>
  }
  export type ReceiptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    verifier?: boolean | Receipt$verifierArgs<ExtArgs>
  }

  export type $ReceiptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Receipt"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      verifier: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      status: $Enums.ReceiptStatus
      imageUrl: string | null
      notes: string | null
      verifiedBy: string | null
      verifiedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["receipt"]>
    composites: {}
  }

  type ReceiptGetPayload<S extends boolean | null | undefined | ReceiptDefaultArgs> = $Result.GetResult<Prisma.$ReceiptPayload, S>

  type ReceiptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReceiptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReceiptCountAggregateInputType | true
    }

  export interface ReceiptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Receipt'], meta: { name: 'Receipt' } }
    /**
     * Find zero or one Receipt that matches the filter.
     * @param {ReceiptFindUniqueArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReceiptFindUniqueArgs>(args: SelectSubset<T, ReceiptFindUniqueArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Receipt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReceiptFindUniqueOrThrowArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReceiptFindUniqueOrThrowArgs>(args: SelectSubset<T, ReceiptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Receipt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptFindFirstArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReceiptFindFirstArgs>(args?: SelectSubset<T, ReceiptFindFirstArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Receipt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptFindFirstOrThrowArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReceiptFindFirstOrThrowArgs>(args?: SelectSubset<T, ReceiptFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Receipts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Receipts
     * const receipts = await prisma.receipt.findMany()
     * 
     * // Get first 10 Receipts
     * const receipts = await prisma.receipt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const receiptWithIdOnly = await prisma.receipt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReceiptFindManyArgs>(args?: SelectSubset<T, ReceiptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Receipt.
     * @param {ReceiptCreateArgs} args - Arguments to create a Receipt.
     * @example
     * // Create one Receipt
     * const Receipt = await prisma.receipt.create({
     *   data: {
     *     // ... data to create a Receipt
     *   }
     * })
     * 
     */
    create<T extends ReceiptCreateArgs>(args: SelectSubset<T, ReceiptCreateArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Receipts.
     * @param {ReceiptCreateManyArgs} args - Arguments to create many Receipts.
     * @example
     * // Create many Receipts
     * const receipt = await prisma.receipt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReceiptCreateManyArgs>(args?: SelectSubset<T, ReceiptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Receipts and returns the data saved in the database.
     * @param {ReceiptCreateManyAndReturnArgs} args - Arguments to create many Receipts.
     * @example
     * // Create many Receipts
     * const receipt = await prisma.receipt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Receipts and only return the `id`
     * const receiptWithIdOnly = await prisma.receipt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReceiptCreateManyAndReturnArgs>(args?: SelectSubset<T, ReceiptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Receipt.
     * @param {ReceiptDeleteArgs} args - Arguments to delete one Receipt.
     * @example
     * // Delete one Receipt
     * const Receipt = await prisma.receipt.delete({
     *   where: {
     *     // ... filter to delete one Receipt
     *   }
     * })
     * 
     */
    delete<T extends ReceiptDeleteArgs>(args: SelectSubset<T, ReceiptDeleteArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Receipt.
     * @param {ReceiptUpdateArgs} args - Arguments to update one Receipt.
     * @example
     * // Update one Receipt
     * const receipt = await prisma.receipt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReceiptUpdateArgs>(args: SelectSubset<T, ReceiptUpdateArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Receipts.
     * @param {ReceiptDeleteManyArgs} args - Arguments to filter Receipts to delete.
     * @example
     * // Delete a few Receipts
     * const { count } = await prisma.receipt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReceiptDeleteManyArgs>(args?: SelectSubset<T, ReceiptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Receipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Receipts
     * const receipt = await prisma.receipt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReceiptUpdateManyArgs>(args: SelectSubset<T, ReceiptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Receipts and returns the data updated in the database.
     * @param {ReceiptUpdateManyAndReturnArgs} args - Arguments to update many Receipts.
     * @example
     * // Update many Receipts
     * const receipt = await prisma.receipt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Receipts and only return the `id`
     * const receiptWithIdOnly = await prisma.receipt.updateManyAndReturn({
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
    updateManyAndReturn<T extends ReceiptUpdateManyAndReturnArgs>(args: SelectSubset<T, ReceiptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Receipt.
     * @param {ReceiptUpsertArgs} args - Arguments to update or create a Receipt.
     * @example
     * // Update or create a Receipt
     * const receipt = await prisma.receipt.upsert({
     *   create: {
     *     // ... data to create a Receipt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Receipt we want to update
     *   }
     * })
     */
    upsert<T extends ReceiptUpsertArgs>(args: SelectSubset<T, ReceiptUpsertArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Receipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptCountArgs} args - Arguments to filter Receipts to count.
     * @example
     * // Count the number of Receipts
     * const count = await prisma.receipt.count({
     *   where: {
     *     // ... the filter for the Receipts we want to count
     *   }
     * })
    **/
    count<T extends ReceiptCountArgs>(
      args?: Subset<T, ReceiptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReceiptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Receipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReceiptAggregateArgs>(args: Subset<T, ReceiptAggregateArgs>): Prisma.PrismaPromise<GetReceiptAggregateType<T>>

    /**
     * Group by Receipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptGroupByArgs} args - Group by arguments.
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
      T extends ReceiptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReceiptGroupByArgs['orderBy'] }
        : { orderBy?: ReceiptGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReceiptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReceiptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Receipt model
   */
  readonly fields: ReceiptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Receipt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReceiptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    verifier<T extends Receipt$verifierArgs<ExtArgs> = {}>(args?: Subset<T, Receipt$verifierArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Receipt model
   */
  interface ReceiptFieldRefs {
    readonly id: FieldRef<"Receipt", 'String'>
    readonly orderId: FieldRef<"Receipt", 'String'>
    readonly status: FieldRef<"Receipt", 'ReceiptStatus'>
    readonly imageUrl: FieldRef<"Receipt", 'String'>
    readonly notes: FieldRef<"Receipt", 'String'>
    readonly verifiedBy: FieldRef<"Receipt", 'String'>
    readonly verifiedAt: FieldRef<"Receipt", 'DateTime'>
    readonly createdAt: FieldRef<"Receipt", 'DateTime'>
    readonly updatedAt: FieldRef<"Receipt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Receipt findUnique
   */
  export type ReceiptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt findUniqueOrThrow
   */
  export type ReceiptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt findFirst
   */
  export type ReceiptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Receipts.
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Receipts.
     */
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Receipt findFirstOrThrow
   */
  export type ReceiptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Receipts.
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Receipts.
     */
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Receipt findMany
   */
  export type ReceiptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipts to fetch.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Receipts.
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Receipt create
   */
  export type ReceiptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * The data needed to create a Receipt.
     */
    data: XOR<ReceiptCreateInput, ReceiptUncheckedCreateInput>
  }

  /**
   * Receipt createMany
   */
  export type ReceiptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Receipts.
     */
    data: ReceiptCreateManyInput | ReceiptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Receipt createManyAndReturn
   */
  export type ReceiptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * The data used to create many Receipts.
     */
    data: ReceiptCreateManyInput | ReceiptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Receipt update
   */
  export type ReceiptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * The data needed to update a Receipt.
     */
    data: XOR<ReceiptUpdateInput, ReceiptUncheckedUpdateInput>
    /**
     * Choose, which Receipt to update.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt updateMany
   */
  export type ReceiptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Receipts.
     */
    data: XOR<ReceiptUpdateManyMutationInput, ReceiptUncheckedUpdateManyInput>
    /**
     * Filter which Receipts to update
     */
    where?: ReceiptWhereInput
    /**
     * Limit how many Receipts to update.
     */
    limit?: number
  }

  /**
   * Receipt updateManyAndReturn
   */
  export type ReceiptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * The data used to update Receipts.
     */
    data: XOR<ReceiptUpdateManyMutationInput, ReceiptUncheckedUpdateManyInput>
    /**
     * Filter which Receipts to update
     */
    where?: ReceiptWhereInput
    /**
     * Limit how many Receipts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Receipt upsert
   */
  export type ReceiptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * The filter to search for the Receipt to update in case it exists.
     */
    where: ReceiptWhereUniqueInput
    /**
     * In case the Receipt found by the `where` argument doesn't exist, create a new Receipt with this data.
     */
    create: XOR<ReceiptCreateInput, ReceiptUncheckedCreateInput>
    /**
     * In case the Receipt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReceiptUpdateInput, ReceiptUncheckedUpdateInput>
  }

  /**
   * Receipt delete
   */
  export type ReceiptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter which Receipt to delete.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt deleteMany
   */
  export type ReceiptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Receipts to delete
     */
    where?: ReceiptWhereInput
    /**
     * Limit how many Receipts to delete.
     */
    limit?: number
  }

  /**
   * Receipt.verifier
   */
  export type Receipt$verifierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Receipt without action
   */
  export type ReceiptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
  }


  /**
   * Model NLCommand
   */

  export type AggregateNLCommand = {
    _count: NLCommandCountAggregateOutputType | null
    _avg: NLCommandAvgAggregateOutputType | null
    _sum: NLCommandSumAggregateOutputType | null
    _min: NLCommandMinAggregateOutputType | null
    _max: NLCommandMaxAggregateOutputType | null
  }

  export type NLCommandAvgAggregateOutputType = {
    confidence: number | null
  }

  export type NLCommandSumAggregateOutputType = {
    confidence: number | null
  }

  export type NLCommandMinAggregateOutputType = {
    id: string | null
    command: string | null
    intent: string | null
    confidence: number | null
    status: $Enums.CommandStatus | null
    executed: boolean | null
    error: string | null
    userId: string | null
    orderId: string | null
    createdAt: Date | null
    executedAt: Date | null
    updatedAt: Date | null
  }

  export type NLCommandMaxAggregateOutputType = {
    id: string | null
    command: string | null
    intent: string | null
    confidence: number | null
    status: $Enums.CommandStatus | null
    executed: boolean | null
    error: string | null
    userId: string | null
    orderId: string | null
    createdAt: Date | null
    executedAt: Date | null
    updatedAt: Date | null
  }

  export type NLCommandCountAggregateOutputType = {
    id: number
    command: number
    intent: number
    parameters: number
    confidence: number
    status: number
    executed: number
    result: number
    error: number
    userId: number
    orderId: number
    createdAt: number
    executedAt: number
    updatedAt: number
    _all: number
  }


  export type NLCommandAvgAggregateInputType = {
    confidence?: true
  }

  export type NLCommandSumAggregateInputType = {
    confidence?: true
  }

  export type NLCommandMinAggregateInputType = {
    id?: true
    command?: true
    intent?: true
    confidence?: true
    status?: true
    executed?: true
    error?: true
    userId?: true
    orderId?: true
    createdAt?: true
    executedAt?: true
    updatedAt?: true
  }

  export type NLCommandMaxAggregateInputType = {
    id?: true
    command?: true
    intent?: true
    confidence?: true
    status?: true
    executed?: true
    error?: true
    userId?: true
    orderId?: true
    createdAt?: true
    executedAt?: true
    updatedAt?: true
  }

  export type NLCommandCountAggregateInputType = {
    id?: true
    command?: true
    intent?: true
    parameters?: true
    confidence?: true
    status?: true
    executed?: true
    result?: true
    error?: true
    userId?: true
    orderId?: true
    createdAt?: true
    executedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NLCommandAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NLCommand to aggregate.
     */
    where?: NLCommandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NLCommands to fetch.
     */
    orderBy?: NLCommandOrderByWithRelationInput | NLCommandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NLCommandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NLCommands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NLCommands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NLCommands
    **/
    _count?: true | NLCommandCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NLCommandAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NLCommandSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NLCommandMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NLCommandMaxAggregateInputType
  }

  export type GetNLCommandAggregateType<T extends NLCommandAggregateArgs> = {
        [P in keyof T & keyof AggregateNLCommand]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNLCommand[P]>
      : GetScalarType<T[P], AggregateNLCommand[P]>
  }




  export type NLCommandGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NLCommandWhereInput
    orderBy?: NLCommandOrderByWithAggregationInput | NLCommandOrderByWithAggregationInput[]
    by: NLCommandScalarFieldEnum[] | NLCommandScalarFieldEnum
    having?: NLCommandScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NLCommandCountAggregateInputType | true
    _avg?: NLCommandAvgAggregateInputType
    _sum?: NLCommandSumAggregateInputType
    _min?: NLCommandMinAggregateInputType
    _max?: NLCommandMaxAggregateInputType
  }

  export type NLCommandGroupByOutputType = {
    id: string
    command: string
    intent: string
    parameters: JsonValue
    confidence: number
    status: $Enums.CommandStatus
    executed: boolean
    result: JsonValue | null
    error: string | null
    userId: string | null
    orderId: string | null
    createdAt: Date
    executedAt: Date | null
    updatedAt: Date
    _count: NLCommandCountAggregateOutputType | null
    _avg: NLCommandAvgAggregateOutputType | null
    _sum: NLCommandSumAggregateOutputType | null
    _min: NLCommandMinAggregateOutputType | null
    _max: NLCommandMaxAggregateOutputType | null
  }

  type GetNLCommandGroupByPayload<T extends NLCommandGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NLCommandGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NLCommandGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NLCommandGroupByOutputType[P]>
            : GetScalarType<T[P], NLCommandGroupByOutputType[P]>
        }
      >
    >


  export type NLCommandSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    command?: boolean
    intent?: boolean
    parameters?: boolean
    confidence?: boolean
    status?: boolean
    executed?: boolean
    result?: boolean
    error?: boolean
    userId?: boolean
    orderId?: boolean
    createdAt?: boolean
    executedAt?: boolean
    updatedAt?: boolean
    user?: boolean | NLCommand$userArgs<ExtArgs>
    order?: boolean | NLCommand$orderArgs<ExtArgs>
  }, ExtArgs["result"]["nLCommand"]>

  export type NLCommandSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    command?: boolean
    intent?: boolean
    parameters?: boolean
    confidence?: boolean
    status?: boolean
    executed?: boolean
    result?: boolean
    error?: boolean
    userId?: boolean
    orderId?: boolean
    createdAt?: boolean
    executedAt?: boolean
    updatedAt?: boolean
    user?: boolean | NLCommand$userArgs<ExtArgs>
    order?: boolean | NLCommand$orderArgs<ExtArgs>
  }, ExtArgs["result"]["nLCommand"]>

  export type NLCommandSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    command?: boolean
    intent?: boolean
    parameters?: boolean
    confidence?: boolean
    status?: boolean
    executed?: boolean
    result?: boolean
    error?: boolean
    userId?: boolean
    orderId?: boolean
    createdAt?: boolean
    executedAt?: boolean
    updatedAt?: boolean
    user?: boolean | NLCommand$userArgs<ExtArgs>
    order?: boolean | NLCommand$orderArgs<ExtArgs>
  }, ExtArgs["result"]["nLCommand"]>

  export type NLCommandSelectScalar = {
    id?: boolean
    command?: boolean
    intent?: boolean
    parameters?: boolean
    confidence?: boolean
    status?: boolean
    executed?: boolean
    result?: boolean
    error?: boolean
    userId?: boolean
    orderId?: boolean
    createdAt?: boolean
    executedAt?: boolean
    updatedAt?: boolean
  }

  export type NLCommandOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "command" | "intent" | "parameters" | "confidence" | "status" | "executed" | "result" | "error" | "userId" | "orderId" | "createdAt" | "executedAt" | "updatedAt", ExtArgs["result"]["nLCommand"]>
  export type NLCommandInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | NLCommand$userArgs<ExtArgs>
    order?: boolean | NLCommand$orderArgs<ExtArgs>
  }
  export type NLCommandIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | NLCommand$userArgs<ExtArgs>
    order?: boolean | NLCommand$orderArgs<ExtArgs>
  }
  export type NLCommandIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | NLCommand$userArgs<ExtArgs>
    order?: boolean | NLCommand$orderArgs<ExtArgs>
  }

  export type $NLCommandPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NLCommand"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      order: Prisma.$OrderPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      command: string
      intent: string
      parameters: Prisma.JsonValue
      confidence: number
      status: $Enums.CommandStatus
      executed: boolean
      result: Prisma.JsonValue | null
      error: string | null
      userId: string | null
      orderId: string | null
      createdAt: Date
      executedAt: Date | null
      updatedAt: Date
    }, ExtArgs["result"]["nLCommand"]>
    composites: {}
  }

  type NLCommandGetPayload<S extends boolean | null | undefined | NLCommandDefaultArgs> = $Result.GetResult<Prisma.$NLCommandPayload, S>

  type NLCommandCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NLCommandFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NLCommandCountAggregateInputType | true
    }

  export interface NLCommandDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NLCommand'], meta: { name: 'NLCommand' } }
    /**
     * Find zero or one NLCommand that matches the filter.
     * @param {NLCommandFindUniqueArgs} args - Arguments to find a NLCommand
     * @example
     * // Get one NLCommand
     * const nLCommand = await prisma.nLCommand.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NLCommandFindUniqueArgs>(args: SelectSubset<T, NLCommandFindUniqueArgs<ExtArgs>>): Prisma__NLCommandClient<$Result.GetResult<Prisma.$NLCommandPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NLCommand that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NLCommandFindUniqueOrThrowArgs} args - Arguments to find a NLCommand
     * @example
     * // Get one NLCommand
     * const nLCommand = await prisma.nLCommand.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NLCommandFindUniqueOrThrowArgs>(args: SelectSubset<T, NLCommandFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NLCommandClient<$Result.GetResult<Prisma.$NLCommandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NLCommand that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NLCommandFindFirstArgs} args - Arguments to find a NLCommand
     * @example
     * // Get one NLCommand
     * const nLCommand = await prisma.nLCommand.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NLCommandFindFirstArgs>(args?: SelectSubset<T, NLCommandFindFirstArgs<ExtArgs>>): Prisma__NLCommandClient<$Result.GetResult<Prisma.$NLCommandPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NLCommand that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NLCommandFindFirstOrThrowArgs} args - Arguments to find a NLCommand
     * @example
     * // Get one NLCommand
     * const nLCommand = await prisma.nLCommand.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NLCommandFindFirstOrThrowArgs>(args?: SelectSubset<T, NLCommandFindFirstOrThrowArgs<ExtArgs>>): Prisma__NLCommandClient<$Result.GetResult<Prisma.$NLCommandPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NLCommands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NLCommandFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NLCommands
     * const nLCommands = await prisma.nLCommand.findMany()
     * 
     * // Get first 10 NLCommands
     * const nLCommands = await prisma.nLCommand.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nLCommandWithIdOnly = await prisma.nLCommand.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NLCommandFindManyArgs>(args?: SelectSubset<T, NLCommandFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NLCommandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NLCommand.
     * @param {NLCommandCreateArgs} args - Arguments to create a NLCommand.
     * @example
     * // Create one NLCommand
     * const NLCommand = await prisma.nLCommand.create({
     *   data: {
     *     // ... data to create a NLCommand
     *   }
     * })
     * 
     */
    create<T extends NLCommandCreateArgs>(args: SelectSubset<T, NLCommandCreateArgs<ExtArgs>>): Prisma__NLCommandClient<$Result.GetResult<Prisma.$NLCommandPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NLCommands.
     * @param {NLCommandCreateManyArgs} args - Arguments to create many NLCommands.
     * @example
     * // Create many NLCommands
     * const nLCommand = await prisma.nLCommand.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NLCommandCreateManyArgs>(args?: SelectSubset<T, NLCommandCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NLCommands and returns the data saved in the database.
     * @param {NLCommandCreateManyAndReturnArgs} args - Arguments to create many NLCommands.
     * @example
     * // Create many NLCommands
     * const nLCommand = await prisma.nLCommand.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NLCommands and only return the `id`
     * const nLCommandWithIdOnly = await prisma.nLCommand.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NLCommandCreateManyAndReturnArgs>(args?: SelectSubset<T, NLCommandCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NLCommandPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NLCommand.
     * @param {NLCommandDeleteArgs} args - Arguments to delete one NLCommand.
     * @example
     * // Delete one NLCommand
     * const NLCommand = await prisma.nLCommand.delete({
     *   where: {
     *     // ... filter to delete one NLCommand
     *   }
     * })
     * 
     */
    delete<T extends NLCommandDeleteArgs>(args: SelectSubset<T, NLCommandDeleteArgs<ExtArgs>>): Prisma__NLCommandClient<$Result.GetResult<Prisma.$NLCommandPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NLCommand.
     * @param {NLCommandUpdateArgs} args - Arguments to update one NLCommand.
     * @example
     * // Update one NLCommand
     * const nLCommand = await prisma.nLCommand.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NLCommandUpdateArgs>(args: SelectSubset<T, NLCommandUpdateArgs<ExtArgs>>): Prisma__NLCommandClient<$Result.GetResult<Prisma.$NLCommandPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NLCommands.
     * @param {NLCommandDeleteManyArgs} args - Arguments to filter NLCommands to delete.
     * @example
     * // Delete a few NLCommands
     * const { count } = await prisma.nLCommand.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NLCommandDeleteManyArgs>(args?: SelectSubset<T, NLCommandDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NLCommands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NLCommandUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NLCommands
     * const nLCommand = await prisma.nLCommand.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NLCommandUpdateManyArgs>(args: SelectSubset<T, NLCommandUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NLCommands and returns the data updated in the database.
     * @param {NLCommandUpdateManyAndReturnArgs} args - Arguments to update many NLCommands.
     * @example
     * // Update many NLCommands
     * const nLCommand = await prisma.nLCommand.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NLCommands and only return the `id`
     * const nLCommandWithIdOnly = await prisma.nLCommand.updateManyAndReturn({
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
    updateManyAndReturn<T extends NLCommandUpdateManyAndReturnArgs>(args: SelectSubset<T, NLCommandUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NLCommandPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NLCommand.
     * @param {NLCommandUpsertArgs} args - Arguments to update or create a NLCommand.
     * @example
     * // Update or create a NLCommand
     * const nLCommand = await prisma.nLCommand.upsert({
     *   create: {
     *     // ... data to create a NLCommand
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NLCommand we want to update
     *   }
     * })
     */
    upsert<T extends NLCommandUpsertArgs>(args: SelectSubset<T, NLCommandUpsertArgs<ExtArgs>>): Prisma__NLCommandClient<$Result.GetResult<Prisma.$NLCommandPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NLCommands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NLCommandCountArgs} args - Arguments to filter NLCommands to count.
     * @example
     * // Count the number of NLCommands
     * const count = await prisma.nLCommand.count({
     *   where: {
     *     // ... the filter for the NLCommands we want to count
     *   }
     * })
    **/
    count<T extends NLCommandCountArgs>(
      args?: Subset<T, NLCommandCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NLCommandCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NLCommand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NLCommandAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NLCommandAggregateArgs>(args: Subset<T, NLCommandAggregateArgs>): Prisma.PrismaPromise<GetNLCommandAggregateType<T>>

    /**
     * Group by NLCommand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NLCommandGroupByArgs} args - Group by arguments.
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
      T extends NLCommandGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NLCommandGroupByArgs['orderBy'] }
        : { orderBy?: NLCommandGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NLCommandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNLCommandGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NLCommand model
   */
  readonly fields: NLCommandFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NLCommand.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NLCommandClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends NLCommand$userArgs<ExtArgs> = {}>(args?: Subset<T, NLCommand$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    order<T extends NLCommand$orderArgs<ExtArgs> = {}>(args?: Subset<T, NLCommand$orderArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the NLCommand model
   */
  interface NLCommandFieldRefs {
    readonly id: FieldRef<"NLCommand", 'String'>
    readonly command: FieldRef<"NLCommand", 'String'>
    readonly intent: FieldRef<"NLCommand", 'String'>
    readonly parameters: FieldRef<"NLCommand", 'Json'>
    readonly confidence: FieldRef<"NLCommand", 'Float'>
    readonly status: FieldRef<"NLCommand", 'CommandStatus'>
    readonly executed: FieldRef<"NLCommand", 'Boolean'>
    readonly result: FieldRef<"NLCommand", 'Json'>
    readonly error: FieldRef<"NLCommand", 'String'>
    readonly userId: FieldRef<"NLCommand", 'String'>
    readonly orderId: FieldRef<"NLCommand", 'String'>
    readonly createdAt: FieldRef<"NLCommand", 'DateTime'>
    readonly executedAt: FieldRef<"NLCommand", 'DateTime'>
    readonly updatedAt: FieldRef<"NLCommand", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NLCommand findUnique
   */
  export type NLCommandFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NLCommand
     */
    select?: NLCommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NLCommand
     */
    omit?: NLCommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NLCommandInclude<ExtArgs> | null
    /**
     * Filter, which NLCommand to fetch.
     */
    where: NLCommandWhereUniqueInput
  }

  /**
   * NLCommand findUniqueOrThrow
   */
  export type NLCommandFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NLCommand
     */
    select?: NLCommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NLCommand
     */
    omit?: NLCommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NLCommandInclude<ExtArgs> | null
    /**
     * Filter, which NLCommand to fetch.
     */
    where: NLCommandWhereUniqueInput
  }

  /**
   * NLCommand findFirst
   */
  export type NLCommandFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NLCommand
     */
    select?: NLCommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NLCommand
     */
    omit?: NLCommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NLCommandInclude<ExtArgs> | null
    /**
     * Filter, which NLCommand to fetch.
     */
    where?: NLCommandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NLCommands to fetch.
     */
    orderBy?: NLCommandOrderByWithRelationInput | NLCommandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NLCommands.
     */
    cursor?: NLCommandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NLCommands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NLCommands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NLCommands.
     */
    distinct?: NLCommandScalarFieldEnum | NLCommandScalarFieldEnum[]
  }

  /**
   * NLCommand findFirstOrThrow
   */
  export type NLCommandFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NLCommand
     */
    select?: NLCommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NLCommand
     */
    omit?: NLCommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NLCommandInclude<ExtArgs> | null
    /**
     * Filter, which NLCommand to fetch.
     */
    where?: NLCommandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NLCommands to fetch.
     */
    orderBy?: NLCommandOrderByWithRelationInput | NLCommandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NLCommands.
     */
    cursor?: NLCommandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NLCommands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NLCommands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NLCommands.
     */
    distinct?: NLCommandScalarFieldEnum | NLCommandScalarFieldEnum[]
  }

  /**
   * NLCommand findMany
   */
  export type NLCommandFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NLCommand
     */
    select?: NLCommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NLCommand
     */
    omit?: NLCommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NLCommandInclude<ExtArgs> | null
    /**
     * Filter, which NLCommands to fetch.
     */
    where?: NLCommandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NLCommands to fetch.
     */
    orderBy?: NLCommandOrderByWithRelationInput | NLCommandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NLCommands.
     */
    cursor?: NLCommandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NLCommands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NLCommands.
     */
    skip?: number
    distinct?: NLCommandScalarFieldEnum | NLCommandScalarFieldEnum[]
  }

  /**
   * NLCommand create
   */
  export type NLCommandCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NLCommand
     */
    select?: NLCommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NLCommand
     */
    omit?: NLCommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NLCommandInclude<ExtArgs> | null
    /**
     * The data needed to create a NLCommand.
     */
    data: XOR<NLCommandCreateInput, NLCommandUncheckedCreateInput>
  }

  /**
   * NLCommand createMany
   */
  export type NLCommandCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NLCommands.
     */
    data: NLCommandCreateManyInput | NLCommandCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NLCommand createManyAndReturn
   */
  export type NLCommandCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NLCommand
     */
    select?: NLCommandSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NLCommand
     */
    omit?: NLCommandOmit<ExtArgs> | null
    /**
     * The data used to create many NLCommands.
     */
    data: NLCommandCreateManyInput | NLCommandCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NLCommandIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NLCommand update
   */
  export type NLCommandUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NLCommand
     */
    select?: NLCommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NLCommand
     */
    omit?: NLCommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NLCommandInclude<ExtArgs> | null
    /**
     * The data needed to update a NLCommand.
     */
    data: XOR<NLCommandUpdateInput, NLCommandUncheckedUpdateInput>
    /**
     * Choose, which NLCommand to update.
     */
    where: NLCommandWhereUniqueInput
  }

  /**
   * NLCommand updateMany
   */
  export type NLCommandUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NLCommands.
     */
    data: XOR<NLCommandUpdateManyMutationInput, NLCommandUncheckedUpdateManyInput>
    /**
     * Filter which NLCommands to update
     */
    where?: NLCommandWhereInput
    /**
     * Limit how many NLCommands to update.
     */
    limit?: number
  }

  /**
   * NLCommand updateManyAndReturn
   */
  export type NLCommandUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NLCommand
     */
    select?: NLCommandSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NLCommand
     */
    omit?: NLCommandOmit<ExtArgs> | null
    /**
     * The data used to update NLCommands.
     */
    data: XOR<NLCommandUpdateManyMutationInput, NLCommandUncheckedUpdateManyInput>
    /**
     * Filter which NLCommands to update
     */
    where?: NLCommandWhereInput
    /**
     * Limit how many NLCommands to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NLCommandIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NLCommand upsert
   */
  export type NLCommandUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NLCommand
     */
    select?: NLCommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NLCommand
     */
    omit?: NLCommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NLCommandInclude<ExtArgs> | null
    /**
     * The filter to search for the NLCommand to update in case it exists.
     */
    where: NLCommandWhereUniqueInput
    /**
     * In case the NLCommand found by the `where` argument doesn't exist, create a new NLCommand with this data.
     */
    create: XOR<NLCommandCreateInput, NLCommandUncheckedCreateInput>
    /**
     * In case the NLCommand was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NLCommandUpdateInput, NLCommandUncheckedUpdateInput>
  }

  /**
   * NLCommand delete
   */
  export type NLCommandDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NLCommand
     */
    select?: NLCommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NLCommand
     */
    omit?: NLCommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NLCommandInclude<ExtArgs> | null
    /**
     * Filter which NLCommand to delete.
     */
    where: NLCommandWhereUniqueInput
  }

  /**
   * NLCommand deleteMany
   */
  export type NLCommandDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NLCommands to delete
     */
    where?: NLCommandWhereInput
    /**
     * Limit how many NLCommands to delete.
     */
    limit?: number
  }

  /**
   * NLCommand.user
   */
  export type NLCommand$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * NLCommand.order
   */
  export type NLCommand$orderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * NLCommand without action
   */
  export type NLCommandDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NLCommand
     */
    select?: NLCommandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NLCommand
     */
    omit?: NLCommandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NLCommandInclude<ExtArgs> | null
  }


  /**
   * Model Intent
   */

  export type AggregateIntent = {
    _count: IntentCountAggregateOutputType | null
    _min: IntentMinAggregateOutputType | null
    _max: IntentMaxAggregateOutputType | null
  }

  export type IntentMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IntentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IntentCountAggregateOutputType = {
    id: number
    name: number
    description: number
    parameters: number
    requiredParameters: number
    examples: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type IntentMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IntentMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IntentCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    parameters?: true
    requiredParameters?: true
    examples?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type IntentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Intent to aggregate.
     */
    where?: IntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Intents to fetch.
     */
    orderBy?: IntentOrderByWithRelationInput | IntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Intents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Intents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Intents
    **/
    _count?: true | IntentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IntentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IntentMaxAggregateInputType
  }

  export type GetIntentAggregateType<T extends IntentAggregateArgs> = {
        [P in keyof T & keyof AggregateIntent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIntent[P]>
      : GetScalarType<T[P], AggregateIntent[P]>
  }




  export type IntentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IntentWhereInput
    orderBy?: IntentOrderByWithAggregationInput | IntentOrderByWithAggregationInput[]
    by: IntentScalarFieldEnum[] | IntentScalarFieldEnum
    having?: IntentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IntentCountAggregateInputType | true
    _min?: IntentMinAggregateInputType
    _max?: IntentMaxAggregateInputType
  }

  export type IntentGroupByOutputType = {
    id: string
    name: string
    description: string
    parameters: JsonValue
    requiredParameters: string[]
    examples: string[]
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: IntentCountAggregateOutputType | null
    _min: IntentMinAggregateOutputType | null
    _max: IntentMaxAggregateOutputType | null
  }

  type GetIntentGroupByPayload<T extends IntentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IntentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IntentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IntentGroupByOutputType[P]>
            : GetScalarType<T[P], IntentGroupByOutputType[P]>
        }
      >
    >


  export type IntentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    parameters?: boolean
    requiredParameters?: boolean
    examples?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["intent"]>

  export type IntentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    parameters?: boolean
    requiredParameters?: boolean
    examples?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["intent"]>

  export type IntentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    parameters?: boolean
    requiredParameters?: boolean
    examples?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["intent"]>

  export type IntentSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    parameters?: boolean
    requiredParameters?: boolean
    examples?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type IntentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "parameters" | "requiredParameters" | "examples" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["intent"]>

  export type $IntentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Intent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      parameters: Prisma.JsonValue
      requiredParameters: string[]
      examples: string[]
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["intent"]>
    composites: {}
  }

  type IntentGetPayload<S extends boolean | null | undefined | IntentDefaultArgs> = $Result.GetResult<Prisma.$IntentPayload, S>

  type IntentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IntentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IntentCountAggregateInputType | true
    }

  export interface IntentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Intent'], meta: { name: 'Intent' } }
    /**
     * Find zero or one Intent that matches the filter.
     * @param {IntentFindUniqueArgs} args - Arguments to find a Intent
     * @example
     * // Get one Intent
     * const intent = await prisma.intent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IntentFindUniqueArgs>(args: SelectSubset<T, IntentFindUniqueArgs<ExtArgs>>): Prisma__IntentClient<$Result.GetResult<Prisma.$IntentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Intent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IntentFindUniqueOrThrowArgs} args - Arguments to find a Intent
     * @example
     * // Get one Intent
     * const intent = await prisma.intent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IntentFindUniqueOrThrowArgs>(args: SelectSubset<T, IntentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IntentClient<$Result.GetResult<Prisma.$IntentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Intent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntentFindFirstArgs} args - Arguments to find a Intent
     * @example
     * // Get one Intent
     * const intent = await prisma.intent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IntentFindFirstArgs>(args?: SelectSubset<T, IntentFindFirstArgs<ExtArgs>>): Prisma__IntentClient<$Result.GetResult<Prisma.$IntentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Intent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntentFindFirstOrThrowArgs} args - Arguments to find a Intent
     * @example
     * // Get one Intent
     * const intent = await prisma.intent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IntentFindFirstOrThrowArgs>(args?: SelectSubset<T, IntentFindFirstOrThrowArgs<ExtArgs>>): Prisma__IntentClient<$Result.GetResult<Prisma.$IntentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Intents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Intents
     * const intents = await prisma.intent.findMany()
     * 
     * // Get first 10 Intents
     * const intents = await prisma.intent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const intentWithIdOnly = await prisma.intent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IntentFindManyArgs>(args?: SelectSubset<T, IntentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Intent.
     * @param {IntentCreateArgs} args - Arguments to create a Intent.
     * @example
     * // Create one Intent
     * const Intent = await prisma.intent.create({
     *   data: {
     *     // ... data to create a Intent
     *   }
     * })
     * 
     */
    create<T extends IntentCreateArgs>(args: SelectSubset<T, IntentCreateArgs<ExtArgs>>): Prisma__IntentClient<$Result.GetResult<Prisma.$IntentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Intents.
     * @param {IntentCreateManyArgs} args - Arguments to create many Intents.
     * @example
     * // Create many Intents
     * const intent = await prisma.intent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IntentCreateManyArgs>(args?: SelectSubset<T, IntentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Intents and returns the data saved in the database.
     * @param {IntentCreateManyAndReturnArgs} args - Arguments to create many Intents.
     * @example
     * // Create many Intents
     * const intent = await prisma.intent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Intents and only return the `id`
     * const intentWithIdOnly = await prisma.intent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IntentCreateManyAndReturnArgs>(args?: SelectSubset<T, IntentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Intent.
     * @param {IntentDeleteArgs} args - Arguments to delete one Intent.
     * @example
     * // Delete one Intent
     * const Intent = await prisma.intent.delete({
     *   where: {
     *     // ... filter to delete one Intent
     *   }
     * })
     * 
     */
    delete<T extends IntentDeleteArgs>(args: SelectSubset<T, IntentDeleteArgs<ExtArgs>>): Prisma__IntentClient<$Result.GetResult<Prisma.$IntentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Intent.
     * @param {IntentUpdateArgs} args - Arguments to update one Intent.
     * @example
     * // Update one Intent
     * const intent = await prisma.intent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IntentUpdateArgs>(args: SelectSubset<T, IntentUpdateArgs<ExtArgs>>): Prisma__IntentClient<$Result.GetResult<Prisma.$IntentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Intents.
     * @param {IntentDeleteManyArgs} args - Arguments to filter Intents to delete.
     * @example
     * // Delete a few Intents
     * const { count } = await prisma.intent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IntentDeleteManyArgs>(args?: SelectSubset<T, IntentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Intents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Intents
     * const intent = await prisma.intent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IntentUpdateManyArgs>(args: SelectSubset<T, IntentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Intents and returns the data updated in the database.
     * @param {IntentUpdateManyAndReturnArgs} args - Arguments to update many Intents.
     * @example
     * // Update many Intents
     * const intent = await prisma.intent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Intents and only return the `id`
     * const intentWithIdOnly = await prisma.intent.updateManyAndReturn({
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
    updateManyAndReturn<T extends IntentUpdateManyAndReturnArgs>(args: SelectSubset<T, IntentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Intent.
     * @param {IntentUpsertArgs} args - Arguments to update or create a Intent.
     * @example
     * // Update or create a Intent
     * const intent = await prisma.intent.upsert({
     *   create: {
     *     // ... data to create a Intent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Intent we want to update
     *   }
     * })
     */
    upsert<T extends IntentUpsertArgs>(args: SelectSubset<T, IntentUpsertArgs<ExtArgs>>): Prisma__IntentClient<$Result.GetResult<Prisma.$IntentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Intents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntentCountArgs} args - Arguments to filter Intents to count.
     * @example
     * // Count the number of Intents
     * const count = await prisma.intent.count({
     *   where: {
     *     // ... the filter for the Intents we want to count
     *   }
     * })
    **/
    count<T extends IntentCountArgs>(
      args?: Subset<T, IntentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IntentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Intent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IntentAggregateArgs>(args: Subset<T, IntentAggregateArgs>): Prisma.PrismaPromise<GetIntentAggregateType<T>>

    /**
     * Group by Intent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntentGroupByArgs} args - Group by arguments.
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
      T extends IntentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IntentGroupByArgs['orderBy'] }
        : { orderBy?: IntentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, IntentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIntentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Intent model
   */
  readonly fields: IntentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Intent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IntentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Intent model
   */
  interface IntentFieldRefs {
    readonly id: FieldRef<"Intent", 'String'>
    readonly name: FieldRef<"Intent", 'String'>
    readonly description: FieldRef<"Intent", 'String'>
    readonly parameters: FieldRef<"Intent", 'Json'>
    readonly requiredParameters: FieldRef<"Intent", 'String[]'>
    readonly examples: FieldRef<"Intent", 'String[]'>
    readonly isActive: FieldRef<"Intent", 'Boolean'>
    readonly createdAt: FieldRef<"Intent", 'DateTime'>
    readonly updatedAt: FieldRef<"Intent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Intent findUnique
   */
  export type IntentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intent
     */
    select?: IntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Intent
     */
    omit?: IntentOmit<ExtArgs> | null
    /**
     * Filter, which Intent to fetch.
     */
    where: IntentWhereUniqueInput
  }

  /**
   * Intent findUniqueOrThrow
   */
  export type IntentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intent
     */
    select?: IntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Intent
     */
    omit?: IntentOmit<ExtArgs> | null
    /**
     * Filter, which Intent to fetch.
     */
    where: IntentWhereUniqueInput
  }

  /**
   * Intent findFirst
   */
  export type IntentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intent
     */
    select?: IntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Intent
     */
    omit?: IntentOmit<ExtArgs> | null
    /**
     * Filter, which Intent to fetch.
     */
    where?: IntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Intents to fetch.
     */
    orderBy?: IntentOrderByWithRelationInput | IntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Intents.
     */
    cursor?: IntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Intents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Intents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Intents.
     */
    distinct?: IntentScalarFieldEnum | IntentScalarFieldEnum[]
  }

  /**
   * Intent findFirstOrThrow
   */
  export type IntentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intent
     */
    select?: IntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Intent
     */
    omit?: IntentOmit<ExtArgs> | null
    /**
     * Filter, which Intent to fetch.
     */
    where?: IntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Intents to fetch.
     */
    orderBy?: IntentOrderByWithRelationInput | IntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Intents.
     */
    cursor?: IntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Intents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Intents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Intents.
     */
    distinct?: IntentScalarFieldEnum | IntentScalarFieldEnum[]
  }

  /**
   * Intent findMany
   */
  export type IntentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intent
     */
    select?: IntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Intent
     */
    omit?: IntentOmit<ExtArgs> | null
    /**
     * Filter, which Intents to fetch.
     */
    where?: IntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Intents to fetch.
     */
    orderBy?: IntentOrderByWithRelationInput | IntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Intents.
     */
    cursor?: IntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Intents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Intents.
     */
    skip?: number
    distinct?: IntentScalarFieldEnum | IntentScalarFieldEnum[]
  }

  /**
   * Intent create
   */
  export type IntentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intent
     */
    select?: IntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Intent
     */
    omit?: IntentOmit<ExtArgs> | null
    /**
     * The data needed to create a Intent.
     */
    data: XOR<IntentCreateInput, IntentUncheckedCreateInput>
  }

  /**
   * Intent createMany
   */
  export type IntentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Intents.
     */
    data: IntentCreateManyInput | IntentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Intent createManyAndReturn
   */
  export type IntentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intent
     */
    select?: IntentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Intent
     */
    omit?: IntentOmit<ExtArgs> | null
    /**
     * The data used to create many Intents.
     */
    data: IntentCreateManyInput | IntentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Intent update
   */
  export type IntentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intent
     */
    select?: IntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Intent
     */
    omit?: IntentOmit<ExtArgs> | null
    /**
     * The data needed to update a Intent.
     */
    data: XOR<IntentUpdateInput, IntentUncheckedUpdateInput>
    /**
     * Choose, which Intent to update.
     */
    where: IntentWhereUniqueInput
  }

  /**
   * Intent updateMany
   */
  export type IntentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Intents.
     */
    data: XOR<IntentUpdateManyMutationInput, IntentUncheckedUpdateManyInput>
    /**
     * Filter which Intents to update
     */
    where?: IntentWhereInput
    /**
     * Limit how many Intents to update.
     */
    limit?: number
  }

  /**
   * Intent updateManyAndReturn
   */
  export type IntentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intent
     */
    select?: IntentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Intent
     */
    omit?: IntentOmit<ExtArgs> | null
    /**
     * The data used to update Intents.
     */
    data: XOR<IntentUpdateManyMutationInput, IntentUncheckedUpdateManyInput>
    /**
     * Filter which Intents to update
     */
    where?: IntentWhereInput
    /**
     * Limit how many Intents to update.
     */
    limit?: number
  }

  /**
   * Intent upsert
   */
  export type IntentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intent
     */
    select?: IntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Intent
     */
    omit?: IntentOmit<ExtArgs> | null
    /**
     * The filter to search for the Intent to update in case it exists.
     */
    where: IntentWhereUniqueInput
    /**
     * In case the Intent found by the `where` argument doesn't exist, create a new Intent with this data.
     */
    create: XOR<IntentCreateInput, IntentUncheckedCreateInput>
    /**
     * In case the Intent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IntentUpdateInput, IntentUncheckedUpdateInput>
  }

  /**
   * Intent delete
   */
  export type IntentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intent
     */
    select?: IntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Intent
     */
    omit?: IntentOmit<ExtArgs> | null
    /**
     * Filter which Intent to delete.
     */
    where: IntentWhereUniqueInput
  }

  /**
   * Intent deleteMany
   */
  export type IntentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Intents to delete
     */
    where?: IntentWhereInput
    /**
     * Limit how many Intents to delete.
     */
    limit?: number
  }

  /**
   * Intent without action
   */
  export type IntentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Intent
     */
    select?: IntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Intent
     */
    omit?: IntentOmit<ExtArgs> | null
  }


  /**
   * Model SystemConfig
   */

  export type AggregateSystemConfig = {
    _count: SystemConfigCountAggregateOutputType | null
    _min: SystemConfigMinAggregateOutputType | null
    _max: SystemConfigMaxAggregateOutputType | null
  }

  export type SystemConfigMinAggregateOutputType = {
    id: string | null
    key: string | null
    description: string | null
    category: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemConfigMaxAggregateOutputType = {
    id: string | null
    key: string | null
    description: string | null
    category: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemConfigCountAggregateOutputType = {
    id: number
    key: number
    value: number
    description: number
    category: number
    isPublic: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SystemConfigMinAggregateInputType = {
    id?: true
    key?: true
    description?: true
    category?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemConfigMaxAggregateInputType = {
    id?: true
    key?: true
    description?: true
    category?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemConfigCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    description?: true
    category?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SystemConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemConfig to aggregate.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemConfigs
    **/
    _count?: true | SystemConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemConfigMaxAggregateInputType
  }

  export type GetSystemConfigAggregateType<T extends SystemConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemConfig[P]>
      : GetScalarType<T[P], AggregateSystemConfig[P]>
  }




  export type SystemConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemConfigWhereInput
    orderBy?: SystemConfigOrderByWithAggregationInput | SystemConfigOrderByWithAggregationInput[]
    by: SystemConfigScalarFieldEnum[] | SystemConfigScalarFieldEnum
    having?: SystemConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemConfigCountAggregateInputType | true
    _min?: SystemConfigMinAggregateInputType
    _max?: SystemConfigMaxAggregateInputType
  }

  export type SystemConfigGroupByOutputType = {
    id: string
    key: string
    value: JsonValue
    description: string | null
    category: string
    isPublic: boolean
    createdAt: Date
    updatedAt: Date
    _count: SystemConfigCountAggregateOutputType | null
    _min: SystemConfigMinAggregateOutputType | null
    _max: SystemConfigMaxAggregateOutputType | null
  }

  type GetSystemConfigGroupByPayload<T extends SystemConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemConfigGroupByOutputType[P]>
            : GetScalarType<T[P], SystemConfigGroupByOutputType[P]>
        }
      >
    >


  export type SystemConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    category?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    category?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    category?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    category?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SystemConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "value" | "description" | "category" | "isPublic" | "createdAt" | "updatedAt", ExtArgs["result"]["systemConfig"]>

  export type $SystemConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: Prisma.JsonValue
      description: string | null
      category: string
      isPublic: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["systemConfig"]>
    composites: {}
  }

  type SystemConfigGetPayload<S extends boolean | null | undefined | SystemConfigDefaultArgs> = $Result.GetResult<Prisma.$SystemConfigPayload, S>

  type SystemConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemConfigCountAggregateInputType | true
    }

  export interface SystemConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemConfig'], meta: { name: 'SystemConfig' } }
    /**
     * Find zero or one SystemConfig that matches the filter.
     * @param {SystemConfigFindUniqueArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemConfigFindUniqueArgs>(args: SelectSubset<T, SystemConfigFindUniqueArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemConfigFindUniqueOrThrowArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindFirstArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemConfigFindFirstArgs>(args?: SelectSubset<T, SystemConfigFindFirstArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindFirstOrThrowArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemConfigs
     * const systemConfigs = await prisma.systemConfig.findMany()
     * 
     * // Get first 10 SystemConfigs
     * const systemConfigs = await prisma.systemConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemConfigFindManyArgs>(args?: SelectSubset<T, SystemConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemConfig.
     * @param {SystemConfigCreateArgs} args - Arguments to create a SystemConfig.
     * @example
     * // Create one SystemConfig
     * const SystemConfig = await prisma.systemConfig.create({
     *   data: {
     *     // ... data to create a SystemConfig
     *   }
     * })
     * 
     */
    create<T extends SystemConfigCreateArgs>(args: SelectSubset<T, SystemConfigCreateArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemConfigs.
     * @param {SystemConfigCreateManyArgs} args - Arguments to create many SystemConfigs.
     * @example
     * // Create many SystemConfigs
     * const systemConfig = await prisma.systemConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemConfigCreateManyArgs>(args?: SelectSubset<T, SystemConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemConfigs and returns the data saved in the database.
     * @param {SystemConfigCreateManyAndReturnArgs} args - Arguments to create many SystemConfigs.
     * @example
     * // Create many SystemConfigs
     * const systemConfig = await prisma.systemConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemConfigs and only return the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SystemConfig.
     * @param {SystemConfigDeleteArgs} args - Arguments to delete one SystemConfig.
     * @example
     * // Delete one SystemConfig
     * const SystemConfig = await prisma.systemConfig.delete({
     *   where: {
     *     // ... filter to delete one SystemConfig
     *   }
     * })
     * 
     */
    delete<T extends SystemConfigDeleteArgs>(args: SelectSubset<T, SystemConfigDeleteArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemConfig.
     * @param {SystemConfigUpdateArgs} args - Arguments to update one SystemConfig.
     * @example
     * // Update one SystemConfig
     * const systemConfig = await prisma.systemConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemConfigUpdateArgs>(args: SelectSubset<T, SystemConfigUpdateArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemConfigs.
     * @param {SystemConfigDeleteManyArgs} args - Arguments to filter SystemConfigs to delete.
     * @example
     * // Delete a few SystemConfigs
     * const { count } = await prisma.systemConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemConfigDeleteManyArgs>(args?: SelectSubset<T, SystemConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemConfigs
     * const systemConfig = await prisma.systemConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemConfigUpdateManyArgs>(args: SelectSubset<T, SystemConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemConfigs and returns the data updated in the database.
     * @param {SystemConfigUpdateManyAndReturnArgs} args - Arguments to update many SystemConfigs.
     * @example
     * // Update many SystemConfigs
     * const systemConfig = await prisma.systemConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SystemConfigs and only return the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends SystemConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, SystemConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SystemConfig.
     * @param {SystemConfigUpsertArgs} args - Arguments to update or create a SystemConfig.
     * @example
     * // Update or create a SystemConfig
     * const systemConfig = await prisma.systemConfig.upsert({
     *   create: {
     *     // ... data to create a SystemConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemConfig we want to update
     *   }
     * })
     */
    upsert<T extends SystemConfigUpsertArgs>(args: SelectSubset<T, SystemConfigUpsertArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigCountArgs} args - Arguments to filter SystemConfigs to count.
     * @example
     * // Count the number of SystemConfigs
     * const count = await prisma.systemConfig.count({
     *   where: {
     *     // ... the filter for the SystemConfigs we want to count
     *   }
     * })
    **/
    count<T extends SystemConfigCountArgs>(
      args?: Subset<T, SystemConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SystemConfigAggregateArgs>(args: Subset<T, SystemConfigAggregateArgs>): Prisma.PrismaPromise<GetSystemConfigAggregateType<T>>

    /**
     * Group by SystemConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigGroupByArgs} args - Group by arguments.
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
      T extends SystemConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemConfigGroupByArgs['orderBy'] }
        : { orderBy?: SystemConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SystemConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemConfig model
   */
  readonly fields: SystemConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SystemConfig model
   */
  interface SystemConfigFieldRefs {
    readonly id: FieldRef<"SystemConfig", 'String'>
    readonly key: FieldRef<"SystemConfig", 'String'>
    readonly value: FieldRef<"SystemConfig", 'Json'>
    readonly description: FieldRef<"SystemConfig", 'String'>
    readonly category: FieldRef<"SystemConfig", 'String'>
    readonly isPublic: FieldRef<"SystemConfig", 'Boolean'>
    readonly createdAt: FieldRef<"SystemConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"SystemConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemConfig findUnique
   */
  export type SystemConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig findUniqueOrThrow
   */
  export type SystemConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig findFirst
   */
  export type SystemConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemConfigs.
     */
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig findFirstOrThrow
   */
  export type SystemConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemConfigs.
     */
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig findMany
   */
  export type SystemConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfigs to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig create
   */
  export type SystemConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemConfig.
     */
    data: XOR<SystemConfigCreateInput, SystemConfigUncheckedCreateInput>
  }

  /**
   * SystemConfig createMany
   */
  export type SystemConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemConfigs.
     */
    data: SystemConfigCreateManyInput | SystemConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemConfig createManyAndReturn
   */
  export type SystemConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data used to create many SystemConfigs.
     */
    data: SystemConfigCreateManyInput | SystemConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemConfig update
   */
  export type SystemConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemConfig.
     */
    data: XOR<SystemConfigUpdateInput, SystemConfigUncheckedUpdateInput>
    /**
     * Choose, which SystemConfig to update.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig updateMany
   */
  export type SystemConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemConfigs.
     */
    data: XOR<SystemConfigUpdateManyMutationInput, SystemConfigUncheckedUpdateManyInput>
    /**
     * Filter which SystemConfigs to update
     */
    where?: SystemConfigWhereInput
    /**
     * Limit how many SystemConfigs to update.
     */
    limit?: number
  }

  /**
   * SystemConfig updateManyAndReturn
   */
  export type SystemConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data used to update SystemConfigs.
     */
    data: XOR<SystemConfigUpdateManyMutationInput, SystemConfigUncheckedUpdateManyInput>
    /**
     * Filter which SystemConfigs to update
     */
    where?: SystemConfigWhereInput
    /**
     * Limit how many SystemConfigs to update.
     */
    limit?: number
  }

  /**
   * SystemConfig upsert
   */
  export type SystemConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemConfig to update in case it exists.
     */
    where: SystemConfigWhereUniqueInput
    /**
     * In case the SystemConfig found by the `where` argument doesn't exist, create a new SystemConfig with this data.
     */
    create: XOR<SystemConfigCreateInput, SystemConfigUncheckedCreateInput>
    /**
     * In case the SystemConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemConfigUpdateInput, SystemConfigUncheckedUpdateInput>
  }

  /**
   * SystemConfig delete
   */
  export type SystemConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter which SystemConfig to delete.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig deleteMany
   */
  export type SystemConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemConfigs to delete
     */
    where?: SystemConfigWhereInput
    /**
     * Limit how many SystemConfigs to delete.
     */
    limit?: number
  }

  /**
   * SystemConfig without action
   */
  export type SystemConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    userId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    userId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    action: number
    entity: number
    entityId: number
    userId: number
    oldValues: number
    newValues: number
    ipAddress: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    action?: true
    entity?: true
    entityId?: true
    userId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    action?: true
    entity?: true
    entityId?: true
    userId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    action?: true
    entity?: true
    entityId?: true
    userId?: true
    oldValues?: true
    newValues?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    action: string
    entity: string
    entityId: string
    userId: string | null
    oldValues: JsonValue | null
    newValues: JsonValue | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    userId?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    userId?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    userId?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    userId?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "action" | "entity" | "entityId" | "userId" | "oldValues" | "newValues" | "ipAddress" | "userAgent" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: string
      entity: string
      entityId: string
      userId: string | null
      oldValues: Prisma.JsonValue | null
      newValues: Prisma.JsonValue | null
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entity: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly oldValues: FieldRef<"AuditLog", 'Json'>
    readonly newValues: FieldRef<"AuditLog", 'Json'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
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
    name: 'name',
    role: 'role',
    avatar: 'avatar',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    contactPerson: 'contactPerson',
    phone: 'phone',
    email: 'email',
    address: 'address',
    company: 'company',
    creditLimit: 'creditLimit',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    orderNumber: 'orderNumber',
    customerId: 'customerId',
    status: 'status',
    origin: 'origin',
    destination: 'destination',
    weight: 'weight',
    volume: 'volume',
    value: 'value',
    pickupTime: 'pickupTime',
    deliveryTime: 'deliveryTime',
    specialInstructions: 'specialInstructions',
    assignedVehicleId: 'assignedVehicleId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const VehicleScalarFieldEnum: {
    id: 'id',
    licensePlate: 'licensePlate',
    type: 'type',
    capacity: 'capacity',
    driverId: 'driverId',
    status: 'status',
    currentLocation: 'currentLocation',
    lastMaintenance: 'lastMaintenance',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum]


  export const ScheduleScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    vehicleId: 'vehicleId',
    plannedDeparture: 'plannedDeparture',
    plannedArrival: 'plannedArrival',
    actualDeparture: 'actualDeparture',
    actualArrival: 'actualArrival',
    status: 'status',
    route: 'route',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ScheduleScalarFieldEnum = (typeof ScheduleScalarFieldEnum)[keyof typeof ScheduleScalarFieldEnum]


  export const TrackingScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    location: 'location',
    coordinates: 'coordinates',
    status: 'status',
    timestamp: 'timestamp',
    notes: 'notes',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TrackingScalarFieldEnum = (typeof TrackingScalarFieldEnum)[keyof typeof TrackingScalarFieldEnum]


  export const ReceiptScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    status: 'status',
    imageUrl: 'imageUrl',
    notes: 'notes',
    verifiedBy: 'verifiedBy',
    verifiedAt: 'verifiedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReceiptScalarFieldEnum = (typeof ReceiptScalarFieldEnum)[keyof typeof ReceiptScalarFieldEnum]


  export const NLCommandScalarFieldEnum: {
    id: 'id',
    command: 'command',
    intent: 'intent',
    parameters: 'parameters',
    confidence: 'confidence',
    status: 'status',
    executed: 'executed',
    result: 'result',
    error: 'error',
    userId: 'userId',
    orderId: 'orderId',
    createdAt: 'createdAt',
    executedAt: 'executedAt',
    updatedAt: 'updatedAt'
  };

  export type NLCommandScalarFieldEnum = (typeof NLCommandScalarFieldEnum)[keyof typeof NLCommandScalarFieldEnum]


  export const IntentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    parameters: 'parameters',
    requiredParameters: 'requiredParameters',
    examples: 'examples',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type IntentScalarFieldEnum = (typeof IntentScalarFieldEnum)[keyof typeof IntentScalarFieldEnum]


  export const SystemConfigScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    description: 'description',
    category: 'category',
    isPublic: 'isPublic',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SystemConfigScalarFieldEnum = (typeof SystemConfigScalarFieldEnum)[keyof typeof SystemConfigScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    userId: 'userId',
    oldValues: 'oldValues',
    newValues: 'newValues',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'VehicleType'
   */
  export type EnumVehicleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleType'>
    


  /**
   * Reference to a field of type 'VehicleType[]'
   */
  export type ListEnumVehicleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleType[]'>
    


  /**
   * Reference to a field of type 'VehicleStatus'
   */
  export type EnumVehicleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleStatus'>
    


  /**
   * Reference to a field of type 'VehicleStatus[]'
   */
  export type ListEnumVehicleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleStatus[]'>
    


  /**
   * Reference to a field of type 'ScheduleStatus'
   */
  export type EnumScheduleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScheduleStatus'>
    


  /**
   * Reference to a field of type 'ScheduleStatus[]'
   */
  export type ListEnumScheduleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScheduleStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'TrackingStatus'
   */
  export type EnumTrackingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TrackingStatus'>
    


  /**
   * Reference to a field of type 'TrackingStatus[]'
   */
  export type ListEnumTrackingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TrackingStatus[]'>
    


  /**
   * Reference to a field of type 'ReceiptStatus'
   */
  export type EnumReceiptStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReceiptStatus'>
    


  /**
   * Reference to a field of type 'ReceiptStatus[]'
   */
  export type ListEnumReceiptStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReceiptStatus[]'>
    


  /**
   * Reference to a field of type 'CommandStatus'
   */
  export type EnumCommandStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommandStatus'>
    


  /**
   * Reference to a field of type 'CommandStatus[]'
   */
  export type ListEnumCommandStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommandStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    vehicles?: VehicleListRelationFilter
    receipts?: ReceiptListRelationFilter
    nlCommands?: NLCommandListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vehicles?: VehicleOrderByRelationAggregateInput
    receipts?: ReceiptOrderByRelationAggregateInput
    nlCommands?: NLCommandOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    vehicles?: VehicleListRelationFilter
    receipts?: ReceiptListRelationFilter
    nlCommands?: NLCommandListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: UuidFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    contactPerson?: StringFilter<"Customer"> | string
    phone?: StringFilter<"Customer"> | string
    email?: StringFilter<"Customer"> | string
    address?: StringFilter<"Customer"> | string
    company?: StringFilter<"Customer"> | string
    creditLimit?: FloatNullableFilter<"Customer"> | number | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    orders?: OrderListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    contactPerson?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    company?: SortOrder
    creditLimit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    orders?: OrderOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    name?: StringFilter<"Customer"> | string
    contactPerson?: StringFilter<"Customer"> | string
    phone?: StringFilter<"Customer"> | string
    email?: StringFilter<"Customer"> | string
    address?: StringFilter<"Customer"> | string
    company?: StringFilter<"Customer"> | string
    creditLimit?: FloatNullableFilter<"Customer"> | number | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    orders?: OrderListRelationFilter
  }, "id">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    contactPerson?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    company?: SortOrder
    creditLimit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _avg?: CustomerAvgOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
    _sum?: CustomerSumOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Customer"> | string
    name?: StringWithAggregatesFilter<"Customer"> | string
    contactPerson?: StringWithAggregatesFilter<"Customer"> | string
    phone?: StringWithAggregatesFilter<"Customer"> | string
    email?: StringWithAggregatesFilter<"Customer"> | string
    address?: StringWithAggregatesFilter<"Customer"> | string
    company?: StringWithAggregatesFilter<"Customer"> | string
    creditLimit?: FloatNullableWithAggregatesFilter<"Customer"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: UuidFilter<"Order"> | string
    orderNumber?: StringFilter<"Order"> | string
    customerId?: UuidFilter<"Order"> | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    origin?: StringFilter<"Order"> | string
    destination?: StringFilter<"Order"> | string
    weight?: FloatFilter<"Order"> | number
    volume?: FloatFilter<"Order"> | number
    value?: FloatNullableFilter<"Order"> | number | null
    pickupTime?: DateTimeFilter<"Order"> | Date | string
    deliveryTime?: DateTimeFilter<"Order"> | Date | string
    specialInstructions?: StringNullableFilter<"Order"> | string | null
    assignedVehicleId?: UuidNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    assignedVehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
    schedules?: ScheduleListRelationFilter
    trackings?: TrackingListRelationFilter
    receipts?: ReceiptListRelationFilter
    nlCommands?: NLCommandListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    weight?: SortOrder
    volume?: SortOrder
    value?: SortOrderInput | SortOrder
    pickupTime?: SortOrder
    deliveryTime?: SortOrder
    specialInstructions?: SortOrderInput | SortOrder
    assignedVehicleId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    assignedVehicle?: VehicleOrderByWithRelationInput
    schedules?: ScheduleOrderByRelationAggregateInput
    trackings?: TrackingOrderByRelationAggregateInput
    receipts?: ReceiptOrderByRelationAggregateInput
    nlCommands?: NLCommandOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderNumber?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    customerId?: UuidFilter<"Order"> | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    origin?: StringFilter<"Order"> | string
    destination?: StringFilter<"Order"> | string
    weight?: FloatFilter<"Order"> | number
    volume?: FloatFilter<"Order"> | number
    value?: FloatNullableFilter<"Order"> | number | null
    pickupTime?: DateTimeFilter<"Order"> | Date | string
    deliveryTime?: DateTimeFilter<"Order"> | Date | string
    specialInstructions?: StringNullableFilter<"Order"> | string | null
    assignedVehicleId?: UuidNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    assignedVehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
    schedules?: ScheduleListRelationFilter
    trackings?: TrackingListRelationFilter
    receipts?: ReceiptListRelationFilter
    nlCommands?: NLCommandListRelationFilter
  }, "id" | "orderNumber">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    weight?: SortOrder
    volume?: SortOrder
    value?: SortOrderInput | SortOrder
    pickupTime?: SortOrder
    deliveryTime?: SortOrder
    specialInstructions?: SortOrderInput | SortOrder
    assignedVehicleId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    id?: UuidWithAggregatesFilter<"Order"> | string
    orderNumber?: StringWithAggregatesFilter<"Order"> | string
    customerId?: UuidWithAggregatesFilter<"Order"> | string
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    origin?: StringWithAggregatesFilter<"Order"> | string
    destination?: StringWithAggregatesFilter<"Order"> | string
    weight?: FloatWithAggregatesFilter<"Order"> | number
    volume?: FloatWithAggregatesFilter<"Order"> | number
    value?: FloatNullableWithAggregatesFilter<"Order"> | number | null
    pickupTime?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    deliveryTime?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    specialInstructions?: StringNullableWithAggregatesFilter<"Order"> | string | null
    assignedVehicleId?: UuidNullableWithAggregatesFilter<"Order"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type VehicleWhereInput = {
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    id?: UuidFilter<"Vehicle"> | string
    licensePlate?: StringFilter<"Vehicle"> | string
    type?: EnumVehicleTypeFilter<"Vehicle"> | $Enums.VehicleType
    capacity?: FloatFilter<"Vehicle"> | number
    driverId?: UuidFilter<"Vehicle"> | string
    status?: EnumVehicleStatusFilter<"Vehicle"> | $Enums.VehicleStatus
    currentLocation?: StringNullableFilter<"Vehicle"> | string | null
    lastMaintenance?: DateTimeNullableFilter<"Vehicle"> | Date | string | null
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    driver?: XOR<UserScalarRelationFilter, UserWhereInput>
    schedules?: ScheduleListRelationFilter
    orders?: OrderListRelationFilter
  }

  export type VehicleOrderByWithRelationInput = {
    id?: SortOrder
    licensePlate?: SortOrder
    type?: SortOrder
    capacity?: SortOrder
    driverId?: SortOrder
    status?: SortOrder
    currentLocation?: SortOrderInput | SortOrder
    lastMaintenance?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    driver?: UserOrderByWithRelationInput
    schedules?: ScheduleOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
  }

  export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    licensePlate?: string
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    type?: EnumVehicleTypeFilter<"Vehicle"> | $Enums.VehicleType
    capacity?: FloatFilter<"Vehicle"> | number
    driverId?: UuidFilter<"Vehicle"> | string
    status?: EnumVehicleStatusFilter<"Vehicle"> | $Enums.VehicleStatus
    currentLocation?: StringNullableFilter<"Vehicle"> | string | null
    lastMaintenance?: DateTimeNullableFilter<"Vehicle"> | Date | string | null
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    driver?: XOR<UserScalarRelationFilter, UserWhereInput>
    schedules?: ScheduleListRelationFilter
    orders?: OrderListRelationFilter
  }, "id" | "licensePlate">

  export type VehicleOrderByWithAggregationInput = {
    id?: SortOrder
    licensePlate?: SortOrder
    type?: SortOrder
    capacity?: SortOrder
    driverId?: SortOrder
    status?: SortOrder
    currentLocation?: SortOrderInput | SortOrder
    lastMaintenance?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VehicleCountOrderByAggregateInput
    _avg?: VehicleAvgOrderByAggregateInput
    _max?: VehicleMaxOrderByAggregateInput
    _min?: VehicleMinOrderByAggregateInput
    _sum?: VehicleSumOrderByAggregateInput
  }

  export type VehicleScalarWhereWithAggregatesInput = {
    AND?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    OR?: VehicleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Vehicle"> | string
    licensePlate?: StringWithAggregatesFilter<"Vehicle"> | string
    type?: EnumVehicleTypeWithAggregatesFilter<"Vehicle"> | $Enums.VehicleType
    capacity?: FloatWithAggregatesFilter<"Vehicle"> | number
    driverId?: UuidWithAggregatesFilter<"Vehicle"> | string
    status?: EnumVehicleStatusWithAggregatesFilter<"Vehicle"> | $Enums.VehicleStatus
    currentLocation?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    lastMaintenance?: DateTimeNullableWithAggregatesFilter<"Vehicle"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
  }

  export type ScheduleWhereInput = {
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    id?: UuidFilter<"Schedule"> | string
    orderId?: UuidFilter<"Schedule"> | string
    vehicleId?: UuidFilter<"Schedule"> | string
    plannedDeparture?: DateTimeFilter<"Schedule"> | Date | string
    plannedArrival?: DateTimeFilter<"Schedule"> | Date | string
    actualDeparture?: DateTimeNullableFilter<"Schedule"> | Date | string | null
    actualArrival?: DateTimeNullableFilter<"Schedule"> | Date | string | null
    status?: EnumScheduleStatusFilter<"Schedule"> | $Enums.ScheduleStatus
    route?: StringNullableListFilter<"Schedule">
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
    updatedAt?: DateTimeFilter<"Schedule"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }

  export type ScheduleOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    vehicleId?: SortOrder
    plannedDeparture?: SortOrder
    plannedArrival?: SortOrder
    actualDeparture?: SortOrderInput | SortOrder
    actualArrival?: SortOrderInput | SortOrder
    status?: SortOrder
    route?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    vehicle?: VehicleOrderByWithRelationInput
  }

  export type ScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    orderId?: UuidFilter<"Schedule"> | string
    vehicleId?: UuidFilter<"Schedule"> | string
    plannedDeparture?: DateTimeFilter<"Schedule"> | Date | string
    plannedArrival?: DateTimeFilter<"Schedule"> | Date | string
    actualDeparture?: DateTimeNullableFilter<"Schedule"> | Date | string | null
    actualArrival?: DateTimeNullableFilter<"Schedule"> | Date | string | null
    status?: EnumScheduleStatusFilter<"Schedule"> | $Enums.ScheduleStatus
    route?: StringNullableListFilter<"Schedule">
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
    updatedAt?: DateTimeFilter<"Schedule"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }, "id">

  export type ScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    vehicleId?: SortOrder
    plannedDeparture?: SortOrder
    plannedArrival?: SortOrder
    actualDeparture?: SortOrderInput | SortOrder
    actualArrival?: SortOrderInput | SortOrder
    status?: SortOrder
    route?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ScheduleCountOrderByAggregateInput
    _max?: ScheduleMaxOrderByAggregateInput
    _min?: ScheduleMinOrderByAggregateInput
  }

  export type ScheduleScalarWhereWithAggregatesInput = {
    AND?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    OR?: ScheduleScalarWhereWithAggregatesInput[]
    NOT?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Schedule"> | string
    orderId?: UuidWithAggregatesFilter<"Schedule"> | string
    vehicleId?: UuidWithAggregatesFilter<"Schedule"> | string
    plannedDeparture?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
    plannedArrival?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
    actualDeparture?: DateTimeNullableWithAggregatesFilter<"Schedule"> | Date | string | null
    actualArrival?: DateTimeNullableWithAggregatesFilter<"Schedule"> | Date | string | null
    status?: EnumScheduleStatusWithAggregatesFilter<"Schedule"> | $Enums.ScheduleStatus
    route?: StringNullableListFilter<"Schedule">
    createdAt?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
  }

  export type TrackingWhereInput = {
    AND?: TrackingWhereInput | TrackingWhereInput[]
    OR?: TrackingWhereInput[]
    NOT?: TrackingWhereInput | TrackingWhereInput[]
    id?: UuidFilter<"Tracking"> | string
    orderId?: UuidFilter<"Tracking"> | string
    location?: StringFilter<"Tracking"> | string
    coordinates?: JsonFilter<"Tracking">
    status?: EnumTrackingStatusFilter<"Tracking"> | $Enums.TrackingStatus
    timestamp?: DateTimeFilter<"Tracking"> | Date | string
    notes?: StringNullableFilter<"Tracking"> | string | null
    imageUrl?: StringNullableFilter<"Tracking"> | string | null
    createdAt?: DateTimeFilter<"Tracking"> | Date | string
    updatedAt?: DateTimeFilter<"Tracking"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type TrackingOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    location?: SortOrder
    coordinates?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    notes?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type TrackingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrackingWhereInput | TrackingWhereInput[]
    OR?: TrackingWhereInput[]
    NOT?: TrackingWhereInput | TrackingWhereInput[]
    orderId?: UuidFilter<"Tracking"> | string
    location?: StringFilter<"Tracking"> | string
    coordinates?: JsonFilter<"Tracking">
    status?: EnumTrackingStatusFilter<"Tracking"> | $Enums.TrackingStatus
    timestamp?: DateTimeFilter<"Tracking"> | Date | string
    notes?: StringNullableFilter<"Tracking"> | string | null
    imageUrl?: StringNullableFilter<"Tracking"> | string | null
    createdAt?: DateTimeFilter<"Tracking"> | Date | string
    updatedAt?: DateTimeFilter<"Tracking"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id">

  export type TrackingOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    location?: SortOrder
    coordinates?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    notes?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TrackingCountOrderByAggregateInput
    _max?: TrackingMaxOrderByAggregateInput
    _min?: TrackingMinOrderByAggregateInput
  }

  export type TrackingScalarWhereWithAggregatesInput = {
    AND?: TrackingScalarWhereWithAggregatesInput | TrackingScalarWhereWithAggregatesInput[]
    OR?: TrackingScalarWhereWithAggregatesInput[]
    NOT?: TrackingScalarWhereWithAggregatesInput | TrackingScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Tracking"> | string
    orderId?: UuidWithAggregatesFilter<"Tracking"> | string
    location?: StringWithAggregatesFilter<"Tracking"> | string
    coordinates?: JsonWithAggregatesFilter<"Tracking">
    status?: EnumTrackingStatusWithAggregatesFilter<"Tracking"> | $Enums.TrackingStatus
    timestamp?: DateTimeWithAggregatesFilter<"Tracking"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"Tracking"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Tracking"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tracking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tracking"> | Date | string
  }

  export type ReceiptWhereInput = {
    AND?: ReceiptWhereInput | ReceiptWhereInput[]
    OR?: ReceiptWhereInput[]
    NOT?: ReceiptWhereInput | ReceiptWhereInput[]
    id?: UuidFilter<"Receipt"> | string
    orderId?: UuidFilter<"Receipt"> | string
    status?: EnumReceiptStatusFilter<"Receipt"> | $Enums.ReceiptStatus
    imageUrl?: StringNullableFilter<"Receipt"> | string | null
    notes?: StringNullableFilter<"Receipt"> | string | null
    verifiedBy?: UuidNullableFilter<"Receipt"> | string | null
    verifiedAt?: DateTimeNullableFilter<"Receipt"> | Date | string | null
    createdAt?: DateTimeFilter<"Receipt"> | Date | string
    updatedAt?: DateTimeFilter<"Receipt"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    verifier?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ReceiptOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    verifiedBy?: SortOrderInput | SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    verifier?: UserOrderByWithRelationInput
  }

  export type ReceiptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReceiptWhereInput | ReceiptWhereInput[]
    OR?: ReceiptWhereInput[]
    NOT?: ReceiptWhereInput | ReceiptWhereInput[]
    orderId?: UuidFilter<"Receipt"> | string
    status?: EnumReceiptStatusFilter<"Receipt"> | $Enums.ReceiptStatus
    imageUrl?: StringNullableFilter<"Receipt"> | string | null
    notes?: StringNullableFilter<"Receipt"> | string | null
    verifiedBy?: UuidNullableFilter<"Receipt"> | string | null
    verifiedAt?: DateTimeNullableFilter<"Receipt"> | Date | string | null
    createdAt?: DateTimeFilter<"Receipt"> | Date | string
    updatedAt?: DateTimeFilter<"Receipt"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    verifier?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ReceiptOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    verifiedBy?: SortOrderInput | SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReceiptCountOrderByAggregateInput
    _max?: ReceiptMaxOrderByAggregateInput
    _min?: ReceiptMinOrderByAggregateInput
  }

  export type ReceiptScalarWhereWithAggregatesInput = {
    AND?: ReceiptScalarWhereWithAggregatesInput | ReceiptScalarWhereWithAggregatesInput[]
    OR?: ReceiptScalarWhereWithAggregatesInput[]
    NOT?: ReceiptScalarWhereWithAggregatesInput | ReceiptScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Receipt"> | string
    orderId?: UuidWithAggregatesFilter<"Receipt"> | string
    status?: EnumReceiptStatusWithAggregatesFilter<"Receipt"> | $Enums.ReceiptStatus
    imageUrl?: StringNullableWithAggregatesFilter<"Receipt"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Receipt"> | string | null
    verifiedBy?: UuidNullableWithAggregatesFilter<"Receipt"> | string | null
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"Receipt"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Receipt"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Receipt"> | Date | string
  }

  export type NLCommandWhereInput = {
    AND?: NLCommandWhereInput | NLCommandWhereInput[]
    OR?: NLCommandWhereInput[]
    NOT?: NLCommandWhereInput | NLCommandWhereInput[]
    id?: UuidFilter<"NLCommand"> | string
    command?: StringFilter<"NLCommand"> | string
    intent?: StringFilter<"NLCommand"> | string
    parameters?: JsonFilter<"NLCommand">
    confidence?: FloatFilter<"NLCommand"> | number
    status?: EnumCommandStatusFilter<"NLCommand"> | $Enums.CommandStatus
    executed?: BoolFilter<"NLCommand"> | boolean
    result?: JsonNullableFilter<"NLCommand">
    error?: StringNullableFilter<"NLCommand"> | string | null
    userId?: UuidNullableFilter<"NLCommand"> | string | null
    orderId?: UuidNullableFilter<"NLCommand"> | string | null
    createdAt?: DateTimeFilter<"NLCommand"> | Date | string
    executedAt?: DateTimeNullableFilter<"NLCommand"> | Date | string | null
    updatedAt?: DateTimeFilter<"NLCommand"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    order?: XOR<OrderNullableScalarRelationFilter, OrderWhereInput> | null
  }

  export type NLCommandOrderByWithRelationInput = {
    id?: SortOrder
    command?: SortOrder
    intent?: SortOrder
    parameters?: SortOrder
    confidence?: SortOrder
    status?: SortOrder
    executed?: SortOrder
    result?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    orderId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    executedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    order?: OrderOrderByWithRelationInput
  }

  export type NLCommandWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NLCommandWhereInput | NLCommandWhereInput[]
    OR?: NLCommandWhereInput[]
    NOT?: NLCommandWhereInput | NLCommandWhereInput[]
    command?: StringFilter<"NLCommand"> | string
    intent?: StringFilter<"NLCommand"> | string
    parameters?: JsonFilter<"NLCommand">
    confidence?: FloatFilter<"NLCommand"> | number
    status?: EnumCommandStatusFilter<"NLCommand"> | $Enums.CommandStatus
    executed?: BoolFilter<"NLCommand"> | boolean
    result?: JsonNullableFilter<"NLCommand">
    error?: StringNullableFilter<"NLCommand"> | string | null
    userId?: UuidNullableFilter<"NLCommand"> | string | null
    orderId?: UuidNullableFilter<"NLCommand"> | string | null
    createdAt?: DateTimeFilter<"NLCommand"> | Date | string
    executedAt?: DateTimeNullableFilter<"NLCommand"> | Date | string | null
    updatedAt?: DateTimeFilter<"NLCommand"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    order?: XOR<OrderNullableScalarRelationFilter, OrderWhereInput> | null
  }, "id">

  export type NLCommandOrderByWithAggregationInput = {
    id?: SortOrder
    command?: SortOrder
    intent?: SortOrder
    parameters?: SortOrder
    confidence?: SortOrder
    status?: SortOrder
    executed?: SortOrder
    result?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    orderId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    executedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: NLCommandCountOrderByAggregateInput
    _avg?: NLCommandAvgOrderByAggregateInput
    _max?: NLCommandMaxOrderByAggregateInput
    _min?: NLCommandMinOrderByAggregateInput
    _sum?: NLCommandSumOrderByAggregateInput
  }

  export type NLCommandScalarWhereWithAggregatesInput = {
    AND?: NLCommandScalarWhereWithAggregatesInput | NLCommandScalarWhereWithAggregatesInput[]
    OR?: NLCommandScalarWhereWithAggregatesInput[]
    NOT?: NLCommandScalarWhereWithAggregatesInput | NLCommandScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"NLCommand"> | string
    command?: StringWithAggregatesFilter<"NLCommand"> | string
    intent?: StringWithAggregatesFilter<"NLCommand"> | string
    parameters?: JsonWithAggregatesFilter<"NLCommand">
    confidence?: FloatWithAggregatesFilter<"NLCommand"> | number
    status?: EnumCommandStatusWithAggregatesFilter<"NLCommand"> | $Enums.CommandStatus
    executed?: BoolWithAggregatesFilter<"NLCommand"> | boolean
    result?: JsonNullableWithAggregatesFilter<"NLCommand">
    error?: StringNullableWithAggregatesFilter<"NLCommand"> | string | null
    userId?: UuidNullableWithAggregatesFilter<"NLCommand"> | string | null
    orderId?: UuidNullableWithAggregatesFilter<"NLCommand"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NLCommand"> | Date | string
    executedAt?: DateTimeNullableWithAggregatesFilter<"NLCommand"> | Date | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"NLCommand"> | Date | string
  }

  export type IntentWhereInput = {
    AND?: IntentWhereInput | IntentWhereInput[]
    OR?: IntentWhereInput[]
    NOT?: IntentWhereInput | IntentWhereInput[]
    id?: UuidFilter<"Intent"> | string
    name?: StringFilter<"Intent"> | string
    description?: StringFilter<"Intent"> | string
    parameters?: JsonFilter<"Intent">
    requiredParameters?: StringNullableListFilter<"Intent">
    examples?: StringNullableListFilter<"Intent">
    isActive?: BoolFilter<"Intent"> | boolean
    createdAt?: DateTimeFilter<"Intent"> | Date | string
    updatedAt?: DateTimeFilter<"Intent"> | Date | string
  }

  export type IntentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    parameters?: SortOrder
    requiredParameters?: SortOrder
    examples?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: IntentWhereInput | IntentWhereInput[]
    OR?: IntentWhereInput[]
    NOT?: IntentWhereInput | IntentWhereInput[]
    description?: StringFilter<"Intent"> | string
    parameters?: JsonFilter<"Intent">
    requiredParameters?: StringNullableListFilter<"Intent">
    examples?: StringNullableListFilter<"Intent">
    isActive?: BoolFilter<"Intent"> | boolean
    createdAt?: DateTimeFilter<"Intent"> | Date | string
    updatedAt?: DateTimeFilter<"Intent"> | Date | string
  }, "id" | "name">

  export type IntentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    parameters?: SortOrder
    requiredParameters?: SortOrder
    examples?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: IntentCountOrderByAggregateInput
    _max?: IntentMaxOrderByAggregateInput
    _min?: IntentMinOrderByAggregateInput
  }

  export type IntentScalarWhereWithAggregatesInput = {
    AND?: IntentScalarWhereWithAggregatesInput | IntentScalarWhereWithAggregatesInput[]
    OR?: IntentScalarWhereWithAggregatesInput[]
    NOT?: IntentScalarWhereWithAggregatesInput | IntentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Intent"> | string
    name?: StringWithAggregatesFilter<"Intent"> | string
    description?: StringWithAggregatesFilter<"Intent"> | string
    parameters?: JsonWithAggregatesFilter<"Intent">
    requiredParameters?: StringNullableListFilter<"Intent">
    examples?: StringNullableListFilter<"Intent">
    isActive?: BoolWithAggregatesFilter<"Intent"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Intent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Intent"> | Date | string
  }

  export type SystemConfigWhereInput = {
    AND?: SystemConfigWhereInput | SystemConfigWhereInput[]
    OR?: SystemConfigWhereInput[]
    NOT?: SystemConfigWhereInput | SystemConfigWhereInput[]
    id?: UuidFilter<"SystemConfig"> | string
    key?: StringFilter<"SystemConfig"> | string
    value?: JsonFilter<"SystemConfig">
    description?: StringNullableFilter<"SystemConfig"> | string | null
    category?: StringFilter<"SystemConfig"> | string
    isPublic?: BoolFilter<"SystemConfig"> | boolean
    createdAt?: DateTimeFilter<"SystemConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SystemConfig"> | Date | string
  }

  export type SystemConfigOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: SystemConfigWhereInput | SystemConfigWhereInput[]
    OR?: SystemConfigWhereInput[]
    NOT?: SystemConfigWhereInput | SystemConfigWhereInput[]
    value?: JsonFilter<"SystemConfig">
    description?: StringNullableFilter<"SystemConfig"> | string | null
    category?: StringFilter<"SystemConfig"> | string
    isPublic?: BoolFilter<"SystemConfig"> | boolean
    createdAt?: DateTimeFilter<"SystemConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SystemConfig"> | Date | string
  }, "id" | "key">

  export type SystemConfigOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SystemConfigCountOrderByAggregateInput
    _max?: SystemConfigMaxOrderByAggregateInput
    _min?: SystemConfigMinOrderByAggregateInput
  }

  export type SystemConfigScalarWhereWithAggregatesInput = {
    AND?: SystemConfigScalarWhereWithAggregatesInput | SystemConfigScalarWhereWithAggregatesInput[]
    OR?: SystemConfigScalarWhereWithAggregatesInput[]
    NOT?: SystemConfigScalarWhereWithAggregatesInput | SystemConfigScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"SystemConfig"> | string
    key?: StringWithAggregatesFilter<"SystemConfig"> | string
    value?: JsonWithAggregatesFilter<"SystemConfig">
    description?: StringNullableWithAggregatesFilter<"SystemConfig"> | string | null
    category?: StringWithAggregatesFilter<"SystemConfig"> | string
    isPublic?: BoolWithAggregatesFilter<"SystemConfig"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"SystemConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SystemConfig"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: UuidFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: UuidFilter<"AuditLog"> | string
    userId?: UuidNullableFilter<"AuditLog"> | string | null
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    userId?: SortOrderInput | SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: UuidFilter<"AuditLog"> | string
    userId?: UuidNullableFilter<"AuditLog"> | string | null
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    userId?: SortOrderInput | SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entity?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: UuidWithAggregatesFilter<"AuditLog"> | string
    userId?: UuidNullableWithAggregatesFilter<"AuditLog"> | string | null
    oldValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    newValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicles?: VehicleCreateNestedManyWithoutDriverInput
    receipts?: ReceiptCreateNestedManyWithoutVerifierInput
    nlCommands?: NLCommandCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicles?: VehicleUncheckedCreateNestedManyWithoutDriverInput
    receipts?: ReceiptUncheckedCreateNestedManyWithoutVerifierInput
    nlCommands?: NLCommandUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUpdateManyWithoutDriverNestedInput
    receipts?: ReceiptUpdateManyWithoutVerifierNestedInput
    nlCommands?: NLCommandUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUncheckedUpdateManyWithoutDriverNestedInput
    receipts?: ReceiptUncheckedUpdateManyWithoutVerifierNestedInput
    nlCommands?: NLCommandUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    name: string
    contactPerson: string
    phone: string
    email: string
    address: string
    company: string
    creditLimit?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    name: string
    contactPerson: string
    phone: string
    email: string
    address: string
    company: string
    creditLimit?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactPerson?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactPerson?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    name: string
    contactPerson: string
    phone: string
    email: string
    address: string
    company: string
    creditLimit?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactPerson?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactPerson?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    orderNumber: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    assignedVehicle?: VehicleCreateNestedOneWithoutOrdersInput
    schedules?: ScheduleCreateNestedManyWithoutOrderInput
    trackings?: TrackingCreateNestedManyWithoutOrderInput
    receipts?: ReceiptCreateNestedManyWithoutOrderInput
    nlCommands?: NLCommandCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    orderNumber: string
    customerId: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    assignedVehicleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutOrderInput
    trackings?: TrackingUncheckedCreateNestedManyWithoutOrderInput
    receipts?: ReceiptUncheckedCreateNestedManyWithoutOrderInput
    nlCommands?: NLCommandUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    assignedVehicle?: VehicleUpdateOneWithoutOrdersNestedInput
    schedules?: ScheduleUpdateManyWithoutOrderNestedInput
    trackings?: TrackingUpdateManyWithoutOrderNestedInput
    receipts?: ReceiptUpdateManyWithoutOrderNestedInput
    nlCommands?: NLCommandUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    assignedVehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutOrderNestedInput
    trackings?: TrackingUncheckedUpdateManyWithoutOrderNestedInput
    receipts?: ReceiptUncheckedUpdateManyWithoutOrderNestedInput
    nlCommands?: NLCommandUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    orderNumber: string
    customerId: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    assignedVehicleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    assignedVehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleCreateInput = {
    id?: string
    licensePlate: string
    type: $Enums.VehicleType
    capacity: number
    status?: $Enums.VehicleStatus
    currentLocation?: string | null
    lastMaintenance?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driver: UserCreateNestedOneWithoutVehiclesInput
    schedules?: ScheduleCreateNestedManyWithoutVehicleInput
    orders?: OrderCreateNestedManyWithoutAssignedVehicleInput
  }

  export type VehicleUncheckedCreateInput = {
    id?: string
    licensePlate: string
    type: $Enums.VehicleType
    capacity: number
    driverId: string
    status?: $Enums.VehicleStatus
    currentLocation?: string | null
    lastMaintenance?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutVehicleInput
    orders?: OrderUncheckedCreateNestedManyWithoutAssignedVehicleInput
  }

  export type VehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: FloatFieldUpdateOperationsInput | number
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: UserUpdateOneRequiredWithoutVehiclesNestedInput
    schedules?: ScheduleUpdateManyWithoutVehicleNestedInput
    orders?: OrderUpdateManyWithoutAssignedVehicleNestedInput
  }

  export type VehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: FloatFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutVehicleNestedInput
    orders?: OrderUncheckedUpdateManyWithoutAssignedVehicleNestedInput
  }

  export type VehicleCreateManyInput = {
    id?: string
    licensePlate: string
    type: $Enums.VehicleType
    capacity: number
    driverId: string
    status?: $Enums.VehicleStatus
    currentLocation?: string | null
    lastMaintenance?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: FloatFieldUpdateOperationsInput | number
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: FloatFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateInput = {
    id?: string
    plannedDeparture: Date | string
    plannedArrival: Date | string
    actualDeparture?: Date | string | null
    actualArrival?: Date | string | null
    status?: $Enums.ScheduleStatus
    route?: ScheduleCreaterouteInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutSchedulesInput
    vehicle: VehicleCreateNestedOneWithoutSchedulesInput
  }

  export type ScheduleUncheckedCreateInput = {
    id?: string
    orderId: string
    vehicleId: string
    plannedDeparture: Date | string
    plannedArrival: Date | string
    actualDeparture?: Date | string | null
    actualArrival?: Date | string | null
    status?: $Enums.ScheduleStatus
    route?: ScheduleCreaterouteInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plannedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualArrival?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    route?: ScheduleUpdaterouteInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutSchedulesNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutSchedulesNestedInput
  }

  export type ScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    plannedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualArrival?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    route?: ScheduleUpdaterouteInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateManyInput = {
    id?: string
    orderId: string
    vehicleId: string
    plannedDeparture: Date | string
    plannedArrival: Date | string
    actualDeparture?: Date | string | null
    actualArrival?: Date | string | null
    status?: $Enums.ScheduleStatus
    route?: ScheduleCreaterouteInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plannedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualArrival?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    route?: ScheduleUpdaterouteInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    plannedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualArrival?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    route?: ScheduleUpdaterouteInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingCreateInput = {
    id?: string
    location: string
    coordinates: JsonNullValueInput | InputJsonValue
    status?: $Enums.TrackingStatus
    timestamp?: Date | string
    notes?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutTrackingsInput
  }

  export type TrackingUncheckedCreateInput = {
    id?: string
    orderId: string
    location: string
    coordinates: JsonNullValueInput | InputJsonValue
    status?: $Enums.TrackingStatus
    timestamp?: Date | string
    notes?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    coordinates?: JsonNullValueInput | InputJsonValue
    status?: EnumTrackingStatusFieldUpdateOperationsInput | $Enums.TrackingStatus
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutTrackingsNestedInput
  }

  export type TrackingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    coordinates?: JsonNullValueInput | InputJsonValue
    status?: EnumTrackingStatusFieldUpdateOperationsInput | $Enums.TrackingStatus
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingCreateManyInput = {
    id?: string
    orderId: string
    location: string
    coordinates: JsonNullValueInput | InputJsonValue
    status?: $Enums.TrackingStatus
    timestamp?: Date | string
    notes?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    coordinates?: JsonNullValueInput | InputJsonValue
    status?: EnumTrackingStatusFieldUpdateOperationsInput | $Enums.TrackingStatus
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    coordinates?: JsonNullValueInput | InputJsonValue
    status?: EnumTrackingStatusFieldUpdateOperationsInput | $Enums.TrackingStatus
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptCreateInput = {
    id?: string
    status?: $Enums.ReceiptStatus
    imageUrl?: string | null
    notes?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutReceiptsInput
    verifier?: UserCreateNestedOneWithoutReceiptsInput
  }

  export type ReceiptUncheckedCreateInput = {
    id?: string
    orderId: string
    status?: $Enums.ReceiptStatus
    imageUrl?: string | null
    notes?: string | null
    verifiedBy?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReceiptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutReceiptsNestedInput
    verifier?: UserUpdateOneWithoutReceiptsNestedInput
  }

  export type ReceiptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptCreateManyInput = {
    id?: string
    orderId: string
    status?: $Enums.ReceiptStatus
    imageUrl?: string | null
    notes?: string | null
    verifiedBy?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReceiptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NLCommandCreateInput = {
    id?: string
    command: string
    intent: string
    parameters: JsonNullValueInput | InputJsonValue
    confidence?: number
    status?: $Enums.CommandStatus
    executed?: boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    executedAt?: Date | string | null
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutNlCommandsInput
    order?: OrderCreateNestedOneWithoutNlCommandsInput
  }

  export type NLCommandUncheckedCreateInput = {
    id?: string
    command: string
    intent: string
    parameters: JsonNullValueInput | InputJsonValue
    confidence?: number
    status?: $Enums.CommandStatus
    executed?: boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    userId?: string | null
    orderId?: string | null
    createdAt?: Date | string
    executedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type NLCommandUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    command?: StringFieldUpdateOperationsInput | string
    intent?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    status?: EnumCommandStatusFieldUpdateOperationsInput | $Enums.CommandStatus
    executed?: BoolFieldUpdateOperationsInput | boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutNlCommandsNestedInput
    order?: OrderUpdateOneWithoutNlCommandsNestedInput
  }

  export type NLCommandUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    command?: StringFieldUpdateOperationsInput | string
    intent?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    status?: EnumCommandStatusFieldUpdateOperationsInput | $Enums.CommandStatus
    executed?: BoolFieldUpdateOperationsInput | boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NLCommandCreateManyInput = {
    id?: string
    command: string
    intent: string
    parameters: JsonNullValueInput | InputJsonValue
    confidence?: number
    status?: $Enums.CommandStatus
    executed?: boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    userId?: string | null
    orderId?: string | null
    createdAt?: Date | string
    executedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type NLCommandUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    command?: StringFieldUpdateOperationsInput | string
    intent?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    status?: EnumCommandStatusFieldUpdateOperationsInput | $Enums.CommandStatus
    executed?: BoolFieldUpdateOperationsInput | boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NLCommandUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    command?: StringFieldUpdateOperationsInput | string
    intent?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    status?: EnumCommandStatusFieldUpdateOperationsInput | $Enums.CommandStatus
    executed?: BoolFieldUpdateOperationsInput | boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntentCreateInput = {
    id?: string
    name: string
    description: string
    parameters: JsonNullValueInput | InputJsonValue
    requiredParameters?: IntentCreaterequiredParametersInput | string[]
    examples?: IntentCreateexamplesInput | string[]
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IntentUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    parameters: JsonNullValueInput | InputJsonValue
    requiredParameters?: IntentCreaterequiredParametersInput | string[]
    examples?: IntentCreateexamplesInput | string[]
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IntentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    requiredParameters?: IntentUpdaterequiredParametersInput | string[]
    examples?: IntentUpdateexamplesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    requiredParameters?: IntentUpdaterequiredParametersInput | string[]
    examples?: IntentUpdateexamplesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntentCreateManyInput = {
    id?: string
    name: string
    description: string
    parameters: JsonNullValueInput | InputJsonValue
    requiredParameters?: IntentCreaterequiredParametersInput | string[]
    examples?: IntentCreateexamplesInput | string[]
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IntentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    requiredParameters?: IntentUpdaterequiredParametersInput | string[]
    examples?: IntentUpdateexamplesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    requiredParameters?: IntentUpdaterequiredParametersInput | string[]
    examples?: IntentUpdateexamplesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigCreateInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    description?: string | null
    category?: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemConfigUncheckedCreateInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    description?: string | null
    category?: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigCreateManyInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    description?: string | null
    category?: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    userId?: string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    userId?: string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
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

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type VehicleListRelationFilter = {
    every?: VehicleWhereInput
    some?: VehicleWhereInput
    none?: VehicleWhereInput
  }

  export type ReceiptListRelationFilter = {
    every?: ReceiptWhereInput
    some?: ReceiptWhereInput
    none?: ReceiptWhereInput
  }

  export type NLCommandListRelationFilter = {
    every?: NLCommandWhereInput
    some?: NLCommandWhereInput
    none?: NLCommandWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VehicleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReceiptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NLCommandOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contactPerson?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    company?: SortOrder
    creditLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerAvgOrderByAggregateInput = {
    creditLimit?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contactPerson?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    company?: SortOrder
    creditLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contactPerson?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    company?: SortOrder
    creditLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerSumOrderByAggregateInput = {
    creditLimit?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
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

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type VehicleNullableScalarRelationFilter = {
    is?: VehicleWhereInput | null
    isNot?: VehicleWhereInput | null
  }

  export type ScheduleListRelationFilter = {
    every?: ScheduleWhereInput
    some?: ScheduleWhereInput
    none?: ScheduleWhereInput
  }

  export type TrackingListRelationFilter = {
    every?: TrackingWhereInput
    some?: TrackingWhereInput
    none?: TrackingWhereInput
  }

  export type ScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrackingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    weight?: SortOrder
    volume?: SortOrder
    value?: SortOrder
    pickupTime?: SortOrder
    deliveryTime?: SortOrder
    specialInstructions?: SortOrder
    assignedVehicleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    weight?: SortOrder
    volume?: SortOrder
    value?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    weight?: SortOrder
    volume?: SortOrder
    value?: SortOrder
    pickupTime?: SortOrder
    deliveryTime?: SortOrder
    specialInstructions?: SortOrder
    assignedVehicleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    weight?: SortOrder
    volume?: SortOrder
    value?: SortOrder
    pickupTime?: SortOrder
    deliveryTime?: SortOrder
    specialInstructions?: SortOrder
    assignedVehicleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    weight?: SortOrder
    volume?: SortOrder
    value?: SortOrder
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

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumVehicleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeFilter<$PrismaModel> | $Enums.VehicleType
  }

  export type EnumVehicleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | EnumVehicleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleStatusFilter<$PrismaModel> | $Enums.VehicleStatus
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type VehicleCountOrderByAggregateInput = {
    id?: SortOrder
    licensePlate?: SortOrder
    type?: SortOrder
    capacity?: SortOrder
    driverId?: SortOrder
    status?: SortOrder
    currentLocation?: SortOrder
    lastMaintenance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleAvgOrderByAggregateInput = {
    capacity?: SortOrder
  }

  export type VehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    licensePlate?: SortOrder
    type?: SortOrder
    capacity?: SortOrder
    driverId?: SortOrder
    status?: SortOrder
    currentLocation?: SortOrder
    lastMaintenance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleMinOrderByAggregateInput = {
    id?: SortOrder
    licensePlate?: SortOrder
    type?: SortOrder
    capacity?: SortOrder
    driverId?: SortOrder
    status?: SortOrder
    currentLocation?: SortOrder
    lastMaintenance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleSumOrderByAggregateInput = {
    capacity?: SortOrder
  }

  export type EnumVehicleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeWithAggregatesFilter<$PrismaModel> | $Enums.VehicleType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVehicleTypeFilter<$PrismaModel>
    _max?: NestedEnumVehicleTypeFilter<$PrismaModel>
  }

  export type EnumVehicleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | EnumVehicleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleStatusWithAggregatesFilter<$PrismaModel> | $Enums.VehicleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVehicleStatusFilter<$PrismaModel>
    _max?: NestedEnumVehicleStatusFilter<$PrismaModel>
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

  export type EnumScheduleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleStatus | EnumScheduleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScheduleStatusFilter<$PrismaModel> | $Enums.ScheduleStatus
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type VehicleScalarRelationFilter = {
    is?: VehicleWhereInput
    isNot?: VehicleWhereInput
  }

  export type ScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    vehicleId?: SortOrder
    plannedDeparture?: SortOrder
    plannedArrival?: SortOrder
    actualDeparture?: SortOrder
    actualArrival?: SortOrder
    status?: SortOrder
    route?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    vehicleId?: SortOrder
    plannedDeparture?: SortOrder
    plannedArrival?: SortOrder
    actualDeparture?: SortOrder
    actualArrival?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    vehicleId?: SortOrder
    plannedDeparture?: SortOrder
    plannedArrival?: SortOrder
    actualDeparture?: SortOrder
    actualArrival?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumScheduleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleStatus | EnumScheduleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScheduleStatusWithAggregatesFilter<$PrismaModel> | $Enums.ScheduleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScheduleStatusFilter<$PrismaModel>
    _max?: NestedEnumScheduleStatusFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumTrackingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TrackingStatus | EnumTrackingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TrackingStatus[] | ListEnumTrackingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrackingStatus[] | ListEnumTrackingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTrackingStatusFilter<$PrismaModel> | $Enums.TrackingStatus
  }

  export type TrackingCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    location?: SortOrder
    coordinates?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    notes?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrackingMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    location?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    notes?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrackingMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    location?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    notes?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumTrackingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TrackingStatus | EnumTrackingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TrackingStatus[] | ListEnumTrackingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrackingStatus[] | ListEnumTrackingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTrackingStatusWithAggregatesFilter<$PrismaModel> | $Enums.TrackingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTrackingStatusFilter<$PrismaModel>
    _max?: NestedEnumTrackingStatusFilter<$PrismaModel>
  }

  export type EnumReceiptStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReceiptStatus | EnumReceiptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReceiptStatus[] | ListEnumReceiptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReceiptStatus[] | ListEnumReceiptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReceiptStatusFilter<$PrismaModel> | $Enums.ReceiptStatus
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ReceiptCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    imageUrl?: SortOrder
    notes?: SortOrder
    verifiedBy?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReceiptMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    imageUrl?: SortOrder
    notes?: SortOrder
    verifiedBy?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReceiptMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    imageUrl?: SortOrder
    notes?: SortOrder
    verifiedBy?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumReceiptStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReceiptStatus | EnumReceiptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReceiptStatus[] | ListEnumReceiptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReceiptStatus[] | ListEnumReceiptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReceiptStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReceiptStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReceiptStatusFilter<$PrismaModel>
    _max?: NestedEnumReceiptStatusFilter<$PrismaModel>
  }

  export type EnumCommandStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CommandStatus | EnumCommandStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CommandStatus[] | ListEnumCommandStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommandStatus[] | ListEnumCommandStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCommandStatusFilter<$PrismaModel> | $Enums.CommandStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type OrderNullableScalarRelationFilter = {
    is?: OrderWhereInput | null
    isNot?: OrderWhereInput | null
  }

  export type NLCommandCountOrderByAggregateInput = {
    id?: SortOrder
    command?: SortOrder
    intent?: SortOrder
    parameters?: SortOrder
    confidence?: SortOrder
    status?: SortOrder
    executed?: SortOrder
    result?: SortOrder
    error?: SortOrder
    userId?: SortOrder
    orderId?: SortOrder
    createdAt?: SortOrder
    executedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NLCommandAvgOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type NLCommandMaxOrderByAggregateInput = {
    id?: SortOrder
    command?: SortOrder
    intent?: SortOrder
    confidence?: SortOrder
    status?: SortOrder
    executed?: SortOrder
    error?: SortOrder
    userId?: SortOrder
    orderId?: SortOrder
    createdAt?: SortOrder
    executedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NLCommandMinOrderByAggregateInput = {
    id?: SortOrder
    command?: SortOrder
    intent?: SortOrder
    confidence?: SortOrder
    status?: SortOrder
    executed?: SortOrder
    error?: SortOrder
    userId?: SortOrder
    orderId?: SortOrder
    createdAt?: SortOrder
    executedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NLCommandSumOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type EnumCommandStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommandStatus | EnumCommandStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CommandStatus[] | ListEnumCommandStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommandStatus[] | ListEnumCommandStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCommandStatusWithAggregatesFilter<$PrismaModel> | $Enums.CommandStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCommandStatusFilter<$PrismaModel>
    _max?: NestedEnumCommandStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    parameters?: SortOrder
    requiredParameters?: SortOrder
    examples?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrder
    category?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    description?: SortOrder
    category?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    description?: SortOrder
    category?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    userId?: SortOrder
    oldValues?: SortOrder
    newValues?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    userId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    userId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type VehicleCreateNestedManyWithoutDriverInput = {
    create?: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput> | VehicleCreateWithoutDriverInput[] | VehicleUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverInput | VehicleCreateOrConnectWithoutDriverInput[]
    createMany?: VehicleCreateManyDriverInputEnvelope
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
  }

  export type ReceiptCreateNestedManyWithoutVerifierInput = {
    create?: XOR<ReceiptCreateWithoutVerifierInput, ReceiptUncheckedCreateWithoutVerifierInput> | ReceiptCreateWithoutVerifierInput[] | ReceiptUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutVerifierInput | ReceiptCreateOrConnectWithoutVerifierInput[]
    createMany?: ReceiptCreateManyVerifierInputEnvelope
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
  }

  export type NLCommandCreateNestedManyWithoutUserInput = {
    create?: XOR<NLCommandCreateWithoutUserInput, NLCommandUncheckedCreateWithoutUserInput> | NLCommandCreateWithoutUserInput[] | NLCommandUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NLCommandCreateOrConnectWithoutUserInput | NLCommandCreateOrConnectWithoutUserInput[]
    createMany?: NLCommandCreateManyUserInputEnvelope
    connect?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type VehicleUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput> | VehicleCreateWithoutDriverInput[] | VehicleUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverInput | VehicleCreateOrConnectWithoutDriverInput[]
    createMany?: VehicleCreateManyDriverInputEnvelope
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
  }

  export type ReceiptUncheckedCreateNestedManyWithoutVerifierInput = {
    create?: XOR<ReceiptCreateWithoutVerifierInput, ReceiptUncheckedCreateWithoutVerifierInput> | ReceiptCreateWithoutVerifierInput[] | ReceiptUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutVerifierInput | ReceiptCreateOrConnectWithoutVerifierInput[]
    createMany?: ReceiptCreateManyVerifierInputEnvelope
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
  }

  export type NLCommandUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NLCommandCreateWithoutUserInput, NLCommandUncheckedCreateWithoutUserInput> | NLCommandCreateWithoutUserInput[] | NLCommandUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NLCommandCreateOrConnectWithoutUserInput | NLCommandCreateOrConnectWithoutUserInput[]
    createMany?: NLCommandCreateManyUserInputEnvelope
    connect?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type VehicleUpdateManyWithoutDriverNestedInput = {
    create?: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput> | VehicleCreateWithoutDriverInput[] | VehicleUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverInput | VehicleCreateOrConnectWithoutDriverInput[]
    upsert?: VehicleUpsertWithWhereUniqueWithoutDriverInput | VehicleUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: VehicleCreateManyDriverInputEnvelope
    set?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    disconnect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    delete?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    update?: VehicleUpdateWithWhereUniqueWithoutDriverInput | VehicleUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: VehicleUpdateManyWithWhereWithoutDriverInput | VehicleUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
  }

  export type ReceiptUpdateManyWithoutVerifierNestedInput = {
    create?: XOR<ReceiptCreateWithoutVerifierInput, ReceiptUncheckedCreateWithoutVerifierInput> | ReceiptCreateWithoutVerifierInput[] | ReceiptUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutVerifierInput | ReceiptCreateOrConnectWithoutVerifierInput[]
    upsert?: ReceiptUpsertWithWhereUniqueWithoutVerifierInput | ReceiptUpsertWithWhereUniqueWithoutVerifierInput[]
    createMany?: ReceiptCreateManyVerifierInputEnvelope
    set?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    disconnect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    delete?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    update?: ReceiptUpdateWithWhereUniqueWithoutVerifierInput | ReceiptUpdateWithWhereUniqueWithoutVerifierInput[]
    updateMany?: ReceiptUpdateManyWithWhereWithoutVerifierInput | ReceiptUpdateManyWithWhereWithoutVerifierInput[]
    deleteMany?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
  }

  export type NLCommandUpdateManyWithoutUserNestedInput = {
    create?: XOR<NLCommandCreateWithoutUserInput, NLCommandUncheckedCreateWithoutUserInput> | NLCommandCreateWithoutUserInput[] | NLCommandUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NLCommandCreateOrConnectWithoutUserInput | NLCommandCreateOrConnectWithoutUserInput[]
    upsert?: NLCommandUpsertWithWhereUniqueWithoutUserInput | NLCommandUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NLCommandCreateManyUserInputEnvelope
    set?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    disconnect?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    delete?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    connect?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    update?: NLCommandUpdateWithWhereUniqueWithoutUserInput | NLCommandUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NLCommandUpdateManyWithWhereWithoutUserInput | NLCommandUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NLCommandScalarWhereInput | NLCommandScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type VehicleUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput> | VehicleCreateWithoutDriverInput[] | VehicleUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverInput | VehicleCreateOrConnectWithoutDriverInput[]
    upsert?: VehicleUpsertWithWhereUniqueWithoutDriverInput | VehicleUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: VehicleCreateManyDriverInputEnvelope
    set?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    disconnect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    delete?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    update?: VehicleUpdateWithWhereUniqueWithoutDriverInput | VehicleUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: VehicleUpdateManyWithWhereWithoutDriverInput | VehicleUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
  }

  export type ReceiptUncheckedUpdateManyWithoutVerifierNestedInput = {
    create?: XOR<ReceiptCreateWithoutVerifierInput, ReceiptUncheckedCreateWithoutVerifierInput> | ReceiptCreateWithoutVerifierInput[] | ReceiptUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutVerifierInput | ReceiptCreateOrConnectWithoutVerifierInput[]
    upsert?: ReceiptUpsertWithWhereUniqueWithoutVerifierInput | ReceiptUpsertWithWhereUniqueWithoutVerifierInput[]
    createMany?: ReceiptCreateManyVerifierInputEnvelope
    set?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    disconnect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    delete?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    update?: ReceiptUpdateWithWhereUniqueWithoutVerifierInput | ReceiptUpdateWithWhereUniqueWithoutVerifierInput[]
    updateMany?: ReceiptUpdateManyWithWhereWithoutVerifierInput | ReceiptUpdateManyWithWhereWithoutVerifierInput[]
    deleteMany?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
  }

  export type NLCommandUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NLCommandCreateWithoutUserInput, NLCommandUncheckedCreateWithoutUserInput> | NLCommandCreateWithoutUserInput[] | NLCommandUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NLCommandCreateOrConnectWithoutUserInput | NLCommandCreateOrConnectWithoutUserInput[]
    upsert?: NLCommandUpsertWithWhereUniqueWithoutUserInput | NLCommandUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NLCommandCreateManyUserInputEnvelope
    set?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    disconnect?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    delete?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    connect?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    update?: NLCommandUpdateWithWhereUniqueWithoutUserInput | NLCommandUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NLCommandUpdateManyWithWhereWithoutUserInput | NLCommandUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NLCommandScalarWhereInput | NLCommandScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type OrderCreateNestedManyWithoutCustomerInput = {
    create?: XOR<OrderCreateWithoutCustomerInput, OrderUncheckedCreateWithoutCustomerInput> | OrderCreateWithoutCustomerInput[] | OrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCustomerInput | OrderCreateOrConnectWithoutCustomerInput[]
    createMany?: OrderCreateManyCustomerInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<OrderCreateWithoutCustomerInput, OrderUncheckedCreateWithoutCustomerInput> | OrderCreateWithoutCustomerInput[] | OrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCustomerInput | OrderCreateOrConnectWithoutCustomerInput[]
    createMany?: OrderCreateManyCustomerInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrderUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<OrderCreateWithoutCustomerInput, OrderUncheckedCreateWithoutCustomerInput> | OrderCreateWithoutCustomerInput[] | OrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCustomerInput | OrderCreateOrConnectWithoutCustomerInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutCustomerInput | OrderUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: OrderCreateManyCustomerInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutCustomerInput | OrderUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutCustomerInput | OrderUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<OrderCreateWithoutCustomerInput, OrderUncheckedCreateWithoutCustomerInput> | OrderCreateWithoutCustomerInput[] | OrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCustomerInput | OrderCreateOrConnectWithoutCustomerInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutCustomerInput | OrderUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: OrderCreateManyCustomerInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutCustomerInput | OrderUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutCustomerInput | OrderUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutOrdersInput = {
    create?: XOR<CustomerCreateWithoutOrdersInput, CustomerUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutOrdersInput
    connect?: CustomerWhereUniqueInput
  }

  export type VehicleCreateNestedOneWithoutOrdersInput = {
    create?: XOR<VehicleCreateWithoutOrdersInput, VehicleUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutOrdersInput
    connect?: VehicleWhereUniqueInput
  }

  export type ScheduleCreateNestedManyWithoutOrderInput = {
    create?: XOR<ScheduleCreateWithoutOrderInput, ScheduleUncheckedCreateWithoutOrderInput> | ScheduleCreateWithoutOrderInput[] | ScheduleUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutOrderInput | ScheduleCreateOrConnectWithoutOrderInput[]
    createMany?: ScheduleCreateManyOrderInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type TrackingCreateNestedManyWithoutOrderInput = {
    create?: XOR<TrackingCreateWithoutOrderInput, TrackingUncheckedCreateWithoutOrderInput> | TrackingCreateWithoutOrderInput[] | TrackingUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: TrackingCreateOrConnectWithoutOrderInput | TrackingCreateOrConnectWithoutOrderInput[]
    createMany?: TrackingCreateManyOrderInputEnvelope
    connect?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
  }

  export type ReceiptCreateNestedManyWithoutOrderInput = {
    create?: XOR<ReceiptCreateWithoutOrderInput, ReceiptUncheckedCreateWithoutOrderInput> | ReceiptCreateWithoutOrderInput[] | ReceiptUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutOrderInput | ReceiptCreateOrConnectWithoutOrderInput[]
    createMany?: ReceiptCreateManyOrderInputEnvelope
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
  }

  export type NLCommandCreateNestedManyWithoutOrderInput = {
    create?: XOR<NLCommandCreateWithoutOrderInput, NLCommandUncheckedCreateWithoutOrderInput> | NLCommandCreateWithoutOrderInput[] | NLCommandUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: NLCommandCreateOrConnectWithoutOrderInput | NLCommandCreateOrConnectWithoutOrderInput[]
    createMany?: NLCommandCreateManyOrderInputEnvelope
    connect?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
  }

  export type ScheduleUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<ScheduleCreateWithoutOrderInput, ScheduleUncheckedCreateWithoutOrderInput> | ScheduleCreateWithoutOrderInput[] | ScheduleUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutOrderInput | ScheduleCreateOrConnectWithoutOrderInput[]
    createMany?: ScheduleCreateManyOrderInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type TrackingUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<TrackingCreateWithoutOrderInput, TrackingUncheckedCreateWithoutOrderInput> | TrackingCreateWithoutOrderInput[] | TrackingUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: TrackingCreateOrConnectWithoutOrderInput | TrackingCreateOrConnectWithoutOrderInput[]
    createMany?: TrackingCreateManyOrderInputEnvelope
    connect?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
  }

  export type ReceiptUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<ReceiptCreateWithoutOrderInput, ReceiptUncheckedCreateWithoutOrderInput> | ReceiptCreateWithoutOrderInput[] | ReceiptUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutOrderInput | ReceiptCreateOrConnectWithoutOrderInput[]
    createMany?: ReceiptCreateManyOrderInputEnvelope
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
  }

  export type NLCommandUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<NLCommandCreateWithoutOrderInput, NLCommandUncheckedCreateWithoutOrderInput> | NLCommandCreateWithoutOrderInput[] | NLCommandUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: NLCommandCreateOrConnectWithoutOrderInput | NLCommandCreateOrConnectWithoutOrderInput[]
    createMany?: NLCommandCreateManyOrderInputEnvelope
    connect?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CustomerUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<CustomerCreateWithoutOrdersInput, CustomerUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutOrdersInput
    upsert?: CustomerUpsertWithoutOrdersInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutOrdersInput, CustomerUpdateWithoutOrdersInput>, CustomerUncheckedUpdateWithoutOrdersInput>
  }

  export type VehicleUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<VehicleCreateWithoutOrdersInput, VehicleUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutOrdersInput
    upsert?: VehicleUpsertWithoutOrdersInput
    disconnect?: VehicleWhereInput | boolean
    delete?: VehicleWhereInput | boolean
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutOrdersInput, VehicleUpdateWithoutOrdersInput>, VehicleUncheckedUpdateWithoutOrdersInput>
  }

  export type ScheduleUpdateManyWithoutOrderNestedInput = {
    create?: XOR<ScheduleCreateWithoutOrderInput, ScheduleUncheckedCreateWithoutOrderInput> | ScheduleCreateWithoutOrderInput[] | ScheduleUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutOrderInput | ScheduleCreateOrConnectWithoutOrderInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutOrderInput | ScheduleUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: ScheduleCreateManyOrderInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutOrderInput | ScheduleUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutOrderInput | ScheduleUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type TrackingUpdateManyWithoutOrderNestedInput = {
    create?: XOR<TrackingCreateWithoutOrderInput, TrackingUncheckedCreateWithoutOrderInput> | TrackingCreateWithoutOrderInput[] | TrackingUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: TrackingCreateOrConnectWithoutOrderInput | TrackingCreateOrConnectWithoutOrderInput[]
    upsert?: TrackingUpsertWithWhereUniqueWithoutOrderInput | TrackingUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: TrackingCreateManyOrderInputEnvelope
    set?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    disconnect?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    delete?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    connect?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    update?: TrackingUpdateWithWhereUniqueWithoutOrderInput | TrackingUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: TrackingUpdateManyWithWhereWithoutOrderInput | TrackingUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: TrackingScalarWhereInput | TrackingScalarWhereInput[]
  }

  export type ReceiptUpdateManyWithoutOrderNestedInput = {
    create?: XOR<ReceiptCreateWithoutOrderInput, ReceiptUncheckedCreateWithoutOrderInput> | ReceiptCreateWithoutOrderInput[] | ReceiptUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutOrderInput | ReceiptCreateOrConnectWithoutOrderInput[]
    upsert?: ReceiptUpsertWithWhereUniqueWithoutOrderInput | ReceiptUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: ReceiptCreateManyOrderInputEnvelope
    set?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    disconnect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    delete?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    update?: ReceiptUpdateWithWhereUniqueWithoutOrderInput | ReceiptUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: ReceiptUpdateManyWithWhereWithoutOrderInput | ReceiptUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
  }

  export type NLCommandUpdateManyWithoutOrderNestedInput = {
    create?: XOR<NLCommandCreateWithoutOrderInput, NLCommandUncheckedCreateWithoutOrderInput> | NLCommandCreateWithoutOrderInput[] | NLCommandUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: NLCommandCreateOrConnectWithoutOrderInput | NLCommandCreateOrConnectWithoutOrderInput[]
    upsert?: NLCommandUpsertWithWhereUniqueWithoutOrderInput | NLCommandUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: NLCommandCreateManyOrderInputEnvelope
    set?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    disconnect?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    delete?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    connect?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    update?: NLCommandUpdateWithWhereUniqueWithoutOrderInput | NLCommandUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: NLCommandUpdateManyWithWhereWithoutOrderInput | NLCommandUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: NLCommandScalarWhereInput | NLCommandScalarWhereInput[]
  }

  export type ScheduleUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<ScheduleCreateWithoutOrderInput, ScheduleUncheckedCreateWithoutOrderInput> | ScheduleCreateWithoutOrderInput[] | ScheduleUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutOrderInput | ScheduleCreateOrConnectWithoutOrderInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutOrderInput | ScheduleUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: ScheduleCreateManyOrderInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutOrderInput | ScheduleUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutOrderInput | ScheduleUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type TrackingUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<TrackingCreateWithoutOrderInput, TrackingUncheckedCreateWithoutOrderInput> | TrackingCreateWithoutOrderInput[] | TrackingUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: TrackingCreateOrConnectWithoutOrderInput | TrackingCreateOrConnectWithoutOrderInput[]
    upsert?: TrackingUpsertWithWhereUniqueWithoutOrderInput | TrackingUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: TrackingCreateManyOrderInputEnvelope
    set?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    disconnect?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    delete?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    connect?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    update?: TrackingUpdateWithWhereUniqueWithoutOrderInput | TrackingUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: TrackingUpdateManyWithWhereWithoutOrderInput | TrackingUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: TrackingScalarWhereInput | TrackingScalarWhereInput[]
  }

  export type ReceiptUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<ReceiptCreateWithoutOrderInput, ReceiptUncheckedCreateWithoutOrderInput> | ReceiptCreateWithoutOrderInput[] | ReceiptUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutOrderInput | ReceiptCreateOrConnectWithoutOrderInput[]
    upsert?: ReceiptUpsertWithWhereUniqueWithoutOrderInput | ReceiptUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: ReceiptCreateManyOrderInputEnvelope
    set?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    disconnect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    delete?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    update?: ReceiptUpdateWithWhereUniqueWithoutOrderInput | ReceiptUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: ReceiptUpdateManyWithWhereWithoutOrderInput | ReceiptUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
  }

  export type NLCommandUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<NLCommandCreateWithoutOrderInput, NLCommandUncheckedCreateWithoutOrderInput> | NLCommandCreateWithoutOrderInput[] | NLCommandUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: NLCommandCreateOrConnectWithoutOrderInput | NLCommandCreateOrConnectWithoutOrderInput[]
    upsert?: NLCommandUpsertWithWhereUniqueWithoutOrderInput | NLCommandUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: NLCommandCreateManyOrderInputEnvelope
    set?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    disconnect?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    delete?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    connect?: NLCommandWhereUniqueInput | NLCommandWhereUniqueInput[]
    update?: NLCommandUpdateWithWhereUniqueWithoutOrderInput | NLCommandUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: NLCommandUpdateManyWithWhereWithoutOrderInput | NLCommandUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: NLCommandScalarWhereInput | NLCommandScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutVehiclesInput = {
    create?: XOR<UserCreateWithoutVehiclesInput, UserUncheckedCreateWithoutVehiclesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVehiclesInput
    connect?: UserWhereUniqueInput
  }

  export type ScheduleCreateNestedManyWithoutVehicleInput = {
    create?: XOR<ScheduleCreateWithoutVehicleInput, ScheduleUncheckedCreateWithoutVehicleInput> | ScheduleCreateWithoutVehicleInput[] | ScheduleUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutVehicleInput | ScheduleCreateOrConnectWithoutVehicleInput[]
    createMany?: ScheduleCreateManyVehicleInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutAssignedVehicleInput = {
    create?: XOR<OrderCreateWithoutAssignedVehicleInput, OrderUncheckedCreateWithoutAssignedVehicleInput> | OrderCreateWithoutAssignedVehicleInput[] | OrderUncheckedCreateWithoutAssignedVehicleInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAssignedVehicleInput | OrderCreateOrConnectWithoutAssignedVehicleInput[]
    createMany?: OrderCreateManyAssignedVehicleInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ScheduleUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<ScheduleCreateWithoutVehicleInput, ScheduleUncheckedCreateWithoutVehicleInput> | ScheduleCreateWithoutVehicleInput[] | ScheduleUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutVehicleInput | ScheduleCreateOrConnectWithoutVehicleInput[]
    createMany?: ScheduleCreateManyVehicleInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutAssignedVehicleInput = {
    create?: XOR<OrderCreateWithoutAssignedVehicleInput, OrderUncheckedCreateWithoutAssignedVehicleInput> | OrderCreateWithoutAssignedVehicleInput[] | OrderUncheckedCreateWithoutAssignedVehicleInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAssignedVehicleInput | OrderCreateOrConnectWithoutAssignedVehicleInput[]
    createMany?: OrderCreateManyAssignedVehicleInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type EnumVehicleTypeFieldUpdateOperationsInput = {
    set?: $Enums.VehicleType
  }

  export type EnumVehicleStatusFieldUpdateOperationsInput = {
    set?: $Enums.VehicleStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutVehiclesNestedInput = {
    create?: XOR<UserCreateWithoutVehiclesInput, UserUncheckedCreateWithoutVehiclesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVehiclesInput
    upsert?: UserUpsertWithoutVehiclesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVehiclesInput, UserUpdateWithoutVehiclesInput>, UserUncheckedUpdateWithoutVehiclesInput>
  }

  export type ScheduleUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<ScheduleCreateWithoutVehicleInput, ScheduleUncheckedCreateWithoutVehicleInput> | ScheduleCreateWithoutVehicleInput[] | ScheduleUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutVehicleInput | ScheduleCreateOrConnectWithoutVehicleInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutVehicleInput | ScheduleUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: ScheduleCreateManyVehicleInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutVehicleInput | ScheduleUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutVehicleInput | ScheduleUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutAssignedVehicleNestedInput = {
    create?: XOR<OrderCreateWithoutAssignedVehicleInput, OrderUncheckedCreateWithoutAssignedVehicleInput> | OrderCreateWithoutAssignedVehicleInput[] | OrderUncheckedCreateWithoutAssignedVehicleInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAssignedVehicleInput | OrderCreateOrConnectWithoutAssignedVehicleInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutAssignedVehicleInput | OrderUpsertWithWhereUniqueWithoutAssignedVehicleInput[]
    createMany?: OrderCreateManyAssignedVehicleInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutAssignedVehicleInput | OrderUpdateWithWhereUniqueWithoutAssignedVehicleInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutAssignedVehicleInput | OrderUpdateManyWithWhereWithoutAssignedVehicleInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ScheduleUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<ScheduleCreateWithoutVehicleInput, ScheduleUncheckedCreateWithoutVehicleInput> | ScheduleCreateWithoutVehicleInput[] | ScheduleUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutVehicleInput | ScheduleCreateOrConnectWithoutVehicleInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutVehicleInput | ScheduleUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: ScheduleCreateManyVehicleInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutVehicleInput | ScheduleUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutVehicleInput | ScheduleUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutAssignedVehicleNestedInput = {
    create?: XOR<OrderCreateWithoutAssignedVehicleInput, OrderUncheckedCreateWithoutAssignedVehicleInput> | OrderCreateWithoutAssignedVehicleInput[] | OrderUncheckedCreateWithoutAssignedVehicleInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAssignedVehicleInput | OrderCreateOrConnectWithoutAssignedVehicleInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutAssignedVehicleInput | OrderUpsertWithWhereUniqueWithoutAssignedVehicleInput[]
    createMany?: OrderCreateManyAssignedVehicleInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutAssignedVehicleInput | OrderUpdateWithWhereUniqueWithoutAssignedVehicleInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutAssignedVehicleInput | OrderUpdateManyWithWhereWithoutAssignedVehicleInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ScheduleCreaterouteInput = {
    set: string[]
  }

  export type OrderCreateNestedOneWithoutSchedulesInput = {
    create?: XOR<OrderCreateWithoutSchedulesInput, OrderUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: OrderCreateOrConnectWithoutSchedulesInput
    connect?: OrderWhereUniqueInput
  }

  export type VehicleCreateNestedOneWithoutSchedulesInput = {
    create?: XOR<VehicleCreateWithoutSchedulesInput, VehicleUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutSchedulesInput
    connect?: VehicleWhereUniqueInput
  }

  export type EnumScheduleStatusFieldUpdateOperationsInput = {
    set?: $Enums.ScheduleStatus
  }

  export type ScheduleUpdaterouteInput = {
    set?: string[]
    push?: string | string[]
  }

  export type OrderUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: XOR<OrderCreateWithoutSchedulesInput, OrderUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: OrderCreateOrConnectWithoutSchedulesInput
    upsert?: OrderUpsertWithoutSchedulesInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutSchedulesInput, OrderUpdateWithoutSchedulesInput>, OrderUncheckedUpdateWithoutSchedulesInput>
  }

  export type VehicleUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: XOR<VehicleCreateWithoutSchedulesInput, VehicleUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutSchedulesInput
    upsert?: VehicleUpsertWithoutSchedulesInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutSchedulesInput, VehicleUpdateWithoutSchedulesInput>, VehicleUncheckedUpdateWithoutSchedulesInput>
  }

  export type OrderCreateNestedOneWithoutTrackingsInput = {
    create?: XOR<OrderCreateWithoutTrackingsInput, OrderUncheckedCreateWithoutTrackingsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutTrackingsInput
    connect?: OrderWhereUniqueInput
  }

  export type EnumTrackingStatusFieldUpdateOperationsInput = {
    set?: $Enums.TrackingStatus
  }

  export type OrderUpdateOneRequiredWithoutTrackingsNestedInput = {
    create?: XOR<OrderCreateWithoutTrackingsInput, OrderUncheckedCreateWithoutTrackingsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutTrackingsInput
    upsert?: OrderUpsertWithoutTrackingsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutTrackingsInput, OrderUpdateWithoutTrackingsInput>, OrderUncheckedUpdateWithoutTrackingsInput>
  }

  export type OrderCreateNestedOneWithoutReceiptsInput = {
    create?: XOR<OrderCreateWithoutReceiptsInput, OrderUncheckedCreateWithoutReceiptsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutReceiptsInput
    connect?: OrderWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceiptsInput = {
    create?: XOR<UserCreateWithoutReceiptsInput, UserUncheckedCreateWithoutReceiptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceiptsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumReceiptStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReceiptStatus
  }

  export type OrderUpdateOneRequiredWithoutReceiptsNestedInput = {
    create?: XOR<OrderCreateWithoutReceiptsInput, OrderUncheckedCreateWithoutReceiptsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutReceiptsInput
    upsert?: OrderUpsertWithoutReceiptsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutReceiptsInput, OrderUpdateWithoutReceiptsInput>, OrderUncheckedUpdateWithoutReceiptsInput>
  }

  export type UserUpdateOneWithoutReceiptsNestedInput = {
    create?: XOR<UserCreateWithoutReceiptsInput, UserUncheckedCreateWithoutReceiptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceiptsInput
    upsert?: UserUpsertWithoutReceiptsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceiptsInput, UserUpdateWithoutReceiptsInput>, UserUncheckedUpdateWithoutReceiptsInput>
  }

  export type UserCreateNestedOneWithoutNlCommandsInput = {
    create?: XOR<UserCreateWithoutNlCommandsInput, UserUncheckedCreateWithoutNlCommandsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNlCommandsInput
    connect?: UserWhereUniqueInput
  }

  export type OrderCreateNestedOneWithoutNlCommandsInput = {
    create?: XOR<OrderCreateWithoutNlCommandsInput, OrderUncheckedCreateWithoutNlCommandsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutNlCommandsInput
    connect?: OrderWhereUniqueInput
  }

  export type EnumCommandStatusFieldUpdateOperationsInput = {
    set?: $Enums.CommandStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneWithoutNlCommandsNestedInput = {
    create?: XOR<UserCreateWithoutNlCommandsInput, UserUncheckedCreateWithoutNlCommandsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNlCommandsInput
    upsert?: UserUpsertWithoutNlCommandsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNlCommandsInput, UserUpdateWithoutNlCommandsInput>, UserUncheckedUpdateWithoutNlCommandsInput>
  }

  export type OrderUpdateOneWithoutNlCommandsNestedInput = {
    create?: XOR<OrderCreateWithoutNlCommandsInput, OrderUncheckedCreateWithoutNlCommandsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutNlCommandsInput
    upsert?: OrderUpsertWithoutNlCommandsInput
    disconnect?: OrderWhereInput | boolean
    delete?: OrderWhereInput | boolean
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutNlCommandsInput, OrderUpdateWithoutNlCommandsInput>, OrderUncheckedUpdateWithoutNlCommandsInput>
  }

  export type IntentCreaterequiredParametersInput = {
    set: string[]
  }

  export type IntentCreateexamplesInput = {
    set: string[]
  }

  export type IntentUpdaterequiredParametersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntentUpdateexamplesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
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

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
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

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
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

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
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

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumVehicleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeFilter<$PrismaModel> | $Enums.VehicleType
  }

  export type NestedEnumVehicleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | EnumVehicleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleStatusFilter<$PrismaModel> | $Enums.VehicleStatus
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

  export type NestedEnumVehicleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeWithAggregatesFilter<$PrismaModel> | $Enums.VehicleType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVehicleTypeFilter<$PrismaModel>
    _max?: NestedEnumVehicleTypeFilter<$PrismaModel>
  }

  export type NestedEnumVehicleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | EnumVehicleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleStatusWithAggregatesFilter<$PrismaModel> | $Enums.VehicleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVehicleStatusFilter<$PrismaModel>
    _max?: NestedEnumVehicleStatusFilter<$PrismaModel>
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

  export type NestedEnumScheduleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleStatus | EnumScheduleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScheduleStatusFilter<$PrismaModel> | $Enums.ScheduleStatus
  }

  export type NestedEnumScheduleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleStatus | EnumScheduleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScheduleStatus[] | ListEnumScheduleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScheduleStatusWithAggregatesFilter<$PrismaModel> | $Enums.ScheduleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScheduleStatusFilter<$PrismaModel>
    _max?: NestedEnumScheduleStatusFilter<$PrismaModel>
  }

  export type NestedEnumTrackingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TrackingStatus | EnumTrackingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TrackingStatus[] | ListEnumTrackingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrackingStatus[] | ListEnumTrackingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTrackingStatusFilter<$PrismaModel> | $Enums.TrackingStatus
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumTrackingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TrackingStatus | EnumTrackingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TrackingStatus[] | ListEnumTrackingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrackingStatus[] | ListEnumTrackingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTrackingStatusWithAggregatesFilter<$PrismaModel> | $Enums.TrackingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTrackingStatusFilter<$PrismaModel>
    _max?: NestedEnumTrackingStatusFilter<$PrismaModel>
  }

  export type NestedEnumReceiptStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReceiptStatus | EnumReceiptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReceiptStatus[] | ListEnumReceiptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReceiptStatus[] | ListEnumReceiptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReceiptStatusFilter<$PrismaModel> | $Enums.ReceiptStatus
  }

  export type NestedEnumReceiptStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReceiptStatus | EnumReceiptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReceiptStatus[] | ListEnumReceiptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReceiptStatus[] | ListEnumReceiptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReceiptStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReceiptStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReceiptStatusFilter<$PrismaModel>
    _max?: NestedEnumReceiptStatusFilter<$PrismaModel>
  }

  export type NestedEnumCommandStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CommandStatus | EnumCommandStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CommandStatus[] | ListEnumCommandStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommandStatus[] | ListEnumCommandStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCommandStatusFilter<$PrismaModel> | $Enums.CommandStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumCommandStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommandStatus | EnumCommandStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CommandStatus[] | ListEnumCommandStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommandStatus[] | ListEnumCommandStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCommandStatusWithAggregatesFilter<$PrismaModel> | $Enums.CommandStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCommandStatusFilter<$PrismaModel>
    _max?: NestedEnumCommandStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type VehicleCreateWithoutDriverInput = {
    id?: string
    licensePlate: string
    type: $Enums.VehicleType
    capacity: number
    status?: $Enums.VehicleStatus
    currentLocation?: string | null
    lastMaintenance?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleCreateNestedManyWithoutVehicleInput
    orders?: OrderCreateNestedManyWithoutAssignedVehicleInput
  }

  export type VehicleUncheckedCreateWithoutDriverInput = {
    id?: string
    licensePlate: string
    type: $Enums.VehicleType
    capacity: number
    status?: $Enums.VehicleStatus
    currentLocation?: string | null
    lastMaintenance?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutVehicleInput
    orders?: OrderUncheckedCreateNestedManyWithoutAssignedVehicleInput
  }

  export type VehicleCreateOrConnectWithoutDriverInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
  }

  export type VehicleCreateManyDriverInputEnvelope = {
    data: VehicleCreateManyDriverInput | VehicleCreateManyDriverInput[]
    skipDuplicates?: boolean
  }

  export type ReceiptCreateWithoutVerifierInput = {
    id?: string
    status?: $Enums.ReceiptStatus
    imageUrl?: string | null
    notes?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutReceiptsInput
  }

  export type ReceiptUncheckedCreateWithoutVerifierInput = {
    id?: string
    orderId: string
    status?: $Enums.ReceiptStatus
    imageUrl?: string | null
    notes?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReceiptCreateOrConnectWithoutVerifierInput = {
    where: ReceiptWhereUniqueInput
    create: XOR<ReceiptCreateWithoutVerifierInput, ReceiptUncheckedCreateWithoutVerifierInput>
  }

  export type ReceiptCreateManyVerifierInputEnvelope = {
    data: ReceiptCreateManyVerifierInput | ReceiptCreateManyVerifierInput[]
    skipDuplicates?: boolean
  }

  export type NLCommandCreateWithoutUserInput = {
    id?: string
    command: string
    intent: string
    parameters: JsonNullValueInput | InputJsonValue
    confidence?: number
    status?: $Enums.CommandStatus
    executed?: boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    executedAt?: Date | string | null
    updatedAt?: Date | string
    order?: OrderCreateNestedOneWithoutNlCommandsInput
  }

  export type NLCommandUncheckedCreateWithoutUserInput = {
    id?: string
    command: string
    intent: string
    parameters: JsonNullValueInput | InputJsonValue
    confidence?: number
    status?: $Enums.CommandStatus
    executed?: boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    orderId?: string | null
    createdAt?: Date | string
    executedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type NLCommandCreateOrConnectWithoutUserInput = {
    where: NLCommandWhereUniqueInput
    create: XOR<NLCommandCreateWithoutUserInput, NLCommandUncheckedCreateWithoutUserInput>
  }

  export type NLCommandCreateManyUserInputEnvelope = {
    data: NLCommandCreateManyUserInput | NLCommandCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VehicleUpsertWithWhereUniqueWithoutDriverInput = {
    where: VehicleWhereUniqueInput
    update: XOR<VehicleUpdateWithoutDriverInput, VehicleUncheckedUpdateWithoutDriverInput>
    create: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
  }

  export type VehicleUpdateWithWhereUniqueWithoutDriverInput = {
    where: VehicleWhereUniqueInput
    data: XOR<VehicleUpdateWithoutDriverInput, VehicleUncheckedUpdateWithoutDriverInput>
  }

  export type VehicleUpdateManyWithWhereWithoutDriverInput = {
    where: VehicleScalarWhereInput
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyWithoutDriverInput>
  }

  export type VehicleScalarWhereInput = {
    AND?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
    OR?: VehicleScalarWhereInput[]
    NOT?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
    id?: UuidFilter<"Vehicle"> | string
    licensePlate?: StringFilter<"Vehicle"> | string
    type?: EnumVehicleTypeFilter<"Vehicle"> | $Enums.VehicleType
    capacity?: FloatFilter<"Vehicle"> | number
    driverId?: UuidFilter<"Vehicle"> | string
    status?: EnumVehicleStatusFilter<"Vehicle"> | $Enums.VehicleStatus
    currentLocation?: StringNullableFilter<"Vehicle"> | string | null
    lastMaintenance?: DateTimeNullableFilter<"Vehicle"> | Date | string | null
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
  }

  export type ReceiptUpsertWithWhereUniqueWithoutVerifierInput = {
    where: ReceiptWhereUniqueInput
    update: XOR<ReceiptUpdateWithoutVerifierInput, ReceiptUncheckedUpdateWithoutVerifierInput>
    create: XOR<ReceiptCreateWithoutVerifierInput, ReceiptUncheckedCreateWithoutVerifierInput>
  }

  export type ReceiptUpdateWithWhereUniqueWithoutVerifierInput = {
    where: ReceiptWhereUniqueInput
    data: XOR<ReceiptUpdateWithoutVerifierInput, ReceiptUncheckedUpdateWithoutVerifierInput>
  }

  export type ReceiptUpdateManyWithWhereWithoutVerifierInput = {
    where: ReceiptScalarWhereInput
    data: XOR<ReceiptUpdateManyMutationInput, ReceiptUncheckedUpdateManyWithoutVerifierInput>
  }

  export type ReceiptScalarWhereInput = {
    AND?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
    OR?: ReceiptScalarWhereInput[]
    NOT?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
    id?: UuidFilter<"Receipt"> | string
    orderId?: UuidFilter<"Receipt"> | string
    status?: EnumReceiptStatusFilter<"Receipt"> | $Enums.ReceiptStatus
    imageUrl?: StringNullableFilter<"Receipt"> | string | null
    notes?: StringNullableFilter<"Receipt"> | string | null
    verifiedBy?: UuidNullableFilter<"Receipt"> | string | null
    verifiedAt?: DateTimeNullableFilter<"Receipt"> | Date | string | null
    createdAt?: DateTimeFilter<"Receipt"> | Date | string
    updatedAt?: DateTimeFilter<"Receipt"> | Date | string
  }

  export type NLCommandUpsertWithWhereUniqueWithoutUserInput = {
    where: NLCommandWhereUniqueInput
    update: XOR<NLCommandUpdateWithoutUserInput, NLCommandUncheckedUpdateWithoutUserInput>
    create: XOR<NLCommandCreateWithoutUserInput, NLCommandUncheckedCreateWithoutUserInput>
  }

  export type NLCommandUpdateWithWhereUniqueWithoutUserInput = {
    where: NLCommandWhereUniqueInput
    data: XOR<NLCommandUpdateWithoutUserInput, NLCommandUncheckedUpdateWithoutUserInput>
  }

  export type NLCommandUpdateManyWithWhereWithoutUserInput = {
    where: NLCommandScalarWhereInput
    data: XOR<NLCommandUpdateManyMutationInput, NLCommandUncheckedUpdateManyWithoutUserInput>
  }

  export type NLCommandScalarWhereInput = {
    AND?: NLCommandScalarWhereInput | NLCommandScalarWhereInput[]
    OR?: NLCommandScalarWhereInput[]
    NOT?: NLCommandScalarWhereInput | NLCommandScalarWhereInput[]
    id?: UuidFilter<"NLCommand"> | string
    command?: StringFilter<"NLCommand"> | string
    intent?: StringFilter<"NLCommand"> | string
    parameters?: JsonFilter<"NLCommand">
    confidence?: FloatFilter<"NLCommand"> | number
    status?: EnumCommandStatusFilter<"NLCommand"> | $Enums.CommandStatus
    executed?: BoolFilter<"NLCommand"> | boolean
    result?: JsonNullableFilter<"NLCommand">
    error?: StringNullableFilter<"NLCommand"> | string | null
    userId?: UuidNullableFilter<"NLCommand"> | string | null
    orderId?: UuidNullableFilter<"NLCommand"> | string | null
    createdAt?: DateTimeFilter<"NLCommand"> | Date | string
    executedAt?: DateTimeNullableFilter<"NLCommand"> | Date | string | null
    updatedAt?: DateTimeFilter<"NLCommand"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: UuidFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: UuidFilter<"AuditLog"> | string
    userId?: UuidNullableFilter<"AuditLog"> | string | null
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type OrderCreateWithoutCustomerInput = {
    id?: string
    orderNumber: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedVehicle?: VehicleCreateNestedOneWithoutOrdersInput
    schedules?: ScheduleCreateNestedManyWithoutOrderInput
    trackings?: TrackingCreateNestedManyWithoutOrderInput
    receipts?: ReceiptCreateNestedManyWithoutOrderInput
    nlCommands?: NLCommandCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutCustomerInput = {
    id?: string
    orderNumber: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    assignedVehicleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutOrderInput
    trackings?: TrackingUncheckedCreateNestedManyWithoutOrderInput
    receipts?: ReceiptUncheckedCreateNestedManyWithoutOrderInput
    nlCommands?: NLCommandUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutCustomerInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutCustomerInput, OrderUncheckedCreateWithoutCustomerInput>
  }

  export type OrderCreateManyCustomerInputEnvelope = {
    data: OrderCreateManyCustomerInput | OrderCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type OrderUpsertWithWhereUniqueWithoutCustomerInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutCustomerInput, OrderUncheckedUpdateWithoutCustomerInput>
    create: XOR<OrderCreateWithoutCustomerInput, OrderUncheckedCreateWithoutCustomerInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutCustomerInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutCustomerInput, OrderUncheckedUpdateWithoutCustomerInput>
  }

  export type OrderUpdateManyWithWhereWithoutCustomerInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutCustomerInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: UuidFilter<"Order"> | string
    orderNumber?: StringFilter<"Order"> | string
    customerId?: UuidFilter<"Order"> | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    origin?: StringFilter<"Order"> | string
    destination?: StringFilter<"Order"> | string
    weight?: FloatFilter<"Order"> | number
    volume?: FloatFilter<"Order"> | number
    value?: FloatNullableFilter<"Order"> | number | null
    pickupTime?: DateTimeFilter<"Order"> | Date | string
    deliveryTime?: DateTimeFilter<"Order"> | Date | string
    specialInstructions?: StringNullableFilter<"Order"> | string | null
    assignedVehicleId?: UuidNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type CustomerCreateWithoutOrdersInput = {
    id?: string
    name: string
    contactPerson: string
    phone: string
    email: string
    address: string
    company: string
    creditLimit?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUncheckedCreateWithoutOrdersInput = {
    id?: string
    name: string
    contactPerson: string
    phone: string
    email: string
    address: string
    company: string
    creditLimit?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerCreateOrConnectWithoutOrdersInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutOrdersInput, CustomerUncheckedCreateWithoutOrdersInput>
  }

  export type VehicleCreateWithoutOrdersInput = {
    id?: string
    licensePlate: string
    type: $Enums.VehicleType
    capacity: number
    status?: $Enums.VehicleStatus
    currentLocation?: string | null
    lastMaintenance?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driver: UserCreateNestedOneWithoutVehiclesInput
    schedules?: ScheduleCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutOrdersInput = {
    id?: string
    licensePlate: string
    type: $Enums.VehicleType
    capacity: number
    driverId: string
    status?: $Enums.VehicleStatus
    currentLocation?: string | null
    lastMaintenance?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutOrdersInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutOrdersInput, VehicleUncheckedCreateWithoutOrdersInput>
  }

  export type ScheduleCreateWithoutOrderInput = {
    id?: string
    plannedDeparture: Date | string
    plannedArrival: Date | string
    actualDeparture?: Date | string | null
    actualArrival?: Date | string | null
    status?: $Enums.ScheduleStatus
    route?: ScheduleCreaterouteInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicle: VehicleCreateNestedOneWithoutSchedulesInput
  }

  export type ScheduleUncheckedCreateWithoutOrderInput = {
    id?: string
    vehicleId: string
    plannedDeparture: Date | string
    plannedArrival: Date | string
    actualDeparture?: Date | string | null
    actualArrival?: Date | string | null
    status?: $Enums.ScheduleStatus
    route?: ScheduleCreaterouteInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleCreateOrConnectWithoutOrderInput = {
    where: ScheduleWhereUniqueInput
    create: XOR<ScheduleCreateWithoutOrderInput, ScheduleUncheckedCreateWithoutOrderInput>
  }

  export type ScheduleCreateManyOrderInputEnvelope = {
    data: ScheduleCreateManyOrderInput | ScheduleCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type TrackingCreateWithoutOrderInput = {
    id?: string
    location: string
    coordinates: JsonNullValueInput | InputJsonValue
    status?: $Enums.TrackingStatus
    timestamp?: Date | string
    notes?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackingUncheckedCreateWithoutOrderInput = {
    id?: string
    location: string
    coordinates: JsonNullValueInput | InputJsonValue
    status?: $Enums.TrackingStatus
    timestamp?: Date | string
    notes?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackingCreateOrConnectWithoutOrderInput = {
    where: TrackingWhereUniqueInput
    create: XOR<TrackingCreateWithoutOrderInput, TrackingUncheckedCreateWithoutOrderInput>
  }

  export type TrackingCreateManyOrderInputEnvelope = {
    data: TrackingCreateManyOrderInput | TrackingCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type ReceiptCreateWithoutOrderInput = {
    id?: string
    status?: $Enums.ReceiptStatus
    imageUrl?: string | null
    notes?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    verifier?: UserCreateNestedOneWithoutReceiptsInput
  }

  export type ReceiptUncheckedCreateWithoutOrderInput = {
    id?: string
    status?: $Enums.ReceiptStatus
    imageUrl?: string | null
    notes?: string | null
    verifiedBy?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReceiptCreateOrConnectWithoutOrderInput = {
    where: ReceiptWhereUniqueInput
    create: XOR<ReceiptCreateWithoutOrderInput, ReceiptUncheckedCreateWithoutOrderInput>
  }

  export type ReceiptCreateManyOrderInputEnvelope = {
    data: ReceiptCreateManyOrderInput | ReceiptCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type NLCommandCreateWithoutOrderInput = {
    id?: string
    command: string
    intent: string
    parameters: JsonNullValueInput | InputJsonValue
    confidence?: number
    status?: $Enums.CommandStatus
    executed?: boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    executedAt?: Date | string | null
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutNlCommandsInput
  }

  export type NLCommandUncheckedCreateWithoutOrderInput = {
    id?: string
    command: string
    intent: string
    parameters: JsonNullValueInput | InputJsonValue
    confidence?: number
    status?: $Enums.CommandStatus
    executed?: boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    userId?: string | null
    createdAt?: Date | string
    executedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type NLCommandCreateOrConnectWithoutOrderInput = {
    where: NLCommandWhereUniqueInput
    create: XOR<NLCommandCreateWithoutOrderInput, NLCommandUncheckedCreateWithoutOrderInput>
  }

  export type NLCommandCreateManyOrderInputEnvelope = {
    data: NLCommandCreateManyOrderInput | NLCommandCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type CustomerUpsertWithoutOrdersInput = {
    update: XOR<CustomerUpdateWithoutOrdersInput, CustomerUncheckedUpdateWithoutOrdersInput>
    create: XOR<CustomerCreateWithoutOrdersInput, CustomerUncheckedCreateWithoutOrdersInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutOrdersInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutOrdersInput, CustomerUncheckedUpdateWithoutOrdersInput>
  }

  export type CustomerUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactPerson?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactPerson?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    company?: StringFieldUpdateOperationsInput | string
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUpsertWithoutOrdersInput = {
    update: XOR<VehicleUpdateWithoutOrdersInput, VehicleUncheckedUpdateWithoutOrdersInput>
    create: XOR<VehicleCreateWithoutOrdersInput, VehicleUncheckedCreateWithoutOrdersInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutOrdersInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutOrdersInput, VehicleUncheckedUpdateWithoutOrdersInput>
  }

  export type VehicleUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: FloatFieldUpdateOperationsInput | number
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: UserUpdateOneRequiredWithoutVehiclesNestedInput
    schedules?: ScheduleUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: FloatFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type ScheduleUpsertWithWhereUniqueWithoutOrderInput = {
    where: ScheduleWhereUniqueInput
    update: XOR<ScheduleUpdateWithoutOrderInput, ScheduleUncheckedUpdateWithoutOrderInput>
    create: XOR<ScheduleCreateWithoutOrderInput, ScheduleUncheckedCreateWithoutOrderInput>
  }

  export type ScheduleUpdateWithWhereUniqueWithoutOrderInput = {
    where: ScheduleWhereUniqueInput
    data: XOR<ScheduleUpdateWithoutOrderInput, ScheduleUncheckedUpdateWithoutOrderInput>
  }

  export type ScheduleUpdateManyWithWhereWithoutOrderInput = {
    where: ScheduleScalarWhereInput
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyWithoutOrderInput>
  }

  export type ScheduleScalarWhereInput = {
    AND?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    OR?: ScheduleScalarWhereInput[]
    NOT?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    id?: UuidFilter<"Schedule"> | string
    orderId?: UuidFilter<"Schedule"> | string
    vehicleId?: UuidFilter<"Schedule"> | string
    plannedDeparture?: DateTimeFilter<"Schedule"> | Date | string
    plannedArrival?: DateTimeFilter<"Schedule"> | Date | string
    actualDeparture?: DateTimeNullableFilter<"Schedule"> | Date | string | null
    actualArrival?: DateTimeNullableFilter<"Schedule"> | Date | string | null
    status?: EnumScheduleStatusFilter<"Schedule"> | $Enums.ScheduleStatus
    route?: StringNullableListFilter<"Schedule">
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
    updatedAt?: DateTimeFilter<"Schedule"> | Date | string
  }

  export type TrackingUpsertWithWhereUniqueWithoutOrderInput = {
    where: TrackingWhereUniqueInput
    update: XOR<TrackingUpdateWithoutOrderInput, TrackingUncheckedUpdateWithoutOrderInput>
    create: XOR<TrackingCreateWithoutOrderInput, TrackingUncheckedCreateWithoutOrderInput>
  }

  export type TrackingUpdateWithWhereUniqueWithoutOrderInput = {
    where: TrackingWhereUniqueInput
    data: XOR<TrackingUpdateWithoutOrderInput, TrackingUncheckedUpdateWithoutOrderInput>
  }

  export type TrackingUpdateManyWithWhereWithoutOrderInput = {
    where: TrackingScalarWhereInput
    data: XOR<TrackingUpdateManyMutationInput, TrackingUncheckedUpdateManyWithoutOrderInput>
  }

  export type TrackingScalarWhereInput = {
    AND?: TrackingScalarWhereInput | TrackingScalarWhereInput[]
    OR?: TrackingScalarWhereInput[]
    NOT?: TrackingScalarWhereInput | TrackingScalarWhereInput[]
    id?: UuidFilter<"Tracking"> | string
    orderId?: UuidFilter<"Tracking"> | string
    location?: StringFilter<"Tracking"> | string
    coordinates?: JsonFilter<"Tracking">
    status?: EnumTrackingStatusFilter<"Tracking"> | $Enums.TrackingStatus
    timestamp?: DateTimeFilter<"Tracking"> | Date | string
    notes?: StringNullableFilter<"Tracking"> | string | null
    imageUrl?: StringNullableFilter<"Tracking"> | string | null
    createdAt?: DateTimeFilter<"Tracking"> | Date | string
    updatedAt?: DateTimeFilter<"Tracking"> | Date | string
  }

  export type ReceiptUpsertWithWhereUniqueWithoutOrderInput = {
    where: ReceiptWhereUniqueInput
    update: XOR<ReceiptUpdateWithoutOrderInput, ReceiptUncheckedUpdateWithoutOrderInput>
    create: XOR<ReceiptCreateWithoutOrderInput, ReceiptUncheckedCreateWithoutOrderInput>
  }

  export type ReceiptUpdateWithWhereUniqueWithoutOrderInput = {
    where: ReceiptWhereUniqueInput
    data: XOR<ReceiptUpdateWithoutOrderInput, ReceiptUncheckedUpdateWithoutOrderInput>
  }

  export type ReceiptUpdateManyWithWhereWithoutOrderInput = {
    where: ReceiptScalarWhereInput
    data: XOR<ReceiptUpdateManyMutationInput, ReceiptUncheckedUpdateManyWithoutOrderInput>
  }

  export type NLCommandUpsertWithWhereUniqueWithoutOrderInput = {
    where: NLCommandWhereUniqueInput
    update: XOR<NLCommandUpdateWithoutOrderInput, NLCommandUncheckedUpdateWithoutOrderInput>
    create: XOR<NLCommandCreateWithoutOrderInput, NLCommandUncheckedCreateWithoutOrderInput>
  }

  export type NLCommandUpdateWithWhereUniqueWithoutOrderInput = {
    where: NLCommandWhereUniqueInput
    data: XOR<NLCommandUpdateWithoutOrderInput, NLCommandUncheckedUpdateWithoutOrderInput>
  }

  export type NLCommandUpdateManyWithWhereWithoutOrderInput = {
    where: NLCommandScalarWhereInput
    data: XOR<NLCommandUpdateManyMutationInput, NLCommandUncheckedUpdateManyWithoutOrderInput>
  }

  export type UserCreateWithoutVehiclesInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receipts?: ReceiptCreateNestedManyWithoutVerifierInput
    nlCommands?: NLCommandCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVehiclesInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receipts?: ReceiptUncheckedCreateNestedManyWithoutVerifierInput
    nlCommands?: NLCommandUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVehiclesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVehiclesInput, UserUncheckedCreateWithoutVehiclesInput>
  }

  export type ScheduleCreateWithoutVehicleInput = {
    id?: string
    plannedDeparture: Date | string
    plannedArrival: Date | string
    actualDeparture?: Date | string | null
    actualArrival?: Date | string | null
    status?: $Enums.ScheduleStatus
    route?: ScheduleCreaterouteInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutSchedulesInput
  }

  export type ScheduleUncheckedCreateWithoutVehicleInput = {
    id?: string
    orderId: string
    plannedDeparture: Date | string
    plannedArrival: Date | string
    actualDeparture?: Date | string | null
    actualArrival?: Date | string | null
    status?: $Enums.ScheduleStatus
    route?: ScheduleCreaterouteInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleCreateOrConnectWithoutVehicleInput = {
    where: ScheduleWhereUniqueInput
    create: XOR<ScheduleCreateWithoutVehicleInput, ScheduleUncheckedCreateWithoutVehicleInput>
  }

  export type ScheduleCreateManyVehicleInputEnvelope = {
    data: ScheduleCreateManyVehicleInput | ScheduleCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutAssignedVehicleInput = {
    id?: string
    orderNumber: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    schedules?: ScheduleCreateNestedManyWithoutOrderInput
    trackings?: TrackingCreateNestedManyWithoutOrderInput
    receipts?: ReceiptCreateNestedManyWithoutOrderInput
    nlCommands?: NLCommandCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutAssignedVehicleInput = {
    id?: string
    orderNumber: string
    customerId: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutOrderInput
    trackings?: TrackingUncheckedCreateNestedManyWithoutOrderInput
    receipts?: ReceiptUncheckedCreateNestedManyWithoutOrderInput
    nlCommands?: NLCommandUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutAssignedVehicleInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutAssignedVehicleInput, OrderUncheckedCreateWithoutAssignedVehicleInput>
  }

  export type OrderCreateManyAssignedVehicleInputEnvelope = {
    data: OrderCreateManyAssignedVehicleInput | OrderCreateManyAssignedVehicleInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutVehiclesInput = {
    update: XOR<UserUpdateWithoutVehiclesInput, UserUncheckedUpdateWithoutVehiclesInput>
    create: XOR<UserCreateWithoutVehiclesInput, UserUncheckedCreateWithoutVehiclesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVehiclesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVehiclesInput, UserUncheckedUpdateWithoutVehiclesInput>
  }

  export type UserUpdateWithoutVehiclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipts?: ReceiptUpdateManyWithoutVerifierNestedInput
    nlCommands?: NLCommandUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVehiclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipts?: ReceiptUncheckedUpdateManyWithoutVerifierNestedInput
    nlCommands?: NLCommandUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ScheduleUpsertWithWhereUniqueWithoutVehicleInput = {
    where: ScheduleWhereUniqueInput
    update: XOR<ScheduleUpdateWithoutVehicleInput, ScheduleUncheckedUpdateWithoutVehicleInput>
    create: XOR<ScheduleCreateWithoutVehicleInput, ScheduleUncheckedCreateWithoutVehicleInput>
  }

  export type ScheduleUpdateWithWhereUniqueWithoutVehicleInput = {
    where: ScheduleWhereUniqueInput
    data: XOR<ScheduleUpdateWithoutVehicleInput, ScheduleUncheckedUpdateWithoutVehicleInput>
  }

  export type ScheduleUpdateManyWithWhereWithoutVehicleInput = {
    where: ScheduleScalarWhereInput
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyWithoutVehicleInput>
  }

  export type OrderUpsertWithWhereUniqueWithoutAssignedVehicleInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutAssignedVehicleInput, OrderUncheckedUpdateWithoutAssignedVehicleInput>
    create: XOR<OrderCreateWithoutAssignedVehicleInput, OrderUncheckedCreateWithoutAssignedVehicleInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutAssignedVehicleInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutAssignedVehicleInput, OrderUncheckedUpdateWithoutAssignedVehicleInput>
  }

  export type OrderUpdateManyWithWhereWithoutAssignedVehicleInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutAssignedVehicleInput>
  }

  export type OrderCreateWithoutSchedulesInput = {
    id?: string
    orderNumber: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    assignedVehicle?: VehicleCreateNestedOneWithoutOrdersInput
    trackings?: TrackingCreateNestedManyWithoutOrderInput
    receipts?: ReceiptCreateNestedManyWithoutOrderInput
    nlCommands?: NLCommandCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutSchedulesInput = {
    id?: string
    orderNumber: string
    customerId: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    assignedVehicleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trackings?: TrackingUncheckedCreateNestedManyWithoutOrderInput
    receipts?: ReceiptUncheckedCreateNestedManyWithoutOrderInput
    nlCommands?: NLCommandUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutSchedulesInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutSchedulesInput, OrderUncheckedCreateWithoutSchedulesInput>
  }

  export type VehicleCreateWithoutSchedulesInput = {
    id?: string
    licensePlate: string
    type: $Enums.VehicleType
    capacity: number
    status?: $Enums.VehicleStatus
    currentLocation?: string | null
    lastMaintenance?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driver: UserCreateNestedOneWithoutVehiclesInput
    orders?: OrderCreateNestedManyWithoutAssignedVehicleInput
  }

  export type VehicleUncheckedCreateWithoutSchedulesInput = {
    id?: string
    licensePlate: string
    type: $Enums.VehicleType
    capacity: number
    driverId: string
    status?: $Enums.VehicleStatus
    currentLocation?: string | null
    lastMaintenance?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutAssignedVehicleInput
  }

  export type VehicleCreateOrConnectWithoutSchedulesInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutSchedulesInput, VehicleUncheckedCreateWithoutSchedulesInput>
  }

  export type OrderUpsertWithoutSchedulesInput = {
    update: XOR<OrderUpdateWithoutSchedulesInput, OrderUncheckedUpdateWithoutSchedulesInput>
    create: XOR<OrderCreateWithoutSchedulesInput, OrderUncheckedCreateWithoutSchedulesInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutSchedulesInput, OrderUncheckedUpdateWithoutSchedulesInput>
  }

  export type OrderUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    assignedVehicle?: VehicleUpdateOneWithoutOrdersNestedInput
    trackings?: TrackingUpdateManyWithoutOrderNestedInput
    receipts?: ReceiptUpdateManyWithoutOrderNestedInput
    nlCommands?: NLCommandUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    assignedVehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trackings?: TrackingUncheckedUpdateManyWithoutOrderNestedInput
    receipts?: ReceiptUncheckedUpdateManyWithoutOrderNestedInput
    nlCommands?: NLCommandUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type VehicleUpsertWithoutSchedulesInput = {
    update: XOR<VehicleUpdateWithoutSchedulesInput, VehicleUncheckedUpdateWithoutSchedulesInput>
    create: XOR<VehicleCreateWithoutSchedulesInput, VehicleUncheckedCreateWithoutSchedulesInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutSchedulesInput, VehicleUncheckedUpdateWithoutSchedulesInput>
  }

  export type VehicleUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: FloatFieldUpdateOperationsInput | number
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: UserUpdateOneRequiredWithoutVehiclesNestedInput
    orders?: OrderUpdateManyWithoutAssignedVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: FloatFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutAssignedVehicleNestedInput
  }

  export type OrderCreateWithoutTrackingsInput = {
    id?: string
    orderNumber: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    assignedVehicle?: VehicleCreateNestedOneWithoutOrdersInput
    schedules?: ScheduleCreateNestedManyWithoutOrderInput
    receipts?: ReceiptCreateNestedManyWithoutOrderInput
    nlCommands?: NLCommandCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutTrackingsInput = {
    id?: string
    orderNumber: string
    customerId: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    assignedVehicleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutOrderInput
    receipts?: ReceiptUncheckedCreateNestedManyWithoutOrderInput
    nlCommands?: NLCommandUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutTrackingsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutTrackingsInput, OrderUncheckedCreateWithoutTrackingsInput>
  }

  export type OrderUpsertWithoutTrackingsInput = {
    update: XOR<OrderUpdateWithoutTrackingsInput, OrderUncheckedUpdateWithoutTrackingsInput>
    create: XOR<OrderCreateWithoutTrackingsInput, OrderUncheckedCreateWithoutTrackingsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutTrackingsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutTrackingsInput, OrderUncheckedUpdateWithoutTrackingsInput>
  }

  export type OrderUpdateWithoutTrackingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    assignedVehicle?: VehicleUpdateOneWithoutOrdersNestedInput
    schedules?: ScheduleUpdateManyWithoutOrderNestedInput
    receipts?: ReceiptUpdateManyWithoutOrderNestedInput
    nlCommands?: NLCommandUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutTrackingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    assignedVehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutOrderNestedInput
    receipts?: ReceiptUncheckedUpdateManyWithoutOrderNestedInput
    nlCommands?: NLCommandUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateWithoutReceiptsInput = {
    id?: string
    orderNumber: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    assignedVehicle?: VehicleCreateNestedOneWithoutOrdersInput
    schedules?: ScheduleCreateNestedManyWithoutOrderInput
    trackings?: TrackingCreateNestedManyWithoutOrderInput
    nlCommands?: NLCommandCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutReceiptsInput = {
    id?: string
    orderNumber: string
    customerId: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    assignedVehicleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutOrderInput
    trackings?: TrackingUncheckedCreateNestedManyWithoutOrderInput
    nlCommands?: NLCommandUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutReceiptsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutReceiptsInput, OrderUncheckedCreateWithoutReceiptsInput>
  }

  export type UserCreateWithoutReceiptsInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicles?: VehicleCreateNestedManyWithoutDriverInput
    nlCommands?: NLCommandCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReceiptsInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicles?: VehicleUncheckedCreateNestedManyWithoutDriverInput
    nlCommands?: NLCommandUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReceiptsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceiptsInput, UserUncheckedCreateWithoutReceiptsInput>
  }

  export type OrderUpsertWithoutReceiptsInput = {
    update: XOR<OrderUpdateWithoutReceiptsInput, OrderUncheckedUpdateWithoutReceiptsInput>
    create: XOR<OrderCreateWithoutReceiptsInput, OrderUncheckedCreateWithoutReceiptsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutReceiptsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutReceiptsInput, OrderUncheckedUpdateWithoutReceiptsInput>
  }

  export type OrderUpdateWithoutReceiptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    assignedVehicle?: VehicleUpdateOneWithoutOrdersNestedInput
    schedules?: ScheduleUpdateManyWithoutOrderNestedInput
    trackings?: TrackingUpdateManyWithoutOrderNestedInput
    nlCommands?: NLCommandUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutReceiptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    assignedVehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutOrderNestedInput
    trackings?: TrackingUncheckedUpdateManyWithoutOrderNestedInput
    nlCommands?: NLCommandUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type UserUpsertWithoutReceiptsInput = {
    update: XOR<UserUpdateWithoutReceiptsInput, UserUncheckedUpdateWithoutReceiptsInput>
    create: XOR<UserCreateWithoutReceiptsInput, UserUncheckedCreateWithoutReceiptsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceiptsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceiptsInput, UserUncheckedUpdateWithoutReceiptsInput>
  }

  export type UserUpdateWithoutReceiptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUpdateManyWithoutDriverNestedInput
    nlCommands?: NLCommandUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReceiptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUncheckedUpdateManyWithoutDriverNestedInput
    nlCommands?: NLCommandUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutNlCommandsInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicles?: VehicleCreateNestedManyWithoutDriverInput
    receipts?: ReceiptCreateNestedManyWithoutVerifierInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNlCommandsInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicles?: VehicleUncheckedCreateNestedManyWithoutDriverInput
    receipts?: ReceiptUncheckedCreateNestedManyWithoutVerifierInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNlCommandsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNlCommandsInput, UserUncheckedCreateWithoutNlCommandsInput>
  }

  export type OrderCreateWithoutNlCommandsInput = {
    id?: string
    orderNumber: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    assignedVehicle?: VehicleCreateNestedOneWithoutOrdersInput
    schedules?: ScheduleCreateNestedManyWithoutOrderInput
    trackings?: TrackingCreateNestedManyWithoutOrderInput
    receipts?: ReceiptCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutNlCommandsInput = {
    id?: string
    orderNumber: string
    customerId: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    assignedVehicleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutOrderInput
    trackings?: TrackingUncheckedCreateNestedManyWithoutOrderInput
    receipts?: ReceiptUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutNlCommandsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutNlCommandsInput, OrderUncheckedCreateWithoutNlCommandsInput>
  }

  export type UserUpsertWithoutNlCommandsInput = {
    update: XOR<UserUpdateWithoutNlCommandsInput, UserUncheckedUpdateWithoutNlCommandsInput>
    create: XOR<UserCreateWithoutNlCommandsInput, UserUncheckedCreateWithoutNlCommandsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNlCommandsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNlCommandsInput, UserUncheckedUpdateWithoutNlCommandsInput>
  }

  export type UserUpdateWithoutNlCommandsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUpdateManyWithoutDriverNestedInput
    receipts?: ReceiptUpdateManyWithoutVerifierNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNlCommandsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUncheckedUpdateManyWithoutDriverNestedInput
    receipts?: ReceiptUncheckedUpdateManyWithoutVerifierNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrderUpsertWithoutNlCommandsInput = {
    update: XOR<OrderUpdateWithoutNlCommandsInput, OrderUncheckedUpdateWithoutNlCommandsInput>
    create: XOR<OrderCreateWithoutNlCommandsInput, OrderUncheckedCreateWithoutNlCommandsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutNlCommandsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutNlCommandsInput, OrderUncheckedUpdateWithoutNlCommandsInput>
  }

  export type OrderUpdateWithoutNlCommandsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    assignedVehicle?: VehicleUpdateOneWithoutOrdersNestedInput
    schedules?: ScheduleUpdateManyWithoutOrderNestedInput
    trackings?: TrackingUpdateManyWithoutOrderNestedInput
    receipts?: ReceiptUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutNlCommandsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    assignedVehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutOrderNestedInput
    trackings?: TrackingUncheckedUpdateManyWithoutOrderNestedInput
    receipts?: ReceiptUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicles?: VehicleCreateNestedManyWithoutDriverInput
    receipts?: ReceiptCreateNestedManyWithoutVerifierInput
    nlCommands?: NLCommandCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicles?: VehicleUncheckedCreateNestedManyWithoutDriverInput
    receipts?: ReceiptUncheckedCreateNestedManyWithoutVerifierInput
    nlCommands?: NLCommandUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUpdateManyWithoutDriverNestedInput
    receipts?: ReceiptUpdateManyWithoutVerifierNestedInput
    nlCommands?: NLCommandUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUncheckedUpdateManyWithoutDriverNestedInput
    receipts?: ReceiptUncheckedUpdateManyWithoutVerifierNestedInput
    nlCommands?: NLCommandUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VehicleCreateManyDriverInput = {
    id?: string
    licensePlate: string
    type: $Enums.VehicleType
    capacity: number
    status?: $Enums.VehicleStatus
    currentLocation?: string | null
    lastMaintenance?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReceiptCreateManyVerifierInput = {
    id?: string
    orderId: string
    status?: $Enums.ReceiptStatus
    imageUrl?: string | null
    notes?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NLCommandCreateManyUserInput = {
    id?: string
    command: string
    intent: string
    parameters: JsonNullValueInput | InputJsonValue
    confidence?: number
    status?: $Enums.CommandStatus
    executed?: boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    orderId?: string | null
    createdAt?: Date | string
    executedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type VehicleUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: FloatFieldUpdateOperationsInput | number
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUpdateManyWithoutVehicleNestedInput
    orders?: OrderUpdateManyWithoutAssignedVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: FloatFieldUpdateOperationsInput | number
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutVehicleNestedInput
    orders?: OrderUncheckedUpdateManyWithoutAssignedVehicleNestedInput
  }

  export type VehicleUncheckedUpdateManyWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    capacity?: FloatFieldUpdateOperationsInput | number
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptUpdateWithoutVerifierInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutReceiptsNestedInput
  }

  export type ReceiptUncheckedUpdateWithoutVerifierInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptUncheckedUpdateManyWithoutVerifierInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NLCommandUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    command?: StringFieldUpdateOperationsInput | string
    intent?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    status?: EnumCommandStatusFieldUpdateOperationsInput | $Enums.CommandStatus
    executed?: BoolFieldUpdateOperationsInput | boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneWithoutNlCommandsNestedInput
  }

  export type NLCommandUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    command?: StringFieldUpdateOperationsInput | string
    intent?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    status?: EnumCommandStatusFieldUpdateOperationsInput | $Enums.CommandStatus
    executed?: BoolFieldUpdateOperationsInput | boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NLCommandUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    command?: StringFieldUpdateOperationsInput | string
    intent?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    status?: EnumCommandStatusFieldUpdateOperationsInput | $Enums.CommandStatus
    executed?: BoolFieldUpdateOperationsInput | boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyCustomerInput = {
    id?: string
    orderNumber: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    assignedVehicleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedVehicle?: VehicleUpdateOneWithoutOrdersNestedInput
    schedules?: ScheduleUpdateManyWithoutOrderNestedInput
    trackings?: TrackingUpdateManyWithoutOrderNestedInput
    receipts?: ReceiptUpdateManyWithoutOrderNestedInput
    nlCommands?: NLCommandUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    assignedVehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutOrderNestedInput
    trackings?: TrackingUncheckedUpdateManyWithoutOrderNestedInput
    receipts?: ReceiptUncheckedUpdateManyWithoutOrderNestedInput
    nlCommands?: NLCommandUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    assignedVehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateManyOrderInput = {
    id?: string
    vehicleId: string
    plannedDeparture: Date | string
    plannedArrival: Date | string
    actualDeparture?: Date | string | null
    actualArrival?: Date | string | null
    status?: $Enums.ScheduleStatus
    route?: ScheduleCreaterouteInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackingCreateManyOrderInput = {
    id?: string
    location: string
    coordinates: JsonNullValueInput | InputJsonValue
    status?: $Enums.TrackingStatus
    timestamp?: Date | string
    notes?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReceiptCreateManyOrderInput = {
    id?: string
    status?: $Enums.ReceiptStatus
    imageUrl?: string | null
    notes?: string | null
    verifiedBy?: string | null
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NLCommandCreateManyOrderInput = {
    id?: string
    command: string
    intent: string
    parameters: JsonNullValueInput | InputJsonValue
    confidence?: number
    status?: $Enums.CommandStatus
    executed?: boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    userId?: string | null
    createdAt?: Date | string
    executedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ScheduleUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    plannedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualArrival?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    route?: ScheduleUpdaterouteInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutSchedulesNestedInput
  }

  export type ScheduleUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    plannedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualArrival?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    route?: ScheduleUpdaterouteInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    plannedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualArrival?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    route?: ScheduleUpdaterouteInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    coordinates?: JsonNullValueInput | InputJsonValue
    status?: EnumTrackingStatusFieldUpdateOperationsInput | $Enums.TrackingStatus
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    coordinates?: JsonNullValueInput | InputJsonValue
    status?: EnumTrackingStatusFieldUpdateOperationsInput | $Enums.TrackingStatus
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    coordinates?: JsonNullValueInput | InputJsonValue
    status?: EnumTrackingStatusFieldUpdateOperationsInput | $Enums.TrackingStatus
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifier?: UserUpdateOneWithoutReceiptsNestedInput
  }

  export type ReceiptUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReceiptStatusFieldUpdateOperationsInput | $Enums.ReceiptStatus
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NLCommandUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    command?: StringFieldUpdateOperationsInput | string
    intent?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    status?: EnumCommandStatusFieldUpdateOperationsInput | $Enums.CommandStatus
    executed?: BoolFieldUpdateOperationsInput | boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutNlCommandsNestedInput
  }

  export type NLCommandUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    command?: StringFieldUpdateOperationsInput | string
    intent?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    status?: EnumCommandStatusFieldUpdateOperationsInput | $Enums.CommandStatus
    executed?: BoolFieldUpdateOperationsInput | boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NLCommandUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    command?: StringFieldUpdateOperationsInput | string
    intent?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    confidence?: FloatFieldUpdateOperationsInput | number
    status?: EnumCommandStatusFieldUpdateOperationsInput | $Enums.CommandStatus
    executed?: BoolFieldUpdateOperationsInput | boolean
    result?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateManyVehicleInput = {
    id?: string
    orderId: string
    plannedDeparture: Date | string
    plannedArrival: Date | string
    actualDeparture?: Date | string | null
    actualArrival?: Date | string | null
    status?: $Enums.ScheduleStatus
    route?: ScheduleCreaterouteInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyAssignedVehicleInput = {
    id?: string
    orderNumber: string
    customerId: string
    status?: $Enums.OrderStatus
    origin: string
    destination: string
    weight: number
    volume: number
    value?: number | null
    pickupTime: Date | string
    deliveryTime: Date | string
    specialInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    plannedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualArrival?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    route?: ScheduleUpdaterouteInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutSchedulesNestedInput
  }

  export type ScheduleUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    plannedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualArrival?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    route?: ScheduleUpdaterouteInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    plannedDeparture?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedArrival?: DateTimeFieldUpdateOperationsInput | Date | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualArrival?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumScheduleStatusFieldUpdateOperationsInput | $Enums.ScheduleStatus
    route?: ScheduleUpdaterouteInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutAssignedVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    schedules?: ScheduleUpdateManyWithoutOrderNestedInput
    trackings?: TrackingUpdateManyWithoutOrderNestedInput
    receipts?: ReceiptUpdateManyWithoutOrderNestedInput
    nlCommands?: NLCommandUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutAssignedVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutOrderNestedInput
    trackings?: TrackingUncheckedUpdateManyWithoutOrderNestedInput
    receipts?: ReceiptUncheckedUpdateManyWithoutOrderNestedInput
    nlCommands?: NLCommandUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutAssignedVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: DateTimeFieldUpdateOperationsInput | Date | string
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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