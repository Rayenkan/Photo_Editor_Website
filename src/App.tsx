import { useState, useRef } from "react";
import "./App.css";
import { saveAs } from "file-saver";

// Import the editor styles
import "@pqina/pintura/pintura.css";

// Import the editor functionality
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

// Import the editor component from `react-pintura`
import { PinturaEditor } from "@pqina/react-pintura";

// Register the plugins with Pintura Image Editor
setPlugins(plugin_crop, plugin_finetune, plugin_annotate);

// Create our editor configuration
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

const dataURLToBlob = (dataURL) => {
  try {
    const byteString = atob(dataURL.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    return new Blob([uint8Array], { type: mimeString });
  } catch (error) {
    console.error("Error decoding data URL:", error);
    return null; // Return null to indicate failure
  }
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

  const downloadImage = () => {
    if (img) {
      const blob = dataURLToBlob(img);
      if (blob) {
        const objectURL = URL.createObjectURL(blob);
        saveAs(objectURL, "edited-image.png");
        URL.revokeObjectURL(objectURL); // Clean up the object URL after use
      } else {
        console.error("Failed to create Blob from data URL");
      }
    } else {
      console.error("No image data available");
    }
  };

  const handleImageEdited = ({ dest }) => {
    console.log(img)
    setImg(URL.createObjectURL(dest));

    console.log(img)
  };

  return (
    <div
      className={`w-[100vw] h-[100vh] bg-blue-300 dark:bg-blue-700 flex items-center justify-center ${theme}`}
    >
      <div className="absolute top-3 left-3 text-5xl font-mono">
        PhotoFinesse <span className="text-xl">UI Image Editor</span>
      </div>
      <div className="flex  w-[80vw] h-[70vh] bg-white dark:bg-black p-6 rounded-lg">
        <div className=" w-full flex flex-col items-center">
          <div className="w-full h-full">
            <PinturaEditor
              {...editorConfig}
              src={img}
              imageCropAspectRatio={1}
              onLoad={(res) => console.log("load image", res)}
              onProcess={handleImageEdited}
            />
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
            <button
              className="cursor-pointer transition-all bg-blue-500 text-white px-8 py-2 mb-[-20px] rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              onClick={downloadImage}
            >
              Save Img
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
