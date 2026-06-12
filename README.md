# JB Automations Site

Public website for JB Automations, an AI consulting and workflow automation business focused on practical AI adoption for small businesses.

## What It Includes

- A static marketing site with service positioning, case-study style examples, founder bio, and contact paths.
- A contact form that posts to Formspree and identifies leads for HubSpot tracking.
- Static assets for the JB Automations logo and founder image.
- A protected internal delivery console under `/internal`.
- Vercel middleware for Basic Auth protection on internal pages.

## Tech Stack

- Static HTML, CSS, and JavaScript
- Vercel hosting
- Vercel middleware
- Formspree contact form
- HubSpot tracking

## Project Structure

- `index.html`: public JB Automations landing page.
- `logo.png`: brand mark used by the site.
- `johnny.jpg`: founder image used on the public page.
- `internal/`: protected client-delivery console pages.
- `middleware.ts`: Basic Auth protection for internal routes.
- `package.json`: static build script for Vercel output.

## Local Development

Open `index.html` directly in a browser for a quick local preview.

To build the static output folder used by deployment:

```bash
npm install
npm run build
```

The build script copies the public site and internal pages into `public/`.

## Internal Route Protection

The `/internal` route expects these Vercel environment variables:

```env
INTERNAL_CONSOLE_USER=your_user
INTERNAL_CONSOLE_PASSWORD=your_password
```

If either variable is missing, the internal route returns a service-unavailable response instead of exposing delivery guides.

## Notes

Do not commit client notes, credentials, or private delivery materials to this repository. The checked-in internal pages are reusable guides, not client-specific records.
