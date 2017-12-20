/* eslint-disable react/no-array-index-key */
import React from 'react';

export default class BlockTypeSelect extends React.Component {
  state = {
    style: {
      display: 'flex',
      flexFlow: 'column nowrap',
      transform: 'translate(-50%) scale(1)',
    },
  };

  onMouseDown = clickEvent => {
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
  };

  render() {
    const { theme, getEditorState, setEditorState } = this.props;
    return (
      <div onMouseDown={this.onClick}>
        <div style={this.state.style}>
          {this.props.structure.map((Component, index) => (
            <Component
              key={index}
              getEditorState={getEditorState}
              setEditorState={setEditorState}
              theme={theme.buttonStyles}
            />
          ))}
        </div>
      </div>
    );
  }
}
