import { Header } from '../components/Header';

export default function CheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-gray5 h-screen overflow-auto">
      <Header />
      <div className="flex justify-center">
        <div className="w-full max-w-[1440px] grid px-14 mt-8">{children}</div>
      </div>
    </div>
  );
}
