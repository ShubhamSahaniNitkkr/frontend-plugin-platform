import { c as createComponent, r as renderHead, a as renderComponent, b as renderTemplate } from '../chunks/astro/server_Bu46jtWG.mjs';
import 'piccolore';
import 'html-escaper';
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Login - Frontend Plugin Platform</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body> ${renderComponent($$result, "Root", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/shubhamsunny/Documents/Projects/frontend-plugin-platform/apps/host/src/components/Root", "client:component-export": "Root" })} </body></html>`;
}, "/Users/shubhamsunny/Documents/Projects/frontend-plugin-platform/apps/host/src/pages/login.astro", void 0);

const $$file = "/Users/shubhamsunny/Documents/Projects/frontend-plugin-platform/apps/host/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
