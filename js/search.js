// search.js — functions to search and filter establishments
export function filterEstablishments(query) {
  const q = (query || '').trim().toLowerCase();
  document.querySelectorAll('.establishments-grid .card').forEach(card => {
    const text = (card.textContent || '').toLowerCase();
    card.style.display = (q === '' || text.includes(q)) ? '' : 'none';
  });
}
