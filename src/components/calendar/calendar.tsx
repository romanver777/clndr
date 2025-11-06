import React, { useState, useMemo, useEffect, useCallback } from "react";
import styles from "./calendar.module.css";
import {
  getDaysInMonth,
  getFirstToUpperCase,
  isCurrentMonth,
  isEndWeekDay,
  isSelected,
  isToday,
} from "./utils";
import { CalendarHeader } from "./ui/calendar-header";

interface CalendarProps {
  initialDate?: string;
  locale?: string;
  onDateSelect?: (date: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  initialDate,
  locale = "ru-RU",
  onDateSelect,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(
    initialDate ? new Date(initialDate) : new Date()
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate ? new Date(initialDate) : null
  );
  const [currentYear, setCurrentYear] = useState<number>(
    initialDate ? new Date(initialDate).getFullYear() : new Date().getFullYear()
  );
  const [showYearSelector, setShowYearSelector] = useState<boolean>(false);

  const handleEscButton = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && showYearSelector) setShowYearSelector(false);
    },
    [showYearSelector]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscButton);
    return () => document.removeEventListener("keydown", handleEscButton);
  }, [handleEscButton]);

  const weekdays = useMemo(() => {
    const baseDate = new Date(2024, 0, 1);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      return date.toLocaleDateString(locale, { weekday: "short" });
    });
  }, [locale]);

  const changeMonth = (increment: number): void => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + increment);
      return newDate;
    });
  };

  const changeYear = (increment: number): void => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(currentYear + increment);
      return newDate;
    });
    setCurrentYear((prev) => prev + increment);
  };

  const handleYearClick = (): void => {
    setCurrentYear(currentDate.getFullYear());
    setShowYearSelector(true);
  };

  const handleYearSelectorClose = (): void => {
    setShowYearSelector(false);
  };

  const handleDateClick = (date: Date | null): void => {
    if (date) {
      setSelectedDate(date);
      onDateSelect?.(date.toLocaleDateString("en-CA"));
    }
  };

  const days = getDaysInMonth(currentDate);

  const getDayClassName = (date: Date | null): string => {
    const classNames = [styles.day];

    if (!date) {
      classNames.push(styles.dayEmpty);
    } else {
      if (isEndWeekDay(date)) {
        classNames.push(styles.dayEndWeek);
      }
      if (!isCurrentMonth(date, currentDate)) {
        classNames.push(styles.dayOtherMonth);
      }
      if (isToday(date)) {
        classNames.push(styles.dayToday);
      }
      if (isSelected(date, selectedDate)) {
        classNames.push(styles.daySelected);
      }
    }

    return classNames.join(" ");
  };

  return (
    <div className={styles.calendar}>
      <CalendarHeader onClick={(data) => changeMonth(data)}>
        {getFirstToUpperCase(
          currentDate.toLocaleDateString(locale, { month: "long" })
        )}
        {", "}
        <button
          onMouseEnter={handleYearClick}
          onClick={handleYearClick}
          className={styles.fullYearButton}
          tabIndex={1}
        >
          {currentDate.getFullYear()}
        </button>
      </CalendarHeader>

      {showYearSelector && (
        <>
          <div
            className={styles.yearOverlay}
            onClick={handleYearSelectorClose}
          />
          <div
            className={styles.yearSelector}
            onMouseLeave={handleYearSelectorClose}
          >
            <CalendarHeader
              onClick={(data) => changeYear(data)}
              classname="yearSelector"
            >
              {currentYear}
            </CalendarHeader>
          </div>
        </>
      )}

      <div className={styles.weekdays}>
        {weekdays.map((day, index) => (
          <div key={index} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.days}>
        {days.map((date, index) => (
          <button
            key={index}
            className={getDayClassName(date)}
            onClick={() => handleDateClick(date)}
            tabIndex={date ? index : -1}
          >
            {date ? date.getDate() : ""}
          </button>
        ))}
      </div>
    </div>
  );
};
