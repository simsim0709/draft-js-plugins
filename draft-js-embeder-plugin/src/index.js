import decorateComponentWithProps from 'decorate-component-with-props';
import isUrl from 'is-url';

import { ATOMIC } from './constants';

import addEmbeder from './modifiers/addEmbeder';
import DefaultEmbederComponent from './components/DefaultEmbederComponent';

const defaultOnReturn = async () => {
  return {};
};

const embederPlugin = ({
  theme,
  embederComponent: Embeder = DefaultEmbederComponent,
  decorator,
  options: { shouldHandleOnReturn = true, onReturn = defaultOnReturn } = {},
  entityType = 'draft-js-embeder-plugin-embeder',
}) => {
  if (decorator) {
    Embeder = decorator(Embeder); // eslint-disable-line
  }

  const ThemedEmbeder = decorateComponentWithProps(Embeder, { theme });

  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === ATOMIC) {
        const contentState = getEditorState().getCurrentContent();
        const entityKey = block && block.getEntityAt(0);

        if (!entityKey) {
          return;
        }

        const entity = contentState.getEntity(entityKey);
        const type = entity.getType();
        const data = entity.getData();

        if (type === entityType) {
          return {
            component: ThemedEmbeder,
            editable: false,
            props: data,
          };
        }
      }
    },
    handleReturn: async (event, editorState, { setEditorState }) => {
      if (!shouldHandleOnReturn) {
        return 'not-handled';
      }

      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const contentBlock = contentState.getBlockForKey(startKey);
      const blockText = contentBlock.getText().trim();

      if (!isUrl(blockText)) {
        return 'not-handled';
      }

      try {
        const data = (await onReturn({ url: blockText })) || {};

        if (!data.html) {
          return 'not-handled';
        }

        const newState = addEmbeder(
          editorState,
          {
            src: blockText,
            ...data,
          },
          { entityType }
        );

        setEditorState(newState);

        return 'handled';
      } catch (error) {
        return 'not-handled';
      }
    },
    addEmbeder: (editorState, data) => {
      return addEmbeder(editorState, data, { entityType });
    },
  };
};

export default embederPlugin;
