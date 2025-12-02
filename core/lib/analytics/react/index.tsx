'use client';

import { createContext, PropsWithChildren, useContext, useEffect } from 'react';

import { type Analytics } from '../types';

const AnalyticsContext = createContext<Analytics | null>(null);

interface AnalyticsProviderProps {
  analytics: Analytics | null;
}

export const AnalyticsProvider = ({
  children,
  analytics,
}: PropsWithChildren<AnalyticsProviderProps>) => {
  useEffect(() => {
    analytics?.initialize();
  }, [analytics]);

  return <AnalyticsContext.Provider value={analytics}>{children}</AnalyticsContext.Provider>;
};

export const useAnalytics = () => {
  const analytics = useContext(AnalyticsContext);

  if (!analytics) {
    // eslint-disable-next-line no-console
    console.warn('Analytics: useAnalytics called outside of AnalyticsProvider');

    return {
      cart: {
        cartViewed: () => console.warn('Analytics: cartViewed called without provider'),
        productAdded: () => console.warn('Analytics: productAdded called without provider'),
        productRemoved: () => console.warn('Analytics: productRemoved called without provider'),
      },
      navigation: {
        categoryViewed: () => console.warn('Analytics: categoryViewed called without provider'),
        productViewed: () => console.warn('Analytics: productViewed called without provider'),
      },
      consent: {
        consentUpdated: () => console.warn('Analytics: consentUpdated called without provider'),
      },
      initialize: () => console.warn('Analytics: initialize called without provider'),
    } as Analytics;
  }

  return analytics;
};
