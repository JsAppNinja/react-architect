import React from 'react';
import Chip from 'react-md/Chip';
import Avatar from 'react-md/Avatar';

export default function ChipExamples() {
  return (
    <div>
      <Chip label="Example chip">
        <Avatar random>A</Avatar>
      </Chip>
      <Chip label="Example chip" remove={() => console.log('Removing a chip')} />
      <Chip label="Example chip" remove={() => console.log('Removing a chip')}>
        <Avatar random>A</Avatar>
      </Chip>
    </div>
  );
}
