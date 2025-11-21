// src/pages/Home.jsx
import HeroCanvas from "../components/HeroCanvas.jsx";

export default function Home() {
  return (
    <>
      <section className="heroSection" style={{ minHeight: "100vh" }}>
        <div className="heroContent">
          <h1>Witness X — Operation X42</h1>
          <p className="lead">Preliminary public disclosure — Safety, legal preservation & documentation.</p>
        </div>
        <div className="canvasArea"><HeroCanvas /></div>
      </section>
    </>
  );
}
