import React, { createContext, useContext, useEffect, useState } from "react";

type ContextType = {
  hasAccess: boolean;
};

const AccessContext = createContext<ContextType | null>(null);

const PTMPage = () => <div>dashboard</div>;
const TenurePage = () => <div>dashboard</div>;
const HighLightsPage = () => <div>Highlights Page</div>;

const checkFeatureAccess = (Component: React.ComponentType, type: string) => {
  return () => {
    const contextInfo = useContext(AccessContext);
    let hasAcccess = true;
    return <>{hasAcccess ? <Component /> : null}</>; // later we'll use contextInfo which cam in initial api and then get feature has acccess or not
  };
};

const ProtectedRoute = ({
  Component,
  type,
}: {
  Component: React.ComponentType;
  type: string;
}) => {
  const AccessFeatureaComponent = checkFeatureAccess(Component, type);
  return (
    <div>
      <AccessFeatureaComponent />
    </div>
  );
};

const withAccess = ({ children }: { children: React.ReactNode }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [type, setType] = useState("");
  useEffect(() => {
    if (true) {
      //todo coniditon set manually
      setHasAccess(true);
      setType("ptm");
    }
  }, []);

  return (
    <>
      {hasAccess ? (
        <>
          <AccessContext.Provider value={{ hasAccess: hasAccess }}>
            {type === "ptm" ? (
              <ProtectedRoute Component={PTMPage} type={type} />
            ) : null}
            {type === "tenure" ? (
              <ProtectedRoute Component={TenurePage} type={type} />
            ) : null}
            {type === "highlights" ? (
              <ProtectedRoute Component={HighLightsPage} type={type} />
            ) : null}
            {children}
          </AccessContext.Provider>
        </>
      ) : null}
    </>
  );
};

export default withAccess;
