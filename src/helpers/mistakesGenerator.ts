import { constants } from '../utils/constants'

export const mistakesGenerator = {
	hashCode: (s: string) => {
		let hash = 0
		const length = s.length
		if (length > 0) {
			for (let i = 0; i < length; i++) {
				const charCode = s.charCodeAt(i)
				hash = (hash << 5) - hash + charCode
				hash |= 0
			}
		}
		return hash
	},
	mistakes: [
		(seed: number, str: string): string => {
			const index =
				Math.abs(mistakesGenerator.hashCode(seed + str)) % str.length
			return str.slice(0, index).concat(str.slice(index + 1, str.length))
		},
		(seed: number, str: string, localeIndex: number): string => {
			const index: number =
				Math.abs(mistakesGenerator.hashCode(seed + str)) % str.length
			return str
				.slice(0, index)
				.concat(
					constants.letters[localeIndex][
						Math.abs(mistakesGenerator.hashCode(seed + str)) %
							constants.letters[localeIndex].length
					]
				)
				.concat(str.slice(index + 1, str.length))
		},
		(seed: number, str: string, localeIndex: number): string => {
			const index =
				Math.abs(mistakesGenerator.hashCode(seed + str)) % str.length
			return str
				.slice(0, index)
				.concat(
					constants.letters[localeIndex][
						Math.abs(mistakesGenerator.hashCode(seed + str)) %
							constants.letters[localeIndex].length
					]
				)
				.concat(str.slice(index, str.length))
		},
	],
}
