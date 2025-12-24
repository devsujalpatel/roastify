import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <header>
      <div>
        <h1>Roastify</h1>
      </div>
      <nav>
        <Button>Sign in</Button>
        <Button>Sign up</Button>
      </nav>
    </header>
  );
};
