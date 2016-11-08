import React from 'react';

import SimpleContinuousExamples from './SimpleContinuousExamples';
import SimpleContinuousExamplesRaw from '!!raw!./SimpleContinuousExamples';
import SimpleDiscreteExamples from './SimpleDiscreteExamples';
import SimpleDiscreteExamplesRaw from '!!raw!./SimpleDiscreteExamples';
import IconExamples from './IconExamples';
import IconExamplesRaw from '!!raw!./IconExamples';
import EditableExample from './EditableExample';
import EditableExampleRaw from '!!raw!./EditableExample';
import EditableExampleSCSS from '!!raw!./_editable-example.scss';

export default [{
  title: 'Simple Continuous Example',
  code: SimpleContinuousExamplesRaw,
  children: <SimpleContinuousExamples />,
}, {
  title: 'Simple Discrete Examples',
  code: SimpleDiscreteExamplesRaw,
  children: <SimpleDiscreteExamples />,
}, {
  title: 'With Icon Examples',
  code: IconExamplesRaw,
  children: <IconExamples />,
}, {
  title: 'Editable Example',
  code: `
/* EditableExample.jsx */
${EditableExampleRaw}
\`\`\`

\`\`\`scss
/* _editable-example.scss */
${EditableExampleSCSS}
`,
  children: <EditableExample />,
}];
