<template>
    <div>
        <div class="jumbotron bg-danger mt-3 mb-0">
            <div class="mt-2 text-white">
                <h3 class="mb-0">Write An Article</h3>
                <p class="mb-0">Senefitret > Admin > Articles > Write</p>
            </div>            
        </div>
        <div class="dashboard bg-white ml-4">
            <!-- <ckeditor-nuxt v-model="content"/> -->
            <editor-content :editor="editor" />
        </div>
    </div>  
</template>

<script>
import CkeditorNuxt from '@/components/CKEditorNuxt.vue';
import { Editor, EditorContent } from 'tiptap'

export default {
    layout: 'admin',
    components: {
        CkeditorNuxt,
        EditorContent,
    },
    data() {
        return {
            content: '',
            editor: null
        }
    },
    mounted() {
        this.editor = new Editor({
            content: '<p>This is just a boring paragraph</p>',
        })
    },
    beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
        this.editor.destroy()
    },
}
</script>

<style>
    .dashboard {
        height: 500px;
        width: 95%;
        position: relative;
        top: -40px;
        border-radius: 3px;
        box-shadow: 0px 0px 9px 1px #e6e6e6
    }
</style>