export default function(length) {
  let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  
  return alphabet
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("")
    .substring(0, length)
}