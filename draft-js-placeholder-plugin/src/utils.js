export const getCurrentBlock = editorState => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const currentBlock = contentState.getBlockForKey(
    selectionState.getStartKey()
  );

  return currentBlock;
};

export const isEmptyBlock = contentBlock => {
  return contentBlock.getText().trim().length === 0;
};
