# GitHub Task Management CLI

Intelligent GitHub task management CLI with AI-powered assistance for streamlining development workflows.

## Features

- **TypeScript-first**: Built with full TypeScript support for type safety and better developer experience
- **Commander.js Framework**: Robust CLI framework with subcommands, global options, and comprehensive help system
- **AI Integration Ready**: Designed to integrate with AI services for intelligent task management
- **Extensible Architecture**: Modular design allows for easy feature additions and customization

## Installation

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Development Installation

```bash
# Clone the repository
git clone https://github.com/taehoon1lee/gh-task.git
cd gh-task

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev:ts -- --help
```

### Global Installation

```bash
# Link for global usage during development
npm link

# Use globally
gh-task --help
```

## Usage

### Basic Commands

```bash
# Show help
gh-task --help

# Show version
gh-task --version

# Development mode with TypeScript
npm run dev:ts -- [command] [options]
```

### Available Options

Currently available options:
- `-V, --version` - Output the version number
- `-h, --help` - Display help for command

### Planned Global Options (Coming in Phase 2)

The following global options are planned but not yet implemented:
- `-c, --config <path>` - Path to configuration file *(planned)*
- `-v, --verbose` - Enable verbose output *(planned)*
- `--offline` - Work in offline mode *(planned)*

## Architecture

### Project Structure

```
github-task/
├── src/
│   ├── index.ts              # Main CLI entry point
│   ├── types.ts              # TypeScript type definitions
│   └── utils/
│       └── command-factory.ts # Command creation utilities
├── lib/                      # Compiled JavaScript output
├── tests/                    # Test files
└── package.json
```

### Core Components

#### CLI Framework (`src/index.ts`)
- Commander.js integration with TypeScript support
- Global option handling and help system
- Error handling and process management
- Dynamic version loading from package.json

#### Type Definitions (`src/types.ts`)
- `GlobalOptions` - CLI global flags interface
- `CommandContext` - Command execution context
- `TaskData` - Task management data structure  
- `Config` - Application configuration interface

#### Command Factory (`src/utils/command-factory.ts`)
- `createBaseCommand()` - Consistent command creation
- `addGlobalOptions()` - Global CLI flags setup
- `extractGlobalOptions()` - Type-safe option parsing

## Development

### Scripts

```bash
# Development with auto-reload
npm run dev

# TypeScript development
npm run dev:ts

# Build project
npm run build

# Watch mode build
npm run build:watch

# Lint code
npm run lint
npm run lint:fix

# Format code
npm run format

# Run tests
npm run test

# Type checking
npm run typecheck

# Clean build artifacts
npm run clean
```

### Code Quality

- **ESLint**: Configured with TypeScript support and Prettier integration
- **Prettier**: Consistent code formatting
- **TypeScript**: Full type checking and compilation
- **Jest**: Testing framework (configured but tests to be implemented)

### Git Workflow

```bash
# Pre-commit hook runs automatically
git commit -m "feat: your feature"

# Or run manually
npm run precommit
```

## Contributing

### Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Implement Changes**
   - Follow existing code patterns and TypeScript conventions
   - Add tests for new functionality
   - Update documentation as needed

3. **Quality Checks**
   ```bash
   npm run lint        # Fix linting issues
   npm run typecheck   # Ensure type safety
   npm run test        # Run test suite
   npm run build       # Verify build success
   ```

4. **Submit Pull Request**
   - Ensure all checks pass
   - Provide clear description of changes
   - Reference related issues

### Code Style Guidelines

- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for public APIs
- Prefer explicit typing over `any`
- Use nullish coalescing (`??`) over logical OR (`||`) for default values

### Type Safety Best Practices

- Avoid unsafe type assertions (`as` keyword)
- Use type guards for runtime type checking
- Prefer `Boolean()` for explicit boolean conversion
- Validate external data at boundaries

## Roadmap

### Phase 1: Core CLI Framework ✅
- [x] Commander.js integration with TypeScript
- [x] Global options and help system  
- [x] Error handling and type safety
- [x] Build and development workflow

### Phase 2: Command Implementation 🚧
- [ ] Global flags functionality (`--config`, `--verbose`, `--offline`)
- [ ] Command hierarchy (add, list, show, edit, done)
- [ ] Shell auto-completion support
- [ ] Configuration file management

### Phase 3: GitHub Integration 📋
- [ ] GitHub API integration
- [ ] Issue and PR management
- [ ] Repository task synchronization
- [ ] Branch-based workflow support

### Phase 4: AI Enhancement 🤖
- [ ] AI-powered task suggestions
- [ ] Intelligent prioritization
- [ ] Automated task breakdown
- [ ] Context-aware assistance

## License

ISC License - see package.json for details

## Support

- **Issues**: [GitHub Issues](https://github.com/taehoon1lee/gh-task/issues)
- **Documentation**: This README and inline code comments
- **Development**: Follow the contributing guidelines above

---

Built with ❤️ using Node.js, TypeScript, and Commander.js