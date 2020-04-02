<template>
    <div v-if="item.children">
        <template v-if="item.children.length == 0">
            <el-menu-item :index="item.path">
                <i class="el-icon-menu"></i>
                {{item.title}}
            </el-menu-item>
        </template>

        <el-submenu v-else :index="item.path" >
            <template slot="title" >
                <i class="el-icon-menu"></i>
                {{item.title}}
            </template>
             
                    <template v-for="child in item.children">
                        <vuedraggable class="wrapper" :key="child.path" :data-id='child.path'  :options="{}" @end="drop($event,child)">
                <transition-group>
                        <sidebar-item
                                v-if="child.children&&child.children.length>0"
                                :item="child"
                                :key="child.path"/>
                        <el-menu-item v-else :key="child.path" :index="child.path" draggable="true" @dragstart="drag($event)" @dragend="dragend">
                            <i class="el-icon-location"></i>
                            {{child.title}}
                        </el-menu-item>
                         </transition-group>
                        </vuedraggable>
                    </template>
           
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
            // drag (event) {
            // console.log('1222222222222')
            // event.dataTransfer.setData('menuId', '10086')
            // },
            dragend (event) {
                event.dataTransfer.clearData()
            },
          drop(e,pash){  // 拖动结束的时候触发
                console.log(e,pash)  
                event.dataTransfer.menuId= pash.title
          }
        }
    }
</script>
