import './config/module-alias'

import 'reflect-metadata'
import { app } from '@/main/config/app'
app.listen(3000, () => console.log(`Server running at http://localhost:${3000}`))
