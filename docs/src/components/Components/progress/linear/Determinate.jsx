import React from 'react';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';

import FakeFeed from '../FakeFeed';

const Determinate = () => <FakeFeed component={LinearProgress} determinate />;
export default Determinate;
