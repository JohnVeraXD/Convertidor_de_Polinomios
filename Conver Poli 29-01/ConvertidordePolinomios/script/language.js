function updateLanguage(lang) {
    fetch(`locales/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('.translate').forEach(element => {
                const key = element.id;
                if (data[key]) {
                    element.textContent = data[key];
                }
            });
        })
        .catch(error => console.error('Error al cargar el idioma:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'es';
    document.getElementById('language-selector').value = savedLang;
    updateLanguage(savedLang);
});

document.getElementById('language-selector').addEventListener('change', function() {
    localStorage.setItem('language', this.value);
    updateLanguage(this.value);
});
