export const getFirstToUpperCase = (str: string) =>
  str[0].toUpperCase() + str.slice(1);

export const getDaysInMonth = (
  date: Date,
  filled: boolean
): (Date | null)[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  const firstDayOfWeek = firstDay.getDay();
  const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const days: (Date | null)[] = [];

  if (filled) {
    if (adjustedFirstDay > 0) {
      const prevMonth = new Date(year, month, 0);
      const prevMonthDays = prevMonth.getDate();

      for (
        let i = prevMonthDays - adjustedFirstDay + 1;
        i <= prevMonthDays;
        i++
      ) {
        days.push(new Date(year, month - 1, i));
      }
    }
  } else {
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  if (filled) {
    let totalCells = days.length / 7 > 5 ? 7 * 6 : 7 * 5;
    if (days.length / 7 === 4) totalCells = 7 * 4;

    const remainingCells = totalCells - days.length;

    if (remainingCells > 0) {
      for (let i = 1; i <= remainingCells; i++) {
        days.push(new Date(year, month + 1, i));
      }
    }
  }
  return days;
};

export const isEndWeekDay = (date: Date | null): boolean => {
  if (!date) return false;
  const day = date.getDay();
  return day === 6 || day === 0;
};

export const isToday = (date: Date | null): boolean => {
  if (!date) return false;
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isSelected = (
  date: Date | null,
  selectedDate: Date | null
): boolean => {
  if (!date || !selectedDate) return false;
  return date.toDateString() === selectedDate.toDateString();
};

export const isCurrentMonth = (
  date: Date | null,
  currentDate: Date
): boolean => {
  if (!date) return false;
  return (
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  );
};
