
export const isNotDev = () => { 
  return !isDev();
}

export const isDev = () => { 
    return import.meta.env.DEV;
}