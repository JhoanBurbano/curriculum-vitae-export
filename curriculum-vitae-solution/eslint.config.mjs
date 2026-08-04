import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Adherencia al design system JSB.
 *
 * La fuente de verdad es `_adherence.oxlintrc.json` del proyecto de Claude Design
 * "JSB Design System", que indexa los 62 tokens de la marca. Aquí se traducen sus
 * dos reglas a ESLint (`no-restricted-syntax` acepta los mismos selectores esquery),
 * para no añadir oxlint como dependencia y que corran con el `npm run lint` de siempre.
 *
 * Diferencia deliberada con el config original: la regla de px del design system apunta
 * a cualquier literal con `\d+px`, lo que en Tailwind marcaría 25 falsos positivos
 * (`min-w-[200px]`, `[text-shadow:0_2px_18px_...]`, `text-[10px]`) que son valores
 * arbitrarios legítimos, no drift. Aquí se acota a props `style` inline, donde un px
 * crudo sí es un token que se escapó.
 */
const designSystemAdherence = {
  files: ["src/**/*.{ts,tsx}"],
  rules: {
    "no-restricted-syntax": [
      "error",
      {
        selector: "Literal[value=/#[0-9a-fA-F]{3,8}\\b/]",
        message:
          "Color hex crudo — usa un token del design system vía var(--token). Definidos en src/app/globals.css.",
      },
      {
        selector: "JSXAttribute[name.name='style'] Literal[value=/\\b\\d+px\\b/]",
        message:
          "Valor px crudo en style inline — usa un token de espaciado del design system vía var(--token).",
      },
    ],
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  designSystemAdherence,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
