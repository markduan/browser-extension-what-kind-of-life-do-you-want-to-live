import * as url from 'url';
import path from 'path';
import esbuild from 'esbuild';
import sveltePlugin from 'esbuild-svelte';
import sveltePreprocess from 'svelte-preprocess';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const isDev = process.argv.includes('--dev');
const isProduction = process.argv.includes('--production');

// Live reload script for development
const liveReloadScript = `
  new EventSource('http://localhost:3000/esbuild').addEventListener('change', () => location.reload());
`;

const configs = {
  sourcemap: isDev ? 'inline' : false,
  entryPoints: [path.join(__dirname, 'src/index.ts')],
  mainFields: ['svelte', 'browser', 'module', 'main'],
  conditions: ['svelte', 'browser'],
  bundle: true,
  minify: isProduction,
  plugins: [
    sveltePlugin({
      compilerOptions: { css: 'injected' },
      preprocess: sveltePreprocess(),
    })
  ],
  outfile: path.join(__dirname, 'dist/index.js'),
  banner: isDev ? { js: liveReloadScript } : {},
};

async function run() {
  if (isDev) {
    const ctx = await esbuild.context(configs);
    await ctx.watch();
    await ctx.serve({
      servedir: __dirname,
      port: 3000,
    });
    console.log('Development server running at http://localhost:3000');
    console.log('Live reload enabled');
  } else {
    await esbuild.build(configs);
    console.log('Build complete!');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
