import Button from '@mui/material/Button'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import { usePersonStore } from '../../../stores/personStore'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'

function InputSeed() {
	const { seed, setSeed} = usePersonStore(state => state)


	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<TextField
				label='Seed'
				type='number'
				variant='outlined'
				sx={{ width: '10rem' }}
				value={seed}
				onChange={e => setSeed(Number(e.target.value))}
			/>
			<Button
				variant='contained'
				sx={{ margin: '0 0 0 0.5rem' }}
				onClick={() => setSeed(0)}
			>
				<ShuffleIcon sx={{ width: '1.5rem', height: '1.5rem' }} />
			</Button>
		</Box>
	)
}

export default InputSeed
