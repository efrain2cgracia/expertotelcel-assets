# AppDeploy patch v32 — overlay-aware Share

Prepared for AppDeploy app `iphone-experto-telcel-zvrqk3`.

Current source baseline:

- Applied version: `1790209027114`
- Public domain: `https://iphone.expertotelcel.com/`
- Current official overlay response: `show_overlay=true`
- Current account plan verified in dashboard: Free

## Required visible result

On mobile, the customer must see only one Share control after the official AppDeploy overlay is disabled. The page must never display a duplicate native Share button while the official overlay remains active.
## Behavior

`share-only.js` queries the same official AppDeploy availability endpoint used by the platform overlay:

- `show_overlay=true`: native Share stays hidden and the existing chat CTA keeps its original width.
- `show_overlay=false`: one 52×52 native Share button appears and the chat CTA makes room for it.
- Network/API uncertainty: fail closed; native Share stays hidden to prevent duplicate controls.

The script does not remove, modify, penetrate or bypass the AppDeploy overlay. Watermark removal must happen through the supported AppDeploy plan or platform setting.

## Additional P0 corrections

- Root manifest served at `/manifest.json` to prevent the nested relative-manifest 403.
- iPhone 18 Pro Max 512 GB image alt explicitly identifies an AI-generated illustration.
- Visible disclaimer is placed immediately below that illustration.
## QA completed

Matrix: root and iPhone 18 Pro Max 512 GB, at 390 px and 320 px, with official overlay state simulated both ON and OFF.

- 8/8 matrix cases HTTP 200.
- 8/8 no horizontal overflow.
- 8/8 Axe WCAG A/AA with zero violations.
- 8/8 zero touch targets below 44×44 px.
- Overlay ON: native Share hidden, chat CTA unshifted.
- Overlay OFF: exactly one visible 52×52 Share, Web Share invoked, chat CTA shifted safely.
- Zero JavaScript errors and zero HTTP errors in final matrix.
- No `wa.me`, `tel:` or `sms:` links.

Evidence: `qa/overlay-state-matrix-v32.json`.
## Deployment gates

Do not deploy before AppDeploy's credit reset or an explicitly authorized plan change.

Do not purchase Plus or alter billing without a new explicit approval from Payín.

After deployment, verify the public URL, official `/p` response, overlay visibility, native Share visibility, manifest, disclosure, canonical, robots, CTA, Axe, console and network. Preserve the prior AppDeploy version as rollback.

Global status remains HOLD until the public page shows the requested single Share control and the required final audits pass.
