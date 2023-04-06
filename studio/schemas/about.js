import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
    }),
    defineField({
        name: 'contacts',
        title: 'Contacts',
        type: 'array',
        of: [
            {
              name: 'contact',
              title: 'Contact',
              type: 'document',
              fields: [
                defineField({
                  name: 'type',
                  title: 'Type',
                  type: 'string',
                }),
                defineField({
                    name: 'url',
                    title: 'URL',
                    type: 'url',
                    validation: Rule => Rule.uri({
                        scheme: ['http', 'https', 'mailto']
                      })
                }),
                ],
            }
        ],
    }),
    defineField({
        name: 'featuredIn',
        title: 'Featured in',
        type: 'array',
        of: [
            {
              name: 'feature',
              title: 'Feature',
              type: 'document',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                }),
                defineField({
                    name: 'year',
                    title: 'Year',
                    type: 'string',
                }),
                defineField({
                    name: 'url',
                    title: 'URL',
                    type: 'url',
                }),
                ],
            }
        ],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
          {
            name: 'education',
            title: 'Education',
            type: 'document',
            fields: [
              defineField({
                name: 'school',
                title: 'School',
                type: 'string',
              }),
              defineField({
                name: 'schoolUrl',
                title: 'School URL',
                type: 'url',
              }),
              defineField({
                  name: 'degree',
                  title: 'Degree',
                  type: 'string',
              }),
              defineField({
                name: 'year',
                title: 'Year',
                type: 'string',
              }),
              ],
          }
      ],
  }),
    defineField({
        name: 'madeWith',
        title: 'Made with',
        type: 'array',
        of: [
          {
            name: 'tool',
            title: 'Tool',
            type: 'string'
          }
        ],
    }),
    defineField({
        name: 'typefacesUsed',
        title: 'Typefaces used',
        type: 'array',
        of: [
          {
            name: 'typeface',
            title: 'Typeface',
            type: 'string'
          }
        ],
    }),
    defineField({
        name: 'updated',
        title: 'Updated',
        type: 'date',
        options: {
            dateFormat: 'MMMM D, YYYY',
        },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'description',
          title: 'Description',
          type: 'string',
        }
      ],
    }),
  ],
})
