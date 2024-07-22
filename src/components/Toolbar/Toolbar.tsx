import ExportCSV from './ExportCSV/ExportCSV'
import InputRangeErrors from './InputRangeError/InputRangeError'
import InputSeed from './InputSeed/InputSeed'
import SelectCountry from './SelectCountry/SelectCountry'
import './toolbar.scss'

export default function Toolbar() {
	return (
		<div className='toolbar-header'>
			<SelectCountry />
			<InputRangeErrors />
			<InputSeed />
			<ExportCSV />
		</div>
	)
}
