import { create } from 'zustand'
import { constants } from '../utils/constants'
import { IPerson } from '../types/person.interface'
import axios from 'axios'
import { mistakesGenerator } from '../helpers/mistakesGenerator'

interface PersonState {
	persons: IPerson[]
	setPersons: () => void
	setNewPersons: () => void
	personsMistakes: IPerson[]
	setPersonsMistakes: () => void
	seed: number
	setSeed: (seed: number) => void
	region: string
	setRegion: (region: string) => void
	mistakesNum: number
	setMistakesNum: (seed: number) => void
	page: number
	resetPage: () => void
	incPage: () => void
	isFetching: boolean
	shouldLoad: boolean
	setIsFetching: (isFetching: boolean) => void
}

export const usePersonStore = create<PersonState>((set, get) => ({
	persons: [],
	setPersons: async () => {
		try {
			get().setIsFetching(true)
			const { data } = await axios.get(constants.API_URL + '/users', {
				params: {
					locale: get().region,
					countryLocal:
						constants.countryLocal[constants.locales.indexOf(get().region)],
					seed: get().seed,
					page: get().page,
				},
			})
			set(state => ({
				persons: state.persons.concat(data),
				personsMistakes: state.personsMistakes.concat(data),
			}))
			get().setIsFetching(false)
		} catch (error) {
			alert(error)
		}
	},
	setNewPersons: async () => {
		try {
			get().resetPage()
			get().setMistakesNum(0)
			let tempArr: IPerson[] = []
			const SETS_PERSONS = 3
			for (let i = 0; i < SETS_PERSONS; i++) {
				const { data } = await axios.get(constants.API_URL + '/users', {
					params: {
						locale: get().region,
						countryLocal:
							constants.countryLocal[constants.locales.indexOf(get().region)],
						seed: get().seed,
						page: get().page,
					},
				})

				tempArr = tempArr.concat(data)
				get().incPage()
				console.log('+++' + get().page)
			}
			set({ persons: tempArr, personsMistakes: tempArr })
			get().setIsFetching(false)
		} catch (error) {
			alert(error)
		}
	},
	personsMistakes: [],
	setPersonsMistakes: () => {
		const mistakesNum = get().mistakesNum
		const isFractional = mistakesNum % 1 !== 0
		const integerMistakesNum = Math.floor(mistakesNum)
		const chance = isFractional ? 1 : 0

		const tempArr: IPerson[] = []
		get().persons.forEach(person => {
			const tempPerson: IPerson = { ...person }
			for (let i = 0; i < integerMistakesNum + chance; i++) {
				const MISTAKES_NUM = 3

				const mistakeNameIndex =
					Math.abs(mistakesGenerator.hashCode(tempPerson.fullName + i)) %
					MISTAKES_NUM
				tempPerson.fullName = mistakesGenerator.mistakes[mistakeNameIndex](
					get().seed,
					tempPerson.fullName,
					constants.locales.indexOf(get().region)
				)

				const mistakeAddressIndex =
					Math.abs(mistakesGenerator.hashCode(tempPerson.address + i)) %
					MISTAKES_NUM
				tempPerson.address = mistakesGenerator.mistakes[mistakeAddressIndex](
					get().seed,
					tempPerson.address,
					constants.locales.indexOf(get().region)
				)

				const mistakePhoneIndex =
					Math.abs(mistakesGenerator.hashCode(tempPerson.phone + i)) %
					MISTAKES_NUM
				tempPerson.phone = mistakesGenerator.mistakes[mistakePhoneIndex](
					get().seed,
					tempPerson.phone,
					constants.locales.indexOf(get().region)
				)
			}
			tempArr.push(tempPerson)
		})

		set({
			personsMistakes: tempArr,
		})
	},
	seed: Number(localStorage.getItem(constants.SEED)) || 5239662,
	setSeed: (seed: number) => {
		const seedTemp =
			seed === 0 ? Math.floor(Math.random() * constants.MAX_SEED) + 1 : seed
		const clampedSeed = Math.min(Math.max(seedTemp, 1), constants.MAX_SEED)

		localStorage.setItem(constants.SEED, clampedSeed.toString())
		set({ seed: clampedSeed })
		get().setNewPersons()
	},
	region: localStorage.getItem(constants.REGION) || 'en',
	setRegion: (region: string) => {
		localStorage.setItem(constants.REGION, region)
		set({ region: region })
		get().setNewPersons()
	},
	mistakesNum: Number(localStorage.getItem(constants.MISTAKES_NUM)) || 0,
	setMistakesNum: (mistakesNum: number) => {
		localStorage.setItem(constants.MISTAKES_NUM, mistakesNum.toString())
		set({ mistakesNum: mistakesNum })
		get().setPersonsMistakes()
	},
	page: 1,
	resetPage: () => {
		set({ page: 1 })
	},
	incPage: () => {
		set({ page: get().page + 1 })
	},
	isFetching: false,
	shouldLoad: true,
	setIsFetching: (isFetching: boolean) => {
		set({ isFetching: isFetching })
	},
}))
