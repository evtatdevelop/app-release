const generateKey = ( length = 30 ) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRQSTUVWXYZ0123456789";
  let code = "";
  const clen = chars.length - 1;
  while ( code.length < length ) 
    code += chars[Math.floor(Math.random() * clen)];  	

  return code;
}

const ucFirst = str => {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export { generateKey, ucFirst }