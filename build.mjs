import { readFile, writeFile } from 'node:fs/promises';
const root = new URL('./', import.meta.url);
let html = await readFile(new URL('index.html', root), 'utf8');
for (const file of ['three.min.js', 'OrbitControls.js', 'TransformControls.js']) {
  const source = await readFile(new URL('vendor/' + file, root), 'utf8');
  html = html.replace('<script src="vendor/' + file + '"></script>', () => '<script>\n' + source.replaceAll('</script', '<\\/script') + '\n</script>');
}
const license = await readFile(new URL('vendor/THREE-LICENSE.txt', root), 'utf8');
html = html.replace('<html lang="zh-CN">', () => '<html lang="zh-CN">\n<!--\nThree.js r128, OrbitControls and TransformControls\n' + license + '\n-->');
await writeFile(new URL('方间-积木工作台.html', root), html);
console.log('Built offline HTML');
