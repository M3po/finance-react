import { FinanceProvider } from "./context/FinanceContext";
import { NotificationProvider } from "./context/NotificationContext";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <NotificationProvider>
      <FinanceProvider>
        <MainLayout>
          <Dashboard />
        </MainLayout>
      </FinanceProvider>
    </NotificationProvider>
  );
}

export default App;
