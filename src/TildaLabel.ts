import { blueTintedDarkenColor } from './variables';

// NOTE: Tilda has a some kind of protection for its both label nodes and styles

/*
 * interface UpdatedRule {
 *   selectorText: string;
 *   oldValue: string | null;
 *   newValue: string;
 *   index: number;
 *   sheetIndex: number;
 * }
 *
 * function updateCSSRule(selector: string, property: string, newValue: string): UpdatedRule[] {
 *   const updates: UpdatedRule[] = [];
 *   for (let sheetIndex = 0; sheetIndex < document.styleSheets.length; sheetIndex++) {
 *     const sheet = (document.styleSheets as any)[sheetIndex];
 *     try {
 *       const rules = sheet.cssRules || sheet.rules;
 *       for (let ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
 *         const rule = rules[ruleIndex] as CSSStyleRule;
 *         if (rule.selectorText?.includes(selector)) {
 *           const oldValue = rule.style.getPropertyValue(property);
 *           rule.style.setProperty(property, newValue, rule.style.getPropertyPriority(property));
 *           updates.push({
 *             selectorText: rule.selectorText!,
 *             oldValue,
 *             newValue,
 *             index: ruleIndex,
 *             sheetIndex,
 *           });
 *         }
 *       }
 *     } catch (error) {
 *       console.warn(`Cannot access stylesheet ${sheetIndex}:`, error?.message, {
 *         error,
 *       });
 *       debugger; // eslint-disable-line no-debugger
 *     }
 *   }
 *   return updates;
 * }
 */

export function initTildaLabel() {
  const tildalabel = document.querySelector<HTMLDivElement>('.t-tildalabel');
  // const tildacopy = document.getElementById('tildacopy');
  if (tildalabel) {
    tildalabel.style.backgroundColor = blueTintedDarkenColor;
  }
  // const changes = updateCSSRule('.t-tildalabel', 'background-color', blueTintedDarkenColor);
}
