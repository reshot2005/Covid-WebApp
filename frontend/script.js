let covidData = {};
let selectedCountry = "";

// Load the JSON data once on page load
window.onload = async () => {
  try {
    const res = await fetch("../backend/data.json"); // Adjust if file is elsewhere
    covidData = await res.json();

    // Check if this page has a table and auto-fill it (for datafran.html)
    if (document.querySelector("#dataTable") && !document.querySelector("#countrySearch")) {
      const defaultCountry = "India"; // Change to preferred default
      if (covidData[defaultCountry]) {
        displayTable(covidData[defaultCountry]);
      } else {
        alert("No data found for default country.");
      }
    }
  } catch (err) {
    console.error("Failed to load data.json:", err);
  }
};

// Only attach event listeners if those buttons exist (on index.html)
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("countrySearch");
  const showGraphBtn = document.getElementById("showGraphBtn");
  const showDataBtn = document.getElementById("showDataBtn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      selectedCountry = e.target.value.trim();
    });
  }

  if (showGraphBtn) {
    showGraphBtn.addEventListener("click", () => {
      if (!covidData[selectedCountry]) return alert("Country not found.");
      displayGraph(covidData[selectedCountry]);
    });
  }

  if (showDataBtn) {
    showDataBtn.addEventListener("click", () => {
      if (!covidData[selectedCountry]) return alert("Country not found.");
      displayTable(covidData[selectedCountry]);
    });
  }
});

// Graph drawing function
function displayGraph(countryData) {
  document.getElementById("graphSection").classList.remove("hidden");
  document.getElementById("dataSection").classList.add("hidden");

  const labels = countryData.map(entry => entry.date);
  const confirmed = countryData.map(entry => entry.confirmed);
  const deaths = countryData.map(entry => entry.deaths);
  const recovered = countryData.map(entry => entry.recovered);

  const ctx = document.getElementById("covidChart").getContext("2d");
  if (window.myChart) window.myChart.destroy();

  window.myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Confirmed",
          data: confirmed,
          borderColor: "#00ffd0",
          backgroundColor: "transparent",
          pointBackgroundColor: "#00ffd0",
          pointRadius: 4,
          borderWidth: 3,
          tension: 0.3,
        },
        {
          label: "Recovered",
          data: recovered,
          borderColor: "#00ff6a",
          backgroundColor: "transparent",
          pointBackgroundColor: "#00ff6a",
          pointRadius: 3,
          borderWidth: 2,
          tension: 0.3,
        },
        {
          label: "Deaths",
          data: deaths,
          borderColor: "#ff4f69",
          backgroundColor: "transparent",
          pointBackgroundColor: "#ff4f69",
          pointRadius: 3,
          borderWidth: 2,
          tension: 0.3,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#ffffff",
            font: {
              size: 14,
              weight: "bold",
            },
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      scales: {
        x: {
          ticks: {
            color: "#dddddd",
            maxRotation: 45,
          },
          grid: {
            color: "rgba(255, 255, 255, 0.05)",
          },
        },
        y: {
          ticks: {
            color: "#dddddd",
            callback: function (value) {
              return value.toLocaleString();
            },
          },
          grid: {
            color: "rgba(255, 255, 255, 0.05)",
          },
        },
      },
    },
  });
}

// Table rendering function
function displayTable(countryData) {
  const tbody = document.querySelector("#dataTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  countryData.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.date}</td>
      <td>${row.confirmed}</td>
      <td>${row.recovered}</td>
      <td>${row.deaths}</td>
    `;
    tbody.appendChild(tr);
  });
}
