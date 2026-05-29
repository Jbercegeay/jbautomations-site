# JB Automations Internal Console

Private working guides for client delivery.

## Routes

- `/internal/` — Client Delivery Console
- `/internal/discovery-call-guide.html` — full Discovery Call Guide

## Protection

The `/internal` route is protected by `middleware.ts` using Basic Auth.

Set these Vercel environment variables before relying on the hosted version:

- `INTERNAL_CONSOLE_USER`
- `INTERNAL_CONSOLE_PASSWORD`

If the variables are missing, `/internal` returns a 503 instead of exposing the guides.

Do not put passwords or client notes in this repository.
