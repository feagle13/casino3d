// Middleware de sécurité Next.js

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Headers de sécurité
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("X-XSS-Protection", "1; mode=block")

  // CSP (Content Security Policy)
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://accounts.google.com; frame-src https://accounts.google.com;",
  )

  // Rate limiting basique (en production, utiliser un service dédié)
  const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"

  // Bloquer les IPs suspectes (exemple basique)
  const suspiciousIPs = ["192.168.1.100"] // À remplacer par une vraie liste
  if (suspiciousIPs.includes(ip)) {
    return new NextResponse("Access Denied", { status: 403 })
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
