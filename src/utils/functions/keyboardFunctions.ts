export const isEnterKey = (
  event: React.KeyboardEvent | React.KeyboardEvent<HTMLInputElement>,
): boolean => event.code === "Enter";
