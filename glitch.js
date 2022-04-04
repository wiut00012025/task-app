
const fs = require('fs');
const archiver = require('archiver');
const output = fs.createWriteStream(`glitch_release_${+new Date()}.zip`);
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

const DomainHost = 'your-project-name.glitch.me';

output.on('close', () => {
  // eslint-disable-next-line no-console
  console.log(`${archive.pointer()} total bytes`);
  // eslint-disable-next-line no-console
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

output.on('end', () => {
  // eslint-disable-next-line no-console
  console.log('Data has been drained');
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    // log warning
    // eslint-disable-next-line no-console
    console.warn(err);
  } else {
    // throw error
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

archive.directory('views/', 'views');
archive.glob('data/**/*', { ignore: ['data/applications.json'] });
archive.directory('public/', 'public');
archive.directory('routes/', 'routes');
archive.directory('services/', 'services');
archive.directory('utils/', 'utils');
archive.file('package-lock.json', { name: 'package-lock.json' });
archive.file('README.md', { name: 'README.md' });
archive.file('app.js', { name: 'app.js' });

const applications = JSON.parse(fs.readFileSync('./data/applications.json', 'utf8'));
applications[0].domain = DomainHost;
applications[0].email_domain = DomainHost;
archive.append(JSON.stringify(applications, ' ', 2), { name: 'data/applications.json' });

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
packageJson.scripts.start = `URL_SCHEMA=https ${packageJson.scripts.start}`;
archive.append(JSON.stringify(packageJson, ' ', 2), { name: 'package.json' });

archive.finalize();