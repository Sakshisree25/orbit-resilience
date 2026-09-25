/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LaunchScreen } from './components/LaunchScreen';
import { AppShell } from './components/AppShell';

const MainContent: React.FC = () => {
  const { isWorkspaceEntered } = useApp();

  if (!isWorkspaceEntered) {
    return <LaunchScreen />;
  }

  return <AppShell />;
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
