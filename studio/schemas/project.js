import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
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
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
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
      name: 'collaborators',
      title: 'Collaborators',
      type: 'array',
      of: [
        {
          name: 'collaborator',
          title: 'Collaborator',
          type: 'document',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
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
      name: 'introduction',
      title: 'Introduction',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          name: 'link',
          title: 'Link',
          type: 'document',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
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
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true, // If you want to enable hotspot for images
          },
        },
        {
          name: 'video',
          title: 'Video',
          type: 'mux.video',
        },
      ],
    }),
    defineField({
      name: 'mediaList',
      title: 'Media List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true, // If you want to enable hotspot for images
              },
            },
            {
              name: 'video',
              title: 'Video',
              type: 'mux.video',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
})
