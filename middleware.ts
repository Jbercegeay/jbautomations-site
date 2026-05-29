import { next } from '@vercel/functions';

declare const process: {
  env: Record<string, string | undefined>;
};

function unauthorized() {
  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="JB Automations Internal"',
      'Cache-Control': 'no-store'
    }
  });
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

export default function middleware(request: Request) {
  const url = new URL(request.url);

  if (!url.pathname.startsWith('/internal')) {
    return next();
  }

  const expectedUser = process.env.INTERNAL_CONSOLE_USER;
  const expectedPassword = process.env.INTERNAL_CONSOLE_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return new Response('Internal console password is not configured.', {
      status: 503,
      headers: {
        'Cache-Control': 'no-store'
      }
    });
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Basic ')) {
    return unauthorized();
  }

  let user = '';
  let password = '';

  try {
    const decoded = atob(authHeader.slice(6));
    const separator = decoded.indexOf(':');
    user = decoded.slice(0, separator);
    password = decoded.slice(separator + 1);
  } catch {
    return unauthorized();
  }

  if (!timingSafeEqual(user, expectedUser) || !timingSafeEqual(password, expectedPassword)) {
    return unauthorized();
  }

  return next();
}

export const config = {
  matcher: ['/internal/:path*']
};
