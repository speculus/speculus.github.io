# PrakashGosavi.com — static site

Plain HTML/CSS. No build step and no database. It can be hosted free on any static host.

```
index.html                       Home (race-day tips)  ->  /
about-prakash-gosavi/index.html  About page            ->  /about-prakash-gosavi
our-team/index.html              Team page             ->  /our-team
css/style.css                    All styling (colours at the top)
js/main.js                       Mobile menu + contact form
images/                          Logo, photos
```

## Updating race-day tips
Open `index.html` and edit everything between the
`RACE DAY CONTENT` and `END RACE DAY CONTENT` comments.
To add a race, copy one `<div class="race">…</div>` block. Then upload or push the file again.

## Changing font sizes
All sizes are in `css/style.css`.
- **Desktop:** the main rules, e.g. `body` (base text), `.article` (home tips), `.prose` (About page), `.disclaimer`, `.nav a` (menu).
- **Phones:** the block that starts with `@media (max-width: 700px)` near the bottom. Rules there override the desktop sizes on small screens.

## One-time setup

1. **Contact form** (Web3Forms, free): done. The access key is already in all three HTML files,
   and submissions go to `info@PrakashGosavi.com`. Manage it at https://web3forms.com.

2. **Hosting** (Netlify, free):
   - Sign up at https://app.netlify.com/drop and drag this whole folder onto the page.
     You get a `*.netlify.app` address to test.
   - To update the site later: Netlify → your site → *Deploys* → drag the folder in again.

3. **Domain** (registered at Wix, paid until 15 June 2028): use Wix's "pointing" method.
   - Netlify → *Domain management* → add `www.prakashgosavi.com`. Netlify shows the records to use.
   - Wix → *Domains* → `⋯` → *Manage DNS Records*:
     - **A record** (`prakashgosavi.com`): replace the Wix IPs with Netlify's load balancer IP (`75.2.60.5`).
     - **CNAME** (`www`): change `cdn3.wixdns.net` to `<your-site>.netlify.app`.
   - **Do NOT touch the MX record** (`aspmx.l.google.com`). That is your Google email.
   - Optional later: transfer the domain away from Wix to a cheaper registrar before 2028.

## Preview locally
```
python -m http.server 8000
```
Then open http://localhost:8000.
