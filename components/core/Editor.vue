<template>
  <div>
    <!-- Use the component in the right place of the template -->
      <tiptap-vuetify
        :value='value'
        :extensions='extensions'
        :toolbar-attributes="{ color: 'primary', dark: true }"
        :card-props="{ color: 'secondary', dark: true }"
        :placeholder='placeholder'
        min-height="200"
        max-height="75vh"
        @input="$emit('input', arguments[0])"
      />
  </div>
</template>
<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify'

export default {
  name: 'TipTapEditor',
  components: {TiptapVuetify},
  props: {
    value: {
      type: String,
      default: ``
    },
    placeholder: {
      type: String,
      default: 'Enter text here',
    }
  },
  data: () => ({
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3]
          }
        }
      ],
      Bold,
      Link,
      // [Bold, {
      //   renderIn: 'toolbar'
      // }],
      // [Blockquote, {
      //   renderIn: 'bubbleMenu',
      //   options: {
      //     levels: [1, 2, 3]
      //   }
      // }],
      // [Link, {
      //   renderIn: 'bubbleMenu'
      // }],
      TableCell,
      TableHeader,
      TableRow,
      [Table, {
        options: {
          resizable: true
        }
      }],
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ]
  })
}
</script>
