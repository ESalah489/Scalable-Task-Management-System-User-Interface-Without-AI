import { Link } from "react-router-dom";
import { memo, useMemo } from "react";

const StaticButton = memo(
    ({ Name, Path, className = "", classNameSpan = "" }) => {

        const baseClasses = useMemo(() => {
            return `relative overflow-hidden w-fit flex items-center justify-center cursor-pointer border-none outline-none group/btn select-none ${className ? className : "bg-[var(--white-color)]"
                }`;
        }, [className]);

        return (
            <Link to={Path} className={baseClasses}>
                <span
                    className={`not-first:flex items-center justify-center  px-[22px] text-[16px] lg:text-[18px] font-[700] text-center capitalize !leading-[15px] transition-all duration-300 translate-y-0 group-hover/btn:-translate-y-full ${className ? className : "text-[var(--black-color)]"
                        }
        
        ${classNameSpan ? classNameSpan : "py-[12px]"}`}
                >
                    {Name}
                </span>

                <span
                    className={`absolute top-0 left-0 flex items-center justify-center  px-[22px] text-[16px] lg:text-[18px] font-[700] text-center capitalize !leading-[15px] transition-all duration-300 translate-y-full group-hover/btn:translate-y-0 ${className ? className : "text-[var(--black-color)]"
                        } 
                ${classNameSpan ? classNameSpan : "py-[12px]"}`}
                >
                    {Name}
                </span>
            </Link>
        );
    }
);

export default StaticButton;
