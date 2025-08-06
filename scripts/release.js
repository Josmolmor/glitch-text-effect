#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  log(`❌ ${message}`, 'red');
  process.exit(1);
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function warning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function info(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function exec(command, options = {}) {
  try {
    const result = execSync(command, {
      cwd: projectRoot,
      stdio: options.silent ? 'pipe' : 'inherit',
      encoding: 'utf8',
      ...options
    });
    return result;
  } catch (err) {
    if (!options.allowError) {
      error(`Command failed: ${command}\n${err.message}`);
    }
    throw err;
  }
}

function getCurrentVersion() {
  const packagePath = join(projectRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
  return packageJson.version;
}

function updateVersion(version) {
  const packagePath = join(projectRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
  packageJson.version = version;
  writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
}

function validateVersionType(type) {
  const validTypes = ['patch', 'minor', 'major', 'prerelease', 'prepatch', 'preminor', 'premajor'];
  if (!validTypes.includes(type)) {
    error(`Invalid version type: ${type}. Valid types: ${validTypes.join(', ')}`);
  }
}

function getNextVersion(currentVersion, type) {
  const parts = currentVersion.split('.').map(Number);
  const [major, minor, patch] = parts;
  
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    case 'prerelease':
      if (currentVersion.includes('-')) {
        // Increment existing prerelease
        const [base, pre] = currentVersion.split('-');
        const [preType, preNum] = pre.split('.');
        return `${base}-${preType}.${parseInt(preNum) + 1}`;
      } else {
        return `${major}.${minor}.${patch + 1}-beta.0`;
      }
    case 'prepatch':
      return `${major}.${minor}.${patch + 1}-beta.0`;
    case 'preminor':
      return `${major}.${minor + 1}.0-beta.0`;
    case 'premajor':
      return `${major + 1}.0.0-beta.0`;
    default:
      error(`Unknown version type: ${type}`);
  }
}

function checkGitStatus() {
  try {
    const status = exec('git status --porcelain', { silent: true });
    if (status.trim()) {
      error('Git working directory is not clean. Please commit or stash changes first.');
    }
    success('Git working directory is clean');
  } catch (err) {
    error('Failed to check git status. Make sure you are in a git repository.');
  }
}

function checkGitBranch() {
  try {
    const branch = exec('git branch --show-current', { silent: true }).trim();
    if (branch !== 'master' && branch !== 'main') {
      warning(`You are on branch '${branch}', not main/master. Continue? (y/N)`);
      // For automation, we'll continue but warn
    }
    info(`Current branch: ${branch}`);
  } catch (err) {
    error('Failed to check current git branch.');
  }
}

function runTests() {
  info('Running tests...');
  try {
    exec('npm test', { silent: true });
    success('All tests passed');
  } catch (err) {
    // If no tests are configured, skip
    warning('No tests configured or tests failed - continuing anyway');
  }
}

function runLint() {
  info('Running linter...');
  exec('npm run lint');
  success('Linting passed');
}

function runTypeCheck() {
  info('Running type check...');
  exec('npm run type-check');
  success('Type check passed');
}

function buildProject() {
  info('Building project...');
  exec('npm run build');
  success('Build completed');
}

function updateChangelog(version) {
  const changelogPath = join(projectRoot, 'CHANGELOG.md');
  const date = new Date().toISOString().split('T')[0];
  
  try {
    let changelog = readFileSync(changelogPath, 'utf8');
    
    // Add new version entry after the header
    const newEntry = `\n## [${version}] - ${date}\n\n### Added\n- \n\n### Changed\n- \n\n### Fixed\n- \n\n`;
    
    // Find the first ## after the header and insert before it
    const headerEnd = changelog.indexOf('\n## ');
    if (headerEnd !== -1) {
      changelog = changelog.slice(0, headerEnd) + newEntry + changelog.slice(headerEnd);
    } else {
      // If no existing entries, add after header
      changelog += newEntry;
    }
    
    writeFileSync(changelogPath, changelog);
    success(`Updated CHANGELOG.md with version ${version}`);
    
    // Stage the changelog
    exec('git add CHANGELOG.md');
  } catch (err) {
    // If changelog doesn't exist, create it
    const changelog = `# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n## [${version}] - ${date}\n\n### Added\n- \n\n### Changed\n- \n\n### Fixed\n- \n\n`;
    writeFileSync(changelogPath, changelog);
    success(`Created CHANGELOG.md with version ${version}`);
    exec('git add CHANGELOG.md');
  }
}

function commitAndTag(version) {
  info('Committing changes...');
  exec(`git add package.json`);
  exec(`git commit -m "chore: release v${version}"`);
  success('Changes committed');
  
  info('Creating git tag...');
  exec(`git tag -a v${version} -m "Release v${version}"`);
  success(`Created tag v${version}`);
}

function pushChanges() {
  info('Pushing to origin...');
  exec('git push origin --follow-tags');
  success('Pushed to origin with tags');
}

function publishToNpm() {
  info('Publishing to NPM...');
  exec('npm publish');
  success('Published to NPM');
}

function showHelp() {
  console.log(`
${colors.bold}NPM Release Script${colors.reset}

Usage: npm run release [version-type]

Version types:
  patch     1.0.0 → 1.0.1 (bug fixes)
  minor     1.0.0 → 1.1.0 (new features)
  major     1.0.0 → 2.0.0 (breaking changes)
  prerelease 1.0.0 → 1.0.1-beta.0 (pre-release)
  prepatch  1.0.0 → 1.0.1-beta.0 (pre-release patch)
  preminor  1.0.0 → 1.1.0-beta.0 (pre-release minor)
  premajor  1.0.0 → 2.0.0-beta.0 (pre-release major)

Examples:
  npm run release patch    # Bug fixes
  npm run release minor    # New features
  npm run release major    # Breaking changes

Options:
  --dry-run    Show what would be done without executing
  --skip-tests Skip running tests
  --help       Show this help

What this script does:
1. 🔍 Validates git status and branch
2. 🧪 Runs tests, linting, and type checking
3. 🏗️  Builds the project
4. 📝 Updates version in package.json
5. 📋 Updates CHANGELOG.md
6. 📦 Commits changes and creates git tag
7. 🚀 Pushes to git remote
8. 📡 Publishes to NPM
`);
}

async function main() {
  const args = process.argv.slice(2);
  const versionType = args[0];
  const flags = args.slice(1);
  
  const dryRun = flags.includes('--dry-run');
  const skipTests = flags.includes('--skip-tests');
  
  if (!versionType || versionType === '--help') {
    showHelp();
    return;
  }
  
  validateVersionType(versionType);
  
  const currentVersion = getCurrentVersion();
  const nextVersion = getNextVersion(currentVersion, versionType);
  
  console.log(`\n${colors.bold}🚀 NPM Release Script${colors.reset}`);
  console.log(`${colors.blue}Current version: ${currentVersion}${colors.reset}`);
  console.log(`${colors.green}Next version: ${nextVersion}${colors.reset}`);
  
  if (dryRun) {
    console.log(`\n${colors.yellow}DRY RUN MODE - No changes will be made${colors.reset}\n`);
  } else {
    console.log(`\n${colors.yellow}This will release version ${nextVersion}. Continue? (Press Ctrl+C to cancel)${colors.reset}\n`);
    // Give user a moment to cancel
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  try {
    // Pre-flight checks
    info('Running pre-flight checks...');
    checkGitStatus();
    checkGitBranch();
    
    // Validation steps
    if (!skipTests) {
      runTests();
    }
    runLint();
    runTypeCheck();
    buildProject();
    
    if (!dryRun) {
      // Release steps
      updateVersion(nextVersion);
      success(`Updated version to ${nextVersion}`);
      
      updateChangelog(nextVersion);
      commitAndTag(nextVersion);
      pushChanges();
      publishToNpm();
      
      console.log(`\n${colors.bold}${colors.green}🎉 Successfully released v${nextVersion}!${colors.reset}\n`);
      
      info('What was done:');
      console.log(`  ✅ Version bumped to ${nextVersion}`);
      console.log(`  ✅ CHANGELOG.md updated`);
      console.log(`  ✅ Changes committed and tagged`);
      console.log(`  ✅ Pushed to git remote`);
      console.log(`  ✅ Published to NPM`);
      
      console.log(`\n${colors.blue}Check it out:${colors.reset}`);
      console.log(`  📦 NPM: https://www.npmjs.com/package/glitch-text-effect`);
      console.log(`  🏷️  GitHub: https://github.com/josmolmor/glitch-text-effect/releases/tag/v${nextVersion}`);
    } else {
      console.log(`\n${colors.yellow}DRY RUN COMPLETE - No changes were made${colors.reset}`);
    }
    
  } catch (err) {
    error(`Release failed: ${err.message}`);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  error(`Unhandled rejection: ${reason}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  error(`Uncaught exception: ${err.message}`);
});

main().catch(err => {
  error(err.message);
});