// @flow
import Term, * as S from 'sweet-spec';
import type Syntax from './syntax';
import type { SymbolClass } from './symbol';
import type BindingMap from './binding-map';

export default class extends Term.CloneReducer {
  scopes: Array<{ scope: SymbolClass, phase: number | {}, flip: boolean }>;
  bindings: BindingMap;

  constructor(scopes: Array<{ scope: SymbolClass, phase: number | {}, flip: boolean }>, bindings: BindingMap) {
    super();
    this.scopes = scopes;
    this.bindings = bindings;
  }

  reduceRawSyntax(t: Term, s: { value: Syntax }) {
    let newVal = this.scopes.reduce((acc, sc) => {
      return acc.addScope(sc.scope, this.bindings, sc.phase, { flip: sc.flip });
    }, s.value);
    return new S.RawSyntax({
      value: newVal
    });
  }
}
