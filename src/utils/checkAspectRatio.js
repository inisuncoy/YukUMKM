export function checkAspectRatio(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image(); // Gunakan window.Image untuk memastikan objek global yang digunakan
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        resolve(width === height);
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
