// ========================================================================================
// Search functionality for curriculum
// ========================================================================================


// 📦 Simplified Curriculum Search Script (for GitHub Pages)
document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);

  const searchTrigger = $('searchTrigger');
  const searchOverlay = $('searchOverlay');
  const closeOverlay = $('closeOverlay');
  const searchInput = $('biru-nepal-search-input');
  const searchBox = $('biru-nepal-search-box-inner');
  const resultsContainer = $('biru-nepal-results-grid');
  const resultCount = $('biru-nepal-result-count');
  const searchTime = $('biru-nepal-search-time');
  const resultsTitle = $('biru-nepal-results-title');
  const filterButtons = document.querySelectorAll('.biru-nepal-filter-btn');
  const quickLinks = () => document.querySelectorAll('.biru-nepal-quick-link');

  let currentFilter = "all";

  const toggleOverlay = show => searchOverlay.classList.toggle('active', show);

  searchTrigger.addEventListener('click', () => {
    toggleOverlay(true);
    searchInput.focus();
  });
  closeOverlay.addEventListener('click', () => toggleOverlay(false));
  document.addEventListener('keydown', e => e.key === 'Escape' && toggleOverlay(false));
  searchOverlay.addEventListener('click', e => e.target === searchOverlay && toggleOverlay(false));

  searchInput.addEventListener('focus', () => searchBox.classList.add('focused'));
  searchInput.addEventListener('blur', () => searchBox.classList.remove('focused'));

  filterButtons.forEach(btn => btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    triggerSearch();
  }));

  quickLinks().forEach(link => link.addEventListener('click', () => {
    searchInput.value = link.textContent;
    triggerSearch();
  }));

  searchInput.addEventListener('input', triggerSearch);

  function triggerSearch() {
    const query = searchInput.value.trim();
    const { results, searchTime: time } = searchCurriculum(query, currentFilter);

    resultCount.textContent = results.length;
    searchTime.textContent = time;
    resultsTitle.style.display = query && results.length ? "block" : "none";

    renderResults(results, query);
  }

  function toSlug(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function getSemesterSlug(title) {
    const map = {
      "BSc.CSIT : First Semester": "first-semester",
      "BSc.CSIT : Second Semester": "second-semester",
      "BSc.CSIT : Third Semester": "third-semester",
      "BSc.CSIT : Fourth Semester": "fourth-semester",
      "BSc.CSIT : Fifth Semester": "fifth-semester",
      "BSc.CSIT : Sixth Semester": "sixth-semester",
      "BSc.CSIT : Seventh Semester": "seventh-semester",
      "BSc.CSIT : Eighth Semester": "eighth-semester"
    };
    return map[title] || toSlug(title);
  }

  function highlight(text, query) {
    if (!query) return text;
    return text.replace(new RegExp(`(${query})`, 'gi'), '<span class="biru-nepal-highlight">$1</span>');
  }

  function searchCurriculum(query, filter) {
    const t0 = performance.now();
    const q = query.toLowerCase();
    const results = [];

    const match = txt => txt?.toLowerCase().includes(q);

    semesterData.forEach((semester, si) => {
      const semSlug = getSemesterSlug(semester.title);

      if ((filter === 'all' || filter === 'semester') && (match(semester.title) || match(semester.description))) {
        results.push({
          type: 'semester',
          title: semester.title,
          description: semester.description,
          subjects: semester.subjects.length,
          core: semester.subjects.filter(s => !s.elective).length,
          electives: semester.subjects.filter(s => s.elective).length,
          link: `csit/${semSlug}/`,
          semesterIndex: si
        });
      }

      semester.subjects.forEach(subject => {
        const subjSlug = toSlug(subject.name);

        if ((filter === 'all' || filter === 'subject') && (match(subject.name) || match(subject.description))) {
          results.push({
            type: 'subject',
            title: subject.name,
            description: subject.description,
            semester: semester.title,
            link: `csit/${semSlug}/${subjSlug}/`
          });
        }

        const units = subjectUnits[subject.name] || [];
        units.forEach(unit => {
          const topicMatch = unit.topics?.find(match);

          if ((filter === 'all' || filter === 'unit') && (match(unit.title) || match(unit.description) || topicMatch)) {
            results.push({
              type: 'unit',
              title: unit.title,
              description: unit.description,
              matchingTopic: topicMatch,
              topics: unit.topics,
              subject: subject.name,
              semester: semester.title,
              link: `csit/${semSlug}/${subjSlug}/${toSlug(unit.title)}`
            });
          }
        });
      });
    });

    return { results: results.slice(0, 8), searchTime: (performance.now() - t0).toFixed(2) };
  }

  function renderResults(results, query) {
    resultsContainer.innerHTML = '';
    if (!results.length) {
      resultsContainer.innerHTML = `<div class="biru-nepal-no-results">
        <i class="fas fa-${query ? 'frown' : 'search'}"></i>
        <h3>${query ? 'No results found' : 'Search the Curriculum'}</h3>
        <p>${query ? `We couldn't find any matches for "${query}".` : 'Enter keywords related to semesters, subjects, units, or topics.'}</p>
        <div class="biru-nepal-quick-links">
          <div class="biru-nepal-quick-link">Computer Networks</div>
          <div class="biru-nepal-quick-link">Algorithms</div>
          <div class="biru-nepal-quick-link">Database</div>
          <div class="biru-nepal-quick-link">Fourth Semester</div>
        </div>
      </div>`;
      quickLinks().forEach(link => link.addEventListener('click', () => {
        searchInput.value = link.textContent;
        triggerSearch();
      }));
      return;
    }

    results.forEach((r, i) => {
      const card = document.createElement('div');
      card.className = r.type === 'semester' ? 'biru-course-card' : 'biru-nepal-result-card';
      card.innerHTML = `<div class="biru-result-number">${i + 1}</div>`;

      if (r.type === 'semester') {
        card.style.setProperty('--delay', r.semesterIndex);
        card.innerHTML += `
          <div class="biru-course-semester-number">${r.semesterIndex + 1}</div>
          <h2>${highlight(r.title, query)}</h2>
          <p>${highlight(r.description, query)}</p>
          <span class="biru-course-subjects-count">${r.subjects} Subjects</span>
          <div class="biru-course-subject-breakdown">
            <span class="biru-course-core-count">${r.core} Core</span>
            <span class="biru-course-elective-count">${r.electives} Electives</span>
          </div>`;
      } else {
        const icon = r.type === 'subject' ? 'book' : 'file-alt';
        const color = r.type === 'subject' ? '#4a69bd' : '#b21f1f';
        const bg = color.replace('#', '');
        const title = r.type.charAt(0).toUpperCase() + r.type.slice(1);

        card.innerHTML += `
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <div style="background: rgba(${bg === '4a69bd' ? '74,105,189' : '178,31,31'},0.2); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
              <i class="fas fa-${icon}" style="color: ${color}; font-size: 1.8rem;"></i>
            </div>
            <div>
              <div style="font-size: 1.1rem; font-weight: 600; color: ${color}; margin-bottom: 5px;">${title}</div>
              <h3 style="margin: 0;">${highlight(r.title, query)}</h3>
            </div>
          </div>
          <p>${highlight(r.matchingTopic ? `Topic found: "${r.matchingTopic}"` : r.description || '', query)}</p>
          <div class="meta" style="margin-top: 15px; display: flex; gap: 15px; color: #a0a0d0; font-size: 0.95rem;">
            ${r.semester ? `<span><i class="fas fa-calendar-alt"></i> ${highlight(r.semester, query)}</span>` : ''}
            ${r.subject ? `<span><i class="fas fa-book"></i> ${highlight(r.subject, query)}</span>` : ''}
          </div>
          <a href="${r.link}" class="biru-nepal-view-link">View ${title} Details</a>`;
      }

      card.addEventListener('click', e => {
        if (e.target.tagName !== 'A') location.href = r.link;
      });

      resultsContainer.appendChild(card);
    });
  }
});
