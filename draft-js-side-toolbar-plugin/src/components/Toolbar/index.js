/* eslint-disable react/no-array-index-key */
import React from 'react';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';

const getRelativeParent = element => {
  if (!element) {
    return null;
  }

  return window.getComputedStyle(element).getPropertyValue('position') ===
    'relative'
    ? element
    : getRelativeParent(element.parentElement);
};

class Toolbar extends React.Component {
  static shouldShowToolbar = contentBlock => {
    const isEmptyBlock = !contentBlock.getText().trim();
    const blockType = contentBlock.getType();

    return isEmptyBlock && blockType !== 'atomic';
  };

  state = {
    position: {
      visibility: 'hidden',
    },
    relative: false,
  };

  componentDidMount() {
    this.props.store.subscribeToItem('editorState', this.onEditorStateChange);
    this.setRelatvie(!!getRelativeParent(this.toolbar.parentElement));
  }

  componentWillUnmount() {
    this.props.store.unsubscribeFromItem(
      'editorState',
      this.onEditorStateChange
    );
  }

  onEditorStateChange = editorState => {
    const selection = editorState.getSelection();

    if (!selection.getHasFocus()) {
      this.setState({
        position: {
          visibility: 'hidden',
        },
      });
      return;
    }

    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());

    // TODO verify that always a key-0-0 exists
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
    // Note: need to wait on tick to make sure the DOM node has been create by Draft.js
    setTimeout(() => {
      const { relative } = this.state;
      const node = document.querySelectorAll(
        `[data-offset-key="${offsetKey}"]`
      )[0];
      let top;
      let left;

      if (relative) {
        const { offsetTop } = node;
        top = offsetTop + this.props.diffTop;
        left = this.props.diffLeft;
      } else {
        const clientRect = node && node.getBoundingClientRect();
        const scrollY =
          window.scrollY == null ? window.pageYOffset : window.scrollY;

        top = clientRect && clientRect.top + scrollY + this.props.diffTop;
        left = clientRect && clientRect.left + this.props.diffLeft;
      }

      if (typeof top !== 'number') {
        return;
      }

      this.setPosition({
        top,
        left,
        visibility: Toolbar.shouldShowToolbar(currentBlock)
          ? 'visible'
          : 'hidden',
        transition: 'all .1s ease, visibility .1s linear .1s',
      });
    }, 0);
  };

  setPosition(position) {
    this.setState({ position });
  }

  setRelatvie(relative) {
    this.setState({ relative });
  }

  render() {
    const { theme, store } = this.props;
    return (
      <div
        className={theme.toolbarStyles.wrapper}
        style={this.state.position}
        ref={element => (this.toolbar = element)}
      >
        {this.props.structure.map((Component, index) => (
          <Component
            key={index}
            getEditorState={store.getItem('getEditorState')}
            setEditorState={store.getItem('setEditorState')}
            theme={theme}
          />
        ))}
      </div>
    );
  }
}

Toolbar.defaultProps = {
  diffTop: 0,
  diffLeft: 0,
};

export default Toolbar;
