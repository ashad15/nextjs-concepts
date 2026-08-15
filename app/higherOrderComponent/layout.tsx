import React, { createContext, useContext, useState } from "react";

type ContextType = {
  hasAccess: boolean;
};

const AccessContext = createContext<ContextType | null>(null);

const PTMPage = () => <div>dashboard</div>;
const TenurePage = () => <div>dashboard</div>;
const HighLightsPage = () => <div>Highlights Page</div>;

function FeatureGate({ Component }: { Component: React.ComponentType }) {
  const contextInfo = useContext(AccessContext);
  const hasAccess = contextInfo?.hasAccess ?? true;
  return hasAccess ? <Component /> : null;
}

function WithAccess({ children }: { children: React.ReactNode }) {
  const [hasAccess] = useState(true);
  const [type] = useState("ptm");

  return (
    <>
      {hasAccess ? (
        <>
          <AccessContext.Provider value={{ hasAccess: hasAccess }}>
            {type === "ptm" ? (
              <FeatureGate Component={PTMPage} />
            ) : null}
            {type === "tenure" ? (
              <FeatureGate Component={TenurePage} />
            ) : null}
            {type === "highlights" ? (
              <FeatureGate Component={HighLightsPage} />
            ) : null}
            {children}
          </AccessContext.Provider>
        </>
      ) : null}
    </>
  );
}

export default WithAccess;
