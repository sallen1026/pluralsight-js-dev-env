/*
This file contains references to vendor libraries
we're using in this project.  This is used by webpack
in the production build *only*.

A separate bundle for vendor code is useful since it is
unlikely to change as often as the application's code. So
all the libraries we reference here will be written to
vendor.js so they can be cached until one of them
changes.

They only have to download the vendor.js when a vendor
library changes which should be less frequent.

Any files that aren't referenced here will be bundled
into main.js for the production build.
*/

/* eslint-disable no-unused-vars */

import fetch from 'whatwg-fetch';

/*  This is wehere you'd reference stuff like vue, angular, react, etc.
    Tny 3rd party tools that you use could be listed in this file.
    Anything that we define here will be bundled up into a file called vendor.js

    Of course, if you wanted separate bundles for separate pages of your app,
    you could use the same pattern.

    Just add one entry point per page in your production webpack config
*/
