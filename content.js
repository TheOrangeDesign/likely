(() => {
  if (window.__pageReactionInviterInstalled) return;
  window.__pageReactionInviterInstalled = true;

  const state = { mode: "idle", invited: 0, nextAction: "", stopRequested: false, settings: null };
  const invitePattern = /^\s*invite\s*$/i;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const text = (el) => (el?.innerText || el?.textContent || "").trim();
  const visible = (el) => {
    if (!el?.isConnected) return false;
    const style = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
  };
  const disabled = (el) => !el || el.disabled || el.getAttribute("aria-disabled") === "true";
  const dialog = () => [...document.querySelectorAll('div[role="dialog"]')].find(visible) || null;
  const buttons = () => {
    const root = dialog();
    if (!root) return [];
    return [...root.querySelectorAll('button, [role="button"]')].filter((el) => invitePattern.test(text(el)) && visible(el) && !disabled(el));
  };
  const scroller = () => {
    const root = dialog();
    if (!root) return null;
    return [...root.querySelectorAll("*")].filter((el) => {
      const overflow = getComputedStyle(el).overflowY;
      return ["auto", "scroll", "overlay"].includes(overflow) && el.scrollHeight > el.clientHeight + 5;
    }).sort((a, b) => (b.scrollHeight - b.clientHeight) - (a.scrollHeight - a.clientHeight))[0] || null;
  };
  const publicState = () => ({ mode: state.mode, invited: state.invited, nextAction: state.nextAction });
  const waitWhilePaused = async () => {
    while (state.mode === "paused" && !state.stopRequested) await sleep(500);
  };
  const countdown = async (milliseconds, label) => {
    const end = Date.now() + milliseconds;
    while (Date.now() < end && !state.stopRequested) {
      await waitWhilePaused();
      if (state.stopRequested) break;
      const seconds = Math.ceil((end - Date.now()) / 1000);
      state.nextAction = `${label} in ${seconds}s`;
      await sleep(Math.min(1000, Math.max(100, end - Date.now())));
    }
    state.nextAction = "";
  };
  const confirmed = (button) => !button.isConnected || disabled(button) || !invitePattern.test(text(button));
  const clickOne = async (button) => {
    button.scrollIntoView({ block: "center", inline: "nearest" });
    await sleep(250);
    button.click();
    for (let i = 0; i < 8; i++) { await sleep(250); if (confirmed(button)) return true; }
    return false;
  };

  async function run() {
    let noProgress = 0;
    while (!state.stopRequested && state.invited < state.settings.limit) {
      await waitWhilePaused();
      if (state.stopRequested) break;
      if (!dialog()) { state.mode = "error"; state.nextAction = "Reaction dialog was closed"; return; }
      const button = buttons()[0];
      if (button) {
        state.mode = "running";
        if (await clickOne(button)) {
          state.invited += 1;
          noProgress = 0;
          if (state.invited >= state.settings.limit) break;
          if (state.invited % state.settings.batchSize === 0) {
            state.mode = "cooldown";
            await countdown(state.settings.cooldownMinutes * 60000, "Resume");
            if (!state.stopRequested) state.mode = "running";
          } else {
            await countdown(1000, "Next invite");
          }
        } else { noProgress += 1; await sleep(1500); }
      } else {
        const box = scroller();
        if (!box) { state.mode = "error"; state.nextAction = "Could not find the reaction list"; return; }
        const before = box.scrollTop;
        box.scrollTop = Math.min(box.scrollTop + Math.max(350, box.clientHeight * 0.8), box.scrollHeight - box.clientHeight);
        await sleep(1800);
        noProgress = box.scrollTop === before ? noProgress + 1 : 0;
        if (noProgress >= 3) { state.mode = "complete"; state.nextAction = "No more Invite buttons found"; return; }
      }
    }
    if (state.stopRequested) { state.mode = "stopped"; state.nextAction = ""; }
    else { state.mode = "complete"; state.nextAction = "Session limit reached"; }
  }

  chrome.runtime.onMessage.addListener((message, _sender, respond) => {
    if (message.type === "STATUS") { respond({ ok: true, state: publicState() }); return; }
    if (message.type === "STOP") { state.stopRequested = true; state.mode = "stopped"; state.nextAction = ""; respond({ ok: true, state: publicState() }); return; }
    if (message.type === "TOGGLE_PAUSE") {
      if (["running", "cooldown"].includes(state.mode)) state.mode = "paused";
      else if (state.mode === "paused") state.mode = "running";
      respond({ ok: true, state: publicState() }); return;
    }
    if (message.type === "START") {
      if (["running", "paused", "cooldown"].includes(state.mode)) { respond({ ok: false, error: "A session is already active.", state: publicState() }); return; }
      if (!dialog()) { respond({ ok: false, error: "Open the post's reaction list before starting.", state: publicState() }); return; }
      const s = message.settings || {};
      state.settings = {
        limit: Math.min(5000, Math.max(100, Number(s.limit) || 100)),
        batchSize: Math.min(500, Math.max(10, Number(s.batchSize) || 100)),
        cooldownMinutes: Math.min(60, Math.max(1, Number(s.cooldownMinutes) || 5))
      };
      state.invited = 0; state.stopRequested = false; state.mode = "running"; state.nextAction = "Starting";
      run().catch((error) => { state.mode = "error"; state.nextAction = error.message || "Unexpected error"; });
      respond({ ok: true, state: publicState() });
    }
  });
})();
