<template>
    <div class="flex flex-col justify-between text-sm p-1/2 ml-2 text-gray-darker overflow-hidden hover:cursor-pointer"
         :class="{'bg-white-darker': el.selected}"
         :key="el.title"
         @click="mixinClick(() => $emit('selectItem', el), editName)">
        <div class="flex">
            <svg-icon :icon="el.icon"/>
            <div class="flex flex-col items-start justify-start pl-2">
                <span v-if="!edit" class="text-xsm capitalize">
                    {{ el.title }}
                </span>
                <input v-else
                       ref="editAppName"
                       v-model="newTitle"
                       class="px-2 h-6 text-base bg-white-dark"
                       type="text"
                       @focusout="endEdit"/>
                <span class="pt-1 text-xs">
                    {{ el.description }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    //TODO set dragging element in state and drop on editor
    import DoubleClick from '../mixins/DoubleClick';

    export default {
        name: "AppLibraryItem",
        mixins: [DoubleClick],
        props: {
            el: {
                type: Object
            }
        },
        data: function() {
            return {
                edit: false,
                newTitle: this.el.title
            }
        },
        methods: {
            editName(){
                if(this.el.selected){
                    this.$emit('selectItem', this.el);
                }
                this.$emit('edit');
                setTimeout(() => {
                    this.$refs['editAppName'].focus();
                }, 100);
                this.edit = true;
            },
            endEdit(){
                this.$emit('endEdit');
                this.el.title = this.newTitle;
                this.edit = false;
            }
        }
    }
</script>
