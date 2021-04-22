<template>
    <div>
        <div class="jumbotron bg-danger mt-3 mb-0">
            <div class="mt-2 text-white">
                <h3 class="mb-0">Write An Article</h3>
                <p class="mb-0">Senefitret > Admin > Articles > Write</p>
            </div>            
        </div>
        <div class="dashboard bg-white ml-4">
            <ckeditor-nuxt v-model="content"/>
            <!-- <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                <div>
                    <button :class="{ 'is-active' : isActive.bold() }" @click="commands.bold">                    
                        <font-awesome-icon :icon="['fas', 'bold']" class="fa-fw"/>
                    </button>
                    <button :class="{ 'is-active' : isActive.italic() }" @click="commands.italic">                    
                        <font-awesome-icon :icon="['fas', 'italic']" class="fa-fw"/>
                    </button>
                    <button :class="{ 'is-active' : isActive.underline() }" @click="commands.underline">                    
                        <font-awesome-icon :icon="['fas', 'underline']" class="fa-fw"/>
                    </button>
                    <button :class="{ 'is-active' : isActive.strike() }" @click="commands.strike">                    
                        <font-awesome-icon :icon="['fas', 'strikethrough']" class="fa-fw"/>
                    </button>
                    <button :class="{ 'is-active' : isActive.heading({ level: 1}) }" @click="commands.heading({ level: 1 })">                    
                        <p><font-awesome-icon :icon="['fas', 'heading']" class="fa-fw"/><strong>1</strong></p>
                    </button>
                    <button :class="{ 'is-active' : isActive.heading({ level: 2}) }" @click="commands.heading({ level: 2 })">                    
                        <p><strong>H2</strong></p>
                    </button>
                    <button :class="{ 'is-active' : isActive.heading({ level: 3}) }" @click="commands.heading({ level: 3 })">                    
                        <p><strong>H3</strong></p>
                    </button>
                    <button :class="{ 'is-active' : isActive.heading({ level: 4}) }" @click="commands.heading({ level: 4 })">                    
                        <p><strong>H4</strong></p>
                    </button>
                    <button :class="{ 'is-active' : isActive.heading({ level: 5}) }" @click="commands.heading({ level: 5 })">                    
                        <p><strong>H5</strong></p>
                    </button>
                    <button :class="{ 'is-active' : isActive.heading({ level: 6}) }" @click="commands.heading({ level: 6 })">                    
                        <p><strong>H6</strong></p>
                    </button>
                </div>                                
            </editor-menu-bar>
            <editor-content :editor="editor" /> -->
        </div>
    </div>  
</template>

<script>
import CkeditorNuxt from '@/components/CKEditorNuxt.vue';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import { Heading, Bold, Italic, Underline, Strike, Link, HardBreak } from 'tiptap-extensions';

export default {
    layout: 'admin',
    components: {
        CkeditorNuxt,
        // EditorContent,
        // EditorMenuBar
    },
    data() {
        return {
            // content: '',
            // editor: null
        }
    },
    mounted() {
        // this.editor = new Editor({
        //     extensions: [
        //         new Heading({
        //             levels: [1, 2, 3, 4, 5, 6]
        //         }),
        //         new Italic(),
        //         new Link(),
        //         new HardBreak(),
        //         new Bold(),
        //         new Underline(),
        //         new Strike()              
        //     ],
        // })
    },
    beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
        // this.editor.destroy()
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