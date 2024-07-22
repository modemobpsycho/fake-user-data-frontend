import { CSVLink } from 'react-csv'
import { usePersonStore } from '../../../stores/personStore'
import Button from '@mui/material/Button'

function ExportCSV() {
	const { persons } = usePersonStore(state => state)
	return (
		<Button variant='contained' sx={{ mr: '0.5rem' }}>
			<CSVLink
				data={persons}
				filename='persons.csv'
				style={{ textDecoration: 'none', color: 'white' }}
			>
				Export CSV
			</CSVLink>
		</Button>
	)
}

export default ExportCSV
