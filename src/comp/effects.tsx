import { SetStateAction, useState } from "react";

const Effects = (file) => {
    const [filter, setFilter] = useState("brightness");

    const handleEdit = (effect: SetStateAction<string>) => {
        setFilter(effect);
        console.log(effect);
    };
    const handleEffects = (e)=>{
        console.log(e.target.value)
    }

    return (
        <div className="p-4">
            <p className="text-xl font-bold mb-4">Filters</p>
            <div className="relative h-fit container bg-white dark:bg-black p-4 pr-6 rounded-lg flex flex-col shadow-lg [&>*]:my-2">
                <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-start gap-4">
                    <div className="flex flex-col items-center space-y-2">
                        <button
                            onClick={() => handleEdit("brightness")}
                            className={`cursor-pointer transition-all bg-blue-500 text-white px-8 py-2 rounded-lg border-blue-600 border-b-4 hover:brightness-110 hover:-translate-y-1 hover:border-b-6 active:border-b-2 active:brightness-90 active:translate-y-2 ${filter === "brightness" ? "brightness-110 translate-y-1 border-b-6" : ""
                                }`}
                        >
                            Brightness
                        </button>
                        <button
                            onClick={() => handleEdit("saturation")}
                            className={`cursor-pointer transition-all bg-blue-500 text-white px-8 py-2 rounded-lg border-blue-600 border-b-4 hover:brightness-110 hover:-translate-y-1 hover:border-b-6 active:border-b-2 active:brightness-90 active:translate-y-2 ${filter === "saturation" ? "brightness-110 translate-y-1 border-b-6" : ""
                                }`}
                        >
                            Saturation
                        </button>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <button
                            onClick={() => handleEdit("inversion")}
                            className={`cursor-pointer transition-all bg-blue-500 text-white px-8 py-2 rounded-lg border-blue-600 border-b-4 hover:brightness-110 hover:-translate-y-1 hover:border-b-6 active:border-b-2 active:brightness-90 active:translate-y-2 ${filter === "inversion" ? "brightness-110 translate-y-1 border-b-6" : ""
                                }`}
                        >
                            Inversion
                        </button>
                        <button
                            onClick={() => handleEdit("grayscale")}
                            className={`cursor-pointer transition-all bg-blue-500 text-white px-8 py-2 rounded-lg border-blue-600 border-b-4 hover:brightness-110 hover:-translate-y-1 hover:border-b-6 active:border-b-2 active:brightness-90 active:translate-y-2 ${filter === "grayscale" ? "brightness-110 translate-y-1 border-b-6" : ""
                                }`}
                        >
                            Grayscale
                        </button>

                    </div>
                </div>

                <div className="w-full md:w-auto flex flex-col items-center space-y-2 text-left">
                    {filter === "brightness" ? (
                        <>
                            <p className="text-lg font-medium w-full">{filter}</p>
                            <input type="range" onChange={(e)=>handleEffects(e)} name={filter} id={filter} min="0" max="200" defaultValue="100" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        </>
                    ) : filter === "saturation" ? (
                        <>
                            <p className="text-lg font-medium w-full">{filter}</p>
                            <input type="range" onChange={(e)=>handleEffects(e)} name={filter} id={filter} min="0" max="200" defaultValue="100" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        </>
                    ) : filter === "inversion" ? (
                        <>
                            <p className="text-lg font-medium w-full">{filter}</p>
                            <input type="range" onChange={(e)=>handleEffects(e)} name={filter} id={filter} min="0" max="100" defaultValue="0" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        </>
                    ) : filter === "grayscale" ? (
                        <>
                            <p className="text-lg font-medium w-full">{filter}</p>
                            <input type="range" onChange={(e)=>handleEffects(e)} name={filter} id={filter} min="0" max="100" defaultValue="0" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        </>
                    ) : null}
                </div>

            </div>
        </div>
    );
};

export default Effects;
