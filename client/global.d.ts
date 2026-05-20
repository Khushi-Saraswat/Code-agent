// client/global.d.ts
import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any; // Yeh HTML tags ko safe rakhega
    }
  }
}

export {};
