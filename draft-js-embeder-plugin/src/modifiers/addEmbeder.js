import { AtomicBlockUtils, RichUtils } from 'draft-js';

import { ATOMIC } from '../constants';

const addEmbeder = (editorState, data, config) => {
  if (RichUtils.getCurrentBlockType(editorState) === ATOMIC) {
    return editorState;
  }

  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    config.entityType,
    'IMMUTABLE',
    data
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
};

export default addEmbeder;
