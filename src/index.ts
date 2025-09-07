#!/usr/bin/env node

import { Command } from '@commander-js/extra-typings';
import { version } from '../package.json';

const program = new Command();

program
  .name('gh-task')
  .description('Intelligent GitHub task management CLI with AI-powered assistance')
  .version(version);

program.parse();
