import React from "react";
import notfound from "../../assets/404/404-computer.svg";
import LazyImage from "../../components/LazyImage/LazyImage";
import StaticButton from "../../components/common/Buttons/StaticButton";

const NotFound = () => {
    return (
        <div
            className=" h-[100vh] pt-20 bg-main-background flex items-center justify-center relative">
            <div className="w-full flex gap-6 flex-col lg:flex-row">
                <div className="w-full flex-1 flex pb-15  pt-4 lg:pt-0 lg:pb-0">
                    <div className={`w-full lg:py-19 py-10 flex flex-col gap-10 `}>
                        <div className="flex flex-col gap-10  items-center justify-center ">
                            <div className="w-full relative">
                                <div className="bg-red flex items-center justify-center relative">
                                    <div className="w-full flex sm:flex-row flex-col  items-center justify-around ">
                                        <div className="w-fit order-2 sm:order-1  flex flex-col items-start justify-center gap-6">
                                            <div className="flex  flex-col w-full items-start  justify-center gap-4 px-0">
                                                <h1
                                                    className={`flex flex-col w-full uppercase text-main-text text-[25px] sm:text-[34px] font-[700] text-left `}>
                                                    <span>Page not Founded</span>
                                                </h1>
                                                <p className={`w-full max-w-lg text-main-text opacity-70 text-[14px] lg:text-[16px] font-[400] text-left `}>
                                                    Whoops! That page doesn’t exist.
                                                </p>
                                            </div>
                                            <StaticButton
                                                Name={"go To Home"}
                                                Path="/"
                                                className="bg-secondary-background text-shadow-Button-text w-full sm:w-88 "
                                            />
                                        </div>
                                        <div className=" w-fit h-70 sm:h-100 order-1 sm:order-2">
                                            <LazyImage src={notfound} alt={"lock"} className={"w-full h-full object-contain"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
