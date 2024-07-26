import TableContainer from '@mui/material/TableContainer'
import TableMUI from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Paper from '@mui/material/Paper'
import { usePersonStore } from '../../stores/personStore'
import { useEffect } from 'react'

function Table() {
	const {
		setPersons,
		incPage,
		personsMistakes,
		setIsFetching,
		isFetching,
		setNewPersons,
	} = usePersonStore(state => state)

	useEffect(() => {
		setIsFetching(true)
		window.addEventListener('scroll', throttle(scrollHandler, 250))
		window.addEventListener('resize', throttle(scrollHandler, 250))
		setNewPersons()

		return () => {
			window.removeEventListener('scroll', throttle(scrollHandler, 250))
			window.removeEventListener('resize', throttle(scrollHandler, 250))
		}
	}, [])

	// eslint-disable-next-line @typescript-eslint/ban-types
	function throttle(callee: Function, timeout: number) {
		let timer: ReturnType<typeof setTimeout> | null = null

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return function perform(...args: any) {
			if (timer) return

			timer = setTimeout(() => {
				callee(...args)
				clearTimeout(timer as number)
				timer = null
			}, timeout)
		}
	}

	function scrollHandler() {
		if (isFetching) return
		const height = document.body.offsetHeight
		const screenHeight = window.innerHeight
		const scrolled = window.scrollY

		const threshold = height - screenHeight / 8
		const position = scrolled + screenHeight

		if (position >= threshold) {
			incPage()
			setPersons()
		}
	}

	return (
		<TableContainer
			sx={{
				width: '100%',
				margin: '0.5rem auto',
				boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.75)',
			}}
			component={Paper}
		>
			<TableMUI
				sx={{ minWidth: 650 }}
				aria-label='simple table'
				id='table-persons'
			>
				<TableHead>
					<TableRow>
						<TableCell>№</TableCell>
						<TableCell align='right' width={'15%'}>
							Id
						</TableCell>
						<TableCell align='right' width={'25%'}>
							Name
						</TableCell>
						<TableCell align='right' width={'45%'}>
							Address
						</TableCell>
						<TableCell align='right' width={'15%'}>
							Phone
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{personsMistakes.map((person, index) => (
						<TableRow
							key={index}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component='th' scope='row'>
								{index + 1}
							</TableCell>
							<TableCell align='right'>{person.id}</TableCell>
							<TableCell align='right'>{person.fullName}</TableCell>
							<TableCell align='right'>{person.address}</TableCell>
							<TableCell align='right'>{person.phone}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</TableMUI>
		</TableContainer>
	)
}

export default Table
