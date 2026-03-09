import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "@/components/header";
import appCss from "../styles.css?url";
export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Retro Game Library / Arcade",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "stylesheet", href: "/src/components/ui/8bit/styles/retro.css" },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <>
      <Header />
      <Outlet /> {/* render child routes */}
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
