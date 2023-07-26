import pino from 'pino';
import tracer from 'dd-trace';
import { AppConfig } from 'config';

const isProduction = process.env.NODE_ENV === 'production';

const prodOptions = { level: 'info' as const, stream: process.stdout };

const devOptions = {
  level: 'debug' as const,
  stream: process.stdout,
};

tracer.init({
  logInjection: true,
  service: AppConfig.logs.serviceName,
});

let streams = [isProduction ? prodOptions : devOptions];

if (AppConfig.logs.hideLogs) {
  streams = [];
}

export const logger = pino(
  {
    formatters: {
      bindings() {
        return {};
      },
      level(level) {
        return { level };
      },
    },
    level: 'debug',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.multistream(streams),
);
