
import { Ref, useRef, useState, useEffect } from 'react'

export function useHover<T extends HTMLElement>(): [Ref<T>, boolean] {
  const ref = useRef<T>(null);
  const [hovering, setIsHovering] = useState(false);


  useEffect(() => {
    if(ref.current){
      let element = ref.current;
      element.addEventListener('onMouseEnter', () => { setIsHovering(true)});
      element.addEventListener('onMouseLeave',  () => { setIsHovering(false)});

      return () => {
        element.removeEventListener('onMouseEnter', () => {});
          element.removeEventListener('onMouseLeave',  () => {});
      }
    }
  }, [ref])


  return  [ref, hovering]

  // your code here
}

// if you want to try your code on the right panel
// remember to export App() component like below

// export function App() {
//   return <div>your app</div>
// }





