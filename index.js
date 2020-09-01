const range = (n) => [...new Array(n).keys()]
const strList = n => range(n).join(',')

const N = 20
let enumVariants = `export type EnumVariants = Exclude<Enum${N}, 0> | ${N}`
let enumerate = `export type Enumerate<T extends EnumVariants> = `
let variants = []

for (let j = 1; j <= N; ++j) {
	const name = `Enum${j}`
	let variant = `export const ${name} = [${strList(j)}] as const\n`

	variant += `export type ${name} = typeof ${name}[number]`
	enumerate += ` T extends ${j} ? Enum${j} :`

	variants.push(variant)
}
enumerate += ' never'

const println = (lines) => lines.forEach(line => console.log(line))

const lines = [enumVariants,'', enumerate, '', ...variants]

println(lines)


