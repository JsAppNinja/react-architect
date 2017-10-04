import React from 'react';
import { Button, SVGIcon } from 'react-md';

import done from 'icons/done.svg';

const Flat = () => (
  <div className="buttons__group">
    <h5>Theme Examples</h5>
    <Button flat>Hello, World!</Button>
    <Button flat primary iconChildren="chat_bubble_outline">Chat</Button>
    <Button flat secondary iconBefore={false} iconChildren="chat_bubble_outline">Chat</Button>
    <Button flat primary iconEl={<SVGIcon use={done.url} />}>Done</Button>
    <Button flat secondary iconBefore={false} iconEl={<SVGIcon use={done.url} />}>Done</Button>
    <h5>Disabled Examples</h5>
    <Button flat disabled>Disabled Button</Button>
    <Button flat disabled iconChildren="close">Disabled Button</Button>
    <h5>Theme Swapped Examples</h5>
    <Button flat primary swapTheming>Hello</Button>
    <Button flat secondary swapTheming>World</Button>
  </div>
);

export default Flat;
