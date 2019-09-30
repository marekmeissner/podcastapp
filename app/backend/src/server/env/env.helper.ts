export const isEnv = {
    optional: (validate: (arg?: string) => boolean): ((v?: string) => boolean) => {
      return (v?: string): boolean => (v !== undefined ? validate(v) : true);
    },
    number: (v?: string): boolean => typeof v === 'string' && /^\d+$/.test(v),
    string: (v?: string): boolean => typeof v === 'string' && v.length > 0,
    logLevel: (v?: string): boolean =>
      typeof v === 'string' && /^(info|trace|debug|warn|error|fatal)$/.test(v),
    contentLimit: (v?: string): boolean => typeof v === 'string' && /^\d+|\d+[kmgt]?b$/.test(v),
  };
  
  export const parseEnv = {
    asIs: (v?: string): string | undefined => v,
    withDefault<T, D>(fn: (v: string) => T, def: D): (v?: string) => T | D {
      return (v?: string): T | D => (v !== undefined ? fn(v) : def);
    },
    logLevel(value?: string): string {
      switch (true) {
        case value !== undefined:
          return value as string;
        case process.env.NODE_ENV === 'test':
          return 'debug';
        case process.env.NODE_ENV === 'production':
          return 'info';
        default:
          return 'trace';
      }
    },
  };
  