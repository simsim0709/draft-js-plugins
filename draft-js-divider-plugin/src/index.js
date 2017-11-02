import React from 'react';

import DefaultDivider from './components/DefaultDivider';
import DividerButton from './components/DividerButton';

import buttonStyles from './buttonStyles.css';

import addDivider from './modifiers/addDivider';

const createDividerPlugin = (
  { blockType = 'divider', component = DefaultDivider } = {}
) => ({
  blockRendererFn: block => {
    if (block.getType() === blockType) {
      return {
        component,
        editable: false,
      };
    }
  },
  DividerButton: props => (
    <DividerButton
      {...props}
      addDivider={addDivider(blockType)}
      theme={buttonStyles}
    />
  ),
  addDivider: addDivider(blockType),
});

export default createDividerPlugin;
