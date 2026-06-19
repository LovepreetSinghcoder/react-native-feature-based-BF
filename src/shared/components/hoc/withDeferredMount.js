import React, { useState, useEffect } from "react";
import { InteractionManager } from "react-native";

/* -------------------------------------------------------------------------- */
/*  withDeferredMount(WrappedScreen, SkeletonComponent)                       */
/*                                                                            */
/*  Defers the real screen mount until navigation animation completes.        */
/*  Shows SkeletonComponent during the transition instead of a spinner —      */
/*  so the user sees a meaningful layout instantly, not a blank/loader.       */
/*                                                                            */
/*  Flow:                                                                     */
/*    Tap → skeleton renders (zero JS cost, matches destination layout)       */
/*    → animation completes → real screen mounts                             */
/* -------------------------------------------------------------------------- */

export function withDeferredMount(WrappedScreen, SkeletonComponent) {
  function DeferredScreen(props) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        setIsReady(true);
      });
      return () => task.cancel();
    }, []);

    if (!isReady) {
      // Render the skeleton — same props passed through so skeleton
      // can optionally read route.params if needed in the future
      return <SkeletonComponent {...props} />;
    }

    return <WrappedScreen {...props} />;
  }

  DeferredScreen.displayName = `Deferred(${
    WrappedScreen.displayName || WrappedScreen.name || "Screen"
  })`;

  return DeferredScreen;
}
