import { c as createComponent, r as renderHead, a as renderComponent, b as renderTemplate } from '../chunks/astro/server_Bu46jtWG.mjs';
import 'piccolore';
import 'html-escaper';
export { renderers } from '../renderers.mjs';

function getStaticPaths() {
  return [
    "marketplace",
    "plugins/dashboard",
    "plugins/com.fpp.calculator",
    "plugins/com.fpp.task-manager/tasks",
    "plugins/com.fpp.reports"
  ].map((slug) => ({ params: { slug } }));
}
const $$ = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Frontend Plugin Platform</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body> ${renderComponent($$result, "Root", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/shubhamsunny/Documents/Projects/frontend-plugin-platform/apps/host/src/components/Root", "client:component-export": "Root" })} </body></html>`;
}, "/Users/shubhamsunny/Documents/Projects/frontend-plugin-platform/apps/host/src/pages/[...slug].astro", void 0);

const $$file = "/Users/shubhamsunny/Documents/Projects/frontend-plugin-platform/apps/host/src/pages/[...slug].astro";
const $$url = "/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
