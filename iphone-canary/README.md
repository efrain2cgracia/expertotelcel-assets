# iPhone Share-Only Canary v31

Static non-production canary for `iphone.expertotelcel.com`.

- Production DNS is untouched.
- Every HTML page is `noindex,nofollow` and keeps its production canonical.
- `robots.txt` disallows all crawling.
- The AppDeploy/ChatGPT overlay is absent.
- A single native 52×52 Share control is shown on mobile next to the chat CTA.
- The iPhone 18 Pro Max 512 GB page includes the required AI-illustration disclosure.
- Local route matrix: 46/46 PASS at 390 px and 320 px.
- Web Share contract: 4/4 PASS for root and model page at 390 px and 320 px.
