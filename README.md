# Likely 👍

A local, unpacked Chrome extension that clicks **Invite** in a Facebook post's already-open reaction dialog. It attempts invitations one second apart, runs after its popup is closed, and provides cooldown, pause, stop, and session-limit controls.

Likely runs entirely in the browser. It has no server, account system, analytics, advertising, or remote code. See the [Privacy Policy](PRIVACY.md), [FAQ](FAQ.md), and [Support guide](SUPPORT.md).

## Install

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Choose **Load unpacked** and select the extracted **Likely** folder. To request a copy, email [we@theorange.design](mailto:we@theorange.design).
4. Pin **Likely** from Chrome's Extensions menu.
5. Existing Facebook tabs should connect automatically. If Chrome blocks injection on a special page, refresh the Facebook tab once.

## Use

1. Switch into the correct Facebook Page profile.
2. Open the target post and click its reaction count so the people/reactions dialog is visible.
3. Open the extension, choose conservative limits, and click **Start**.
4. You may close the extension popup and use another tab. Keep Chrome running, keep the Facebook tab open, and keep the reaction dialog open.
5. Reopen the extension to check progress, pause, or stop.

The extension only looks for visible buttons whose text is exactly `Invite` inside the open dialog. It does not open posts, choose audiences, bypass warnings, or solve checkpoints. Facebook can change its interface at any time, and use remains subject to Facebook's terms and limits.

## Project information

- [About Likely](ABOUT.md)
- [Privacy Policy](PRIVACY.md)
- [Frequently Asked Questions](FAQ.md)
- [Support](SUPPORT.md)
- [Terms and Disclaimer](TERMS.md)
- [Chrome Web Store submission material](STORE_LISTING.md)

## Reliability notes

- Background tabs can be throttled by Chrome, so timing may become slower than configured.
- Sleeping the computer, closing Chrome, navigating away, or closing the dialog stops effective operation.
- If Chrome discards the tab to save memory, reload the tab and start a new session.
- Stop immediately if Facebook displays a rate-limit warning, checkpoint, or unexpected confirmation.
