import "./styles.css";
import { createRoot } from "react-dom/client";
import { usePartySocket } from "partysocket/react";
import { useEffect } from "react";
import { Link, Route, Switch } from "wouter";

function Home() {
  const socket = usePartySocket({
    party: "my-server",
    room: "room1",
    onMessage(message) {
      console.log("message from server:", message);
    },
  });
  useEffect(() => {
    socket.send("hello from the client!");
  }, [socket]);
  return (
    <div>
      <h1>Hello, browser!</h1>
    </div>
  );
}

const About = () => {
  return <div>About</div>;
};

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}
const root = createRoot(document.getElementById("root")!);
root.render(<App />);
