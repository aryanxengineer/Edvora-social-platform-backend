import { devLogger } from "./dev.logger.js";
import { prodLogger } from "./prod.logger.js";
import { stagingLogger } from "./stag.lopper.js";
import { testLogger } from "./test.logger.js";
const loggerByEnv = {
    development: devLogger,
    production: prodLogger,
    staging: stagingLogger,
    test: testLogger,
};
const env = process.env.NODE_ENV ?? "development";
export const logger = loggerByEnv[env] ?? devLogger;
//# sourceMappingURL=index.js.map