import Home from './Home';
import Work from './Work';
import Check from './check';
import Pin from './Pin';


function emoji(type: string) {
  switch (type) {
    case "Home":
      return <Home />;
    case "Work":
      return <Work />;
    default:
      return <Pin />;
  }
}

export {
  emoji,
  Check
}