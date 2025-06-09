interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <div className="h-screen bg-black">{children}</div>;
}
