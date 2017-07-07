import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';

const examples = [];

const LinearProgress = () => <ExamplesPage description={README} examples={examples} />;
export default LinearProgress;
