import '../styles/recipeCard.css'
import { AiOutlineClockCircle } from 'react-icons/ai'

export function RecipeCard(props) {

    return (
        <div className='card'>
            <div>
                <span className='card-caregory'>Pasta</span>
                Image</div>
            <div className='card-bottom'>
                <h2>name</h2>
                <p><AiOutlineClockCircle />   time</p>
            </div>
        </div>
    )
}