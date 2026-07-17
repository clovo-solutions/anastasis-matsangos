'use client';

import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';

/**
 * CalInit.
 *
 * Loads the Cal.com embed once and configures the popup. Any element carrying
 * `data-cal-namespace="assessment"` + `data-cal-link` opens the booking modal
 * on click (Cal binds via document-level delegation, so client-rendered buttons
 * work too). Renders nothing.
 */
export function CalInit() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: 'assessment' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

  return null;
}
