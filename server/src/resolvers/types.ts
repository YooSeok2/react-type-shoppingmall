type Method = 'Query' | 'Mutation';

export type Resolver = {
  [key in Method]: {
    [key: string]: (parent: any, args: {[key:string]:any}, contextValue: {}, info: any) => any
  }
}