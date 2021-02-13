const { info, logger } = require('./module');
const My = require('./moduleClass');

info('info-test');
logger('logger-test');

const variable = new My();

variable.info('variable-info-test');
variable.logger('variable-logger-test');
