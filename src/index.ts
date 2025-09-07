#!/usr/bin/env node

import { Command } from '@commander-js/extra-typings';
import { version } from '../package.json';

const program = new Command();

program
  .name('gh-task')
  .description('Intelligent GitHub task management CLI with AI-powered assistance')
  .version(version)
  .helpOption('-h, --help', 'display help for command')
  .configureHelp({
    sortSubcommands: true,
    showGlobalOptions: true,
  })
  .showHelpAfterError('(add --help for additional information)');

// Root command action - when no subcommands are provided
program.action(() => {
  program.help();
});

// Error handling
program.exitOverride();

try {
  program.parse(process.argv);
} catch (err: unknown) {
  if (err instanceof Error && err.name === 'CommanderError') {
    console.error(err.message);
    process.exit(1);
  }
  console.error('An unexpected error occurred:', err);
  process.exit(1);
}
