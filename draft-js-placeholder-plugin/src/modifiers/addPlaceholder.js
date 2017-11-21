const addPlaceholder = editorState => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const currentBlock = getCurrentBlock(editorState);

  if (isEmptyBlock(currentBlock)) {
    const newContentState = Modifier.setBlockData(
      contentState,
      selectionState,
      {
        placeholder: 'This is placeholder',
      }
    );

    setEditorState(
      EditorState.push(editorState, newContentState, 'change-block-data')
    );
    // setEditorState(RichUtils.toggleBlockType(editorState, 'placeholder'));
    // setEditorState(
    //   Modifier.insertText(contentState, selectionState, 'attach youtube')
    // );
  }
};

export default addPlaceholder;
