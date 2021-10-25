<template>
  <div v-if="editor" class="ProseMirror"> 
    <bubble-menu :editor="editor" v-if="editor" class="bubble-menu">
      <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        bold
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        italic
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        strike
      </button>
      </bubble-menu>
          <floating-menu
        class="floating-menu"
        :tippy-options="{ duration: 100 }"
        :editor="editor"
        v-if="editor"
      >
        <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
          H1
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
          H2
        </button>
        <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
          Bullet List
        </button>
      </floating-menu>
    <editor-content class="editor__content" :editor="editor"/>   
  </div>
  
</template>

<script>
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu
  },
  props:{
    content: String
  },
  data() {
    return {
      editor: null,
    }
  },

  mounted() {
    var ref = this;
    this.editor = new Editor({
      content: this.content,
      extensions: [
        StarterKit
      ],
      onUpdate(){
        ref.$emit('updateContent', this.getHTML())
      }
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
  watch:{
    content: function(someContent){
      let html = this.editor.getHTML();
      if (html !== someContent) {
        this.editor.commands.setContent(someContent, true);
      }
    }
  }
}
</script>

<style scoped>
/* Basic editor styles */
 .ProseMirror {
	margin-top: 0.75em;
  display:flex
}
 .ProseMirror ul, ol {
	padding: 0 1rem;
}
 .ProseMirror blockquote {
	padding-left: 1rem;
	border-left: 2px solid rgba(13, 13, 13, 0.1);
}
 .bubble-menu {
	display: flex;
	background-color: #0d0d0d;
	padding: 0.2rem;
	border-radius: 0.5rem;
}
 .bubble-menu button {
	border: none;
	background: none;
	color: #fff;
	font-size: 0.85rem;
	font-weight: 500;
	padding: 0 0.2rem;
	opacity: 0.6;
}
 .bubble-menu button:hover, .bubble-menu button.is-active {
	opacity: 1;
}
 .floating-menu {
	display: flex;
	background-color: #0d0d0d 10;
	padding: 0.2rem;
	border-radius: 0.5rem;
}
 .floating-menu button {
	border: none;
	background: none;
	font-size: 0.85rem;
	font-weight: 500;
	padding: 0 0.2rem;
	opacity: 0.6;
}
 .floating-menu button:hover, .floating-menu button.is-active {
	opacity: 1;
}
</style>