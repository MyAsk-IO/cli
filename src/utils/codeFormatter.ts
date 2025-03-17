import chalk from "chalk";
import { highlight } from "cli-highlight";

/**
 * Extracts and formats code blocks from text for terminal output.
 * @param text Input text that may contain code blocks.
 * @returns Pretty-printed and syntax-highlighted code.
 */
export function formatCodeBlocks(text: string): string {
  const codeBlockRegex = /```(\w+)?\n([\s\S]+?)```/g;

  return text.replace(codeBlockRegex, (_, lang = "plaintext", code) => {
    lang = lang.trim();

    const highlightedCode = highlight(code, {
      language: lang || "plaintext",
      ignoreIllegals: true,
    });

    return `\n${chalk.whiteBright(`${'*'.repeat(10)} [${lang.toUpperCase()}] ${'*'.repeat(10)}`)}\n\n${highlightedCode}\n${chalk.whiteBright(`${'*'.repeat(35)}`)}\n`;
  });
}
