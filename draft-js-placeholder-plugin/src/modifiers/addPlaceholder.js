import { EditorState, Modifier } from 'draft-js';

import { getCurrentBlock, isEmptyBlock } from '../utils';

const addPlaceholder = ({ dataKey, placeholder }) => editorState => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const currentBlock = getCurrentBlock(editorState);

  if (isEmptyBlock(currentBlock)) {
    const newContentState = Modifier.setBlockData(
      contentState,
      selectionState,
      {
        [dataKey]: placeholder,
      }
    );

    return EditorState.push(editorState, newContentState, 'change-block-data');

    // setEditorState(RichUtils.toggleBlockType(editorState, 'placeholder'));
    // setEditorState(
    //   Modifier.insertText(contentState, selectionState, 'attach youtube')
    // );
  }
};

export default addPlaceholder;
