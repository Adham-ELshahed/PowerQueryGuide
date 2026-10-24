import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import Functions from "@/pages/functions";
import FunctionDetail from "@/pages/function-detail";
import Category from "@/pages/category";
import Blog from "@/pages/blog";
import About from "@/pages/about";
import DataTypes from "@/pages/data-types";
import Services from "@/pages/services";
import Enumerations from "@/pages/enumerations";
import EnumerationDetail from "@/pages/enumeration-detail";
import Connectors from "@/pages/connectors";
import ConnectorExchangeOnline from "@/pages/connector-exchange-online";
import NotFound from "@/pages/not-found";
import StandardNumericFormatStrings from "@/pages/standard-numeric-format-strings";
import CustomNumericFormatStrings from "@/pages/custom-numeric-format-strings";

// Explicit base path — wouter expects "" (not "/") for root deployments,
// otherwise it joins base + href into protocol-relative URLs like "//blog".
const rawBase = import.meta.env.BASE_URL ?? "/";
const basePath = rawBase === "/" ? "" : rawBase.replace(/\/$/, "");

function Router() {
  useAnalytics();
  const [location] = useLocation();

  useEffect(() => {
    // Land on the element a #hash points at (client-side navigation never
    // triggers the browser's own fragment scroll); otherwise start at top.
    const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        // Chrome only resolves :target against the DOM present at navigation
        // time, so mirror the :target highlight with an explicit class.
        el.classList.add("is-target");
        el.scrollIntoView({ block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      {/* Static routes first */}
      <Route path="/" component={Home} />
      <Route path="/functions" component={Functions} />
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/datatypes" component={DataTypes} />
      <Route path="/services" component={Services} />
      <Route path="/enumerations" component={Enumerations} />
      <Route path="/connectors" component={Connectors} />
      <Route path="/connectors/exchange-online" component={ConnectorExchangeOnline} />
      <Route path="/docs/standard-numeric-format-strings" component={StandardNumericFormatStrings} />
      <Route path="/docs/custom-numeric-format-strings" component={CustomNumericFormatStrings} />

      {/* Dynamic routes after static */}
      <Route path="/function/:functionName" component={FunctionDetail} />
      <Route path="/enumeration/:slug" component={EnumerationDetail} />
      <Route path="/category/:category" component={Category} />

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn(
        "Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID"
      );
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={basePath}>
          <Toaster />
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;