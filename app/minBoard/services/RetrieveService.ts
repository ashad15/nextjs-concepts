


export const getInitialPost = async() => {

    try{
        let res = await fetch("https://dummyjson.com/posts");
        const data = await res.json();
        return data;
    }
    catch(e){
        return e;
    }
  


}