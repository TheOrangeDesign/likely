# Likely Frequently Asked Questions

## What is Likely?

Likely helps a Facebook Page administrator process the **Invite** buttons shown in an already-open post reaction dialog.

## What is the session limit?

The session limit is the maximum number of successful invitations Likely will process in one run. A limit of 500 means the run stops after 500 successful invitations, even if more Invite buttons remain.

## What do “Cooldown every” and “Cooldown minutes” mean?

“Cooldown every” is the number of successful invitations between longer rests. “Cooldown minutes” is the duration of each rest. For example, 100 and 5 means Likely rests for five minutes after every 100 successful invitations.

## Does Likely work after its popup is closed?

Yes, provided Chrome remains running, the Facebook tab remains open, the reaction dialog remains open, and the computer stays awake. Chrome may slow background tabs, so exact timing is not guaranteed.

## Why does Likely say it cannot connect?

Confirm that the active tab is a regular `www.facebook.com` or `web.facebook.com` page. Chrome blocks extensions on special pages such as `chrome://` pages. Reload the Facebook tab once after installing or updating Likely if the problem continues.

## Why does Likely say to open the reaction list?

Likely never chooses a post automatically. Open the correct post, click its reaction count, and leave the people/reactions dialog visible before pressing **Start**.

## Why did Likely stop early?

Common reasons are that the session limit was reached, no additional Invite buttons were found, the reaction dialog was closed, Facebook changed the page layout, or Facebook displayed a restriction or checkpoint.

## Does Likely guarantee that Facebook will not restrict my account?

No. Facebook controls its service and limits. Stop using Likely if Facebook displays a warning, checkpoint, or unexpected confirmation. Users are responsible for complying with Facebook's rules and applicable law.

## Does Likely collect Facebook data?

Likely temporarily reads the visible dialog structure and button labels locally to perform its function. It does not record or transmit names, profiles, reactions, credentials, browsing history, or other Facebook content. See the [Privacy Policy](PRIVACY.md).

## Is Likely affiliated with Facebook or Meta?

No. Likely is an independent project and is not affiliated with, endorsed by, or sponsored by Meta or Facebook.

## How do I report a problem?

Follow the steps in [Support](SUPPORT.md) and open a GitHub issue at <https://github.com/TheOrangeDesign/likely/issues>.
