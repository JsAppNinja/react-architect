/* eslint-env jest*/
import React from 'react';

export default jest.fn(originalProps => {
  const { ...props } = originalProps;
  delete props.floatingLabel;
  delete props.fullWidth;
  delete props.block;
  delete props.adjustMinWidth;

  return <input type="input" {...props} />;
});
