import style from "./arrow-icon.module.css";

type TIconProps = {
  size?: number;
  classname?: string;
  direction?: "left" | "right";
};

export const ArrowIcon = ({
  size = 24,
  classname = "",
  direction = "left",
}: TIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${style[direction]} ${classname && style[classname]}`}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
};
