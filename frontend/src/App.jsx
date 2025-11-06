import { useState } from "react";
import Home from "./pages/Home";
import TraditionalChart from "./components/TraditionalChart";

function App() {
  const [result, setResult] = useState(null); // Stores result from Homepage
  const [summaryText, setSummaryText] = useState(""); // Stores summary_text for Analysis

  // Split summaryText into structured paragraphs
  const formattedSummary = summaryText
    ? summaryText.split("\n").map((line, index) => (
        <p key={index} className="mb-2 text-gray-700">
          {line}
        </p>
      ))
    : null;

  return (
    <div className="min-h-screen w-full" style={{backgroundColor: '#FFFCFA'}}>
      {/* Pass setResult and setSummaryText to Home */}
      <Home setResult={setResult} setSummaryText={setSummaryText} />

      {/* Render Chart and Analysis Section */}
      {result && (
        <section id="chart" className="min-h-screen w-full px-8 py-12">
          <div className="container mx-auto px-auto">
            <div className="flex flex-row md:flex-row gap-8 justify-between">
              {/* Traditional Chart - Left Side */}
              <div className="w-full md:w-1/2 bg-orange-200 rounded-2xl shadow-xl p-6">
                <TraditionalChart result={result} />
                <p className="font-serif text-black text-center">D1 Chart</p>
              </div>

              {/* Modern Interpretation - Right Side */}
              <div className="w-full md:w-1/2 bg-[#E6F7F5] rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-teal-700 mb-4">
                  Your Personalized Analysis
                </h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {formattedSummary ? (
                    <>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Summary
                      </h3>
                      <div className="text-gray-600">{formattedSummary}</div>
                    </>
                  ) : (
                    <p className="text-gray-600">
                      No analysis available. Please fill out the form.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

export default App;
