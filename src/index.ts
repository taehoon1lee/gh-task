#!/usr/bin/env node

import { Command } from '@commander-js/extra-typings';

const program = new Command();

program
  .name('gh-task')
  .description('Intelligent GitHub task management CLI with AI-powered assistance')
  .version('0.1.0');

program.parse();
