import { ITEMS } from "./items";

export default function ContainerPage() {
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
