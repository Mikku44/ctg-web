import { Outlet } from 'react-router'
import { useAuthListener } from '~/lib/firebase/auth';
import { Sidebar } from './components/sidebar';
import { useState } from 'react';



export function meta() {
  return [
    { title: "ADMIN - Creative Tour Guru" },
    // { name: "description", content: "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND." },
  ];
}


export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  useAuthListener();
  return (
    <div className="flex h-screen overflow-clip">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="h-screen flex-1 overflow-y-auto bg-gray-100 p-4">
        <Outlet />
      </div>
    </div>
  )
}
