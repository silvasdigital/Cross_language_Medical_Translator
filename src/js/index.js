import '../css/styles.css';

// --- DICTIONARY DATA ---
// A local dictionary of medical terms.
const dictionary = [
  { id: 1, en: 'Headache', ar: 'صداع' },
  { id: 2, en: 'Nausea', ar: 'غثيان' },
  { id: 3, en: 'Fever', ar: 'حمى' },
  { id: 4, en: 'Dizziness', ar: 'دوخة' },
  { id: 5, en: 'Vomiting', ar: 'قيء' },
  { id: 6, en: 'Allergy', ar: 'حساسية' },
  { id: 7, en: 'Anemia', ar: 'فقر الدم' },
  { id: 8, en: 'Antibiotic', ar: 'مضاد حيوي' },
  { id: 9, en: 'Blood pressure', ar: 'ضغط الدم' },
  { id: 10, en: 'Cardiology', ar: 'طب القلب' },
  { id: 11, en: 'Dermatology', ar: 'طب الجلد' },
  { id: 12, en: 'Diabetes', ar: 'سكري' },
  { id: 13, en: 'Emergency', ar: 'طوارئ' },
  { id: 14, en: 'Fracture', ar: 'كسر' },
  { id: 15, en: 'Injection', ar: 'حقنة' },
  { id: 16, en: 'Intensive Care Unit (ICU)', ar: 'وحدة العناية المركزة' },
  { id: 17, en: 'Medicine', ar: 'دواء' },
  { id: 18, en: 'Pain', ar: 'ألم' },
  { id: 19, en: 'Patient', ar: 'مريض' },
  { id: 20, en: 'Pharmacy', ar: 'صيدلية' },
  { id: 21, en: 'Prescription', ar: 'وصفة طبية' },
  { id: 22, en: 'Surgery', ar: 'جراحة' },
  { id: 23, en: 'Symptom', ar: 'عَرَض' },
  { id: 24, en: 'Vaccine', ar: 'لقاح' },
  { id: 25, en: 'X-ray', ar: 'أشعة سينية' }
];

// --- STATE ---
// 'en' means we're translating from English to Arabic
let sourceLang = 'en';

// --- DOM ELEMENTS ---
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const swapBtn = document.getElementById('swap-btn');
const sourceLangEl = document.getElementById('source-lang');
const targetLangEl = document.getElementById('target-lang');

// --- FUNCTIONS ---

/**
 * Renders the search results in the results container.
 * @param {Array} results - An array of dictionary objects to display.
 */
function renderResults(results) {
  // Clear previous results
  resultsContainer.innerHTML = '';

  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }

  results.forEach((item) => {
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    resultItem.innerHTML = `
        <div class="en-term">${item.en}</div>
        <div class="ar-term">${item.ar}</div>
    `;
    resultsContainer.appendChild(resultItem);
  });
}

/**
 * Searches the dictionary based on the input term and source language.
 */
function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (!searchTerm) {
    renderResults(dictionary); // Show all if input is empty
    return;
  }

  const results = dictionary.filter((item) => item[sourceLang].toLowerCase().startsWith(searchTerm));

  renderResults(results);
}

/**
 * Swaps the source and target languages and updates the UI.
 */
function swapLanguages() {
  sourceLang = sourceLang === 'en' ? 'ar' : 'en';

  if (sourceLang === 'en') {
    sourceLangEl.textContent = 'English';
    targetLangEl.textContent = 'Arabic';
    searchInput.placeholder = 'Start typing an English term...';
    searchInput.style.direction = 'ltr';
  } else {
    sourceLangEl.textContent = 'Arabic';
    targetLangEl.textContent = 'English';
    searchInput.placeholder = 'ابدأ بكتابة مصطلح طبي...';
    searchInput.style.direction = 'rtl';
  }

  // Re-run search with the new language direction
  handleSearch();
}

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
  // Initial render of all terms
  renderResults(dictionary);
});
searchInput.addEventListener('input', handleSearch);
swapBtn.addEventListener('click', swapLanguages);
