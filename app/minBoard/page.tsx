import { Suspense } from "react";
import FeedClient from "./components/FeedClient";
import { getInitialPost } from "./services/RetrieveService"
import { postList } from "./types/BoardType";








export default async function MiniBoard(){


    let posts : postList =  await getInitialPost();
    console.log(posts);

    return (
        <div>
            <Suspense fallback = {<h1 style = {{padding : '20px', }}>Loading ...</h1>}>
                <FeedClient posts = {posts}/>
            </Suspense>
        </div>      
    )



}