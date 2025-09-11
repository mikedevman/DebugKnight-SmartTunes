
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
 * Model album
 * 
 */
export type album = $Result.DefaultSelection<Prisma.$albumPayload>
/**
 * Model album_author
 * 
 */
export type album_author = $Result.DefaultSelection<Prisma.$album_authorPayload>
/**
 * Model playhistory
 * 
 */
export type playhistory = $Result.DefaultSelection<Prisma.$playhistoryPayload>
/**
 * Model playlist
 * 
 */
export type playlist = $Result.DefaultSelection<Prisma.$playlistPayload>
/**
 * Model playlist_song
 * 
 */
export type playlist_song = $Result.DefaultSelection<Prisma.$playlist_songPayload>
/**
 * Model song
 * 
 */
export type song = $Result.DefaultSelection<Prisma.$songPayload>
/**
 * Model song_author
 * 
 */
export type song_author = $Result.DefaultSelection<Prisma.$song_authorPayload>
/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Albums
 * const albums = await prisma.album.findMany()
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
   * // Fetch zero or more Albums
   * const albums = await prisma.album.findMany()
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
   * `prisma.album`: Exposes CRUD operations for the **album** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Albums
    * const albums = await prisma.album.findMany()
    * ```
    */
  get album(): Prisma.albumDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.album_author`: Exposes CRUD operations for the **album_author** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Album_authors
    * const album_authors = await prisma.album_author.findMany()
    * ```
    */
  get album_author(): Prisma.album_authorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.playhistory`: Exposes CRUD operations for the **playhistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Playhistories
    * const playhistories = await prisma.playhistory.findMany()
    * ```
    */
  get playhistory(): Prisma.playhistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.playlist`: Exposes CRUD operations for the **playlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Playlists
    * const playlists = await prisma.playlist.findMany()
    * ```
    */
  get playlist(): Prisma.playlistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.playlist_song`: Exposes CRUD operations for the **playlist_song** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Playlist_songs
    * const playlist_songs = await prisma.playlist_song.findMany()
    * ```
    */
  get playlist_song(): Prisma.playlist_songDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.song`: Exposes CRUD operations for the **song** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Songs
    * const songs = await prisma.song.findMany()
    * ```
    */
  get song(): Prisma.songDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.song_author`: Exposes CRUD operations for the **song_author** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Song_authors
    * const song_authors = await prisma.song_author.findMany()
    * ```
    */
  get song_author(): Prisma.song_authorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.16.0
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
    album: 'album',
    album_author: 'album_author',
    playhistory: 'playhistory',
    playlist: 'playlist',
    playlist_song: 'playlist_song',
    song: 'song',
    song_author: 'song_author',
    user: 'user'
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
      modelProps: "album" | "album_author" | "playhistory" | "playlist" | "playlist_song" | "song" | "song_author" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      album: {
        payload: Prisma.$albumPayload<ExtArgs>
        fields: Prisma.albumFieldRefs
        operations: {
          findUnique: {
            args: Prisma.albumFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$albumPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.albumFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$albumPayload>
          }
          findFirst: {
            args: Prisma.albumFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$albumPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.albumFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$albumPayload>
          }
          findMany: {
            args: Prisma.albumFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$albumPayload>[]
          }
          create: {
            args: Prisma.albumCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$albumPayload>
          }
          createMany: {
            args: Prisma.albumCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.albumDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$albumPayload>
          }
          update: {
            args: Prisma.albumUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$albumPayload>
          }
          deleteMany: {
            args: Prisma.albumDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.albumUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.albumUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$albumPayload>
          }
          aggregate: {
            args: Prisma.AlbumAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlbum>
          }
          groupBy: {
            args: Prisma.albumGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlbumGroupByOutputType>[]
          }
          count: {
            args: Prisma.albumCountArgs<ExtArgs>
            result: $Utils.Optional<AlbumCountAggregateOutputType> | number
          }
        }
      }
      album_author: {
        payload: Prisma.$album_authorPayload<ExtArgs>
        fields: Prisma.album_authorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.album_authorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$album_authorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.album_authorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$album_authorPayload>
          }
          findFirst: {
            args: Prisma.album_authorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$album_authorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.album_authorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$album_authorPayload>
          }
          findMany: {
            args: Prisma.album_authorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$album_authorPayload>[]
          }
          create: {
            args: Prisma.album_authorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$album_authorPayload>
          }
          createMany: {
            args: Prisma.album_authorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.album_authorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$album_authorPayload>
          }
          update: {
            args: Prisma.album_authorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$album_authorPayload>
          }
          deleteMany: {
            args: Prisma.album_authorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.album_authorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.album_authorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$album_authorPayload>
          }
          aggregate: {
            args: Prisma.Album_authorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlbum_author>
          }
          groupBy: {
            args: Prisma.album_authorGroupByArgs<ExtArgs>
            result: $Utils.Optional<Album_authorGroupByOutputType>[]
          }
          count: {
            args: Prisma.album_authorCountArgs<ExtArgs>
            result: $Utils.Optional<Album_authorCountAggregateOutputType> | number
          }
        }
      }
      playhistory: {
        payload: Prisma.$playhistoryPayload<ExtArgs>
        fields: Prisma.playhistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.playhistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playhistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.playhistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playhistoryPayload>
          }
          findFirst: {
            args: Prisma.playhistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playhistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.playhistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playhistoryPayload>
          }
          findMany: {
            args: Prisma.playhistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playhistoryPayload>[]
          }
          create: {
            args: Prisma.playhistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playhistoryPayload>
          }
          createMany: {
            args: Prisma.playhistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.playhistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playhistoryPayload>
          }
          update: {
            args: Prisma.playhistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playhistoryPayload>
          }
          deleteMany: {
            args: Prisma.playhistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.playhistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.playhistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playhistoryPayload>
          }
          aggregate: {
            args: Prisma.PlayhistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayhistory>
          }
          groupBy: {
            args: Prisma.playhistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayhistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.playhistoryCountArgs<ExtArgs>
            result: $Utils.Optional<PlayhistoryCountAggregateOutputType> | number
          }
        }
      }
      playlist: {
        payload: Prisma.$playlistPayload<ExtArgs>
        fields: Prisma.playlistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.playlistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.playlistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlistPayload>
          }
          findFirst: {
            args: Prisma.playlistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.playlistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlistPayload>
          }
          findMany: {
            args: Prisma.playlistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlistPayload>[]
          }
          create: {
            args: Prisma.playlistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlistPayload>
          }
          createMany: {
            args: Prisma.playlistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.playlistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlistPayload>
          }
          update: {
            args: Prisma.playlistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlistPayload>
          }
          deleteMany: {
            args: Prisma.playlistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.playlistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.playlistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlistPayload>
          }
          aggregate: {
            args: Prisma.PlaylistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlaylist>
          }
          groupBy: {
            args: Prisma.playlistGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlaylistGroupByOutputType>[]
          }
          count: {
            args: Prisma.playlistCountArgs<ExtArgs>
            result: $Utils.Optional<PlaylistCountAggregateOutputType> | number
          }
        }
      }
      playlist_song: {
        payload: Prisma.$playlist_songPayload<ExtArgs>
        fields: Prisma.playlist_songFieldRefs
        operations: {
          findUnique: {
            args: Prisma.playlist_songFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlist_songPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.playlist_songFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlist_songPayload>
          }
          findFirst: {
            args: Prisma.playlist_songFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlist_songPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.playlist_songFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlist_songPayload>
          }
          findMany: {
            args: Prisma.playlist_songFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlist_songPayload>[]
          }
          create: {
            args: Prisma.playlist_songCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlist_songPayload>
          }
          createMany: {
            args: Prisma.playlist_songCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.playlist_songDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlist_songPayload>
          }
          update: {
            args: Prisma.playlist_songUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlist_songPayload>
          }
          deleteMany: {
            args: Prisma.playlist_songDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.playlist_songUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.playlist_songUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$playlist_songPayload>
          }
          aggregate: {
            args: Prisma.Playlist_songAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlaylist_song>
          }
          groupBy: {
            args: Prisma.playlist_songGroupByArgs<ExtArgs>
            result: $Utils.Optional<Playlist_songGroupByOutputType>[]
          }
          count: {
            args: Prisma.playlist_songCountArgs<ExtArgs>
            result: $Utils.Optional<Playlist_songCountAggregateOutputType> | number
          }
        }
      }
      song: {
        payload: Prisma.$songPayload<ExtArgs>
        fields: Prisma.songFieldRefs
        operations: {
          findUnique: {
            args: Prisma.songFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$songPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.songFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$songPayload>
          }
          findFirst: {
            args: Prisma.songFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$songPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.songFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$songPayload>
          }
          findMany: {
            args: Prisma.songFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$songPayload>[]
          }
          create: {
            args: Prisma.songCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$songPayload>
          }
          createMany: {
            args: Prisma.songCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.songDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$songPayload>
          }
          update: {
            args: Prisma.songUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$songPayload>
          }
          deleteMany: {
            args: Prisma.songDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.songUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.songUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$songPayload>
          }
          aggregate: {
            args: Prisma.SongAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSong>
          }
          groupBy: {
            args: Prisma.songGroupByArgs<ExtArgs>
            result: $Utils.Optional<SongGroupByOutputType>[]
          }
          count: {
            args: Prisma.songCountArgs<ExtArgs>
            result: $Utils.Optional<SongCountAggregateOutputType> | number
          }
        }
      }
      song_author: {
        payload: Prisma.$song_authorPayload<ExtArgs>
        fields: Prisma.song_authorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.song_authorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$song_authorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.song_authorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$song_authorPayload>
          }
          findFirst: {
            args: Prisma.song_authorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$song_authorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.song_authorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$song_authorPayload>
          }
          findMany: {
            args: Prisma.song_authorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$song_authorPayload>[]
          }
          create: {
            args: Prisma.song_authorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$song_authorPayload>
          }
          createMany: {
            args: Prisma.song_authorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.song_authorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$song_authorPayload>
          }
          update: {
            args: Prisma.song_authorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$song_authorPayload>
          }
          deleteMany: {
            args: Prisma.song_authorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.song_authorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.song_authorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$song_authorPayload>
          }
          aggregate: {
            args: Prisma.Song_authorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSong_author>
          }
          groupBy: {
            args: Prisma.song_authorGroupByArgs<ExtArgs>
            result: $Utils.Optional<Song_authorGroupByOutputType>[]
          }
          count: {
            args: Prisma.song_authorCountArgs<ExtArgs>
            result: $Utils.Optional<Song_authorCountAggregateOutputType> | number
          }
        }
      }
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
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
    album?: albumOmit
    album_author?: album_authorOmit
    playhistory?: playhistoryOmit
    playlist?: playlistOmit
    playlist_song?: playlist_songOmit
    song?: songOmit
    song_author?: song_authorOmit
    user?: userOmit
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
   * Count Type AlbumCountOutputType
   */

  export type AlbumCountOutputType = {
    album_author: number
    song_song_albumToalbum: number
  }

  export type AlbumCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    album_author?: boolean | AlbumCountOutputTypeCountAlbum_authorArgs
    song_song_albumToalbum?: boolean | AlbumCountOutputTypeCountSong_song_albumToalbumArgs
  }

  // Custom InputTypes
  /**
   * AlbumCountOutputType without action
   */
  export type AlbumCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumCountOutputType
     */
    select?: AlbumCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AlbumCountOutputType without action
   */
  export type AlbumCountOutputTypeCountAlbum_authorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: album_authorWhereInput
  }

  /**
   * AlbumCountOutputType without action
   */
  export type AlbumCountOutputTypeCountSong_song_albumToalbumArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: songWhereInput
  }


  /**
   * Count Type PlaylistCountOutputType
   */

  export type PlaylistCountOutputType = {
    playlist_song: number
  }

  export type PlaylistCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playlist_song?: boolean | PlaylistCountOutputTypeCountPlaylist_songArgs
  }

  // Custom InputTypes
  /**
   * PlaylistCountOutputType without action
   */
  export type PlaylistCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCountOutputType
     */
    select?: PlaylistCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlaylistCountOutputType without action
   */
  export type PlaylistCountOutputTypeCountPlaylist_songArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: playlist_songWhereInput
  }


  /**
   * Count Type SongCountOutputType
   */

  export type SongCountOutputType = {
    playhistory: number
    playlist_song: number
    song_author: number
  }

  export type SongCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playhistory?: boolean | SongCountOutputTypeCountPlayhistoryArgs
    playlist_song?: boolean | SongCountOutputTypeCountPlaylist_songArgs
    song_author?: boolean | SongCountOutputTypeCountSong_authorArgs
  }

  // Custom InputTypes
  /**
   * SongCountOutputType without action
   */
  export type SongCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongCountOutputType
     */
    select?: SongCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SongCountOutputType without action
   */
  export type SongCountOutputTypeCountPlayhistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: playhistoryWhereInput
  }

  /**
   * SongCountOutputType without action
   */
  export type SongCountOutputTypeCountPlaylist_songArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: playlist_songWhereInput
  }

  /**
   * SongCountOutputType without action
   */
  export type SongCountOutputTypeCountSong_authorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: song_authorWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    album_author: number
    playhistory: number
    playlist: number
    song_author: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    album_author?: boolean | UserCountOutputTypeCountAlbum_authorArgs
    playhistory?: boolean | UserCountOutputTypeCountPlayhistoryArgs
    playlist?: boolean | UserCountOutputTypeCountPlaylistArgs
    song_author?: boolean | UserCountOutputTypeCountSong_authorArgs
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
  export type UserCountOutputTypeCountAlbum_authorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: album_authorWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPlayhistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: playhistoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPlaylistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: playlistWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSong_authorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: song_authorWhereInput
  }


  /**
   * Models
   */

  /**
   * Model album
   */

  export type AggregateAlbum = {
    _count: AlbumCountAggregateOutputType | null
    _avg: AlbumAvgAggregateOutputType | null
    _sum: AlbumSumAggregateOutputType | null
    _min: AlbumMinAggregateOutputType | null
    _max: AlbumMaxAggregateOutputType | null
  }

  export type AlbumAvgAggregateOutputType = {
    id: number | null
  }

  export type AlbumSumAggregateOutputType = {
    id: number | null
  }

  export type AlbumMinAggregateOutputType = {
    id: number | null
    album_name: string | null
  }

  export type AlbumMaxAggregateOutputType = {
    id: number | null
    album_name: string | null
  }

  export type AlbumCountAggregateOutputType = {
    id: number
    album_name: number
    _all: number
  }


  export type AlbumAvgAggregateInputType = {
    id?: true
  }

  export type AlbumSumAggregateInputType = {
    id?: true
  }

  export type AlbumMinAggregateInputType = {
    id?: true
    album_name?: true
  }

  export type AlbumMaxAggregateInputType = {
    id?: true
    album_name?: true
  }

  export type AlbumCountAggregateInputType = {
    id?: true
    album_name?: true
    _all?: true
  }

  export type AlbumAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which album to aggregate.
     */
    where?: albumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of albums to fetch.
     */
    orderBy?: albumOrderByWithRelationInput | albumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: albumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` albums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` albums.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned albums
    **/
    _count?: true | AlbumCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlbumAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlbumSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlbumMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlbumMaxAggregateInputType
  }

  export type GetAlbumAggregateType<T extends AlbumAggregateArgs> = {
        [P in keyof T & keyof AggregateAlbum]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlbum[P]>
      : GetScalarType<T[P], AggregateAlbum[P]>
  }




  export type albumGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: albumWhereInput
    orderBy?: albumOrderByWithAggregationInput | albumOrderByWithAggregationInput[]
    by: AlbumScalarFieldEnum[] | AlbumScalarFieldEnum
    having?: albumScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlbumCountAggregateInputType | true
    _avg?: AlbumAvgAggregateInputType
    _sum?: AlbumSumAggregateInputType
    _min?: AlbumMinAggregateInputType
    _max?: AlbumMaxAggregateInputType
  }

  export type AlbumGroupByOutputType = {
    id: number
    album_name: string
    _count: AlbumCountAggregateOutputType | null
    _avg: AlbumAvgAggregateOutputType | null
    _sum: AlbumSumAggregateOutputType | null
    _min: AlbumMinAggregateOutputType | null
    _max: AlbumMaxAggregateOutputType | null
  }

  type GetAlbumGroupByPayload<T extends albumGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlbumGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlbumGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlbumGroupByOutputType[P]>
            : GetScalarType<T[P], AlbumGroupByOutputType[P]>
        }
      >
    >


  export type albumSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    album_name?: boolean
    album_author?: boolean | album$album_authorArgs<ExtArgs>
    song_song_albumToalbum?: boolean | album$song_song_albumToalbumArgs<ExtArgs>
    _count?: boolean | AlbumCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["album"]>



  export type albumSelectScalar = {
    id?: boolean
    album_name?: boolean
  }

  export type albumOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "album_name", ExtArgs["result"]["album"]>
  export type albumInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    album_author?: boolean | album$album_authorArgs<ExtArgs>
    song_song_albumToalbum?: boolean | album$song_song_albumToalbumArgs<ExtArgs>
    _count?: boolean | AlbumCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $albumPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "album"
    objects: {
      album_author: Prisma.$album_authorPayload<ExtArgs>[]
      song_song_albumToalbum: Prisma.$songPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      album_name: string
    }, ExtArgs["result"]["album"]>
    composites: {}
  }

  type albumGetPayload<S extends boolean | null | undefined | albumDefaultArgs> = $Result.GetResult<Prisma.$albumPayload, S>

  type albumCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<albumFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlbumCountAggregateInputType | true
    }

  export interface albumDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['album'], meta: { name: 'album' } }
    /**
     * Find zero or one Album that matches the filter.
     * @param {albumFindUniqueArgs} args - Arguments to find a Album
     * @example
     * // Get one Album
     * const album = await prisma.album.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends albumFindUniqueArgs>(args: SelectSubset<T, albumFindUniqueArgs<ExtArgs>>): Prisma__albumClient<$Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Album that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {albumFindUniqueOrThrowArgs} args - Arguments to find a Album
     * @example
     * // Get one Album
     * const album = await prisma.album.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends albumFindUniqueOrThrowArgs>(args: SelectSubset<T, albumFindUniqueOrThrowArgs<ExtArgs>>): Prisma__albumClient<$Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Album that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {albumFindFirstArgs} args - Arguments to find a Album
     * @example
     * // Get one Album
     * const album = await prisma.album.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends albumFindFirstArgs>(args?: SelectSubset<T, albumFindFirstArgs<ExtArgs>>): Prisma__albumClient<$Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Album that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {albumFindFirstOrThrowArgs} args - Arguments to find a Album
     * @example
     * // Get one Album
     * const album = await prisma.album.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends albumFindFirstOrThrowArgs>(args?: SelectSubset<T, albumFindFirstOrThrowArgs<ExtArgs>>): Prisma__albumClient<$Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Albums that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {albumFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Albums
     * const albums = await prisma.album.findMany()
     * 
     * // Get first 10 Albums
     * const albums = await prisma.album.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const albumWithIdOnly = await prisma.album.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends albumFindManyArgs>(args?: SelectSubset<T, albumFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Album.
     * @param {albumCreateArgs} args - Arguments to create a Album.
     * @example
     * // Create one Album
     * const Album = await prisma.album.create({
     *   data: {
     *     // ... data to create a Album
     *   }
     * })
     * 
     */
    create<T extends albumCreateArgs>(args: SelectSubset<T, albumCreateArgs<ExtArgs>>): Prisma__albumClient<$Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Albums.
     * @param {albumCreateManyArgs} args - Arguments to create many Albums.
     * @example
     * // Create many Albums
     * const album = await prisma.album.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends albumCreateManyArgs>(args?: SelectSubset<T, albumCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Album.
     * @param {albumDeleteArgs} args - Arguments to delete one Album.
     * @example
     * // Delete one Album
     * const Album = await prisma.album.delete({
     *   where: {
     *     // ... filter to delete one Album
     *   }
     * })
     * 
     */
    delete<T extends albumDeleteArgs>(args: SelectSubset<T, albumDeleteArgs<ExtArgs>>): Prisma__albumClient<$Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Album.
     * @param {albumUpdateArgs} args - Arguments to update one Album.
     * @example
     * // Update one Album
     * const album = await prisma.album.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends albumUpdateArgs>(args: SelectSubset<T, albumUpdateArgs<ExtArgs>>): Prisma__albumClient<$Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Albums.
     * @param {albumDeleteManyArgs} args - Arguments to filter Albums to delete.
     * @example
     * // Delete a few Albums
     * const { count } = await prisma.album.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends albumDeleteManyArgs>(args?: SelectSubset<T, albumDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Albums.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {albumUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Albums
     * const album = await prisma.album.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends albumUpdateManyArgs>(args: SelectSubset<T, albumUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Album.
     * @param {albumUpsertArgs} args - Arguments to update or create a Album.
     * @example
     * // Update or create a Album
     * const album = await prisma.album.upsert({
     *   create: {
     *     // ... data to create a Album
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Album we want to update
     *   }
     * })
     */
    upsert<T extends albumUpsertArgs>(args: SelectSubset<T, albumUpsertArgs<ExtArgs>>): Prisma__albumClient<$Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Albums.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {albumCountArgs} args - Arguments to filter Albums to count.
     * @example
     * // Count the number of Albums
     * const count = await prisma.album.count({
     *   where: {
     *     // ... the filter for the Albums we want to count
     *   }
     * })
    **/
    count<T extends albumCountArgs>(
      args?: Subset<T, albumCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlbumCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Album.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AlbumAggregateArgs>(args: Subset<T, AlbumAggregateArgs>): Prisma.PrismaPromise<GetAlbumAggregateType<T>>

    /**
     * Group by Album.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {albumGroupByArgs} args - Group by arguments.
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
      T extends albumGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: albumGroupByArgs['orderBy'] }
        : { orderBy?: albumGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, albumGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlbumGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the album model
   */
  readonly fields: albumFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for album.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__albumClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    album_author<T extends album$album_authorArgs<ExtArgs> = {}>(args?: Subset<T, album$album_authorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$album_authorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    song_song_albumToalbum<T extends album$song_song_albumToalbumArgs<ExtArgs> = {}>(args?: Subset<T, album$song_song_albumToalbumArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$songPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the album model
   */
  interface albumFieldRefs {
    readonly id: FieldRef<"album", 'Int'>
    readonly album_name: FieldRef<"album", 'String'>
  }
    

  // Custom InputTypes
  /**
   * album findUnique
   */
  export type albumFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * Filter, which album to fetch.
     */
    where: albumWhereUniqueInput
  }

  /**
   * album findUniqueOrThrow
   */
  export type albumFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * Filter, which album to fetch.
     */
    where: albumWhereUniqueInput
  }

  /**
   * album findFirst
   */
  export type albumFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * Filter, which album to fetch.
     */
    where?: albumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of albums to fetch.
     */
    orderBy?: albumOrderByWithRelationInput | albumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for albums.
     */
    cursor?: albumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` albums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` albums.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of albums.
     */
    distinct?: AlbumScalarFieldEnum | AlbumScalarFieldEnum[]
  }

  /**
   * album findFirstOrThrow
   */
  export type albumFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * Filter, which album to fetch.
     */
    where?: albumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of albums to fetch.
     */
    orderBy?: albumOrderByWithRelationInput | albumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for albums.
     */
    cursor?: albumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` albums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` albums.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of albums.
     */
    distinct?: AlbumScalarFieldEnum | AlbumScalarFieldEnum[]
  }

  /**
   * album findMany
   */
  export type albumFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * Filter, which albums to fetch.
     */
    where?: albumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of albums to fetch.
     */
    orderBy?: albumOrderByWithRelationInput | albumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing albums.
     */
    cursor?: albumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` albums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` albums.
     */
    skip?: number
    distinct?: AlbumScalarFieldEnum | AlbumScalarFieldEnum[]
  }

  /**
   * album create
   */
  export type albumCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * The data needed to create a album.
     */
    data: XOR<albumCreateInput, albumUncheckedCreateInput>
  }

  /**
   * album createMany
   */
  export type albumCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many albums.
     */
    data: albumCreateManyInput | albumCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * album update
   */
  export type albumUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * The data needed to update a album.
     */
    data: XOR<albumUpdateInput, albumUncheckedUpdateInput>
    /**
     * Choose, which album to update.
     */
    where: albumWhereUniqueInput
  }

  /**
   * album updateMany
   */
  export type albumUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update albums.
     */
    data: XOR<albumUpdateManyMutationInput, albumUncheckedUpdateManyInput>
    /**
     * Filter which albums to update
     */
    where?: albumWhereInput
    /**
     * Limit how many albums to update.
     */
    limit?: number
  }

  /**
   * album upsert
   */
  export type albumUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * The filter to search for the album to update in case it exists.
     */
    where: albumWhereUniqueInput
    /**
     * In case the album found by the `where` argument doesn't exist, create a new album with this data.
     */
    create: XOR<albumCreateInput, albumUncheckedCreateInput>
    /**
     * In case the album was found with the provided `where` argument, update it with this data.
     */
    update: XOR<albumUpdateInput, albumUncheckedUpdateInput>
  }

  /**
   * album delete
   */
  export type albumDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    /**
     * Filter which album to delete.
     */
    where: albumWhereUniqueInput
  }

  /**
   * album deleteMany
   */
  export type albumDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which albums to delete
     */
    where?: albumWhereInput
    /**
     * Limit how many albums to delete.
     */
    limit?: number
  }

  /**
   * album.album_author
   */
  export type album$album_authorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album_author
     */
    select?: album_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album_author
     */
    omit?: album_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: album_authorInclude<ExtArgs> | null
    where?: album_authorWhereInput
    orderBy?: album_authorOrderByWithRelationInput | album_authorOrderByWithRelationInput[]
    cursor?: album_authorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Album_authorScalarFieldEnum | Album_authorScalarFieldEnum[]
  }

  /**
   * album.song_song_albumToalbum
   */
  export type album$song_song_albumToalbumArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song
     */
    select?: songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song
     */
    omit?: songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: songInclude<ExtArgs> | null
    where?: songWhereInput
    orderBy?: songOrderByWithRelationInput | songOrderByWithRelationInput[]
    cursor?: songWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SongScalarFieldEnum | SongScalarFieldEnum[]
  }

  /**
   * album without action
   */
  export type albumDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
  }


  /**
   * Model album_author
   */

  export type AggregateAlbum_author = {
    _count: Album_authorCountAggregateOutputType | null
    _avg: Album_authorAvgAggregateOutputType | null
    _sum: Album_authorSumAggregateOutputType | null
    _min: Album_authorMinAggregateOutputType | null
    _max: Album_authorMaxAggregateOutputType | null
  }

  export type Album_authorAvgAggregateOutputType = {
    id: number | null
    author_id: number | null
    album_id: number | null
  }

  export type Album_authorSumAggregateOutputType = {
    id: number | null
    author_id: number | null
    album_id: number | null
  }

  export type Album_authorMinAggregateOutputType = {
    id: number | null
    author_id: number | null
    album_id: number | null
  }

  export type Album_authorMaxAggregateOutputType = {
    id: number | null
    author_id: number | null
    album_id: number | null
  }

  export type Album_authorCountAggregateOutputType = {
    id: number
    author_id: number
    album_id: number
    _all: number
  }


  export type Album_authorAvgAggregateInputType = {
    id?: true
    author_id?: true
    album_id?: true
  }

  export type Album_authorSumAggregateInputType = {
    id?: true
    author_id?: true
    album_id?: true
  }

  export type Album_authorMinAggregateInputType = {
    id?: true
    author_id?: true
    album_id?: true
  }

  export type Album_authorMaxAggregateInputType = {
    id?: true
    author_id?: true
    album_id?: true
  }

  export type Album_authorCountAggregateInputType = {
    id?: true
    author_id?: true
    album_id?: true
    _all?: true
  }

  export type Album_authorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which album_author to aggregate.
     */
    where?: album_authorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of album_authors to fetch.
     */
    orderBy?: album_authorOrderByWithRelationInput | album_authorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: album_authorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` album_authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` album_authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned album_authors
    **/
    _count?: true | Album_authorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Album_authorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Album_authorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Album_authorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Album_authorMaxAggregateInputType
  }

  export type GetAlbum_authorAggregateType<T extends Album_authorAggregateArgs> = {
        [P in keyof T & keyof AggregateAlbum_author]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlbum_author[P]>
      : GetScalarType<T[P], AggregateAlbum_author[P]>
  }




  export type album_authorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: album_authorWhereInput
    orderBy?: album_authorOrderByWithAggregationInput | album_authorOrderByWithAggregationInput[]
    by: Album_authorScalarFieldEnum[] | Album_authorScalarFieldEnum
    having?: album_authorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Album_authorCountAggregateInputType | true
    _avg?: Album_authorAvgAggregateInputType
    _sum?: Album_authorSumAggregateInputType
    _min?: Album_authorMinAggregateInputType
    _max?: Album_authorMaxAggregateInputType
  }

  export type Album_authorGroupByOutputType = {
    id: number
    author_id: number
    album_id: number
    _count: Album_authorCountAggregateOutputType | null
    _avg: Album_authorAvgAggregateOutputType | null
    _sum: Album_authorSumAggregateOutputType | null
    _min: Album_authorMinAggregateOutputType | null
    _max: Album_authorMaxAggregateOutputType | null
  }

  type GetAlbum_authorGroupByPayload<T extends album_authorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Album_authorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Album_authorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Album_authorGroupByOutputType[P]>
            : GetScalarType<T[P], Album_authorGroupByOutputType[P]>
        }
      >
    >


  export type album_authorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    author_id?: boolean
    album_id?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    album?: boolean | albumDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["album_author"]>



  export type album_authorSelectScalar = {
    id?: boolean
    author_id?: boolean
    album_id?: boolean
  }

  export type album_authorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "author_id" | "album_id", ExtArgs["result"]["album_author"]>
  export type album_authorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    album?: boolean | albumDefaultArgs<ExtArgs>
  }

  export type $album_authorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "album_author"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      album: Prisma.$albumPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      author_id: number
      album_id: number
    }, ExtArgs["result"]["album_author"]>
    composites: {}
  }

  type album_authorGetPayload<S extends boolean | null | undefined | album_authorDefaultArgs> = $Result.GetResult<Prisma.$album_authorPayload, S>

  type album_authorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<album_authorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Album_authorCountAggregateInputType | true
    }

  export interface album_authorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['album_author'], meta: { name: 'album_author' } }
    /**
     * Find zero or one Album_author that matches the filter.
     * @param {album_authorFindUniqueArgs} args - Arguments to find a Album_author
     * @example
     * // Get one Album_author
     * const album_author = await prisma.album_author.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends album_authorFindUniqueArgs>(args: SelectSubset<T, album_authorFindUniqueArgs<ExtArgs>>): Prisma__album_authorClient<$Result.GetResult<Prisma.$album_authorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Album_author that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {album_authorFindUniqueOrThrowArgs} args - Arguments to find a Album_author
     * @example
     * // Get one Album_author
     * const album_author = await prisma.album_author.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends album_authorFindUniqueOrThrowArgs>(args: SelectSubset<T, album_authorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__album_authorClient<$Result.GetResult<Prisma.$album_authorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Album_author that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {album_authorFindFirstArgs} args - Arguments to find a Album_author
     * @example
     * // Get one Album_author
     * const album_author = await prisma.album_author.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends album_authorFindFirstArgs>(args?: SelectSubset<T, album_authorFindFirstArgs<ExtArgs>>): Prisma__album_authorClient<$Result.GetResult<Prisma.$album_authorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Album_author that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {album_authorFindFirstOrThrowArgs} args - Arguments to find a Album_author
     * @example
     * // Get one Album_author
     * const album_author = await prisma.album_author.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends album_authorFindFirstOrThrowArgs>(args?: SelectSubset<T, album_authorFindFirstOrThrowArgs<ExtArgs>>): Prisma__album_authorClient<$Result.GetResult<Prisma.$album_authorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Album_authors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {album_authorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Album_authors
     * const album_authors = await prisma.album_author.findMany()
     * 
     * // Get first 10 Album_authors
     * const album_authors = await prisma.album_author.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const album_authorWithIdOnly = await prisma.album_author.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends album_authorFindManyArgs>(args?: SelectSubset<T, album_authorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$album_authorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Album_author.
     * @param {album_authorCreateArgs} args - Arguments to create a Album_author.
     * @example
     * // Create one Album_author
     * const Album_author = await prisma.album_author.create({
     *   data: {
     *     // ... data to create a Album_author
     *   }
     * })
     * 
     */
    create<T extends album_authorCreateArgs>(args: SelectSubset<T, album_authorCreateArgs<ExtArgs>>): Prisma__album_authorClient<$Result.GetResult<Prisma.$album_authorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Album_authors.
     * @param {album_authorCreateManyArgs} args - Arguments to create many Album_authors.
     * @example
     * // Create many Album_authors
     * const album_author = await prisma.album_author.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends album_authorCreateManyArgs>(args?: SelectSubset<T, album_authorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Album_author.
     * @param {album_authorDeleteArgs} args - Arguments to delete one Album_author.
     * @example
     * // Delete one Album_author
     * const Album_author = await prisma.album_author.delete({
     *   where: {
     *     // ... filter to delete one Album_author
     *   }
     * })
     * 
     */
    delete<T extends album_authorDeleteArgs>(args: SelectSubset<T, album_authorDeleteArgs<ExtArgs>>): Prisma__album_authorClient<$Result.GetResult<Prisma.$album_authorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Album_author.
     * @param {album_authorUpdateArgs} args - Arguments to update one Album_author.
     * @example
     * // Update one Album_author
     * const album_author = await prisma.album_author.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends album_authorUpdateArgs>(args: SelectSubset<T, album_authorUpdateArgs<ExtArgs>>): Prisma__album_authorClient<$Result.GetResult<Prisma.$album_authorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Album_authors.
     * @param {album_authorDeleteManyArgs} args - Arguments to filter Album_authors to delete.
     * @example
     * // Delete a few Album_authors
     * const { count } = await prisma.album_author.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends album_authorDeleteManyArgs>(args?: SelectSubset<T, album_authorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Album_authors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {album_authorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Album_authors
     * const album_author = await prisma.album_author.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends album_authorUpdateManyArgs>(args: SelectSubset<T, album_authorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Album_author.
     * @param {album_authorUpsertArgs} args - Arguments to update or create a Album_author.
     * @example
     * // Update or create a Album_author
     * const album_author = await prisma.album_author.upsert({
     *   create: {
     *     // ... data to create a Album_author
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Album_author we want to update
     *   }
     * })
     */
    upsert<T extends album_authorUpsertArgs>(args: SelectSubset<T, album_authorUpsertArgs<ExtArgs>>): Prisma__album_authorClient<$Result.GetResult<Prisma.$album_authorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Album_authors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {album_authorCountArgs} args - Arguments to filter Album_authors to count.
     * @example
     * // Count the number of Album_authors
     * const count = await prisma.album_author.count({
     *   where: {
     *     // ... the filter for the Album_authors we want to count
     *   }
     * })
    **/
    count<T extends album_authorCountArgs>(
      args?: Subset<T, album_authorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Album_authorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Album_author.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Album_authorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Album_authorAggregateArgs>(args: Subset<T, Album_authorAggregateArgs>): Prisma.PrismaPromise<GetAlbum_authorAggregateType<T>>

    /**
     * Group by Album_author.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {album_authorGroupByArgs} args - Group by arguments.
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
      T extends album_authorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: album_authorGroupByArgs['orderBy'] }
        : { orderBy?: album_authorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, album_authorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlbum_authorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the album_author model
   */
  readonly fields: album_authorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for album_author.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__album_authorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    album<T extends albumDefaultArgs<ExtArgs> = {}>(args?: Subset<T, albumDefaultArgs<ExtArgs>>): Prisma__albumClient<$Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the album_author model
   */
  interface album_authorFieldRefs {
    readonly id: FieldRef<"album_author", 'Int'>
    readonly author_id: FieldRef<"album_author", 'Int'>
    readonly album_id: FieldRef<"album_author", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * album_author findUnique
   */
  export type album_authorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album_author
     */
    select?: album_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album_author
     */
    omit?: album_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: album_authorInclude<ExtArgs> | null
    /**
     * Filter, which album_author to fetch.
     */
    where: album_authorWhereUniqueInput
  }

  /**
   * album_author findUniqueOrThrow
   */
  export type album_authorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album_author
     */
    select?: album_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album_author
     */
    omit?: album_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: album_authorInclude<ExtArgs> | null
    /**
     * Filter, which album_author to fetch.
     */
    where: album_authorWhereUniqueInput
  }

  /**
   * album_author findFirst
   */
  export type album_authorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album_author
     */
    select?: album_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album_author
     */
    omit?: album_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: album_authorInclude<ExtArgs> | null
    /**
     * Filter, which album_author to fetch.
     */
    where?: album_authorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of album_authors to fetch.
     */
    orderBy?: album_authorOrderByWithRelationInput | album_authorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for album_authors.
     */
    cursor?: album_authorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` album_authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` album_authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of album_authors.
     */
    distinct?: Album_authorScalarFieldEnum | Album_authorScalarFieldEnum[]
  }

  /**
   * album_author findFirstOrThrow
   */
  export type album_authorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album_author
     */
    select?: album_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album_author
     */
    omit?: album_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: album_authorInclude<ExtArgs> | null
    /**
     * Filter, which album_author to fetch.
     */
    where?: album_authorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of album_authors to fetch.
     */
    orderBy?: album_authorOrderByWithRelationInput | album_authorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for album_authors.
     */
    cursor?: album_authorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` album_authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` album_authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of album_authors.
     */
    distinct?: Album_authorScalarFieldEnum | Album_authorScalarFieldEnum[]
  }

  /**
   * album_author findMany
   */
  export type album_authorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album_author
     */
    select?: album_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album_author
     */
    omit?: album_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: album_authorInclude<ExtArgs> | null
    /**
     * Filter, which album_authors to fetch.
     */
    where?: album_authorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of album_authors to fetch.
     */
    orderBy?: album_authorOrderByWithRelationInput | album_authorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing album_authors.
     */
    cursor?: album_authorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` album_authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` album_authors.
     */
    skip?: number
    distinct?: Album_authorScalarFieldEnum | Album_authorScalarFieldEnum[]
  }

  /**
   * album_author create
   */
  export type album_authorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album_author
     */
    select?: album_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album_author
     */
    omit?: album_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: album_authorInclude<ExtArgs> | null
    /**
     * The data needed to create a album_author.
     */
    data: XOR<album_authorCreateInput, album_authorUncheckedCreateInput>
  }

  /**
   * album_author createMany
   */
  export type album_authorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many album_authors.
     */
    data: album_authorCreateManyInput | album_authorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * album_author update
   */
  export type album_authorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album_author
     */
    select?: album_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album_author
     */
    omit?: album_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: album_authorInclude<ExtArgs> | null
    /**
     * The data needed to update a album_author.
     */
    data: XOR<album_authorUpdateInput, album_authorUncheckedUpdateInput>
    /**
     * Choose, which album_author to update.
     */
    where: album_authorWhereUniqueInput
  }

  /**
   * album_author updateMany
   */
  export type album_authorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update album_authors.
     */
    data: XOR<album_authorUpdateManyMutationInput, album_authorUncheckedUpdateManyInput>
    /**
     * Filter which album_authors to update
     */
    where?: album_authorWhereInput
    /**
     * Limit how many album_authors to update.
     */
    limit?: number
  }

  /**
   * album_author upsert
   */
  export type album_authorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album_author
     */
    select?: album_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album_author
     */
    omit?: album_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: album_authorInclude<ExtArgs> | null
    /**
     * The filter to search for the album_author to update in case it exists.
     */
    where: album_authorWhereUniqueInput
    /**
     * In case the album_author found by the `where` argument doesn't exist, create a new album_author with this data.
     */
    create: XOR<album_authorCreateInput, album_authorUncheckedCreateInput>
    /**
     * In case the album_author was found with the provided `where` argument, update it with this data.
     */
    update: XOR<album_authorUpdateInput, album_authorUncheckedUpdateInput>
  }

  /**
   * album_author delete
   */
  export type album_authorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album_author
     */
    select?: album_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album_author
     */
    omit?: album_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: album_authorInclude<ExtArgs> | null
    /**
     * Filter which album_author to delete.
     */
    where: album_authorWhereUniqueInput
  }

  /**
   * album_author deleteMany
   */
  export type album_authorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which album_authors to delete
     */
    where?: album_authorWhereInput
    /**
     * Limit how many album_authors to delete.
     */
    limit?: number
  }

  /**
   * album_author without action
   */
  export type album_authorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album_author
     */
    select?: album_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album_author
     */
    omit?: album_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: album_authorInclude<ExtArgs> | null
  }


  /**
   * Model playhistory
   */

  export type AggregatePlayhistory = {
    _count: PlayhistoryCountAggregateOutputType | null
    _avg: PlayhistoryAvgAggregateOutputType | null
    _sum: PlayhistorySumAggregateOutputType | null
    _min: PlayhistoryMinAggregateOutputType | null
    _max: PlayhistoryMaxAggregateOutputType | null
  }

  export type PlayhistoryAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    song_played: number | null
    score: Decimal | null
  }

  export type PlayhistorySumAggregateOutputType = {
    id: number | null
    user_id: number | null
    song_played: number | null
    score: Decimal | null
  }

  export type PlayhistoryMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    song_played: number | null
    date: Date | null
    score: Decimal | null
    user_recording: string | null
  }

  export type PlayhistoryMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    song_played: number | null
    date: Date | null
    score: Decimal | null
    user_recording: string | null
  }

  export type PlayhistoryCountAggregateOutputType = {
    id: number
    user_id: number
    song_played: number
    date: number
    score: number
    user_recording: number
    _all: number
  }


  export type PlayhistoryAvgAggregateInputType = {
    id?: true
    user_id?: true
    song_played?: true
    score?: true
  }

  export type PlayhistorySumAggregateInputType = {
    id?: true
    user_id?: true
    song_played?: true
    score?: true
  }

  export type PlayhistoryMinAggregateInputType = {
    id?: true
    user_id?: true
    song_played?: true
    date?: true
    score?: true
    user_recording?: true
  }

  export type PlayhistoryMaxAggregateInputType = {
    id?: true
    user_id?: true
    song_played?: true
    date?: true
    score?: true
    user_recording?: true
  }

  export type PlayhistoryCountAggregateInputType = {
    id?: true
    user_id?: true
    song_played?: true
    date?: true
    score?: true
    user_recording?: true
    _all?: true
  }

  export type PlayhistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which playhistory to aggregate.
     */
    where?: playhistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playhistories to fetch.
     */
    orderBy?: playhistoryOrderByWithRelationInput | playhistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: playhistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playhistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playhistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned playhistories
    **/
    _count?: true | PlayhistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlayhistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlayhistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayhistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayhistoryMaxAggregateInputType
  }

  export type GetPlayhistoryAggregateType<T extends PlayhistoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayhistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayhistory[P]>
      : GetScalarType<T[P], AggregatePlayhistory[P]>
  }




  export type playhistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: playhistoryWhereInput
    orderBy?: playhistoryOrderByWithAggregationInput | playhistoryOrderByWithAggregationInput[]
    by: PlayhistoryScalarFieldEnum[] | PlayhistoryScalarFieldEnum
    having?: playhistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayhistoryCountAggregateInputType | true
    _avg?: PlayhistoryAvgAggregateInputType
    _sum?: PlayhistorySumAggregateInputType
    _min?: PlayhistoryMinAggregateInputType
    _max?: PlayhistoryMaxAggregateInputType
  }

  export type PlayhistoryGroupByOutputType = {
    id: number
    user_id: number
    song_played: number
    date: Date
    score: Decimal | null
    user_recording: string | null
    _count: PlayhistoryCountAggregateOutputType | null
    _avg: PlayhistoryAvgAggregateOutputType | null
    _sum: PlayhistorySumAggregateOutputType | null
    _min: PlayhistoryMinAggregateOutputType | null
    _max: PlayhistoryMaxAggregateOutputType | null
  }

  type GetPlayhistoryGroupByPayload<T extends playhistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayhistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayhistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayhistoryGroupByOutputType[P]>
            : GetScalarType<T[P], PlayhistoryGroupByOutputType[P]>
        }
      >
    >


  export type playhistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    song_played?: boolean
    date?: boolean
    score?: boolean
    user_recording?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    song?: boolean | songDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playhistory"]>



  export type playhistorySelectScalar = {
    id?: boolean
    user_id?: boolean
    song_played?: boolean
    date?: boolean
    score?: boolean
    user_recording?: boolean
  }

  export type playhistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "song_played" | "date" | "score" | "user_recording", ExtArgs["result"]["playhistory"]>
  export type playhistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    song?: boolean | songDefaultArgs<ExtArgs>
  }

  export type $playhistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "playhistory"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      song: Prisma.$songPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      song_played: number
      date: Date
      score: Prisma.Decimal | null
      user_recording: string | null
    }, ExtArgs["result"]["playhistory"]>
    composites: {}
  }

  type playhistoryGetPayload<S extends boolean | null | undefined | playhistoryDefaultArgs> = $Result.GetResult<Prisma.$playhistoryPayload, S>

  type playhistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<playhistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlayhistoryCountAggregateInputType | true
    }

  export interface playhistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['playhistory'], meta: { name: 'playhistory' } }
    /**
     * Find zero or one Playhistory that matches the filter.
     * @param {playhistoryFindUniqueArgs} args - Arguments to find a Playhistory
     * @example
     * // Get one Playhistory
     * const playhistory = await prisma.playhistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends playhistoryFindUniqueArgs>(args: SelectSubset<T, playhistoryFindUniqueArgs<ExtArgs>>): Prisma__playhistoryClient<$Result.GetResult<Prisma.$playhistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Playhistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {playhistoryFindUniqueOrThrowArgs} args - Arguments to find a Playhistory
     * @example
     * // Get one Playhistory
     * const playhistory = await prisma.playhistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends playhistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, playhistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__playhistoryClient<$Result.GetResult<Prisma.$playhistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playhistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playhistoryFindFirstArgs} args - Arguments to find a Playhistory
     * @example
     * // Get one Playhistory
     * const playhistory = await prisma.playhistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends playhistoryFindFirstArgs>(args?: SelectSubset<T, playhistoryFindFirstArgs<ExtArgs>>): Prisma__playhistoryClient<$Result.GetResult<Prisma.$playhistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playhistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playhistoryFindFirstOrThrowArgs} args - Arguments to find a Playhistory
     * @example
     * // Get one Playhistory
     * const playhistory = await prisma.playhistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends playhistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, playhistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__playhistoryClient<$Result.GetResult<Prisma.$playhistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Playhistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playhistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Playhistories
     * const playhistories = await prisma.playhistory.findMany()
     * 
     * // Get first 10 Playhistories
     * const playhistories = await prisma.playhistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playhistoryWithIdOnly = await prisma.playhistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends playhistoryFindManyArgs>(args?: SelectSubset<T, playhistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$playhistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Playhistory.
     * @param {playhistoryCreateArgs} args - Arguments to create a Playhistory.
     * @example
     * // Create one Playhistory
     * const Playhistory = await prisma.playhistory.create({
     *   data: {
     *     // ... data to create a Playhistory
     *   }
     * })
     * 
     */
    create<T extends playhistoryCreateArgs>(args: SelectSubset<T, playhistoryCreateArgs<ExtArgs>>): Prisma__playhistoryClient<$Result.GetResult<Prisma.$playhistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Playhistories.
     * @param {playhistoryCreateManyArgs} args - Arguments to create many Playhistories.
     * @example
     * // Create many Playhistories
     * const playhistory = await prisma.playhistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends playhistoryCreateManyArgs>(args?: SelectSubset<T, playhistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Playhistory.
     * @param {playhistoryDeleteArgs} args - Arguments to delete one Playhistory.
     * @example
     * // Delete one Playhistory
     * const Playhistory = await prisma.playhistory.delete({
     *   where: {
     *     // ... filter to delete one Playhistory
     *   }
     * })
     * 
     */
    delete<T extends playhistoryDeleteArgs>(args: SelectSubset<T, playhistoryDeleteArgs<ExtArgs>>): Prisma__playhistoryClient<$Result.GetResult<Prisma.$playhistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Playhistory.
     * @param {playhistoryUpdateArgs} args - Arguments to update one Playhistory.
     * @example
     * // Update one Playhistory
     * const playhistory = await prisma.playhistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends playhistoryUpdateArgs>(args: SelectSubset<T, playhistoryUpdateArgs<ExtArgs>>): Prisma__playhistoryClient<$Result.GetResult<Prisma.$playhistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Playhistories.
     * @param {playhistoryDeleteManyArgs} args - Arguments to filter Playhistories to delete.
     * @example
     * // Delete a few Playhistories
     * const { count } = await prisma.playhistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends playhistoryDeleteManyArgs>(args?: SelectSubset<T, playhistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Playhistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playhistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Playhistories
     * const playhistory = await prisma.playhistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends playhistoryUpdateManyArgs>(args: SelectSubset<T, playhistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Playhistory.
     * @param {playhistoryUpsertArgs} args - Arguments to update or create a Playhistory.
     * @example
     * // Update or create a Playhistory
     * const playhistory = await prisma.playhistory.upsert({
     *   create: {
     *     // ... data to create a Playhistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Playhistory we want to update
     *   }
     * })
     */
    upsert<T extends playhistoryUpsertArgs>(args: SelectSubset<T, playhistoryUpsertArgs<ExtArgs>>): Prisma__playhistoryClient<$Result.GetResult<Prisma.$playhistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Playhistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playhistoryCountArgs} args - Arguments to filter Playhistories to count.
     * @example
     * // Count the number of Playhistories
     * const count = await prisma.playhistory.count({
     *   where: {
     *     // ... the filter for the Playhistories we want to count
     *   }
     * })
    **/
    count<T extends playhistoryCountArgs>(
      args?: Subset<T, playhistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayhistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Playhistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayhistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlayhistoryAggregateArgs>(args: Subset<T, PlayhistoryAggregateArgs>): Prisma.PrismaPromise<GetPlayhistoryAggregateType<T>>

    /**
     * Group by Playhistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playhistoryGroupByArgs} args - Group by arguments.
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
      T extends playhistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: playhistoryGroupByArgs['orderBy'] }
        : { orderBy?: playhistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, playhistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayhistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the playhistory model
   */
  readonly fields: playhistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for playhistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__playhistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    song<T extends songDefaultArgs<ExtArgs> = {}>(args?: Subset<T, songDefaultArgs<ExtArgs>>): Prisma__songClient<$Result.GetResult<Prisma.$songPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the playhistory model
   */
  interface playhistoryFieldRefs {
    readonly id: FieldRef<"playhistory", 'Int'>
    readonly user_id: FieldRef<"playhistory", 'Int'>
    readonly song_played: FieldRef<"playhistory", 'Int'>
    readonly date: FieldRef<"playhistory", 'DateTime'>
    readonly score: FieldRef<"playhistory", 'Decimal'>
    readonly user_recording: FieldRef<"playhistory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * playhistory findUnique
   */
  export type playhistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playhistory
     */
    select?: playhistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the playhistory
     */
    omit?: playhistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playhistoryInclude<ExtArgs> | null
    /**
     * Filter, which playhistory to fetch.
     */
    where: playhistoryWhereUniqueInput
  }

  /**
   * playhistory findUniqueOrThrow
   */
  export type playhistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playhistory
     */
    select?: playhistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the playhistory
     */
    omit?: playhistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playhistoryInclude<ExtArgs> | null
    /**
     * Filter, which playhistory to fetch.
     */
    where: playhistoryWhereUniqueInput
  }

  /**
   * playhistory findFirst
   */
  export type playhistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playhistory
     */
    select?: playhistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the playhistory
     */
    omit?: playhistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playhistoryInclude<ExtArgs> | null
    /**
     * Filter, which playhistory to fetch.
     */
    where?: playhistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playhistories to fetch.
     */
    orderBy?: playhistoryOrderByWithRelationInput | playhistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for playhistories.
     */
    cursor?: playhistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playhistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playhistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of playhistories.
     */
    distinct?: PlayhistoryScalarFieldEnum | PlayhistoryScalarFieldEnum[]
  }

  /**
   * playhistory findFirstOrThrow
   */
  export type playhistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playhistory
     */
    select?: playhistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the playhistory
     */
    omit?: playhistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playhistoryInclude<ExtArgs> | null
    /**
     * Filter, which playhistory to fetch.
     */
    where?: playhistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playhistories to fetch.
     */
    orderBy?: playhistoryOrderByWithRelationInput | playhistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for playhistories.
     */
    cursor?: playhistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playhistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playhistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of playhistories.
     */
    distinct?: PlayhistoryScalarFieldEnum | PlayhistoryScalarFieldEnum[]
  }

  /**
   * playhistory findMany
   */
  export type playhistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playhistory
     */
    select?: playhistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the playhistory
     */
    omit?: playhistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playhistoryInclude<ExtArgs> | null
    /**
     * Filter, which playhistories to fetch.
     */
    where?: playhistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playhistories to fetch.
     */
    orderBy?: playhistoryOrderByWithRelationInput | playhistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing playhistories.
     */
    cursor?: playhistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playhistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playhistories.
     */
    skip?: number
    distinct?: PlayhistoryScalarFieldEnum | PlayhistoryScalarFieldEnum[]
  }

  /**
   * playhistory create
   */
  export type playhistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playhistory
     */
    select?: playhistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the playhistory
     */
    omit?: playhistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playhistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a playhistory.
     */
    data: XOR<playhistoryCreateInput, playhistoryUncheckedCreateInput>
  }

  /**
   * playhistory createMany
   */
  export type playhistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many playhistories.
     */
    data: playhistoryCreateManyInput | playhistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * playhistory update
   */
  export type playhistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playhistory
     */
    select?: playhistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the playhistory
     */
    omit?: playhistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playhistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a playhistory.
     */
    data: XOR<playhistoryUpdateInput, playhistoryUncheckedUpdateInput>
    /**
     * Choose, which playhistory to update.
     */
    where: playhistoryWhereUniqueInput
  }

  /**
   * playhistory updateMany
   */
  export type playhistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update playhistories.
     */
    data: XOR<playhistoryUpdateManyMutationInput, playhistoryUncheckedUpdateManyInput>
    /**
     * Filter which playhistories to update
     */
    where?: playhistoryWhereInput
    /**
     * Limit how many playhistories to update.
     */
    limit?: number
  }

  /**
   * playhistory upsert
   */
  export type playhistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playhistory
     */
    select?: playhistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the playhistory
     */
    omit?: playhistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playhistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the playhistory to update in case it exists.
     */
    where: playhistoryWhereUniqueInput
    /**
     * In case the playhistory found by the `where` argument doesn't exist, create a new playhistory with this data.
     */
    create: XOR<playhistoryCreateInput, playhistoryUncheckedCreateInput>
    /**
     * In case the playhistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<playhistoryUpdateInput, playhistoryUncheckedUpdateInput>
  }

  /**
   * playhistory delete
   */
  export type playhistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playhistory
     */
    select?: playhistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the playhistory
     */
    omit?: playhistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playhistoryInclude<ExtArgs> | null
    /**
     * Filter which playhistory to delete.
     */
    where: playhistoryWhereUniqueInput
  }

  /**
   * playhistory deleteMany
   */
  export type playhistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which playhistories to delete
     */
    where?: playhistoryWhereInput
    /**
     * Limit how many playhistories to delete.
     */
    limit?: number
  }

  /**
   * playhistory without action
   */
  export type playhistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playhistory
     */
    select?: playhistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the playhistory
     */
    omit?: playhistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playhistoryInclude<ExtArgs> | null
  }


  /**
   * Model playlist
   */

  export type AggregatePlaylist = {
    _count: PlaylistCountAggregateOutputType | null
    _avg: PlaylistAvgAggregateOutputType | null
    _sum: PlaylistSumAggregateOutputType | null
    _min: PlaylistMinAggregateOutputType | null
    _max: PlaylistMaxAggregateOutputType | null
  }

  export type PlaylistAvgAggregateOutputType = {
    id: number | null
    user_created: number | null
    total_time_played: number | null
    total_view: number | null
  }

  export type PlaylistSumAggregateOutputType = {
    id: number | null
    user_created: number | null
    total_time_played: number | null
    total_view: number | null
  }

  export type PlaylistMinAggregateOutputType = {
    id: number | null
    user_created: number | null
    playlist_name: string | null
    description: string | null
    total_time_played: number | null
    total_view: number | null
  }

  export type PlaylistMaxAggregateOutputType = {
    id: number | null
    user_created: number | null
    playlist_name: string | null
    description: string | null
    total_time_played: number | null
    total_view: number | null
  }

  export type PlaylistCountAggregateOutputType = {
    id: number
    user_created: number
    playlist_name: number
    description: number
    total_time_played: number
    total_view: number
    _all: number
  }


  export type PlaylistAvgAggregateInputType = {
    id?: true
    user_created?: true
    total_time_played?: true
    total_view?: true
  }

  export type PlaylistSumAggregateInputType = {
    id?: true
    user_created?: true
    total_time_played?: true
    total_view?: true
  }

  export type PlaylistMinAggregateInputType = {
    id?: true
    user_created?: true
    playlist_name?: true
    description?: true
    total_time_played?: true
    total_view?: true
  }

  export type PlaylistMaxAggregateInputType = {
    id?: true
    user_created?: true
    playlist_name?: true
    description?: true
    total_time_played?: true
    total_view?: true
  }

  export type PlaylistCountAggregateInputType = {
    id?: true
    user_created?: true
    playlist_name?: true
    description?: true
    total_time_played?: true
    total_view?: true
    _all?: true
  }

  export type PlaylistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which playlist to aggregate.
     */
    where?: playlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlists to fetch.
     */
    orderBy?: playlistOrderByWithRelationInput | playlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: playlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned playlists
    **/
    _count?: true | PlaylistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlaylistAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlaylistSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlaylistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlaylistMaxAggregateInputType
  }

  export type GetPlaylistAggregateType<T extends PlaylistAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaylist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaylist[P]>
      : GetScalarType<T[P], AggregatePlaylist[P]>
  }




  export type playlistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: playlistWhereInput
    orderBy?: playlistOrderByWithAggregationInput | playlistOrderByWithAggregationInput[]
    by: PlaylistScalarFieldEnum[] | PlaylistScalarFieldEnum
    having?: playlistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlaylistCountAggregateInputType | true
    _avg?: PlaylistAvgAggregateInputType
    _sum?: PlaylistSumAggregateInputType
    _min?: PlaylistMinAggregateInputType
    _max?: PlaylistMaxAggregateInputType
  }

  export type PlaylistGroupByOutputType = {
    id: number
    user_created: number
    playlist_name: string
    description: string | null
    total_time_played: number | null
    total_view: number | null
    _count: PlaylistCountAggregateOutputType | null
    _avg: PlaylistAvgAggregateOutputType | null
    _sum: PlaylistSumAggregateOutputType | null
    _min: PlaylistMinAggregateOutputType | null
    _max: PlaylistMaxAggregateOutputType | null
  }

  type GetPlaylistGroupByPayload<T extends playlistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlaylistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlaylistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlaylistGroupByOutputType[P]>
            : GetScalarType<T[P], PlaylistGroupByOutputType[P]>
        }
      >
    >


  export type playlistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_created?: boolean
    playlist_name?: boolean
    description?: boolean
    total_time_played?: boolean
    total_view?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    playlist_song?: boolean | playlist$playlist_songArgs<ExtArgs>
    _count?: boolean | PlaylistCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlist"]>



  export type playlistSelectScalar = {
    id?: boolean
    user_created?: boolean
    playlist_name?: boolean
    description?: boolean
    total_time_played?: boolean
    total_view?: boolean
  }

  export type playlistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_created" | "playlist_name" | "description" | "total_time_played" | "total_view", ExtArgs["result"]["playlist"]>
  export type playlistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    playlist_song?: boolean | playlist$playlist_songArgs<ExtArgs>
    _count?: boolean | PlaylistCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $playlistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "playlist"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      playlist_song: Prisma.$playlist_songPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_created: number
      playlist_name: string
      description: string | null
      total_time_played: number | null
      total_view: number | null
    }, ExtArgs["result"]["playlist"]>
    composites: {}
  }

  type playlistGetPayload<S extends boolean | null | undefined | playlistDefaultArgs> = $Result.GetResult<Prisma.$playlistPayload, S>

  type playlistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<playlistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlaylistCountAggregateInputType | true
    }

  export interface playlistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['playlist'], meta: { name: 'playlist' } }
    /**
     * Find zero or one Playlist that matches the filter.
     * @param {playlistFindUniqueArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends playlistFindUniqueArgs>(args: SelectSubset<T, playlistFindUniqueArgs<ExtArgs>>): Prisma__playlistClient<$Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Playlist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {playlistFindUniqueOrThrowArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends playlistFindUniqueOrThrowArgs>(args: SelectSubset<T, playlistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__playlistClient<$Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlistFindFirstArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends playlistFindFirstArgs>(args?: SelectSubset<T, playlistFindFirstArgs<ExtArgs>>): Prisma__playlistClient<$Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlistFindFirstOrThrowArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends playlistFindFirstOrThrowArgs>(args?: SelectSubset<T, playlistFindFirstOrThrowArgs<ExtArgs>>): Prisma__playlistClient<$Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Playlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Playlists
     * const playlists = await prisma.playlist.findMany()
     * 
     * // Get first 10 Playlists
     * const playlists = await prisma.playlist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playlistWithIdOnly = await prisma.playlist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends playlistFindManyArgs>(args?: SelectSubset<T, playlistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Playlist.
     * @param {playlistCreateArgs} args - Arguments to create a Playlist.
     * @example
     * // Create one Playlist
     * const Playlist = await prisma.playlist.create({
     *   data: {
     *     // ... data to create a Playlist
     *   }
     * })
     * 
     */
    create<T extends playlistCreateArgs>(args: SelectSubset<T, playlistCreateArgs<ExtArgs>>): Prisma__playlistClient<$Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Playlists.
     * @param {playlistCreateManyArgs} args - Arguments to create many Playlists.
     * @example
     * // Create many Playlists
     * const playlist = await prisma.playlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends playlistCreateManyArgs>(args?: SelectSubset<T, playlistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Playlist.
     * @param {playlistDeleteArgs} args - Arguments to delete one Playlist.
     * @example
     * // Delete one Playlist
     * const Playlist = await prisma.playlist.delete({
     *   where: {
     *     // ... filter to delete one Playlist
     *   }
     * })
     * 
     */
    delete<T extends playlistDeleteArgs>(args: SelectSubset<T, playlistDeleteArgs<ExtArgs>>): Prisma__playlistClient<$Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Playlist.
     * @param {playlistUpdateArgs} args - Arguments to update one Playlist.
     * @example
     * // Update one Playlist
     * const playlist = await prisma.playlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends playlistUpdateArgs>(args: SelectSubset<T, playlistUpdateArgs<ExtArgs>>): Prisma__playlistClient<$Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Playlists.
     * @param {playlistDeleteManyArgs} args - Arguments to filter Playlists to delete.
     * @example
     * // Delete a few Playlists
     * const { count } = await prisma.playlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends playlistDeleteManyArgs>(args?: SelectSubset<T, playlistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Playlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Playlists
     * const playlist = await prisma.playlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends playlistUpdateManyArgs>(args: SelectSubset<T, playlistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Playlist.
     * @param {playlistUpsertArgs} args - Arguments to update or create a Playlist.
     * @example
     * // Update or create a Playlist
     * const playlist = await prisma.playlist.upsert({
     *   create: {
     *     // ... data to create a Playlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Playlist we want to update
     *   }
     * })
     */
    upsert<T extends playlistUpsertArgs>(args: SelectSubset<T, playlistUpsertArgs<ExtArgs>>): Prisma__playlistClient<$Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Playlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlistCountArgs} args - Arguments to filter Playlists to count.
     * @example
     * // Count the number of Playlists
     * const count = await prisma.playlist.count({
     *   where: {
     *     // ... the filter for the Playlists we want to count
     *   }
     * })
    **/
    count<T extends playlistCountArgs>(
      args?: Subset<T, playlistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlaylistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Playlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlaylistAggregateArgs>(args: Subset<T, PlaylistAggregateArgs>): Prisma.PrismaPromise<GetPlaylistAggregateType<T>>

    /**
     * Group by Playlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlistGroupByArgs} args - Group by arguments.
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
      T extends playlistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: playlistGroupByArgs['orderBy'] }
        : { orderBy?: playlistGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, playlistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaylistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the playlist model
   */
  readonly fields: playlistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for playlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__playlistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    playlist_song<T extends playlist$playlist_songArgs<ExtArgs> = {}>(args?: Subset<T, playlist$playlist_songArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$playlist_songPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the playlist model
   */
  interface playlistFieldRefs {
    readonly id: FieldRef<"playlist", 'Int'>
    readonly user_created: FieldRef<"playlist", 'Int'>
    readonly playlist_name: FieldRef<"playlist", 'String'>
    readonly description: FieldRef<"playlist", 'String'>
    readonly total_time_played: FieldRef<"playlist", 'Int'>
    readonly total_view: FieldRef<"playlist", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * playlist findUnique
   */
  export type playlistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * Filter, which playlist to fetch.
     */
    where: playlistWhereUniqueInput
  }

  /**
   * playlist findUniqueOrThrow
   */
  export type playlistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * Filter, which playlist to fetch.
     */
    where: playlistWhereUniqueInput
  }

  /**
   * playlist findFirst
   */
  export type playlistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * Filter, which playlist to fetch.
     */
    where?: playlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlists to fetch.
     */
    orderBy?: playlistOrderByWithRelationInput | playlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for playlists.
     */
    cursor?: playlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of playlists.
     */
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * playlist findFirstOrThrow
   */
  export type playlistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * Filter, which playlist to fetch.
     */
    where?: playlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlists to fetch.
     */
    orderBy?: playlistOrderByWithRelationInput | playlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for playlists.
     */
    cursor?: playlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of playlists.
     */
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * playlist findMany
   */
  export type playlistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * Filter, which playlists to fetch.
     */
    where?: playlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlists to fetch.
     */
    orderBy?: playlistOrderByWithRelationInput | playlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing playlists.
     */
    cursor?: playlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlists.
     */
    skip?: number
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * playlist create
   */
  export type playlistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * The data needed to create a playlist.
     */
    data: XOR<playlistCreateInput, playlistUncheckedCreateInput>
  }

  /**
   * playlist createMany
   */
  export type playlistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many playlists.
     */
    data: playlistCreateManyInput | playlistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * playlist update
   */
  export type playlistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * The data needed to update a playlist.
     */
    data: XOR<playlistUpdateInput, playlistUncheckedUpdateInput>
    /**
     * Choose, which playlist to update.
     */
    where: playlistWhereUniqueInput
  }

  /**
   * playlist updateMany
   */
  export type playlistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update playlists.
     */
    data: XOR<playlistUpdateManyMutationInput, playlistUncheckedUpdateManyInput>
    /**
     * Filter which playlists to update
     */
    where?: playlistWhereInput
    /**
     * Limit how many playlists to update.
     */
    limit?: number
  }

  /**
   * playlist upsert
   */
  export type playlistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * The filter to search for the playlist to update in case it exists.
     */
    where: playlistWhereUniqueInput
    /**
     * In case the playlist found by the `where` argument doesn't exist, create a new playlist with this data.
     */
    create: XOR<playlistCreateInput, playlistUncheckedCreateInput>
    /**
     * In case the playlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<playlistUpdateInput, playlistUncheckedUpdateInput>
  }

  /**
   * playlist delete
   */
  export type playlistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    /**
     * Filter which playlist to delete.
     */
    where: playlistWhereUniqueInput
  }

  /**
   * playlist deleteMany
   */
  export type playlistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which playlists to delete
     */
    where?: playlistWhereInput
    /**
     * Limit how many playlists to delete.
     */
    limit?: number
  }

  /**
   * playlist.playlist_song
   */
  export type playlist$playlist_songArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_song
     */
    select?: playlist_songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_song
     */
    omit?: playlist_songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_songInclude<ExtArgs> | null
    where?: playlist_songWhereInput
    orderBy?: playlist_songOrderByWithRelationInput | playlist_songOrderByWithRelationInput[]
    cursor?: playlist_songWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Playlist_songScalarFieldEnum | Playlist_songScalarFieldEnum[]
  }

  /**
   * playlist without action
   */
  export type playlistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
  }


  /**
   * Model playlist_song
   */

  export type AggregatePlaylist_song = {
    _count: Playlist_songCountAggregateOutputType | null
    _avg: Playlist_songAvgAggregateOutputType | null
    _sum: Playlist_songSumAggregateOutputType | null
    _min: Playlist_songMinAggregateOutputType | null
    _max: Playlist_songMaxAggregateOutputType | null
  }

  export type Playlist_songAvgAggregateOutputType = {
    id: number | null
    playlist_id: number | null
    song_id: number | null
  }

  export type Playlist_songSumAggregateOutputType = {
    id: number | null
    playlist_id: number | null
    song_id: number | null
  }

  export type Playlist_songMinAggregateOutputType = {
    id: number | null
    playlist_id: number | null
    song_id: number | null
  }

  export type Playlist_songMaxAggregateOutputType = {
    id: number | null
    playlist_id: number | null
    song_id: number | null
  }

  export type Playlist_songCountAggregateOutputType = {
    id: number
    playlist_id: number
    song_id: number
    _all: number
  }


  export type Playlist_songAvgAggregateInputType = {
    id?: true
    playlist_id?: true
    song_id?: true
  }

  export type Playlist_songSumAggregateInputType = {
    id?: true
    playlist_id?: true
    song_id?: true
  }

  export type Playlist_songMinAggregateInputType = {
    id?: true
    playlist_id?: true
    song_id?: true
  }

  export type Playlist_songMaxAggregateInputType = {
    id?: true
    playlist_id?: true
    song_id?: true
  }

  export type Playlist_songCountAggregateInputType = {
    id?: true
    playlist_id?: true
    song_id?: true
    _all?: true
  }

  export type Playlist_songAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which playlist_song to aggregate.
     */
    where?: playlist_songWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlist_songs to fetch.
     */
    orderBy?: playlist_songOrderByWithRelationInput | playlist_songOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: playlist_songWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlist_songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlist_songs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned playlist_songs
    **/
    _count?: true | Playlist_songCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Playlist_songAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Playlist_songSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Playlist_songMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Playlist_songMaxAggregateInputType
  }

  export type GetPlaylist_songAggregateType<T extends Playlist_songAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaylist_song]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaylist_song[P]>
      : GetScalarType<T[P], AggregatePlaylist_song[P]>
  }




  export type playlist_songGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: playlist_songWhereInput
    orderBy?: playlist_songOrderByWithAggregationInput | playlist_songOrderByWithAggregationInput[]
    by: Playlist_songScalarFieldEnum[] | Playlist_songScalarFieldEnum
    having?: playlist_songScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Playlist_songCountAggregateInputType | true
    _avg?: Playlist_songAvgAggregateInputType
    _sum?: Playlist_songSumAggregateInputType
    _min?: Playlist_songMinAggregateInputType
    _max?: Playlist_songMaxAggregateInputType
  }

  export type Playlist_songGroupByOutputType = {
    id: number
    playlist_id: number
    song_id: number
    _count: Playlist_songCountAggregateOutputType | null
    _avg: Playlist_songAvgAggregateOutputType | null
    _sum: Playlist_songSumAggregateOutputType | null
    _min: Playlist_songMinAggregateOutputType | null
    _max: Playlist_songMaxAggregateOutputType | null
  }

  type GetPlaylist_songGroupByPayload<T extends playlist_songGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Playlist_songGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Playlist_songGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Playlist_songGroupByOutputType[P]>
            : GetScalarType<T[P], Playlist_songGroupByOutputType[P]>
        }
      >
    >


  export type playlist_songSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playlist_id?: boolean
    song_id?: boolean
    playlist?: boolean | playlistDefaultArgs<ExtArgs>
    song?: boolean | songDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlist_song"]>



  export type playlist_songSelectScalar = {
    id?: boolean
    playlist_id?: boolean
    song_id?: boolean
  }

  export type playlist_songOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "playlist_id" | "song_id", ExtArgs["result"]["playlist_song"]>
  export type playlist_songInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playlist?: boolean | playlistDefaultArgs<ExtArgs>
    song?: boolean | songDefaultArgs<ExtArgs>
  }

  export type $playlist_songPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "playlist_song"
    objects: {
      playlist: Prisma.$playlistPayload<ExtArgs>
      song: Prisma.$songPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      playlist_id: number
      song_id: number
    }, ExtArgs["result"]["playlist_song"]>
    composites: {}
  }

  type playlist_songGetPayload<S extends boolean | null | undefined | playlist_songDefaultArgs> = $Result.GetResult<Prisma.$playlist_songPayload, S>

  type playlist_songCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<playlist_songFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Playlist_songCountAggregateInputType | true
    }

  export interface playlist_songDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['playlist_song'], meta: { name: 'playlist_song' } }
    /**
     * Find zero or one Playlist_song that matches the filter.
     * @param {playlist_songFindUniqueArgs} args - Arguments to find a Playlist_song
     * @example
     * // Get one Playlist_song
     * const playlist_song = await prisma.playlist_song.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends playlist_songFindUniqueArgs>(args: SelectSubset<T, playlist_songFindUniqueArgs<ExtArgs>>): Prisma__playlist_songClient<$Result.GetResult<Prisma.$playlist_songPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Playlist_song that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {playlist_songFindUniqueOrThrowArgs} args - Arguments to find a Playlist_song
     * @example
     * // Get one Playlist_song
     * const playlist_song = await prisma.playlist_song.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends playlist_songFindUniqueOrThrowArgs>(args: SelectSubset<T, playlist_songFindUniqueOrThrowArgs<ExtArgs>>): Prisma__playlist_songClient<$Result.GetResult<Prisma.$playlist_songPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playlist_song that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlist_songFindFirstArgs} args - Arguments to find a Playlist_song
     * @example
     * // Get one Playlist_song
     * const playlist_song = await prisma.playlist_song.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends playlist_songFindFirstArgs>(args?: SelectSubset<T, playlist_songFindFirstArgs<ExtArgs>>): Prisma__playlist_songClient<$Result.GetResult<Prisma.$playlist_songPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playlist_song that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlist_songFindFirstOrThrowArgs} args - Arguments to find a Playlist_song
     * @example
     * // Get one Playlist_song
     * const playlist_song = await prisma.playlist_song.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends playlist_songFindFirstOrThrowArgs>(args?: SelectSubset<T, playlist_songFindFirstOrThrowArgs<ExtArgs>>): Prisma__playlist_songClient<$Result.GetResult<Prisma.$playlist_songPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Playlist_songs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlist_songFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Playlist_songs
     * const playlist_songs = await prisma.playlist_song.findMany()
     * 
     * // Get first 10 Playlist_songs
     * const playlist_songs = await prisma.playlist_song.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playlist_songWithIdOnly = await prisma.playlist_song.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends playlist_songFindManyArgs>(args?: SelectSubset<T, playlist_songFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$playlist_songPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Playlist_song.
     * @param {playlist_songCreateArgs} args - Arguments to create a Playlist_song.
     * @example
     * // Create one Playlist_song
     * const Playlist_song = await prisma.playlist_song.create({
     *   data: {
     *     // ... data to create a Playlist_song
     *   }
     * })
     * 
     */
    create<T extends playlist_songCreateArgs>(args: SelectSubset<T, playlist_songCreateArgs<ExtArgs>>): Prisma__playlist_songClient<$Result.GetResult<Prisma.$playlist_songPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Playlist_songs.
     * @param {playlist_songCreateManyArgs} args - Arguments to create many Playlist_songs.
     * @example
     * // Create many Playlist_songs
     * const playlist_song = await prisma.playlist_song.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends playlist_songCreateManyArgs>(args?: SelectSubset<T, playlist_songCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Playlist_song.
     * @param {playlist_songDeleteArgs} args - Arguments to delete one Playlist_song.
     * @example
     * // Delete one Playlist_song
     * const Playlist_song = await prisma.playlist_song.delete({
     *   where: {
     *     // ... filter to delete one Playlist_song
     *   }
     * })
     * 
     */
    delete<T extends playlist_songDeleteArgs>(args: SelectSubset<T, playlist_songDeleteArgs<ExtArgs>>): Prisma__playlist_songClient<$Result.GetResult<Prisma.$playlist_songPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Playlist_song.
     * @param {playlist_songUpdateArgs} args - Arguments to update one Playlist_song.
     * @example
     * // Update one Playlist_song
     * const playlist_song = await prisma.playlist_song.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends playlist_songUpdateArgs>(args: SelectSubset<T, playlist_songUpdateArgs<ExtArgs>>): Prisma__playlist_songClient<$Result.GetResult<Prisma.$playlist_songPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Playlist_songs.
     * @param {playlist_songDeleteManyArgs} args - Arguments to filter Playlist_songs to delete.
     * @example
     * // Delete a few Playlist_songs
     * const { count } = await prisma.playlist_song.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends playlist_songDeleteManyArgs>(args?: SelectSubset<T, playlist_songDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Playlist_songs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlist_songUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Playlist_songs
     * const playlist_song = await prisma.playlist_song.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends playlist_songUpdateManyArgs>(args: SelectSubset<T, playlist_songUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Playlist_song.
     * @param {playlist_songUpsertArgs} args - Arguments to update or create a Playlist_song.
     * @example
     * // Update or create a Playlist_song
     * const playlist_song = await prisma.playlist_song.upsert({
     *   create: {
     *     // ... data to create a Playlist_song
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Playlist_song we want to update
     *   }
     * })
     */
    upsert<T extends playlist_songUpsertArgs>(args: SelectSubset<T, playlist_songUpsertArgs<ExtArgs>>): Prisma__playlist_songClient<$Result.GetResult<Prisma.$playlist_songPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Playlist_songs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlist_songCountArgs} args - Arguments to filter Playlist_songs to count.
     * @example
     * // Count the number of Playlist_songs
     * const count = await prisma.playlist_song.count({
     *   where: {
     *     // ... the filter for the Playlist_songs we want to count
     *   }
     * })
    **/
    count<T extends playlist_songCountArgs>(
      args?: Subset<T, playlist_songCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Playlist_songCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Playlist_song.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Playlist_songAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Playlist_songAggregateArgs>(args: Subset<T, Playlist_songAggregateArgs>): Prisma.PrismaPromise<GetPlaylist_songAggregateType<T>>

    /**
     * Group by Playlist_song.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playlist_songGroupByArgs} args - Group by arguments.
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
      T extends playlist_songGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: playlist_songGroupByArgs['orderBy'] }
        : { orderBy?: playlist_songGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, playlist_songGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaylist_songGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the playlist_song model
   */
  readonly fields: playlist_songFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for playlist_song.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__playlist_songClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    playlist<T extends playlistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, playlistDefaultArgs<ExtArgs>>): Prisma__playlistClient<$Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    song<T extends songDefaultArgs<ExtArgs> = {}>(args?: Subset<T, songDefaultArgs<ExtArgs>>): Prisma__songClient<$Result.GetResult<Prisma.$songPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the playlist_song model
   */
  interface playlist_songFieldRefs {
    readonly id: FieldRef<"playlist_song", 'Int'>
    readonly playlist_id: FieldRef<"playlist_song", 'Int'>
    readonly song_id: FieldRef<"playlist_song", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * playlist_song findUnique
   */
  export type playlist_songFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_song
     */
    select?: playlist_songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_song
     */
    omit?: playlist_songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_songInclude<ExtArgs> | null
    /**
     * Filter, which playlist_song to fetch.
     */
    where: playlist_songWhereUniqueInput
  }

  /**
   * playlist_song findUniqueOrThrow
   */
  export type playlist_songFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_song
     */
    select?: playlist_songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_song
     */
    omit?: playlist_songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_songInclude<ExtArgs> | null
    /**
     * Filter, which playlist_song to fetch.
     */
    where: playlist_songWhereUniqueInput
  }

  /**
   * playlist_song findFirst
   */
  export type playlist_songFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_song
     */
    select?: playlist_songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_song
     */
    omit?: playlist_songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_songInclude<ExtArgs> | null
    /**
     * Filter, which playlist_song to fetch.
     */
    where?: playlist_songWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlist_songs to fetch.
     */
    orderBy?: playlist_songOrderByWithRelationInput | playlist_songOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for playlist_songs.
     */
    cursor?: playlist_songWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlist_songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlist_songs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of playlist_songs.
     */
    distinct?: Playlist_songScalarFieldEnum | Playlist_songScalarFieldEnum[]
  }

  /**
   * playlist_song findFirstOrThrow
   */
  export type playlist_songFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_song
     */
    select?: playlist_songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_song
     */
    omit?: playlist_songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_songInclude<ExtArgs> | null
    /**
     * Filter, which playlist_song to fetch.
     */
    where?: playlist_songWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlist_songs to fetch.
     */
    orderBy?: playlist_songOrderByWithRelationInput | playlist_songOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for playlist_songs.
     */
    cursor?: playlist_songWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlist_songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlist_songs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of playlist_songs.
     */
    distinct?: Playlist_songScalarFieldEnum | Playlist_songScalarFieldEnum[]
  }

  /**
   * playlist_song findMany
   */
  export type playlist_songFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_song
     */
    select?: playlist_songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_song
     */
    omit?: playlist_songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_songInclude<ExtArgs> | null
    /**
     * Filter, which playlist_songs to fetch.
     */
    where?: playlist_songWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playlist_songs to fetch.
     */
    orderBy?: playlist_songOrderByWithRelationInput | playlist_songOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing playlist_songs.
     */
    cursor?: playlist_songWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playlist_songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playlist_songs.
     */
    skip?: number
    distinct?: Playlist_songScalarFieldEnum | Playlist_songScalarFieldEnum[]
  }

  /**
   * playlist_song create
   */
  export type playlist_songCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_song
     */
    select?: playlist_songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_song
     */
    omit?: playlist_songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_songInclude<ExtArgs> | null
    /**
     * The data needed to create a playlist_song.
     */
    data: XOR<playlist_songCreateInput, playlist_songUncheckedCreateInput>
  }

  /**
   * playlist_song createMany
   */
  export type playlist_songCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many playlist_songs.
     */
    data: playlist_songCreateManyInput | playlist_songCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * playlist_song update
   */
  export type playlist_songUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_song
     */
    select?: playlist_songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_song
     */
    omit?: playlist_songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_songInclude<ExtArgs> | null
    /**
     * The data needed to update a playlist_song.
     */
    data: XOR<playlist_songUpdateInput, playlist_songUncheckedUpdateInput>
    /**
     * Choose, which playlist_song to update.
     */
    where: playlist_songWhereUniqueInput
  }

  /**
   * playlist_song updateMany
   */
  export type playlist_songUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update playlist_songs.
     */
    data: XOR<playlist_songUpdateManyMutationInput, playlist_songUncheckedUpdateManyInput>
    /**
     * Filter which playlist_songs to update
     */
    where?: playlist_songWhereInput
    /**
     * Limit how many playlist_songs to update.
     */
    limit?: number
  }

  /**
   * playlist_song upsert
   */
  export type playlist_songUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_song
     */
    select?: playlist_songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_song
     */
    omit?: playlist_songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_songInclude<ExtArgs> | null
    /**
     * The filter to search for the playlist_song to update in case it exists.
     */
    where: playlist_songWhereUniqueInput
    /**
     * In case the playlist_song found by the `where` argument doesn't exist, create a new playlist_song with this data.
     */
    create: XOR<playlist_songCreateInput, playlist_songUncheckedCreateInput>
    /**
     * In case the playlist_song was found with the provided `where` argument, update it with this data.
     */
    update: XOR<playlist_songUpdateInput, playlist_songUncheckedUpdateInput>
  }

  /**
   * playlist_song delete
   */
  export type playlist_songDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_song
     */
    select?: playlist_songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_song
     */
    omit?: playlist_songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_songInclude<ExtArgs> | null
    /**
     * Filter which playlist_song to delete.
     */
    where: playlist_songWhereUniqueInput
  }

  /**
   * playlist_song deleteMany
   */
  export type playlist_songDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which playlist_songs to delete
     */
    where?: playlist_songWhereInput
    /**
     * Limit how many playlist_songs to delete.
     */
    limit?: number
  }

  /**
   * playlist_song without action
   */
  export type playlist_songDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_song
     */
    select?: playlist_songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_song
     */
    omit?: playlist_songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_songInclude<ExtArgs> | null
  }


  /**
   * Model song
   */

  export type AggregateSong = {
    _count: SongCountAggregateOutputType | null
    _avg: SongAvgAggregateOutputType | null
    _sum: SongSumAggregateOutputType | null
    _min: SongMinAggregateOutputType | null
    _max: SongMaxAggregateOutputType | null
  }

  export type SongAvgAggregateOutputType = {
    song_id: number | null
    view: number | null
    time_played: number | null
    year_publish: number | null
    album: number | null
  }

  export type SongSumAggregateOutputType = {
    song_id: number | null
    view: number | null
    time_played: number | null
    year_publish: number | null
    album: number | null
  }

  export type SongMinAggregateOutputType = {
    song_id: number | null
    name: string | null
    content: string | null
    view: number | null
    time_played: number | null
    key: string | null
    tempo: string | null
    genre: string | null
    year_publish: number | null
    album: number | null
  }

  export type SongMaxAggregateOutputType = {
    song_id: number | null
    name: string | null
    content: string | null
    view: number | null
    time_played: number | null
    key: string | null
    tempo: string | null
    genre: string | null
    year_publish: number | null
    album: number | null
  }

  export type SongCountAggregateOutputType = {
    song_id: number
    name: number
    content: number
    view: number
    time_played: number
    key: number
    tempo: number
    genre: number
    year_publish: number
    album: number
    _all: number
  }


  export type SongAvgAggregateInputType = {
    song_id?: true
    view?: true
    time_played?: true
    year_publish?: true
    album?: true
  }

  export type SongSumAggregateInputType = {
    song_id?: true
    view?: true
    time_played?: true
    year_publish?: true
    album?: true
  }

  export type SongMinAggregateInputType = {
    song_id?: true
    name?: true
    content?: true
    view?: true
    time_played?: true
    key?: true
    tempo?: true
    genre?: true
    year_publish?: true
    album?: true
  }

  export type SongMaxAggregateInputType = {
    song_id?: true
    name?: true
    content?: true
    view?: true
    time_played?: true
    key?: true
    tempo?: true
    genre?: true
    year_publish?: true
    album?: true
  }

  export type SongCountAggregateInputType = {
    song_id?: true
    name?: true
    content?: true
    view?: true
    time_played?: true
    key?: true
    tempo?: true
    genre?: true
    year_publish?: true
    album?: true
    _all?: true
  }

  export type SongAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which song to aggregate.
     */
    where?: songWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of songs to fetch.
     */
    orderBy?: songOrderByWithRelationInput | songOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: songWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` songs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned songs
    **/
    _count?: true | SongCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SongAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SongSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SongMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SongMaxAggregateInputType
  }

  export type GetSongAggregateType<T extends SongAggregateArgs> = {
        [P in keyof T & keyof AggregateSong]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSong[P]>
      : GetScalarType<T[P], AggregateSong[P]>
  }




  export type songGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: songWhereInput
    orderBy?: songOrderByWithAggregationInput | songOrderByWithAggregationInput[]
    by: SongScalarFieldEnum[] | SongScalarFieldEnum
    having?: songScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SongCountAggregateInputType | true
    _avg?: SongAvgAggregateInputType
    _sum?: SongSumAggregateInputType
    _min?: SongMinAggregateInputType
    _max?: SongMaxAggregateInputType
  }

  export type SongGroupByOutputType = {
    song_id: number
    name: string
    content: string
    view: number | null
    time_played: number | null
    key: string | null
    tempo: string | null
    genre: string | null
    year_publish: number | null
    album: number | null
    _count: SongCountAggregateOutputType | null
    _avg: SongAvgAggregateOutputType | null
    _sum: SongSumAggregateOutputType | null
    _min: SongMinAggregateOutputType | null
    _max: SongMaxAggregateOutputType | null
  }

  type GetSongGroupByPayload<T extends songGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SongGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SongGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SongGroupByOutputType[P]>
            : GetScalarType<T[P], SongGroupByOutputType[P]>
        }
      >
    >


  export type songSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    song_id?: boolean
    name?: boolean
    content?: boolean
    view?: boolean
    time_played?: boolean
    key?: boolean
    tempo?: boolean
    genre?: boolean
    year_publish?: boolean
    album?: boolean
    playhistory?: boolean | song$playhistoryArgs<ExtArgs>
    playlist_song?: boolean | song$playlist_songArgs<ExtArgs>
    album_song_albumToalbum?: boolean | song$album_song_albumToalbumArgs<ExtArgs>
    song_author?: boolean | song$song_authorArgs<ExtArgs>
    _count?: boolean | SongCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["song"]>



  export type songSelectScalar = {
    song_id?: boolean
    name?: boolean
    content?: boolean
    view?: boolean
    time_played?: boolean
    key?: boolean
    tempo?: boolean
    genre?: boolean
    year_publish?: boolean
    album?: boolean
  }

  export type songOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"song_id" | "name" | "content" | "view" | "time_played" | "key" | "tempo" | "genre" | "year_publish" | "album", ExtArgs["result"]["song"]>
  export type songInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playhistory?: boolean | song$playhistoryArgs<ExtArgs>
    playlist_song?: boolean | song$playlist_songArgs<ExtArgs>
    album_song_albumToalbum?: boolean | song$album_song_albumToalbumArgs<ExtArgs>
    song_author?: boolean | song$song_authorArgs<ExtArgs>
    _count?: boolean | SongCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $songPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "song"
    objects: {
      playhistory: Prisma.$playhistoryPayload<ExtArgs>[]
      playlist_song: Prisma.$playlist_songPayload<ExtArgs>[]
      album_song_albumToalbum: Prisma.$albumPayload<ExtArgs> | null
      song_author: Prisma.$song_authorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      song_id: number
      name: string
      content: string
      view: number | null
      time_played: number | null
      key: string | null
      tempo: string | null
      genre: string | null
      year_publish: number | null
      album: number | null
    }, ExtArgs["result"]["song"]>
    composites: {}
  }

  type songGetPayload<S extends boolean | null | undefined | songDefaultArgs> = $Result.GetResult<Prisma.$songPayload, S>

  type songCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<songFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SongCountAggregateInputType | true
    }

  export interface songDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['song'], meta: { name: 'song' } }
    /**
     * Find zero or one Song that matches the filter.
     * @param {songFindUniqueArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends songFindUniqueArgs>(args: SelectSubset<T, songFindUniqueArgs<ExtArgs>>): Prisma__songClient<$Result.GetResult<Prisma.$songPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Song that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {songFindUniqueOrThrowArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends songFindUniqueOrThrowArgs>(args: SelectSubset<T, songFindUniqueOrThrowArgs<ExtArgs>>): Prisma__songClient<$Result.GetResult<Prisma.$songPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Song that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {songFindFirstArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends songFindFirstArgs>(args?: SelectSubset<T, songFindFirstArgs<ExtArgs>>): Prisma__songClient<$Result.GetResult<Prisma.$songPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Song that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {songFindFirstOrThrowArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends songFindFirstOrThrowArgs>(args?: SelectSubset<T, songFindFirstOrThrowArgs<ExtArgs>>): Prisma__songClient<$Result.GetResult<Prisma.$songPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Songs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {songFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Songs
     * const songs = await prisma.song.findMany()
     * 
     * // Get first 10 Songs
     * const songs = await prisma.song.findMany({ take: 10 })
     * 
     * // Only select the `song_id`
     * const songWithSong_idOnly = await prisma.song.findMany({ select: { song_id: true } })
     * 
     */
    findMany<T extends songFindManyArgs>(args?: SelectSubset<T, songFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$songPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Song.
     * @param {songCreateArgs} args - Arguments to create a Song.
     * @example
     * // Create one Song
     * const Song = await prisma.song.create({
     *   data: {
     *     // ... data to create a Song
     *   }
     * })
     * 
     */
    create<T extends songCreateArgs>(args: SelectSubset<T, songCreateArgs<ExtArgs>>): Prisma__songClient<$Result.GetResult<Prisma.$songPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Songs.
     * @param {songCreateManyArgs} args - Arguments to create many Songs.
     * @example
     * // Create many Songs
     * const song = await prisma.song.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends songCreateManyArgs>(args?: SelectSubset<T, songCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Song.
     * @param {songDeleteArgs} args - Arguments to delete one Song.
     * @example
     * // Delete one Song
     * const Song = await prisma.song.delete({
     *   where: {
     *     // ... filter to delete one Song
     *   }
     * })
     * 
     */
    delete<T extends songDeleteArgs>(args: SelectSubset<T, songDeleteArgs<ExtArgs>>): Prisma__songClient<$Result.GetResult<Prisma.$songPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Song.
     * @param {songUpdateArgs} args - Arguments to update one Song.
     * @example
     * // Update one Song
     * const song = await prisma.song.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends songUpdateArgs>(args: SelectSubset<T, songUpdateArgs<ExtArgs>>): Prisma__songClient<$Result.GetResult<Prisma.$songPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Songs.
     * @param {songDeleteManyArgs} args - Arguments to filter Songs to delete.
     * @example
     * // Delete a few Songs
     * const { count } = await prisma.song.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends songDeleteManyArgs>(args?: SelectSubset<T, songDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Songs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {songUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Songs
     * const song = await prisma.song.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends songUpdateManyArgs>(args: SelectSubset<T, songUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Song.
     * @param {songUpsertArgs} args - Arguments to update or create a Song.
     * @example
     * // Update or create a Song
     * const song = await prisma.song.upsert({
     *   create: {
     *     // ... data to create a Song
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Song we want to update
     *   }
     * })
     */
    upsert<T extends songUpsertArgs>(args: SelectSubset<T, songUpsertArgs<ExtArgs>>): Prisma__songClient<$Result.GetResult<Prisma.$songPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Songs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {songCountArgs} args - Arguments to filter Songs to count.
     * @example
     * // Count the number of Songs
     * const count = await prisma.song.count({
     *   where: {
     *     // ... the filter for the Songs we want to count
     *   }
     * })
    **/
    count<T extends songCountArgs>(
      args?: Subset<T, songCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SongCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Song.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SongAggregateArgs>(args: Subset<T, SongAggregateArgs>): Prisma.PrismaPromise<GetSongAggregateType<T>>

    /**
     * Group by Song.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {songGroupByArgs} args - Group by arguments.
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
      T extends songGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: songGroupByArgs['orderBy'] }
        : { orderBy?: songGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, songGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSongGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the song model
   */
  readonly fields: songFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for song.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__songClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    playhistory<T extends song$playhistoryArgs<ExtArgs> = {}>(args?: Subset<T, song$playhistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$playhistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    playlist_song<T extends song$playlist_songArgs<ExtArgs> = {}>(args?: Subset<T, song$playlist_songArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$playlist_songPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    album_song_albumToalbum<T extends song$album_song_albumToalbumArgs<ExtArgs> = {}>(args?: Subset<T, song$album_song_albumToalbumArgs<ExtArgs>>): Prisma__albumClient<$Result.GetResult<Prisma.$albumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    song_author<T extends song$song_authorArgs<ExtArgs> = {}>(args?: Subset<T, song$song_authorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$song_authorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the song model
   */
  interface songFieldRefs {
    readonly song_id: FieldRef<"song", 'Int'>
    readonly name: FieldRef<"song", 'String'>
    readonly content: FieldRef<"song", 'String'>
    readonly view: FieldRef<"song", 'Int'>
    readonly time_played: FieldRef<"song", 'Int'>
    readonly key: FieldRef<"song", 'String'>
    readonly tempo: FieldRef<"song", 'String'>
    readonly genre: FieldRef<"song", 'String'>
    readonly year_publish: FieldRef<"song", 'Int'>
    readonly album: FieldRef<"song", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * song findUnique
   */
  export type songFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song
     */
    select?: songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song
     */
    omit?: songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: songInclude<ExtArgs> | null
    /**
     * Filter, which song to fetch.
     */
    where: songWhereUniqueInput
  }

  /**
   * song findUniqueOrThrow
   */
  export type songFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song
     */
    select?: songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song
     */
    omit?: songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: songInclude<ExtArgs> | null
    /**
     * Filter, which song to fetch.
     */
    where: songWhereUniqueInput
  }

  /**
   * song findFirst
   */
  export type songFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song
     */
    select?: songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song
     */
    omit?: songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: songInclude<ExtArgs> | null
    /**
     * Filter, which song to fetch.
     */
    where?: songWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of songs to fetch.
     */
    orderBy?: songOrderByWithRelationInput | songOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for songs.
     */
    cursor?: songWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` songs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of songs.
     */
    distinct?: SongScalarFieldEnum | SongScalarFieldEnum[]
  }

  /**
   * song findFirstOrThrow
   */
  export type songFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song
     */
    select?: songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song
     */
    omit?: songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: songInclude<ExtArgs> | null
    /**
     * Filter, which song to fetch.
     */
    where?: songWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of songs to fetch.
     */
    orderBy?: songOrderByWithRelationInput | songOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for songs.
     */
    cursor?: songWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` songs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of songs.
     */
    distinct?: SongScalarFieldEnum | SongScalarFieldEnum[]
  }

  /**
   * song findMany
   */
  export type songFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song
     */
    select?: songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song
     */
    omit?: songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: songInclude<ExtArgs> | null
    /**
     * Filter, which songs to fetch.
     */
    where?: songWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of songs to fetch.
     */
    orderBy?: songOrderByWithRelationInput | songOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing songs.
     */
    cursor?: songWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` songs.
     */
    skip?: number
    distinct?: SongScalarFieldEnum | SongScalarFieldEnum[]
  }

  /**
   * song create
   */
  export type songCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song
     */
    select?: songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song
     */
    omit?: songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: songInclude<ExtArgs> | null
    /**
     * The data needed to create a song.
     */
    data: XOR<songCreateInput, songUncheckedCreateInput>
  }

  /**
   * song createMany
   */
  export type songCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many songs.
     */
    data: songCreateManyInput | songCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * song update
   */
  export type songUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song
     */
    select?: songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song
     */
    omit?: songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: songInclude<ExtArgs> | null
    /**
     * The data needed to update a song.
     */
    data: XOR<songUpdateInput, songUncheckedUpdateInput>
    /**
     * Choose, which song to update.
     */
    where: songWhereUniqueInput
  }

  /**
   * song updateMany
   */
  export type songUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update songs.
     */
    data: XOR<songUpdateManyMutationInput, songUncheckedUpdateManyInput>
    /**
     * Filter which songs to update
     */
    where?: songWhereInput
    /**
     * Limit how many songs to update.
     */
    limit?: number
  }

  /**
   * song upsert
   */
  export type songUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song
     */
    select?: songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song
     */
    omit?: songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: songInclude<ExtArgs> | null
    /**
     * The filter to search for the song to update in case it exists.
     */
    where: songWhereUniqueInput
    /**
     * In case the song found by the `where` argument doesn't exist, create a new song with this data.
     */
    create: XOR<songCreateInput, songUncheckedCreateInput>
    /**
     * In case the song was found with the provided `where` argument, update it with this data.
     */
    update: XOR<songUpdateInput, songUncheckedUpdateInput>
  }

  /**
   * song delete
   */
  export type songDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song
     */
    select?: songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song
     */
    omit?: songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: songInclude<ExtArgs> | null
    /**
     * Filter which song to delete.
     */
    where: songWhereUniqueInput
  }

  /**
   * song deleteMany
   */
  export type songDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which songs to delete
     */
    where?: songWhereInput
    /**
     * Limit how many songs to delete.
     */
    limit?: number
  }

  /**
   * song.playhistory
   */
  export type song$playhistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playhistory
     */
    select?: playhistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the playhistory
     */
    omit?: playhistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playhistoryInclude<ExtArgs> | null
    where?: playhistoryWhereInput
    orderBy?: playhistoryOrderByWithRelationInput | playhistoryOrderByWithRelationInput[]
    cursor?: playhistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlayhistoryScalarFieldEnum | PlayhistoryScalarFieldEnum[]
  }

  /**
   * song.playlist_song
   */
  export type song$playlist_songArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist_song
     */
    select?: playlist_songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist_song
     */
    omit?: playlist_songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlist_songInclude<ExtArgs> | null
    where?: playlist_songWhereInput
    orderBy?: playlist_songOrderByWithRelationInput | playlist_songOrderByWithRelationInput[]
    cursor?: playlist_songWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Playlist_songScalarFieldEnum | Playlist_songScalarFieldEnum[]
  }

  /**
   * song.album_song_albumToalbum
   */
  export type song$album_song_albumToalbumArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album
     */
    select?: albumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album
     */
    omit?: albumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: albumInclude<ExtArgs> | null
    where?: albumWhereInput
  }

  /**
   * song.song_author
   */
  export type song$song_authorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song_author
     */
    select?: song_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song_author
     */
    omit?: song_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: song_authorInclude<ExtArgs> | null
    where?: song_authorWhereInput
    orderBy?: song_authorOrderByWithRelationInput | song_authorOrderByWithRelationInput[]
    cursor?: song_authorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Song_authorScalarFieldEnum | Song_authorScalarFieldEnum[]
  }

  /**
   * song without action
   */
  export type songDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song
     */
    select?: songSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song
     */
    omit?: songOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: songInclude<ExtArgs> | null
  }


  /**
   * Model song_author
   */

  export type AggregateSong_author = {
    _count: Song_authorCountAggregateOutputType | null
    _avg: Song_authorAvgAggregateOutputType | null
    _sum: Song_authorSumAggregateOutputType | null
    _min: Song_authorMinAggregateOutputType | null
    _max: Song_authorMaxAggregateOutputType | null
  }

  export type Song_authorAvgAggregateOutputType = {
    id: number | null
    author_id: number | null
    song_id: number | null
  }

  export type Song_authorSumAggregateOutputType = {
    id: number | null
    author_id: number | null
    song_id: number | null
  }

  export type Song_authorMinAggregateOutputType = {
    id: number | null
    author_id: number | null
    song_id: number | null
  }

  export type Song_authorMaxAggregateOutputType = {
    id: number | null
    author_id: number | null
    song_id: number | null
  }

  export type Song_authorCountAggregateOutputType = {
    id: number
    author_id: number
    song_id: number
    _all: number
  }


  export type Song_authorAvgAggregateInputType = {
    id?: true
    author_id?: true
    song_id?: true
  }

  export type Song_authorSumAggregateInputType = {
    id?: true
    author_id?: true
    song_id?: true
  }

  export type Song_authorMinAggregateInputType = {
    id?: true
    author_id?: true
    song_id?: true
  }

  export type Song_authorMaxAggregateInputType = {
    id?: true
    author_id?: true
    song_id?: true
  }

  export type Song_authorCountAggregateInputType = {
    id?: true
    author_id?: true
    song_id?: true
    _all?: true
  }

  export type Song_authorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which song_author to aggregate.
     */
    where?: song_authorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of song_authors to fetch.
     */
    orderBy?: song_authorOrderByWithRelationInput | song_authorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: song_authorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` song_authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` song_authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned song_authors
    **/
    _count?: true | Song_authorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Song_authorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Song_authorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Song_authorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Song_authorMaxAggregateInputType
  }

  export type GetSong_authorAggregateType<T extends Song_authorAggregateArgs> = {
        [P in keyof T & keyof AggregateSong_author]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSong_author[P]>
      : GetScalarType<T[P], AggregateSong_author[P]>
  }




  export type song_authorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: song_authorWhereInput
    orderBy?: song_authorOrderByWithAggregationInput | song_authorOrderByWithAggregationInput[]
    by: Song_authorScalarFieldEnum[] | Song_authorScalarFieldEnum
    having?: song_authorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Song_authorCountAggregateInputType | true
    _avg?: Song_authorAvgAggregateInputType
    _sum?: Song_authorSumAggregateInputType
    _min?: Song_authorMinAggregateInputType
    _max?: Song_authorMaxAggregateInputType
  }

  export type Song_authorGroupByOutputType = {
    id: number
    author_id: number
    song_id: number
    _count: Song_authorCountAggregateOutputType | null
    _avg: Song_authorAvgAggregateOutputType | null
    _sum: Song_authorSumAggregateOutputType | null
    _min: Song_authorMinAggregateOutputType | null
    _max: Song_authorMaxAggregateOutputType | null
  }

  type GetSong_authorGroupByPayload<T extends song_authorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Song_authorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Song_authorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Song_authorGroupByOutputType[P]>
            : GetScalarType<T[P], Song_authorGroupByOutputType[P]>
        }
      >
    >


  export type song_authorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    author_id?: boolean
    song_id?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    song?: boolean | songDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["song_author"]>



  export type song_authorSelectScalar = {
    id?: boolean
    author_id?: boolean
    song_id?: boolean
  }

  export type song_authorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "author_id" | "song_id", ExtArgs["result"]["song_author"]>
  export type song_authorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    song?: boolean | songDefaultArgs<ExtArgs>
  }

  export type $song_authorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "song_author"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      song: Prisma.$songPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      author_id: number
      song_id: number
    }, ExtArgs["result"]["song_author"]>
    composites: {}
  }

  type song_authorGetPayload<S extends boolean | null | undefined | song_authorDefaultArgs> = $Result.GetResult<Prisma.$song_authorPayload, S>

  type song_authorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<song_authorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Song_authorCountAggregateInputType | true
    }

  export interface song_authorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['song_author'], meta: { name: 'song_author' } }
    /**
     * Find zero or one Song_author that matches the filter.
     * @param {song_authorFindUniqueArgs} args - Arguments to find a Song_author
     * @example
     * // Get one Song_author
     * const song_author = await prisma.song_author.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends song_authorFindUniqueArgs>(args: SelectSubset<T, song_authorFindUniqueArgs<ExtArgs>>): Prisma__song_authorClient<$Result.GetResult<Prisma.$song_authorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Song_author that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {song_authorFindUniqueOrThrowArgs} args - Arguments to find a Song_author
     * @example
     * // Get one Song_author
     * const song_author = await prisma.song_author.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends song_authorFindUniqueOrThrowArgs>(args: SelectSubset<T, song_authorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__song_authorClient<$Result.GetResult<Prisma.$song_authorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Song_author that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {song_authorFindFirstArgs} args - Arguments to find a Song_author
     * @example
     * // Get one Song_author
     * const song_author = await prisma.song_author.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends song_authorFindFirstArgs>(args?: SelectSubset<T, song_authorFindFirstArgs<ExtArgs>>): Prisma__song_authorClient<$Result.GetResult<Prisma.$song_authorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Song_author that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {song_authorFindFirstOrThrowArgs} args - Arguments to find a Song_author
     * @example
     * // Get one Song_author
     * const song_author = await prisma.song_author.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends song_authorFindFirstOrThrowArgs>(args?: SelectSubset<T, song_authorFindFirstOrThrowArgs<ExtArgs>>): Prisma__song_authorClient<$Result.GetResult<Prisma.$song_authorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Song_authors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {song_authorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Song_authors
     * const song_authors = await prisma.song_author.findMany()
     * 
     * // Get first 10 Song_authors
     * const song_authors = await prisma.song_author.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const song_authorWithIdOnly = await prisma.song_author.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends song_authorFindManyArgs>(args?: SelectSubset<T, song_authorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$song_authorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Song_author.
     * @param {song_authorCreateArgs} args - Arguments to create a Song_author.
     * @example
     * // Create one Song_author
     * const Song_author = await prisma.song_author.create({
     *   data: {
     *     // ... data to create a Song_author
     *   }
     * })
     * 
     */
    create<T extends song_authorCreateArgs>(args: SelectSubset<T, song_authorCreateArgs<ExtArgs>>): Prisma__song_authorClient<$Result.GetResult<Prisma.$song_authorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Song_authors.
     * @param {song_authorCreateManyArgs} args - Arguments to create many Song_authors.
     * @example
     * // Create many Song_authors
     * const song_author = await prisma.song_author.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends song_authorCreateManyArgs>(args?: SelectSubset<T, song_authorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Song_author.
     * @param {song_authorDeleteArgs} args - Arguments to delete one Song_author.
     * @example
     * // Delete one Song_author
     * const Song_author = await prisma.song_author.delete({
     *   where: {
     *     // ... filter to delete one Song_author
     *   }
     * })
     * 
     */
    delete<T extends song_authorDeleteArgs>(args: SelectSubset<T, song_authorDeleteArgs<ExtArgs>>): Prisma__song_authorClient<$Result.GetResult<Prisma.$song_authorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Song_author.
     * @param {song_authorUpdateArgs} args - Arguments to update one Song_author.
     * @example
     * // Update one Song_author
     * const song_author = await prisma.song_author.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends song_authorUpdateArgs>(args: SelectSubset<T, song_authorUpdateArgs<ExtArgs>>): Prisma__song_authorClient<$Result.GetResult<Prisma.$song_authorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Song_authors.
     * @param {song_authorDeleteManyArgs} args - Arguments to filter Song_authors to delete.
     * @example
     * // Delete a few Song_authors
     * const { count } = await prisma.song_author.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends song_authorDeleteManyArgs>(args?: SelectSubset<T, song_authorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Song_authors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {song_authorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Song_authors
     * const song_author = await prisma.song_author.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends song_authorUpdateManyArgs>(args: SelectSubset<T, song_authorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Song_author.
     * @param {song_authorUpsertArgs} args - Arguments to update or create a Song_author.
     * @example
     * // Update or create a Song_author
     * const song_author = await prisma.song_author.upsert({
     *   create: {
     *     // ... data to create a Song_author
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Song_author we want to update
     *   }
     * })
     */
    upsert<T extends song_authorUpsertArgs>(args: SelectSubset<T, song_authorUpsertArgs<ExtArgs>>): Prisma__song_authorClient<$Result.GetResult<Prisma.$song_authorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Song_authors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {song_authorCountArgs} args - Arguments to filter Song_authors to count.
     * @example
     * // Count the number of Song_authors
     * const count = await prisma.song_author.count({
     *   where: {
     *     // ... the filter for the Song_authors we want to count
     *   }
     * })
    **/
    count<T extends song_authorCountArgs>(
      args?: Subset<T, song_authorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Song_authorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Song_author.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Song_authorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Song_authorAggregateArgs>(args: Subset<T, Song_authorAggregateArgs>): Prisma.PrismaPromise<GetSong_authorAggregateType<T>>

    /**
     * Group by Song_author.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {song_authorGroupByArgs} args - Group by arguments.
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
      T extends song_authorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: song_authorGroupByArgs['orderBy'] }
        : { orderBy?: song_authorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, song_authorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSong_authorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the song_author model
   */
  readonly fields: song_authorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for song_author.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__song_authorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    song<T extends songDefaultArgs<ExtArgs> = {}>(args?: Subset<T, songDefaultArgs<ExtArgs>>): Prisma__songClient<$Result.GetResult<Prisma.$songPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the song_author model
   */
  interface song_authorFieldRefs {
    readonly id: FieldRef<"song_author", 'Int'>
    readonly author_id: FieldRef<"song_author", 'Int'>
    readonly song_id: FieldRef<"song_author", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * song_author findUnique
   */
  export type song_authorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song_author
     */
    select?: song_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song_author
     */
    omit?: song_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: song_authorInclude<ExtArgs> | null
    /**
     * Filter, which song_author to fetch.
     */
    where: song_authorWhereUniqueInput
  }

  /**
   * song_author findUniqueOrThrow
   */
  export type song_authorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song_author
     */
    select?: song_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song_author
     */
    omit?: song_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: song_authorInclude<ExtArgs> | null
    /**
     * Filter, which song_author to fetch.
     */
    where: song_authorWhereUniqueInput
  }

  /**
   * song_author findFirst
   */
  export type song_authorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song_author
     */
    select?: song_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song_author
     */
    omit?: song_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: song_authorInclude<ExtArgs> | null
    /**
     * Filter, which song_author to fetch.
     */
    where?: song_authorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of song_authors to fetch.
     */
    orderBy?: song_authorOrderByWithRelationInput | song_authorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for song_authors.
     */
    cursor?: song_authorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` song_authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` song_authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of song_authors.
     */
    distinct?: Song_authorScalarFieldEnum | Song_authorScalarFieldEnum[]
  }

  /**
   * song_author findFirstOrThrow
   */
  export type song_authorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song_author
     */
    select?: song_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song_author
     */
    omit?: song_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: song_authorInclude<ExtArgs> | null
    /**
     * Filter, which song_author to fetch.
     */
    where?: song_authorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of song_authors to fetch.
     */
    orderBy?: song_authorOrderByWithRelationInput | song_authorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for song_authors.
     */
    cursor?: song_authorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` song_authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` song_authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of song_authors.
     */
    distinct?: Song_authorScalarFieldEnum | Song_authorScalarFieldEnum[]
  }

  /**
   * song_author findMany
   */
  export type song_authorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song_author
     */
    select?: song_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song_author
     */
    omit?: song_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: song_authorInclude<ExtArgs> | null
    /**
     * Filter, which song_authors to fetch.
     */
    where?: song_authorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of song_authors to fetch.
     */
    orderBy?: song_authorOrderByWithRelationInput | song_authorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing song_authors.
     */
    cursor?: song_authorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` song_authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` song_authors.
     */
    skip?: number
    distinct?: Song_authorScalarFieldEnum | Song_authorScalarFieldEnum[]
  }

  /**
   * song_author create
   */
  export type song_authorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song_author
     */
    select?: song_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song_author
     */
    omit?: song_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: song_authorInclude<ExtArgs> | null
    /**
     * The data needed to create a song_author.
     */
    data: XOR<song_authorCreateInput, song_authorUncheckedCreateInput>
  }

  /**
   * song_author createMany
   */
  export type song_authorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many song_authors.
     */
    data: song_authorCreateManyInput | song_authorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * song_author update
   */
  export type song_authorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song_author
     */
    select?: song_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song_author
     */
    omit?: song_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: song_authorInclude<ExtArgs> | null
    /**
     * The data needed to update a song_author.
     */
    data: XOR<song_authorUpdateInput, song_authorUncheckedUpdateInput>
    /**
     * Choose, which song_author to update.
     */
    where: song_authorWhereUniqueInput
  }

  /**
   * song_author updateMany
   */
  export type song_authorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update song_authors.
     */
    data: XOR<song_authorUpdateManyMutationInput, song_authorUncheckedUpdateManyInput>
    /**
     * Filter which song_authors to update
     */
    where?: song_authorWhereInput
    /**
     * Limit how many song_authors to update.
     */
    limit?: number
  }

  /**
   * song_author upsert
   */
  export type song_authorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song_author
     */
    select?: song_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song_author
     */
    omit?: song_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: song_authorInclude<ExtArgs> | null
    /**
     * The filter to search for the song_author to update in case it exists.
     */
    where: song_authorWhereUniqueInput
    /**
     * In case the song_author found by the `where` argument doesn't exist, create a new song_author with this data.
     */
    create: XOR<song_authorCreateInput, song_authorUncheckedCreateInput>
    /**
     * In case the song_author was found with the provided `where` argument, update it with this data.
     */
    update: XOR<song_authorUpdateInput, song_authorUncheckedUpdateInput>
  }

  /**
   * song_author delete
   */
  export type song_authorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song_author
     */
    select?: song_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song_author
     */
    omit?: song_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: song_authorInclude<ExtArgs> | null
    /**
     * Filter which song_author to delete.
     */
    where: song_authorWhereUniqueInput
  }

  /**
   * song_author deleteMany
   */
  export type song_authorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which song_authors to delete
     */
    where?: song_authorWhereInput
    /**
     * Limit how many song_authors to delete.
     */
    limit?: number
  }

  /**
   * song_author without action
   */
  export type song_authorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song_author
     */
    select?: song_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song_author
     */
    omit?: song_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: song_authorInclude<ExtArgs> | null
  }


  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    playlists_created: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    playlists_created: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    password_hash: string | null
    playlists_created: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password_hash: string | null
    playlists_created: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password_hash: number
    playlists_created: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    playlists_created?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    playlists_created?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password_hash?: true
    playlists_created?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password_hash?: true
    playlists_created?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password_hash?: true
    playlists_created?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    password_hash: string
    playlists_created: number | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
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


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password_hash?: boolean
    playlists_created?: boolean
    album_author?: boolean | user$album_authorArgs<ExtArgs>
    playhistory?: boolean | user$playhistoryArgs<ExtArgs>
    playlist?: boolean | user$playlistArgs<ExtArgs>
    song_author?: boolean | user$song_authorArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type userSelectScalar = {
    id?: boolean
    username?: boolean
    password_hash?: boolean
    playlists_created?: boolean
  }

  export type userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password_hash" | "playlists_created", ExtArgs["result"]["user"]>
  export type userInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    album_author?: boolean | user$album_authorArgs<ExtArgs>
    playhistory?: boolean | user$playhistoryArgs<ExtArgs>
    playlist?: boolean | user$playlistArgs<ExtArgs>
    song_author?: boolean | user$song_authorArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {
      album_author: Prisma.$album_authorPayload<ExtArgs>[]
      playhistory: Prisma.$playhistoryPayload<ExtArgs>[]
      playlist: Prisma.$playlistPayload<ExtArgs>[]
      song_author: Prisma.$song_authorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      password_hash: string
      playlists_created: number | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
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
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
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
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
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
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
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
     * @param {userGroupByArgs} args - Group by arguments.
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
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    album_author<T extends user$album_authorArgs<ExtArgs> = {}>(args?: Subset<T, user$album_authorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$album_authorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    playhistory<T extends user$playhistoryArgs<ExtArgs> = {}>(args?: Subset<T, user$playhistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$playhistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    playlist<T extends user$playlistArgs<ExtArgs> = {}>(args?: Subset<T, user$playlistArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$playlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    song_author<T extends user$song_authorArgs<ExtArgs> = {}>(args?: Subset<T, user$song_authorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$song_authorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the user model
   */
  interface userFieldRefs {
    readonly id: FieldRef<"user", 'Int'>
    readonly username: FieldRef<"user", 'String'>
    readonly password_hash: FieldRef<"user", 'String'>
    readonly playlists_created: FieldRef<"user", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * user.album_author
   */
  export type user$album_authorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the album_author
     */
    select?: album_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the album_author
     */
    omit?: album_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: album_authorInclude<ExtArgs> | null
    where?: album_authorWhereInput
    orderBy?: album_authorOrderByWithRelationInput | album_authorOrderByWithRelationInput[]
    cursor?: album_authorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Album_authorScalarFieldEnum | Album_authorScalarFieldEnum[]
  }

  /**
   * user.playhistory
   */
  export type user$playhistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playhistory
     */
    select?: playhistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the playhistory
     */
    omit?: playhistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playhistoryInclude<ExtArgs> | null
    where?: playhistoryWhereInput
    orderBy?: playhistoryOrderByWithRelationInput | playhistoryOrderByWithRelationInput[]
    cursor?: playhistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlayhistoryScalarFieldEnum | PlayhistoryScalarFieldEnum[]
  }

  /**
   * user.playlist
   */
  export type user$playlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the playlist
     */
    select?: playlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the playlist
     */
    omit?: playlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: playlistInclude<ExtArgs> | null
    where?: playlistWhereInput
    orderBy?: playlistOrderByWithRelationInput | playlistOrderByWithRelationInput[]
    cursor?: playlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * user.song_author
   */
  export type user$song_authorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the song_author
     */
    select?: song_authorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the song_author
     */
    omit?: song_authorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: song_authorInclude<ExtArgs> | null
    where?: song_authorWhereInput
    orderBy?: song_authorOrderByWithRelationInput | song_authorOrderByWithRelationInput[]
    cursor?: song_authorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Song_authorScalarFieldEnum | Song_authorScalarFieldEnum[]
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
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


  export const AlbumScalarFieldEnum: {
    id: 'id',
    album_name: 'album_name'
  };

  export type AlbumScalarFieldEnum = (typeof AlbumScalarFieldEnum)[keyof typeof AlbumScalarFieldEnum]


  export const Album_authorScalarFieldEnum: {
    id: 'id',
    author_id: 'author_id',
    album_id: 'album_id'
  };

  export type Album_authorScalarFieldEnum = (typeof Album_authorScalarFieldEnum)[keyof typeof Album_authorScalarFieldEnum]


  export const PlayhistoryScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    song_played: 'song_played',
    date: 'date',
    score: 'score',
    user_recording: 'user_recording'
  };

  export type PlayhistoryScalarFieldEnum = (typeof PlayhistoryScalarFieldEnum)[keyof typeof PlayhistoryScalarFieldEnum]


  export const PlaylistScalarFieldEnum: {
    id: 'id',
    user_created: 'user_created',
    playlist_name: 'playlist_name',
    description: 'description',
    total_time_played: 'total_time_played',
    total_view: 'total_view'
  };

  export type PlaylistScalarFieldEnum = (typeof PlaylistScalarFieldEnum)[keyof typeof PlaylistScalarFieldEnum]


  export const Playlist_songScalarFieldEnum: {
    id: 'id',
    playlist_id: 'playlist_id',
    song_id: 'song_id'
  };

  export type Playlist_songScalarFieldEnum = (typeof Playlist_songScalarFieldEnum)[keyof typeof Playlist_songScalarFieldEnum]


  export const SongScalarFieldEnum: {
    song_id: 'song_id',
    name: 'name',
    content: 'content',
    view: 'view',
    time_played: 'time_played',
    key: 'key',
    tempo: 'tempo',
    genre: 'genre',
    year_publish: 'year_publish',
    album: 'album'
  };

  export type SongScalarFieldEnum = (typeof SongScalarFieldEnum)[keyof typeof SongScalarFieldEnum]


  export const Song_authorScalarFieldEnum: {
    id: 'id',
    author_id: 'author_id',
    song_id: 'song_id'
  };

  export type Song_authorScalarFieldEnum = (typeof Song_authorScalarFieldEnum)[keyof typeof Song_authorScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password_hash: 'password_hash',
    playlists_created: 'playlists_created'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const albumOrderByRelevanceFieldEnum: {
    album_name: 'album_name'
  };

  export type albumOrderByRelevanceFieldEnum = (typeof albumOrderByRelevanceFieldEnum)[keyof typeof albumOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const playhistoryOrderByRelevanceFieldEnum: {
    user_recording: 'user_recording'
  };

  export type playhistoryOrderByRelevanceFieldEnum = (typeof playhistoryOrderByRelevanceFieldEnum)[keyof typeof playhistoryOrderByRelevanceFieldEnum]


  export const playlistOrderByRelevanceFieldEnum: {
    playlist_name: 'playlist_name',
    description: 'description'
  };

  export type playlistOrderByRelevanceFieldEnum = (typeof playlistOrderByRelevanceFieldEnum)[keyof typeof playlistOrderByRelevanceFieldEnum]


  export const songOrderByRelevanceFieldEnum: {
    name: 'name',
    content: 'content',
    key: 'key',
    tempo: 'tempo',
    genre: 'genre'
  };

  export type songOrderByRelevanceFieldEnum = (typeof songOrderByRelevanceFieldEnum)[keyof typeof songOrderByRelevanceFieldEnum]


  export const userOrderByRelevanceFieldEnum: {
    username: 'username',
    password_hash: 'password_hash'
  };

  export type userOrderByRelevanceFieldEnum = (typeof userOrderByRelevanceFieldEnum)[keyof typeof userOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type albumWhereInput = {
    AND?: albumWhereInput | albumWhereInput[]
    OR?: albumWhereInput[]
    NOT?: albumWhereInput | albumWhereInput[]
    id?: IntFilter<"album"> | number
    album_name?: StringFilter<"album"> | string
    album_author?: Album_authorListRelationFilter
    song_song_albumToalbum?: SongListRelationFilter
  }

  export type albumOrderByWithRelationInput = {
    id?: SortOrder
    album_name?: SortOrder
    album_author?: album_authorOrderByRelationAggregateInput
    song_song_albumToalbum?: songOrderByRelationAggregateInput
    _relevance?: albumOrderByRelevanceInput
  }

  export type albumWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: albumWhereInput | albumWhereInput[]
    OR?: albumWhereInput[]
    NOT?: albumWhereInput | albumWhereInput[]
    album_name?: StringFilter<"album"> | string
    album_author?: Album_authorListRelationFilter
    song_song_albumToalbum?: SongListRelationFilter
  }, "id">

  export type albumOrderByWithAggregationInput = {
    id?: SortOrder
    album_name?: SortOrder
    _count?: albumCountOrderByAggregateInput
    _avg?: albumAvgOrderByAggregateInput
    _max?: albumMaxOrderByAggregateInput
    _min?: albumMinOrderByAggregateInput
    _sum?: albumSumOrderByAggregateInput
  }

  export type albumScalarWhereWithAggregatesInput = {
    AND?: albumScalarWhereWithAggregatesInput | albumScalarWhereWithAggregatesInput[]
    OR?: albumScalarWhereWithAggregatesInput[]
    NOT?: albumScalarWhereWithAggregatesInput | albumScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"album"> | number
    album_name?: StringWithAggregatesFilter<"album"> | string
  }

  export type album_authorWhereInput = {
    AND?: album_authorWhereInput | album_authorWhereInput[]
    OR?: album_authorWhereInput[]
    NOT?: album_authorWhereInput | album_authorWhereInput[]
    id?: IntFilter<"album_author"> | number
    author_id?: IntFilter<"album_author"> | number
    album_id?: IntFilter<"album_author"> | number
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    album?: XOR<AlbumScalarRelationFilter, albumWhereInput>
  }

  export type album_authorOrderByWithRelationInput = {
    id?: SortOrder
    author_id?: SortOrder
    album_id?: SortOrder
    user?: userOrderByWithRelationInput
    album?: albumOrderByWithRelationInput
  }

  export type album_authorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: album_authorWhereInput | album_authorWhereInput[]
    OR?: album_authorWhereInput[]
    NOT?: album_authorWhereInput | album_authorWhereInput[]
    author_id?: IntFilter<"album_author"> | number
    album_id?: IntFilter<"album_author"> | number
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    album?: XOR<AlbumScalarRelationFilter, albumWhereInput>
  }, "id">

  export type album_authorOrderByWithAggregationInput = {
    id?: SortOrder
    author_id?: SortOrder
    album_id?: SortOrder
    _count?: album_authorCountOrderByAggregateInput
    _avg?: album_authorAvgOrderByAggregateInput
    _max?: album_authorMaxOrderByAggregateInput
    _min?: album_authorMinOrderByAggregateInput
    _sum?: album_authorSumOrderByAggregateInput
  }

  export type album_authorScalarWhereWithAggregatesInput = {
    AND?: album_authorScalarWhereWithAggregatesInput | album_authorScalarWhereWithAggregatesInput[]
    OR?: album_authorScalarWhereWithAggregatesInput[]
    NOT?: album_authorScalarWhereWithAggregatesInput | album_authorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"album_author"> | number
    author_id?: IntWithAggregatesFilter<"album_author"> | number
    album_id?: IntWithAggregatesFilter<"album_author"> | number
  }

  export type playhistoryWhereInput = {
    AND?: playhistoryWhereInput | playhistoryWhereInput[]
    OR?: playhistoryWhereInput[]
    NOT?: playhistoryWhereInput | playhistoryWhereInput[]
    id?: IntFilter<"playhistory"> | number
    user_id?: IntFilter<"playhistory"> | number
    song_played?: IntFilter<"playhistory"> | number
    date?: DateTimeFilter<"playhistory"> | Date | string
    score?: DecimalNullableFilter<"playhistory"> | Decimal | DecimalJsLike | number | string | null
    user_recording?: StringNullableFilter<"playhistory"> | string | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    song?: XOR<SongScalarRelationFilter, songWhereInput>
  }

  export type playhistoryOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    song_played?: SortOrder
    date?: SortOrder
    score?: SortOrderInput | SortOrder
    user_recording?: SortOrderInput | SortOrder
    user?: userOrderByWithRelationInput
    song?: songOrderByWithRelationInput
    _relevance?: playhistoryOrderByRelevanceInput
  }

  export type playhistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: playhistoryWhereInput | playhistoryWhereInput[]
    OR?: playhistoryWhereInput[]
    NOT?: playhistoryWhereInput | playhistoryWhereInput[]
    user_id?: IntFilter<"playhistory"> | number
    song_played?: IntFilter<"playhistory"> | number
    date?: DateTimeFilter<"playhistory"> | Date | string
    score?: DecimalNullableFilter<"playhistory"> | Decimal | DecimalJsLike | number | string | null
    user_recording?: StringNullableFilter<"playhistory"> | string | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    song?: XOR<SongScalarRelationFilter, songWhereInput>
  }, "id">

  export type playhistoryOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    song_played?: SortOrder
    date?: SortOrder
    score?: SortOrderInput | SortOrder
    user_recording?: SortOrderInput | SortOrder
    _count?: playhistoryCountOrderByAggregateInput
    _avg?: playhistoryAvgOrderByAggregateInput
    _max?: playhistoryMaxOrderByAggregateInput
    _min?: playhistoryMinOrderByAggregateInput
    _sum?: playhistorySumOrderByAggregateInput
  }

  export type playhistoryScalarWhereWithAggregatesInput = {
    AND?: playhistoryScalarWhereWithAggregatesInput | playhistoryScalarWhereWithAggregatesInput[]
    OR?: playhistoryScalarWhereWithAggregatesInput[]
    NOT?: playhistoryScalarWhereWithAggregatesInput | playhistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"playhistory"> | number
    user_id?: IntWithAggregatesFilter<"playhistory"> | number
    song_played?: IntWithAggregatesFilter<"playhistory"> | number
    date?: DateTimeWithAggregatesFilter<"playhistory"> | Date | string
    score?: DecimalNullableWithAggregatesFilter<"playhistory"> | Decimal | DecimalJsLike | number | string | null
    user_recording?: StringNullableWithAggregatesFilter<"playhistory"> | string | null
  }

  export type playlistWhereInput = {
    AND?: playlistWhereInput | playlistWhereInput[]
    OR?: playlistWhereInput[]
    NOT?: playlistWhereInput | playlistWhereInput[]
    id?: IntFilter<"playlist"> | number
    user_created?: IntFilter<"playlist"> | number
    playlist_name?: StringFilter<"playlist"> | string
    description?: StringNullableFilter<"playlist"> | string | null
    total_time_played?: IntNullableFilter<"playlist"> | number | null
    total_view?: IntNullableFilter<"playlist"> | number | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    playlist_song?: Playlist_songListRelationFilter
  }

  export type playlistOrderByWithRelationInput = {
    id?: SortOrder
    user_created?: SortOrder
    playlist_name?: SortOrder
    description?: SortOrderInput | SortOrder
    total_time_played?: SortOrderInput | SortOrder
    total_view?: SortOrderInput | SortOrder
    user?: userOrderByWithRelationInput
    playlist_song?: playlist_songOrderByRelationAggregateInput
    _relevance?: playlistOrderByRelevanceInput
  }

  export type playlistWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: playlistWhereInput | playlistWhereInput[]
    OR?: playlistWhereInput[]
    NOT?: playlistWhereInput | playlistWhereInput[]
    user_created?: IntFilter<"playlist"> | number
    playlist_name?: StringFilter<"playlist"> | string
    description?: StringNullableFilter<"playlist"> | string | null
    total_time_played?: IntNullableFilter<"playlist"> | number | null
    total_view?: IntNullableFilter<"playlist"> | number | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    playlist_song?: Playlist_songListRelationFilter
  }, "id">

  export type playlistOrderByWithAggregationInput = {
    id?: SortOrder
    user_created?: SortOrder
    playlist_name?: SortOrder
    description?: SortOrderInput | SortOrder
    total_time_played?: SortOrderInput | SortOrder
    total_view?: SortOrderInput | SortOrder
    _count?: playlistCountOrderByAggregateInput
    _avg?: playlistAvgOrderByAggregateInput
    _max?: playlistMaxOrderByAggregateInput
    _min?: playlistMinOrderByAggregateInput
    _sum?: playlistSumOrderByAggregateInput
  }

  export type playlistScalarWhereWithAggregatesInput = {
    AND?: playlistScalarWhereWithAggregatesInput | playlistScalarWhereWithAggregatesInput[]
    OR?: playlistScalarWhereWithAggregatesInput[]
    NOT?: playlistScalarWhereWithAggregatesInput | playlistScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"playlist"> | number
    user_created?: IntWithAggregatesFilter<"playlist"> | number
    playlist_name?: StringWithAggregatesFilter<"playlist"> | string
    description?: StringNullableWithAggregatesFilter<"playlist"> | string | null
    total_time_played?: IntNullableWithAggregatesFilter<"playlist"> | number | null
    total_view?: IntNullableWithAggregatesFilter<"playlist"> | number | null
  }

  export type playlist_songWhereInput = {
    AND?: playlist_songWhereInput | playlist_songWhereInput[]
    OR?: playlist_songWhereInput[]
    NOT?: playlist_songWhereInput | playlist_songWhereInput[]
    id?: IntFilter<"playlist_song"> | number
    playlist_id?: IntFilter<"playlist_song"> | number
    song_id?: IntFilter<"playlist_song"> | number
    playlist?: XOR<PlaylistScalarRelationFilter, playlistWhereInput>
    song?: XOR<SongScalarRelationFilter, songWhereInput>
  }

  export type playlist_songOrderByWithRelationInput = {
    id?: SortOrder
    playlist_id?: SortOrder
    song_id?: SortOrder
    playlist?: playlistOrderByWithRelationInput
    song?: songOrderByWithRelationInput
  }

  export type playlist_songWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: playlist_songWhereInput | playlist_songWhereInput[]
    OR?: playlist_songWhereInput[]
    NOT?: playlist_songWhereInput | playlist_songWhereInput[]
    playlist_id?: IntFilter<"playlist_song"> | number
    song_id?: IntFilter<"playlist_song"> | number
    playlist?: XOR<PlaylistScalarRelationFilter, playlistWhereInput>
    song?: XOR<SongScalarRelationFilter, songWhereInput>
  }, "id">

  export type playlist_songOrderByWithAggregationInput = {
    id?: SortOrder
    playlist_id?: SortOrder
    song_id?: SortOrder
    _count?: playlist_songCountOrderByAggregateInput
    _avg?: playlist_songAvgOrderByAggregateInput
    _max?: playlist_songMaxOrderByAggregateInput
    _min?: playlist_songMinOrderByAggregateInput
    _sum?: playlist_songSumOrderByAggregateInput
  }

  export type playlist_songScalarWhereWithAggregatesInput = {
    AND?: playlist_songScalarWhereWithAggregatesInput | playlist_songScalarWhereWithAggregatesInput[]
    OR?: playlist_songScalarWhereWithAggregatesInput[]
    NOT?: playlist_songScalarWhereWithAggregatesInput | playlist_songScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"playlist_song"> | number
    playlist_id?: IntWithAggregatesFilter<"playlist_song"> | number
    song_id?: IntWithAggregatesFilter<"playlist_song"> | number
  }

  export type songWhereInput = {
    AND?: songWhereInput | songWhereInput[]
    OR?: songWhereInput[]
    NOT?: songWhereInput | songWhereInput[]
    song_id?: IntFilter<"song"> | number
    name?: StringFilter<"song"> | string
    content?: StringFilter<"song"> | string
    view?: IntNullableFilter<"song"> | number | null
    time_played?: IntNullableFilter<"song"> | number | null
    key?: StringNullableFilter<"song"> | string | null
    tempo?: StringNullableFilter<"song"> | string | null
    genre?: StringNullableFilter<"song"> | string | null
    year_publish?: IntNullableFilter<"song"> | number | null
    album?: IntNullableFilter<"song"> | number | null
    playhistory?: PlayhistoryListRelationFilter
    playlist_song?: Playlist_songListRelationFilter
    album_song_albumToalbum?: XOR<AlbumNullableScalarRelationFilter, albumWhereInput> | null
    song_author?: Song_authorListRelationFilter
  }

  export type songOrderByWithRelationInput = {
    song_id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    view?: SortOrderInput | SortOrder
    time_played?: SortOrderInput | SortOrder
    key?: SortOrderInput | SortOrder
    tempo?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    year_publish?: SortOrderInput | SortOrder
    album?: SortOrderInput | SortOrder
    playhistory?: playhistoryOrderByRelationAggregateInput
    playlist_song?: playlist_songOrderByRelationAggregateInput
    album_song_albumToalbum?: albumOrderByWithRelationInput
    song_author?: song_authorOrderByRelationAggregateInput
    _relevance?: songOrderByRelevanceInput
  }

  export type songWhereUniqueInput = Prisma.AtLeast<{
    song_id?: number
    AND?: songWhereInput | songWhereInput[]
    OR?: songWhereInput[]
    NOT?: songWhereInput | songWhereInput[]
    name?: StringFilter<"song"> | string
    content?: StringFilter<"song"> | string
    view?: IntNullableFilter<"song"> | number | null
    time_played?: IntNullableFilter<"song"> | number | null
    key?: StringNullableFilter<"song"> | string | null
    tempo?: StringNullableFilter<"song"> | string | null
    genre?: StringNullableFilter<"song"> | string | null
    year_publish?: IntNullableFilter<"song"> | number | null
    album?: IntNullableFilter<"song"> | number | null
    playhistory?: PlayhistoryListRelationFilter
    playlist_song?: Playlist_songListRelationFilter
    album_song_albumToalbum?: XOR<AlbumNullableScalarRelationFilter, albumWhereInput> | null
    song_author?: Song_authorListRelationFilter
  }, "song_id">

  export type songOrderByWithAggregationInput = {
    song_id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    view?: SortOrderInput | SortOrder
    time_played?: SortOrderInput | SortOrder
    key?: SortOrderInput | SortOrder
    tempo?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    year_publish?: SortOrderInput | SortOrder
    album?: SortOrderInput | SortOrder
    _count?: songCountOrderByAggregateInput
    _avg?: songAvgOrderByAggregateInput
    _max?: songMaxOrderByAggregateInput
    _min?: songMinOrderByAggregateInput
    _sum?: songSumOrderByAggregateInput
  }

  export type songScalarWhereWithAggregatesInput = {
    AND?: songScalarWhereWithAggregatesInput | songScalarWhereWithAggregatesInput[]
    OR?: songScalarWhereWithAggregatesInput[]
    NOT?: songScalarWhereWithAggregatesInput | songScalarWhereWithAggregatesInput[]
    song_id?: IntWithAggregatesFilter<"song"> | number
    name?: StringWithAggregatesFilter<"song"> | string
    content?: StringWithAggregatesFilter<"song"> | string
    view?: IntNullableWithAggregatesFilter<"song"> | number | null
    time_played?: IntNullableWithAggregatesFilter<"song"> | number | null
    key?: StringNullableWithAggregatesFilter<"song"> | string | null
    tempo?: StringNullableWithAggregatesFilter<"song"> | string | null
    genre?: StringNullableWithAggregatesFilter<"song"> | string | null
    year_publish?: IntNullableWithAggregatesFilter<"song"> | number | null
    album?: IntNullableWithAggregatesFilter<"song"> | number | null
  }

  export type song_authorWhereInput = {
    AND?: song_authorWhereInput | song_authorWhereInput[]
    OR?: song_authorWhereInput[]
    NOT?: song_authorWhereInput | song_authorWhereInput[]
    id?: IntFilter<"song_author"> | number
    author_id?: IntFilter<"song_author"> | number
    song_id?: IntFilter<"song_author"> | number
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    song?: XOR<SongScalarRelationFilter, songWhereInput>
  }

  export type song_authorOrderByWithRelationInput = {
    id?: SortOrder
    author_id?: SortOrder
    song_id?: SortOrder
    user?: userOrderByWithRelationInput
    song?: songOrderByWithRelationInput
  }

  export type song_authorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: song_authorWhereInput | song_authorWhereInput[]
    OR?: song_authorWhereInput[]
    NOT?: song_authorWhereInput | song_authorWhereInput[]
    author_id?: IntFilter<"song_author"> | number
    song_id?: IntFilter<"song_author"> | number
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    song?: XOR<SongScalarRelationFilter, songWhereInput>
  }, "id">

  export type song_authorOrderByWithAggregationInput = {
    id?: SortOrder
    author_id?: SortOrder
    song_id?: SortOrder
    _count?: song_authorCountOrderByAggregateInput
    _avg?: song_authorAvgOrderByAggregateInput
    _max?: song_authorMaxOrderByAggregateInput
    _min?: song_authorMinOrderByAggregateInput
    _sum?: song_authorSumOrderByAggregateInput
  }

  export type song_authorScalarWhereWithAggregatesInput = {
    AND?: song_authorScalarWhereWithAggregatesInput | song_authorScalarWhereWithAggregatesInput[]
    OR?: song_authorScalarWhereWithAggregatesInput[]
    NOT?: song_authorScalarWhereWithAggregatesInput | song_authorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"song_author"> | number
    author_id?: IntWithAggregatesFilter<"song_author"> | number
    song_id?: IntWithAggregatesFilter<"song_author"> | number
  }

  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    id?: IntFilter<"user"> | number
    username?: StringFilter<"user"> | string
    password_hash?: StringFilter<"user"> | string
    playlists_created?: IntNullableFilter<"user"> | number | null
    album_author?: Album_authorListRelationFilter
    playhistory?: PlayhistoryListRelationFilter
    playlist?: PlaylistListRelationFilter
    song_author?: Song_authorListRelationFilter
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    playlists_created?: SortOrderInput | SortOrder
    album_author?: album_authorOrderByRelationAggregateInput
    playhistory?: playhistoryOrderByRelationAggregateInput
    playlist?: playlistOrderByRelationAggregateInput
    song_author?: song_authorOrderByRelationAggregateInput
    _relevance?: userOrderByRelevanceInput
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    password_hash?: StringFilter<"user"> | string
    playlists_created?: IntNullableFilter<"user"> | number | null
    album_author?: Album_authorListRelationFilter
    playhistory?: PlayhistoryListRelationFilter
    playlist?: PlaylistListRelationFilter
    song_author?: Song_authorListRelationFilter
  }, "id" | "username">

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    playlists_created?: SortOrderInput | SortOrder
    _count?: userCountOrderByAggregateInput
    _avg?: userAvgOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
    _sum?: userSumOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"user"> | number
    username?: StringWithAggregatesFilter<"user"> | string
    password_hash?: StringWithAggregatesFilter<"user"> | string
    playlists_created?: IntNullableWithAggregatesFilter<"user"> | number | null
  }

  export type albumCreateInput = {
    album_name: string
    album_author?: album_authorCreateNestedManyWithoutAlbumInput
    song_song_albumToalbum?: songCreateNestedManyWithoutAlbum_song_albumToalbumInput
  }

  export type albumUncheckedCreateInput = {
    id?: number
    album_name: string
    album_author?: album_authorUncheckedCreateNestedManyWithoutAlbumInput
    song_song_albumToalbum?: songUncheckedCreateNestedManyWithoutAlbum_song_albumToalbumInput
  }

  export type albumUpdateInput = {
    album_name?: StringFieldUpdateOperationsInput | string
    album_author?: album_authorUpdateManyWithoutAlbumNestedInput
    song_song_albumToalbum?: songUpdateManyWithoutAlbum_song_albumToalbumNestedInput
  }

  export type albumUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    album_name?: StringFieldUpdateOperationsInput | string
    album_author?: album_authorUncheckedUpdateManyWithoutAlbumNestedInput
    song_song_albumToalbum?: songUncheckedUpdateManyWithoutAlbum_song_albumToalbumNestedInput
  }

  export type albumCreateManyInput = {
    id?: number
    album_name: string
  }

  export type albumUpdateManyMutationInput = {
    album_name?: StringFieldUpdateOperationsInput | string
  }

  export type albumUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    album_name?: StringFieldUpdateOperationsInput | string
  }

  export type album_authorCreateInput = {
    user: userCreateNestedOneWithoutAlbum_authorInput
    album: albumCreateNestedOneWithoutAlbum_authorInput
  }

  export type album_authorUncheckedCreateInput = {
    id?: number
    author_id: number
    album_id: number
  }

  export type album_authorUpdateInput = {
    user?: userUpdateOneRequiredWithoutAlbum_authorNestedInput
    album?: albumUpdateOneRequiredWithoutAlbum_authorNestedInput
  }

  export type album_authorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    album_id?: IntFieldUpdateOperationsInput | number
  }

  export type album_authorCreateManyInput = {
    id?: number
    author_id: number
    album_id: number
  }

  export type album_authorUpdateManyMutationInput = {

  }

  export type album_authorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    album_id?: IntFieldUpdateOperationsInput | number
  }

  export type playhistoryCreateInput = {
    date: Date | string
    score?: Decimal | DecimalJsLike | number | string | null
    user_recording?: string | null
    user: userCreateNestedOneWithoutPlayhistoryInput
    song: songCreateNestedOneWithoutPlayhistoryInput
  }

  export type playhistoryUncheckedCreateInput = {
    id?: number
    user_id: number
    song_played: number
    date: Date | string
    score?: Decimal | DecimalJsLike | number | string | null
    user_recording?: string | null
  }

  export type playhistoryUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_recording?: NullableStringFieldUpdateOperationsInput | string | null
    user?: userUpdateOneRequiredWithoutPlayhistoryNestedInput
    song?: songUpdateOneRequiredWithoutPlayhistoryNestedInput
  }

  export type playhistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    song_played?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_recording?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type playhistoryCreateManyInput = {
    id?: number
    user_id: number
    song_played: number
    date: Date | string
    score?: Decimal | DecimalJsLike | number | string | null
    user_recording?: string | null
  }

  export type playhistoryUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_recording?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type playhistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    song_played?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_recording?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type playlistCreateInput = {
    playlist_name: string
    description?: string | null
    total_time_played?: number | null
    total_view?: number | null
    user: userCreateNestedOneWithoutPlaylistInput
    playlist_song?: playlist_songCreateNestedManyWithoutPlaylistInput
  }

  export type playlistUncheckedCreateInput = {
    id?: number
    user_created: number
    playlist_name: string
    description?: string | null
    total_time_played?: number | null
    total_view?: number | null
    playlist_song?: playlist_songUncheckedCreateNestedManyWithoutPlaylistInput
  }

  export type playlistUpdateInput = {
    playlist_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    total_time_played?: NullableIntFieldUpdateOperationsInput | number | null
    total_view?: NullableIntFieldUpdateOperationsInput | number | null
    user?: userUpdateOneRequiredWithoutPlaylistNestedInput
    playlist_song?: playlist_songUpdateManyWithoutPlaylistNestedInput
  }

  export type playlistUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_created?: IntFieldUpdateOperationsInput | number
    playlist_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    total_time_played?: NullableIntFieldUpdateOperationsInput | number | null
    total_view?: NullableIntFieldUpdateOperationsInput | number | null
    playlist_song?: playlist_songUncheckedUpdateManyWithoutPlaylistNestedInput
  }

  export type playlistCreateManyInput = {
    id?: number
    user_created: number
    playlist_name: string
    description?: string | null
    total_time_played?: number | null
    total_view?: number | null
  }

  export type playlistUpdateManyMutationInput = {
    playlist_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    total_time_played?: NullableIntFieldUpdateOperationsInput | number | null
    total_view?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type playlistUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_created?: IntFieldUpdateOperationsInput | number
    playlist_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    total_time_played?: NullableIntFieldUpdateOperationsInput | number | null
    total_view?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type playlist_songCreateInput = {
    playlist: playlistCreateNestedOneWithoutPlaylist_songInput
    song: songCreateNestedOneWithoutPlaylist_songInput
  }

  export type playlist_songUncheckedCreateInput = {
    id?: number
    playlist_id: number
    song_id: number
  }

  export type playlist_songUpdateInput = {
    playlist?: playlistUpdateOneRequiredWithoutPlaylist_songNestedInput
    song?: songUpdateOneRequiredWithoutPlaylist_songNestedInput
  }

  export type playlist_songUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    playlist_id?: IntFieldUpdateOperationsInput | number
    song_id?: IntFieldUpdateOperationsInput | number
  }

  export type playlist_songCreateManyInput = {
    id?: number
    playlist_id: number
    song_id: number
  }

  export type playlist_songUpdateManyMutationInput = {

  }

  export type playlist_songUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    playlist_id?: IntFieldUpdateOperationsInput | number
    song_id?: IntFieldUpdateOperationsInput | number
  }

  export type songCreateInput = {
    name: string
    content: string
    view?: number | null
    time_played?: number | null
    key?: string | null
    tempo?: string | null
    genre?: string | null
    year_publish?: number | null
    playhistory?: playhistoryCreateNestedManyWithoutSongInput
    playlist_song?: playlist_songCreateNestedManyWithoutSongInput
    album_song_albumToalbum?: albumCreateNestedOneWithoutSong_song_albumToalbumInput
    song_author?: song_authorCreateNestedManyWithoutSongInput
  }

  export type songUncheckedCreateInput = {
    song_id?: number
    name: string
    content: string
    view?: number | null
    time_played?: number | null
    key?: string | null
    tempo?: string | null
    genre?: string | null
    year_publish?: number | null
    album?: number | null
    playhistory?: playhistoryUncheckedCreateNestedManyWithoutSongInput
    playlist_song?: playlist_songUncheckedCreateNestedManyWithoutSongInput
    song_author?: song_authorUncheckedCreateNestedManyWithoutSongInput
  }

  export type songUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    view?: NullableIntFieldUpdateOperationsInput | number | null
    time_played?: NullableIntFieldUpdateOperationsInput | number | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
    tempo?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    year_publish?: NullableIntFieldUpdateOperationsInput | number | null
    playhistory?: playhistoryUpdateManyWithoutSongNestedInput
    playlist_song?: playlist_songUpdateManyWithoutSongNestedInput
    album_song_albumToalbum?: albumUpdateOneWithoutSong_song_albumToalbumNestedInput
    song_author?: song_authorUpdateManyWithoutSongNestedInput
  }

  export type songUncheckedUpdateInput = {
    song_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    view?: NullableIntFieldUpdateOperationsInput | number | null
    time_played?: NullableIntFieldUpdateOperationsInput | number | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
    tempo?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    year_publish?: NullableIntFieldUpdateOperationsInput | number | null
    album?: NullableIntFieldUpdateOperationsInput | number | null
    playhistory?: playhistoryUncheckedUpdateManyWithoutSongNestedInput
    playlist_song?: playlist_songUncheckedUpdateManyWithoutSongNestedInput
    song_author?: song_authorUncheckedUpdateManyWithoutSongNestedInput
  }

  export type songCreateManyInput = {
    song_id?: number
    name: string
    content: string
    view?: number | null
    time_played?: number | null
    key?: string | null
    tempo?: string | null
    genre?: string | null
    year_publish?: number | null
    album?: number | null
  }

  export type songUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    view?: NullableIntFieldUpdateOperationsInput | number | null
    time_played?: NullableIntFieldUpdateOperationsInput | number | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
    tempo?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    year_publish?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type songUncheckedUpdateManyInput = {
    song_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    view?: NullableIntFieldUpdateOperationsInput | number | null
    time_played?: NullableIntFieldUpdateOperationsInput | number | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
    tempo?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    year_publish?: NullableIntFieldUpdateOperationsInput | number | null
    album?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type song_authorCreateInput = {
    user: userCreateNestedOneWithoutSong_authorInput
    song: songCreateNestedOneWithoutSong_authorInput
  }

  export type song_authorUncheckedCreateInput = {
    id?: number
    author_id: number
    song_id: number
  }

  export type song_authorUpdateInput = {
    user?: userUpdateOneRequiredWithoutSong_authorNestedInput
    song?: songUpdateOneRequiredWithoutSong_authorNestedInput
  }

  export type song_authorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    song_id?: IntFieldUpdateOperationsInput | number
  }

  export type song_authorCreateManyInput = {
    id?: number
    author_id: number
    song_id: number
  }

  export type song_authorUpdateManyMutationInput = {

  }

  export type song_authorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    song_id?: IntFieldUpdateOperationsInput | number
  }

  export type userCreateInput = {
    username: string
    password_hash: string
    playlists_created?: number | null
    album_author?: album_authorCreateNestedManyWithoutUserInput
    playhistory?: playhistoryCreateNestedManyWithoutUserInput
    playlist?: playlistCreateNestedManyWithoutUserInput
    song_author?: song_authorCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateInput = {
    id?: number
    username: string
    password_hash: string
    playlists_created?: number | null
    album_author?: album_authorUncheckedCreateNestedManyWithoutUserInput
    playhistory?: playhistoryUncheckedCreateNestedManyWithoutUserInput
    playlist?: playlistUncheckedCreateNestedManyWithoutUserInput
    song_author?: song_authorUncheckedCreateNestedManyWithoutUserInput
  }

  export type userUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    playlists_created?: NullableIntFieldUpdateOperationsInput | number | null
    album_author?: album_authorUpdateManyWithoutUserNestedInput
    playhistory?: playhistoryUpdateManyWithoutUserNestedInput
    playlist?: playlistUpdateManyWithoutUserNestedInput
    song_author?: song_authorUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    playlists_created?: NullableIntFieldUpdateOperationsInput | number | null
    album_author?: album_authorUncheckedUpdateManyWithoutUserNestedInput
    playhistory?: playhistoryUncheckedUpdateManyWithoutUserNestedInput
    playlist?: playlistUncheckedUpdateManyWithoutUserNestedInput
    song_author?: song_authorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type userCreateManyInput = {
    id?: number
    username: string
    password_hash: string
    playlists_created?: number | null
  }

  export type userUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    playlists_created?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type userUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    playlists_created?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type Album_authorListRelationFilter = {
    every?: album_authorWhereInput
    some?: album_authorWhereInput
    none?: album_authorWhereInput
  }

  export type SongListRelationFilter = {
    every?: songWhereInput
    some?: songWhereInput
    none?: songWhereInput
  }

  export type album_authorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type songOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type albumOrderByRelevanceInput = {
    fields: albumOrderByRelevanceFieldEnum | albumOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type albumCountOrderByAggregateInput = {
    id?: SortOrder
    album_name?: SortOrder
  }

  export type albumAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type albumMaxOrderByAggregateInput = {
    id?: SortOrder
    album_name?: SortOrder
  }

  export type albumMinOrderByAggregateInput = {
    id?: SortOrder
    album_name?: SortOrder
  }

  export type albumSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: userWhereInput
    isNot?: userWhereInput
  }

  export type AlbumScalarRelationFilter = {
    is?: albumWhereInput
    isNot?: albumWhereInput
  }

  export type album_authorCountOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    album_id?: SortOrder
  }

  export type album_authorAvgOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    album_id?: SortOrder
  }

  export type album_authorMaxOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    album_id?: SortOrder
  }

  export type album_authorMinOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    album_id?: SortOrder
  }

  export type album_authorSumOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    album_id?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SongScalarRelationFilter = {
    is?: songWhereInput
    isNot?: songWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type playhistoryOrderByRelevanceInput = {
    fields: playhistoryOrderByRelevanceFieldEnum | playhistoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type playhistoryCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    song_played?: SortOrder
    date?: SortOrder
    score?: SortOrder
    user_recording?: SortOrder
  }

  export type playhistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    song_played?: SortOrder
    score?: SortOrder
  }

  export type playhistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    song_played?: SortOrder
    date?: SortOrder
    score?: SortOrder
    user_recording?: SortOrder
  }

  export type playhistoryMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    song_played?: SortOrder
    date?: SortOrder
    score?: SortOrder
    user_recording?: SortOrder
  }

  export type playhistorySumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    song_played?: SortOrder
    score?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type Playlist_songListRelationFilter = {
    every?: playlist_songWhereInput
    some?: playlist_songWhereInput
    none?: playlist_songWhereInput
  }

  export type playlist_songOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type playlistOrderByRelevanceInput = {
    fields: playlistOrderByRelevanceFieldEnum | playlistOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type playlistCountOrderByAggregateInput = {
    id?: SortOrder
    user_created?: SortOrder
    playlist_name?: SortOrder
    description?: SortOrder
    total_time_played?: SortOrder
    total_view?: SortOrder
  }

  export type playlistAvgOrderByAggregateInput = {
    id?: SortOrder
    user_created?: SortOrder
    total_time_played?: SortOrder
    total_view?: SortOrder
  }

  export type playlistMaxOrderByAggregateInput = {
    id?: SortOrder
    user_created?: SortOrder
    playlist_name?: SortOrder
    description?: SortOrder
    total_time_played?: SortOrder
    total_view?: SortOrder
  }

  export type playlistMinOrderByAggregateInput = {
    id?: SortOrder
    user_created?: SortOrder
    playlist_name?: SortOrder
    description?: SortOrder
    total_time_played?: SortOrder
    total_view?: SortOrder
  }

  export type playlistSumOrderByAggregateInput = {
    id?: SortOrder
    user_created?: SortOrder
    total_time_played?: SortOrder
    total_view?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PlaylistScalarRelationFilter = {
    is?: playlistWhereInput
    isNot?: playlistWhereInput
  }

  export type playlist_songCountOrderByAggregateInput = {
    id?: SortOrder
    playlist_id?: SortOrder
    song_id?: SortOrder
  }

  export type playlist_songAvgOrderByAggregateInput = {
    id?: SortOrder
    playlist_id?: SortOrder
    song_id?: SortOrder
  }

  export type playlist_songMaxOrderByAggregateInput = {
    id?: SortOrder
    playlist_id?: SortOrder
    song_id?: SortOrder
  }

  export type playlist_songMinOrderByAggregateInput = {
    id?: SortOrder
    playlist_id?: SortOrder
    song_id?: SortOrder
  }

  export type playlist_songSumOrderByAggregateInput = {
    id?: SortOrder
    playlist_id?: SortOrder
    song_id?: SortOrder
  }

  export type PlayhistoryListRelationFilter = {
    every?: playhistoryWhereInput
    some?: playhistoryWhereInput
    none?: playhistoryWhereInput
  }

  export type AlbumNullableScalarRelationFilter = {
    is?: albumWhereInput | null
    isNot?: albumWhereInput | null
  }

  export type Song_authorListRelationFilter = {
    every?: song_authorWhereInput
    some?: song_authorWhereInput
    none?: song_authorWhereInput
  }

  export type playhistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type song_authorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type songOrderByRelevanceInput = {
    fields: songOrderByRelevanceFieldEnum | songOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type songCountOrderByAggregateInput = {
    song_id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    view?: SortOrder
    time_played?: SortOrder
    key?: SortOrder
    tempo?: SortOrder
    genre?: SortOrder
    year_publish?: SortOrder
    album?: SortOrder
  }

  export type songAvgOrderByAggregateInput = {
    song_id?: SortOrder
    view?: SortOrder
    time_played?: SortOrder
    year_publish?: SortOrder
    album?: SortOrder
  }

  export type songMaxOrderByAggregateInput = {
    song_id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    view?: SortOrder
    time_played?: SortOrder
    key?: SortOrder
    tempo?: SortOrder
    genre?: SortOrder
    year_publish?: SortOrder
    album?: SortOrder
  }

  export type songMinOrderByAggregateInput = {
    song_id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    view?: SortOrder
    time_played?: SortOrder
    key?: SortOrder
    tempo?: SortOrder
    genre?: SortOrder
    year_publish?: SortOrder
    album?: SortOrder
  }

  export type songSumOrderByAggregateInput = {
    song_id?: SortOrder
    view?: SortOrder
    time_played?: SortOrder
    year_publish?: SortOrder
    album?: SortOrder
  }

  export type song_authorCountOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    song_id?: SortOrder
  }

  export type song_authorAvgOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    song_id?: SortOrder
  }

  export type song_authorMaxOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    song_id?: SortOrder
  }

  export type song_authorMinOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    song_id?: SortOrder
  }

  export type song_authorSumOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    song_id?: SortOrder
  }

  export type PlaylistListRelationFilter = {
    every?: playlistWhereInput
    some?: playlistWhereInput
    none?: playlistWhereInput
  }

  export type playlistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type userOrderByRelevanceInput = {
    fields: userOrderByRelevanceFieldEnum | userOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    playlists_created?: SortOrder
  }

  export type userAvgOrderByAggregateInput = {
    id?: SortOrder
    playlists_created?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    playlists_created?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    playlists_created?: SortOrder
  }

  export type userSumOrderByAggregateInput = {
    id?: SortOrder
    playlists_created?: SortOrder
  }

  export type album_authorCreateNestedManyWithoutAlbumInput = {
    create?: XOR<album_authorCreateWithoutAlbumInput, album_authorUncheckedCreateWithoutAlbumInput> | album_authorCreateWithoutAlbumInput[] | album_authorUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: album_authorCreateOrConnectWithoutAlbumInput | album_authorCreateOrConnectWithoutAlbumInput[]
    createMany?: album_authorCreateManyAlbumInputEnvelope
    connect?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
  }

  export type songCreateNestedManyWithoutAlbum_song_albumToalbumInput = {
    create?: XOR<songCreateWithoutAlbum_song_albumToalbumInput, songUncheckedCreateWithoutAlbum_song_albumToalbumInput> | songCreateWithoutAlbum_song_albumToalbumInput[] | songUncheckedCreateWithoutAlbum_song_albumToalbumInput[]
    connectOrCreate?: songCreateOrConnectWithoutAlbum_song_albumToalbumInput | songCreateOrConnectWithoutAlbum_song_albumToalbumInput[]
    createMany?: songCreateManyAlbum_song_albumToalbumInputEnvelope
    connect?: songWhereUniqueInput | songWhereUniqueInput[]
  }

  export type album_authorUncheckedCreateNestedManyWithoutAlbumInput = {
    create?: XOR<album_authorCreateWithoutAlbumInput, album_authorUncheckedCreateWithoutAlbumInput> | album_authorCreateWithoutAlbumInput[] | album_authorUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: album_authorCreateOrConnectWithoutAlbumInput | album_authorCreateOrConnectWithoutAlbumInput[]
    createMany?: album_authorCreateManyAlbumInputEnvelope
    connect?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
  }

  export type songUncheckedCreateNestedManyWithoutAlbum_song_albumToalbumInput = {
    create?: XOR<songCreateWithoutAlbum_song_albumToalbumInput, songUncheckedCreateWithoutAlbum_song_albumToalbumInput> | songCreateWithoutAlbum_song_albumToalbumInput[] | songUncheckedCreateWithoutAlbum_song_albumToalbumInput[]
    connectOrCreate?: songCreateOrConnectWithoutAlbum_song_albumToalbumInput | songCreateOrConnectWithoutAlbum_song_albumToalbumInput[]
    createMany?: songCreateManyAlbum_song_albumToalbumInputEnvelope
    connect?: songWhereUniqueInput | songWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type album_authorUpdateManyWithoutAlbumNestedInput = {
    create?: XOR<album_authorCreateWithoutAlbumInput, album_authorUncheckedCreateWithoutAlbumInput> | album_authorCreateWithoutAlbumInput[] | album_authorUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: album_authorCreateOrConnectWithoutAlbumInput | album_authorCreateOrConnectWithoutAlbumInput[]
    upsert?: album_authorUpsertWithWhereUniqueWithoutAlbumInput | album_authorUpsertWithWhereUniqueWithoutAlbumInput[]
    createMany?: album_authorCreateManyAlbumInputEnvelope
    set?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    disconnect?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    delete?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    connect?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    update?: album_authorUpdateWithWhereUniqueWithoutAlbumInput | album_authorUpdateWithWhereUniqueWithoutAlbumInput[]
    updateMany?: album_authorUpdateManyWithWhereWithoutAlbumInput | album_authorUpdateManyWithWhereWithoutAlbumInput[]
    deleteMany?: album_authorScalarWhereInput | album_authorScalarWhereInput[]
  }

  export type songUpdateManyWithoutAlbum_song_albumToalbumNestedInput = {
    create?: XOR<songCreateWithoutAlbum_song_albumToalbumInput, songUncheckedCreateWithoutAlbum_song_albumToalbumInput> | songCreateWithoutAlbum_song_albumToalbumInput[] | songUncheckedCreateWithoutAlbum_song_albumToalbumInput[]
    connectOrCreate?: songCreateOrConnectWithoutAlbum_song_albumToalbumInput | songCreateOrConnectWithoutAlbum_song_albumToalbumInput[]
    upsert?: songUpsertWithWhereUniqueWithoutAlbum_song_albumToalbumInput | songUpsertWithWhereUniqueWithoutAlbum_song_albumToalbumInput[]
    createMany?: songCreateManyAlbum_song_albumToalbumInputEnvelope
    set?: songWhereUniqueInput | songWhereUniqueInput[]
    disconnect?: songWhereUniqueInput | songWhereUniqueInput[]
    delete?: songWhereUniqueInput | songWhereUniqueInput[]
    connect?: songWhereUniqueInput | songWhereUniqueInput[]
    update?: songUpdateWithWhereUniqueWithoutAlbum_song_albumToalbumInput | songUpdateWithWhereUniqueWithoutAlbum_song_albumToalbumInput[]
    updateMany?: songUpdateManyWithWhereWithoutAlbum_song_albumToalbumInput | songUpdateManyWithWhereWithoutAlbum_song_albumToalbumInput[]
    deleteMany?: songScalarWhereInput | songScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type album_authorUncheckedUpdateManyWithoutAlbumNestedInput = {
    create?: XOR<album_authorCreateWithoutAlbumInput, album_authorUncheckedCreateWithoutAlbumInput> | album_authorCreateWithoutAlbumInput[] | album_authorUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: album_authorCreateOrConnectWithoutAlbumInput | album_authorCreateOrConnectWithoutAlbumInput[]
    upsert?: album_authorUpsertWithWhereUniqueWithoutAlbumInput | album_authorUpsertWithWhereUniqueWithoutAlbumInput[]
    createMany?: album_authorCreateManyAlbumInputEnvelope
    set?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    disconnect?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    delete?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    connect?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    update?: album_authorUpdateWithWhereUniqueWithoutAlbumInput | album_authorUpdateWithWhereUniqueWithoutAlbumInput[]
    updateMany?: album_authorUpdateManyWithWhereWithoutAlbumInput | album_authorUpdateManyWithWhereWithoutAlbumInput[]
    deleteMany?: album_authorScalarWhereInput | album_authorScalarWhereInput[]
  }

  export type songUncheckedUpdateManyWithoutAlbum_song_albumToalbumNestedInput = {
    create?: XOR<songCreateWithoutAlbum_song_albumToalbumInput, songUncheckedCreateWithoutAlbum_song_albumToalbumInput> | songCreateWithoutAlbum_song_albumToalbumInput[] | songUncheckedCreateWithoutAlbum_song_albumToalbumInput[]
    connectOrCreate?: songCreateOrConnectWithoutAlbum_song_albumToalbumInput | songCreateOrConnectWithoutAlbum_song_albumToalbumInput[]
    upsert?: songUpsertWithWhereUniqueWithoutAlbum_song_albumToalbumInput | songUpsertWithWhereUniqueWithoutAlbum_song_albumToalbumInput[]
    createMany?: songCreateManyAlbum_song_albumToalbumInputEnvelope
    set?: songWhereUniqueInput | songWhereUniqueInput[]
    disconnect?: songWhereUniqueInput | songWhereUniqueInput[]
    delete?: songWhereUniqueInput | songWhereUniqueInput[]
    connect?: songWhereUniqueInput | songWhereUniqueInput[]
    update?: songUpdateWithWhereUniqueWithoutAlbum_song_albumToalbumInput | songUpdateWithWhereUniqueWithoutAlbum_song_albumToalbumInput[]
    updateMany?: songUpdateManyWithWhereWithoutAlbum_song_albumToalbumInput | songUpdateManyWithWhereWithoutAlbum_song_albumToalbumInput[]
    deleteMany?: songScalarWhereInput | songScalarWhereInput[]
  }

  export type userCreateNestedOneWithoutAlbum_authorInput = {
    create?: XOR<userCreateWithoutAlbum_authorInput, userUncheckedCreateWithoutAlbum_authorInput>
    connectOrCreate?: userCreateOrConnectWithoutAlbum_authorInput
    connect?: userWhereUniqueInput
  }

  export type albumCreateNestedOneWithoutAlbum_authorInput = {
    create?: XOR<albumCreateWithoutAlbum_authorInput, albumUncheckedCreateWithoutAlbum_authorInput>
    connectOrCreate?: albumCreateOrConnectWithoutAlbum_authorInput
    connect?: albumWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutAlbum_authorNestedInput = {
    create?: XOR<userCreateWithoutAlbum_authorInput, userUncheckedCreateWithoutAlbum_authorInput>
    connectOrCreate?: userCreateOrConnectWithoutAlbum_authorInput
    upsert?: userUpsertWithoutAlbum_authorInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutAlbum_authorInput, userUpdateWithoutAlbum_authorInput>, userUncheckedUpdateWithoutAlbum_authorInput>
  }

  export type albumUpdateOneRequiredWithoutAlbum_authorNestedInput = {
    create?: XOR<albumCreateWithoutAlbum_authorInput, albumUncheckedCreateWithoutAlbum_authorInput>
    connectOrCreate?: albumCreateOrConnectWithoutAlbum_authorInput
    upsert?: albumUpsertWithoutAlbum_authorInput
    connect?: albumWhereUniqueInput
    update?: XOR<XOR<albumUpdateToOneWithWhereWithoutAlbum_authorInput, albumUpdateWithoutAlbum_authorInput>, albumUncheckedUpdateWithoutAlbum_authorInput>
  }

  export type userCreateNestedOneWithoutPlayhistoryInput = {
    create?: XOR<userCreateWithoutPlayhistoryInput, userUncheckedCreateWithoutPlayhistoryInput>
    connectOrCreate?: userCreateOrConnectWithoutPlayhistoryInput
    connect?: userWhereUniqueInput
  }

  export type songCreateNestedOneWithoutPlayhistoryInput = {
    create?: XOR<songCreateWithoutPlayhistoryInput, songUncheckedCreateWithoutPlayhistoryInput>
    connectOrCreate?: songCreateOrConnectWithoutPlayhistoryInput
    connect?: songWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type userUpdateOneRequiredWithoutPlayhistoryNestedInput = {
    create?: XOR<userCreateWithoutPlayhistoryInput, userUncheckedCreateWithoutPlayhistoryInput>
    connectOrCreate?: userCreateOrConnectWithoutPlayhistoryInput
    upsert?: userUpsertWithoutPlayhistoryInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutPlayhistoryInput, userUpdateWithoutPlayhistoryInput>, userUncheckedUpdateWithoutPlayhistoryInput>
  }

  export type songUpdateOneRequiredWithoutPlayhistoryNestedInput = {
    create?: XOR<songCreateWithoutPlayhistoryInput, songUncheckedCreateWithoutPlayhistoryInput>
    connectOrCreate?: songCreateOrConnectWithoutPlayhistoryInput
    upsert?: songUpsertWithoutPlayhistoryInput
    connect?: songWhereUniqueInput
    update?: XOR<XOR<songUpdateToOneWithWhereWithoutPlayhistoryInput, songUpdateWithoutPlayhistoryInput>, songUncheckedUpdateWithoutPlayhistoryInput>
  }

  export type userCreateNestedOneWithoutPlaylistInput = {
    create?: XOR<userCreateWithoutPlaylistInput, userUncheckedCreateWithoutPlaylistInput>
    connectOrCreate?: userCreateOrConnectWithoutPlaylistInput
    connect?: userWhereUniqueInput
  }

  export type playlist_songCreateNestedManyWithoutPlaylistInput = {
    create?: XOR<playlist_songCreateWithoutPlaylistInput, playlist_songUncheckedCreateWithoutPlaylistInput> | playlist_songCreateWithoutPlaylistInput[] | playlist_songUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: playlist_songCreateOrConnectWithoutPlaylistInput | playlist_songCreateOrConnectWithoutPlaylistInput[]
    createMany?: playlist_songCreateManyPlaylistInputEnvelope
    connect?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
  }

  export type playlist_songUncheckedCreateNestedManyWithoutPlaylistInput = {
    create?: XOR<playlist_songCreateWithoutPlaylistInput, playlist_songUncheckedCreateWithoutPlaylistInput> | playlist_songCreateWithoutPlaylistInput[] | playlist_songUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: playlist_songCreateOrConnectWithoutPlaylistInput | playlist_songCreateOrConnectWithoutPlaylistInput[]
    createMany?: playlist_songCreateManyPlaylistInputEnvelope
    connect?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type userUpdateOneRequiredWithoutPlaylistNestedInput = {
    create?: XOR<userCreateWithoutPlaylistInput, userUncheckedCreateWithoutPlaylistInput>
    connectOrCreate?: userCreateOrConnectWithoutPlaylistInput
    upsert?: userUpsertWithoutPlaylistInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutPlaylistInput, userUpdateWithoutPlaylistInput>, userUncheckedUpdateWithoutPlaylistInput>
  }

  export type playlist_songUpdateManyWithoutPlaylistNestedInput = {
    create?: XOR<playlist_songCreateWithoutPlaylistInput, playlist_songUncheckedCreateWithoutPlaylistInput> | playlist_songCreateWithoutPlaylistInput[] | playlist_songUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: playlist_songCreateOrConnectWithoutPlaylistInput | playlist_songCreateOrConnectWithoutPlaylistInput[]
    upsert?: playlist_songUpsertWithWhereUniqueWithoutPlaylistInput | playlist_songUpsertWithWhereUniqueWithoutPlaylistInput[]
    createMany?: playlist_songCreateManyPlaylistInputEnvelope
    set?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    disconnect?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    delete?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    connect?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    update?: playlist_songUpdateWithWhereUniqueWithoutPlaylistInput | playlist_songUpdateWithWhereUniqueWithoutPlaylistInput[]
    updateMany?: playlist_songUpdateManyWithWhereWithoutPlaylistInput | playlist_songUpdateManyWithWhereWithoutPlaylistInput[]
    deleteMany?: playlist_songScalarWhereInput | playlist_songScalarWhereInput[]
  }

  export type playlist_songUncheckedUpdateManyWithoutPlaylistNestedInput = {
    create?: XOR<playlist_songCreateWithoutPlaylistInput, playlist_songUncheckedCreateWithoutPlaylistInput> | playlist_songCreateWithoutPlaylistInput[] | playlist_songUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: playlist_songCreateOrConnectWithoutPlaylistInput | playlist_songCreateOrConnectWithoutPlaylistInput[]
    upsert?: playlist_songUpsertWithWhereUniqueWithoutPlaylistInput | playlist_songUpsertWithWhereUniqueWithoutPlaylistInput[]
    createMany?: playlist_songCreateManyPlaylistInputEnvelope
    set?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    disconnect?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    delete?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    connect?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    update?: playlist_songUpdateWithWhereUniqueWithoutPlaylistInput | playlist_songUpdateWithWhereUniqueWithoutPlaylistInput[]
    updateMany?: playlist_songUpdateManyWithWhereWithoutPlaylistInput | playlist_songUpdateManyWithWhereWithoutPlaylistInput[]
    deleteMany?: playlist_songScalarWhereInput | playlist_songScalarWhereInput[]
  }

  export type playlistCreateNestedOneWithoutPlaylist_songInput = {
    create?: XOR<playlistCreateWithoutPlaylist_songInput, playlistUncheckedCreateWithoutPlaylist_songInput>
    connectOrCreate?: playlistCreateOrConnectWithoutPlaylist_songInput
    connect?: playlistWhereUniqueInput
  }

  export type songCreateNestedOneWithoutPlaylist_songInput = {
    create?: XOR<songCreateWithoutPlaylist_songInput, songUncheckedCreateWithoutPlaylist_songInput>
    connectOrCreate?: songCreateOrConnectWithoutPlaylist_songInput
    connect?: songWhereUniqueInput
  }

  export type playlistUpdateOneRequiredWithoutPlaylist_songNestedInput = {
    create?: XOR<playlistCreateWithoutPlaylist_songInput, playlistUncheckedCreateWithoutPlaylist_songInput>
    connectOrCreate?: playlistCreateOrConnectWithoutPlaylist_songInput
    upsert?: playlistUpsertWithoutPlaylist_songInput
    connect?: playlistWhereUniqueInput
    update?: XOR<XOR<playlistUpdateToOneWithWhereWithoutPlaylist_songInput, playlistUpdateWithoutPlaylist_songInput>, playlistUncheckedUpdateWithoutPlaylist_songInput>
  }

  export type songUpdateOneRequiredWithoutPlaylist_songNestedInput = {
    create?: XOR<songCreateWithoutPlaylist_songInput, songUncheckedCreateWithoutPlaylist_songInput>
    connectOrCreate?: songCreateOrConnectWithoutPlaylist_songInput
    upsert?: songUpsertWithoutPlaylist_songInput
    connect?: songWhereUniqueInput
    update?: XOR<XOR<songUpdateToOneWithWhereWithoutPlaylist_songInput, songUpdateWithoutPlaylist_songInput>, songUncheckedUpdateWithoutPlaylist_songInput>
  }

  export type playhistoryCreateNestedManyWithoutSongInput = {
    create?: XOR<playhistoryCreateWithoutSongInput, playhistoryUncheckedCreateWithoutSongInput> | playhistoryCreateWithoutSongInput[] | playhistoryUncheckedCreateWithoutSongInput[]
    connectOrCreate?: playhistoryCreateOrConnectWithoutSongInput | playhistoryCreateOrConnectWithoutSongInput[]
    createMany?: playhistoryCreateManySongInputEnvelope
    connect?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
  }

  export type playlist_songCreateNestedManyWithoutSongInput = {
    create?: XOR<playlist_songCreateWithoutSongInput, playlist_songUncheckedCreateWithoutSongInput> | playlist_songCreateWithoutSongInput[] | playlist_songUncheckedCreateWithoutSongInput[]
    connectOrCreate?: playlist_songCreateOrConnectWithoutSongInput | playlist_songCreateOrConnectWithoutSongInput[]
    createMany?: playlist_songCreateManySongInputEnvelope
    connect?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
  }

  export type albumCreateNestedOneWithoutSong_song_albumToalbumInput = {
    create?: XOR<albumCreateWithoutSong_song_albumToalbumInput, albumUncheckedCreateWithoutSong_song_albumToalbumInput>
    connectOrCreate?: albumCreateOrConnectWithoutSong_song_albumToalbumInput
    connect?: albumWhereUniqueInput
  }

  export type song_authorCreateNestedManyWithoutSongInput = {
    create?: XOR<song_authorCreateWithoutSongInput, song_authorUncheckedCreateWithoutSongInput> | song_authorCreateWithoutSongInput[] | song_authorUncheckedCreateWithoutSongInput[]
    connectOrCreate?: song_authorCreateOrConnectWithoutSongInput | song_authorCreateOrConnectWithoutSongInput[]
    createMany?: song_authorCreateManySongInputEnvelope
    connect?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
  }

  export type playhistoryUncheckedCreateNestedManyWithoutSongInput = {
    create?: XOR<playhistoryCreateWithoutSongInput, playhistoryUncheckedCreateWithoutSongInput> | playhistoryCreateWithoutSongInput[] | playhistoryUncheckedCreateWithoutSongInput[]
    connectOrCreate?: playhistoryCreateOrConnectWithoutSongInput | playhistoryCreateOrConnectWithoutSongInput[]
    createMany?: playhistoryCreateManySongInputEnvelope
    connect?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
  }

  export type playlist_songUncheckedCreateNestedManyWithoutSongInput = {
    create?: XOR<playlist_songCreateWithoutSongInput, playlist_songUncheckedCreateWithoutSongInput> | playlist_songCreateWithoutSongInput[] | playlist_songUncheckedCreateWithoutSongInput[]
    connectOrCreate?: playlist_songCreateOrConnectWithoutSongInput | playlist_songCreateOrConnectWithoutSongInput[]
    createMany?: playlist_songCreateManySongInputEnvelope
    connect?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
  }

  export type song_authorUncheckedCreateNestedManyWithoutSongInput = {
    create?: XOR<song_authorCreateWithoutSongInput, song_authorUncheckedCreateWithoutSongInput> | song_authorCreateWithoutSongInput[] | song_authorUncheckedCreateWithoutSongInput[]
    connectOrCreate?: song_authorCreateOrConnectWithoutSongInput | song_authorCreateOrConnectWithoutSongInput[]
    createMany?: song_authorCreateManySongInputEnvelope
    connect?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
  }

  export type playhistoryUpdateManyWithoutSongNestedInput = {
    create?: XOR<playhistoryCreateWithoutSongInput, playhistoryUncheckedCreateWithoutSongInput> | playhistoryCreateWithoutSongInput[] | playhistoryUncheckedCreateWithoutSongInput[]
    connectOrCreate?: playhistoryCreateOrConnectWithoutSongInput | playhistoryCreateOrConnectWithoutSongInput[]
    upsert?: playhistoryUpsertWithWhereUniqueWithoutSongInput | playhistoryUpsertWithWhereUniqueWithoutSongInput[]
    createMany?: playhistoryCreateManySongInputEnvelope
    set?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    disconnect?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    delete?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    connect?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    update?: playhistoryUpdateWithWhereUniqueWithoutSongInput | playhistoryUpdateWithWhereUniqueWithoutSongInput[]
    updateMany?: playhistoryUpdateManyWithWhereWithoutSongInput | playhistoryUpdateManyWithWhereWithoutSongInput[]
    deleteMany?: playhistoryScalarWhereInput | playhistoryScalarWhereInput[]
  }

  export type playlist_songUpdateManyWithoutSongNestedInput = {
    create?: XOR<playlist_songCreateWithoutSongInput, playlist_songUncheckedCreateWithoutSongInput> | playlist_songCreateWithoutSongInput[] | playlist_songUncheckedCreateWithoutSongInput[]
    connectOrCreate?: playlist_songCreateOrConnectWithoutSongInput | playlist_songCreateOrConnectWithoutSongInput[]
    upsert?: playlist_songUpsertWithWhereUniqueWithoutSongInput | playlist_songUpsertWithWhereUniqueWithoutSongInput[]
    createMany?: playlist_songCreateManySongInputEnvelope
    set?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    disconnect?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    delete?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    connect?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    update?: playlist_songUpdateWithWhereUniqueWithoutSongInput | playlist_songUpdateWithWhereUniqueWithoutSongInput[]
    updateMany?: playlist_songUpdateManyWithWhereWithoutSongInput | playlist_songUpdateManyWithWhereWithoutSongInput[]
    deleteMany?: playlist_songScalarWhereInput | playlist_songScalarWhereInput[]
  }

  export type albumUpdateOneWithoutSong_song_albumToalbumNestedInput = {
    create?: XOR<albumCreateWithoutSong_song_albumToalbumInput, albumUncheckedCreateWithoutSong_song_albumToalbumInput>
    connectOrCreate?: albumCreateOrConnectWithoutSong_song_albumToalbumInput
    upsert?: albumUpsertWithoutSong_song_albumToalbumInput
    disconnect?: albumWhereInput | boolean
    delete?: albumWhereInput | boolean
    connect?: albumWhereUniqueInput
    update?: XOR<XOR<albumUpdateToOneWithWhereWithoutSong_song_albumToalbumInput, albumUpdateWithoutSong_song_albumToalbumInput>, albumUncheckedUpdateWithoutSong_song_albumToalbumInput>
  }

  export type song_authorUpdateManyWithoutSongNestedInput = {
    create?: XOR<song_authorCreateWithoutSongInput, song_authorUncheckedCreateWithoutSongInput> | song_authorCreateWithoutSongInput[] | song_authorUncheckedCreateWithoutSongInput[]
    connectOrCreate?: song_authorCreateOrConnectWithoutSongInput | song_authorCreateOrConnectWithoutSongInput[]
    upsert?: song_authorUpsertWithWhereUniqueWithoutSongInput | song_authorUpsertWithWhereUniqueWithoutSongInput[]
    createMany?: song_authorCreateManySongInputEnvelope
    set?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    disconnect?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    delete?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    connect?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    update?: song_authorUpdateWithWhereUniqueWithoutSongInput | song_authorUpdateWithWhereUniqueWithoutSongInput[]
    updateMany?: song_authorUpdateManyWithWhereWithoutSongInput | song_authorUpdateManyWithWhereWithoutSongInput[]
    deleteMany?: song_authorScalarWhereInput | song_authorScalarWhereInput[]
  }

  export type playhistoryUncheckedUpdateManyWithoutSongNestedInput = {
    create?: XOR<playhistoryCreateWithoutSongInput, playhistoryUncheckedCreateWithoutSongInput> | playhistoryCreateWithoutSongInput[] | playhistoryUncheckedCreateWithoutSongInput[]
    connectOrCreate?: playhistoryCreateOrConnectWithoutSongInput | playhistoryCreateOrConnectWithoutSongInput[]
    upsert?: playhistoryUpsertWithWhereUniqueWithoutSongInput | playhistoryUpsertWithWhereUniqueWithoutSongInput[]
    createMany?: playhistoryCreateManySongInputEnvelope
    set?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    disconnect?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    delete?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    connect?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    update?: playhistoryUpdateWithWhereUniqueWithoutSongInput | playhistoryUpdateWithWhereUniqueWithoutSongInput[]
    updateMany?: playhistoryUpdateManyWithWhereWithoutSongInput | playhistoryUpdateManyWithWhereWithoutSongInput[]
    deleteMany?: playhistoryScalarWhereInput | playhistoryScalarWhereInput[]
  }

  export type playlist_songUncheckedUpdateManyWithoutSongNestedInput = {
    create?: XOR<playlist_songCreateWithoutSongInput, playlist_songUncheckedCreateWithoutSongInput> | playlist_songCreateWithoutSongInput[] | playlist_songUncheckedCreateWithoutSongInput[]
    connectOrCreate?: playlist_songCreateOrConnectWithoutSongInput | playlist_songCreateOrConnectWithoutSongInput[]
    upsert?: playlist_songUpsertWithWhereUniqueWithoutSongInput | playlist_songUpsertWithWhereUniqueWithoutSongInput[]
    createMany?: playlist_songCreateManySongInputEnvelope
    set?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    disconnect?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    delete?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    connect?: playlist_songWhereUniqueInput | playlist_songWhereUniqueInput[]
    update?: playlist_songUpdateWithWhereUniqueWithoutSongInput | playlist_songUpdateWithWhereUniqueWithoutSongInput[]
    updateMany?: playlist_songUpdateManyWithWhereWithoutSongInput | playlist_songUpdateManyWithWhereWithoutSongInput[]
    deleteMany?: playlist_songScalarWhereInput | playlist_songScalarWhereInput[]
  }

  export type song_authorUncheckedUpdateManyWithoutSongNestedInput = {
    create?: XOR<song_authorCreateWithoutSongInput, song_authorUncheckedCreateWithoutSongInput> | song_authorCreateWithoutSongInput[] | song_authorUncheckedCreateWithoutSongInput[]
    connectOrCreate?: song_authorCreateOrConnectWithoutSongInput | song_authorCreateOrConnectWithoutSongInput[]
    upsert?: song_authorUpsertWithWhereUniqueWithoutSongInput | song_authorUpsertWithWhereUniqueWithoutSongInput[]
    createMany?: song_authorCreateManySongInputEnvelope
    set?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    disconnect?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    delete?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    connect?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    update?: song_authorUpdateWithWhereUniqueWithoutSongInput | song_authorUpdateWithWhereUniqueWithoutSongInput[]
    updateMany?: song_authorUpdateManyWithWhereWithoutSongInput | song_authorUpdateManyWithWhereWithoutSongInput[]
    deleteMany?: song_authorScalarWhereInput | song_authorScalarWhereInput[]
  }

  export type userCreateNestedOneWithoutSong_authorInput = {
    create?: XOR<userCreateWithoutSong_authorInput, userUncheckedCreateWithoutSong_authorInput>
    connectOrCreate?: userCreateOrConnectWithoutSong_authorInput
    connect?: userWhereUniqueInput
  }

  export type songCreateNestedOneWithoutSong_authorInput = {
    create?: XOR<songCreateWithoutSong_authorInput, songUncheckedCreateWithoutSong_authorInput>
    connectOrCreate?: songCreateOrConnectWithoutSong_authorInput
    connect?: songWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutSong_authorNestedInput = {
    create?: XOR<userCreateWithoutSong_authorInput, userUncheckedCreateWithoutSong_authorInput>
    connectOrCreate?: userCreateOrConnectWithoutSong_authorInput
    upsert?: userUpsertWithoutSong_authorInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutSong_authorInput, userUpdateWithoutSong_authorInput>, userUncheckedUpdateWithoutSong_authorInput>
  }

  export type songUpdateOneRequiredWithoutSong_authorNestedInput = {
    create?: XOR<songCreateWithoutSong_authorInput, songUncheckedCreateWithoutSong_authorInput>
    connectOrCreate?: songCreateOrConnectWithoutSong_authorInput
    upsert?: songUpsertWithoutSong_authorInput
    connect?: songWhereUniqueInput
    update?: XOR<XOR<songUpdateToOneWithWhereWithoutSong_authorInput, songUpdateWithoutSong_authorInput>, songUncheckedUpdateWithoutSong_authorInput>
  }

  export type album_authorCreateNestedManyWithoutUserInput = {
    create?: XOR<album_authorCreateWithoutUserInput, album_authorUncheckedCreateWithoutUserInput> | album_authorCreateWithoutUserInput[] | album_authorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: album_authorCreateOrConnectWithoutUserInput | album_authorCreateOrConnectWithoutUserInput[]
    createMany?: album_authorCreateManyUserInputEnvelope
    connect?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
  }

  export type playhistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<playhistoryCreateWithoutUserInput, playhistoryUncheckedCreateWithoutUserInput> | playhistoryCreateWithoutUserInput[] | playhistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: playhistoryCreateOrConnectWithoutUserInput | playhistoryCreateOrConnectWithoutUserInput[]
    createMany?: playhistoryCreateManyUserInputEnvelope
    connect?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
  }

  export type playlistCreateNestedManyWithoutUserInput = {
    create?: XOR<playlistCreateWithoutUserInput, playlistUncheckedCreateWithoutUserInput> | playlistCreateWithoutUserInput[] | playlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: playlistCreateOrConnectWithoutUserInput | playlistCreateOrConnectWithoutUserInput[]
    createMany?: playlistCreateManyUserInputEnvelope
    connect?: playlistWhereUniqueInput | playlistWhereUniqueInput[]
  }

  export type song_authorCreateNestedManyWithoutUserInput = {
    create?: XOR<song_authorCreateWithoutUserInput, song_authorUncheckedCreateWithoutUserInput> | song_authorCreateWithoutUserInput[] | song_authorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: song_authorCreateOrConnectWithoutUserInput | song_authorCreateOrConnectWithoutUserInput[]
    createMany?: song_authorCreateManyUserInputEnvelope
    connect?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
  }

  export type album_authorUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<album_authorCreateWithoutUserInput, album_authorUncheckedCreateWithoutUserInput> | album_authorCreateWithoutUserInput[] | album_authorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: album_authorCreateOrConnectWithoutUserInput | album_authorCreateOrConnectWithoutUserInput[]
    createMany?: album_authorCreateManyUserInputEnvelope
    connect?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
  }

  export type playhistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<playhistoryCreateWithoutUserInput, playhistoryUncheckedCreateWithoutUserInput> | playhistoryCreateWithoutUserInput[] | playhistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: playhistoryCreateOrConnectWithoutUserInput | playhistoryCreateOrConnectWithoutUserInput[]
    createMany?: playhistoryCreateManyUserInputEnvelope
    connect?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
  }

  export type playlistUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<playlistCreateWithoutUserInput, playlistUncheckedCreateWithoutUserInput> | playlistCreateWithoutUserInput[] | playlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: playlistCreateOrConnectWithoutUserInput | playlistCreateOrConnectWithoutUserInput[]
    createMany?: playlistCreateManyUserInputEnvelope
    connect?: playlistWhereUniqueInput | playlistWhereUniqueInput[]
  }

  export type song_authorUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<song_authorCreateWithoutUserInput, song_authorUncheckedCreateWithoutUserInput> | song_authorCreateWithoutUserInput[] | song_authorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: song_authorCreateOrConnectWithoutUserInput | song_authorCreateOrConnectWithoutUserInput[]
    createMany?: song_authorCreateManyUserInputEnvelope
    connect?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
  }

  export type album_authorUpdateManyWithoutUserNestedInput = {
    create?: XOR<album_authorCreateWithoutUserInput, album_authorUncheckedCreateWithoutUserInput> | album_authorCreateWithoutUserInput[] | album_authorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: album_authorCreateOrConnectWithoutUserInput | album_authorCreateOrConnectWithoutUserInput[]
    upsert?: album_authorUpsertWithWhereUniqueWithoutUserInput | album_authorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: album_authorCreateManyUserInputEnvelope
    set?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    disconnect?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    delete?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    connect?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    update?: album_authorUpdateWithWhereUniqueWithoutUserInput | album_authorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: album_authorUpdateManyWithWhereWithoutUserInput | album_authorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: album_authorScalarWhereInput | album_authorScalarWhereInput[]
  }

  export type playhistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<playhistoryCreateWithoutUserInput, playhistoryUncheckedCreateWithoutUserInput> | playhistoryCreateWithoutUserInput[] | playhistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: playhistoryCreateOrConnectWithoutUserInput | playhistoryCreateOrConnectWithoutUserInput[]
    upsert?: playhistoryUpsertWithWhereUniqueWithoutUserInput | playhistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: playhistoryCreateManyUserInputEnvelope
    set?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    disconnect?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    delete?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    connect?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    update?: playhistoryUpdateWithWhereUniqueWithoutUserInput | playhistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: playhistoryUpdateManyWithWhereWithoutUserInput | playhistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: playhistoryScalarWhereInput | playhistoryScalarWhereInput[]
  }

  export type playlistUpdateManyWithoutUserNestedInput = {
    create?: XOR<playlistCreateWithoutUserInput, playlistUncheckedCreateWithoutUserInput> | playlistCreateWithoutUserInput[] | playlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: playlistCreateOrConnectWithoutUserInput | playlistCreateOrConnectWithoutUserInput[]
    upsert?: playlistUpsertWithWhereUniqueWithoutUserInput | playlistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: playlistCreateManyUserInputEnvelope
    set?: playlistWhereUniqueInput | playlistWhereUniqueInput[]
    disconnect?: playlistWhereUniqueInput | playlistWhereUniqueInput[]
    delete?: playlistWhereUniqueInput | playlistWhereUniqueInput[]
    connect?: playlistWhereUniqueInput | playlistWhereUniqueInput[]
    update?: playlistUpdateWithWhereUniqueWithoutUserInput | playlistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: playlistUpdateManyWithWhereWithoutUserInput | playlistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: playlistScalarWhereInput | playlistScalarWhereInput[]
  }

  export type song_authorUpdateManyWithoutUserNestedInput = {
    create?: XOR<song_authorCreateWithoutUserInput, song_authorUncheckedCreateWithoutUserInput> | song_authorCreateWithoutUserInput[] | song_authorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: song_authorCreateOrConnectWithoutUserInput | song_authorCreateOrConnectWithoutUserInput[]
    upsert?: song_authorUpsertWithWhereUniqueWithoutUserInput | song_authorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: song_authorCreateManyUserInputEnvelope
    set?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    disconnect?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    delete?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    connect?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    update?: song_authorUpdateWithWhereUniqueWithoutUserInput | song_authorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: song_authorUpdateManyWithWhereWithoutUserInput | song_authorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: song_authorScalarWhereInput | song_authorScalarWhereInput[]
  }

  export type album_authorUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<album_authorCreateWithoutUserInput, album_authorUncheckedCreateWithoutUserInput> | album_authorCreateWithoutUserInput[] | album_authorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: album_authorCreateOrConnectWithoutUserInput | album_authorCreateOrConnectWithoutUserInput[]
    upsert?: album_authorUpsertWithWhereUniqueWithoutUserInput | album_authorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: album_authorCreateManyUserInputEnvelope
    set?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    disconnect?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    delete?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    connect?: album_authorWhereUniqueInput | album_authorWhereUniqueInput[]
    update?: album_authorUpdateWithWhereUniqueWithoutUserInput | album_authorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: album_authorUpdateManyWithWhereWithoutUserInput | album_authorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: album_authorScalarWhereInput | album_authorScalarWhereInput[]
  }

  export type playhistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<playhistoryCreateWithoutUserInput, playhistoryUncheckedCreateWithoutUserInput> | playhistoryCreateWithoutUserInput[] | playhistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: playhistoryCreateOrConnectWithoutUserInput | playhistoryCreateOrConnectWithoutUserInput[]
    upsert?: playhistoryUpsertWithWhereUniqueWithoutUserInput | playhistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: playhistoryCreateManyUserInputEnvelope
    set?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    disconnect?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    delete?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    connect?: playhistoryWhereUniqueInput | playhistoryWhereUniqueInput[]
    update?: playhistoryUpdateWithWhereUniqueWithoutUserInput | playhistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: playhistoryUpdateManyWithWhereWithoutUserInput | playhistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: playhistoryScalarWhereInput | playhistoryScalarWhereInput[]
  }

  export type playlistUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<playlistCreateWithoutUserInput, playlistUncheckedCreateWithoutUserInput> | playlistCreateWithoutUserInput[] | playlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: playlistCreateOrConnectWithoutUserInput | playlistCreateOrConnectWithoutUserInput[]
    upsert?: playlistUpsertWithWhereUniqueWithoutUserInput | playlistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: playlistCreateManyUserInputEnvelope
    set?: playlistWhereUniqueInput | playlistWhereUniqueInput[]
    disconnect?: playlistWhereUniqueInput | playlistWhereUniqueInput[]
    delete?: playlistWhereUniqueInput | playlistWhereUniqueInput[]
    connect?: playlistWhereUniqueInput | playlistWhereUniqueInput[]
    update?: playlistUpdateWithWhereUniqueWithoutUserInput | playlistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: playlistUpdateManyWithWhereWithoutUserInput | playlistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: playlistScalarWhereInput | playlistScalarWhereInput[]
  }

  export type song_authorUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<song_authorCreateWithoutUserInput, song_authorUncheckedCreateWithoutUserInput> | song_authorCreateWithoutUserInput[] | song_authorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: song_authorCreateOrConnectWithoutUserInput | song_authorCreateOrConnectWithoutUserInput[]
    upsert?: song_authorUpsertWithWhereUniqueWithoutUserInput | song_authorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: song_authorCreateManyUserInputEnvelope
    set?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    disconnect?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    delete?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    connect?: song_authorWhereUniqueInput | song_authorWhereUniqueInput[]
    update?: song_authorUpdateWithWhereUniqueWithoutUserInput | song_authorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: song_authorUpdateManyWithWhereWithoutUserInput | song_authorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: song_authorScalarWhereInput | song_authorScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type album_authorCreateWithoutAlbumInput = {
    user: userCreateNestedOneWithoutAlbum_authorInput
  }

  export type album_authorUncheckedCreateWithoutAlbumInput = {
    id?: number
    author_id: number
  }

  export type album_authorCreateOrConnectWithoutAlbumInput = {
    where: album_authorWhereUniqueInput
    create: XOR<album_authorCreateWithoutAlbumInput, album_authorUncheckedCreateWithoutAlbumInput>
  }

  export type album_authorCreateManyAlbumInputEnvelope = {
    data: album_authorCreateManyAlbumInput | album_authorCreateManyAlbumInput[]
    skipDuplicates?: boolean
  }

  export type songCreateWithoutAlbum_song_albumToalbumInput = {
    name: string
    content: string
    view?: number | null
    time_played?: number | null
    key?: string | null
    tempo?: string | null
    genre?: string | null
    year_publish?: number | null
    playhistory?: playhistoryCreateNestedManyWithoutSongInput
    playlist_song?: playlist_songCreateNestedManyWithoutSongInput
    song_author?: song_authorCreateNestedManyWithoutSongInput
  }

  export type songUncheckedCreateWithoutAlbum_song_albumToalbumInput = {
    song_id?: number
    name: string
    content: string
    view?: number | null
    time_played?: number | null
    key?: string | null
    tempo?: string | null
    genre?: string | null
    year_publish?: number | null
    playhistory?: playhistoryUncheckedCreateNestedManyWithoutSongInput
    playlist_song?: playlist_songUncheckedCreateNestedManyWithoutSongInput
    song_author?: song_authorUncheckedCreateNestedManyWithoutSongInput
  }

  export type songCreateOrConnectWithoutAlbum_song_albumToalbumInput = {
    where: songWhereUniqueInput
    create: XOR<songCreateWithoutAlbum_song_albumToalbumInput, songUncheckedCreateWithoutAlbum_song_albumToalbumInput>
  }

  export type songCreateManyAlbum_song_albumToalbumInputEnvelope = {
    data: songCreateManyAlbum_song_albumToalbumInput | songCreateManyAlbum_song_albumToalbumInput[]
    skipDuplicates?: boolean
  }

  export type album_authorUpsertWithWhereUniqueWithoutAlbumInput = {
    where: album_authorWhereUniqueInput
    update: XOR<album_authorUpdateWithoutAlbumInput, album_authorUncheckedUpdateWithoutAlbumInput>
    create: XOR<album_authorCreateWithoutAlbumInput, album_authorUncheckedCreateWithoutAlbumInput>
  }

  export type album_authorUpdateWithWhereUniqueWithoutAlbumInput = {
    where: album_authorWhereUniqueInput
    data: XOR<album_authorUpdateWithoutAlbumInput, album_authorUncheckedUpdateWithoutAlbumInput>
  }

  export type album_authorUpdateManyWithWhereWithoutAlbumInput = {
    where: album_authorScalarWhereInput
    data: XOR<album_authorUpdateManyMutationInput, album_authorUncheckedUpdateManyWithoutAlbumInput>
  }

  export type album_authorScalarWhereInput = {
    AND?: album_authorScalarWhereInput | album_authorScalarWhereInput[]
    OR?: album_authorScalarWhereInput[]
    NOT?: album_authorScalarWhereInput | album_authorScalarWhereInput[]
    id?: IntFilter<"album_author"> | number
    author_id?: IntFilter<"album_author"> | number
    album_id?: IntFilter<"album_author"> | number
  }

  export type songUpsertWithWhereUniqueWithoutAlbum_song_albumToalbumInput = {
    where: songWhereUniqueInput
    update: XOR<songUpdateWithoutAlbum_song_albumToalbumInput, songUncheckedUpdateWithoutAlbum_song_albumToalbumInput>
    create: XOR<songCreateWithoutAlbum_song_albumToalbumInput, songUncheckedCreateWithoutAlbum_song_albumToalbumInput>
  }

  export type songUpdateWithWhereUniqueWithoutAlbum_song_albumToalbumInput = {
    where: songWhereUniqueInput
    data: XOR<songUpdateWithoutAlbum_song_albumToalbumInput, songUncheckedUpdateWithoutAlbum_song_albumToalbumInput>
  }

  export type songUpdateManyWithWhereWithoutAlbum_song_albumToalbumInput = {
    where: songScalarWhereInput
    data: XOR<songUpdateManyMutationInput, songUncheckedUpdateManyWithoutAlbum_song_albumToalbumInput>
  }

  export type songScalarWhereInput = {
    AND?: songScalarWhereInput | songScalarWhereInput[]
    OR?: songScalarWhereInput[]
    NOT?: songScalarWhereInput | songScalarWhereInput[]
    song_id?: IntFilter<"song"> | number
    name?: StringFilter<"song"> | string
    content?: StringFilter<"song"> | string
    view?: IntNullableFilter<"song"> | number | null
    time_played?: IntNullableFilter<"song"> | number | null
    key?: StringNullableFilter<"song"> | string | null
    tempo?: StringNullableFilter<"song"> | string | null
    genre?: StringNullableFilter<"song"> | string | null
    year_publish?: IntNullableFilter<"song"> | number | null
    album?: IntNullableFilter<"song"> | number | null
  }

  export type userCreateWithoutAlbum_authorInput = {
    username: string
    password_hash: string
    playlists_created?: number | null
    playhistory?: playhistoryCreateNestedManyWithoutUserInput
    playlist?: playlistCreateNestedManyWithoutUserInput
    song_author?: song_authorCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutAlbum_authorInput = {
    id?: number
    username: string
    password_hash: string
    playlists_created?: number | null
    playhistory?: playhistoryUncheckedCreateNestedManyWithoutUserInput
    playlist?: playlistUncheckedCreateNestedManyWithoutUserInput
    song_author?: song_authorUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutAlbum_authorInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutAlbum_authorInput, userUncheckedCreateWithoutAlbum_authorInput>
  }

  export type albumCreateWithoutAlbum_authorInput = {
    album_name: string
    song_song_albumToalbum?: songCreateNestedManyWithoutAlbum_song_albumToalbumInput
  }

  export type albumUncheckedCreateWithoutAlbum_authorInput = {
    id?: number
    album_name: string
    song_song_albumToalbum?: songUncheckedCreateNestedManyWithoutAlbum_song_albumToalbumInput
  }

  export type albumCreateOrConnectWithoutAlbum_authorInput = {
    where: albumWhereUniqueInput
    create: XOR<albumCreateWithoutAlbum_authorInput, albumUncheckedCreateWithoutAlbum_authorInput>
  }

  export type userUpsertWithoutAlbum_authorInput = {
    update: XOR<userUpdateWithoutAlbum_authorInput, userUncheckedUpdateWithoutAlbum_authorInput>
    create: XOR<userCreateWithoutAlbum_authorInput, userUncheckedCreateWithoutAlbum_authorInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutAlbum_authorInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutAlbum_authorInput, userUncheckedUpdateWithoutAlbum_authorInput>
  }

  export type userUpdateWithoutAlbum_authorInput = {
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    playlists_created?: NullableIntFieldUpdateOperationsInput | number | null
    playhistory?: playhistoryUpdateManyWithoutUserNestedInput
    playlist?: playlistUpdateManyWithoutUserNestedInput
    song_author?: song_authorUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutAlbum_authorInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    playlists_created?: NullableIntFieldUpdateOperationsInput | number | null
    playhistory?: playhistoryUncheckedUpdateManyWithoutUserNestedInput
    playlist?: playlistUncheckedUpdateManyWithoutUserNestedInput
    song_author?: song_authorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type albumUpsertWithoutAlbum_authorInput = {
    update: XOR<albumUpdateWithoutAlbum_authorInput, albumUncheckedUpdateWithoutAlbum_authorInput>
    create: XOR<albumCreateWithoutAlbum_authorInput, albumUncheckedCreateWithoutAlbum_authorInput>
    where?: albumWhereInput
  }

  export type albumUpdateToOneWithWhereWithoutAlbum_authorInput = {
    where?: albumWhereInput
    data: XOR<albumUpdateWithoutAlbum_authorInput, albumUncheckedUpdateWithoutAlbum_authorInput>
  }

  export type albumUpdateWithoutAlbum_authorInput = {
    album_name?: StringFieldUpdateOperationsInput | string
    song_song_albumToalbum?: songUpdateManyWithoutAlbum_song_albumToalbumNestedInput
  }

  export type albumUncheckedUpdateWithoutAlbum_authorInput = {
    id?: IntFieldUpdateOperationsInput | number
    album_name?: StringFieldUpdateOperationsInput | string
    song_song_albumToalbum?: songUncheckedUpdateManyWithoutAlbum_song_albumToalbumNestedInput
  }

  export type userCreateWithoutPlayhistoryInput = {
    username: string
    password_hash: string
    playlists_created?: number | null
    album_author?: album_authorCreateNestedManyWithoutUserInput
    playlist?: playlistCreateNestedManyWithoutUserInput
    song_author?: song_authorCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutPlayhistoryInput = {
    id?: number
    username: string
    password_hash: string
    playlists_created?: number | null
    album_author?: album_authorUncheckedCreateNestedManyWithoutUserInput
    playlist?: playlistUncheckedCreateNestedManyWithoutUserInput
    song_author?: song_authorUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutPlayhistoryInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutPlayhistoryInput, userUncheckedCreateWithoutPlayhistoryInput>
  }

  export type songCreateWithoutPlayhistoryInput = {
    name: string
    content: string
    view?: number | null
    time_played?: number | null
    key?: string | null
    tempo?: string | null
    genre?: string | null
    year_publish?: number | null
    playlist_song?: playlist_songCreateNestedManyWithoutSongInput
    album_song_albumToalbum?: albumCreateNestedOneWithoutSong_song_albumToalbumInput
    song_author?: song_authorCreateNestedManyWithoutSongInput
  }

  export type songUncheckedCreateWithoutPlayhistoryInput = {
    song_id?: number
    name: string
    content: string
    view?: number | null
    time_played?: number | null
    key?: string | null
    tempo?: string | null
    genre?: string | null
    year_publish?: number | null
    album?: number | null
    playlist_song?: playlist_songUncheckedCreateNestedManyWithoutSongInput
    song_author?: song_authorUncheckedCreateNestedManyWithoutSongInput
  }

  export type songCreateOrConnectWithoutPlayhistoryInput = {
    where: songWhereUniqueInput
    create: XOR<songCreateWithoutPlayhistoryInput, songUncheckedCreateWithoutPlayhistoryInput>
  }

  export type userUpsertWithoutPlayhistoryInput = {
    update: XOR<userUpdateWithoutPlayhistoryInput, userUncheckedUpdateWithoutPlayhistoryInput>
    create: XOR<userCreateWithoutPlayhistoryInput, userUncheckedCreateWithoutPlayhistoryInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutPlayhistoryInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutPlayhistoryInput, userUncheckedUpdateWithoutPlayhistoryInput>
  }

  export type userUpdateWithoutPlayhistoryInput = {
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    playlists_created?: NullableIntFieldUpdateOperationsInput | number | null
    album_author?: album_authorUpdateManyWithoutUserNestedInput
    playlist?: playlistUpdateManyWithoutUserNestedInput
    song_author?: song_authorUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutPlayhistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    playlists_created?: NullableIntFieldUpdateOperationsInput | number | null
    album_author?: album_authorUncheckedUpdateManyWithoutUserNestedInput
    playlist?: playlistUncheckedUpdateManyWithoutUserNestedInput
    song_author?: song_authorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type songUpsertWithoutPlayhistoryInput = {
    update: XOR<songUpdateWithoutPlayhistoryInput, songUncheckedUpdateWithoutPlayhistoryInput>
    create: XOR<songCreateWithoutPlayhistoryInput, songUncheckedCreateWithoutPlayhistoryInput>
    where?: songWhereInput
  }

  export type songUpdateToOneWithWhereWithoutPlayhistoryInput = {
    where?: songWhereInput
    data: XOR<songUpdateWithoutPlayhistoryInput, songUncheckedUpdateWithoutPlayhistoryInput>
  }

  export type songUpdateWithoutPlayhistoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    view?: NullableIntFieldUpdateOperationsInput | number | null
    time_played?: NullableIntFieldUpdateOperationsInput | number | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
    tempo?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    year_publish?: NullableIntFieldUpdateOperationsInput | number | null
    playlist_song?: playlist_songUpdateManyWithoutSongNestedInput
    album_song_albumToalbum?: albumUpdateOneWithoutSong_song_albumToalbumNestedInput
    song_author?: song_authorUpdateManyWithoutSongNestedInput
  }

  export type songUncheckedUpdateWithoutPlayhistoryInput = {
    song_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    view?: NullableIntFieldUpdateOperationsInput | number | null
    time_played?: NullableIntFieldUpdateOperationsInput | number | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
    tempo?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    year_publish?: NullableIntFieldUpdateOperationsInput | number | null
    album?: NullableIntFieldUpdateOperationsInput | number | null
    playlist_song?: playlist_songUncheckedUpdateManyWithoutSongNestedInput
    song_author?: song_authorUncheckedUpdateManyWithoutSongNestedInput
  }

  export type userCreateWithoutPlaylistInput = {
    username: string
    password_hash: string
    playlists_created?: number | null
    album_author?: album_authorCreateNestedManyWithoutUserInput
    playhistory?: playhistoryCreateNestedManyWithoutUserInput
    song_author?: song_authorCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutPlaylistInput = {
    id?: number
    username: string
    password_hash: string
    playlists_created?: number | null
    album_author?: album_authorUncheckedCreateNestedManyWithoutUserInput
    playhistory?: playhistoryUncheckedCreateNestedManyWithoutUserInput
    song_author?: song_authorUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutPlaylistInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutPlaylistInput, userUncheckedCreateWithoutPlaylistInput>
  }

  export type playlist_songCreateWithoutPlaylistInput = {
    song: songCreateNestedOneWithoutPlaylist_songInput
  }

  export type playlist_songUncheckedCreateWithoutPlaylistInput = {
    id?: number
    song_id: number
  }

  export type playlist_songCreateOrConnectWithoutPlaylistInput = {
    where: playlist_songWhereUniqueInput
    create: XOR<playlist_songCreateWithoutPlaylistInput, playlist_songUncheckedCreateWithoutPlaylistInput>
  }

  export type playlist_songCreateManyPlaylistInputEnvelope = {
    data: playlist_songCreateManyPlaylistInput | playlist_songCreateManyPlaylistInput[]
    skipDuplicates?: boolean
  }

  export type userUpsertWithoutPlaylistInput = {
    update: XOR<userUpdateWithoutPlaylistInput, userUncheckedUpdateWithoutPlaylistInput>
    create: XOR<userCreateWithoutPlaylistInput, userUncheckedCreateWithoutPlaylistInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutPlaylistInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutPlaylistInput, userUncheckedUpdateWithoutPlaylistInput>
  }

  export type userUpdateWithoutPlaylistInput = {
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    playlists_created?: NullableIntFieldUpdateOperationsInput | number | null
    album_author?: album_authorUpdateManyWithoutUserNestedInput
    playhistory?: playhistoryUpdateManyWithoutUserNestedInput
    song_author?: song_authorUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutPlaylistInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    playlists_created?: NullableIntFieldUpdateOperationsInput | number | null
    album_author?: album_authorUncheckedUpdateManyWithoutUserNestedInput
    playhistory?: playhistoryUncheckedUpdateManyWithoutUserNestedInput
    song_author?: song_authorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type playlist_songUpsertWithWhereUniqueWithoutPlaylistInput = {
    where: playlist_songWhereUniqueInput
    update: XOR<playlist_songUpdateWithoutPlaylistInput, playlist_songUncheckedUpdateWithoutPlaylistInput>
    create: XOR<playlist_songCreateWithoutPlaylistInput, playlist_songUncheckedCreateWithoutPlaylistInput>
  }

  export type playlist_songUpdateWithWhereUniqueWithoutPlaylistInput = {
    where: playlist_songWhereUniqueInput
    data: XOR<playlist_songUpdateWithoutPlaylistInput, playlist_songUncheckedUpdateWithoutPlaylistInput>
  }

  export type playlist_songUpdateManyWithWhereWithoutPlaylistInput = {
    where: playlist_songScalarWhereInput
    data: XOR<playlist_songUpdateManyMutationInput, playlist_songUncheckedUpdateManyWithoutPlaylistInput>
  }

  export type playlist_songScalarWhereInput = {
    AND?: playlist_songScalarWhereInput | playlist_songScalarWhereInput[]
    OR?: playlist_songScalarWhereInput[]
    NOT?: playlist_songScalarWhereInput | playlist_songScalarWhereInput[]
    id?: IntFilter<"playlist_song"> | number
    playlist_id?: IntFilter<"playlist_song"> | number
    song_id?: IntFilter<"playlist_song"> | number
  }

  export type playlistCreateWithoutPlaylist_songInput = {
    playlist_name: string
    description?: string | null
    total_time_played?: number | null
    total_view?: number | null
    user: userCreateNestedOneWithoutPlaylistInput
  }

  export type playlistUncheckedCreateWithoutPlaylist_songInput = {
    id?: number
    user_created: number
    playlist_name: string
    description?: string | null
    total_time_played?: number | null
    total_view?: number | null
  }

  export type playlistCreateOrConnectWithoutPlaylist_songInput = {
    where: playlistWhereUniqueInput
    create: XOR<playlistCreateWithoutPlaylist_songInput, playlistUncheckedCreateWithoutPlaylist_songInput>
  }

  export type songCreateWithoutPlaylist_songInput = {
    name: string
    content: string
    view?: number | null
    time_played?: number | null
    key?: string | null
    tempo?: string | null
    genre?: string | null
    year_publish?: number | null
    playhistory?: playhistoryCreateNestedManyWithoutSongInput
    album_song_albumToalbum?: albumCreateNestedOneWithoutSong_song_albumToalbumInput
    song_author?: song_authorCreateNestedManyWithoutSongInput
  }

  export type songUncheckedCreateWithoutPlaylist_songInput = {
    song_id?: number
    name: string
    content: string
    view?: number | null
    time_played?: number | null
    key?: string | null
    tempo?: string | null
    genre?: string | null
    year_publish?: number | null
    album?: number | null
    playhistory?: playhistoryUncheckedCreateNestedManyWithoutSongInput
    song_author?: song_authorUncheckedCreateNestedManyWithoutSongInput
  }

  export type songCreateOrConnectWithoutPlaylist_songInput = {
    where: songWhereUniqueInput
    create: XOR<songCreateWithoutPlaylist_songInput, songUncheckedCreateWithoutPlaylist_songInput>
  }

  export type playlistUpsertWithoutPlaylist_songInput = {
    update: XOR<playlistUpdateWithoutPlaylist_songInput, playlistUncheckedUpdateWithoutPlaylist_songInput>
    create: XOR<playlistCreateWithoutPlaylist_songInput, playlistUncheckedCreateWithoutPlaylist_songInput>
    where?: playlistWhereInput
  }

  export type playlistUpdateToOneWithWhereWithoutPlaylist_songInput = {
    where?: playlistWhereInput
    data: XOR<playlistUpdateWithoutPlaylist_songInput, playlistUncheckedUpdateWithoutPlaylist_songInput>
  }

  export type playlistUpdateWithoutPlaylist_songInput = {
    playlist_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    total_time_played?: NullableIntFieldUpdateOperationsInput | number | null
    total_view?: NullableIntFieldUpdateOperationsInput | number | null
    user?: userUpdateOneRequiredWithoutPlaylistNestedInput
  }

  export type playlistUncheckedUpdateWithoutPlaylist_songInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_created?: IntFieldUpdateOperationsInput | number
    playlist_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    total_time_played?: NullableIntFieldUpdateOperationsInput | number | null
    total_view?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type songUpsertWithoutPlaylist_songInput = {
    update: XOR<songUpdateWithoutPlaylist_songInput, songUncheckedUpdateWithoutPlaylist_songInput>
    create: XOR<songCreateWithoutPlaylist_songInput, songUncheckedCreateWithoutPlaylist_songInput>
    where?: songWhereInput
  }

  export type songUpdateToOneWithWhereWithoutPlaylist_songInput = {
    where?: songWhereInput
    data: XOR<songUpdateWithoutPlaylist_songInput, songUncheckedUpdateWithoutPlaylist_songInput>
  }

  export type songUpdateWithoutPlaylist_songInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    view?: NullableIntFieldUpdateOperationsInput | number | null
    time_played?: NullableIntFieldUpdateOperationsInput | number | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
    tempo?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    year_publish?: NullableIntFieldUpdateOperationsInput | number | null
    playhistory?: playhistoryUpdateManyWithoutSongNestedInput
    album_song_albumToalbum?: albumUpdateOneWithoutSong_song_albumToalbumNestedInput
    song_author?: song_authorUpdateManyWithoutSongNestedInput
  }

  export type songUncheckedUpdateWithoutPlaylist_songInput = {
    song_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    view?: NullableIntFieldUpdateOperationsInput | number | null
    time_played?: NullableIntFieldUpdateOperationsInput | number | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
    tempo?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    year_publish?: NullableIntFieldUpdateOperationsInput | number | null
    album?: NullableIntFieldUpdateOperationsInput | number | null
    playhistory?: playhistoryUncheckedUpdateManyWithoutSongNestedInput
    song_author?: song_authorUncheckedUpdateManyWithoutSongNestedInput
  }

  export type playhistoryCreateWithoutSongInput = {
    date: Date | string
    score?: Decimal | DecimalJsLike | number | string | null
    user_recording?: string | null
    user: userCreateNestedOneWithoutPlayhistoryInput
  }

  export type playhistoryUncheckedCreateWithoutSongInput = {
    id?: number
    user_id: number
    date: Date | string
    score?: Decimal | DecimalJsLike | number | string | null
    user_recording?: string | null
  }

  export type playhistoryCreateOrConnectWithoutSongInput = {
    where: playhistoryWhereUniqueInput
    create: XOR<playhistoryCreateWithoutSongInput, playhistoryUncheckedCreateWithoutSongInput>
  }

  export type playhistoryCreateManySongInputEnvelope = {
    data: playhistoryCreateManySongInput | playhistoryCreateManySongInput[]
    skipDuplicates?: boolean
  }

  export type playlist_songCreateWithoutSongInput = {
    playlist: playlistCreateNestedOneWithoutPlaylist_songInput
  }

  export type playlist_songUncheckedCreateWithoutSongInput = {
    id?: number
    playlist_id: number
  }

  export type playlist_songCreateOrConnectWithoutSongInput = {
    where: playlist_songWhereUniqueInput
    create: XOR<playlist_songCreateWithoutSongInput, playlist_songUncheckedCreateWithoutSongInput>
  }

  export type playlist_songCreateManySongInputEnvelope = {
    data: playlist_songCreateManySongInput | playlist_songCreateManySongInput[]
    skipDuplicates?: boolean
  }

  export type albumCreateWithoutSong_song_albumToalbumInput = {
    album_name: string
    album_author?: album_authorCreateNestedManyWithoutAlbumInput
  }

  export type albumUncheckedCreateWithoutSong_song_albumToalbumInput = {
    id?: number
    album_name: string
    album_author?: album_authorUncheckedCreateNestedManyWithoutAlbumInput
  }

  export type albumCreateOrConnectWithoutSong_song_albumToalbumInput = {
    where: albumWhereUniqueInput
    create: XOR<albumCreateWithoutSong_song_albumToalbumInput, albumUncheckedCreateWithoutSong_song_albumToalbumInput>
  }

  export type song_authorCreateWithoutSongInput = {
    user: userCreateNestedOneWithoutSong_authorInput
  }

  export type song_authorUncheckedCreateWithoutSongInput = {
    id?: number
    author_id: number
  }

  export type song_authorCreateOrConnectWithoutSongInput = {
    where: song_authorWhereUniqueInput
    create: XOR<song_authorCreateWithoutSongInput, song_authorUncheckedCreateWithoutSongInput>
  }

  export type song_authorCreateManySongInputEnvelope = {
    data: song_authorCreateManySongInput | song_authorCreateManySongInput[]
    skipDuplicates?: boolean
  }

  export type playhistoryUpsertWithWhereUniqueWithoutSongInput = {
    where: playhistoryWhereUniqueInput
    update: XOR<playhistoryUpdateWithoutSongInput, playhistoryUncheckedUpdateWithoutSongInput>
    create: XOR<playhistoryCreateWithoutSongInput, playhistoryUncheckedCreateWithoutSongInput>
  }

  export type playhistoryUpdateWithWhereUniqueWithoutSongInput = {
    where: playhistoryWhereUniqueInput
    data: XOR<playhistoryUpdateWithoutSongInput, playhistoryUncheckedUpdateWithoutSongInput>
  }

  export type playhistoryUpdateManyWithWhereWithoutSongInput = {
    where: playhistoryScalarWhereInput
    data: XOR<playhistoryUpdateManyMutationInput, playhistoryUncheckedUpdateManyWithoutSongInput>
  }

  export type playhistoryScalarWhereInput = {
    AND?: playhistoryScalarWhereInput | playhistoryScalarWhereInput[]
    OR?: playhistoryScalarWhereInput[]
    NOT?: playhistoryScalarWhereInput | playhistoryScalarWhereInput[]
    id?: IntFilter<"playhistory"> | number
    user_id?: IntFilter<"playhistory"> | number
    song_played?: IntFilter<"playhistory"> | number
    date?: DateTimeFilter<"playhistory"> | Date | string
    score?: DecimalNullableFilter<"playhistory"> | Decimal | DecimalJsLike | number | string | null
    user_recording?: StringNullableFilter<"playhistory"> | string | null
  }

  export type playlist_songUpsertWithWhereUniqueWithoutSongInput = {
    where: playlist_songWhereUniqueInput
    update: XOR<playlist_songUpdateWithoutSongInput, playlist_songUncheckedUpdateWithoutSongInput>
    create: XOR<playlist_songCreateWithoutSongInput, playlist_songUncheckedCreateWithoutSongInput>
  }

  export type playlist_songUpdateWithWhereUniqueWithoutSongInput = {
    where: playlist_songWhereUniqueInput
    data: XOR<playlist_songUpdateWithoutSongInput, playlist_songUncheckedUpdateWithoutSongInput>
  }

  export type playlist_songUpdateManyWithWhereWithoutSongInput = {
    where: playlist_songScalarWhereInput
    data: XOR<playlist_songUpdateManyMutationInput, playlist_songUncheckedUpdateManyWithoutSongInput>
  }

  export type albumUpsertWithoutSong_song_albumToalbumInput = {
    update: XOR<albumUpdateWithoutSong_song_albumToalbumInput, albumUncheckedUpdateWithoutSong_song_albumToalbumInput>
    create: XOR<albumCreateWithoutSong_song_albumToalbumInput, albumUncheckedCreateWithoutSong_song_albumToalbumInput>
    where?: albumWhereInput
  }

  export type albumUpdateToOneWithWhereWithoutSong_song_albumToalbumInput = {
    where?: albumWhereInput
    data: XOR<albumUpdateWithoutSong_song_albumToalbumInput, albumUncheckedUpdateWithoutSong_song_albumToalbumInput>
  }

  export type albumUpdateWithoutSong_song_albumToalbumInput = {
    album_name?: StringFieldUpdateOperationsInput | string
    album_author?: album_authorUpdateManyWithoutAlbumNestedInput
  }

  export type albumUncheckedUpdateWithoutSong_song_albumToalbumInput = {
    id?: IntFieldUpdateOperationsInput | number
    album_name?: StringFieldUpdateOperationsInput | string
    album_author?: album_authorUncheckedUpdateManyWithoutAlbumNestedInput
  }

  export type song_authorUpsertWithWhereUniqueWithoutSongInput = {
    where: song_authorWhereUniqueInput
    update: XOR<song_authorUpdateWithoutSongInput, song_authorUncheckedUpdateWithoutSongInput>
    create: XOR<song_authorCreateWithoutSongInput, song_authorUncheckedCreateWithoutSongInput>
  }

  export type song_authorUpdateWithWhereUniqueWithoutSongInput = {
    where: song_authorWhereUniqueInput
    data: XOR<song_authorUpdateWithoutSongInput, song_authorUncheckedUpdateWithoutSongInput>
  }

  export type song_authorUpdateManyWithWhereWithoutSongInput = {
    where: song_authorScalarWhereInput
    data: XOR<song_authorUpdateManyMutationInput, song_authorUncheckedUpdateManyWithoutSongInput>
  }

  export type song_authorScalarWhereInput = {
    AND?: song_authorScalarWhereInput | song_authorScalarWhereInput[]
    OR?: song_authorScalarWhereInput[]
    NOT?: song_authorScalarWhereInput | song_authorScalarWhereInput[]
    id?: IntFilter<"song_author"> | number
    author_id?: IntFilter<"song_author"> | number
    song_id?: IntFilter<"song_author"> | number
  }

  export type userCreateWithoutSong_authorInput = {
    username: string
    password_hash: string
    playlists_created?: number | null
    album_author?: album_authorCreateNestedManyWithoutUserInput
    playhistory?: playhistoryCreateNestedManyWithoutUserInput
    playlist?: playlistCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutSong_authorInput = {
    id?: number
    username: string
    password_hash: string
    playlists_created?: number | null
    album_author?: album_authorUncheckedCreateNestedManyWithoutUserInput
    playhistory?: playhistoryUncheckedCreateNestedManyWithoutUserInput
    playlist?: playlistUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutSong_authorInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutSong_authorInput, userUncheckedCreateWithoutSong_authorInput>
  }

  export type songCreateWithoutSong_authorInput = {
    name: string
    content: string
    view?: number | null
    time_played?: number | null
    key?: string | null
    tempo?: string | null
    genre?: string | null
    year_publish?: number | null
    playhistory?: playhistoryCreateNestedManyWithoutSongInput
    playlist_song?: playlist_songCreateNestedManyWithoutSongInput
    album_song_albumToalbum?: albumCreateNestedOneWithoutSong_song_albumToalbumInput
  }

  export type songUncheckedCreateWithoutSong_authorInput = {
    song_id?: number
    name: string
    content: string
    view?: number | null
    time_played?: number | null
    key?: string | null
    tempo?: string | null
    genre?: string | null
    year_publish?: number | null
    album?: number | null
    playhistory?: playhistoryUncheckedCreateNestedManyWithoutSongInput
    playlist_song?: playlist_songUncheckedCreateNestedManyWithoutSongInput
  }

  export type songCreateOrConnectWithoutSong_authorInput = {
    where: songWhereUniqueInput
    create: XOR<songCreateWithoutSong_authorInput, songUncheckedCreateWithoutSong_authorInput>
  }

  export type userUpsertWithoutSong_authorInput = {
    update: XOR<userUpdateWithoutSong_authorInput, userUncheckedUpdateWithoutSong_authorInput>
    create: XOR<userCreateWithoutSong_authorInput, userUncheckedCreateWithoutSong_authorInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutSong_authorInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutSong_authorInput, userUncheckedUpdateWithoutSong_authorInput>
  }

  export type userUpdateWithoutSong_authorInput = {
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    playlists_created?: NullableIntFieldUpdateOperationsInput | number | null
    album_author?: album_authorUpdateManyWithoutUserNestedInput
    playhistory?: playhistoryUpdateManyWithoutUserNestedInput
    playlist?: playlistUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutSong_authorInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    playlists_created?: NullableIntFieldUpdateOperationsInput | number | null
    album_author?: album_authorUncheckedUpdateManyWithoutUserNestedInput
    playhistory?: playhistoryUncheckedUpdateManyWithoutUserNestedInput
    playlist?: playlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type songUpsertWithoutSong_authorInput = {
    update: XOR<songUpdateWithoutSong_authorInput, songUncheckedUpdateWithoutSong_authorInput>
    create: XOR<songCreateWithoutSong_authorInput, songUncheckedCreateWithoutSong_authorInput>
    where?: songWhereInput
  }

  export type songUpdateToOneWithWhereWithoutSong_authorInput = {
    where?: songWhereInput
    data: XOR<songUpdateWithoutSong_authorInput, songUncheckedUpdateWithoutSong_authorInput>
  }

  export type songUpdateWithoutSong_authorInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    view?: NullableIntFieldUpdateOperationsInput | number | null
    time_played?: NullableIntFieldUpdateOperationsInput | number | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
    tempo?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    year_publish?: NullableIntFieldUpdateOperationsInput | number | null
    playhistory?: playhistoryUpdateManyWithoutSongNestedInput
    playlist_song?: playlist_songUpdateManyWithoutSongNestedInput
    album_song_albumToalbum?: albumUpdateOneWithoutSong_song_albumToalbumNestedInput
  }

  export type songUncheckedUpdateWithoutSong_authorInput = {
    song_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    view?: NullableIntFieldUpdateOperationsInput | number | null
    time_played?: NullableIntFieldUpdateOperationsInput | number | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
    tempo?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    year_publish?: NullableIntFieldUpdateOperationsInput | number | null
    album?: NullableIntFieldUpdateOperationsInput | number | null
    playhistory?: playhistoryUncheckedUpdateManyWithoutSongNestedInput
    playlist_song?: playlist_songUncheckedUpdateManyWithoutSongNestedInput
  }

  export type album_authorCreateWithoutUserInput = {
    album: albumCreateNestedOneWithoutAlbum_authorInput
  }

  export type album_authorUncheckedCreateWithoutUserInput = {
    id?: number
    album_id: number
  }

  export type album_authorCreateOrConnectWithoutUserInput = {
    where: album_authorWhereUniqueInput
    create: XOR<album_authorCreateWithoutUserInput, album_authorUncheckedCreateWithoutUserInput>
  }

  export type album_authorCreateManyUserInputEnvelope = {
    data: album_authorCreateManyUserInput | album_authorCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type playhistoryCreateWithoutUserInput = {
    date: Date | string
    score?: Decimal | DecimalJsLike | number | string | null
    user_recording?: string | null
    song: songCreateNestedOneWithoutPlayhistoryInput
  }

  export type playhistoryUncheckedCreateWithoutUserInput = {
    id?: number
    song_played: number
    date: Date | string
    score?: Decimal | DecimalJsLike | number | string | null
    user_recording?: string | null
  }

  export type playhistoryCreateOrConnectWithoutUserInput = {
    where: playhistoryWhereUniqueInput
    create: XOR<playhistoryCreateWithoutUserInput, playhistoryUncheckedCreateWithoutUserInput>
  }

  export type playhistoryCreateManyUserInputEnvelope = {
    data: playhistoryCreateManyUserInput | playhistoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type playlistCreateWithoutUserInput = {
    playlist_name: string
    description?: string | null
    total_time_played?: number | null
    total_view?: number | null
    playlist_song?: playlist_songCreateNestedManyWithoutPlaylistInput
  }

  export type playlistUncheckedCreateWithoutUserInput = {
    id?: number
    playlist_name: string
    description?: string | null
    total_time_played?: number | null
    total_view?: number | null
    playlist_song?: playlist_songUncheckedCreateNestedManyWithoutPlaylistInput
  }

  export type playlistCreateOrConnectWithoutUserInput = {
    where: playlistWhereUniqueInput
    create: XOR<playlistCreateWithoutUserInput, playlistUncheckedCreateWithoutUserInput>
  }

  export type playlistCreateManyUserInputEnvelope = {
    data: playlistCreateManyUserInput | playlistCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type song_authorCreateWithoutUserInput = {
    song: songCreateNestedOneWithoutSong_authorInput
  }

  export type song_authorUncheckedCreateWithoutUserInput = {
    id?: number
    song_id: number
  }

  export type song_authorCreateOrConnectWithoutUserInput = {
    where: song_authorWhereUniqueInput
    create: XOR<song_authorCreateWithoutUserInput, song_authorUncheckedCreateWithoutUserInput>
  }

  export type song_authorCreateManyUserInputEnvelope = {
    data: song_authorCreateManyUserInput | song_authorCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type album_authorUpsertWithWhereUniqueWithoutUserInput = {
    where: album_authorWhereUniqueInput
    update: XOR<album_authorUpdateWithoutUserInput, album_authorUncheckedUpdateWithoutUserInput>
    create: XOR<album_authorCreateWithoutUserInput, album_authorUncheckedCreateWithoutUserInput>
  }

  export type album_authorUpdateWithWhereUniqueWithoutUserInput = {
    where: album_authorWhereUniqueInput
    data: XOR<album_authorUpdateWithoutUserInput, album_authorUncheckedUpdateWithoutUserInput>
  }

  export type album_authorUpdateManyWithWhereWithoutUserInput = {
    where: album_authorScalarWhereInput
    data: XOR<album_authorUpdateManyMutationInput, album_authorUncheckedUpdateManyWithoutUserInput>
  }

  export type playhistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: playhistoryWhereUniqueInput
    update: XOR<playhistoryUpdateWithoutUserInput, playhistoryUncheckedUpdateWithoutUserInput>
    create: XOR<playhistoryCreateWithoutUserInput, playhistoryUncheckedCreateWithoutUserInput>
  }

  export type playhistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: playhistoryWhereUniqueInput
    data: XOR<playhistoryUpdateWithoutUserInput, playhistoryUncheckedUpdateWithoutUserInput>
  }

  export type playhistoryUpdateManyWithWhereWithoutUserInput = {
    where: playhistoryScalarWhereInput
    data: XOR<playhistoryUpdateManyMutationInput, playhistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type playlistUpsertWithWhereUniqueWithoutUserInput = {
    where: playlistWhereUniqueInput
    update: XOR<playlistUpdateWithoutUserInput, playlistUncheckedUpdateWithoutUserInput>
    create: XOR<playlistCreateWithoutUserInput, playlistUncheckedCreateWithoutUserInput>
  }

  export type playlistUpdateWithWhereUniqueWithoutUserInput = {
    where: playlistWhereUniqueInput
    data: XOR<playlistUpdateWithoutUserInput, playlistUncheckedUpdateWithoutUserInput>
  }

  export type playlistUpdateManyWithWhereWithoutUserInput = {
    where: playlistScalarWhereInput
    data: XOR<playlistUpdateManyMutationInput, playlistUncheckedUpdateManyWithoutUserInput>
  }

  export type playlistScalarWhereInput = {
    AND?: playlistScalarWhereInput | playlistScalarWhereInput[]
    OR?: playlistScalarWhereInput[]
    NOT?: playlistScalarWhereInput | playlistScalarWhereInput[]
    id?: IntFilter<"playlist"> | number
    user_created?: IntFilter<"playlist"> | number
    playlist_name?: StringFilter<"playlist"> | string
    description?: StringNullableFilter<"playlist"> | string | null
    total_time_played?: IntNullableFilter<"playlist"> | number | null
    total_view?: IntNullableFilter<"playlist"> | number | null
  }

  export type song_authorUpsertWithWhereUniqueWithoutUserInput = {
    where: song_authorWhereUniqueInput
    update: XOR<song_authorUpdateWithoutUserInput, song_authorUncheckedUpdateWithoutUserInput>
    create: XOR<song_authorCreateWithoutUserInput, song_authorUncheckedCreateWithoutUserInput>
  }

  export type song_authorUpdateWithWhereUniqueWithoutUserInput = {
    where: song_authorWhereUniqueInput
    data: XOR<song_authorUpdateWithoutUserInput, song_authorUncheckedUpdateWithoutUserInput>
  }

  export type song_authorUpdateManyWithWhereWithoutUserInput = {
    where: song_authorScalarWhereInput
    data: XOR<song_authorUpdateManyMutationInput, song_authorUncheckedUpdateManyWithoutUserInput>
  }

  export type album_authorCreateManyAlbumInput = {
    id?: number
    author_id: number
  }

  export type songCreateManyAlbum_song_albumToalbumInput = {
    song_id?: number
    name: string
    content: string
    view?: number | null
    time_played?: number | null
    key?: string | null
    tempo?: string | null
    genre?: string | null
    year_publish?: number | null
  }

  export type album_authorUpdateWithoutAlbumInput = {
    user?: userUpdateOneRequiredWithoutAlbum_authorNestedInput
  }

  export type album_authorUncheckedUpdateWithoutAlbumInput = {
    id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
  }

  export type album_authorUncheckedUpdateManyWithoutAlbumInput = {
    id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
  }

  export type songUpdateWithoutAlbum_song_albumToalbumInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    view?: NullableIntFieldUpdateOperationsInput | number | null
    time_played?: NullableIntFieldUpdateOperationsInput | number | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
    tempo?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    year_publish?: NullableIntFieldUpdateOperationsInput | number | null
    playhistory?: playhistoryUpdateManyWithoutSongNestedInput
    playlist_song?: playlist_songUpdateManyWithoutSongNestedInput
    song_author?: song_authorUpdateManyWithoutSongNestedInput
  }

  export type songUncheckedUpdateWithoutAlbum_song_albumToalbumInput = {
    song_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    view?: NullableIntFieldUpdateOperationsInput | number | null
    time_played?: NullableIntFieldUpdateOperationsInput | number | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
    tempo?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    year_publish?: NullableIntFieldUpdateOperationsInput | number | null
    playhistory?: playhistoryUncheckedUpdateManyWithoutSongNestedInput
    playlist_song?: playlist_songUncheckedUpdateManyWithoutSongNestedInput
    song_author?: song_authorUncheckedUpdateManyWithoutSongNestedInput
  }

  export type songUncheckedUpdateManyWithoutAlbum_song_albumToalbumInput = {
    song_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    view?: NullableIntFieldUpdateOperationsInput | number | null
    time_played?: NullableIntFieldUpdateOperationsInput | number | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
    tempo?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    year_publish?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type playlist_songCreateManyPlaylistInput = {
    id?: number
    song_id: number
  }

  export type playlist_songUpdateWithoutPlaylistInput = {
    song?: songUpdateOneRequiredWithoutPlaylist_songNestedInput
  }

  export type playlist_songUncheckedUpdateWithoutPlaylistInput = {
    id?: IntFieldUpdateOperationsInput | number
    song_id?: IntFieldUpdateOperationsInput | number
  }

  export type playlist_songUncheckedUpdateManyWithoutPlaylistInput = {
    id?: IntFieldUpdateOperationsInput | number
    song_id?: IntFieldUpdateOperationsInput | number
  }

  export type playhistoryCreateManySongInput = {
    id?: number
    user_id: number
    date: Date | string
    score?: Decimal | DecimalJsLike | number | string | null
    user_recording?: string | null
  }

  export type playlist_songCreateManySongInput = {
    id?: number
    playlist_id: number
  }

  export type song_authorCreateManySongInput = {
    id?: number
    author_id: number
  }

  export type playhistoryUpdateWithoutSongInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_recording?: NullableStringFieldUpdateOperationsInput | string | null
    user?: userUpdateOneRequiredWithoutPlayhistoryNestedInput
  }

  export type playhistoryUncheckedUpdateWithoutSongInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_recording?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type playhistoryUncheckedUpdateManyWithoutSongInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_recording?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type playlist_songUpdateWithoutSongInput = {
    playlist?: playlistUpdateOneRequiredWithoutPlaylist_songNestedInput
  }

  export type playlist_songUncheckedUpdateWithoutSongInput = {
    id?: IntFieldUpdateOperationsInput | number
    playlist_id?: IntFieldUpdateOperationsInput | number
  }

  export type playlist_songUncheckedUpdateManyWithoutSongInput = {
    id?: IntFieldUpdateOperationsInput | number
    playlist_id?: IntFieldUpdateOperationsInput | number
  }

  export type song_authorUpdateWithoutSongInput = {
    user?: userUpdateOneRequiredWithoutSong_authorNestedInput
  }

  export type song_authorUncheckedUpdateWithoutSongInput = {
    id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
  }

  export type song_authorUncheckedUpdateManyWithoutSongInput = {
    id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
  }

  export type album_authorCreateManyUserInput = {
    id?: number
    album_id: number
  }

  export type playhistoryCreateManyUserInput = {
    id?: number
    song_played: number
    date: Date | string
    score?: Decimal | DecimalJsLike | number | string | null
    user_recording?: string | null
  }

  export type playlistCreateManyUserInput = {
    id?: number
    playlist_name: string
    description?: string | null
    total_time_played?: number | null
    total_view?: number | null
  }

  export type song_authorCreateManyUserInput = {
    id?: number
    song_id: number
  }

  export type album_authorUpdateWithoutUserInput = {
    album?: albumUpdateOneRequiredWithoutAlbum_authorNestedInput
  }

  export type album_authorUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    album_id?: IntFieldUpdateOperationsInput | number
  }

  export type album_authorUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    album_id?: IntFieldUpdateOperationsInput | number
  }

  export type playhistoryUpdateWithoutUserInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_recording?: NullableStringFieldUpdateOperationsInput | string | null
    song?: songUpdateOneRequiredWithoutPlayhistoryNestedInput
  }

  export type playhistoryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    song_played?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_recording?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type playhistoryUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    song_played?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_recording?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type playlistUpdateWithoutUserInput = {
    playlist_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    total_time_played?: NullableIntFieldUpdateOperationsInput | number | null
    total_view?: NullableIntFieldUpdateOperationsInput | number | null
    playlist_song?: playlist_songUpdateManyWithoutPlaylistNestedInput
  }

  export type playlistUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    playlist_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    total_time_played?: NullableIntFieldUpdateOperationsInput | number | null
    total_view?: NullableIntFieldUpdateOperationsInput | number | null
    playlist_song?: playlist_songUncheckedUpdateManyWithoutPlaylistNestedInput
  }

  export type playlistUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    playlist_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    total_time_played?: NullableIntFieldUpdateOperationsInput | number | null
    total_view?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type song_authorUpdateWithoutUserInput = {
    song?: songUpdateOneRequiredWithoutSong_authorNestedInput
  }

  export type song_authorUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    song_id?: IntFieldUpdateOperationsInput | number
  }

  export type song_authorUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    song_id?: IntFieldUpdateOperationsInput | number
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