function fileToBase64(event: Event): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const input = event.target as HTMLInputElement

    if (!input.files) {
      reject("No se seleccionó ningún archivo")
      return
    }
    
    Array.from(input.files).forEach(file => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.result === null) {
          reject("Error al leer el archivo")
        } else {
          resolve(reader.result as string)
          console.log('done');
        }
      }

      reader.onerror = () => {
        reject("Error al leer el archivo")
      }

      reader.readAsDataURL(file)
    })
  })
}

export {fileToBase64}


