/** @type {import('lint-staged').Config} */
export default {
  // Run on staged files that match these patterns
  '**/*.{ts,tsx,json,css,scss,sass,less,md}': (files) => {
    const results = [];

    // Format/validate JSON, Markdown, and CSS files (no ESLint in this project)
    const formatFiles = files.filter(
      (f) => f.endsWith('.json') || f.endsWith('.md') || f.endsWith('.css'),
    );
    if (formatFiles.length > 0) {
      results.push(
        `npx prettier --check --cache --no-error-on-unmatched-pattern ${formatFiles.join(' ')}`,
      );
    }

    // Run TypeScript type-check on TypeScript files
    const tsFiles = files.filter((f) => f.endsWith('.ts') || f.endsWith('.tsx'));
    if (tsFiles.length > 0) {
      results.push(`npx tsc --noEmit --pretty false --incremental false`);
    }

    // Run affected unit tests
    const testFiles = files.filter((f) =>
      /\.(test|spec)\.(ts|tsx)$/.test(f),
    );
    if (testFiles.length > 0) {
      results.push(`npx vitest run --files="${testFiles.join(' ')}" --reporter=dot`);
    }

    return results;
  },
};
