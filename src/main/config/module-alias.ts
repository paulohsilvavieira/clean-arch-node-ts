import { addAlias } from 'module-alias'
import { resolve } from 'path'

// eslint-disable-next-line node/no-path-concat
addAlias('@', resolve(__dirname + '/../..'))
