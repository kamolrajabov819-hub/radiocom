import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import "../lib/i18n";
import { hydrateLanguage } from "../lib/i18n";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { StickyLeadNet } from "../components/StickyLeadNet";
import { LeadFormSheet } from "../components/LeadFormSheet";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-pitch px-6">
      <div className="max-w-md">
        <div className="text-mono text-[11px] text-signal mb-6">ERROR · 404</div>
        <h1 className="text-display text-7xl text-crisp">Signal lost.</h1>
        <p className="mt-4 text-sm text-cool">The frequency you're tuned to doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex mt-8 text-mono text-[11px] bg-signal text-crisp px-6 py-3 hover:bg-signal/90"
        >
          Return to base
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-pitch px-6">
      <div className="max-w-md">
        <div className="text-mono text-[11px] text-signal mb-6">ERROR</div>
        <h1 className="text-display text-5xl text-crisp">Something interfered.</h1>
        <p className="mt-4 text-sm text-cool">Refresh the channel or head home.</p>
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="text-mono text-[11px] bg-signal text-crisp px-6 py-3 hover:bg-signal/90"
          >
            Retry
          </button>
          <a href="/" className="text-mono text-[11px] border border-crisp/30 text-crisp px-6 py-3 hover:border-signal hover:text-signal">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Radiocom — Professional Radio Systems in Uzbekistan" },
      { name: "description", content: "11 years. 10,000+ clients. Motorola, Hytera and PoC radios with authorized service, free testing and nationwide delivery." },
      { property: "og:title", content: "Radiocom — Professional Radio Systems in Uzbekistan" },
      { property: "og:description", content: "11 years. 10,000+ clients. Motorola, Hytera and PoC radios with authorized service, free testing and nationwide delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0a0a0a" },
      { name: "twitter:title", content: "Radiocom — Professional Radio Systems in Uzbekistan" },
      { name: "twitter:description", content: "11 years. 10,000+ clients. Motorola, Hytera and PoC radios with authorized service, free testing and nationwide delivery." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/2c10cbb9-e240-4528-a145-b23d0936f9da" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/2c10cbb9-e240-4528-a145-b23d0936f9da" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => { hydrateLanguage(); }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-pitch text-crisp">
        <Nav />
        <main>
          <Outlet />
        </main>
        <Footer />
        <StickyLeadNet />
        <LeadFormSheet />
      </div>
    </QueryClientProvider>
  );
}
