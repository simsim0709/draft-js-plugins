import { insertCustomBlock } from '../utils';

export default blockType => {
  return editorState => {
    return insertCustomBlock(editorState, blockType);
  };
};
