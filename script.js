document.addEventListener('DOMContentLoaded', () => {
  // Elements for clocks
  const clocks = {
    porto: {
      timeEl: document.getElementById('time-porto'),
      tempValEl: document.querySelector('#temp-porto .temp-val'),
      tz: 'Europe/Lisbon',
      lat: 41.1496, lon: -8.6110
    },
    tehran: {
      timeEl: document.getElementById('time-tehran'),
      tempValEl: document.querySelector('#temp-tehran .temp-val'),
      tz: 'Asia/Tehran',
      lat: 35.6892, lon: 51.3890
    },
    toronto: {
      timeEl: document.getElementById('time-toronto'),
      tempValEl: document.querySelector('#temp-toronto .temp-val'),
      tz: 'America/Toronto',
      lat: 43.7001, lon: -79.4163
    }
  };

  const counterValue = document.getElementById('counter-value');
  const btnCountUp = document.getElementById('btn-count-up');
  const btnCountDown = document.getElementById('btn-count-down');
  const btnReset = document.getElementById('btn-reset');

  // --- Clock Logic ---
  const updateClocks = () => {
    const now = new Date();

    Object.values(clocks).forEach(clock => {
      // Get the HH:MM
      const timeStrMain = now.toLocaleTimeString('en-GB', {
        timeZone: clock.tz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      // Get SS
      const secStr = now.toLocaleTimeString('en-GB', {
        timeZone: clock.tz,
        second: '2-digit',
        hour12: false
      });

      // Format with a smaller second display for elegance
      clock.timeEl.innerHTML = `${timeStrMain}<span class="seconds">:${secStr}</span>`;
    });
  };

  // Run immediately then tick every second
  updateClocks();
  setInterval(updateClocks, 1000);

  // --- Temperature Fetching Logic ---
  // Open-Meteo API doesn't require an API key
  const fetchTemperatures = async () => {
    try {
      const fetchCityTemp = async (lat, lon) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        return Math.round(data.current_weather.temperature);
      };

      const results = await Promise.all([
        fetchCityTemp(clocks.porto.lat, clocks.porto.lon),
        fetchCityTemp(clocks.tehran.lat, clocks.tehran.lon),
        fetchCityTemp(clocks.toronto.lat, clocks.toronto.lon)
      ]);

      clocks.porto.tempValEl.textContent = results[0];
      clocks.tehran.tempValEl.textContent = results[1];
      clocks.toronto.tempValEl.textContent = results[2];

    } catch (error) {
      console.error("Failed to fetch temperatures:", error);
      clocks.porto.tempValEl.textContent = '--';
      clocks.tehran.tempValEl.textContent = '--';
      clocks.toronto.tempValEl.textContent = '--';
    }
  };

  fetchTemperatures();
  // Refresh temp every 10 minutes
  setInterval(fetchTemperatures, 10 * 60 * 1000);

  // --- Counter Logic ---
  let count = 0;

  const updateCounterDisplay = () => {
    counterValue.textContent = count;
    
    // Tiny bounce animation by applying transform then removing
    counterValue.style.transform = 'scale(1.15)';
    setTimeout(() => {
      counterValue.style.transform = 'scale(1)';
    }, 150);
  };

  btnCountUp.addEventListener('click', () => {
    count++;
    updateCounterDisplay();
    
    // Basic haptic feedback for supported mobile devices
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(15);
    }
  });

  btnCountDown.addEventListener('click', () => {
    count--;
    updateCounterDisplay();
    
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  });

  btnReset.addEventListener('click', () => {
    if (count !== 0) {
      count = 0;
      updateCounterDisplay(); // updates to 0
      
      // longer feedback for reset
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate([10, 40, 10]);
      }
    }
  });
});
