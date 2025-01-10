import UrlShortener from "./components/UrlShortener";

function App() {
  return (
    <main className="dark text-foreground bg-background min-w-full min-h-screen flex justify-center items-start">
      <div className="p-5 pt-20 w-full max-w-4xl">
        <UrlShortener />
      </div>
    </main>
  );
}

export default App;
