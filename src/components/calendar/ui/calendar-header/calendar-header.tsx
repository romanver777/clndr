import { ArrowIcon } from "../../../icons";
import styles from "./calendar-header.module.css";

type THeaderProps = {
  onClick: (increment: number) => void;
  children: React.ReactNode;
  classname?: string;
};

export const CalendarHeader = ({
  onClick,
  children,
  classname,
}: THeaderProps) => {
  return (
    <div className={`${styles.header} ${classname ? styles[classname] : ""}`}>
      <button
        className={styles.button}
        onClick={() => onClick(-1)}
        type="button"
      >
        <ArrowIcon />
      </button>

      <div className={styles.title}>{children}</div>

      <button
        className={styles.button}
        onClick={() => onClick(1)}
        type="button"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
};
