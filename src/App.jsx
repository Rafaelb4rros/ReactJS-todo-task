import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./styles/GlobalStyle.scss";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Main />
      <Footer />
    </DndProvider>
  );
};
export default App;
