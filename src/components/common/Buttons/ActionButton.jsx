
const ActionButton = ({
  Name,
  className = "",
  type = "button",
  onClick = () => {},
  border = "",
}) => {

  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative overflow-hidden w-fit flex items-center justify-center cursor-pointer outline-none group/btn select-none ${
        border ? border : ""
      } ${className ? className : "bg-[var(--white-color)]"} `}
    >
      <span
        className={`flex gap-2 not-first:flex items-center justify-center py-[12px] px-[22px] text-[16px] lg:text-[18px] font-[700] text-center capitalize !leading-[15px] transition-all duration-300 translate-y-0 group-hover/btn:-translate-y-full ${
          className ? className : "text-[var(--black-color)] "
        }
        `}
      >
        {Name}
      </span>

      <span
        className={`absolute top-0 flex gap-2 items-center justify-center py-[12px] px-[22px] text-[16px] lg:text-[18px]  font-[700] text-center capitalize !leading-[15px] transition-all duration-300 translate-y-full group-hover/btn:translate-y-0 ${
          className ? `${className}` : "text-[var(--black-color)]"
        }   `}
      >
        {Name}
      </span>
    </button>
  );
};

export default ActionButton;
