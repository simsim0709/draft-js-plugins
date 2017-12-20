import React, { Component } from 'react';
import { convertToRaw } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createDividerPlugin from 'draft-js-divider-plugin';

import editorStyles from './editorStyles.css';

const dividerPlugin = createDividerPlugin();

const plugins = [dividerPlugin];
const text = '';

export default class SimpleDividerEditor extends Component {
  state = {
    editorState: createEditorStateWithText(text),
  };

  onChange = editorState => {
    this.setState({
      editorState,
    });
  };

  handleDivider = event => {
    event.preventDefault();

    const editorState = this.state.editorState;
    const newEditorState = dividerPlugin.addDivider(editorState);
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div className={editorStyles.editor} onClick={this.focus}>
        <button onClick={this.handleDivider}>add</button>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={element => {
            this.editor = element;
          }}
        />
      </div>
    );
  }
}
