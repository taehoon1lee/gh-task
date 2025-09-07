export interface GlobalOptions {
  config?: string;
  verbose?: boolean;
  offline?: boolean;
}

export interface CommandContext {
  options: GlobalOptions;
  args: string[];
}

export interface TaskData {
  id: string;
  title: string;
  description?: string;
  status: 'open' | 'in-progress' | 'closed';
  assignee?: string;
  labels?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Config {
  github: {
    token: string;
    repository: string;
    owner: string;
  };
  ai: {
    provider: 'openai' | 'anthropic';
    apiKey: string;
  };
  defaults: {
    labels: string[];
    assignee?: string;
  };
}