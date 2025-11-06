import { useState } from "react";
import { Calendar } from "../components";
import styles from "./app.module.css";

export const App = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [locale, setLocale] = useState<string>("ru-RU");

  const handleDateSelect = (date: string): void => {
    setSelectedDate(date);
  };

  const locales = [
    { value: "ru-RU", label: "Русский" },
    { value: "en-GB", label: "English" },
  ];

  return (
    <div className={styles.app}>
      <div className={styles.selectWrapper}>
        <label>
          Язык:
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            className={styles.select}
          >
            {locales.map((loc) => (
              <option key={loc.value} value={loc.value}>
                {loc.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Calendar
        initialDate="2025-11-05"
        locale={locale}
        onDateSelect={handleDateSelect}
      />
      <div className={styles.selectedDate}>{selectedDate}</div>
    </div>
  );
};
