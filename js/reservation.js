// reservation.js — reservation form handling & dynamic summary preview
export function handleReservationForm(formEl) {
  if (!formEl) return;

  var nameInput = formEl.querySelector('input[name="name"]');
  var dateInput = formEl.querySelector('input[name="date"]');
  var timeInput = formEl.querySelector('input[name="time"]');
  var guestsInput = formEl.querySelector('input[name="guests"]');
  
  var summaryName = document.getElementById('summary-name');
  var summaryEst = document.getElementById('summary-establishment');
  var summaryDateTime = document.getElementById('summary-datetime');
  var summaryGuests = document.getElementById('summary-guests');

  function updateSummary() {
    if (summaryName && nameInput) {
      summaryName.textContent = nameInput.value.trim() || '—';
    }
    
    if (summaryEst) {
      var selectedEst = formEl.querySelector('input[name="establishment"]:checked');
      summaryEst.textContent = selectedEst ? selectedEst.value : '—';
    }
    
    if (summaryDateTime && dateInput && timeInput) {
      var d = dateInput.value;
      var t = timeInput.value;
      if (d || t) {
        var formattedDate = '';
        if (d) {
          // split date value of format "YYYY-MM-DD" to avoid timezone shift
          var parts = d.split('-');
          if (parts.length === 3) {
            var dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
            formattedDate = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
          }
        }
        summaryDateTime.textContent = (formattedDate + (t ? ' à ' + t : '')).trim();
      } else {
        summaryDateTime.textContent = '—';
      }
    }
    
    if (summaryGuests && guestsInput) {
      summaryGuests.textContent = guestsInput.value ? guestsInput.value + ' personne(s)' : '—';
    }
  }

  // Live input sync
  formEl.addEventListener('input', updateSummary);

  // Agency Radio select visual styles
  var selectCards = formEl.querySelectorAll('.agency-select-card');
  selectCards.forEach(function (card) {
    var radio = card.querySelector('input[type="radio"]');
    if (radio) {
      radio.addEventListener('change', function () {
        selectCards.forEach(function (c) { c.classList.remove('selected'); });
        if (radio.checked) {
          card.classList.add('selected');
        }
        updateSummary();
      });
    }
  });

  // Pre-select agency based on URL parameter ?agency=
  var params = new URLSearchParams(window.location.search);
  var agencyParam = params.get('agency');
  if (agencyParam) {
    var radioToSelect = formEl.querySelector('#agency-' + agencyParam);
    if (radioToSelect) {
      radioToSelect.checked = true;
      var cardToSelect = radioToSelect.closest('.agency-select-card');
      if (cardToSelect) {
        cardToSelect.classList.add('selected');
      }
      updateSummary();
    }
  }

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Merci — votre demande de réservation a été envoyée (prototype).');
    formEl.reset();
    selectCards.forEach(function (c) { c.classList.remove('selected'); });
    updateSummary();
  });
}
