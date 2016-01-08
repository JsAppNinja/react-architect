import React from 'react';
import { Switch } from 'react-md/SelectionControls';

export default function SwitchExamples() {
  return (
    <div>
      <Switch label="Some switch" />
      <Switch label="Initially checked" isInitiallyChecked={true} />
      <Switch label="Disabled" disabled />
    </div>
  );
}
