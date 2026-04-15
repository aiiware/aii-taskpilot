/**
 * Copyright (c) 2024 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// utils/logger.ts
import chalk from 'chalk';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LoggerOptions {
  level?: LogLevel;
  prefix?: string;
  colors?: boolean;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export class Logger {
  private level: LogLevel;
  private prefix: string;
  private colors: boolean;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level || 'info';
    this.prefix = options.prefix || 'taskpilot';
    this.colors = options.colors ?? true;
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.level];
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    let formatted = `[${timestamp}] [${this.prefix}] [${level.toUpperCase()}] ${message}`;
    
    if (this.colors) {
      switch (level) {
        case 'debug':
          formatted = chalk.gray(formatted);
          break;
        case 'info':
          formatted = chalk.blue(formatted);
          break;
        case 'warn':
          formatted = chalk.yellow(formatted);
          break;
        case 'error':
          formatted = chalk.red(formatted);
          break;
      }
    }
    
    return formatted;
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message), ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message), ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message), ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message), ...args);
    }
  }

  // Convenience methods for CLI output
  success(message: string): void {
    if (this.colors) {
      console.log(chalk.green(`✅ ${message}`));
    } else {
      console.log(`✅ ${message}`);
    }
  }

  // For structured output (like stats, lists)
  log(message: string): void {
    console.log(message);
  }
}

// Default logger instance
export const logger = new Logger();

// Create a CLI-specific logger for command output
export const cliLogger = new Logger({
  prefix: 'taskpilot',
  level: 'info',
});