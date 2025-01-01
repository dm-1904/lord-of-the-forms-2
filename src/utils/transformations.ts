export const capitalize = (str: string) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLocaleLowerCase();
};

export const formatPhoneNumber = (str: string) => {
  return str.length === 7;
};
