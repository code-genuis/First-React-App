"use client";
import ThemeToggle from "@/components/ThemeToggle";
import TodoList from "@/components/TodoList";
import TodoList2 from "@/components/TodoApp/TodoList2";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PracticeAPI from "@/components/PracticeAPI";

// import Link from "next/link";

const Page = () => {
  return (
    <>
      <Header />
      <div className="flex bg-zinc-200 flex-col gap-4 items-center min-screen"></div>
      <TodoList />
      <TodoList2 />
      <PracticeAPI />
      <ThemeToggle />
      <Footer />
    </>
  );
};

export default Page;
