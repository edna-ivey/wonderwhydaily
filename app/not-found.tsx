import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found shell" id="main-content">
      <p className="section-kicker">A mystery remains</p>
      <h1>We could not find that wonder.</h1>
      <p>It may have wandered off to investigate something interesting.</p>
      <Link className="button button-dark" href="/">
        See today&apos;s wonder
      </Link>
    </main>
  );
}
