import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ["/", "/api/auth"];

  // Rotas protegidas que requerem autenticação
  const protectedRoutes = ["/dashboard", "/configuracoes"];

  // Verifica se a rota atual é protegida
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Verifica se é uma rota pública
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Verifica se o usuário está autenticado
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session?.user && pathname === "/") {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Se rota protegida e usuário não autenticado, redireciona para login com callbackUrl
  if (isProtectedRoute && !session?.user) {
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Se usuário autenticado tentar acessar a página inicial (e não for rota pública), redireciona para dashboard
  if (session?.user && pathname === "/" && !isPublicRoute) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Configura quais rotas o proxy deve processar
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (imagens, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
