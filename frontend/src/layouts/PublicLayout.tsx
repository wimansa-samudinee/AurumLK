import { Outlet } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageContainer from "@/components/PageContainer";

export default function PublicLayout() {
  return (
    <>
      <Navbar />

      <PageContainer>
        <Outlet />
      </PageContainer>

      <Footer />
    </>
  );
}