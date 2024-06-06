import { useState } from "react";
import "./App.css";
import Effects from "./comp/effects";

function App() {
  const [img, setImg] = useState("");
  const [theme, setTheme] = useState("light");

  const changeImg = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`w-[100vw] h-[100vh] bg-blue-300 dark:bg-blue-700 flex items-center justify-center ${theme}`}
    >
      <div className="absolute top-3 left-3 text-5xl font-mono">
        PhotoFinesse <span className="text-xl">UI Image Editor</span>
      </div>
      <div className="flex flex-row w-fit h-fit bg-white dark:bg-black p-6 rounded-lg">
        <div className="flex">
          <Effects file={File} />
        </div>
        <div>
          {img ? (
            <img src={img} alt="Selected" className="max-w-full max-h-64" />
          ) : (
            <img
              src="https://www.webtoptools.com/image/image-editor/image-placeholder.svg"
              alt="Selected"
              className="max-w-full max-h-64"
            />
          )}
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
            <input
              type="button"
              value="Save Img"
              className="cursor-pointer transition-all bg-blue-500 text-white px-8 py-2 mb-[-20px] rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
