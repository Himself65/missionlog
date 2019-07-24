import { log } from '../src';

let buffer: string;
log.init({ loader: 'INFO', security: 'ERROR', system: 'OFF' }, (level, category, msg, params): void => {
  buffer += `${level}: [${category}] ${msg}`;
  for (const param of params) {
    buffer += `, ${param}`;
  }
  // console.log(`${level}: [${category}]`, msg, ...params);
});

test('log info', (): void => {
  const category = 'loader';
  const msg = 'asset failed to load';
  const url = 'image.png';
  buffer = '';
  log.info(category, msg, url);
  expect(buffer).toBe(`INFO: [${category}] ${msg}, ${url}`);
});

test('log warning', (): void => {
  const category = 'loader';
  const msg = 'asset failed to load';
  buffer = '';
  log.warn(category, msg);
  expect(buffer).toBe(`WARN: [${category}] ${msg}`);
});

test('log error', (): void => {
  const category = 'security';
  const msg = 'login failed';
  buffer = '';
  log.error(category, msg);
  expect(buffer).toBe(`ERROR: [${category}] ${msg}`);
});

test('filter category', (): void => {
  const category = 'security';
  const msg = 'login success';
  buffer = '';
  log.info(category, msg);
  expect(buffer).toBe('');
});

test('silent category', (): void => {
  const category = 'system';
  const msg = 'warp core breach';
  buffer = '';
  log.info(category, msg);
  expect(buffer).toBe('');
});

test('log objects', (): void => {
  const category = 'loader';
  const msg = 'logging objects works!';
  const param1 = { foo: 'bar' };
  const param2 = { foo: 'baz' };
  buffer = '';
  log.info(category, msg, param1, param2);
  expect(buffer).toBe(`INFO: [${category}] ${msg}, ${param1}, ${param2}`);
});

test('uninitialized ccategory', (): void => {
  const category = 'transporter';
  const msg = 'evil twin detected';
  const expected = `ERROR: [missionlog] uninitialized category "${category}"WARN: [${category}] ${msg}`;
  buffer = '';
  log.warn(category, msg);
  expect(buffer).toBe(expected);
});

test('update config', (): void => {
  log.init({ loader: 'ERROR', system: 'INFO' });
  const category = 'system';
  const msg = 'warp core breach';
  buffer = '';
  log.warn(category, msg);
  expect(buffer).toBe(`WARN: [${category}] ${msg}`);
});
