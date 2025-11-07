import { createServerClient } from '@supabase/ssr';
import type { APIContext, MiddlewareNext } from 'astro';

// Rotas protegidas (como tínhamos antes)
const protectedRoutes = ['/', '/membros', '/cursos', '/perfil', '/post', '/conta'];
const authRoutes = ['/login', '/cadastro'];

// 1. Criamos o cliente DENTRO do middleware
export const onRequest = async (context: APIContext, next: MiddlewareNext) => {
  const supabase = createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL!,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => context.cookies.get(name)?.value,
        set: (name: string, value: string, options?: any) => {
          const isProd = import.meta.env.PROD;
          const base = options ?? {};
          context.cookies.set(name, value, {
            ...base,
            path: base.path ?? '/',
            httpOnly: base.httpOnly ?? true,
            sameSite: base.sameSite ?? 'lax',
            secure: base.secure ?? (isProd ? true : false),
          });
        },
        remove: (name: string, options?: any) => {
          const isProd = import.meta.env.PROD;
          const base = options ?? {};
          context.cookies.delete(name, {
            ...base,
            path: base.path ?? '/',
            httpOnly: base.httpOnly ?? true,
            sameSite: base.sameSite ?? 'lax',
            secure: base.secure ?? (isProd ? true : false),
          });
        },
      },
    }
  );

  // Disponibiliza o cliente para as páginas SSR
  context.locals.supabase = supabase;

  // 2. Obtém o utilizador autenticado
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    context.locals.user = user;
  }

  // 3. Lógica de proteção de rotas
  const currentPath = context.url.pathname;
  const isProtectedRoute = protectedRoutes.some(
    (route) => currentPath === route || currentPath.startsWith(route + '/')
  );
  const isAuthRoute = authRoutes.includes(currentPath);

  if (isProtectedRoute && !user) {
    return context.redirect('/login');
  }

  if (isAuthRoute && user) {
    return context.redirect('/');
  }

  // 4. Segue o fluxo normal
  return next();
};