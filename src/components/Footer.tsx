import Link from "next/link";
import { nav, site, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";
import { WaveDivider } from "./WaveDivider";

export function Footer() {
  return (
    <footer className="relative mt-24 bg-sea-900 text-sea-100">
      <div className="text-sea-900">
        <WaveDivider className="text-sea-900" flip />
      </div>
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-12 pt-4 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-9 w-9 text-sea-300" />
            <span className="font-display text-lg font-semibold text-white">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sea-200/80">{site.description}</p>
          <p className="mt-4 text-sm text-sea-200/70">{site.address}</p>
          <p className="text-sm text-sea-200/70">Season: {site.season}</p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-sea-300">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sea-200/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-sea-300">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="text-sea-200/80 hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phoneDisplay.replace(/\s/g, "")}`} className="text-sea-200/80 hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={whatsappLink("Hi! I have a question about your kayak tours.")} className="text-sea-200/80 hover:text-white" target="_blank" rel="noopener">
                WhatsApp us
              </a>
            </li>
            <li className="flex gap-4 pt-2">
              <a href={site.social.instagram} className="text-sea-200/80 hover:text-white" target="_blank" rel="noopener">Instagram</a>
              <a href={site.social.facebook} className="text-sea-200/80 hover:text-white" target="_blank" rel="noopener">Facebook</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-sea-200/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/admin" className="hover:text-white">Owner login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
