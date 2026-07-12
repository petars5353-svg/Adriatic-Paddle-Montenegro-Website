import { Container, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl">🛶</div>
      <h1 className="mt-6 text-4xl font-semibold">Off the map</h1>
      <p className="mt-3 max-w-md text-sea-800/80">
        This page has drifted out to sea. Let&apos;s paddle you back to shore.
      </p>
      <div className="mt-7 flex gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/book" variant="ghost">Book a tour</Button>
      </div>
    </Container>
  );
}
