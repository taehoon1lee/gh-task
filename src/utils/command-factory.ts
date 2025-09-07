import { Command } from '@commander-js/extra-typings';
import { GlobalOptions } from '../types';

export function createBaseCommand(name: string, description: string): Command {
  const command = new Command(name);
  
  command
    .description(description)
    .configureHelp({
      sortSubcommands: true,
      showGlobalOptions: true,
    });

  return command;
}

export function addGlobalOptions(command: Command): Command {
  return command
    .option('-c, --config <path>', 'path to configuration file')
    .option('-v, --verbose', 'enable verbose output', false)
    .option('--offline', 'work in offline mode', false);
}

export function extractGlobalOptions(command: Command): GlobalOptions {
  const opts = command.opts() as Partial<GlobalOptions>;
  return {
    config: opts.config,
    verbose: opts.verbose || false,
    offline: opts.offline || false,
  };
}