import React, { Component } from 'react';
import unionClassNames from 'union-class-names';

import {
  // EditorState,
  // Modifier,
  // AtomicBlockUtils,
  RichUtils,
} from 'draft-js';

import {
  // addNewBlock,
  getCurrentBlock,
  isFirstBlock,
  isLastBlock,
} from '../utils';
import {
  // insertNewLineBefore,
  insertNewLineAfter,
  insertNewLineBoth,
} from '../utils/insertNewLine';

export default class DividerButton extends Component {
  addDivider = (event) => {
    event.preventDefault();

    const editorState = this.props.getEditorState();
    // const contentState = editorState.getCurrentContent();
    // const selectionState = contentState.getSelectionAfter();
    const isFirst = isFirstBlock(editorState);
    const isLast = isLastBlock(editorState);
    const isBoth = isFirst && isLast;
    const newDividerBlock = RichUtils.toggleBlockType(
      editorState,
      this.props.blockType,
    );
    let newEditorState;

    if (isLast) {
      newEditorState = insertNewLineAfter(
        editorState,
        getCurrentBlock(newDividerBlock),
      );
    }
    if (isBoth || isFirst) {
      newEditorState = insertNewLineBoth(
        editorState,
        getCurrentBlock(newDividerBlock),
      );
    } else {
      newEditorState = newDividerBlock;
    }

    this.props.setEditorState(newEditorState);
  };

  preventBubblingUp = (event) => {
    event.preventDefault();
  };

  blockTypeIsActive = () => {
    // if the button is rendered before the editor
    if (!this.props.getEditorState) {
      return false;
    }

    const editorState = this.props.getEditorState();
    const type = editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
      .getType();
    return type === this.props.blockType;
  };

  render() {
    const { theme } = this.props;
    const className = this.blockTypeIsActive()
      ? unionClassNames(theme.button, theme.active)
      : theme.button;

    return (
      <div className={theme.buttonWrapper} onMouseDown={this.preventBubblingUp}>
        <button className={className} onClick={this.addDivider} type="button">
          <svg
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    );
  }
}
