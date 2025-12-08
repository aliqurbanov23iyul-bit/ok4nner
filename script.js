const form = document.getElementById('contact-form');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // saytı reload etmə
  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if(response.ok){
      alert('Mesajınız uğurla göndərildi!');
      form.reset();
    } else {
      alert('Xəta baş verdi, zəhmət olmasa yenidən cəhd edin.');
    }
  }).catch(error => {
    alert('Xəta baş verdi, internet bağlantınızı yoxlayın.');
  });
});
