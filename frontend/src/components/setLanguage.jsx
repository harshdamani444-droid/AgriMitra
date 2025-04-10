export function setLanguage(lang) {
    const translateCookie = `googtrans=/en/${lang}`;
    document.cookie = `${translateCookie};path=/`;
    document.cookie = `${translateCookie};domain=${window.location.hostname};path=/`;

    // Reload page to apply translation
    window.location.reload();
}
