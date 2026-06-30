// dynamically build a mailto: link from the field values and open the mail client.
// see `README.md` for more info about contact credentials
const RECIPIENT = (window.CERCA_CONTACT_EMAIL || '').trim();

const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const success = contactForm.querySelector('.form-success');

  if (!RECIPIENT) {
    console.error('CERCA contact form: no recipient configured (window.CERCA_CONTACT_EMAIL is empty).');
    if (success) {
      success.textContent = 'Sorry, the contact form is not configured yet. Please try again later.';
      success.style.display = 'block';
    }
    return;
  }

  const f = Object.fromEntries(new FormData(contactForm));

  const subject = `CERCA contact: ${f.topic || 'General contact'} - ${f.name || ''}`.trim();
  const body =
    `Name: ${f.name || ''}\n` +
    `Email: ${f.email || ''}\n` +
    `Organization: ${f.organization || ''}\n` +
    `Topic: ${f.topic || ''}\n\n` +
    `${f.message || ''}`;

  const url = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  if (success) {
    success.style.display = 'block';
    setTimeout(() => { success.style.display = 'none'; }, 4000);
  }

  window.location.href = url;
});
