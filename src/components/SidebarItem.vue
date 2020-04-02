<template>
    <div v-if="item.children"  >
        <div v-if="item.children.length == 0" draggable="true" @dragstart="drag($event,item.menuId)" @dragend="dragend">
            <el-menu-item :index="item.menuId.toString()">
                <i class="el-icon-menu"></i>
                {{item.menuName}}
            </el-menu-item>
        </div>


        <el-submenu v-else :index="item.menuId.toString()" >
            <template slot="title">
                <i class="el-icon-menu"></i>
                {{item.menuName}}
            </template>
            <div v-for="(child,index) in item.children" :key="index"  draggable="true" @dragstart="drag($event,child.menuId)" @dragend="dragend">
                <sidebar-item
                        v-if="child.children&&child.children.length>0"
                        :item="child"
                        :key="child.menuUrl"/>
                         <!-- draggable="true" @dragstart="drag($event)" @dragend="dragend" -->
                        <el-menu-item v-else :key="child.menuUrl" :index="child.menuId.toString()" >
                            <i class="el-icon-location"></i>
                            {{child.menuName}}
                        </el-menu-item>
            </div>
        </el-submenu>
    </div>
</template>

<script>
import vuedraggable from 'vuedraggable';
    export default {
        name: 'SidebarItem',
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        components: {vuedraggable},
       
        methods:{
            drag (event,data) {
            event.dataTransfer.setData('menuId',data)
            },
            dragend (event) {
                event.dataTransfer.clearData()
            },
        }
    }
</script>
