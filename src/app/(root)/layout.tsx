import { ThemeProvider } from "@/components/theme-provider";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <ViewTransitions>
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </ViewTransitions>
  );
};

export default Layout;
