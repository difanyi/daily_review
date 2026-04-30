const STORAGE_KEY = "daily-review-records";

const form = document.getElementById("reviewForm");
const dateInput = document.getElementById("date");
const winsInput = document.getElementById("wins");
const issuesInput = document.getElementById("issues");
const improvementsInput = document.getElementById("improvements");
const tomorrowInput = document.getElementById("tomorrow");
const historyList = document.getElementById("historyList");

const exportBtn = document.getElementById("exportBtn");
const clearBtn = document.getElementById("clearBtn");

function getRecords() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function renderHistory() {
  const records = getRecords();
  const dates = Object.keys(records).sort((a, b) => b.localeCompare(a));
  historyList.innerHTML = "";

  if (!dates.length) {
    const li = document.createElement("li");
    li.textContent = "暂无记录";
    historyList.appendChild(li);
    return;
  }

  dates.forEach((date) => {
    const li = document.createElement("li");
    li.textContent = `${date}：${records[date].wins?.slice(0, 30) || "（无摘要）"}`;
    historyList.appendChild(li);
  });
}

function loadRecord(date) {
  const record = getRecords()[date] || {};
  winsInput.value = record.wins || "";
  issuesInput.value = record.issues || "";
  improvementsInput.value = record.improvements || "";
  tomorrowInput.value = record.tomorrow || "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = dateInput.value;
  if (!date) return;

  const records = getRecords();
  records[date] = {
    wins: winsInput.value.trim(),
    issues: issuesInput.value.trim(),
    improvements: improvementsInput.value.trim(),
    tomorrow: tomorrowInput.value.trim(),
    updatedAt: new Date().toISOString(),
  };

  saveRecords(records);
  renderHistory();
  alert("保存成功 ✅");
});

dateInput.addEventListener("change", () => {
  loadRecord(dateInput.value);
});

exportBtn.addEventListener("click", () => {
  const data = JSON.stringify(getRecords(), null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `daily-review-export-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

clearBtn.addEventListener("click", () => {
  const date = dateInput.value;
  if (!date) return;
  const records = getRecords();
  delete records[date];
  saveRecords(records);
  loadRecord(date);
  renderHistory();
});

dateInput.value = new Date().toISOString().slice(0, 10);
loadRecord(dateInput.value);
renderHistory();
