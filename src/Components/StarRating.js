import React from 'react'
import '../stylesheets/StarRating.css'

export default function Starstar(props) {

	const rate = event => {
		if(event.target.id.slice(0,4) === 'star')
			props.changeStars(event.target.value)
	}

	return (
		<div className='star' onClick={rate}>
		    <input type='radio' id='star5' name='star' value='5' /><label className = 'full' htmlFor='star5' title='Awesome - 5 stars'></label>
		    <input type='radio' id='star4half' name='star' value='4.5' /><label className='half' htmlFor='star4half' title='Pretty good - 4.5 stars'></label>
		    <input type='radio' id='star4' name='star' value='4' /><label className = 'full' htmlFor='star4' title='Great - 4 stars'></label>
		    <input type='radio' id='star3half' name='star' value='3.5' /><label className='half' htmlFor='star3half' title='Meh - 3.5 stars'></label>
		    <input type='radio' id='star3' name='star' value='3' /><label className = 'full' htmlFor='star3' title='Average - 3 stars'></label>
		    <input type='radio' id='star2half' name='star' value='2.5' /><label className='half' htmlFor='star2half' title='Kinda bad - 2.5 stars'></label>
		    <input type='radio' id='star2' name='star' value='2' /><label className = 'full' htmlFor='star2' title='Mediocre - 2 stars'></label>
		    <input type='radio' id='star1half' name='star' value='1.5' /><label className='half' htmlFor='star1half' title='Meh - 1.5 stars'></label>
		    <input type='radio' id='star1' name='star' value='1' /><label className = 'full' htmlFor='star1' title='Terrible - 1 star'></label>
			<input type='radio' id='starhalf' name='star' value='0.5' /><label className='half' htmlFor='starhalf' title='Appalling - 0.5 stars'></label>
		</div>
	)
}
