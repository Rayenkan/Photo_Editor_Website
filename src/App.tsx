import { useState } from "react";
import "./App.css";
import "@pqina/pintura/pintura.css";
import { PinturaEditor } from "@pqina/react-pintura";
import {
  createDefaultImageReader,
  createDefaultImageWriter,
  setPlugins,
  plugin_crop,
  plugin_finetune,
  plugin_annotate,
  locale_en_gb,
  plugin_crop_locale_en_gb,
  plugin_finetune_locale_en_gb,
  plugin_annotate_locale_en_gb,
  markup_editor_locale_en_gb,
  createDefaultShapePreprocessor,
  markup_editor_defaults,
  plugin_finetune_defaults,
} from "@pqina/pintura";

setPlugins(plugin_crop, plugin_finetune, plugin_annotate);

const editorConfig = {
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  ...markup_editor_defaults,
  ...plugin_finetune_defaults,
  shapePreprocessor: createDefaultShapePreprocessor(),
  imageCropAspectRatio: 1,
  locale: {
    ...locale_en_gb,
    ...plugin_crop_locale_en_gb,
    ...plugin_finetune_locale_en_gb,
    ...plugin_annotate_locale_en_gb,
    ...markup_editor_locale_en_gb,
  },
};

const downloadFile = (file) => {
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = URL.createObjectURL(file);
  link.download = file.name;

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link.parentNode.removeChild(link);
  }, 0);
};

function App() {
  const [img, setImg] = useState("");
  const [theme, setTheme] = useState("light");

  const changeImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorProcess = (imageState) => {
    const blob = imageState.dest;
    const file = new File([blob], "edited-image.png", { type: blob.type });
    downloadFile(file);
  };

  return (
    <div className={`w-[100vw] h-[100vh] bg-blue-300 dark:bg-blue-700 flex items-center justify-center ${theme}`}>
      <div className="absolute top-3 left-3 text-5xl font-mono">
        PhotoFinesse 
      </div>
      <div className="flex w-[80vw] h-[70vh] bg-white dark:bg-black p-6 rounded-lg mt-8">
        <div className="w-full flex flex-col items-center">
          <div className="w-full h-full">
            {img ? (
              <PinturaEditor
                {...editorConfig}
                src={img}
                imageCropAspectRatio={1}
                onLoad={(res) => console.log("load image", res)}
                onProcess={handleEditorProcess}
              />
            ) :(
              <div className="flex justify-center">
                <img src="https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg" className="w-[60vw] h-[50vh]" alt="" />
              </div>
              
            )}
          </div>

          <div className="grid w-full max-w-xs items-center gap-1.5 grid-flow-col">
            <div>
              <label className="text-sm text-black dark:text-gray-200 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Picture
              </label>
              <input
                id="picture"
                type="file"
                className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
                onChange={changeImg}
              />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
