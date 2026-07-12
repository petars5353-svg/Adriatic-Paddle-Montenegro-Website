import { whatsappLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hi! I'd like to ask about your kayak tours in Montenegro.")}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition-transform hover:scale-110 float-y"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M16.01 3C9.38 3 4 8.37 4 15c0 2.1.55 4.15 1.6 5.96L4 29l8.25-1.56A12 12 0 0 0 16 27c6.63 0 12-5.37 12-12S22.64 3 16.01 3Zm0 21.8c-1.9 0-3.76-.5-5.38-1.46l-.39-.23-4.9.93.93-4.78-.25-.4A9.77 9.77 0 0 1 6.22 15c0-5.4 4.4-9.8 9.8-9.8 5.4 0 9.78 4.4 9.78 9.8 0 5.4-4.39 9.8-9.79 9.8Zm5.37-7.34c-.29-.15-1.73-.86-2-.95-.27-.1-.46-.15-.66.14-.19.29-.75.95-.92 1.14-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.45-1.72-1.62-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.5l-.56-.01c-.19 0-.51.07-.77.36-.27.29-1.02 1-1.02 2.44 0 1.44 1.05 2.83 1.2 3.02.15.19 2.06 3.15 5 4.42.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.11.56-.08 1.73-.71 1.97-1.39.24-.68.24-1.27.17-1.39-.07-.12-.26-.19-.55-.34Z" />
      </svg>
    </a>
  );
}
