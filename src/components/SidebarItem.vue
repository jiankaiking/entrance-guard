<template>
    <div v-if="item.children"  >
        <div v-if="item.children.length == 0" draggable="true" @dragstart="drag($event,item.menuId)" @dragend="dragend">
            <el-menu-item :index="item.menuUrl">
                <i class="el-icon-menu"></i>
                {{item.menuName}}
            </el-menu-item>
        </div>
        <el-submenu v-else :index="item.menuUrl" >
            <template slot="title">
                <i class="el-icon-menu"></i>
                {{item.menuName}}
            </template>
            <el-menu-item-group>
                <div v-for="(child,index) in item.children" :key="index"  draggable="true" @dragstart="drag($event,child.menuId)" @dragend="dragend">
                    <sidebar-item
                            v-if="child.children&&child.children.length>0"
                            :item="child"
                            :key="child.menuUrl"/>
                    <el-menu-item v-else :key="child.menuUrl" :index="child.menuUrl" >
<!--                        <i class="el-icon-location"></i>-->
                        {{child.menuName}}
                    </el-menu-item>
                </div>
            </el-menu-item-group>
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
