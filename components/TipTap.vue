<template>
<div>
    <label class='ml-1' for='fontFamily'>Font:</label>
    <select title='Font Family' id='fontFamily' class='ml-1' v-model='fontFamily' @change='updateFontFamily()'>
      <option style='font-family: Times New Roman'>Times New Roman</option>
      <option style='font-family: cursive'>cursive</option>
      <option style='font-family: comic sans ms'>Comic Sans MS</option>
      <option style='font-family: serif'>serif</option>
      <option style='font-family: monospace'>monospace</option>      
      <option style='font-family: inter'>Inter</option>
      <option style='font-family: Arial'>Arial</option>
      <option style='font-family: Verdana'>Verdana</option>
      <option style='font-family: Helvetica'>Helvetica</option>
      <option style='font-family: Tahoma'>Tahoma</option>
      <option style='font-family: Trebuchet MS'>Trebuchet MS</option>      
      <option style='font-family: Georgia'>Georgia</option>      
      <option style='font-family: Garamond'>Garamond</option>      
      <option style='font-family: Courier New'>Courier New</option>      
    </select>
    <label class='ml-1' for="colorWell">Color:</label>
    <input @change='changeColor' id='colorWell' v-model='color' type='color'>
    <button title='Bold' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor && editor.isActive('bold') }">
      <font-awesome-icon :icon="['fas', 'bold']" class=""/> 
    </button>
    <button title='Italic' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor && editor.isActive('italic') }">
      <font-awesome-icon :icon="['fas', 'italic']" class=""/> 
    </button>
    <button title='Strikethrough' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor && editor.isActive('strike') }">
      <font-awesome-icon :icon="['fas', 'strikethrough']" class=""/> 
    </button>      
    <button title='Paragraph' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor && editor.isActive('paragraph') }">
      <font-awesome-icon :icon="['fas', 'paragraph']" class=""/> 
    </button>
    <button title='Return' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().setHardBreak().run()">
      &#8626;
    </button>    
    <button title='Add Image' class='pt-2 pb-2 pr-2 pl-2' @click='addImage' type='button' style='border: none'>
      <font-awesome-icon :icon="['fas', 'image']" class=""/> 
    </button>
    <button title='Heading 1' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor && editor.isActive('heading', { level: 1 }) }">
      <strong>H1</strong>
    </button>
    <button title='Heading 2' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor && editor.isActive('heading', { level: 2 }) }">
      <strong>H2</strong>
    </button>
    <button title='Heading 3' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor && editor.isActive('heading', { level: 3 }) }">
      <strong>H3</strong>
    </button>
    <button title='Heading 4' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor && editor.isActive('heading', { level: 4 }) }">
      <strong>H4</strong>
    </button>
    <button title='Heading 5' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor && editor.isActive('heading', { level: 5 }) }">
      <strong>H5</strong>
    </button>
    <button title='Heading 6' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor && editor.isActive('heading', { level: 6 }) }">
      <strong>H6</strong>
    </button>
    <button title='Unordered list' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor && editor.isActive('bulletList') }">
      <font-awesome-icon :icon="['fas', 'list-ul']" class=""/> 
    </button>
    <button title='Ordered list' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor && editor.isActive('orderedList') }">
      <font-awesome-icon :icon="['fas', 'list-ol']" class=""/> 
    </button>
    <!-- <button class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor && editor.isActive('codeBlock') }">
      code block
    </button>
    <button title='Code' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor && editor.isActive('code') }">
      <font-awesome-icon :icon="['fas', 'code']" class=""/> 
    </button>   -->
    <button class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor && editor.isActive('blockquote') }">
      blockquote
    </button>
    <button class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().setHorizontalRule().run()">
      horizontal line
    </button>    
    <button title='undo' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().undo().run()">
      <font-awesome-icon :icon="['fas', 'undo']" class=""/> 
    </button>
    <button title='redo' class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().redo().run()">
      <font-awesome-icon :icon="['fas', 'redo']" class=""/> 
    </button>
    <button class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().unsetAllMarks().run()">
      clear marks
    </button>
    <button class='pt-2 pb-2 pr-2 pl-2' type='button' style='border: none' @click="editor.chain().focus().clearNodes().run()">
      clear nodes
    </button>    
    <editor-content :editor="editor" />    
</div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Placeholder from '@tiptap/extension-placeholder';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';

export default {
  components: {
    EditorContent,
  },
  props: {
    value: {
        type: String,
        default: '',
    },
  },
  data() {
    return {
      editor: null,
      fontFamily: 'Times New Roman',
      color: '#000000'
    }
  },
  methods: {
    updateFontFamily(){
      this.editor.chain().focus().setFontFamily(this.fontFamily).run();
    },
    changeColor(){
      this.editor.chain().focus().setColor(this.color).run();
    },
    addImage() {
      const url = window.prompt('URL');

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run()
      }
    },
  },
  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        Paragraph,
        Text,
        Heading,
        TextStyle,
        FontFamily,
        Placeholder.configure({
          // Use a placeholder:
          placeholder: 'Write something …',
          showOnlyCurrent: false          
        }),
        Color,
        Image.configure({
          allowBase64: true
        })
      ],
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

<style scoped>
  button:hover {
    background-color: rgba(197, 197, 197);
  }
  input[type='color'] {
    position: relative;
    top: 3px;
  }
</style>