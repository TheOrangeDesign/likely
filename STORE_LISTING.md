# Chrome Web Store Submission Material

This file contains ready-to-paste listing and reviewer material for Likely. Confirm that every statement still matches the submitted build before using it.

## Product details

**Name:** Likely

**Summary (132 characters maximum):**  
Process Invite buttons from an open Facebook post reaction dialog with session limits, cooldowns, pause, and stop controls.

**Category:** Productivity

**Language:** English

**Detailed description:**

> Likely helps authorized Facebook Page administrators process the Invite buttons displayed in an already-open post reaction dialog.
>
> You choose the Page and post, open its reaction list, configure a session limit and cooldown, and press Start. Likely works only in that user-selected dialog and provides pause, resume, stop, progress, and automatic session completion.
>
> Key features:
> - User-selected post and reaction dialog
> - Session-limit control
> - Configurable cooldown frequency and duration
> - Pause, resume, and immediate stop
> - Local-only operation with no account registration
> - No analytics, advertising, or remote code
>
> Likely does not sign in, switch Pages, select posts, collect profile information, bypass Facebook warnings, or guarantee that Facebook will accept invitations. Chrome and the selected Facebook tab must remain open while a session is running.
>
> Likely is not affiliated with, endorsed by, or sponsored by Meta or Facebook. Users are responsible for complying with Facebook's terms and applicable rules.

**Official website:** <https://github.com/TheOrangeDesign/likely>

**Support URL:** <https://github.com/TheOrangeDesign/likely/issues>

**Support email:** we@theorange.design

**Privacy policy URL:** <https://github.com/TheOrangeDesign/likely/blob/main/PRIVACY.md>

## Single purpose

Likely processes visible Invite buttons inside a Facebook post reaction dialog that the user deliberately opens and selects.

## Permission justifications

**activeTab:** Likely needs temporary access to the active Facebook tab after the user opens the extension. It does not request persistent access to browsing activity or unrelated tabs.

**scripting:** Likely injects its packaged `content.js` file into the user-selected Facebook tab so it can find visible Invite buttons, activate them, verify the visible result, and scroll the open dialog. It does not inject third-party or remotely hosted code.

**storage:** Likely stores only the user's session-limit, cooldown-frequency, and cooldown-duration preferences in Chrome's local extension storage so the controls retain their previous values.

## Remote code declaration

Select **No, I am not using remote code**. All executable JavaScript is packaged with the extension. Likely does not download code, use `eval`, or load external scripts.

## Data-use disclosure

Likely temporarily handles **website content** locally because it reads visible dialog structure and button labels in the user-selected Facebook tab. This processing is required for the extension's prominently disclosed purpose.

Likely does not collect or transmit this website content. It does not collect personally identifiable information, authentication information, financial information, health information, personal communications, location, general web history, or user-generated content for storage or transfer. Settings are stored locally and are not sent to the developer.

Certify the Chrome Web Store Limited Use disclosures only while these statements remain accurate.

## Reviewer testing instructions

1. Sign in to a Facebook account that is authorized to administer a Page and has a post with reactions.
2. Switch to the relevant Page profile.
3. Open the post and click the reaction count to display the reaction dialog.
4. Open Likely from the Chrome toolbar.
5. Leave the default session limit and cooldown settings, then click **Start**.
6. Observe that Likely processes only visible buttons labeled Invite within the open dialog.
7. Use **Pause** and **Stop** to verify immediate user control.
8. Close the reaction dialog and start again to verify that Likely reports that the dialog must be open.

Testing requires a Facebook Page/post where the signed-in reviewer is eligible to see Invite buttons. Likely does not provide or request test credentials.

## Distribution suggestion

Start with **Unlisted** or a limited test group if the dashboard supports the intended distribution. Confirm the complete workflow on a clean Chrome profile before considering public distribution.

## Required graphic assets

- Store icon: `icons/likely-128.png` (128x128 PNG)
- At least one actual-product screenshot: 1280x800 PNG or JPEG; up to five
- Small promotional tile: 440x280 PNG or JPEG
- Optional marquee promotional image: 1400x560 PNG or JPEG

Screenshots must show the current extension interface and should use a test reaction dialog with all names, profile photos, URLs, and account details blurred or replaced with authorized test data.

## Pre-submission checklist

- [ ] Replace or confirm the developer contact email in the Chrome Web Store developer account.
- [ ] Test the uploaded ZIP on a clean Chrome profile.
- [ ] Verify Start, Pause, Resume, Stop, cooldown, session completion, and error states.
- [ ] Confirm the manifest version and listing version match the intended release.
- [ ] Confirm the privacy policy matches the exact submitted behavior.
- [ ] Upload the 128x128 icon, at least one 1280x800 screenshot, and the 440x280 promotional tile.
- [ ] Complete the single-purpose, permission, remote-code, and data-use fields using the material above.
- [ ] Add the support and privacy URLs.
- [ ] Review all screenshots for personal information.
- [ ] Avoid claims that Likely prevents restrictions, guarantees results, or is affiliated with Facebook/Meta.
