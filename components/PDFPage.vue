
<script>
export default {
    // props: ['page', 'scale'
    
    // ],
    props: {
        page: Object,
        scale: Number
    },
    render(h) {        
        const {canvasAttrs: attrs} = this;
        return h('canvas', {attrs});
    },
    created() {        
        var scale = this.scale;        
        this.viewport = this.page.getViewport({scale});        
    },
    mounted() {
        this.drawPage(); 
    },
    // beforeDestroy(){
    //     this.destroyPage(this.page);
    // },
    watch: {
        page(page, oldPage){
            this.destroyPage(oldPage);
        }
    },
    computed: {
        canvasAttrs() {
            let {width, height} = this.viewport;
            [width, height] = [width, height].map(dim => Math.ceil(dim));

            const style = this.canvasStyle;
            // debugger;
            return {
                width,
                height,
                style,
                class: 'pdf-page',
            };
        },
        canvasStyle() {
            const {width: actualSizeWidth, height: actualSizeHeight} = this.actualSizeViewport;
            const pixelRatio = window.devicePixelRatio || 1;
            const [pixelWidth, pixelHeight] = [actualSizeWidth, actualSizeHeight]
                .map(dim => Math.ceil(dim / pixelRatio));
            return `width: ${pixelWidth}px; height: ${pixelHeight}px;`
        },
        actualSizeViewport() {
            return this.viewport.clone({scale: this.scale});
        }
    },
    methods: {
        async drawPage() {                 
            if (this.renderTask) return;

            const {viewport} = this;
            // debugger;
            const canvasContext = this.$el.getContext('2d');
            const renderContext = {canvasContext, viewport};

            // PDFPageProxy#render
            // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
            this.renderTask = await this.page.render(renderContext);
            
            if(this.renderTask != null){
                this.renderTask.promise.then(() => this.$emit('rendered', this.page));
            }            
        },
        destroyPage(page){
            if(!page) return;

            page._destroy();

            if(this.renderTask) this.renderTask.cancel();
        },
        destroyRenderTask(){
            if(!this.renderTask) return;

            this.renderTask.cancel();
            delete this.renderTask;
        }
    }
}
</script>

<style>

</style>