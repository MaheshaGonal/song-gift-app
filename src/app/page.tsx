import DemoPlayers from "@/components/DemoPlayers";
import OrderForm from "@/components/OrderForm";

export default function Home() {
  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <span className="knot"></span> A Song For Them
          </div>
          <div className="navlinks">
            <a href="#demo">Hear samples</a>
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
          </div>
          <a href="#order" className="nav-cta">
            Start yours
          </a>
        </nav>
      </header>

      <section className="hero">
        <div className="wrap">
          <span className="kicker">A gift that plays back</span>
          <h1>Some memories deserve their own song.</h1>
          <p className="sub">
            Tell us the story — a name, a moment, an inside joke — and we&apos;ll
            turn it into an original song, written and produced just for the
            person you&apos;re giving it to.
          </p>
          <div className="hero-ctas">
            <a href="#demo" className="btn btn-primary">
              Hear a sample
            </a>
            <a href="#order" className="btn btn-outline">
              Get yours made
            </a>
          </div>
          <div className="hero-thread-art"></div>
        </div>
      </section>

      <section className="demo" id="demo">
        <div className="wrap">
          <div className="section-head">
            <span className="tag">Listen first</span>
            <h2>Three stories, three songs</h2>
            <p>
              Every song starts as a few details someone shares with us.
              Here&apos;s what that becomes.
            </p>
          </div>
          <DemoPlayers />
        </div>
      </section>

      <section className="section thread" id="how">
        <div className="wrap">
          <div className="section-head">
            <span className="tag">The process</span>
            <h2>From your story to their song</h2>
          </div>
          <div className="steps">
            <div className="step">
              <span className="num">1</span>
              <h3>Tell us the story</h3>
              <p>
                Fill in the names, the occasion, and the moments that matter —
                a fight you had, a place you met, a joke only you two get.
              </p>
            </div>
            <div className="step">
              <span className="num">2</span>
              <h3>We write and produce it</h3>
              <p>
                A real lyricist shapes your details into a song, then we
                produce it in the genre and language you choose — usually
                ready in 3–5 days.
              </p>
            </div>
            <div className="step">
              <span className="num">3</span>
              <h3>You get the reveal</h3>
              <p>
                A private link with your finished song, or your song set to a
                custom video — ready to play at the moment that matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="wrap">
          <div className="section-head">
            <span className="tag">Pricing</span>
            <h2>Two ways to give it</h2>
            <p>
              One preview before you pay in full — you&apos;ll know it&apos;s right
              before you commit.
            </p>
          </div>
          <div className="pricing-grid">
            <div className="price-card">
              <h3>Just the song</h3>
              <div className="desc">
                A full original track, written and produced around your
                story.
              </div>
              <div className="amount">
                <sup>₹</sup>99
              </div>
              <span className="per">one song, one story</span>
              <ul>
                <li>Custom lyrics from your brief</li>
                <li>Full-length original song (2–3 min)</li>
                <li>One free revision round</li>
                <li>MP3 download + private share link</li>
                <li>3–5 day delivery</li>
              </ul>
              <a href="#order" className="btn btn-outline">
                Choose this
              </a>
            </div>
            <div className="price-card featured">
              <span className="badge">Most gifted</span>
              <h3>Song + video</h3>
              <div className="desc">
                Your song, set to a custom visual story built around it.
              </div>
              <div className="amount">
                <sup>₹</sup>499
              </div>
              <span className="per">song + full video</span>
              <ul>
                <li>Everything in &quot;Just the song&quot;</li>
                <li>Custom AI-animated video for your track</li>
                <li>Reel-ready vertical cut included</li>
                <li>Two free revision rounds</li>
                <li>Private share page for sending</li>
              </ul>
              <a href="#order" className="btn btn-primary">
                Choose this
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial thread">
        <blockquote>
          &quot;I&apos;ve heard my own wedding story told back to me in a hundred
          toasts. I&apos;d never heard it sung.&quot;
        </blockquote>
        <cite>— placeholder quote, swap for a real client line once you have one</cite>
      </section>

      <section className="order" id="order">
        <div className="wrap">
          <div className="order-grid">
            <div>
              <h2>Tell us who it&apos;s for</h2>
              <p>
                A few details is all we need to start writing. We&apos;ll come
                back with a preview before anything is final.
              </p>
              <ul className="order-list">
                <li>No musical experience needed on your end</li>
                <li>Preview + one free revision included</li>
                <li>Delivered privately, yours to share however you like</li>
              </ul>
            </div>
            <OrderForm />
          </div>
        </div>
      </section>

      <footer>
        <div className="logo">
          <span className="knot"></span> A Song For Them
        </div>
        <div>
          Made with a story, a melody, and a little thread that ties them
          together.
        </div>
      </footer>
    </>
  );
}
