import * as url from 'url';
import path from 'path';
import esbuild from 'esbuild';
import sveltePlugin from 'esbuild-svelte';

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const watchMode = !!process.env.WATCH;

const configs = {
  // sourcemap: 'external',
  sourcemap: 'inline',
  entryPoints: [path.join(__dirname, 'src/index.js')],
  mainFields: ['svelte', 'browser', 'module', 'main'],
  conditions: ['svelte', 'browser'],
  bundle: true,
  minify: !watchMode,
  plugins: [sveltePlugin({ compilerOptions: { css: 'injected' }})],
  outfile: path.join(__dirname, 'dist/index.js'),
};

async function run() {
  if (watchMode) {
    return await esbuild
      .context(configs)
      .then((ctx) => {
        return ctx.watch();
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  }

  return esbuild.build(configs).catch((err) => {
    console.log(err);
    process.exit(1);
  });
}

run();
