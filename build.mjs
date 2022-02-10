import * as fs from 'fs';
import {Parcel} from '@parcel/core';

let bundler = new Parcel({
  entries: './index.html',
  defaultConfig: '@parcel/config-default',
  mode: 'production',
  defaultTargetOptions: {
    publicUrl: './',
    distDir: './docs',
  }
});

try {
  let {bundleGraph, buildTime} = await bundler.run();
  let bundles = bundleGraph.getBundles();
  console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
  // File destination.txt will be created or overwritten by default.
  fs.copyFile('CNAME', 'docs/CNAME', (err) => {
    if (err) throw err;
    console.log('CNAME was copied to docs/CNAME');
  });
} catch (err) {
  console.log(err.diagnostics);
}