import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'
import {muxInput} from 'sanity-plugin-mux-input'

export default defineConfig({
  name: 'default',
  title: 'Trent\'s Portfolio',

  projectId: 'jdq7aeh0',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), media(), muxInput()],

  schema: {
    types: schemaTypes,
  },
})
