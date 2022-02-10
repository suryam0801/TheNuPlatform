export const getReadableDateAndTimeString = (date: number) =>
    new Date(date).toLocaleTimeString("default", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        day: "2-digit",
        month: "short",
    });
