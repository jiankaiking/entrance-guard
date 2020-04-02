<template>
    <div v-if="item.children">
        <template v-if="item.children.length == 0">
            <el-menu-item :index="item.menuId.toString()">
                <i class="el-icon-menu"></i>
                {{item.menuName}}
            </el-menu-item>
        </template>

        <el-submenu v-else :index="item.menuId.toString()">
            <template slot="title">
                <i class="el-icon-menu"></i>
                {{item.menuName}}
            </template>
            <template v-for="child in item.children">
                <sidebar-item
                        v-if="child.children&&child.children.length>0"
                        :item="child"
                        :key="child.menuUrl"/>
                <el-menu-item v-else :key="child.menuUrl" :index="child.menuId.toString()">
                    <i class="el-icon-location"></i>
                    {{child.menuName}}
                </el-menu-item>
            </template>
        </el-submenu>
    </div>
</template>

<script>
    export default {
        name: 'SidebarItem',
        props: {
            item: {
                type: Object,
                required: true
            }
        }
    }
</script>
