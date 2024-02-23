import { Header } from "./Components";
import "./scss/main.scss";

const header = new Header();
header.render(document.getElementById("app") as HTMLDivElement);
