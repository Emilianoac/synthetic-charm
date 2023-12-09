function slugify(text: string) {
  if (typeof text != "string") {
    throw new Error("El parametro text debe ser una string")
  }

  let cleanText = text
  cleanText = cleanText.replaceAll(/[?¿()[/:,;.]/g, '')
  cleanText = cleanText.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  cleanText = cleanText.trim()
  cleanText = cleanText.replace(/\s{2,}/g, ' ')
  cleanText = cleanText.replaceAll(' ','-').toLowerCase()

  return cleanText
}

export {slugify}