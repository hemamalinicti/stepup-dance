/* ==========================================================================
   Step Up Dance Academy - Schedule & Timetable Module
   ========================================================================== */

const scheduleData = [
  // Monday
  { id: 101, day: 'monday', title: 'Hip-Hop Beginners', time: '07:00 AM - 08:30 AM', instructor: 'Alex Rivera', room: 'Studio Alpha', level: 'Beginner', category: 'urban' },
  { id: 102, day: 'monday', title: 'Bharatanatyam Foundation', time: '05:00 PM - 06:30 PM', instructor: 'Priya Sundaram', room: 'Studio Beta', level: 'All Levels', category: 'classical' },
  { id: 103, day: 'monday', title: 'Contemporary Masterclass', time: '06:30 PM - 08:00 PM', instructor: 'Elena Rostova', room: 'Studio Alpha', level: 'Intermediate/Advanced', category: 'contemporary' },

  // Tuesday
  { id: 201, day: 'tuesday', title: 'Bollywood Cardio & Beats', time: '07:30 AM - 08:30 AM', instructor: 'Karan Malhotra', room: 'Studio Alpha', level: 'All Levels', category: 'social' },
  { id: 202, day: 'tuesday', title: 'Salsa & Bachata Partnering', time: '06:00 PM - 07:30 PM', instructor: 'Marcus & Sophia', room: 'Studio Beta', level: 'Beginner/Intermediate', category: 'social' },
  { id: 203, day: 'tuesday', title: 'Commercial Jazz & Heels', time: '07:30 PM - 09:00 PM', instructor: 'Elena Rostova', room: 'Studio Alpha', level: 'Intermediate', category: 'contemporary' },

  // Wednesday
  { id: 301, day: 'wednesday', title: 'Kids Dance Grooves (Age 5-11)', time: '04:30 PM - 05:30 PM', instructor: 'Priya Sundaram', room: 'Studio Beta', level: 'Kids', category: 'kids' },
  { id: 302, day: 'wednesday', title: 'Hip-Hop Urban Choreography', time: '06:00 PM - 07:30 PM', instructor: 'Alex Rivera', room: 'Studio Alpha', level: 'Advanced', category: 'urban' },
  { id: 303, day: 'wednesday', title: 'Kathak & Indian Classical Fusion', time: '07:30 PM - 09:00 PM', instructor: 'Priya Sundaram', room: 'Studio Beta', level: 'Intermediate', category: 'classical' },

  // Thursday
  { id: 401, day: 'thursday', title: 'Power Contemporary Workout', time: '07:00 AM - 08:15 AM', instructor: 'Elena Rostova', room: 'Studio Alpha', level: 'All Levels', category: 'contemporary' },
  { id: 402, day: 'thursday', title: 'Salsa Social Styling', time: '06:00 PM - 07:15 PM', instructor: 'Marcus & Sophia', room: 'Studio Beta', level: 'Intermediate', category: 'social' },
  { id: 403, day: 'thursday', title: 'Bollywood Stage Choreography', time: '07:30 PM - 09:00 PM', instructor: 'Karan Malhotra', room: 'Studio Alpha', level: 'Intermediate', category: 'social' },

  // Friday
  { id: 501, day: 'friday', title: 'Popping & Locking Foundations', time: '05:30 PM - 07:00 PM', instructor: 'Alex Rivera', room: 'Studio Alpha', level: 'Beginner/Intermediate', category: 'urban' },
  { id: 502, day: 'friday', title: 'Sensual Bachata & Cuban Salsa', time: '07:00 PM - 08:30 PM', instructor: 'Marcus & Sophia', room: 'Studio Beta', level: 'All Levels', category: 'social' },
  { id: 503, day: 'friday', title: 'Friday Night Jam Session', time: '08:30 PM - 10:00 PM', instructor: 'Faculty Team', room: 'Main Arena', level: 'Open Floor', category: 'urban' },

  // Saturday
  { id: 601, day: 'saturday', title: 'Little Stars Dance (Age 4-8)', time: '09:00 AM - 10:15 AM', instructor: 'Priya Sundaram', room: 'Studio Beta', level: 'Kids', category: 'kids' },
  { id: 602, day: 'saturday', title: 'Hip-Hop Choreo Intensive', time: '10:30 AM - 12:30 PM', instructor: 'Alex Rivera', room: 'Studio Alpha', level: 'Intermediate/Advanced', category: 'urban' },
  { id: 603, day: 'saturday', title: 'Bollywood Explosive Weekend', time: '04:00 PM - 05:30 PM', instructor: 'Karan Malhotra', room: 'Studio Alpha', level: 'All Levels', category: 'social' },
  { id: 604, day: 'saturday', title: 'Classical Bharatanatyam Arangetram Prep', time: '05:30 PM - 07:00 PM', instructor: 'Priya Sundaram', room: 'Studio Beta', level: 'Advanced', category: 'classical' },

  // Sunday
  { id: 701, day: 'sunday', title: 'Sunday Morning Yoga & Dance Conditioning', time: '08:00 AM - 09:30 AM', instructor: 'Elena Rostova', room: 'Studio Alpha', level: 'All Levels', category: 'contemporary' },
  { id: 702, day: 'sunday', title: 'Teen Dance Troupe Practice', time: '10:00 AM - 12:00 PM', instructor: 'Faculty Team', room: 'Main Arena', level: 'Troupe Only', category: 'urban' },
  { id: 703, day: 'sunday', title: 'Social Salsa & Bachata Party Practice', time: '05:00 PM - 07:00 PM', instructor: 'Marcus & Sophia', room: 'Studio Alpha', level: 'Open Level', category: 'social' }
];

let activeDay = 'all';
let activeCategory = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('timetableGrid')) {
    initScheduleApp();
  }
});

function initScheduleApp() {
  const dayTabs = document.querySelectorAll('.day-tab');
  const searchInput = document.getElementById('scheduleSearch');
  const categorySelect = document.getElementById('categoryFilter');

  // Day tab clicks
  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dayTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeDay = tab.getAttribute('data-day');
      renderSchedule();
    });
  });

  // Search filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderSchedule();
    });
  }

  // Category select filter
  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      activeCategory = e.target.value;
      renderSchedule();
    });
  }

  renderSchedule();
}

function renderSchedule() {
  const container = document.getElementById('timetableGrid');
  if (!container) return;

  const filtered = scheduleData.filter(item => {
    const matchesDay = activeDay === 'all' || item.day === activeDay;
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery) ||
      item.instructor.toLowerCase().includes(searchQuery) ||
      item.level.toLowerCase().includes(searchQuery);

    return matchesDay && matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-glass);">
        <i class="fas fa-calendar-times" style="font-size: 3rem; color: var(--text-dim); margin-bottom: 1rem; display: block;"></i>
        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">No Classes Found</h3>
        <p class="text-muted">Try changing your day filter, category, or search terms.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="timetable-card">
      <div>
        <div class="timetable-header">
          <span class="timetable-time">${item.time}</span>
          <span class="badge badge-purple">${capitalize(item.day)}</span>
        </div>
        <h3 class="timetable-title">${item.title}</h3>
        <div class="timetable-details">
          <div><i class="fas fa-user-ninja" style="color: var(--primary)"></i> <strong>Instructor:</strong> ${item.instructor}</div>
          <div><i class="fas fa-layer-group" style="color: var(--secondary)"></i> <strong>Level:</strong> ${item.level}</div>
          <div><i class="fas fa-map-marker-alt" style="color: var(--accent-pink)"></i> <strong>Location:</strong> ${item.room}</div>
        </div>
      </div>
      <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
        <button class="btn btn-outline btn-sm" style="flex: 1" data-modal-target="trialModal" data-course-title="${item.title}">
          <i class="fas fa-ticket-alt"></i> Book Slot
        </button>
      </div>
    </div>
  `).join('');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
