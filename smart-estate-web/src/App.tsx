import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/react-query";
import { AppRouter } from "@/routes/app-router";
import { ThemeProvider } from "@/store/theme.context";

// Import Leaflet CSS toàn cục cho bản đồ
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
