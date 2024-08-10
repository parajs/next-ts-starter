/**
 * 获取Storage
 * @param name
 * @param isJson
 * @returns
 */
export const getLocalStorage = (name: string, isJson?: boolean) => {
  try {
    const value = window.localStorage.getItem(name);
    if (value && isJson) {
      return JSON.parse(value);
    }
    return value;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * 设置Storage
 * @param name
 * @param value
 */
export const setLocalStorage = (name: string, value: any) => {
  try {
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }
    window.localStorage.setItem(name, value);
  } catch (error) {
    console.error(error);
  }
};

/**
 * 移除Storage
 * @param name
 */
export const removeLocalStorage = (name: string) => {
  try {
    window.localStorage.removeItem(name);
  } catch (error) {
    console.error(error);
  }
};
