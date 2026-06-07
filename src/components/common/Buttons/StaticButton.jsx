import { Link } from "react-router-dom";
import { memo, useMemo } from "react";

const StaticButton = memo(
    ({ Name, Path, onClick, type = "button", className = "", classNameSpan = "" }) => {

        const baseClasses = useMemo(() => {
            return `relative overflow-hidden w-fit flex items-center justify-center cursor-pointer border-none outline-none group/btn select-none ${className ? className : "bg-main-text"
                }`;
        }, [className]);

        if (onClick) {
            return (
                <button type={type} onClick={onClick} className={baseClasses}>
                    <span
                        className={`not-first:flex items-center justify-center px-[22px] text-[16px] lg:text-[18px] font-[700] text-center capitalize !leading-[15px] transition-all duration-300 translate-y-0 group-hover/btn:-translate-y-full ${className ? className : "text-main-background"
                            } ${classNameSpan ? classNameSpan : "py-[12px]"}`}
                    >
                        {Name}
                    </span>
                    <span
                        className={`absolute top-0 left-0 flex items-center justify-center px-[22px] text-[16px] lg:text-[18px] font-[700] text-center capitalize !leading-[15px] transition-all duration-300 translate-y-full group-hover/btn:translate-y-0 ${className ? className : "text-main-background"
                            } ${classNameSpan ? classNameSpan : "py-[12px]"}`}
                    >
                        {Name}
                    </span>
                </button>
            );
        }

        return (
            <Link to={Path} className={baseClasses}>
                <span
                    className={`not-first:flex items-center justify-center px-[22px] text-[16px] lg:text-[18px] font-[700] text-center capitalize !leading-[15px] transition-all duration-300 translate-y-0 group-hover/btn:-translate-y-full ${className ? className : "text-main-background"
                        } ${classNameSpan ? classNameSpan : "py-[12px]"}`}
                >
                    {Name}
                </span>
                <span
                    className={`absolute top-0 left-0 flex items-center justify-center px-[22px] text-[16px] lg:text-[18px] font-[700] text-center capitalize !leading-[15px] transition-all duration-300 translate-y-full group-hover/btn:translate-y-0 ${className ? className : "text-main-background"
                        } ${classNameSpan ? classNameSpan : "py-[12px]"}`}
                >
                    {Name}
                </span>
            </Link>
        );
    }
);

export default StaticButton;