/* eslint-disable no-console */

import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

// Babel (and other tools) look for this environment variable to know how to build the output
process.env.NODE_ENV = 'production';

webpack(webpackConfig).run((err, stats) => {
    if (err) { // so a fatal error occurred; stop here.
        console.log(chalk.red(err));
        return 1;
    }
    return 0;
});
