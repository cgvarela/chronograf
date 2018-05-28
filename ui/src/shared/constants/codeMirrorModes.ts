export const modeIFQL = {
  // The start state contains the rules that are intially used
  start: [
    // IFQL Syntax
    {
      regex: /[|][>]/,
      token: 'pipe-forward',
    },
    {
      regex: /\w+(?=[(])/,
      token: 'function',
    },
    {
      regex: /[\w\d]+(?=\s[=]\s)/,
      token: 'variable',
    },
    {
      regex: /[=][>]/,
      token: 'arrow-function',
    },
    {
      regex: /\w+(?=[)]\s[=][>])(?![(])/,
      token: 'function-arg',
    },
    {
      regex: /\w+(?=[[]["]|[.])/,
      token: 'function-arg-ref',
    },
    {
      regex: /AND|OR|[=][=]|[!][=]|[<][=]|[>][=]/,
      token: 'operator',
    },
    {
      regex: /\w+[:]/,
      token: 'argument',
    },
    // The regex matches the token, the token property contains the type
    {
      regex: /"(?:[^\\]|\\.)*?(?:"|$)/,
      token: 'string-double',
    },
    {
      regex: /'(?:[^\\]|\\.)*?(?:'|$)/,
      token: 'string-single',
    },
    {
      regex: /(function)(\s+)([a-z$][\w$]*)/,
      token: ['keyword', null, 'variable-2'],
    },
    {
      regex: /true|false|TRUE|FALSE/,
      token: 'boolean',
    },
    {
      regex: /null|undefined/,
      token: 'null',
    },
    {
      regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
      token: 'number',
    },
    {
      regex: /\/\/.*/,
      token: 'comment',
    },
    // A next property will cause the mode to move to a different state
    {
      regex: /\/\*/,
      token: 'comment',
      next: 'comment',
    },
    {
      regex: /[-+\/*=<>!]+/,
      token: 'operator',
    },
  ],
  // The multi-line comment state.
  comment: [
    {
      regex: /.*?\*\//,
      token: 'comment',
      next: 'start',
    },
    {
      regex: /.*/,
      token: 'comment',
    },
  ],
  // The meta property contains global information about the mode. It
  // can contain properties like lineComment, which are supported by
  // all modes, and also directives like dontIndentStates, which are
  // specific to simple modes.
  meta: {
    dontIndentStates: ['comment'],
    lineComment: '//',
  },
}

export const modeTickscript = {
  // The start state contains the rules that are intially used
  start: [
    // The regex matches the token, the token property contains the type
    {
      regex: /"(?:[^\\]|\\.)*?(?:"|$)/,
      token: 'string.double',
    },
    {
      regex: /'(?:[^\\]|\\.)*?(?:'|$)/,
      token: 'string.single',
    },
    {
      regex: /(function)(\s+)([a-z$][\w$]*)/,
      token: ['keyword', null, 'variable-2'],
    },
    // Rules are matched in the order in which they appear, so there is
    // no ambiguity between this one and the one above
    {
      regex: /(?:var|return|if|for|while|else|do|this|stream|batch|influxql|lambda)/,
      token: 'keyword',
    },
    {
      regex: /true|false|null|undefined|TRUE|FALSE/,
      token: 'atom',
    },
    {
      regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
      token: 'number',
    },
    {
      regex: /\/\/.*/,
      token: 'comment',
    },
    {
      regex: /\/(?:[^\\]|\\.)*?\//,
      token: 'variable-3',
    },
    // A next property will cause the mode to move to a different state
    {
      regex: /\/\*/,
      token: 'comment',
      next: 'comment',
    },
    {
      regex: /[-+\/*=<>!]+/,
      token: 'operator',
    },
    {
      regex: /[a-z$][\w$]*/,
      token: 'variable',
    },
  ],
  // The multi-line comment state.
  comment: [
    {
      regex: /.*?\*\//,
      token: 'comment',
      next: 'start',
    },
    {
      regex: /.*/,
      token: 'comment',
    },
  ],
  // The meta property contains global information about the mode. It
  // can contain properties like lineComment, which are supported by
  // all modes, and also directives like dontIndentStates, which are
  // specific to simple modes.
  meta: {
    dontIndentStates: ['comment'],
    lineComment: '//',
  },
}
