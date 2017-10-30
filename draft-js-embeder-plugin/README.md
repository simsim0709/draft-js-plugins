# DraftJS embeder Plugin

*This is a plugin for the `draft-js-plugins-editor`.*
In order to user 3rd services like iframe.ly or embed.ly.

## Usage

```js
// with iframe.ly

import createEmbederPlugin from 'draft-js-embeder-plugin';

const embederPlugin = createEmbederPlugin({
  options: {
    onReturn: async ({ url }) => {
      try {
        const response = await fetch(
          `http://iframe.ly/api/iframely?url=${url}`
        );

        const data = response.json();

        return data;
      } catch (error) {
        console.error('error', error);
        return error;
      }
    },
  },
});

```

## Default Config

```js
{
  theme,
  embederComponent: Embeder = DefaultEmbederComponent,
  decorator,
  options: { shouldHandleOnReturn = true, onReturn = defaultOnReturn } = {},
  entityType = 'draft-js-embeder-plugin-embeder',
}
```
