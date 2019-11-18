import React, { Suspense, lazy } from 'react';
import Spinner from 'core/components/Spinner';

export default function lazyComponent(loader) {
  const LoadedComponent = lazy(loader);

  return props => (
    <Suspense fallback={<Spinner />}>
      <LoadedComponent {...props} />
    </Suspense>
  );
}
