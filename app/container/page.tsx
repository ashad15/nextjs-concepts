import { ITEMS } from "./items";

export default function () {
  return (
    <>
      {ITEMS.map((element, index) => {
        return (
          <div key={index}>
            <h1>{element.heading}</h1>
            <p>{element.subheading}</p>
          </div>
        );
      })}
    </>
  );
}
