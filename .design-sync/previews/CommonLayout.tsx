import * as React from 'react';
import * as S from "@ds-stories/src/common/components/CommonLayout/CommonLayout.stories";

// Owned preview. CommonLayout's root is `position: fixed; inset: 0`, so in the
// single-mode card (whose .ds-single wrapper has no intrinsic height) the fixed
// layout collapses to zero height and renders blank. Wrapping the story in a
// sized, transformed container gives the fixed root a real containing block, so
// the full page layout (scene + article) renders at the declared viewport. This
// is presentation-only scaffolding for the card; the component itself is
// unchanged.

function compose(S: any, key: string) {
  const meta: any = S.default ?? {};
  const st: any = S[key];
  const args: any = { ...(meta.args ?? {}), ...(st && st.args ? st.args : {}) };
  const at: any = { ...(meta.argTypes ?? {}), ...(st && st.argTypes ? st.argTypes : {}) };
  for (const k of Object.keys(args)) {
    const m = at[k] && at[k].mapping;
    if (m && typeof m === 'object' && args[k] in m) args[k] = m[args[k]];
  }
  const title: string = typeof meta.title === 'string' ? meta.title : '';
  const ctx: any = {
    args, name: key, title, kind: title, id: '', componentId: '',
    globals: {}, viewMode: 'story',
    parameters: (st && st.parameters) ?? meta.parameters ?? {},
  };
  let render: (() => any) | null = null;
  if (st && typeof st.render === 'function') render = () => st.render(args, ctx);
  else if (typeof st === 'function') render = () => st(args, ctx);
  else if (typeof meta.render === 'function') render = () => meta.render(args, ctx);
  else {
    const C = (st && st.component) || meta.component;
    if (C) render = () => React.createElement(C, args);
  }
  if (!render) return () => null;
  const decorators: any[] = ([] as any[]).concat((st && st.decorators) ?? []).concat(meta.decorators ?? []);
  return decorators.reduce((inner: any, dec: any) => () => {
    const out = dec(inner, ctx);
    return out === undefined ? inner() : out;
  }, render);
}

function wrapFixed(Composed: any) {
  return () =>
    React.createElement(
      'div',
      {
        style: {
          position: 'relative',
          transform: 'translateZ(0)',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        },
      },
      React.createElement(Composed),
    );
}

export const Default = wrapFixed(compose(S, "Default"));
export const WithControls = wrapFixed(compose(S, "WithControls"));
