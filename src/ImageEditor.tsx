// ImageEditor.js
import React, { useEffect, useRef } from 'react';
import {
  openDefaultEditor,
  createDefaultImageReader,
  createDefaultImageWriter,
  setPlugins,
  plugin_crop,
  plugin_rotate,
  plugin_filter,
} from '@pqina/pintura';

// Set up the plugins
setPlugins(plugin_crop, plugin_rotate, plugin_filter);

const ImageEditor = ({ src, onSave }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (src) {
      const editor = openDefaultEditor({
        src: src,
        layout: 'default',
        imageReader: createDefaultImageReader(),
        imageWriter: createDefaultImageWriter(),
        container: editorRef.current,
        onProcess: (output) => {
          if (onSave) onSave(output.dest);
        },
        utils: ['crop', 'rotate', 'filter'],
      });

      return () => {
        editor.destroy();
      };
    }
  }, [src, onSave]);

  return <div ref={editorRef}></div>;
};

export default ImageEditor;
