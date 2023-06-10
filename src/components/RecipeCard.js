import '../styles/recipeCard.css'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export function RecipeCard({ posts }) {



    console.log("here are my posts", posts)
    // console.log("cooking time is", posts[0].fields.cookingTime)
    // console.log("image is", posts[0].fields.recipeImage.fields.file.url)
    // console.log(posts[0].fields.recipeImage.fields)

    return (
        <div className='cards' >
            {posts && posts.length > 0 ? (
                posts.map((item, index) => (
                    <Link className='card'>
                        <div className='card-top'>
                            <img src={item?.fields?.recipeImage?.fields?.file?.url} />
                            <p className='card-category'>{item.fields.category}</p>
                        </div>
                        <div className='card-bottom'>
                            <h2>{item.fields.recipeTitle}</h2>
                            <p className='card-time'><AiOutlineClockCircle />{item.fields.cookingTime} min</p>
                        </div>
                        <div className='card-separator'>
                            <hr />
                        </div>

                    </Link>

                ))
            ) : (
                <p>Loading...</p>
            )}
        </div >
    )
}