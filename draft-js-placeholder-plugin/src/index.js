import { EditorState } from 'draft-js';

import DefaultPlaceholder from './components/DefaultPlaceholder';

const placeholderPlugin = (
  { dataKey = 'placeholder', component = DefaultPlaceholder } = {}
) => {
  return {
    blockRendererFn: block => {
      const placeholder = block.getData().get(dataKey);

      if (placeholder) {
        return {
          component,
          props: {
            placeholder,
          },
          editable: true,
        };
      }
    },

    handleKeyCommand: (command, editorState, { setEditorState }) => {
      return deletePlaceholderData({ editorState, setEditorState, dataKey });
    },

    handleBeforeInput: (chars, editorState, { setEditorState }) => {
      return deletePlaceholderData({ editorState, setEditorState, dataKey });
    },
  };
};

const deletePlaceholderData = ({ editorState, setEditorState, dataKey }) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();

  const hasPlaceholderData = blockMap.some(block => {
    return block.hasIn(['data', dataKey]);
  });

  if (hasPlaceholderData) {
    const newBlockMap = blockMap.map(block =>
      block.deleteIn(['data', dataKey])
    );

    const newContentState = contentState.set('blockMap', newBlockMap);
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'change-block-data'
    );

    setEditorState(newEditorState);

    return 'handled';
  }

  return 'not-handled';
};

export default placeholderPlugin;
