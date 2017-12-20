import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// SideToolbar;
// import SimpleSideToolbarEditor from './SideToolbar/SimpleSideToolbarEditor';

// storiesOf('Side Toolbar Plugin').add('Editor with SideToolbar Plugin', () => (
//   <SimpleSideToolbarEditor />
// ));

// Divider
import SimpleDividerEditor from './Divider/SimpleDividerEditor';

storiesOf('Divider Plugin').add('Editor with Divider Plugin', () => (
  <SimpleDividerEditor />
));
