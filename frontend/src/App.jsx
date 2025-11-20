import { useState } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import AstroChart from "./components/AstroChart";

function App() {
  const [result, setResult] = useState(null); // Stores result from Homepage
  const [summaryText, setSummaryText] = useState(""); // Stores summary_text for Analysis

  return (
    <LanguageProvider>
      <div className="min-h-screen w-full" style={{backgroundColor: '#FFFCFA'}}>
        {/* Pass setResult and setSummaryText to Home */}
        <Home setResult={setResult} setSummaryText={setSummaryText} />

        {/* Render AstroSage-style Chart and Analysis */}
        {result && (
          <section id="chart" className="w-full px-4 py-8">
            <div className="container mx-auto max-w-7xl">
              {/* Centered AstroSage-style Chart with Analysis Tables */}
              <AstroChart result={result} summaryText={summaryText} />
            </div>
          </section>
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;
