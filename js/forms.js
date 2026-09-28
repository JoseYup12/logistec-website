// ===== Vista previa del archivo adjunto (CV) =====
const fileField = document.getElementById('fileField');
const fileFieldText = document.getElementById('fileFieldText');
if (fileField && fileFieldText) {
  const fileInput = fileField.querySelector('input[type="file"]');
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      fileFieldText.innerHTML = `<strong>${file.name}</strong><span>${sizeMB} MB — haz clic para cambiar el archivo</span>`;
      fileField.classList.add('has-file');
    } else {
      fileFieldText.innerHTML = '<strong>Adjunta tu CV en PDF</strong><span>Haz clic o arrastra el archivo aquí (máx. 5MB)</span>';
      fileField.classList.remove('has-file');
    }
  });
}

// ===== Estado de envío de los formularios (postulación / proveedor) =====
['jobForm', 'providerForm'].forEach((formId) => {
  const formEl = document.getElementById(formId);
  if (!formEl) return;
  formEl.addEventListener('submit', () => {
    const btn = formEl.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Enviando...';
    }
  });
});
