
export const isNotDev = () => { 
  return !isDev();
}

export const isDev = () => { 
  return process.env.DEV;
    // return import.meta.env.DEV;
}