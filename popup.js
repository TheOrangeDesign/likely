const $ = (id) => document.getElementById(id);
const controls = { limit: $("limit"), batchSize: $("batchSize"), cooldown: $("cooldown") };

async function activeFacebookTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !/^https:\/\/(www|web)\.facebook\.com\//.test(tab.url || "")) {
    throw new Error("Open the Facebook post tab first.");
  }
  return tab;
}

async function send(type, extra = {}) {
  const tab = await activeFacebookTab();
  try {
    return await chrome.tabs.sendMessage(tab.id, { type, ...extra });
  } catch (error) {
    const missingReceiver = /receiving end does not exist|could not establish connection/i.test(error?.message || "");
    if (!missingReceiver) throw error;
    await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
    return chrome.tabs.sendMessage(tab.id, { type, ...extra });
  }
}

function render(state) {
  const labels = { running: "Running", paused: "Paused", cooldown: "Cooling down", stopped: "Stopped", complete: "Session complete", idle: "Ready", error: "Needs attention" };
  $("statusText").textContent = labels[state.mode] || state.mode;
  const importantDetail = state.mode === "error" && state.nextAction ? ` · ${state.nextAction}` : "";
  $("details").textContent = `${state.invited || 0} invited this session${importantDetail}`;
  $("statusDot").style.background = state.mode === "running" ? "#31a24c" : state.mode === "error" ? "#f02849" : state.mode === "paused" ? "#f7b928" : "#8a8d91";
}

function settings() {
  return {
    limit: Number(controls.limit.value),
    batchSize: Number(controls.batchSize.value),
    cooldownMinutes: Number(controls.cooldown.value)
  };
}

async function act(type) {
  $("message").textContent = "";
  try {
    const response = await send(type, type === "START" ? { settings: settings() } : {});
    if (!response?.ok) throw new Error(response?.error || "Facebook tab did not respond. Refresh it after installing the extension.");
    render(response.state);
    if (type === "START") await chrome.storage.local.set({ settings: settings() });
  } catch (error) { $("message").textContent = error.message; }
}

$("start").addEventListener("click", () => act("START"));
$("pause").addEventListener("click", () => act("TOGGLE_PAUSE"));
$("stop").addEventListener("click", () => act("STOP"));

(async () => {
  const saved = (await chrome.storage.local.get("settings")).settings;
  if (saved) Object.entries(saved).forEach(([key, value]) => { if (controls[key]) controls[key].value = value; });
  controls.limit.value = Math.min(5000, Math.max(100, Number(controls.limit.value) || 100));
  controls.batchSize.value = Math.min(500, Math.max(10, Number(controls.batchSize.value) || 100));
  try { const response = await send("STATUS"); if (response?.state) render(response.state); } catch (error) { $("message").textContent = error.message; }
  setInterval(async () => { try { const response = await send("STATUS"); if (response?.state) render(response.state); } catch (_) {} }, 1000);
})();
