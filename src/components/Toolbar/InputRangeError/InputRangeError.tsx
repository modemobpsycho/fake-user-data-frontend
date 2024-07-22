import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { constants } from '../../../utils/constants'
import { usePersonStore } from '../../../stores/personStore'
import { Input, Typography } from '@mui/material'

function InputRangeErrors() {
	const { mistakesNum, setMistakesNum } = usePersonStore(state => state)

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
			<Box sx={{ width: 150 }}>
				<Typography sx={{ ml: '-6px' }}>Errors</Typography>
				<Slider
					aria-label='errors'
					valueLabelDisplay='auto'
					size='small'
					step={constants.STEP_SLIDER}
					min={constants.MIN_MISTAKES}
					max={constants.MAX_SLIDER_MISTAKES}
					value={mistakesNum}
					onChange={(_e, value) => setMistakesNum(Number(value))}
				/>
			</Box>
			<Input
				className='input-error'
				type='number'
				sx={{ width: '3.5rem' }}
				inputProps={{
					min: constants.MIN_MISTAKES,
					max: constants.MAX_MISTAKES,
					step: constants.STEP,
				}}
				value={mistakesNum}
				onChange={e => setMistakesNum(Number(e.target.value))}
			/>
		</Box>
	)
}

export default InputRangeErrors
