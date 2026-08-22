export interface AuthUser {
  id: number;
  full_name: string;
  email: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
  user: AuthUser;
}

const ACCESS_TOKEN_KEY = 'lendai_access_token';
const REFRESH_TOKEN_KEY = 'lendai_refresh_token';
const USER_KEY = 'lendai_user';

async function request<T>(path: string, body: Record<string, string>): Promise<T> {
  const response = await fetch(`/api/auth/${path}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = (await response.json().catch(() => ({}))) as { detail?: string; non_field_errors?: string[] };
  if (!response.ok) {
    throw new Error(data.detail ?? data.non_field_errors?.[0] ?? 'Something went wrong.');
  }
  return data as T;
}

function saveSession(data: AuthResponse) {
  localStorage.setItem(ACCESS_TOKEN_KEY, data.access);
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}

export async function login(email: string, password: string) {
  const data = await request<AuthResponse>('login', { email, password });
  saveSession(data);
  return data.user;
}

export async function signup(fullName: string, email: string, password: string) {
  const data = await request<AuthResponse>('signup', { full_name: fullName, email, password });
  saveSession(data);
  return data.user;
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(ACCESS_TOKEN_KEY));
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function refreshAccessToken() {
  const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refresh) return false;
  const response = await fetch('/api/auth/token/refresh/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });
  if (!response.ok) return false;
  const data = await response.json() as { access: string };
  localStorage.setItem(ACCESS_TOKEN_KEY, data.access);
  return true;
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}