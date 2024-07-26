import { InputLabel, MenuItem, Select } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { constants } from '../../../utils/constants'
import { usePersonStore } from '../../../stores/personStore'

function SelectCountry() {
	const { region, setRegion } = usePersonStore(state => state)

	return (
		<div className='div-select-country'>
			<FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
				<InputLabel id='selectCountry'>Country</InputLabel>
				<Select
					id='selectCountry'
					labelId='selectCountry'
					label='Country'
					value={region}
					onChange={e => {
						setRegion(e.target.value)
					}}
				>
					<MenuItem value={constants.locales[0]}>
						{constants.countryLocal[0]}
					</MenuItem>
					<MenuItem value={constants.locales[1]}>
						{constants.countryLocal[1]}
					</MenuItem>
					<MenuItem value={constants.locales[2]}>
						{constants.countryLocal[2]}
					</MenuItem>
					<MenuItem value={constants.locales[3]}>
						{constants.countryLocal[3]}
					</MenuItem>
				</Select>
			</FormControl>
		</div>
	)
}

export default SelectCountry
