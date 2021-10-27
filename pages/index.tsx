import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Content from "../components/content";
const num: string | undefined = process.env.PORT;

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Content />
    </div>
  );
};

export default Home;
