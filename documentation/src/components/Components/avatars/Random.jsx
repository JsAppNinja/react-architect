import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import Subheader from 'react-md/lib/Subheaders';

const style = { margin: '1em' };

const Random = () => (
  <ul className="md-list-unstyled">
    <Subheader primaryText="All default colors" />
    {Avatar.defaultProps.suffixes.map(suffix => (
      <Avatar key={suffix} suffix={suffix} style={style}>
        {suffix.charAt(0).toUpperCase()}
      </Avatar>
    ))}
  </ul>
);

export default Random;
